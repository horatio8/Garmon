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
  'storyImage',      'assets/family-2026.jpg',
  'eventImage',      'assets/garmon-rally.jpg',
  'aboutImage',      'assets/johnnie-portrait-2026.jpg',
  'bookImage',       'assets/failure-disrupted-cover.jpg',
  'bookUrl',         'https://theperissosgroup.com',
  'logoImage',       'assets/garmon-logo.jpeg',
  'logoImageWhite',  'assets/garmon-logo-transparent.png',
  'pressEmail',      '',
  'generalEmail',    '',
  'phone',           '(843) 555-0115',
  'hours',           'M–F, 9 am – 5 pm',
  'mailingAddress',  '130 Gardeners Circle, PMB 173\nJohns Island, SC 29455',
  'paidForBy',       'Paid for by the Committee to Elect Johnnie Garmon. Not authorized by any candidate or candidate''s committee. Contributions are not tax deductible.',
  'aboutHeadline',   'Built one job at a time. Built here.',
  'aboutLede',       'The story they''re trying to fit into a yard sign is, like most useful stories, longer than that.',
  'aboutArc1',       'Johnnie was raised right here in the South — in subsidized housing, the first in his family to finish college, working his way through school.',
  'aboutArc2',       'Over the next thirty years he built six businesses — a home services company, a small commercial real-estate practice, and an aging-at-home advisory firm that today serves families across the Lowcountry.',
  'aboutQuote',      'South Carolina took a chance on a kid with nothing but stubbornness and a public-school education. I''m running so the next kid gets the same chance.',
  'aboutFamily',     'Married thirty-one years to his childhood sweetheart, Kelley. Father of three daughters — Caroline, Reagan, and Zoe. Member of James Island Christian Church. Little League coach for nine seasons.',
  'aboutBook',       '<em>Failure Disrupted</em> is Johnnie''s account of three near-bankruptcies, the hard-won management principles that came from them, and what conservative governance can learn from the discipline of a small balance sheet.',
  'aboutService',    'Appointed by Governor Henry McMaster to the South Carolina Healthcare Study Committee. Board member, Columbia International University. Board member, Berkeley-Charleston-Dorchester Council of Governments (BCDC). Active in the Lowcountry Exchange Club.'
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
  ('03','Growth','Roads Before Roofs.','No new subdivisions where the schools, roads, and stormwater can''t keep up. Build infrastructure first.', 30),
  ('04','Healthcare','Aging at Home.','From advanced directives to in-home care, end-of-life can''t stay a bureaucratic afterthought.', 40),
  ('05','Business','Defend Main Street.','Dram shop reform, permit accountability, and no unfunded mandates dumped on counties.', 50),
  ('06','Education','Choice and Transparency.','Parental control, transparent funding, and no DEI mandates inside K–12 classrooms.', 60)
on conflict do nothing;

-- ── Issues ──────────────────────────────────────────────────────────────────
insert into issues (slug, number, tag, title, stance, sort_order) values
  ('permitting','01','Permitting','Stop Stacking Paper.','Demand 90-day permit deadlines and public throughput numbers.', 10),
  ('property','02','Property tax','Reduce the 6.2% Tax.','Long-time residents have earned a place to stand.', 20),
  ('concurrency','03','Growth','Roads Before Roofs.','No subdivisions where the schools and roads can''t keep up.', 30),
  ('healthcare','04','Healthcare','Aging at Home.','Modernize advanced directives and in-home care.', 40),
  ('small-biz','05','Business','Defend Main Street.','Dram shop reform and permit accountability.', 50),
  ('education','06','Education','Choice and Transparency.','Parental control and transparent K–12 funding.', 60),
  ('character','07','Place','Lowcountry Character.','Protect what makes the Lowcountry the Lowcountry.', 70),
  ('directives','08','End-of-life','Honor the Last Wish.','Modernize advanced-directive law.', 80),
  ('dram','09','Liability','Reform Dram Shop.','Stop crushing small restaurants with insurance impossible to obtain.', 90),
  ('mandates','10','Counties','No Unfunded Mandates.','Stop dumping costs on county budgets.', 100)
on conflict (slug) do nothing;

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
