import type { Metadata } from "next";
import { Geist, Geist_Mono, Chakra_Petch, Space_Mono } from "next/font/google";
import "./globals.css";
import favicon from "../../public/krish.jpeg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const chakraPetch = Chakra_Petch({
  weight: ['400', '500', '600', '700'],
  variable: "--font-chakra",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Krishnendu Ghosal | Software Engineer @ Ironbook AI',
  description: 'Full Stack Developer specialized in AI/ML, Cloud & DevOps. Experienced in building scalable systems with Kafka, Kubernetes, and React.',
  keywords: ['Full Stack Developer', 'DevOps Engineer', 'Ironbook AI', 'Next.js Portfolio', 'System Design'],
  icons: {
    icon: "/krish.jpeg",
    apple: '/apple-icon.png',
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${chakraPetch.variable} ${spaceMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}