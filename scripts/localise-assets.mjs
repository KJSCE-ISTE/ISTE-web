#!/usr/bin/env node
/**
 * Pull every remote chapter image local, and shrink it.
 *
 * WHY THIS EXISTS
 * ---------------
 * The council photos and event posters lived on raw.githubusercontent.com and
 * were rendered with `unoptimized`, which switches Next's image pipeline off
 * entirely. The result: ~95 MB of originals — one portrait is 4.4 MB — each
 * downloaded at full size to fill a 220 px card, from a host that is not a CDN
 * and rate-limits. On /teams that is 139 of them.
 *
 * This downloads each one once, re-encodes to WebP at a sensible ceiling, and
 * writes it into public/. From then on the images are same-origin, so Next's
 * optimizer handles them normally: responsive srcset, AVIF/WebP negotiation and
 * long-lived immutable caching. It also removes a third-party runtime
 * dependency — the site no longer breaks if that repository moves.
 *
 * Re-runnable: existing outputs are skipped unless --force is passed.
 *
 *   node scripts/localise-assets.mjs [--force]
 */

import { createHash } from "node:crypto";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import sharp from "sharp";

const ROOT = process.cwd();
const ARCHIVE = join(ROOT, "src/lib/data/chapter-archive.ts");
const OUT_DIR = join(ROOT, "public/archive");
const FORCE = process.argv.includes("--force");

/**
 * Ceilings, not targets — an image smaller than this is left alone rather than
 * upscaled. Portraits render at most ~440 px wide (a 220 px card at 2x), so
 * 900 leaves headroom without paying for it. Posters open in a lightbox at up
 * to full width, so they get more.
 */
const LIMITS = {
  team: { width: 900, quality: 82 },
  event: { width: 1600, quality: 80 },
  other: { width: 1600, quality: 80 },
};

function classify(url) {
  if (/\/Teams\//i.test(url)) return "team";
  if (/\/events\//i.test(url)) return "event";
  return "other";
}

/**
 * Stable, readable output path derived from the source URL.
 * The short hash prevents collisions between years that reuse a filename.
 */
function outputName(url) {
  const decoded = decodeURIComponent(url);
  const tail = decoded.split("/main/")[1] ?? decoded;
  const slug = tail
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 70);
  const hash = createHash("sha1").update(url).digest("hex").slice(0, 6);
  return `${slug}-${hash}.webp`;
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function fetchWithRetry(url, attempts = 3) {
  for (let i = 1; i <= attempts; i++) {
    try {
      const response = await fetch(url, { redirect: "follow" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      if (i === attempts) throw error;
      // Back off — this host rate-limits under parallel load.
      await new Promise((r) => setTimeout(r, 400 * i));
    }
  }
}

/** Runs `worker` over `items` with at most `limit` in flight. */
async function pool(items, limit, worker) {
  const results = [];
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  });
  await Promise.all(runners);
  return results;
}

async function main() {
  const source = await readFile(ARCHIVE, "utf8");
  const urls = [...new Set(source.match(/https:\/\/raw\.githubusercontent\.com\/[^"]+/g) ?? [])];

  if (urls.length === 0) {
    console.log("✓ no remote images left in the archive — nothing to do");
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Localising ${urls.length} images…\n`);

  let downloaded = 0;
  let skipped = 0;
  let bytesIn = 0;
  let bytesOut = 0;
  const failures = [];
  const mapping = {};

  await pool(urls, 6, async (url) => {
    const name = outputName(url);
    const outPath = join(OUT_DIR, name);

    try {
      if (!FORCE && (await exists(outPath))) {
        const meta = await sharp(outPath).metadata();
        const size = (await stat(outPath)).size;
        mapping[url] = { path: `/archive/${name}`, width: meta.width, height: meta.height };
        bytesOut += size;
        skipped++;
        return;
      }

      const input = await fetchWithRetry(url);
      bytesIn += input.length;

      const kind = classify(url);
      const { width, quality } = LIMITS[kind];

      const pipeline = sharp(input, { failOn: "none" })
        .rotate() // honour EXIF orientation before it is stripped
        .resize({ width, withoutEnlargement: true })
        .webp({ quality, effort: 5 });

      const output = await pipeline.toBuffer({ resolveWithObject: true });
      await mkdir(dirname(outPath), { recursive: true });
      await writeFile(outPath, output.data);

      bytesOut += output.data.length;
      downloaded++;
      mapping[url] = {
        path: `/archive/${name}`,
        width: output.info.width,
        height: output.info.height,
      };

      const saved = Math.round((1 - output.data.length / input.length) * 100);
      console.log(
        `  ${String(downloaded + skipped).padStart(3)}/${urls.length}  ` +
          `${(input.length / 1024).toFixed(0).padStart(5)} KB → ` +
          `${(output.data.length / 1024).toFixed(0).padStart(4)} KB  (-${saved}%)  ${name.slice(0, 46)}`,
      );
    } catch (error) {
      failures.push({ url, message: error.message });
    }
  });

  console.log("");
  if (failures.length) {
    console.log(`⚠ ${failures.length} failed — those keep their remote URL:`);
    for (const f of failures.slice(0, 10)) console.log(`   ${f.message}  ${f.url.slice(-60)}`);
    console.log("");
  }

  // Rewrite the archive to point at the local copies. Anything that failed to
  // download keeps its remote URL, so a partial run degrades rather than breaks.
  let rewritten = source;
  for (const [url, info] of Object.entries(mapping)) {
    rewritten = rewritten.split(`"${url}"`).join(`"${info.path}"`);
  }
  await writeFile(ARCHIVE, rewritten);

  await writeFile(
    join(OUT_DIR, "manifest.json"),
    JSON.stringify(mapping, null, 1) + "\n",
  );

  console.log(`✓ ${downloaded} converted, ${skipped} already present`);
  if (bytesIn > 0) {
    console.log(
      `  ${(bytesIn / 1024 / 1024).toFixed(1)} MB downloaded → ` +
        `${(bytesOut / 1024 / 1024).toFixed(1)} MB on disk ` +
        `(-${Math.round((1 - bytesOut / bytesIn) * 100)}%)`,
    );
  }
  console.log(`  archive rewritten to /archive/* paths`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
