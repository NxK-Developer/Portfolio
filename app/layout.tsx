import type { Metadata, Viewport } from "next";

import "./globals.css";
import { siteUrl, withBasePath } from "@/lib/site-config";

const title = "Nxk Developer — Creative Developer Portfolio";
const description =
  "Explore Nxk Developer's interactive portfolio, creative web experiences, projects, and digital work.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: "Nxk Developer" }],
  keywords: [
    "Nxk Developer",
    "creative developer",
    "portfolio",
    "interactive web experiences",
    "UI/UX",
    "frontend",
  ],
  openGraph: {
    type: "website",
    title,
    description,
    siteName: "Nxk Developer",
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "Nxk Developer — Creative Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/og.png`],
  },
  icons: {
    icon: [
      { url: withBasePath("/icon.svg"), type: "image/svg+xml" },
      { url: withBasePath("/favicon.ico") },
    ],
    apple: withBasePath("/apple-icon.png"),
  },
};

export const viewport: Viewport = {
  themeColor: "#06060a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-bone focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
