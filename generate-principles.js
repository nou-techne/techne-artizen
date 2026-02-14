const puppeteer = require('puppeteer');
const path = require('path');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto('file://' + path.resolve(__dirname, 'poster-principles.html'), { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.pdf({ path: path.resolve(__dirname, 'poster-principles.pdf'), width: '36in', height: '24in', printBackground: true, margin: { top: '0', right: '0', bottom: '0', left: '0' } });
  console.log('Generated poster-principles.pdf');
  await page.close();
  await browser.close();
})();
