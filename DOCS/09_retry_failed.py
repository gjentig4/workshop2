#!/usr/bin/env python3
"""
09_retry_failed.py - Retry failed enrichments from 09_enrich_docs.py

This script:
1. Reads the failed entries from 09_progress.json
2. Removes them from the processed list (so they get re-processed)
3. Clears the failed list
4. Runs the enrichment again for those files only

Usage:
    cd /Users/gent.thaqi/Documents/WS2/my-app/DOCS
    python3 09_retry_failed.py
"""

import json
from pathlib import Path

DOCS_PATH = Path(__file__).parent
PROGRESS_PATH = DOCS_PATH / "09_progress.json"

def main():
    print("=" * 60)
    print("RETRY FAILED ENRICHMENTS")
    print("=" * 60)
    
    # Load progress
    if not PROGRESS_PATH.exists():
        print("[ERROR] No progress file found")
        return
    
    with open(PROGRESS_PATH, 'r', encoding='utf-8') as f:
        progress = json.load(f)
    
    failed = progress.get("failed", [])
    
    if not failed:
        print("\nNo failed entries to retry!")
        return
    
    print(f"\nFound {len(failed)} failed entries:")
    for entry in failed:
        print(f"  - {entry['file']}: {entry['error'][:50]}")
    
    # Remove failed files from processed (if any were partially processed)
    failed_files = set(entry['file'] for entry in failed)
    for file in failed_files:
        if file in progress.get("processed", {}):
            del progress["processed"][file]
            print(f"  Removed from processed: {file}")
    
    # Clear the failed list
    progress["failed"] = []
    
    # Save updated progress
    with open(PROGRESS_PATH, 'w', encoding='utf-8') as f:
        json.dump(progress, f, indent=2)
    
    print(f"\nCleared {len(failed)} failed entries from progress.")
    print(f"\nNow run: python3 09_enrich_docs.py")
    print("It will automatically process only the missing files.")

if __name__ == "__main__":
    main()
