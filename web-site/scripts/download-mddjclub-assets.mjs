import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const RESEARCH_DIR = path.join(ROOT, "docs", "research", "mddjclub.com");
const OUT_DIR = path.join(ROOT, "public", "images", "mddjclub");

const inputs = [
  "home.analysis.json",
  "list.analysis.json",
  "login.analysis.json",
  "detail-89131.analysis.json",
];

function extFromUrl(url) {
  const pathname = new URL(url).pathname;
  const ext = path.extname(pathname).toLowerCase();
  return ext || ".png";
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const seen = new Map();
  for (const input of inputs) {
    const filePath = path.join(RESEARCH_DIR, input);
    const data = JSON.parse(await fs.readFile(filePath, "utf8"));
    for (const image of data.images) {
      const url = image.src;
      if (!url || seen.has(url)) continue;
      const base = path.basename(new URL(url).pathname, path.extname(new URL(url).pathname));
      const safeBase = base.replace(/[^a-z0-9-_]+/gi, "-").toLowerCase();
      const fileName = `${seen.size + 1}-${safeBase}${extFromUrl(url)}`;
      seen.set(url, `/images/mddjclub/${fileName}`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to download ${url}: ${response.status}`);
      }
      const buffer = Buffer.from(await response.arrayBuffer());
      await fs.writeFile(path.join(OUT_DIR, fileName), buffer);
    }
  }

  await fs.writeFile(
    path.join(RESEARCH_DIR, "assets-map.json"),
    `${JSON.stringify(Object.fromEntries(seen), null, 2)}\n`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
