const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1350 });
  
  const filePath = 'file://' + path.resolve(__dirname, 'index.html');
  await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });
  
  await page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    
    const style = document.createElement('style');
    style.textContent = `
      @page { size: 1080px 1350px; margin: 0; }
      body { margin: 0; padding: 0; font-size: 24px !important; font-weight: 500 !important; }
      section {
        width: 1080px !important;
        height: 1350px !important;
        min-height: 1350px !important;
        max-height: 1350px !important;
        max-width: 1080px !important;
        overflow: hidden !important;
        page-break-after: always !important;
        break-after: page !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        padding: 80px 72px !important;
        margin: 0 !important;
        box-sizing: border-box !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
      }
      section:last-of-type { page-break-after: auto !important; }
      .nav-dots, .theme-toggle, .scroll-cue, #themeToggle { display: none !important; }

      /* LinkedIn-optimized typography */
      h1 { font-size: 4.5rem !important; font-weight: 700 !important; line-height: 1.05 !important; }
      h2 { font-size: 3.2rem !important; font-weight: 700 !important; line-height: 1.1 !important; }
      h3 { font-size: 1.8rem !important; font-weight: 600 !important; }
      p, li, .step-content p, .floor-desc, .tent-content p { 
        font-size: 1.3rem !important; 
        line-height: 1.6 !important;
        font-weight: 500 !important;
        max-width: 100% !important;
      }
      p.large { font-size: 1.6rem !important; font-weight: 500 !important; }
      .pull-quote, .pull-quote p { font-size: 1.5rem !important; font-weight: 500 !important; max-width: 100% !important; }
      .section-label, .floor-label, .dim { font-size: 15px !important; font-weight: 600 !important; }
      .section-num { font-size: 15px !important; font-weight: 700 !important; }
      .floor-feat, .tent-tag { font-size: 14px !important; padding: 5px 12px !important; font-weight: 500 !important; }

      /* Higher contrast */
      p, li, .step-content p, .floor-desc { color: #333333 !important; }
      h1, h2, h3, .floor-name { color: #111111 !important; }
      .section-label, .dim { color: #666666 !important; }

      /* Title section vertical for LinkedIn */
      .title-section {
        flex-direction: column !important;
        gap: 40px !important;
        text-align: center !important;
        align-items: center !important;
      }
      .title-left { text-align: center; }
      .title-right { display: flex; justify-content: center; }
      .artifact-image { width: 360px !important; height: 360px !important; margin: 20px auto !important; }

      /* Building horizontal layout — stack vertical for LinkedIn */
      .building { flex-direction: column !important; gap: 16px !important; }

      /* H-LAM/T wrap better */
      .hlamt { flex-wrap: wrap !important; justify-content: center !important; gap: 16px !important; }

      /* Comparison grid stack */
      .comparison-grid, .dual-grid, .ask-grid { grid-template-columns: 1fr !important; gap: 16px !important; }

      /* Divider centering */
      .divider { margin: 24px auto !important; }
    `;
    document.head.appendChild(style);
  });
  
  await new Promise(r => setTimeout(r, 1000));

  await page.pdf({
    path: path.resolve(__dirname, 'Techne-at-RegenHub-LinkedIn.pdf'),
    width: '1080px',
    height: '1350px',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });
  
  console.log('PDF generated: Techne-at-RegenHub-LinkedIn.pdf');
  await browser.close();
})();
