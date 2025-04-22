"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}

const NavLink = ({ href, children, className, active }: NavLinkProps) => (
  <Link 
    href={href}
    className={cn(
      "px-4 py-2 text-sm font-medium rounded-md transition-colors",
      active 
        ? "text-primary bg-primary/10" 
        : "text-gray-700 hover:text-primary hover:bg-gray-100",
      className
    )}
  >
    {children}
  </Link>
);

export function DesktopNav() {
  const router = useRouter();
  
  return (
    <header className="hidden sm:block w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and primary navigation */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Logo size="sm" />
              <span className="ml-2 text-xl font-bold text-gray-900">POS Analyzer</span>
            </div>
            <nav className="ml-10 flex items-center space-x-4">
              <NavLink href="/" active>Home</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="#">Features</NavLink>
              <NavLink href="#">Pricing</NavLink>
            </nav>
          </div>
          
          {/* Secondary navigation */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.push("/profile")}
            >
              Dashboard
            </Button>
            <Button 
              variant="gradient" 
              size="sm"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
