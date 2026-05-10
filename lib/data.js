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
      aboutImage: 'assets/garmon-about-2026.jpg',
      bookImage:  'assets/failure-disrupted-2026.jpg',
      bookUrl:    'https://theperissosgroup.com',
      logoImage: 'assets/garmon-logo.jpeg',
      logoImageWhite: 'assets/garmon-logo-transparent.png',
      pressEmail: '',
      generalEmail: '',
      phone: '(843) 989-0843',
      hours: 'M–F, 9 am – 5 pm',
      mailingAddress: '130 Gardeners Circle, PMB 173\nJohns Island, SC 29455',
      paidForBy: "Paid for by the Committee to Elect Johnnie Garmon. Not authorized by any candidate or candidate's committee. Contributions are not tax deductible.",
      aboutHeadline: 'Built one job at a time. Built here.',
      aboutLede: "The story they're trying to fit into a yard sign is, like most useful stories, longer than that.",
      aboutArc1: "Johnnie's life began in Greensboro, North Carolina — with a partial cleft palate and a speech impediment so pronounced that even his own parents struggled to understand him. His mother raised him and his three older sisters in government housing, relying on the Food Bank to eat and hand-me-downs to dress. He was the only white kid in the neighborhood and the only kid in school who couldn't pronounce his own name. He learned early what it meant to be misunderstood.",
      aboutArc2: "His first business — at eight years old — was hauling neighbors' trash for a quarter a bag, then walking the proceeds to the concession stand at the local ballpark for candy and bubble gum he'd resell to classmates at a markup. He went on to E.A. Laney High School in Wilmington (the same halls Michael Jordan walked) and worked his way through college. Over the next twenty-five years he founded six businesses across South Carolina — including Providence Care, the state's leading provider of post-acute and end-of-life services, and the Perissos Group, a consultancy advising founders and operators across the Southeast.",
      aboutQuote: "I learned early what it meant to be misunderstood. South Carolina is the place that finally gave a kid like me a shot. I'm running so the next kid gets the same chance.",
      aboutFamily: 'Married to Kelley, his childhood sweetheart. Together they have raised three daughters — Caroline, Reagan, and Zoe. Members of James Island Christian Church. Little League coach for nine seasons.',
      aboutBook: "<em>Failure Disrupted</em> is Johnnie's account of building, nearly losing, and rebuilding the businesses he founded — and the management principles he wishes he'd had when he started. The book reads as a field manual for entrepreneurs and operators, and as a quiet argument that the discipline of a small balance sheet has something to teach Columbia.",
      aboutService: 'Founder and CEO of Providence Care. Appointed by Governor Henry McMaster to the South Carolina Healthcare Study Committee. Board member, Columbia International University. Board member, Berkeley-Charleston-Dorchester Council of Governments (BCDC). Active in the Lowcountry Exchange Club.',
    },
    endorsements: [
      { name: 'SC House Republican Caucus' },
      { name: 'Americans for Prosperity' },
      { name: 'Gov. McMaster (Healthcare Comm.)' },
    ],
    pillars: [
      { number: '01', tag: 'Permitting',     title: 'Stop Stacking Paper.',     body: 'Demand 90-day permit deadlines, public throughput numbers, and accountability when agencies miss them.' },
      { number: '02', tag: 'Property tax',   title: 'Reduce the 6.2% Tax.',     body: "Long-time residents have earned a place to stand. We won't tax them out of the homes they built." },
      { number: '03', tag: 'Infrastructure', title: 'Roads Before Roofs.',      body: 'Infrastructure capacity must be addressed before development is approved. Concurrency, drainage, and accountability before more subdivisions.' },
      { number: '04', tag: 'Healthcare',     title: 'Aging at Home.',           body: 'Aging in place, price transparency, and a system that invests upstream instead of forcing families deeper into expensive institutional care.' },
      { number: '05', tag: 'Conservation',   title: 'Preserve the Lowcountry.', body: 'Protect marshlands, tree canopies, and the coastal character of District 115 through thoughtful land-use planning and partnerships.' },
      { number: '06', tag: 'Education',      title: 'Choice and Innovation.',   body: 'Expand school choice and charter options, invest in workforce-ready pathways, and modernize how students learn for the real economy.' },
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
      { slug: 'property',    number: '02', tag: 'Property tax',   title: 'Reduce the 6.2% Tax.',     stance: 'Long-time residents have earned a place to stand.' },
      { slug: 'concurrency', number: '03', tag: 'Infrastructure', title: 'Roads Before Roofs.',      stance: 'Infrastructure capacity must be addressed before large-scale development is approved.',
        head: "South Carolina's infrastructure crisis didn't happen overnight.",
        deck: 'Worsening traffic, flooding, and overcrowded corridors are what happens when government reacts instead of plans. Roads before roofs.',
        story: 'Across James Island, Johns Island, Folly Beach, Kiawah, and Seabrook, residents experience the cost of unplanned growth every day — congested commutes, strained drainage, overcrowded schools, and decisions made by bureaucracies disconnected from the communities they affect.',
        problem: 'For too long, growth has been approved without the roads, drainage, and public infrastructure necessary to support it. Unmanaged growth creates long-term problems that taxpayers ultimately pay for through congestion, declining quality of life, and expensive infrastructure catch-up projects years later.',
        bullets: [
          'Stronger concurrency policies that require infrastructure capacity to be addressed before large-scale development is approved.',
          'Prioritize state investment in road capacity, traffic synchronization, drainage, and resiliency projects.',
          'Increase pedestrian safety and support smart, walkable patterns where the area can sustain growth.',
          'Give local communities a stronger voice — no one-size-fits-all mandates from Columbia for District 115.',
          "Protect the Lowcountry's environment and cultural heritage from irresponsible overdevelopment.",
        ],
        reframe: 'The goal is not to stop growth — it is growth that works for the people who already live here. Roads before roofs means planning ahead, demanding accountability, and refusing to let infrastructure fall years behind.',
      },
      { slug: 'healthcare',  number: '04', tag: 'Healthcare',     title: 'Aging at Home.',           stance: 'Better outcomes, lower costs, and dignity for South Carolinians as they age.',
        head: 'South Carolina is facing one of the greatest demographic shifts in its history.',
        deck: 'Aging in place, price transparency, and a healthcare system that invests upstream instead of downstream.',
        story: 'An aging population that wants to remain independent, healthy, and at home for as long as possible deserves a system designed for that goal. Today, far too much spending happens after chronic disease, addiction, or preventable conditions have already escalated into expensive emergencies.',
        problem: 'The challenge is not just how we treat illness — it is whether we can build a system that delivers better outcomes, lower costs, and greater dignity before patients reach a crisis point. Provider shortages, fragmented advance care planning, and hidden prices keep families navigating bureaucracy at the worst possible moments.',
        bullets: [
          'Lead on aging-in-place: bring care closer to the patient instead of forcing patients into expensive institutional systems.',
          'Consolidate and simplify advance care planning so families can make informed decisions before a health crisis.',
          'Make healthcare price transparency the standard, not the exception — patients deserve to know the cost before care.',
          'Expand licensure for qualified nurse practitioners and physician assistants to address rural and underserved shortages.',
          'Invest upstream: preventative care, behavioral health, chronic disease management, nutrition, and in-home support.',
        ],
        reframe: 'South Carolina has the chance to be a national leader in aging with dignity — healthier people, stronger families, lower costs, and the freedom to age safely in the communities we call home.',
      },
      { slug: 'conservation', number: '05', tag: 'Environment',   title: 'Preserve the Lowcountry.', stance: 'Conservation and responsible growth can — and must — coexist.',
        head: "The Lowcountry's natural beauty is not replaceable.",
        deck: 'Marshlands, tidal creeks, live oaks, beaches, and waterways are part of our identity, our economy, and our quality of life.',
        story: 'Once an ecosystem is lost to careless overdevelopment or neglect, it cannot simply be recreated. The marshlands and tree canopies that define James Island, Johns Island, Kiawah, Seabrook, and Folly Beach are why people want to live here in the first place.',
        problem: 'Conservation and a strong economy are not opposing goals. Clean waterways, healthy marshes, preserved green spaces, and resilient coastal infrastructure are directly connected to property values, public safety, tourism, and long-term economic sustainability. Heavy-handed mandates and careless growth both fail the Lowcountry.',
        bullets: [
          'Stronger protections for marshlands, tidal waterways, and sensitive coastal areas against flooding and erosion.',
          'Preserve iconic live oaks and tree canopies through thoughtful land-use planning and conservation easements.',
          'Partner with local governments, land trusts, conservation groups, property owners, and the private sector — not just government acquisition.',
          'Smarter stormwater management and infrastructure planning that respects coastal realities.',
          'Density and growth decisions that match the carrying capacity of the land — not the appetite of speculators.',
        ],
        reframe: 'Preserve the natural beauty and environmental health of the Lowcountry while allowing thoughtful, sustainable growth that respects the people, culture, and ecosystems that make District 115 one of the most special places in South Carolina.',
      },
      { slug: 'education',   number: '06', tag: 'Education',      title: 'Choice and Innovation.',   stance: 'Expand school choice, embrace modern learning, and prepare students for real careers.',
        head: 'Our schools were built for a different century.',
        deck: "Empower families, embrace modern learning models, and prepare students for the real economy — not just the next test.",
        story: "A connected, fast-moving generation of South Carolina students is being forced into outdated systems that don't match how they learn or where the workforce is going. Families across District 115 know it. Teachers know it. Students feel it every day.",
        problem: "South Carolina cannot keep expecting different results from the same system. Education must focus on outcomes, innovation, and opportunity — not bureaucracy. Today's children are native to a digital age, yet they are often shoehorned into archaic models that ignore how they process information, build skills, and prepare for the workforce.",
        bullets: [
          "Expand school choice and charter school options so families can pick the environment that fits their child's needs.",
          'Invest in technical high schools, workforce development, and apprenticeship programs — not just four-year college tracks.',
          'Empower teachers with flexible methods and modern tools while maintaining clear, consistent academic standards.',
          'Move beyond handing every kid an iPad — integrate technology to create collaborative, adaptive, personalized learning environments.',
          'Build partnerships with nonprofits, local businesses, industry leaders, and faith-based organizations for mentorship, internships, and career pathways.',
        ],
        reframe: 'South Carolina does not have to choose between accountability and innovation — we can have both. The question is whether Columbia is willing to prepare our children to thrive in life, not just to pass tests.',
      },
      { slug: 'directives',  number: '07', tag: 'End-of-life',    title: 'Honor the Last Wish.',     stance: 'Modernize advanced-directive law.' },
      { slug: 'dram',        number: '08', tag: 'Liability',      title: 'Reform Dram Shop.',        stance: 'Stop crushing small restaurants with insurance impossible to obtain.' },
      { slug: 'mandates',    number: '09', tag: 'Counties',       title: 'No Unfunded Mandates.',    stance: 'Stop dumping costs on county budgets.' },
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
