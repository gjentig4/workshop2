"use client";

import { MessageMetadata } from "@/types";
import { Bug, Coins, Clock, Database, Brain, Zap, ExternalLink } from "lucide-react";

interface DebugPanelProps {
  debugInfo: MessageMetadata | null | undefined;
}

export function DebugPanel({ debugInfo }: DebugPanelProps) {
  if (!debugInfo) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Bug className="w-4 h-4 text-zinc-400" />
          <label className="text-sm font-medium text-zinc-300">
            Debug Info
          </label>
        </div>
        <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 text-center">
          <p className="text-sm text-zinc-500">
            Send a message to see debug info
          </p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Input Tokens",
      value: debugInfo.tokensIn?.toLocaleString() ?? "—",
      icon: Database,
      color: "text-blue-400",
    },
    {
      label: "Output Tokens",
      value: debugInfo.tokensOut?.toLocaleString() ?? "—",
      icon: Zap,
      color: "text-green-400",
    },
    {
      label: "Reasoning Tokens",
      value: debugInfo.reasoningTokens?.toLocaleString() ?? "—",
      icon: Brain,
      color: "text-purple-400",
      show: debugInfo.reasoningTokens !== undefined,
    },
    {
      label: "Latency",
      value: debugInfo.latencyMs ? `${debugInfo.latencyMs.toLocaleString()}ms` : "—",
      icon: Clock,
      color: "text-amber-400",
    },
    {
      label: "Cost",
      value: debugInfo.cost !== undefined ? `$${debugInfo.cost.toFixed(6)}` : "—",
      icon: Coins,
      color: "text-emerald-400",
    },
  ].filter((s) => s.show !== false);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Bug className="w-4 h-4 text-zinc-400" />
        <label className="text-sm font-medium text-zinc-300">Debug Info</label>
        {debugInfo.cached && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-green-950/50 text-green-400 border border-green-800/50">
            Cached
          </span>
        )}
      </div>

      <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 space-y-2">
        {debugInfo.model && (
          <div className="text-xs font-mono text-zinc-400 pb-2 border-b border-zinc-800 truncate">
            {debugInfo.model}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <Icon className={`w-3 h-3 ${stat.color}`} />
                  {stat.label}
                </div>
                <div className="text-sm font-mono text-zinc-200">
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>

        {debugInfo.toolCalls && debugInfo.toolCalls.length > 0 && (
          <div className="pt-2 border-t border-zinc-800">
            <div className="text-xs text-zinc-500 mb-1">Tool Calls</div>
            <div className="space-y-1">
              {debugInfo.toolCalls.map((tool) => (
                <div
                  key={tool.id}
                  className="text-xs font-mono text-purple-400"
                >
                  {tool.name}()
                </div>
              ))}
            </div>
          </div>
        )}

        {debugInfo.traceUrl && (
          <div className="pt-2 border-t border-zinc-800">
            <a
              href={debugInfo.traceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              View in Langfuse
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
