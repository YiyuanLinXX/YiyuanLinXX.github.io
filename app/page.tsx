import { RichContent, SiteFrame, siteData } from "./site";
import { RobotDemo, RobotDemoCarousel } from "./robot-demo-carousel";
import robotDemos from "../content/robot-demos.json";

export default function Home() {
  const [aboutBeforeDemos, aboutAfterDemos = ""] = siteData.pages.about.html.split("<!-- ROBOT_DEMOS -->");

  return (
    <SiteFrame title="About Me">
      <RichContent html={aboutBeforeDemos} />
      <RobotDemoCarousel items={robotDemos as RobotDemo[]} />
      {aboutAfterDemos ? <RichContent html={aboutAfterDemos} /> : null}
    </SiteFrame>
  );
}
