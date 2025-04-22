"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className }: LogoProps) {
  const sizeClasses = {
    sm: "h-9 w-9",
    md: "h-12 w-12",
    lg: "h-20 w-20 border-2",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full shadow-md",
        "border border-primary/20 bg-white/90",
        "flex items-center justify-center",
        sizeClasses[size],
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 z-0"></div>
      <img
        src="/logo.png"
        alt="POS Analyzer Logo"
        className="h-full w-full object-cover scale-110 transform hover:scale-125 transition-transform duration-300 z-10"
      />
    </div>
  );
}
