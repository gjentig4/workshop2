"use client";

import { useState, useEffect, useCallback } from "react";
import { Profile, Message, ToolDefinition, RAGSettings } from "@/types";
import { toast } from "sonner";

// Components
import { ProfileSelector } from "@/components/rag-lab/profile-selector";
import { SettingsPanel } from "@/components/rag-lab/settings-panel";
import { PromptEditorModal } from "@/components/rag-lab/prompt-editor-modal";
import { ToolsEditorModal } from "@/components/rag-lab/tools-editor-modal";
import { DocumentManager } from "@/components/rag-lab/document-manager";
import { FileUploader } from "@/components/rag-lab/file-uploader";
import { EmbeddingStrategySelector } from "@/components/rag-lab/embedding-strategy-selector";
import { LearningModePanel } from "@/components/rag-lab/learning-mode-panel";
import { RAGChat } from "@/components/rag-lab/rag-chat";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FolderOpen } from "lucide-react";

const DEFAULT_SETTINGS: Partial<Profile> = {
  model: "anthropic/claude-sonnet-4.5",
  temperature: 0.7,
  reasoning_enabled: false,
  reasoning_effort: "medium",
  streaming_enabled: true,
  tracing_enabled: true,
  tools_enabled: false,
  tools_config: [],
  structured_output_enabled: false,
  embedding_strategy: "document",
  top_k: 5,
  similarity_threshold: 0.1,
};

const DEFAULT_RAG_SETTINGS: RAGSettings = {
  embeddingStrategy: "document",
  chunkSize: 1000,
  chunkOverlap: 200,
  topK: 5,
  similarityThreshold: 0.1,
};

export default function RAGLabPage() {
  // Profile state
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(true);

  // Settings state (local copy for editing)
  const [settings, setSettings] = useState<Partial<Profile>>(DEFAULT_SETTINGS);
  const [originalSettings, setOriginalSettings] = useState<Partial<Profile>>(DEFAULT_SETTINGS);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Prompt state
  const [systemPrompt, setSystemPrompt] = useState("");
  const [promptName, setPromptName] = useState<string | null>(null);
  const [promptVersion, setPromptVersion] = useState<number | null>(null);

  // Modal state
  const [showPromptEditor, setShowPromptEditor] = useState(false);
  const [showToolsEditor, setShowToolsEditor] = useState(false);

  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);

  // Document refresh
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // RAG/Embedding settings (for uploads)
  const [ragSettings, setRagSettings] = useState<RAGSettings>(DEFAULT_RAG_SETTINGS);

  // Learning mode - external input for chat
  const [learningModeInput, setLearningModeInput] = useState<string>("");

  // Fetch profiles on mount
  useEffect(() => {
    fetchProfiles();
  }, []);

  // Check for unsaved changes
  useEffect(() => {
    const hasChanges = JSON.stringify(settings) !== JSON.stringify(originalSettings);
    setHasUnsavedChanges(hasChanges);
  }, [settings, originalSettings]);

  const fetchProfiles = async () => {
    setIsLoadingProfiles(true);
    try {
      const response = await fetch("/api/profiles");
      if (!response.ok) throw new Error("Failed to fetch profiles");
      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      toast.error("Failed to load profiles");
    } finally {
      setIsLoadingProfiles(false);
    }
  };

  const loadProfile = async (profileId: string) => {
    try {
      const response = await fetch(`/api/profiles/${profileId}`);
      if (!response.ok) throw new Error("Failed to load profile");
      const profile: Profile = await response.json();

      // Load settings
      const profileSettings: Partial<Profile> = {
        model: profile.model,
        temperature: profile.temperature,
        reasoning_enabled: profile.reasoning_enabled,
        reasoning_effort: profile.reasoning_effort,
        streaming_enabled: profile.streaming_enabled,
        tracing_enabled: profile.tracing_enabled,
        tools_enabled: profile.tools_enabled,
        tools_config: profile.tools_config,
        structured_output_enabled: profile.structured_output_enabled,
        structured_output_schema: profile.structured_output_schema,
        embedding_strategy: profile.embedding_strategy,
        top_k: profile.top_k,
        similarity_threshold: profile.similarity_threshold ?? 0.1,
      };

      setSettings(profileSettings);
      setOriginalSettings(profileSettings);
      setMessages(profile.messages || []);
      setPromptName(profile.langfuse_prompt_name);
      setPromptVersion(profile.langfuse_prompt_version);

      // Load prompt content if exists
      if (profile.langfuse_prompt_name) {
        try {
          const promptResponse = await fetch(
            `/api/langfuse/prompts?name=${encodeURIComponent(profile.langfuse_prompt_name)}`
          );
          if (promptResponse.ok) {
            const promptData = await promptResponse.json();
            setSystemPrompt(promptData.prompt || "");
          }
        } catch {
          console.error("Failed to load prompt from Langfuse");
        }
      } else {
        setSystemPrompt("");
      }

      toast.success(`Loaded profile: ${profile.name}`);
    } catch (error) {
      console.error("Error loading profile:", error);
      toast.error("Failed to load profile");
    }
  };

  const handleSelectProfile = async (profileId: string | null) => {
    if (profileId === selectedProfileId) return;

    if (hasUnsavedChanges) {
      // Could add a confirmation dialog here
    }

    setSelectedProfileId(profileId);

    if (profileId) {
      await loadProfile(profileId);
    } else {
      setSettings(DEFAULT_SETTINGS);
      setOriginalSettings(DEFAULT_SETTINGS);
      setMessages([]);
      setSystemPrompt("");
      setPromptName(null);
      setPromptVersion(null);
    }
  };

  const handleCreateProfile = async (name: string) => {
    try {
      const response = await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          ...settings,
          langfuse_prompt_name: promptName,
          langfuse_prompt_version: promptVersion,
        }),
      });

      if (!response.ok) throw new Error("Failed to create profile");
      const newProfile = await response.json();

      setProfiles((prev) => [newProfile, ...prev]);
      setSelectedProfileId(newProfile.id);
      setOriginalSettings(settings);
      setHasUnsavedChanges(false);

      toast.success(`Created profile: ${name}`);
    } catch (error) {
      console.error("Error creating profile:", error);
      toast.error("Failed to create profile");
    }
  };

  const handleSaveProfile = async () => {
    if (!selectedProfileId) return;

    try {
      const response = await fetch(`/api/profiles/${selectedProfileId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...settings,
          langfuse_prompt_name: promptName,
          langfuse_prompt_version: promptVersion,
        }),
      });

      if (!response.ok) throw new Error("Failed to save profile");

      setOriginalSettings(settings);
      setHasUnsavedChanges(false);
      toast.success("Profile saved");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile");
    }
  };

  const handleDeleteProfile = async (profileId: string) => {
    try {
      const response = await fetch(`/api/profiles/${profileId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete profile");

      setProfiles((prev) => prev.filter((p) => p.id !== profileId));
      if (selectedProfileId === profileId) {
        setSelectedProfileId(null);
        setSettings(DEFAULT_SETTINGS);
        setOriginalSettings(DEFAULT_SETTINGS);
        setMessages([]);
      }

      toast.success("Profile deleted");
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.error("Failed to delete profile");
    }
  };

  const handlePromptSave = (name: string, version: number, content: string) => {
    setPromptName(name);
    setPromptVersion(version);
    setSystemPrompt(content);
    setSettings((prev) => ({
      ...prev,
      langfuse_prompt_name: name,
      langfuse_prompt_version: version,
    }));
  };

  const handleToolsSave = (enabled: boolean, tools: ToolDefinition[]) => {
    setSettings((prev) => ({
      ...prev,
      tools_enabled: enabled,
      tools_config: tools,
    }));
  };

  const handleUploadComplete = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleMessagesChange = useCallback((newMessages: Message[]) => {
    setMessages(newMessages);
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header with Profile Selector */}
      <div className="border-b border-zinc-800 px-4 py-3 bg-zinc-950/50">
        <ProfileSelector
          profiles={profiles}
          selectedProfileId={selectedProfileId}
          onSelectProfile={handleSelectProfile}
          onCreateProfile={handleCreateProfile}
          onDeleteProfile={handleDeleteProfile}
          onSaveProfile={handleSaveProfile}
          hasUnsavedChanges={hasUnsavedChanges}
          isLoading={isLoadingProfiles}
        />
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 shrink-0 border-r border-zinc-800 bg-zinc-950 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto overflow-x-hidden min-w-0">
            {/* Settings Panel */}
            <SettingsPanel
              settings={settings}
              onSettingsChange={setSettings}
              onOpenPromptEditor={() => setShowPromptEditor(true)}
              onOpenToolsEditor={() => setShowToolsEditor(true)}
              promptName={promptName}
            />

            {/* Document Tabs */}
            <Tabs defaultValue="documents" className="px-4 pb-4">
              <TabsList className="w-full bg-zinc-800/50">
                <TabsTrigger value="documents" className="flex-1 gap-1 text-xs">
                  <FolderOpen className="w-3 h-3" />
                  Docs
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex-1 gap-1 text-xs">
                  <Upload className="w-3 h-3" />
                  Upload
                </TabsTrigger>
              </TabsList>

              <TabsContent value="documents" className="mt-3 overflow-hidden">
                <DocumentManager 
                  refreshTrigger={refreshTrigger} 
                  onRefresh={() => setRefreshTrigger(prev => prev + 1)}
                />
              </TabsContent>

              <TabsContent value="upload" className="mt-3 space-y-4">
                <EmbeddingStrategySelector
                  settings={ragSettings}
                  onSettingsChange={setRagSettings}
                />
                <FileUploader
                  strategy={ragSettings.embeddingStrategy}
                  chunkSize={ragSettings.chunkSize}
                  chunkOverlap={ragSettings.chunkOverlap}
                  onUploadComplete={handleUploadComplete}
                />
              </TabsContent>
            </Tabs>

            {/* Learning Mode Panel */}
            <div className="border-t border-zinc-800">
              <LearningModePanel
                onSelectQuestion={(question) => setLearningModeInput(question)}
              />
            </div>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-zinc-900/30">
          <RAGChat
            profileId={selectedProfileId}
            settings={settings}
            systemPrompt={systemPrompt}
            ragSettings={{
              ...ragSettings,
              topK: settings.top_k ?? 5,
              similarityThreshold: settings.similarity_threshold ?? 0.1,
            }}
            initialMessages={messages}
            onMessagesChange={handleMessagesChange}
            externalInput={learningModeInput}
            onExternalInputConsumed={() => setLearningModeInput("")}
          />
        </main>
      </div>

      {/* Modals */}
      <PromptEditorModal
        open={showPromptEditor}
        onOpenChange={setShowPromptEditor}
        currentPromptName={promptName}
        currentPromptVersion={promptVersion}
        onSave={handlePromptSave}
      />

      <ToolsEditorModal
        open={showToolsEditor}
        onOpenChange={setShowToolsEditor}
        toolsEnabled={settings.tools_enabled ?? false}
        tools={(settings.tools_config as ToolDefinition[]) || []}
        onSave={handleToolsSave}
      />
    </div>
  );
}
