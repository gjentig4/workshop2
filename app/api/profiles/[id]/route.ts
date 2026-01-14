import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET - Get a specific profile with its documents
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Get profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (profileError) {
      if (profileError.code === "PGRST116") {
        return NextResponse.json(
          { error: "Profile not found" },
          { status: 404 }
        );
      }
      console.error("Error fetching profile:", profileError);
      return NextResponse.json(
        { error: "Failed to fetch profile", details: profileError.message },
        { status: 500 }
      );
    }

    // Get associated documents
    const { data: profileDocs, error: docsError } = await supabase
      .from("profile_documents")
      .select(`
        document_id,
        documents (
          id,
          filename,
          metadata,
          created_at
        )
      `)
      .eq("profile_id", id);

    if (docsError) {
      console.error("Error fetching profile documents:", docsError);
    }

    // Get chat history for this profile
    const { data: messages, error: messagesError } = await supabase
      .from("messages")
      .select("*")
      .eq("profile_id", id)
      .order("created_at", { ascending: true });

    if (messagesError) {
      console.error("Error fetching messages:", messagesError);
    }

    return NextResponse.json({
      ...profile,
      documents: profileDocs?.map((pd) => pd.documents).filter(Boolean) || [],
      messages: messages || [],
    });
  } catch (error) {
    console.error("Error in profile API:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// PUT - Update a profile
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const body = await request.json();

    // Remove fields that shouldn't be directly updated
    const { documents, messages, created_at, ...updateData } = body;

    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Profile not found" },
          { status: 404 }
        );
      }
      console.error("Error updating profile:", error);
      return NextResponse.json(
        { error: "Failed to update profile", details: error.message },
        { status: 500 }
      );
    }

    // Update documents if provided
    if (documents && Array.isArray(documents)) {
      // Remove existing associations
      await supabase
        .from("profile_documents")
        .delete()
        .eq("profile_id", id);

      // Add new associations
      if (documents.length > 0) {
        const documentLinks = documents.map((docId: string) => ({
          profile_id: id,
          document_id: docId,
        }));

        await supabase
          .from("profile_documents")
          .insert(documentLinks);
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in profile API:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a profile
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting profile:", error);
      return NextResponse.json(
        { error: "Failed to delete profile", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in profile API:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
