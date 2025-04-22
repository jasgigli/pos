"use client"; // Mark this as a Client Component

import { useState, FormEvent } from "react";

// Define the structure matching the API response for type safety
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

export default function HomePage() {
  const [inputText, setInputText] = useState<string>("");
  const [results, setResults] = useState<TaggedTerm[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults(null);

    if (!inputText.trim()) {
      setError("Please enter some text to tag.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/tag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Use the error message from the API response if available
        throw new Error(
          (data as ErrorResponse).error || `API Error: ${response.statusText}`
        );
      }

      setResults((data as TaggingResponse).taggedTerms);
    } catch (err) {
      console.error("Failed to fetch POS tags:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to get a background color based on the primary POS tag
  const getTagColor = (tags: string[]): string => {
    if (!tags || tags.length === 0) return "bg-gray-200 dark:bg-gray-600"; // Default

    const primaryTag = tags[0]; // Use the first tag for simplicity

    // Simple color mapping - expand as needed
    if (primaryTag.startsWith("N")) return "bg-blue-200 dark:bg-blue-700"; // Noun
    if (primaryTag.startsWith("V")) return "bg-green-200 dark:bg-green-700"; // Verb
    if (primaryTag.startsWith("J")) return "bg-yellow-200 dark:bg-yellow-700"; // Adjective
    if (primaryTag.startsWith("R")) return "bg-purple-200 dark:bg-purple-700"; // Adverb
    if (primaryTag === "Preposition") return "bg-pink-200 dark:bg-pink-700";
    if (primaryTag === "Conjunction") return "bg-indigo-200 dark:bg-indigo-700";
    if (primaryTag === "Determiner") return "bg-teal-200 dark:bg-teal-700";

    return "bg-gray-200 dark:bg-gray-600"; // Default for others
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 sm:p-12 md:p-24 bg-gradient-to-br from-sky-50 to-indigo-100 dark:from-sky-900 dark:to-indigo-900">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Part-of-Speech Tagger
        </h1>

        <form onSubmit={handleSubmit} className="mb-6">
          <label
            htmlFor="text-input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Enter text to tag:
          </label>
          <textarea
            id="text-input"
            rows={5}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100 resize-y"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or paste your text here..."
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`mt-4 w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white 
              ${
                isLoading
                  ? "bg-indigo-300 dark:bg-indigo-800 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
              }
              transition duration-150 ease-in-out`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Tag Text"
            )}
          </button>
        </form>

        {error && (
          <div
            className="mt-6 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-md"
            role="alert"
          >
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {results && results.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Results:
            </h2>
            <div className="flex flex-wrap gap-2 leading-relaxed">
              {results.map((term, index) => (
                <span key={index} className="inline-block mb-1">
                  <span className="px-1">{term.text}</span>
                  <span
                    className={`text-xs font-semibold px-1.5 py-0.5 rounded ${getTagColor(
                      term.tags
                    )} text-gray-800 dark:text-gray-900 ml-0.5`}
                  >
                    {term.tags.join(", ")}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
        {results && results.length === 0 && !isLoading && !error && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">
              No terms were identified in the input text.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
