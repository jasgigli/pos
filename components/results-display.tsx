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
      <h2 className="text-xl font-bold mb-4 text-foreground flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-primary"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
        Analysis Results
      </h2>
      <div className="space-y-2 animate-slide-up">
        {results.map((term, idx) => {
          const primary = term.tags[0] || "Default";
          const style = getTagStyle(primary);
          return (
            <div
              key={idx}
              className={cn(
                "flex items-center justify-between p-3 rounded-xl",
                "bg-white shadow-sm",
                "transition-all duration-200 active:bg-gray-50",
                "border-l-4",
                {
                  "border-blue-400": primary === "Noun",
                  "border-green-400": primary === "Verb",
                  "border-purple-400": primary === "Adjective",
                  "border-pink-400": primary === "Adverb",
                  "border-amber-400": primary === "Preposition",
                  "border-indigo-400": primary === "Conjunction",
                  "border-teal-400": primary === "Determiner",
                  "border-red-400": primary === "Pronoun",
                  "border-orange-400": primary === "Value",
                  "border-gray-400": primary === "Default",
                }
              )}
            >
              <span className="font-medium text-base">{term.text}</span>
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold",
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
