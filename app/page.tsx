import Link from "next/link";
import { Sparkles, Database, ArrowRight, Code, Cpu, Layers, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-transparent to-teal-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0H0v60h60V0zM59 1v58H1V1h58z' fill='%23fff' fill-opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 text-sm font-medium mb-8">
              <Cpu className="w-4 h-4" />
              Workshop 2 of 3
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-white">AI Workshop</span>{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Playground
              </span>
            </h1>

            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
              Learn practical AI building blocks through hands-on experimentation.
              Build with LLMs, understand RAG, and master integration patterns.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/playground">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white border-0">
                  <Sparkles className="w-5 h-5" />
                  Open Playground
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/rag-lab">
                <Button size="lg" variant="outline" className="gap-2 border-zinc-700 hover:bg-zinc-800">
                  <Database className="w-5 h-5" />
                  Explore RAG Lab
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">What You&apos;ll Learn</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Master the building blocks of AI-powered applications through interactive exercises
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Playground Card */}
          <Link href="/playground" className="group">
            <Card className="h-full bg-zinc-900/50 border-zinc-800 hover:border-cyan-800/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-950/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-teal-600 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors">
                  AI Playground
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Interactive chat interface with full control over LLM parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-cyan-500" />
                    Model selection via OpenRouter (Claude, GPT-4o, Gemini, etc.)
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-500" />
                    Temperature, reasoning effort, and streaming controls
                  </li>
                  <li className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-500" />
                    Tool calling, structured outputs, and system prompts
                  </li>
                  <li className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-500" />
                    Debug panel with tokens, cost, and latency metrics
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          {/* RAG Lab Card */}
          <Link href="/rag-lab" className="group">
            <Card className="h-full bg-zinc-900/50 border-zinc-800 hover:border-teal-800/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-950/20">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-600 flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-white group-hover:text-teal-400 transition-colors">
                  RAG Lab
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Explore Retrieval-Augmented Generation with your own documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-teal-500" />
                    Upload and embed documents with customizable strategies
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-teal-500" />
                    Chunked vs. whole-document embeddings comparison
                  </li>
                  <li className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-teal-500" />
                    Vector search with relevance scores visualization
                  </li>
                  <li className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-teal-500" />
                    RAG vs. CAG (context stuffing) side-by-side comparison
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Learning Goals */}
      <section className="border-t border-zinc-800 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Learning Goals
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "LLM APIs",
                description: "Understand how to interact with language models through APIs",
              },
              {
                title: "Prompt Engineering",
                description: "Learn the difference between system and user prompts",
              },
              {
                title: "Structured Outputs",
                description: "Generate reliable, parseable responses from LLMs",
              },
              {
                title: "Tool Calling",
                description: "Extend LLM capabilities with function calling",
              },
            ].map((goal) => (
              <div
                key={goal.title}
                className="p-6 rounded-xl bg-zinc-900/30 border border-zinc-800"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {goal.title}
                </h3>
                <p className="text-sm text-zinc-400">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-zinc-500">
          <p>AI Workshop Playground — Built for Teamleader Workshop 2</p>
        </div>
      </footer>
    </div>
  );
}
