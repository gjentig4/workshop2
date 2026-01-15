"use client";

import { useState } from "react";
import { RAGSearchResult } from "@/types";
import { Button } from "@/components/ui/button";
import { MarkdownWithFrontmatter } from "@/components/shared/markdown-with-frontmatter";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronDown, ChevronRight, FileText, ExternalLink } from "lucide-react";

interface ContextPreviewProps {
  context: RAGSearchResult[];
  isLoading?: boolean;
}

export function ContextPreview({ context, isLoading }: ContextPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<RAGSearchResult | null>(null);

  if (context.length === 0 && !isLoading) {
    return null;
  }

  return (
    <>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-between p-3 hover:bg-zinc-800/50 border border-zinc-800 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium">
                Retrieved Context
                {context.length > 0 && (
                  <span className="text-zinc-500 ml-1">({context.length} results)</span>
                )}
              </span>
            </div>
            {isOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-2 space-y-2">
          {isLoading ? (
            <div className="p-4 text-center text-zinc-500">
              Searching documents...
            </div>
          ) : (
            context.map((result, index) => (
              <div
                key={`${result.documentId}-${result.chunkIndex ?? 0}-${index}`}
                className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:border-zinc-600 cursor-pointer transition-colors"
                onClick={() => setSelectedResult(result)}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <FileText className="w-4 h-4 text-zinc-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {result.filename}
                    </div>
                    {result.embeddingType === "chunk" && result.chunkIndex !== null && (
                      <div className="text-xs text-zinc-500">
                        Chunk {result.chunkIndex + 1}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`text-xs font-mono px-2 py-1 rounded ${
                      result.similarity > 0.8
                        ? "bg-green-950/50 text-green-400"
                        : result.similarity > 0.6
                        ? "bg-amber-950/50 text-amber-400"
                        : "bg-zinc-700 text-zinc-400"
                    }`}
                  >
                    {(result.similarity * 100).toFixed(0)}%
                  </div>
                  <ExternalLink className="w-4 h-4 text-zinc-500" />
                </div>
              </div>
            ))
          )}
        </CollapsibleContent>
      </Collapsible>

      {/* Detail Modal */}
      <Dialog open={!!selectedResult} onOpenChange={() => setSelectedResult(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 w-[95vw] max-w-7xl h-[90vh] flex flex-col">
          <DialogHeader className="shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              <span className="truncate">{selectedResult?.filename}</span>
              {selectedResult?.embeddingType === "chunk" && selectedResult.chunkIndex !== null && (
                <span className="text-sm text-zinc-500 font-normal shrink-0">
                  (Chunk {selectedResult.chunkIndex + 1})
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-4 text-sm text-zinc-400 shrink-0 pb-2">
            <div>
              Similarity:{" "}
              <span
                className={`font-mono ${
                  selectedResult && selectedResult.similarity > 0.8
                    ? "text-green-400"
                    : selectedResult && selectedResult.similarity > 0.6
                    ? "text-amber-400"
                    : "text-zinc-300"
                }`}
              >
                {selectedResult ? (selectedResult.similarity * 100).toFixed(1) : 0}%
              </span>
            </div>
            <div>
              Type:{" "}
              <span className="text-zinc-300 capitalize">
                {selectedResult?.embeddingType}
              </span>
            </div>
            <div>
              Size:{" "}
              <span className="text-zinc-300">
                {((selectedResult?.content.length || 0) / 1024).toFixed(1)} KB
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="bg-zinc-800/50 p-4 rounded-lg text-zinc-300 prose prose-invert prose-xs max-w-none text-xs">
              <MarkdownWithFrontmatter content={selectedResult?.content || ""} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
