#!/usr/bin/env python3
"""
Image deduplication using perceptual hashing (pHash).

This script:
1. Extracts all image URLs from markdown files
2. Downloads images with rate limiting
3. Computes pHash for each image
4. Groups by hash to find duplicates
5. Generates a mapping report
"""

import os
import json
import re
import time
import hashlib
from pathlib import Path
from collections import defaultdict
from urllib.parse import urlparse

import requests
from PIL import Image
import imagehash

DOCS_PATH = Path("/Users/gent.thaqi/Documents/WS2/my-app/DOCS")
IMAGES_DIR = Path("/Users/gent.thaqi/Documents/WS2/my-app/DOCS/_downloaded_images")
REPORT_PATH = Path("/Users/gent.thaqi/Documents/WS2/my-app/DOCS/_image_dedup_report.json")

# Rate limiting (seconds between downloads)
RATE_LIMIT = 0.1

# pHash similarity threshold (lower = more strict)
# 0 = identical, 5 = very similar, 10 = perceptually similar
HASH_THRESHOLD = 5


def extract_image_urls():
    """Extract all unique image URLs from markdown files."""
    md_files = list(DOCS_PATH.rglob("*.md"))
    content_files = [f for f in md_files if "Training_Videos" not in str(f)]

    url_pattern = re.compile(
        r'!\[([^\]]*)\]\((https://support\.focus\.teamleader\.eu/hc/article_attachments/\d+)\)'
    )

    urls = set()
    url_locations = defaultdict(list)  # url -> [(file_path, line_num)]

    for f in content_files:
        content = f.read_text(encoding="utf-8")
        lines = content.split('\n')

        for line_num, line in enumerate(lines, 1):
            matches = url_pattern.findall(line)
            for _, url in matches:
                urls.add(url)
                rel_path = str(f.relative_to(DOCS_PATH))
                url_locations[url].append((rel_path, line_num))

    return urls, url_locations


def download_image(url, dest_path):
    """Download image with retries."""
    try:
        response = requests.get(url, timeout=30, stream=True)
        response.raise_for_status()

        with open(dest_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        return True
    except Exception as e:
        print(f"  Failed to download {url}: {e}")
        return False


def compute_phash(image_path):
    """Compute perceptual hash of an image."""
    try:
        with Image.open(image_path) as img:
            # Convert to RGB if necessary
            if img.mode != 'RGB':
                img = img.convert('RGB')
            return str(imagehash.phash(img))
    except Exception as e:
        print(f"  Failed to hash {image_path}: {e}")
        return None


def find_similar_hashes(hashes, threshold=HASH_THRESHOLD):
    """Find groups of similar hashes using Hamming distance."""
    # Convert hex strings to integers for comparison
    hash_ints = {}
    for url, h in hashes.items():
        try:
            hash_ints[url] = int(h, 16)
        except:
            continue

    groups = []
    processed = set()

    for url1, h1 in hash_ints.items():
        if url1 in processed:
            continue

        group = [url1]
        processed.add(url1)

        for url2, h2 in hash_ints.items():
            if url2 in processed:
                continue

            # Compute Hamming distance
            distance = bin(h1 ^ h2).count('1')
            if distance <= threshold:
                group.append(url2)
                processed.add(url2)

        if len(group) > 1:
            groups.append(group)

    return groups


def main():
    print("=" * 60)
    print("IMAGE DEDUPLICATION ANALYSIS")
    print("=" * 60)

    # Step 1: Extract URLs
    print("\n[1/5] Extracting image URLs from markdown files...")
    urls, url_locations = extract_image_urls()
    print(f"  Found {len(urls)} unique image URLs")

    # Step 2: Setup download directory
    IMAGES_DIR.mkdir(exist_ok=True)

    # Step 3: Download images
    print(f"\n[2/5] Downloading images to {IMAGES_DIR}...")
    print(f"  Rate limit: {RATE_LIMIT}s between downloads")

    downloaded = {}  # url -> local_path
    failed = []

    for i, url in enumerate(sorted(urls), 1):
        # Create filename from URL hash
        url_hash = hashlib.md5(url.encode()).hexdigest()[:12]
        ext = Path(urlparse(url).path).suffix or '.png'
        dest_path = IMAGES_DIR / f"{url_hash}{ext}"

        if dest_path.exists():
            downloaded[url] = str(dest_path)
            if i % 50 == 0:
                print(f"  [{i}/{len(urls)}] Cached: {url[:60]}...")
        else:
            if download_image(url, dest_path):
                downloaded[url] = str(dest_path)
                if i % 10 == 0:
                    print(f"  [{i}/{len(urls)}] Downloaded: {url[:60]}...")
            else:
                failed.append(url)
            time.sleep(RATE_LIMIT)

    print(f"  Downloaded: {len(downloaded)}")
    print(f"  Failed: {len(failed)}")

    # Step 4: Compute hashes
    print(f"\n[3/5] Computing perceptual hashes...")
    hashes = {}  # url -> phash

    for i, (url, path) in enumerate(downloaded.items(), 1):
        phash = compute_phash(path)
        if phash:
            hashes[url] = phash
        if i % 100 == 0:
            print(f"  [{i}/{len(downloaded)}] Hashed...")

    print(f"  Successfully hashed: {len(hashes)}")

    # Step 5: Find duplicates
    print(f"\n[4/5] Finding similar images (threshold: {HASH_THRESHOLD})...")

    # Group by exact hash first
    exact_groups = defaultdict(list)
    for url, h in hashes.items():
        exact_groups[h].append(url)

    exact_duplicates = {h: urls for h, urls in exact_groups.items() if len(urls) > 1}
    print(f"  Exact duplicates found: {len(exact_duplicates)} groups")
    for h, urls in sorted(exact_duplicates.items(), key=lambda x: -len(x[1]))[:5]:
        print(f"    - {len(urls)} images with hash {h[:16]}...")

    # Find similar hashes
    similar_groups = find_similar_hashes(hashes, HASH_THRESHOLD)
    print(f"  Similar image groups: {len(similar_groups)}")

    # Step 6: Generate report
    print(f"\n[5/5] Generating report...")

    # Create canonical mapping
    canonical_map = {}  # duplicate_url -> canonical_url

    # For exact duplicates, pick shortest URL as canonical
    for h, url_list in exact_duplicates.items():
        canonical = min(url_list, key=len)  # Shortest URL
        for url in url_list:
            if url != canonical:
                canonical_map[url] = canonical

    # For similar groups
    for group in similar_groups:
        canonical = min(group, key=len)
        for url in group:
            if url != canonical:
                canonical_map[url] = canonical

    report = {
        "summary": {
            "total_urls": len(urls),
            "downloaded": len(downloaded),
            "failed_downloads": len(failed),
            "hashed": len(hashes),
            "exact_duplicate_groups": len(exact_duplicates),
            "similar_groups": len(similar_groups),
            "urls_to_replace": len(canonical_map),
            "unique_canonical_images": len(urls) - len(canonical_map),
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
        "url_locations": {url: locs for url, locs in url_locations.items()},
        "failed_urls": failed,
    }

    with open(REPORT_PATH, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2)

    print(f"\nReport saved to: {REPORT_PATH}")
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Total unique images: {len(urls)}")
    print(f"Downloaded: {len(downloaded)}")
    print(f"Exact duplicate groups: {len(exact_duplicates)}")
    print(f"Similar image groups: {len(similar_groups)}")
    print(f"URLs that can be deduplicated: {len(canonical_map)}")
    print(f"Unique canonical images: {len(urls) - len(canonical_map)}")
    print("\nNext steps:")
    print("1. Review the report: DOCS/_image_dedup_report.json")
    print("2. Check the exact_duplicates section for template images")
    print("3. Run replacement script when ready")


if __name__ == "__main__":
    main()
