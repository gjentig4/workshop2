"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sparkles, Database, Home, Github } from "lucide-react";

const navItems = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/playground",
    label: "Playground",
    icon: Sparkles,
  },
  {
    href: "/rag-lab",
    label: "RAG Lab",
    icon: Database,
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/brand/Teamleader_Icon.svg"
              alt="Teamleader"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-white leading-tight">
                AI Workshop
              </span>
              <span className="text-[10px] text-zinc-500 leading-tight">
                by Teamleader
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
            
            <div className="w-px h-6 bg-zinc-800 mx-2" />
            
            <a
              href="https://github.com/gjentig4/workshop2"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
              title="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
