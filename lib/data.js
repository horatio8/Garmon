// Site content: baked-in defaults. The site renders entirely from this file;
// edits ship via commits. (Supabase CMS was removed — see git history if you
// need the previous schema/admin SPA.)

(function () {
  const DEFAULTS = {
    settings: {
      tagline: 'Together with Garmon.',
      donateUrl: 'https://secure.anedot.com/johnnie-garmon-for-sc115/donate?exitIntent=true',
      pledgeReceiverUrl: 'https://jgn.campaignnucleus.com/forms/receiver/26a0f120-140b-4d01-95be-cfd9951d689e',
      contactReceiverUrl: 'https://jgn.campaignnucleus.com/forms/receiver/6c44fcbf-2ce8-4666-b839-bc5cc874c134',
      volunteerReceiverUrl: 'https://jgn.campaignnucleus.com/forms/receiver/d70693a2-6422-4ff4-86f5-ca1cb0e8b6bf',
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
      aboutFamily: 'Married to Kelley, his childhood sweetheart. Together they have raised three daughters — Caroline, Reagan, and Zoe. Members of James Island Christian Church.',
      aboutBook: "<em>Failure Disrupted</em> is Johnnie's account of building, nearly losing, and rebuilding the businesses he founded — and the management principles he wishes he'd had when he started. The book reads as a field manual for entrepreneurs and operators, and as a quiet argument that the discipline of a small balance sheet has something to teach Columbia.",
      aboutService: 'Founder and CEO of Providence Care. Appointed by Governor Henry McMaster to the South Carolina Healthcare Study Committee. Board member, Charleston Southern University. Board member, of the BDCD at Columbia International University. Active in the Kiawah-Seabrook Lowcountry Exchange Club.',
    },
    endorsements: [
      { name: 'SC House Republican Caucus' },
      { name: 'Americans for Prosperity' },
      { name: 'Gov. McMaster (Healthcare Comm.)' },
    ],
    pillars: [
      { number: '01', tag: 'Infrastructure', title: 'Roads Before Roofs.',      body: 'Infrastructure capacity must be addressed before development is approved. Concurrency, drainage, and accountability before more subdivisions.' },
      { number: '02', tag: 'Healthcare',     title: 'Aging at Home.',           body: 'Aging in place, price transparency, and a system that invests upstream instead of forcing families deeper into expensive institutional care.' },
      { number: '03', tag: 'Conservation',   title: 'Preserve the Lowcountry.', body: 'Protect marshlands, tree canopies, and the coastal character of District 115 through thoughtful land-use planning and partnerships.' },
      { number: '04', tag: 'Education',      title: 'Choice and Innovation.',   body: 'Expand school choice and charter options, invest in workforce-ready pathways, and modernize how students learn for the real economy.' },
    ],
    issues: [
      { slug: 'concurrency', number: '01', tag: 'Infrastructure', title: 'Infrastructure and Smart Growth.', stance: 'Roads before roofs.',
        head: 'Infrastructure and Smart Growth.',
        deck: 'Roads before roofs.',
        body: `South Carolina's infrastructure crisis did not happen overnight. For too long, growth has been approved without the roads, drainage, and public infrastructure necessary to support it. The result is what residents across District 115 experience every day: worsening traffic, overcrowded corridors, flooding concerns, strained services, and communities losing confidence that government is planning ahead instead of reacting after the damage is done.

Johnnie Garmon believes in one simple principle: roads before roofs.

As a moderate Republican focused on responsible growth, Garmon supports stronger concurrency policies that require infrastructure capacity to be addressed before large-scale development is approved. If roads are failing, intersections are unsafe, drainage systems are overwhelmed, or schools and public services cannot absorb additional demand, government should not continue rubber-stamping growth without a real plan to handle the impact.

Growth itself is not the enemy. In fact, South Carolina's success and quality of life are attracting families and businesses from across the country. But unmanaged growth creates long-term problems that taxpayers ultimately pay for through congestion, declining quality of life, and expensive infrastructure catch-up projects years later.

Garmon believes the state must prioritize infrastructure investment ahead of speculative development by focusing on practical solutions that improve mobility and preserve community character. That includes expanding road capacity where appropriate, improving traffic synchronization, investing in drainage and resiliency projects, increasing pedestrian safety, and supporting smart, walkable development patterns in areas that can actually sustain growth.

He also believes local communities deserve a stronger voice in the planning process. Decisions impacting James Island, Johns Island, Folly Beach, Kiawah, and Seabrook should not be dictated by disconnected bureaucracies or one-size-fits-all mandates from Columbia. Residents who live with the consequences of development should have meaningful input before projects move forward.

At the same time, Garmon recognizes that simply opposing all growth is not realistic or responsible. South Carolina must find balance by encouraging thoughtful development, increasing housing opportunities where infrastructure exists, and protecting the Lowcountry's unique environment and cultural heritage from irresponsible overdevelopment.

The goal is simple: growth that works for the people who already live here. Roads before roofs means planning ahead, demanding accountability, and ensuring infrastructure keeps pace with growth instead of falling years behind it.`,
      },
      { slug: 'healthcare',  number: '02', tag: 'Healthcare',     title: 'Health Care Innovation.', stance: 'Aging at home, transparent prices, and a system that invests upstream.',
        head: 'Health Care Innovation.',
        deck: 'Aging at home, transparent prices, and a system that invests upstream.',
        body: `South Carolina must prepare for one of the greatest demographic shifts in its history: an aging population that wants to remain independent, healthy, and at home for as long as possible. The challenge facing our healthcare system is not simply how we treat illness — it is whether we can build a system that delivers better outcomes, lower costs, and greater dignity for patients and families before they reach a crisis point.

Johnnie Garmon believes South Carolina must lead on "aging in place" policies that bring healthcare closer to the patient instead of forcing patients deeper into expensive institutional systems. With decades of real-world healthcare leadership experience, he understands firsthand that preventative, coordinated, and home-based care not only improves quality of life but reduces long-term healthcare spending for families and taxpayers alike.

A key priority is consolidating and simplifying advance care planning. Too often families are left navigating fragmented systems during the most difficult moments of their lives. South Carolina should create clearer, more accessible frameworks for advance directives, care coordination, and patient-centered planning so individuals and families can make informed decisions before a health crisis occurs.

Garmon also believes healthcare price transparency must become the standard, not the exception. Patients deserve to know what care costs before they receive it. True transparency creates competition, drives efficiency, and empowers consumers to make better healthcare decisions while reducing hidden costs that continue to burden families, employers, and government programs.

To address growing provider shortages, particularly in rural and underserved communities, he supports expanding licensure capabilities for qualified midlevel providers such as nurse practitioners and physician assistants. South Carolina cannot meet future healthcare demand if every aspect of care remains bottlenecked through outdated regulatory structures. Expanding responsible scope-of-practice capabilities increases access, reduces wait times, and allows physicians to focus on the most acute and complex cases while maintaining accountability and quality standards.

Most importantly, Garmon believes the healthcare system must begin investing upstream instead of downstream. Today, far too much spending occurs after chronic disease, addiction, or preventable conditions have already escalated into expensive emergencies. South Carolina should prioritize preventative care, behavioral health integration, chronic disease management, nutrition, wellness, and in-home support services that keep people healthier longer and reduce avoidable hospitalizations.

This is not theory for Garmon — it is lived experience. He has spent his career building healthcare models focused on outcomes, accountability, and compassionate care in the home setting. He believes South Carolina has an opportunity to become a national leader in aging with dignity, reducing healthcare costs, and creating a system that treats people like individuals instead of processing them through disconnected bureaucracies.

The goal is simple: healthier people, stronger families, lower costs, and the freedom for South Carolinians to age safely and independently in the communities they call home.`,
      },
      { slug: 'conservation', number: '03', tag: 'Environment', title: 'Conservation and Environment.', stance: 'Conservation and responsible growth can and must coexist.',
        head: 'Conservation and Environment.',
        deck: 'Conservation and responsible growth can and must coexist.',
        body: `The Lowcountry's natural beauty is not just part of our identity — it is part of our economy, our heritage, and our quality of life. The marshlands, tidal creeks, live oaks, beaches, and waterways that define District 115 are irreplaceable assets that must be protected for future generations. Once these ecosystems are lost to careless overdevelopment or neglect, they cannot simply be recreated.

Johnnie Garmon believes conservation and responsible growth can and must coexist. As a moderate Republican, he supports practical environmental stewardship rooted in accountability, local control, and long-term planning — not heavy-handed mandates disconnected from the realities of the communities they impact.

Protecting South Carolina's marshlands and waterways must remain a priority. These ecosystems are not only environmentally critical, they also serve as natural buffers against flooding, storm surge, and erosion while supporting tourism, recreation, fishing, and marine industries that sustain the Lowcountry economy. Garmon supports stronger protections for sensitive coastal areas, smarter stormwater management, and infrastructure planning that respects the realities of living in a coastal environment.

He also believes South Carolina must take a more proactive approach to preserving the iconic live oaks and tree canopies that define the character of communities like James Island, Johns Island, Kiawah, Seabrook, and Folly Beach. Development should not come at the expense of destroying the very landscapes that make people want to live here in the first place. Thoughtful land-use planning, conservation easements, and responsible development standards can help preserve the Lowcountry's natural character while still accommodating growth.

Garmon strongly supports partnerships between local governments, land trusts, conservation organizations, property owners, and the private sector to preserve environmentally sensitive land and protect open spaces without relying solely on government acquisition or overregulation. Conservation works best when communities are empowered to participate in protecting what makes their region unique.

At the same time, he recognizes that protecting the environment and strengthening the economy are not opposing goals. Clean waterways, healthy marsh systems, preserved green spaces, and resilient coastal infrastructure are directly connected to property values, tourism, public safety, and long-term economic sustainability. Conservation is not simply about aesthetics — it is about protecting the future viability of the Lowcountry itself.

Garmon also believes infrastructure and growth decisions must account for environmental realities before projects move forward. Roads, drainage, stormwater systems, and density planning should reflect the carrying capacity of the land instead of forcing taxpayers to solve preventable environmental problems later.

The mission is simple: preserve the natural beauty and environmental health of the Lowcountry while allowing thoughtful, sustainable growth that respects the people, culture, and ecosystems that make District 115 one of the most special places in South Carolina.`,
      },
      { slug: 'education',   number: '04', tag: 'Education', title: 'Education.', stance: 'Empower families, embrace modern learning, and prepare students for real careers.',
        head: 'Education.',
        deck: 'Empower families, embrace modern learning, and prepare students for real careers.',
        body: `Education reform must be front and center in South Carolina because our current system was built for a different century. Today's students are growing up in a connected, fast-moving world, yet too often they are being forced into outdated learning models that no longer reflect how they process information, develop skills, or prepare for the workforce. We cannot keep expecting different results from the same system.

Johnnie Garmon believes education should focus on outcomes, innovation, and opportunity — not bureaucracy. As a practical problem solver he supports practical solutions, he supports expanding school choice and charter school options so families have the freedom to choose the educational environment that best fits their child's needs. That includes greater investment in technical high schools, workforce development, and apprenticeship programs that prepare students for real careers, not just four-year college tracks.

He also believes South Carolina must embrace flexible teaching methods while maintaining clear and consistent academic standards. Every child learns differently, and empowering teachers with modern tools and approaches creates stronger engagement and better outcomes in the classroom.

Technology integration must go far beyond simply handing every student an iPad. Today's children are native to a digital age, yet they are often being shoehorned into archaic systems designed decades ago. Education should leverage technology to create collaborative, adaptive, and personalized learning environments that better prepare students for the realities of the modern economy.

Garmon also supports building a stronger spirit of collaboration inside and outside the classroom. Education works best when teachers, parents, students, and communities work together toward shared goals. That is why he believes partnerships with nonprofits, local businesses, industry leaders, and faith-based organizations are essential to creating mentorship opportunities, internships, career pathways, and community support systems that help students succeed beyond graduation.

South Carolina does not have to choose between accountability and innovation. We can have both. By empowering families, embracing modern learning models, strengthening workforce readiness, and investing in community partnerships, we can build an education system that prepares our children not just to pass tests — but to thrive in life.`,
      },
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
  window.loadSiteData = () => Promise.resolve(DEFAULTS);

  // Fire-and-forget mirror of form submissions to Airtable via /api/submit.
  // Runs alongside the direct Campaign Nucleus POST — CN stays canonical,
  // Airtable gets a copy for reporting. Silent on failure so a broken
  // proxy never blocks the user's success state.
  window.submitToAirtable = function submitToAirtable(formType, payload) {
    return fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ form_type: formType, ...payload }),
    }).catch(() => { /* CN is canonical */ });
  };
})();
