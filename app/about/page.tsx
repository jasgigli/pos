"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MobileContainer,
  MobileHeader,
  MobileContent,
  MobileFooter,
} from "@/components/mobile-container";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "@/components/desktop-nav";
import { DesktopFooter } from "@/components/desktop-footer";

export default function AboutPage() {
  const router = useRouter();

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
    window.addEventListener('resize', checkMobileView);

    // Clean up event listener
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  // Show a minimal loading state before client-side code runs
  if (!isClient) {
    return <div className="min-h-screen flex items-center justify-center"><Logo size="lg" /></div>;
  }

  // Mobile view
  if (isMobileView) {
    return (
      <main className="min-h-screen bg-white sm:bg-gradient-to-br sm:from-amber-50 sm:via-white sm:to-orange-50 p-0 sm:p-4 flex flex-col items-center justify-center">
      <MobileContainer>
        {/* Status bar is automatically included in MobileContainer */}

        <MobileHeader>
          <div className="flex items-center space-x-2">
            <Logo size="sm" />
            <div>
              <h1 className="text-lg font-bold text-white">About</h1>
              <p className="text-xs text-white/80 -mt-0.5">POS Analyzer</p>
            </div>
          </div>
          <button
            onClick={() => router.back()}
            className="text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </MobileHeader>

        <MobileContent>
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <h2 className="text-lg font-bold text-primary mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                About POS Analyzer
              </h2>
              <p className="text-gray-600 mb-3">
                POS Analyzer is a powerful tool that helps you identify parts of
                speech in any text. It uses natural language processing to
                analyze text and identify nouns, verbs, adjectives, and more.
              </p>
              <p className="text-gray-600">
                This application was built using Next.js, React, and Tailwind
                CSS, with natural language processing powered by Compromise.js.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <h2 className="text-lg font-bold text-primary mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                Our Team
              </h2>
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  JAS
                </div>
                <div>
                  <h3 className="font-semibold">Junaid Ali Shah Gigli</h3>
                  <p className="text-sm text-gray-500">Lead Developer</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <h2 className="text-lg font-bold text-primary mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                Technology
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Next.js 15.3.1</li>
                <li>React 19</li>
                <li>Tailwind CSS</li>
                <li>Compromise.js for NLP</li>
              </ul>
            </div>

            <Button
              onClick={() => router.push("/")}
              variant="gradient"
              className="w-full rounded-xl py-3 shadow-md"
            >
              Back to Analyzer
            </Button>
          </div>
        </MobileContent>

        <MobileFooter>
          <div className="flex justify-around w-full">
            <button
              onClick={() => router.push("/")}
              className="flex flex-col items-center space-y-1 text-gray-500"
            >
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
            <button className="flex flex-col items-center space-y-1 text-primary">
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

  // Desktop view
  return (
    <>
      <DesktopNav activePage="about" />

      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About POS Analyzer</h2>
            <p className="mt-4 text-xl text-gray-500">Learn more about our powerful NLP tool</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-4">
                POS Analyzer is a powerful tool that helps you identify parts of speech in any text. It uses natural language processing to analyze text and identify nouns, verbs, adjectives, and more.
              </p>
              <p className="text-gray-600">
                This application was built using Next.js, React, and Tailwind CSS, with natural language processing powered by Compromise.js.
              </p>
            </div>

            {/* Team Section */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-primary mb-6">Our Team</h3>
              <div className="flex items-center space-x-6">
                <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold">
                  JAS
                </div>
                <div>
                  <h4 className="text-xl font-semibold">Junaid Ali Shah Gigli</h4>
                  <p className="text-gray-500 mb-2">Lead Developer</p>
                  <p className="text-gray-600">
                    Government College Peshawar
                  </p>
                </div>
              </div>
            </div>

            {/* Technology Section */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-primary mb-4">Technology Stack</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Next.js 15.3.1', icon: '⚛️' },
                  { name: 'React 19', icon: '🔄' },
                  { name: 'Tailwind CSS', icon: '🎨' },
                  { name: 'Compromise.js', icon: '🔍' },
                ].map((tech, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-3xl mb-2">{tech.icon}</div>
                    <div className="font-medium">{tech.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={() => router.push("/")}
                variant="gradient"
                size="lg"
                className="rounded-xl py-3 px-8 shadow-md"
              >
                Back to Analyzer
              </Button>
            </div>
          </div>
        </div>
      </div>

      <DesktopFooter />
    </>
