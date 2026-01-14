import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateEmbedding, generateEmbeddings } from "@/lib/embeddings";
import { chunkText, extractText, Chunk } from "@/lib/chunking";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const embeddingStrategy = (formData.get("strategy") as string) || "chunk";
    const chunkSize = parseInt(formData.get("chunkSize") as string) || 1000;
    const chunkOverlap = parseInt(formData.get("chunkOverlap") as string) || 200;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Read file content
    const content = await file.text();
    const extractedText = extractText(content, file.name);

    const supabase = await createClient();

    // Insert document
    const { data: document, error: docError } = await supabase
      .from("documents")
      .insert({
        filename: file.name,
        content: extractedText,
        metadata: {
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toISOString(),
        },
      })
      .select()
      .single();

    if (docError) {
      console.error("Document insert error:", docError);
      return NextResponse.json(
        { error: "Failed to save document" },
        { status: 500 }
      );
    }

    const embeddings: {
      id: string;
      document_id: string;
      content: string;
      embedding: number[];
      embedding_type: "chunk" | "document";
      chunk_index: number | null;
      chunk_size: number | null;
      metadata: Record<string, unknown>;
    }[] = [];

    // Generate chunk embeddings
    if (embeddingStrategy === "chunk" || embeddingStrategy === "both") {
      const chunks: Chunk[] = chunkText(extractedText, {
        chunkSize,
        chunkOverlap,
      });

      // Generate embeddings in batches
      const chunkContents = chunks.map((c) => c.content);
      const chunkEmbeddings = await generateEmbeddings(chunkContents);

      for (let i = 0; i < chunks.length; i++) {
        embeddings.push({
          id: uuidv4(),
          document_id: document.id,
          content: chunks[i].content,
          embedding: chunkEmbeddings[i],
          embedding_type: "chunk",
          chunk_index: chunks[i].index,
          chunk_size: chunks[i].content.length,
          metadata: {
            startChar: chunks[i].startChar,
            endChar: chunks[i].endChar,
            tokenEstimate: chunks[i].tokenEstimate,
          },
        });
      }
    }

    // Generate document-level embedding
    if (embeddingStrategy === "document" || embeddingStrategy === "both") {
      // For long documents, we truncate for the embedding
      // (text-embedding-3-small has 8191 token limit)
      const truncatedContent = extractedText.slice(0, 30000); // Rough char limit
      const docEmbedding = await generateEmbedding(truncatedContent);

      embeddings.push({
        id: uuidv4(),
        document_id: document.id,
        content: truncatedContent,
        embedding: docEmbedding,
        embedding_type: "document",
        chunk_index: null,
        chunk_size: extractedText.length,
        metadata: {
          fullLength: extractedText.length,
          truncated: extractedText.length > 30000,
        },
      });
    }

    // Insert embeddings
    if (embeddings.length > 0) {
      const { error: embError } = await supabase.from("embeddings").insert(
        embeddings.map((e) => ({
          ...e,
          embedding: JSON.stringify(e.embedding), // Supabase expects string for vector
        }))
      );

      if (embError) {
        console.error("Embeddings insert error:", embError);
        // Clean up document on failure
        await supabase.from("documents").delete().eq("id", document.id);
        return NextResponse.json(
          { error: "Failed to save embeddings" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      document: {
        id: document.id,
        filename: document.filename,
        contentLength: extractedText.length,
      },
      embeddings: {
        count: embeddings.length,
        strategy: embeddingStrategy,
        chunks: embeddings.filter((e) => e.embedding_type === "chunk").length,
        documents: embeddings.filter((e) => e.embedding_type === "document")
          .length,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: "Upload failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
