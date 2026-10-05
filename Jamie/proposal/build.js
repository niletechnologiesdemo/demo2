const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, ImageRun, LevelFormat } = require('docx');

/* palette: OpPoseidon navy/sea + coral accent, matching the demos */
const W = 9638, NAVY = '0A2740', SEA = '0E6B7C', CORAL = 'E2643C', INK = '122129', MUTED = '5C6A74', LINE = 'DDE3E6', WASH = 'EEF7F8', CWASH = 'FCEDE6';
const T = (t, o = {}) => new TextRun({ text: String(t), bold: o.bold, italics: o.italics, strike: o.strike, size: o.size ?? 19, color: o.color ?? INK, font: 'Calibri', characterSpacing: o.spacing });
const b = (t, o = {}) => T(t, { ...o, bold: true });
const P = (kids, o = {}) => new Paragraph({ alignment: o.align, spacing: { before: o.before ?? 0, after: o.after ?? 90 }, children: Array.isArray(kids) ? kids : [T(kids, o)] });
const EYE = (t, o = {}) => new Paragraph({ spacing: { before: o.before ?? 160, after: 50 }, children: [T(t, { bold: true, size: 15, color: o.color ?? CORAL, spacing: 60 })] });
const BUL = t => new Paragraph({ numbering: { reference: "bul", level: 0 }, spacing: { after: 20 }, children: Array.isArray(t) ? t : [T(t, { size: 17 })] });
const noB = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const cell = (t, o = {}) => new TableCell({
  width: { size: o.w, type: WidthType.DXA }, columnSpan: o.span,
  shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: 'auto' } : undefined,
  borders: o.noborder ? { top: noB, bottom: noB, left: noB, right: noB } : undefined,
  margins: { top: o.pad ?? 70, bottom: o.pad ?? 70, left: 110, right: 110 },
  verticalAlign: o.valign,
  children: (Array.isArray(t) ? t : [t]).map(x => typeof x === 'string'
    ? new Paragraph({ alignment: o.align, spacing: { after: 0 }, children: [T(x, { bold: o.bold, size: o.size ?? 18, color: o.color ?? INK })] }) : x)
});
const hcell = (t, w, o = {}) => cell(t, { w, bold: true, fill: NAVY, color: 'FFFFFF', size: 16, ...o });
const table = (widths, rows, o = {}) => new Table({
  columnWidths: widths, width: { size: widths.reduce((a, c) => a + c, 0), type: WidthType.DXA },
  borders: o.plain ? { top: noB, bottom: noB, left: noB, right: noB, insideHorizontal: noB, insideVertical: noB }
    : { top:{style:BorderStyle.SINGLE,size:4,color:LINE}, bottom:{style:BorderStyle.SINGLE,size:4,color:LINE}, left:{style:BorderStyle.SINGLE,size:4,color:LINE}, right:{style:BorderStyle.SINGLE,size:4,color:LINE}, insideHorizontal:{style:BorderStyle.SINGLE,size:4,color:LINE}, insideVertical:{style:BorderStyle.SINGLE,size:4,color:LINE} },
  rows
});
const RULE = new Paragraph({ spacing: { before: 40, after: 120 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: CORAL } }, children: [T('')] });
const gbp = n => '£' + n.toLocaleString('en-GB');

const O1 = 5000, O2 = 6000, ALL = 10000;
const PAY = [['Deposit', 'On signing', 30], ['Functional design completion', 'On approval of the functional design and final screens', 30], ['Project completion', 'On demonstration of the finished platform for acceptance', 30], ['Go live', 'On launch to the client’s domains', 10]];

/* option box: title row, features as bullets in a shaded column, price */
const optionBox = (kicker, title, sub, feats, price, priceNote) => table([6838, 2800], [
  new TableRow({ children: [
    cell([ EYE(kicker, { before: 0 }), new Paragraph({ spacing: { after: 30 }, children: [b(title, { size: 24, color: NAVY })] }), new Paragraph({ spacing: { after: 70 }, children: [T(sub, { size: 17, color: MUTED })] }), ...feats.map(BUL) ], { w: 6838, pad: 90 }),
    cell([ new Paragraph({ spacing: { after: 20 }, children: [T('FIXED PRICE', { bold: true, size: 14, color: MUTED, spacing: 60 })] }), new Paragraph({ spacing: { after: 40 }, children: [b(gbp(price), { size: 40, color: CORAL })] }), new Paragraph({ spacing: { after: 0 }, children: [T(priceNote, { size: 16, color: MUTED })] }) ], { w: 2800, fill: WASH, pad: 90, valign: 'center' })
  ] })
]);

const K = [];
const add = (...x) => K.push(...x);

/* header */
add(table([4800, 4838], [ new TableRow({ children: [
  cell([ new Paragraph({ spacing: { after: 0 }, children: [ new ImageRun({ type: 'png', data: fs.readFileSync('../../NileTechWebsite/assets/logo.png'), transformation: { width: 94, height: 42 } }) ] }) ], { w: 4800, noborder: true, pad: 0 }),
  cell([ new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { after: 0 }, children: [b('OPTIONS SUMMARY', { size: 15, color: CORAL, spacing: 70 })] }), new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { after: 0 }, children: [T('Prepared for Jamie Doxey  ·  21 September 2026  ·  Valid 30 days', { size: 16, color: MUTED })] }) ], { w: 4838, noborder: true, pad: 0, valign: 'center' })
] }) ], { plain: true }));
add(new Paragraph({ spacing: { before: 200, after: 30 }, children: [b('Three businesses, two builds, one price', { size: 34, color: NAVY })] }));
add(P([T('Everything shown in the click-through mockups on ', { size: 18, color: MUTED }), b('Monday’s call', { size: 18, color: MUTED }), T(', priced as two fixed-price builds. Each includes the public website, the back office, hosting set-up on your own domains, and handover. You own all of it outright.', { size: 18, color: MUTED })], { after: 60 }));
add(RULE);

/* option 1 */
add(optionBox('OPTION 1  ·  PHASE 1', 'Militree Operators + Royal Home & Garden', 'Two branded storefronts, one shared back office. Everything in both demos.',
  [ [b('Militree · '), T('services, credentials and our-work pages, site-survey request with map and photos, itemised online quotes accepted with a card deposit, and the ticketed crew register that replaces the recruiter.', { size: 17 })],
    [b('Royal Home & Garden · '), T('fixed price list, slot booking like a barber, photo-quote flow, over-65 rate and fortnightly care plans, customer job tracker.', { size: 17 })],
    [b('Shared back office · '), T('enquiry pipeline, quote builder, jobs and crew calendar, Today run with on-my-way texts, customers, care plans, invoices and payments, reviews, with a switcher between the two brands.', { size: 17 })],
    [b('Included · '), T('WhatsApp and email notifications, card payments and deposits, Google Calendar sync, accounting export, both domains live.', { size: 17 })] ],
  O1, 'Both businesses · shared platform · 8–10 weeks'));
add(P('', { after: 70 }));

/* option 2 */
add(optionBox('OPTION 2  ·  PHASE 2', 'Operation Poseidon · Sea to Summit Club platform', 'The full booking, learning, community and shop platform, built to add Thor and Pegasus later.',
  [ [b('Book · '), T('retreats, residentials, dip days and single sessions; paid places, deposits and waitlists; free-place applications that Jamie approves in two taps.', { size: 17 })],
    [b('Learn · '), T('video course library with free and members-only tiers, lesson progress and certificates, live monthly sessions with replays.', { size: 17 })],
    [b('Belong · '), T('community boards, retreat cohorts, Dip of the Day and tide info, safeguarding keyword holds; Crew membership at monthly and annual plans.', { size: 17 })],
    [b('Shop & fund · '), T('merch and equipment store, sponsor-a-place, and a funding dashboard that shows where every pound goes.', { size: 17 })],
    [b('Admin · '), T('bookings and calendar, applications, courses, community moderation, members, orders, stock, payouts; Sea to Summit Club coming-soon page with corporate enquiry and waitlist.', { size: 17 })] ],
  O2, 'Full platform · Poseidon live, Thor and Pegasus ready · 10–12 weeks'));
add(P('', { after: 70 }));

/* bundle */
add(table([W], [ new TableRow({ children: [ cell([
  table([5200, 4200], [ new TableRow({ children: [
    cell([ new Paragraph({ spacing: { after: 20 }, children: [b('ALL THREE, IN PARALLEL', { size: 15, color: 'FFFFFF', spacing: 60 })] }), new Paragraph({ spacing: { after: 30 }, children: [b('Options 1 + 2 together', { size: 24, color: 'FFFFFF' })] }), new Paragraph({ spacing: { after: 0 }, children: [T('One team, one timeline, one shared design system. Both builds run side by side and go live together in 12 weeks. Saves ' + gbp(O1 + O2 - ALL) + ' against the two options priced separately.', { size: 17, color: 'DCE8EE' })] }) ], { w: 5200, noborder: true, pad: 40 }),
    cell([ new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { after: 0 }, children: [T(gbp(O1 + O2), { size: 20, color: '9AB4C4', strike: true }), T('   ', { size: 20 }), b(gbp(ALL), { size: 44, color: 'FFFFFF' })] }), new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { after: 0 }, children: [T('fixed price · all three businesses', { size: 16, color: 'DCE8EE' })] }) ], { w: 4200, noborder: true, pad: 40, valign: 'center' })
  ] }) ], { plain: true })
], { w: W, fill: NAVY, pad: 110 }) ] }) ], { plain: true }));

/* payment terms */
add(EYE('PAYMENT TERMS  ·  SAME SCHEDULE FOR EVERY OPTION', { before: 220 }));
add(table([3000, 4238, 800, 800, 800], [
  new TableRow({ tableHeader: true, children: [hcell('Milestone', 3000), hcell('Due when', 4238), hcell('Share', 800, { align: AlignmentType.RIGHT }), hcell('Opt. 1', 800, { align: AlignmentType.RIGHT }), hcell('Opt. 2', 800, { align: AlignmentType.RIGHT })] }),
  ...PAY.map(([n, t, pc]) => new TableRow({ children: [cell(n, { w: 3000, bold: true, size: 17 }), cell(t, { w: 4238, color: MUTED, size: 16 }), cell(pc + '%', { w: 800, align: AlignmentType.RIGHT, size: 17 }), cell(gbp(O1 * pc / 100), { w: 800, align: AlignmentType.RIGHT, size: 17 }), cell(gbp(O2 * pc / 100), { w: 800, align: AlignmentType.RIGHT, size: 17 })] })),
  new TableRow({ children: [cell('All three in parallel', { w: 3000, bold: true, fill: CWASH, size: 17 }), cell('30% · 30% · 30% · 10% of ' + gbp(ALL), { w: 4238, color: MUTED, size: 16, fill: CWASH }), cell('100%', { w: 800, align: AlignmentType.RIGHT, fill: CWASH, size: 17, bold: true }), cell(gbp(3000) + ' / ' + gbp(3000) + ' / ' + gbp(3000) + ' / ' + gbp(1000), { w: 1600, span: 2, align: AlignmentType.RIGHT, fill: CWASH, size: 15, bold: true, color: CORAL })] })
]));

/* footer notes */
add(P([b('What every price includes  ', { size: 16, color: NAVY }), T('Design, build, testing, deployment on your domains, 60 days of post-launch support, and full ownership of code and content.  ', { size: 16, color: MUTED }), b('Not included  ', { size: 16, color: NAVY }), T('Third-party fees such as payment processing, hosting after year one, video production, and content writing beyond what is in the mockups.', { size: 16, color: MUTED })], { before: 140, after: 60 }));
add(P([T('Nile Technologies  ·  New Delhi  ·  aadityakapoor.nile@gmail.com  ·  Prices in GBP, exclusive of VAT where applicable.', { size: 15, color: MUTED })], { after: 0 }));

const doc = new Document({
  numbering: { config: [{ reference: 'bul', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 300, hanging: 200 } }, run: { color: CORAL } } }] }] },
  styles: { default: { document: { run: { font: 'Calibri', size: 19, color: INK } } } },
  sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 680, bottom: 600, left: 1134, right: 1134 } } }, children: K }]
});
Packer.toBuffer(doc).then(buf => { fs.writeFileSync('Jamie Doxey - Options Summary.docx', buf); console.log('written', buf.length); });
