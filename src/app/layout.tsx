import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PixelCraft AI - AI-Powered Pixelhobby Pattern Generator",
  description:
    "Create beautiful Pixelhobby patterns from text prompts or photos using AI. Get color-mapped patterns, step-by-step instructions, and materials lists.",
  openGraph: {
    title: "PixelCraft AI - AI-Powered Pixelhobby Pattern Generator",
    description:
      "Create beautiful Pixelhobby patterns from text prompts or photos using AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fredoka:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
