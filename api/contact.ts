import type { VercelRequest, VercelResponse } from '@vercel/node';

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY ?? '';
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN ?? '';
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'vladimir@debitcredit.fi';

// Simple in-memory rate limiting (per serverless instance)
const rateMap = new Map<string, number[]>();
const RATE_LIMIT = 5; // max requests per window
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateMap.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  rateMap.set(ip, timestamps);
  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const ip =
    (Array.isArray(req.headers['x-forwarded-for'])
      ? req.headers['x-forwarded-for'][0]
      : req.headers['x-forwarded-for']?.split(',')[0]) ??
    req.socket?.remoteAddress ??
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const { name, email, phone, company, message, _gotcha } = req.body ?? {};

  // Honeypot — bots fill hidden fields
  if (_gotcha) {
    // Pretend success to the bot
    return res.status(200).json({ ok: true });
  }

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, message' });
  }

  if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
    console.error('MAILGUN_API_KEY or MAILGUN_DOMAIN not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  // Build Mailgun payload
  const form = new URLSearchParams();
  form.append('from', `Debit Credit Website <noreply@${MAILGUN_DOMAIN}>`);
  form.append('to', TO_EMAIL);
  form.append('subject', `Yhteydenotto: ${name}`);
  form.append('h:Reply-To', email);
  form.append(
    'text',
    [
      `Nimi: ${name}`,
      `Sähköposti: ${email}`,
      phone ? `Puhelin: ${phone}` : '',
      company ? `Yritys: ${company}` : '',
      '',
      `Viesti:`,
      message,
    ]
      .filter(Boolean)
      .join('\n'),
  );

  try {
    const mgRes = await fetch(`https://api.eu.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${MAILGUN_API_KEY}`).toString('base64')}`,
      },
      body: form,
    });

    if (!mgRes.ok) {
      const text = await mgRes.text();
      console.error('Mailgun error:', mgRes.status, text);
      return res.status(502).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
