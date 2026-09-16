import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from './analytics';

export const metadata: Metadata = {
  metadataBase: new URL("https://toufic.co"),
  title: "Toufic Abou Ali | Six Continents. One Guinness World Records Attempt.",
  description:
    "Toufic Abou Ali is preparing six full distance IRONMAN races across six continents as part of an official Guinness World Records attempt. No record is claimed.",
  openGraph: {
    title: "Six Continents. One Guinness World Records Attempt. | Toufic Abou Ali",
    description:
      "Follow and support Toufic Abou Ali’s six-continent IRONMAN Guinness World Records attempt, or explore company partnership roles.",
    type: "website",
    images: [
      {
        url: "/assets/img/support/six-continents-one-mission.webp",
        width: 1200,
        height: 630,
        alt: "Six Continents, One Mission — Toufic Abou Ali Guinness World Records attempt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Six Continents. One Guinness World Records Attempt. | Toufic Abou Ali",
    description: "Six full distance IRONMAN races. Six continents. One official Guinness World Records attempt.",
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
