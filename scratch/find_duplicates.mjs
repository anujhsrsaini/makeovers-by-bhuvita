import fs from 'fs';
import sharp from 'sharp';

async function run() {
  const hashes = [];
  for (let i = 1; i <= 39; i++) {
    const buf = await sharp(`public/portfolio/${i}.jpeg`)
      .resize(32, 32, { fit: 'fill' })
      .grayscale()
      .raw()
      .toBuffer();
    hashes.push({ id: i, buf });
  }

  const matches = [];
  for (let i = 0; i < hashes.length; i++) {
    for (let j = i + 1; j < hashes.length; j++) {
      let diff = 0;
      for (let k = 0; k < 1024; k++) {
        diff += Math.abs(hashes[i].buf[k] - hashes[j].buf[k]);
      }
      const avgDiff = diff / 1024;
      if (avgDiff < 25) {
        matches.push({ img1: i + 1, img2: j + 1, avgDiff: avgDiff.toFixed(2) });
      }
    }
  }

  matches.sort((a, b) => parseFloat(a.avgDiff) - parseFloat(b.avgDiff));
  console.log('Duplicate / Near-duplicate pairs:');
  matches.forEach(m => {
    console.log(`  ${m.img1}.jpeg <--> ${m.img2}.jpeg (diff: ${m.avgDiff})`);
  });
}

run();
