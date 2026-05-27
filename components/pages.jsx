/* global React */
const { useState } = React;

// Maps the site's volunteer option keys to the Campaign Nucleus receiver's
// checkbox values (handle: volunteer).
const VOLUNTEER_VALUE_MAP = {
  door:  'Doorknocking',
  phone: 'phonebanking',
  yard:  'yardsign',
  host:  'HostEvent',
  data:  'DataEntry',
  drive: 'DriveSeniors',
  other: 'Other',
};

/* ── VOLUNTEER ───────────────────────────────────────────────── */
function VolunteerPage({ data, showToast }) {
  const s = (data && data.settings) || {};
  const opts = ((data && data.volunteer) || []).map(o => ({ id: o.key, label: o.label, body: o.body }));
  const [picked, setPicked] = useState({});
  const [form, setForm] = useState({ name: '', email: '', phone: '', zip: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const url = s.volunteerReceiverUrl
      || 'https://jgn.campaignnucleus.com/forms/receiver/d70693a2-6422-4ff4-86f5-ca1cb0e8b6bf';
    const fd = new FormData();
    fd.append('full_name', form.name);
    fd.append('email', form.email);
    fd.append('phone', form.phone);
    fd.append('zip', form.zip);
    fd.append('anything_else', form.notes);
    Object.keys(picked).filter(k => picked[k]).forEach(k => {
      fd.append('volunteer[]', VOLUNTEER_VALUE_MAP[k] || k);
    });
    try {
      // Campaign Nucleus is canonical. Cross-origin POST is fire-and-forget (no CORS).
      await fetch(url, { method: 'POST', mode: 'no-cors', body: fd });
    } catch (err) {
      setSubmitting(false);
      showToast("Couldn't reach the campaign server. Please try again.");
      return;
    }
    setSubmitting(false);
    const n = Object.values(picked).filter(Boolean).length;
    showToast(`Welcome aboard. We'll be in touch about your ${n} interest area${n === 1 ? '' : 's'}.`);
    navigate('/');
  };

  return (
    <main>
      <section style={{ background: 'var(--paper-2)', paddingBottom: 32 }}>
        <div className="wrap-narrow">
          <Eyebrow>Volunteer</Eyebrow>
          <h1 className="h-1" style={{ marginTop: 14 }}>Pick what fits your week.</h1>
          <p className="lede" style={{ marginTop: 16, maxWidth: 560 }}>
            We need 50 active door-knockers and 200 total volunteers by primary day. Two hours
            of your time is worth more than $200 to this campaign.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap-narrow">
          <form onSubmit={submit}>
            <div className="card" style={{ padding: 36 }}>
              <h3 className="h-3">How can you help?</h3>
              <p className="small" style={{ margin: '6px 0 22px' }}>Pick as many as you'd like.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {opts.map(o => (
                  <label key={o.id} className={'checkbox-row ' + (picked[o.id] ? 'checked' : '')} style={{ alignItems: 'flex-start' }}>
                    <input type="checkbox" checked={!!picked[o.id]}
                      onChange={e => setPicked({ ...picked, [o.id]: e.target.checked })} />
                    <div>
                      <div style={{ fontWeight: 600 }}>{o.label}</div>
                      <div className="small" style={{ marginTop: 2 }}>{o.body}</div>
                    </div>
                  </label>
                ))}
              </div>

              <hr className="rule" style={{ margin: '28px 0' }} />

              <h3 className="h-3">About you</h3>
              <div className="grid grid-2" style={{ gap: 14, marginTop: 18 }}>
                <div className="field"><label>Full name *</label><input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div className="field"><label>ZIP *</label><input required type="text" pattern="[0-9]{5}" value={form.zip} onChange={e => setForm({ ...form, zip: e.target.value })} /></div>
                <div className="field"><label>Email *</label><input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                <div className="field"><label>Phone *</label><input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                <div className="field" style={{ gridColumn: 'span 2' }}>
                  <label>Anything else we should know?</label>
                  <textarea rows="3" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Skills, schedule, who introduced you..." />
                </div>
              </div>

              <button className="btn btn-primary btn-full btn-lg" type="submit" style={{ marginTop: 24 }} disabled={submitting}>{submitting ? 'Signing you up…' : 'Sign me up →'}</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

/* ── EVENTS ──────────────────────────────────────────────────── */
function EventsPage({ data, showToast }) {
  const EVENTS = ((data && data.events) || []).map(e => ({
    date: e.date_label, day: e.day_label, time: e.time_label,
    title: e.title, loc: e.location, host: e.host, tag: e.tag,
  }));
  const [rsvp, setRsvp] = useState(null);
  return (
    <main>
      <section style={{ background: 'var(--paper-2)', paddingBottom: 24 }}>
        <div className="wrap">
          <Eyebrow>Events · Through primary day</Eyebrow>
          <h1 className="h-1" style={{ marginTop: 14 }}>Come find us in person.</h1>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {EVENTS.map((e, i) => (
            <article key={i} className="event-row" style={{
              background: '#fff',
              border: '1px solid var(--hairline)',
              borderLeft: e.tag === 'Featured' ? '4px solid var(--crimson)' : '4px solid var(--navy)',
              borderRadius: 4,
            }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{e.day}</div>
                <div className="serif" style={{ fontSize: 32, fontWeight: 600, color: 'var(--navy)', letterSpacing: '-0.02em', lineHeight: 1, marginTop: 4 }}>{e.date}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 6 }}>{e.time}</div>
              </div>
              <div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                  {e.tag && <span className={'pill ' + (e.tag === 'Featured' ? 'pill-crimson' : '')}>{e.tag}</span>}
                </div>
                <h3 className="h-4" style={{ fontFamily: 'var(--serif)', fontSize: 22 }}>{e.title}</h3>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 4 }}>{e.loc} · <span style={{ color: 'var(--ink-3)' }}>Hosted by {e.host}</span></div>
              </div>
              <div className="event-actions" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button className="btn btn-primary btn-sm" onClick={() => setRsvp(e)}>RSVP</button>
                <a href="#cal" className="small" style={{ color: 'var(--navy)', textAlign: 'center' }}>+ Calendar</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {rsvp && (
        <div className="modal-back" onClick={() => setRsvp(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-x" onClick={() => setRsvp(null)}>✕</button>
            <Eyebrow>RSVP · {rsvp.date}</Eyebrow>
            <h3 className="h-2" style={{ marginTop: 12 }}>{rsvp.title}</h3>
            <p className="small" style={{ marginTop: 4 }}>{rsvp.loc} · {rsvp.time}</p>
            <form onSubmit={(ev) => { ev.preventDefault(); setRsvp(null); showToast(`You're on the list for ${rsvp.title}.`); }}
              style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="field"><label>Name</label><input required type="text" /></div>
              <div className="field"><label>Email</label><input required type="email" /></div>
              <div className="field"><label>How many in your party?</label>
                <select defaultValue="1"><option>1</option><option>2</option><option>3</option><option>4+</option></select>
              </div>
              <button className="btn btn-primary btn-full" type="submit">Confirm RSVP</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

/* ── ABOUT ───────────────────────────────────────────────────── */
function AboutPage({ data }) {
  const s = (data && data.settings) || {};
  const headlineParts = (s.aboutHeadline || 'Built one job at a time. Built here.').split('.');
  const aboutImage = s.aboutImage || s.storyImage || '';
  return (
    <main>
      <section style={{ background: 'var(--paper-2)', paddingBottom: 32 }}>
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: 56, alignItems: 'end' }}>
            <div>
              <Eyebrow>About Johnnie</Eyebrow>
              <h1 className="h-display" style={{ marginTop: 18 }}>
                {headlineParts[0]}.{headlineParts[1] && <> <span style={{ color: 'var(--crimson)' }}>{headlineParts.slice(1).join('.').trim()}</span></>}
              </h1>
            </div>
            <p className="lede">
              {s.aboutLede || "The story they're trying to fit into a yard sign is, like most useful stories, longer than that."}
            </p>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: 56, alignItems: 'start' }}>
            {aboutImage ? (
              <img src={aboutImage} alt="Johnnie Garmon portrait"
                style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 4, display: 'block' }} />
            ) : (
              <div className="placeholder" style={{ aspectRatio: '4/5', minHeight: 540 }}>
                Garmon portrait — sleeves rolled, James Island porch
              </div>
            )}
            <div>
              <Eyebrow>The arc</Eyebrow>
              <h2 className="h-2" style={{ marginTop: 12 }}>From Section 8 to business success.</h2>
              {s.aboutArc1 && <p style={{ marginTop: 16, color: 'var(--ink-2)', fontSize: 17 }}>{s.aboutArc1}</p>}
              {s.aboutArc2 && <p style={{ color: 'var(--ink-2)', fontSize: 17 }}>{s.aboutArc2}</p>}

              {s.aboutQuote && (
                <blockquote style={{
                  margin: '32px 0',
                  padding: '24px 28px',
                  borderLeft: '4px solid var(--crimson)',
                  background: 'var(--paper-2)',
                  fontFamily: 'var(--serif)',
                  fontSize: 22,
                  fontStyle: 'italic',
                  color: 'var(--navy-deep)',
                  lineHeight: 1.4,
                }}>
                  "{s.aboutQuote}"
                </blockquote>
              )}

              {s.aboutFamily && <>
                <h3 className="h-3" style={{ marginTop: 24 }}>Family.</h3>
                <p style={{ color: 'var(--ink-2)', fontSize: 17 }}>{s.aboutFamily}</p>
              </>}

              {s.aboutBook && <>
                <h3 className="h-3" style={{ marginTop: 24 }}>The book.</h3>
                <p style={{ color: 'var(--ink-2)', fontSize: 17 }} dangerouslySetInnerHTML={{ __html: s.aboutBook }} />
              </>}

              {s.aboutService && <>
                <h3 className="h-3" style={{ marginTop: 24 }}>Public service.</h3>
                <p style={{ color: 'var(--ink-2)', fontSize: 17 }}>{s.aboutService}</p>
              </>}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── ISSUES OVERVIEW ─────────────────────────────────────────── */
function IssuesPage({ data }) {
  const ISSUES = ((data && data.issues) || []).map(it => ({
    slug: it.slug, n: it.number, tag: it.tag, title: it.title, stance: it.stance,
  }));
  const NUM_WORDS = ['Zero','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten'];
  const countWord = NUM_WORDS[ISSUES.length] || ISSUES.length;
  return (
    <main>
      <section style={{ background: 'var(--paper-2)', paddingBottom: 32 }}>
        <div className="wrap">
          <Eyebrow>Platform</Eyebrow>
          <h1 className="h-display" style={{ marginTop: 14, maxWidth: 900 }}>
            {countWord} positions. <span style={{ color: 'var(--crimson)' }}>Each one a vote you can hold us to.</span>
          </h1>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div style={{
            background: '#fff',
            border: '1px solid var(--hairline)',
            borderRadius: 4,
            overflow: 'hidden',
          }}>
            {ISSUES.map((it, i) => (
              <a key={it.slug} href={'#/issues/' + it.slug}
                onClick={(e) => { e.preventDefault(); navigate('/issues/' + it.slug); }}
                className="issues-row"
                style={{
                  borderBottom: i < ISSUES.length - 1 ? '1px solid var(--hairline-2)' : 'none',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--paper-2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <div className="serif issues-num" style={{ fontSize: 36, fontWeight: 600, color: 'var(--navy)', letterSpacing: '-0.04em', lineHeight: 1 }}>{it.n}</div>
                <div className="issues-title">
                  <span className="pill">{it.tag}</span>
                  <h3 className="h-4" style={{ fontFamily: 'var(--serif)', fontSize: 22, marginTop: 8 }}>{it.title}</h3>
                </div>
                <p className="issues-stance" style={{ color: 'var(--ink-2)', fontSize: 15, margin: 0 }}>{it.stance}</p>
                <div className="issues-cta" style={{ color: 'var(--crimson)', fontWeight: 600, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Read →</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── ISSUE DEEP-DIVE ─────────────────────────────────────────── */
function IssueDetail({ data, slug }) {
  const issues = (data && data.issues) || [];
  const found = issues.find(it => it.slug === slug);
  const src = found || issues[0] || {};
  const d = {
    n: src.number || '00',
    tag: src.tag || '',
    head: src.head || src.title || '',
    deck: src.deck || src.stance || '',
    body: src.body || '',
    story: src.story || '',
    problem: src.problem || '',
    bullets: Array.isArray(src.bullets) ? src.bullets : [],
    reframe: src.reframe || '',
  };
  const bodyParas = d.body ? d.body.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean) : [];
  return (
    <main>
      <section style={{ background: 'var(--navy-deep)', color: 'var(--paper)', paddingBottom: 80 }}>
        <div className="wrap">
          <a href="#/issues" onClick={(e) => { e.preventDefault(); navigate('/issues'); }}
            className="small" style={{ color: 'var(--gold-soft)', display: 'inline-block', marginBottom: 24 }}>
            ← All positions
          </a>
          <Eyebrow color="var(--gold-soft)">{d.n} · {d.tag}</Eyebrow>
          <h1 className="h-display" style={{ color: 'var(--paper)', marginTop: 18 }}>{d.head}</h1>
          <p className="lede" style={{ color: 'rgba(255,255,255,0.85)', marginTop: 22, maxWidth: 720, fontSize: 22 }}>
            {d.deck}
          </p>
        </div>
      </section>

      <section>
        <div className="wrap split" style={{ '--split-cols': '2fr 1fr', '--split-gap': '56px' }}>
          <article>
            {bodyParas.length > 0 ? (
              bodyParas.map((para, i) => (
                <p key={i} style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--ink)', marginTop: i === 0 ? 0 : 20 }}>
                  {para}
                </p>
              ))
            ) : (
              <>
                <Eyebrow>The story</Eyebrow>
                <p className="serif" style={{ fontSize: 24, fontWeight: 500, lineHeight: 1.45, color: 'var(--navy-deep)', marginTop: 12, fontStyle: 'italic' }}>
                  {d.story}
                </p>

                <h2 className="h-2" style={{ marginTop: 56 }}>The problem.</h2>
                <p className="lede" style={{ marginTop: 14, color: 'var(--ink-2)' }}>{d.problem}</p>

                <h2 className="h-2" style={{ marginTop: 56 }}>What I'll push for in Columbia.</h2>
                <ol style={{ paddingLeft: 0, listStyle: 'none', counterReset: 'pol', marginTop: 18 }}>
                  {d.bullets.map((b, i) => (
                    <li key={i} style={{
                      display: 'grid', gridTemplateColumns: '40px 1fr', gap: 16,
                      padding: '18px 0',
                      borderTop: i === 0 ? '2px solid var(--navy)' : '1px solid var(--hairline-2)',
                    }}>
                      <span className="serif" style={{ fontSize: 22, fontWeight: 600, color: 'var(--crimson)', letterSpacing: '-0.02em' }}>
                        {(i + 1).toString().padStart(2, '0')}
                      </span>
                      <p style={{ margin: 0, fontSize: 17, color: 'var(--ink)' }}>{b}</p>
                    </li>
                  ))}
                </ol>

                <div style={{
                  marginTop: 56,
                  padding: '36px 40px',
                  background: 'var(--paper-2)',
                  borderRadius: 6,
                  borderTop: '4px solid var(--gold)',
                }}>
                  <Eyebrow>The reframe</Eyebrow>
                  <p className="serif" style={{ fontSize: 26, fontWeight: 500, lineHeight: 1.4, color: 'var(--navy-deep)', marginTop: 14 }}>
                    {d.reframe}
                  </p>
                </div>
              </>
            )}
          </article>

          <aside className="sticky-aside" data-sticky style={{ position: 'sticky', top: 120, alignSelf: 'start' }}>
            <div className="card">
              <Eyebrow>Move on this</Eyebrow>
              <h3 className="h-4" style={{ marginTop: 10, fontFamily: 'var(--serif)', fontSize: 22 }}>
                Like this position? Take an action.
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
                <button className="btn btn-primary btn-full" onClick={() => navigate('/donate')}>Donate</button>
                <button className="btn btn-secondary btn-full" onClick={() => navigate('/petition')}>Pledge my vote</button>
                <button className="btn btn-secondary btn-full" onClick={() => navigate('/volunteer')}>Volunteer</button>
              </div>
            </div>
            <div style={{ marginTop: 16, fontSize: 13, color: 'var(--ink-3)' }}>
              Share this position:
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                {['FB','X','LI','✉'].map(s => (
                  <button key={s} style={{
                    width: 36, height: 36, borderRadius: 4,
                    background: '#fff', border: '1px solid var(--hairline)',
                    fontSize: 12, fontWeight: 600, color: 'var(--navy)',
                  }}>{s}</button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* ── NEWS / CONTACT (light) ──────────────────────────────────── */
function NewsPage({ data }) {
  const items = ((data && data.news) || []).map(n => ({
    tag: n.tag, date: n.date_label, source: n.source, title: n.title, url: n.url,
  }));
  return (
    <main>
      <section style={{ background: 'var(--paper-2)', paddingBottom: 32 }}>
        <div className="wrap">
          <Eyebrow>News & writing</Eyebrow>
          <h1 className="h-1" style={{ marginTop: 14 }}>What Johnnie has been writing.</h1>
        </div>
      </section>
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: 20 }}>
            {items.map((it, i) => (
              <article key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span className={'pill ' + (it.tag === 'Press' ? '' : 'pill-crimson')}>{it.tag}</span>
                  <span className="small">{it.source} · {it.date}</span>
                </div>
                <h3 className="h-4" style={{ fontFamily: 'var(--serif)', fontSize: 22 }}>{it.title}</h3>
                {it.url
                  ? <a href={it.url} target="_blank" rel="noreferrer" className="btn-ghost" style={{ fontSize: 14, color: 'var(--crimson)', fontWeight: 600 }}>Read →</a>
                  : <span className="btn-ghost" style={{ fontSize: 14, color: 'var(--ink-3)', fontWeight: 600 }}>Coming soon</span>}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactPage({ data, showToast }) {
  const s = (data && data.settings) || {};
  const [form, setForm] = useState({ full_name: '', email: '', subject: 'general', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const send = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const url = s.contactReceiverUrl
      || 'https://jgn.campaignnucleus.com/forms/receiver/6c44fcbf-2ce8-4666-b839-bc5cc874c134';
    try {
      // Campaign Nucleus is canonical. Cross-origin POST is fire-and-forget (no CORS).
      await fetch(url, { method: 'POST', mode: 'no-cors', body: new FormData(e.target) });
    } catch (err) {
      setSubmitting(false);
      (showToast || (() => {}))("Couldn't reach the campaign server. Please try again.");
      return;
    }
    // Best-effort mirror to Supabase if it's configured; never blocks the user.
    if (window.HAS_SUPABASE && window.submitContact) {
      try { await window.submitContact({ name: form.full_name, email: form.email, topic: form.subject, message: form.message }); }
      catch (e2) { /* Nucleus already has it */ }
    }
    setSubmitting(false);
    (showToast || (() => {}))('Thanks. The campaign team will reply soon.');
    navigate('/');
  };

  return (
    <main>
      <section style={{ background: 'var(--paper-2)', paddingBottom: 32 }}>
        <div className="wrap">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="h-1" style={{ marginTop: 14 }}>How to reach the campaign.</h1>
        </div>
      </section>
      <section style={{ paddingTop: 0 }}>
        <div className="wrap split" style={{ '--split-gap': '40px' }}>
          <div className="card">
            {s.pressEmail && <>
              <Eyebrow>Press</Eyebrow>
              <p style={{ marginTop: 12, fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--navy)' }}>{s.pressEmail}</p>
              <hr className="rule" style={{ margin: '24px 0' }} />
            </>}

            <Eyebrow>Phone</Eyebrow>
            <p style={{ marginTop: 12, fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--navy)' }}>{s.phone || '(843) 989-0843'}</p>
            <p className="small">{s.hours || 'M–F, 9 am – 5 pm'}</p>

            {s.generalEmail && <>
              <hr className="rule" style={{ margin: '24px 0' }} />
              <Eyebrow>General</Eyebrow>
              <p style={{ marginTop: 12, fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--navy)' }}>{s.generalEmail}</p>
            </>}

            <hr className="rule" style={{ margin: '24px 0' }} />

            <Eyebrow>Mail</Eyebrow>
            <p style={{ marginTop: 12, fontSize: 16 }}>
              Committee to Elect Johnnie Garmon<br />
              {(s.mailingAddress || '130 Gardeners Circle, PMB 173\nJohns Island, SC 29455').split('\n').map((line, i, arr) => (
                <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
              ))}
            </p>
          </div>
          <div className="card">
            <Eyebrow>Send a note</Eyebrow>
            <form style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }} onSubmit={send}>
              <div className="field"><label htmlFor="ct-name">Name</label>
                <input id="ct-name" name="full_name" type="text" required value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} />
              </div>
              <div className="field"><label htmlFor="ct-email">Email</label>
                <input id="ct-email" name="email" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="field"><label htmlFor="ct-subject">What's this about?</label>
                <select id="ct-subject" name="subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                  <option value="general">General question</option>
                  <option value="press">Press inquiry</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="event">Event hosting</option>
                </select>
              </div>
              <div className="field"><label htmlFor="ct-message">Message</label>
                <textarea id="ct-message" name="message" rows="5" required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>
              <button className="btn btn-primary" type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Send'}</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── EARLY VOTING ────────────────────────────────────────────── */
const EARLY_VOTING_CENTERS = [
  { name: 'County Voter Registration Office', address: '4340 Corporate Road, North Charleston, SC 29405', lat: 32.8466, lng: -79.9986 },
  { name: 'Wando Library',                     address: '1400 Carolina Park Blvd, Mt Pleasant, SC 29466', lat: 32.8589, lng: -79.7807 },
  { name: 'James Island Baxter-Patrick Library', address: '1858 S. Grimball Road, Charleston, SC 29412', lat: 32.7079, lng: -79.9565 },
  { name: 'Morris Brown AME Church',           address: '13 Morris St., Charleston, SC 29403',            lat: 32.7918, lng: -79.9389 },
  { name: 'Greater Macedonia AME Church',      address: '725 Savage Rd., Charleston, SC 29414',           lat: 32.8124, lng: -80.0430 },
];

// Accurate built-in centroids for Charleston County / District 115 ZIPs. The
// free zippopotam.us geocoder returns imprecise centroids for some of these
// (e.g. 29455 Johns Island), so for local ZIPs we trust this table and only
// fall back to the network geocoder for out-of-area ZIPs.
const ZIP_COORDS = {
  '29401': [32.7795, -79.9300], // Charleston (downtown)
  '29403': [32.8000, -79.9430], // Charleston (upper peninsula)
  '29405': [32.8660, -79.9760], // North Charleston
  '29406': [32.9300, -80.0260], // North Charleston
  '29407': [32.7944, -80.0184], // West Ashley
  '29412': [32.7180, -79.9560], // James Island
  '29414': [32.8090, -80.0560], // West Ashley / Charleston
  '29418': [32.8770, -80.0680], // North Charleston / Ladson
  '29420': [32.9120, -80.0640], // North Charleston
  '29439': [32.6552, -79.9404], // Folly Beach
  '29455': [32.6550, -80.0560], // Johns Island (incl. Kiawah, Seabrook)
  '29464': [32.8050, -79.8580], // Mt Pleasant (south)
  '29466': [32.8580, -79.7900], // Mt Pleasant (north)
  '29492': [32.8530, -79.8980], // Daniel Island / Cainhoy
};

function milesBetween(lat1, lng1, lat2, lng2) {
  const toRad = d => (d * Math.PI) / 180;
  const R = 3958.8; // miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function rankCenters(lat, lng) {
  return EARLY_VOTING_CENTERS
    .map(c => ({ ...c, miles: milesBetween(lat, lng, c.lat, c.lng) }))
    .sort((a, b) => a.miles - b.miles);
}

const mapsSearchLink = (addr) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`;
const mapsEmbedSrc   = (q)    => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=11&output=embed`;

function EarlyVotingSignup({ showToast }) {
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await window.submitPledge(e.target);
    } catch (err) {
      setSubmitting(false);
      (showToast || (() => {}))("Couldn't reach the campaign server. Please try again.");
      return;
    }
    if (window.mirrorPledge) await window.mirrorPledge(form, 'early_voting');
    setSubmitting(false);
    setDone(true);
    (showToast || (() => {}))('Thanks for signing up. Welcome to the team.');
  };

  return (
    <div className="card" style={{ padding: 28, borderTop: '4px solid var(--crimson)' }}>
      {!done ? (
        <form onSubmit={submit}>
          <Eyebrow>Join the campaign</Eyebrow>
          <h2 className="h-3" style={{ marginTop: 10 }}>Sign up for Together with Garmon.</h2>
          <p className="small" style={{ margin: '6px 0 18px' }}>
            Get early-voting reminders and campaign updates. Takes a few seconds — we'll never sell your info.
          </p>
          <div className="col" style={{ gap: 14 }}>
            <div className="grid grid-2" style={{ gap: 14 }}>
              <div className="field">
                <label htmlFor="ev-first">First name *</label>
                <input id="ev-first" name="first_name" type="text" required placeholder="Mary"
                  value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} />
              </div>
              <div className="field">
                <label htmlFor="ev-last">Last name *</label>
                <input id="ev-last" name="last_name" type="text" required placeholder="Pinckney"
                  value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-2" style={{ gap: 14 }}>
              <div className="field">
                <label htmlFor="ev-phone">Cell / Mobile phone *</label>
                <input id="ev-phone" name="phone" type="tel" required placeholder="(843) 989-0843"
                  value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="field">
                <label htmlFor="ev-email">Email</label>
                <input id="ev-email" name="email" type="email" placeholder="you@email.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <button className="btn btn-primary btn-full btn-lg" type="submit" disabled={submitting}>
              {submitting ? 'Signing you up…' : 'Sign me up →'}
            </button>
            <p className="fineprint" style={{ margin: 0 }}>
              By signing up you agree to receive campaign updates. Paid for by the Committee to Elect Johnnie Garmon.
            </p>
          </div>
        </form>
      ) : (
        <div className="fade-up" style={{ textAlign: 'center', padding: '12px 0' }}>
          <div style={{
            width: 56, height: 56, margin: '0 auto',
            background: 'var(--navy)', color: 'var(--paper)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, fontWeight: 600,
          }}>✓</div>
          <h3 className="h-3" style={{ marginTop: 14 }}>You're on the list.</h3>
          <p style={{ marginTop: 8, color: 'var(--ink-2)' }}>We'll send you early-voting reminders before {' '}
            <strong>June 5</strong>. Now make your plan to vote below.</p>
        </div>
      )}
    </div>
  );
}

function EarlyVotingPage({ data, showToast }) {
  const [zip, setZip] = useState('');
  const [results, setResults] = useState(null);
  const [zipErr, setZipErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [mapQuery, setMapQuery] = useState(EARLY_VOTING_CENTERS[0].address);

  const findNearest = async (e) => {
    e.preventDefault();
    const z = zip.trim();
    if (!/^\d{5}$/.test(z)) { setZipErr('Enter a 5-digit ZIP code.'); setResults(null); return; }
    setZipErr('');

    // Trust the built-in table for Charleston-area ZIPs (accurate + offline).
    const local = ZIP_COORDS[z];
    if (local) {
      const sorted = rankCenters(local[0], local[1]);
      setResults(sorted);
      setMapQuery(sorted[0].address);
      return;
    }

    // Fall back to a network geocoder for ZIPs outside the area.
    setLoading(true);
    try {
      const res = await fetch(`https://api.zippopotam.us/us/${z}`);
      if (!res.ok) throw new Error('not found');
      const j = await res.json();
      const place = j.places && j.places[0];
      const lat = parseFloat(place && place.latitude), lng = parseFloat(place && place.longitude);
      if (!isFinite(lat) || !isFinite(lng)) throw new Error('bad coords');
      const sorted = rankCenters(lat, lng);
      setResults(sorted);
      setMapQuery(sorted[0].address);
    } catch (err) {
      setZipErr("We couldn't locate that ZIP code. If you're outside Charleston County, any center above still works during early voting.");
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const centerList = results || EARLY_VOTING_CENTERS.map(c => ({ ...c, miles: null }));

  return (
    <main>
      {/* SIGNUP — top of page */}
      <section style={{ background: 'var(--paper-2)', paddingBottom: 32 }}>
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: 56, alignItems: 'start' }}>
            <div>
              <Eyebrow>Early voting · Republican Primary</Eyebrow>
              <h1 className="h-display" style={{ marginTop: 16 }}>
                Vote early. <span style={{ color: 'var(--crimson)' }}>Make it count.</span>
              </h1>
              <p className="lede" style={{ marginTop: 18, maxWidth: 520 }}>
                Early voting for the Statewide Primary runs <strong>Tuesday, May 26</strong> through{' '}
                <strong>Friday, June 5</strong>. Any registered Charleston County voter can use any
                of the centers below — no appointment, no excuse needed. Sign up and we'll remind you.
              </p>
            </div>
            <EarlyVotingSignup showToast={showToast} />
          </div>
        </div>
      </section>

      {/* INSTRUCTIONS */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="card" style={{ padding: 32, borderTop: '4px solid var(--navy)' }}>
            <Eyebrow>Early voting period</Eyebrow>
            <h2 className="h-2" style={{ marginTop: 12 }}>When you can vote.</h2>
            <p style={{ marginTop: 14, color: 'var(--ink-2)', fontSize: 17, maxWidth: 720 }}>
              The early voting period for the Statewide Primary starts on <strong>Tuesday, May 26</strong> and
              ends <strong>Friday, June 5</strong> (closed on Saturday and Sunday and state holidays).
            </p>
            <p style={{ marginTop: 10, color: 'var(--ink-2)', fontSize: 17 }}>
              Early voting centers are open <strong>8:30 a.m. – 5:00 p.m.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ZIP FINDER + LOCATIONS */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Eyebrow>Find your closest center</Eyebrow>
          <h2 className="h-2" style={{ marginTop: 12 }}>Enter your ZIP code.</h2>
          <p className="small" style={{ marginTop: 6, maxWidth: 640 }}>
            During early voting you may cast your ballot at <em>any</em> of these Charleston County
            centers. Enter your ZIP and we'll sort them by distance.
          </p>

          <form onSubmit={findNearest} style={{ marginTop: 18, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div className="field" style={{ maxWidth: 220 }}>
              <label htmlFor="ev-zip">Your ZIP code</label>
              <input id="ev-zip" type="text" inputMode="numeric" pattern="[0-9]{5}" maxLength={5}
                placeholder="29412" value={zip}
                onChange={e => setZip(e.target.value.replace(/[^0-9]/g, ''))} />
            </div>
            <button className="btn btn-primary btn-lg" type="submit" disabled={loading}>
              {loading ? 'Finding…' : 'Find closest center →'}
            </button>
          </form>
          {zipErr && <p className="small" style={{ marginTop: 10, color: 'var(--crimson)' }}>{zipErr}</p>}

          <div className="grid grid-2" style={{ gap: 32, marginTop: 28, alignItems: 'start' }}>
            {/* LIST */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {centerList.map((c, i) => {
                const isNearest = results && i === 0;
                return (
                  <article key={c.name} style={{
                    background: '#fff',
                    border: '1px solid var(--hairline)',
                    borderLeft: isNearest ? '4px solid var(--crimson)' : '4px solid var(--navy)',
                    borderRadius: 4,
                    padding: '16px 18px',
                  }}>
                    <div className="between" style={{ alignItems: 'baseline', gap: 12 }}>
                      <h3 className="h-4" style={{ fontFamily: 'var(--serif)', fontSize: 19 }}>{c.name}</h3>
                      {c.miles != null && (
                        <span className={'pill ' + (isNearest ? 'pill-crimson' : '')} style={{ whiteSpace: 'nowrap' }}>
                          {c.miles.toFixed(1)} mi{isNearest ? ' · closest' : ''}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 4 }}>{c.address}</div>
                    <a href={mapsSearchLink(c.address)} target="_blank" rel="noreferrer"
                      onClick={() => setMapQuery(c.address)}
                      className="small" style={{ color: 'var(--crimson)', fontWeight: 600, display: 'inline-block', marginTop: 8 }}>
                      Directions →
                    </a>
                  </article>
                );
              })}
            </div>

            {/* MAP */}
            <div className="sticky-aside" data-sticky style={{ position: 'sticky', top: 120 }}>
              <div style={{ border: '1px solid var(--hairline)', borderRadius: 4, overflow: 'hidden', background: '#fff' }}>
                <iframe
                  title="Early voting centers map"
                  src={mapsEmbedSrc(mapQuery)}
                  style={{ width: '100%', height: 420, border: 0, display: 'block' }}
                  loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
              <p className="fineprint" style={{ marginTop: 10 }}>
                Always confirm hours and locations at scvotes.gov before you go. Distances are
                approximate, straight-line estimates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { VolunteerPage, EventsPage, AboutPage, IssuesPage, IssueDetail, NewsPage, ContactPage, EarlyVotingPage });
