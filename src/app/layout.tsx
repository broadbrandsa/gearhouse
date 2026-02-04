import type { Metadata } from "next";
import { Inter_Tight, Inter } from "next/font/google"; // Changed to Inter_Tight
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Gearhouse Audit | Data Analyst Dashboard",
  description: "Technical audit and performance analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${interTight.variable} ${inter.variable} bg-background-dark text-gray-100 font-sans selection:bg-primary/30 min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
