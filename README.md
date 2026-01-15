# Teamleader AI Workshop

An educational application for learning LLM concepts, RAG (Retrieval-Augmented Generation), and building AI-powered applications. Built for the Teamleader Focus AI Workshop.

## Features

### AI Playground
Experiment with LLM capabilities without RAG:
- **Model Selection**: Use any model from [OpenRouter](https://openrouter.ai/models) (200+ models available)
- **Temperature Control**: Adjust response randomness (0.0-2.0)
- **Streaming**: Watch responses generate in real-time
- **System Prompts**: Configure AI persona and behavior
- **Tool Calling**: Test function calling with demo tools (datetime, weather)
- **Structured Output**: Force JSON schema responses
- **Reasoning Mode**: Enable extended thinking for complex tasks
- **Debug Panel**: View token counts, latency, and API details

### RAG Lab
Build and query your own knowledge base:
- **Document Upload**: Upload markdown/text files for embedding
- **Embedding Strategies**: Store as chunks, full documents, or both
- **Semantic Search**: Query documents using vector similarity
- **Retrieval Settings**: Configure Top K results and similarity threshold
- **Learning Mode**: Interactive guided learning with suggested questions

### Observability
- **Langfuse Integration**: Full tracing, logging, and prompt management
- **Token Tracking**: Monitor usage and costs per request
- **Prompt Versioning**: Update prompts without code deployments

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: Tailwind CSS, Radix UI, Lucide Icons
- **LLM Provider**: OpenRouter API
- **Embeddings**: OpenAI `text-embedding-3-small`
- **Vector Database**: Supabase with pgvector
- **Observability**: Langfuse

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account (for vector database)
- OpenRouter API key
- OpenAI API key (for embeddings)
- Langfuse account (optional, for tracing)

### Environment Variables

Create a `.env.local` file:

```bash
OPENROUTER_API_KEY=your_openrouter_key
OPENAI_API_KEY=your_openai_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
LANGFUSE_PUBLIC_KEY=your_langfuse_public_key
LANGFUSE_SECRET_KEY=your_langfuse_secret_key
LANGFUSE_HOST=https://cloud.langfuse.com
```

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start exploring.

## Key Concepts Covered

### Prompt Engineering
- **CRAFT Framework**: Context, Role, Action, Format, Tone
- **XML Tags**: Structured prompt organization
- **Prompt Caching**: Up to 90% cost savings with cache-friendly structure

### RAG Architecture
- **Embeddings**: Converting text to vectors for semantic search
- **Chunking**: Splitting documents for precise retrieval
- **Vector Search**: Finding relevant context using similarity

### Tool Calling
- **ReAct Pattern**: Reason → Act → Observe → Answer
- **Parallel Execution**: Multiple tool calls in single request
- **Demo Tools**: `get_current_datetime` (real) and `get_weather` (mock)

### Cost Optimization
- Prompt caching structure (static content first, dynamic last)
- Smart retrieval (fewer, better chunks)
- Model selection based on task complexity

## Sample Documents

Sample documents for testing RAG are available in:
- `/DOCS` folder in this repository
- [Google Drive](https://drive.google.com/drive/folders/11uYOmzhfKrwqoacIDTjd8f3-kwYRKl4V?usp=sharing)

## Contributing

We welcome contributions! High-impact areas include:

1. **Streaming + Tool Calls**: Implement hybrid streaming that pauses for tool execution
2. **OpenRouter Embeddings**: Replace OpenAI embeddings with OpenRouter's unified API
3. **Profiles System**: Improve configuration saving/sharing (`/api/profiles`)
4. **Learning Mode Questions**: Add practical examples to `learning-mode-panel.tsx`
5. **Workshop Prompt**: Update the guide in `/lib/presets.ts`

**Important**: When making changes that affect functionality, update the `workshop-guide` prompt in Langfuse! The prompt source lives in `/lib/presets.ts`.

## Project Structure

```
app/
├── api/
│   ├── chat/          # Playground chat endpoint
│   ├── rag/           # RAG chat and embeddings
│   └── profiles/      # User configuration profiles
├── playground/        # AI Playground page
└── rag-lab/          # RAG Lab page

components/
├── playground/        # Playground UI components
├── rag-lab/          # RAG Lab UI components
├── shared/           # Shared components (navigation, message bubble)
└── ui/               # Base UI components (shadcn/ui)

lib/
├── embeddings.ts     # Embedding generation
├── tools.ts          # Tool definitions and execution
├── presets.ts        # System prompt presets
└── supabase.ts       # Database client
```

## The Bigger Picture

This workshop prepares you for AI integration in Teamleader Focus:
- **Support AI**: Answer customer questions from help documentation (RAG)
- **Action Suggestions**: AI suggests actions, UI shows interactive buttons (tool calling)
- **Smart Prefilling**: AI fills forms based on context (structured output)
- **Observability**: Track what's working with Langfuse

## License

MIT

## Author

Built by [Gent Thaqi](https://github.com/gjentig4) for the Teamleader AI Workshop.

Repository: [github.com/gjentig4/workshop2](https://github.com/gjentig4/workshop2)
