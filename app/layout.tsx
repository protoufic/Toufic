import type { Metadata } from "next";
import "./globals.css";
import "./marketplace.css";
import { Analytics } from './analytics';

export const metadata: Metadata = {
  metadataBase: new URL("https://toufic.co"),
  title: "Toufic Abou Ali | Six Continents. One Mission.",
  description:
    "Toufic Abou Ali is building toward six full-distance races across six continents before turning 21.",
  openGraph: {
    title: "Six Continents. One Mission. | Toufic Abou Ali",
    description:
      "Follow Toufic Abou Ali’s six-continent endurance mission, race proof, progress and partnership opportunities.",
    type: "website",
    images: [
      {
        url: "/assets/img/support/six-continents-one-mission.webp",
        width: 1200,
        height: 630,
        alt: "Six Continents, One Mission — Toufic Abou Ali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Six Continents. One Mission. | Toufic Abou Ali",
    description: "6 full-distance races. 6 continents. Before 21.",
    images: ["/assets/img/support/six-continents-one-mission.webp"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}<Analytics /></body>
    </html>
  );
}
