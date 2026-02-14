const puppeteer = require('puppeteer');
const path = require('path');

const posters = [
  { file: 'poster-aura.html', out: 'poster-aura.pdf', width: 11, height: 17 },
  { file: 'poster-type.html', out: 'poster-type.pdf', width: 11, height: 17 },
  { file: 'poster-card.html', out: 'poster-card.pdf', width: 11, height: 8.5 },
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  for (const p of posters) {
    const page = await browser.newPage();
    const filePath = path.resolve(__dirname, p.file);
    await page.setViewport({ width: Math.round(p.width * 96), height: Math.round(p.height * 96) });
    await page.goto('file://' + filePath, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.pdf({
      path: path.resolve(__dirname, p.out),
      width: p.width + 'in',
      height: p.height + 'in',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    console.log('Generated', p.out);
    await page.close();
  }
  await browser.close();
})();
