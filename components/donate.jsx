/* global React */
const { useState } = React;

function DonatePage({ t, showToast }) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(100);
  const [custom, setCustom] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [form, setForm] = useState({
    fname: '', lname: '', email: '', zip: '',
    employer: '', occupation: '',
    citizen: false, ownFunds: false, notCorp: false,
  });

  const presets = [25, 50, 100, 250, 500, 1000, 3500];
  const finalAmount = custom ? Number(custom) : amount;

  const next = () => setStep(s => Math.min(3, s + 1));
  const back = () => setStep(s => Math.max(1, s - 1));

  return (
    <main style={{ background: 'var(--paper)', minHeight: '80vh' }}>
      <section style={{ background: 'var(--navy-deep)', color: 'var(--paper)', padding: '48px 0 56px' }}>
        <div className="wrap">
          <Eyebrow color="var(--gold-soft)">Contribute · FEC compliant</Eyebrow>
          <h1 className="h-1" style={{ color: 'var(--paper)', marginTop: 14, maxWidth: 720 }}>
            Every dollar buys door-knocks, mailers, and primary-day get-out-the-vote.
          </h1>
          <div style={{ display: 'flex', gap: 32, marginTop: 28, flexWrap: 'wrap', color: 'rgba(255,255,255,0.78)', fontSize: 14 }}>
            <span>● 312 contributors so far</span>
            <span>● Avg. gift: $86</span>
            <span>● Max individual: $3,500</span>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 56 }}>
        <div className="wrap split" style={{ '--split-cols': '1.6fr 1fr', '--split-gap': '40px' }}>
          <div>
            {/* Stepper */}
            <div className="stepper">
              {['Amount', 'Your info', 'Review'].map((label, i) => {
                const n = i + 1;
                const active = step === n;
                const done = step > n;
                return (
                  <div key={label} className="stepper-step" style={{
                    background: active ? 'var(--navy)' : done ? 'rgba(0,45,84,0.08)' : 'var(--paper-2)',
                    color: active ? 'var(--paper)' : done ? 'var(--navy)' : 'var(--ink-3)',
                  }}>
                    <span className="stepper-num" style={{
                      background: active ? 'var(--crimson)' : done ? 'var(--navy)' : 'transparent',
                      color: 'var(--paper)',
                      border: !active && !done ? '1px solid var(--ink-3)' : 'none',
                    }}>{done ? '✓' : n}</span>
                    <span className="stepper-label">{label}</span>
                  </div>
                );
              })}
            </div>

            {step === 1 && (
              <div className="card fade-up">
                <h2 className="h-3">Choose your amount</h2>
                <p className="small" style={{ margin: '6px 0 22px' }}>Every contribution is reported to the FEC.</p>

                <div className="amount-grid">
                  {presets.map(a => (
                    <button key={a} onClick={() => { setAmount(a); setCustom(''); }}
                      type="button"
                      style={{
                        padding: '20px 8px',
                        background: amount === a && !custom ? 'var(--navy)' : '#fff',
                        color: amount === a && !custom ? 'var(--paper)' : 'var(--navy)',
                        border: '1px solid ' + (amount === a && !custom ? 'var(--navy)' : 'var(--hairline)'),
                        borderRadius: 4,
                        fontFamily: 'var(--serif)',
                        fontSize: 22, fontWeight: 600,
                        letterSpacing: '-0.02em',
                        transition: 'all .15s ease',
                      }}>${a.toLocaleString()}</button>
                  ))}
                  <input type="number" placeholder="Other"
                    value={custom} onChange={e => setCustom(e.target.value)}
                    style={{
                      gridColumn: '1 / -1',
                      padding: '18px 16px',
                      border: '1px solid var(--hairline)',
                      borderRadius: 4,
                      fontFamily: 'var(--serif)', fontSize: 18,
                      background: '#fff',
                    }} />
                </div>

                <label style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '16px 18px',
                  border: '1px solid ' + (recurring ? 'var(--navy)' : 'var(--hairline)'),
                  background: recurring ? 'rgba(0,45,84,0.04)' : '#fff',
                  borderRadius: 4,
                  marginTop: 18,
                  cursor: 'pointer',
                }}>
                  <input type="checkbox" checked={recurring} onChange={e => setRecurring(e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: 'var(--navy)' }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>Make this monthly until June 9</div>
                    <div className="small" style={{ marginTop: 2 }}>The most useful gift a campaign can receive — predictable cash to plan a ground game.</div>
                  </div>
                </label>

                <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div className="small">Your contribution</div>
                    <div className="serif" style={{ fontSize: 32, fontWeight: 600, color: 'var(--navy)', letterSpacing: '-0.02em' }}>
                      ${finalAmount.toLocaleString()}{recurring && <span style={{ fontSize: 16, color: 'var(--ink-3)' }}> /mo</span>}
                    </div>
                  </div>
                  <button className="btn btn-primary btn-lg" onClick={next} disabled={!finalAmount}>Continue →</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="card fade-up">
                <h2 className="h-3">About you</h2>
                <p className="small" style={{ margin: '6px 0 22px' }}>Federal law requires employer & occupation for contributions over $200.</p>

                <div className="grid grid-2" style={{ gap: 14 }}>
                  <div className="field"><label>First name</label><input type="text" required value={form.fname} onChange={e => setForm({ ...form, fname: e.target.value })} /></div>
                  <div className="field"><label>Last name</label><input type="text" required value={form.lname} onChange={e => setForm({ ...form, lname: e.target.value })} /></div>
                  <div className="field"><label>Email</label><input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                  <div className="field"><label>ZIP</label><input type="text" pattern="[0-9]{5}" required value={form.zip} onChange={e => setForm({ ...form, zip: e.target.value })} /></div>
                  <div className="field"><label>Employer{finalAmount >= 200 && ' *'}</label><input type="text" value={form.employer} onChange={e => setForm({ ...form, employer: e.target.value })} required={finalAmount >= 200} /></div>
                  <div className="field"><label>Occupation{finalAmount >= 200 && ' *'}</label><input type="text" value={form.occupation} onChange={e => setForm({ ...form, occupation: e.target.value })} required={finalAmount >= 200} /></div>
                </div>

                <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <label className={'checkbox-row ' + (form.citizen ? 'checked' : '')}>
                    <input type="checkbox" checked={form.citizen} onChange={e => setForm({ ...form, citizen: e.target.checked })} />
                    <span style={{ fontSize: 14 }}>I am a U.S. citizen or lawfully admitted permanent resident.</span>
                  </label>
                  <label className={'checkbox-row ' + (form.ownFunds ? 'checked' : '')}>
                    <input type="checkbox" checked={form.ownFunds} onChange={e => setForm({ ...form, ownFunds: e.target.checked })} />
                    <span style={{ fontSize: 14 }}>This contribution is from my own funds, not those of another.</span>
                  </label>
                  <label className={'checkbox-row ' + (form.notCorp ? 'checked' : '')}>
                    <input type="checkbox" checked={form.notCorp} onChange={e => setForm({ ...form, notCorp: e.target.checked })} />
                    <span style={{ fontSize: 14 }}>This contribution is not from a corporate or labor union account.</span>
                  </label>
                </div>

                <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
                  <button className="btn btn-secondary" onClick={back}>← Back</button>
                  <button className="btn btn-primary btn-lg" onClick={next}
                    disabled={!form.fname || !form.lname || !form.email || !form.zip || !form.citizen || !form.ownFunds || !form.notCorp}>
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="card fade-up">
                <h2 className="h-3">Review &amp; confirm</h2>

                <div style={{ marginTop: 18, padding: 20, background: 'var(--paper-2)', borderRadius: 4 }}>
                  <div className="between" style={{ marginBottom: 8 }}>
                    <span className="small">Gift</span>
                    <strong className="serif" style={{ fontSize: 22, color: 'var(--navy)' }}>${finalAmount.toLocaleString()}{recurring && <span style={{ fontSize: 14, color: 'var(--ink-3)' }}> /mo</span>}</strong>
                  </div>
                  <div className="between"><span className="small">Donor</span><span style={{ fontSize: 14 }}>{form.fname} {form.lname}</span></div>
                  <div className="between"><span className="small">Email</span><span style={{ fontSize: 14 }}>{form.email}</span></div>
                  <div className="between"><span className="small">ZIP</span><span style={{ fontSize: 14 }}>{form.zip}</span></div>
                </div>

                <div style={{ marginTop: 22 }}>
                  <h4 className="h-4" style={{ marginBottom: 10 }}>Payment</h4>
                  <div className="grid grid-2" style={{ gap: 12 }}>
                    <div className="field" style={{ gridColumn: 'span 2' }}>
                      <label>Card number</label>
                      <input type="text" placeholder="•••• •••• •••• ••••" />
                    </div>
                    <div className="field"><label>Expiration</label><input type="text" placeholder="MM / YY" /></div>
                    <div className="field"><label>CVC</label><input type="text" placeholder="123" /></div>
                  </div>
                </div>

                <button className="btn btn-primary btn-lg btn-full" style={{ marginTop: 22 }}
                  onClick={() => { showToast('Thank you. Receipt sent to ' + (form.email || 'you') + '.'); navigate('/'); }}>
                  Confirm contribution of ${finalAmount.toLocaleString()}{recurring && '/mo'}
                </button>
                <p className="fineprint" style={{ marginTop: 14 }}>
                  By submitting, you certify the statements above are true. Paid for by the Committee to Elect Johnnie Garmon.
                </p>
              </div>
            )}
          </div>

          <aside className="sticky-aside" data-sticky style={{ alignSelf: 'start', position: 'sticky', top: 120 }}>
            <div className="card" style={{ borderTop: '4px solid var(--crimson)', background: '#fff' }}>
              <Eyebrow>What it pays for</Eyebrow>
              <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 0', display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
                <BuysRow amt="$25" buys="50 doors knocked in James Island" />
                <BuysRow amt="$100" buys="A targeted mail piece to 1 precinct" />
                <BuysRow amt="$500" buys="One day of digital ads in HD-115" />
                <BuysRow amt="$3,500" buys="A full week of primary-day GOTV operations" />
              </ul>
            </div>
            <div style={{ marginTop: 16, fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--ink-2)' }}>Federal limits:</strong> Individuals may contribute up to $3,500 per election. Corporate, union, and foreign-national contributions are prohibited. Contributions are not tax-deductible.
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function BuysRow({ amt, buys }) {
  return (
    <li style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
      <span className="serif" style={{ fontSize: 18, fontWeight: 600, color: 'var(--crimson)', minWidth: 60 }}>{amt}</span>
      <span style={{ color: 'var(--ink-2)' }}>{buys}</span>
    </li>
  );
}

Object.assign(window, { DonatePage });
