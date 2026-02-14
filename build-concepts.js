const fs = require('fs');
const path = require('path');

const qrSvg = fs.readFileSync(path.resolve(__dirname, 'qr-scan.svg'), 'utf8');

const commonCSS = `
@page { size: 11in 17in; margin: 0; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  width: 11in; height: 17in;
  background: #f0eeeb; color: #1a1a1a;
  font-family: 'DM Sans', sans-serif;
  position: relative; overflow: hidden;
}
.container {
  padding: 1.2in 1in;
  height: 100%;
  display: flex; flex-direction: column;
  justify-content: space-between;
}
.top-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11pt; letter-spacing: 0.15em;
  text-transform: uppercase; color: #888;
  margin-bottom: 0.3in;
}
.quote {
  font-family: 'DM Serif Display', serif;
  font-size: 36pt; line-height: 1.25;
  margin-bottom: 0.5in; max-width: 8.5in;
}
.divider {
  width: 3in; height: 3px;
  background: linear-gradient(90deg, #e8457a, #e06830, #d4a017, #2db84d, #2b8fce, #8b5cf6);
  margin-bottom: 0.5in;
}
.concept {
  font-size: 14pt; line-height: 1.7;
  max-width: 7.5in; color: #333;
  margin-bottom: 0.4in;
}
.concept strong {
  font-family: 'DM Serif Display', serif;
  font-size: 16pt; color: #1a1a1a;
}
.middle-spacer { flex: 1; }
.bottom-section {
  display: flex; align-items: flex-end;
  justify-content: space-between;
}
.bottom-left {
  display: flex; flex-direction: column; gap: 0.12in;
}
.org-name {
  font-family: 'DM Serif Display', serif;
  font-size: 24pt;
}
.org-sub {
  font-size: 12pt; color: #555;
}
.cta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14pt; font-weight: 500;
  margin-top: 0.15in;
}
.cta .match {
  background: linear-gradient(90deg, #e8457a, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}
.url {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10pt; color: #888;
  margin-top: 0.1in;
}
.bottom-right {
  display: flex; align-items: flex-end; gap: 0.3in;
}
.qr-code svg { width: 2in; height: 2in; }
.aura-img {
  width: 1.5in; height: 1.5in;
  object-fit: cover;
  border: 1px solid rgba(200,200,200,0.3);
  border-radius: 8px;
}
`;

const bottomSection = `
  <div class="bottom-section">
    <div class="bottom-left">
      <div class="org-name">Techne at RegenHub</div>
      <div class="org-sub">An Integral Technology Learning Center · Boulder, Colorado</div>
      <div class="cta">Fund us on Artizen · <span class="match">1:1 Match</span></div>
      <div class="url">techne.institute</div>
    </div>
    <div class="bottom-right">
      <div class="qr-code">${qrSvg}</div>
      <img class="aura-img" src="Techne Aura.jpg" alt="Techne Aura">
    </div>
  </div>`;

const head = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">`;

// POSTER 1: The Recovery of Craft
const craft = `${head}
<title>The Recovery of Craft</title>
<style>${commonCSS}</style></head>
<body><div class="container">
  <div>
    <div class="top-label">The Recovery of Craft</div>
    <div class="quote">&ldquo;A human with a pencil can think thoughts unavailable to a human without one.&rdquo;</div>
    <div class="divider"></div>
    <div class="concept"><strong>Techne</strong> (Greek): the craft of making, where art and skill and practical wisdom were not yet separated. Technology should extend human capability, not replace it. We develop collective intelligence — groups thinking better together through shared tools, language, and practice.</div>
  </div>
  <div class="middle-spacer"></div>
  ${bottomSection}
</div></body></html>`;

// POSTER 2: Augmentation, Not Automation
const augment = `${head}
<title>Augmentation, Not Automation</title>
<style>${commonCSS}
.split { display: flex; gap: 0.5in; margin-bottom: 0.5in; }
.split-col { flex: 1; padding: 0.4in; border-radius: 12px; }
.split-col.left { background: rgba(0,0,0,0.04); border: 1px solid #ddd; }
.split-col.right { background: rgba(232,69,122,0.04); border: 1px solid #e8457a; }
.split-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10pt; letter-spacing: 0.12em;
  text-transform: uppercase; color: #888;
  margin-bottom: 0.15in;
}
.split-title {
  font-family: 'DM Serif Display', serif;
  font-size: 22pt; margin-bottom: 0.15in;
}
.split-col.right .split-title { color: #e8457a; }
.split-text { font-size: 13pt; line-height: 1.6; color: #555; }
.choose {
  font-family: 'DM Serif Display', serif;
  font-size: 20pt; color: #1a1a1a;
  margin-bottom: 0.3in;
}
</style></head>
<body><div class="container">
  <div>
    <div class="top-label">Augmentation, Not Automation</div>
    <div class="quote" style="font-size:32pt;">Two paths forward</div>
    <div class="divider"></div>
    <div class="split">
      <div class="split-col left">
        <div class="split-label">The Dominant Narrative</div>
        <div class="split-title">Artificial Intelligence</div>
        <div class="split-text">Intelligence as computation, located in machines. Humans as data sources, users, or obstacles. Value extracted, capability concentrated.</div>
      </div>
      <div class="split-col right">
        <div class="split-label">The Alternative</div>
        <div class="split-title">Collective Intelligence</div>
        <div class="split-text">Intelligence as emergent from relationship — between people, between people and tools, between communities and their knowledge. Value created, capability distributed.</div>
      </div>
    </div>
    <div class="choose">Techne at RegenHub chooses the second path.</div>
  </div>
  <div class="middle-spacer"></div>
  ${bottomSection}
</div></body></html>`;

// POSTER 3: e/H-LAM/T/S
const framework = `${head}
<title>e/H-LAM/T/S</title>
<style>${commonCSS}
.letters {
  display: flex; gap: 0.35in;
  margin-bottom: 0.6in; flex-wrap: wrap;
}
.letter-item { text-align: center; }
.letter-char {
  font-family: 'DM Serif Display', serif;
  font-size: 72pt; font-weight: 400;
  line-height: 1;
}
.letter-word {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10pt; letter-spacing: 0.05em;
  color: #666; margin-top: 0.08in;
  display: block;
}
.letter-slash {
  font-family: 'DM Serif Display', serif;
  font-size: 48pt; color: #ccc;
  align-self: center; padding-top: 0.1in;
}
</style></head>
<body><div class="container">
  <div>
    <div class="top-label">The Framework</div>
    <div class="letters">
      <div class="letter-item"><span class="letter-char" style="color:#2db84d">e</span><span class="letter-word">Ecology</span></div>
      <span class="letter-slash">/</span>
      <div class="letter-item"><span class="letter-char" style="color:#e8457a">H</span><span class="letter-word">Human</span></div>
      <span class="letter-slash">-</span>
      <div class="letter-item"><span class="letter-char" style="color:#e06830">L</span><span class="letter-word">Language</span></div>
      <div class="letter-item"><span class="letter-char" style="color:#d4a017">A</span><span class="letter-word">Artifacts</span></div>
      <div class="letter-item"><span class="letter-char" style="color:#2b8fce">M</span><span class="letter-word">Methodology</span></div>
      <span class="letter-slash">/</span>
      <div class="letter-item"><span class="letter-char" style="color:#8b5cf6">T</span><span class="letter-word">Training</span></div>
      <span class="letter-slash">/</span>
      <div class="letter-item"><span class="letter-char" style="color:#e8457a">S</span><span class="letter-word">Sessions</span></div>
    </div>
    <div class="divider"></div>
    <div class="concept">Seven dimensions for organizing collective intelligence. Built on Douglas Engelbart's 1962 augmentation framework at the Stanford Research Institute — the lineage that produced hypertext, the mouse, and collaborative computing. Extended with <strong>ecology</strong>, because all coordination happens in a place, and <strong>sessions</strong>, because knowledge emerges from convergence.</div>
  </div>
  <div class="middle-spacer"></div>
  ${bottomSection}
</div></body></html>`;

// POSTER 4: The Vertical Ecosystem
const building = `${head}
<title>The Vertical Ecosystem</title>
<style>${commonCSS}
.building-stack {
  display: flex; flex-direction: column; gap: 0;
  max-width: 8in; margin-bottom: 0.4in;
}
.floor-band {
  padding: 0.35in 0.5in;
  border-left: 4px solid #ccc;
  position: relative;
}
.floor-band.roof { border-color: #8b5cf6; background: rgba(139,92,246,0.04); border-radius: 8px 8px 0 0; }
.floor-band.third { border-color: #e8457a; background: rgba(232,69,122,0.06); border-left-width: 6px; }
.floor-band.second { border-color: #2db84d; background: rgba(45,184,77,0.04); border-radius: 0 0 8px 8px; }
.floor-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10pt; letter-spacing: 0.12em;
  text-transform: uppercase; color: #888;
  margin-bottom: 0.06in;
}
.floor-name {
  font-family: 'DM Serif Display', serif;
  font-size: 26pt;
}
.floor-band.third .floor-name { color: #e8457a; }
.floor-band.third .floor-label { color: #e8457a; }
.floor-desc { font-size: 12pt; color: #666; margin-top: 0.06in; }
.floor-highlight {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11pt; font-weight: 600;
  color: #e8457a; margin-top: 0.1in;
}
.address {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11pt; color: #888;
  margin-bottom: 0.3in;
}
</style></head>
<body><div class="container">
  <div>
    <div class="top-label">The Vertical Ecosystem</div>
    <div class="quote" style="font-size:32pt;">From street to sky</div>
    <div class="address">1515 Walnut Street, Boulder, Colorado · 5,430 ft</div>
    <div class="building-stack">
      <div class="floor-band roof">
        <div class="floor-label">Roof</div>
        <div class="floor-name">Gathering Space</div>
        <div class="floor-desc">Community events under open sky</div>
      </div>
      <div class="floor-band third">
        <div class="floor-label">Third Floor — Fund This</div>
        <div class="floor-name">Techne Institute</div>
        <div class="floor-desc">AI cohorts, studio, contemplative practice, sauna + cold plunge</div>
        <div class="floor-highlight">↑ This is what we're building</div>
      </div>
      <div class="floor-band second">
        <div class="floor-label">Second Floor — Active</div>
        <div class="floor-name">RegenHub</div>
        <div class="floor-desc">Co-working cooperative, ventures, builders</div>
      </div>
    </div>
  </div>
  <div class="middle-spacer"></div>
  ${bottomSection}
</div></body></html>`;

// POSTER 5: Before Code, There Was Bread
const bread = `${head}
<title>Before Code, There Was Bread</title>
<style>${commonCSS}
.quote { color: #333; }
</style></head>
<body><div class="container">
  <div>
    <div class="top-label">Before Code, There Was Bread</div>
    <div class="quote">&ldquo;Intelligence is not locked in a skull or a server. It is distributed. It lives in relationships. It lives in the patterns of things working together.&rdquo;</div>
    <div class="divider"></div>
    <div class="concept">The oldest form of intelligence amplification is fermentation. You don't engineer the outcome. You create the conditions — temperature, moisture, substrate, time — and let the microbial community do its work.</div>
    <div class="concept"><strong>commons.id</strong> follows this principle. We don't extract knowledge from communities. We create the conditions where their knowledge becomes visible to themselves. A living archive that captures ideas, commitments, and relationships — and gives them permanent addresses.</div>
  </div>
  <div class="middle-spacer"></div>
  ${bottomSection}
</div></body></html>`;

const posters = {
  'concept-craft.html': craft,
  'concept-augment.html': augment,
  'concept-framework.html': framework,
  'concept-building.html': building,
  'concept-bread.html': bread,
};

for (const [file, html] of Object.entries(posters)) {
  fs.writeFileSync(path.resolve(__dirname, file), html);
  console.log('Created ' + file);
}
console.log('All 5 concept posters created.');
