import { ChatRequest } from "@/types";
import { mapReasoningParams } from "./reasoning";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export interface OpenRouterMessage {
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  tool_calls?: {
    id: string;
    type: "function";
    function: {
      name: string;
      arguments: string;
    };
  }[];
  tool_call_id?: string;
}

export interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
  temperature?: number;
  stream?: boolean;
  max_tokens?: number;
  tools?: OpenRouterTool[];
  response_format?: { type: "json_object" } | { type: "json_schema"; json_schema: unknown };
  // Provider-specific params are merged in
  [key: string]: unknown;
}

export interface OpenRouterTool {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  };
}

// Reasoning details structure from OpenRouter
export interface ReasoningDetail {
  type: "reasoning.summary" | "reasoning.encrypted" | "reasoning.text";
  id?: string | null;
  format?: string;
  index?: number;
  summary?: string; // For reasoning.summary type
  data?: string; // For reasoning.encrypted type
  text?: string; // For reasoning.text type
  signature?: string | null; // For reasoning.text type
}

export interface OpenRouterResponse {
  id: string;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
      reasoning_content?: string; // Legacy format
      reasoning?: string; // New unified format
      reasoning_details?: ReasoningDetail[]; // Detailed reasoning blocks
      tool_calls?: {
        id: string;
        type: "function";
        function: {
          name: string;
          arguments: string;
        };
      }[];
    };
    finish_reason: string;
  }[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    prompt_tokens_details?: {
      cached_tokens?: number;
    };
    completion_tokens_details?: {
      reasoning_tokens?: number;
    };
    // OpenRouter native cost tracking
    cost?: number;
  };
}

// Extract reasoning text from reasoning_details array
export function extractReasoningText(details?: ReasoningDetail[]): string {
  if (!details || details.length === 0) return "";
  
  return details
    .filter(d => d.type === "reasoning.text" || d.type === "reasoning.summary")
    .map(d => d.text || d.summary || "")
    .filter(Boolean)
    .join("\n\n");
}

export async function chatCompletion(
  request: ChatRequest,
  tools?: OpenRouterTool[]
): Promise<Response> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  // Build base request with proper message formatting
  const openRouterRequest: OpenRouterRequest = {
    model: request.model,
    messages: request.messages.map((m) => {
      const msg: OpenRouterMessage = {
        role: m.role,
        content: m.content,
      };
      
      // Include tool_calls for assistant messages that made tool calls
      if (m.role === "assistant" && m.metadata?.toolCalls && m.metadata.toolCalls.length > 0) {
        msg.tool_calls = m.metadata.toolCalls.map(tc => ({
          id: tc.id,
          type: "function" as const,
          function: {
            name: tc.name,
            arguments: JSON.stringify(tc.arguments),
          },
        }));
      }
      
      // Include tool_call_id for tool result messages
      if (m.role === "tool" && m.metadata?.toolCallId) {
        msg.tool_call_id = m.metadata.toolCallId;
      }
      
      return msg;
    }),
    stream: request.stream ?? true,
  };

  // Add temperature if not using reasoning
  if (!request.enableReasoning && request.temperature !== undefined) {
    openRouterRequest.temperature = request.temperature;
  }

  // Add reasoning params if enabled
  if (request.enableReasoning && request.reasoningEffort) {
    const reasoningParams = mapReasoningParams(
      request.model,
      request.reasoningEffort
    );
    Object.assign(openRouterRequest, reasoningParams);
  }

  // Add tools if enabled
  if (request.enableTools && tools && tools.length > 0) {
    openRouterRequest.tools = tools;
  }

  // Add structured output if enabled
  if (request.structuredOutputSchema) {
    try {
      const schema = JSON.parse(request.structuredOutputSchema);
      openRouterRequest.response_format = {
        type: "json_schema",
        json_schema: schema,
      };
    } catch {
      // If invalid JSON, fall back to json_object
      openRouterRequest.response_format = { type: "json_object" };
    }
  }

  // Add system prompt if provided
  if (request.systemPrompt) {
    openRouterRequest.messages = [
      { role: "system", content: request.systemPrompt },
      ...openRouterRequest.messages,
    ];
  }

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "X-Title": "AI Workshop Playground",
    },
    body: JSON.stringify(openRouterRequest),
  });

  return response;
}

export function parseStreamChunk(chunk: string): {
  content?: string;
  reasoning?: string;
  reasoningDetails?: ReasoningDetail[];
  toolCalls?: OpenRouterResponse["choices"][0]["message"]["tool_calls"];
  usage?: OpenRouterResponse["usage"];
  done?: boolean;
} {
  if (chunk.startsWith("data: ")) {
    const data = chunk.slice(6);
    if (data === "[DONE]") {
      return { done: true };
    }
    try {
      const parsed = JSON.parse(data);
      const delta = parsed.choices?.[0]?.delta;
      
      // Extract reasoning from multiple possible sources
      let reasoning = delta?.reasoning_content || delta?.reasoning;
      
      // Also check for reasoning_details array (new format)
      const reasoningDetails = delta?.reasoning_details as ReasoningDetail[] | undefined;
      if (reasoningDetails && reasoningDetails.length > 0) {
        const detailText = extractReasoningText(reasoningDetails);
        if (detailText) {
          reasoning = (reasoning || "") + detailText;
        }
      }
      
      return {
        content: delta?.content,
        reasoning,
        reasoningDetails,
        toolCalls: delta?.tool_calls,
        usage: parsed.usage,
      };
    } catch {
      return {};
    }
  }
  return {};
}
