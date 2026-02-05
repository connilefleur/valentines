/**
 * Vercel serverless function: only forwards to Discord if the token matches.
 * Keeps your Discord webhook URL secret. Set env vars: VALENTINES_TOKEN, DISCORD_WEBHOOK_URL.
 * Optional: ALLOWED_ORIGIN (defaults to GitHub Pages URL).
 */
const DEFAULT_ORIGIN = 'https://connilefleur.github.io';

function cors(res, method) {
  const origin = process.env.ALLOWED_ORIGIN || DEFAULT_ORIGIN;
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (method === 'OPTIONS') return res.status(204).end();
}

export default async function handler(req, res) {
  cors(res, req.method);
  if (req.method === 'OPTIONS') return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.VALENTINES_TOKEN;
  const webhook = process.env.DISCORD_WEBHOOK_URL;

  if (!secret || !webhook) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const token = (body.token || '').trim();
  if (!token || token !== secret) {
    return res.status(403).json({ error: 'Invalid token' });
  }

  try {
    const r = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: 'Someone opened your Valentines card' })
    });
    if (!r.ok) {
      return res.status(502).json({ error: 'Discord request failed' });
    }
  } catch (e) {
    return res.status(502).json({ error: 'Discord request failed' });
  }

  return res.status(200).json({ ok: true });
}
