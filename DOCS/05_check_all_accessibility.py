#!/usr/bin/env python3
"""
05 - Check accessibility of ALL markdown files using cloudscraper.

This script:
1. Extracts source URLs from frontmatter of all markdown files
2. Uses cloudscraper to bypass Cloudflare protection
3. Checks page content to determine if restricted or accessible
4. Generates CSV report

Usage:
    cd /Users/gent.thaqi/Documents/WS2/my-app/DOCS
    python3 05_check_all_accessibility.py

Dependencies:
    pip install cloudscraper

Output:
    05_accessibility_report.csv
"""

import re
import csv
import json
import time
from pathlib import Path
from collections import defaultdict

# Try to import cloudscraper
try:
    import cloudscraper
    HAS_CLOUDSCRAPER = True
except ImportError:
    HAS_CLOUDSCRAPER = False
    print("[ERROR] cloudscraper not installed")
    print("Run: pip install cloudscraper")
    exit(1)

DOCS_PATH = Path(__file__).parent
REPORT_PATH = DOCS_PATH / "05_accessibility_report.csv"
MANIFEST_PATH = DOCS_PATH / "01_download_manifest.json"

# Rate limiting - be polite to avoid blocks
RATE_LIMIT = 0.6


def extract_source_url(file_path):
    """Extract 'url:' field from markdown frontmatter."""
    try:
        content = file_path.read_text(encoding="utf-8")
        match = re.search(r'^url:\s*"(.+?)"', content, re.MULTILINE)
        if match:
            return match.group(1)
        match = re.search(r'^url:\s*(https?://.+?)$', content, re.MULTILINE)
        if match:
            return match.group(1).strip()
    except Exception as e:
        print(f"  [WARN] Could not read {file_path}: {e}")
    return None


def check_page_accessibility(url):
    """Use cloudscraper to check if page is accessible or restricted."""
    try:
        # Create scraper with browser emulation
        scraper = cloudscraper.create_scraper(
            browser={
                'browser': 'chrome',
                'platform': 'darwin',
                'desktop': True
            }
        )
        
        response = scraper.get(url, timeout=15)
        
        # Extract title
        title_match = re.search(r'<title>(.*?)</title>', response.text, re.IGNORECASE)
        title = title_match.group(1).lower() if title_match else ""
        
        # Check for login/restriction indicators
        is_login_page = "login" in title or "sign in" in title
        is_short_content = len(response.text) < 10000
        
        # Check for article body markers
        has_article_body = bool(re.search(r'<article|class="article-body"|class="article__body"', response.text, re.I))
        
        # Determine if restricted
        is_restricted = is_login_page or (is_short_content and not has_article_body)
        
        return {
            "status_code": response.status_code,
            "is_accessible": not is_restricted and response.status_code == 200,
            "is_restricted": is_restricted,
            "title": title[:50] if title else "No title",
            "content_length": len(response.text),
            "is_login_page": is_login_page,
            "has_article_body": has_article_body,
            "error": None
        }
        
    except Exception as e:
        return {
            "status_code": None,
            "is_accessible": False,
            "is_restricted": None,
            "title": "",
            "content_length": 0,
            "error": str(e)[:100]
        }


def main():
    print("=" * 70)
    print("05 - CHECK ALL PAGE ACCESSIBILITY")
    print("=" * 70)
    
    # Load image failure data
    print("\n[1/4] Loading image failure data...")
    failed_urls_set = set()
    if MANIFEST_PATH.exists():
        with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
            manifest = json.load(f)
            failed_urls_set = set(manifest.get("failed_urls", []))
        print(f"  Loaded {len(failed_urls_set)} failed image URLs")
    
    # Get all markdown files (including videos this time)
    print("\n[2/4] Finding all markdown files...")
    md_files = list(DOCS_PATH.rglob("*.md"))
    print(f"  Found {len(md_files)} markdown files total")
    
    # Check accessibility
    print(f"\n[3/4] Checking accessibility (rate limit: {RATE_LIMIT}s)...")
    print(f"  This will take approximately {len(md_files) * RATE_LIMIT / 60:.1f} minutes")
    print()
    
    results = []
    no_url_files = []
    
    for i, file_path in enumerate(md_files, 1):
        rel_path = str(file_path.relative_to(DOCS_PATH))
        
        # Extract source URL
        source_url = extract_source_url(file_path)
        
        if not source_url:
            no_url_files.append(rel_path)
            results.append({
                "file_path": rel_path,
                "source_url": "",
                "status_code": "NO_URL",
                "is_accessible": False,
                "is_restricted": False,
                "has_failed_images": False,
                "category": Path(rel_path).parts[0] if Path(rel_path).parts else "",
                "title": "",
                "content_length": 0,
                "notes": "No source URL in frontmatter"
            })
            continue
        
        # Check accessibility
        check_result = check_page_accessibility(source_url)
        
        # Check if any images failed in this file
        try:
            file_content = file_path.read_text(encoding="utf-8")
            has_failed_images = any(failed_url in file_content for failed_url in failed_urls_set)
        except:
            has_failed_images = False
        
        # Get category
        parts = Path(rel_path).parts
        category = parts[0] if parts else ""
        
        # Determine notes
        notes = ""
        if check_result["error"]:
            notes = f"Error: {check_result['error']}"
        elif check_result["is_restricted"]:
            notes = f"Restricted ({check_result['title']})"
        elif check_result.get("is_login_page"):
            notes = "Login page detected"
        
        results.append({
            "file_path": rel_path,
            "source_url": source_url,
            "status_code": check_result["status_code"] if check_result["status_code"] else "ERROR",
            "is_accessible": check_result["is_accessible"],
            "is_restricted": check_result["is_restricted"] if check_result["is_restricted"] is not None else False,
            "has_failed_images": has_failed_images,
            "category": category,
            "title": check_result.get("title", ""),
            "content_length": check_result.get("content_length", 0),
            "notes": notes
        })
        
        # Progress update
        if i % 10 == 0:
            accessible_so_far = sum(1 for r in results if r["is_accessible"])
            restricted_so_far = sum(1 for r in results if r["is_restricted"])
            print(f"  [{i}/{len(md_files)}] Progress: {accessible_so_far} accessible, {restricted_so_far} restricted...")
        
        time.sleep(RATE_LIMIT)
    
    print(f"\n  Checked {len(results)} files")
    print(f"  Files without URL: {len(no_url_files)}")
    
    # Generate CSV report
    print("\n[4/4] Generating CSV report...")
    
    with open(REPORT_PATH, 'w', newline='', encoding='utf-8') as f:
        fieldnames = ["file_path", "source_url", "status_code", "is_accessible", 
                      "is_restricted", "has_failed_images", "category", "title", 
                      "content_length", "notes"]
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(results)
    
    print(f"  Report saved to: {REPORT_PATH}")
    
    # Summary statistics
    accessible_count = sum(1 for r in results if r["is_accessible"])
    restricted_count = sum(1 for r in results if r["is_restricted"])
    error_count = sum(1 for r in results if r["status_code"] in [None, "ERROR"])
    no_url_count = len(no_url_files)
    
    # Cross-reference
    restricted_with_images = sum(1 for r in results if r["is_restricted"] and r["has_failed_images"])
    restricted_no_images = sum(1 for r in results if r["is_restricted"] and not r["has_failed_images"])
    accessible_with_images = sum(1 for r in results if r["is_accessible"] and r["has_failed_images"])
    
    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"Total files: {len(md_files)}")
    print(f"  Accessible: {accessible_count}")
    print(f"  Restricted: {restricted_count}")
    print(f"  Error/Failed: {error_count}")
    print(f"  No source URL: {no_url_count}")
    
    print(f"\nCross-reference with image failures:")
    print(f"  Accessible with failed images: {accessible_with_images}")
    print(f"  Restricted with failed images: {restricted_with_images}")
    print(f"  Restricted without image issues: {restricted_no_images}")
    
    # Category breakdown
    category_stats = defaultdict(lambda: {"total": 0, "restricted": 0, "accessible": 0})
    for r in results:
        cat = r["category"]
        category_stats[cat]["total"] += 1
        if r["is_restricted"]:
            category_stats[cat]["restricted"] += 1
        elif r["is_accessible"]:
            category_stats[cat]["accessible"] += 1
    
    print(f"\nBy category:")
    for cat, stats in sorted(category_stats.items(), key=lambda x: -x[1]["total"]):
        if stats["restricted"] > 0 or stats["accessible"] > 0:
            print(f"  {cat}: {stats['accessible']} accessible, {stats['restricted']} restricted (total: {stats['total']})")
    
    print("\n" + "=" * 70)


if __name__ == "__main__":
    main()
