"use client";

import ReactMarkdown from "react-markdown";
import { ExternalLink } from "lucide-react";

interface FrontMatter {
  [key: string]: string;
}

function parseFrontMatter(content: string): { frontMatter: FrontMatter | null; body: string } {
  // Check if content starts with YAML front matter
  if (!content.startsWith("---")) {
    return { frontMatter: null, body: content };
  }

  // Find the closing ---
  const endIndex = content.indexOf("---", 3);
  if (endIndex === -1) {
    return { frontMatter: null, body: content };
  }

  const yamlContent = content.slice(3, endIndex).trim();
  const body = content.slice(endIndex + 3).trim();

  // Parse YAML (simple key: value parsing)
  const frontMatter: FrontMatter = {};
  yamlContent.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      frontMatter[key] = value;
    }
  });

  return { frontMatter, body };
}

function formatKey(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function formatValue(key: string, value: string): React.ReactNode {
  // Handle URLs
  if (key === "url" && value.startsWith("http")) {
    return (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-400 hover:underline inline-flex items-center gap-1"
      >
        <span className="truncate max-w-[200px]">{value}</span>
        <ExternalLink className="w-3 h-3 shrink-0" />
      </a>
    );
  }

  // Handle dates
  if (key.includes("at") || key.includes("date")) {
    try {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    } catch {
      // Fall through to default
    }
  }

  return value;
}

interface FrontMatterCardProps {
  frontMatter: FrontMatter;
}

function FrontMatterCard({ frontMatter }: FrontMatterCardProps) {
  return (
    <div className="bg-zinc-900/80 border border-zinc-700 rounded-lg p-3 mb-4">
      <div className="grid gap-1.5">
        {Object.entries(frontMatter).map(([key, value]) => (
          <div key={key} className="flex gap-2 text-xs">
            <span className="text-zinc-500 shrink-0 min-w-[80px]">{formatKey(key)}:</span>
            <span className="text-zinc-300 break-all">{formatValue(key, value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface MarkdownWithFrontmatterProps {
  content: string;
}

export function MarkdownWithFrontmatter({ content }: MarkdownWithFrontmatterProps) {
  const { frontMatter, body } = parseFrontMatter(content);

  return (
    <>
      {frontMatter && Object.keys(frontMatter).length > 0 && (
        <FrontMatterCard frontMatter={frontMatter} />
      )}
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="my-2 first:mt-0 last:mb-0">{children}</p>,
          ul: ({ children }) => <ul className="my-2 ml-4 list-disc space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="my-2 ml-4 list-decimal space-y-1">{children}</ol>,
          li: ({ children }) => <li className="pl-1">{children}</li>,
          h1: ({ children }) => <h1 className="text-sm font-bold my-2 first:mt-0 text-zinc-100">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xs font-bold my-1.5 first:mt-0 text-zinc-100">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xs font-semibold my-1 first:mt-0 text-zinc-100">{children}</h3>,
          strong: ({ children }) => <strong className="font-semibold text-zinc-100">{children}</strong>,
          code: ({ children }) => <code className="bg-zinc-700 px-1 py-0.5 rounded text-cyan-400 text-xs">{children}</code>,
          pre: ({ children }) => <pre className="bg-zinc-900 p-3 rounded overflow-x-auto my-2">{children}</pre>,
          a: ({ children, href }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-zinc-600 pl-3 italic text-zinc-400 my-2">{children}</blockquote>
          ),
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
        {body}
      </ReactMarkdown>
    </>
  );
}
