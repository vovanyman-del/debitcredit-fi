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
import { yhdistyksenKirjanpito } from './yhdistyksen-kirjanpito';
import { virolainenOuSuomessa } from './virolainen-ou-suomessa';
import { rakennusalanKaannettyArvonlisavero } from './rakennusalan-kaannetty-arvonlisavero';
import { kilometrikorvausPaivaraha2026 } from './kilometrikorvaus-paivaraha-2026';
import { ajopaivakirja } from './ajopaivakirja';
import { ensimmainenTyontekija } from './ensimmainen-tyontekija';
import { verotili } from './verotili';

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
  yhdistyksenKirjanpito,
  virolainenOuSuomessa,
  rakennusalanKaannettyArvonlisavero,
  kilometrikorvausPaivaraha2026,
  ajopaivakirja,
  ensimmainenTyontekija,
  verotili,
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
  if (slug === yhdistyksenKirjanpito.slug) {
    return [alvOpas, palkanlaskenta, kirjanpidonHinta].slice(0, limit);
  }
  if (slug === rakennusalanKaannettyArvonlisavero.slug) {
    return [alvOpas, virolainenOuSuomessa, kirjanpidonHinta].slice(0, limit);
  }
  if (slug === kilometrikorvausPaivaraha2026.slug) {
    return [palkanlaskenta, yrittajanVahennykset, toiminimenVerotus].slice(0, limit);
  }
  if (slug === ajopaivakirja.slug) {
    return [kilometrikorvausPaivaraha2026, yrittajanVahennykset, toiminimenVerotus].slice(0, limit);
  }
  if (slug === ensimmainenTyontekija.slug) {
    return [palkanlaskenta, kilometrikorvausPaivaraha2026, osinkoVaiPalkka].slice(0, limit);
  }
  if (slug === verotili.slug) {
    return [alvOpas, ennakkovero, ensimmainenTyontekija].slice(0, limit);
  }
  const i = guides.findIndex((g) => g.slug === slug);
  if (i === -1) return guides.slice(0, limit);
  const n = Math.min(limit, guides.length - 1);
  return Array.from({ length: n }, (_, k) => guides[(i + 1 + k) % guides.length]);
}
