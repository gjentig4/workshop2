import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export interface Profile {
  id: string;
  name: string;
  model: string;
  temperature: number;
  reasoning_enabled: boolean;
  reasoning_effort: string;
  streaming_enabled: boolean;
  tracing_enabled: boolean;
  langfuse_prompt_name: string | null;
  langfuse_prompt_version: number | null;
  tools_enabled: boolean;
  tools_config: unknown[];
  structured_output_enabled: boolean;
  structured_output_schema: unknown | null;
  embedding_strategy: "document" | "chunk" | "both";
  top_k: number;
  similarity_threshold: number;
  created_at: string;
  updated_at: string;
}

// GET - List all profiles
export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error fetching profiles:", error);
      return NextResponse.json(
        { error: "Failed to fetch profiles", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in profiles API:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// POST - Create a new profile
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { name, ...settings } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Profile name is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("profiles")
      .insert({
        name,
        ...settings,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating profile:", error);
      return NextResponse.json(
        { error: "Failed to create profile", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error in profiles API:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
