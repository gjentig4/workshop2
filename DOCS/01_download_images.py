#!/usr/bin/env python3
"""
01 - Download all images from markdown files.

This script:
1. Extracts all unique image URLs from markdown files (excluding Training_Videos)
2. Downloads images to _downloaded_images/ with rate limiting
3. Creates a manifest of what was downloaded

Usage:
    cd /Users/gent.thaqi/Documents/WS2/my-app/DOCS
    python3 01_download_images.py

Dependencies:
    pip install requests
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

DOCS_PATH = Path(__file__).parent
IMAGES_DIR = DOCS_PATH / "_downloaded_images"
MANIFEST_PATH = DOCS_PATH / "01_download_manifest.json"

# Rate limiting (seconds between downloads)
RATE_LIMIT = 0.1


def extract_image_urls():
    """Extract all unique image URLs from markdown files."""
    md_files = list(DOCS_PATH.rglob("*.md"))
    content_files = [f for f in md_files if "Training_Videos" not in str(f)]

    url_pattern = re.compile(
        r'!\[([^\]]*)\]\((https://support\.focus\.teamleader\.eu/hc/article_attachments/\d+)\)'
    )

    urls = set()
    url_locations = defaultdict(list)

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
        print(f"  [ERROR] Failed to download {url}: {e}")
        return False


def main():
    print("=" * 60)
    print("01 - DOWNLOAD IMAGES")
    print("=" * 60)

    # Step 1: Extract URLs
    print("\n[1/3] Extracting image URLs from markdown files...")
    urls, url_locations = extract_image_urls()
    print(f"  Found {len(urls)} unique image URLs")

    # Step 2: Setup download directory
    IMAGES_DIR.mkdir(exist_ok=True)
    print(f"\n[2/3] Download directory: {IMAGES_DIR}")

    # Step 3: Download images
    print(f"\n[3/3] Downloading images (rate limit: {RATE_LIMIT}s)...")

    downloaded = {}  # url -> local_path
    failed = []
    cached = 0

    for i, url in enumerate(sorted(urls), 1):
        # Create filename from URL hash
        url_hash = hashlib.md5(url.encode()).hexdigest()[:12]
        ext = Path(urlparse(url).path).suffix or '.png'
        dest_path = IMAGES_DIR / f"{url_hash}{ext}"

        if dest_path.exists():
            downloaded[url] = str(dest_path)
            cached += 1
            if i % 100 == 0:
                print(f"  [{i}/{len(urls)}] Cached: {url[:60]}...")
        else:
            if download_image(url, dest_path):
                downloaded[url] = str(dest_path)
                if i % 10 == 0:
                    print(f"  [{i}/{len(urls)}] Downloaded: {url[:60]}...")
            else:
                failed.append(url)
            time.sleep(RATE_LIMIT)

    print(f"\n  Download complete:")
    print(f"    - Downloaded: {len(downloaded) - cached}")
    print(f"    - Cached: {cached}")
    print(f"    - Failed: {len(failed)}")

    # Save manifest
    manifest = {
        "total_urls": len(urls),
        "downloaded": len(downloaded),
        "failed": len(failed),
        "images_dir": str(IMAGES_DIR),
        "url_to_path": downloaded,
        "url_locations": {url: locs for url, locs in url_locations.items()},
        "failed_urls": failed,
    }

    with open(MANIFEST_PATH, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2)

    print(f"\n  Manifest saved to: {MANIFEST_PATH}")
    print("\n" + "=" * 60)
    print("Next: Run 02_analyze_dedup.py to find duplicates")
    print("=" * 60)


if __name__ == "__main__":
    main()
