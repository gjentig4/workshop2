"use client";

import { useState, useEffect } from "react";
import { Profile, ToolDefinition } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Settings, FileText, Wrench, Braces, Check, AlertCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { RetrievalStrategySelector } from "./embedding-strategy-selector";
import { ApiKeyInput } from "@/components/shared/api-key-input";

const EXAMPLE_SCHEMA = `{
  "name": "response",
  "strict": true,
  "schema": {
    "type": "object",
    "properties": {
      "answer": {
        "type": "string",
        "description": "The main answer"
      },
      "confidence": {
        "type": "number",
        "description": "Confidence score 0-1"
      }
    },
    "required": ["answer", "confidence"]
  }
}`;

function StructuredOutputSchemaEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [localValue, setLocalValue] = useState(value);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!localValue.trim()) {
      setIsValid(null);
      setError(null);
      return;
    }

    try {
      JSON.parse(localValue);
      setIsValid(true);
      setError(null);
      onChange(localValue);
    } catch (e) {
      setIsValid(false);
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }, [localValue]);

  return (
    <div className="space-y-2 p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Braces className="w-3 h-3 text-zinc-400" />
          <label className="text-xs text-zinc-400">JSON Schema</label>
        </div>
        {isValid !== null && (
          <div className={`flex items-center gap-1 text-xs ${isValid ? "text-green-400" : "text-red-400"}`}>
            {isValid ? (
              <>
                <Check className="w-3 h-3" />
                Valid
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3" />
                Invalid
              </>
            )}
          </div>
        )}
      </div>

      <Textarea
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={EXAMPLE_SCHEMA}
        className="bg-zinc-800 border-zinc-700 text-xs font-mono min-h-[100px] resize-none"
      />

      {error && <p className="text-xs text-red-400">{error}</p>}

      {!localValue.trim() && (
        <button
          type="button"
          onClick={() => setLocalValue(EXAMPLE_SCHEMA)}
          className="text-xs text-cyan-400 hover:text-cyan-300"
        >
          Load example schema
        </button>
      )}
    </div>
  );
}

interface SettingsPanelProps {
  settings: Partial<Profile>;
  onSettingsChange: (settings: Partial<Profile>) => void;
  onOpenPromptEditor: () => void;
  onOpenToolsEditor: () => void;
  promptName: string | null;
  learningModeActive?: boolean;
  openRouterApiKey?: string;
  onApiKeyChange?: (key: string) => void;
}

export function SettingsPanel({
  settings,
  onSettingsChange,
  onOpenPromptEditor,
  onOpenToolsEditor,
  promptName,
  learningModeActive = false,
  openRouterApiKey = "",
  onApiKeyChange,
}: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(true);

  const updateSetting = <K extends keyof Profile>(key: K, value: Profile[K]) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-between p-3 hover:bg-zinc-800/50"
        >
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span className="font-medium">Settings</span>
          </div>
          {isOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="px-4 pb-4 space-y-4">
        {/* Model Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-zinc-400">Model</label>
            <Input
              value={settings.model || "anthropic/claude-sonnet-4.5"}
              onChange={(e) => updateSetting("model", e.target.value)}
              placeholder="anthropic/claude-sonnet-4.5"
              className="bg-zinc-800 border-zinc-700 font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-zinc-400">
              Temperature: {(settings.temperature ?? 0.7).toFixed(1)}
            </label>
            <Slider
              value={[settings.temperature ?? 0.7]}
              onValueChange={([value]) => updateSetting("temperature", value)}
              min={0}
              max={2}
              step={0.1}
              disabled={settings.reasoning_enabled}
              className="mt-2"
            />
          </div>
        </div>

        {/* API Key Input */}
        {onApiKeyChange && (
          <ApiKeyInput
            value={openRouterApiKey}
            onChange={onApiKeyChange}
          />
        )}

        {/* Reasoning & Top K - stacked to prevent overlap */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm text-zinc-400">Reasoning</label>
            <div className="flex items-center gap-2">
              <Switch
                checked={settings.reasoning_enabled ?? false}
                onCheckedChange={(checked) => updateSetting("reasoning_enabled", checked)}
              />
              {settings.reasoning_enabled && (
                <Select
                  value={settings.reasoning_effort || "medium"}
                  onValueChange={(value) => updateSetting("reasoning_effort", value as "low" | "medium" | "high")}
                >
                  <SelectTrigger className="w-20 h-7 bg-zinc-800 border-zinc-700 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm text-zinc-400">Top K Results</label>
            <Input
              type="number"
              value={settings.top_k ?? 5}
              onChange={(e) => updateSetting("top_k", parseInt(e.target.value) || 5)}
              min={1}
              max={20}
              className="w-16 h-7 bg-zinc-800 border-zinc-700 text-xs"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm text-zinc-400">
              Similarity: {((settings.similarity_threshold ?? 0.1) * 100).toFixed(0)}%
            </label>
            <Slider
              value={[(settings.similarity_threshold ?? 0.1) * 100]}
              onValueChange={([v]) => updateSetting("similarity_threshold", v / 100)}
              min={0}
              max={80}
              step={5}
              className="w-32"
              disabled={learningModeActive}
            />
          </div>
        </div>

        {/* Retrieval Strategy */}
        <RetrievalStrategySelector
          value={(settings.embedding_strategy as "chunk" | "document" | "both") || "both"}
          onChange={(value) => updateSetting("embedding_strategy", value)}
          disabled={learningModeActive}
        />

        {/* Toggles Row */}
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Switch
              checked={settings.streaming_enabled ?? true}
              onCheckedChange={(checked) => updateSetting("streaming_enabled", checked)}
            />
            <label className="text-sm text-zinc-400">Streaming</label>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={settings.tracing_enabled ?? true}
              onCheckedChange={(checked) => updateSetting("tracing_enabled", checked)}
            />
            <label className="text-sm text-zinc-400">Langfuse Tracing</label>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={settings.structured_output_enabled ?? false}
              onCheckedChange={(checked) => updateSetting("structured_output_enabled", checked)}
            />
            <label className="text-sm text-zinc-400">Structured Output</label>
          </div>
        </div>

        {/* Structured Output Schema Editor */}
        {settings.structured_output_enabled && (
          <StructuredOutputSchemaEditor
            value={settings.structured_output_schema ? JSON.stringify(settings.structured_output_schema, null, 2) : ""}
            onChange={(value) => {
              try {
                const parsed = value ? JSON.parse(value) : null;
                updateSetting("structured_output_schema", parsed);
              } catch {
                // Keep the invalid JSON as-is for editing
              }
            }}
          />
        )}

        {/* System Prompt & Tools Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          <Button
            variant="outline"
            onClick={onOpenPromptEditor}
            className="w-full bg-zinc-800 border-zinc-700 hover:bg-zinc-700 justify-start"
          >
            <FileText className="w-4 h-4 mr-2 shrink-0" />
            <span className="truncate">
              {promptName ? `Prompt: ${promptName}` : "System Prompt"}
            </span>
          </Button>

          <Button
            variant="outline"
            onClick={onOpenToolsEditor}
            className={`w-full bg-zinc-800 border-zinc-700 hover:bg-zinc-700 justify-start ${
              settings.tools_enabled ? "border-purple-600" : ""
            }`}
          >
            <Wrench className="w-4 h-4 mr-2 shrink-0" />
            <span>
              Tools {settings.tools_enabled ? `(${(settings.tools_config as ToolDefinition[])?.length || 0})` : "(Off)"}
            </span>
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
