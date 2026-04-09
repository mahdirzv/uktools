import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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

const navLinks = [
  { href: "/moving", label: "Moving" },
  { href: "/claim", label: "Claim" },
  { href: "/freelance", label: "Freelance" },
  { href: "/company", label: "Company" },
  { href: "/subscriptions", label: "Subscriptions" },
  { href: "/crime", label: "Crime" },
  { href: "/parking", label: "Parking" },
  { href: "/flood", label: "Flood" },
  { href: "/epc", label: "EPC" },
];

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
        <header className="border-b bg-background/95">
          <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6">
            <div className="flex items-center gap-4">
              <Link href="/" className="shrink-0 text-sm font-semibold tracking-tight">
                UK Tools
              </Link>
              <nav className="min-w-0 flex-1 overflow-x-auto">
                <div className="flex min-w-max items-center gap-2 text-sm text-muted-foreground">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-md px-2 py-1 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col">{children}</div>
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
