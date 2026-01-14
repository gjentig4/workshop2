"use client";

import { Layers, FileText, Copy } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { RAGSettings } from "@/types";

interface EmbeddingStrategySelectorProps {
  settings: RAGSettings;
  onSettingsChange: (settings: RAGSettings) => void;
}

const strategies = [
  {
    value: "chunk" as const,
    label: "Chunks",
    description: "Split into smaller pieces",
    icon: Layers,
  },
  {
    value: "document" as const,
    label: "Full Doc",
    description: "One embedding per file",
    icon: FileText,
  },
  {
    value: "both" as const,
    label: "Both",
    description: "Store both types",
    icon: Copy,
  },
];

export function EmbeddingStrategySelector({
  settings,
  onSettingsChange,
}: EmbeddingStrategySelectorProps) {
  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-zinc-300">
        Index As
      </label>
      <p className="text-xs text-zinc-500 -mt-2">How to store documents when uploading</p>

      {/* Strategy Selection */}
      <div className="grid grid-cols-3 gap-2">
        {strategies.map((strategy) => {
          const Icon = strategy.icon;
          const isSelected = settings.embeddingStrategy === strategy.value;

          return (
            <button
              key={strategy.value}
              type="button"
              onClick={() =>
                onSettingsChange({
                  ...settings,
                  embeddingStrategy: strategy.value,
                })
              }
              className={`p-3 rounded-lg text-left transition-all ${
                isSelected
                  ? "bg-teal-950/50 border-2 border-teal-600"
                  : "bg-zinc-900/50 border-2 border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <Icon
                className={`w-5 h-5 mb-2 ${
                  isSelected ? "text-teal-400" : "text-zinc-500"
                }`}
              />
              <div className="text-sm font-medium text-zinc-200">
                {strategy.label}
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                {strategy.description}
              </div>
            </button>
          );
        })}
      </div>

      {/* Chunk Settings */}
      {(settings.embeddingStrategy === "chunk" ||
        settings.embeddingStrategy === "both") && (
        <div className="space-y-4 pt-4 border-t border-zinc-800">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Chunk Size</span>
              <span className="font-mono text-teal-400">
                {settings.chunkSize} chars
              </span>
            </div>
            <Slider
              value={[settings.chunkSize]}
              onValueChange={([v]) =>
                onSettingsChange({ ...settings, chunkSize: v })
              }
              min={200}
              max={4000}
              step={100}
            />
            <div className="flex justify-between text-xs text-zinc-500">
              <span>200</span>
              <span>4000</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Chunk Overlap</span>
              <span className="font-mono text-teal-400">
                {settings.chunkOverlap} chars
              </span>
            </div>
            <Slider
              value={[settings.chunkOverlap]}
              onValueChange={([v]) =>
                onSettingsChange({ ...settings, chunkOverlap: v })
              }
              min={0}
              max={500}
              step={50}
            />
            <div className="flex justify-between text-xs text-zinc-500">
              <span>0</span>
              <span>500</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
