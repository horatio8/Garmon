/* global React */
const { useState } = React;

/* ── VOLUNTEER ───────────────────────────────────────────────── */
function VolunteerPage({ data, showToast }) {
  const opts = ((data && data.volunteer) || []).map(o => ({ id: o.key, label: o.label, body: o.body }));
  const [picked, setPicked] = useState({});
  const [form, setForm] = useState({ name: '', email: '', phone: '', zip: '', notes: '' });

  const submit = (e) => {
    e.preventDefault();
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

              <button className="btn btn-primary btn-full btn-lg" type="submit" style={{ marginTop: 24 }}>Sign me up →</button>
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
  const [form, setForm] = useState({ name: '', email: '', topic: 'General question', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const send = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      if (window.submitContact) {
        await window.submitContact({ name: form.name, email: form.email, topic: form.topic, message: form.message });
      }
      setSubmitting(false);
      (showToast || (() => {}))('Thanks. The campaign team will reply soon.');
      navigate('/');
    } catch (err) {
      setSubmitting(false);
      (showToast || (() => {}))(err.message || 'Could not send. Please email media@togetherwithgarmon.com.');
    }
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
              <div className="field"><label>Name</label>
                <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="field"><label>Email</label>
                <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="field"><label>What's this about?</label>
                <select value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })}>
                  <option>General question</option><option>Press inquiry</option><option>Volunteer</option><option>Event hosting</option>
                </select>
              </div>
              <div className="field"><label>Message</label>
                <textarea rows="5" required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>
              <button className="btn btn-primary" type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Send'}</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { VolunteerPage, EventsPage, AboutPage, IssuesPage, IssueDetail, NewsPage, ContactPage });
