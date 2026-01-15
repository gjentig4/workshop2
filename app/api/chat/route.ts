import { NextRequest } from "next/server";
import { chatCompletion, parseStreamChunk, OpenRouterResponse, OpenRouterTool, extractReasoningText } from "@/lib/openrouter";
import { AVAILABLE_TOOLS, executeTool } from "@/lib/tools";
import { createTrace, flushLangfuse, getTraceUrl } from "@/lib/langfuse";
import { ChatRequest, Message } from "@/types";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body: ChatRequest = await request.json();

    // Get the last user message for trace input
    const lastUserMessage = body.messages.filter(m => m.role === "user").pop();

    // Create Langfuse trace if enabled
    const trace = body.enableTracing
      ? createTrace("chat-completion", {
          model: body.model,
          temperature: body.temperature,
          reasoningEnabled: body.enableReasoning,
          reasoningEffort: body.reasoningEffort,
          toolsEnabled: body.enableTools,
          structuredOutputEnabled: !!body.structuredOutputSchema,
          systemPrompt: body.systemPrompt, // Include system prompt in metadata
        })
      : null;

    // Set trace input (include system prompt)
    if (trace) {
      trace.update({
        input: {
          systemPrompt: body.systemPrompt,
          userMessage: lastUserMessage?.content,
          messageCount: body.messages.length,
        },
      });
    }

    // Get tools - use custom tools if provided, otherwise use default
    let tools: OpenRouterTool[] | undefined;
    if (body.enableTools) {
      if (body.customTools) {
        try {
          const customToolDefs = JSON.parse(body.customTools);
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

    // For streaming, we don't support tool calls (yet) - disable tools
    if (body.stream && body.enableTools) {
      // Streaming with tools is complex - use non-streaming for tools
      body.stream = false;
    }

    // Make the request to OpenRouter
    const response = await chatCompletion(body, tools);

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenRouter error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to get response from model", details: error }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    // Handle streaming response (no tools)
    if (body.stream) {
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      let fullContent = "";
      let fullReasoning = "";
      let usage: OpenRouterResponse["usage"] | undefined;

      const stream = new ReadableStream({
        async start(controller) {
          const reader = response.body?.getReader();
          if (!reader) {
            controller.close();
            return;
          }

          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value, { stream: true });
              const lines = chunk.split("\n").filter((line) => line.trim());

              for (const line of lines) {
                const parsed = parseStreamChunk(line);

                if (parsed.done) {
                  // Send final message with metadata
                  const latencyMs = Date.now() - startTime;
                  const finalData = JSON.stringify({
                    type: "done",
                    message: {
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
                        model: body.model,
                        thinking: fullReasoning || undefined,
                      },
                    },
                  });
                  controller.enqueue(encoder.encode(`data: ${finalData}\n\n`));
                  break;
                }

                if (parsed.content) {
                  fullContent += parsed.content;
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({ type: "content", content: parsed.content })}\n\n`
                    )
                  );
                }

                if (parsed.reasoning) {
                  fullReasoning += parsed.reasoning;
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({ type: "reasoning", content: parsed.reasoning })}\n\n`
                    )
                  );
                }

                if (parsed.usage) {
                  usage = parsed.usage;
                }
              }
            }
          } finally {
            reader.releaseLock();
            controller.close();

            // Log to Langfuse with full conversation context
            if (trace) {
              trace.update({
                output: fullContent,
              });
              
              // Log the generation with full messages including system prompt
              const messagesForLog = body.systemPrompt 
                ? [{ role: "system", content: body.systemPrompt }, ...body.messages]
                : body.messages;
              
              trace.generation({
                name: "chat-response",
                model: body.model,
                input: messagesForLog,
                output: fullContent,
                usage: usage
                  ? {
                      promptTokens: usage.prompt_tokens,
                      completionTokens: usage.completion_tokens,
                      totalTokens: usage.total_tokens,
                    }
                  : undefined,
              });
              await flushLangfuse();
            }
          }
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // Handle non-streaming response (supports tools with ReAct loop)
    let data: OpenRouterResponse = await response.json();
    let assistantMessage = data.choices[0]?.message;
    let content = assistantMessage?.content || "";
    // Extract reasoning from multiple possible sources
    const reasoningContent = 
      assistantMessage?.reasoning_content || 
      assistantMessage?.reasoning ||
      extractReasoningText(assistantMessage?.reasoning_details);

    // Tool execution with ReAct loop
    const allToolResults: { id: string; name: string; arguments: Record<string, unknown>; result: unknown }[] = [];
    let toolCalls = assistantMessage?.tool_calls;
    let iterations = 0;
    const maxIterations = 5; // Prevent infinite loops

    // ReAct loop: keep calling tools until model is done or max iterations
    while (toolCalls && toolCalls.length > 0 && iterations < maxIterations) {
      iterations++;
      
      // Execute each tool call
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

      // Build messages with tool results to send back to the model
      const toolMessages: Message[] = [
        ...body.messages,
        {
          id: uuidv4(),
          role: "assistant" as const,
          content: content || "",
          metadata: { toolCalls: currentToolResults },
        },
        // Add tool results as tool messages
        ...currentToolResults.map(tr => ({
          id: uuidv4(),
          role: "tool" as const,
          content: JSON.stringify(tr.result, null, 2),
          metadata: { toolCallId: tr.id, toolName: tr.name },
        })),
      ];

      // Log tool execution to Langfuse
      if (trace) {
        trace.span({
          name: `tool-execution-${iterations}`,
          input: currentToolResults.map(t => ({ name: t.name, args: t.arguments })),
          output: currentToolResults.map(t => ({ name: t.name, result: t.result })),
        });
      }

      // Make another request with tool results
      // On max iterations - 1, disable tools to force a response
      const followUpRequest: ChatRequest = {
        ...body,
        messages: toolMessages,
        stream: false,
        enableTools: iterations < maxIterations - 1, // Disable tools on last iteration
      };

      // On follow-up, pass tools only if we haven't reached max iterations
      const followUpTools = iterations < maxIterations - 1 ? tools : undefined;
      const followUpResponse = await chatCompletion(followUpRequest, followUpTools);
      
      if (!followUpResponse.ok) {
        const errorText = await followUpResponse.text();
        console.error("Follow-up request failed:", errorText);
        
        // Log to Langfuse if available
        if (trace) {
          trace.span({
            name: "follow-up-error",
            level: "ERROR",
            input: { iteration: iterations },
            output: { error: errorText },
          });
        }
        break;
      }

      data = await followUpResponse.json();
      assistantMessage = data.choices[0]?.message;
      content = assistantMessage?.content || "";
      toolCalls = assistantMessage?.tool_calls;

      // Log follow-up to Langfuse
      if (trace) {
        trace.span({
          name: `follow-up-response-${iterations}`,
          input: { messagesCount: toolMessages.length },
          output: { 
            content: content.substring(0, 200), 
            hasMoreToolCalls: !!toolCalls?.length 
          },
        });
      }
    }

    const latencyMs = Date.now() - startTime;

    const message: Message = {
      id: uuidv4(),
      role: "assistant",
      content,
      metadata: {
        tokensIn: data.usage?.prompt_tokens,
        tokensOut: data.usage?.completion_tokens,
        reasoningTokens: data.usage?.completion_tokens_details?.reasoning_tokens,
        cost: data.usage?.cost,
        cached: (data.usage?.prompt_tokens_details?.cached_tokens ?? 0) > 0,
        latencyMs,
        model: body.model,
        toolCalls: allToolResults.length > 0 ? allToolResults : undefined,
        thinking: reasoningContent,
        traceUrl: trace ? getTraceUrl(trace.id) : undefined,
      },
    };

    // Log to Langfuse with full conversation context
    if (trace) {
      trace.update({
        output: content,
      });
      
      // Log the generation with full messages including system prompt
      const messagesForLog = body.systemPrompt 
        ? [{ role: "system", content: body.systemPrompt }, ...body.messages]
        : body.messages;
      
      trace.generation({
        name: "chat-response",
        model: body.model,
        input: messagesForLog,
        output: content,
        usage: data.usage
          ? {
              promptTokens: data.usage.prompt_tokens,
              completionTokens: data.usage.completion_tokens,
              totalTokens: data.usage.total_tokens,
            }
          : undefined,
        metadata: {
          toolIterations: iterations,
          toolCallsTotal: allToolResults.length,
        },
      });
      await flushLangfuse();
    }

    return new Response(JSON.stringify({ message, toolResults: allToolResults }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
