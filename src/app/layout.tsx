import { Footer } from "@/components/layout/footer";
import { DeferredMobileCTA } from "@/components/layout/DeferredMobileCTA";
import { Navbar } from "@/components/layout/navbar";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { brandLogos, siteConfig } from "@/content/site";
import { themeInitScript } from "@/lib/theme-script";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.seo.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seo.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  keywords: [
    "AI employees",
    "AI voice agents",
    "lead calling automation",
    "Telugu AI voice",
    "Hindi AI calling",
    "CRM automation",
    "SDR automation",
    "OpsBrain AI",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: brandLogos.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.seo.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    creator: "@opsbrainai",
    images: [brandLogos.ogImage],
  },
  icons: {
    icon: [
      { url: brandLogos.favicon.icon32, sizes: "32x32", type: "image/png" },
      { url: brandLogos.favicon.icon16, sizes: "16x16", type: "image/png" },
    ],
    apple: [
      {
        url: brandLogos.favicon.icon180,
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${inter.variable} ${plusJakarta.variable} h-full scroll-smooth`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col font-sans antialiased pb-20 md:pb-0">
        <ThemeProvider>
          <MotionProvider>
            <Navbar />
            {children}
            <Footer />
            <DeferredMobileCTA />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
