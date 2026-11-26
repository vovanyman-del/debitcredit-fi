// Check figures for the /hinnasto calculator: `node --test scripts/pricing-v3.test.mjs`.
// Expected values come from vaavo-wt/plans/market/pricing-v3.md (§1 table, §5 check numbers).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { yearQuote, cheapestMonth, firstExtraDocCents, nearestMarketProfile, PLANS } from '../src/data/pricingV3.ts';

const year = (form, docsLow, docsHigh, payroll) => {
  const q = yearQuote({ form, docsLow, docsHigh, payroll });
  assert.equal(q.kind, 'price');
  return q;
};

test('tmi, 10 documents, no payroll: 652,60 € a year (Toiminimi + 2 h)', () => {
  const q = year('tmi', 10, 10, 0);
  assert.equal(q.low.plan.id, 'toiminimi');
  assert.equal(q.annualHalfHours, 4);
  assert.equal(q.totalCents, 65260);
});

test('tmi, 15 documents: 652,60 € a year, nothing extra', () => {
  assert.equal(year('tmi', 15, 15, 0).totalCents, 65260);
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

test('Oy, 50 documents, no payroll: Medium without payroll 139,00 € a month, 2 145,95 € a year', () => {
  const q = year('oy', 50, 50, 0);
  assert.equal(q.low.plan.id, 'medium');
  assert.equal(q.low.noPayroll, true);
  assert.equal(q.low.totalCents, 13900);
  assert.equal(q.totalCents, 214595);
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

test('Oy, 50 documents, 2 employees: Medium, 2 457,95 € a year', () => {
  const q = year('oy', 50, 50, 2);
  assert.equal(q.low.plan.id, 'medium');
  assert.equal(q.totalCents, 245795);
});

test('Oy, 100 documents, 4 employees: Large, 4 128,85 € a year', () => {
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

test('the first employee moves an Oy without payroll from Start to Basic', () => {
  assert.equal(cheapestMonth('oy', 10, 0).plan.id, 'start');
  assert.equal(cheapestMonth('oy', 10, 1).plan.id, 'basic');
  assert.equal(cheapestMonth('tmi', 10, 1).plan.id, 'basic');
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
