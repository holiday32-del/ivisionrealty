const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8' }
});

function splitName(full = '') {
  const parts = String(full).trim().split(/\s+/).filter(Boolean);
  return { first: parts.shift() || '', last: parts.join(' ') || '' };
}

export async function onRequestPost(context) {
  try {
    const env = context.env || {};
    const required = ['KW_API_BASE_URL', 'KW_API_KEY', 'KW_ACCESS_TOKEN'];
    const missing = required.filter((key) => !env[key]);
    if (missing.length) return json({ error: 'Lead service is not configured.' }, 503);

    const body = await context.request.json();
    const { first, last } = splitName(body.name);
    if (!first || !body.email || !body.interest) return json({ error: 'Name, email and interest are required.' }, 400);

    // Fields below are isolated here so they can be adjusted to the exact schema
    // enabled for the user's KW DevHub app without touching the public website.
    const kwContact = {
      first_name: first,
      last_name: last,
      email: body.email,
      phone: body.phone || undefined,
      source: body.source || 'iVisionRealty.com',
      notes: [`Website inquiry: ${body.interest}`, body.message ? `Message: ${body.message}` : ''].filter(Boolean).join('\n')
    };

    const base = String(env.KW_API_BASE_URL).replace(/\/$/, '');
    const r = await fetch(`${base}/v3/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.KW_ACCESS_TOKEN}`,
        'API-Key': env.KW_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(kwContact)
    });
    const text = await r.text();
    let data = {};
    try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }

    if (!r.ok) {
      console.error('KW contact creation failed', r.status, data);
      return json({ error: r.status === 401 ? 'CRM authorization needs renewal.' : 'CRM could not accept the lead.' }, 502);
    }
    return json({ ok: true, id: data.id || data.contact_id || null });
  } catch (err) {
    console.error(err);
    return json({ error: 'Unable to submit lead.' }, 500);
  }
}
