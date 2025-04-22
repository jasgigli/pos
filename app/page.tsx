"use client"; // Still a Client Component

import { useState, FormEvent, useCallback, useMemo } from "react";
import {
  SparklesIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline"; // Example using Heroicons

// --- Types (keep as before) ---
interface TaggedTerm {
  text: string;
  tags: string[];
  normal?: string;
}
interface TaggingResponse {
  taggedTerms: TaggedTerm[];
}
interface ErrorResponse {
  error: string;
}

// --- Tag Color Mapping (More Refined) ---
// Use Tailwind color shades for better consistency and dark mode adaptability
const tagColorMapping: Record<string, { bg: string; text: string }> = {
  Noun: {
    bg: "bg-blue-100 dark:bg-blue-800/50",
    text: "text-blue-800 dark:text-blue-200",
  },
  Verb: {
    bg: "bg-green-100 dark:bg-green-800/50",
    text: "text-green-800 dark:text-green-200",
  },
  Adjective: {
    bg: "bg-yellow-100 dark:bg-yellow-800/50",
    text: "text-yellow-800 dark:text-yellow-200",
  },
  Adverb: {
    bg: "bg-purple-100 dark:bg-purple-800/50",
    text: "text-purple-800 dark:text-purple-200",
  },
  Preposition: {
    bg: "bg-pink-100 dark:bg-pink-800/50",
    text: "text-pink-800 dark:text-pink-200",
  },
  Conjunction: {
    bg: "bg-indigo-100 dark:bg-indigo-800/50",
    text: "text-indigo-800 dark:text-indigo-200",
  },
  Determiner: {
    bg: "bg-teal-100 dark:bg-teal-800/50",
    text: "text-teal-800 dark:text-teal-200",
  },
  Value: {
    bg: "bg-orange-100 dark:bg-orange-800/50",
    text: "text-orange-800 dark:text-orange-200",
  },
  // Add more specific tags from 'compromise' if needed
  Default: {
    bg: "bg-gray-200 dark:bg-gray-700",
    text: "text-gray-800 dark:text-gray-200",
  },
};

const getTagStyle = (
  tags: string[]
): { bg: string; text: string; primaryTag: string } => {
  if (!tags || tags.length === 0)
    return { ...tagColorMapping.Default, primaryTag: "?" };

  const primaryTag = tags[0]; // Use the first tag for styling

  // Find the most specific match first (e.g., 'Noun' before checking startsWith('N'))
  if (tagColorMapping[primaryTag]) {
    return { ...tagColorMapping[primaryTag], primaryTag };
  }

  // Fallback to broader categories if specific tag isn't mapped
  if (primaryTag.startsWith("N"))
    return { ...tagColorMapping.Noun, primaryTag };
  if (primaryTag.startsWith("V"))
    return { ...tagColorMapping.Verb, primaryTag };
  if (primaryTag.startsWith("J"))
    return { ...tagColorMapping.Adjective, primaryTag };
  if (primaryTag.startsWith("R"))
    return { ...tagColorMapping.Adverb, primaryTag };

  return { ...tagColorMapping.Default, primaryTag }; // Default if no match
};

export default function HomePage() {
  const [inputText, setInputText] = useState<string>("");
  const [results, setResults] = useState<TaggedTerm[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputText(event.target.value);
      // Optionally clear results/error when input changes
      // if (results || error) {
      //   setResults(null);
      //   setError(null);
      // }
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!inputText.trim() || isLoading) return; // Prevent empty or double submission

      setIsLoading(true);
      setError(null);
      setResults(null); // Clear previous results immediately

      try {
        const response = await fetch("/api/tag", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: inputText }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            (data as ErrorResponse).error || `API Error: ${response.statusText}`
          );
        }

        setResults((data as TaggingResponse).taggedTerms);
      } catch (err) {
        console.error("Failed to fetch POS tags:", err);
        const message =
          err instanceof Error
            ? err.message
            : "An unknown error occurred. Please try again.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [inputText, isLoading]
  ); // Dependencies for useCallback

  // Memoize the results display to avoid re-rendering if results haven't changed
  const resultsDisplay = useMemo(() => {
    if (!results) return null;
    if (results.length === 0 && !isLoading && !error) {
      return (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
          No tags found for the input.
        </p>
      );
    }

    return (
      <div className="flex flex-wrap gap-x-2 gap-y-3 leading-relaxed">
        {results.map((term, index) => {
          const { bg, text, primaryTag } = getTagStyle(term.tags);
          const allTags = term.tags.join(", ");

          return (
            <span
              key={`${term.normal || term.text}-${index}`} // More robust key
              className="inline-flex items-baseline group" // Use group for potential hover effects later
            >
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {term.text}
              </span>
              <span
                title={`Tags: ${allTags}`} // Tooltip shows all tags
                className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold transition-colors ${bg} ${text} cursor-help`} // Added cursor-help
              >
                {primaryTag} {/* Show only the primary tag for cleaner UI */}
              </span>
            </span>
          );
        })}
      </div>
    );
  }, [results, isLoading, error]); // Dependencies for useMemo

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-sky-100 via-white to-indigo-100 dark:from-sky-950 dark:via-gray-900 dark:to-indigo-950">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 dark:border-gray-700/50 overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/30">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500 dark:from-indigo-400 dark:to-sky-300">
            Part-of-Speech Analyzer
          </h1>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-1">
            Enter text to identify Nouns, Verbs, Adjectives, etc.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
          <div>
            <label
              htmlFor="text-input"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Your Text
            </label>
            <textarea
              id="text-input"
              rows={6}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100 transition duration-150 ease-in-out resize-y placeholder:text-gray-400 dark:placeholder:text-gray-500"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Example: The quick brown fox jumps over the lazy dog..."
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className={`w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-indigo-500
              ${
                isLoading
                  ? "bg-indigo-400 dark:bg-indigo-800 cursor-wait"
                  : "bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 dark:from-indigo-500 dark:to-blue-400 dark:hover:from-indigo-600 dark:hover:to-blue-500"
              }
              ${
                !inputText.trim() && !isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
            `}
          >
            {isLoading ? (
              <>
                <ArrowPathIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Analyzing...
              </>
            ) : (
              <>
                <SparklesIcon className="-ml-1 mr-2 h-5 w-5" />{" "}
                {/* Example Icon */}
                Tag Text
              </>
            )}
          </button>
        </form>

        {/* Results & Error Section */}
        {(results || error || isLoading) && ( // Only render this section if there's something to show or it's loading
          <div className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-700/50">
            {/* Loading Skeleton (Optional but nice UX) */}
            {isLoading && !error && (
              <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-12"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && !isLoading && (
              <div
                className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700/50 text-red-700 dark:text-red-200 rounded-lg flex items-start space-x-3"
                role="alert"
              >
                <ExclamationTriangleIcon className="h-5 w-5 mt-0.5 text-red-500 dark:text-red-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">Analysis Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Results Display */}
            {results && !isLoading && !error && (
              <div>
                <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
                  Analysis Results:
                </h2>
                {resultsDisplay}
              </div>
            )}
          </div>
        )}
      </div>
      {/* Optional Footer */}
      <footer className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
        <p>Build with Love by Junaid Ali Shah Gigli</p>
        <p>Government College Peshawar</p>
      </footer>
    </main>
  );
}
