#!/usr/bin/env python3
"""
09 - Enrich documentation with LLM-generated metadata for RAG.

This script:
1. Scans all markdown files in the DOCS directory
2. Parses YAML frontmatter and content
3. Generates enriched metadata via OpenRouter (summary, keywords, etc.)
4. Saves progress incrementally (resume-safe)
5. Outputs enriched manifest for embedding ingestion

Usage:
    cd /Users/gent.thaqi/Documents/WS2/my-app/DOCS
    
    # Test run (10 docs)
    python3 09_enrich_docs.py --test
    
    # Full run
    python3 09_enrich_docs.py
    
    # Resume interrupted run
    python3 09_enrich_docs.py  # Automatically resumes from progress

Requirements:
    - OPENROUTER_API_KEY in ../.env.local
    - pip install openai pyyaml
"""

import os
import re
import json
import time
import argparse
from pathlib import Path
from datetime import datetime

try:
    from openai import OpenAI
except ImportError:
    print("[ERROR] openai not installed")
    print("Run: pip install openai")
    exit(1)

try:
    import yaml
    HAS_YAML = True
except ImportError:
    print("[WARN] pyyaml not installed, using simple parser")
    print("For better YAML parsing: pip install pyyaml")
    HAS_YAML = False

# ============================================================================
# Configuration
# ============================================================================

DOCS_PATH = Path(__file__).parent
ENV_FILE = DOCS_PATH.parent / ".env.local"
OUTPUT_PATH = DOCS_PATH / "09_enriched_docs.json"
PROGRESS_PATH = DOCS_PATH / "09_progress.json"
CORPUS_ANALYSIS_PATH = DOCS_PATH / "08_corpus_analysis.json"

# Model configuration - using Gemini Flash for cost efficiency
MODEL = "google/gemini-3-flash-preview"

# Batch configuration
BATCH_SIZE = 5  # Save progress every N docs
DELAY_BETWEEN_REQUESTS = 0.3  # seconds
DELAY_BETWEEN_BATCHES = 1  # seconds

# Directories to skip
SKIP_DIRS = {"_downloaded_images", "__pycache__", ".git", "node_modules"}

# Valid doc types
DOC_TYPES = ["how_to", "faq", "reference", "troubleshooting", "announcement", "comparison", "overview"]

# Valid quality values
QUALITY_VALUES = ["useful", "stub", "video_reference", "empty"]

# Valid relevance statuses
RELEVANCE_STATUSES = ["current", "legacy", "deprecated", "partial"]

# ============================================================================
# Prompts
# ============================================================================

SYSTEM_PROMPT = """You are analyzing documentation articles from Teamleader Focus (a CRM/business software) for a RAG knowledge base.

Your task is to generate metadata that will improve retrieval and help an AI assistant answer user questions accurately.

Output ONLY valid JSON with this exact structure:
{
  "summary": "2-3 sentence summary of what this article covers and helps users accomplish",
  "keywords": ["keyword1", "keyword2", ...],
  "doc_type": "how_to|faq|reference|troubleshooting|announcement|comparison|overview",
  "quality": "useful|stub|video_reference|empty",
  "relevance_status": {
    "status": "current|legacy|deprecated|partial",
    "reason": "Explanation if not current, null otherwise",
    "successor_article": "Filename if this article references a newer version, null otherwise"
  },
  "links_to": [
    {"title": "Linked article title", "url": "URL from the link"}
  ],
  "question_variations": [
    "How would a user ask about this topic?",
    "Alternative phrasing of the same question",
    "Another way to ask this"
  ],
  "user_intent": "What problem is the user trying to solve when they need this article?"
}

Guidelines:
- summary: Capture the core purpose. Start with "This article explains/shows/describes..."
- keywords: 5-10 relevant terms users might search for. Include feature names, actions, UI elements.
- doc_type: 
  - how_to: Step-by-step instructions
  - faq: Q&A format or "Frequently Asked Questions"
  - reference: Feature documentation, settings explanation
  - troubleshooting: Problem-solving, error resolution
  - announcement: News, updates, release notes
  - comparison: Comparing options, packages, features
  - overview: General introduction to a topic
- quality:
  - useful: Substantial content with real information
  - stub: Very short, placeholder, or minimal content (<50 words of body)
  - video_reference: Primarily a video embed with little text
  - empty: No meaningful content
- relevance_status:
  - current: Applies to all users
  - legacy: Only for older pricing plans (GO/MOVE/BOOST) or deprecated features
  - deprecated: No longer accurate or applicable
  - partial: Some sections outdated
  - Look for phrases like "older plans", "if you have GO/MOVE/BOOST", "prior to", "no longer available"
- links_to: Extract internal links to other Teamleader Focus documentation articles
- question_variations: 3-5 natural questions users might ask that this article answers
- user_intent: One sentence describing the user's goal/problem"""

USER_PROMPT_TEMPLATE = """Analyze this Teamleader Focus documentation article and generate the JSON metadata.

TITLE: {title}
CATEGORY: {category}
SECTION: {section}
URL: {url}

CONTENT:
{content}

Remember to output ONLY valid JSON."""

# ============================================================================
# Helper Functions
# ============================================================================

def load_env_file():
    """Load environment variables from .env.local file."""
    if ENV_FILE.exists():
        with open(ENV_FILE, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ[key] = value.strip().strip('"').strip("'")


def parse_frontmatter_simple(yaml_text: str) -> dict:
    """Simple YAML parser for frontmatter (fallback when PyYAML not available)."""
    result = {}
    for line in yaml_text.strip().split('\n'):
        if ':' in line:
            key, _, value = line.partition(':')
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            if value:
                result[key] = value
    return result


def parse_markdown_file(file_path: Path) -> dict:
    """Parse markdown file to extract frontmatter and content."""
    try:
        content = file_path.read_text(encoding='utf-8')
    except Exception as e:
        return {"error": f"Failed to read file: {e}"}
    
    frontmatter = {}
    body = content
    
    # Extract YAML frontmatter
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            try:
                if HAS_YAML:
                    frontmatter = yaml.safe_load(parts[1]) or {}
                else:
                    frontmatter = parse_frontmatter_simple(parts[1])
                body = parts[2].strip()
            except Exception:
                pass
    
    return {
        "frontmatter": frontmatter,
        "body": body,
        "char_count": len(body),
        "word_count": len(body.split())
    }


def parse_json_response(content: str) -> dict:
    """Parse JSON from model response, handling markdown code blocks."""
    content = content.strip()
    
    # Remove markdown code blocks if present
    if content.startswith("```"):
        lines = content.split("\n")
        lines = [l for l in lines if not l.strip().startswith("```")]
        content = "\n".join(lines)
    
    # Try to find JSON object in response
    try:
        return json.loads(content)
    except json.JSONDecodeError:
        # Try to extract JSON from response
        match = re.search(r'\{[\s\S]*\}', content)
        if match:
            try:
                return json.loads(match.group())
            except json.JSONDecodeError:
                pass
        return {"error": f"JSON parse error", "raw": content[:500]}


def validate_enrichment(data: dict) -> dict:
    """Validate and normalize enrichment data."""
    # Ensure required fields exist with defaults
    validated = {
        "summary": data.get("summary", "[Missing summary]"),
        "keywords": data.get("keywords", [])[:10],  # Max 10 keywords
        "doc_type": data.get("doc_type", "reference"),
        "quality": data.get("quality", "useful"),
        "relevance_status": data.get("relevance_status", {
            "status": "current",
            "reason": None,
            "successor_article": None
        }),
        "links_to": data.get("links_to", [])[:20],  # Max 20 links
        "question_variations": data.get("question_variations", [])[:5],  # Max 5
        "user_intent": data.get("user_intent", "")
    }
    
    # Validate doc_type
    if validated["doc_type"] not in DOC_TYPES:
        validated["doc_type"] = "reference"
    
    # Validate quality
    if validated["quality"] not in QUALITY_VALUES:
        validated["quality"] = "useful"
    
    # Validate relevance_status
    rs = validated["relevance_status"]
    if isinstance(rs, dict):
        if rs.get("status") not in RELEVANCE_STATUSES:
            rs["status"] = "current"
    else:
        validated["relevance_status"] = {"status": "current", "reason": None, "successor_article": None}
    
    return validated


def enrich_document(doc_data: dict, client: OpenAI) -> dict:
    """Send document to LLM for enrichment."""
    frontmatter = doc_data.get("frontmatter", {})
    body = doc_data.get("body", "")
    
    # Truncate body if too long (keep first ~6000 chars to stay within context)
    if len(body) > 6000:
        body = body[:6000] + "\n\n[... content truncated for processing ...]"
    
    user_prompt = USER_PROMPT_TEMPLATE.format(
        title=frontmatter.get("title", "Untitled"),
        category=frontmatter.get("category", "Unknown"),
        section=frontmatter.get("section", "Unknown"),
        url=frontmatter.get("url", ""),
        content=body
    )
    
    try:
        completion = client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": "https://support.focus.teamleader.eu",
                "X-Title": "Teamleader Focus Documentation",
            },
            model=MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt}
            ],
            max_tokens=1500,
            temperature=0.3,
            response_format={"type": "json_object"}
        )
        
        message = completion.choices[0].message
        content = message.content.strip() if message.content else "{}"
        
        parsed = parse_json_response(content)
        
        tokens = 0
        if completion.usage:
            tokens = completion.usage.total_tokens
        
        if "error" in parsed:
            return {
                "success": False,
                "data": None,
                "error": parsed.get("error"),
                "tokens": tokens
            }
        
        validated = validate_enrichment(parsed)
        
        return {
            "success": True,
            "data": validated,
            "error": None,
            "tokens": tokens
        }
        
    except Exception as e:
        return {
            "success": False,
            "data": None,
            "error": str(e),
            "tokens": 0
        }


def get_markdown_files() -> list:
    """Get all markdown files in DOCS directory."""
    md_files = []
    
    for md_file in DOCS_PATH.rglob("*.md"):
        # Skip files in excluded directories
        if any(skip_dir in md_file.parts for skip_dir in SKIP_DIRS):
            continue
        
        # Skip files starting with numbers (scripts, plans)
        if md_file.name[0].isdigit() and md_file.name[:2] in ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"]:
            continue
        
        # Skip plan files and this script's outputs
        if md_file.name.endswith(('.plan.md', '_PLAN.md')):
            continue
            
        md_files.append(md_file)
    
    return sorted(md_files)


def load_progress() -> dict:
    """Load progress from previous run."""
    if PROGRESS_PATH.exists():
        with open(PROGRESS_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"processed": {}, "failed": [], "last_updated": None, "total_tokens": 0}


def save_progress(progress: dict):
    """Save progress for resume capability."""
    progress["last_updated"] = datetime.now().isoformat()
    with open(PROGRESS_PATH, 'w', encoding='utf-8') as f:
        json.dump(progress, f, indent=2)


def save_output(progress: dict):
    """Save final enriched docs manifest."""
    output = {
        "generated_at": datetime.now().isoformat(),
        "model": MODEL,
        "total_documents": len(progress["processed"]),
        "total_tokens": progress.get("total_tokens", 0),
        "documents": progress["processed"]
    }
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2)


def load_corpus_analysis() -> dict:
    """Load corpus analysis to get quality flags."""
    if CORPUS_ANALYSIS_PATH.exists():
        with open(CORPUS_ANALYSIS_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}


# ============================================================================
# Main
# ============================================================================

def main():
    parser = argparse.ArgumentParser(
        description='Enrich documentation with LLM-generated metadata for RAG'
    )
    parser.add_argument(
        '--test',
        action='store_true',
        help='Test mode: only process first 10 documents'
    )
    parser.add_argument(
        '--limit',
        type=int,
        default=None,
        help='Limit number of documents to process'
    )
    parser.add_argument(
        '--skip-video',
        action='store_true',
        help='Skip Training_Videos category (mostly stubs)'
    )
    args = parser.parse_args()
    
    print("=" * 80)
    print("09 - ENRICH DOCUMENTATION FOR RAG")
    print("=" * 80)
    
    if args.test:
        print("\n[TEST MODE] Will only process 10 documents")
    
    # Load environment
    load_env_file()
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        print(f"\n[ERROR] OPENROUTER_API_KEY not found in {ENV_FILE}")
        return
    
    # Get all markdown files
    print("\n[1/5] Scanning for markdown files...")
    all_files = get_markdown_files()
    print(f"  Found {len(all_files)} markdown files")
    
    # Filter if needed
    if args.skip_video:
        original_count = len(all_files)
        all_files = [f for f in all_files if "Training_Videos" not in str(f)]
        print(f"  Skipped Training_Videos: {original_count - len(all_files)} files")
    
    # Load progress
    print("\n[2/5] Loading progress...")
    progress = load_progress()
    already_processed = set(progress["processed"].keys())
    
    # Determine files to process
    files_to_process = []
    for f in all_files:
        rel_path = str(f.relative_to(DOCS_PATH))
        if rel_path not in already_processed:
            files_to_process.append(f)
    
    print(f"  Already processed: {len(already_processed)}")
    print(f"  Remaining to process: {len(files_to_process)}")
    
    # Apply limits
    if args.test:
        files_to_process = files_to_process[:10]
        print(f"  [TEST] Limited to: {len(files_to_process)}")
    elif args.limit:
        files_to_process = files_to_process[:args.limit]
        print(f"  [LIMIT] Limited to: {len(files_to_process)}")
    
    if not files_to_process:
        print("\n  All documents already processed!")
        save_output(progress)
        print(f"  Output saved to: {OUTPUT_PATH}")
        return
    
    # Initialize client
    print("\n[3/5] Initializing OpenRouter client...")
    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=api_key,
    )
    print(f"  Model: {MODEL}")
    
    # Process documents
    print(f"\n[4/5] Processing {len(files_to_process)} documents...")
    print(f"  Batch size: {BATCH_SIZE}")
    print(f"  Progress saved every {BATCH_SIZE} docs")
    print()
    
    total_tokens = progress.get("total_tokens", 0)
    success_count = 0
    fail_count = 0
    
    for batch_idx in range(0, len(files_to_process), BATCH_SIZE):
        batch = files_to_process[batch_idx:batch_idx + BATCH_SIZE]
        batch_num = batch_idx // BATCH_SIZE + 1
        total_batches = (len(files_to_process) + BATCH_SIZE - 1) // BATCH_SIZE
        
        print(f"--- Batch {batch_num}/{total_batches} ---")
        
        for i, file_path in enumerate(batch):
            rel_path = str(file_path.relative_to(DOCS_PATH))
            display_name = rel_path[:60] + "..." if len(rel_path) > 60 else rel_path
            
            print(f"  [{batch_idx + i + 1}/{len(files_to_process)}] {display_name}...", end=" ", flush=True)
            
            # Parse the file
            doc_data = parse_markdown_file(file_path)
            if "error" in doc_data:
                print(f"SKIP: {doc_data['error']}")
                progress["failed"].append({"file": rel_path, "error": doc_data["error"]})
                fail_count += 1
                continue
            
            # Enrich with LLM
            result = enrich_document(doc_data, client)
            
            if result["success"]:
                progress["processed"][rel_path] = {
                    "original_metadata": doc_data["frontmatter"],
                    "enriched": result["data"],
                    "stats": {
                        "char_count": doc_data["char_count"],
                        "word_count": doc_data["word_count"]
                    }
                }
                total_tokens += result["tokens"]
                success_count += 1
                
                doc_type = result["data"]["doc_type"]
                quality = result["data"]["quality"]
                status = result["data"]["relevance_status"]["status"]
                
                print(f"OK [{doc_type}] [{quality}] [{status}]")
            else:
                progress["failed"].append({"file": rel_path, "error": result["error"]})
                fail_count += 1
                error_msg = result["error"][:50] if result["error"] else "Unknown"
                print(f"FAIL: {error_msg}")
            
            # Small delay between requests
            if i < len(batch) - 1:
                time.sleep(DELAY_BETWEEN_REQUESTS)
        
        # Save progress after each batch
        progress["total_tokens"] = total_tokens
        save_progress(progress)
        print(f"  [Saved progress: {len(progress['processed'])} docs]")
        
        # Delay between batches
        if batch_idx + BATCH_SIZE < len(files_to_process):
            time.sleep(DELAY_BETWEEN_BATCHES)
    
    # Generate final output
    print("\n[5/5] Generating output...")
    save_output(progress)
    
    # Summary
    print("\n" + "=" * 80)
    print("COMPLETE")
    print("=" * 80)
    
    print(f"\nResults:")
    print(f"  Successful: {success_count}")
    print(f"  Failed: {fail_count}")
    print(f"  Total processed: {len(progress['processed'])}")
    print(f"  Total tokens used: {total_tokens:,}")
    
    # Estimate cost (Gemini Flash pricing ~$0.075/1M input, ~$0.30/1M output)
    estimated_cost = total_tokens * 0.0001  # Rough average
    print(f"  Estimated cost: ${estimated_cost:.2f}")
    
    # Distribution stats
    if progress["processed"]:
        doc_types = {}
        qualities = {}
        statuses = {}
        
        for data in progress["processed"].values():
            enriched = data.get("enriched", {})
            
            dt = enriched.get("doc_type", "unknown")
            doc_types[dt] = doc_types.get(dt, 0) + 1
            
            q = enriched.get("quality", "unknown")
            qualities[q] = qualities.get(q, 0) + 1
            
            rs = enriched.get("relevance_status", {})
            s = rs.get("status", "unknown") if isinstance(rs, dict) else "unknown"
            statuses[s] = statuses.get(s, 0) + 1
        
        print(f"\nDoc type distribution:")
        for dt, count in sorted(doc_types.items(), key=lambda x: -x[1]):
            print(f"  {dt}: {count}")
        
        print(f"\nQuality distribution:")
        for q, count in sorted(qualities.items(), key=lambda x: -x[1]):
            print(f"  {q}: {count}")
        
        print(f"\nRelevance status distribution:")
        for s, count in sorted(statuses.items(), key=lambda x: -x[1]):
            print(f"  {s}: {count}")
        
        # Count question variations
        total_questions = sum(
            len(d.get("enriched", {}).get("question_variations", []))
            for d in progress["processed"].values()
        )
        print(f"\nTotal question variations generated: {total_questions}")
    
    print(f"\nOutput files:")
    print(f"  Enriched docs: {OUTPUT_PATH}")
    print(f"  Progress: {PROGRESS_PATH}")
    
    if args.test:
        print("\n[TEST MODE] Run without --test to process all documents")
    
    print("\nNext step: Build link graph and ingest into vector store")
    print("=" * 80)


if __name__ == "__main__":
    main()
