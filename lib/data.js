// Data layer: single source of truth for the public site's content.
// Fetches from Supabase if configured, otherwise falls back to the
// baked-in defaults so the site always renders.

(function () {
  const cfg = window.CMS_CONFIG || {};
  const hasSupabase = !!(cfg.supabaseUrl && cfg.supabaseAnonKey && window.supabase);

  const sb = hasSupabase
    ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, {
        auth: { persistSession: true, autoRefreshToken: true, storageKey: 'garmon-cms-auth' },
      })
    : null;

  window.SB = sb;
  window.HAS_SUPABASE = hasSupabase;

  // ── Baked-in defaults (mirror seed.sql so the site renders without a DB) ──
  const DEFAULTS = {
    settings: {
      tagline: 'Together with Garmon.',
      donateUrl: 'https://secure.anedot.com/johnnie-garmon-for-sc115/donate?exitIntent=true',
      pledgeReceiverUrl: 'https://jgn.campaignnucleus.com/forms/receiver/26a0f120-140b-4d01-95be-cfd9951d689e',
      primaryDate: '2026-06-09',
      primaryShort: 'June 9',
      primaryLong: 'June 9, 2026',
      generalDate: '2026-11-03',
      generalShort: 'Nov 3',
      generalLong: 'November 3, 2026',
      district: 'HD-115',
      pledgeGoal: 2000,
      pledgeBaseCount: 1103,
      donorCount: 312,
      donorTarget: 500,
      doorsKnocked: 1940,
      doorsTarget: 5000,
      heroImage: 'assets/garmon-family.jpg',
      storyImage: 'assets/garmon-family-2026.jpg',
      eventImage: 'assets/garmon-rally.jpg',
      aboutImage: 'assets/johnnie-portrait-2026.jpg',
      bookImage:  'assets/failure-disrupted-2026.jpg',
      bookUrl:    'https://theperissosgroup.com',
      logoImage: 'assets/garmon-logo.jpeg',
      logoImageWhite: 'assets/garmon-logo-transparent.png',
      pressEmail: '',
      generalEmail: '',
      phone: '(843) 555-0115',
      hours: 'M–F, 9 am – 5 pm',
      mailingAddress: '130 Gardeners Circle, PMB 173\nJohns Island, SC 29455',
      paidForBy: "Paid for by the Committee to Elect Johnnie Garmon. Not authorized by any candidate or candidate's committee. Contributions are not tax deductible.",
      aboutHeadline: 'Built one job at a time. Built here.',
      aboutLede: "The story they're trying to fit into a yard sign is, like most useful stories, longer than that.",
      aboutArc1: 'Johnnie was raised right here in the South — in subsidized housing, the first in his family to finish college, working his way through school.',
      aboutArc2: 'Over the next thirty years he built six businesses — a home services company, a small commercial real-estate practice, and an aging-at-home advisory firm that today serves families across the Lowcountry.',
      aboutQuote: "South Carolina took a chance on a kid with nothing but stubbornness and a public-school education. I'm running so the next kid gets the same chance.",
      aboutFamily: 'Married thirty-one years to his childhood sweetheart, Kelley. Father of three daughters — Caroline, Reagan, and Zoe. Member of James Island Christian Church. Little League coach for nine seasons.',
      aboutBook: "<em>Failure Disrupted</em> is Johnnie's account of three near-bankruptcies, the hard-won management principles that came from them, and what conservative governance can learn from the discipline of a small balance sheet.",
      aboutService: 'Appointed by Governor Henry McMaster to the South Carolina Healthcare Study Committee. Board member, Columbia International University. Board member, Berkeley-Charleston-Dorchester Council of Governments (BCDC). Active in the Lowcountry Exchange Club.',
    },
    endorsements: [
      { name: 'SC House Republican Caucus' },
      { name: 'Americans for Prosperity' },
      { name: 'Gov. McMaster (Healthcare Comm.)' },
    ],
    pillars: [
      { number: '01', tag: 'Permitting',   title: 'Stop Stacking Paper.',     body: 'Demand 90-day permit deadlines, public throughput numbers, and accountability when agencies miss them.' },
      { number: '02', tag: 'Property tax', title: 'Reduce the 6.2% Tax.',     body: "Long-time residents have earned a place to stand. We won't tax them out of the homes they built." },
      { number: '03', tag: 'Growth',       title: 'Roads Before Roofs.',      body: "No new subdivisions where the schools, roads, and stormwater can't keep up. Build infrastructure first." },
      { number: '04', tag: 'Healthcare',   title: 'Aging at Home.',           body: "From advanced directives to in-home care, end-of-life can't stay a bureaucratic afterthought." },
      { number: '05', tag: 'Business',     title: 'Defend Main Street.',      body: 'Dram shop reform, permit accountability, and no unfunded mandates dumped on counties.' },
      { number: '06', tag: 'Education',    title: 'Choice and Transparency.', body: 'Parental control, transparent funding, and no DEI mandates inside K–12 classrooms.' },
    ],
    issues: [
      { slug: 'permitting', number: '01', tag: 'Permitting', title: 'Stop Stacking Paper.', stance: 'Demand 90-day permit deadlines and public throughput numbers.',
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
        reframe: "What if the question isn't \"how do we make planners faster\" but \"what is the cost — to the family, the trades, the tax base — of every week that an approvable application sits in a queue\"?",
      },
      { slug: 'property',    number: '02', tag: 'Property tax', title: 'Reduce the 6.2% Tax.',         stance: 'Long-time residents have earned a place to stand.' },
      { slug: 'concurrency', number: '03', tag: 'Growth',       title: 'Roads Before Roofs.',          stance: "No subdivisions where the schools and roads can't keep up." },
      { slug: 'healthcare',  number: '04', tag: 'Healthcare',   title: 'Aging at Home.',               stance: 'Modernize advanced directives and in-home care.' },
      { slug: 'small-biz',   number: '05', tag: 'Business',     title: 'Defend Main Street.',          stance: 'Dram shop reform and permit accountability.' },
      { slug: 'education',   number: '06', tag: 'Education',    title: 'Choice and Transparency.',     stance: 'Parental control and transparent K–12 funding.' },
      { slug: 'character',   number: '07', tag: 'Place',        title: 'Lowcountry Character.',        stance: 'Protect what makes the Lowcountry the Lowcountry.' },
      { slug: 'directives',  number: '08', tag: 'End-of-life',  title: 'Honor the Last Wish.',         stance: 'Modernize advanced-directive law.' },
      { slug: 'dram',        number: '09', tag: 'Liability',    title: 'Reform Dram Shop.',            stance: 'Stop crushing small restaurants with insurance impossible to obtain.' },
      { slug: 'mandates',    number: '10', tag: 'Counties',     title: 'No Unfunded Mandates.',        stance: 'Stop dumping costs on county budgets.' },
    ],
    events: [
      { date_label:'May 28', day_label:'Thu', time_label:'5:30 – 7:30 pm', title:'Happy Hour with Johnnie',     location:'Beach Club, Kiawah Island',          host:'Bill & Patty Holcombe', tag:'Featured' },
      { date_label:'May 31', day_label:'Sun', time_label:'10:00 am',       title:'Coffee on the Porch',         location:'James Island, Avondale',             host:'Carol Wieters',         tag:'5 for 5' },
      { date_label:'Jun 02', day_label:'Tue', time_label:'6:00 pm',        title:'Folly Beach Town Hall',       location:'Folly River Park Pavilion',          host:'James Teeple',          tag:null },
      { date_label:'Jun 04', day_label:'Thu', time_label:'7:00 pm',        title:'Healthcare & Aging Panel',    location:"St. Andrew's Episcopal, James Is.",  host:'Warren Sloane',         tag:null },
      { date_label:'Jun 06', day_label:'Sat', time_label:'8:00 am – noon', title:'Door-knock Saturday',         location:'Riverland Terrace HQ',               host:'Volunteer event',       tag:'GOTV' },
      { date_label:'Jun 08', day_label:'Mon', time_label:'6:30 pm',        title:'Election Eve Rally',          location:'Riverfront Park, North Charleston',  host:'Campaign team',         tag:null },
    ],
    news: [
      { tag:'Op-ed', date_label:'Dec 12, 2025', source:'FITSNews',       title:'Stop Stacking Paper: Why Busyness Is Bankrupting South Carolina.' },
      { tag:'Op-ed', date_label:'Jan 14, 2026', source:'Post & Courier', title:'If You Cannot Build A School For Them, Do Not Build A Subdivision For Them.' },
      { tag:'Press', date_label:'Feb 03, 2026', source:'WCSC News 5',    title:'James Island business owner enters race for SC House 115.' },
      { tag:'Op-ed', date_label:'Feb 20, 2026', source:'The State',      title:'The 6% Rate Is A Promise. Honor It.' },
      { tag:'Op-ed', date_label:'Mar 06, 2026', source:'FITSNews',       title:'Modernize Advanced Directives — Or Stop Pretending To Care About Aging.' },
      { tag:'Press', date_label:'Apr 02, 2026', source:'Live 5 News',    title:'SC House Republican Caucus endorses Garmon for HD-115.' },
    ],
    volunteer: [
      { key:'door',  label:'Door-knocking',          body:'Walk a precinct on a Saturday. Most popular.' },
      { key:'phone', label:'Phone banking',          body:'Two-hour shifts from your couch.' },
      { key:'yard',  label:'Yard sign',              body:'We deliver and install.' },
      { key:'host',  label:'Host an event',          body:'Open your living room to 12–30 neighbors.' },
      { key:'data',  label:'Data entry',             body:'Help us keep the voter file clean.' },
      { key:'drive', label:'Drive seniors to polls', body:'June 9, all day.' },
      { key:'other', label:'Other / talk to me',     body:'Tell us what you want to do.' },
    ],
  };
  window.SITE_DEFAULTS = DEFAULTS;

  async function loadSiteData() {
    if (!hasSupabase) return DEFAULTS;
    try {
      const [settings, endorsements, pillars, issues, events, news, volunteer] = await Promise.all([
        sb.from('site_settings').select('data').eq('id', 1).maybeSingle(),
        sb.from('endorsements').select('*').order('sort_order'),
        sb.from('pillars').select('*').order('sort_order'),
        sb.from('issues').select('*').order('sort_order'),
        sb.from('events').select('*').eq('archived', false).order('sort_order'),
        sb.from('news_items').select('*').order('sort_order'),
        sb.from('volunteer_options').select('*').order('sort_order'),
      ]);
      return {
        settings:    { ...DEFAULTS.settings, ...((settings.data && settings.data.data) || {}) },
        endorsements: (endorsements.data && endorsements.data.length) ? endorsements.data : DEFAULTS.endorsements,
        pillars:      (pillars.data && pillars.data.length)      ? pillars.data      : DEFAULTS.pillars,
        issues:       (issues.data && issues.data.length)        ? issues.data       : DEFAULTS.issues,
        events:       (events.data && events.data.length)        ? events.data       : DEFAULTS.events,
        news:         (news.data && news.data.length)            ? news.data         : DEFAULTS.news,
        volunteer:    (volunteer.data && volunteer.data.length)  ? volunteer.data    : DEFAULTS.volunteer,
      };
    } catch (err) {
      console.warn('CMS load failed, using defaults:', err);
      return DEFAULTS;
    }
  }
  window.loadSiteData = loadSiteData;

  // Mirror a pledge to Supabase (best-effort; Campaign Nucleus stays canonical).
  async function mirrorPledge(form, source) {
    if (!hasSupabase) return;
    try {
      await sb.from('pledges').insert([{
        first_name: form.first_name || null,
        last_name:  form.last_name  || null,
        email:      form.email      || null,
        phone:      form.phone      || null,
        location_key: form.Location || null,
        volunteer_keys: Array.isArray(form.Volunteer) ? form.Volunteer : [],
        source: source || 'site',
      }]);
    } catch (e) { /* swallow — Nucleus is canonical */ }
  }
  window.mirrorPledge = mirrorPledge;

  // Submit a contact form straight into Supabase.
  async function submitContact(payload) {
    if (!hasSupabase) throw new Error('Supabase is not configured. Email media@togetherwithgarmon.com directly.');
    const { error } = await sb.from('contact_messages').insert([payload]);
    if (error) throw error;
  }
  window.submitContact = submitContact;
})();
