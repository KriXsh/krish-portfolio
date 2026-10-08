import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { LEETCODE_URL, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import SmoothScroll from "@/components/providers/SmoothScroll";
import MotionProvider from "@/components/providers/MotionProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Kai from "@/components/chat/Kai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  keywords: [
    "Krishnendu Ghosal",
    "Full Stack Developer",
    "AI/ML Engineer",
    "Software Engineer",
    "DevOps Engineer",
    "Cloud Engineer",
    "Kafka",
    "Kubernetes",
    "Next.js",
    "System Design",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070a11",
};

// Structured data so search engines understand who the site is about.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/krish-portrait-v2.webp`,
  jobTitle: "Software Engineer",
  description: SITE_DESCRIPTION,
  sameAs: ["https://github.com/KriXsh", "https://www.linkedin.com/in/krish-me", LEETCODE_URL],
  knowsAbout: [
    "Full-stack development",
    "Artificial intelligence",
    "Machine learning",
    "Retrieval-augmented generation",
    "Apache Kafka",
    "Kubernetes",
    "Amazon Web Services",
    "DevOps",
    "System design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${fontVariables}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body className="bg-background text-foreground font-sans antialiased">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
            <Kai />
          </SmoothScroll>
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
