import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORTFOLIO = path.join(ROOT, 'public', 'portfolio');
const SCRATCH = path.join(ROOT, 'scratch');
const NEW_CONTENT = path.join(ROOT, 'new content');

async function processImage(srcPath, baseName, maxWidth = 1200) {
  const destJpeg = path.join(PORTFOLIO, `${baseName}.jpeg`);
  const dest800 = path.join(PORTFOLIO, `${baseName}-800.webp`);
  const dest1200 = path.join(PORTFOLIO, `${baseName}-1200.webp`);
  const destThumb = path.join(PORTFOLIO, `${baseName}-thumb.webp`);

  console.log(`Processing ${baseName}...`);

  // 1. Emit 800w webp
  const { data: d800, info: info800 } = await sharp(srcPath)
    .rotate()
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 75, effort: 5 })
    .toBuffer({ resolveWithObject: true });
  await fs.writeFile(dest800, d800);

  // 2. Emit 1200w webp
  await sharp(srcPath)
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 75, effort: 5 })
    .toFile(dest1200);

  // 3. Emit 400w thumb webp
  await sharp(srcPath)
    .rotate()
    .resize({ width: 400, withoutEnlargement: true })
    .webp({ quality: 70, effort: 5 })
    .toFile(destThumb);

  // 4. Recompress JPEG
  await sharp(srcPath)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality: 75, mozjpeg: true })
    .toFile(destJpeg);

  console.log(`  Created ${baseName}.jpeg, ${baseName}-800.webp (${info800.width}x${info800.height}), -1200.webp, -thumb.webp`);
  return { width: info800.width, height: info800.height };
}

async function copyVideo(srcPath, destName) {
  const destPath = path.join(PORTFOLIO, destName);
  await fs.copyFile(srcPath, destPath);
  const stat = await fs.stat(destPath);
  console.log(`Copied ${destName}: ${(stat.size / 1024 / 1024).toFixed(2)} MB`);
}

async function main() {
  console.log('=== Adding Videos & Photos to Portfolio ===\n');

  // 1. Copy Videos
  await copyVideo(path.join(SCRATCH, 'encoded_videos', 'bridal-glam-close-up.mp4'), 'bridal-glam-close-up.mp4');
  await copyVideo(path.join(SCRATCH, 'encoded_videos', 'garden-bridal-daylight.mp4'), 'garden-bridal-daylight.mp4');
  await copyVideo(path.join(SCRATCH, 'encoded_videos', 'royal-arch-bridal-lehenga.mp4'), 'royal-arch-bridal-lehenga.mp4');
  await copyVideo(path.join(SCRATCH, 'encoded_videos', 'haldi-mehendi-sunset-glow.mp4'), 'haldi-mehendi-sunset-glow.mp4');

  // 2. Process Video Posters
  const p1Dims = await processImage(
    path.join(SCRATCH, 'encoded_videos', 'bridal-glam-close-up-poster.jpeg'),
    'bridal-glam-close-up-poster'
  );
  const p2Dims = await processImage(
    path.join(SCRATCH, 'encoded_videos', 'garden-bridal-daylight-poster.jpeg'),
    'garden-bridal-daylight-poster'
  );
  const p3Dims = await processImage(
    path.join(SCRATCH, 'encoded_videos', 'royal-arch-bridal-lehenga-poster.jpeg'),
    'royal-arch-bridal-lehenga-poster'
  );
  const p4Dims = await processImage(
    path.join(SCRATCH, 'encoded_videos', 'haldi-mehendi-sunset-glow-poster.jpeg'),
    'haldi-mehendi-sunset-glow-poster'
  );

  // 3. Process Photos (IMG_8417 and IMG_8418 decoded earlier to scratch/40_full.jpg and scratch/8418_full.jpg)
  const p40Dims = await processImage(path.join(SCRATCH, '40_full.jpg'), '40');
  const p41Dims = await processImage(path.join(SCRATCH, '8418_full.jpg'), '41');

  // 4. Update portfolio.json
  const jsonPath = path.join(PORTFOLIO, 'portfolio.json');
  const existing = JSON.parse(await fs.readFile(jsonPath, 'utf8'));

  // Define new items
  const itemVideo1 = {
    id: 101,
    mediaType: 'video',
    file: 'bridal-glam-close-up-poster.jpeg',
    video: 'bridal-glam-close-up.mp4',
    category: 'Bridal Looks',
    description: 'Signature Royal Bridal Glam & Kundan Jewellery Setting',
    width: p1Dims.width,
    height: p1Dims.height,
    aspectRatio: '3:4',
  };

  const itemVideo2 = {
    id: 102,
    mediaType: 'video',
    file: 'garden-bridal-daylight-poster.jpeg',
    video: 'garden-bridal-daylight.mp4',
    category: 'Bridal Looks',
    description: 'Garden Daylight Bridal Glow & Embellished Lehenga',
    width: p2Dims.width,
    height: p2Dims.height,
    aspectRatio: '9:16',
  };

  const itemPhoto40 = {
    id: 40,
    file: '40.jpeg',
    category: 'Bridal Looks',
    description: 'Garden Daylight Bridal Glam & Kundan Choker',
    width: p40Dims.width,
    height: p40Dims.height,
  };

  const itemPhoto41 = {
    id: 41,
    file: '41.jpeg',
    category: 'Bridal Looks',
    description: 'Royal Red Embroidered Bridal Lehenga & Chooda Setting',
    width: p41Dims.width,
    height: p41Dims.height,
  };

  const itemVideo3 = {
    id: 103,
    mediaType: 'video',
    file: 'royal-arch-bridal-lehenga-poster.jpeg',
    video: 'royal-arch-bridal-lehenga.mp4',
    category: 'Bridal Looks',
    description: 'Royal Arch & Velvet Drapery Bridal Elegance',
    width: p3Dims.width,
    height: p3Dims.height,
    aspectRatio: '9:16',
  };

  const itemVideo4 = {
    id: 104,
    mediaType: 'video',
    file: 'haldi-mehendi-sunset-glow-poster.jpeg',
    video: 'haldi-mehendi-sunset-glow.mp4',
    category: 'Haldi & Mehendi',
    description: 'Vibrant Sunset Eye Artistry & Festive Floral Crown',
    width: p4Dims.width,
    height: p4Dims.height,
    aspectRatio: '3:4',
  };

  // Filter out any existing entries with these IDs or files
  const filtered = existing.filter(
    (e) => ![40, 41, 101, 102, 103, 104].includes(e.id) &&
           !['40.jpeg', '41.jpeg', 'bridal-glam-close-up-poster.jpeg', 'garden-bridal-daylight-poster.jpeg', 'royal-arch-bridal-lehenga-poster.jpeg', 'haldi-mehendi-sunset-glow-poster.jpeg'].includes(e.file)
  );

  // We want to insert the new items into their categories smoothly:
  // In Bridal Looks:
  // After id: 1 -> insert itemVideo1
  // After id: 2 -> insert itemVideo2, itemPhoto40
  // After id: 4 -> insert itemVideo3, itemPhoto41
  // In Haldi & Mehendi:
  // After id: 5 -> insert itemVideo4
  const updated = [];
  for (const item of filtered) {
    updated.push(item);
    if (item.id === 1) {
      updated.push(itemVideo1);
    } else if (item.id === 2) {
      updated.push(itemVideo2);
      updated.push(itemPhoto40);
    } else if (item.id === 4) {
      updated.push(itemVideo3);
      updated.push(itemPhoto41);
    } else if (item.id === 5) {
      updated.push(itemVideo4);
    }
  }

  // One item per line formatting
  const entryLine = (e) =>
    `  { ${Object.entries(e).map(([k, v]) => `${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(', ')} }`;
  await fs.writeFile(jsonPath, `[\n${updated.map(entryLine).join(',\n')}\n]\n`);
  console.log(`\nUpdated ${jsonPath} with ${updated.length} items.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
