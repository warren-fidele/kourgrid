'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu overlay - positioned outside nav to avoid covering the button */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-background/95 backdrop-blur-md overflow-y-auto">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-2">
            <Link
              href="/"
              className="px-4 py-4 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors min-h-[44px]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/stocks"
              className="px-4 py-4 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors min-h-[44px]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Terminal
            </Link>
            <Link
              href="/about"
              className="px-4 py-4 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors min-h-[44px]"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}

      <nav className="relative z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="group flex items-center gap-2">
              <div className="flex h-8 w-8 items-center">
                <Image src="/icon.svg" alt="KourGrid" width="32" height="32" />
              </div>
              <span className="text-lg font-semibold tracking-tight hidden sm:inline-block">
                KourGrid
              </span>
            </Link>

            <div className="h-4 w-px bg-border hidden sm:block" />

            <div className="flex gap-1 hidden sm:flex">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/stocks"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
              >
                Terminal
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
              >
                About
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="sm:hidden flex items-center justify-center min-h-[44px] min-w-[44px] p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
