#!/usr/bin/env python3
"""Quick analysis of DOCS markdown files for RAG system prep.

Excludes Training_Videos and counts images.
Identifies template images that appear across multiple files.
"""

import os
import json
import re
from pathlib import Path
from collections import defaultdict, Counter

DOCS_PATH = Path("/Users/gent.thaqi/Documents/WS2/my-app/DOCS")

# Known template image URLs (from user)
KNOWN_TEMPLATES = {
    "https://support.focus.teamleader.eu/hc/article_attachments/25692533852049",  # Getting started template
    "https://support.focus.teamleader.eu/hc/article_attachments/32281038466193",  # How To template
}


def analyze_docs():
    md_files = list(DOCS_PATH.rglob("*.md"))

    # Filter out Training_Videos
    content_files = [f for f in md_files if "Training_Videos" not in str(f)]
    video_files = [f for f in md_files if "Training_Videos" in str(f)]

    stats = {
        "total_md_files": len(md_files),
        "content_files": len(content_files),
        "video_files": len(video_files),
        "total_size_bytes": 0,
        "total_words": 0,
        "by_category": defaultdict(int),
        "by_type": defaultdict(int),
        "images": {
            "total_references": 0,
            "unique_urls": set(),
            "all_urls": [],
            "by_category": defaultdict(int),
            "by_file": {},
        },
    }

    # Image regex: match ![](url) or ![alt](url)
    image_pattern = re.compile(
        r'!\[([^\]]*)\]\((https://support\.focus\.teamleader\.eu/hc/article_attachments/\d+)\)'
    )

    for f in content_files:
        # Size & words
        size = f.stat().st_size
        stats["total_size_bytes"] += size

        content = f.read_text(encoding="utf-8")
        words = len(content.split())
        stats["total_words"] += words

        # Category
        rel = f.relative_to(DOCS_PATH)
        category = rel.parts[0] if rel.parts else "root"
        stats["by_category"][category] += 1

        # File type prefix
        prefix = f.stem.split("_")[0] if "_" in f.stem else "Other"
        stats["by_type"][prefix] += 1

        # Find images
        images = image_pattern.findall(content)  # Returns list of (alt, url) tuples
        image_urls = [url for _, url in images]
        stats["images"]["total_references"] += len(image_urls)
        stats["images"]["all_urls"].extend(image_urls)
        stats["images"]["unique_urls"].update(image_urls)
        stats["images"]["by_category"][category] += len(image_urls)
        stats["images"]["by_file"][str(rel)] = len(image_urls)

    # Count URL frequencies to identify templates
    url_counts = Counter(stats["images"]["all_urls"])

    # Identify likely templates (appear in 5+ files)
    likely_templates = {url: count for url, count in url_counts.items() if count >= 5}

    # Calculate unique images (excluding known templates)
    all_unique_urls = stats["images"]["unique_urls"]
    unique_minus_known = all_unique_urls - KNOWN_TEMPLATES
    likely_template_urls = set(likely_templates.keys())
    unique_content_images = all_unique_urls - KNOWN_TEMPLATES - likely_template_urls

    # Summary output
    print("=" * 60)
    print("DOCS RAG KNOWLEDGE BASE - ANALYSIS (EXCLUDING VIDEOS)")
    print("=" * 60)
    print(f"Total MD files: {stats['total_md_files']}")
    print(f"  - Content files: {stats['content_files']}")
    print(f"  - Video files (excluded): {stats['video_files']}")
    print()
    print(f"Content stats:")
    print(f"  Total size: {stats['total_size_bytes']:,} bytes ({stats['total_size_bytes']/1024/1024:.2f} MB)")
    print(f"  Total words: {stats['total_words']:,}")
    print(f"  Avg words/file: {stats['total_words']/stats['content_files']:.0f}")
    print()

    print("BY CATEGORY (content only):")
    for cat, count in sorted(stats["by_category"].items(), key=lambda x: -x[1]):
        print(f"  {cat}: {count} files")
    print()

    print("BY TYPE PREFIX:")
    for typ, count in sorted(stats["by_type"].items(), key=lambda x: -x[1])[:10]:
        print(f"  {typ}: {count}")
    print()

    print("=" * 60)
    print("IMAGE ANALYSIS")
    print("=" * 60)
    print(f"Total image references: {stats['images']['total_references']}")
    print(f"Unique image URLs: {len(all_unique_urls)}")
    print()

    print(f"Known template URLs excluded: {len(KNOWN_TEMPLATES)}")
    for url in KNOWN_TEMPLATES:
        count = url_counts.get(url, 0)
        print(f"  - {url[:60]}... ({count} occurrences)")
    print()

    print(f"Likely template images (5+ occurrences): {len(likely_templates)}")
    for url, count in sorted(likely_templates.items(), key=lambda x: -x[1])[:5]:
        print(f"  - {url[:60]}... ({count} occurrences)")
    print()

    print(f"Unique content images (excluding all templates): {len(unique_content_images)}")
    print(f"Total references that need alt text (approx): {stats['images']['total_references'] - sum(likely_templates.values())}")
    print()

    print("IMAGES BY CATEGORY:")
    for cat, count in sorted(stats["images"]["by_category"].items(), key=lambda x: -x[1]):
        print(f"  {cat}: {count} images")
    print()

    # Find files with most images
    files_with_images = [(f, c) for f, c in stats["images"]["by_file"].items() if c > 0]
    files_with_images.sort(key=lambda x: -x[1])

    print(f"FILES WITH MOST IMAGES (top 10):")
    for f, c in files_with_images[:10]:
        print(f"  {c} images: {f}")
    print()

    # Save detailed report
    output = {
        "summary": {
            "total_md_files": stats["total_md_files"],
            "content_files": stats["content_files"],
            "video_files_excluded": stats["video_files"],
            "total_size_mb": round(stats["total_size_bytes"] / 1024 / 1024, 2),
            "total_words": stats["total_words"],
            "avg_words_per_file": round(stats["total_words"] / stats["content_files"]),
        },
        "categories": dict(stats["by_category"]),
        "file_types": dict(stats["by_type"]),
        "images": {
            "total_references": stats["images"]["total_references"],
            "unique_urls": len(all_unique_urls),
            "known_templates_count": len(KNOWN_TEMPLATES),
            "likely_templates_count": len(likely_templates),
            "content_images_unique": len(unique_content_images),
            "references_needing_alt_text": stats["images"]["total_references"] - sum(likely_templates.values()),
            "images_by_category": dict(stats["images"]["by_category"]),
            "url_frequency": dict(url_counts.most_common(20)),
            "known_template_urls": list(KNOWN_TEMPLATES),
            "likely_template_urls": {url: count for url, count in likely_templates.items()},
        },
    }

    report_path = DOCS_PATH / "_docs_analysis.json"
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2)

    print(f"Full report saved to: {report_path}")
    print("=" * 60)


if __name__ == "__main__":
    analyze_docs()
