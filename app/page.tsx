"use client";

import { useState, useCallback } from "react";
import {
  SparklesIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  MobileContainer,
  MobileHeader,
  MobileContent,
  MobileFooter,
} from "@/components/mobile-container";
import { ResultsDisplay } from "@/components/results-display";
import { Logo } from "@/components/logo";

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

const tagColorMapping: Record<string, { bg: string; text: string }> = {
  Noun: {
    bg: "bg-blue-100",
    text: "text-blue-800",
  },
  Verb: {
    bg: "bg-green-100",
    text: "text-green-800",
  },
  Adjective: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
  },
  Adverb: {
    bg: "bg-purple-100",
    text: "text-purple-800",
  },
  Preposition: {
    bg: "bg-pink-100",
    text: "text-pink-800",
  },
  Conjunction: {
    bg: "bg-indigo-100",
    text: "text-indigo-800",
  },
  Determiner: {
    bg: "bg-teal-100",
    text: "text-teal-800",
  },
  Value: {
    bg: "bg-orange-100",
    text: "text-orange-800",
  },
  Default: {
    bg: "bg-gray-200",
    text: "text-gray-800",
  },
};

const getTagStyle = (tag: string) =>
  tagColorMapping[tag] || tagColorMapping.Default;

export default function HomePage() {
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState<TaggedTerm[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value),
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!inputText.trim() || isLoading) return;
      setIsLoading(true);
      setError(null);
      setResults(null);
      try {
        const res = await fetch("/api/tag", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: inputText }),
        });
        const data = await res.json();
        if (!res.ok)
          throw new Error((data as ErrorResponse).error || res.statusText);
        setResults((data as TaggingResponse).taggedTerms);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    },
    [inputText, isLoading]
  );

  // Determine if we should show mobile view
  const isMobileView = true; // Always use mobile container for better UX

  const renderContent = () => (
    <>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="text-input">Enter your text</Label>
          <Textarea
            id="text-input"
            rows={4}
            value={inputText}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="The quick brown fox jumps over the lazy dog..."
          />
        </div>
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={!inputText.trim()}
          variant="gradient"
          className="w-full"
        >
          {!isLoading && <SparklesIcon className="h-5 w-5 mr-2" />}
          Analyze Text
        </Button>
      </form>

      {/* Feedback */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg flex items-start space-x-2 animate-fade-in">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Results */}
      {results && !isLoading && (
        <div className="mt-6">
          <ResultsDisplay results={results} getTagStyle={getTagStyle} />
        </div>
      )}
    </>
  );

  if (isMobileView) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-0 sm:p-4 flex flex-col items-center justify-center">
        <MobileContainer>
          <MobileHeader>
            <div className="flex items-center space-x-2">
              <Logo size="sm" />
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                POS Analyzer
              </h1>
            </div>
            <div className="text-xs text-muted-foreground">NLP Tool</div>
          </MobileHeader>

          <MobileContent>{renderContent()}</MobileContent>

          <MobileFooter>
            <div className="text-center text-xs text-muted-foreground">
              <p>Built with ❤️ by Junaid Ali Shah Gigli</p>
              <p>Government College Peshawar</p>
            </div>
          </MobileFooter>
        </MobileContainer>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-3xl animate-fade-in">
        <CardHeader className="text-center space-y-1 pb-0">
          <div className="flex flex-col items-center justify-center mb-4">
            <Logo size="lg" className="mb-2" />
            <div className="h-1 w-16 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full"></div>
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            POS Analyzer
          </h1>
          <p className="text-muted-foreground">
            Identify parts of speech visually
          </p>
        </CardHeader>

        <CardContent className="pt-6">{renderContent()}</CardContent>
      </Card>

      <footer className="mt-8 text-center text-xs text-muted-foreground">
        <p>Built with ❤️ by Junaid Ali Shah Gigli</p>
      </footer>
    </main>
  );
}
