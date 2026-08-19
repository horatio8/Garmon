/* global React */
const { useState, useEffect } = React;

function HomePage({ data, showToast }) {
  const tagline = data.settings.tagline;
  const NUM_WORDS = ['Zero','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten'];
  const pillarCount = (data.pillars || []).length;
  const pillarCountWord = NUM_WORDS[pillarCount] || pillarCount;

  return (
    <main>
      {/* HERO */}
      <Hero tagline={tagline} settings={data.settings} />

      <EndorsementBar endorsements={data.endorsements} />

      {/* PILLAR / WORKING PROMISES */}
      <section style={{ background: 'var(--paper)' }}>
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: 64, alignItems: 'end', marginBottom: 56 }}>
            <div>
              <Eyebrow>The platform</Eyebrow>
              <h2 className="h-1" style={{ marginTop: 16 }}>
                {pillarCountWord} {pillarCount === 1 ? 'thing' : 'things'} Johnnie will <em style={{ color: 'var(--crimson)', fontStyle: 'italic' }}>actually fix</em> in Columbia.
              </h2>
            </div>
            <p className="lede" style={{ maxWidth: 460 }}>
              No vague slogans. Specific bills, deadlines, and votes — the kind of platform you can hold a representative to after the election.
            </p>
          </div>

          <PillarsGrid pillars={data.pillars} />

          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/issues')}>
              See all positions →
            </button>
          </div>
        </div>
      </section>

      {/* PLEDGE COUNTER + LIVE SOCIAL PROOF */}
      <CounterBlock data={data} showToast={showToast} />

      {/* STORY / FOUNDATION */}
      <StoryBlock settings={data.settings} />

      {/* CLOSING CTA */}
      <ClosingCTA />
    </main>
  );
}

/* ── HERO ────────────────────────────────────────────────────── */
function Hero({ tagline, settings }) {
  const goldDot = <span style={{ color: 'var(--gold)' }}>★</span>;
  const bg = '#C8242F', bgDeep = '#7A1019';

  return (
    <section className="hero-section" style={{
      background: `linear-gradient(180deg, ${bg} 0%, ${bgDeep} 100%)`,
      color: 'var(--paper)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* faint star pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        opacity: 0.6,
      }} />

      <div className="wrap" style={{ position: 'relative' }}>
        <div className="grid grid-2" style={{ gap: 56, alignItems: 'start' }}>
          {/* LEFT — message */}
          <div className="fade-up hero-message">
            <div className="hero-eyebrow">
              <span className="dot" style={{ background: 'var(--gold)' }} />
              Republican · SC House Dist. 115
            </div>
            <h1 className="h-display" style={{ color: 'var(--paper)', marginTop: 22, lineHeight: 0.96 }}>
              {tagline}
            </h1>
            <p className="lede" style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 540, marginTop: 24, fontSize: 20 }}>
              From Section 8 housing to 25 years building businesses across South Carolina.
              Now Johnnie Garmon is asking for your vote — to bring the same accountability he
              demanded from his own companies to the people's work in Columbia.
            </p>

            <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
              <button className="btn btn-donate-light btn-lg" onClick={() => navigate('/donate')}>
                Donate to the campaign
              </button>
              <button onClick={() => navigate('/petition')} className="btn btn-lg" style={{
                background: 'transparent', color: 'var(--paper)',
                border: '1px solid rgba(255,255,255,0.4)',
              }}>
                Pledge my vote
              </button>
            </div>
          </div>

          {/* RIGHT — visual */}
          <div className="fade-up" style={{ position: 'relative' }}>
            <HeroPhotoCard goldDot={goldDot} settings={settings} />
          </div>
        </div>

        {/* Bottom strip — three quick stats */}
        <div style={{
          marginTop: 64,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderBottom: 'none',
          borderRadius: '8px 8px 0 0',
          padding: '28px 32px',
        }}>
          <div className="grid grid-3" style={{ gap: 32 }}>
            <StatLine k="25+ years" v="Building businesses across SC" />
            <StatLine k="10,000+"   v="Patients served" />
            <StatLine k="250+"      v="Jobs created" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatLine({ k, v }) {
  return (
    <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: 16 }}>
      <div className="serif" style={{ fontSize: 22, fontWeight: 600, color: 'var(--paper)', letterSpacing: '-0.02em' }}>{k}</div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{v}</div>
    </div>
  );
}

function HeroPhotoCard({ goldDot, settings }) {
  const heroImage = (settings && settings.heroImage) || 'assets/garmon-family.jpg';
  return (
    <img src={heroImage}
      alt="Johnnie Garmon and family"
      style={{
        width: '100%',
        aspectRatio: '4/5',
        minHeight: 380,
        objectFit: 'cover',
        objectPosition: 'center 20%',
        borderRadius: 4,
        display: 'block',
        boxShadow: 'var(--shadow)',
      }} />
  );
}

/* ── PILLARS GRID ────────────────────────────────────────────── */
function PillarsGrid({ pillars }) {
  const list = pillars || [];
  return (
    <div className="grid grid-3" style={{ gap: 24 }}>
      {list.map((p, i) => <PillarCard key={p.id || i} p={p} idx={i} />)}
    </div>
  );
}

function PillarCard({ p }) {
  const [hover, setHover] = useState(false);
  return (
    <a href="#/issues" onClick={(e) => { e.preventDefault(); navigate('/issues'); }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: '#fff',
        border: '1px solid var(--hairline)',
        borderTop: hover ? '3px solid var(--crimson)' : '3px solid var(--navy)',
        padding: '28px 28px 24px',
        borderRadius: 4,
        minHeight: 260,
        display: 'flex', flexDirection: 'column',
        gap: 12,
        transition: 'all .2s ease',
        boxShadow: hover ? 'var(--shadow)' : 'var(--shadow-sm)',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
      }}>
      <div className="between">
        <div className="serif" style={{ fontSize: 36, fontWeight: 600, color: 'var(--navy)', letterSpacing: '-0.04em', lineHeight: 1 }}>{p.number}</div>
        <span className="pill pill-gold">{p.tag}</span>
      </div>
      <h3 className="h-3" style={{ marginTop: 4 }}>{p.title}</h3>
      <p style={{ color: 'var(--ink-2)', fontSize: 15, flex: 1 }}>{p.body}</p>
      <div style={{
        color: 'var(--crimson)', fontSize: 13, fontWeight: 600,
        letterSpacing: '0.04em', textTransform: 'uppercase',
        marginTop: 8,
      }}>Read the position →</div>
    </a>
  );
}

/* ── COUNTER BLOCK ───────────────────────────────────────────── */
function CounterBlock({ data, showToast }) {
  const settings = data.settings;
  const baseCount = Number(settings.pledgeBaseCount) || 1103;
  const goal = Number(settings.pledgeGoal) || 2000;
  const donorCount = Number(settings.donorCount) || 312;
  const donorTarget = Number(settings.donorTarget) || 500;
  const doorsKnocked = Number(settings.doorsKnocked) || 1940;
  const doorsTarget = Number(settings.doorsTarget) || 5000;
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await window.submitPledge(e.target);
    } catch (err) {
      setSubmitting(false);
      showToast("Couldn't reach the campaign server. Please try again.");
      return;
    }
    if (window.submitToAirtable) window.submitToAirtable('pledge', { ...form, source: 'home_counter' });
    setSubmitting(false);
    showToast('Pledge recorded. Welcome to the team.');
    setForm({ first_name: '', last_name: '', email: '', phone: '' });
  };

  return (
    <section style={{ background: 'var(--paper-2)', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
      <div className="wrap">
        <div className="grid grid-2" style={{ gap: 64, alignItems: 'center' }}>
          <div>
            <Eyebrow>Live</Eyebrow>
            <h2 className="h-1" style={{ marginTop: 16 }}>
              Already <span style={{ color: 'var(--crimson)' }}>{baseCount.toLocaleString()} neighbors</span> have pledged their support.
            </h2>
            <p className="lede" style={{ marginTop: 16, maxWidth: 480 }}>
              The pledge isn't a mailing-list trick. It's the public record of neighbors who've
              committed to vote for Johnnie in the {settings.primaryShort} primary and the November general.
            </p>

            <div style={{ marginTop: 36, maxWidth: 320 }}>
              <CounterTile label="Vote pledges" target={baseCount} cap={goal} accent="var(--crimson)" />
            </div>
          </div>

          <form onSubmit={submit} className="card" style={{ padding: 32 }}>
            <Eyebrow>Pledge your vote</Eyebrow>
            <h3 className="h-3" style={{ marginTop: 12 }}>Pledge my vote.</h3>
            <p className="small" style={{ margin: '8px 0 22px' }}>
              Takes 12 seconds. Your first name goes on the public pledge wall.
            </p>
            <div className="col" style={{ gap: 14 }}>
              <div className="grid grid-2" style={{ gap: 14 }}>
                <div className="field">
                  <label htmlFor="hp-first">First name</label>
                  <input id="hp-first" name="first_name" type="text" placeholder="Mary" required
                    value={form.first_name}
                    onChange={e => setForm({ ...form, first_name: e.target.value })} />
                </div>
                <div className="field">
                  <label htmlFor="hp-last">Last name</label>
                  <input id="hp-last" name="last_name" type="text" placeholder="Pinckney" required
                    value={form.last_name}
                    onChange={e => setForm({ ...form, last_name: e.target.value })} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="hp-phone">Cell / Mobile phone</label>
                <input id="hp-phone" name="phone" type="tel" placeholder="(843) 989-0843" required
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="field">
                <label htmlFor="hp-email">Email</label>
                <input id="hp-email" name="email" type="email" placeholder="you@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <button className="btn btn-primary btn-full btn-lg" type="submit" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Pledge my vote →'}
              </button>
              <p className="fineprint" style={{ margin: 0 }}>By pledging, you agree to be added to the campaign list. We'll never share your info.</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function CounterTile({ label, target, cap, accent }) {
  const pct = Math.min(100, (target / cap) * 100);
  return (
    <div style={{ background: '#fff', padding: 18, borderRadius: 4, border: '1px solid var(--hairline)' }}>
      <div className="counter-num" style={{ color: accent, fontSize: 36 }}><CountUp to={target} /></div>
      <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 6, lineHeight: 1.3 }}>{label}<br /><span style={{ opacity: 0.7 }}>goal {cap.toLocaleString()}</span></div>
      <div style={{ marginTop: 10, height: 4, background: 'var(--hairline-2)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: accent, transition: 'width 1.4s ease' }} />
      </div>
    </div>
  );
}

/* ── STORY BLOCK ─────────────────────────────────────────────── */
function StoryBlock({ settings }) {
  const storyImage = (settings && settings.storyImage) || 'assets/garmon-family-portrait.jpg';
  return (
    <section>
      <div className="wrap">
        <div className="grid grid-2" style={{ gap: 64, alignItems: 'center' }}>
          <img src={storyImage}
            alt="The Garmon family"
            style={{
              width: '100%',
              aspectRatio: '4/5',
              minHeight: 480,
              objectFit: 'cover',
              objectPosition: 'center 35%',
              borderRadius: 4,
              display: 'block',
              boxShadow: 'var(--shadow)',
            }} />
          <div>
            <Eyebrow>The story</Eyebrow>
            <h2 className="h-1" style={{ marginTop: 16 }}>
              Raised in Section 8.<br />
              <span style={{ color: 'var(--crimson)' }}>Built by South Carolina.</span>
            </h2>
            <p className="lede" style={{ marginTop: 18 }}>
              Johnnie didn't inherit a business or a name. He built six companies over thirty
              years — in healthcare, real estate, and home services — through ordinary,
              unglamorous work and a refusal to confuse activity with results.
            </p>
            <p style={{ color: 'var(--ink-2)', fontSize: 17 }}>
              He's the author of <em>Failure Disrupted</em>, was appointed by Governor McMaster
              to the South Carolina Healthcare Study Committee, and has spent the last decade
              helping families plan for aging-at-home and end-of-life decisions that the state
              has been content to ignore.
            </p>

            {(settings && settings.bookImage) && (
              <a href={(settings && settings.bookUrl) || 'https://theperissosgroup.com'}
                 target="_blank" rel="noreferrer"
                 style={{ display: 'inline-flex', alignItems: 'center', gap: 18, marginTop: 24,
                          padding: 14, background: 'var(--paper-2)', borderRadius: 6,
                          border: '1px solid var(--hairline)', textDecoration: 'none' }}>
                <img src={settings.bookImage} alt="Failure Disrupted by Johnnie Garmon"
                     style={{ width: 80, height: 'auto', display: 'block', boxShadow: 'var(--shadow-sm)' }} />
                <div>
                  <div className="serif" style={{ fontSize: 18, fontWeight: 600, color: 'var(--navy-deep)', lineHeight: 1.2 }}>
                    <em>Failure Disrupted</em>
                  </div>
                  <div className="small" style={{ marginTop: 4, color: 'var(--ink-3)' }}>
                    Get the book →
                  </div>
                </div>
              </a>
            )}

            <div style={{ marginTop: 28, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button className="btn btn-secondary" onClick={() => navigate('/about')}>Read his story →</button>
              <a href={(settings && settings.bookUrl) || 'https://theperissosgroup.com'}
                 target="_blank" rel="noreferrer" className="btn btn-ghost">
                Get <em>Failure Disrupted</em> <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── EVENT TEASER ────────────────────────────────────────────── */
function EventTeaser({ data }) {
  const events = (data && data.events) || [];
  const featured = events.find(e => e.tag === 'Featured') || events[0];
  const eventImage = (data && data.settings && data.settings.eventImage) || 'assets/garmon-rally.jpg';
  if (!featured) return null;
  return (
    <section style={{ background: 'var(--navy-deep)', color: 'var(--paper)' }}>
      <div className="wrap">
        <div className="grid grid-2" style={{ gap: 48, alignItems: 'center' }}>
          <div>
            <Eyebrow color="var(--gold-soft)">Next event</Eyebrow>
            <div style={{ marginTop: 16, display: 'flex', alignItems: 'baseline', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 64, fontWeight: 600, color: 'var(--paper)', lineHeight: 1 }}>
                {featured.date_label}
              </div>
              <div style={{ fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--gold-soft)' }}>
                {featured.day_label} · {featured.time_label}
              </div>
            </div>
            <h3 className="h-2" style={{ color: 'var(--paper)', marginTop: 16 }}>
              {featured.title}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 17, maxWidth: 520, marginTop: 14 }}>
              {featured.location} · Hosted by {featured.host}.
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => navigate('/events')}>RSVP — free</button>
              <button onClick={() => navigate('/events')} className="btn" style={{ background: 'transparent', color: 'var(--paper)', border: '1px solid rgba(255,255,255,0.3)' }}>All events</button>
            </div>
          </div>
          <img src={eventImage}
            alt="Johnnie Garmon and supporters holding campaign signs at a rally"
            style={{
              width: '100%',
              aspectRatio: '5/4',
              minHeight: 320,
              objectFit: 'cover',
              objectPosition: 'center 30%',
              borderRadius: 4,
              display: 'block',
              boxShadow: 'var(--shadow-lg)',
            }} />
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  const settings = (window.SITE_DATA && window.SITE_DATA.settings) || {};
  const primaryShort = settings.primaryShort || 'June 9';
  return (
    <section style={{ background: 'var(--paper-2)' }}>
      <div className="wrap-narrow" style={{ textAlign: 'center' }}>
        <Stars count={5} />
        <h2 className="h-1" style={{ marginTop: 20 }}>
          <span style={{ color: 'var(--crimson)' }}>One vote that matters.</span>
        </h2>
        <p className="lede" style={{ marginTop: 18, maxWidth: 620, margin: '18px auto 0' }}>
          The {primaryShort} primary will be decided by a few thousand neighbors. Pick the action that fits your week:
        </p>
        <div style={{ marginTop: 36, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-donate-light btn-lg" onClick={() => navigate('/donate')}>Donate</button>
          <button className="btn btn-secondary btn-lg" onClick={() => navigate('/petition')}>Pledge my vote</button>
          <button className="btn btn-secondary btn-lg" onClick={() => navigate('/volunteer')}>Volunteer</button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HomePage });
