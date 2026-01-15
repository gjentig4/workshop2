"use client";

import { Layers, FileText, Copy } from "lucide-react";

interface RetrievalStrategySelectorProps {
  value: "chunk" | "document" | "both";
  onChange: (value: "chunk" | "document" | "both") => void;
  disabled?: boolean;
}

const strategies = [
  {
    value: "chunk" as const,
    label: "Chunks",
    description: "Search chunked pieces",
    icon: Layers,
  },
  {
    value: "document" as const,
    label: "Full Docs",
    description: "Search whole documents",
    icon: FileText,
  },
  {
    value: "both" as const,
    label: "Both",
    description: "Search all embeddings",
    icon: Copy,
  },
];

export function RetrievalStrategySelector({
  value,
  onChange,
  disabled = false,
}: RetrievalStrategySelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-zinc-400">Search Strategy</label>
      <div className="grid grid-cols-3 gap-1.5">
        {strategies.map((strategy) => {
          const Icon = strategy.icon;
          const isSelected = value === strategy.value;

          return (
            <button
              key={strategy.value}
              type="button"
              disabled={disabled}
              onClick={() => onChange(strategy.value)}
              className={`p-2 rounded-lg text-center transition-all ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
              } ${
                isSelected
                  ? "bg-teal-950/50 border border-teal-600"
                  : "bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <Icon
                className={`w-4 h-4 mx-auto mb-1 ${
                  isSelected ? "text-teal-400" : "text-zinc-500"
                }`}
              />
              <div className="text-xs font-medium text-zinc-200">
                {strategy.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Keep the old export name for backwards compatibility during refactor
export { RetrievalStrategySelector as EmbeddingStrategySelector };
