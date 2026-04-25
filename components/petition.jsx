/* global React */
const { useState, useEffect } = React;

const SAMPLE_NAMES = [
  'Mary', 'Robert', 'Elise', 'Walter', 'Patricia', 'Henry',
  'Carol', 'Daniel', 'Susan', 'James', 'Ann-Marie', 'Beau',
  'Margaret', 'Thomas', 'Linda', 'Charles', 'Helen', 'Bradford',
  'Joan', 'Edward', 'Frances', 'Robert', 'Caroline', 'Alfred',
  'Beth', 'Stephen', 'Mildred', 'Joseph', 'Hannah', 'Wesley',
  'Patrick', 'Sarah', 'Lawrence', 'Cynthia', 'Richard', 'Eleanor',
];

function firstNameOf(full) {
  return (full || '').trim().split(/\s+/)[0] || 'Anonymous';
}

function PetitionPage({ showToast }) {
  const [pledged, setPledged] = useState(false);
  const [count, setCount] = useState(847);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [recent, setRecent] = useState(SAMPLE_NAMES);

  const submit = (e) => {
    e.preventDefault();
    setRecent([firstNameOf(form.name), ...recent]);
    setCount(c => c + 1);
    setPledged(true);
    showToast('Pledge recorded. Welcome to the team.');
  };

  const pct = Math.min(100, (count / 1500) * 100);

  return (
    <main>
      <section style={{
        background: 'linear-gradient(180deg, var(--paper) 0%, var(--paper-2) 100%)',
        paddingTop: 64, paddingBottom: 48,
      }}>
        <div className="wrap-narrow" style={{ textAlign: 'center' }}>
          <Eyebrow>The Public Record</Eyebrow>
          <h1 className="h-display" style={{ marginTop: 18 }}>
            Stand on the record.<br />
            <span style={{ color: 'var(--crimson)' }}>Pledge my vote.</span>
          </h1>
          <p className="lede" style={{ marginTop: 22, maxWidth: 580, margin: '22px auto 0' }}>
            "I'll vote for Johnnie Garmon for SC House District 115 in the June 9 Republican
            primary and the November general election." That's the pledge. Your name appears
            on the public pledge wall below.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap split" style={{ '--split-gap': '48px' }}>
          {/* FORM */}
          <div className="sticky-aside" data-sticky style={{ position: 'sticky', top: 120, alignSelf: 'start' }}>
            <div className="card" style={{ padding: 36, borderTop: '4px solid var(--crimson)' }}>
              {!pledged ? (
                <form onSubmit={submit}>
                  <h2 className="h-3">Pledge my vote.</h2>
                  <p className="small" style={{ margin: '6px 0 24px' }}>Twelve seconds. No credit card. No follow-up calls unless you ask. Your pledge covers the June 9 primary and the November general.</p>

                  <div className="col" style={{ gap: 14 }}>
                    <div className="field"><label>Full name *</label>
                      <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Mary Pinckney" />
                      <span className="help">Only your first name appears on the public pledge wall.</span>
                    </div>
                    <div className="field"><label>Email *</label>
                      <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
                    </div>
                    <div className="field"><label>Phone (optional)</label>
                      <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="(843) 555-0115" />
                      <span className="help">Used only for primary-day reminders. Never sold.</span>
                    </div>

                    <button className="btn btn-primary btn-full btn-lg" type="submit">Pledge my vote →</button>

                    <p className="fineprint" style={{ margin: 0 }}>
                      By pledging, your first name will appear publicly. You agree to receive campaign updates. Paid for by the Committee to Elect Johnnie Garmon.
                    </p>
                  </div>
                </form>
              ) : (
                <div className="fade-up" style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{
                    width: 64, height: 64, margin: '0 auto',
                    background: 'var(--navy)', color: 'var(--paper)',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 28, fontWeight: 600,
                  }}>✓</div>
                  <h3 className="h-3" style={{ marginTop: 16 }}>You're pledge #{count.toLocaleString()}.</h3>
                  <p style={{ marginTop: 12, color: 'var(--ink-2)' }}>Look for your first name on the wall below — it's already there.</p>
                  <div style={{ marginTop: 20, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button className="btn btn-primary" onClick={() => navigate('/donate')}>Chip in $25 →</button>
                    <button className="btn btn-secondary" onClick={() => navigate('/volunteer')}>Volunteer instead</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* COUNTER + WALL */}
          <div>
            <div style={{ background: 'var(--navy)', color: 'var(--paper)', padding: 32, borderRadius: 4 }}>
              <div className="between" style={{ alignItems: 'baseline' }}>
                <div>
                  <Eyebrow color="var(--gold-soft)">Live count</Eyebrow>
                  <div className="serif" style={{ fontSize: 72, fontWeight: 600, lineHeight: 1, color: 'var(--paper)', marginTop: 10, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.03em' }}>
                    <CountUp to={count} />
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>pledges · goal 1,500 by June 9</div>
                </div>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--crimson)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <span className="pulse-dot" style={{ width: 10, height: 10, background: 'var(--paper)', borderRadius: '50%' }} />
                </div>
              </div>
              <div style={{ marginTop: 22, height: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: 'var(--gold)', transition: 'width 1.4s ease' }} />
              </div>
              <div className="between" style={{ marginTop: 10, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                <span>{pct.toFixed(0)}% to goal</span>
                <span>{(1500 - count).toLocaleString()} to go</span>
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <Eyebrow>The pledge wall</Eyebrow>
              <div style={{
                marginTop: 14,
                background: '#fff',
                border: '1px solid var(--hairline)',
                borderRadius: 4,
                maxHeight: 480,
                overflowY: 'auto',
              }}>
                {recent.map((n, i) => (
                  <div key={i} style={{
                    padding: '12px 18px',
                    borderBottom: i < recent.length - 1 ? '1px solid var(--hairline-2)' : 'none',
                    fontSize: 14,
                    color: 'var(--ink-2)',
                    display: 'flex', alignItems: 'center', gap: 12,
                    fontFamily: 'var(--serif)',
                    background: i === 0 && pledged ? 'rgba(201,169,97,0.12)' : 'transparent',
                  }}>
                    <span style={{ color: 'var(--ink-3)', fontFamily: 'var(--mono)', fontSize: 11, minWidth: 36 }}>
                      #{(count - i).toString().padStart(4, '0')}
                    </span>
                    {n}
                  </div>
                ))}
              </div>
              <p className="fineprint" style={{ marginTop: 10 }}>Showing the {recent.length} most recent. Full list available on request.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { PetitionPage });
