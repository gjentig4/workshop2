#!/usr/bin/env python3
"""
03 - Analyze and deduplicate images using perceptual hashing.

This script:
1. Reads the download manifest from 01_download_images.py
2. Computes pHash for each downloaded image
3. Groups images by similarity (exact + near-duplicates)
4. Generates deduplication report with canonical URLs

Usage:
    cd /Users/gent.thaqi/Documents/WS2/my-app/DOCS
    python3 03_analyze_dedup.py

Dependencies:
    pip install imagehash pillow
"""

import json
from pathlib import Path
from collections import defaultdict

from PIL import Image
import imagehash

DOCS_PATH = Path(__file__).parent
IMAGES_DIR = DOCS_PATH / "_downloaded_images"
MANIFEST_PATH = DOCS_PATH / "01_download_manifest.json"
REPORT_PATH = DOCS_PATH / "03_image_dedup_report.json"

# pHash similarity threshold (lower = more strict)
# 0 = identical, 5 = very similar, 10 = perceptually similar
HASH_THRESHOLD = 5


def compute_phash(image_path):
    """Compute perceptual hash of an image."""
    try:
        with Image.open(image_path) as img:
            if img.mode != 'RGB':
                img = img.convert('RGB')
            return str(imagehash.phash(img))
    except Exception as e:
        print(f"  [ERROR] Failed to hash {image_path}: {e}")
        return None


def hamming_distance(hash1, hash2):
    """Calculate Hamming distance between two hex hashes."""
    try:
        h1 = int(hash1, 16)
        h2 = int(hash2, 16)
        return bin(h1 ^ h2).count('1')
    except:
        return float('inf')


def find_similar_groups(hashes, threshold=HASH_THRESHOLD):
    """Group similar hashes using Hamming distance."""
    urls = list(hashes.keys())
    groups = []
    processed = set()

    for i, url1 in enumerate(urls):
        if url1 in processed:
            continue

        group = [url1]
        processed.add(url1)

        for url2 in urls[i+1:]:
            if url2 in processed:
                continue

            distance = hamming_distance(hashes[url1], hashes[url2])
            if distance <= threshold:
                group.append(url2)
                processed.add(url2)

        if len(group) > 1:
            groups.append(group)

    return groups


def main():
    print("=" * 60)
    print("03 - ANALYZE AND DEDUPLICATE IMAGES")
    print("=" * 60)

    # Step 1: Load manifest
    print("\n[1/4] Loading download manifest...")
    if not MANIFEST_PATH.exists():
        print(f"  [ERROR] Manifest not found: {MANIFEST_PATH}")
        print("  Run 01_download_images.py first!")
        return

    with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
        manifest = json.load(f)

    url_to_path = manifest.get("url_to_path", {})
    url_locations = manifest.get("url_locations", {})

    print(f"  Loaded {len(url_to_path)} downloaded images")

    # Step 2: Compute hashes
    print(f"\n[2/4] Computing perceptual hashes...")
    hashes = {}  # url -> phash

    for i, (url, path) in enumerate(url_to_path.items(), 1):
        phash = compute_phash(path)
        if phash:
            hashes[url] = phash
        if i % 100 == 0:
            print(f"  [{i}/{len(url_to_path)}] Hashed...")

    print(f"  Successfully hashed: {len(hashes)}")

    # Step 3: Find exact duplicates
    print(f"\n[3/4] Finding exact duplicates...")

    exact_groups = defaultdict(list)
    for url, h in hashes.items():
        exact_groups[h].append(url)

    exact_duplicates = {h: urls for h, urls in exact_groups.items() if len(urls) > 1}
    print(f"  Exact duplicate groups: {len(exact_duplicates)}")

    for h, urls in sorted(exact_duplicates.items(), key=lambda x: -len(x[1]))[:5]:
        print(f"    - {len(urls)} images (hash: {h[:16]}...)")

    # Step 4: Find similar images
    print(f"\n[4/4] Finding similar images (threshold: {HASH_THRESHOLD})...")

    # Get unique hashes only (exclude exact duplicates from similarity check)
    unique_hashes = {}
    processed_in_exact = set()
    for h, urls in exact_duplicates.items():
        # Keep first URL from each exact group for similarity check
        unique_hashes[urls[0]] = h
        processed_in_exact.update(urls)

    for url, h in hashes.items():
        if url not in processed_in_exact:
            unique_hashes[url] = h

    similar_groups = find_similar_groups(unique_hashes, HASH_THRESHOLD)
    print(f"  Similar image groups: {len(similar_groups)}")

    for group in sorted(similar_groups, key=lambda x: -len(x))[:5]:
        print(f"    - {len(group)} similar images")

    # Generate canonical mapping
    print(f"\n[5/4] Generating canonical URL mapping...")
    canonical_map = {}  # duplicate_url -> canonical_url

    # Map exact duplicates
    for h, url_list in exact_duplicates.items():
        canonical = min(url_list, key=len)  # Shortest URL
        for url in url_list:
            if url != canonical:
                canonical_map[url] = canonical

    # Map similar images
    for group in similar_groups:
        canonical = min(group, key=len)
        for url in group:
            if url != canonical and url not in canonical_map:
                canonical_map[url] = canonical

    # Generate report
    report = {
        "summary": {
            "total_urls": manifest.get("total_urls", 0),
            "downloaded": manifest.get("downloaded", 0),
            "hashed": len(hashes),
            "exact_duplicate_groups": len(exact_duplicates),
            "similar_groups": len(similar_groups),
            "urls_to_replace": len(canonical_map),
            "unique_canonical_images": manifest.get("total_urls", 0) - len(canonical_map),
            "hash_threshold": HASH_THRESHOLD,
        },
        "exact_duplicates": {
            h: {
                "count": len(urls),
                "urls": urls,
                "canonical": min(urls, key=len)
            }
            for h, urls in exact_duplicates.items()
        },
        "similar_groups": [
            {
                "count": len(group),
                "urls": group,
                "canonical": min(group, key=len)
            }
            for group in similar_groups
        ],
        "canonical_mapping": canonical_map,
        "url_locations": url_locations,
        "url_to_local_path": url_to_path,
        "url_to_hash": hashes,
    }

    with open(REPORT_PATH, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2)

    print(f"\n  Report saved to: {REPORT_PATH}")

    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Total URLs: {manifest.get('total_urls', 0)}")
    print(f"Downloaded: {manifest.get('downloaded', 0)}")
    print(f"Hashed: {len(hashes)}")
    print(f"Exact duplicate groups: {len(exact_duplicates)}")
    print(f"Similar groups: {len(similar_groups)}")
    print(f"URLs to deduplicate: {len(canonical_map)}")
    print(f"Unique canonical images: {manifest.get('total_urls', 0) - len(canonical_map)}")

    if exact_duplicates:
        print("\nTop duplicate groups:")
        for h, urls in sorted(exact_duplicates.items(), key=lambda x: -len(x[1]))[:3]:
            canonical = min(urls, key=len)
            print(f"  - {len(urls)} copies of same image")
            print(f"    Canonical: {canonical[:70]}...")

    print("\n" + "=" * 60)
    print("Review the report, then create 03_replace_urls.py")
    print("=" * 60)


if __name__ == "__main__":
    main()
