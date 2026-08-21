import type { Metadata } from "next";
import {
  CVPage,
  findRecord,
  PostsPage,
  PublicationsPage,
  recordImage,
  RichContent,
  RobotsPage,
  SiteFrame,
  siteConfig,
  siteData,
  TalksPage,
  TeachingPage,
} from "../site";

type RouteProps = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

const listTitles: Record<string, string> = {
  publications: "Publications",
  talks: "Talks and Presentations",
  mentorship: "Mentorship",
  teaching: "Teaching",
  robots: "Robots",
  "year-archive": "Blog posts",
  cv: "Curriculum Vitae",
};

function routePath(slug: string[]) {
  return `/${slug.join("/")}`;
}

function plainText(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function generateStaticParams() {
  const listRoutes = Object.keys(listTitles).map((route) => ({ slug: [route] }));
  const pageRoutes = Object.values(siteData.pages).flatMap((record) => {
    if (!record.permalink || record.permalink === "/") return [];
    return [{ slug: record.permalink.replace(/^\/+|\/+$/g, "").split("/") }];
  });
  const detailRoutes = Object.values(siteData.collections).flat().flatMap((record) => {
    if (!record.permalink) return [];
    return [{ slug: record.permalink.replace(/^\/+|\/+$/g, "").split("/") }];
  });
  return [...listRoutes, ...pageRoutes, ...detailRoutes];
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const path = routePath(slug);
  const record = findRecord(path);
  const title = record?.title ?? listTitles[slug.join("/")] ?? "Yiyuan Lin";
  const description = record
    ? plainText(String(record.metadata.excerpt ?? `${record.kind} by ${siteConfig.name}`)).slice(0, 180)
    : `${title} — ${siteConfig.name}`;

  const image = record ? recordImage(record) : null;
  const images = image ? [new URL(image, siteConfig.url).toString()] : [];

  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    openGraph: { title: `${title} | ${siteConfig.name}`, description, images },
    twitter: { card: images.length ? "summary_large_image" : "summary", title: `${title} | ${siteConfig.name}`, description, images },
  };
}

export default async function CatchAllPage({ params }: RouteProps) {
  const { slug } = await params;
  const route = slug.join("/");

  if (route === "publications") return <PublicationsPage />;
  if (route === "talks") return <TalksPage />;
  if (route === "teaching") return <TeachingPage />;
  if (route === "robots") return <RobotsPage />;
  if (route === "year-archive") return <PostsPage />;
  if (route === "cv") return <CVPage />;
  if (route === "mentorship") {
    return <SiteFrame title="Mentorship"><RichContent html={siteData.pages.mentorship.html} /></SiteFrame>;
  }

  const record = findRecord(routePath(slug));
  if (!record) {
    return <SiteFrame title="Page not found"><p className="page-intro">The requested page could not be found.</p></SiteFrame>;
  }

  return (
    <SiteFrame title={record.title ?? "Untitled"}>
      <RichContent html={record.html} />
    </SiteFrame>
  );
}
