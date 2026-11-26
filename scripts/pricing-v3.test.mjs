// Check figures for the /hinnasto calculator: `node --test scripts/pricing-v3.test.mjs`.
// Grid: vaavo-wt/plans/market/pricing-v3.md §1. Founder's decisions of 26.11.2026 change three things
// and the expected years below follow them on purpose:
//   - a toiminimi annual report is 82,50 € while turnover is at most 100 000 € (was 2 h × 86,90 €);
//   - Oy annual report hours stay in the founder's ranges: 20 docs 2,5 h, 50 docs 4 h (was 5,5 h),
//     100 docs 6,5 h, 200 docs 8 h;
//   - a toiminimi with employees stays on Toiminimi (+14,90 € a payslip); Start takes irregular
//     payslips at 24,90 € and loses to Basic when Basic is cheaper.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { yearQuote, cheapestMonth, firstExtraDocCents, nearestMarketProfile, PLANS } from '../src/data/pricingV3.ts';

const year = (form, docsLow, docsHigh, payroll, extra = {}) => {
  const q = yearQuote({ form, docsLow, docsHigh, payroll, ...extra });
  assert.equal(q.kind, 'price');
  return q;
};

test('tmi, 10 documents, turnover at most 100 000 €: 561,30 € a year (Toiminimi + 82,50 €)', () => {
  const q = year('tmi', 10, 10, 0);
  assert.equal(q.low.plan.id, 'toiminimi');
  assert.equal(q.annualFlat, true);
  assert.equal(q.annualCents, 8250);
  assert.equal(q.totalCents, 56130);
});

test('tmi, 15 documents, turnover above 100 000 €: annual report by the hour, 696,05 € a year', () => {
  const q = year('tmi', 15, 15, 0, { tmiTurnoverOver100k: true });
  assert.equal(q.annualFlat, false);
  assert.equal(q.annualHalfHours, 5);
  assert.equal(q.totalCents, 69605);
});

test('tmi with an employee stays on Toiminimi: 20 documents, 1 payslip — 63,00 € a month, 838,50 € a year', () => {
  const q = year('tmi', 20, 20, 1);
  assert.equal(q.low.plan.id, 'toiminimi');
  assert.equal(q.low.totalCents, 3990 + 5 * 164 + 1490);
  assert.equal(q.totalCents, 83850);
});

test('Oy, 15 documents, no payroll: Start, 936,05 € a year', () => {
  const q = year('oy', 15, 15, 0);
  assert.equal(q.low.plan.id, 'start');
  assert.equal(q.totalCents, 93605);
});

test('Oy, 20 documents, 1 employee: Basic, 1 339,25 € a year', () => {
  const q = year('oy', 20, 20, 1);
  assert.equal(q.low.plan.id, 'basic');
  assert.equal(q.annualHalfHours, 5);
  assert.equal(q.totalCents, 133925);
});

test("founder's example: irregular payroll, 20 documents and 1 payslip — Start 97,30 € loses to Basic 93,50 €", () => {
  const m = cheapestMonth('oy', 20, 1, { irregularPayroll: true });
  assert.equal(m.plan.id, 'basic');
  assert.equal(m.totalCents, 9350);
});

test('irregular payroll, 15 documents and 1 payslip: Start + 24,90 € = 84,80 €', () => {
  const m = cheapestMonth('oy', 15, 1, { irregularPayroll: true });
  assert.equal(m.plan.id, 'start');
  assert.equal(m.totalCents, 5990 + 2490);
});

test('a monthly payroll in an Oy is Basic and up, never Start', () => {
  assert.equal(cheapestMonth('oy', 15, 1).plan.id, 'basic');
  assert.equal(cheapestMonth('oy', 10, 0).plan.id, 'start');
});

test('Oy, 50 documents, no payroll: Medium without payroll 139,00 € a month, 4 h, 2 015,60 € a year', () => {
  const q = year('oy', 50, 50, 0);
  assert.equal(q.low.plan.id, 'medium');
  assert.equal(q.low.noPayroll, true);
  assert.equal(q.low.totalCents, 13900);
  assert.equal(q.annualHalfHours, 8);
  assert.equal(q.totalCents, 201560);
});

test('Oy, 100 documents, no payroll: Large without payroll 239,00 € a month', () => {
  const m = cheapestMonth('oy', 100, 0);
  assert.equal(m.plan.id, 'large');
  assert.equal(m.totalCents, 23900);
});

test('the no-payroll price never applies once there is a payslip', () => {
  const m = cheapestMonth('oy', 50, 1);
  assert.equal(m.plan.id, 'medium');
  assert.equal(m.noPayroll, false);
  assert.equal(m.totalCents, 16500);
});

test('Oy, 50 documents, 2 employees: Medium, 4 h, 2 327,60 € a year', () => {
  const q = year('oy', 50, 50, 2);
  assert.equal(q.low.plan.id, 'medium');
  assert.equal(q.totalCents, 232760);
});

test('Oy, 100 documents, 4 employees: Large, 6,5 h, 4 128,85 € a year', () => {
  assert.equal(year('oy', 100, 100, 4).totalCents, 412885);
});

test('Oy, 50 ↔ 150 documents, 4 employees: cheapest plan each month, 4 133,65 € a year', () => {
  const q = year('oy', 50, 150, 4);
  assert.equal(q.low.plan.id, 'medium');
  assert.equal(q.low.totalCents, 19480);
  assert.equal(q.high.plan.id, 'large');
  assert.equal(q.high.totalCents, 40000);
  assert.equal(q.totalCents, 413365);
});

test('Oy annual hours stay inside the founder ranges (2–3, 3–5, 5–8 h)', () => {
  for (let d = 0; d <= 200; d++) {
    const hh = year('oy', d, d, 0).annualHalfHours;
    assert.ok(hh >= 4 && hh <= 16, `docs ${d}: ${hh / 2} h`);
  }
});

test('Oy without payroll, 20 documents: Start with 5 extra documents, 72,40 € a month', () => {
  const m = cheapestMonth('oy', 20, 0);
  assert.equal(m.plan.id, 'start');
  assert.equal(m.extraDocs, 5);
  assert.equal(m.totalCents, 7240);
});

test('above 200 documents in any month there is no list price', () => {
  assert.equal(yearQuote({ form: 'oy', docsLow: 20, docsHigh: 201, payroll: 1 }).kind, 'quote');
  assert.equal(yearQuote({ form: 'oy', docsLow: 200, docsHigh: 200, payroll: 1 }).kind, 'price');
});

test('card surcharge = the rate right above what the plan includes', () => {
  const byId = Object.fromEntries(PLANS.map((p) => [p.id, firstExtraDocCents(p)]));
  assert.deepEqual(byId, { toiminimi: 164, start: 250, basic: 250, medium: 212, large: 206 });
});

test('market reference: nearest profile of the same kind, none when far away', () => {
  assert.equal(nearestMarketProfile('oy', 20, 1).medianEur, 2066);
  assert.equal(nearestMarketProfile('tmi', 10, 0).medianEur, 1235);
  assert.equal(nearestMarketProfile('oy', 100, 4).medianEur, 5075);
  assert.equal(nearestMarketProfile('oy', 5, 0), null);
  assert.equal(nearestMarketProfile('tmi', 10, 1), null);
});
