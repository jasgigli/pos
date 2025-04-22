"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  MobileContainer,
  MobileHeader,
  MobileContent,
  MobileFooter,
} from "@/components/mobile-container";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white sm:bg-gradient-to-br sm:from-amber-50 sm:via-white sm:to-orange-50 p-0 sm:p-4 flex flex-col items-center justify-center">
      <MobileContainer>
        {/* Status bar is automatically included in MobileContainer */}

        <MobileHeader>
          <div className="flex items-center space-x-2">
            <Logo size="sm" />
            <div>
              <h1 className="text-lg font-bold text-white">Profile</h1>
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
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold mb-4">
                JAS
              </div>
              <h2 className="text-xl font-bold">Junaid Ali Shah Gigli</h2>

              <div className="flex space-x-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">24</div>
                  <div className="text-xs text-gray-500">Analyses</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">1,248</div>
                  <div className="text-xs text-gray-500">Words</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">5</div>
                  <div className="text-xs text-gray-500">Days</div>
                </div>
              </div>

              <Button variant="outline" className="w-full rounded-xl">
                Edit Profile
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <h2 className="text-lg font-bold text-primary mb-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                    clipRule="evenodd"
                  />
                </svg>
                Recent Activity
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <div className="font-medium">Text Analysis</div>
                    <div className="text-xs text-gray-500">Today, 10:30 AM</div>
                  </div>
                  <div className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    42 words
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <div className="font-medium">Text Analysis</div>
                    <div className="text-xs text-gray-500">
                      Yesterday, 3:15 PM
                    </div>
                  </div>
                  <div className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    78 words
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <div className="font-medium">Text Analysis</div>
                    <div className="text-xs text-gray-500">May 20, 2023</div>
                  </div>
                  <div className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    156 words
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <h2 className="text-lg font-bold text-primary mb-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
                Statistics
              </h2>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Nouns</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">65%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Verbs</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: "42%" }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">42%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Adjectives</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: "28%" }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">28%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Others</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                      <div
                        className="h-full bg-gray-500 rounded-full"
                        style={{ width: "15%" }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">15%</span>
                  </div>
                </div>
              </div>
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
            <button className="flex flex-col items-center space-y-1 text-primary">
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
