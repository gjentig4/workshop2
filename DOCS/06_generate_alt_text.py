#!/usr/bin/env python3
"""
07 - Generate alt text for all unique images using Gemini 3 Flash.

This script:
1. Scans all markdown files for image URLs (post-deduplication)
2. Maps URLs to local downloaded images
3. Generates structured metadata (category, summary, description) for each
4. Saves progress incrementally (resume-safe)
5. Outputs manifest for later markdown updates

Usage:
    cd /Users/gent.thaqi/Documents/WS2/my-app/DOCS
    python3 07_generate_alt_text.py

Requirements:
    - Run 01-04 scripts first (download images, deduplicate)
    - Add OPENROUTER_API_KEY=your_key_here to ../.env.local
    - pip install openai
"""

import os
import re
import json
import base64
import time
from pathlib import Path
from datetime import datetime

try:
    from openai import OpenAI
except ImportError:
    print("[ERROR] openai not installed")
    print("Run: pip install openai")
    exit(1)

# Paths
DOCS_PATH = Path(__file__).parent
IMAGES_DIR = DOCS_PATH / "_downloaded_images"
ENV_FILE = DOCS_PATH.parent / ".env.local"
MANIFEST_PATH = DOCS_PATH / "01_download_manifest.json"
OUTPUT_PATH = DOCS_PATH / "07_image_metadata.json"
PROGRESS_PATH = DOCS_PATH / "07_progress.json"

# Model configuration
MODEL = "google/gemini-3-flash-preview"

# Batch configuration
BATCH_SIZE = 10
DELAY_BETWEEN_BATCHES = 2  # seconds
DELAY_BETWEEN_REQUESTS = 0.5  # seconds

# Valid categories
CATEGORIES = [
    "tutorial_banner",
    "settings",
    "workflow_step",
    "feature_overview",
    "navigation",
    "dashboard",
    "dialog",
    "error_warning",
    "form",
    "list_table",
]

# System prompt
SYSTEM_PROMPT = """You are describing screenshots from Teamleader Focus (a CRM/business software) for a RAG knowledge base.

These descriptions will be used by an AI assistant to:
1. Find relevant images when users ask questions about features
2. Decide when to show images to help users understand the software
3. Understand the context and purpose of each screenshot

Your output must be valid JSON with this exact structure:
{
  "category": "one of: tutorial_banner, settings, workflow_step, feature_overview, navigation, dashboard, dialog, error_warning, form, list_table",
  "summary": "One-line description (~100 chars) that captures what the image shows - this will be the alt text",
  "description": "Detailed description OR null if the image is simple (like a banner)"
}

Guidelines:
- summary: Always required. Write it as if completing "This image shows..." - concise but complete
- description: Include for complex UI (settings, forms, workflows). Set to null for simple graphics/banners
- For complex images, describe: buttons (with exact labels), field values, checkbox states, dropdown selections
- Include keywords users might search for when needing this image
- Mention the feature name or workflow being demonstrated"""

USER_PROMPT = """Analyze this Teamleader Focus screenshot and provide a JSON response with category, summary, and description.

Remember:
- summary: concise alt text (~100 chars)
- description: detailed explanation for complex UI, null for simple banners/graphics
- Include button labels, field states, and the feature/action being shown"""


def load_env_file():
    """Load environment variables from .env.local file."""
    if ENV_FILE.exists():
        with open(ENV_FILE, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ[key] = value.strip().strip('"').strip("'")


def encode_image(image_path):
    """Encode image to base64."""
    with open(image_path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")


def get_image_media_type(image_path):
    """Get media type based on file extension."""
    suffix = Path(image_path).suffix.lower()
    media_types = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".webp": "image/webp",
    }
    return media_types.get(suffix, "image/png")


def parse_json_response(content):
    """Parse JSON from model response, handling markdown code blocks."""
    content = content.strip()
    
    if content.startswith("```"):
        lines = content.split("\n")
        lines = [l for l in lines if not l.strip().startswith("```")]
        content = "\n".join(lines)
    
    try:
        return json.loads(content)
    except json.JSONDecodeError as e:
        return {"error": f"JSON parse error: {e}", "raw": content}


def analyze_image(image_path, client):
    """Send image to Gemini for RAG-focused analysis."""
    base64_image = encode_image(image_path)
    media_type = get_image_media_type(image_path)
    
    try:
        completion = client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": "https://support.focus.teamleader.eu",
                "X-Title": "Teamleader Focus Documentation",
            },
            model=MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": USER_PROMPT},
                        {
                            "type": "image_url",
                            "image_url": {"url": f"data:{media_type};base64,{base64_image}"}
                        }
                    ]
                }
            ],
            max_tokens=1000,
            temperature=0.3,
            extra_body={
                "reasoning": {"effort": "low"}
            }
        )
        
        message = completion.choices[0].message
        content = message.content.strip() if message.content else ""
        
        parsed = parse_json_response(content)
        
        # Validate and normalize
        if "error" not in parsed:
            if "category" not in parsed or parsed["category"] not in CATEGORIES:
                parsed["category"] = "feature_overview"
            if "summary" not in parsed:
                parsed["summary"] = "[Missing summary]"
            if "description" not in parsed:
                parsed["description"] = None
        
        tokens = 0
        if completion.usage:
            tokens = completion.usage.total_tokens
        
        return {
            "success": "error" not in parsed,
            "data": parsed if "error" not in parsed else None,
            "error": parsed.get("error"),
            "tokens": tokens
        }
        
    except Exception as e:
        return {
            "success": False,
            "data": None,
            "error": str(e),
            "tokens": 0
        }


def get_unique_image_urls_from_markdown():
    """Scan all markdown files and extract unique image URLs."""
    image_pattern = r'!\[[^\]]*\]\((https://support\.focus\.teamleader\.eu/hc/article_attachments/\d+)\)'
    
    urls = set()
    url_locations = {}  # url -> list of files
    
    md_files = list(DOCS_PATH.rglob("*.md"))
    
    for md_file in md_files:
        try:
            content = md_file.read_text(encoding='utf-8')
            matches = re.findall(image_pattern, content)
            
            for url in matches:
                urls.add(url)
                if url not in url_locations:
                    url_locations[url] = []
                rel_path = str(md_file.relative_to(DOCS_PATH))
                if rel_path not in url_locations[url]:
                    url_locations[url].append(rel_path)
        except Exception as e:
            print(f"  [WARN] Failed to read {md_file}: {e}")
    
    return urls, url_locations


def load_progress():
    """Load progress from previous run."""
    if PROGRESS_PATH.exists():
        with open(PROGRESS_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"processed": {}, "failed": [], "last_updated": None}


def save_progress(progress):
    """Save progress for resume capability."""
    progress["last_updated"] = datetime.now().isoformat()
    with open(PROGRESS_PATH, 'w', encoding='utf-8') as f:
        json.dump(progress, f, indent=2)


def save_metadata(metadata):
    """Save final metadata manifest."""
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, indent=2)


def main():
    print("=" * 80)
    print("07 - GENERATE ALT TEXT FOR ALL IMAGES")
    print("=" * 80)
    
    # Load environment
    load_env_file()
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        print(f"\n[ERROR] OPENROUTER_API_KEY not found in {ENV_FILE}")
        return
    
    # Load download manifest for URL -> local path mapping
    print("\n[1/5] Loading download manifest...")
    if not MANIFEST_PATH.exists():
        print(f"  [ERROR] Manifest not found: {MANIFEST_PATH}")
        print("  Run 01_download_images.py first!")
        return
    
    with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
        manifest = json.load(f)
    
    url_to_path = manifest.get("url_to_path", {})
    print(f"  Loaded {len(url_to_path)} URL -> path mappings")
    
    # Get unique URLs from markdown files
    print("\n[2/5] Scanning markdown files for image URLs...")
    unique_urls, url_locations = get_unique_image_urls_from_markdown()
    print(f"  Found {len(unique_urls)} unique image URLs in markdown files")
    
    # Filter to only URLs we have downloaded
    processable_urls = [url for url in unique_urls if url in url_to_path]
    missing_urls = [url for url in unique_urls if url not in url_to_path]
    
    print(f"  Processable (have local file): {len(processable_urls)}")
    if missing_urls:
        print(f"  Missing (no local file): {len(missing_urls)}")
    
    # Load progress
    print("\n[3/5] Loading progress...")
    progress = load_progress()
    already_processed = set(progress["processed"].keys())
    
    urls_to_process = [url for url in processable_urls if url not in already_processed]
    print(f"  Already processed: {len(already_processed)}")
    print(f"  Remaining to process: {len(urls_to_process)}")
    
    if not urls_to_process:
        print("\n  All images already processed!")
        # Generate final output
        save_metadata({
            "generated_at": datetime.now().isoformat(),
            "model": MODEL,
            "total_images": len(processable_urls),
            "images": progress["processed"]
        })
        print(f"  Metadata saved to: {OUTPUT_PATH}")
        return
    
    # Initialize client
    print("\n[4/5] Initializing OpenRouter client...")
    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=api_key,
    )
    
    # Process images
    print(f"\n[5/5] Processing {len(urls_to_process)} images...")
    print(f"  Batch size: {BATCH_SIZE}")
    print(f"  Delay between batches: {DELAY_BETWEEN_BATCHES}s")
    print()
    
    total_tokens = 0
    success_count = 0
    fail_count = 0
    
    for batch_idx in range(0, len(urls_to_process), BATCH_SIZE):
        batch = urls_to_process[batch_idx:batch_idx + BATCH_SIZE]
        batch_num = batch_idx // BATCH_SIZE + 1
        total_batches = (len(urls_to_process) + BATCH_SIZE - 1) // BATCH_SIZE
        
        print(f"--- Batch {batch_num}/{total_batches} ---")
        
        for i, url in enumerate(batch):
            local_path = url_to_path[url]
            filename = Path(local_path).name
            
            # Check if file exists
            if not Path(local_path).exists():
                print(f"  [{batch_idx + i + 1}] SKIP (file missing): {filename}")
                progress["failed"].append({"url": url, "error": "File not found"})
                fail_count += 1
                continue
            
            print(f"  [{batch_idx + i + 1}/{len(urls_to_process)}] {filename}...", end=" ", flush=True)
            
            result = analyze_image(local_path, client)
            
            if result["success"]:
                progress["processed"][url] = {
                    "category": result["data"]["category"],
                    "summary": result["data"]["summary"],
                    "description": result["data"]["description"],
                    "local_file": local_path,
                    "locations": url_locations.get(url, [])
                }
                total_tokens += result["tokens"]
                success_count += 1
                
                cat = result["data"]["category"]
                summary_preview = result["data"]["summary"][:50] + "..." if len(result["data"]["summary"]) > 50 else result["data"]["summary"]
                print(f"OK [{cat}] {summary_preview}")
            else:
                progress["failed"].append({"url": url, "error": result["error"]})
                fail_count += 1
                print(f"FAIL: {result['error'][:50]}")
            
            # Small delay between requests
            if i < len(batch) - 1:
                time.sleep(DELAY_BETWEEN_REQUESTS)
        
        # Save progress after each batch
        save_progress(progress)
        
        # Delay between batches
        if batch_idx + BATCH_SIZE < len(urls_to_process):
            print(f"  Batch complete. Waiting {DELAY_BETWEEN_BATCHES}s...")
            time.sleep(DELAY_BETWEEN_BATCHES)
    
    # Generate final metadata
    print("\n" + "=" * 80)
    print("COMPLETE")
    print("=" * 80)
    
    metadata = {
        "generated_at": datetime.now().isoformat(),
        "model": MODEL,
        "total_images": len(progress["processed"]),
        "images": progress["processed"]
    }
    save_metadata(metadata)
    
    print(f"\nResults:")
    print(f"  Successful: {success_count}")
    print(f"  Failed: {fail_count}")
    print(f"  Total tokens used: {total_tokens}")
    print(f"  Estimated cost: ${total_tokens * 0.0000035:.2f}")  # Rough estimate
    
    # Category distribution
    categories = {}
    for data in progress["processed"].values():
        cat = data["category"]
        categories[cat] = categories.get(cat, 0) + 1
    
    print(f"\nCategory distribution:")
    for cat, count in sorted(categories.items(), key=lambda x: -x[1]):
        print(f"  {cat}: {count}")
    
    print(f"\nOutput files:")
    print(f"  Metadata: {OUTPUT_PATH}")
    print(f"  Progress: {PROGRESS_PATH}")
    
    print("\nNext step: Run 08_update_markdown.py to add alt text to markdown files")
    print("=" * 80)


if __name__ == "__main__":
    main()
