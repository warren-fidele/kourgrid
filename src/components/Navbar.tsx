import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="group flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center bg-primary text-black font-black italic transform -skew-x-12 group-hover:scale-110 transition-transform">
            PM
          </div>
          <span className="hidden text-sm font-mono font-black uppercase tracking-[0.3em] md:block">
            Portfolio // Manager
          </span>
        </Link>
        
        <div className="flex items-center gap-8">
          <div className="hidden gap-8 md:flex">
            <Link
              href="/"
              className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              [ 01 ] Home
            </Link>
            <Link
              href="/stocks"
              className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              [ 02 ] Terminal
            </Link>
            <Link
              href="/about"
              className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              [ 03 ] Intel
            </Link>
          </div>
          
          <div className="h-4 w-px bg-white/10" />
          
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[10px] uppercase text-primary/50">Online</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
