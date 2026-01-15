"use client";

import { useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, GraduationCap, Sparkles } from "lucide-react";

interface LearningModePanelProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  onSelectQuestion: (question: string) => void;
  expandedCategories: Set<string>;
  onExpandedCategoriesChange: (categories: Set<string>) => void;
}

interface QuestionCategory {
  id: string;
  name: string;
  icon: string;
  questions: string[];
}

const QUESTION_CATEGORIES: QuestionCategory[] = [
  {
    id: "getting-started",
    name: "Getting Started",
    icon: "🚀",
    questions: [
      "What can you help me with?",
      "Explain how this RAG system works",
      "What documents do you have access to?",
      "How do I upload my own documents?",
    ],
  },
  {
    id: "prompt-engineering",
    name: "Prompt Engineering",
    icon: "✍️",
    questions: [
      "What is prompt caching and how does it save money?",
      "How should I structure a good system prompt?",
      "What's the difference between system and user prompts?",
      "How do I use XML tags in prompts effectively?",
      "Where should I inject dynamic variables in a prompt?",
      "What are common prompt engineering mistakes to avoid?",
    ],
  },
  {
    id: "rag-retrieval",
    name: "RAG & Retrieval",
    icon: "📚",
    questions: [
      "What is the difference between chunks and full documents?",
      "How does similarity search work?",
      "What are embeddings and why do we need them?",
      "Why might some retrieved chunks be irrelevant?",
      "What is a good Top K value and why?",
    ],
  },
  {
    id: "tools-actions",
    name: "Tools & Actions",
    icon: "🔧",
    questions: [
      "What time is it in Brussels?",
      "What's the weather like in Prishtina?",
      "Can you get the current date and also check the weather?",
      "How do tools work with LLMs?",
      "What is the ReAct pattern?",
    ],
  },
  {
    id: "advanced",
    name: "Advanced Concepts",
    icon: "🧠",
    questions: [
      "What are the tradeoffs of using LangChain vs raw API calls?",
      "How would you handle having 100+ tools?",
      "What is Langfuse and why is prompt management important?",
      "How does streaming work?",
      "What is structured output and when should I use it?",
      "What are context windows and token limits?",
      "How do I reduce hallucinations in LLM responses?",
    ],
  },
];

export function LearningModePanel({ 
  isEnabled, 
  onToggle, 
  onSelectQuestion,
  expandedCategories,
  onExpandedCategoriesChange,
}: LearningModePanelProps) {
  // Auto-expand first category when enabled
  useEffect(() => {
    if (isEnabled && expandedCategories.size === 0) {
      onExpandedCategoriesChange(new Set(["getting-started"]));
    }
  }, [isEnabled, expandedCategories.size, onExpandedCategoriesChange]);

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    onExpandedCategoriesChange(newExpanded);
  };

  const handleQuestionClick = (question: string) => {
    onSelectQuestion(question);
  };

  return (
    <div className="border-b border-zinc-800">
      {/* Toggle Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-amber-500" />
          <span className="font-medium text-sm">Learning Mode</span>
          {isEnabled && (
            <span className="text-xs bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">
              Active
            </span>
          )}
        </div>
        <Switch
          checked={isEnabled}
          onCheckedChange={onToggle}
          className="data-[state=checked]:bg-amber-600"
        />
      </div>

      {/* Collapsible Questions Panel */}
      <Collapsible open={isEnabled}>
        <CollapsibleContent className="px-3 pb-4 space-y-2">
          <p className="text-xs text-zinc-500 mb-3">
            RAG retrieval is disabled. Click a question to explore concepts!
          </p>

        {QUESTION_CATEGORIES.map((category) => (
          <Collapsible
            key={category.id}
            open={expandedCategories.has(category.id)}
            onOpenChange={() => toggleCategory(category.id)}
          >
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-800/50 text-left text-sm">
                <span>{category.icon}</span>
                <span className="flex-1 font-medium text-zinc-300">
                  {category.name}
                </span>
                {expandedCategories.has(category.id) ? (
                  <ChevronDown className="w-3 h-3 text-zinc-500" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-zinc-500" />
                )}
              </button>
            </CollapsibleTrigger>

            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {category.questions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuestionClick(question)}
                  className="w-full text-left text-xs p-2 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors flex items-start gap-2 group"
                >
                  <Sparkles className="w-3 h-3 mt-0.5 opacity-0 group-hover:opacity-100 text-amber-500 transition-opacity shrink-0" />
                  <span className="leading-relaxed">{question}</span>
                </button>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
