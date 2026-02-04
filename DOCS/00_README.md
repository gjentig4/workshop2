# RAG Knowledge Base - Teamleader Focus Documentation

## Overview

This folder contains 775 markdown documentation files scraped from Teamleader Focus's Zendesk support site, prepared for a RAG (Retrieval-Augmented Generation) system. The goal is to power an AI assistant that can answer questions about Teamleader Focus using these docs.

## Quick Stats

| Content | Count |
|---------|-------|
| Total markdown files | 775 |
| Accessible (public) | 730 (94%) |
| Restricted (login required) | 44 (6%) |
| Unique image URLs in docs | 1,692 |
| Successfully downloaded | 1,552 (92%) |
| Failed downloads (restricted) | 140 (8%) |
| Images with alt text in markdown | 2,349 (94% of all refs) |
| Images without alt text | 150 (restricted, no metadata) |

## The Journey

### Phase 1: Data Collection & Cleaning

**Problem:** The scraped docs had 2,444 image references, but many were duplicates (same image used across multiple articles).

**Solution:** 
1. Downloaded all images locally for analysis (2,343 succeeded, 101 failed - restricted)
2. Used perceptual hashing (pHash) to find duplicates - not just identical URLs, but visually identical images
3. Found 792 duplicate references pointing to the same images
4. Replaced duplicates with canonical URLs in markdown files
5. Final count: **1,692 unique URLs** in docs (1,552 downloadable + 140 restricted)

### Phase 2: Accessibility Check

**Problem:** Some docs are behind login walls (restricted content for specific customer tiers).

**Solution:** Used `cloudscraper` to bypass Cloudflare and check each file's HTTP status.

**Finding:** Strong correlation between restricted files and failed image downloads - makes sense, they're protected content.

### Phase 3: Image Alt Text for RAG

**The Challenge:** Images had empty alt text (`![](...)`). For a RAG system where an AI assistant might want to show users relevant screenshots, we needed meaningful descriptions.

**Key Insight:** Traditional accessibility alt text ("image of a button") isn't ideal for RAG. We needed descriptions optimized for:
- **Retrieval:** Keywords users might search for
- **Context:** What feature/workflow the image demonstrates
- **Decision-making:** Help the AI know *when* to show an image

**Approach:** Used Gemini 3 Flash via OpenRouter to analyze each image with a RAG-focused prompt. Output structured data:
```json
{
  "category": "settings|form|workflow_step|dialog|...",
  "summary": "One-line description for alt text (~100 chars)",
  "description": "Detailed explanation for complex UI, null for banners"
}
```

**Results:**
- Processed 1,552 downloadable images (100% success after retries)
- 140 images remain without alt text (restricted/failed downloads)
- Categories help the assistant decide when to show images
- Summaries go into markdown alt text
- Descriptions provide rich context for retrieval

### Image Categories Distribution

| Category | Count | % | Use Case |
|----------|-------|---|----------|
| form | 275 | 18% | Data entry, dialogs |
| feature_overview | 256 | 16% | Feature explanations |
| workflow_step | 225 | 14% | Process walkthroughs |
| settings | 214 | 14% | Configuration screens |
| dialog | 206 | 13% | Modal windows, popups |
| list_table | 147 | 9% | Data displays, grids |
| navigation | 142 | 9% | Menus, sidebars |
| error_warning | 42 | 3% | Error messages, alerts |
| tutorial_banner | 37 | 2% | Section headers (HOW TO, FAQ) |
| dashboard | 15 | 1% | Overview screens |

### Phase 4: Apply Alt Text to Markdown

**Problem:** The AI-generated summaries existed in `06_image_metadata.json` but weren't yet in the actual markdown files.

**Solution:** Created `07_update_markdown.py` to inject summaries as alt text into all markdown files.

**Results:**
- Files processed: 775
- Files modified: 611 (79%)
- Files unchanged: 164 (no images or restricted-only)
- Images updated: 2,349 total
  - Added alt text (was empty): 2,262
  - Replaced existing alt text: 87
- Skipped (not in metadata): 150 (restricted images)

## Workflow Scripts

Run in order:

| Script | Purpose | Output |
|--------|---------|--------|
| `01_download_images.py` | Download all images locally | `01_download_manifest.json`, `_downloaded_images/` |
| `02_find_restricted_files.py` | Find files with failed image downloads | `02_restricted_files_report.json` |
| `03_analyze_dedup.py` | Find duplicate images via pHash | `03_image_dedup_report.json` |
| `04_replace_image_urls.py` | Replace duplicate URLs with canonical | Modifies markdown in-place |
| `05_check_all_accessibility.py` | Check which files are publicly accessible | `05_accessibility_report.csv` |
| `06_generate_alt_text.py` | Generate RAG-optimized image descriptions | `06_image_metadata.json` |
| `07_update_markdown.py` | Apply alt text summaries to markdown files | `07_update_report.json` |
| `08_corpus_analysis.ipynb` | Analyze corpus for RAG: sizes, costs, quality | `08_corpus_analysis.json` |

## Output Files

| File | Size | Description |
|------|------|-------------|
| `06_image_metadata.json` | 1.5 MB | Image URL → category, summary, description, locations |
| `06_progress.json` | 1.5 MB | Processing progress (for resume capability) |
| `07_update_report.json` | ~2 KB | Alt text update statistics and summary |
| `08_corpus_analysis.json` | ~2 KB | Corpus analysis summary: sizes, costs, quality |
| `_downloaded_images/` | ~200 MB | Local cache of all images |

## RAG Implementation Notes

### For the AI Assistant

The `06_image_metadata.json` manifest enables:

1. **Image Retrieval:** Search descriptions to find relevant screenshots
2. **Smart Display:** Use `category` to decide when images add value
3. **Context Injection:** Include `description` in prompts for complex UI explanations

### Markdown Alt Text

Summaries have been inserted as alt text (via `07_update_markdown.py`):
```markdown
# Before
![](https://support.focus.teamleader.eu/hc/article_attachments/12345)

# After  
![The 'Invite User' dialog box for adding new team members](https://support.focus.teamleader.eu/hc/article_attachments/12345)
```

### Content Recommendations

| Use Case | Files to Include |
|----------|------------------|
| Public RAG (all users) | 730 accessible files |
| Extended RAG (premium) | +44 restricted files |

## Dependencies

```bash
pip install cloudscraper imagehash pillow requests openai
```

## Next Steps

1. ✅ Image deduplication (792 duplicates → canonical URLs)
2. ✅ Alt text generation (1,552 images processed)
3. ✅ Apply alt text to markdown files (2,349 images updated)
4. 🔄 Corpus analysis and LLM enrichment (summaries, keywords, quality flags)
5. 🔄 Generate embeddings and build retrieval index

## Technical Notes

- **Alt text generation model:** `google/gemini-3-flash-preview` via OpenRouter
- **Cost:** ~$4 for 1,552 images (~1,600 tokens/image avg)
- **Processing time:** ~40 minutes with rate limiting
- **Resume-safe:** Progress saved after each batch of 10

---

*Last updated: February 4, 2026*
