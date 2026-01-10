import type { Metadata } from "next";
import "./globals.css";
import PrivyProviders from "@/providers/PrivyProvider";
import { Inter, DM_Sans } from "next/font/google";
import { UserProvider } from "@/providers/UserProvider";

export const metadata: Metadata = {
  // ✅ REQUIRED for reliable OG/Twitter absolute URLs
  metadataBase: new URL("https://havenfinancial.xyz"), // <-- change this

  title: "Haven Financial",
  description: "Best app for financial growth.",
  manifest: "/manifest.webmanifest",
  themeColor: "#000000",

  openGraph: {
    title: "Haven Financial",
    description: "Best app for financial growth.",
    url: "https://havenfinancial.xyz", // <-- change this
    siteName: "Haven Financial",
    images: [
      {
        url: "https://havenfinancial.xyz/twitter.png", // <-- change + ensure exists
        width: 1200,
        height: 630,
        alt: "Haven Financial",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Haven Financial",
    description: "Best app for financial growth.",
    images: ["https://havenfinancial.xyz/twitter.png"], // <-- change
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Haven",
  },
};

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-heading" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>

      <body
        className={`${inter.variable} ${dmSans.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <PrivyProviders>
          <UserProvider>{children}</UserProvider>
        </PrivyProviders>
      </body>
    </html>
  );
}
