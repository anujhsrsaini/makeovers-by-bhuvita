import fs from 'fs';
import sharp from 'sharp';

async function run() {
  const images = [];
  for (let i = 1; i <= 39; i++) {
    const raw = await sharp(`public/portfolio/${i}.jpeg`)
      .resize(64, 64, { fit: 'fill' })
      .toColourspace('srgb')
      .raw()
      .toBuffer();
    images.push({ id: i, raw });
  }

  const pairs = [];
  for (let i = 0; i < images.length; i++) {
    for (let j = i + 1; j < images.length; j++) {
      let diff = 0;
      for (let k = 0; k < images[i].raw.length; k++) {
        diff += Math.abs(images[i].raw[k] - images[j].raw[k]);
      }
      const score = diff / images[i].raw.length;
      pairs.push({ id1: i + 1, id2: j + 1, score });
    }
  }

  pairs.sort((a, b) => a.score - b.score);
  console.log('Top 20 most similar pairs:');
  for (let i = 0; i < 20; i++) {
    console.log(`  ${pairs[i].id1}.jpeg vs ${pairs[i].id2}.jpeg : score = ${pairs[i].score.toFixed(2)}`);
  }
}

run();
