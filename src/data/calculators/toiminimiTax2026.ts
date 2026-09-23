// Estimate of a sole trader's (toiminimi) 2026 income taxes and YEL contributions.
//
// Parameters verified 23 Sep 2026, verbatim, against primary sources:
// - vero.fi "Ansiotulot" (state income tax schedule 2026): 0–22 000 → 0,00 + 12,64 %;
//   22 000–32 600 → 2 780,80 + 19,00 %; 32 600–40 100 → 4 794,80 + 30,25 %;
//   40 100–52 100 → 7 063,55 + 33,25 %; 52 100– → 11 053,55 + 37,50 %.
// - Verohallinnon päätös VH/5046/00.01.00/2025 (20.11.2025), laskentaperusteet 2026:
//   yrittäjävähennys "viiden prosentin suuruisena"; perusvähennys "4 265 euroa pienennettynä
//   18 prosentilla tämän ylimenevästä tulosta", in BOTH state and municipal taxation (vero.fi
//   syventävä ohje 49038: "Valtionverotuksen ja kunnallisverotuksen veropohjat on yhtenäistetty
//   1.1.2023 alkaen ja vähennykset lasketaan sekä valtion- että kunnallisverotuksessa samalla
//   tavalla"; "Ennen perusvähennystä tehdään kaikki muut vähennykset"; the 2026 changes page still
//   calls it "kunnallisverotuksen perusvähennys" — legacy wording, corrected after review 23.9.2026);
//   työtulovähennys "18,0 prosenttia", "enimmäismäärä ... 3 430 euroa", "puhtaan ansiotulon
//   ylittäessä 35 000 euroa vähennyksen määrä pienenee 2,00 prosentilla ... 50 550 euroon saakka",
//   deducted from state tax first, the excess "kunnallisverosta, sairausvakuutuksen
//   sairaanhoitomaksusta ja kirkollisverosta näiden verojen suhteessa" (also TVL 125 §);
//   sairaanhoitomaksu "(1,10 %)", for YEL-insured the YEL income replaces business income in its
//   base; päivärahamaksu "(0,88 %)", not levied "jos vuotuisen palkka- ja yrittäjätulon
//   yhteismäärä alittaa 17 255 euroa"; "YEL-vakuutetulle 18–68-vuotiaalle ... korotettu
//   päivärahamaksu ... (0,23 %) ... YEL-työtulosta"; päivärahamaksu "vähennetään puhtaasta
//   ansiotulosta" (so puhdas ansiotulo is taken BEFORE it — TVL 30 § and 96 §); yleisradiovero
//   "2,5 prosenttia ... puhtaiden ansio- ja pääomatulojen yhteismäärän tai sitä suuremman YEL- ... työtulon ... 15 150 euroa ylittävästä osasta",
//   "enintään 160 euroa". Ansiotulovähennys was repealed from 1.1.2025.
// - Kuntien ja seurakuntien tuloveroprosentit 2026 (VH/6585/00.01.00/2025): "kuntien
//   keskimääräinen tuloveroprosentti on 7,60".
// - Eläketurvakeskus "Työeläkemaksut vuonna 2026": YEL 24,4 % for all age groups;
//   "Aloittavan yrittäjän alennus on 22 prosenttia maksusta neljä vuotta". Varma "YEL in 2026":
//   minimum YEL income "EUR 9,423.09", upper limit "EUR 214,000.00".
//
// Simplifications (stated on the page): no other income, no capital-income share (net assets 0),
// YEL contributions deducted in the business result, age 18–64, no children, full tax year in
// mainland Finland (Åland has its own scale, basic deduction and media fee), no other deductions.

export const TAX_2026 = {
  stateScale: [
    // [lower limit €, tax at the lower limit €, marginal rate]
    [0, 0, 0.1264],
    [22000, 2780.8, 0.19],
    [32600, 4794.8, 0.3025],
    [40100, 7063.55, 0.3325],
    [52100, 11053.55, 0.375],
  ] as const,
  entrepreneurDeductionRate: 0.05,
  basicDeductionMax: 4265,
  basicDeductionTaper: 0.18,
  workDeductionRate: 0.18,
  workDeductionMax: 3430,
  workDeductionTaperFrom: 35000,
  workDeductionTaperTo: 50550,
  workDeductionTaperRate: 0.02,
  healthCareRate: 0.011,
  dailyAllowanceRate: 0.0088,
  dailyAllowanceYelExtraRate: 0.0023,
  dailyAllowanceThreshold: 17255,
  yleRate: 0.025,
  yleThreshold: 15150,
  yleMax: 160,
  yelRate: 0.244,
  yelStarterDiscount: 0.22,
  yelMinIncome: 9423.09,
  yelMaxIncome: 214000,
  averageMunicipalRate: 7.6,
} as const;

export interface ToiminimiTaxInput {
  /** Business profit for the year before the owner's own YEL, € (revenue − expenses, excl. VAT). */
  profit: number;
  /** Confirmed YEL income (YEL-työtulo), €/year; 0 = no YEL insurance. */
  yelIncome: number;
  /** First-time entrepreneur: 22 % YEL discount for the first 48 months. */
  starter: boolean;
  /** Municipal income tax rate, % (e.g. 7.6). */
  municipalRate: number;
  /** Church tax rate, % (0 if not a member). */
  churchRate: number;
}

export interface ToiminimiTaxResult {
  yelInsured: boolean;
  yel: number;
  businessIncome: number;
  entrepreneurDeduction: number;
  earnedIncome: number;
  /** Puhdas ansiotulo (before the daily allowance contribution is deducted from it). */
  netEarnedIncome: number;
  /** Verotettava ansiotulo — the same in state and municipal taxation since 2023. */
  taxableIncome: number;
  stateTax: number;
  workIncomeDeduction: number;
  municipalTax: number;
  churchTax: number;
  healthCare: number;
  dailyAllowance: number;
  yleTax: number;
  totalTaxes: number;
  totalTaxesAndYel: number;
  netYear: number;
  netMonth: number;
  shareOfProfit: number;
}

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));
const num = (x: number) => (Number.isFinite(x) ? x : 0);

export function stateTax2026(taxable: number): number {
  const x = Math.max(0, taxable);
  let row: readonly number[] = TAX_2026.stateScale[0];
  for (const r of TAX_2026.stateScale) if (x >= r[0]) row = r;
  return row[1] + (x - row[0]) * row[2];
}

export function basicDeduction2026(netEarned: number): number {
  const x = Math.max(0, netEarned);
  const max = TAX_2026.basicDeductionMax;
  if (x <= max) return x;
  return Math.max(0, max - TAX_2026.basicDeductionTaper * (x - max));
}

export function calculateToiminimiTax2026(raw: ToiminimiTaxInput): ToiminimiTaxResult {
  const T = TAX_2026;
  const profit = Math.max(0, num(raw.profit));
  const yelIncome = clamp(num(raw.yelIncome), 0, T.yelMaxIncome);
  const municipalRate = clamp(num(raw.municipalRate), 0, 15) / 100;
  const churchRate = clamp(num(raw.churchRate), 0, 3) / 100;

  // YEL is compulsory from the minimum YEL income upwards; below it there is no insurance here.
  const yelInsured = yelIncome >= T.yelMinIncome;
  const yel = yelInsured ? yelIncome * T.yelRate * (raw.starter ? 1 - T.yelStarterDiscount : 1) : 0;

  // YEL deducted in the business result; 5 % entrepreneur deduction; all earned income (net assets 0).
  const businessIncome = Math.max(0, profit - yel);
  const entrepreneurDeduction = businessIncome * T.entrepreneurDeductionRate;
  const earnedIncome = businessIncome - entrepreneurDeduction;

  // Daily allowance contribution: base is the YEL income for a YEL-insured entrepreneur.
  const dailyAllowance = yelInsured
    ? yelIncome * (T.dailyAllowanceYelExtraRate + (yelIncome >= T.dailyAllowanceThreshold ? T.dailyAllowanceRate : 0))
    : 0;
  // Puhdas ansiotulo; the daily allowance contribution is deducted from it, then the basic deduction.
  // State and municipal taxation use the same taxable income (tax bases unified 1.1.2023).
  const netEarnedIncome = earnedIncome;
  const afterDeductions = Math.max(0, netEarnedIncome - dailyAllowance);
  const taxableIncome = Math.max(0, afterDeductions - basicDeduction2026(afterDeductions));

  const stateBefore = stateTax2026(taxableIncome);
  let municipalTax = taxableIncome * municipalRate;
  let churchTax = taxableIncome * churchRate;

  // Health care contribution: YEL income replaces the business income in its base.
  const healthBase = yelInsured ? Math.max(0, yelIncome - dailyAllowance) : afterDeductions;
  let healthCare = Math.max(0, healthBase - basicDeduction2026(healthBase)) * T.healthCareRate;

  // Work income deduction: state tax first, the excess from municipal tax, health care and church tax.
  const taper = clamp(netEarnedIncome - T.workDeductionTaperFrom, 0, T.workDeductionTaperTo - T.workDeductionTaperFrom);
  const workIncomeDeduction = Math.max(0, Math.min(earnedIncome * T.workDeductionRate, T.workDeductionMax) - taper * T.workDeductionTaperRate);
  const stateTax = Math.max(0, stateBefore - workIncomeDeduction);
  const leftover = Math.max(0, workIncomeDeduction - stateBefore);
  const others = municipalTax + healthCare + churchTax;
  if (leftover > 0 && others > 0) {
    const keep = Math.max(0, 1 - leftover / others);
    municipalTax *= keep;
    healthCare *= keep;
    churchTax *= keep;
  }

  const yleBase = Math.max(netEarnedIncome, yelInsured ? yelIncome : 0);
  const yleTax = Math.min(T.yleMax, Math.max(0, (yleBase - T.yleThreshold) * T.yleRate));

  const totalTaxes = stateTax + municipalTax + churchTax + healthCare + dailyAllowance + yleTax;
  const totalTaxesAndYel = totalTaxes + yel;
  const netYear = profit - totalTaxesAndYel;
  return {
    yelInsured,
    yel,
    businessIncome,
    entrepreneurDeduction,
    earnedIncome,
    netEarnedIncome,
    taxableIncome,
    stateTax,
    workIncomeDeduction,
    municipalTax,
    churchTax,
    healthCare,
    dailyAllowance,
    yleTax,
    totalTaxes,
    totalTaxesAndYel,
    netYear,
    netMonth: netYear / 12,
    shareOfProfit: profit > 0 ? totalTaxesAndYel / profit : 0,
  };
}
