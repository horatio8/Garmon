-- Run after schema.sql to populate the live defaults from the prototype.
-- Idempotent: re-running only inserts rows that don't already exist.

-- ── Site settings ────────────────────────────────────────────────────────────
update site_settings
set data = jsonb_build_object(
  'tagline',         'Together with Garmon.',
  'donateUrl',       'https://secure.anedot.com/johnnie-garmon-for-sc115/donate?exitIntent=true',
  'pledgeReceiverUrl','https://jgn.campaignnucleus.com/forms/receiver/26a0f120-140b-4d01-95be-cfd9951d689e',
  'primaryDate',     '2026-06-09',
  'primaryShort',    'June 9',
  'primaryLong',     'June 9, 2026',
  'generalDate',     '2026-11-03',
  'generalShort',    'Nov 3',
  'generalLong',     'November 3, 2026',
  'district',        'HD-115',
  'pledgeGoal',      2000,
  'pledgeBaseCount', 1103,
  'donorCount',      312,
  'donorTarget',     500,
  'doorsKnocked',    1940,
  'doorsTarget',     5000,
  'heroImage',       'assets/garmon-family.jpg',
  'storyImage',      'assets/garmon-family-2026.jpg',
  'eventImage',      'assets/garmon-rally.jpg',
  'aboutImage',      'assets/garmon-about-2026.jpg',
  'bookImage',       'assets/failure-disrupted-2026.jpg',
  'bookUrl',         'https://theperissosgroup.com',
  'logoImage',       'assets/garmon-logo.jpeg',
  'logoImageWhite',  'assets/garmon-logo-transparent.png',
  'pressEmail',      '',
  'generalEmail',    '',
  'phone',           '(843) 989-0843',
  'hours',           'M–F, 9 am – 5 pm',
  'mailingAddress',  '130 Gardeners Circle, PMB 173\nJohns Island, SC 29455',
  'paidForBy',       'Paid for by the Committee to Elect Johnnie Garmon. Not authorized by any candidate or candidate''s committee. Contributions are not tax deductible.',
  'aboutHeadline',   'Built one job at a time. Built here.',
  'aboutLede',       'The story they''re trying to fit into a yard sign is, like most useful stories, longer than that.',
  'aboutArc1',       'Johnnie''s life began in Greensboro, North Carolina — with a partial cleft palate and a speech impediment so pronounced that even his own parents struggled to understand him. His mother raised him and his three older sisters in government housing, relying on the Food Bank to eat and hand-me-downs to dress. He was the only white kid in the neighborhood and the only kid in school who couldn''t pronounce his own name. He learned early what it meant to be misunderstood.',
  'aboutArc2',       'His first business — at eight years old — was hauling neighbors'' trash for a quarter a bag, then walking the proceeds to the concession stand at the local ballpark for candy and bubble gum he''d resell to classmates at a markup. He went on to E.A. Laney High School in Wilmington (the same halls Michael Jordan walked) and worked his way through college. Over the next twenty-five years he founded six businesses across South Carolina — including Providence Care, the state''s leading provider of post-acute and end-of-life services, and the Perissos Group, a consultancy advising founders and operators across the Southeast.',
  'aboutQuote',      'I learned early what it meant to be misunderstood. South Carolina is the place that finally gave a kid like me a shot. I''m running so the next kid gets the same chance.',
  'aboutFamily',     'Married to Kelley, his childhood sweetheart. Together they have raised three daughters — Caroline, Reagan, and Zoe. Members of James Island Christian Church.',
  'aboutBook',       '<em>Failure Disrupted</em> is Johnnie''s account of building, nearly losing, and rebuilding the businesses he founded — and the management principles he wishes he''d had when he started. The book reads as a field manual for entrepreneurs and operators, and as a quiet argument that the discipline of a small balance sheet has something to teach Columbia.',
  'aboutService',    'Founder and CEO of Providence Care. Appointed by Governor Henry McMaster to the South Carolina Healthcare Study Committee. Board member, Charleston Southern University. Board member, of the BDCD at Columbia International University. Active in the Kiawah-Seabrook Lowcountry Exchange Club.'
)
where id = 1;

-- ── Endorsements ────────────────────────────────────────────────────────────
insert into endorsements (name, sort_order) values
  ('SC House Republican Caucus', 20),
  ('Americans for Prosperity', 30),
  ('Gov. McMaster (Healthcare Comm.)', 40)
on conflict do nothing;
delete from endorsements where name = 'Speaker Murrell Smith';

-- ── Pillars ──────────────────────────────────────────────────────────────────
insert into pillars (number, tag, title, body, sort_order) values
  ('01','Permitting','Stop Stacking Paper.','Demand 90-day permit deadlines, public throughput numbers, and accountability when agencies miss them.', 10),
  ('02','Property tax','Reduce the 6.2% Tax.','Long-time residents have earned a place to stand. We won''t tax them out of the homes they built.', 20),
  ('03','Infrastructure','Roads Before Roofs.','Infrastructure capacity must be addressed before development is approved. Concurrency, drainage, and accountability before more subdivisions.', 30),
  ('04','Healthcare','Aging at Home.','Aging in place, price transparency, and a system that invests upstream instead of forcing families deeper into expensive institutional care.', 40),
  ('05','Conservation','Preserve the Lowcountry.','Protect marshlands, tree canopies, and the coastal character of District 115 through thoughtful land-use planning and partnerships.', 50),
  ('06','Education','Choice and Innovation.','Expand school choice and charter options, invest in workforce-ready pathways, and modernize how students learn for the real economy.', 60)
on conflict do nothing;

-- Bring existing pillars up to date with the latest copy and remove any that are gone.
update pillars set tag = 'Infrastructure',
  title = 'Roads Before Roofs.',
  body  = 'Infrastructure capacity must be addressed before development is approved. Concurrency, drainage, and accountability before more subdivisions.'
where number = '03';
update pillars set tag = 'Healthcare',
  title = 'Aging at Home.',
  body  = 'Aging in place, price transparency, and a system that invests upstream instead of forcing families deeper into expensive institutional care.'
where number = '04';
update pillars set tag = 'Conservation',
  title = 'Preserve the Lowcountry.',
  body  = 'Protect marshlands, tree canopies, and the coastal character of District 115 through thoughtful land-use planning and partnerships.'
where number = '05';
update pillars set tag = 'Education',
  title = 'Choice and Innovation.',
  body  = 'Expand school choice and charter options, invest in workforce-ready pathways, and modernize how students learn for the real economy.'
where number = '06';
delete from pillars where title = 'Defend Main Street.';

-- ── Issues ──────────────────────────────────────────────────────────────────
insert into issues (slug, number, tag, title, stance, sort_order) values
  ('permitting','01','Permitting','Stop Stacking Paper.','Demand 90-day permit deadlines and public throughput numbers.', 10),
  ('property','02','Property tax','Reduce the 6.2% Tax.','Long-time residents have earned a place to stand.', 20),
  ('concurrency','03','Infrastructure','Roads Before Roofs.','Infrastructure capacity must be addressed before large-scale development is approved.', 30),
  ('healthcare','04','Healthcare','Aging at Home.','Better outcomes, lower costs, and dignity for South Carolinians as they age.', 40),
  ('conservation','05','Environment','Preserve the Lowcountry.','Conservation and responsible growth can — and must — coexist.', 50),
  ('education','06','Education','Choice and Innovation.','Expand school choice, embrace modern learning, and prepare students for real careers.', 60),
  ('directives','07','End-of-life','Honor the Last Wish.','Modernize advanced-directive law.', 70),
  ('dram','08','Liability','Reform Dram Shop.','Stop crushing small restaurants with insurance impossible to obtain.', 80),
  ('mandates','09','Counties','No Unfunded Mandates.','Stop dumping costs on county budgets.', 90)
on conflict (slug) do nothing;

-- Remove deprecated issues so the live list stays in sync with the codebase.
delete from issues where slug in ('small-biz','character');

-- Keep the renumbering and tag updates idempotent.
update issues set number = '03', tag = 'Infrastructure',
  title  = 'Roads Before Roofs.',
  stance = 'Infrastructure capacity must be addressed before large-scale development is approved.',
  sort_order = 30
where slug = 'concurrency';
update issues set number = '04', tag = 'Healthcare',
  title  = 'Aging at Home.',
  stance = 'Better outcomes, lower costs, and dignity for South Carolinians as they age.',
  sort_order = 40
where slug = 'healthcare';
update issues set number = '06', tag = 'Education',
  title  = 'Choice and Innovation.',
  stance = 'Expand school choice, embrace modern learning, and prepare students for real careers.',
  sort_order = 60
where slug = 'education';
update issues set number = '07', sort_order = 70 where slug = 'directives';
update issues set number = '08', sort_order = 80 where slug = 'dram';
update issues set number = '09', sort_order = 90 where slug = 'mandates';

update issues set
  head = 'Columbia is generating busyness, not results.',
  deck = 'Eight months for a backyard shed. Eleven for a coffee shop. Stop Stacking Paper.',
  story = 'Last summer a young couple in West Ashley took ten months to permit a 400-square-foot mother-in-law cottage for an aging parent. By the time the paperwork cleared, the parent was in skilled nursing. The cottage sits empty.',
  problem = 'South Carolina has no statutory deadline by which a local permitting agency must issue a decision. There is no public reporting on throughput. Counties hide behind "the back-and-forth with the applicant" while applicants hide their applications behind tabs in Outlook. Nobody owns the timeline.',
  bullets = jsonb_build_array(
    '90-day statutory shot-clock on residential permits — denial requires written reasons.',
    'Quarterly public throughput reports for every county and municipal permit office.',
    'Automatic refund of permit fees for applications older than 180 days.',
    'A statewide single-portal pilot program for residential ADU and renovation permits.',
    'No more "review by committee that meets every other Wednesday." The clock runs.'
  ),
  reframe = 'What if the question isn''t "how do we make planners faster" but "what is the cost — to the family, the trades, the tax base — of every week that an approvable application sits in a queue"?'
where slug = 'permitting';

update issues set
  head = 'South Carolina''s infrastructure crisis didn''t happen overnight.',
  deck = 'Worsening traffic, flooding, and overcrowded corridors are what happens when government reacts instead of plans. Roads before roofs.',
  story = 'Across James Island, Johns Island, Folly Beach, Kiawah, and Seabrook, residents experience the cost of unplanned growth every day — congested commutes, strained drainage, overcrowded schools, and decisions made by bureaucracies disconnected from the communities they affect.',
  problem = 'For too long, growth has been approved without the roads, drainage, and public infrastructure necessary to support it. Unmanaged growth creates long-term problems that taxpayers ultimately pay for through congestion, declining quality of life, and expensive infrastructure catch-up projects years later.',
  bullets = jsonb_build_array(
    'Stronger concurrency policies that require infrastructure capacity to be addressed before large-scale development is approved.',
    'Prioritize state investment in road capacity, traffic synchronization, drainage, and resiliency projects.',
    'Increase pedestrian safety and support smart, walkable patterns where the area can sustain growth.',
    'Give local communities a stronger voice — no one-size-fits-all mandates from Columbia for District 115.',
    'Protect the Lowcountry''s environment and cultural heritage from irresponsible overdevelopment.'
  ),
  reframe = 'The goal is not to stop growth — it is growth that works for the people who already live here. Roads before roofs means planning ahead, demanding accountability, and refusing to let infrastructure fall years behind.'
where slug = 'concurrency';

update issues set
  head = 'South Carolina is facing one of the greatest demographic shifts in its history.',
  deck = 'Aging in place, price transparency, and a healthcare system that invests upstream instead of downstream.',
  story = 'An aging population that wants to remain independent, healthy, and at home for as long as possible deserves a system designed for that goal. Today, far too much spending happens after chronic disease, addiction, or preventable conditions have already escalated into expensive emergencies.',
  problem = 'The challenge is not just how we treat illness — it is whether we can build a system that delivers better outcomes, lower costs, and greater dignity before patients reach a crisis point. Provider shortages, fragmented advance care planning, and hidden prices keep families navigating bureaucracy at the worst possible moments.',
  bullets = jsonb_build_array(
    'Lead on aging-in-place: bring care closer to the patient instead of forcing patients into expensive institutional systems.',
    'Consolidate and simplify advance care planning so families can make informed decisions before a health crisis.',
    'Make healthcare price transparency the standard, not the exception — patients deserve to know the cost before care.',
    'Expand licensure for qualified nurse practitioners and physician assistants to address rural and underserved shortages.',
    'Invest upstream: preventative care, behavioral health, chronic disease management, nutrition, and in-home support.'
  ),
  reframe = 'South Carolina has the chance to be a national leader in aging with dignity — healthier people, stronger families, lower costs, and the freedom to age safely in the communities we call home.'
where slug = 'healthcare';

update issues set
  head = 'The Lowcountry''s natural beauty is not replaceable.',
  deck = 'Marshlands, tidal creeks, live oaks, beaches, and waterways are part of our identity, our economy, and our quality of life.',
  story = 'Once an ecosystem is lost to careless overdevelopment or neglect, it cannot simply be recreated. The marshlands and tree canopies that define James Island, Johns Island, Kiawah, Seabrook, and Folly Beach are why people want to live here in the first place.',
  problem = 'Conservation and a strong economy are not opposing goals. Clean waterways, healthy marshes, preserved green spaces, and resilient coastal infrastructure are directly connected to property values, public safety, tourism, and long-term economic sustainability. Heavy-handed mandates and careless growth both fail the Lowcountry.',
  bullets = jsonb_build_array(
    'Stronger protections for marshlands, tidal waterways, and sensitive coastal areas against flooding and erosion.',
    'Preserve iconic live oaks and tree canopies through thoughtful land-use planning and conservation easements.',
    'Partner with local governments, land trusts, conservation groups, property owners, and the private sector — not just government acquisition.',
    'Smarter stormwater management and infrastructure planning that respects coastal realities.',
    'Density and growth decisions that match the carrying capacity of the land — not the appetite of speculators.'
  ),
  reframe = 'Preserve the natural beauty and environmental health of the Lowcountry while allowing thoughtful, sustainable growth that respects the people, culture, and ecosystems that make District 115 one of the most special places in South Carolina.'
where slug = 'conservation';

update issues set
  head = 'Our schools were built for a different century.',
  deck = 'Empower families, embrace modern learning models, and prepare students for the real economy — not just the next test.',
  story = 'A connected, fast-moving generation of South Carolina students is being forced into outdated systems that don''t match how they learn or where the workforce is going. Families across District 115 know it. Teachers know it. Students feel it every day.',
  problem = 'South Carolina cannot keep expecting different results from the same system. Education must focus on outcomes, innovation, and opportunity — not bureaucracy. Today''s children are native to a digital age, yet they are often shoehorned into archaic models that ignore how they process information, build skills, and prepare for the workforce.',
  bullets = jsonb_build_array(
    'Expand school choice and charter school options so families can pick the environment that fits their child''s needs.',
    'Invest in technical high schools, workforce development, and apprenticeship programs — not just four-year college tracks.',
    'Empower teachers with flexible methods and modern tools while maintaining clear, consistent academic standards.',
    'Move beyond handing every kid an iPad — integrate technology to create collaborative, adaptive, personalized learning environments.',
    'Build partnerships with nonprofits, local businesses, industry leaders, and faith-based organizations for mentorship, internships, and career pathways.'
  ),
  reframe = 'South Carolina does not have to choose between accountability and innovation — we can have both. The question is whether Columbia is willing to prepare our children to thrive in life, not just to pass tests.'
where slug = 'education';

-- ── Events ──────────────────────────────────────────────────────────────────
insert into events (date_label, day_label, time_label, title, location, host, tag, sort_order) values
  ('May 28','Thu','5:30 – 7:30 pm','Happy Hour with Johnnie','Beach Club, Kiawah Island','Bill & Patty Holcombe','Featured',10),
  ('May 31','Sun','10:00 am','Coffee on the Porch','James Island, Avondale','Carol Wieters','5 for 5',20),
  ('Jun 02','Tue','6:00 pm','Folly Beach Town Hall','Folly River Park Pavilion','James Teeple',null,30),
  ('Jun 04','Thu','7:00 pm','Healthcare & Aging Panel','St. Andrew''s Episcopal, James Is.','Warren Sloane',null,40),
  ('Jun 06','Sat','8:00 am – noon','Door-knock Saturday','Riverland Terrace HQ','Volunteer event','GOTV',50),
  ('Jun 08','Mon','6:30 pm','Election Eve Rally','Riverfront Park, North Charleston','Campaign team',null,60)
on conflict do nothing;

-- ── News ────────────────────────────────────────────────────────────────────
insert into news_items (tag, date_label, source, title, sort_order) values
  ('Op-ed','Dec 12, 2025','FITSNews','Stop Stacking Paper: Why Busyness Is Bankrupting South Carolina.', 10),
  ('Op-ed','Jan 14, 2026','Post & Courier','If You Cannot Build A School For Them, Do Not Build A Subdivision For Them.', 20),
  ('Press','Feb 03, 2026','WCSC News 5','James Island business owner enters race for SC House 115.', 30),
  ('Op-ed','Feb 20, 2026','The State','The 6% Rate Is A Promise. Honor It.', 40),
  ('Op-ed','Mar 06, 2026','FITSNews','Modernize Advanced Directives — Or Stop Pretending To Care About Aging.', 50),
  ('Press','Apr 02, 2026','Live 5 News','SC House Republican Caucus endorses Garmon for HD-115.', 60)
on conflict do nothing;

-- ── Volunteer options ──────────────────────────────────────────────────────
insert into volunteer_options (key, label, body, sort_order) values
  ('door','Door-knocking','Walk a precinct on a Saturday. Most popular.', 10),
  ('phone','Phone banking','Two-hour shifts from your couch.', 20),
  ('yard','Yard sign','We deliver and install.', 30),
  ('host','Host an event','Open your living room to 12–30 neighbors.', 40),
  ('data','Data entry','Help us keep the voter file clean.', 50),
  ('drive','Drive seniors to polls','June 9, all day.', 60),
  ('other','Other / talk to me','Tell us what you want to do.', 70)
on conflict (key) do nothing;
