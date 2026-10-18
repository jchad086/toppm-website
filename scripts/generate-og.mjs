/**
 * Generates a 1200×630 Open Graph image for every built page in dist/,
 * written to dist/og/<slug>.png. Runs automatically after `astro build`.
 *
 * Slug rule (must match src/components/Seo.astro):
 *   /                      -> home.png
 *   /about-us/cornwall-... -> about-us--cornwall-....png
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const DIST = 'dist';
const OUT = path.join(DIST, 'og');
const SKIP = new Set();
fs.mkdirSync(OUT, { recursive: true });

const logo = await sharp('src/assets/brand/logo-light.svg').resize({ width: 380 }).png().toBuffer();

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) { if (entry.name !== 'og' && entry.name !== '_astro') yield* walk(p); }
    else if (entry.name.endsWith('.html')) yield p;
  }
}

const decode = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, '’').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function wrap(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars && line) { lines.push(line); line = w; }
    else line = (line + ' ' + w).trim();
  }
  if (line) lines.push(line);
  return lines;
}

let count = 0;
for (const file of walk(DIST)) {
  const rel = path.relative(DIST, file).replace(/\.html$/, '');
  if (SKIP.has(rel)) continue;
  const slug = rel === 'index' ? 'home' : rel.replace(/[\\/]/g, '--');
  const html = fs.readFileSync(file, 'utf8');
  const h1 = decode((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || 'TOP Property Management');
  const eyebrow = decode((html.match(/class="eyebrow"[^>]*>([\s\S]*?)<\/p>/) || [])[1] || 'Cornwall property management');

  let fontSize = 64;
  let lines = wrap(h1, 28);
  if (lines.length > 3) { fontSize = 50; lines = wrap(h1, 36); }
  if (lines.length > 4) { lines = lines.slice(0, 4); lines[3] = lines[3].replace(/\s+\S*$/, '') + '…'; }
  const lineHeight = fontSize * 1.15;
  const startY = 290;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#011638"/><stop offset="1" stop-color="#1a3f2a"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <circle cx="1080" cy="90" r="300" fill="#dff8eb" opacity="0.07"/>
    <circle cx="150" cy="650" r="220" fill="#214e34" opacity="0.35"/>
    <text x="80" y="225" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="22" font-weight="600" letter-spacing="4" fill="#7fb894">${esc(eyebrow.toUpperCase())}</text>
    ${lines.map((l, i) => `<text x="80" y="${(startY + i * lineHeight).toFixed(0)}" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="${fontSize}" font-weight="700" fill="#ffffff">${esc(l)}</text>`).join('')}
    <rect x="80" y="520" width="56" height="4" rx="2" fill="#7fb894"/>
    <text x="80" y="570" font-family="Inter, Helvetica, Arial, sans-serif" font-size="26" fill="#dff8eb">www.toppm.ca  ·  Cornwall, Ontario  ·  (613) 416-3263</text>
  </svg>`;

  await sharp(Buffer.from(svg)).composite([{ input: logo, top: 64, left: 80 }]).png({ compressionLevel: 9 }).toFile(path.join(OUT, `${slug}.png`));
  count++;
}
console.log(`[og] generated ${count} Open Graph images in ${OUT}`);
