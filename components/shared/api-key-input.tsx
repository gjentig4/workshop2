"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Key, Check, X } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ApiKeyInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  description?: string;
  className?: string;
}

export function ApiKeyInput({
  value,
  onChange,
  placeholder = "sk-or-v1-...",
  label = "OpenRouter API Key",
  description = "Optional: Use your own API key instead of the default one",
  className = "",
}: ApiKeyInputProps) {
  const [showKey, setShowKey] = useState(false);
  const [isOpen, setIsOpen] = useState(!!value);

  const hasKey = value.trim().length > 0;
  const isValidFormat = !value || value.startsWith("sk-or-");

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-between p-3 hover:bg-zinc-800/50"
        >
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            <span className="font-medium text-sm">{label}</span>
            {hasKey && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-green-900/50 text-green-400 border border-green-800">
                Custom
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasKey ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : null}
          </div>
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="px-4 pb-4 space-y-2">
        <p className="text-xs text-zinc-500">{description}</p>
        
        <div className="relative">
          <Input
            type={showKey ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`bg-zinc-800 border-zinc-700 pr-20 font-mono text-sm ${
              !isValidFormat ? "border-red-500" : ""
            }`}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {hasKey && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-zinc-700"
                onClick={() => onChange("")}
              >
                <X className="w-3 h-3 text-zinc-400" />
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-zinc-700"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? (
                <EyeOff className="w-3 h-3 text-zinc-400" />
              ) : (
                <Eye className="w-3 h-3 text-zinc-400" />
              )}
            </Button>
          </div>
        </div>

        {!isValidFormat && (
          <p className="text-xs text-red-400">
            OpenRouter API keys should start with &quot;sk-or-&quot;
          </p>
        )}

        <p className="text-xs text-zinc-600">
          Get your API key at{" "}
          <a
            href="https://openrouter.ai/keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-500 hover:text-cyan-400 underline"
          >
            openrouter.ai/keys
          </a>
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
}
