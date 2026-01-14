import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { chatCompletion } from "@/lib/openrouter";
import { ChatRequest, Message } from "@/types";
import { v4 as uuidv4 } from "uuid";

// CAG = Context-Augmented Generation (full context stuffing)
// Unlike RAG which retrieves relevant chunks, CAG stuffs all available context

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await request.json();
    const {
      messages,
      model,
      documentIds, // Optional: specific documents to include
      temperature = 0.7,
      stream = true,
    } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    if (!model) {
      return NextResponse.json(
        { error: "Model is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Fetch all documents (or specific ones)
    let query = supabase.from("documents").select("id, filename, content");

    if (documentIds && documentIds.length > 0) {
      query = query.in("id", documentIds);
    }

    const { data: documents, error } = await query;

    if (error) {
      console.error("Document fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch documents" },
        { status: 500 }
      );
    }

    // Build full context from all documents
    const contextParts = (documents || []).map((doc: { filename: string; content: string }, i: number) => {
      return `=== Document ${i + 1}: ${doc.filename} ===\n${doc.content}`;
    });

    const fullContext = contextParts.join("\n\n");
    const contextTokenEstimate = Math.ceil(fullContext.length / 4);

    // Build the CAG prompt
    const cagSystemPrompt = `You are a helpful assistant that answers questions based on the provided documents.

DOCUMENTS:
${fullContext || "No documents available."}

INSTRUCTIONS:
- Answer the user's question based on the documents provided above
- You have access to the FULL content of all documents (not just relevant snippets)
- If the documents don't contain relevant information, say so clearly
- Reference specific documents when citing information
- Be thorough since you have access to complete context`;

    // Create chat request
    const chatRequest: ChatRequest = {
      messages: messages.map((m: Message) => ({
        id: m.id || uuidv4(),
        role: m.role,
        content: m.content,
      })),
      model,
      temperature,
      stream,
      systemPrompt: cagSystemPrompt,
    };

    const response = await chatCompletion(chatRequest);

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Chat failed", details: errorText },
        { status: response.status }
      );
    }

    // For non-streaming, parse and return
    if (!stream) {
      const data = await response.json();
      const latencyMs = Date.now() - startTime;

      return NextResponse.json({
        message: {
          id: uuidv4(),
          role: "assistant",
          content: data.choices[0]?.message?.content || "",
          metadata: {
            tokensIn: data.usage?.prompt_tokens,
            tokensOut: data.usage?.completion_tokens,
            latencyMs,
            model,
          },
        },
        context: {
          type: "cag",
          documentsIncluded: documents?.length || 0,
          contextTokenEstimate,
        },
      });
    }

    // For streaming, pass through with context header
    const encoder = new TextEncoder();

    const contextEvent = `data: ${JSON.stringify({
      type: "context",
      context: {
        type: "cag",
        documentsIncluded: documents?.length || 0,
        contextTokenEstimate,
        documents: documents?.map((d: { id: string; filename: string; content: string }) => ({
          id: d.id,
          filename: d.filename,
          contentLength: d.content.length,
        })),
      },
    })}\n\n`;

    const stream2 = new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder.encode(contextEvent));

        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
        } finally {
          reader.releaseLock();
          controller.close();
        }
      },
    });

    return new Response(stream2, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("CAG chat error:", error);
    return NextResponse.json(
      {
        error: "Chat failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
