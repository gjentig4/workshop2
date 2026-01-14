"use client";

import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Send, Loader2, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageBubble } from "@/components/shared/message-bubble";
import { Message, RAGSettings } from "@/types";

interface ComparisonViewProps {
  model: string;
  settings: RAGSettings;
}

interface ComparisonResult {
  rag: {
    message: Message | null;
    loading: boolean;
    contextCount: number;
    tokensIn?: number;
    latencyMs?: number;
  };
  cag: {
    message: Message | null;
    loading: boolean;
    documentsCount: number;
    contextTokens?: number;
    tokensIn?: number;
    latencyMs?: number;
  };
}

export function ComparisonView({ model, settings }: ComparisonViewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [comparison, setComparison] = useState<ComparisonResult>({
    rag: { message: null, loading: false, contextCount: 0 },
    cag: { message: null, loading: false, documentsCount: 0 },
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, comparison]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !model) return;

    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setComparison({
      rag: { message: null, loading: true, contextCount: 0 },
      cag: { message: null, loading: true, documentsCount: 0 },
    });

    // Run RAG and CAG in parallel
    const allMessages = [...messages, userMessage];

    // RAG Request
    const ragPromise = fetch("/api/rag/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: allMessages,
        model,
        topK: settings.topK,
        stream: false,
      }),
    }).then(async (res) => {
      if (!res.ok) throw new Error("RAG failed");
      return res.json();
    });

    // CAG Request
    const cagPromise = fetch("/api/cag/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: allMessages,
        model,
        stream: false,
      }),
    }).then(async (res) => {
      if (!res.ok) throw new Error("CAG failed");
      return res.json();
    });

    // Handle RAG result
    ragPromise
      .then((data) => {
        setComparison((prev) => ({
          ...prev,
          rag: {
            message: data.message,
            loading: false,
            contextCount: data.context?.length || 0,
            tokensIn: data.message?.metadata?.tokensIn,
            latencyMs: data.message?.metadata?.latencyMs,
          },
        }));
      })
      .catch((error) => {
        console.error("RAG error:", error);
        setComparison((prev) => ({
          ...prev,
          rag: {
            message: {
              id: uuidv4(),
              role: "assistant",
              content: "Error: Failed to get RAG response",
            },
            loading: false,
            contextCount: 0,
          },
        }));
      });

    // Handle CAG result
    cagPromise
      .then((data) => {
        setComparison((prev) => ({
          ...prev,
          cag: {
            message: data.message,
            loading: false,
            documentsCount: data.context?.documentsIncluded || 0,
            contextTokens: data.context?.contextTokenEstimate,
            tokensIn: data.message?.metadata?.tokensIn,
            latencyMs: data.message?.metadata?.latencyMs,
          },
        }));
      })
      .catch((error) => {
        console.error("CAG error:", error);
        setComparison((prev) => ({
          ...prev,
          cag: {
            message: {
              id: uuidv4(),
              role: "assistant",
              content: "Error: Failed to get CAG response",
            },
            loading: false,
            documentsCount: 0,
          },
        }));
      });
  };

  const isLoading = comparison.rag.loading || comparison.cag.loading;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-center gap-4">
        <div className="text-center">
          <h3 className="text-sm font-medium text-zinc-300">RAG</h3>
          <p className="text-xs text-zinc-500">Retrieval-Augmented</p>
        </div>
        <ArrowLeftRight className="w-5 h-5 text-zinc-600" />
        <div className="text-center">
          <h3 className="text-sm font-medium text-zinc-300">CAG</h3>
          <p className="text-xs text-zinc-500">Context-Stuffing</p>
        </div>
      </div>

      {/* Comparison Area */}
      <ScrollArea className="flex-1" ref={scrollRef}>
        <div className="p-4 space-y-6">
          {/* User Messages */}
          {messages.map((message) => (
            <div key={message.id} className="max-w-2xl mx-auto">
              <MessageBubble message={message} />
            </div>
          ))}

          {/* Side-by-side Comparison */}
          {(comparison.rag.message || comparison.rag.loading) && (
            <div className="grid grid-cols-2 gap-4">
              {/* RAG Column */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-950/50 text-blue-300 border-blue-800/50">
                    RAG
                  </Badge>
                  {comparison.rag.contextCount > 0 && (
                    <span className="text-xs text-zinc-500">
                      {comparison.rag.contextCount} chunks retrieved
                    </span>
                  )}
                </div>

                {comparison.rag.loading ? (
                  <div className="p-4 rounded-xl bg-zinc-900/50 flex items-center gap-2 text-zinc-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Searching & generating...
                  </div>
                ) : comparison.rag.message ? (
                  <>
                    <MessageBubble message={comparison.rag.message} />
                    <div className="flex gap-4 text-xs text-zinc-500">
                      {comparison.rag.tokensIn && (
                        <span>{comparison.rag.tokensIn.toLocaleString()} tokens in</span>
                      )}
                      {comparison.rag.latencyMs && (
                        <span>{comparison.rag.latencyMs.toLocaleString()}ms</span>
                      )}
                    </div>
                  </>
                ) : null}
              </div>

              {/* CAG Column */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-950/50 text-purple-300 border-purple-800/50">
                    CAG
                  </Badge>
                  {comparison.cag.documentsCount > 0 && (
                    <span className="text-xs text-zinc-500">
                      {comparison.cag.documentsCount} docs (~
                      {comparison.cag.contextTokens?.toLocaleString()} tokens)
                    </span>
                  )}
                </div>

                {comparison.cag.loading ? (
                  <div className="p-4 rounded-xl bg-zinc-900/50 flex items-center gap-2 text-zinc-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading full context...
                  </div>
                ) : comparison.cag.message ? (
                  <>
                    <MessageBubble message={comparison.cag.message} />
                    <div className="flex gap-4 text-xs text-zinc-500">
                      {comparison.cag.tokensIn && (
                        <span>{comparison.cag.tokensIn.toLocaleString()} tokens in</span>
                      )}
                      {comparison.cag.latencyMs && (
                        <span>{comparison.cag.latencyMs.toLocaleString()}ms</span>
                      )}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          )}

          {messages.length === 0 && (
            <div className="text-center py-12">
              <ArrowLeftRight className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-zinc-300 mb-2">
                Compare RAG vs CAG
              </h3>
              <p className="text-sm text-zinc-500 max-w-md mx-auto">
                Send a message to see side-by-side responses. RAG retrieves
                relevant chunks while CAG uses full document context.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-zinc-800 p-4">
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-2xl mx-auto">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={model ? "Ask a question to compare..." : "Add a model first"}
            disabled={!model || isLoading}
            className="min-h-[60px] max-h-[120px] resize-none bg-zinc-900 border-zinc-700"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button
            type="submit"
            disabled={!model || !input.trim() || isLoading}
            className="h-[60px] px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
