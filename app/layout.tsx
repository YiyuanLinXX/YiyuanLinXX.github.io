import type { Metadata } from "next";
import { siteConfig } from "./content";
import "./globals.css";

const socialImage = new URL("/og.png", siteConfig.url).toString();

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.social_description,
    type: "website",
    images: [{ url: socialImage, width: 1792, height: 938, alt: "Yiyuan Lin — Field Robotics and AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.social_description,
    images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
