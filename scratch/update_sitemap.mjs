import fs from 'fs';

const portfolio = JSON.parse(fs.readFileSync('public/portfolio/portfolio.json', 'utf8'));
const sitemapPath = 'public/sitemap.xml';
let sitemap = fs.readFileSync(sitemapPath, 'utf8');

// For each archived file, remove the <image:image> block
const archived = ['10.jpeg', '12.jpeg', '15.jpeg', '16.jpeg', '29.jpeg', '34.jpeg'];

for (const file of archived) {
  const regex = new RegExp(`\\s*<image:image>[\\s\\S]*?${file}[\\s\\S]*?<\\/image:image>`, 'g');
  sitemap = sitemap.replace(regex, '');
}

fs.writeFileSync(sitemapPath, sitemap);
console.log('sitemap.xml cleaned of archived images.');
