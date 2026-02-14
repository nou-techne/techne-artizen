const puppeteer = require('puppeteer');
const path = require('path');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const files = ['concept-bootstrap', 'concept-capability', 'concept-coop', 'concept-articulation', 'concept-convergence'];
  for (const f of files) {
    const page = await browser.newPage();
    await page.goto('file://' + path.resolve(__dirname, f + '.html'), { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1000));
    await page.pdf({ path: path.resolve(__dirname, f + '.pdf'), width: '11in', height: '17in', printBackground: true, margin: { top: '0', right: '0', bottom: '0', left: '0' } });
    console.log('Generated ' + f + '.pdf');
    await page.close();
  }
  await browser.close();
})();
