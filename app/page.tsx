"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { DesktopNav } from "@/components/desktop-nav";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { DesktopFooter } from "@/components/desktop-footer";

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
    bg: "bg-purple-100",
    text: "text-purple-800",
  },
  Adverb: {
    bg: "bg-pink-100",
    text: "text-pink-800",
  },
  Preposition: {
    bg: "bg-amber-100",
    text: "text-amber-800",
  },
  Conjunction: {
    bg: "bg-indigo-100",
    text: "text-indigo-800",
  },
  Determiner: {
    bg: "bg-teal-100",
    text: "text-teal-800",
  },
  Pronoun: {
    bg: "bg-red-100",
    text: "text-red-800",
  },
  Value: {
    bg: "bg-orange-100",
    text: "text-orange-800",
  },
  Default: {
    bg: "bg-gray-100",
    text: "text-gray-800",
  },
};

const getTagStyle = (tag: string) =>
  tagColorMapping[tag] || tagColorMapping.Default;

export default function HomePage() {
  const router = useRouter();
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

  // Determine if we should show mobile view based on client-side screen size
  const [isMobileView, setIsMobileView] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Effect to check screen size on client side
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 640); // 640px is the 'sm' breakpoint in Tailwind
    };

    // Check on initial render
    checkMobileView();
    setIsClient(true);

    // Add event listener for window resize
    window.addEventListener("resize", checkMobileView);

    // Clean up event listener
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  const renderContent = () => (
    <>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm p-3 border border-gray-100">
          <Label
            htmlFor="text-input"
            className="text-primary font-semibold flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            Enter text to analyze
          </Label>
          <Textarea
            id="text-input"
            rows={4}
            value={inputText}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="The quick brown fox jumps over the lazy dog..."
            className="mt-2 focus:border-primary focus:ring-primary"
          />
        </div>
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={!inputText.trim()}
          variant="gradient"
          className="w-full rounded-xl py-3 shadow-md"
        >
          {!isLoading && <SparklesIcon className="h-5 w-5 mr-2" />}
          Analyze Text
        </Button>
      </form>

      {/* Feedback */}
      {error && (
        <div className="mt-4 p-3 bg-white rounded-xl shadow-sm border-l-4 border-orange-500 flex items-center space-x-2 animate-fade-in">
          <ExclamationTriangleIcon className="h-5 w-5 text-orange-500 flex-shrink-0" />
          <p className="text-gray-700 text-sm font-medium">{error}</p>
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

  // Show a minimal loading state before client-side code runs
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Logo size="lg" />
      </div>
    );
  }

  if (isMobileView) {
    return (
      <main className="min-h-screen bg-white sm:bg-gradient-to-br sm:from-amber-50 sm:via-white sm:to-orange-50 p-0 sm:p-4 flex flex-col items-center justify-center">
        <MobileContainer>
          <MobileHeader>
            <div className="flex items-center space-x-2">
              <Logo size="sm" />
              <div>
                <h1 className="text-lg font-bold text-white">POS Analyzer</h1>
                <p className="text-xs text-white/80 -mt-0.5">NLP Tool</p>
              </div>
            </div>
            <button className="text-white p-1 rounded-full hover:bg-white/10 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </MobileHeader>

          <MobileContent>{renderContent()}</MobileContent>

          <MobileFooter>
            <div className="flex justify-around w-full">
              <button className="flex flex-col items-center space-y-1 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="text-xs font-medium">Home</span>
              </button>
              <button
                onClick={() => router.push("/about")}
                className="flex flex-col items-center space-y-1 text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs font-medium">About</span>
              </button>
              <button
                onClick={() => router.push("/profile")}
                className="flex flex-col items-center space-y-1 text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs font-medium">Profile</span>
              </button>
            </div>
          </MobileFooter>
        </MobileContainer>
      </main>
    );
  }

  return (
    <>
      <DesktopNav />
      <HeroSection />

      <div id="analyzer-section" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Try Our POS Analyzer
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Enter any text to identify parts of speech
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="w-full animate-fade-in shadow-xl border-0">
              <CardHeader className="text-center space-y-1 pb-0">
                <div className="flex flex-col items-center justify-center mb-4">
                  <Logo size="lg" className="mb-2" />
                  <div className="h-1 w-16 bg-gradient-to-r from-amber-300/70 to-orange-400/70 rounded-full"></div>
                </div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  POS Analyzer
                </h1>
                <p className="text-muted-foreground text-sm">
                  Identify parts of speech visually
                </p>
              </CardHeader>

              <CardContent className="pt-6">{renderContent()}</CardContent>
            </Card>
          </div>
        </div>
      </div>

      <FeaturesSection />
      <TestimonialsSection />
      <DesktopFooter />
    </>
  );
}
