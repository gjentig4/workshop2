import { NextRequest, NextResponse } from "next/server";
import { getLangfuse } from "@/lib/langfuse";

// GET - List all prompts or get a specific prompt by name
export async function GET(request: NextRequest) {
  const langfuse = getLangfuse();
  if (!langfuse) {
    return NextResponse.json(
      { error: "Langfuse not configured" },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const version = searchParams.get("version");

  try {
    if (name) {
      // Get a specific prompt - try production label first, then fall back to latest
      let prompt;
      try {
        // Try fetching production version first
        prompt = await langfuse.getPrompt(name, version ? parseInt(version) : undefined, {
          label: "production",
        });
      } catch {
        // If production doesn't exist, fetch latest version
        console.log(`No production label for prompt '${name}', fetching latest...`);
        const baseUrl = process.env.LANGFUSE_HOST || "https://cloud.langfuse.com";
        const response = await fetch(`${baseUrl}/api/public/v2/prompts/${encodeURIComponent(name)}`, {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${process.env.LANGFUSE_PUBLIC_KEY}:${process.env.LANGFUSE_SECRET_KEY}`
            ).toString("base64")}`,
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch prompt: ${response.statusText}`);
        }
        
        const data = await response.json();
        prompt = {
          name: data.name,
          version: data.versions?.[0]?.version || 1,
          prompt: data.versions?.[0]?.prompt || "",
          config: data.versions?.[0]?.config || {},
          labels: data.versions?.[0]?.labels || [],
        };
      }
      
      return NextResponse.json({
        name: prompt.name,
        version: prompt.version,
        prompt: prompt.prompt,
        config: prompt.config,
        labels: prompt.labels,
      });
    } else {
      // List all prompts using the REST API
      const baseUrl = process.env.LANGFUSE_HOST || "https://cloud.langfuse.com";
      const response = await fetch(`${baseUrl}/api/public/v2/prompts`, {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.LANGFUSE_PUBLIC_KEY}:${process.env.LANGFUSE_SECRET_KEY}`
          ).toString("base64")}`,
        },
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Langfuse API error:", error);
        return NextResponse.json(
          { error: "Failed to fetch prompts", details: error },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error("Langfuse prompt error:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompt", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// POST - Create a new prompt
export async function POST(request: NextRequest) {
  const langfuse = getLangfuse();
  if (!langfuse) {
    return NextResponse.json(
      { error: "Langfuse not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { name, prompt, config, labels, commitMessage } = body;

    if (!name || !prompt) {
      return NextResponse.json(
        { error: "Name and prompt are required" },
        { status: 400 }
      );
    }

    // Sanitize labels - must be lowercase alphanumeric with underscores, hyphens, or periods
    const sanitizedLabels = (labels || [])
      .map((label: string) => label.toLowerCase().replace(/[^a-z0-9_\-.]/g, "_"))
      .filter((label: string) => label.length > 0);

    // Create prompt using REST API
    const baseUrl = process.env.LANGFUSE_HOST || "https://cloud.langfuse.com";
    const response = await fetch(`${baseUrl}/api/public/v2/prompts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.LANGFUSE_PUBLIC_KEY}:${process.env.LANGFUSE_SECRET_KEY}`
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        name,
        prompt,
        config: config || {},
        labels: sanitizedLabels,
        type: "text",
        ...(commitMessage && { commitMessage }), // Include commit message if provided
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Langfuse create prompt error:", error);
      return NextResponse.json(
        { error: "Failed to create prompt", details: error },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Langfuse create prompt error:", error);
    return NextResponse.json(
      { error: "Failed to create prompt", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// PUT - Update an existing prompt (creates new version)
export async function PUT(request: NextRequest) {
  const langfuse = getLangfuse();
  if (!langfuse) {
    return NextResponse.json(
      { error: "Langfuse not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { name, prompt, config, labels, commitMessage } = body;

    if (!name || !prompt) {
      return NextResponse.json(
        { error: "Name and prompt are required" },
        { status: 400 }
      );
    }

    // Sanitize labels - must be lowercase alphanumeric with underscores, hyphens, or periods
    const sanitizedLabels = (labels || [])
      .map((label: string) => label.toLowerCase().replace(/[^a-z0-9_\-.]/g, "_"))
      .filter((label: string) => label.length > 0);

    // Update prompt using REST API (creates new version)
    const baseUrl = process.env.LANGFUSE_HOST || "https://cloud.langfuse.com";
    const response = await fetch(`${baseUrl}/api/public/v2/prompts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.LANGFUSE_PUBLIC_KEY}:${process.env.LANGFUSE_SECRET_KEY}`
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        name,
        prompt,
        config: config || {},
        labels: sanitizedLabels,
        type: "text",
        ...(commitMessage && { commitMessage }), // Include commit message if provided
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Langfuse update prompt error:", error);
      return NextResponse.json(
        { error: "Failed to update prompt", details: error },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Langfuse update prompt error:", error);
    return NextResponse.json(
      { error: "Failed to update prompt", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
