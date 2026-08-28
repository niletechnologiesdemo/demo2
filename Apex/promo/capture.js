const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'http://localhost:8741';
const OUT = path.join(__dirname, 'screens');
fs.mkdirSync(OUT, { recursive: true });

const wait = ms => new Promise(r => setTimeout(r, ms));

/* Each shot drives the live mockup into the state we want, then captures it. */
const SHOTS = [
  { name: '01-welcome',  setup: null },
  { name: '02-home',     setup: `document.getElementById('estbtn').click();` },
  { name: '03-locked',   setup: `document.getElementById('resetbtn').click(); await w(420);
                                 S.stack=[{n:'deal',p:'d17'}]; render('fade');` },
  { name: '04-plans',    setup: `document.getElementById('resetbtn').click(); await w(420);
                                 S.stack=[{n:'plans'}]; render('fade');` },
  { name: '05-code',     setup: `document.getElementById('estbtn').click(); await w(450);
                                 S.stack=[{n:'deal',p:'d09'}]; render('fade'); await w(400);
                                 document.querySelector('.scroll').style.scrollBehavior='auto';
                                 document.querySelector('.scroll').scrollTop=175;` },
  { name: '06-wallet',   setup: `document.getElementById('estbtn').click(); await w(450);
                                 S.tab='saved'; S.stack=[{n:'saved'}]; render('fade');` },
  { name: '07-deals',    setup: `document.getElementById('estbtn').click(); await w(450);
                                 S.tab='deals'; S.stack=[{n:'deals'}]; render('fade');` },
  { name: '08-network',  setup: `document.getElementById('estbtn').click(); await w(450);
                                 S.tab='network'; S.stack=[{n:'network'}]; render('fade');` },
  { name: '09-business', setup: null, url: '/business.html', vp: { width: 1440, height: 900, deviceScaleFactor: 2 } },
  { name: '10-verify',   url: '/business.html', vp: { width: 1440, height: 900, deviceScaleFactor: 2 },
    setup: `nav('verify'); await w(300);
            document.getElementById('vcode').value='APX-9QM2-4417';
            document.querySelector('[data-verify="vcode"]').click();` }
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--hide-scrollbars', '--force-color-profile=srgb', '--font-render-hinting=none']
  });
  for (const shot of SHOTS) {
    const page = await browser.newPage();
    await page.setViewport(shot.vp || { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true });
    await page.goto(BASE + (shot.url || '/app.html'), { waitUntil: 'networkidle0' });
    await wait(900);                                   // let fonts and hero images settle
    if (shot.setup) {
      await page.evaluate(`(async () => { const w = ms => new Promise(r=>setTimeout(r,ms)); ${shot.setup} })()`);
      await wait(1100);                                // let transitions finish
    }
    // demo-only chrome must never appear in a promo frame
    await page.evaluate(() => {
      const t = document.getElementById('toasts'); if (t) t.innerHTML = '';
      document.querySelectorAll('.wtoast, .toast').forEach(e => e.remove());
      const sheet = document.getElementById('sheet'); if (sheet) { sheet.className = 'sheetwrap'; sheet.innerHTML = ''; }
    });
    await wait(120);
    // freeze animation so no frame is caught mid-sweep
    await page.addStyleTag({ content: '*,*::before,*::after{animation-play-state:paused !important;transition:none !important}' });
    await wait(150);
    const file = path.join(OUT, shot.name + '.png');
    await page.screenshot({ path: file });
    const kb = (fs.statSync(file).size / 1024).toFixed(0);
    console.log(`  ${shot.name.padEnd(12)} ${kb} KB`);
    await page.close();
  }
  await browser.close();
})();
