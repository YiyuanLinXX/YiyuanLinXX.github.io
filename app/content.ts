import rawContent from "./generated-content.json";
import rawSiteConfig from "../content/site.json";

export type ContentRecord = {
  kind: string;
  source_file: string;
  title: string | null;
  permalink: string | null;
  date: string | null;
  metadata: Record<string, string | string[] | boolean | null>;
  html: string;
  source: string;
};

export type SiteConfig = {
  url: string;
  name: string;
  name_zh: string;
  role_lines: string[];
  photo: string;
  location: string;
  organization: string;
  email: string;
  navigation: Array<{ label: string; href: string }>;
  social_links: Array<{ id: string; label: string; href: string }>;
  metadata: {
    title: string;
    description: string;
    social_description: string;
  };
};

export type SiteData = {
  pages: Record<string, ContentRecord>;
  collections: Record<string, ContentRecord[]>;
};

export const siteData = rawContent as SiteData;
export const siteConfig = rawSiteConfig as SiteConfig;
