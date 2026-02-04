#!/usr/bin/env python3
"""
07_update_markdown.py - Apply image alt text to markdown files

Reads image summaries from 06_image_metadata.json and updates markdown files
to include descriptive alt text for images.

Before: ![](https://support.focus.teamleader.eu/hc/article_attachments/12345)
After:  ![The 'Invite User' dialog box for adding new team members](https://support.focus.teamleader.eu/hc/article_attachments/12345)

Usage:
    python 07_update_markdown.py                      # Preview changes (dry run)
    python 07_update_markdown.py --apply              # Apply changes (skip existing alt)
    python 07_update_markdown.py --apply --overwrite  # Replace ALL alt text with metadata
"""

import json
import os
import re
import argparse
from pathlib import Path
from datetime import datetime


def load_image_metadata(metadata_path: str) -> dict:
    """Load the image metadata JSON file."""
    with open(metadata_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Handle both possible structures (direct dict or nested under 'images')
    if 'images' in data:
        return data['images']
    elif 'processed' in data:
        return data['processed']
    return data


def escape_alt_text(text: str) -> str:
    """Escape special characters in alt text for markdown compatibility."""
    # Remove newlines and extra whitespace
    text = ' '.join(text.split())
    # Escape brackets and parentheses that could break markdown
    text = text.replace('[', '\\[').replace(']', '\\]')
    # Limit length to avoid overly long alt text
    if len(text) > 200:
        text = text[:197] + '...'
    return text


def find_image_references(content: str) -> list:
    """
    Find all markdown image references in content.
    Returns list of tuples: (full_match, existing_alt, url, start_pos, end_pos)
    """
    # Pattern matches: ![optional alt text](url)
    # Captures: group(1)=alt text (may be empty), group(2)=url
    pattern = r'!\[([^\]]*)\]\(([^)]+)\)'
    
    matches = []
    for match in re.finditer(pattern, content):
        matches.append({
            'full_match': match.group(0),
            'alt_text': match.group(1),
            'url': match.group(2),
            'start': match.start(),
            'end': match.end()
        })
    return matches


def update_markdown_content(content: str, metadata: dict, filename: str, overwrite: bool = False) -> tuple:
    """
    Update image references in markdown content with alt text from metadata.
    
    Args:
        content: Markdown file content
        metadata: Image URL to metadata mapping
        filename: Name of the file being processed
        overwrite: If True, replace existing alt text with metadata summary
    
    Returns: (updated_content, stats_dict)
    """
    matches = find_image_references(content)
    
    stats = {
        'total_images': len(matches),
        'updated': 0,
        'overwritten': 0,
        'skipped_has_alt': 0,
        'skipped_not_in_metadata': 0,
        'details': []
    }
    
    if not matches:
        return content, stats
    
    # Process matches in reverse order to preserve positions
    updated_content = content
    for match in reversed(matches):
        url = match['url']
        existing_alt = match['alt_text'].strip()
        
        # Handle existing alt text
        if existing_alt and not overwrite:
            stats['skipped_has_alt'] += 1
            stats['details'].append({
                'url': url[:60] + '...' if len(url) > 60 else url,
                'action': 'skipped (has alt text)',
                'alt': existing_alt[:50] + '...' if len(existing_alt) > 50 else existing_alt
            })
            continue
        
        # Check if URL is in metadata
        if url not in metadata:
            stats['skipped_not_in_metadata'] += 1
            stats['details'].append({
                'url': url[:60] + '...' if len(url) > 60 else url,
                'action': 'skipped (not in metadata)'
            })
            continue
        
        # Get summary from metadata
        summary = metadata[url].get('summary', '')
        if not summary:
            stats['skipped_not_in_metadata'] += 1
            stats['details'].append({
                'url': url[:60] + '...' if len(url) > 60 else url,
                'action': 'skipped (no summary in metadata)'
            })
            continue
        
        # Escape and format alt text
        alt_text = escape_alt_text(summary)
        
        # Create new image reference
        new_reference = f'![{alt_text}]({url})'
        
        # Replace in content
        updated_content = (
            updated_content[:match['start']] + 
            new_reference + 
            updated_content[match['end']:]
        )
        
        # Track whether this was an update or overwrite
        if existing_alt:
            stats['overwritten'] += 1
            stats['details'].append({
                'url': url[:60] + '...' if len(url) > 60 else url,
                'action': 'overwritten',
                'old_alt': existing_alt[:30] + '...' if len(existing_alt) > 30 else existing_alt,
                'new_alt': alt_text[:50] + '...' if len(alt_text) > 50 else alt_text
            })
        else:
            stats['updated'] += 1
            stats['details'].append({
                'url': url[:60] + '...' if len(url) > 60 else url,
                'action': 'updated',
                'alt': alt_text[:50] + '...' if len(alt_text) > 50 else alt_text
            })
    
    return updated_content, stats


def process_directory(docs_dir: str, metadata: dict, apply: bool = False, overwrite: bool = False) -> dict:
    """
    Process all markdown files in the directory.
    
    Args:
        docs_dir: Path to DOCS directory
        metadata: Image metadata dictionary
        apply: If True, write changes to files. If False, dry run.
        overwrite: If True, replace existing alt text with metadata summary.
    
    Returns: Summary statistics
    """
    docs_path = Path(docs_dir)
    
    total_stats = {
        'files_processed': 0,
        'files_modified': 0,
        'files_unchanged': 0,
        'total_images': 0,
        'images_updated': 0,
        'images_overwritten': 0,
        'images_skipped_has_alt': 0,
        'images_skipped_not_in_metadata': 0,
        'errors': []
    }
    
    # Find all markdown files (excluding script files and hidden files)
    md_files = sorted([
        f for f in docs_path.rglob('*.md')
        if not f.name.startswith('_') 
        and not f.name.startswith('.')
        and not f.name.startswith('00_')  # Skip readme
    ])
    
    mode_str = 'DRY RUN' if not apply else 'APPLYING CHANGES'
    overwrite_str = ' (overwrite mode)' if overwrite else ''
    print(f"\n{'=' * 60}")
    print(f"{mode_str}{overwrite_str}: Processing {len(md_files)} markdown files")
    print(f"{'=' * 60}\n")
    
    for md_file in md_files:
        try:
            # Read file
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Process content
            relative_path = md_file.relative_to(docs_path)
            updated_content, stats = update_markdown_content(content, metadata, str(relative_path), overwrite=overwrite)
            
            total_stats['files_processed'] += 1
            total_stats['total_images'] += stats['total_images']
            total_stats['images_updated'] += stats['updated']
            total_stats['images_overwritten'] += stats['overwritten']
            total_stats['images_skipped_has_alt'] += stats['skipped_has_alt']
            total_stats['images_skipped_not_in_metadata'] += stats['skipped_not_in_metadata']
            
            # Check if file was modified
            if stats['updated'] > 0 or stats['overwritten'] > 0:
                total_stats['files_modified'] += 1
                
                # Print details for modified files
                print(f"📝 {relative_path}")
                changes = []
                if stats['updated'] > 0:
                    changes.append(f"Added: {stats['updated']}")
                if stats['overwritten'] > 0:
                    changes.append(f"Replaced: {stats['overwritten']}")
                skipped = stats['skipped_has_alt'] + stats['skipped_not_in_metadata']
                if skipped > 0:
                    changes.append(f"Skipped: {skipped}")
                print(f"   {' | '.join(changes)}")
                
                if apply:
                    with open(md_file, 'w', encoding='utf-8') as f:
                        f.write(updated_content)
            else:
                total_stats['files_unchanged'] += 1
                
        except Exception as e:
            total_stats['errors'].append({
                'file': str(md_file),
                'error': str(e)
            })
            print(f"❌ Error processing {md_file}: {e}")
    
    return total_stats


def main():
    parser = argparse.ArgumentParser(
        description='Apply image alt text from metadata to markdown files'
    )
    parser.add_argument(
        '--apply',
        action='store_true',
        help='Apply changes to files (default is dry run)'
    )
    parser.add_argument(
        '--overwrite',
        action='store_true',
        help='Replace existing alt text with metadata summary (default: skip images with alt text)'
    )
    parser.add_argument(
        '--metadata',
        default='06_image_metadata.json',
        help='Path to image metadata JSON file (default: 06_image_metadata.json)'
    )
    parser.add_argument(
        '--docs-dir',
        default='.',
        help='Path to DOCS directory (default: current directory)'
    )
    args = parser.parse_args()
    
    # Resolve paths
    script_dir = Path(__file__).parent
    metadata_path = script_dir / args.metadata
    docs_dir = script_dir if args.docs_dir == '.' else Path(args.docs_dir)
    
    # Check metadata file exists
    if not metadata_path.exists():
        # Try alternative name
        alt_metadata_path = script_dir / '06_progress.json'
        if alt_metadata_path.exists():
            metadata_path = alt_metadata_path
        else:
            print(f"❌ Metadata file not found: {metadata_path}")
            print(f"   Also tried: {alt_metadata_path}")
            return 1
    
    print(f"Loading metadata from: {metadata_path}")
    metadata = load_image_metadata(str(metadata_path))
    print(f"Loaded {len(metadata)} image entries")
    
    # Process files
    stats = process_directory(str(docs_dir), metadata, apply=args.apply, overwrite=args.overwrite)
    
    # Print summary
    print(f"\n{'=' * 60}")
    print("SUMMARY")
    print(f"{'=' * 60}")
    print(f"Files processed:              {stats['files_processed']}")
    print(f"Files modified:               {stats['files_modified']}")
    print(f"Files unchanged:              {stats['files_unchanged']}")
    print(f"")
    print(f"Total images found:           {stats['total_images']}")
    print(f"Images added (was empty):     {stats['images_updated']}")
    print(f"Images replaced (overwrite):  {stats['images_overwritten']}")
    print(f"Skipped (already has alt):    {stats['images_skipped_has_alt']}")
    print(f"Skipped (not in metadata):    {stats['images_skipped_not_in_metadata']}")
    
    if stats['errors']:
        print(f"\nErrors: {len(stats['errors'])}")
        for err in stats['errors'][:5]:
            print(f"  - {err['file']}: {err['error']}")
    
    if not args.apply:
        print(f"\n{'=' * 60}")
        print("This was a DRY RUN. No files were modified.")
        print("To apply changes, run: python 07_update_markdown.py --apply")
        print(f"{'=' * 60}")
    else:
        print(f"\n✅ Changes applied to {stats['files_modified']} files")
        
        # Save summary report
        report_path = script_dir / '07_update_report.json'
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump({
                'timestamp': datetime.now().isoformat(),
                'mode': 'apply',
                'stats': stats
            }, f, indent=2)
        print(f"📄 Report saved to: {report_path}")
    
    return 0


if __name__ == '__main__':
    exit(main())
