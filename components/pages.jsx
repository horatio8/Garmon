/* global React */
const { useState } = React;

/* ── VOLUNTEER ───────────────────────────────────────────────── */
function VolunteerPage({ showToast }) {
  const opts = [
    { id: 'door', label: 'Door-knocking', body: 'Walk a precinct on a Saturday. Most popular.' },
    { id: 'phone', label: 'Phone banking', body: 'Two-hour shifts from your couch.' },
    { id: 'yard', label: 'Yard sign', body: 'We deliver and install.' },
    { id: 'host', label: 'Host an event', body: 'Open your living room to 12–30 neighbors.' },
    { id: 'data', label: 'Data entry', body: 'Help us keep the voter file clean.' },
    { id: 'drive', label: 'Drive seniors to polls', body: 'June 9, all day.' },
    { id: 'other', label: 'Other / talk to me', body: 'Tell us what you want to do.' },
  ];
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
const EVENTS = [
  { date: 'May 28', day: 'Thu', time: '5:30 – 7:30 pm', title: 'Happy Hour with Johnnie', loc: 'Beach Club, Kiawah Island', host: 'Bill & Patty Holcombe', tag: 'Featured' },
  { date: 'May 31', day: 'Sun', time: '10:00 am', title: 'Coffee on the Porch', loc: 'James Island, Avondale', host: 'Carol Wieters', tag: null },
  { date: 'Jun 02', day: 'Tue', time: '6:00 pm', title: 'Folly Beach Town Hall', loc: 'Folly River Park Pavilion', host: 'Open to all', tag: null },
  { date: 'Jun 04', day: 'Thu', time: '7:00 pm', title: 'Healthcare & Aging Panel', loc: 'St. Andrew\'s Episcopal, James Is.', host: 'With Dr. Lila Pope', tag: null },
  { date: 'Jun 06', day: 'Sat', time: '8:00 am – noon', title: 'Door-knock Saturday', loc: 'Riverland Terrace HQ', host: 'Volunteer event', tag: 'GOTV' },
  { date: 'Jun 08', day: 'Mon', time: '6:30 pm', title: 'Election Eve Rally', loc: 'Riverfront Park, North Charleston', host: 'With Speaker Smith', tag: null },
];

function EventsPage({ showToast }) {
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
function AboutPage() {
  return (
    <main>
      <section style={{ background: 'var(--paper-2)', paddingBottom: 32 }}>
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: 56, alignItems: 'end' }}>
            <div>
              <Eyebrow>About Johnnie</Eyebrow>
              <h1 className="h-display" style={{ marginTop: 18 }}>
                Built one job at a time. <span style={{ color: 'var(--crimson)' }}>Built here.</span>
              </h1>
            </div>
            <p className="lede">
              The story they're trying to fit into a yard sign is, like most useful stories,
              longer than that.
            </p>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: 56, alignItems: 'start' }}>
            <div className="placeholder" style={{ aspectRatio: '4/5', minHeight: 540 }}>
              Garmon portrait — sleeves rolled, James Island porch
            </div>
            <div>
              <Eyebrow>The arc</Eyebrow>
              <h2 className="h-2" style={{ marginTop: 12 }}>From Section 8 to small business owner.</h2>
              <p style={{ marginTop: 16, color: 'var(--ink-2)', fontSize: 17 }}>
                Johnnie was raised in subsidized housing in upstate South Carolina. He was the
                first in his family to finish college, paying his way through the College of
                Charleston by working nights in restaurants and weekends in roofing.
              </p>
              <p style={{ color: 'var(--ink-2)', fontSize: 17 }}>
                Over the next thirty years he built three businesses — a home services company,
                a small commercial real-estate practice, and an aging-at-home advisory firm
                that today serves families across the Lowcountry.
              </p>

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
                "South Carolina took a chance on a kid with nothing but stubbornness and a
                public-school education. I'm running so the next kid gets the same chance."
              </blockquote>

              <h3 className="h-3" style={{ marginTop: 24 }}>Family.</h3>
              <p style={{ color: 'var(--ink-2)', fontSize: 17 }}>
                Married thirty-one years to Kelley. Father of three daughters — Caroline, Avery,
                and June. Member of Holy Cross Episcopal. Little League coach for nine seasons.
              </p>

              <h3 className="h-3" style={{ marginTop: 24 }}>The book.</h3>
              <p style={{ color: 'var(--ink-2)', fontSize: 17 }}>
                <em>Failure Disrupted</em> is Johnnie's account of three near-bankruptcies, the
                hard-won management principles that came from them, and what conservative
                governance can learn from the discipline of a small balance sheet.
              </p>

              <h3 className="h-3" style={{ marginTop: 24 }}>Public service.</h3>
              <p style={{ color: 'var(--ink-2)', fontSize: 17 }}>
                Appointed by Governor Henry McMaster to the South Carolina Healthcare Study
                Committee. Past board member of the Charleston Metro Chamber. Active with the
                Lowcountry Land Trust.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── ISSUES OVERVIEW ─────────────────────────────────────────── */
const ISSUES = [
  { slug: 'permitting', n: '01', tag: 'Permitting', title: 'Stop Stacking Paper.', stance: 'Demand 90-day permit deadlines and public throughput numbers.' },
  { slug: 'property',   n: '02', tag: 'Property tax', title: 'Protect the 6% Rate.', stance: 'Long-time residents have earned a place to stand.' },
  { slug: 'concurrency',n: '03', tag: 'Growth',      title: 'Concurrency or Bust.', stance: 'No subdivisions where the schools and roads can\'t keep up.' },
  { slug: 'healthcare', n: '04', tag: 'Healthcare',  title: 'Aging at Home.',       stance: 'Modernize advanced directives and in-home care.' },
  { slug: 'small-biz',  n: '05', tag: 'Small biz',   title: 'Defend Main Street.',  stance: 'Dram shop reform and permit accountability.' },
  { slug: 'education',  n: '06', tag: 'Education',   title: 'Choice and Transparency.', stance: 'Parental control and transparent K–12 funding.' },
  { slug: 'character',  n: '07', tag: 'Place',       title: 'Lowcountry Character.', stance: 'Protect what makes the Lowcountry the Lowcountry.' },
  { slug: 'directives', n: '08', tag: 'End-of-life', title: 'Honor the Last Wish.', stance: 'Modernize advanced-directive law.' },
  { slug: 'dram',       n: '09', tag: 'Liability',   title: 'Reform Dram Shop.',    stance: 'Stop crushing small restaurants with insurance impossible to obtain.' },
  { slug: 'mandates',   n: '10', tag: 'Counties',    title: 'No Unfunded Mandates.', stance: 'Stop dumping costs on county budgets.' },
];

function IssuesPage() {
  return (
    <main>
      <section style={{ background: 'var(--paper-2)', paddingBottom: 32 }}>
        <div className="wrap">
          <Eyebrow>Platform</Eyebrow>
          <h1 className="h-display" style={{ marginTop: 14, maxWidth: 900 }}>
            Ten positions. <span style={{ color: 'var(--crimson)' }}>Each one a vote you can hold us to.</span>
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
const ISSUE_DETAIL = {
  permitting: {
    n: '01', tag: 'Permitting',
    head: 'Columbia is generating busyness, not results.',
    deck: 'Eight months for a backyard shed. Eleven for a coffee shop. Stop Stacking Paper.',
    story: 'Last summer a young couple in West Ashley took ten months to permit a 400-square-foot mother-in-law cottage for an aging parent. By the time the paperwork cleared, the parent was in skilled nursing. The cottage sits empty.',
    problem: 'South Carolina has no statutory deadline by which a local permitting agency must issue a decision. There is no public reporting on throughput. Counties hide behind "the back-and-forth with the applicant" while applicants hide their applications behind tabs in Outlook. Nobody owns the timeline.',
    bullets: [
      '90-day statutory shot-clock on residential permits — denial requires written reasons.',
      'Quarterly public throughput reports for every county and municipal permit office.',
      'Automatic refund of permit fees for applications older than 180 days.',
      'A statewide single-portal pilot program for residential ADU and renovation permits.',
      'No more "review by committee that meets every other Wednesday." The clock runs.',
    ],
    reframe: 'What if the question isn\'t "how do we make planners faster" but "what is the cost — to the family, the trades, the tax base — of every week that an approvable application sits in a queue"?',
  },
};

function IssueDetail({ slug }) {
  const d = ISSUE_DETAIL[slug] || ISSUE_DETAIL.permitting;
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
          </article>

          <aside className="sticky-aside" data-sticky style={{ position: 'sticky', top: 120, alignSelf: 'start' }}>
            <div className="card">
              <Eyebrow>Move on this</Eyebrow>
              <h3 className="h-4" style={{ marginTop: 10, fontFamily: 'var(--serif)', fontSize: 22 }}>
                Like this position? Take an action.
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
                <button className="btn btn-primary btn-full" onClick={() => navigate('/donate')}>Donate</button>
                <button className="btn btn-secondary btn-full" onClick={() => navigate('/petition')}>Sign petition</button>
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
function NewsPage() {
  const items = [
    { tag: 'Op-ed', date: 'Dec 12, 2025', source: 'FITSNews', title: 'Stop Stacking Paper: Why Busyness Is Bankrupting South Carolina.' },
    { tag: 'Op-ed', date: 'Jan 14, 2026', source: 'Post & Courier', title: 'If You Cannot Build A School For Them, Do Not Build A Subdivision For Them.' },
    { tag: 'Press', date: 'Feb 03, 2026', source: 'WCSC News 5', title: 'James Island business owner enters race for SC House 115.' },
    { tag: 'Op-ed', date: 'Feb 20, 2026', source: 'The State', title: 'The 6% Rate Is A Promise. Honor It.' },
    { tag: 'Op-ed', date: 'Mar 06, 2026', source: 'FITSNews', title: 'Modernize Advanced Directives — Or Stop Pretending To Care About Aging.' },
    { tag: 'Press', date: 'Apr 02, 2026', source: 'Live 5 News', title: 'Speaker Smith endorses Garmon for HD-115.' },
  ];
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
                <a href="#read" className="btn-ghost" style={{ fontSize: 14, color: 'var(--crimson)', fontWeight: 600 }}>Read →</a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactPage() {
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
            <Eyebrow>Press</Eyebrow>
            <p style={{ marginTop: 12, fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--navy)' }}>media@togetherwithgarmon.com</p>
            <p className="small">Media kit, interview requests, event credentials. We respond within 24 hours.</p>

            <hr className="rule" style={{ margin: '24px 0' }} />

            <Eyebrow>General</Eyebrow>
            <p style={{ marginTop: 12, fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--navy)' }}>hello@togetherwithgarmon.com</p>
            <p className="small">(843) 555-0115 · M–F, 9 am – 6 pm</p>

            <hr className="rule" style={{ margin: '24px 0' }} />

            <Eyebrow>Mail</Eyebrow>
            <p style={{ marginTop: 12, fontSize: 16 }}>
              Committee to Elect Johnnie Garmon<br />
              PO Box 30115<br />
              Charleston, SC 29412
            </p>
          </div>
          <div className="card">
            <Eyebrow>Send a note</Eyebrow>
            <form style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}
              onSubmit={(e) => { e.preventDefault(); navigate('/'); }}>
              <div className="field"><label>Name</label><input type="text" /></div>
              <div className="field"><label>Email</label><input type="email" /></div>
              <div className="field"><label>What's this about?</label>
                <select><option>General question</option><option>Press inquiry</option><option>Volunteer</option><option>Event hosting</option></select>
              </div>
              <div className="field"><label>Message</label><textarea rows="5" /></div>
              <button className="btn btn-primary" type="submit">Send</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { VolunteerPage, EventsPage, AboutPage, IssuesPage, IssueDetail, NewsPage, ContactPage });
