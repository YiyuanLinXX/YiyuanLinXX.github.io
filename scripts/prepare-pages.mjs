import { copyFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(projectRoot, "dist", "client");

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectHtmlFiles(absolutePath));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(absolutePath);
    }
  }

  return files;
}

const htmlFiles = await collectHtmlFiles(outputRoot);
let cleanUrlCopies = 0;

for (const source of htmlFiles) {
  const relativePath = path.relative(outputRoot, source);
  if (relativePath === "index.html" || relativePath === "404.html") continue;

  const destination = path.join(outputRoot, relativePath.slice(0, -".html".length), "index.html");
  await mkdir(path.dirname(destination), { recursive: true });
  await copyFile(source, destination);
  cleanUrlCopies += 1;
}

console.log(`Prepared ${cleanUrlCopies} clean URL copies for GitHub Pages.`);
