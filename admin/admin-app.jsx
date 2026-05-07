/* global React, ReactDOM */
const { useState, useEffect, useCallback, useMemo, useRef, Fragment } = React;

const sb = window.SB;
const HAS_SUPABASE = !!window.HAS_SUPABASE;

/* ─────────────────────────────────────────────────────────────
   UI primitives
   ───────────────────────────────────────────────────────────── */

function Toast({ msg, kind, onClose }) {
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [msg, onClose]);
  if (!msg) return null;
  return <div className={'a-toast' + (kind === 'bad' ? ' bad' : '')}>{msg}</div>;
}

function Modal({ open, title, onClose, children, wide }) {
  if (!open) return null;
  return (
    <div className="a-modal-back" onClick={onClose}>
      <div className="a-modal" style={wide ? { maxWidth: 920 } : null} onClick={e => e.stopPropagation()}>
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </div>
  );
}

function Field({ label, hint, children, wide }) {
  return (
    <label className="a-field" style={wide ? { gridColumn: '1 / -1' } : null}>
      {label && <span>{label}</span>}
      {children}
      {hint && <span className="hint">{hint}</span>}
    </label>
  );
}

function Confirm({ open, title, body, danger, confirmLabel = 'Confirm', onConfirm, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p style={{ color: 'var(--a-ink-2)' }}>{body}</p>
      <div className="a-row" style={{ marginTop: 18, justifyContent: 'flex-end' }}>
        <button className="a-btn secondary" onClick={onClose}>Cancel</button>
        <button className={'a-btn ' + (danger ? 'danger' : '')} onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </Modal>
  );
}

/* Image picker: paste a URL or upload to Supabase Storage 'media' bucket. */
function ImagePicker({ value, onChange, onError }) {
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(null);

  const upload = async (file) => {
    if (!sb) { onError('Supabase not configured.'); return; }
    setBusy(true);
    try {
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await sb.storage.from('media').upload(path, file, { contentType: file.type, upsert: false });
      if (error) throw error;
      const { data } = sb.storage.from('media').getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (err) {
      onError(err.message || 'Upload failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="a-img-pick">
        {value ? <img src={value} alt="" className="a-img-thumb" /> : <div className="a-img-thumb" style={{ background: 'rgba(0,0,0,0.04)' }} />}
        <input value={value || ''} onChange={e => onChange(e.target.value)} placeholder="https://… or assets/file.jpg" style={{ flex: 1, minWidth: 0 }} />
        <button type="button" className="a-btn secondary small" disabled={busy} onClick={() => fileRef.current && fileRef.current.click()}>
          {busy ? 'Uploading…' : 'Upload'}
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={e => e.target.files[0] && upload(e.target.files[0])} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Auth
   ───────────────────────────────────────────────────────────── */

function LoginScreen({ onSent }) {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [sent, setSent] = useState(false);

  const send = async (e) => {
    e.preventDefault();
    if (!email) return;
    setBusy(true); setErr('');
    try {
      const { error } = await sb.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin + '/admin' },
      });
      if (error) throw error;
      setSent(true);
      onSent && onSent(email);
    } catch (e) {
      setErr(e.message || 'Could not send the link.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="a-login">
      <div className="a-card">
        <h1>Together with Garmon — Admin</h1>
        <p className="a-muted">Magic-link sign-in. Only emails listed in <code className="a-code">admin_users</code> can edit the site.</p>
        {sent ? (
          <div style={{ marginTop: 24, padding: 16, background: 'rgba(31,122,79,0.08)', borderRadius: 6, color: 'var(--a-good)', fontSize: 14 }}>
            Check <strong>{email}</strong> for a sign-in link. You can close this tab; the link will bring you back here.
          </div>
        ) : (
          <form onSubmit={send} style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Field label="Email">
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@campaign.com" autoFocus />
            </Field>
            {err && <div style={{ color: 'var(--a-bad)', fontSize: 13 }}>{err}</div>}
            <button className="a-btn" type="submit" disabled={busy}>{busy ? 'Sending…' : 'Send magic link'}</button>
          </form>
        )}
      </div>
    </div>
  );
}

function SetupScreen() {
  return (
    <div className="a-login">
      <div className="a-card">
        <h1>CMS not configured</h1>
        <p className="a-muted">
          Drop your Supabase project URL and anon (public) key into <code className="a-code">config.js</code>,
          then reload this page. The schema lives in <code className="a-code">supabase/schema.sql</code> and the
          starter content in <code className="a-code">supabase/seed.sql</code>.
        </p>
        <p className="a-muted" style={{ marginTop: 14 }}>
          Once configured, add yourself to the <code className="a-code">admin_users</code> table:
        </p>
        <pre className="a-code" style={{ display: 'block', padding: 12, marginTop: 6, background: 'rgba(0,0,0,0.04)', borderRadius: 4, fontSize: 12, whiteSpace: 'pre-wrap' }}>
{`insert into admin_users (email)
values ('you@campaign.com');`}
        </pre>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Generic CRUD helper
   ───────────────────────────────────────────────────────────── */

function useTable(name, orderBy = 'sort_order') {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const load = useCallback(async () => {
    setLoading(true); setErr('');
    const { data, error } = await sb.from(name).select('*').order(orderBy, { ascending: true });
    if (error) setErr(error.message); else setRows(data || []);
    setLoading(false);
  }, [name, orderBy]);

  useEffect(() => { load(); }, [load]);

  const upsert = async (row) => {
    const { error } = row.id
      ? await sb.from(name).update(row).eq('id', row.id)
      : await sb.from(name).insert([row]);
    if (error) throw error;
    await load();
  };
  const remove = async (id) => {
    const { error } = await sb.from(name).delete().eq('id', id);
    if (error) throw error;
    await load();
  };
  return { rows, loading, err, reload: load, upsert, remove };
}

/* ─────────────────────────────────────────────────────────────
   Editors
   ───────────────────────────────────────────────────────────── */

function SettingsEditor({ toast }) {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    sb.from('site_settings').select('data').eq('id', 1).maybeSingle().then(({ data, error }) => {
      if (error) toast(error.message, 'bad');
      const baked = (window.SITE_DEFAULTS && window.SITE_DEFAULTS.settings) || {};
      setData({ ...baked, ...((data && data.data) || {}) });
    });
  }, []);

  const set = (k, v) => setData(d => ({ ...d, [k]: v }));

  const save = async () => {
    setSaving(true);
    const { error } = await sb.from('site_settings').update({ data, updated_at: new Date().toISOString() }).eq('id', 1);
    setSaving(false);
    if (error) toast(error.message, 'bad'); else toast('Settings saved.');
  };

  if (!data) return <div className="a-empty">Loading settings…</div>;

  const T = (k, label, hint) => (
    <Field label={label} hint={hint}><input value={data[k] || ''} onChange={e => set(k, e.target.value)} /></Field>
  );
  const N = (k, label, hint) => (
    <Field label={label} hint={hint}><input type="number" value={data[k] ?? ''} onChange={e => set(k, e.target.value === '' ? null : Number(e.target.value))} /></Field>
  );
  const TA = (k, label, hint) => (
    <Field label={label} hint={hint} wide><textarea rows="3" value={data[k] || ''} onChange={e => set(k, e.target.value)} /></Field>
  );
  const IMG = (k, label) => (
    <Field label={label} wide><ImagePicker value={data[k]} onChange={v => set(k, v)} onError={m => toast(m, 'bad')} /></Field>
  );

  return (
    <>
      <div className="a-h">
        <div>
          <h1>Site settings</h1>
          <p>Headline-level copy, dates, counters, and contact info.</p>
        </div>
        <button className="a-btn" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save settings'}</button>
      </div>

      <div className="a-card">
        <h2>Branding & messaging</h2>
        <div className="a-grid">
          {T('tagline', 'Hero tagline')}
          {T('district', 'District label', 'Shown in the announcement bar')}
        </div>
      </div>

      <div className="a-card">
        <h2>External links</h2>
        <div className="a-grid">
          {T('donateUrl', 'Donate URL')}
          {T('pledgeReceiverUrl', 'Pledge receiver URL', 'Campaign Nucleus form receiver')}
          {T('bookUrl', 'Failure Disrupted link')}
        </div>
      </div>

      <div className="a-card">
        <h2>Election dates</h2>
        <div className="a-grid">
          {T('primaryDate', 'Primary (YYYY-MM-DD)')}
          {T('primaryShort', 'Primary short label', 'e.g. June 9')}
          {T('primaryLong', 'Primary long label', 'e.g. June 9, 2026')}
          {T('generalDate', 'General (YYYY-MM-DD)')}
          {T('generalShort', 'General short label')}
          {T('generalLong', 'General long label')}
        </div>
      </div>

      <div className="a-card">
        <h2>Counters</h2>
        <div className="a-grid">
          {N('pledgeBaseCount', 'Vote pledges (current)')}
          {N('pledgeGoal', 'Vote pledge goal')}
          {N('donorCount', 'Contributors (current)')}
          {N('donorTarget', 'Contributor goal')}
          {N('doorsKnocked', 'Doors knocked (current)')}
          {N('doorsTarget', 'Doors knocked goal')}
        </div>
      </div>

      <div className="a-card">
        <h2>Images</h2>
        <div className="a-grid">
          {IMG('heroImage', 'Hero photo (home)')}
          {IMG('storyImage', 'Story-section photo (home)')}
          {IMG('eventImage', 'Event teaser photo (home)')}
          {IMG('aboutImage', 'About page lead photo')}
          {IMG('bookImage', 'Failure Disrupted cover')}
          {IMG('logoImage', 'Logo (light surfaces)')}
          {IMG('logoImageWhite', 'Logo (dark/red surfaces)')}
        </div>
      </div>

      <div className="a-card">
        <h2>Contact</h2>
        <div className="a-grid">
          {T('phone', 'Phone')}
          {T('hours', 'Hours, e.g. M–F, 9 am – 5 pm')}
          {T('pressEmail', 'Press email (leave blank to hide)')}
          {T('generalEmail', 'General email (leave blank to hide)')}
          {TA('mailingAddress', 'Mailing address (one line per address line)')}
          {TA('paidForBy', 'Paid-for-by disclaimer')}
        </div>
      </div>

      <div className="a-card">
        <h2>About page copy</h2>
        <div className="a-grid">
          {T('aboutHeadline', 'Headline (split on first period)')}
          {TA('aboutLede', 'Lede')}
          {TA('aboutArc1', 'Arc — paragraph 1')}
          {TA('aboutArc2', 'Arc — paragraph 2')}
          {TA('aboutQuote', 'Pull quote')}
          {TA('aboutFamily', 'Family block')}
          {TA('aboutBook', 'Book block (HTML allowed)')}
          {TA('aboutService', 'Public service block')}
        </div>
      </div>

      <div className="a-row" style={{ marginTop: 16, justifyContent: 'flex-end' }}>
        <button className="a-btn" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save settings'}</button>
      </div>
    </>
  );
}

/* Generic table editor builder ─────────────────────────────── */
function TableEditor({ title, lede, table, columns, fields, defaults, toast, orderBy = 'sort_order', readOnly }) {
  const { rows, loading, err, upsert, remove } = useTable(table, orderBy);
  const [editing, setEditing] = useState(null);
  const [confirming, setConfirming] = useState(null);

  const startNew = () => setEditing({ ...defaults });
  const startEdit = (row) => setEditing({ ...row });

  const save = async () => {
    try {
      const r = { ...editing };
      // Normalize numeric sort_order
      if ('sort_order' in r) r.sort_order = Number(r.sort_order) || 0;
      // Coerce JSON fields
      fields.forEach(f => {
        if (f.type === 'json') {
          try { r[f.key] = typeof r[f.key] === 'string' ? JSON.parse(r[f.key] || '[]') : (r[f.key] || []); }
          catch { throw new Error(`Invalid JSON in ${f.label}`); }
        }
      });
      await upsert(r);
      toast(editing.id ? 'Updated.' : 'Added.');
      setEditing(null);
    } catch (e) { toast(e.message || 'Save failed', 'bad'); }
  };

  const doRemove = async (row) => {
    try { await remove(row.id); toast('Deleted.'); setConfirming(null); }
    catch (e) { toast(e.message || 'Delete failed', 'bad'); }
  };

  return (
    <>
      <div className="a-h">
        <div>
          <h1>{title}</h1>
          {lede && <p>{lede}</p>}
        </div>
        {!readOnly && <button className="a-btn" onClick={startNew}>Add new</button>}
      </div>

      <div className="a-card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? <div className="a-empty">Loading…</div>
          : err ? <div className="a-empty" style={{ color: 'var(--a-bad)' }}>{err}</div>
          : rows.length === 0 ? <div className="a-empty">Nothing here yet.{!readOnly && <><br /><button className="a-btn small" onClick={startNew}>Add the first one</button></>}</div>
          : (
            <table className="a-table">
              <thead>
                <tr>
                  {columns.map(c => <th key={c.key} style={c.style}>{c.label}</th>)}
                  {!readOnly && <th className="actions"></th>}
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.id}>
                    {columns.map(c => (
                      <td key={c.key} style={c.tdStyle}>{c.render ? c.render(r) : r[c.key]}</td>
                    ))}
                    {!readOnly && (
                      <td className="actions">
                        <button className="a-btn secondary small" onClick={() => startEdit(r)}>Edit</button>
                        {' '}
                        <button className="a-btn danger small" onClick={() => setConfirming(r)}>Delete</button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>

      {editing && (
        <Modal open onClose={() => setEditing(null)} title={editing.id ? 'Edit' : 'Add new'} wide>
          <div className="a-grid" style={{ marginTop: 8 }}>
            {fields.map(f => {
              const set = (v) => setEditing(d => ({ ...d, [f.key]: v }));
              const val = editing[f.key];
              if (f.type === 'textarea') return (
                <Field key={f.key} label={f.label} hint={f.hint} wide>
                  <textarea rows={f.rows || 3} value={val || ''} onChange={e => set(e.target.value)} />
                </Field>
              );
              if (f.type === 'number') return (
                <Field key={f.key} label={f.label} hint={f.hint}>
                  <input type="number" value={val ?? ''} onChange={e => set(e.target.value === '' ? null : Number(e.target.value))} />
                </Field>
              );
              if (f.type === 'select') return (
                <Field key={f.key} label={f.label} hint={f.hint}>
                  <select value={val || ''} onChange={e => set(e.target.value || null)}>
                    {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </Field>
              );
              if (f.type === 'checkbox') return (
                <Field key={f.key} label={f.label} hint={f.hint}>
                  <label className="a-row" style={{ gap: 8 }}>
                    <input type="checkbox" checked={!!val} onChange={e => set(e.target.checked)} />
                    <span>{f.checkboxLabel || 'Yes'}</span>
                  </label>
                </Field>
              );
              if (f.type === 'json') return (
                <Field key={f.key} label={f.label} hint={f.hint || 'JSON array'} wide>
                  <textarea rows={5} value={typeof val === 'string' ? val : JSON.stringify(val || [], null, 2)} onChange={e => set(e.target.value)} />
                </Field>
              );
              if (f.type === 'image') return (
                <Field key={f.key} label={f.label} hint={f.hint} wide>
                  <ImagePicker value={val} onChange={set} onError={m => toast(m, 'bad')} />
                </Field>
              );
              return (
                <Field key={f.key} label={f.label} hint={f.hint} wide={f.wide}>
                  <input value={val || ''} onChange={e => set(e.target.value)} />
                </Field>
              );
            })}
          </div>
          <div className="a-row" style={{ marginTop: 18, justifyContent: 'flex-end' }}>
            <button className="a-btn secondary" onClick={() => setEditing(null)}>Cancel</button>
            <button className="a-btn" onClick={save}>Save</button>
          </div>
        </Modal>
      )}

      <Confirm
        open={!!confirming}
        title="Delete this entry?"
        body="This cannot be undone."
        danger confirmLabel="Delete"
        onConfirm={() => doRemove(confirming)}
        onClose={() => setConfirming(null)} />
    </>
  );
}

/* Concrete editors ────────────────────────────────────────── */

function EndorsementsEditor({ toast }) {
  return <TableEditor toast={toast}
    title="Endorsements" lede="Names that appear in the 'Trusted by' strip."
    table="endorsements"
    columns={[
      { key: 'name', label: 'Name' },
      { key: 'sort_order', label: 'Order', tdStyle: { width: 70 }, render: r => <span className="num">{r.sort_order}</span> },
    ]}
    fields={[
      { key: 'name', label: 'Name', wide: true },
      { key: 'sort_order', label: 'Sort order', type: 'number', hint: 'Lower numbers appear first' },
    ]}
    defaults={{ name: '', sort_order: 100 }} />;
}

function PillarsEditor({ toast }) {
  return <TableEditor toast={toast}
    title="Pillars" lede="The six 'actually fix' cards on the home page."
    table="pillars"
    columns={[
      { key: 'number', label: '#', tdStyle: { width: 50 }, render: r => <span className="num">{r.number}</span> },
      { key: 'tag', label: 'Tag', render: r => <span className="pill gold">{r.tag}</span> },
      { key: 'title', label: 'Title' },
      { key: 'sort_order', label: 'Order', tdStyle: { width: 70 }, render: r => <span className="num">{r.sort_order}</span> },
    ]}
    fields={[
      { key: 'number', label: 'Number, e.g. 01' },
      { key: 'tag',    label: 'Tag, e.g. Permitting' },
      { key: 'title',  label: 'Title', wide: true },
      { key: 'body',   label: 'Body', type: 'textarea' },
      { key: 'sort_order', label: 'Sort order', type: 'number' },
    ]}
    defaults={{ number: '', tag: '', title: '', body: '', sort_order: 100 }} />;
}

function IssuesEditor({ toast }) {
  return <TableEditor toast={toast}
    title="Issues" lede="Full platform list and per-issue deep-dive content."
    table="issues"
    columns={[
      { key: 'number', label: '#', tdStyle: { width: 50 }, render: r => <span className="num">{r.number}</span> },
      { key: 'tag', label: 'Tag', render: r => <span className="pill">{r.tag}</span> },
      { key: 'title', label: 'Title' },
      { key: 'slug', label: 'Slug', render: r => <code className="a-code">{r.slug}</code> },
      { key: 'has_detail', label: 'Deep dive', render: r => r.head ? '✓' : '—', tdStyle: { width: 80 } },
    ]}
    fields={[
      { key: 'slug',     label: 'Slug (used in URL)', hint: 'e.g. permitting' },
      { key: 'number',   label: 'Number, e.g. 01' },
      { key: 'tag',      label: 'Tag' },
      { key: 'title',    label: 'Title', wide: true },
      { key: 'stance',   label: 'One-line stance', type: 'textarea', rows: 2 },
      { key: 'sort_order', label: 'Sort order', type: 'number' },
      { key: 'head',     label: 'Deep-dive headline', type: 'textarea', rows: 2, hint: 'Optional. Leave blank if no deep-dive page.' },
      { key: 'deck',     label: 'Deep-dive deck', type: 'textarea', rows: 2 },
      { key: 'story',    label: 'Story paragraph', type: 'textarea', rows: 4 },
      { key: 'problem',  label: 'Problem paragraph', type: 'textarea', rows: 4 },
      { key: 'bullets',  label: 'Push-for bullets', type: 'json', hint: 'JSON array of strings, e.g. ["Bullet 1", "Bullet 2"]' },
      { key: 'reframe',  label: 'Reframe', type: 'textarea', rows: 3 },
    ]}
    defaults={{ slug: '', number: '', tag: '', title: '', stance: '', head: '', deck: '', story: '', problem: '', bullets: [], reframe: '', sort_order: 100 }} />;
}

function EventsEditor({ toast }) {
  return <TableEditor toast={toast}
    title="Events" lede="Public events list. Tag 'Featured' surfaces on the home page teaser."
    table="events"
    columns={[
      { key: 'date_label', label: 'Date', tdStyle: { width: 90 } },
      { key: 'time_label', label: 'Time', tdStyle: { width: 140 } },
      { key: 'title', label: 'Title' },
      { key: 'host',  label: 'Host' },
      { key: 'tag',   label: 'Tag', render: r => r.tag ? <span className={'pill ' + (r.tag === 'Featured' ? 'crimson' : '')}>{r.tag}</span> : null },
      { key: 'archived', label: 'Archived', render: r => r.archived ? '✓' : '—', tdStyle: { width: 80 } },
    ]}
    fields={[
      { key: 'date_label', label: 'Date label, e.g. May 28' },
      { key: 'day_label',  label: 'Day label, e.g. Thu' },
      { key: 'time_label', label: 'Time label, e.g. 5:30 – 7:30 pm', wide: true },
      { key: 'title',      label: 'Title', wide: true },
      { key: 'location',   label: 'Location', wide: true },
      { key: 'host',       label: 'Host' },
      { key: 'tag',        label: 'Tag (optional)', hint: 'e.g. Featured, GOTV, 5 for 5' },
      { key: 'sort_order', label: 'Sort order', type: 'number' },
      { key: 'archived',   label: 'Archived', type: 'checkbox', checkboxLabel: 'Hide from public site' },
    ]}
    defaults={{ date_label: '', day_label: '', time_label: '', title: '', location: '', host: '', tag: null, sort_order: 100, archived: false }} />;
}

function NewsEditor({ toast }) {
  return <TableEditor toast={toast}
    title="News & writing" lede="Press hits and op-eds shown on /news."
    table="news_items"
    columns={[
      { key: 'tag',  label: 'Type', render: r => <span className={'pill ' + (r.tag === 'Press' ? '' : 'crimson')}>{r.tag}</span> },
      { key: 'date_label', label: 'Date', tdStyle: { width: 120 } },
      { key: 'source', label: 'Source' },
      { key: 'title',  label: 'Title' },
      { key: 'url',    label: 'URL', render: r => r.url ? <a href={r.url} target="_blank" rel="noreferrer">link</a> : '—' },
    ]}
    fields={[
      { key: 'tag',     label: 'Type', type: 'select', options: [{ value: 'Op-ed', label: 'Op-ed' }, { value: 'Press', label: 'Press' }] },
      { key: 'date_label', label: 'Date label, e.g. Apr 02, 2026' },
      { key: 'source',  label: 'Source' },
      { key: 'title',   label: 'Title', type: 'textarea', rows: 2 },
      { key: 'url',     label: 'URL', wide: true },
      { key: 'sort_order', label: 'Sort order', type: 'number' },
    ]}
    defaults={{ tag: 'Op-ed', date_label: '', source: '', title: '', url: '', sort_order: 100 }} />;
}

function VolunteerEditor({ toast }) {
  return <TableEditor toast={toast}
    title="Volunteer options" lede="Checkboxes shown on the volunteer page."
    table="volunteer_options"
    columns={[
      { key: 'key',   label: 'Key', render: r => <code className="a-code">{r.key}</code> },
      { key: 'label', label: 'Label' },
      { key: 'body',  label: 'Helper text' },
      { key: 'sort_order', label: 'Order', tdStyle: { width: 70 }, render: r => <span className="num">{r.sort_order}</span> },
    ]}
    fields={[
      { key: 'key',   label: 'Key (no spaces)' },
      { key: 'label', label: 'Label' },
      { key: 'body',  label: 'Helper text', type: 'textarea', rows: 2 },
      { key: 'sort_order', label: 'Sort order', type: 'number' },
    ]}
    defaults={{ key: '', label: '', body: '', sort_order: 100 }} />;
}

/* Read-only viewers ──────────────────────────────────────── */

function PledgesViewer({ toast }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sb.from('pledges').select('*').order('created_at', { ascending: false }).limit(500).then(({ data, error }) => {
      if (error) toast(error.message, 'bad'); else setRows(data || []);
      setLoading(false);
    });
  }, []);

  const exportCsv = () => {
    const cols = ['created_at', 'first_name', 'last_name', 'email', 'phone', 'location_key', 'volunteer_keys', 'source'];
    const csv = [cols.join(',')].concat(rows.map(r => cols.map(c => {
      const v = c === 'volunteer_keys' ? (r[c] || []).join(';') : (r[c] || '');
      return /[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v);
    }).join(','))).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `pledges-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  return (
    <>
      <div className="a-h">
        <div>
          <h1>Pledges</h1>
          <p>Mirror of submissions to Campaign Nucleus. Newest first; most recent 500 shown.</p>
        </div>
        <button className="a-btn secondary" onClick={exportCsv} disabled={!rows.length}>Export CSV</button>
      </div>

      <div className="a-card" style={{ padding: 0 }}>
        {loading ? <div className="a-empty">Loading…</div> : rows.length === 0 ? <div className="a-empty">No pledges yet.</div> : (
          <table className="a-table">
            <thead>
              <tr><th>When</th><th>Name</th><th>Email</th><th>Phone</th><th>Location</th><th>Volunteer</th><th>Source</th></tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id}>
                  <td className="num">{new Date(r.created_at).toLocaleString()}</td>
                  <td>{r.first_name} {r.last_name || ''}</td>
                  <td>{r.email || '—'}</td>
                  <td>{r.phone || '—'}</td>
                  <td>{r.location_key || '—'}</td>
                  <td>{(r.volunteer_keys || []).join(', ') || '—'}</td>
                  <td>{r.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

function MessagesViewer({ toast }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);

  const load = () => {
    sb.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(500).then(({ data, error }) => {
      if (error) toast(error.message, 'bad'); else setRows(data || []);
      setLoading(false);
    });
  };
  useEffect(() => { load(); }, []);

  const setStatus = async (row, status) => {
    const { error } = await sb.from('contact_messages').update({ status }).eq('id', row.id);
    if (error) toast(error.message, 'bad'); else { toast('Status updated.'); setOpen(null); load(); }
  };

  return (
    <>
      <div className="a-h">
        <div>
          <h1>Contact messages</h1>
          <p>Submissions from the contact form. Click a row to read and update status.</p>
        </div>
      </div>

      <div className="a-card" style={{ padding: 0 }}>
        {loading ? <div className="a-empty">Loading…</div> : rows.length === 0 ? <div className="a-empty">No messages yet.</div> : (
          <table className="a-table">
            <thead>
              <tr><th>When</th><th>Name</th><th>Email</th><th>Topic</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} onClick={() => setOpen(r)} style={{ cursor: 'pointer' }}>
                  <td className="num">{new Date(r.created_at).toLocaleString()}</td>
                  <td>{r.name}</td>
                  <td>{r.email}</td>
                  <td>{r.topic || '—'}</td>
                  <td><span className={'a-status ' + (r.status || 'new')}>{r.status || 'new'}</span></td>
                  <td className="actions">Open</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {open && (
        <Modal open onClose={() => setOpen(null)} title={`Message from ${open.name}`} wide>
          <div className="a-grid">
            <Field label="Email"><div>{open.email}</div></Field>
            <Field label="Topic"><div>{open.topic || '—'}</div></Field>
            <Field label="Submitted"><div>{new Date(open.created_at).toLocaleString()}</div></Field>
            <Field label="Status"><div><span className={'a-status ' + (open.status || 'new')}>{open.status || 'new'}</span></div></Field>
          </div>
          <Field label="Message" wide><div style={{ whiteSpace: 'pre-wrap', padding: 12, background: 'rgba(0,0,0,0.03)', borderRadius: 5, marginTop: 4 }}>{open.message}</div></Field>
          <div className="a-row" style={{ marginTop: 18, justifyContent: 'flex-end' }}>
            <button className="a-btn secondary" onClick={() => setStatus(open, 'archived')}>Archive</button>
            <button className="a-btn secondary" onClick={() => setStatus(open, 'replied')}>Mark replied</button>
            <button className="a-btn" onClick={() => setOpen(null)}>Close</button>
          </div>
        </Modal>
      )}
    </>
  );
}

/* Media library ──────────────────────────────────────────── */

function MediaLibrary({ toast }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await sb.storage.from('media').list('', { limit: 200, sortBy: { column: 'created_at', order: 'desc' } });
    if (error) toast(error.message, 'bad'); else setItems(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const upload = async (file) => {
    setBusy(true);
    try {
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await sb.storage.from('media').upload(path, file, { contentType: file.type, upsert: false });
      if (error) throw error;
      toast('Uploaded.');
      await load();
    } catch (e) { toast(e.message || 'Upload failed', 'bad'); }
    finally { setBusy(false); }
  };

  const remove = async (name) => {
    if (!confirm(`Delete ${name}?`)) return;
    const { error } = await sb.storage.from('media').remove([name]);
    if (error) toast(error.message, 'bad'); else { toast('Deleted.'); load(); }
  };

  const urlFor = (name) => sb.storage.from('media').getPublicUrl(name).data.publicUrl;

  return (
    <>
      <div className="a-h">
        <div>
          <h1>Media</h1>
          <p>Images uploaded here can be referenced anywhere a URL is accepted (settings or per-item image fields).</p>
        </div>
        <button className="a-btn" disabled={busy} onClick={() => fileRef.current && fileRef.current.click()}>{busy ? 'Uploading…' : 'Upload image'}</button>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files[0] && upload(e.target.files[0])} />
      </div>

      <div className="a-card">
        {loading ? <div className="a-empty">Loading…</div> : items.length === 0 ? <div className="a-empty">No uploads yet.</div> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14 }}>
            {items.map(it => {
              const url = urlFor(it.name);
              return (
                <div key={it.id || it.name} style={{ border: '1px solid var(--a-line)', borderRadius: 6, padding: 8, background: '#fff', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <a href={url} target="_blank" rel="noreferrer">
                    <img src={url} alt={it.name} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 4, display: 'block' }} />
                  </a>
                  <code className="a-code" style={{ fontSize: 11, wordBreak: 'break-all' }}>{it.name}</code>
                  <div className="a-row" style={{ gap: 4 }}>
                    <button className="a-btn secondary small" onClick={() => navigator.clipboard.writeText(url).then(() => toast('URL copied.'))}>Copy URL</button>
                    <button className="a-btn danger small" onClick={() => remove(it.name)}>Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   Shell + routing
   ───────────────────────────────────────────────────────────── */

const SECTIONS = [
  { group: 'Content', key: 'settings',     label: 'Site settings',  Component: SettingsEditor },
  { group: 'Content', key: 'pillars',      label: 'Pillars',        Component: PillarsEditor },
  { group: 'Content', key: 'issues',       label: 'Issues',         Component: IssuesEditor },
  { group: 'Content', key: 'endorsements', label: 'Endorsements',   Component: EndorsementsEditor },
  { group: 'Content', key: 'events',       label: 'Events',         Component: EventsEditor },
  { group: 'Content', key: 'news',         label: 'News',           Component: NewsEditor },
  { group: 'Content', key: 'volunteer',    label: 'Volunteer opts', Component: VolunteerEditor },
  { group: 'Content', key: 'media',        label: 'Media',          Component: MediaLibrary },
  { group: 'Inbox',   key: 'pledges',      label: 'Pledges',        Component: PledgesViewer },
  { group: 'Inbox',   key: 'messages',     label: 'Contact messages', Component: MessagesViewer },
];

function Dashboard({ session, onSignOut }) {
  const initial = (window.location.hash.replace(/^#/, '') || 'settings');
  const [active, setActive] = useState(initial);
  const [toastMsg, setToastMsg] = useState({ msg: '', kind: '' });
  const toast = useCallback((msg, kind) => setToastMsg({ msg, kind: kind || '' }), []);

  useEffect(() => {
    const onHash = () => setActive(window.location.hash.replace(/^#/, '') || 'settings');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const go = (key) => { window.location.hash = key; };

  const Active = (SECTIONS.find(s => s.key === active) || SECTIONS[0]).Component;
  const groups = useMemo(() => {
    const m = {};
    SECTIONS.forEach(s => { (m[s.group] = m[s.group] || []).push(s); });
    return m;
  }, []);

  return (
    <div className="a-shell">
      <aside className="a-sidebar">
        <div className="a-brand"><span className="dot" /> Together with Garmon</div>
        <nav className="a-nav">
          {Object.keys(groups).map(g => (
            <Fragment key={g}>
              <div className="sec">{g}</div>
              {groups[g].map(s => (
                <button key={s.key} className={s.key === active ? 'active' : ''} onClick={() => go(s.key)}>{s.label}</button>
              ))}
            </Fragment>
          ))}
        </nav>
        <div className="a-foot">
          <div>Signed in as<br /><strong>{session.user.email}</strong></div>
          <div className="a-row" style={{ marginTop: 10 }}>
            <a href="/" target="_blank" rel="noreferrer">View site →</a>
            <span className="a-spacer" />
            <button className="a-btn secondary small" onClick={onSignOut}>Sign out</button>
          </div>
        </div>
      </aside>
      <main className="a-main">
        <Active toast={toast} />
      </main>
      <Toast msg={toastMsg.msg} kind={toastMsg.kind} onClose={() => setToastMsg({ msg: '', kind: '' })} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   App root
   ───────────────────────────────────────────────────────────── */

function App() {
  const [state, setState] = useState({ status: 'loading', session: null, isAdmin: false });

  useEffect(() => {
    if (!HAS_SUPABASE) { setState({ status: 'unconfigured' }); return; }
    let sub;
    (async () => {
      const { data: { session } } = await sb.auth.getSession();
      await checkSession(session);
      const res = sb.auth.onAuthStateChange(async (_e, s) => { await checkSession(s); });
      sub = res.data && res.data.subscription;
    })();
    return () => { sub && sub.unsubscribe && sub.unsubscribe(); };
  }, []);

  const checkSession = async (session) => {
    if (!session) { setState({ status: 'login', session: null }); return; }
    // RLS lets admins read their own admin_users row and returns no rows
    // for everyone else, so the presence of the row is the membership check.
    const { data } = await sb.from('admin_users').select('id').eq('email', session.user.email.toLowerCase()).maybeSingle();
    const isAdmin = !!data;
    setState({ status: isAdmin ? 'ready' : 'denied', session, isAdmin });
  };

  const signOut = async () => { await sb.auth.signOut(); setState({ status: 'login', session: null }); };

  if (state.status === 'unconfigured') return <SetupScreen />;
  if (state.status === 'loading') return <div className="a-login"><div className="a-card"><p className="a-muted">Loading…</p></div></div>;
  if (state.status === 'login') return <LoginScreen />;
  if (state.status === 'denied') {
    return (
      <div className="a-login">
        <div className="a-card">
          <h1>Not authorised</h1>
          <p className="a-muted">
            <strong>{state.session.user.email}</strong> isn't in the admin allowlist.
            Ask another admin to run:
          </p>
          <pre className="a-code" style={{ display: 'block', padding: 12, marginTop: 10, background: 'rgba(0,0,0,0.04)', borderRadius: 4, fontSize: 12, whiteSpace: 'pre-wrap' }}>
{`insert into admin_users (email)
values ('${state.session.user.email}');`}
          </pre>
          <button className="a-btn secondary" style={{ marginTop: 16 }} onClick={signOut}>Sign out</button>
        </div>
      </div>
    );
  }
  return <Dashboard session={state.session} onSignOut={signOut} />;
}

ReactDOM.createRoot(document.getElementById('admin-root')).render(<App />);
