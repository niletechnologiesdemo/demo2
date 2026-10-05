const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, ImageRun
} = require('docx');

/* ------------------------------------------------------------- palette */
const W = 9026, FOREST = '0F3D33', GOLD = 'A97A31', INK = '16191D', MUTED = '5C6470', LINE = 'DDD6CC', WASH = 'FBF1DE', FWASH = 'E6F0EC';
function clean(v){ const s = String(v == null ? '' : v); let out=''; for (const ch of s){ const c = ch.codePointAt(0); if (c < 32 && ch !== '\n' && ch !== '\t') continue; out += (c === 160) ? ' ' : ch; } return out; }
const T = (t, o = {}) => new TextRun({ text: clean(t), bold: o.bold, italics: o.italics, size: o.size ?? 21, color: o.color ?? INK, font: 'Calibri', characterSpacing: o.spacing });
const b = (t, o = {}) => T(t, { ...o, bold: true });
const P = (kids, o = {}) => new Paragraph({ alignment: o.align, spacing: { before: o.before ?? 0, after: o.after ?? 130 }, children: Array.isArray(kids) ? kids : [T(kids, o)] });
const H1  = t => new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 340, after: 150 }, children: [T(t, { bold: true, size: 29, color: FOREST })] });
const H1B = t => new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: true, spacing: { after: 150 }, children: [T(t, { bold: true, size: 29, color: FOREST })] });
const H2  = t => new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 90 }, children: [T(t, { bold: true, size: 23, color: INK })] });
const EYE = t => new Paragraph({ spacing: { before: 200, after: 60 }, children: [T(t, { bold: true, size: 17, color: GOLD, spacing: 60 })] });
const BUL = t => new Paragraph({ numbering: { reference: 'bul', level: 0 }, spacing: { after: 55 }, children: Array.isArray(t) ? t : [T(t)] });
const NUM = t => new Paragraph({ numbering: { reference: 'num', level: 0 }, spacing: { after: 70 }, children: Array.isArray(t) ? t : [T(t)] });
const cell = (t, o = {}) => new TableCell({
  width: { size: o.w, type: WidthType.DXA },
  shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: 'auto' } : undefined,
  margins: { top: 95, bottom: 95, left: 130, right: 130 },
  children: (Array.isArray(t) ? t : [t]).map(x => typeof x === 'string'
    ? new Paragraph({ alignment: o.align, spacing: { after: 0 }, children: [T(x, { bold: o.bold, size: o.size ?? 20, color: o.color ?? INK })] }) : x)
});
const hcell = (t, w, o = {}) => cell(t, { w, bold: true, fill: FOREST, color: 'FFFFFF', size: 19, ...o });
const table = (widths, rows) => new Table({
  columnWidths: widths, width: { size: widths.reduce((a, c) => a + c, 0), type: WidthType.DXA },
  borders: { top:{style:BorderStyle.SINGLE,size:4,color:LINE}, bottom:{style:BorderStyle.SINGLE,size:4,color:LINE}, left:{style:BorderStyle.SINGLE,size:4,color:LINE}, right:{style:BorderStyle.SINGLE,size:4,color:LINE}, insideHorizontal:{style:BorderStyle.SINGLE,size:4,color:LINE}, insideVertical:{style:BorderStyle.SINGLE,size:4,color:LINE} },
  rows
});
const RULE = new Paragraph({ spacing: { before: 60, after: 170 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GOLD } }, children: [T('')] });
const CALLOUT = (title, body) => new Table({
  columnWidths: [W], width: { size: W, type: WidthType.DXA },
  borders: { top:{style:BorderStyle.SINGLE,size:4,color:GOLD}, bottom:{style:BorderStyle.SINGLE,size:4,color:GOLD}, left:{style:BorderStyle.SINGLE,size:18,color:GOLD}, right:{style:BorderStyle.SINGLE,size:4,color:GOLD}, insideHorizontal:{style:BorderStyle.NONE,size:0,color:'FFFFFF'}, insideVertical:{style:BorderStyle.NONE,size:0,color:'FFFFFF'} },
  rows: [new TableRow({ children: [new TableCell({ width: { size: W, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: WASH, color: 'auto' }, margins: { top: 150, bottom: 150, left: 180, right: 180 },
    children: [ new Paragraph({ spacing: { after: 70 }, children: [T(title, { bold: true, size: 21, color: GOLD })] }),
      ...(Array.isArray(body) ? body : [body]).map(x => typeof x === 'string' ? new Paragraph({ spacing: { after: 0 }, children: [T(x)] }) : x) ] })] })]
});
const gbp = n => '£' + n.toLocaleString('en-GB');

/* --------------------------------------------------------------- numbers */
const TOTAL = 100000;
const ALLOC = [
  ['Discovery, UX and visual design',                    'All surfaces · design system · clickable prototype',            12000],
  ['Merit consumer app · iOS and Android',                'Wheel home, Transport, Dining, Build & Property, Designer, Wallet', 34000],
  ['Driver app and fleet console',                       'Driver mobile app · dispatch, vehicles, earnings',              12000],
  ['Restaurant console',                                  'Kitchen board, reservations, menu, reviews, payouts',            8000],
  ['Designer store console',                             'Studio board, pieces and stock, Merit Window, payouts',          8000],
  ['Build & Property provider console',                  'Inquiry inbox, relayed chat, listings, profile',                 6000],
  ['Merit administration console',                       'Vetting, users, orders, payouts, content, reporting',           10000],
  ['Platform, integrations, QA, security and launch',    'Payments, maps, notifications, relayed calls, app stores',      10000],
];
const PAY = [ ['Deposit', 'On signing this proposal', 20], ['Design completion', 'On approval of the final designs and clickable prototype', 40], ['Development demonstration', 'On demonstration of the working platform for acceptance testing', 30], ['Go live', 'On launch to the App Store, Google Play and the web', 10] ];
const DAYS = 1250, DAY = TOTAL / DAYS, HOUR = DAY / 8, PROV_DAYS = 125;

const K = []; const add = (...x) => K.push(...x);

/* ----------------------------------------------------------------- cover */
add(
  new Paragraph({ spacing: { after: 0 }, children: [ new ImageRun({ type: 'png', data: fs.readFileSync('../assets/img/logo-app.png'), transformation: { width: 64, height: 64 } }) ] }),
  new Paragraph({ spacing: { before: 200, after: 0 }, children: [T('PROPOSAL & SCOPE OF WORK', { bold: true, size: 20, color: GOLD, spacing: 70 })] }),
  new Paragraph({ spacing: { before: 220, after: 60 }, children: [T('Merit', { bold: true, size: 62, color: FOREST })] }),
  new Paragraph({ spacing: { after: 80 }, children: [T('One app. Every service. Chosen on merit.', { size: 27, color: INK })] }),
  new Paragraph({ spacing: { after: 380 }, children: [T('Consumer super app, provider consoles and administration console — Phase 1', { size: 21, color: MUTED })] }),
  RULE,
  table([2500, 6526], [
    new TableRow({ children: [cell('Prepared for', { w: 2500, bold: true, color: MUTED }), cell('Mr Kayleb Akintunde, Merit Investment Properties Limited', { w: 6526 })] }),
    new TableRow({ children: [cell('Project', { w: 2500, bold: true, color: MUTED }), cell('Merit — the super app, Phase 1', { w: 6526 })] }),
    new TableRow({ children: [cell('Launch market', { w: 2500, bold: true, color: MUTED }), cell('London, United Kingdom · built for global expansion', { w: 6526 })] }),
    new TableRow({ children: [cell('Prepared by', { w: 2500, bold: true, color: MUTED }), cell('Nile Technologies', { w: 6526 })] }),
    new TableRow({ children: [cell('Date', { w: 2500, bold: true, color: MUTED }), cell('7 September 2026', { w: 6526 })] }),
    new TableRow({ children: [cell('Proposal reference', { w: 2500, bold: true, color: MUTED }), cell('MER-2026-01', { w: 6526 })] }),
    new TableRow({ children: [cell('Valid until', { w: 2500, bold: true, color: MUTED }), cell('7 October 2026', { w: 6526 })] }),
    new TableRow({ children: [ cell('Phase 1 investment', { w: 2500, bold: true, color: MUTED, fill: WASH }), cell(gbp(TOTAL) + '  ·  fixed price', { w: 6526, bold: true, size: 26, color: GOLD, fill: WASH })] })
  ]),
  P('', { after: 200 }),
  CALLOUT('In one paragraph', 'Merit is a single application through which a customer books a ride, orders dinner, finds a builder or an estate agent and buys from an independent designer — with one account, one wallet and one history. Every provider on the other side gets a console built for their trade. Nile Technologies will design, build, launch and hand over the whole Phase 1 platform for a fixed price of ' + gbp(TOTAL) + ', paid in four milestone payments, with Merit owning all of it outright.')
);

/* --------------------------------------------------------- 1. opportunity */
add(H1B('1.  The opportunity'));
add(P('Personal technology has moved in eras. The first was the web itself: every business got a page. The second was social: everyone got connected. The third was commerce: everything could be bought online. The fourth, which we are in now, is the era of the service app — one app to book a taxi, another to order food, another to find a home, another to shop, each excellent at one thing and unaware of the others.'));
add(P('The next era is already visible in Asia and in the Gulf, and has not yet been claimed in the United Kingdom: the super app. One front door, one identity, one wallet, many services. Customers no longer want twenty apps for twenty tasks. Providers do not want to be a line item in someone else’s marketplace. And the operator of the super app sees the whole picture — who is spending, where, on what, and how often — in a way no single-purpose app ever can.'));
add(P('Kayleb Akintunde saw the taxi opportunity twenty years before Uber and was told it could not be done. This proposal is written so that the second window is not missed. Merit Investment Properties already has the restaurant group, the construction and property activity, the designer relationships and the transport ambition. What it needs is the platform that ties them together and lets them scale to every city where Merit chooses to operate.'));

/* -------------------------------------------------------------- 2. concept */
add(H1('2.  The concept, as we understand it'));
add(P('Merit is one consumer application that opens onto a wheel. The wheel carries the four Phase 1 categories — Transport, Dining, Build & Property and Designer. The customer turns it to a category, picks the service they need, and presses the MERIT button in the centre. From that point they are inside a complete, purpose-built flow for that service, while their wallet, points, activity and profile stay shared across everything.'));
add(EYE('THE FOUR PHASE 1 MODULES'));
add(BUL([b('Transport. '), T('On-demand rides with fixed fares, four vehicle tiers up to a suited chauffeur, scheduled and airport bookings, live driver matching showing the driver’s face, number plate and arrival time, live tracking and in-app receipts.')]));
add(BUL([b('Dining. '), T('Merit’s own kitchens alongside partner restaurants. Ordering for delivery or collection, live order tracking with a courier, table reservations held without a card for Merit members, and reviews tied to verified orders.')]));
add(BUL([b('Build & Property. '), T('A directory of Merit-vetted builders, architects, trades, estate agents and surveyors. The customer sends one inquiry and the provider replies inside Merit through a relayed conversation. Property listings with viewing bookings, and a route to sell a home through Merit Property.')]));
add(BUL([b('Designer. '), T('Independent London designers, each with their own shop in the app. Made-to-order pieces with studio progress photos, a bag and checkout, made-to-measure fittings, and Merit Window — physical West End shop windows customers can scan to buy the look.')]));
add(EYE('WHAT TIES THEM TOGETHER'));
add(BUL([b('Merit Wallet and Merit Points. '), T('One balance settles every service. Points are earned on every pound spent, on any service, and redeemed anywhere in Merit.')]));
add(BUL([b('One activity history. '), T('Rides, orders, tables, inquiries and purchases in a single feed, with live items surfaced on the home screen.')]));
add(BUL([b('Relayed contact. '), T('Customers and providers message and call each other through Merit. Numbers stay private on both sides.')]));
add(BUL([b('Provider consoles. '), T('Every provider type runs its side of Merit from a console built for its trade — a kitchen board for a restaurant, a studio board for a designer, dispatch for a fleet, an inquiry inbox for a builder.')]));
add(BUL([b('Merit sees everything. '), T('An administration console over the whole platform: providers, customers, orders, revenue by module, payouts and content — the view Kayleb asked for: sitting in one place and seeing the money move.')]));
add(CALLOUT('Finance is deliberately Phase 2', 'Global money transfer, Merit Pay and savings are part of the vision and are designed for from day one: the wallet built in Phase 1 is the ledger they will run on. But they require banking partners and regulatory permissions that are far easier to obtain with a live platform and a real user base behind you. We therefore build the wallet now and open Finance once Merit has the numbers to walk into a bank on its own terms.'));

/* ------------------------------------------------------------- 3. built */
add(H1B('3.  What we have already built'));
add(P('Since our first conversation on 1 September we have designed and built a clickable demonstration of the Merit platform, reviewed with you on 4 September. It is not a set of pictures; every flow runs end to end. It has been used to shape this proposal and it will be the starting point for design in Stage 1.'));
add(EYE('THE CONSUMER APP'));
add(BUL('Welcome and mobile sign-in, and the wheel home screen with the four categories, photographic backgrounds and the central MERIT button.'));
add(BUL('Transport: destination, four fare tiers, driver matching, live trip and receipt.'));
add(BUL('Dining: twelve restaurants across cuisines, menus, basket, delivery and collection, order tracking, table booking.'));
add(BUL('Build & Property: vetted provider directory, provider profiles, inquiry form, relayed reply conversation, property listings and viewings.'));
add(BUL('Designer: nine designer shops, sixteen pieces, product pages, bag and checkout, Merit Window.'));
add(BUL('Wallet with member card and points, cross-module Activity, Profile and notifications.'));
add(EYE('THE BUSINESS CONSOLE'));
add(BUL('Restaurant: overview, live kitchen board, reservations and floor plan, menu management, reviews with replies, weekly payouts, profile and team.'));
add(BUL('Designer store: overview, studio board with progress photos, pieces and stock, Merit Window statistics and slot applications, reviews, payouts, studio profile.'));
add(P('Both demonstrations are available at any time for your technical team to review, and remain yours to use in conversations with providers and partners.', { before: 100 }));

/* ------------------------------------------------------------- 4. scope */
add(H1B('4.  Phase 1 scope of work'));
add(P('Phase 1 delivers the complete Merit platform for launch in London: the consumer app on both stores, the driver app, four provider consoles, the administration console and the platform beneath them. Everything below is included in the fixed price.'));

add(H2('4.1  Merit consumer app  —  native iOS and Android'));
add(EYE('FOUNDATION'));
add(BUL('Sign-up and sign-in by mobile number with one-time code; Apple and Google sign-in; profile, addresses and payment methods.'));
add(BUL('The wheel home screen: category selection, service selection, MERIT launch, live items and personalised picks.'));
add(BUL('Merit Wallet: top-up by card or bank, balance, transactions across all services, Merit Points earning and redemption, receipts.'));
add(BUL('Activity feed across every service; push notifications; in-app relayed messaging and masked calling with providers; ratings and reviews tied to verified orders.'));
add(EYE('TRANSPORT'));
add(BUL('Pickup and destination with saved places and search; fixed-fare quotes across four tiers; ride now, scheduled and airport bookings; chauffeur by the hour.'));
add(BUL('Live matching, driver card with photo, plate and vehicle, live tracking, trip sharing, cancellation rules, in-trip safety contact, receipt, rating and tipping.'));
add(EYE('DINING'));
add(BUL('Restaurant discovery with cuisine filters and Merit Kitchens; menus with modifiers; basket; delivery or collection; scheduled orders; live tracking with courier; reorder.'));
add(BUL('Table reservations with party size, time slots, requests and no-card holds for members; reservation reminders.'));
add(EYE('BUILD & PROPERTY'));
add(BUL('Vetted provider directory by category with search, profiles, services, work galleries and verified reviews.'));
add(BUL('Inquiry flow with property, timing, notes and photos; relayed conversation thread; inquiry status in Activity.'));
add(BUL('Property listings for sale and rent with galleries, agent contact and viewing bookings; sell-a-home valuation request to Merit Property.'));
add(EYE('DESIGNER'));
add(BUL('Designer shops, collections, product pages with sizes, colours and lead times; bag and checkout; delivery or collection at a Merit Window; order progress with studio photos.'));
add(BUL('Made-to-measure requests and fitting bookings; Merit Window listings with scan-to-buy.'));

add(H2('4.2  Driver app and fleet console'));
add(BUL('Driver mobile app: onboarding and document upload, go online and offline, job offers with pickup and fare, navigation hand-off, trip states, earnings and payouts, ratings.'));
add(BUL('Fleet console for Merit Transport: driver vetting and documents, vehicles and tiers, live map of drivers and trips, pricing and surge rules, dispatch overrides, earnings and payouts.'));

add(H2('4.3  Provider consoles  —  web'));
add(BUL([b('Restaurant console. '), T('Live kitchen board from new to completed, prep times and courier dispatch, reservations with floor plan and booking rules, menu and availability, reviews and replies, payouts and statements, profile, hours, delivery radius and team access.')]));
add(BUL([b('Designer store console. '), T('Studio board from new to shipped with progress photos to the customer, pieces and stock with lead times, Merit Window statistics and slot applications, reviews, payouts, studio profile and team.')]));
add(BUL([b('Build & Property console. '), T('Inquiry inbox with relayed conversations, profile, services and gallery, listings management for agents, viewing diary, reviews.')]));
add(BUL([b('Shared. '), T('Trading on and off, notifications, weekly settlement statements, verified-badge status, help and support.')]));

add(H2('4.4  Merit administration console'));
add(BUL('Provider onboarding and vetting workflow with document checks and approval; category and commission settings per module.'));
add(BUL('Customers, orders, rides, reservations, inquiries and purchases across every module, with search, refunds and dispute handling.'));
add(BUL('Wallet ledger and payouts: settlements, fees, adjustments and statements; Merit Points rules.'));
add(BUL('Content: home picks, Merit Kitchens, Merit Window schedule, notifications and announcements.'));
add(BUL('Reporting dashboard: revenue by module, active users, providers, cities, cohort retention; export.'));
add(BUL('Roles and permissions for the Merit team.'));

add(H2('4.5  Platform and integrations'));
add(BUL('Cloud infrastructure with separate staging and production environments, monitoring, backups and automated deployment.'));
add(BUL('Payments and wallet ledger through a UK-regulated payment provider, including card top-ups, provider payouts and refunds.'));
add(BUL('Maps, routing and geocoding; push notifications; SMS one-time codes; relayed voice and messaging; email.'));
add(BUL('Security: encryption at rest and in transit, role-based access, audit logs, UK GDPR support including consent, export and deletion.'));
add(BUL('Quality assurance across devices, load testing of dispatch and ordering, App Store and Google Play submission, launch support.'));

/* ----------------------------------------------------------- 5. phase 2 */
add(H1('5.  Designed for, delivered later'));
add(P('The following are built into the architecture in Phase 1 so that they can be switched on without rework, but are not part of the Phase 1 price.'));
add(BUL([b('Merit Finance. '), T('International money transfer, Merit Pay at partner locations, savings. Requires payment-institution partnerships and regulatory permissions.')]));
add(BUL([b('New cities and countries. '), T('The platform is multi-city and multi-currency by design; each new market is a configuration and operations exercise rather than a rebuild.')]));
add(BUL([b('Additional modules. '), T('The wheel accepts new categories — stays, wellness, events, home services — each built as a module on the same account, wallet and console pattern.')]));
add(BUL([b('Membership tiers and partner rewards. '), T('Paid membership with elevated perks across services once the base is live.')]));

/* --------------------------------------------------------- 6. investment */
add(H1B('6.  Investment'));
add(P('Phase 1 is offered as a fixed price of ' + gbp(TOTAL) + ' for the full scope in Section 4. The allocation below shows where the investment goes; it is indicative and the price is for the whole, not for the parts.'));
add(table([4000, 3526, 1500], [
  new TableRow({ children: [hcell('Component', 4000), hcell('Covers', 3526), hcell('Allocation', 1500, { align: AlignmentType.RIGHT })] }),
  ...ALLOC.map(([n, c, v]) => new TableRow({ children: [cell(n, { w: 4000, bold: true }), cell(c, { w: 3526, color: MUTED, size: 18 }), cell(gbp(v), { w: 1500, align: AlignmentType.RIGHT })] })),
  new TableRow({ children: [cell('Phase 1 platform  —  fixed price', { w: 7526, bold: true, fill: WASH }), cell(gbp(TOTAL), { w: 1500, bold: true, align: AlignmentType.RIGHT, fill: WASH, color: GOLD, size: 22 })] })
]));
add(P('', { after: 60 }));
add(P([b('What the price is based on. '), T('We estimate the work at approximately ' + DAYS.toLocaleString() + ' person-days across design, engineering, quality assurance and project management, a blended rate of ' + gbp(Math.round(DAY)) + ' per day. Our development centre in New Delhi and our use of AI throughout delivery are why a platform of this breadth can be offered at this figure.')]));
add(P([b('What is included. '), T('Design, development, testing, project management, app store submissions, deployment to Merit’s own cloud accounts, documentation, training for the Merit team, and a ninety-day warranty after go-live. Merit owns the source code, the designs and the data outright on full payment.')]));
add(P([b('What is not included. '), T('Third-party running costs — cloud hosting, maps, SMS, payment processing fees, telephony and app store fees — which are billed by those providers directly to Merit and typically run to a few hundred pounds a month at launch. Applicable taxes. Items listed in Section 12.')]));

/* -------------------------------------------------- 7. change provision */
add(H1('7.  Changes, alterations and enhancements'));
add(P('A platform of this size will evolve while it is being built. Providers will ask for things; Kayleb will see the wheel turning and want more on it; the technical team will refine the brief. We welcome that, and we plan for it rather than pretend it will not happen.'));
add(P([b('The fixed price covers the scope in Section 4. '), T('Anything outside that scope — a new module, a change to an agreed and signed-off design, a feature added after its stage is complete, an integration not listed — is a change, and changes carry incremental cost and, where relevant, time.')]));
add(P([b('How a change is handled. '), T('Any party may raise a change. Nile responds within five working days with a written change note covering what it is, what it costs, what it does to the timeline and what, if anything, it displaces. Nothing is built until Merit approves the note in writing. Small clarifications that do not alter the scope are simply absorbed.')]));
add(CALLOUT('Change, Alteration and Enhancement Provision', [
  'To keep the project moving without a negotiation for every improvement, we recommend Merit holds a provision alongside the fixed price: a pre-approved reserve of up to ' + PROV_DAYS + ' person-days (ten percent of the Phase 1 effort, approximately ' + gbp(Math.round(PROV_DAYS * DAY)) + ') that can be drawn against approved change notes during development.',
  new Paragraph({ spacing: { before: 90, after: 0 }, children: [T('The provision is drawn only on Merit’s written approval of each change note, is billed monthly at the project rate of ' + gbp(Math.round(DAY)) + ' per day (' + gbp(Math.round(HOUR)) + ' per hour) for the days actually used, and any unused balance is never invoiced. Changes larger than the remaining provision, or requested after go-live, are quoted separately on the same rate basis.')] })
]));
add(P('', { after: 40 }));
add(P('Phase 2 items in Section 5 are not changes; they are separate phases and will be proposed separately when Merit is ready for them.'));

/* ----------------------------------------------------------- 8. timeline */
add(H1B('8.  Indicative timeline'));
add(P('We estimate seven months from signing to launch, with the consumer app, the driver app and the consoles built in parallel streams once design is approved. Dates are firmed up at kickoff.'));
add(table([2000, 1600, 5426], [
  new TableRow({ children: [hcell('Stage', 2000), hcell('Duration', 1600), hcell('What happens', 5426)] }),
  new TableRow({ children: [cell('1  Discovery and design', { w: 2000, bold: true }), cell('Weeks 1–6', { w: 1600 }), cell('Kickoff with Kayleb and the technical team. Requirements per module, provider interviews, data and payment architecture. Full UX and visual design of every surface, building on the demonstration. Clickable prototype signed off.  → Design completion payment.', { w: 5426 })] }),
  new TableRow({ children: [cell('2  Development', { w: 2000, bold: true }), cell('Weeks 7–22', { w: 1600 }), cell('Parallel streams: platform and wallet; consumer app; driver app and fleet console; provider consoles; administration console. Fortnightly demonstrations on a staging environment so Merit sees progress continuously and changes are raised early.', { w: 5426 })] }),
  new TableRow({ children: [cell('3  Development demonstration and acceptance', { w: 2000, bold: true }), cell('Weeks 23–26', { w: 1600 }), cell('End-to-end demonstration of the working platform. Merit acceptance testing with real providers on staging, defect fixing, load testing, security review, store submissions.  → Development demonstration payment.', { w: 5426 })] }),
  new TableRow({ children: [cell('4  Launch', { w: 2000, bold: true }), cell('Weeks 27–28', { w: 1600 }), cell('Provider onboarding support, production deployment, store release, launch monitoring, training and handover of code, accounts and documentation.  → Go-live payment. Ninety-day warranty begins.', { w: 5426 })] })
]));

/* ----------------------------------------------------------- 9. payment */
add(H1('9.  Payment terms'));
add(P('The fixed price is payable in four milestone payments. Each milestone is invoiced when reached and is payable within fifteen days.'));
add(table([2700, 4326, 1000, 1000], [
  new TableRow({ children: [hcell('Milestone', 2700), hcell('Trigger', 4326), hcell('Share', 1000, { align: AlignmentType.RIGHT }), hcell('Amount', 1000, { align: AlignmentType.RIGHT })] }),
  ...PAY.map(([n, t, pc]) => new TableRow({ children: [cell(n, { w: 2700, bold: true }), cell(t, { w: 4326, color: MUTED, size: 18 }), cell(pc + '%', { w: 1000, align: AlignmentType.RIGHT }), cell(gbp(TOTAL * pc / 100), { w: 1000, align: AlignmentType.RIGHT })] })),
  new TableRow({ children: [cell('Phase 1 total', { w: 7026, bold: true, fill: WASH }), cell('100%', { w: 1000, bold: true, align: AlignmentType.RIGHT, fill: WASH }), cell(gbp(TOTAL), { w: 1000, bold: true, align: AlignmentType.RIGHT, fill: WASH, color: GOLD })] })
]));
add(P('', { after: 60 }));
add(P('Approved changes drawn from the provision in Section 7 are invoiced monthly in arrears for the days used. Third-party running costs are paid by Merit directly to those providers. All amounts are in pounds sterling and exclusive of applicable taxes.'));

/* --------------------------------------------------------- 10. promise */
add(H1('10.  The Nile promise'));
add(BUL([b('Fixed price, fixed scope. '), T('The Phase 1 price does not move unless the scope moves, and the scope moves only with your written approval.')]));
add(BUL([b('You see it every fortnight. '), T('Working software on a staging environment from the first weeks of development, not a reveal at the end.')]));
add(BUL([b('You own everything. '), T('Source code, designs, data, accounts and documentation are Merit’s on full payment. There is no licence, no lock-in and no revenue share to Nile.')]));
add(BUL([b('We stay. '), T('Ninety days of warranty after launch, and a support agreement if you want us beside you as Merit grows.')]));

/* ---------------------------------------------------------- 11. support */
add(H1('11.  Support and maintenance'));
add(P('After the ninety-day warranty we offer an annual support and maintenance agreement at ' + gbp(18000) + ' per year: monitoring, security patches, operating system and store compliance updates, third-party API changes, a support desk for the Merit team with defined response times, and a monthly allowance of improvement hours. It is optional and can be taken at any point.'));

/* -------------------------------------------------------- 12. from merit */
add(H1('12.  What we need from Merit'));
add(BUL('Kayleb as the single decision-maker, with the technical team engaged for reviews at the end of each stage and available for questions during development.'));
add(BUL('Merit Investment Properties Limited company details, the Merit brand assets, and Apple Developer, Google Play and cloud accounts in Merit’s name, which we will set up with you.'));
add(BUL('A payment provider account in Merit’s name, including its know-your-customer checks, which we will guide.'));
add(BUL('Initial providers for launch: Merit’s own restaurants and designers, the first drivers and vehicles, and an initial set of builders, agents and listings, so the app is full on day one.'));
add(BUL('Copy, imagery and legal documents — terms of use, privacy policy, provider agreements — or approval of the drafts we prepare with your legal counsel.'));

/* ---------------------------------------------------- 13. assumptions */
add(H1('13.  Assumptions and exclusions'));
add(BUL('Launch in one market, London, in English and pounds sterling. Additional cities, languages and currencies are configuration in Phase 2.'));
add(BUL('Merit Finance, money transfer, savings and any regulated financial service are excluded from Phase 1 and from this price.'));
add(BUL('Operational matters are Merit’s: driver licensing and insurance, food hygiene compliance, provider contracts, physical shop windows and their leases, courier employment, customer service staffing.'));
add(BUL('Third-party fees, taxes, hardware, marketing, branding beyond the supplied logo, legal drafting and any physical printing are excluded.'));
add(BUL('Apple and Google approve applications on their own timetable; we prepare and submit and will resolve any rejection arising from our work at no charge.'));

/* ------------------------------------------------------------ 14. nile */
add(H1B('14.  Why Nile Technologies'));
add(P('Nile Technologies was founded in 2011 by Atul Kapoor, formerly a Senior Director at Oracle India. For our first five years we did nothing but Oracle enterprise implementation for multinational clients: writing middle layers, integrating systems and building front ends over industrial-scale software. That is an unusual foundation for a company that also builds consumer applications, and it is the reason we think about ledgers, dispatch and data architecture before we think about screens — which is exactly what a super app demands.'));
add(P('Today we are a team of approximately one hundred and twenty people at our development centre in New Delhi, working across three practices: Oracle enterprise services for clients including Airtel, Genpact and MakeMyTrip; web and mobile application development for businesses and founders in the United Kingdom and the United States; and artificial intelligence, applied both within our own delivery and built for clients as agents, chatbots and decision systems.'));
add(H2('A comparable engagement'));
add(P('In 2018 John O’Brien, a founding member of the eBay team, came to us with an idea for managing reverse logistics for large brands. There was no business, no system and no platform. We designed and developed the entire ShipCycle platform from nothing over two years. It launched, it survived a pandemic, and it now processes in excess of one hundred thousand returned packages every month. We still run it, seven years on, and are rebuilding it on current technologies.'));
add(CALLOUT('What that means for Merit', 'You are not commissioning screens from a studio that will hand over a repository and move on. You are engaging a company that has taken a founder from an idea to a hundred thousand transactions a month and stayed for seven years — and that built a working Merit in three days to earn this conversation.'));

/* ----------------------------------------------------------- 15. terms */
add(H1B('15.  Terms and conditions'));
const tc = (n, title, body) => add(new Paragraph({ spacing: { before: 130, after: 40 }, children: [b(n + '.  ' + title + '.  ', { color: FOREST }), T(body)] }));
tc(1, 'Scope and changes', 'Nile Technologies will deliver the Phase 1 scope set out in Section 4 for the fixed price in Section 6. Work outside that scope, including changes to signed-off designs and additions requested after a stage is complete, is a change. Changes may result in incremental cost and time, will be documented in a written change note and will begin only on Merit’s written approval, drawn where possible from the provision in Section 7.');
tc(2, 'Fees, payment and taxes', 'Fees are as set out in Sections 6, 7 and 9, in pounds sterling, payable within fifteen days of invoice. Applicable taxes, bank charges and third-party running costs are additional and are borne by Merit.');
tc(3, 'Timeline and dependencies', 'Timelines are good-faith estimates and assume timely feedback, approvals, access, materials and provider participation from Merit. Delays in these move delivery dates accordingly.');
tc(4, 'Client responsibilities', 'Merit will provide a single point of contact empowered to make decisions, timely feedback and approvals at each stage, and the accounts, access and materials reasonably required for the work.');
tc(5, 'Intellectual property', 'On receipt of full payment, all rights in the delivered Merit platform — source code, design and data — belong to Merit Investment Properties Limited absolutely. Nile retains its pre-existing tools, libraries, frameworks and general know-how, which contain nothing specific to Merit.');
tc(6, 'Confidentiality', 'Each party will keep the other’s confidential information in confidence and use it solely for this engagement. Nile will enter into a mutual non-disclosure agreement on request, and before any further disclosure if Merit prefers.');
tc(7, 'Warranty and support', 'Nile will perform the work in a professional and workmanlike manner. For ninety days after go-live Nile will correct at no charge any defect in the delivered scope that Merit reports. Ongoing support is available under the agreement described in Section 11.');
tc(8, 'App store approval', 'Nile will prepare and submit the applications and will address at no charge any rejection arising from our build. Final approval rests with Apple and Google and cannot be guaranteed by either party.');
tc(9, 'Data protection', 'The platform will be built to support compliance with the UK General Data Protection Regulation, including consent capture, data export and deletion. Merit is the data controller and is responsible for its own registration and published policies.');
tc(10, 'Regulated services', 'Phase 1 contains no regulated financial service. Any future Finance module will be scoped separately and is conditional on Merit obtaining the necessary partnerships and permissions.');
tc(11, 'Liability', 'Neither party is liable for indirect or consequential losses. Each party’s total liability under this engagement is limited to the fees paid under it. Both parties will act in good faith to put matters right.');
tc(12, 'Independent contractor', 'Nile acts as an independent contractor. Nothing in this document creates a partnership, employment or agency relationship, and Nile takes no equity or revenue interest in Merit.');
tc(13, 'Termination', 'Either party may end the engagement on fifteen days’ written notice. On termination Merit pays for work completed to that date and receives the work produced, and each party returns or destroys the other’s confidential materials.');
tc(14, 'General', 'This document is the entire agreement between the parties on this project and supersedes prior discussions. Any change must be in writing and signed by both. It is governed by the laws of England and Wales. It may be signed in counterparts, including electronically. The parties will first seek to resolve any dispute amicably.');

/* -------------------------------------------------------- 16. next steps */
add(H1('16.  Next steps'));
add(P('To proceed, sign below and return a copy. On receipt we will issue the deposit invoice, confirm firm dates, book the kickoff with you and your technical team, and begin Stage 1 immediately.'));
add(P([b('A closing thought. '), T('You told us you were not going to miss the second window. Twenty years ago the answer was “it is not possible.” The answer now is a working Merit, built in three days, and a fixed price to make it real. The rest is a signature.')]));

/* ------------------------------------------------------- 17. acceptance */
add(H1('17.  Acceptance'));
add(P('Agreed and accepted on the terms set out in this Proposal and Scope of Work:'));
const noB = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const sig = (party, name) => new TableCell({
  borders: { top: { style: BorderStyle.SINGLE, size: 2, color: LINE }, bottom: noB, left: noB, right: noB },
  width: { size: 4513, type: WidthType.DXA }, margins: { top: 180, bottom: 80, left: 0, right: 200 },
  children: [
    new Paragraph({ spacing: { after: 160 }, children: [b(party, { color: FOREST })] }),
    new Paragraph({ spacing: { after: 160 }, children: [T('Signature:  ', { color: MUTED, size: 20 }), T('____________________________')] }),
    new Paragraph({ spacing: { after: 150 }, children: [T('Name:  ', { color: MUTED, size: 20 }), b(name)] }),
    new Paragraph({ spacing: { after: 150 }, children: [T('Title:  ', { color: MUTED, size: 20 }), T('____________________________')] }),
    new Paragraph({ children: [T('Date:  ', { color: MUTED, size: 20 }), T('______________')] })
  ]
});
add(new Table({ columnWidths: [4513, 4513], width: { size: W, type: WidthType.DXA },
  borders: { top: noB, bottom: noB, left: noB, right: noB, insideHorizontal: noB, insideVertical: noB },
  rows: [new TableRow({ children: [sig('For Merit Investment Properties Limited', 'Kayleb Akintunde'), sig('For Nile Technologies', 'Aaditya Kapoor')] })] }));

/* ------------------------------------------------------------- document */
const doc = new Document({
  creator: 'Nile Technologies', title: 'Merit - Proposal and Scope of Work', description: 'Merit super app · Phase 1',
  numbering: { config: [
    { reference: 'bul', levels: [{ level: 0, format: 'bullet', text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 220 } } } }] },
    { reference: 'num', levels: [{ level: 0, format: 'decimal', text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 240 } } } }] }
  ] },
  sections: [{ properties: { page: { margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } } }, children: K }]
});
Packer.toBuffer(doc).then(buf => { fs.writeFileSync('Merit-Proposal-and-Scope-of-Work.docx', buf); console.log('written  ' + (buf.length / 1024).toFixed(0) + ' KB'); });
