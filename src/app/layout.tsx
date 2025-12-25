import type { Metadata } from "next";
import { Inter, Work_Sans } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "./components/ui/Toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "OpsBrain | Enterprise AI for Operations",
  description: "Unified Enterprise AI platform. Connect PDFs, Databases, and Apps to a central brain. Ask natural language questions, get data-backed answers with strict RBAC.",
  keywords: [
    "OpsBrain AI",
    "AI Agent",
    "Put AI to Work",
    "Put AI to Monitor",
    "Enterprise AI",
    "Operations",
    "Data Integration",
    "Multi-Source Analysis",
    "Vector Database",
    "Enterprise Search",
    "Operational Intelligence",
    "Automated Root Cause Analysis"
  ],
  openGraph: {
    title: "OpsBrain | Enterprise AI for Operations",
    description: "Unified Enterprise AI platform. Connect PDFs, Databases, and Apps to a central brain.",
    type: "website",
    siteName: "OpsBrain",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpsBrain | Enterprise AI for Operations",
    description: "Unified Enterprise AI platform. Connect PDFs, Databases, and Apps to a central brain.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${workSans.variable} font-sans bg-obs-bg text-obs-text antialiased`}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
