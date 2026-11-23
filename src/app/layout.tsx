import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "SOP Library | Second Harvest", template: "%s | SOP Library" },
  description: "A sample-data scaffold for the Second Harvest SOP and policy library.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <a
          href="#main-content"
          className="sr-only z-50 rounded bg-white p-3 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <header className="border-b border-emerald-950/10 bg-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
            <Link href="/library" className="text-lg font-semibold tracking-tight text-emerald-950">
              Second Harvest <span className="ml-2 font-normal text-slate-500">SOP Library</span>
            </Link>
            <span className="text-sm font-medium text-emerald-800">Preview · sample documents</span>
          </div>
        </header>
        <main id="main-content" className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
          {children}
        </main>
        <footer className="mx-auto max-w-6xl px-5 pb-8 text-sm text-slate-500 sm:px-8">
          Sample content only. Real policies and staff access are not connected.
        </footer>
      </body>
    </html>
  );
}
