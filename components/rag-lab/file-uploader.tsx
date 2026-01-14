"use client";

import { useState, useCallback } from "react";
import { Upload, File, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FileUploaderProps {
  strategy: "chunk" | "document" | "both";
  chunkSize: number;
  chunkOverlap: number;
  onUploadComplete: () => void;
}

export function FileUploader({
  strategy,
  chunkSize,
  chunkOverlap,
  onUploadComplete,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) =>
        file.type === "text/plain" ||
        file.type === "text/markdown" ||
        file.type === "application/json" ||
        file.name.endsWith(".md") ||
        file.name.endsWith(".txt") ||
        file.name.endsWith(".json")
    );

    setFiles((prev) => [...prev, ...droppedFiles]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;

    setIsUploading(true);

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("strategy", strategy);
        formData.append("chunkSize", chunkSize.toString());
        formData.append("chunkOverlap", chunkOverlap.toString());

        const response = await fetch("/api/rag/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Upload failed");
        }

        const result = await response.json();
        toast.success(`Uploaded ${file.name}`, {
          description: `Created ${result.embeddings.count} embeddings`,
        });
      }

      setFiles([]);
      onUploadComplete();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          isDragging
            ? "border-cyan-500 bg-cyan-950/20"
            : "border-zinc-700 hover:border-zinc-600"
        }`}
      >
        <Upload
          className={`w-10 h-10 mx-auto mb-4 ${
            isDragging ? "text-cyan-400" : "text-zinc-500"
          }`}
        />
        <p className="text-sm text-zinc-400 mb-2">
          Drag & drop files here, or{" "}
          <label className="text-cyan-400 hover:text-cyan-300 cursor-pointer">
            browse
            <input
              type="file"
              multiple
              accept=".txt,.md,.json"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </p>
        <p className="text-xs text-zinc-500">
          Supports .txt, .md, and .json files
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 border border-zinc-800"
            >
              <div className="flex items-center gap-3 min-w-0">
                <File className="w-4 h-4 text-zinc-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-zinc-200 truncate">{file.name}</p>
                  <p className="text-xs text-zinc-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-zinc-500 hover:text-zinc-300"
                onClick={() => removeFile(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}

          <Button
            onClick={uploadFiles}
            disabled={isUploading}
            className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload {files.length} file{files.length > 1 ? "s" : ""}
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
