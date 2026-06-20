// Loads each route in a real (headless) browser, lets it hydrate, and reports:
//  - console warnings/errors (hydration mismatches)
//  - how many headers/footers/<h1> render (doubling detection)
//  - whether the main page content is present after hydration
import { chromium } from 'playwright';

const BASE = process.env.BASE || 'http://localhost:4180';
const ROUTES = ['/', '/hinnasto', '/palvelut', '/vaavo', '/meista'];

const browser = await chromium.launch();
let anyProblem = false;

for (const route of ROUTES) {
  const page = await browser.newPage();
  const msgs = [];
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') msgs.push(`[${m.type()}] ${m.text()}`); });
  page.on('pageerror', (e) => msgs.push(`[pageerror] ${e.message}`));

  await page.goto(BASE + route, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600); // let hydration + lazy chunks settle

  const counts = await page.evaluate(() => ({
    headers: document.querySelectorAll('header').length,
    footers: document.querySelectorAll('footer').length,
    h1: document.querySelectorAll('h1').length,
    h2: document.querySelectorAll('h2').length,
    // main text length excluding header/footer chrome
    mainText: (document.querySelector('main')?.innerText || '').trim().length,
  }));

  const hydrationMsgs = msgs.filter((m) => /hydrat|did not match|server html|server rendered|minified react error #(418|419|423|425)/i.test(m));
  const doubled = counts.headers > 1 || counts.footers > 1;
  const empty = counts.mainText < 50;
  const bad = doubled || empty || hydrationMsgs.length > 0;
  if (bad) anyProblem = true;

  console.log(`\n=== ${route} ===`);
  console.log(`  headers=${counts.headers} footers=${counts.footers} h1=${counts.h1} h2=${counts.h2} mainTextLen=${counts.mainText}`);
  console.log(`  ${doubled ? 'DOUBLED ✗' : 'single ✓'} | ${empty ? 'EMPTY ✗' : 'has-content ✓'} | hydrationMsgs=${hydrationMsgs.length}`);
  for (const m of hydrationMsgs.slice(0, 4)) console.log(`    ${m.slice(0, 200)}`);
  if (msgs.length && !hydrationMsgs.length) console.log(`  (other console msgs: ${msgs.length}, first: ${msgs[0].slice(0,160)})`);
  await page.close();
}

await browser.close();
console.log(`\n${anyProblem ? 'RESULT: problems detected ✗' : 'RESULT: all routes single + content + no hydration warnings ✓'}`);
process.exit(anyProblem ? 1 : 0);
