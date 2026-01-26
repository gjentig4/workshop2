"use client";

import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageBubble } from "@/components/shared/message-bubble";
import { ModelSelector } from "@/components/playground/model-selector";
import { TemperatureSlider } from "@/components/playground/temperature-slider";
import { SystemPromptEditor } from "@/components/playground/system-prompt-editor";
import { FeatureToggles } from "@/components/playground/feature-toggles";
import { DebugPanel } from "@/components/playground/debug-panel";
import { StructuredOutputEditor } from "@/components/playground/structured-output-editor";
import { ToolEditor } from "@/components/playground/tool-editor";
import { ApiKeyInput } from "@/components/shared/api-key-input";
import { Message, PlaygroundSettings, ChatRequest } from "@/types";
import { supportsReasoning } from "@/lib/reasoning";

const DEFAULT_SETTINGS: PlaygroundSettings = {
  model: "anthropic/claude-haiku-4.5",
  temperature: 0.7,
  enableStreaming: true,
  enableSystemPrompt: true,
  systemPrompt: "You are a helpful assistant.",
  enableReasoning: false,
  reasoningEffort: "medium",
  showThinking: true,
  enableTools: false,
  customTools: "",
  enableStructuredOutput: false,
  structuredOutputSchema: "",
  enableTracing: true,
  openRouterApiKey: "",
};

export default function PlaygroundPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<PlaygroundSettings>(DEFAULT_SETTINGS);
  const [debugInfo, setDebugInfo] = useState<Message["metadata"] | null>(null);
  const [currentThinking, setCurrentThinking] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check if current model supports reasoning
  const modelSupportsReasoning = settings.model ? supportsReasoning(settings.model) : false;

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentThinking]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !settings.model || isLoading) return;

    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setDebugInfo(null);
    setCurrentThinking("");

    try {
      const request: ChatRequest = {
        messages: [...messages, userMessage].filter((m) => m.role !== "system"),
        model: settings.model,
        temperature: settings.enableReasoning ? undefined : settings.temperature,
        stream: settings.enableStreaming,
        systemPrompt: settings.enableSystemPrompt ? settings.systemPrompt : undefined,
        enableReasoning: settings.enableReasoning && modelSupportsReasoning,
        reasoningEffort: settings.enableReasoning ? settings.reasoningEffort : undefined,
        enableTools: settings.enableTools,
        customTools: settings.enableTools && settings.customTools ? settings.customTools : undefined,
        structuredOutputSchema: settings.enableStructuredOutput
          ? settings.structuredOutputSchema
          : undefined,
        enableTracing: settings.enableTracing,
        openRouterApiKey: settings.openRouterApiKey || undefined,
      };

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      if (settings.enableStreaming && !settings.enableTools) {
        // Handle streaming response (tools use non-streaming)
        const reader = response.body?.getReader();
        if (!reader) throw new Error("No reader");

        const decoder = new TextDecoder();
        let assistantMessage: Message = {
          id: uuidv4(),
          role: "assistant",
          content: "",
        };

        setMessages((prev) => [...prev, assistantMessage]);

        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || ""; // Keep incomplete line in buffer

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            
            try {
              const data = JSON.parse(line.slice(6));

              if (data.type === "content") {
                assistantMessage = {
                  ...assistantMessage,
                  content: assistantMessage.content + data.content,
                };
                setMessages((prev) =>
                  prev.map((m) => (m.id === assistantMessage.id ? assistantMessage : m))
                );
              } else if (data.type === "reasoning") {
                if (settings.showThinking) {
                  setCurrentThinking((prev) => prev + data.content);
                }
              } else if (data.type === "done") {
                assistantMessage = data.message;
                setMessages((prev) =>
                  prev.map((m) => (m.id === assistantMessage.id ? data.message : m))
                );
                setDebugInfo(data.message.metadata);
                setCurrentThinking("");
              }
            } catch {
              // Skip malformed JSON
            }
          }
        }
      } else {
        // Handle non-streaming response (or tools enabled)
        const data = await response.json();
        setMessages((prev) => [...prev, data.message]);
        setDebugInfo(data.message.metadata);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: "assistant",
          content: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        },
      ]);
    } finally {
      setIsLoading(false);
      setCurrentThinking("");
    }
  };

  const clearChat = () => {
    setMessages([]);
    setDebugInfo(null);
    setCurrentThinking("");
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Messages - scrollable container */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-600 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    AI Playground
                  </h2>
                  <p className="text-zinc-400 max-w-md mx-auto">
                    Add a model using the sidebar, then start chatting to explore
                    LLM capabilities.
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

              {/* Show current thinking if enabled */}
              {currentThinking && settings.showThinking && (
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/30">
                  <div className="flex items-center gap-2 text-purple-400 text-sm mb-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                  <div className="text-sm text-purple-200/80 whitespace-pre-wrap font-mono max-h-64 overflow-y-auto">
                    {currentThinking}
                  </div>
                </div>
              )}

              {isLoading && !currentThinking && messages[messages.length - 1]?.role === "user" && (
                <div className="flex items-center gap-2 text-zinc-400 p-4">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{settings.enableTools ? "Processing (tools may take longer)..." : "Generating response..."}</span>
                </div>
              )}
              
              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-zinc-800 p-4 bg-zinc-950">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="flex gap-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  settings.model
                    ? "Type your message..."
                    : "Add a model first using the sidebar"
                }
                disabled={!settings.model || isLoading}
                className="min-h-[60px] max-h-[200px] resize-none bg-zinc-900 border-zinc-700 focus:border-cyan-600"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <Button
                type="submit"
                disabled={!settings.model || !input.trim() || isLoading}
                className="h-[60px] px-6 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-80 border-l border-zinc-800 bg-zinc-950 overflow-y-auto flex-shrink-0">
        <div className="p-4 space-y-6">
          {/* Model Selector */}
          <ModelSelector
            selectedModel={settings.model}
            onModelChange={(model) => setSettings((s) => ({ ...s, model }))}
            enableReasoning={settings.enableReasoning}
            onReasoningChange={(enabled) =>
              setSettings((s) => ({ ...s, enableReasoning: enabled }))
            }
            reasoningEffort={settings.reasoningEffort}
            onReasoningEffortChange={(effort) =>
              setSettings((s) => ({ ...s, reasoningEffort: effort }))
            }
          />

          {/* API Key Input */}
          <ApiKeyInput
            value={settings.openRouterApiKey || ""}
            onChange={(key) => setSettings((s) => ({ ...s, openRouterApiKey: key }))}
          />

          {/* Temperature */}
          <TemperatureSlider
            value={settings.temperature}
            onChange={(temp) => setSettings((s) => ({ ...s, temperature: temp }))}
            disabled={settings.enableReasoning && modelSupportsReasoning}
          />

          {/* Feature Toggles */}
          <FeatureToggles
            settings={settings}
            onSettingsChange={setSettings}
            modelSupportsReasoning={modelSupportsReasoning}
          />

          {/* System Prompt */}
          {settings.enableSystemPrompt && (
            <SystemPromptEditor
              value={settings.systemPrompt}
              onChange={(prompt) =>
                setSettings((s) => ({ ...s, systemPrompt: prompt }))
              }
            />
          )}

          {/* Tool Editor */}
          {settings.enableTools && (
            <ToolEditor
              value={settings.customTools || ""}
              onChange={(tools) =>
                setSettings((s) => ({ ...s, customTools: tools }))
              }
            />
          )}

          {/* Structured Output Schema */}
          {settings.enableStructuredOutput && (
            <StructuredOutputEditor
              value={settings.structuredOutputSchema || ""}
              onChange={(schema) =>
                setSettings((s) => ({ ...s, structuredOutputSchema: schema }))
              }
            />
          )}

          {/* Debug Panel */}
          <DebugPanel debugInfo={debugInfo} />

          {/* Clear Chat */}
          <Button
            variant="outline"
            className="w-full border-zinc-700 hover:bg-zinc-800"
            onClick={clearChat}
            disabled={messages.length === 0}
          >
            Clear Chat
          </Button>
        </div>
      </aside>
    </div>
  );
}
