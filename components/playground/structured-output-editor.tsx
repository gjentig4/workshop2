"use client";

import { useState, useEffect } from "react";
import { Braces, AlertCircle, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface StructuredOutputEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const EXAMPLE_SCHEMA = `{
  "name": "response",
  "strict": true,
  "schema": {
    "type": "object",
    "properties": {
      "answer": {
        "type": "string",
        "description": "The main answer"
      },
      "confidence": {
        "type": "number",
        "description": "Confidence score 0-1"
      }
    },
    "required": ["answer", "confidence"]
  }
}`;

export function StructuredOutputEditor({
  value,
  onChange,
}: StructuredOutputEditorProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!value.trim()) {
      setIsValid(null);
      setError(null);
      return;
    }

    try {
      JSON.parse(value);
      setIsValid(true);
      setError(null);
    } catch (e) {
      setIsValid(false);
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }, [value]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Braces className="w-4 h-4 text-zinc-400" />
          <label className="text-sm font-medium text-zinc-300">
            JSON Schema
          </label>
        </div>
        {isValid !== null && (
          <div
            className={`flex items-center gap-1 text-xs ${
              isValid ? "text-green-400" : "text-red-400"
            }`}
          >
            {isValid ? (
              <>
                <Check className="w-3 h-3" />
                Valid
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3" />
                Invalid
              </>
            )}
          </div>
        )}
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={EXAMPLE_SCHEMA}
        className="bg-zinc-900 border-zinc-700 text-sm font-mono min-h-[150px] resize-none"
      />

      {error && <p className="text-xs text-red-400">{error}</p>}

      {!value.trim() && (
        <button
          type="button"
          onClick={() => onChange(EXAMPLE_SCHEMA)}
          className="text-xs text-cyan-400 hover:text-cyan-300"
        >
          Load example schema
        </button>
      )}

      <p className="text-xs text-zinc-500">
        Define a JSON schema to force structured output from the model
      </p>
    </div>
  );
}
