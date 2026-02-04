#!/usr/bin/env python3
"""
03 - Extract markdown files with failed/restricted images.

This script reads the download manifest and identifies which markdown
files contain images that failed to download (likely restricted content).

Usage:
    cd /Users/gent.thaqi/Documents/WS2/my-app/DOCS
    python3 03_find_restricted_files.py
"""

import json
from pathlib import Path
from collections import defaultdict

DOCS_PATH = Path(__file__).parent
MANIFEST_PATH = DOCS_PATH / "01_download_manifest.json"
RESTRICTED_REPORT_PATH = DOCS_PATH / "02_restricted_files_report.json"


def main():
    print("=" * 60)
    print("03 - FIND RESTRICTED FILES (FAILED IMAGE DOWNLOADS)")
    print("=" * 60)

    # Load manifest
    print("\n[1/2] Loading download manifest...")
    if not MANIFEST_PATH.exists():
        print(f"  [ERROR] Manifest not found: {MANIFEST_PATH}")
        print("  Run 01_download_images.py first!")
        return

    with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
        manifest = json.load(f)

    failed_urls = manifest.get("failed_urls", [])
    url_locations = manifest.get("url_locations", {})

    print(f"  Failed downloads: {len(failed_urls)}")

    if not failed_urls:
        print("\n  No failed downloads - all images accessible!")
        return

    # Map failed URLs to their file locations
    print("\n[2/2] Mapping failed URLs to markdown files...")

    files_with_failed_images = defaultdict(list)  # file -> [failed_urls]
    failed_url_details = {}  # url -> locations

    for url in failed_urls:
        locations = url_locations.get(url, [])
        failed_url_details[url] = locations

        for file_path, line_num in locations:
            files_with_failed_images[file_path].append({
                "url": url,
                "line": line_num
            })

    # Generate report
    report = {
        "summary": {
            "total_failed_urls": len(failed_urls),
            "affected_files": len(files_with_failed_images),
        },
        "failed_urls_with_locations": failed_url_details,
        "files_with_failed_images": {
            file_path: urls
            for file_path, urls in files_with_failed_images.items()
        },
        "files_by_category": defaultdict(list),
    }

    # Categorize by top-level directory
    for file_path in files_with_failed_images.keys():
        parts = Path(file_path).parts
        category = parts[0] if parts else "unknown"
        report["files_by_category"][category].append(file_path)

    report["files_by_category"] = dict(report["files_by_category"])

    with open(RESTRICTED_REPORT_PATH, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2)

    print(f"\n  Report saved to: {RESTRICTED_REPORT_PATH}")

    # Display summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Total failed URLs: {len(failed_urls)}")
    print(f"Files affected: {len(files_with_failed_images)}")
    print(f"\nBreakdown by category:")

    for category, files in sorted(report["files_by_category"].items(), key=lambda x: -len(x[1])):
        print(f"  {category}: {len(files)} files")

    print(f"\nFiles with most failed images (top 10):")
    sorted_files = sorted(files_with_failed_images.items(), key=lambda x: -len(x[1]))
    for file_path, urls in sorted_files[:10]:
        print(f"  {len(urls)} failed images: {file_path}")

    print("\n" + "=" * 60)
    print("Sample failed URLs:")
    print("=" * 60)
    for url in failed_urls[:5]:
        locations = failed_url_details.get(url, [])
        print(f"\n  {url[:70]}...")
        print(f"    Found in {len(locations)} location(s)")
        for loc, line in locations[:2]:
            print(f"      - {loc}:{line}")

    print("\n" + "=" * 60)
    print("Next steps:")
    print("  1. Review _restricted_files_report.json")
    print("  2. Decide how to handle restricted content")
    print("  3. Continue with deduplication analysis")
    print("=" * 60)


if __name__ == "__main__":
    main()
