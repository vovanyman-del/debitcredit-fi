import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE || 'http://localhost:4180';
const OUT = 'design-reference/preview';
mkdirSync(OUT, { recursive: true });

const targets = [
  { path: '/', label: 'fi-desktop', w: 1280, h: 900 },
  { path: '/', label: 'fi-mobile', w: 390, h: 844 },
  { path: '/ru', label: 'ru-desktop', w: 1280, h: 900 },
  { path: '/ru', label: 'ru-mobile', w: 390, h: 844 },
];

const browser = await chromium.launch();
for (const t of targets) {
  const page = await browser.newPage({ viewport: { width: t.w, height: t.h }, deviceScaleFactor: 2 });
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message.split('\n')[0]));
  await page.goto(BASE + t.path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/${t.label}.png`, fullPage: true });
  const headers = await page.evaluate(() => document.querySelectorAll('header').length);
  console.log(`${t.label.padEnd(12)} ${t.path.padEnd(5)} headers=${headers} pageerrors=${errs.length}${errs[0] ? ' :: ' + errs[0].slice(0, 90) : ''}`);
  await page.close();
}
await browser.close();
console.log('shots written to', OUT);
