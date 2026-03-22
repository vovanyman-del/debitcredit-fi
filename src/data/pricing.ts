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
    price: 34.90,
    period: 'month',
    extraVoucherPrice: 1.64,
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
    price: 55.00,
    period: 'month',
    extraVoucherPrice: 3.17,
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
    price: 93.50,
    period: 'month',
    extraVoucherPrice: 2.50,
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
    price: 165.00,
    period: 'month',
    extraVoucherPrice: 2.12,
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
    price: 297.00,
    period: 'month',
    extraVoucherPrice: 2.06,
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
    price: 544.50,
    period: 'month',
    extraVoucherPrice: 1.86,
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
    { name: 'Invoice creation', price: 8.90, unit: 'per invoice', note: 'creation, recording, email delivery' },
    { name: 'Bill payment', price: 8.90, unit: 'per bill', note: 'payment and recording' },
    { name: 'Employment contract (basic)', price: 10.90, unit: 'per contract' },
    { name: 'Employment contract (complex)', price: 65.00, unit: 'per hour', note: 'with deep Finnish employment law analysis' },
    { name: 'Salary calculation', price: 14.90, unit: 'per salary', note: 'monthly/hourly/piecework, all authority reports (Tulorekisteri)' },
    { name: 'Travel expense report', price: 10.90, unit: 'per report' },
    { name: 'Employment certificate', price: 10.90, unit: 'per certificate', note: 'for authorities or termination' },
    { name: 'Salary certificate', price: 10.90, unit: 'per certificate' },
    { name: 'Valttikortti (tax card)', price: 10.90, unit: 'per card' },
    { name: 'Valttikortti for other companies', price: 55.00, unit: 'per card' },
    { name: 'Shareholder meeting minutes', price: 16.40, unit: 'per document' },
    { name: 'Board meeting minutes', price: 16.40, unit: 'per document' },
    { name: 'One-time tax report', price: 38.40, unit: 'per report', note: 'monthly/quarterly/annual' },
    { name: 'Other accounting work', price: 65.00, unit: 'per hour' },
    { name: 'Explanatory work', price: 1.09, unit: 'per minute' },
    { name: 'Additional voucher', price: 3.30, unit: 'per voucher' },
  ],
  annualReports: [
    { name: 'Annual report \u2014 Toiminimi', price: 82.50, unit: 'from', note: 'financial statements + tax return' },
    { name: 'Annual report \u2014 Oy', price: 86.90, unit: 'per hour', note: 'financial statements + shareholder meeting minutes + tax return + pension/insurance forms + annual salary report' },
    { name: 'Annual report \u2014 Ry/Ky/Osuuskunta', price: 65.00, unit: 'per hour' },
  ],
  companyFormation: [
    { name: 'Register Toiminimi (sole trader)', price: 82.50, unit: 'from', note: 'registration form + PRH filing + tax/pension/employer registers' },
    { name: 'Register Oy (limited company)', price: 198.00, unit: 'from', note: 'name selection + articles of association + board minutes + registration + all registers + bank documents' },
    { name: 'Register Ry/Ky/Osuuskunta', price: 65.00, unit: 'per hour' },
  ],
  consulting: [
    { name: 'Business plan', price: 86.90, unit: 'per hour' },
    { name: 'Business plan (Finnvera/Business Finland)', price: 86.90, unit: 'per hour' },
    { name: 'Business consulting', price: 86.90, unit: 'per hour', note: 'growth strategy, cost optimization, company analysis' },
    { name: 'Tax consulting', price: 86.90, unit: 'per hour', note: 'legal tax optimization, salary/dividend planning' },
    { name: 'Interpreter/translator', price: 65.00, unit: 'per hour', note: 'assistance at authorities, document translation, phone calls' },
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
