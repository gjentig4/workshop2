"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { FileText, Trash2, Loader2, Layers, File, Eye, RefreshCw, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { createClient } from "@/lib/supabase/client";
import { Document } from "@/types";
import { toast } from "sonner";

interface Embedding {
  id: string;
  document_id: string;
  content: string;
  embedding_type: "chunk" | "document";
  chunk_index: number | null;
  created_at: string;
}

interface DocumentWithEmbeddings extends Document {
  embeddings: Embedding[];
}

interface DocumentManagerProps {
  refreshTrigger: number;
  onRefresh?: () => void;
}

export function DocumentManager({ refreshTrigger, onRefresh }: DocumentManagerProps) {
  const [documents, setDocuments] = useState<DocumentWithEmbeddings[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [expandedDocs, setExpandedDocs] = useState<Set<string>>(new Set());
  const [selectedEmbedding, setSelectedEmbedding] = useState<Embedding | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, [refreshTrigger]);

  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();

      // Fetch documents
      const { data: docs, error: docsError } = await supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });

      if (docsError) throw docsError;

      // Fetch all embeddings
      const { data: embeddings, error: embError } = await supabase
        .from("embeddings")
        .select("id, document_id, content, embedding_type, chunk_index, created_at")
        .order("chunk_index", { ascending: true });

      if (embError) throw embError;

      // Group embeddings by document
      const docsWithEmbeddings: DocumentWithEmbeddings[] = (docs || []).map((doc) => ({
        ...doc,
        embeddings: (embeddings || []).filter((e) => e.document_id === doc.id),
      }));

      setDocuments(docsWithEmbeddings);
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast.error("Failed to load documents");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDocument = async (id: string) => {
    setDeletingId(id);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("documents").delete().eq("id", id);
      if (error) throw error;

      setDocuments((prev) => prev.filter((d) => d.id !== id));
      toast.success("Document deleted");
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Failed to delete document");
    } finally {
      setDeletingId(null);
    }
  };

  const deleteEmbedding = async (embeddingId: string, documentId: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.from("embeddings").delete().eq("id", embeddingId);
      if (error) throw error;

      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === documentId
            ? { ...doc, embeddings: doc.embeddings.filter((e) => e.id !== embeddingId) }
            : doc
        )
      );
      toast.success("Embedding deleted");
    } catch (error) {
      console.error("Error deleting embedding:", error);
      toast.error("Failed to delete embedding");
    }
  };

  const toggleExpanded = (docId: string) => {
    setExpandedDocs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(docId)) {
        newSet.delete(docId);
      } else {
        newSet.add(docId);
      }
      return newSet;
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-zinc-500" />
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
        <p className="text-sm text-zinc-500">No documents uploaded yet</p>
        <p className="text-xs text-zinc-600 mt-1">
          Go to Upload tab to add files
        </p>
      </div>
    );
  }

  const totalEmbeddings = documents.reduce((sum, doc) => sum + doc.embeddings.length, 0);
  const chunkCount = documents.reduce(
    (sum, doc) => sum + doc.embeddings.filter((e) => e.embedding_type === "chunk").length,
    0
  );
  const docCount = documents.reduce(
    (sum, doc) => sum + doc.embeddings.filter((e) => e.embedding_type === "document").length,
    0
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div className="text-[10px] text-zinc-500 truncate min-w-0">
          {documents.length} docs • {totalEmbeddings} emb
          {chunkCount > 0 && <span className="text-blue-400"> ({chunkCount}ch)</span>}
          {docCount > 0 && <span className="text-emerald-400"> ({docCount}doc)</span>}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            fetchDocuments();
            onRefresh?.();
          }}
          className="h-6 w-6 p-0 shrink-0"
          title="Refresh document list"
        >
          <RefreshCw className="w-3 h-3" />
        </Button>
      </div>

      <div className="h-[300px] overflow-y-auto overflow-x-hidden pr-1">
        <div className="space-y-1.5">
          {documents.map((doc) => {
            const chunks = doc.embeddings.filter((e) => e.embedding_type === "chunk");
            const wholeDoc = doc.embeddings.filter((e) => e.embedding_type === "document");
            const isExpanded = expandedDocs.has(doc.id);

            return (
              <Collapsible key={doc.id} open={isExpanded} onOpenChange={() => toggleExpanded(doc.id)}>
                <div className="rounded bg-zinc-900/50 border border-zinc-800">
                  <CollapsibleTrigger asChild>
                    <div className="p-1.5 cursor-pointer hover:bg-zinc-800/50 transition-colors">
                      <div className="flex items-center gap-1">
                        {isExpanded ? (
                          <ChevronDown className="w-3 h-3 text-zinc-400 shrink-0" />
                        ) : (
                          <ChevronRight className="w-3 h-3 text-zinc-400 shrink-0" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p 
                            className="text-[11px] text-zinc-200 truncate" 
                            title={doc.filename}
                          >
                            {doc.filename}
                          </p>
                          <div className="flex gap-1 mt-0.5">
                            {chunks.length > 0 && (
                              <Badge
                                variant="secondary"
                                className="text-[9px] h-3.5 px-1 py-0 bg-blue-950/50 text-blue-300 border-blue-800/50"
                              >
                                <Layers className="w-2 h-2 mr-0.5" />
                                {chunks.length}
                              </Badge>
                            )}
                            {wholeDoc.length > 0 && (
                              <Badge
                                variant="secondary"
                                className="text-[9px] h-3.5 px-1 py-0 bg-emerald-950/50 text-emerald-300 border-emerald-800/50"
                              >
                                <FileText className="w-2 h-2 mr-0.5" />
                                doc
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-5 w-5 text-zinc-500 hover:text-red-400 hover:bg-red-950/30 shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteDocument(doc.id);
                          }}
                          disabled={deletingId === doc.id}
                        >
                          {deletingId === doc.id ? (
                            <Loader2 className="w-2.5 h-2.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-2.5 h-2.5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="border-t border-zinc-800 p-1.5 space-y-1 bg-zinc-950/50">
                      {doc.embeddings.map((emb) => (
                        <div
                          key={emb.id}
                          className="flex items-center justify-between p-1.5 rounded bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors group"
                        >
                          <div className="flex items-center gap-1.5 min-w-0 flex-1">
                            {emb.embedding_type === "chunk" ? (
                              <Layers className="w-2.5 h-2.5 text-blue-400 shrink-0" />
                            ) : (
                              <FileText className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                            )}
                            <span className="text-[10px] text-zinc-400 truncate">
                              {emb.embedding_type === "chunk"
                                ? `Chunk ${(emb.chunk_index ?? 0) + 1}`
                                : "Whole"}
                            </span>
                            <span className="text-[10px] text-zinc-600">
                              {(emb.content.length / 1024).toFixed(1)}KB
                            </span>
                          </div>
                          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-5 w-5 text-zinc-500 hover:text-zinc-300"
                              onClick={() => setSelectedEmbedding(emb)}
                            >
                              <Eye className="w-2.5 h-2.5" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-5 w-5 text-zinc-500 hover:text-red-400"
                              onClick={() => deleteEmbedding(emb.id, doc.id)}
                            >
                              <Trash2 className="w-2.5 h-2.5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
        </div>
      </div>

      {/* Embedding Preview Modal */}
      <Dialog open={!!selectedEmbedding} onOpenChange={() => setSelectedEmbedding(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 max-w-4xl max-h-[85vh] flex flex-col overflow-hidden">
          <DialogHeader className="shrink-0">
            <DialogTitle className="flex items-center gap-2">
              {selectedEmbedding?.embedding_type === "chunk" ? (
                <>
                  <Layers className="w-5 h-5 text-blue-400" />
                  Chunk {(selectedEmbedding?.chunk_index ?? 0) + 1}
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5 text-emerald-400" />
                  Whole Document Embedding
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="text-sm text-zinc-400 shrink-0">
            {((selectedEmbedding?.content.length || 0) / 1024).toFixed(1)} KB •{" "}
            {selectedEmbedding?.content.split(/\s+/).length} words
          </div>

          <ScrollArea className="flex-1 min-h-0 mt-4">
            <div className="pr-4 pb-4">
              <div className="bg-zinc-800/50 p-4 rounded-lg text-zinc-300 prose prose-invert prose-sm max-w-none">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="my-2 first:mt-0 last:mb-0">{children}</p>,
                    ul: ({ children }) => <ul className="my-2 ml-4 list-disc space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="my-2 ml-4 list-decimal space-y-1">{children}</ol>,
                    li: ({ children }) => <li className="pl-1">{children}</li>,
                    h1: ({ children }) => <h1 className="text-xl font-bold my-3 first:mt-0 text-zinc-100">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-lg font-bold my-2 first:mt-0 text-zinc-100">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-base font-bold my-2 first:mt-0 text-zinc-100">{children}</h3>,
                    strong: ({ children }) => <strong className="font-semibold text-zinc-100">{children}</strong>,
                    code: ({ children }) => <code className="bg-zinc-700 px-1 py-0.5 rounded text-cyan-400 text-xs">{children}</code>,
                    img: ({ src, alt }) => (
                      <span className="block my-2">
                        <img 
                          src={src} 
                          alt={alt || "Image"} 
                          className="max-w-full h-auto rounded-lg border border-zinc-700"
                          loading="lazy"
                        />
                        {alt && <span className="block text-xs text-zinc-500 mt-1 italic">{alt}</span>}
                      </span>
                    ),
                  }}
                >
                  {selectedEmbedding?.content || ""}
                </ReactMarkdown>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
