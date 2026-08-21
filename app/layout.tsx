import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter, Space_Mono } from "next/font/google";
import { siteConfig } from "./content";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const mono = Space_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "700"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const socialImage = new URL("/og.png", origin).toString();

  return {
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
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
