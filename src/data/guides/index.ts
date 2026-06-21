import type { Guide } from './types';
import { toiminimiVaiOy } from './toiminimi-vai-oy';
import { kirjanpidonHinta } from './kirjanpidon-hinta';
import { alvOpas } from './alv-opas';
import { toiminimenVerotus } from './toiminimen-verotus';

export * from './types';

// Order shown on the hub; drives routing, prerender and the sitemap.
export const guides: Guide[] = [toiminimiVaiOy, kirjanpidonHinta, alvOpas, toiminimenVerotus];

export const guideSlugs: string[] = guides.map((g) => g.slug);

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
