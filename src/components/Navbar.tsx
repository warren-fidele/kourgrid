import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="z-50 border-b border-border bg-background/80 backdrop-blur-md">
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

          <div className="flex gap-1">
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
      </div>
    </nav>
  );
}
