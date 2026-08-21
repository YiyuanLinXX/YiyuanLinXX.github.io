import { RichContent, SiteFrame, siteData } from "./site";

export default function Home() {
  return (
    <SiteFrame title="About Me">
      <RichContent html={siteData.pages.about.html} />
    </SiteFrame>
  );
}
