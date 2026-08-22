import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://toufic.co"),
  title: "Toufic Abou Ali | Six Continents Before 21",
  description:
    "Toufic Abou Ali is preparing six full distance IRONMAN races across six continents before turning 21. Explore the mission, proof, founder story, media facts, and partner roles.",
  openGraph: {
    title: "Six Continents Before 21 | Partner Experience",
    description:
      "A clear partner brief covering the mission, proof, route, real needs, company fit and partner value.",
    type: "website",
    images: [
      {
        url: "/assets/img/warsaw/finish-lebanon.webp",
        width: 1200,
        height: 630,
        alt: "Toufic Abou Ali carrying the Lebanese flag at an IRONMAN finish",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Six Continents Before 21 | Partner Experience",
    description: "Six full distance IRONMAN races. Six continents. Before age 21.",
    images: ["/assets/img/warsaw/finish-lebanon.webp"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
