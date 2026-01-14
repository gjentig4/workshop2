"use client";

import { useState } from "react";
import { Plus, X, Brain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useSavedModels } from "@/hooks/use-saved-models";
import { supportsReasoning, getReasoningHint } from "@/lib/reasoning";

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  enableReasoning: boolean;
  onReasoningChange: (enabled: boolean) => void;
  reasoningEffort: "low" | "medium" | "high";
  onReasoningEffortChange: (effort: "low" | "medium" | "high") => void;
}

export function ModelSelector({
  selectedModel,
  onModelChange,
  enableReasoning,
  onReasoningChange,
  reasoningEffort,
  onReasoningEffortChange,
}: ModelSelectorProps) {
  const { models, addModel, removeModel, isLoaded } = useSavedModels();
  const [newModelId, setNewModelId] = useState("");

  const handleAddModel = () => {
    if (newModelId.trim()) {
      addModel(newModelId.trim());
      if (!selectedModel) {
        onModelChange(newModelId.trim());
      }
      setNewModelId("");
    }
  };

  const handleRemoveModel = (modelId: string) => {
    removeModel(modelId);
    if (selectedModel === modelId) {
      onModelChange(models.find((m) => m.id !== modelId)?.id || "");
    }
  };

  const modelSupportsReasoning = selectedModel ? supportsReasoning(selectedModel) : false;
  const reasoningHint = selectedModel ? getReasoningHint(selectedModel) : null;

  if (!isLoaded) {
    return (
      <div className="space-y-3">
        <label className="text-sm font-medium text-zinc-300">Model</label>
        <div className="h-10 bg-zinc-800 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-zinc-300">Model</label>

      {/* Add Model Input */}
      <div className="flex gap-2">
        <Input
          value={newModelId}
          onChange={(e) => setNewModelId(e.target.value)}
          placeholder="anthropic/claude-sonnet-4.5"
          className="bg-zinc-900 border-zinc-700 text-sm font-mono"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddModel();
            }
          }}
        />
        <Button
          size="icon"
          variant="outline"
          onClick={handleAddModel}
          disabled={!newModelId.trim()}
          className="shrink-0 border-zinc-700 hover:bg-zinc-800"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Model List */}
      {models.length > 0 && (
        <div className="space-y-2">
          {models.map((model) => {
            const isSelected = selectedModel === model.id;
            const hasReasoning = supportsReasoning(model.id);

            return (
              <div
                key={model.id}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-cyan-950/50 border border-cyan-800/50"
                    : "bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700"
                }`}
                onClick={() => onModelChange(model.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-zinc-200 truncate">
                      {model.id}
                    </span>
                    {hasReasoning && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-purple-950/50 text-purple-300 border-purple-800/50">
                        <Brain className="w-3 h-3 mr-1" />
                        Thinking
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 shrink-0 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveModel(model.id);
                  }}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {models.length === 0 && (
        <p className="text-xs text-zinc-500">
          Add a model by pasting its OpenRouter ID above. Example:{" "}
          <code className="text-cyan-400">anthropic/claude-sonnet-4.5</code>
        </p>
      )}

      {/* Reasoning Controls */}
      {modelSupportsReasoning && (
        <div className="space-y-3 pt-3 border-t border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-zinc-300">
                Enable Reasoning
              </span>
            </div>
            <Switch
              checked={enableReasoning}
              onCheckedChange={onReasoningChange}
            />
          </div>

          {enableReasoning && (
            <div className="space-y-2">
              <label className="text-xs text-zinc-400">Reasoning Effort</label>
              <Select value={reasoningEffort} onValueChange={onReasoningEffortChange}>
                <SelectTrigger className="bg-zinc-900 border-zinc-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (faster, cheaper)</SelectItem>
                  <SelectItem value="medium">Medium (balanced)</SelectItem>
                  <SelectItem value="high">High (thorough)</SelectItem>
                </SelectContent>
              </Select>
              {reasoningHint && (
                <p className="text-xs text-zinc-500">{reasoningHint}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
