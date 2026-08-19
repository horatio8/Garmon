// Serverless proxy for form submissions from togetherwithgarmon.com.
// Receives JSON from the browser, writes to the appropriate table in the
// "Garmon SC115" Airtable base using the AIRTABLE_TOKEN Vercel env var.
// Campaign Nucleus receivers are still called directly from the browser
// (fire-and-forget) — this endpoint only handles Airtable.

const AIRTABLE_BASE = 'appdWdM8y8JcFiID9';
const TABLES = {
  pledge:    'tblFAL4se5uOeVFDE',
  contact:   'tblKA6LNMcBkjTpE3',
  volunteer: 'tblJ1ZV1ZkaiMItRO',
};

const PLEDGE_LOCATION = {
  Location_folly:    'Folly Beach',
  Location_Johns:    'Johns Island',
  Location_James:    'James Island',
  Location_Kiawah:   'Kiawah Island',
  Location_Seabrook: 'Seabrook Island',
};

const PLEDGE_INTEREST = {
  homeevent:     'Host event',
  Yardsign:      'Yard sign',
  donorprospect: 'Donor prospect',
  doorknocking:  'Door knocking',
  admin:         'Admin',
};

const CONTACT_SUBJECT = {
  general:   'General question',
  press:     'Press inquiry',
  volunteer: 'Volunteer',
  event:     'Event hosting',
};

// Volunteer form uses either the site's option keys (door/phone/…) or the
// pre-mapped receiver values (Doorknocking/phonebanking/…). Both resolve here.
const VOLUNTEER_INTEREST = {
  door:  'Door knocking',  Doorknocking: 'Door knocking',
  phone: 'Phone banking',  phonebanking: 'Phone banking',
  yard:  'Yard sign',      yardsign:     'Yard sign',
  host:  'Host event',     HostEvent:    'Host event',
  data:  'Data entry',     DataEntry:    'Data entry',
  drive: 'Drive seniors',  DriveSeniors: 'Drive seniors',
  other: 'Other',          Other:        'Other',
};

const firstDefined = (...vs) => vs.find(v => v !== undefined && v !== null && v !== '');
const toArray = v => (Array.isArray(v) ? v : v == null ? [] : [v]);
const mapList = (list, map) => toArray(list).map(k => map[k]).filter(Boolean);

function fieldsForType(type, p) {
  const submittedAt = new Date().toISOString();
  const rawPayload = JSON.stringify(p);

  if (type === 'pledge') {
    const first = (p.first_name || '').trim();
    const last  = (p.last_name  || '').trim();
    const name  = [first, last].filter(Boolean).join(' ') || p.email || 'Anonymous';
    return {
      'Name':         name,
      'First Name':   first || undefined,
      'Last Name':    last  || undefined,
      'Email':        p.email || undefined,
      'Phone':        p.phone || undefined,
      'Location':     PLEDGE_LOCATION[p.Location || p.location],
      'Interests':    mapList(p.Volunteer || p.interests, PLEDGE_INTEREST),
      'Source':       p.source || 'petition',
      'Submitted At': submittedAt,
      'Raw Payload':  rawPayload,
    };
  }
  if (type === 'contact') {
    return {
      'Name':         firstDefined(p.full_name, p.name, 'Anonymous'),
      'Email':        p.email || undefined,
      'Subject':      CONTACT_SUBJECT[p.subject] || undefined,
      'Message':      p.message || undefined,
      'Submitted At': submittedAt,
      'Raw Payload':  rawPayload,
    };
  }
  if (type === 'volunteer') {
    return {
      'Name':          firstDefined(p.full_name, p.name, 'Anonymous'),
      'Email':         p.email || undefined,
      'Phone':         p.phone || undefined,
      'Zip':           p.zip || undefined,
      'Interests':     mapList(p.interests, VOLUNTEER_INTEREST),
      'Anything Else': p.anything_else || p.notes || undefined,
      'Submitted At':  submittedAt,
      'Raw Payload':   rawPayload,
    };
  }
  return null;
}

function stripUndefined(o) {
  const out = {};
  for (const k of Object.keys(o)) if (o[k] !== undefined) out[k] = o[k];
  return out;
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).end();
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  let payload = req.body;
  if (typeof payload === 'string') {
    try { payload = JSON.parse(payload); }
    catch { res.status(400).json({ error: 'invalid_json' }); return; }
  }
  if (!payload || typeof payload !== 'object') {
    res.status(400).json({ error: 'empty_body' });
    return;
  }

  const type = payload.form_type;
  const tableId = TABLES[type];
  if (!tableId) {
    res.status(400).json({ error: 'unknown_form_type', got: type, expected: Object.keys(TABLES) });
    return;
  }

  const token = process.env.AIRTABLE_TOKEN;
  if (!token) {
    res.status(500).json({ error: 'not_configured', hint: 'Set AIRTABLE_TOKEN env var in Vercel (Personal Access Token with data.records:write on this base).' });
    return;
  }

  const fields = stripUndefined(fieldsForType(type, payload));

  try {
    const r = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${tableId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields, typecast: true }),
    });
    if (!r.ok) {
      const text = await r.text().catch(() => '');
      console.error('Airtable', r.status, text);
      res.status(502).json({ error: 'airtable_failed', status: r.status });
      return;
    }
    res.status(204).end();
  } catch (err) {
    console.error('Airtable fetch failed', err && err.message);
    res.status(502).json({ error: 'airtable_unreachable' });
  }
};
