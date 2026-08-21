import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { marked } from "marked";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = path.join(projectRoot, "content");
const outputFile = path.join(projectRoot, "app", "generated-content.json");

const collectionKinds = {
  publications: "publication",
  talks: "talk",
  teaching: "teaching",
  robots: "robot",
  posts: "post",
};

marked.setOptions({ gfm: true, breaks: false });

function normalizeValue(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (Array.isArray(value)) return value.map(normalizeValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, normalizeValue(nested)]));
  }
  return value ?? null;
}

function dateValue(metadata) {
  const value = normalizeValue(metadata.date);
  return typeof value === "string" ? value.slice(0, 10) : null;
}

function prepareMarkdown(markdown) {
  return markdown
    .replace(/<style>[\s\S]*?<\/style>/gi, "")
    .replace(/^\{:\s*[^}]+\}\s*$/gm, "")
    .replace(/^\{%[^%]*%\}\s*$/gm, "");
}

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name)
    .sort();
}

async function readDraft(directory, filename, kind) {
  const filePath = path.join(directory, filename);
  const source = await readFile(filePath, "utf8");
  const parsed = matter(source);
  const metadata = normalizeValue(parsed.data);
  const title = typeof metadata.title === "string" ? metadata.title : null;
  const permalink = typeof metadata.permalink === "string" ? metadata.permalink : null;

  if (!title) throw new Error(`${path.relative(projectRoot, filePath)} is missing a title.`);
  if (!permalink) throw new Error(`${path.relative(projectRoot, filePath)} is missing a permalink.`);

  return {
    kind,
    source_file: filename,
    title,
    permalink,
    date: dateValue(metadata),
    metadata,
    markdown: parsed.content,
    source,
  };
}

function markdownLinkTitle(value) {
  return String(value).replaceAll("[", "\\[").replaceAll("]", "\\]");
}

function year(record) {
  return record.date?.slice(0, 4) ?? "";
}

function autoList(records, formatter) {
  return [...records]
    .sort((a, b) => String(b.date ?? "").localeCompare(String(a.date ?? "")))
    .map(formatter)
    .join("\n");
}

function expandAutoSections(markdown, collections) {
  const publications = autoList(collections.publications, (record) =>
    `- [${markdownLinkTitle(record.title)}](${record.permalink}) — *${record.metadata.publication ?? ""}*, ${year(record)}`,
  );
  const talks = autoList(collections.talks, (record) =>
    `- ${markdownLinkTitle(record.title)} — ${record.metadata.venue ?? ""}, ${year(record)}`,
  );
  const teaching = autoList(collections.teaching, (record) =>
    `- [${markdownLinkTitle(record.title)}](${record.permalink}) — ${year(record)}`,
  );

  return markdown
    .replace("<!-- AUTO:PUBLICATIONS -->", publications)
    .replace("<!-- AUTO:TALKS -->", talks)
    .replace("<!-- AUTO:TEACHING -->", teaching);
}

async function compileDraft(draft, collections) {
  const expanded = expandAutoSections(prepareMarkdown(draft.markdown), collections);
  const html = await marked.parse(expanded);
  return {
    kind: draft.kind,
    source_file: draft.source_file,
    title: draft.title,
    permalink: draft.permalink,
    date: draft.date,
    metadata: draft.metadata,
    html,
    source: draft.source,
  };
}

const collectionDrafts = {};
for (const [directoryName, kind] of Object.entries(collectionKinds)) {
  const directory = path.join(contentRoot, directoryName);
  const files = await markdownFiles(directory);
  collectionDrafts[directoryName] = await Promise.all(files.map((file) => readDraft(directory, file, kind)));
}

const collections = {};
for (const [name, drafts] of Object.entries(collectionDrafts)) {
  collections[name] = await Promise.all(drafts.map((draft) => compileDraft(draft, collectionDrafts)));
}

const pagesDirectory = path.join(contentRoot, "pages");
const pageFiles = await markdownFiles(pagesDirectory);
const pageDrafts = await Promise.all(pageFiles.map((file) => readDraft(pagesDirectory, file, "page")));
const pages = {};
for (const draft of pageDrafts) {
  const key = path.basename(draft.source_file, ".md");
  pages[key] = await compileDraft(draft, collectionDrafts);
}

await mkdir(path.dirname(outputFile), { recursive: true });
await writeFile(outputFile, `${JSON.stringify({ pages, collections }, null, 2)}\n`);

const total = Object.values(collections).reduce((sum, records) => sum + records.length, 0);
console.log(`Generated ${Object.keys(pages).length} pages and ${total} collection entries.`);
