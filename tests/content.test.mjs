import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const content = JSON.parse(await readFile(new URL("../app/generated-content.json", import.meta.url), "utf8"));
const site = JSON.parse(await readFile(new URL("../content/site.json", import.meta.url), "utf8"));

function assertLinksOpenInNewTabs(html, label) {
  const links = html.match(/<a\b[^>]*>/g) ?? [];
  assert.ok(links.length > 0, `${label} has no links to check`);
  for (const link of links) {
    assert.match(link, /target="_blank"/, `${label}: ${link}`);
    assert.match(link, /rel="noopener noreferrer"/, `${label}: ${link}`);
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

test("BibTeX citations use the adaptive citation style", () => {
  for (const publication of content.collections.publications) {
    assert.match(publication.html, /<pre class="citation-block"><code class="language-bibtex">/, publication.source_file);
  }
});

test("links generated from content open in a new tab", () => {
  for (const [section, records] of Object.entries(content.collections)) {
    for (const record of records) {
      if (record.html.includes("<a ")) assertLinksOpenInNewTabs(record.html, `${section}/${record.source_file}`);
    }
  }
  for (const [name, page] of Object.entries(content.pages)) {
    if (page.html.includes("<a ")) assertLinksOpenInNewTabs(page.html, `pages/${name}`);
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
    assertLinksOpenInNewTabs(html, pathname);
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
