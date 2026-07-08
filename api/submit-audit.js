// Receives free-audit form submissions and forwards them to the Google Sheets
// webhook. The webhook URL lives only in the GOOGLE_SHEETS_WEBHOOK_URL env var
// on the server — it must never be referenced from client-side code.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(body, key, max) {
  const value = body ? body[key] : '';
  return typeof value === 'string' ? value.trim().slice(0, max || 300) : '';
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = null; }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ ok: false, error: 'Invalid request body.' });
  }

  // Honeypot: humans never see this field. Answer with a normal success so
  // bots can't tell they were filtered.
  if (field(body, 'website')) {
    return res.status(200).json({ ok: true });
  }

  const name = field(body, 'name');
  const business = field(body, 'business');
  const email = field(body, 'email');
  const phone = field(body, 'phone', 50);
  const source = field(body, 'source', 100) || 'direct';

  if (!name || !business || !email) {
    return res.status(400).json({ ok: false, error: 'Full name, business name and email are required.' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'Enter a valid email address.' });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('submit-audit: GOOGLE_SHEETS_WEBHOOK_URL is not set');
    return res.status(500).json({ ok: false, error: 'The form is not configured yet.' });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, business, email, phone, source })
    });
    if (!response.ok) {
      console.error('submit-audit: webhook responded ' + response.status);
      return res.status(502).json({ ok: false, error: 'Could not save your request. Please try again.' });
    }
  } catch (err) {
    console.error('submit-audit: webhook request failed', err);
    return res.status(502).json({ ok: false, error: 'Could not save your request. Please try again.' });
  }

  return res.status(200).json({ ok: true });
};
