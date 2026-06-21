import type { Block } from '../data/guides';

/** Renders a guide's body blocks in design A (prose-style, accessible headings). */
export default function GuideBlocks({ body }: { body: Block[] }) {
  return (
    <>
      {body.map((b, i) => {
        switch (b.t) {
          case 'h2':
            return (
              <h2 key={i} className="mt-10 text-2xl sm:text-3xl font-bold tracking-tight text-ink-900">
                {b.x}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} className="mt-8 text-lg sm:text-xl font-bold text-ink-900">
                {b.x}
              </h3>
            );
          case 'p':
            return (
              <p key={i} className="mt-4 text-ink-700 leading-relaxed">
                {b.x}
              </p>
            );
          case 'ul':
            return (
              <ul key={i} className="mt-4 space-y-2.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-ink-700 leading-relaxed">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="mt-4 space-y-2.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-ink-700 leading-relaxed">
                    <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">
                      {j + 1}
                    </span>
                    <span className="pt-0.5">{it}</span>
                  </li>
                ))}
              </ol>
            );
          case 'note':
            return (
              <p key={i} className="mt-6 rounded-xl border-l-4 border-brand-400 bg-brand-50/60 px-4 py-3 text-sm text-ink-700">
                {b.x}
              </p>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
