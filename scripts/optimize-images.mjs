/**
 * Image optimization pipeline (MASTER_PLAN.md §6.1 contract).
 *
 * Run locally: node scripts/optimize-images.mjs
 * Outputs are committed — CI never needs sharp.
 *
 * Per source:
 *   public/portfolio/{id}.jpeg → {id}-800.webp (q75) · {id}-1200.webp (q75) ·
 *     {id}-thumb.webp (400w, q70) · {id}.jpeg recompressed in place (max 1200w, mozjpeg q72)
 *   public/hero-image.jpeg → hero-828/1200/1600.webp (q75) · hero-image.jpeg recompressed (max 1200w)
 *   public/about-bhuvita.jpeg → about-800.webp (q75) · about-bhuvita.jpeg recompressed (max 800w)
 *   public/og-image.jpg → 1200×630 landscape attention-crop of hero, <300KB
 *
 * Never upscales (withoutEnlargement everywhere). Idempotent: on first touch each
 * original jpeg is copied to .image-originals/ (gitignored) and every run reads
 * from that backup, so re-runs never recompress an already-compressed file.
 * Also updates public/portfolio/portfolio.json with the intrinsic width/height
 * of each {id}-800.webp variant.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');
const PORTFOLIO = path.join(PUBLIC, 'portfolio');
const BACKUP = path.join(ROOT, '.image-originals');

const kb = (bytes) => `${(bytes / 1024).toFixed(0)}KB`;

async function fileSize(p) {
  return (await fs.stat(p)).size;
}

/**
 * Ensure the pristine original for a public jpeg exists in .image-originals/,
 * copying it there on first run. Returns the backup path — always used as the
 * processing source so re-runs are idempotent.
 *
 * Replacement detection uses a manifest of output hashes, not mtimes: after
 * each run the sha256 of the recompressed public file is recorded in
 * .image-originals/manifest.json. If the public file's hash matches the
 * manifest, it is this script's own output → keep the pristine backup. If it
 * differs (and a manifest entry exists), the photo was replaced → refresh the
 * backup so the new photo becomes the processing source instead of silently
 * regenerating the old one from a stale backup.
 */
const MANIFEST_PATH = path.join(BACKUP, 'manifest.json');
let manifest = null;
async function loadManifest() {
  if (manifest) return manifest;
  try { manifest = JSON.parse(await fs.readFile(MANIFEST_PATH, 'utf8')); }
  catch { manifest = {}; }
  return manifest;
}
async function saveManifest() {
  if (!manifest) return;
  await fs.mkdir(BACKUP, { recursive: true });
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
}
const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');

async function ensureBackup(publicPath) {
  const rel = path.relative(PUBLIC, publicPath);
  const backupPath = path.join(BACKUP, rel);
  const m = await loadManifest();
  let copy = false;
  try {
    await fs.access(backupPath);
    const publicHash = sha256(await fs.readFile(publicPath));
    if (m[rel] && m[rel] !== publicHash) {
      copy = true;
      console.log(`  ${rel} differs from last output (replaced photo) → refreshing backup`);
    }
  } catch {
    copy = true; // no backup yet
  }
  if (copy) {
    await fs.mkdir(path.dirname(backupPath), { recursive: true });
    await fs.copyFile(publicPath, backupPath);
    console.log(`  backed up original → .image-originals/${rel}`);
  }
  return backupPath;
}

/** Emit a webp variant, never upscaling. Returns { width, height } of the output. */
async function emitWebp(sourcePath, outPath, width, quality) {
  const { data, info } = await sharp(sourcePath)
    .rotate() // respect EXIF orientation
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 5 })
    .toBuffer({ resolveWithObject: true });
  await fs.writeFile(outPath, data);
  return { width: info.width, height: info.height };
}

/** Recompress a jpeg in place (from its backup original), never upscaling. */
async function recompressJpeg(backupPath, publicPath, maxWidth) {
  const buf = await sharp(backupPath)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality: 72, mozjpeg: true })
    .toBuffer();
  await fs.writeFile(publicPath, buf);
  // Record our own output's hash so the next run can tell "script output"
  // apart from "user replaced this photo".
  const m = await loadManifest();
  m[path.relative(PUBLIC, publicPath)] = sha256(buf);
  return buf.length;
}

async function main() {
  let beforeTotal = 0;
  let afterTotal = 0;

  // ---------- Portfolio ----------
  console.log('Portfolio images:');
  const jsonPath = path.join(PORTFOLIO, 'portfolio.json');
  const entries = JSON.parse(await fs.readFile(jsonPath, 'utf8'));

  for (const entry of entries) {
    const publicPath = path.join(PORTFOLIO, entry.file);
    const id = path.parse(entry.file).name;
    const backupPath = await ensureBackup(publicPath);
    const before = await fileSize(backupPath);
    beforeTotal += before;

    const dims800 = await emitWebp(backupPath, path.join(PORTFOLIO, `${id}-800.webp`), 800, 75);
    await emitWebp(backupPath, path.join(PORTFOLIO, `${id}-1200.webp`), 1200, 75);
    await emitWebp(backupPath, path.join(PORTFOLIO, `${id}-thumb.webp`), 400, 70);
    const after = await recompressJpeg(backupPath, publicPath, 1200);
    afterTotal += after;

    entry.width = dims800.width;
    entry.height = dims800.height;
    console.log(`  ${entry.file}: ${kb(before)} → ${kb(after)} (+webp 800/1200/thumb, ${dims800.width}×${dims800.height})`);
  }

  // portfolio.json: keep existing fields, add width/height; one entry per line
  // matching the existing style: { "id": 1, "file": "1.jpeg", ... }
  const entryLine = (e) =>
    `  { ${Object.entries(e).map(([k, v]) => `${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(', ')} }`;
  await fs.writeFile(jsonPath, `[\n${entries.map(entryLine).join(',\n')}\n]\n`);
  console.log('  portfolio.json updated with width/height fields');

  // ---------- Hero ----------
  console.log('Hero image:');
  const heroPublic = path.join(PUBLIC, 'hero-image.jpeg');
  const heroBackup = await ensureBackup(heroPublic);
  const heroBefore = await fileSize(heroBackup);
  beforeTotal += heroBefore;
  for (const w of [828, 1200, 1600]) {
    await emitWebp(heroBackup, path.join(PUBLIC, `hero-${w}.webp`), w, 75);
  }
  const heroAfter = await recompressJpeg(heroBackup, heroPublic, 1200);
  afterTotal += heroAfter;
  console.log(`  hero-image.jpeg: ${kb(heroBefore)} → ${kb(heroAfter)} (+hero-828/1200/1600.webp)`);

  // ---------- About ----------
  console.log('About image:');
  const aboutPublic = path.join(PUBLIC, 'about-bhuvita.jpeg');
  const aboutBackup = await ensureBackup(aboutPublic);
  const aboutBefore = await fileSize(aboutBackup);
  beforeTotal += aboutBefore;
  await emitWebp(aboutBackup, path.join(PUBLIC, 'about-800.webp'), 800, 75);
  const aboutAfter = await recompressJpeg(aboutBackup, aboutPublic, 800);
  afterTotal += aboutAfter;
  console.log(`  about-bhuvita.jpeg: ${kb(aboutBefore)} → ${kb(aboutAfter)} (+about-800.webp)`);

  // ---------- OG image (1200×630 landscape attention-crop of hero, <300KB) ----------
  console.log('OG image:');
  const ogPath = path.join(PUBLIC, 'og-image.jpg');
  let ogBuf;
  for (const quality of [80, 75, 70, 65, 60]) {
    ogBuf = await sharp(heroBackup)
      .rotate()
      .resize(1200, 630, { fit: 'cover', position: sharp.strategy.attention })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();
    if (ogBuf.length < 300 * 1024) {
      console.log(`  og-image.jpg: 1200×630, q${quality}, ${kb(ogBuf.length)}`);
      break;
    }
  }
  if (ogBuf.length >= 300 * 1024) {
    throw new Error(`og-image.jpg is ${kb(ogBuf.length)} — could not get under 300KB`);
  }
  await fs.writeFile(ogPath, ogBuf);

  await saveManifest();
  console.log(`\nJPEG weight (originals → recompressed): ${kb(beforeTotal)} → ${kb(afterTotal)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
