import fs from 'fs';
import path from 'path';

const archiveDir = path.resolve('public/portfolio/archive');
if (!fs.existsSync(archiveDir)) {
  fs.mkdirSync(archiveDir, { recursive: true });
}

const dupIds = ['10', '12', '15', '16', '29', '34'];
const portfolioDir = path.resolve('public/portfolio');
const files = fs.readdirSync(portfolioDir);

const moved = [];
for (const file of files) {
  for (const id of dupIds) {
    if (file === `${id}.jpeg` || file.startsWith(`${id}-`)) {
      const src = path.join(portfolioDir, file);
      const dst = path.join(archiveDir, file);
      fs.renameSync(src, dst);
      moved.push(file);
    }
  }
}

console.log(`Moved ${moved.length} files to archive:`, moved);
