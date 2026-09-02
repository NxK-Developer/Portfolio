import type { Metadata, Viewport } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Nxk Developer — Creative Developer Portfolio",
  description:
    "Explore Nxk Developer's interactive portfolio, creative web experiences, projects, and digital work.",
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
    title: "Nxk Developer — Creative Developer Portfolio",
    description:
      "Explore Nxk Developer's interactive portfolio, creative web experiences, projects, and digital work.",
    siteName: "Nxk Developer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nxk Developer — Creative Developer Portfolio",
    description:
      "Explore Nxk Developer's interactive portfolio, creative web experiences, projects, and digital work.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
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
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
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
