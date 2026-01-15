"use client";

import { useState, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { Message } from "@/types";
import * as LucideIcons from "lucide-react";

const { User, Bot, Wrench, Settings, Brain, ChevronDown, ChevronRight } = LucideIcons;

// Icon map for commonly used icons in learning mode responses
const ICON_MAP: Record<string, LucideIcons.LucideIcon> = {
  settings: LucideIcons.Settings,
  temperature: LucideIcons.Thermometer,
  model: LucideIcons.Cpu,
  streaming: LucideIcons.Radio,
  tools: LucideIcons.Wrench,
  tool: LucideIcons.Wrench,
  prompt: LucideIcons.FileText,
  upload: LucideIcons.Upload,
  docs: LucideIcons.FolderOpen,
  document: LucideIcons.FileText,
  search: LucideIcons.Search,
  chunk: LucideIcons.Layers,
  embed: LucideIcons.Database,
  database: LucideIcons.Database,
  langfuse: LucideIcons.BarChart3,
  trace: LucideIcons.Activity,
  debug: LucideIcons.Bug,
  reasoning: LucideIcons.Brain,
  brain: LucideIcons.Brain,
  code: LucideIcons.Code,
  api: LucideIcons.Webhook,
  weather: LucideIcons.Cloud,
  time: LucideIcons.Clock,
  datetime: LucideIcons.Calendar,
  check: LucideIcons.Check,
  warning: LucideIcons.AlertTriangle,
  info: LucideIcons.Info,
  tip: LucideIcons.Lightbulb,
  lightbulb: LucideIcons.Lightbulb,
  star: LucideIcons.Star,
  heart: LucideIcons.Heart,
  arrow: LucideIcons.ArrowRight,
  link: LucideIcons.ExternalLink,
  cache: LucideIcons.HardDrive,
  cost: LucideIcons.DollarSign,
  money: LucideIcons.DollarSign,
  token: LucideIcons.Coins,
  learning: LucideIcons.GraduationCap,
  graduation: LucideIcons.GraduationCap,
  play: LucideIcons.Play,
  stop: LucideIcons.Square,
  refresh: LucideIcons.RefreshCw,
  save: LucideIcons.Save,
  copy: LucideIcons.Copy,
  edit: LucideIcons.Edit,
  delete: LucideIcons.Trash2,
  plus: LucideIcons.Plus,
  minus: LucideIcons.Minus,
  toggle: LucideIcons.ToggleLeft,
  switch: LucideIcons.ToggleLeft,
  slider: LucideIcons.SlidersHorizontal,
  chart: LucideIcons.BarChart3,
  json: LucideIcons.Braces,
  xml: LucideIcons.Code2,
  message: LucideIcons.MessageSquare,
  chat: LucideIcons.MessageCircle,
  user: LucideIcons.User,
  bot: LucideIcons.Bot,
  send: LucideIcons.Send,
  key: LucideIcons.Key,
  lock: LucideIcons.Lock,
  eye: LucideIcons.Eye,
  sparkles: LucideIcons.Sparkles,
  magic: LucideIcons.Wand2,
  rocket: LucideIcons.Rocket,
  zap: LucideIcons.Zap,
  fire: LucideIcons.Flame,
  target: LucideIcons.Target,
  filter: LucideIcons.Filter,
  sort: LucideIcons.ArrowUpDown,
  list: LucideIcons.List,
  grid: LucideIcons.LayoutGrid,
  folder: LucideIcons.Folder,
  file: LucideIcons.File,
  image: LucideIcons.Image,
  video: LucideIcons.Video,
  audio: LucideIcons.Volume2,
  download: LucideIcons.Download,
  cloud: LucideIcons.Cloud,
  server: LucideIcons.Server,
  globe: LucideIcons.Globe,
  network: LucideIcons.Network,
  terminal: LucideIcons.Terminal,
  console: LucideIcons.Terminal,
  package: LucideIcons.Package,
  git: LucideIcons.GitBranch,
  github: LucideIcons.Github,
};

// Render icons in text like :icon-settings: or :icon:settings:
function renderWithIcons(text: string): ReactNode[] {
  const parts = text.split(/(:icon[-:][\w-]+:)/g);
  return parts.map((part, index) => {
    const match = part.match(/^:icon[-:]([\w-]+):$/);
    if (match) {
      const iconName = match[1].toLowerCase().replace(/-/g, "");
      const IconComponent = ICON_MAP[iconName];
      if (IconComponent) {
        return <IconComponent key={index} className="inline-block w-4 h-4 mx-0.5 text-teal-400" />;
      }
      // Fallback: just show the text if icon not found
      return part;
    }
    return part;
  });
}

// Process children to handle icon syntax in text nodes
function processChildren(children: ReactNode): ReactNode {
  if (typeof children === "string") {
    if (children.includes(":icon")) {
      return <>{renderWithIcons(children)}</>;
    }
    return children;
  }
  if (Array.isArray(children)) {
    return children.map((child, i) => {
      if (typeof child === "string" && child.includes(":icon")) {
        return <span key={i}>{renderWithIcons(child)}</span>;
      }
      return child;
    });
  }
  return children;
}

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
          <div className="text-zinc-100 markdown-content text-sm">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="my-3 first:mt-0 last:mb-0 whitespace-pre-wrap">{processChildren(children)}</p>,
                ul: ({ children }) => <ul className="my-3 ml-4 list-disc space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="my-3 ml-4 list-decimal space-y-1">{children}</ol>,
                li: ({ children }) => <li className="pl-1">{processChildren(children)}</li>,
                strong: ({ children }) => <strong className="font-semibold text-zinc-100">{processChildren(children)}</strong>,
                em: ({ children }) => <em className="italic">{processChildren(children)}</em>,
                code: ({ children, className }) => {
                  const isBlock = className?.includes('language-');
                  return isBlock ? (
                    <code className={`${className} block bg-zinc-800 p-3 rounded-lg overflow-x-auto text-sm`}>{children}</code>
                  ) : (
                    <code className="bg-zinc-800 text-cyan-400 px-1.5 py-0.5 rounded text-sm">{children}</code>
                  );
                },
                pre: ({ children }) => <pre className="my-3 first:mt-0 last:mb-0">{children}</pre>,
                a: ({ children, href }) => <a href={href} className="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">{processChildren(children)}</a>,
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
                h1: ({ children }) => <h1 className="text-xl font-bold my-4 first:mt-0">{processChildren(children)}</h1>,
                h2: ({ children }) => <h2 className="text-lg font-bold my-3 first:mt-0">{processChildren(children)}</h2>,
                h3: ({ children }) => <h3 className="text-base font-bold my-3 first:mt-0">{processChildren(children)}</h3>,
                blockquote: ({ children }) => <blockquote className="border-l-2 border-zinc-600 pl-4 my-3 italic text-zinc-400">{processChildren(children)}</blockquote>,
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
