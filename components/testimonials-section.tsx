"use client";

import React from "react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote: "This tool has been invaluable for my English students. It helps them understand parts of speech in a visual and interactive way.",
    author: "Sarah Johnson",
    role: "English Teacher",
    avatar: "SJ",
    color: "bg-blue-100",
  },
  {
    quote: "I use POS Analyzer daily in my content writing. It helps me ensure I'm using a good mix of different word types for engaging content.",
    author: "Michael Chen",
    role: "Content Writer",
    avatar: "MC",
    color: "bg-green-100",
  },
  {
    quote: "As someone learning English as a second language, this tool has helped me understand grammar structures much better.",
    author: "Elena Rodriguez",
    role: "Language Learner",
    avatar: "ER",
    color: "bg-purple-100",
  },
];

export function TestimonialsSection() {
  return (
    <div className="hidden sm:block py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Trusted by educators and writers
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            See what our users are saying about POS Analyzer
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center mb-6">
                <div className={cn("h-12 w-12 rounded-full flex items-center justify-center text-gray-700 font-bold", testimonial.color)}>
                  {testimonial.avatar}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{testimonial.author}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              <div className="mt-4 flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
