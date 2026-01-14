"use client";

import { useState, useEffect } from "react";
import { Wrench, AlertCircle, Check, ChevronDown } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ToolEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const TOOL_PRESETS = [
  {
    id: "teamleader",
    name: "Teamleader CRM Tools",
    description: "Help center, customer, and ticket tools",
    tools: [
      {
        name: "search_help_center",
        description: "Search the Teamleader help center for articles matching a query",
        parameters: {
          type: "object",
          properties: {
            query: { type: "string", description: "The search query" },
            limit: { type: "number", description: "Max results (default: 5)" },
          },
          required: ["query"],
        },
      },
      {
        name: "get_customer",
        description: "Retrieve customer information by ID or email",
        parameters: {
          type: "object",
          properties: {
            customer_id: { type: "string", description: "The customer ID" },
            email: { type: "string", description: "The customer email" },
          },
        },
      },
      {
        name: "create_ticket",
        description: "Create a support ticket for a customer",
        parameters: {
          type: "object",
          properties: {
            customer_id: { type: "string", description: "Customer ID" },
            subject: { type: "string", description: "Ticket subject" },
            description: { type: "string", description: "Issue description" },
            priority: { type: "string", enum: ["low", "medium", "high", "urgent"] },
          },
          required: ["customer_id", "subject", "description"],
        },
      },
    ],
  },
  {
    id: "weather",
    name: "Weather Tools",
    description: "Get weather information",
    tools: [
      {
        name: "get_weather",
        description: "Get current weather for a location",
        parameters: {
          type: "object",
          properties: {
            location: { type: "string", description: "City name or coordinates" },
            units: { type: "string", enum: ["celsius", "fahrenheit"] },
          },
          required: ["location"],
        },
      },
    ],
  },
  {
    id: "calculator",
    name: "Calculator Tools",
    description: "Mathematical operations",
    tools: [
      {
        name: "calculate",
        description: "Perform a mathematical calculation",
        parameters: {
          type: "object",
          properties: {
            expression: { type: "string", description: "Math expression to evaluate" },
          },
          required: ["expression"],
        },
      },
    ],
  },
  {
    id: "web",
    name: "Web Tools",
    description: "Web search and browsing",
    tools: [
      {
        name: "web_search",
        description: "Search the web for information",
        parameters: {
          type: "object",
          properties: {
            query: { type: "string", description: "Search query" },
            num_results: { type: "number", description: "Number of results" },
          },
          required: ["query"],
        },
      },
      {
        name: "fetch_url",
        description: "Fetch content from a URL",
        parameters: {
          type: "object",
          properties: {
            url: { type: "string", description: "URL to fetch" },
          },
          required: ["url"],
        },
      },
    ],
  },
];

const EXAMPLE_TOOL = `[
  {
    "name": "my_tool",
    "description": "Description of what this tool does",
    "parameters": {
      "type": "object",
      "properties": {
        "param1": {
          "type": "string",
          "description": "First parameter"
        },
        "param2": {
          "type": "number",
          "description": "Second parameter"
        }
      },
      "required": ["param1"]
    }
  }
]`;

export function ToolEditor({ value, onChange }: ToolEditorProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toolCount, setToolCount] = useState(0);

  useEffect(() => {
    if (!value.trim()) {
      setIsValid(null);
      setError(null);
      setToolCount(0);
      return;
    }

    try {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed)) {
        throw new Error("Tools must be an array");
      }
      // Validate each tool has required fields
      for (const tool of parsed) {
        if (!tool.name || !tool.description || !tool.parameters) {
          throw new Error("Each tool must have name, description, and parameters");
        }
      }
      setIsValid(true);
      setError(null);
      setToolCount(parsed.length);
    } catch (e) {
      setIsValid(false);
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setToolCount(0);
    }
  }, [value]);

  const loadPreset = (preset: typeof TOOL_PRESETS[0]) => {
    onChange(JSON.stringify(preset.tools, null, 2));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-zinc-400" />
          <label className="text-sm font-medium text-zinc-300">
            Custom Tools
          </label>
          {toolCount > 0 && (
            <span className="text-xs text-zinc-500">({toolCount} tools)</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isValid !== null && (
            <div
              className={`flex items-center gap-1 text-xs ${
                isValid ? "text-green-400" : "text-red-400"
              }`}
            >
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
              {TOOL_PRESETS.map((preset) => (
                <DropdownMenuItem
                  key={preset.id}
                  onClick={() => loadPreset(preset)}
                  className="flex flex-col items-start gap-1"
                >
                  <span className="font-medium">{preset.name}</span>
                  <span className="text-xs text-zinc-400">
                    {preset.description}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={EXAMPLE_TOOL}
        className="bg-zinc-900 border-zinc-700 text-sm font-mono min-h-[200px] resize-none"
      />

      {error && <p className="text-xs text-red-400">{error}</p>}

      {!value.trim() && (
        <button
          type="button"
          onClick={() => onChange(EXAMPLE_TOOL)}
          className="text-xs text-cyan-400 hover:text-cyan-300"
        >
          Load example tool
        </button>
      )}

      <p className="text-xs text-zinc-500">
        Define tools as a JSON array. The model will call these when appropriate.
        Tool results are mocked for demo purposes.
      </p>
    </div>
  );
}
