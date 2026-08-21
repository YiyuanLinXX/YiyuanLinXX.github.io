import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const content = JSON.parse(await readFile(new URL("../app/generated-content.json", import.meta.url), "utf8"));
const site = JSON.parse(await readFile(new URL("../content/site.json", import.meta.url), "utf8"));

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
    ["/year-archive", "Blog posts"],
    ["/cv", "Curriculum Vitae"],
  ];

  for (const [pathname, expected] of checks) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(await response.text(), new RegExp(expected, "i"), pathname);
  }
});
