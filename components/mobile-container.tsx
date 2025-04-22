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
        "w-full h-full max-w-md mx-auto overflow-hidden",
        "sm:rounded-2xl sm:shadow-xl sm:border border-amber-200/50",
        "sm:my-8 sm:max-h-[calc(100vh-4rem)]",
        "md:max-h-[calc(100vh-6rem)]",
        "bg-background",
        "flex flex-col",
        "transition-all duration-300",
        // Mobile app styling
        "fixed inset-0 sm:relative",
        "sm:h-auto",
        className
      )}
    >
      {/* Mobile status bar - only visible on small screens */}
      <div className="h-6 bg-primary/90 flex items-center justify-between px-3 text-white text-xs sm:hidden">
        <div>9:41 AM</div>
        <div className="flex items-center space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-.5h1.05a2.5 2.5 0 014.9 0H17a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
          </svg>
        </div>
      </div>
      {children}

      {/* Mobile home indicator - only visible on small screens */}
      <div className="h-5 flex justify-center items-center sm:hidden">
        <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
      </div>
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
        "px-4 py-3 border-b border-amber-200/50 bg-primary text-white",
        "flex items-center justify-between sticky top-6 z-10 sm:top-0",
        "shadow-sm",
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
    <div
      className={cn(
        "flex-1 overflow-auto p-4 bg-gray-50",
        "overscroll-bounce",
        className
      )}
    >
      {children}
    </div>
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
        "px-4 py-3 border-t border-amber-200/50 bg-white",
        "sticky bottom-5 z-10 sm:bottom-0",
        "shadow-[0_-2px_10px_rgba(0,0,0,0.05)]",
        className
      )}
    >
      {children}
    </div>
  );
}
