import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const content = JSON.parse(await readFile(new URL("../app/generated-content.json", import.meta.url), "utf8"));
const site = JSON.parse(await readFile(new URL("../content/site.json", import.meta.url), "utf8"));

const siteHostname = new URL(site.url).hostname.toLowerCase();

function isInternalHref(href) {
  try {
    const url = new URL(href, site.url);
    return (url.protocol === "http:" || url.protocol === "https:")
      && url.hostname.toLowerCase() === siteHostname;
  } catch {
    return true;
  }
}

function assertLinkTargets(html, label) {
  const links = html.match(/<a(?:\s|>)[^>]*>/g) ?? [];
  assert.ok(links.length > 0, `${label} has no links to check`);
  for (const link of links) {
    const href = link.match(/\bhref="([^"]*)"/i)?.[1];
    if (!href || isInternalHref(href)) {
      assert.doesNotMatch(link, /\btarget=/i, `${label}: ${link}`);
      assert.doesNotMatch(link, /\brel=/i, `${label}: ${link}`);
    } else {
      assert.match(link, /target="_blank"/, `${label}: ${link}`);
      assert.match(link, /rel="noopener noreferrer"/, `${label}: ${link}`);
    }
  }
}

test("site configuration contains the editable profile fields", () => {
  assert.equal(site.name, "Yiyuan Lin");
  assert.ok(site.navigation.length >= 7);
  assert.ok(site.social_links.some((link) => link.id === "googlescholar"));
});

test("all expected content sections are generated", () => {
  assert.ok(content.pages.about);
  assert.ok(content.pages.mentorship);
  assert.ok(content.pages.cv);
  assert.equal(content.collections.publications.length, 7);
  assert.equal(content.collections.talks.length, 4);
  assert.equal(content.collections.teaching.length, 1);
  assert.equal(content.collections.robots.length, 6);
  assert.equal(content.collections.posts.length, 8);
});

test("every collection entry has a title and permalink", () => {
  for (const records of Object.values(content.collections)) {
    for (const record of records) {
      assert.ok(record.title, record.source_file);
      assert.ok(record.permalink, record.source_file);
    }
  }
});

test("every publication preview image exists", async () => {
  for (const publication of content.collections.publications) {
    const image = publication.metadata.pub_image;
    assert.equal(typeof image, "string", publication.source_file);
    await access(new URL(`../public${image}`, import.meta.url));
  }
});

test("education logos use transparent vector assets", async () => {
  for (const logo of ["Cornell_logo.svg", "ZJU_Logo.svg"]) {
    const source = await readFile(new URL(`../public/images/logo/${logo}`, import.meta.url), "utf8");
    assert.match(source, /<svg\b/);
    assert.doesNotMatch(source, /<image\b|<script\b|<foreignObject\b/);
  }

  assert.match(content.pages.about.html, /\/images\/logo\/Cornell_logo\.svg/);
  assert.match(content.pages.about.html, /\/images\/logo\/ZJU_Logo\.svg/);
});

test("BibTeX citations use the adaptive citation style", () => {
  for (const publication of content.collections.publications) {
    assert.match(publication.html, /<pre class="citation-block"><code class="language-bibtex">/, publication.source_file);
  }
});

test("superscript author markers remain plain text", () => {
  for (const publication of content.collections.publications) {
    assert.doesNotMatch(publication.html, /<sup\b[^>]*>[\s\S]*?<em>|<\/em>[\s\S]*?<\/sup>/, publication.source_file);
  }

  const thermal = content.collections.publications.find(
    (publication) => publication.source_file === "2026-sam-clip-thermal-plantphenomics.md",
  );
  assert.ok(thermal);
  assert.match(thermal.html, /Changying Li<sup>2,&#42;<\/sup>, Yu Jiang<sup>3,&#42;<\/sup>/);
});

test("publication resource links are extracted from Markdown", () => {
  const thermal = content.collections.publications.find(
    (publication) => publication.source_file === "2026-sam-clip-thermal-plantphenomics.md",
  );
  assert.deepEqual(
    thermal?.resources.map((resource) => resource.label),
    ["Paper", "Codebase", "Dataset"],
  );

  const rice = content.collections.publications.find(
    (publication) => publication.source_file === "2023-rice-phenology-stage-mapping-drones.md",
  );
  assert.equal(rice?.resources[0]?.label, "Paper");
});

test("generated links keep site links in place and open external links in a new tab", () => {
  for (const [section, records] of Object.entries(content.collections)) {
    for (const record of records) {
      if (record.html.includes("<a ")) assertLinkTargets(record.html, `${section}/${record.source_file}`);
    }
  }
  for (const [name, page] of Object.entries(content.pages)) {
    if (page.html.includes("<a ")) assertLinkTargets(page.html, `pages/${name}`);
  }
});

test("CV collection lists are generated from collection metadata", () => {
  assert.match(content.pages.cv.html, /SAM-CLIP-Thermal/);
  assert.match(content.pages.cv.html, /PhytoPatholoBot Imaging System/);
  assert.doesNotMatch(content.pages.cv.html, /\{%|AUTO:PUBLICATIONS/);
});

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("key routes render from generated Markdown content", async () => {
  const checks = [
    ["/", "About Me"],
    ["/publications", "Publications"],
    ["/talks", "Talks and Presentations"],
    ["/teaching", "Teaching"],
    ["/robots", "Robots"],
    ["/year-archive", "Blog posts"],
    ["/cv", "Curriculum Vitae"],
  ];

  for (const [pathname, expected] of checks) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, new RegExp(expected, "i"), pathname);
    assertLinkTargets(html, pathname);
  }
});

test("robot overview places each description below its title", async () => {
  const response = await render("/robots");
  const html = await response.text();
  assert.match(
    html,
    /class="robot-summary"[\s\S]*?<h2>[\s\S]*?PPB-OTR-UVC[\s\S]*?<p class="robot-description">PhytoPatholoBot running over the row with UV-C treatment<\/p>/,
  );
});

test("home and publication overview expose selected work and resources", async () => {
  const home = await (await render("/")).text();
  assert.match(home, /PPB-OTR-UVC/);
  assert.match(home, /PPB_OTR_UVC_web\.mp4/);

  const publications = await (await render("/publications")).text();
  assert.match(publications, /class="publication-resources"/);
  assert.match(publications, /\[Codebase\]/);
  assert.match(publications, /\[Dataset\]/);
});
