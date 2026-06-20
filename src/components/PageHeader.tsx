import type { ReactNode } from 'react';

/** Design-A page header: light canvas, green eyebrow, large ink H1, lead. */
export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink-900/5 bg-canvas">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(18,154,106,0.08),transparent_60%)]" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 sm:pb-16">
        {eyebrow && (
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-brand-600">{eyebrow}</p>
        )}
        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-ink-900">{title}</h1>
        {subtitle && <p className="mt-5 text-lg text-ink-700/80 max-w-2xl leading-relaxed">{subtitle}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
