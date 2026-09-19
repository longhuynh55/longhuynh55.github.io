// One-off OG generator (work/, not shipped). Renders public/og-image.png
// 1200x630 with the editorial identity. Run: node work/make-og.mjs
import sharp from 'sharp';

const W = 1200;
const H = 630;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#F7F5EF"/>
  <rect x="96" y="150" width="72" height="8" fill="#C9E875"/>
  <text x="96" y="300" font-family="Arial, Helvetica, sans-serif" font-size="104" font-weight="bold" letter-spacing="-2" fill="#202722">Liêu Hoài Phúc</text>
  <text x="98" y="370" font-family="Arial, Helvetica, sans-serif" font-size="40" fill="#285640">Data Analyst — turning operations into decisions</text>
  <text x="98" y="470" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#59645C">Experience · Research · Lab · Writing</text>
  <rect x="96" y="520" width="1008" height="2" fill="#D4DBD1"/>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og-image.png');
console.log('wrote public/og-image.png');
