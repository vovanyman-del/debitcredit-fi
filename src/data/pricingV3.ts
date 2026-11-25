// Price list v3 (draft) and the annual price calculator behind /hinnasto.
// Source: vaavo-wt/plans/market/pricing-v3.md §1 (grid and surcharge rule) and
// like-for-like-comparison.md (annual report hours, market medians).
// All money is integer euro cents, VAT 0 %. Nothing here talks to a server.

export type CompanyForm = 'tmi' | 'oy';
export type PlanId = 'toiminimi' | 'start' | 'basic' | 'medium' | 'large';

export interface Plan {
  id: PlanId;
  priceCents: number;
  includedDocs: number;
  /** 0 means the plan carries no payroll: the first employee moves the firm to Basic. */
  includedPayroll: number;
  forms: CompanyForm[];
}

export const PLANS: Plan[] = [
  { id: 'toiminimi', priceCents: 3990, includedDocs: 15, includedPayroll: 0, forms: ['tmi'] },
  { id: 'start', priceCents: 5990, includedDocs: 15, includedPayroll: 0, forms: ['oy'] },
  { id: 'basic', priceCents: 9350, includedDocs: 20, includedPayroll: 1, forms: ['tmi', 'oy'] },
  { id: 'medium', priceCents: 16500, includedDocs: 50, includedPayroll: 2, forms: ['tmi', 'oy'] },
  { id: 'large', priceCents: 29700, includedDocs: 100, includedPayroll: 4, forms: ['tmi', 'oy'] },
];

/** Extra document price by the month's total document count (Toiminimi has its own flat price). */
export const EXTRA_DOC_TIERS: { from: number; to: number; cents: number }[] = [
  { from: 1, to: 50, cents: 250 },
  { from: 51, to: 100, cents: 212 },
  { from: 101, to: 200, cents: 206 },
];
export const TOIMINIMI_EXTRA_DOC_CENTS = 164;
/** Above this many documents in a month there is no list price: «pyydä tarjous». */
export const MAX_LISTED_DOCS = 200;
export const PAYROLL_CENTS = 1490;
export const E_INVOICE_CENTS = 49;
export const ANNUAL_HOURLY_CENTS = 8690;
export const ANNUAL_MIN_HOURS = 2;

export function extraDocCents(plan: Plan, monthDocs: number): number {
  if (plan.id === 'toiminimi') return TOIMINIMI_EXTRA_DOC_CENTS;
  const tier = EXTRA_DOC_TIERS.find((t) => monthDocs <= t.to) ?? EXTRA_DOC_TIERS[EXTRA_DOC_TIERS.length - 1];
  return tier.cents;
}

/** The surcharge printed on a card: the price of the first document above what the plan includes. */
export function firstExtraDocCents(plan: Plan): number {
  return extraDocCents(plan, plan.includedDocs + 1);
}

export interface MonthPrice {
  plan: Plan;
  docs: number;
  extraDocs: number;
  extraDocCents: number;
  extraPayroll: number;
  totalCents: number;
}

/**
 * The cheapest way to bill one month: every plan the firm may use, with extra documents at the
 * month's rate and extra payroll calculations at 14,90 €. Payroll exists only on Basic, Medium
 * and Large, so the first employee means Basic at least. Returns null above 200 documents.
 */
export function cheapestMonth(form: CompanyForm, docs: number, payroll: number): MonthPrice | null {
  if (docs > MAX_LISTED_DOCS) return null;
  let best: MonthPrice | null = null;
  for (const plan of PLANS) {
    if (!plan.forms.includes(form)) continue;
    if (payroll > 0 && plan.includedPayroll === 0) continue;
    const extraDocs = Math.max(0, docs - plan.includedDocs);
    const rate = extraDocCents(plan, docs);
    const extraPayroll = Math.max(0, payroll - plan.includedPayroll);
    const totalCents = plan.priceCents + extraDocs * rate + extraPayroll * PAYROLL_CENTS;
    if (!best || totalCents < best.totalCents) {
      best = { plan, docs, extraDocs, extraDocCents: rate, extraPayroll, totalCents };
    }
  }
  return best;
}

// Annual report hours by average documents a month, in half hours (like-for-like-comparison.md §1:
// Oy 20 docs 2,5 h, 50 docs 5,5 h, 100 docs 6,5 h, 200 docs 7,5 h; toiminimi 2 h). Between the
// points the hours are interpolated and rounded to the nearest half hour.
const OY_HALF_HOURS: [number, number][] = [[20, 5], [50, 11], [100, 13], [200, 15]];

export function annualReportHalfHours(form: CompanyForm, avgDocs: number): number {
  let oy = OY_HALF_HOURS[OY_HALF_HOURS.length - 1][1];
  if (avgDocs <= OY_HALF_HOURS[0][0]) oy = OY_HALF_HOURS[0][1];
  else {
    for (let i = 1; i < OY_HALF_HOURS.length; i++) {
      const [d0, h0] = OY_HALF_HOURS[i - 1];
      const [d1, h1] = OY_HALF_HOURS[i];
      if (avgDocs <= d1) {
        oy = Math.round(h0 + ((avgDocs - d0) * (h1 - h0)) / (d1 - d0));
        break;
      }
    }
  }
  const halfHours = form === 'tmi' ? oy - 1 : oy;
  return Math.max(ANNUAL_MIN_HOURS * 2, halfHours);
}

export interface YearInput {
  form: CompanyForm;
  /** Documents in a quiet and in a busy month; equal when the months are alike. */
  docsLow: number;
  docsHigh: number;
  payroll: number;
}

export type YearQuote =
  | { kind: 'quote' }
  | {
      kind: 'price';
      uneven: boolean;
      low: MonthPrice;
      high: MonthPrice;
      bookkeepingCents: number;
      annualHalfHours: number;
      annualCents: number;
      totalCents: number;
    };

/** A year: half the months at the low count and half at the high one, plus the annual report. */
export function yearQuote(input: YearInput): YearQuote {
  const lowDocs = Math.min(input.docsLow, input.docsHigh);
  const highDocs = Math.max(input.docsLow, input.docsHigh);
  const low = cheapestMonth(input.form, lowDocs, input.payroll);
  const high = cheapestMonth(input.form, highDocs, input.payroll);
  if (!low || !high) return { kind: 'quote' };
  const bookkeepingCents = 6 * low.totalCents + 6 * high.totalCents;
  const annualHalfHours = annualReportHalfHours(input.form, (lowDocs + highDocs) / 2);
  const annualCents = (annualHalfHours * ANNUAL_HOURLY_CENTS) / 2;
  return {
    kind: 'price',
    uneven: lowDocs !== highDocs,
    low,
    high,
    bookkeepingCents,
    annualHalfHours,
    annualCents,
    totalCents: bookkeepingCents + annualCents,
  };
}

// Medians of public price lists, a whole year with the annual report, VAT 0 %, software added only
// where the firm says it bills it separately (variant В1). like-for-like-comparison.md §4,
// pricing-v3.md §1 and pricing-and-offer-v2.md §1.3, checked 25.11.2026. The 200-document and the
// uneven-month profiles are left out: too few firms publish prices for them.
export interface MarketProfile {
  form: CompanyForm;
  docs: number;
  payroll: number;
  medianEur: number;
  firms: number;
}

export const MARKET_PROFILES: MarketProfile[] = [
  { form: 'tmi', docs: 10, payroll: 0, medianEur: 1235, firms: 31 },
  { form: 'tmi', docs: 15, payroll: 0, medianEur: 1548, firms: 31 },
  { form: 'oy', docs: 15, payroll: 0, medianEur: 1786, firms: 27 },
  { form: 'oy', docs: 20, payroll: 0, medianEur: 1788, firms: 27 },
  { form: 'oy', docs: 50, payroll: 0, medianEur: 2829, firms: 22 },
  { form: 'oy', docs: 20, payroll: 1, medianEur: 2066, firms: 27 },
  { form: 'oy', docs: 20, payroll: 2, medianEur: 2282, firms: 27 },
  { form: 'oy', docs: 20, payroll: 4, medianEur: 2714, firms: 27 },
  { form: 'oy', docs: 50, payroll: 2, medianEur: 3306, firms: 23 },
  { form: 'oy', docs: 100, payroll: 4, medianEur: 5075, firms: 21 },
];

/**
 * The comparison profile closest to the visitor's firm: same company form, payroll or not alike,
 * documents and payroll each within a factor of 1,5. Null when nothing is that close.
 */
export function nearestMarketProfile(form: CompanyForm, avgDocs: number, payroll: number): MarketProfile | null {
  const within = (a: number, b: number) => a / b >= 2 / 3 && a / b <= 1.5;
  let best: MarketProfile | null = null;
  let bestDistance = Infinity;
  for (const p of MARKET_PROFILES) {
    if (p.form !== form || (p.payroll === 0) !== (payroll === 0)) continue;
    const docs = Math.max(1, avgDocs);
    if (!within(docs, p.docs) || !within(payroll + 1, p.payroll + 1)) continue;
    const distance = Math.abs(Math.log(docs / p.docs)) + Math.abs(Math.log((payroll + 1) / (p.payroll + 1)));
    if (distance < bestDistance) {
      best = p;
      bestDistance = distance;
    }
  }
  return best;
}

/** Below this yearly difference the calculator says the price alone is no reason to switch. */
export const SMALL_DIFFERENCE_CENTS = 12000;
