export interface Package {
  id: string;
  price: number;
  period: string;
  extraVoucherPrice?: number;
  vouchers?: string;
  target: string;
  features: string[];
}

export interface AdditionalService {
  name: string;
  price: number;
  unit: string;
  note?: string;
}

export const packages: Package[] = [
  {
    id: 'micro',
    price: 28,
    period: 'month',
    extraVoucherPrice: 1.31,
    vouchers: '1\u201310',
    target: 'Toiminimi (simplified reporting)',
    features: [
      'Simplified bookkeeping (yksinkertainen kirjanpito)',
      '1\u201310 payment transactions per month',
      'Monthly VAT returns to tax authorities',
      'Monthly financial report for you',
    ],
  },
  {
    id: 'mini',
    price: 44,
    period: 'month',
    extraVoucherPrice: 2.53,
    vouchers: '1\u201310',
    target: 'Toiminimi (double-entry) / small Oy',
    features: [
      'Double-entry bookkeeping (kahdenkertainen kirjanpito)',
      '1\u201310 payment transactions per month',
      'Monthly VAT returns',
      'Tax payments from owner account',
      'Monthly pension fund reports',
      'Monthly financial report for you',
    ],
  },
  {
    id: 'basic',
    price: 75,
    period: 'month',
    extraVoucherPrice: 1.99,
    vouchers: '10\u201320',
    target: 'Toiminimi / small Oy with invoicing + 1 salary',
    features: [
      'Double-entry bookkeeping',
      '10\u201320 payment transactions per month',
      '1 salary calculation included',
      'Monthly VAT + pension + employer reports',
      'Tax payments from owner account',
      'Monthly financial report',
      '10 minutes free consultation',
    ],
  },
  {
    id: 'medium',
    price: 132,
    period: 'month',
    extraVoucherPrice: 1.69,
    vouchers: '20\u201350',
    target: 'Toiminimi / small-medium Oy (5\u201315 invoices/month, 2\u20134 salaries)',
    features: [
      'Double-entry bookkeeping',
      '20\u201350 payment transactions per month',
      '2 salary calculations included',
      'Monthly VAT + pension + employer reports',
      'Monthly financial report',
      '20 minutes free consultation',
    ],
  },
  {
    id: 'large',
    price: 237,
    period: 'month',
    extraVoucherPrice: 1.64,
    vouchers: '50\u2013100',
    target: 'Medium Oy (20\u201340 invoices/month, 30\u201350 expenses, ~5 salaries)',
    features: [
      'Double-entry bookkeeping',
      '50\u2013100 payment transactions per month',
      '4 salary calculations included',
      'Monthly VAT + pension + employer reports',
      'Monthly financial report',
      '40 minutes free consultation',
    ],
  },
  {
    id: 'maxi',
    price: 434,
    period: 'month',
    extraVoucherPrice: 1.48,
    vouchers: '100\u2013200',
    target: 'Medium-large Oy (30\u201380 invoices, 70\u2013100 expenses, ~10 salaries)',
    features: [
      'Double-entry bookkeeping',
      '100\u2013200 payment transactions per month',
      '8 salary calculations included',
      'Monthly VAT + pension + employer reports',
      'Monthly financial report',
      '90 minutes free consultation',
    ],
  },
  {
    id: 'custom',
    price: 0,
    period: 'custom',
    target: 'Any company with unique needs',
    features: ['Tailored to your exact requirements'],
  },
];

export const additionalServices = {
  accounting: [
    { name: 'Invoice creation', price: 7.09, unit: 'per invoice', note: 'creation, recording, email delivery' },
    { name: 'Bill payment', price: 7.09, unit: 'per bill', note: 'payment and recording' },
    { name: 'Employment contract (basic)', price: 8.69, unit: 'per contract' },
    { name: 'Employment contract (complex)', price: 52, unit: 'per hour', note: 'with deep Finnish employment law analysis' },
    { name: 'Salary calculation', price: 11.87, unit: 'per salary', note: 'monthly/hourly/piecework, all authority reports (Tulorekisteri)' },
    { name: 'Travel expense report', price: 8.69, unit: 'per report' },
    { name: 'Employment certificate', price: 8.69, unit: 'per certificate', note: 'for authorities or termination' },
    { name: 'Salary certificate', price: 8.69, unit: 'per certificate' },
    { name: 'Valttikortti (tax card)', price: 8.69, unit: 'per card' },
    { name: 'Valttikortti for other companies', price: 44, unit: 'per card' },
    { name: 'Shareholder meeting minutes', price: 13.07, unit: 'per document' },
    { name: 'Board meeting minutes', price: 13.07, unit: 'per document' },
    { name: 'One-time tax report', price: 30.60, unit: 'per report', note: 'monthly/quarterly/annual' },
    { name: 'Other accounting work', price: 52, unit: 'per hour' },
    { name: 'Explanatory work', price: 0.87, unit: 'per minute' },
    { name: 'Additional voucher', price: 2.63, unit: 'per voucher' },
  ],
  annualReports: [
    { name: 'Annual report \u2014 Toiminimi', price: 66, unit: 'from', note: 'financial statements + tax return' },
    { name: 'Annual report \u2014 Oy', price: 69, unit: 'per hour', note: 'financial statements + shareholder meeting minutes + tax return + pension/insurance forms + annual salary report' },
    { name: 'Annual report \u2014 Ry/Ky/Osuuskunta', price: 52, unit: 'per hour' },
  ],
  companyFormation: [
    { name: 'Register Toiminimi (sole trader)', price: 66, unit: 'from', note: 'registration form + PRH filing + tax/pension/employer registers' },
    { name: 'Register Oy (limited company)', price: 158, unit: 'from', note: 'name selection + articles of association + board minutes + registration + all registers + bank documents' },
    { name: 'Register Ry/Ky/Osuuskunta', price: 52, unit: 'per hour' },
  ],
  consulting: [
    { name: 'Business plan', price: 69, unit: 'per hour' },
    { name: 'Business plan (Finnvera/Business Finland)', price: 69, unit: 'per hour' },
    { name: 'Business consulting', price: 69, unit: 'per hour', note: 'growth strategy, cost optimization, company analysis' },
    { name: 'Tax consulting', price: 69, unit: 'per hour', note: 'legal tax optimization, salary/dividend planning' },
    { name: 'Interpreter/translator', price: 52, unit: 'per hour', note: 'assistance at authorities, document translation, phone calls' },
  ],
};

export const company = {
  name: 'Tilitoimisto Debit Credit',
  ytunnus: '3512702-8',
  phone: '+358 40 710 9702',
  email: 'vladimir@debitcredit.fi',
  address: 'Haapaniemenkatu 7-9 B, 16. krs, 00530 Helsinki',
  founder: 'Vladimir Nyman',
  clientCount: '70+',
  vaavo: {
    web: 'https://vaavo.fi',
    app: 'https://vaavo.app',
  },
  social: {
    whatsapp: 'https://wa.me/358407109702',
    telegram: 'https://t.me/debitcredit',
    facebook: 'https://facebook.com/Debit-Credit-1869709246618006/',
    linkedin: 'https://linkedin.com/in/vladimir-serov-966747104/',
  },
};
