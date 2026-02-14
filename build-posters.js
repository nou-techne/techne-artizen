const fs = require('fs');
const path = require('path');

const qrSvg = fs.readFileSync('qr-stylized.svg', 'utf8');
const auraB64 = fs.readFileSync('/tmp/aura_b64.txt', 'utf8').trim();
const auraDataUri = `data:image/jpeg;base64,${auraB64}`;

function commonStyles() {
  return `
@page { size: 11in 17in; margin: 0; }
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  width: 11in; height: 17in; background: #f0eeeb; color: #1a1a1a;
  font-family: 'DM Sans', sans-serif; position: relative; overflow: hidden;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.container { padding: 1in 0.9in; height: 100%; display: flex; flex-direction: column; }
.rainbow-line { width: 3in; height: 3px; background: linear-gradient(90deg, #e8457a, #e06830, #d4a017, #2db84d, #2b8fce, #8b5cf6); }
.rainbow-line-full { width: 100%; height: 3px; background: linear-gradient(90deg, #e8457a, #e06830, #d4a017, #2db84d, #2b8fce, #8b5cf6); }
.spacer { flex: 1; }
.bottom { display: flex; align-items: flex-end; justify-content: space-between; margin-top: auto; }
.bottom-left { display: flex; flex-direction: column; gap: 0.12in; }
.org { font-family: 'DM Serif Display', serif; font-size: 22pt; }
.sub { font-size: 11pt; color: #555; }
.cta { font-family: 'JetBrains Mono', monospace; font-size: 13pt; font-weight: 500; }
.match { background: linear-gradient(90deg, #e8457a, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 700; }
.url { font-family: 'JetBrains Mono', monospace; font-size: 9pt; color: #999; margin-top: 0.1in; }
.bottom-right { display: flex; align-items: flex-end; gap: 0.25in; }
.qr svg { width: 2in; height: 2in; }
.aura { width: 1.4in; height: 1.4in; object-fit: cover; border: 1px solid #ddd; border-radius: 6px; }
.label { font-family: 'JetBrains Mono', monospace; font-size: 10pt; letter-spacing: 0.15em; text-transform: uppercase; color: #888; }
`;
}

function bottomSection() {
  return `
<div class="bottom">
  <div class="bottom-left">
    <div class="org">Techne at RegenHub</div>
    <div class="sub">An Integral Technology Learning Center</div>
    <div class="cta">Fund us on Artizen · <span class="match">1:1 Match</span></div>
    <div class="url">techne.institute</div>
  </div>
  <div class="bottom-right">
    <div class="qr">${qrSvg}</div>
    <img class="aura" src="${auraDataUri}" alt="Techne Aura">
  </div>
</div>`;
}

// POSTER 1: The Recovery of Craft
const craft = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>The Recovery of Craft</title>
<style>${commonStyles()}
.quote { font-family: 'DM Serif Display', serif; font-size: 36pt; line-height: 1.28; margin: 0.4in 0 0.5in; max-width: 8.5in; }
.concept { font-size: 14pt; line-height: 1.75; max-width: 7.5in; color: #333; }
.concept strong { font-family: 'DM Serif Display', serif; font-size: 16pt; color: #1a1a1a; }
</style></head><body>
<div class="container">
  <div class="label">The Recovery of Craft</div>
  <div class="quote">&ldquo;A human with a pencil can think thoughts unavailable to a human without one.&rdquo;</div>
  <div class="rainbow-line"></div>
  <div class="concept" style="margin-top:0.5in">
    <strong>Techne</strong> (Greek): the craft of making, where art and skill and practical wisdom were not yet separated.<br><br>
    Technology should extend human capability, not replace it.
  </div>
  <div class="spacer"></div>
  ${bottomSection()}
</div></body></html>`;

fs.writeFileSync('concept-craft.html', craft);
console.log('✓ concept-craft.html');

// POSTER 2: Augmentation, Not Automation
const augment = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Augmentation, Not Automation</title>
<style>${commonStyles()}
.split { display: flex; gap: 0; margin: 0.3in 0; flex: 0 0 auto; }
.col { flex: 1; padding: 0.6in 0.5in; }
.col-left { background: #1a1a1a; color: #f0eeeb; border-radius: 12px 0 0 12px; }
.col-right { background: #f7f6f3; border: 2px solid #e0ddd8; border-left: none; border-radius: 0 12px 12px 0; }
.col h2 { font-family: 'DM Serif Display', serif; font-size: 22pt; margin-bottom: 0.3in; }
.col-right h2 { background: linear-gradient(90deg, #e8457a, #2b8fce, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.col p { font-size: 12pt; line-height: 1.7; }
.col .tag { font-family: 'JetBrains Mono', monospace; font-size: 9pt; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.15in; }
.col-left .tag { color: #888; }
.col-right .tag { color: #999; }
.divider-v { width: 4px; background: linear-gradient(180deg, #e8457a, #e06830, #d4a017, #2db84d, #2b8fce, #8b5cf6); }
.choose { font-family: 'DM Serif Display', serif; font-size: 20pt; text-align: center; margin: 0.4in 0; color: #333; }
</style></head><body>
<div class="container">
  <div class="label" style="margin-bottom:0.3in">Augmentation, Not Automation</div>
  <div class="split">
    <div class="col col-left">
      <div class="tag">The Dominant Path</div>
      <h2>Artificial Intelligence</h2>
      <p>Intelligence as computation, located in machines.</p>
      <p style="margin-top:0.2in">Value extracted.<br>Capability concentrated.</p>
    </div>
    <div class="divider-v"></div>
    <div class="col col-right">
      <div class="tag">The Other Path</div>
      <h2>Collective Intelligence</h2>
      <p>Intelligence as emergent from relationship.</p>
      <p style="margin-top:0.2in">Value created.<br>Capability distributed.</p>
    </div>
  </div>
  <div class="choose">Techne at RegenHub chooses the second path.</div>
  <div class="spacer"></div>
  ${bottomSection()}
</div></body></html>`;

fs.writeFileSync('concept-augment.html', augment);
console.log('✓ concept-augment.html');

// POSTER 3: e/H-LAM/T/S Framework
const colors = ['#e8457a','#e06830','#d4a017','#2db84d','#2b8fce','#8b5cf6','#e8457a'];
const letters = ['e','H','L','A','M','T','S'];
const labels = ['Ecology','Human','Language','Artifacts','Methodology','Training','Sessions'];
const letterHtml = letters.map((l,i) => `
  <div style="text-align:center">
    <div style="font-family:'DM Serif Display',serif;font-size:72pt;color:${colors[i]};line-height:1">${l}</div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:9pt;color:#666;margin-top:0.1in;letter-spacing:0.05em">${labels[i]}</div>
  </div>`).join('');

const framework = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>e/H-LAM/T/S</title>
<style>${commonStyles()}
.letters { display: flex; justify-content: space-between; align-items: flex-end; margin: 0.6in 0; padding: 0 0.2in; }
.formula { font-family: 'DM Serif Display', serif; font-size: 28pt; text-align: center; margin: 0.3in 0; letter-spacing: 0.08em; }
.slash { color: #ccc; }
.desc { font-size: 13pt; line-height: 1.75; max-width: 8in; color: #333; margin: 0.4in auto 0; text-align: center; }
.loc { font-family: 'JetBrains Mono', monospace; font-size: 11pt; color: #666; text-align: center; margin-top: 0.3in; }
</style></head><body>
<div class="container">
  <div class="label" style="text-align:center">The Framework</div>
  <div class="formula">e <span class="slash">/</span> H-LAM <span class="slash">/</span> T <span class="slash">/</span> S</div>
  <div class="rainbow-line-full"></div>
  <div class="letters">${letterHtml}</div>
  <div class="rainbow-line-full"></div>
  <div class="desc">
    Seven dimensions for organizing collective intelligence.<br>
    Built on Engelbart&rsquo;s 1962 augmentation framework,<br>extended with ecology and convergence.
  </div>
  <div class="loc">Techne at RegenHub · Boulder, Colorado</div>
  <div class="spacer"></div>
  ${bottomSection()}
</div></body></html>`;

fs.writeFileSync('concept-framework.html', framework);
console.log('✓ concept-framework.html');

// POSTER 4: The Vertical Ecosystem
const building = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>The Vertical Ecosystem</title>
<style>${commonStyles()}
.building { margin: 0.5in 0; }
.floor { padding: 0.5in 0.6in; border-left: 5px solid; margin-bottom: 2px; }
.floor-top { border-color: #8b5cf6; background: rgba(139,92,246,0.06); border-radius: 12px 12px 0 0; }
.floor-mid { border-color: #e8457a; background: rgba(232,69,122,0.08); position: relative; }
.floor-bot { border-color: #2db84d; background: rgba(45,184,77,0.06); border-radius: 0 0 12px 12px; }
.floor-label { font-family: 'JetBrains Mono', monospace; font-size: 9pt; letter-spacing: 0.15em; text-transform: uppercase; color: #888; margin-bottom: 0.08in; }
.floor-name { font-family: 'DM Serif Display', serif; font-size: 22pt; }
.floor-desc { font-size: 12pt; color: #555; margin-top: 0.05in; }
.floor-mid .badge { position: absolute; right: 0.5in; top: 50%; transform: translateY(-50%); font-family: 'JetBrains Mono', monospace; font-size: 9pt; background: #e8457a; color: white; padding: 4px 12px; border-radius: 20px; }
.address { font-family: 'JetBrains Mono', monospace; font-size: 10pt; color: #888; margin-top: 0.3in; text-align: center; }
.headline { font-family: 'DM Serif Display', serif; font-size: 24pt; text-align: center; margin-top: 0.4in; color: #333; }
</style></head><body>
<div class="container">
  <div class="label">The Vertical Ecosystem</div>
  <div style="margin-top:0.4in">
    <div class="rainbow-line-full"></div>
  </div>
  <div class="building">
    <div class="floor floor-top">
      <div class="floor-label">Roof</div>
      <div class="floor-name">Gathering Space</div>
    </div>
    <div class="floor floor-mid">
      <div class="floor-label">Third Floor</div>
      <div class="floor-name">Techne Institute</div>
      <div class="floor-desc">An Integral Technology Learning Center</div>
      <div class="badge">This is what we&rsquo;re building</div>
    </div>
    <div class="floor floor-bot">
      <div class="floor-label">Second Floor</div>
      <div class="floor-name">RegenHub</div>
      <div class="floor-desc">Co-working Cooperative</div>
    </div>
  </div>
  <div class="address">1515 Walnut Street, Boulder, Colorado · 5,430 ft</div>
  <div class="headline">From street to sky. Fund the third floor.</div>
  <div class="spacer"></div>
  ${bottomSection()}
</div></body></html>`;

fs.writeFileSync('concept-building.html', building);
console.log('✓ concept-building.html');

// POSTER 5: Before Code, There Was Bread
const bread = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Before Code, There Was Bread</title>
<style>${commonStyles()}
.quote { font-family: 'DM Serif Display', serif; font-size: 30pt; line-height: 1.32; margin: 0.5in 0 0.5in; max-width: 8.5in; }
.concept { font-size: 13pt; line-height: 1.8; max-width: 7.5in; color: #444; margin-top: 0.4in; }
.commons { font-family: 'JetBrains Mono', monospace; font-size: 14pt; color: #2b8fce; margin-top: 0.3in; }
</style></head><body>
<div class="container">
  <div class="label">Before Code, There Was Bread</div>
  <div class="quote">&ldquo;Intelligence is not locked in a skull or a server. It is distributed. It lives in relationships. It lives in the patterns of things working together.&rdquo;</div>
  <div class="rainbow-line"></div>
  <div class="concept">
    The oldest form of intelligence amplification: fermentation. Creating conditions for distributed intelligence to emerge.<br><br>
    We don&rsquo;t extract knowledge &mdash; we create conditions where a community&rsquo;s knowledge becomes visible to itself.
  </div>
  <div class="commons">commons.id</div>
  <div class="spacer"></div>
  ${bottomSection()}
</div></body></html>`;

fs.writeFileSync('concept-bread.html', bread);
console.log('✓ concept-bread.html');
console.log('\nAll 5 posters created.');
