# Teamleader Focus AI Assistant - Agentic RAG Implementation Plan

> **Last Updated**: February 4, 2026  
> **Status**: Planning Phase  
> **Target**: Production-ready AI assistant with knowledge retrieval + action capabilities

---

## Executive Summary

This plan outlines the implementation of an **Agentic RAG** system for Teamleader Focus that:

1. **Answers support questions** using 694 documentation files
2. **Takes actions** via tool calling (create deals, search customers, etc.)
3. **Understands product structure** through structured knowledge (packages, features)
4. **Chains reasoning** for complex queries requiring multiple steps

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Tool Routing Strategy](#2-tool-routing-strategy)
3. [Data Preparation](#3-data-preparation)
4. [Knowledge Sources](#4-knowledge-sources)
5. [Implementation Phases](#5-implementation-phases)
6. [Evaluation Framework](#6-evaluation-framework)
7. [Technical Specifications](#7-technical-specifications)
8. [Risk Assessment](#8-risk-assessment)
9. [Decision Log](#9-decision-log)

---

## 1. Architecture Overview

### 1.1 System Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER QUERY                                     │
│  Examples:                                                                  │
│  • "How do I create a quotation?" (knowledge)                              │
│  • "Create a deal for Solar Systems Belgium" (action)                      │
│  • "Does SMART include subscriptions? Create a deal if it does" (hybrid)  │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AGENTIC RAG ROUTER                                  │
│                                                                             │
│  LLM analyzes query intent and plans actions:                              │
│  • Knowledge query → ragSearch tool                                        │
│  • Action query → action tools (searchCustomer, createDeal, etc.)          │
│  • Structured query → structured tools (checkFeature, comparePackages)     │
│  • Hybrid query → multi-step plan combining above                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        ▼                           ▼                           ▼
┌───────────────────┐   ┌───────────────────┐   ┌───────────────────┐
│   ACTION TOOLS    │   │  KNOWLEDGE TOOLS  │   │  STRUCTURED TOOLS │
│                   │   │                   │   │                   │
│ • searchCustomer  │   │ • ragSearch       │   │ • checkFeature    │
│ • createDeal      │   │ • getArticle      │   │ • comparePackages │
│ • createContact   │   │ • getRelatedDocs  │   │ • listBoosters    │
│ • createCompany   │   │                   │   │ • getPackageInfo  │
│ • (future tools)  │   │                   │   │                   │
└───────────────────┘   └───────────────────┘   └───────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          KNOWLEDGE SOURCES                                  │
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │  Vector Store   │  │   Link Graph    │  │ Structured JSON │             │
│  │   (Supabase)    │  │  (4,359 edges)  │  │   (Features)    │             │
│  │                 │  │                 │  │                 │             │
│  │ • 694 docs      │  │ • doc→doc refs  │  │ • Package matrix│             │
│  │ • Full-doc      │  │ • Related topics│  │ • Booster list  │             │
│  │   embeddings    │  │ • Navigation    │  │ • Feature→doc   │             │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Query Flow Examples

**Example 1: Knowledge Query**
```
User: "How do I create a quotation?"
       │
       ▼
Router: Intent = knowledge → call ragSearch
       │
       ▼
ragSearch: query="create quotation" → returns top 5 docs
       │
       ▼
LLM: Generates answer citing retrieved docs
```

**Example 2: Action Query**
```
User: "Create a deal for Solar Systems Belgium for website redesign"
       │
       ▼
Router: Intent = action → plan: [searchCustomer, createDeal]
       │
       ▼
searchCustomer: "Solar Systems Belgium" → found, id=cust_123
       │
       ▼
createDeal: title="Website redesign", customer_id=cust_123
       │
       ▼
LLM: "Found Solar Systems Belgium in Ghent! I've prepared the deal for you."
     [Button: Create Deal]
```

**Example 3: Hybrid Query**
```
User: "Does SMART include project management? If not, what package do I need?"
       │
       ▼
Router: Intent = structured + knowledge → plan: [checkFeature, ragSearch]
       │
       ▼
checkFeature: feature="project management", package="SMART"
       → { available: false, packages: ["GROW", "FLOW"] }
       │
       ▼
ragSearch: query="project management features" (for additional context)
       │
       ▼
LLM: "Project management isn't available in SMART. It's included in GROW 
      and FLOW packages. GROW gives you up to 2 active projects, while 
      FLOW offers unlimited projects. Would you like to learn more about 
      upgrading?"
```

---

## 2. Tool Routing Strategy

### 2.1 Research Summary

Based on 2025 research on Agentic RAG routing:

| Approach | Description | Performance |
|----------|-------------|-------------|
| **Static** | Fixed retrieval for all queries | Baseline, compounds errors |
| **Adaptive** | Router selects method per query | 50% fewer LLM calls |
| **Score-based** | Route by query difficulty | 6-7% accuracy improvement |

**Key Finding**: "A retrieval miss early compounds into downstream errors that derail entire tasks" (Medium, 2025)

### 2.2 Recommended Strategy: Adaptive Hybrid Routing

```
┌─────────────────────────────────────────────────────────────────┐
│                    QUERY CLASSIFICATION                         │
│                                                                 │
│  Intent signals → Routing decision                              │
│                                                                 │
│  "Create/Add/Make/Delete..." → ACTION_FIRST                    │
│  "How/What/Why/Where..." → KNOWLEDGE_FIRST                     │
│  "Does X have/include..." → STRUCTURED_FIRST                   │
│  "Create X if Y..." → HYBRID (plan multi-step)                 │
└─────────────────────────────────────────────────────────────────┘
```

**Implementation**:

```typescript
// Pseudo-code for router logic
const INTENT_PATTERNS = {
  action: /^(create|add|make|delete|update|find|search)\s/i,
  structured: /\b(package|plan|feature|booster|smart|grow|flow|include|have)\b/i,
  knowledge: /^(how|what|why|where|when|explain|tell me about)\s/i,
};

function classifyIntent(query: string): IntentType {
  // Check action patterns first (most specific)
  if (INTENT_PATTERNS.action.test(query)) return 'action';
  // Check structured data queries
  if (INTENT_PATTERNS.structured.test(query)) return 'structured';
  // Default to knowledge retrieval
  return 'knowledge';
}
```

**Why Hybrid over Pure Automatic**:

1. **Predictability**: Users understand what will happen
2. **Debuggability**: Clear routing decisions in logs
3. **Fallback safety**: Knowledge retrieval as default
4. **Cost efficiency**: Don't embed action queries unnecessarily

### 2.3 Tool Availability by Intent

| Intent | Primary Tools | Fallback |
|--------|--------------|----------|
| `action` | searchCustomer, createDeal, createContact, createCompany | ragSearch if entity not found |
| `knowledge` | ragSearch, getArticle, getRelatedDocs | None (generate from model knowledge) |
| `structured` | checkFeature, comparePackages, listBoosters | ragSearch for detailed explanations |
| `hybrid` | Planned sequence of above | Step-by-step execution with verification |

---

## 3. Data Preparation

### 3.1 Current State (Completed)

| Task | Status | Files |
|------|--------|-------|
| Image metadata generation | ✅ Complete | `06_image_metadata.json` |
| Alt text application | ✅ Complete | `07_update_markdown.py` |
| Corpus analysis | ✅ Complete | `08_corpus_analysis.ipynb`, `08_corpus_analysis.json` |

**Corpus Statistics** (from `08_corpus_analysis.json`):

```json
{
  "total_documents": 775,
  "useful_documents": 694,
  "empty_documents": 0,
  "tiny_documents": 41,
  "total_tokens": 671212,
  "avg_tokens_per_doc": 866,
  "documents_over_embedding_limit": 0,
  "quality_breakdown": {
    "useful": 694,
    "stub": 41,
    "video_reference": 40
  },
  "cost_estimates": {
    "embeddings": 0.01,
    "llm_enrichment_gemini": 0.65,
    "total_gemini": 0.66
  }
}
```

### 3.2 Pending Data Prep

| Task | Priority | Description | Output |
|------|----------|-------------|--------|
| **LLM Enrichment** | High | Generate summary, keywords, links_to, relevance_status for each doc | `09_enriched_docs.json` |
| **Link Graph** | Medium | Build doc→doc relationship graph (derived from enrichment) | `11_link_graph.json` |
| **Feature Extraction** | Deferred | Parse Features per Package into structured JSON (if A/B test shows need) | `10_feature_matrix.json` |
| **Video Enrichment** | Low | Add video descriptions to Training_Videos stubs | Future |

### 3.3 LLM Enrichment Schema

Each document will be enriched with:

```json
{
  "file": "FAQ/User_management/How_To_Adding_new_users.md",
  "original_metadata": {
    "title": "How To: Adding new users to your Teamleader Focus account",
    "url": "https://...",
    "category": "FAQ",
    "section": "User management"
  },
  "enriched": {
    "summary": "Step-by-step guide for admins to invite new team members, set permissions, and manage user access in Teamleader Focus.",
    "keywords": ["users", "team", "invite", "permissions", "admin", "access"],
    "doc_type": "how_to",
    "quality": "useful",
    "relevance_status": {
      "status": "current",
      "reason": null,
      "successor_article": null,
      "user_segments": ["all"]
    },
    "links_to": [
      { "title": "User permissions", "file": "FAQ/User_management/How_To_User_permissions.md" },
      { "title": "Teams feature", "file": "FAQ/Teams/How_To_Teams.md" }
    ],
    "related_features": ["users", "teams", "permissions"]
  }
}
```

### 3.4 Relevance Status Detection

The LLM will detect outdated articles using signals like:
- Explicit statements: "This article is only relevant if you have older plans"
- Successor links: "If you have newer plans, see *here*"
- Date references: "As of 2023..." or "Prior to the 2024 update..."
- Deprecation notices in content

**Possible status values**:

| Status | Description | Retrieval Behavior |
|--------|-------------|-------------------|
| `current` | Applies to all users | Normal ranking |
| `legacy` | Applies to older plans/versions | Deprioritize, show warning |
| `deprecated` | No longer accurate | Exclude or warn strongly |
| `partial` | Some sections outdated | Include with caveats |

**Example for legacy article**:

```json
{
  "file": "FAQ/Teamleader_Focus_Licence/Features_per_package_(GO,_MOVE_&_BOOST).md",
  "enriched": {
    "summary": "Feature comparison table for GO, MOVE, and BOOST pricing plans.",
    "relevance_status": {
      "status": "legacy",
      "reason": "Applies only to GO/MOVE/BOOST pricing plans (pre-2024). Newer SMART/GROW/FLOW plans have different feature distribution.",
      "successor_article": "FAQ/Teamleader_Focus_Licence/Features_per_package_(SMART,_GROW_&_FLOW).md",
      "user_segments": ["legacy_go_move_boost_customers"]
    }
  }
}
```

### 3.5 Feature Matrix Schema (Deferred)

> **Note**: Feature extraction is deferred until A/B testing shows hallucination issues on package/feature questions. If needed, extract from "Features per Package" documents:

```json
{
  "packages": ["GO", "MOVE", "BOOST"],
  "features": [
    {
      "name": "Subscriptions",
      "category": "Invoicing",
      "availability": {
        "GO": false,
        "MOVE": true,
        "BOOST": true
      },
      "article_id": "25691389220881",
      "article_file": "FAQ/Invoicing/How_To_Subscriptions.md",
      "description": "Recurring invoices for ongoing services"
    },
    {
      "name": "Multiple deal pipelines",
      "category": "CRM",
      "availability": {
        "GO": false,
        "MOVE": "max 2",
        "BOOST": true
      },
      "article_id": "25696017218705",
      "article_file": "FAQ/CRM/How_To_Deal_pipelines.md"
    }
  ],
  "boosters": [
    {
      "name": "Projects",
      "description": "Project management features",
      "article_id": "25695583301265"
    }
  ]
}
```

---

## 4. Knowledge Sources

### 4.1 Vector Store (Primary Retrieval)

**Database**: Supabase with pgvector extension

**Embedding Model**: OpenAI `text-embedding-3-small` (1536 dimensions)

**Embedding Strategy**: Full document with metadata header

```
[Title: How To: Adding new users to your Teamleader Focus account]
[Category: FAQ | Section: User management]
[Summary: Step-by-step guide for admins to invite new team members...]
[Keywords: users, team, invite, permissions, admin, access]
[URL: https://support.focus.teamleader.eu/hc/en-150/articles/25691234567890]

{full document content with enriched alt text}
```

**Rationale for Full-Doc Strategy**:
- No documents exceed embedding limit (8,191 tokens)
- Median doc size: 611 tokens
- Eliminates "orphan chunk" problem
- Preserves document coherence

### 4.2 Structured Data (Deterministic Queries)

**Use Cases**:
- "Does SMART include X?" → `checkFeature(feature, package)`
- "Compare GROW vs FLOW" → `comparePackages(packages[])`
- "What boosters are available?" → `listBoosters()`
- "What's included in BOOST?" → `getPackageInfo(package)`

**Benefits**:
- Zero hallucination risk (data from authoritative source)
- Instant responses (no embedding search)
- Always links to detailed documentation
- Easy to update (JSON file, no re-embedding)

### 4.3 Link Graph (Relationship Queries)

**Data**: 4,359 internal links extracted from corpus

**Use Cases**:
- "What else should I know about X?" → `getRelatedDocs(doc_id)`
- Navigation suggestions after answering
- Multi-hop reasoning for complex topics

**Schema**:

```json
{
  "nodes": [
    { "id": "FAQ/CRM/How_To_Deals.md", "title": "How To: Deals", "category": "FAQ" }
  ],
  "edges": [
    { "from": "FAQ/CRM/How_To_Deals.md", "to": "FAQ/Invoicing/How_To_Quotations.md", "context": "create quotation from deal" }
  ]
}
```

---

## 5. Implementation Phases

### Phase 1: Data Foundation (Priority: HIGH)

| Step | Task | Output | Estimated Effort |
|------|------|--------|------------------|
| 1.1 | Create LLM enrichment script | `09_enrich_docs.py` | 2-3 hours |
| 1.2 | Run enrichment on 694 useful docs | `09_enriched_docs.json` | ~$0.66, 30 min runtime |
| 1.3 | Extract Features per Package | `10_feature_matrix.json` | 2-3 hours |
| 1.4 | Build link graph from enrichment | `11_link_graph.json` | 1-2 hours |

**Milestone**: All knowledge sources prepared and validated

### Phase 2: Tool Implementation (Priority: HIGH)

| Step | Task | Output | Estimated Effort |
|------|------|--------|------------------|
| 2.1 | Implement `ragSearch` tool | `lib/tools.ts` | 2-3 hours |
| 2.2 | Implement `getRelatedDocs` tool | `lib/tools.ts` | 1-2 hours |
| 2.3 | Create tool router logic | `lib/routing.ts` | 2-3 hours |

**Deferred (A/B test first)**:
| Step | Task | Trigger |
|------|------|---------|
| 2.4 | Implement `checkFeature` tool | If hallucination on package Qs > 10% |
| 2.5 | Implement `comparePackages` tool | If users frequently ask package comparisons |

**Milestone**: Core tools functional, structured tools ready for A/B test

### Phase 3: Document Ingestion (Priority: HIGH)

| Step | Task | Output | Estimated Effort |
|------|------|--------|------------------|
| 3.1 | Create bulk ingestion script | `scripts/bulk_ingest.py` | 2-3 hours |
| 3.2 | Ingest 694 docs with metadata | Supabase populated | ~$0.01, 1 hour runtime |
| 3.3 | Verify embedding quality | Manual spot checks | 1 hour |

**Milestone**: Vector store populated and searchable

### Phase 4: System Prompt & Routing (Priority: HIGH)

| Step | Task | Output | Estimated Effort |
|------|------|--------|------------------|
| 4.1 | Design agentic system prompt | `lib/presets.ts` | 3-4 hours |
| 4.2 | Implement intent classification | `lib/routing.ts` | 2-3 hours |
| 4.3 | Add tool coordination logic | `app/api/chat/route.ts` | 3-4 hours |
| 4.4 | Sync prompt to Langfuse | Langfuse prompt | 30 min |

**Milestone**: End-to-end query handling functional

### Phase 5: Evaluation & Testing (Priority: HIGH)

| Step | Task | Output | Estimated Effort |
|------|------|--------|------------------|
| 5.1 | Create evaluation dataset | `data/eval_dataset.json` | 3-4 hours |
| 5.2 | Build evaluation script | `scripts/evaluate_rag.py` | 2-3 hours |
| 5.3 | Run baseline evaluation | Metrics report | 2 hours |
| 5.4 | Iterate on retrieval settings | Improved metrics | Ongoing |

**Milestone**: Measurable quality metrics established

### Phase 6: Polish & Production Prep (Priority: MEDIUM)

| Step | Task | Output | Estimated Effort |
|------|------|--------|------------------|
| 6.1 | Add source citations to responses | UI updates | 2-3 hours |
| 6.2 | Implement "learn more" suggestions | Link graph integration | 2-3 hours |
| 6.3 | Add conversation memory | Context management | 3-4 hours |
| 6.4 | Production hardening | Error handling, logging | 3-4 hours |

**Milestone**: Production-ready system

---

## 6. Evaluation Framework

### 6.1 Test Dataset Structure

```json
{
  "version": "1.0",
  "created": "2026-02-04",
  "questions": [
    {
      "id": "q001",
      "question": "How do I add a new user to Teamleader Focus?",
      "category": "knowledge",
      "expected_docs": ["FAQ/User_management/How_To_Adding_new_users.md"],
      "expected_keywords": ["invite", "user", "permissions"],
      "difficulty": "easy"
    },
    {
      "id": "q002", 
      "question": "Does the SMART package include subscriptions?",
      "category": "structured",
      "expected_tool": "checkFeature",
      "expected_answer_contains": ["no", "GROW", "FLOW"],
      "difficulty": "easy"
    },
    {
      "id": "q003",
      "question": "Create a deal for Bakkerij Van den Berg for a new POS system",
      "category": "action",
      "expected_tools": ["searchCustomer", "createDeal"],
      "expected_customer_found": true,
      "difficulty": "medium"
    },
    {
      "id": "q004",
      "question": "I want to send recurring invoices to my customers. What do I need?",
      "category": "hybrid",
      "expected_flow": ["checkFeature", "ragSearch"],
      "expected_mentions": ["subscriptions", "MOVE", "BOOST"],
      "difficulty": "medium"
    }
  ]
}
```

### 6.2 Metrics

**Knowledge Retrieval**:
- **Precision@K**: % of relevant docs in top K results
- **Recall@K**: % of expected docs found in top K
- **MRR**: Mean Reciprocal Rank of first relevant doc
- **Latency**: Time to retrieve (target: <500ms)

**Structured Queries**:
- **Accuracy**: Correct answer % for feature questions
- **Coverage**: % of features in matrix vs. questions asked

**Action Queries**:
- **Tool Selection Accuracy**: Correct tool(s) called
- **Parameter Extraction**: Correct values passed to tools
- **Task Completion**: End-to-end success rate

**Overall**:
- **User Satisfaction**: Manual rating of response quality
- **Hallucination Rate**: % of responses with unsupported claims
- **Source Citation**: % of responses with proper attribution

### 6.3 A/B Testing Plan

| Test | Variant A | Variant B | Metric |
|------|-----------|-----------|--------|
| Retrieval | Top-3 | Top-5 | Precision vs. context length |
| Threshold | 0.6 | 0.75 | Recall vs. noise |
| Prompt | Concise | Detailed | User preference |
| Routing | Rule-based | LLM-classified | Accuracy vs. latency |

---

## 7. Technical Specifications

### 7.1 Embedding Model Selection

| Model | Dimensions | Context | Performance | Cost | Recommendation |
|-------|------------|---------|-------------|------|----------------|
| **Voyage-3-large** | 2048 (flexible) | 32K | +9.74% vs OpenAI | ~$0.12/M | **Test for quality** |
| **text-embedding-3-small** | 1536 | 8K | Baseline | ~$0.02/M | **Start here (cheap)** |
| **text-embedding-3-large** | 3072 | 8K | +5% vs small | ~$0.13/M | Middle ground |

**Strategy**: Start with `text-embedding-3-small` for initial testing. If retrieval quality is insufficient, A/B test against `voyage-3-large`.

**OpenRouter Embeddings**: OpenRouter supports embeddings via `/api/v1/embeddings`. Consider switching for unified API access.

### 7.2 New Files to Create

| File | Purpose |
|------|---------|
| `DOCS/09_enrich_docs.py` | LLM enrichment script |
| `DOCS/09_enriched_docs.json` | Enrichment output |
| `DOCS/10_link_graph.json` | Document relationship graph (derived from enrichment) |
| `DOCS/11_extract_features.py` | Feature matrix extraction (deferred) |
| `DOCS/11_feature_matrix.json` | Structured feature data (deferred) |
| `lib/routing.ts` | Intent classification and tool routing |
| `lib/knowledge-tools.ts` | ragSearch, getRelatedDocs implementations |
| `lib/structured-tools.ts` | checkFeature, comparePackages implementations |
| `scripts/bulk_ingest.py` | Batch document ingestion |
| `data/eval_dataset.json` | Test questions and expected results |
| `scripts/evaluate_rag.py` | Evaluation runner and metrics |

### 7.2 Files to Modify

| File | Changes |
|------|---------|
| `lib/tools.ts` | Add knowledge and structured tools to exports |
| `lib/presets.ts` | Add agentic system prompt |
| `app/api/rag/chat/route.ts` | Integrate routing and multi-tool execution |
| `app/api/rag/upload/route.ts` | Support enriched metadata in uploads |
| `components/rag-lab/rag-chat.tsx` | Display source citations, "learn more" |

### 7.3 Database Schema Updates

```sql
-- Add enrichment fields to documents table
ALTER TABLE documents ADD COLUMN IF NOT EXISTS
  summary TEXT,
  keywords TEXT[],
  doc_type VARCHAR(50),
  quality VARCHAR(20),
  links_to JSONB;

-- Create feature matrix table (optional, can use JSON file)
CREATE TABLE IF NOT EXISTS feature_matrix (
  feature_name VARCHAR(100) PRIMARY KEY,
  category VARCHAR(50),
  go_availability VARCHAR(20),
  move_availability VARCHAR(20),
  boost_availability VARCHAR(20),
  article_id VARCHAR(50),
  article_file VARCHAR(200)
);

-- Create link graph table (optional, can use JSON file)
CREATE TABLE IF NOT EXISTS doc_links (
  from_doc VARCHAR(200),
  to_doc VARCHAR(200),
  link_context TEXT,
  PRIMARY KEY (from_doc, to_doc)
);
```

---

## 8. Risk Assessment

### 8.1 Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| LLM enrichment inconsistency | Medium | Medium | Validate sample, use structured output |
| Feature extraction errors | Low | High | Manual review of matrix, unit tests |
| Routing misclassification | Medium | Medium | Fallback to knowledge retrieval |
| Embedding quality issues | Low | High | A/B test strategies, monitor metrics |

### 8.2 Product Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Hallucinated package info | Medium | High | Use structured tools for features |
| Outdated documentation | Ongoing | Medium | Timestamp warnings, refresh cadence |
| User confusion (tools vs. info) | Medium | Medium | Clear UI indicators for actions |

### 8.3 Operational Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| API cost overrun | Low | Medium | Monitor via Langfuse, set alerts |
| Rate limiting | Low | Medium | Batch ingestion with delays |
| Supabase storage limits | Low | Low | 694 docs well within limits |

---

## 9. Decision Log

| Date | Decision | Rationale | Alternatives Considered |
|------|----------|-----------|------------------------|
| 2026-02-04 | Full-doc embedding (no chunking) | No docs exceed 8K tokens, eliminates orphan chunks | Markdown-aware chunking, hybrid |
| 2026-02-04 | Adaptive hybrid routing | Research shows 50% fewer LLM calls, 6-7% accuracy gain | Pure automatic, explicit only |
| 2026-02-04 | **Defer** structured tools | A/B test without them first; add if hallucination on package Qs is common | Implement upfront |
| 2026-02-04 | Link graph from enrichment | 4,359 links provide relationship context | Graph database (overkill for size) |
| 2026-02-04 | Skip video docs for now | 40 docs are stubs, add noise | Enrich with video transcripts |
| 2026-02-04 | Add `relevance_status` to enrichment | Detect legacy/outdated articles (e.g., GO/MOVE/BOOST vs SMART/GROW/FLOW) | Ignore, manual tagging |
| 2026-02-04 | Start with `text-embedding-3-small` | Cheap baseline; upgrade to Voyage-3-large if quality insufficient | Use best model from start |

---

## Appendix A: Cost Estimates

| Item | Cost |
|------|------|
| LLM enrichment (Gemini Flash, 694 docs) | ~$0.65 |
| Embeddings (OpenAI, 694 docs) | ~$0.01 |
| Ongoing API costs (per 1K queries) | ~$0.50-2.00 |
| **Total initial setup** | **~$0.66** |

---

## Appendix B: Timeline Estimates

> Note: These are rough estimates, not commitments. Actual time depends on complexity discovered during implementation.

| Phase | Estimated Duration |
|-------|-------------------|
| Phase 1: Data Foundation | 1-2 days |
| Phase 2: Tool Implementation | 2-3 days |
| Phase 3: Document Ingestion | 0.5 days |
| Phase 4: System Prompt & Routing | 1-2 days |
| Phase 5: Evaluation & Testing | 2-3 days |
| Phase 6: Polish & Production | 2-3 days |
| **Total** | **~9-14 days** |

---

## Appendix C: References

1. [Anthropic: Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval) - Prepending context to chunks
2. [Beyond Vector Search: Adaptive Retrieval Router](https://medium.com/@sumoaps/beyond-vector-search-building-an-adaptive-retrieval-router-for-agentic-ai-systems-1af6b059826f) - Agentic routing strategies
3. [HiRAG Framework](https://www.emergentmind.com/topics/hirag-framework) - Hierarchical RAG
4. [RouteRAG: Adaptive Routing](https://www.emergentmind.com/topics/routerag) - Score-based routing
5. [Agentic RAG Survey](https://arxiv.org/html/2501.09136v3) - Comprehensive 2025 survey

---

## Next Actions

When ready to proceed, the recommended order is:

1. **Review this plan** - Confirm architecture decisions ✅
2. **Create LLM enrichment script** (`09_enrich_docs.py`) - Includes relevance_status detection
3. **Run enrichment** on 694 useful docs (~$0.66)
4. **Build link graph** from enriched `links_to` data
5. **Implement core tools** (ragSearch, getRelatedDocs)
6. **Bulk ingest** enriched docs with metadata headers
7. **Build evaluation dataset** (20-30 questions, expandable later)
8. **Test and iterate** - Monitor for package/feature hallucinations
9. **(If needed)** Implement structured tools (checkFeature, comparePackages)

---

## Open Questions

- [ ] Which embedding model to start with? (Recommendation: `text-embedding-3-small` for cost, upgrade if quality issues)
- [ ] Should legacy articles be excluded entirely or shown with warnings?
- [ ] What's the threshold for adding structured tools? (Suggestion: >10% hallucination rate on package Qs)

---

*This document should be updated as decisions are made and implementation progresses.*
