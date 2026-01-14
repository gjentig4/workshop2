---
name: RAG Lab Transformation
overview: Transform the RAG Lab from a comparison tool into a Teamleader Support Bot Builder with Langfuse prompt management, persistent profiles, and full chat history.
todos:
  - id: db-schema
    content: Add profiles table to Supabase with settings, tools, docs, prompt reference
    status: completed
  - id: langfuse-api
    content: Create /api/langfuse/prompts endpoint for list/get/create/update prompts
    status: completed
  - id: profiles-api
    content: Create /api/profiles endpoint for CRUD operations on profiles
    status: completed
  - id: rag-lab-ui
    content: Rebuild RAG Lab page with settings panel, modals, and profile management
    status: completed
  - id: prompt-modal
    content: Create PromptEditorModal with Langfuse integration (load/edit/save)
    status: completed
  - id: tools-modal
    content: Create ToolsEditorModal with collapsible tool cards and presets
    status: completed
  - id: context-preview
    content: Create CollapsibleContext component showing doc titles, expandable
    status: completed
  - id: chat-persistence
    content: Link chat messages to profiles in Supabase
    status: completed
  - id: enhance-rag-chat
    content: Update /api/rag/chat to support all new settings (reasoning, tools, etc)
    status: completed
---

# RAG Lab Transformation Plan

Transform the RAG Lab from a comparison tool into a **Teamleader Support Bot Builder** with Langfuse prompt management, persistent profiles, and full chat history.

## Architecture Overview

```mermaid
flowchart TB
    subgraph ui [RAG Lab UI]
        Header[Profile Selector + Save Button]
        Settings[Collapsible Settings Panel]
        PromptModal[System Prompt Modal]
        ToolsModal[Tools Editor Modal]
        ChatArea[Chat with Context Preview]
        DebugPanel[Debug Info]
    end
    
    subgraph apis [API Routes]
        LangfusePrompts[/api/langfuse/prompts]
        ProfilesAPI[/api/profiles]
        RAGChat[/api/rag/chat]
    end
    
    subgraph storage [Storage]
        Supabase_Profiles[profiles table]
        Supabase_Docs[documents + embeddings]
        Supabase_Messages[messages table]
        LangfuseCloud[Langfuse Prompt Management]
    end
    
    ui --> apis
    apis --> storage
```

---

## 1. Database Schema (Supabase)

New `profiles` table to store user configurations:

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  -- Model settings
  model TEXT DEFAULT 'anthropic/claude-sonnet-4.5',
  temperature REAL DEFAULT 0.7,
  reasoning_enabled BOOLEAN DEFAULT false,
  reasoning_effort TEXT DEFAULT 'medium',
  streaming_enabled BOOLEAN DEFAULT true,
  tracing_enabled BOOLEAN DEFAULT true,
  -- Langfuse prompt reference
  langfuse_prompt_name TEXT,
  langfuse_prompt_version INTEGER,
  -- Tools config (JSON array of tool definitions)
  tools_enabled BOOLEAN DEFAULT false,
  tools_config JSONB DEFAULT '[]',
  -- Structured output (optional)
  structured_output_enabled BOOLEAN DEFAULT false,
  structured_output_schema JSONB,
  -- RAG settings
  embedding_strategy TEXT DEFAULT 'document',
  top_k INTEGER DEFAULT 5,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Link documents to profiles
CREATE TABLE profile_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Update messages to link to profiles
ALTER TABLE messages ADD COLUMN profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL;
```

---

## 2. Langfuse Prompt Integration

**API Route**: `/api/langfuse/prompts`

| Method | Action | Description |

|--------|--------|-------------|

| GET | List prompts | Fetch all prompts from Langfuse |

| GET `?name=X` | Get prompt | Get specific prompt (latest or versioned) |

| POST | Create prompt | Create new prompt with name + content |

| PUT | Update prompt | Update existing prompt (creates new version) |

Uses Langfuse SDK:

- `langfuse.getPrompt(name, version?)` - fetch prompt
- `langfuse.createPrompt({ name, prompt, config })` - create/update

**Prompt Editor Modal Features**:

- Dropdown to select from existing Langfuse prompts
- Full-screen textarea for editing (long prompts)
- "Save as New" button (name + commit message)
- "Update Existing" button (commit message only)
- Version history display

---

## 3. Profile System

**API Route**: `/api/profiles`

| Method | Action | Description |

|--------|--------|-------------|

| GET | List profiles | Fetch all saved profiles |

| GET `/:id` | Get profile | Get specific profile with all settings |

| POST | Create profile | Create new profile |

| PUT `/:id` | Update profile | Update existing profile |

| DELETE `/:id` | Delete profile | Remove profile |

**UI Components**:

- Profile dropdown in header (select active profile)
- "Save Profile" button (opens modal for name input)
- Auto-save toggle (optional - save on every change)

---

## 4. RAG Lab UI Redesign

### Layout Structure

```
+------------------------------------------+
| Profile: [Dropdown ▼]  [Save Profile]    |
+------------------------------------------+
| Settings (collapsible)                   |
| ┌──────────────────────────────────────┐ |
| │ Model: [claude-sonnet-4.5 ▼]         │ |
| │ Temp: [====●====] 0.7                │ |
| │ Reasoning: [Off ▼]                   │ |
| │ Streaming: [✓]  Tracing: [✓]         │ |
| │ System Prompt: [Edit in Modal →]     │ |
| │ Tools: [Off] [Configure →]           │ |
| │ Structured Output: [Off]             │ |
| └──────────────────────────────────────┘ |
+------------------------------------------+
| Retrieved Context (collapsed by default) |
| ┌──────────────────────────────────────┐ |
| │ 📄 invoice-guide.md (0.92) [expand]  │ |
| │ 📄 billing-faq.md (0.87) [expand]    │ |
| └──────────────────────────────────────┘ |
+------------------------------------------+
| Chat Area                                |
| ┌──────────────────────────────────────┐ |
| │ [User message]                       │ |
| │ [Assistant response with markdown]   │ |
| │ ...                                  │ |
| └──────────────────────────────────────┘ |
| [Type message...] [Send]                 |
+------------------------------------------+
| Debug Panel (tokens, cost, latency)      |
+------------------------------------------+
```

### Key Components

| Component | File | Purpose |

|-----------|------|---------|

| ProfileSelector | `components/rag-lab/profile-selector.tsx` | Dropdown + save button |

| SettingsPanel | `components/rag-lab/settings-panel.tsx` | Collapsible settings |

| PromptEditorModal | `components/rag-lab/prompt-editor-modal.tsx` | Full Langfuse integration |

| ToolsEditorModal | `components/rag-lab/tools-editor-modal.tsx` | Tool cards with presets |

| ContextPreview | `components/rag-lab/context-preview.tsx` | Collapsible doc previews |

| RAGChat | `components/rag-lab/rag-chat.tsx` | Chat with history |

---

## 5. Tool Editor Modal Design

```
+------------------------------------------+
| Tools Configuration                  [X] |
+------------------------------------------+
| [+ Add Tool]                             |
|                                          |
| ┌──────────────────────────────────────┐ |
| │ ▼ search_knowledge_base (enabled)    │ |
| │   Description: Search support docs   │ |
| │   Parameters: { query: string }      │ |
| │   [Edit JSON] [Delete]               │ |
| └──────────────────────────────────────┘ |
|                                          |
| ┌──────────────────────────────────────┐ |
| │ ▶ get_customer (collapsed)           │ |
| └──────────────────────────────────────┘ |
|                                          |
| Presets: [Teamleader Support] [Basic]    |
+------------------------------------------+
| [Cancel]                    [Save Tools] |
+------------------------------------------+
```

**Features**:

- Collapsible tool cards (click to expand/edit)
- JSON editor for each tool's schema
- Preset buttons to load common tool sets
- Drag to reorder (optional)

---

## 6. Enhanced RAG Chat API

Update [app/api/rag/chat/route.ts](app/api/rag/chat/route.ts) to:

- Accept all new settings (reasoning, tools, structured output)
- Use profile's Langfuse prompt instead of inline system prompt
- Save messages to Supabase linked to profile
- Return retrieved context metadata (doc titles, scores)
- Support tool execution with RAG search as a tool

---

## 7. Document Management Updates

- Default to **whole document** embedding (not chunked)
- Documents linked to profiles via `profile_documents` table
- Documents persist across sessions (no re-upload needed)
- UI shows which docs are in current profile
- Can add/remove docs from profile

---

## 8. Files to Create/Modify

### New Files

- `app/api/langfuse/prompts/route.ts` - Langfuse prompt CRUD
- `app/api/profiles/route.ts` - Profile CRUD
- `app/api/profiles/[id]/route.ts` - Single profile operations
- `components/rag-lab/profile-selector.tsx`
- `components/rag-lab/settings-panel.tsx`
- `components/rag-lab/prompt-editor-modal.tsx`
- `components/rag-lab/tools-editor-modal.tsx`
- `components/rag-lab/context-preview.tsx`

### Modified Files

- `app/rag-lab/page.tsx` - Complete rewrite
- `app/api/rag/chat/route.ts` - Add new features
- `components/rag-lab/rag-chat.tsx` - Add history persistence
- `components/rag-lab/document-manager.tsx` - Link to profiles

---

## 9. Environment Variables Needed

```bash
# Already have
LANGFUSE_SECRET_KEY=...
LANGFUSE_PUBLIC_KEY=...
LANGFUSE_HOST=https://cloud.langfuse.com

# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

## Implementation Order

1. **Database schema** - Create tables via Supabase MCP
2. **Langfuse prompts API** - Enable prompt management
3. **Profiles API** - CRUD for profiles
4. **UI components** - Build modals and panels
5. **RAG Lab page** - Assemble everything
6. **Enhanced RAG chat** - Full feature support
7. **Testing and polish**