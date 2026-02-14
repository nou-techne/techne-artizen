const fs = require('fs');
const raw = fs.readFileSync(__dirname + '/qr-raw.svg', 'utf8');

const pathMatch = raw.match(/stroke="#000000" d="([^"]+)"/);
const d = pathMatch[1];

const size = 33;
const grid = Array.from({length: size}, () => Array(size).fill(false));

// Split only on uppercase M (absolute moveto), not lowercase m (relative)
const rows = d.split(/(?=M)/);
for (const row of rows) {
  if (!row.trim()) continue;
  // Parse: M x y.5 h N m dx [dy] h N m dx ...
  let x = 0, y = 0;
  const mMatch = row.match(/^M([\d.]+)\s+([\d.]+)/);
  if (mMatch) {
    x = parseInt(mMatch[1]);
    y = Math.floor(parseFloat(mMatch[2]));
  }
  // Process all h and m commands in sequence
  const cmds = row.replace(/^M[\d.]+\s+[\d.]+/, '');
  const tokens = cmds.match(/[hm][\d.\s-]+/g) || [];
  for (const tok of tokens) {
    const op = tok[0];
    const vals = tok.slice(1).trim().split(/\s+/).map(Number);
    if (op === 'h') {
      const len = vals[0];
      for (let i = 0; i < len; i++) {
        if (x + i < size && y < size) grid[y][x + i] = true;
      }
      x += len;
    } else if (op === 'm') {
      x += vals[0];
      // vals[1] is dy (always 0 in QR codes)
    }
  }
}

// Verify grid
let count = 0;
for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (grid[y][x]) count++;
console.log(`Grid has ${count} filled modules`);

const moduleSize = 10;
const gap = 1;
const padding = 4;
const totalSize = size * moduleSize + padding * 2;
const r = 2.8;

let modules = '';
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    if (!grid[y][x]) continue;
    const px = padding + x * moduleSize;
    const py = padding + y * moduleSize;
    const s = moduleSize - gap;
    modules += `<rect x="${px}" y="${py}" width="${s}" height="${s}" rx="${r}" ry="${r}" fill="url(#qrGrad)"/>`;
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalSize}" height="${totalSize}" viewBox="0 0 ${totalSize} ${totalSize}">
  <defs>
    <linearGradient id="qrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e8457a"/>
      <stop offset="25%" stop-color="#1a1a1a"/>
      <stop offset="50%" stop-color="#1a1a1a"/>
      <stop offset="75%" stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
    <linearGradient id="qrAccent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e8457a"/>
      <stop offset="20%" stop-color="#e06830"/>
      <stop offset="40%" stop-color="#d4a017"/>
      <stop offset="60%" stop-color="#2db84d"/>
      <stop offset="80%" stop-color="#2b8fce"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
  </defs>
  <rect width="${totalSize}" height="${totalSize}" fill="white" rx="10" ry="10"/>
  ${modules}
  <rect x="${padding}" y="${padding}" width="${7*moduleSize}" height="${7*moduleSize}" rx="8" ry="8" fill="none" stroke="url(#qrAccent)" stroke-width="3"/>
  <rect x="${padding + (size-7)*moduleSize}" y="${padding}" width="${7*moduleSize}" height="${7*moduleSize}" rx="8" ry="8" fill="none" stroke="url(#qrAccent)" stroke-width="3"/>
  <rect x="${padding}" y="${padding + (size-7)*moduleSize}" width="${7*moduleSize}" height="${7*moduleSize}" rx="8" ry="8" fill="none" stroke="url(#qrAccent)" stroke-width="3"/>
</svg>`;

fs.writeFileSync(__dirname + '/qr-stylized.svg', svg);
console.log('Stylized QR generated');
