import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    <html lang="en" className="dark bg-slate-950">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-200`}
      >
        {children}
      </body>
    </html>
  );
}