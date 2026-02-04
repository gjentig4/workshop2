#!/usr/bin/env python3
"""
04 - Replace duplicate image URLs with canonical versions.

This script:
1. Reads the deduplication report from 03_analyze_dedup.py
2. Replaces all duplicate image URLs with their canonical version
3. Updates all markdown files in-place

Usage:
    cd /Users/gent.thaqi/Documents/WS2/my-app/DOCS
    python3 04_replace_image_urls.py

Note:
    All duplicate images have empty alt text (![]()), so no meaningful
    alt text will be lost during URL replacement.
"""

import re
import json
from pathlib import Path
from collections import defaultdict

DOCS_PATH = Path(__file__).parent
REPORT_PATH = DOCS_PATH / "03_image_dedup_report.json"

def main():
    print("=" * 70)
    print("04 - REPLACE DUPLICATE IMAGE URLs")
    print("=" * 70)
    
    # Load deduplication report
    print("\n[1/2] Loading deduplication report...")
    if not REPORT_PATH.exists():
        print(f"  [ERROR] Report not found: {REPORT_PATH}")
        print("  Run 03_analyze_dedup.py first!")
        return
    
    with open(REPORT_PATH, 'r', encoding='utf-8') as f:
        report = json.load(f)
    
    canonical_map = report.get("canonical_mapping", {})
    
    print(f"  Loaded {len(canonical_map)} duplicate URLs to replace")
    print(f"  Will reduce to {report['summary']['unique_canonical_images']} unique images")
    
    # Find all markdown files
    md_files = list(DOCS_PATH.rglob("*.md"))
    
    print(f"\n[2/2] Processing {len(md_files)} markdown files...")
    
    files_modified = 0
    total_replacements = 0
    replacements_by_file = defaultdict(int)
    
    # Image URL pattern
    image_pattern = r'(!\[[^\]]*\]\()(https://support\.focus\.teamleader\.eu/hc/article_attachments/\d+)(\))'
    
    for i, file_path in enumerate(md_files, 1):
        try:
            # Read file
            content = file_path.read_text(encoding='utf-8')
            original_content = content
            
            # Find and replace duplicate URLs
            file_replacements = 0
            
            def replace_url(match):
                nonlocal file_replacements
                prefix = match.group(1)
                url = match.group(2)
                suffix = match.group(3)
                
                if url in canonical_map:
                    canonical = canonical_map[url]
                    file_replacements += 1
                    return f"{prefix}{canonical}{suffix}"
                return match.group(0)
            
            new_content = re.sub(image_pattern, replace_url, content)
            
            # If changes were made
            if new_content != original_content:
                # Write modified content
                file_path.write_text(new_content, encoding='utf-8')
                
                files_modified += 1
                total_replacements += file_replacements
                replacements_by_file[str(file_path.relative_to(DOCS_PATH))] = file_replacements
                
                if files_modified % 50 == 0:
                    print(f"  [{i}/{len(md_files)}] Modified {files_modified} files so far...")
        
        except Exception as e:
            print(f"  [ERROR] Failed to process {file_path}: {e}")
            continue
    
    # Summary
    print(f"\n{'=' * 70}")
    print("SUMMARY")
    print("=" * 70)
    print(f"Files processed: {len(md_files)}")
    print(f"Files modified: {files_modified}")
    print(f"Total URL replacements: {total_replacements}")
    print(f"Unique images after dedup: {report['summary']['unique_canonical_images']}")
    
    if replacements_by_file:
        print(f"\nTop 10 files with most replacements:")
        sorted_files = sorted(replacements_by_file.items(), key=lambda x: -x[1])
        for file_path, count in sorted_files[:10]:
            print(f"  {count} replacements: {file_path}")
    
    print("=" * 70)


if __name__ == "__main__":
    main()
