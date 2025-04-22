"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TaggedTerm {
  text: string;
  tags: string[];
  normal?: string;
}

interface ResultsDisplayProps {
  results: TaggedTerm[];
  getTagStyle: (tag: string) => { bg: string; text: string };
}

export function ResultsDisplay({ results, getTagStyle }: ResultsDisplayProps) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Results</h2>
      <div className="space-y-3 animate-slide-up">
        {results.map((term, idx) => {
          const primary = term.tags[0] || "Default";
          const style = getTagStyle(primary);
          return (
            <div
              key={idx}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg shadow-sm",
                "border border-amber-200/50 backdrop-blur-sm",
                "transition-all duration-200 hover:shadow-md",
                "hover:scale-[1.01]"
              )}
            >
              <span className="font-medium text-lg">{term.text}</span>
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-sm font-semibold",
                  style.bg,
                  style.text
                )}
              >
                {primary}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
