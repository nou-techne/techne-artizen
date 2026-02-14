// Parse the raw QR SVG path and generate a stylized version with rounded modules and gradient
const fs = require('fs');
const raw = fs.readFileSync(__dirname + '/qr-raw.svg', 'utf8');

// Extract the stroke path data (the dark modules)
const pathMatch = raw.match(/stroke="#000000" d="([^"]+)"/);
const d = pathMatch[1];

// Parse path commands to get filled pixel positions
// Format: M x y.5 h N (draws N pixels starting at x), m gap (skip)
const size = 33;
const grid = Array.from({length: size}, () => Array(size).fill(false));

const commands = d.match(/[Mm][^Mm]*/g);
let curX = 0, curY = 0;
for (const cmd of commands) {
  const parts = cmd.trim();
  const isAbsolute = parts[0] === 'M';
  const tokens = parts.slice(1).trim().split(/([hm])/);
  
  // Parse initial position
  const coordStr = tokens[0].trim();
  const coords = coordStr.split(/[\s,]+/).map(Number);
  if (isAbsolute) {
    curX = coords[0];
    curY = Math.floor(coords[1]);
  }
  
  let x = curX;
  for (let i = 1; i < tokens.length; i += 2) {
    const op = tokens[i];
    const val = parseInt(tokens[i + 1]);
    if (op === 'h') {
      // Draw val pixels
      for (let j = 0; j < val; j++) {
        if (x + j < size && curY < size) grid[curY][x + j] = true;
      }
      x += val;
    } else if (op === 'm') {
      x += val;
    }
  }
}

// Generate stylized SVG
const moduleSize = 10;
const padding = 2;
const totalSize = size * moduleSize + padding * 2;
const r = 2.5; // corner radius for rounded modules

let modules = '';

// Determine if a position is part of a finder pattern (the three big squares)
function isFinderPattern(row, col) {
  // Top-left
  if (row < 7 && col < 7) return true;
  // Top-right
  if (row < 7 && col >= size - 7) return true;
  // Bottom-left
  if (row >= size - 7 && col < 7) return true;
  return false;
}

for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    if (!grid[y][x]) continue;
    const px = padding + x * moduleSize;
    const py = padding + y * moduleSize;
    const s = moduleSize - 1; // slight gap between modules
    modules += `<rect x="${px}" y="${py}" width="${s}" height="${s}" rx="${r}" ry="${r}" fill="url(#qrGrad)"/>`;
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalSize}" height="${totalSize}" viewBox="0 0 ${totalSize} ${totalSize}">
  <defs>
    <linearGradient id="qrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="20%" stop-color="#2a1a2e"/>
      <stop offset="40%" stop-color="#1a2a3e"/>
      <stop offset="60%" stop-color="#1a2e2a"/>
      <stop offset="80%" stop-color="#2e2a1a"/>
      <stop offset="100%" stop-color="#1a1a1a"/>
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
  <rect width="${totalSize}" height="${totalSize}" fill="white" rx="8" ry="8"/>
  ${modules}
  <!-- Rainbow accent border around finder patterns -->
  <rect x="${padding}" y="${padding}" width="${7*moduleSize}" height="${7*moduleSize}" rx="6" ry="6" fill="none" stroke="url(#qrAccent)" stroke-width="2.5"/>
  <rect x="${padding + (size-7)*moduleSize}" y="${padding}" width="${7*moduleSize}" height="${7*moduleSize}" rx="6" ry="6" fill="none" stroke="url(#qrAccent)" stroke-width="2.5"/>
  <rect x="${padding}" y="${padding + (size-7)*moduleSize}" width="${7*moduleSize}" height="${7*moduleSize}" rx="6" ry="6" fill="none" stroke="url(#qrAccent)" stroke-width="2.5"/>
</svg>`;

fs.writeFileSync(__dirname + '/qr-stylized.svg', svg);
console.log('Stylized QR generated');
