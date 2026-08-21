import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [rawType, rawSlug] = process.argv.slice(2);
const aliases = { publication: "publications", talk: "talks", teaching: "teaching", robot: "robots", post: "posts", page: "pages" };
const directory = aliases[rawType];
const slug = rawSlug?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

if (!directory || !slug) {
  console.error("Usage: npm run new -- <publication|talk|teaching|robot|post|page> <slug>");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const title = slug.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
const filename = ["publications", "talks", "teaching", "posts"].includes(directory) ? `${today}-${slug}.md` : `${slug}.md`;
const target = path.join(projectRoot, "content", directory, filename);
const template = path.join(projectRoot, "templates", `${rawType}.md`);

try {
  await access(target);
  console.error(`Content already exists: ${path.relative(projectRoot, target)}`);
  process.exit(1);
} catch {}

const templateText = await readFile(template, "utf8");
const output = templateText
  .replaceAll("{{DATE}}", today)
  .replaceAll("{{SLUG}}", slug)
  .replaceAll("{{TITLE}}", title);

await mkdir(path.dirname(target), { recursive: true });
await writeFile(target, output);
console.log(`Created ${path.relative(projectRoot, target)}`);
