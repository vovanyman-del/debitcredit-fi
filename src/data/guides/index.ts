import type { Guide } from './types';
import { toiminimiVaiOy } from './toiminimi-vai-oy';
import { osakeyhtionPerustaminen } from './osakeyhtion-perustaminen';
import { kevytyrittajyysVaiToiminimi } from './kevytyrittajyys-vai-toiminimi';
import { osinkoVaiPalkka } from './osinko-vai-palkka';
import { kirjanpidonHinta } from './kirjanpidon-hinta';
import { toiminimenVerotus } from './toiminimen-verotus';
import { yrittajanVahennykset } from './yrittajan-vahennykset';
import { ennakkovero } from './ennakkovero';
import { alvOpas } from './alv-opas';
import { palkanlaskenta } from './palkanlaskenta';
import { starttiraha } from './starttiraha';
import { tilitoimistonVaihto } from './tilitoimiston-vaihto';

export * from './types';

// Order shown on the hub; drives routing, prerender and the sitemap.
export const guides: Guide[] = [
  toiminimiVaiOy,
  osakeyhtionPerustaminen,
  kevytyrittajyysVaiToiminimi,
  osinkoVaiPalkka,
  kirjanpidonHinta,
  toiminimenVerotus,
  yrittajanVahennykset,
  ennakkovero,
  alvOpas,
  palkanlaskenta,
  starttiraha,
  tilitoimistonVaihto,
];

export const guideSlugs: string[] = guides.map((g) => g.slug);

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

/** Prefer relevant follow-up reading; use hub order as the fallback. */
export function relatedGuides(slug: string, limit = 3): Guide[] {
  if (slug === tilitoimistonVaihto.slug) {
    return [kirjanpidonHinta, palkanlaskenta, yrittajanVahennykset].slice(0, limit);
  }
  const i = guides.findIndex((g) => g.slug === slug);
  if (i === -1) return guides.slice(0, limit);
  const n = Math.min(limit, guides.length - 1);
  return Array.from({ length: n }, (_, k) => guides[(i + 1 + k) % guides.length]);
}
