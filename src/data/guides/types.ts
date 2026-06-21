import type { Locale } from '../../i18n/context';

// A content block — the article body is an array of these, rendered by
// GuideBlocks and used to derive plain text for SEO/structured data.
export type Block =
  | { t: 'p'; x: string }
  | { t: 'h2'; x: string }
  | { t: 'h3'; x: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'note'; x: string }; // highlighted aside (e.g. "rates change, check current")

export interface GuideContent {
  title: string; // H1 + base of the <title>
  description: string; // meta description (~120-160 chars)
  lead: string; // intro paragraph under the H1
  body: Block[];
  faq: { q: string; a: string }[];
}

export interface Guide {
  slug: string; // URL slug, same across locales (FI-rooted)
  datePublished: string; // YYYY-MM-DD
  dateModified: string; // YYYY-MM-DD
  content: Record<Locale, GuideContent>;
}

/** Plain-text version of a block array (for word counts / fallback descriptions). */
export function blocksToText(body: Block[]): string {
  return body
    .map((b) => {
      if (b.t === 'ul' || b.t === 'ol') return b.items.join(' ');
      return b.x;
    })
    .join(' ');
}
