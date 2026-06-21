import type { Guide } from './types';
import { toiminimiVaiOy } from './toiminimi-vai-oy';
import { osakeyhtionPerustaminen } from './osakeyhtion-perustaminen';
import { osinkoVaiPalkka } from './osinko-vai-palkka';
import { kirjanpidonHinta } from './kirjanpidon-hinta';
import { alvOpas } from './alv-opas';
import { toiminimenVerotus } from './toiminimen-verotus';
import { starttiraha } from './starttiraha';
import { tilitoimistonVaihto } from './tilitoimiston-vaihto';

export * from './types';

// Order shown on the hub; drives routing, prerender and the sitemap.
export const guides: Guide[] = [
  toiminimiVaiOy,
  osakeyhtionPerustaminen,
  osinkoVaiPalkka,
  kirjanpidonHinta,
  toiminimenVerotus,
  alvOpas,
  starttiraha,
  tilitoimistonVaihto,
];

export const guideSlugs: string[] = guides.map((g) => g.slug);

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

/** Up to `limit` other guides (for "read also" cross-links). */
export function relatedGuides(slug: string, limit = 3): Guide[] {
  return guides.filter((g) => g.slug !== slug).slice(0, limit);
}
