import type { Guide } from './types';
import { toiminimiVaiOy } from './toiminimi-vai-oy';

export * from './types';

// Ordered newest-first; drives the hub list, routing, prerender and sitemap.
export const guides: Guide[] = [toiminimiVaiOy];

export const guideSlugs: string[] = guides.map((g) => g.slug);

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
