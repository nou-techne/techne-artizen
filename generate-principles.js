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

  const page2 = await browser.newPage();
  await page2.goto('file://' + path.resolve(__dirname, 'poster-principles-18x24.html'), { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page2.pdf({ path: path.resolve(__dirname, 'poster-principles-18x24.pdf'), width: '18in', height: '24in', printBackground: true, margin: { top: '0', right: '0', bottom: '0', left: '0' } });
  console.log('Generated poster-principles-18x24.pdf');
  await page2.close();

  await browser.close();
})();
