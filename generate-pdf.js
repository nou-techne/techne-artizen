const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  const filePath = 'file://' + path.resolve(__dirname, 'index.html');
  await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });
  
  // Trigger all reveal animations + inject print styles
  await page.evaluate(() => {
    // Enable dark mode
    document.documentElement.classList.add('dark');
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    
    // Force each section to be exactly one slide
    const style = document.createElement('style');
    style.textContent = `
      @page { size: 1920px 1080px; margin: 0; }
      body { margin: 0; padding: 0; }
      section {
        width: 1920px !important;
        height: 1080px !important;
        min-height: 1080px !important;
        max-height: 1080px !important;
        max-width: 1920px !important;
        overflow: hidden !important;
        page-break-after: always !important;
        break-after: page !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        padding: 80px 120px !important;
        margin: 0 !important;
        box-sizing: border-box !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
      }
      section:last-of-type { page-break-after: auto !important; }
      .nav-dots, .theme-toggle, .scroll-cue, #themeToggle { display: none !important; }

      /* Accessibility: larger fonts, higher contrast, less content per slide */
      body { font-size: 22px !important; }
      h1 { font-size: 4rem !important; }
      h2 { font-size: 3rem !important; }
      h3 { font-size: 1.6rem !important; }
      p, li, .step-content p, .floor-desc, .tent-content p { 
        font-size: 1.15rem !important; 
        line-height: 1.7 !important;
        max-width: 800px;
      }
      p.large { font-size: 1.35rem !important; }
      .pull-quote, .pull-quote p { font-size: 1.3rem !important; max-width: 800px; }
      .section-label, .floor-label, .dim { font-size: 14px !important; }
      .section-num { font-size: 14px !important; }
      .floor-feat, .tent-tag { font-size: 13px !important; padding: 5px 12px !important; }

      /* Higher contrast for dark mode */
      p, li, .step-content p, .floor-desc { color: #cccccc !important; }
      h1, h2, h3, .floor-name { color: #ffffff !important; }
      .section-label, .dim { color: #999999 !important; }

      /* Tighter layout — more padding, less clutter */
      section { padding: 100px 160px !important; }
      .title-section { padding: 100px 160px !important; gap: 100px !important; }
      .building { gap: 0 !important; }
      .hlamt { gap: 20px !important; }
      .artifact-image { width: 380px !important; height: 380px !important; }
    `;
    document.head.appendChild(style);
  });
  
  await new Promise(r => setTimeout(r, 1000));

  await page.pdf({
    path: path.resolve(__dirname, 'Techne-at-RegenHub-Pitch-Deck.pdf'),
    width: '1920px',
    height: '1080px',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });
  
  console.log('PDF generated: Techne-at-RegenHub-Pitch-Deck.pdf');
  await browser.close();
})();
