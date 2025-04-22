"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileContainer({ children, className }: MobileContainerProps) {
  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto overflow-hidden",
        "sm:rounded-2xl sm:shadow-xl sm:border border-amber-200/50",
        "sm:my-8 sm:max-h-[calc(100vh-4rem)]",
        "md:max-h-[calc(100vh-6rem)]",
        "bg-background",
        "flex flex-col",
        "transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}

export function MobileHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "px-4 py-3 border-b border-amber-200/50 bg-amber-50/30 backdrop-blur-sm",
        "flex items-center justify-between sticky top-0 z-10",
        className
      )}
    >
      {children}
    </div>
  );
}

export function MobileContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex-1 overflow-auto p-4", className)}>{children}</div>
  );
}

export function MobileFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "px-4 py-3 border-t border-amber-200/50 bg-amber-50/30 backdrop-blur-sm",
        "sticky bottom-0 z-10",
        className
      )}
    >
      {children}
    </div>
  );
}
