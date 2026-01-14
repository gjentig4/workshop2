export interface Chunk {
  content: string;
  index: number;
  startChar: number;
  endChar: number;
  tokenEstimate: number;
}

export interface ChunkingOptions {
  chunkSize: number; // Target size in characters
  chunkOverlap: number; // Overlap in characters
  separators?: string[]; // Preferred split points
}

const DEFAULT_SEPARATORS = ["\n\n", "\n", ". ", "! ", "? ", "; ", ", ", " "];

export function chunkText(text: string, options: ChunkingOptions): Chunk[] {
  const { chunkSize, chunkOverlap, separators = DEFAULT_SEPARATORS } = options;
  const chunks: Chunk[] = [];

  if (text.length <= chunkSize) {
    return [
      {
        content: text,
        index: 0,
        startChar: 0,
        endChar: text.length,
        tokenEstimate: Math.ceil(text.length / 4),
      },
    ];
  }

  let start = 0;
  let chunkIndex = 0;

  while (start < text.length) {
    let end = Math.min(start + chunkSize, text.length);

    // If not at the end, try to find a good break point
    if (end < text.length) {
      let bestBreak = -1;

      // Look for separators in reverse order of preference
      for (const separator of separators) {
        const searchStart = Math.max(start + chunkSize / 2, start);
        const searchEnd = end;
        const searchText = text.slice(searchStart, searchEnd);
        const lastIndex = searchText.lastIndexOf(separator);

        if (lastIndex !== -1) {
          bestBreak = searchStart + lastIndex + separator.length;
          break;
        }
      }

      if (bestBreak > start) {
        end = bestBreak;
      }
    }

    const content = text.slice(start, end).trim();
    if (content.length > 0) {
      chunks.push({
        content,
        index: chunkIndex,
        startChar: start,
        endChar: end,
        tokenEstimate: Math.ceil(content.length / 4),
      });
      chunkIndex++;
    }

    // Move start forward, accounting for overlap
    start = end - chunkOverlap;
    if (start <= chunks[chunks.length - 1]?.startChar) {
      start = end; // Prevent infinite loop
    }
  }

  return chunks;
}

// Parse different file formats to plain text
export function extractText(content: string, filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "md":
    case "txt":
      return content;
    case "json":
      try {
        return JSON.stringify(JSON.parse(content), null, 2);
      } catch {
        return content;
      }
    case "html":
      // Basic HTML stripping
      return content
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    default:
      return content;
  }
}
