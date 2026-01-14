"use client";

import { useState, useEffect } from "react";
import { LangfusePrompt } from "@/types";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { RefreshCw, Upload, Save, FileText, Info } from "lucide-react";

interface PromptEditorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPromptName: string | null;
  currentPromptVersion: number | null;
  onSave: (promptName: string, promptVersion: number, promptContent: string) => void;
}

interface LangfusePromptListItem {
  name: string;
  version: number;
  labels: string[];
}

export function PromptEditorModal({
  open,
  onOpenChange,
  currentPromptName,
  currentPromptVersion,
  onSave,
}: PromptEditorModalProps) {
  const [prompts, setPrompts] = useState<LangfusePromptListItem[]>([]);
  const [selectedPromptName, setSelectedPromptName] = useState<string | null>(currentPromptName);
  const [promptContent, setPromptContent] = useState("");
  const [promptVersion, setPromptVersion] = useState<number | null>(currentPromptVersion);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveAsNew, setSaveAsNew] = useState(false);
  const [newPromptName, setNewPromptName] = useState("");
  const [commitMessage, setCommitMessage] = useState("");
  const [pushToProduction, setPushToProduction] = useState(true);
  const [hasLocalEdits, setHasLocalEdits] = useState(false);
  const [localContent, setLocalContent] = useState("");

  // Fetch prompts list
  const fetchPrompts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/langfuse/prompts");
      if (!response.ok) throw new Error("Failed to fetch prompts");
      const data = await response.json();
      // Langfuse returns { data: [...] } for list endpoint
      setPrompts(data.data || []);
    } catch (error) {
      console.error("Error fetching prompts:", error);
      toast.error("Failed to load prompts from Langfuse");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch specific prompt content
  const fetchPromptContent = async (name: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/langfuse/prompts?name=${encodeURIComponent(name)}`);
      if (!response.ok) throw new Error("Failed to fetch prompt");
      const data: LangfusePrompt = await response.json();
      setPromptContent(data.prompt);
      setPromptVersion(data.version);
      setSelectedPromptName(name);
    } catch (error) {
      console.error("Error fetching prompt:", error);
      toast.error("Failed to load prompt content");
    } finally {
      setIsLoading(false);
    }
  };

  // Load prompts on open
  useEffect(() => {
    if (open) {
      fetchPrompts();
      // If user has local edits, show those instead of fetching from Langfuse
      if (hasLocalEdits && localContent) {
        setPromptContent(localContent);
      } else if (currentPromptName) {
        fetchPromptContent(currentPromptName);
      }
    }
  }, [open, currentPromptName, hasLocalEdits, localContent]);

  // Save prompt to Langfuse
  const handleSave = async () => {
    if (!promptContent.trim()) {
      toast.error("Prompt content cannot be empty");
      return;
    }

    const name = saveAsNew ? newPromptName : selectedPromptName;
    if (!name) {
      toast.error("Please provide a prompt name");
      return;
    }

    setIsSaving(true);
    try {
      // Build labels array - only include production label, not commit message
      const labels: string[] = [];
      if (pushToProduction) {
        labels.push("production");
      }

      const response = await fetch("/api/langfuse/prompts", {
        method: saveAsNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          prompt: promptContent,
          labels,
          commitMessage: commitMessage || undefined, // Commit message as separate field
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || "Failed to save prompt");
      }

      const data = await response.json();
      toast.success(
        `Prompt ${saveAsNew ? "created" : "updated"}${pushToProduction ? " and pushed to production" : ""}`
      );
      
      // Update parent with new prompt info
      onSave(name, data.version || 1, promptContent);
      setShowSaveDialog(false);
      setHasLocalEdits(false);
      onOpenChange(false);
      
      // Reset state
      setNewPromptName("");
      setCommitMessage("");
      setSaveAsNew(false);
      setPushToProduction(true);
    } catch (error) {
      console.error("Error saving prompt:", error);
      toast.error(error instanceof Error ? error.message : "Failed to save prompt");
    } finally {
      setIsSaving(false);
    }
  };

  const handleApply = () => {
    // Apply uses the prompt locally for chat (doesn't save to Langfuse)
    onSave(selectedPromptName || "local", promptVersion || 0, promptContent);
    setLocalContent(promptContent);
    setHasLocalEdits(true);
    onOpenChange(false);
    toast.info("Prompt applied locally. Use 'Save' buttons to push to Langfuse.");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-zinc-900 border-zinc-800 max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              System Prompt Editor
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 flex flex-col gap-4 overflow-hidden">
            {/* Prompt Selector */}
            <div className="flex items-center gap-3">
              <Select
                value={selectedPromptName || ""}
                onValueChange={(name) => {
                  if (name) fetchPromptContent(name);
                }}
                disabled={isLoading}
              >
                <SelectTrigger className="flex-1 bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Select a prompt from Langfuse..." />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700 max-h-64">
                  {prompts.map((p) => (
                    <SelectItem key={p.name} value={p.name}>
                      {p.name} (v{p.version})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                onClick={fetchPrompts}
                disabled={isLoading}
                className="bg-zinc-800 border-zinc-700"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              </Button>
            </div>

            {/* Version Info */}
            {selectedPromptName && promptVersion !== null && (
              <div className="text-sm text-zinc-500">
                Editing: <span className="text-zinc-300">{selectedPromptName}</span>{" "}
                <span className="text-zinc-400">v{promptVersion}</span>
              </div>
            )}

            {/* Prompt Editor */}
            <Textarea
              value={promptContent}
              onChange={(e) => setPromptContent(e.target.value)}
              placeholder="Enter your system prompt here..."
              className="flex-1 bg-zinc-800 border-zinc-700 font-mono text-sm resize-none min-h-[300px]"
            />
          </div>

          {/* Local edits indicator */}
          {hasLocalEdits && (
            <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-950/30 px-3 py-1.5 rounded">
              <Info className="w-3 h-3" />
              You have unsaved local edits. Save to Langfuse to persist them.
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSaveAsNew(true);
                  setShowSaveDialog(true);
                }}
                className="bg-zinc-800 border-zinc-700 text-xs"
              >
                <Upload className="w-3 h-3 mr-1" />
                Save New
              </Button>
              {selectedPromptName && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSaveAsNew(false);
                    setShowSaveDialog(true);
                  }}
                  className="bg-zinc-800 border-zinc-700 text-xs"
                >
                  <Save className="w-3 h-3 mr-1" />
                  Update
                </Button>
              )}
            </div>
            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleApply} disabled={!promptContent.trim()}>
                Apply Locally
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Save Confirmation Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 max-w-md">
          <DialogHeader>
            <DialogTitle>
              {saveAsNew ? "Save as New Prompt" : "Update Prompt"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {saveAsNew && (
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Prompt Name</label>
                <Input
                  value={newPromptName}
                  onChange={(e) => setNewPromptName(e.target.value)}
                  placeholder="e.g., teamleader-support-v1"
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Commit Message (optional)</label>
              <Input
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                placeholder="e.g., Added billing FAQ handling"
                className="bg-zinc-800 border-zinc-700"
              />
              <p className="text-xs text-zinc-500">
                Describe what changed in this version
              </p>
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded bg-zinc-800/50">
              <div>
                <label className="text-sm text-zinc-300">Push to Production</label>
                <p className="text-xs text-zinc-500">
                  Add &quot;production&quot; label so this version is fetched by default
                </p>
              </div>
              <Switch
                checked={pushToProduction}
                onCheckedChange={setPushToProduction}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || (saveAsNew && !newPromptName.trim())}
            >
              {isSaving ? "Saving..." : pushToProduction ? "Save & Push to Prod" : "Save (Draft)"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
