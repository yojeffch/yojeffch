import type { Metadata } from "next";
import { Literata, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const display = Literata({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mapa da Clareza",
  description:
    "Kit interativo de orientação profissional — questionários por capítulos, no seu ritmo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} h-full`}>
      <body className="relative min-h-full flex flex-col bg-sand text-charcoal antialiased">
        <div className="paper-grain pointer-events-none fixed inset-0 z-0" aria-hidden />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
