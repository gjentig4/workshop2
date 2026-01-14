// Saved model in localStorage
export interface SavedModel {
  id: string; // OpenRouter model ID, e.g., "anthropic/claude-sonnet-4.5"
  addedAt: string; // ISO timestamp
}

// Chat message
export interface Message {
  id: string;
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  metadata?: MessageMetadata;
  createdAt?: string;
}

export interface MessageMetadata {
  tokensIn?: number;
  tokensOut?: number;
  reasoningTokens?: number;
  cost?: number;
  latencyMs?: number;
  cached?: boolean;
  model?: string;
  toolCalls?: ToolCall[];
  thinking?: string; // Reasoning/thinking content from models that support it
  toolCallId?: string; // For tool result messages
  toolName?: string; // For tool result messages
  traceUrl?: string; // Link to Langfuse trace
}

export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
  result?: unknown;
}

// Chat settings for playground
export interface PlaygroundSettings {
  model: string;
  temperature: number;
  enableStreaming: boolean;
  enableSystemPrompt: boolean;
  systemPrompt: string;
  enableReasoning: boolean;
  reasoningEffort: "low" | "medium" | "high";
  showThinking: boolean; // Show reasoning/thinking output
  enableTools: boolean;
  customTools?: string; // JSON string of custom tools
  enableStructuredOutput: boolean;
  structuredOutputSchema?: string;
  enableTracing: boolean;
}

// Tool definition for custom tools
export interface ToolDefinition {
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, {
      type: string;
      description?: string;
      enum?: string[];
    }>;
    required?: string[];
  };
}

// RAG settings
export interface RAGSettings {
  embeddingStrategy: "chunk" | "document" | "both";
  chunkSize: number;
  chunkOverlap: number;
  topK: number;
  similarityThreshold: number; // 0-1, default 0.1 - minimum similarity to include
}

// Document stored in Supabase
export interface Document {
  id: string;
  filename: string;
  content: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

// Embedding stored in Supabase
export interface Embedding {
  id: string;
  document_id: string;
  content: string;
  embedding_type: "chunk" | "document";
  chunk_index: number | null;
  chunk_size: number | null;
  metadata: Record<string, unknown>;
  created_at: string;
  similarity?: number; // Added during search
}

// Chat session
export interface ChatSession {
  id: string;
  title: string | null;
  context: "playground" | "rag-lab";
  settings: Record<string, unknown>;
  created_at: string;
}

// API request/response types
export interface ChatRequest {
  messages: Message[];
  model: string;
  temperature?: number;
  stream?: boolean;
  systemPrompt?: string;
  enableReasoning?: boolean;
  reasoningEffort?: "low" | "medium" | "high";
  enableTools?: boolean;
  customTools?: string; // JSON string of custom tools
  structuredOutputSchema?: string;
  enableTracing?: boolean;
}

export interface ChatResponse {
  message: Message;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    reasoningTokens?: number;
    totalTokens: number;
    cost?: number;
  };
  latencyMs?: number;
  cached?: boolean;
}

// RAG search result
export interface RAGSearchResult {
  content: string;
  documentId: string;
  filename: string;
  similarity: number;
  embeddingType: "chunk" | "document";
  chunkIndex: number | null;
}

// System prompt presets
export interface SystemPromptPreset {
  id: string;
  name: string;
  prompt: string;
  description?: string;
}

// Profile for RAG Lab
export interface Profile {
  id: string;
  name: string;
  model: string;
  temperature: number;
  reasoning_enabled: boolean;
  reasoning_effort: "low" | "medium" | "high";
  streaming_enabled: boolean;
  tracing_enabled: boolean;
  langfuse_prompt_name: string | null;
  langfuse_prompt_version: number | null;
  tools_enabled: boolean;
  tools_config: ToolDefinition[];
  structured_output_enabled: boolean;
  structured_output_schema: Record<string, unknown> | null;
  embedding_strategy: "document" | "chunk" | "both";
  top_k: number;
  similarity_threshold: number;
  created_at: string;
  updated_at: string;
  // Populated on fetch
  documents?: Document[];
  messages?: Message[];
}

// Langfuse prompt
export interface LangfusePrompt {
  name: string;
  version: number;
  prompt: string;
  config?: Record<string, unknown>;
  labels?: string[];
}

// RAG Chat request (extends regular chat request with RAG-specific fields)
export interface RAGChatRequest extends ChatRequest {
  profileId?: string;
  topK?: number;
  embeddingStrategy?: "document" | "chunk" | "both";
  // Retrieved context (populated by the API)
  context?: RAGSearchResult[];
}
