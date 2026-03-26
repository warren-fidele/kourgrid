import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center bg-primary text-black font-black text-xs">
              PM
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest hidden sm:inline-block">
              Portfolio_Terminal
            </span>
          </Link>
          
          <div className="h-4 w-px bg-white/10 hidden sm:block" />
          
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/stocks"
              className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              Terminal
            </Link>
            <Link
              href="/about"
              className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              Intel
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded">
            <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[9px] uppercase font-bold text-accent">Live_Data</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
