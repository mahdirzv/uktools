import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { TopNav } from "@/components/shared/TopNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UK Tools",
  description: "Free UK consumer tools and calculators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6">
            <div className="flex items-center gap-4">
              <Link href="/" className="shrink-0 text-sm font-semibold tracking-tight">
                UK Tools
              </Link>
              <TopNav />
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col bg-zinc-50 font-sans">{children}</div>
        <footer className="border-t py-6">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 text-xs text-muted-foreground sm:px-6">
            <span>UK Tools — free calculators for UK consumers</span>
            <div className="flex gap-4">
              <a href="/about" className="hover:text-foreground transition-colors">About</a>
              <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="https://github.com/mahdirzv/uktools" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
