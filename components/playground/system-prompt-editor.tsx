"use client";

import { useState } from "react";
import { MessageSquare, ChevronDown } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SYSTEM_PROMPT_PRESETS } from "@/lib/presets";

interface SystemPromptEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function SystemPromptEditor({ value, onChange }: SystemPromptEditorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-zinc-400" />
          <label className="text-sm font-medium text-zinc-300">
            System Prompt
          </label>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-zinc-400 hover:text-zinc-200"
            >
              Presets
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {SYSTEM_PROMPT_PRESETS.map((preset) => (
              <DropdownMenuItem
                key={preset.id}
                onClick={() => onChange(preset.prompt)}
                className="flex flex-col items-start gap-1"
              >
                <span className="font-medium">{preset.name}</span>
                {preset.description && (
                  <span className="text-xs text-zinc-400">
                    {preset.description}
                  </span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="You are a helpful assistant..."
        className={`bg-zinc-900 border-zinc-700 text-sm resize-none transition-all ${
          isExpanded ? "min-h-[200px]" : "min-h-[80px]"
        }`}
        onFocus={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
      />

      <p className="text-xs text-zinc-500">
        {value.length} characters • ~{Math.ceil(value.length / 4)} tokens
      </p>
    </div>
  );
}
