import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import { cld, LAYERS } from "@/lib/cloudinary";
import { event } from "@/lib/content";
import "./globals.css";

const display = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

const title = `Majlis Perkahwinan ${event.coupleShort.bride} & ${event.coupleShort.groom}`;
const description = `${event.date.displayMs} · ${event.venue.name} · Majlis Perkahwinan`;

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description,
    type: "website",
    images: [
      {
        url: cld(LAYERS.bg, "f_auto,q_auto,w_1200,h_630,c_fill"),
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [cld(LAYERS.bg, "f_auto,q_auto,w_1200,h_630,c_fill")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ms"
      className={`${display.variable} ${serif.variable} ${script.variable} h-full`}
    >
      <body className="min-h-full font-serif antialiased">{children}</body>
    </html>
  );
}
