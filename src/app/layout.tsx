import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
});

import MotionProvider from "@/components/fx/MotionProvider";
import { SITE } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "KJSSE ISTE",
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "ISTE",
    "KJSSE",
    "K. J. Somaiya School of Engineering",
    "Indian Society for Technical Education",
    "MH 60",
    "student chapter",
    "Prakalpa",
    "Mumbai",
  ],
  icons: { icon: "/iste-logo.png", apple: "/iste-logo.png" },
  openGraph: {
    title: "KJSSE ISTE",
    description: SITE.description,
    siteName: SITE.name,
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: "KJSSE ISTE", description: SITE.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f5f5f5",
  width: "device-width",
  initialScale: 1,
  // Never block zoom — pinch-to-zoom is an accessibility requirement, and the
  // heavy motion on this site makes it more important, not less.
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/*
          Progressive enhancement floor.

          Framer Motion server-renders each element's `initial` state as inline
          style — so with JavaScript unavailable, everything that animates in
          would stay at opacity 0 and the page would look blank. This forces the
          final state for those users: no motion, but all the content.
        */}
        <noscript>
          <style>{`
            [style*="opacity:0"], [style*="opacity: 0"],
            .split-word, .split-line > * {
              opacity: 1 !important;
              transform: none !important;
              filter: none !important;
              clip-path: none !important;
            }
          `}</style>
        </noscript>
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {/*
          Document shell only.

          The site's chrome — preloader, Lenis smooth scroll, scroll progress,
          custom cursor, back-to-top — used to mount here, which put all of it
          on the council dashboard too, because `(portal)` has no layout of its
          own and a route group cannot opt out of the root. Lenis in particular
          swallowed the wheel events the admin modal needed to scroll.

          It now lives in `(site)/layout.tsx`, so it reaches the public pages
          and nothing else. MotionProvider stays: it only supplies reduced-motion
          context and is safe (and useful) everywhere.
        */}
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
