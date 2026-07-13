import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { SiteAssistantWidget } from "@/components/assistant/SiteAssistantWidget";
import { Footer } from "@/components/layout/footer";
import { DeferredMobileCTA } from "@/components/layout/DeferredMobileCTA";
import { Navbar } from "@/components/layout/navbar";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { brandLogos, founder, siteConfig } from "@/content/site";
import { themeInitScript } from "@/lib/theme-script";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// TODO(hreflang): Add hreflang alternates when dedicated Hindi/Telugu landing pages ship.
// Until then, all pages serve English (`lang="en"`) with multilingual voice product capability.

const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

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
  keywords: [
    "OpsBrain",
    "OpsBrain AI",
    founder.name,
    "AI employees",
    "leads finder",
    "AI leads finder",
    "AI voice agents",
    "lead calling automation",
    "Telugu AI voice",
    "Hindi AI calling",
    "CRM automation",
    "SDR automation",
  ],
  authors: [
    { name: siteConfig.name, url: siteConfig.url },
    { name: founder.name, url: `${siteConfig.url}/about` },
  ],
  creator: founder.name,
  publisher: siteConfig.name,
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
  ...(gscVerification
    ? { verification: { google: gscVerification } }
    : {}),
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
        <meta name="theme-color" content="#4f46e5" />
      </head>
      <body className="flex min-h-full flex-col bg-surface-white font-sans antialiased pb-24 lg:pb-0">
        <AnalyticsScripts />
        <PageViewTracker />
        <ThemeProvider>
          <MotionProvider>
            <Navbar />
            {children}
            <Footer />
            <DeferredMobileCTA />
            <SiteAssistantWidget />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
