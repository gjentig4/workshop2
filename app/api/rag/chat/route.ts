import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateEmbedding } from "@/lib/embeddings";
import { chatCompletion, parseStreamChunk, OpenRouterResponse, OpenRouterTool } from "@/lib/openrouter";
import { createTrace, flushLangfuse, getTraceUrl } from "@/lib/langfuse";
import { AVAILABLE_TOOLS, executeTool } from "@/lib/tools";
import { ChatRequest, Message, RAGSearchResult } from "@/types";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await request.json();
    const {
      messages,
      model,
      topK = 5,
      embeddingStrategy = "document",
      similarityThreshold = 0.1,
      temperature = 0.7,
      stream = true,
      systemPrompt: customSystemPrompt,
      enableReasoning = false,
      reasoningEffort = "medium",
      enableTools = false,
      customTools,
      enableTracing = true,
      profileId,
      skipRag = false, // When true, skip document retrieval (e.g., learning mode)
      structuredOutputSchema,
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

    // Get the last user message for retrieval
    const lastUserMessage = [...messages].reverse().find((m: Message) => m.role === "user");
    if (!lastUserMessage) {
      return NextResponse.json(
        { error: "No user message found" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Search for relevant context (skip if in learning mode)
    let searchResults: RAGSearchResult[] = [];

    if (!skipRag) {
      // Generate embedding for the query
      const queryEmbedding = await generateEmbedding(lastUserMessage.content);
      
      console.log("Query embedding generated, length:", queryEmbedding.length);

      const { data, error } = await supabase.rpc("match_embeddings", {
        query_embedding: JSON.stringify(queryEmbedding),
        match_threshold: 0.0, // Get all results, filter client-side
        match_count: topK * 3, // Fetch more, filter later
      });

      if (error) {
        console.error("RAG search error:", error);
      }

      if (data) {
        console.log("RAG search found", data.length, "raw results");
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        searchResults = data.map((row: any) => ({
          content: row.content,
          documentId: row.document_id,
          filename: row.filename,
          similarity: row.similarity,
          embeddingType: row.embedding_type,
          chunkIndex: row.chunk_index,
        }));

        // Filter by similarity threshold first
        searchResults = searchResults.filter(
          (r) => r.similarity >= similarityThreshold
        );
        console.log("After threshold filter:", searchResults.length, "results (threshold:", similarityThreshold, ")");

        // Filter by embedding strategy
        if (embeddingStrategy !== "both") {
          searchResults = searchResults.filter(
            (r) => r.embeddingType === embeddingStrategy
          );
        }
        
        // Limit to topK after filtering
        searchResults = searchResults.slice(0, topK);
        console.log("Final results:", searchResults.length);
      } else {
        console.log("RAG search returned no results");
      }
    } else {
      console.log("Skipping RAG retrieval (learning mode)");
    }

    // Build context from search results
    const contextParts = searchResults.map((r, i) => {
      return `[Source ${i + 1}: ${r.filename}${r.chunkIndex !== null ? ` (chunk ${r.chunkIndex})` : ""}, relevance: ${(r.similarity * 100).toFixed(1)}%]\n${r.content}`;
    });

    const context = contextParts.join("\n\n---\n\n");

    // Build the system prompt with retrieved context
    const ragContextSection = `
RETRIEVED CONTEXT:
${context || "No relevant context found in the knowledge base."}`;

    const finalSystemPrompt = customSystemPrompt 
      ? `${customSystemPrompt}\n\n${ragContextSection}`
      : `You are a helpful assistant.\n${ragContextSection}`;

    // Create Langfuse trace if enabled
    const trace = enableTracing
      ? createTrace("rag-chat", {
          model,
          temperature,
          reasoningEnabled: enableReasoning,
          reasoningEffort,
          toolsEnabled: enableTools,
          structuredOutputEnabled: !!structuredOutputSchema,
          systemPrompt: customSystemPrompt || "default RAG prompt",
        })
      : null;

    // Set trace input with structured info (like playground)
    if (trace) {
      trace.update({
        input: {
          systemPrompt: finalSystemPrompt,
          userMessage: lastUserMessage.content,
          messageCount: messages.length,
          retrievedContext: {
            documentsFound: searchResults.length,
            topSimilarity: searchResults[0]?.similarity,
            sources: searchResults.map(r => ({
              filename: r.filename,
              similarity: r.similarity,
              type: r.embeddingType,
            })),
          },
        },
      });
    }

    // Get tools configuration
    let tools: OpenRouterTool[] | undefined;
    if (enableTools) {
      if (customTools) {
        try {
          const customToolDefs = JSON.parse(customTools);
          tools = customToolDefs.map((t: { name: string; description: string; parameters: Record<string, unknown> }) => ({
            type: "function" as const,
            function: {
              name: t.name,
              description: t.description,
              parameters: t.parameters,
            },
          }));
        } catch {
          tools = AVAILABLE_TOOLS;
        }
      } else {
        tools = AVAILABLE_TOOLS;
      }
    }

    // Create chat request
    const chatRequest: ChatRequest = {
      messages: messages.map((m: Message) => ({
        id: m.id || uuidv4(),
        role: m.role,
        content: m.content,
        metadata: m.metadata,
      })),
      model,
      temperature,
      stream: stream && !enableTools, // Disable streaming for tool calls
      systemPrompt: finalSystemPrompt,
      enableReasoning,
      reasoningEffort,
      enableTools,
      customTools,
      enableTracing,
      structuredOutputSchema,
    };

    const response = await chatCompletion(chatRequest, tools);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter error:", errorText);
      return NextResponse.json(
        { error: "Chat failed", details: errorText },
        { status: response.status }
      );
    }

    // Handle non-streaming response (with tools or when streaming is disabled)
    if (!stream || enableTools) {
      let responseData: OpenRouterResponse = await response.json();
      let assistantMessage = responseData.choices[0]?.message;
      let content = assistantMessage?.content || "";
      const reasoningContent = assistantMessage?.reasoning_content;

      // Tool execution with ReAct loop
      const allToolResults: { id: string; name: string; arguments: Record<string, unknown>; result: unknown }[] = [];
      let toolCalls = assistantMessage?.tool_calls;
      let iterations = 0;
      const maxIterations = 5;

      while (toolCalls && toolCalls.length > 0 && iterations < maxIterations) {
        iterations++;

        const currentToolResults: { id: string; name: string; arguments: Record<string, unknown>; result: unknown }[] = [];

        for (const toolCall of toolCalls) {
          const args = JSON.parse(toolCall.function.arguments);
          const result = executeTool(toolCall.function.name, args);
          currentToolResults.push({
            id: toolCall.id,
            name: toolCall.function.name,
            arguments: args,
            result,
          });
          allToolResults.push({
            id: toolCall.id,
            name: toolCall.function.name,
            arguments: args,
            result,
          });
        }

        // Build messages with tool results
        const toolMessages: Message[] = [
          ...chatRequest.messages,
          {
            id: uuidv4(),
            role: "assistant" as const,
            content: content || "",
            metadata: { toolCalls: currentToolResults },
          },
          ...currentToolResults.map(tr => ({
            id: uuidv4(),
            role: "tool" as const,
            content: JSON.stringify(tr.result, null, 2),
            metadata: { toolCallId: tr.id, toolName: tr.name },
          })),
        ];

        // Log to Langfuse
        if (trace) {
          trace.span({
            name: `tool-execution-${iterations}`,
            input: currentToolResults.map(t => ({ name: t.name, args: t.arguments })),
            output: currentToolResults.map(t => ({ name: t.name, result: t.result })),
          });
        }

        // Follow-up request
        const followUpRequest: ChatRequest = {
          ...chatRequest,
          messages: toolMessages,
          stream: false,
          enableTools: iterations < maxIterations - 1,
        };

        const followUpTools = iterations < maxIterations - 1 ? tools : undefined;
        const followUpResponse = await chatCompletion(followUpRequest, followUpTools);

        if (!followUpResponse.ok) {
          break;
        }

        responseData = await followUpResponse.json();
        assistantMessage = responseData.choices[0]?.message;
        content = assistantMessage?.content || "";
        toolCalls = assistantMessage?.tool_calls;
      }

      const latencyMs = Date.now() - startTime;

      const message: Message = {
        id: uuidv4(),
        role: "assistant",
        content,
        metadata: {
          tokensIn: responseData.usage?.prompt_tokens,
          tokensOut: responseData.usage?.completion_tokens,
          reasoningTokens: responseData.usage?.completion_tokens_details?.reasoning_tokens,
          cost: responseData.usage?.cost,
          cached: (responseData.usage?.prompt_tokens_details?.cached_tokens ?? 0) > 0,
          latencyMs,
          model,
          toolCalls: allToolResults.length > 0 ? allToolResults : undefined,
          thinking: reasoningContent,
          traceUrl: trace ? getTraceUrl(trace.id) : undefined,
        },
      };

      // Save messages to Supabase if profile is provided
      if (profileId) {
        await saveMessageToProfile(supabase, profileId, lastUserMessage);
        await saveMessageToProfile(supabase, profileId, message);
      }

      // Log to Langfuse with full conversation context
      if (trace) {
        trace.update({ output: content });
        
        // Build messages for logging including system prompt
        const messagesForLog = [
          { role: "system", content: finalSystemPrompt },
          ...messages.map((m: Message) => ({ role: m.role, content: m.content })),
        ];
        
        trace.generation({
          name: "rag-response",
          model,
          input: messagesForLog,
          output: content,
          usage: responseData.usage ? {
            promptTokens: responseData.usage.prompt_tokens,
            completionTokens: responseData.usage.completion_tokens,
            totalTokens: responseData.usage.total_tokens,
          } : undefined,
          metadata: {
            toolIterations: iterations,
            toolCallsTotal: allToolResults.length,
            retrievedDocs: searchResults.length,
            topSimilarity: searchResults[0]?.similarity,
          },
        });
        await flushLangfuse();
      }

      return NextResponse.json({
        message,
        context: searchResults,
      });
    }

    // Streaming response
    const encoder = new TextEncoder();
    const contextEvent = `data: ${JSON.stringify({ type: "context", context: searchResults })}\n\n`;

    let fullContent = "";
    let fullReasoning = "";
    let usage: OpenRouterResponse["usage"] | undefined;

    const streamResponse = new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder.encode(contextEvent));

        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n").filter((l) => l.trim());

            for (const line of lines) {
              const parsed = parseStreamChunk(line);

              if (parsed.content) {
                fullContent += parsed.content;
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ type: "content", content: parsed.content })}\n\n`)
                );
              }

              if (parsed.reasoning) {
                fullReasoning += parsed.reasoning;
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ type: "reasoning", content: parsed.reasoning })}\n\n`)
                );
              }

              if (parsed.usage) {
                usage = parsed.usage;
              }
            }
          }

          const latencyMs = Date.now() - startTime;

          const finalMessage: Message = {
            id: uuidv4(),
            role: "assistant",
            content: fullContent,
            metadata: {
              tokensIn: usage?.prompt_tokens,
              tokensOut: usage?.completion_tokens,
              reasoningTokens: usage?.completion_tokens_details?.reasoning_tokens,
              cost: usage?.cost,
              cached: (usage?.prompt_tokens_details?.cached_tokens ?? 0) > 0,
              latencyMs,
              model,
              thinking: fullReasoning || undefined,
              traceUrl: trace ? getTraceUrl(trace.id) : undefined,
            },
          };

          // Save to profile
          if (profileId) {
            await saveMessageToProfile(supabase, profileId, lastUserMessage);
            await saveMessageToProfile(supabase, profileId, finalMessage);
          }

          // Log to Langfuse with full conversation context
          if (trace) {
            trace.update({ output: fullContent });
            
            // Build messages for logging including system prompt
            const messagesForLog = [
              { role: "system", content: finalSystemPrompt },
              ...messages.map((m: Message) => ({ role: m.role, content: m.content })),
            ];
            
            trace.generation({
              name: "rag-response",
              model,
              input: messagesForLog,
              output: fullContent,
              usage: usage ? {
                promptTokens: usage.prompt_tokens,
                completionTokens: usage.completion_tokens,
                totalTokens: usage.total_tokens,
              } : undefined,
              metadata: {
                retrievedDocs: searchResults.length,
                topSimilarity: searchResults[0]?.similarity,
              },
            });
            await flushLangfuse();
          }

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: "done", message: finalMessage })}\n\n`)
          );
        } finally {
          reader.releaseLock();
          controller.close();
        }
      },
    });

    return new Response(streamResponse, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("RAG chat error:", error);
    return NextResponse.json(
      {
        error: "Chat failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Helper function to save message to profile
async function saveMessageToProfile(
  supabase: Awaited<ReturnType<typeof createClient>>,
  profileId: string,
  message: Message
) {
  try {
    await supabase.from("messages").insert({
      id: message.id,
      profile_id: profileId,
      role: message.role,
      content: message.content,
      metadata: message.metadata || {},
      created_at: message.createdAt || new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error saving message:", error);
  }
}
