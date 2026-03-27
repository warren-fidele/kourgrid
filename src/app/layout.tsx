import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Image from "next/image";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KourGrid | Mauritius Stock Analytics",
  description: "Professional analytics platform for Mauritius Stock Exchange data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} font-sans antialiased min-h-screen md:h-screen flex flex-col md:overflow-hidden`}
      >
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_70%)] pointer-events-none" />
        <Navbar />
        <main className="flex-grow relative z-10 md:overflow-hidden">
          {children}
        </main>
        <footer className="border-t border-border bg-card/80 backdrop-blur-md relative z-10 mt-6">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 text-center md:text-left">
                <Image src="/icon.svg" alt="KourGrid" width="20" height="20" className="inline-block" />
                <span className="font-medium">© {new Date().getFullYear()} KourGrid</span>
                <span className="hidden md:inline mx-2">•</span>
                <span className="hidden md:inline text-muted-foreground/70">Mauritius Stock Exchange</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground/60">
                <span>v1.0.4</span>
                <span className="w-px h-3 bg-border" />
                <span>Daily @ 5PM</span>
                <span className="w-px h-3 bg-border" />
                <span>Operational</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
