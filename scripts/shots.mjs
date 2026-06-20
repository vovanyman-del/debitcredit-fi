import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE || 'http://localhost:4180';
const LOCALE = process.env.LOCALE || 'ru'; // prefix; '' for fi
const OUT = `design-reference/preview${LOCALE ? '-' + LOCALE : ''}`;
mkdirSync(OUT, { recursive: true });

const pages = [
  ['home', '/'],
  ['palvelut', '/palvelut'],
  ['hinnasto', '/hinnasto'],
  ['vaavo', '/vaavo'],
  ['meista', '/meista'],
  ['yhteystiedot', '/yhteystiedot'],
  ['tilitoimistoille', '/tilitoimistoille'],
  ['yrittajaksi', '/yrittajaksi'],
  ['vaihda-tilitoimistoa', '/vaihda-tilitoimistoa'],
  ['tietosuoja', '/tietosuoja'],
  ['kayttoehdot', '/kayttoehdot'],
];
const pfx = (p) => (LOCALE ? `/${LOCALE}${p === '/' ? '' : p}` : p);

const browser = await chromium.launch();
for (const [name, path] of pages) {
  for (const [dev, w, h] of [['desktop', 1280, 900], ['mobile', 390, 844]]) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    await page.goto(BASE + pfx(path), { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/${name}-${dev}.png`, fullPage: true });
    await page.close();
  }
  console.log(`shot ${name}`);
}
await browser.close();
console.log('shots written to', OUT);
