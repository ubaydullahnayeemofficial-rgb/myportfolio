// Convert every JPEG/PNG in /public to WebP with a sane quality preset.
// Run with: node scripts/convert-to-webp.mjs
//
// Goal: PageSpeed-friendly assets without losing perceptual quality.
// We target quality 82 for photos and effort 6 (slowest, best compression).
// Originals are deleted after a successful WebP write — the site only
// references .webp files now, and Git tracks the new asset.

import { readdir, stat, unlink } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = new URL("../public/", import.meta.url).pathname.replace(/^\//, "");
const ROOT = process.cwd();
const targetDir = join(ROOT, "public");

const exts = new Set([".jpg", ".jpeg", ".png"]);

const files = await readdir(targetDir);
let converted = 0;
let bytesIn = 0;
let bytesOut = 0;

for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (!exts.has(ext)) continue;
  const src = join(targetDir, file);
  const dst = join(targetDir, basename(file, ext) + ".webp");

  const before = (await stat(src)).size;
  await sharp(src)
    .webp({ quality: 82, effort: 6, smartSubsample: true })
    .toFile(dst);
  const after = (await stat(dst)).size;
  await unlink(src);

  bytesIn += before;
  bytesOut += after;
  converted += 1;
  const pct = ((1 - after / before) * 100).toFixed(1);
  console.log(`${file.padEnd(20)} -> ${basename(dst).padEnd(20)} ${kb(before)} -> ${kb(after)} (-${pct}%)`);
}

console.log(`\n${converted} files converted.`);
console.log(`Total: ${kb(bytesIn)} -> ${kb(bytesOut)} (-${((1 - bytesOut / bytesIn) * 100).toFixed(1)}%)`);

function kb(n) {
  return `${(n / 1024).toFixed(1)} KB`;
}

void PUBLIC_DIR;
