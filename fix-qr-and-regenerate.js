const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const qrSvg = fs.readFileSync(path.resolve(__dirname, 'qr.svg'), 'utf8');

// Fix QR in all poster HTML files
const posters = ['poster-aura.html', 'poster-type.html', 'poster-card.html'];

for (const file of posters) {
  let html = fs.readFileSync(path.resolve(__dirname, file), 'utf8');
  // Replace any existing SVG QR code (between qr-code div tags or standalone svg with viewBox="0 0 )
  html = html.replace(/<svg[^>]*viewBox="0 0 \d+[^"]*"[^>]*>.*?<\/svg>/gs, qrSvg);
  // Also update any text references to the URL
  html = html.replace(/https:\/\/artizen\.fund(?!\/index)/g, 'https://artizen.fund/index/p/techne-at-regenhub?season=6');
  fs.writeFileSync(path.resolve(__dirname, file), html);
  console.log(`Fixed QR in ${file}`);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const configs = [
    { html: 'poster-aura.html', pdf: 'poster-aura.pdf', width: '11in', height: '17in' },
    { html: 'poster-type.html', pdf: 'poster-type.pdf', width: '11in', height: '17in' },
    { html: 'poster-card.html', pdf: 'poster-card.pdf', width: '11in', height: '8.5in' },
  ];

  for (const c of configs) {
    const page = await browser.newPage();
    const filePath = 'file://' + path.resolve(__dirname, c.html);
    await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1000));
    await page.pdf({
      path: path.resolve(__dirname, c.pdf),
      width: c.width,
      height: c.height,
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' }
    });
    console.log(`Generated ${c.pdf}`);
    await page.close();
  }

  await browser.close();
})();
