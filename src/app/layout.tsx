import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PORTFOLIO // MANAGER",
  description: "Next-gen Financial Advisory HUD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.05),transparent_70%)] pointer-events-none" />
        <Navbar />
        <main className="flex-grow relative z-10">
          {children}
        </main>
        <footer className="border-t border-white/5 py-8 bg-black/40 backdrop-blur-md relative z-10">
          <div className="container mx-auto px-4 text-center">
            <div className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
              // System Ready // Access Granted // {new Date().getFullYear()}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
