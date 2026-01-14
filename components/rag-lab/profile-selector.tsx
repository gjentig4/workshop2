"use client";

import { useState } from "react";
import { Profile } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Save, Plus, Trash2 } from "lucide-react";

interface ProfileSelectorProps {
  profiles: Profile[];
  selectedProfileId: string | null;
  onSelectProfile: (profileId: string | null) => void;
  onCreateProfile: (name: string) => Promise<void>;
  onDeleteProfile: (profileId: string) => Promise<void>;
  onSaveProfile: () => Promise<void>;
  hasUnsavedChanges: boolean;
  isLoading: boolean;
}

export function ProfileSelector({
  profiles,
  selectedProfileId,
  onSelectProfile,
  onCreateProfile,
  onDeleteProfile,
  onSaveProfile,
  hasUnsavedChanges,
  isLoading,
}: ProfileSelectorProps) {
  const [showNewProfileDialog, setShowNewProfileDialog] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateProfile = async () => {
    if (!newProfileName.trim()) return;
    
    setIsCreating(true);
    try {
      await onCreateProfile(newProfileName.trim());
      setNewProfileName("");
      setShowNewProfileDialog(false);
    } finally {
      setIsCreating(false);
    }
  };

  const selectedProfile = profiles.find((p) => p.id === selectedProfileId);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-400">Profile:</span>
        <Select
          value={selectedProfileId || "none"}
          onValueChange={(value) => onSelectProfile(value === "none" ? null : value)}
          disabled={isLoading}
        >
          <SelectTrigger className="w-[200px] bg-zinc-800 border-zinc-700">
            <SelectValue placeholder="Select a profile" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 border-zinc-700">
            <SelectItem value="none">No profile</SelectItem>
            {profiles.map((profile) => (
              <SelectItem key={profile.id} value={profile.id}>
                {profile.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowNewProfileDialog(true)}
        className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
      >
        <Plus className="w-4 h-4 mr-1" />
        New
      </Button>

      {selectedProfileId && (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={onSaveProfile}
            disabled={!hasUnsavedChanges || isLoading}
            className={`bg-zinc-800 border-zinc-700 hover:bg-zinc-700 ${
              hasUnsavedChanges ? "border-amber-600 text-amber-400" : ""
            }`}
          >
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteProfile(selectedProfileId)}
            className="text-red-400 hover:text-red-300 hover:bg-red-950/30"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </>
      )}

      {hasUnsavedChanges && (
        <span className="text-xs text-amber-400">Unsaved changes</span>
      )}

      {/* New Profile Dialog */}
      <Dialog open={showNewProfileDialog} onOpenChange={setShowNewProfileDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle>Create New Profile</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={newProfileName}
              onChange={(e) => setNewProfileName(e.target.value)}
              placeholder="Profile name..."
              className="bg-zinc-800 border-zinc-700"
              onKeyDown={(e) => e.key === "Enter" && handleCreateProfile()}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setShowNewProfileDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateProfile}
              disabled={!newProfileName.trim() || isCreating}
            >
              {isCreating ? "Creating..." : "Create Profile"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
