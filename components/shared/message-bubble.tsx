"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { Message } from "@/types";
import { User, Bot, Wrench, Settings, Brain, ChevronDown, ChevronRight } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
  showMetadata?: boolean;
}

export function MessageBubble({ message, showMetadata = false }: MessageBubbleProps) {
  const [showThinking, setShowThinking] = useState(false);
  const isUser = message.role === "user";
  const isSystem = message.role === "system";
  const isTool = message.role === "tool";

  const Icon = isUser ? User : isTool ? Wrench : isSystem ? Settings : Bot;
  const hasThinking = message.metadata?.thinking;

  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-xl",
        isUser && "bg-zinc-800/50",
        !isUser && !isSystem && !isTool && "bg-zinc-900/50",
        isSystem && "bg-amber-950/20 border border-amber-900/30",
        isTool && "bg-purple-950/20 border border-purple-900/30"
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
          isUser && "bg-zinc-700",
          !isUser && !isSystem && !isTool && "bg-gradient-to-br from-cyan-600 to-teal-600",
          isSystem && "bg-amber-900/50",
          isTool && "bg-purple-900/50"
        )}
      >
        <Icon className="w-4 h-4 text-white" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-zinc-300">
            {isUser
              ? "You"
              : isTool
              ? "Tool Result"
              : isSystem
              ? "System"
              : "Assistant"}
          </span>
          {message.metadata?.model && (
            <span className="text-xs text-zinc-500 font-mono">
              {message.metadata.model}
            </span>
          )}
        </div>

        {/* Thinking/Reasoning Section */}
        {hasThinking && (
          <div className="mb-3">
            <button
              onClick={() => setShowThinking(!showThinking)}
              className="flex items-center gap-2 text-xs text-purple-400 hover:text-purple-300 transition-colors"
            >
              {showThinking ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
              <Brain className="w-3 h-3" />
              <span>Thinking ({message.metadata?.thinking?.length} chars)</span>
            </button>
            {showThinking && (
              <div className="mt-2 p-3 rounded-lg bg-purple-950/30 border border-purple-800/30 text-sm text-purple-200/80 whitespace-pre-wrap font-mono max-h-64 overflow-auto">
                {message.metadata?.thinking}
              </div>
            )}
          </div>
        )}

        {isUser ? (
          <div className="text-zinc-100 whitespace-pre-wrap break-words">
            {message.content}
          </div>
        ) : (
          <div className="text-zinc-100 markdown-content">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="my-3 first:mt-0 last:mb-0 whitespace-pre-wrap">{children}</p>,
                ul: ({ children }) => <ul className="my-3 ml-4 list-disc space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="my-3 ml-4 list-decimal space-y-1">{children}</ol>,
                li: ({ children }) => <li className="pl-1">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold text-zinc-100">{children}</strong>,
                em: ({ children }) => <em className="italic">{children}</em>,
                code: ({ children, className }) => {
                  const isBlock = className?.includes('language-');
                  return isBlock ? (
                    <code className={`${className} block bg-zinc-800 p-3 rounded-lg overflow-x-auto text-sm`}>{children}</code>
                  ) : (
                    <code className="bg-zinc-800 text-cyan-400 px-1.5 py-0.5 rounded text-sm">{children}</code>
                  );
                },
                pre: ({ children }) => <pre className="my-3 first:mt-0 last:mb-0">{children}</pre>,
                a: ({ children, href }) => <a href={href} className="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                img: ({ src, alt }) => (
                  <span className="block my-3">
                    <img 
                      src={src} 
                      alt={alt || "Image from document"} 
                      className="max-w-full h-auto rounded-lg border border-zinc-700 shadow-lg"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `<span class="text-zinc-500 text-sm italic">⚠️ Image could not be loaded: ${src}</span>`;
                      }}
                    />
                    {alt && <span className="block text-xs text-zinc-500 mt-1 italic">{alt}</span>}
                  </span>
                ),
                h1: ({ children }) => <h1 className="text-xl font-bold my-4 first:mt-0">{children}</h1>,
                h2: ({ children }) => <h2 className="text-lg font-bold my-3 first:mt-0">{children}</h2>,
                h3: ({ children }) => <h3 className="text-base font-bold my-3 first:mt-0">{children}</h3>,
                blockquote: ({ children }) => <blockquote className="border-l-2 border-zinc-600 pl-4 my-3 italic text-zinc-400">{children}</blockquote>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}

        {showMetadata && message.metadata && (
          <div className="mt-3 pt-3 border-t border-zinc-800 flex flex-wrap gap-3 text-xs text-zinc-500">
            {message.metadata.tokensIn !== undefined && (
              <span>
                <span className="text-zinc-400">In:</span>{" "}
                {message.metadata.tokensIn.toLocaleString()} tokens
              </span>
            )}
            {message.metadata.tokensOut !== undefined && (
              <span>
                <span className="text-zinc-400">Out:</span>{" "}
                {message.metadata.tokensOut.toLocaleString()} tokens
              </span>
            )}
            {message.metadata.reasoningTokens !== undefined && (
              <span>
                <span className="text-zinc-400">Reasoning:</span>{" "}
                {message.metadata.reasoningTokens.toLocaleString()} tokens
              </span>
            )}
            {message.metadata.cost !== undefined && (
              <span>
                <span className="text-zinc-400">Cost:</span> $
                {message.metadata.cost.toFixed(6)}
              </span>
            )}
            {message.metadata.latencyMs !== undefined && (
              <span>
                <span className="text-zinc-400">Latency:</span>{" "}
                {message.metadata.latencyMs.toLocaleString()}ms
              </span>
            )}
            {message.metadata.cached && (
              <span className="text-green-400">Cached</span>
            )}
          </div>
        )}

        {message.metadata?.toolCalls && message.metadata.toolCalls.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.metadata.toolCalls.map((tool) => (
              <div
                key={tool.id}
                className="bg-zinc-800/50 rounded-lg p-3 text-sm font-mono"
              >
                <div className="flex items-center gap-2 text-purple-400 mb-2">
                  <Wrench className="w-3 h-3" />
                  <span className="font-semibold">{tool.name}</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-zinc-500 text-xs uppercase tracking-wide">Input:</span>
                    <pre className="text-zinc-400 text-xs mt-1 overflow-auto max-h-32 bg-zinc-900/50 p-2 rounded">
                      {JSON.stringify(tool.arguments, null, 2)}
                    </pre>
                  </div>
                  {tool.result !== undefined && (
                    <div>
                      <span className="text-green-500 text-xs uppercase tracking-wide">Result:</span>
                      <pre className="text-green-400/80 text-xs mt-1 overflow-auto max-h-48 bg-green-950/20 p-2 rounded border border-green-900/30">
                        {JSON.stringify(tool.result, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
