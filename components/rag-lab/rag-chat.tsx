"use client";

import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Send, Loader2, FileText, Trash2, Bug, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MessageBubble } from "@/components/shared/message-bubble";
import { ContextPreview } from "./context-preview";
import { DebugPanel } from "@/components/playground/debug-panel";
import { Message, RAGSearchResult, Profile, RAGSettings } from "@/types";

interface RAGChatProps {
  profileId: string | null;
  settings: Partial<Profile>;
  systemPrompt: string;
  ragSettings: RAGSettings;
  initialMessages?: Message[];
  onMessagesChange?: (messages: Message[]) => void;
  externalInput?: string;
  onExternalInputConsumed?: () => void;
  skipRag?: boolean;
}

const CHAT_STORAGE_KEY = "rag-lab-chat-messages";

export function RAGChat({
  profileId,
  settings,
  systemPrompt,
  ragSettings,
  initialMessages = [],
  onMessagesChange,
  externalInput,
  onExternalInputConsumed,
  skipRag = false,
}: RAGChatProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Try to load from localStorage on initial mount
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // Invalid JSON, ignore
        }
      }
    }
    return initialMessages;
  });
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState<RAGSearchResult[]>([]);
  const [debugInfo, setDebugInfo] = useState<Message["metadata"] | null>(null);
  const [streamingContent, setStreamingContent] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } else {
      localStorage.removeItem(CHAT_STORAGE_KEY);
    }
  }, [messages]);

  // Update messages when initial messages change (profile switch)
  // This is intentionally using initialMessages as the only dependency
  // to avoid re-syncing when local messages change
  useEffect(() => {
    if (initialMessages.length > 0) {
      setMessages(initialMessages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initialMessages)]);

  // Handle external input (from Learning Mode)
  useEffect(() => {
    if (externalInput) {
      setInput(externalInput);
      onExternalInputConsumed?.();
      // Focus the textarea
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 0);
    }
  }, [externalInput, onExternalInputConsumed]);

  // Notify parent of message changes
  useEffect(() => {
    onMessagesChange?.(messages);
  }, [messages, onMessagesChange]);

  // Auto-scroll to bottom (only if user hasn't scrolled up)
  useEffect(() => {
    if (scrollRef.current && autoScroll) {
      const viewport = scrollRef.current.querySelector("[data-radix-scroll-area-viewport]");
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages, streamingContent, autoScroll]);

  // Re-enable auto-scroll when loading finishes
  useEffect(() => {
    if (!isLoading) {
      setAutoScroll(true);
    }
  }, [isLoading]);

  // Track scroll position to detect if user scrolled up
  const handleScrollCapture = () => {
    if (scrollRef.current && isLoading) {
      const viewport = scrollRef.current.querySelector("[data-radix-scroll-area-viewport]");
      if (viewport) {
        const { scrollTop, scrollHeight, clientHeight } = viewport;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
        if (!isNearBottom) {
          setAutoScroll(false);
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !settings.model || isLoading) return;

    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: input.trim(),
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setContext([]);
    setStreamingContent("");
    setDebugInfo(null);

    try {
      // Build tools config
      const tools = settings.tools_enabled && settings.tools_config
        ? JSON.stringify(settings.tools_config)
        : undefined;

      // Build structured output schema if enabled
      const structuredOutputSchema = settings.structured_output_enabled && settings.structured_output_schema
        ? JSON.stringify(settings.structured_output_schema)
        : undefined;

      const response = await fetch("/api/rag/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          model: settings.model,
          temperature: settings.temperature,
          systemPrompt,
          enableReasoning: settings.reasoning_enabled,
          reasoningEffort: settings.reasoning_effort,
          enableTools: settings.tools_enabled,
          customTools: tools,
          enableTracing: settings.tracing_enabled,
          stream: settings.streaming_enabled ?? true,
          profileId,
          topK: ragSettings.topK || 5,
          embeddingStrategy: ragSettings.embeddingStrategy || "document",
          similarityThreshold: ragSettings.similarityThreshold ?? 0.1,
          skipRag,
          structuredOutputSchema,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      // Handle streaming response (tools force non-streaming mode on server)
      const useStreaming = settings.streaming_enabled !== false && !settings.tools_enabled;
      
      if (useStreaming) {
        const reader = response.body?.getReader();
        if (!reader) throw new Error("No reader");

        const decoder = new TextDecoder();
        let assistantMessage: Message = {
          id: uuidv4(),
          role: "assistant",
          content: "",
          createdAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, assistantMessage]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

          for (const line of lines) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.type === "context") {
                setContext(data.context);
              } else if (data.type === "content") {
                assistantMessage = {
                  ...assistantMessage,
                  content: assistantMessage.content + data.content,
                };
                setStreamingContent(assistantMessage.content);
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMessage.id ? assistantMessage : m
                  )
                );
              } else if (data.type === "reasoning") {
                assistantMessage = {
                  ...assistantMessage,
                  metadata: {
                    ...assistantMessage.metadata,
                    thinking: (assistantMessage.metadata?.thinking || "") + data.content,
                  },
                };
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMessage.id ? assistantMessage : m
                  )
                );
              } else if (data.type === "done") {
                const finalMessage = {
                  ...data.message,
                  id: assistantMessage.id,
                };
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMessage.id ? finalMessage : m
                  )
                );
                setDebugInfo(finalMessage.metadata);
              }
            } catch {
              // Skip malformed chunks
            }
          }
        }
      } else {
        // Non-streaming response
        const data = await response.json();
        
        if (data.context) {
          setContext(data.context);
        }
        
        const assistantMessage: Message = {
          ...data.message,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        };
        
        setMessages((prev) => [...prev, assistantMessage]);
        setDebugInfo(assistantMessage.metadata);
      }
    } catch (error) {
      console.error("RAG chat error:", error);
      const errorMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setStreamingContent("");
    }
  };

  const clearChat = () => {
    setMessages([]);
    setContext([]);
    setDebugInfo(null);
    localStorage.removeItem(CHAT_STORAGE_KEY);
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Context Preview */}
      {(context.length > 0 || isLoading) && (
        <div className="px-4 pt-4 shrink-0">
          <ContextPreview context={context} isLoading={isLoading && context.length === 0} />
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden min-h-0" onScrollCapture={handleScrollCapture}>
        <ScrollArea className="h-full" ref={scrollRef}>
          <div className="p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-zinc-300 mb-2">
                  Teamleader Support Bot
                </h3>
                <p className="text-sm text-zinc-500 max-w-md mx-auto">
                  Ask questions about your uploaded documents. The system will
                  retrieve relevant content and use it as context for responses.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  showMetadata={message.role === "assistant"}
                />
              ))
            )}

            {isLoading && messages[messages.length - 1]?.role === "user" && !streamingContent && (
              <div className="flex items-center gap-2 text-zinc-400 p-4">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Searching documents and generating response...</span>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Debug Panel - Collapsible */}
      {debugInfo && (
        <div className="px-4 pb-2 border-t border-zinc-800">
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full flex items-center justify-between py-2 px-0 hover:bg-transparent"
              >
                <span className="text-xs text-zinc-500 flex items-center gap-2">
                  <Bug className="w-3 h-3" />
                  Debug Info
                  {debugInfo.tokensIn && (
                    <span className="text-zinc-600">
                      • {debugInfo.tokensIn} in / {debugInfo.tokensOut} out
                      {debugInfo.cost && ` • $${debugInfo.cost.toFixed(4)}`}
                    </span>
                  )}
                </span>
                <ChevronDown className="w-3 h-3 text-zinc-500" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <DebugPanel debugInfo={debugInfo} />
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-zinc-800 p-4 shrink-0">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              settings.model
                ? "Ask about your documents..."
                : "Select a model first"
            }
            disabled={!settings.model || isLoading}
            className="min-h-[60px] max-h-[120px] resize-none bg-zinc-900 border-zinc-700"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              disabled={!settings.model || !input.trim() || isLoading}
              className="flex-1 px-6 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
            {messages.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="text-zinc-500 hover:text-zinc-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
