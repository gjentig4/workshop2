"use client";

import { Switch } from "@/components/ui/switch";
import { PlaygroundSettings } from "@/types";
import {
  Radio,
  Eye,
  Wrench,
  Braces,
  MessageSquare,
  Brain,
} from "lucide-react";

interface FeatureTogglesProps {
  settings: PlaygroundSettings;
  onSettingsChange: (settings: PlaygroundSettings) => void;
  modelSupportsReasoning?: boolean;
}

export function FeatureToggles({
  settings,
  onSettingsChange,
  modelSupportsReasoning = false,
}: FeatureTogglesProps) {
  const toggles = [
    {
      key: "enableStreaming" as const,
      label: "Streaming",
      description: "Stream response tokens as they're generated",
      icon: Radio,
      show: true,
    },
    {
      key: "enableSystemPrompt" as const,
      label: "System Prompt",
      description: "Include a system message to set behavior",
      icon: MessageSquare,
      show: true,
    },
    {
      key: "showThinking" as const,
      label: "Show Thinking",
      description: "Display reasoning/thinking from the model",
      icon: Brain,
      show: settings.enableReasoning && modelSupportsReasoning,
    },
    {
      key: "enableTracing" as const,
      label: "Langfuse Tracing",
      description: "Send traces to Langfuse for observability",
      icon: Eye,
      show: true,
    },
    {
      key: "enableTools" as const,
      label: "Tool Calling",
      description: "Enable function calling capabilities",
      icon: Wrench,
      show: true,
    },
    {
      key: "enableStructuredOutput" as const,
      label: "Structured Output",
      description: "Force JSON output with a schema",
      icon: Braces,
      show: true,
    },
  ];

  const handleToggle = (key: keyof PlaygroundSettings, value: boolean) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const visibleToggles = toggles.filter((t) => t.show);

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-zinc-300">Features</label>

      <div className="space-y-2">
        {visibleToggles.map((toggle) => {
          const Icon = toggle.icon;
          const isEnabled = settings[toggle.key] as boolean;

          return (
            <div
              key={toggle.key}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                isEnabled
                  ? "bg-zinc-800/50 border border-zinc-700"
                  : "bg-zinc-900/30 border border-zinc-800/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${
                    isEnabled ? "text-cyan-400" : "text-zinc-500"
                  }`}
                />
                <div>
                  <div className="text-sm font-medium text-zinc-200">
                    {toggle.label}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {toggle.description}
                  </div>
                </div>
              </div>
              <Switch
                checked={isEnabled}
                onCheckedChange={(checked) => handleToggle(toggle.key, checked)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
