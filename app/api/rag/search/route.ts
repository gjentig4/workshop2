import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateEmbedding } from "@/lib/embeddings";
import { RAGSearchResult } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, topK = 5, embeddingType, similarityThreshold = 0.1 } = body;

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);

    const supabase = await createClient();

    // Build the similarity search query
    // We use 0.0 threshold in the RPC to get all results, then filter client-side
    // This gives more control and allows for debugging
    let searchQuery = supabase.rpc("match_embeddings", {
      query_embedding: JSON.stringify(queryEmbedding),
      match_threshold: 0.0, // Get all, filter below
      match_count: topK * 2, // Get extra to filter
    });

    // Filter by embedding type if specified
    if (embeddingType && (embeddingType === "chunk" || embeddingType === "document")) {
      searchQuery = searchQuery.eq("embedding_type", embeddingType);
    }

    const { data, error } = await searchQuery;

    if (error) {
      console.error("Search error:", error);
      
      // If the RPC doesn't exist, fall back to a simpler query
      // This is expected on first run before we create the function
      const { data: fallbackData, error: fallbackError } = await supabase
        .from("embeddings")
        .select(`
          id,
          content,
          embedding_type,
          chunk_index,
          document_id,
          documents (filename)
        `)
        .limit(topK);

      if (fallbackError) {
        return NextResponse.json(
          { error: "Search failed", details: fallbackError.message },
          { status: 500 }
        );
      }

      // Return without similarity scores (RPC not set up)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const results: RAGSearchResult[] = (fallbackData || []).map((row: any) => ({
        content: row.content,
        documentId: row.document_id,
        filename: row.documents?.filename || (Array.isArray(row.documents) ? row.documents[0]?.filename : null) || "Unknown",
        similarity: 0,
        embeddingType: row.embedding_type,
        chunkIndex: row.chunk_index,
      }));

      return NextResponse.json({
        results,
        note: "Similarity search not configured. Results are unranked.",
      });
    }

    // Format and filter results by similarity threshold
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allResults: RAGSearchResult[] = (data || []).map((row: any) => ({
      content: row.content,
      documentId: row.document_id,
      filename: row.filename,
      similarity: row.similarity,
      embeddingType: row.embedding_type,
      chunkIndex: row.chunk_index,
    }));

    // Apply similarity threshold filter, then limit to topK
    const results = allResults
      .filter(r => r.similarity >= similarityThreshold)
      .slice(0, topK);

    return NextResponse.json({ 
      results,
      meta: {
        totalMatches: allResults.length,
        filteredByThreshold: allResults.length - results.length,
        threshold: similarityThreshold,
        topK,
      }
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      {
        error: "Search failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
