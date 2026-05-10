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
-- Only four pillars now (one per remaining issue). Anything else gets dropped.
delete from pillars where tag in ('Permitting','Property tax','Business','Place','End-of-life','Liability','Counties');
delete from pillars where title in ('Defend Main Street.','Stop Stacking Paper.','Reduce the 6.2% Tax.');

insert into pillars (number, tag, title, body, sort_order) values
  ('01','Infrastructure','Roads Before Roofs.','Infrastructure capacity must be addressed before development is approved. Concurrency, drainage, and accountability before more subdivisions.', 10),
  ('02','Healthcare','Aging at Home.','Aging in place, price transparency, and a system that invests upstream instead of forcing families deeper into expensive institutional care.', 20),
  ('03','Conservation','Preserve the Lowcountry.','Protect marshlands, tree canopies, and the coastal character of District 115 through thoughtful land-use planning and partnerships.', 30),
  ('04','Education','Choice and Innovation.','Expand school choice and charter options, invest in workforce-ready pathways, and modernize how students learn for the real economy.', 40)
on conflict do nothing;

-- Renumber existing rows in case they were inserted with the old numbers.
update pillars set number = '01', sort_order = 10 where tag = 'Infrastructure';
update pillars set number = '02', sort_order = 20 where tag = 'Healthcare';
update pillars set number = '03', sort_order = 30 where tag = 'Conservation';
update pillars set number = '04', sort_order = 40 where tag = 'Education';

-- ── Issues ──────────────────────────────────────────────────────────────────
-- Add the freeform `body` column for databases predating the schema update.
alter table public.issues add column if not exists body text;

-- Cut every issue except the four the campaign is shipping.
delete from issues where slug not in ('concurrency','healthcare','conservation','education');

insert into issues (slug, number, tag, title, stance, sort_order) values
  ('concurrency', '01','Infrastructure','Infrastructure and Smart Growth.','Roads before roofs.', 10),
  ('healthcare',  '02','Healthcare',    'Health Care Innovation.',         'Aging at home, transparent prices, and a system that invests upstream.', 20),
  ('conservation','03','Environment',   'Conservation and Environment.',   'Conservation and responsible growth can and must coexist.', 30),
  ('education',   '04','Education',     'Education.',                      'Empower families, embrace modern learning, and prepare students for real careers.', 40)
on conflict (slug) do nothing;

-- Renumber the four remaining issues to 01–04.
update issues set number = '01', sort_order = 10 where slug = 'concurrency';
update issues set number = '02', sort_order = 20 where slug = 'healthcare';
update issues set number = '03', sort_order = 30 where slug = 'conservation';
update issues set number = '04', sort_order = 40 where slug = 'education';
update issues set
  title  = 'Infrastructure and Smart Growth.',
  stance = 'Roads before roofs.',
  head   = 'Infrastructure and Smart Growth.',
  deck   = 'Roads before roofs.',
  story = null, problem = null, bullets = '[]'::jsonb, reframe = null,
  body = $body$South Carolina's infrastructure crisis did not happen overnight. For too long, growth has been approved without the roads, drainage, and public infrastructure necessary to support it. The result is what residents across District 115 experience every day: worsening traffic, overcrowded corridors, flooding concerns, strained services, and communities losing confidence that government is planning ahead instead of reacting after the damage is done.

Johnnie Garmon believes in one simple principle: roads before roofs.

As a moderate Republican focused on responsible growth, Garmon supports stronger concurrency policies that require infrastructure capacity to be addressed before large-scale development is approved. If roads are failing, intersections are unsafe, drainage systems are overwhelmed, or schools and public services cannot absorb additional demand, government should not continue rubber-stamping growth without a real plan to handle the impact.

Growth itself is not the enemy. In fact, South Carolina's success and quality of life are attracting families and businesses from across the country. But unmanaged growth creates long-term problems that taxpayers ultimately pay for through congestion, declining quality of life, and expensive infrastructure catch-up projects years later.

Garmon believes the state must prioritize infrastructure investment ahead of speculative development by focusing on practical solutions that improve mobility and preserve community character. That includes expanding road capacity where appropriate, improving traffic synchronization, investing in drainage and resiliency projects, increasing pedestrian safety, and supporting smart, walkable development patterns in areas that can actually sustain growth.

He also believes local communities deserve a stronger voice in the planning process. Decisions impacting James Island, Johns Island, Folly Beach, Kiawah, and Seabrook should not be dictated by disconnected bureaucracies or one-size-fits-all mandates from Columbia. Residents who live with the consequences of development should have meaningful input before projects move forward.

At the same time, Garmon recognizes that simply opposing all growth is not realistic or responsible. South Carolina must find balance by encouraging thoughtful development, increasing housing opportunities where infrastructure exists, and protecting the Lowcountry's unique environment and cultural heritage from irresponsible overdevelopment.

The goal is simple: growth that works for the people who already live here. Roads before roofs means planning ahead, demanding accountability, and ensuring infrastructure keeps pace with growth instead of falling years behind it.$body$
where slug = 'concurrency';

update issues set
  title  = 'Health Care Innovation.',
  stance = 'Aging at home, transparent prices, and a system that invests upstream.',
  head   = 'Health Care Innovation.',
  deck   = 'Aging at home, transparent prices, and a system that invests upstream.',
  story = null, problem = null, bullets = '[]'::jsonb, reframe = null,
  body = $body$South Carolina must prepare for one of the greatest demographic shifts in its history: an aging population that wants to remain independent, healthy, and at home for as long as possible. The challenge facing our healthcare system is not simply how we treat illness — it is whether we can build a system that delivers better outcomes, lower costs, and greater dignity for patients and families before they reach a crisis point.

Johnnie Garmon believes South Carolina must lead on "aging in place" policies that bring healthcare closer to the patient instead of forcing patients deeper into expensive institutional systems. With decades of real-world healthcare leadership experience, he understands firsthand that preventative, coordinated, and home-based care not only improves quality of life but reduces long-term healthcare spending for families and taxpayers alike.

A key priority is consolidating and simplifying advance care planning. Too often families are left navigating fragmented systems during the most difficult moments of their lives. South Carolina should create clearer, more accessible frameworks for advance directives, care coordination, and patient-centered planning so individuals and families can make informed decisions before a health crisis occurs.

Garmon also believes healthcare price transparency must become the standard, not the exception. Patients deserve to know what care costs before they receive it. True transparency creates competition, drives efficiency, and empowers consumers to make better healthcare decisions while reducing hidden costs that continue to burden families, employers, and government programs.

To address growing provider shortages, particularly in rural and underserved communities, he supports expanding licensure capabilities for qualified midlevel providers such as nurse practitioners and physician assistants. South Carolina cannot meet future healthcare demand if every aspect of care remains bottlenecked through outdated regulatory structures. Expanding responsible scope-of-practice capabilities increases access, reduces wait times, and allows physicians to focus on the most acute and complex cases while maintaining accountability and quality standards.

Most importantly, Garmon believes the healthcare system must begin investing upstream instead of downstream. Today, far too much spending occurs after chronic disease, addiction, or preventable conditions have already escalated into expensive emergencies. South Carolina should prioritize preventative care, behavioral health integration, chronic disease management, nutrition, wellness, and in-home support services that keep people healthier longer and reduce avoidable hospitalizations.

This is not theory for Garmon — it is lived experience. He has spent his career building healthcare models focused on outcomes, accountability, and compassionate care in the home setting. He believes South Carolina has an opportunity to become a national leader in aging with dignity, reducing healthcare costs, and creating a system that treats people like individuals instead of processing them through disconnected bureaucracies.

The goal is simple: healthier people, stronger families, lower costs, and the freedom for South Carolinians to age safely and independently in the communities they call home.$body$
where slug = 'healthcare';

update issues set
  title  = 'Conservation and Environment.',
  stance = 'Conservation and responsible growth can and must coexist.',
  head   = 'Conservation and Environment.',
  deck   = 'Conservation and responsible growth can and must coexist.',
  story = null, problem = null, bullets = '[]'::jsonb, reframe = null,
  body = $body$The Lowcountry's natural beauty is not just part of our identity — it is part of our economy, our heritage, and our quality of life. The marshlands, tidal creeks, live oaks, beaches, and waterways that define District 115 are irreplaceable assets that must be protected for future generations. Once these ecosystems are lost to careless overdevelopment or neglect, they cannot simply be recreated.

Johnnie Garmon believes conservation and responsible growth can and must coexist. As a moderate Republican, he supports practical environmental stewardship rooted in accountability, local control, and long-term planning — not heavy-handed mandates disconnected from the realities of the communities they impact.

Protecting South Carolina's marshlands and waterways must remain a priority. These ecosystems are not only environmentally critical, they also serve as natural buffers against flooding, storm surge, and erosion while supporting tourism, recreation, fishing, and marine industries that sustain the Lowcountry economy. Garmon supports stronger protections for sensitive coastal areas, smarter stormwater management, and infrastructure planning that respects the realities of living in a coastal environment.

He also believes South Carolina must take a more proactive approach to preserving the iconic live oaks and tree canopies that define the character of communities like James Island, Johns Island, Kiawah, Seabrook, and Folly Beach. Development should not come at the expense of destroying the very landscapes that make people want to live here in the first place. Thoughtful land-use planning, conservation easements, and responsible development standards can help preserve the Lowcountry's natural character while still accommodating growth.

Garmon strongly supports partnerships between local governments, land trusts, conservation organizations, property owners, and the private sector to preserve environmentally sensitive land and protect open spaces without relying solely on government acquisition or overregulation. Conservation works best when communities are empowered to participate in protecting what makes their region unique.

At the same time, he recognizes that protecting the environment and strengthening the economy are not opposing goals. Clean waterways, healthy marsh systems, preserved green spaces, and resilient coastal infrastructure are directly connected to property values, tourism, public safety, and long-term economic sustainability. Conservation is not simply about aesthetics — it is about protecting the future viability of the Lowcountry itself.

Garmon also believes infrastructure and growth decisions must account for environmental realities before projects move forward. Roads, drainage, stormwater systems, and density planning should reflect the carrying capacity of the land instead of forcing taxpayers to solve preventable environmental problems later.

The mission is simple: preserve the natural beauty and environmental health of the Lowcountry while allowing thoughtful, sustainable growth that respects the people, culture, and ecosystems that make District 115 one of the most special places in South Carolina.$body$
where slug = 'conservation';

update issues set
  title  = 'Education.',
  stance = 'Empower families, embrace modern learning, and prepare students for real careers.',
  head   = 'Education.',
  deck   = 'Empower families, embrace modern learning, and prepare students for real careers.',
  story = null, problem = null, bullets = '[]'::jsonb, reframe = null,
  body = $body$Education reform must be front and center in South Carolina because our current system was built for a different century. Today's students are growing up in a connected, fast-moving world, yet too often they are being forced into outdated learning models that no longer reflect how they process information, develop skills, or prepare for the workforce. We cannot keep expecting different results from the same system.

Johnnie Garmon believes education should focus on outcomes, innovation, and opportunity — not bureaucracy. As a practical problem solver he supports practical solutions, he supports expanding school choice and charter school options so families have the freedom to choose the educational environment that best fits their child's needs. That includes greater investment in technical high schools, workforce development, and apprenticeship programs that prepare students for real careers, not just four-year college tracks.

He also believes South Carolina must embrace flexible teaching methods while maintaining clear and consistent academic standards. Every child learns differently, and empowering teachers with modern tools and approaches creates stronger engagement and better outcomes in the classroom.

Technology integration must go far beyond simply handing every student an iPad. Today's children are native to a digital age, yet they are often being shoehorned into archaic systems designed decades ago. Education should leverage technology to create collaborative, adaptive, and personalized learning environments that better prepare students for the realities of the modern economy.

Garmon also supports building a stronger spirit of collaboration inside and outside the classroom. Education works best when teachers, parents, students, and communities work together toward shared goals. That is why he believes partnerships with nonprofits, local businesses, industry leaders, and faith-based organizations are essential to creating mentorship opportunities, internships, career pathways, and community support systems that help students succeed beyond graduation.

South Carolina does not have to choose between accountability and innovation. We can have both. By empowering families, embracing modern learning models, strengthening workforce readiness, and investing in community partnerships, we can build an education system that prepares our children not just to pass tests — but to thrive in life.$body$
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
