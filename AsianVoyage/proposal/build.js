const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  PageBreak, LevelFormat, convertInchesToTwip
} = require('docx');

/* ---------------------------------------------------------------- helpers */
const W = 9026;                       // A4 content width in DXA (1" margins)
const CLAY = 'B8531B';
const INK = '1A1512';
const MUTED = '6B5F58';
const LINE = 'D9CFC7';
const WASH = 'FBF0E8';

/* XML 1.0 forbids most control characters. Strip them at the boundary so a
   stray vertical tab pasted into a string can never produce a corrupt file. */
const clean = s => String(s == null ? '' : s)
  .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
  .replace(/\u00A0/g, ' ');

const P = (text, o = {}) => new Paragraph({
  alignment: o.align,
  spacing: { before: o.before ?? 0, after: o.after ?? 120 },
  indent: o.indent,
  border: o.border,
  children: [new TextRun({
    text: clean(text), bold: o.bold, italics: o.italics, size: o.size ?? 21,
    color: o.color ?? INK, font: 'Calibri'
  })]
});

const H1 = t => new Paragraph({
  heading: HeadingLevel.HEADING_1, spacing: { before: 320, after: 160 },
  children: [new TextRun({ text: clean(t), bold: true, size: 30, color: CLAY, font: 'Calibri' })]
});
const H2 = t => new Paragraph({
  heading: HeadingLevel.HEADING_2, spacing: { before: 220, after: 100 },
  children: [new TextRun({ text: clean(t), bold: true, size: 23, color: INK, font: 'Calibri' })]
});

const BULLET = (text, level = 0) => new Paragraph({
  numbering: { reference: 'bullets', level },
  spacing: { after: 60 },
  children: [new TextRun({ text: clean(text), size: 21, color: INK, font: 'Calibri' })]
});

const cell = (text, o = {}) => new TableCell({
  width: { size: o.w, type: WidthType.DXA },
  shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: 'auto' } : undefined,
  margins: { top: 90, bottom: 90, left: 130, right: 130 },
  children: [new Paragraph({
    alignment: o.align,
    spacing: { after: 0 },
    children: [new TextRun({
      text: clean(text), bold: o.bold, size: o.size ?? 20,
      color: o.color ?? INK, font: 'Calibri'
    })]
  })]
});

const table = (widths, rows) => new Table({
  columnWidths: widths,
  width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
  borders: {
    top:    { style: BorderStyle.SINGLE, size: 4, color: LINE },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: LINE },
    left:   { style: BorderStyle.SINGLE, size: 4, color: LINE },
    right:  { style: BorderStyle.SINGLE, size: 4, color: LINE },
    insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: LINE },
    insideVertical:   { style: BorderStyle.SINGLE, size: 4, color: LINE }
  },
  rows
});

const RULE = new Paragraph({
  spacing: { before: 60, after: 160 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: CLAY } },
  children: [new TextRun('')]
});

/* ------------------------------------------------------------------ cover */
const cover = [
  new Paragraph({ spacing: { after: 0 }, children: [new TextRun({
    text: 'PROPOSAL', bold: true, size: 20, color: CLAY, font: 'Calibri',
    characterSpacing: 60 })] }),
  new Paragraph({ spacing: { before: 200, after: 60 }, children: [new TextRun({
    text: 'Restaurant Point of Sale System', bold: true, size: 48, color: INK, font: 'Calibri' })] }),
  new Paragraph({ spacing: { after: 400 }, children: [new TextRun({
    text: 'Asian Voyage Restaurant & Bar — Cedar Plaza, Antigua',
    size: 26, color: MUTED, font: 'Calibri' })] }),
  RULE,

  table([2400, 6626], [
    new TableRow({ children: [
      cell('Prepared for', { w: 2400, bold: true, color: MUTED }),
      cell('Hospitality Guru Ltd — Asian Voyage Restaurant & Bar', { w: 6626 })] }),
    new TableRow({ children: [
      cell('Location', { w: 2400, bold: true, color: MUTED }),
      cell('Cedar Plaza, St. John’s, Antigua and Barbuda', { w: 6626 })] }),
    new TableRow({ children: [
      cell('Prepared by', { w: 2400, bold: true, color: MUTED }),
      cell('[Your Company Name]', { w: 6626 })] }),
    new TableRow({ children: [
      cell('Date', { w: 2400, bold: true, color: MUTED }),
      cell('19 August 2026', { w: 6626 })] }),
    new TableRow({ children: [
      cell('Proposal reference', { w: 2400, bold: true, color: MUTED }),
      cell('AV-POS-2026-01', { w: 6626 })] }),
    new TableRow({ children: [
      cell('Valid until', { w: 2400, bold: true, color: MUTED }),
      cell('18 September 2026', { w: 6626 })] }),
    new TableRow({ children: [
      cell('Total investment', { w: 2400, bold: true, color: MUTED, fill: WASH }),
      cell('USD 7,000', { w: 6626, bold: true, size: 24, color: CLAY, fill: WASH })] })
  ]),

  new Paragraph({ spacing: { before: 500 }, children: [new PageBreak()] })
];

/* ------------------------------------------------------------------- body */
const body = [
  H1('1. Introduction'),
  P('Asian Voyage Restaurant & Bar operates a Pan-Asian restaurant and bar at Cedar Plaza, Antigua, serving both seated diners and a high volume of takeaway and counter trade. Tourist footfall makes service peaks sharp and unpredictable, and the current paper-based process for taking orders, communicating with the kitchen and producing bills does not hold up under that pressure.'),
  P('This proposal sets out the delivery of a complete restaurant Point of Sale system covering the full service cycle: taking the order at the table or counter, firing the kitchen, producing an accurate bill and settling it, and giving the owner clear daily visibility of trading.'),
  P('A working prototype of this system has already been built and demonstrated using Asian Voyage’s own menu — all 162 items, priced in EC dollars with ABST-inclusive pricing and the 10% service charge handled correctly. The design decisions, screen flows and menu data are therefore already proven rather than theoretical, which materially reduces delivery risk on this engagement.'),

  H1('2. Objectives'),
  BULLET('Replace paper order pads with a tablet-based ordering system for floor staff.'),
  BULLET('Deliver every order to the kitchen accurately, in writing, with allergy and preparation notes intact.'),
  BULLET('Cut the time between a guest asking for the bill and the bill reaching the table.'),
  BULLET('Produce accurate bills that apply the service charge correctly and show ABST as required.'),
  BULLET('Give the owner reliable daily figures on sales, covers, best sellers and staff performance.'),
  BULLET('Control discounts, comps and voids so they are authorised and visible rather than invisible.'),

  H1('3. Scope of Work'),
  P('The system comprises two user interfaces sharing a single database, plus kitchen ticket printing.'),

  H2('3.1 Waiter Interface (tablet)'),
  P('Designed for a 10-inch tablet, usable one-handed on the floor, with large touch targets and no dependence on hovering or a keyboard.', { color: MUTED, italics: true }),
  BULLET('Staff sign-in by personal PIN; each order is attributed to the server who took it.'),
  BULLET('Floor view showing every table, its status, cover count, elapsed time and running total.'),
  BULLET('Seat a table and record the number of covers.'),
  BULLET('Full menu browsing by category, with item variants (soup protein, curry colour, sauce choice) and free-text kitchen notes for allergies and preparation.'),
  BULLET('Send the order to the kitchen; add later rounds to the same table and send again.'),
  BULLET('Amend or remove any item the kitchen has not yet received.'),
  BULLET('Close the table when the guests have finished, marking it ready for billing at the counter.'),

  H2('3.2 Admin Interface (billing counter)'),
  P('Designed for a counter touchscreen, and the operational centre of the system.', { color: MUTED, italics: true }),
  BULLET('Floor plan of all tables with live status, plus a separate view of counter and takeaway orders.'),
  BULLET('Full order entry — the counter can take and modify any order directly, not only those raised by waiters.'),
  BULLET('Active orders board tracking every order through Placed, Under Preparation, Ready for Billing and Settled.'),
  BULLET('Kitchen view mirroring every ticket sent to the pass, as a backup when the kitchen printer fails.'),
  BULLET('Kitchen ticket printing and reprinting.'),
  BULLET('Billing and settlement, including tips, discounts, comps and split payment.'),
  BULLET('Reporting dashboard.'),
  BULLET('Menu availability control — mark an item sold out and it disappears from the waiter tablet immediately.'),
  BULLET('Staff records and role-based permissions across waiter, cashier and manager.'),

  H2('3.3 Kitchen Order Ticket (KOT) printing'),
  BULLET('Tickets print to a kitchen thermal printer on an 80mm roll, formatted for legibility at the pass.'),
  BULLET('Each ticket carries the bill number, table or counter reference, cover count, server name and time.'),
  BULLET('Item-level batching: a second round prints as a clearly marked ADDITION ticket rather than reprinting the whole order, so the kitchen never re-cooks a course already served.'),
  BULLET('Preparation and allergy notes print prominently against the item they belong to.'),
  BULLET('Cancellation tickets print automatically when an item already sent to the kitchen is voided, so the pass stops work.'),
  BULLET('Manual reprint of any ticket, marked as a reprint to avoid duplicate preparation.'),

  H2('3.4 Order types'),
  BULLET('Floor / dine-in orders — tied to a table and cover count, with the 10% service charge applied.'),
  BULLET('Takeaway orders — no table, no service charge.'),
  BULLET('Counter orders — raised directly at the billing counter for walk-in trade.'),
  BULLET('Multiple rounds may be added to any open order before it is closed.'),

  H2('3.5 Billing and settlement'),
  BULLET('Bills numbered in a single continuous serial sequence.'),
  BULLET('Automatic 10% service charge on dine-in orders; correctly excluded from takeaway and counter orders.'),
  BULLET('ABST shown as an included amount on the bill, matching the pricing convention already used on the printed menu.'),
  BULLET('Tip entry with preset percentages calculated on the correct base.'),
  BULLET('Discounts by percentage or fixed amount, with a reason recorded and manager authorisation required.'),
  BULLET('Complimentary items with a reason recorded and manager authorisation required.'),
  BULLET('Item voids — handled differently before and after the kitchen has the ticket, with manager authorisation and a printed cancellation ticket in the latter case.'),
  BULLET('Split payment across cash, card and mobile on a single bill; the bill settles only when the balance clears.'),
  BULLET('Bill printing to the counter thermal printer, with reprint.'),
  BULLET('Reopening a settled bill requires manager authorisation and is recorded.'),

  H2('3.6 Report generation'),
  P('A single reporting dashboard with selectable date ranges (today, yesterday, last seven days, all time):', { color: MUTED, italics: true }),
  BULLET('Headline figures — bills, covers, net sales, average bill and average spend per cover.'),
  BULLET('Sales by hour, to identify true peak trading and staff accordingly.'),
  BULLET('Day summary reconciling gross sales, comps, discounts, net sales, service charge, tips, total taken and the ABST component.'),
  BULLET('Sales split by payment method.'),
  BULLET('Best-selling items by quantity and by value.'),
  BULLET('Category mix across starters, mains, sushi and drinks.'),
  BULLET('Performance by server — bills, covers and value.'),
  BULLET('Voids, comps and discounts report showing the reason, the staff member who requested it and the manager who approved it.'),
  BULLET('Printable end-of-day sales summary.'),

  H2('3.7 Menu and staff management'),
  BULLET('Complete menu loaded from Asian Voyage’s existing menu — 162 items across 22 categories, with prices, descriptions, vegetarian and spicy markers, and item variants.'),
  BULLET('Menu items and prices editable by the client without developer involvement.'),
  BULLET('Item availability toggle for items sold out during service.'),
  BULLET('Staff accounts with PIN sign-in and three roles — waiter, cashier and manager.'),
  BULLET('Manager-only actions: voiding a sent item, comping an item, applying a discount, voiding a bill and reopening a settled bill.'),

  H1('4. Out of Scope'),
  P('The following are deliberately excluded from this proposal. Any of them can be quoted separately if required later.'),
  BULLET('Card payment processing. The system records the payment method and amount; it does not connect to a card terminal or payment gateway. Antigua falls outside the coverage of most international gateways, so live card integration requires a local acquiring bank and is quoted separately once their technical documentation is available.'),
  BULLET('Inventory and stock management, recipe-level depletion, wastage tracking and purchase orders.'),
  BULLET('Customer loyalty programme, points or membership.'),
  BULLET('Customer-facing mobile applications for iOS or Android.'),
  BULLET('Customer-facing QR code menu or online ordering.'),
  BULLET('Multi-branch or second-location support.'),
  BULLET('Integration with accounting packages or payroll systems.'),
  BULLET('Table reservations and booking management.'),
  BULLET('Supply of hardware — tablets, touchscreen, printers and networking.'),
  BULLET('Menu photography and content writing.'),

  H1('5. Deliverables'),
  table([3200, 5826], [
    new TableRow({ children: [
      cell('Deliverable', { w: 3200, bold: true, fill: WASH, color: CLAY }),
      cell('Description', { w: 5826, bold: true, fill: WASH, color: CLAY })] }),
    new TableRow({ children: [
      cell('Waiter interface', { w: 3200, bold: true }),
      cell('Tablet-optimised ordering application with PIN sign-in', { w: 5826 })] }),
    new TableRow({ children: [
      cell('Admin interface', { w: 3200, bold: true }),
      cell('Counter application covering orders, billing, kitchen and reports', { w: 5826 })] }),
    new TableRow({ children: [
      cell('KOT printing', { w: 3200, bold: true }),
      cell('Kitchen ticket generation and printing, including amendments and cancellations', { w: 5826 })] }),
    new TableRow({ children: [
      cell('Bill printing', { w: 3200, bold: true }),
      cell('80mm thermal bill layout with service charge and ABST presentation', { w: 5826 })] }),
    new TableRow({ children: [
      cell('Reporting dashboard', { w: 3200, bold: true }),
      cell('Sales, covers, hourly trend, item and category analysis, exceptions', { w: 5826 })] }),
    new TableRow({ children: [
      cell('Menu data', { w: 3200, bold: true }),
      cell('All 162 items loaded, categorised and priced', { w: 5826 })] }),
    new TableRow({ children: [
      cell('Deployment', { w: 3200, bold: true }),
      cell('Installation, configuration and go-live support on site', { w: 5826 })] }),
    new TableRow({ children: [
      cell('Training', { w: 3200, bold: true }),
      cell('Staff training for waiters, cashiers and management', { w: 5826 })] }),
    new TableRow({ children: [
      cell('Documentation', { w: 3200, bold: true }),
      cell('User guide and administrator handbook', { w: 5826 })] })
  ]),

  new Paragraph({ children: [new PageBreak()] }),

  H1('6. Hardware and Environment'),
  P('Hardware is supplied by the client. The following is the recommended minimum; we will advise on specific models and can assist with procurement at cost.'),
  table([3200, 1400, 4426], [
    new TableRow({ children: [
      cell('Item', { w: 3200, bold: true, fill: WASH, color: CLAY }),
      cell('Quantity', { w: 1400, bold: true, fill: WASH, color: CLAY }),
      cell('Notes', { w: 4426, bold: true, fill: WASH, color: CLAY })] }),
    new TableRow({ children: [
      cell('Counter touchscreen or PC', { w: 3200 }), cell('1', { w: 1400 }),
      cell('Billing counter workstation', { w: 4426 })] }),
    new TableRow({ children: [
      cell('Tablets (10-inch)', { w: 3200 }), cell('2 – 3', { w: 1400 }),
      cell('Waiter interface; Android or iPad', { w: 4426 })] }),
    new TableRow({ children: [
      cell('Thermal printer, 80mm', { w: 3200 }), cell('2', { w: 1400 }),
      cell('One at the kitchen pass, one at the billing counter', { w: 4426 })] }),
    new TableRow({ children: [
      cell('Wi-Fi network', { w: 3200 }), cell('1', { w: 1400 }),
      cell('Reliable coverage across the floor and kitchen', { w: 4426 })] }),
    new TableRow({ children: [
      cell('Cash drawer', { w: 3200 }), cell('1', { w: 1400 }),
      cell('Optional; printer-triggered', { w: 4426 })] })
  ]),

  H1('7. Approach and Timeline'),
  P('Indicative duration is ten to twelve weeks from receipt of the deposit, subject to the client’s availability for review and sign-off at each stage.'),
  table([1500, 2400, 1500, 3626], [
    new TableRow({ children: [
      cell('Phase', { w: 1500, bold: true, fill: WASH, color: CLAY }),
      cell('Stage', { w: 2400, bold: true, fill: WASH, color: CLAY }),
      cell('Duration', { w: 1500, bold: true, fill: WASH, color: CLAY }),
      cell('Output', { w: 3626, bold: true, fill: WASH, color: CLAY })] }),
    new TableRow({ children: [
      cell('1', { w: 1500, bold: true }), cell('Discovery and design', { w: 2400 }),
      cell('2 weeks', { w: 1500 }),
      cell('Confirmed workflows, screen designs, menu and tax configuration, signed off by the client', { w: 3626 })] }),
    new TableRow({ children: [
      cell('2', { w: 1500, bold: true }), cell('Development', { w: 2400 }),
      cell('5 – 6 weeks', { w: 1500 }),
      cell('Both interfaces, KOT printing, billing and reporting built and internally tested', { w: 3626 })] }),
    new TableRow({ children: [
      cell('3', { w: 1500, bold: true }), cell('Testing and UAT', { w: 2400 }),
      cell('2 weeks', { w: 1500 }),
      cell('Hardware integration, printer testing, client acceptance testing and corrections', { w: 3626 })] }),
    new TableRow({ children: [
      cell('4', { w: 1500, bold: true }), cell('Deployment and go-live', { w: 2400 }),
      cell('1 – 2 weeks', { w: 1500 }),
      cell('Installation on site, staff training, supervised first service, handover', { w: 3626 })] })
  ]),

  H1('8. Commercial Terms'),
  P('Total investment for the scope described in Section 3:'),
  new Paragraph({
    spacing: { before: 100, after: 200 },
    children: [new TextRun({ text: 'USD 7,000', bold: true, size: 40, color: CLAY, font: 'Calibri' })]
  }),
  P('Payment is staged against delivery milestones as follows:'),
  table([1300, 3600, 1600, 2526], [
    new TableRow({ children: [
      cell('Stage', { w: 1300, bold: true, fill: WASH, color: CLAY }),
      cell('Milestone', { w: 3600, bold: true, fill: WASH, color: CLAY }),
      cell('Share', { w: 1600, bold: true, fill: WASH, color: CLAY, align: AlignmentType.RIGHT }),
      cell('Amount (USD)', { w: 2526, bold: true, fill: WASH, color: CLAY, align: AlignmentType.RIGHT })] }),
    new TableRow({ children: [
      cell('1', { w: 1300 }), cell('Deposit, on acceptance of this proposal', { w: 3600 }),
      cell('30%', { w: 1600, align: AlignmentType.RIGHT }),
      cell('2,100', { w: 2526, align: AlignmentType.RIGHT })] }),
    new TableRow({ children: [
      cell('2', { w: 1300 }), cell('Design completion and sign-off', { w: 3600 }),
      cell('30%', { w: 1600, align: AlignmentType.RIGHT }),
      cell('2,100', { w: 2526, align: AlignmentType.RIGHT })] }),
    new TableRow({ children: [
      cell('3', { w: 1300 }), cell('Development completion and testing', { w: 3600 }),
      cell('30%', { w: 1600, align: AlignmentType.RIGHT }),
      cell('2,100', { w: 2526, align: AlignmentType.RIGHT })] }),
    new TableRow({ children: [
      cell('4', { w: 1300 }), cell('Go live', { w: 3600 }),
      cell('10%', { w: 1600, align: AlignmentType.RIGHT }),
      cell('700', { w: 2526, align: AlignmentType.RIGHT })] }),
    new TableRow({ children: [
      cell('', { w: 1300, fill: WASH }),
      cell('Total', { w: 3600, bold: true, fill: WASH }),
      cell('100%', { w: 1600, bold: true, fill: WASH, align: AlignmentType.RIGHT }),
      cell('7,000', { w: 2526, bold: true, fill: WASH, color: CLAY, align: AlignmentType.RIGHT })] })
  ]),
  P('All amounts are in United States Dollars and exclude any local taxes, bank charges or transfer fees, which are for the client’s account. Invoices are payable within seven days of issue. Hardware is not included in the above and is procured separately by the client.', { before: 160, color: MUTED }),

  H1('9. Client Responsibilities and Assumptions'),
  BULLET('A single point of contact is nominated with authority to approve designs and sign off milestones.'),
  BULLET('Feedback and sign-off at each stage are provided within five working days; delays beyond this shift the schedule accordingly.'),
  BULLET('Hardware, network and internet connectivity are in place before Phase 4 begins.'),
  BULLET('The final menu, prices and the applicable ABST rate are confirmed in writing during Phase 1.'),
  BULLET('Staff are made available for training and for acceptance testing at agreed times.'),
  BULLET('Access to the premises is provided for installation and for supervision of the first live service.'),
  BULLET('The system is delivered as described in Section 3; changes requested after design sign-off are handled as a change request and quoted separately.'),

  H1('10. Warranty and Support'),
  BULLET('Ninety days of defect support from the go-live date, covering correction of faults in the delivered scope at no additional cost.'),
  BULLET('Remote support during Antigua business hours, with response within one working day.'),
  BULLET('On-site attendance during the first live service is included in Phase 4.'),
  BULLET('Ongoing annual maintenance, hosting and enhancement support is available under a separate agreement, quoted on request.'),
  BULLET('Source code and all data remain the property of the client on final payment.'),

  H1('11. Why This Proposal'),
  BULLET('A working prototype has already been built and demonstrated on Asian Voyage’s own menu, so the scope is proven rather than assumed.'),
  BULLET('The system is designed around how the restaurant actually trades — sharp tourist peaks, a mix of seated and takeaway trade, and EC dollar pricing with ABST already included.'),
  BULLET('Operational detail is handled properly: amendment tickets rather than reprints, authorised voids and comps, and reporting that shows the owner where the money went.'),
  BULLET('Staged payments tied to delivered milestones keep commercial risk on both sides low.'),

  H1('12. Acceptance'),
  P('Signature below constitutes acceptance of this proposal and the scope, timeline and commercial terms set out within it.'),

  new Paragraph({ spacing: { before: 400 } }),
  table([4513, 4513], [
    new TableRow({ children: [
      cell('For Asian Voyage / Hospitality Guru Ltd', { w: 4513, bold: true, fill: WASH, color: CLAY }),
      cell('For [Your Company Name]', { w: 4513, bold: true, fill: WASH, color: CLAY })] }),
    new TableRow({ children: [
      cell(' Signature: ______________________', { w: 4513 }),
      cell(' Signature: ______________________', { w: 4513 })] }),
    new TableRow({ children: [
      cell('Name: ______________________', { w: 4513 }),
      cell('Name: ______________________', { w: 4513 })] }),
    new TableRow({ children: [
      cell('Position: ______________________', { w: 4513 }),
      cell('Position: ______________________', { w: 4513 })] }),
    new TableRow({ children: [
      cell('Date: ______________________', { w: 4513 }),
      cell('Date: ______________________', { w: 4513 })] })
  ])
];

/* ---------------------------------------------------------------- document */
const doc = new Document({
  creator: '[Your Company Name]',
  title: 'Asian Voyage — Restaurant POS Proposal',
  description: 'Proposal for a restaurant point of sale system',
  numbering: {
    config: [{
      reference: 'bullets',
      levels: [
        { level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 200 } } } },
        { level: 1, format: LevelFormat.BULLET, text: '◦', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 200 } } } }
      ]
    }]
  },
  sections: [{
    properties: { page: { margin: {
      top: convertInchesToTwip(1), bottom: convertInchesToTwip(1),
      left: convertInchesToTwip(1), right: convertInchesToTwip(1)
    } } },
    children: [...cover, ...body]
  }]
});

Packer.toBuffer(doc).then(b => {
  fs.writeFileSync('Asian-Voyage-POS-Proposal.docx', b);
  console.log('written:', b.length, 'bytes');
});
