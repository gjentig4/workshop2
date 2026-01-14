"use client";

import { useState } from "react";
import { ToolDefinition } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "sonner";
import { Plus, Trash2, ChevronDown, ChevronRight, Wrench } from "lucide-react";

interface ToolsEditorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  toolsEnabled: boolean;
  tools: ToolDefinition[];
  onSave: (enabled: boolean, tools: ToolDefinition[]) => void;
}

// Preset tool configurations
const TOOL_PRESETS: Record<string, ToolDefinition[]> = {
  "Teamleader Support": [
    {
      name: "search_knowledge_base",
      description: "Search the Teamleader knowledge base for relevant articles and documentation",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "The search query to find relevant help articles",
          },
        },
        required: ["query"],
      },
    },
    {
      name: "get_customer_info",
      description: "Retrieve customer information by ID or email",
      parameters: {
        type: "object",
        properties: {
          customer_id: {
            type: "string",
            description: "The customer's unique ID",
          },
          email: {
            type: "string",
            description: "The customer's email address",
          },
        },
      },
    },
    {
      name: "create_support_ticket",
      description: "Create a new support ticket for the customer",
      parameters: {
        type: "object",
        properties: {
          subject: {
            type: "string",
            description: "The ticket subject",
          },
          description: {
            type: "string",
            description: "Detailed description of the issue",
          },
          priority: {
            type: "string",
            enum: ["low", "medium", "high", "urgent"],
            description: "Ticket priority level",
          },
        },
        required: ["subject", "description"],
      },
    },
    {
      name: "escalate_to_human",
      description: "Escalate the conversation to a human support agent",
      parameters: {
        type: "object",
        properties: {
          reason: {
            type: "string",
            description: "Reason for escalation",
          },
          context: {
            type: "string",
            description: "Summary of the conversation so far",
          },
        },
        required: ["reason"],
      },
    },
  ],
  "Basic": [
    {
      name: "get_current_time",
      description: "Get the current date and time",
      parameters: {
        type: "object",
        properties: {
          timezone: {
            type: "string",
            description: "The timezone to get time for (e.g., 'Europe/Brussels')",
          },
        },
      },
    },
  ],
};

export function ToolsEditorModal({
  open,
  onOpenChange,
  toolsEnabled,
  tools,
  onSave,
}: ToolsEditorModalProps) {
  const [enabled, setEnabled] = useState(toolsEnabled);
  const [localTools, setLocalTools] = useState<ToolDefinition[]>(tools);
  const [expandedTools, setExpandedTools] = useState<Set<number>>(new Set());

  // Reset state when modal opens
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setEnabled(toolsEnabled);
      setLocalTools(tools);
      setExpandedTools(new Set());
    }
    onOpenChange(isOpen);
  };

  const addTool = () => {
    const newTool: ToolDefinition = {
      name: "new_tool",
      description: "Description of what this tool does",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    };
    setLocalTools([...localTools, newTool]);
    setExpandedTools(new Set([...expandedTools, localTools.length]));
  };

  const updateTool = (index: number, updates: Partial<ToolDefinition>) => {
    const updated = [...localTools];
    updated[index] = { ...updated[index], ...updates };
    setLocalTools(updated);
  };

  const updateToolParameters = (index: number, parametersJson: string) => {
    try {
      const parameters = JSON.parse(parametersJson);
      updateTool(index, { parameters });
    } catch {
      // Invalid JSON, don't update
    }
  };

  const deleteTool = (index: number) => {
    setLocalTools(localTools.filter((_, i) => i !== index));
    const newExpanded = new Set<number>();
    expandedTools.forEach((i) => {
      if (i < index) newExpanded.add(i);
      else if (i > index) newExpanded.add(i - 1);
    });
    setExpandedTools(newExpanded);
  };

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedTools);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedTools(newExpanded);
  };

  const loadPreset = (presetName: string) => {
    const preset = TOOL_PRESETS[presetName];
    if (preset) {
      setLocalTools(preset);
      setEnabled(true);
      toast.success(`Loaded ${presetName} preset`);
    }
  };

  const handleSave = () => {
    // Validate tools
    for (const tool of localTools) {
      if (!tool.name.trim()) {
        toast.error("All tools must have a name");
        return;
      }
    }
    onSave(enabled, localTools);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 max-w-3xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Tools Configuration
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400">Enable Tools</span>
              <Switch checked={enabled} onCheckedChange={setEnabled} />
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-3">
          {/* Presets */}
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
            <span className="text-sm text-zinc-500">Load Preset:</span>
            {Object.keys(TOOL_PRESETS).map((presetName) => (
              <Button
                key={presetName}
                variant="outline"
                size="sm"
                onClick={() => loadPreset(presetName)}
                className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
              >
                {presetName}
              </Button>
            ))}
          </div>

          {/* Add Tool Button */}
          <Button
            variant="outline"
            onClick={addTool}
            className="w-full bg-zinc-800 border-zinc-700 border-dashed hover:bg-zinc-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Tool
          </Button>

          {/* Tool Cards */}
          {localTools.map((tool, index) => (
            <Collapsible
              key={index}
              open={expandedTools.has(index)}
              onOpenChange={() => toggleExpanded(index)}
            >
              <div className="border border-zinc-700 rounded-lg overflow-hidden">
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between p-3 bg-zinc-800/50 cursor-pointer hover:bg-zinc-800">
                    <div className="flex items-center gap-2">
                      {expandedTools.has(index) ? (
                        <ChevronDown className="w-4 h-4 text-zinc-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-zinc-400" />
                      )}
                      <Wrench className="w-4 h-4 text-purple-400" />
                      <span className="font-mono text-sm">{tool.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTool(index);
                      }}
                      className="text-red-400 hover:text-red-300 hover:bg-red-950/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="p-4 space-y-4 border-t border-zinc-700">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-zinc-400">Name</label>
                        <Input
                          value={tool.name}
                          onChange={(e) => updateTool(index, { name: e.target.value })}
                          placeholder="tool_name"
                          className="bg-zinc-800 border-zinc-700 font-mono"
                        />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <label className="text-sm text-zinc-400">Description</label>
                        <Input
                          value={tool.description}
                          onChange={(e) => updateTool(index, { description: e.target.value })}
                          placeholder="What this tool does..."
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-zinc-400">Parameters (JSON Schema)</label>
                      <Textarea
                        value={JSON.stringify(tool.parameters, null, 2)}
                        onChange={(e) => updateToolParameters(index, e.target.value)}
                        className="bg-zinc-800 border-zinc-700 font-mono text-sm min-h-[150px]"
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}

          {localTools.length === 0 && (
            <div className="text-center py-8 text-zinc-500">
              No tools configured. Add a tool or load a preset.
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Tools ({localTools.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
