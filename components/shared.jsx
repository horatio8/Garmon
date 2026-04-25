/* global React */
const { useState, useEffect, useRef } = React;

/* ────────────────────────────────────────────────────────────
   Shared building blocks for the Garmon prototype
   ──────────────────────────────────────────────────────────── */

function Logo({ size = 26, white = false }) {
  // Real campaign logo. JPEG has a white background, so for the warm off-white
  // menu bar we sit it on its own white pill to keep clean edges and presence.
  const h = size * 2.2;
  return (
    <a href="#/" onClick={(e) => { e.preventDefault(); navigate('/'); }}
       style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1, height: h }}>
      <img
        src={white ? 'assets/garmon-logo-transparent.png' : 'assets/garmon-logo.jpeg'}
        alt="Johnnie Garmon for State House"
        style={{
          height: h,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
          filter: white ? 'brightness(0) invert(1)' : 'none',
          background: white ? 'transparent' : '#fff',
          padding: white ? 0 : '4px 10px',
          borderRadius: white ? 0 : 4,
        }}
      />
    </a>
  );
}

function Stars({ count = 5, color }) {
  return (
    <span className="star-strip" style={color ? { color } : null}>
      {Array.from({ length: count }).map((_, i) => <span key={i} className="star" />)}
    </span>
  );
}

function Eyebrow({ children, dot = true, color }) {
  return (
    <div className="eyebrow" style={color ? { color } : null}>
      {dot && <span className="dot" />}
      {children}
    </div>
  );
}

/* ── Top nav ─────────────────────────────────────────────────── */
function Nav({ route, election }) {
  const e = election || { label: 'Primary', dateStr: 'June 9, 2026', days: 0 };
  const [open, setOpen] = useState(false);
  const items = [
    { label: 'About',     path: '/about' },
    { label: 'Issues',    path: '/issues' },
    { label: 'Events',    path: '/events' },
    { label: 'Volunteer', path: '/volunteer' },
    { label: 'News',      path: '/news' },
    { label: 'Contact',   path: '/contact' },
  ];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      background: 'var(--menu-bg)',
      borderBottom: '1px solid var(--hairline)',
    }}>
      <div style={{
        background: 'var(--red-bright)', color: '#fff',
        fontSize: 12, letterSpacing: '0.06em',
      }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px var(--gutter)', gap: 16, whiteSpace: 'nowrap' }}>
          <span style={{ flex: '0 1 auto', minWidth: 0 }}>
            <span style={{ color: '#FFE9A8' }}>●</span>{' '}
            <strong>{e.label}:</strong> {e.dateStr}
          </span>
          <span className="hide-nav" style={{ flex: '0 0 auto' }}>
            {e.days === 0 ? 'Vote today · HD‑115' : `${e.days} day${e.days === 1 ? '' : 's'} to go · HD‑115`}
          </span>
        </div>
      </div>
      <div className="wrap nav-row" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 24,
      }}>
        <Logo size={26} />
        <nav className="hide-nav" style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
          {items.map(it => (
            <a key={it.path} href={'#' + it.path}
               onClick={(e) => { e.preventDefault(); navigate(it.path); }}
               style={{
                 fontSize: 14, fontWeight: 500,
                 color: route === it.path ? 'var(--crimson)' : 'var(--ink)',
                 paddingBottom: 4,
                 borderBottom: route === it.path ? '2px solid var(--crimson)' : '2px solid transparent',
                 transition: 'color .15s ease',
               }}>{it.label}</a>
          ))}
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/petition')}>Pledge my vote</button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/donate')}>Donate</button>
        </nav>
        <button className="show-nav" onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}
          style={{
            background: 'transparent', border: '1px solid var(--hairline)', borderRadius: 4,
            padding: '10px 12px', width: 44, height: 40,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--ink)',
          }}>
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="16" viewBox="0 0 22 16" aria-hidden="true">
              <path d="M1 2h20M1 8h20M1 14h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>
      {open && (
        <div className="show-nav" style={{ padding: '12px 18px 20px', borderTop: '1px solid var(--hairline)' }}>
          {items.map(it => (
            <a key={it.path} href={'#' + it.path}
               onClick={(e) => { e.preventDefault(); navigate(it.path); setOpen(false); }}
               style={{ display: 'block', padding: '12px 0', fontSize: 16, borderBottom: '1px solid var(--hairline-2)' }}>{it.label}</a>
          ))}
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <button className="btn btn-secondary btn-full" onClick={() => { navigate('/petition'); setOpen(false); }}>Pledge my vote</button>
            <button className="btn btn-primary btn-full" onClick={() => { navigate('/donate'); setOpen(false); }}>Donate</button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ── Footer ──────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, #C8242F 0%, #7A1019 100%)',
      color: 'rgba(255,255,255,0.78)',
      paddingTop: 72, paddingBottom: 32, marginTop: 80,
    }}>
      <div className="wrap">
        <div className="grid grid-4" style={{ gap: 48 }}>
          <div style={{ gridColumn: 'span 2' }}>
            <Logo size={56} white />
            <p style={{ marginTop: 24, maxWidth: 380, color: 'rgba(255,255,255,0.7)', fontSize: 15 }}>
              A campaign about doing the work, keeping the promises, and protecting what makes
              the Lowcountry the Lowcountry.
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/donate')}>Donate</button>
              <button onClick={() => navigate('/petition')} className="btn btn-sm" style={{ background: 'transparent', color: 'var(--paper)', border: '1px solid rgba(255,255,255,0.3)' }}>Pledge my vote</button>
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ color: 'var(--gold-soft)' }}>Campaign</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 0', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <li><a href="#/about" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>About Johnnie</a></li>
              <li><a href="#/issues" onClick={(e) => { e.preventDefault(); navigate('/issues'); }}>Issues</a></li>
              <li><a href="#/events" onClick={(e) => { e.preventDefault(); navigate('/events'); }}>Events</a></li>
              <li><a href="#/volunteer" onClick={(e) => { e.preventDefault(); navigate('/volunteer'); }}>Volunteer</a></li>
              <li><a href="#/news" onClick={(e) => { e.preventDefault(); navigate('/news'); }}>News</a></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow" style={{ color: 'var(--gold-soft)' }}>Contact</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 0', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <li>hello@togetherwithgarmon.com</li>
              <li>media@togetherwithgarmon.com</li>
              <li>(843) 555-0115</li>
              <li>PO Box 30115<br />Charleston, SC 29412</li>
            </ul>
          </div>
        </div>

        <hr style={{ border: 0, borderTop: '1px solid rgba(255,255,255,0.12)', margin: '48px 0 24px' }} />

        <div className="between" style={{ flexWrap: 'wrap', gap: 16, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
          <div className="fineprint" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <strong style={{ color: 'rgba(255,255,255,0.75)' }}>Paid for by the Committee to Elect Johnnie Garmon.</strong> Not authorized by any candidate or candidate's committee. Contributions are not tax deductible.
          </div>
          <div style={{ display: 'flex', gap: 18 }}>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#accessibility">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Toast ───────────────────────────────────────────────────── */
function Toast({ msg, onClose }) {
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(onClose, 3200);
    return () => clearTimeout(t);
  }, [msg, onClose]);
  if (!msg) return null;
  return (
    <div style={{
      position: 'fixed', left: '50%', bottom: 96, transform: 'translateX(-50%)',
      background: 'var(--navy-deep)', color: 'var(--paper)',
      padding: '14px 22px', borderRadius: 6, fontSize: 14, fontWeight: 500,
      boxShadow: 'var(--shadow-lg)', zIndex: 200,
      animation: 'fadeUp .3s ease both',
    }}>{msg}</div>
  );
}

/* ── Animated count-up ───────────────────────────────────────── */
function CountUp({ to, duration = 1400 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf, start;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <span>{n.toLocaleString()}</span>;
}

/* ── Endorsement bar ─────────────────────────────────────────── */
function EndorsementBar({ compact = false }) {
  const orgs = [
    'Speaker Murrell Smith',
    'SC House Republican Caucus',
    'Americans for Prosperity',
    'Gov. McMaster (Healthcare Comm.)',
  ];
  return (
    <div className={'endorsement-bar' + (compact ? ' is-compact' : '')}>
      <div className="wrap endorsement-row">
        <div className="eyebrow endorsement-label">
          <span className="dot" style={{ background: 'var(--gold)' }} />
          Endorsed by
        </div>
        <ul className="endorsement-list">
          {orgs.map((o, i) => (
            <li key={i} className="endorsement-item">{o}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Newsletter modal (appears after 30s) ────────────────────── */
function NewsletterModal({ open, onClose, onSubscribe }) {
  const [email, setEmail] = useState('');
  if (!open) return null;
  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose}>✕</button>
        <Eyebrow>One email a week</Eyebrow>
        <h3 className="h-2" style={{ marginTop: 12 }}>The Lowcountry Letter.</h3>
        <p className="lede" style={{ marginTop: 12 }}>
          What's actually happening in Columbia, in plain English. Sent Sundays.
          Unsubscribe anytime.
        </p>
        <form onSubmit={(e) => { e.preventDefault(); onSubscribe(email); }} style={{ marginTop: 18, display: 'flex', gap: 8 }}>
          <input className="" type="email" required value={email} onChange={e => setEmail(e.target.value)}
            placeholder="you@email.com"
            style={{ flex: 1, padding: '14px 14px', border: '1px solid var(--hairline)', borderRadius: 4, fontSize: 16 }} />
          <button className="btn btn-primary" type="submit">Subscribe</button>
        </form>
        <p className="fineprint" style={{ marginTop: 14 }}>
          We'll never sell or share your address. Powered by the campaign, not a vendor.
        </p>
      </div>
    </div>
  );
}

Object.assign(window, { Logo, Stars, Eyebrow, Nav, Footer, Toast, CountUp, EndorsementBar, NewsletterModal });
