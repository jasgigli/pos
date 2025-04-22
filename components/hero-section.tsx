"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const scrollToAnalyzer = () => {
    const analyzerElement = document.getElementById('analyzer-section');
    if (analyzerElement) {
      analyzerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="hidden sm:block bg-gradient-to-br from-amber-50 via-white to-orange-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Analyze text with</span>
              <span className="block text-primary">powerful NLP</span>
            </h1>
            <p className="mt-6 text-xl text-gray-500 max-w-3xl">
              Identify parts of speech in any text with our advanced natural language processing tool. Perfect for students, writers, and language enthusiasts.
            </p>
            <div className="mt-8 flex space-x-4">
              <Button 
                variant="gradient" 
                size="lg"
                onClick={scrollToAnalyzer}
              >
                Try It Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
              >
                Learn More
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { title: 'Fast Analysis', description: 'Process text in milliseconds' },
                { title: 'High Accuracy', description: '95%+ accuracy in tagging' },
                { title: 'Easy to Use', description: 'Simple, intuitive interface' }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <div className="px-6 py-4 bg-primary text-white">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-400 mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400 mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    <div className="ml-4 text-sm font-medium">POS Analyzer Demo</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="h-10 bg-gray-100 rounded w-3/4"></div>
                    <div className="h-32 bg-gray-100 rounded"></div>
                    <div className="h-10 bg-primary/20 rounded w-1/2 mx-auto"></div>
                    <div className="space-y-2">
                      <div className="h-12 bg-gray-100 rounded flex items-center justify-between px-4">
                        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                        <div className="h-6 w-16 bg-blue-100 rounded-full"></div>
                      </div>
                      <div className="h-12 bg-gray-100 rounded flex items-center justify-between px-4">
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                        <div className="h-6 w-16 bg-green-100 rounded-full"></div>
                      </div>
                      <div className="h-12 bg-gray-100 rounded flex items-center justify-between px-4">
                        <div className="h-4 bg-gray-300 rounded w-2/5"></div>
                        <div className="h-6 w-16 bg-purple-100 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
