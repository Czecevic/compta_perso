import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Kompta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-indigo-500 selection:text-white">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0f19]/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <span className="text-xl font-black text-white tracking-wider">K</span>
              </div>
              <div>
                <span className="font-bold text-lg bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
                  Kompta
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                  Comptabilité Partagée
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Calcul équitable par revenu</span>
            </div>
          </div>
        </header>
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
