"use client";

import { useState, useEffect, useCallback } from "react";
import { SavedModel } from "@/types";

const STORAGE_KEY = "ai-workshop-models";

export function useSavedModels() {
  const [models, setModels] = useState<SavedModel[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load models from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setModels(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load saved models:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save models to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(models));
      } catch (error) {
        console.error("Failed to save models:", error);
      }
    }
  }, [models, isLoaded]);

  const addModel = useCallback((modelId: string) => {
    const trimmedId = modelId.trim();
    if (!trimmedId) return false;

    // Check if model already exists
    setModels((prev) => {
      if (prev.some((m) => m.id === trimmedId)) {
        return prev;
      }
      return [
        ...prev,
        {
          id: trimmedId,
          addedAt: new Date().toISOString(),
        },
      ];
    });
    return true;
  }, []);

  const removeModel = useCallback((modelId: string) => {
    setModels((prev) => prev.filter((m) => m.id !== modelId));
  }, []);

  const hasModel = useCallback(
    (modelId: string) => {
      return models.some((m) => m.id === modelId);
    },
    [models]
  );

  return {
    models,
    addModel,
    removeModel,
    hasModel,
    isLoaded,
  };
}
