/* global React */
const { useState, useEffect } = React;

function HomePage({ t, showToast, openNewsletter }) {
  const tagline = t.tagline;
  const colorMode = t.colorMode; // navy / crimson / balanced
  const heroVariant = t.heroVariant; // photoLeft / fullBleed / split
  const issueStyle = t.issueStyle; // index / bold / photo
  const showGold = t.showGold;

  const heroBg = '#C8242F';
  const heroBgDeep = '#7A1019';

  return (
    <main>
      {/* HERO */}
      <Hero variant={heroVariant} tagline={tagline} bg={heroBg} bgDeep={heroBgDeep} colorMode={colorMode} showGold={showGold} />

      <EndorsementBar />

      {/* PILLAR / WORKING PROMISES */}
      <section style={{ background: 'var(--paper)' }}>
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: 64, alignItems: 'end', marginBottom: 56 }}>
            <div>
              <Eyebrow>The platform</Eyebrow>
              <h2 className="h-1" style={{ marginTop: 16 }}>
                Six things Johnnie will <em style={{ color: 'var(--crimson)', fontStyle: 'italic' }}>actually fight for</em> in Columbia.
              </h2>
            </div>
            <p className="lede" style={{ maxWidth: 460 }}>
              No vague slogans. Specific bills, deadlines, and votes — the kind of platform you can hold a representative to after the election.
            </p>
          </div>

          <PillarsGrid style={issueStyle} showGold={showGold} />

          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/issues')}>
              See all positions →
            </button>
          </div>
        </div>
      </section>

      {/* PETITION COUNTER + LIVE SOCIAL PROOF */}
      <CounterBlock showToast={showToast} showGold={showGold} />

      {/* STORY / FOUNDATION */}
      <StoryBlock />

      {/* EVENTS TEASER */}
      <EventTeaser />

      {/* CLOSING CTA */}
      <ClosingCTA />
    </main>
  );
}

/* ── HERO ────────────────────────────────────────────────────── */
function Hero({ variant, tagline, bg, bgDeep, colorMode, showGold }) {
  // Civic Modern hero — not a stock-flag explosion.
  // Headline + tagline + dual CTA + an accent panel that varies by `variant`.
  const goldDot = showGold ? <span style={{ color: 'var(--gold)' }}>★</span> : null;

  return (
    <section style={{
      background: `linear-gradient(180deg, ${bg} 0%, ${bgDeep} 100%)`,
      color: 'var(--paper)',
      padding: '72px 0 0',
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
          <div className="fade-up" style={{ paddingTop: 24 }}>
            <Eyebrow color="var(--gold-soft)">Republican · SC House Dist. 115</Eyebrow>
            <h1 className="h-display" style={{ color: 'var(--paper)', marginTop: 22, lineHeight: 0.96 }}>
              {tagline}
            </h1>
            <p className="lede" style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 540, marginTop: 24, fontSize: 20 }}>
              From Section 8 housing to thirty years building businesses across South Carolina.
              Now Johnnie Garmon is asking for your vote — to bring the same accountability he
              demanded from his own companies to the people's work in Columbia.
            </p>

            <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/donate')}>
                Donate to the campaign
              </button>
              <button onClick={() => navigate('/petition')} className="btn btn-lg" style={{
                background: 'transparent', color: 'var(--paper)',
                border: '1px solid rgba(255,255,255,0.4)',
              }}>
                Sign the petition
              </button>
            </div>

            <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap', alignItems: 'center' }}>
              <Stars count={5} color="var(--gold-soft)" />
              <div className="fineprint" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Joined by <strong style={{ color: 'var(--paper)' }}>847 neighbors</strong> on the petition · <strong style={{ color: 'var(--paper)' }}>312 donors</strong> · <strong style={{ color: 'var(--paper)' }}>1,940 doors knocked</strong>
              </div>
            </div>
          </div>

          {/* RIGHT — visual */}
          <div className="fade-up" style={{ position: 'relative', minHeight: 520 }}>
            {variant === 'photoLeft' && <HeroPhotoCard goldDot={goldDot} />}
            {variant === 'fullBleed' && <HeroPhotoCard goldDot={goldDot} />}
            {variant === 'split' && <HeroPhotoCard goldDot={goldDot} />}
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
            <StatLine k="30+ years" v="Building businesses across SC" />
            <StatLine k="3 daughters" v="Family rooted in Charleston" />
            <StatLine k="June 9" v="Republican primary — early vote opens May 26" />
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

function HeroPhotoCard({ goldDot }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <img src="assets/garmon-family.jpg"
        alt="Johnnie Garmon with his wife and daughter on a Lowcountry boardwalk at golden hour"
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
      <div style={{
        background: 'var(--paper)',
        color: 'var(--ink)',
        padding: '20px 22px',
        borderRadius: 4,
        boxShadow: 'var(--shadow)',
        position: 'relative',
        marginTop: -56,
        marginLeft: 24,
        marginRight: -24,
        borderLeft: '4px solid var(--crimson)',
      }}>
        <div className="eyebrow" style={{ color: 'var(--ink-3)' }}>{goldDot} Author, Failure Disrupted</div>
        <p className="serif" style={{ fontSize: 18, fontStyle: 'italic', margin: '10px 0 0', color: 'var(--navy-deep)', lineHeight: 1.4 }}>
          "This state gave me a shot. I'm running so the next kid gets the same."
        </p>
        <div style={{ marginTop: 12, fontSize: 12, color: 'var(--ink-3)' }}>— Johnnie Garmon</div>
      </div>
    </div>
  );
}

/* ── PILLARS GRID ────────────────────────────────────────────── */
const PILLARS = [
  { n: '01', tag: 'Permitting', title: 'Stop Stacking Paper.', body: 'Demand 90-day permit deadlines, public throughput numbers, and accountability when agencies miss them.' },
  { n: '02', tag: 'Property tax', title: 'Protect the 6% Rate.', body: 'Long-time residents have earned a place to stand. We won\'t tax them out of the homes they built.' },
  { n: '03', tag: 'Growth', title: 'Concurrency or Bust.', body: 'No new subdivisions where the schools, roads, and stormwater can\'t keep up. Build infrastructure first.' },
  { n: '04', tag: 'Healthcare', title: 'Aging at Home.', body: 'From advanced directives to in-home care, end-of-life can\'t stay a bureaucratic afterthought.' },
  { n: '05', tag: 'Small biz', title: 'Defend Main Street.', body: 'Dram shop reform, permit accountability, and no unfunded mandates dumped on counties.' },
  { n: '06', tag: 'Education', title: 'Choice and Transparency.', body: 'Parental control, transparent funding, and no DEI mandates inside K–12 classrooms.' },
];

function PillarsGrid({ style: cardStyle, showGold }) {
  return (
    <div className="grid grid-3" style={{ gap: 24 }}>
      {PILLARS.map((p, i) => <PillarCard key={p.n} p={p} idx={i} cardStyle={cardStyle} showGold={showGold} />)}
    </div>
  );
}

function PillarCard({ p, idx, cardStyle, showGold }) {
  const [hover, setHover] = useState(false);

  if (cardStyle === 'bold') {
    const isAccent = idx % 3 === 1;
    return (
      <a href="#/issues" onClick={(e) => { e.preventDefault(); navigate('/issues'); }}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          background: isAccent ? 'var(--crimson)' : 'var(--navy)',
          color: 'var(--paper)',
          padding: '32px 28px',
          borderRadius: 4,
          minHeight: 280,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          transform: hover ? 'translateY(-3px)' : 'translateY(0)',
          boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
          transition: 'all .2s ease',
        }}>
        <div>
          <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>{p.n} · {p.tag}</div>
          <h3 className="h-3" style={{ color: 'var(--paper)', marginTop: 16 }}>{p.title}</h3>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 15 }}>{p.body}</p>
      </a>
    );
  }

  // index / default
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
        <div className="serif" style={{ fontSize: 36, fontWeight: 600, color: 'var(--navy)', letterSpacing: '-0.04em', lineHeight: 1 }}>{p.n}</div>
        {showGold && <span className="pill pill-gold">{p.tag}</span>}
        {!showGold && <span className="pill">{p.tag}</span>}
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
function CounterBlock({ showToast, showGold }) {
  const [zip, setZip] = useState('');
  const [email, setEmail] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!email || !zip) return;
    showToast('Petition signed. Welcome to the team.');
    setZip(''); setEmail('');
  };

  return (
    <section style={{ background: 'var(--paper-2)', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
      <div className="wrap">
        <div className="grid grid-2" style={{ gap: 64, alignItems: 'center' }}>
          <div>
            <Eyebrow>Live</Eyebrow>
            <h2 className="h-1" style={{ marginTop: 16 }}>
              Already <span style={{ color: 'var(--crimson)' }}>847 neighbors</span> have signed on.
            </h2>
            <p className="lede" style={{ marginTop: 16, maxWidth: 480 }}>
              The petition isn't a mailing-list trick. It's the public record of who is willing
              to put their name behind this campaign before primary day.
            </p>

            <div className="grid grid-3" style={{ gap: 16, marginTop: 36 }}>
              <CounterTile label="Petition signatures" target={847} cap={1500} accent="var(--crimson)" />
              <CounterTile label="Contributors" target={312} cap={500} accent="var(--navy)" />
              <CounterTile label="Doors knocked" target={1940} cap={5000} accent={showGold ? 'var(--gold)' : 'var(--navy-soft)'} />
            </div>
          </div>

          <form onSubmit={submit} className="card" style={{ padding: 32 }}>
            <Eyebrow>Add your name</Eyebrow>
            <h3 className="h-3" style={{ marginTop: 12 }}>Sign the petition.</h3>
            <p className="small" style={{ margin: '8px 0 22px' }}>
              Takes 12 seconds. Your name goes on the public signature wall.
            </p>
            <div className="col" style={{ gap: 14 }}>
              <div className="field">
                <label htmlFor="petname">Full name</label>
                <input id="petname" type="text" placeholder="Mary Pinckney" required />
              </div>
              <div className="grid grid-2" style={{ gap: 14 }}>
                <div className="field">
                  <label htmlFor="petzip">ZIP</label>
                  <input id="petzip" type="text" pattern="[0-9]{5}" placeholder="29412" value={zip} onChange={e => setZip(e.target.value)} required />
                </div>
                <div className="field">
                  <label htmlFor="petemail">Email</label>
                  <input id="petemail" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
              </div>
              <button className="btn btn-primary btn-full btn-lg" type="submit">I'm in →</button>
              <p className="fineprint" style={{ margin: 0 }}>By signing, you agree to be added to the campaign list. We'll never share your info.</p>
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
function StoryBlock() {
  return (
    <section>
      <div className="wrap">
        <div className="grid grid-2" style={{ gap: 64, alignItems: 'center' }}>
          <div className="placeholder" style={{ aspectRatio: '4/5', minHeight: 480 }}>
            Garmon family portrait — Kelley + 3 daughters
          </div>
          <div>
            <Eyebrow>The story</Eyebrow>
            <h2 className="h-1" style={{ marginTop: 16 }}>
              Raised in Section 8.<br />
              <span style={{ color: 'var(--crimson)' }}>Built by South Carolina.</span>
            </h2>
            <p className="lede" style={{ marginTop: 18 }}>
              Johnnie didn't inherit a business or a name. He built three companies over thirty
              years — in healthcare, real estate, and home services — through ordinary,
              unglamorous work and a refusal to confuse activity with results.
            </p>
            <p style={{ color: 'var(--ink-2)', fontSize: 17 }}>
              He's the author of <em>Failure Disrupted</em>, was appointed by Governor McMaster
              to the South Carolina Healthcare Study Committee, and has spent the last decade
              helping families plan for aging-at-home and end-of-life decisions that the state
              has been content to ignore.
            </p>
            <div style={{ marginTop: 28, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button className="btn btn-secondary" onClick={() => navigate('/about')}>Read his story →</button>
              <a href="#book" className="btn btn-ghost">Get <em>Failure Disrupted</em> <span className="arrow">→</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── EVENT TEASER ────────────────────────────────────────────── */
function EventTeaser() {
  return (
    <section style={{ background: 'var(--navy-deep)', color: 'var(--paper)' }}>
      <div className="wrap">
        <div className="grid grid-2" style={{ gap: 48, alignItems: 'center' }}>
          <div>
            <Eyebrow color="var(--gold-soft)">Next event</Eyebrow>
            <div style={{ marginTop: 16, display: 'flex', alignItems: 'baseline', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 64, fontWeight: 600, color: 'var(--paper)', lineHeight: 1 }}>
                May 28
              </div>
              <div style={{ fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--gold-soft)' }}>
                Thursday · 5:30 – 7:30 pm
              </div>
            </div>
            <h3 className="h-2" style={{ color: 'var(--paper)', marginTop: 16 }}>
              Happy Hour with Johnnie — Kiawah & Seabrook neighbors.
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 17, maxWidth: 520, marginTop: 14 }}>
              Drinks on the deck, twenty minutes of remarks, then real Q&A. Hosted by Bill & Patty Holcombe at the Beach Club.
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => navigate('/events')}>RSVP — free</button>
              <button onClick={() => navigate('/events')} className="btn" style={{ background: 'transparent', color: 'var(--paper)', border: '1px solid rgba(255,255,255,0.3)' }}>All events</button>
            </div>
          </div>
          <img src="assets/garmon-rally.jpg"
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
  return (
    <section style={{ background: 'var(--paper-2)' }}>
      <div className="wrap-narrow" style={{ textAlign: 'center' }}>
        <Stars count={5} />
        <h2 className="h-1" style={{ marginTop: 20 }}>
          Six weeks. <span style={{ color: 'var(--crimson)' }}>One vote that matters.</span>
        </h2>
        <p className="lede" style={{ marginTop: 18, maxWidth: 620, margin: '18px auto 0' }}>
          The June 9 primary will be decided by a few thousand neighbors. Pick the action that fits your week:
        </p>
        <div style={{ marginTop: 36, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/donate')}>Donate</button>
          <button className="btn btn-secondary btn-lg" onClick={() => navigate('/petition')}>Sign petition</button>
          <button className="btn btn-secondary btn-lg" onClick={() => navigate('/volunteer')}>Volunteer</button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HomePage });
