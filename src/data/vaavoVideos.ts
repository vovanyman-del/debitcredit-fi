// Vaavo video kit, revision 7 (5.10.2026): per language one introduction film
// and three short films. Files live in public/video/r7 and are served with an
// immutable cache header (vercel.json), so a new revision goes to a new folder.
// Pure module (no React / no DOM): seo.ts uses it for the VideoObject node.

import type { Locale } from '../i18n/context';

export type VaavoVideoTopic = 'main' | 'invoices' | 'payments' | 'support';

export const VAAVO_SHORT_TOPICS = ['invoices', 'payments', 'support'] as const;

// Durations in seconds, measured from the exported MP4 files.
const SECONDS: Record<Locale, Record<VaavoVideoTopic, number>> = {
  fi: { main: 68, invoices: 27, payments: 26, support: 23 },
  en: { main: 59, invoices: 23, payments: 20, support: 19 },
  ru: { main: 49, invoices: 26, payments: 23, support: 21 },
  et: { main: 60, invoices: 25, payments: 24, support: 22 },
  uk: { main: 44, invoices: 27, payments: 22, support: 21 },
};

export function vaavoVideo(locale: Locale, topic: VaavoVideoTopic) {
  const base = `/video/r7/vaavo-${locale}-${topic}`;
  return { src: `${base}.mp4`, poster: `${base}-poster.jpg`, seconds: SECONDS[locale][topic] };
}

/** 68 → "1:08" */
export function formatDuration(seconds: number): string {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}
