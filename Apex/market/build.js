const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle
} = require('docx');

/* ------------------------------------------------------------- palette */
const W       = 9026;
const FOREST  = '0F3D33';
const GOLD    = 'A97A31';
const INK     = '16191D';
const MUTED   = '5C6470';
const LINE    = 'DDD6CC';
const WASH    = 'FBF1DE';
const FWASH   = 'E6F0EC';

/* XML 1.0 forbids most control characters. Strip them at the boundary so a
   stray character pasted into a string can never produce a corrupt file. */
function clean(v) {
  const s = String(v == null ? '' : v);
  let out = '';
  for (const ch of s) {
    const c = ch.codePointAt(0);
    if (c < 32 && ch !== '\n' && ch !== '\t') continue;
    out += (c === 160) ? ' ' : ch;
  }
  return out;
}

const T = (t, o = {}) => new TextRun({
  text: clean(t), bold: o.bold, italics: o.italics, size: o.size ?? 21,
  color: o.color ?? INK, font: 'Calibri', characterSpacing: o.spacing
});
const b = (t, o = {}) => T(t, { ...o, bold: true });

const P = (kids, o = {}) => new Paragraph({
  alignment: o.align,
  spacing: { before: o.before ?? 0, after: o.after ?? 130 },
  children: Array.isArray(kids) ? kids : [T(kids, o)]
});

const H1 = t => new Paragraph({
  heading: HeadingLevel.HEADING_1, spacing: { before: 340, after: 150 },
  children: [T(t, { bold: true, size: 29, color: FOREST })]
});
const H1B = t => new Paragraph({
  heading: HeadingLevel.HEADING_1, pageBreakBefore: true, spacing: { after: 150 },
  children: [T(t, { bold: true, size: 29, color: FOREST })]
});
const H2 = t => new Paragraph({
  heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 90 },
  children: [T(t, { bold: true, size: 23, color: INK })]
});
const EYE = t => new Paragraph({
  spacing: { before: 200, after: 60 },
  children: [T(t, { bold: true, size: 17, color: GOLD, spacing: 60 })]
});

const BUL = t => new Paragraph({
  numbering: { reference: 'bul', level: 0 }, spacing: { after: 55 },
  children: Array.isArray(t) ? t : [T(t)]
});
const NUM = t => new Paragraph({
  numbering: { reference: 'num', level: 0 }, spacing: { after: 70 },
  children: Array.isArray(t) ? t : [T(t)]
});

const cell = (t, o = {}) => new TableCell({
  width: { size: o.w, type: WidthType.DXA },
  shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: 'auto' } : undefined,
  margins: { top: 95, bottom: 95, left: 130, right: 130 },
  children: (Array.isArray(t) ? t : [t]).map(x =>
    typeof x === 'string'
      ? new Paragraph({ alignment: o.align, spacing: { after: 0 },
          children: [T(x, { bold: o.bold, size: o.size ?? 20, color: o.color ?? INK })] })
      : x)
});
const hcell = (t, w, o = {}) => cell(t, { w, bold: true, fill: FOREST, color: 'FFFFFF', size: 19, ...o });

const table = (widths, rows) => new Table({
  columnWidths: widths,
  width: { size: widths.reduce((a, c) => a + c, 0), type: WidthType.DXA },
  borders: {
    top:{style:BorderStyle.SINGLE,size:4,color:LINE}, bottom:{style:BorderStyle.SINGLE,size:4,color:LINE},
    left:{style:BorderStyle.SINGLE,size:4,color:LINE}, right:{style:BorderStyle.SINGLE,size:4,color:LINE},
    insideHorizontal:{style:BorderStyle.SINGLE,size:4,color:LINE},
    insideVertical:{style:BorderStyle.SINGLE,size:4,color:LINE}
  },
  rows
});

const RULE = new Paragraph({
  spacing: { before: 60, after: 170 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GOLD } },
  children: [T('')]
});

const CALLOUT = (title, body) => new Table({
  columnWidths: [W],
  width: { size: W, type: WidthType.DXA },
  borders: {
    top:{style:BorderStyle.SINGLE,size:4,color:GOLD}, bottom:{style:BorderStyle.SINGLE,size:4,color:GOLD},
    left:{style:BorderStyle.SINGLE,size:18,color:GOLD}, right:{style:BorderStyle.SINGLE,size:4,color:GOLD},
    insideHorizontal:{style:BorderStyle.NONE,size:0,color:'FFFFFF'},
    insideVertical:{style:BorderStyle.NONE,size:0,color:'FFFFFF'}
  },
  rows: [new TableRow({ children: [new TableCell({
    width: { size: W, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: WASH, color: 'auto' },
    margins: { top: 150, bottom: 150, left: 180, right: 180 },
    children: [
      new Paragraph({ spacing: { after: 70 }, children: [T(title, { bold: true, size: 21, color: GOLD })] }),
      ...(Array.isArray(body) ? body : [body]).map(x =>
        typeof x === 'string' ? new Paragraph({ spacing: { after: 0 }, children: [T(x)] }) : x)
    ]
  })] })]
});

const gbp = n => '£' + n.toLocaleString('en-GB');

const K = [];
const add = (...x) => K.push(...x);


/* small helper: a statistic block */
const STAT = (value, label, note) => new TableCell({
  width: { size: Math.floor(W / 3), type: WidthType.DXA },
  margins: { top: 150, bottom: 150, left: 140, right: 140 },
  shading: { type: ShadingType.CLEAR, fill: 'FBFAF8', color: 'auto' },
  children: [
    new Paragraph({ spacing: { after: 40 }, children: [T(value, { bold: true, size: 40, color: FOREST })] }),
    new Paragraph({ spacing: { after: note ? 40 : 0 }, children: [T(label, { bold: true, size: 19, color: INK })] }),
    ...(note ? [new Paragraph({ children: [T(note, { size: 17, color: MUTED })] })] : []),
  ],
});
const STATROW = (cells) => new Table({
  columnWidths: cells.map(() => Math.floor(W / cells.length)),
  width: { size: W, type: WidthType.DXA },
  borders: {
    top:{style:BorderStyle.SINGLE,size:4,color:LINE}, bottom:{style:BorderStyle.SINGLE,size:4,color:LINE},
    left:{style:BorderStyle.SINGLE,size:4,color:LINE}, right:{style:BorderStyle.SINGLE,size:4,color:LINE},
    insideHorizontal:{style:BorderStyle.SINGLE,size:4,color:LINE},
    insideVertical:{style:BorderStyle.SINGLE,size:4,color:LINE}
  },
  rows: [new TableRow({ children: cells })],
});
const REASON = (n, title, body) => {
  add(new Paragraph({
    spacing: { before: 230, after: 60 },
    children: [T(String(n).padStart(2, '0'), { bold: true, size: 24, color: GOLD }), T('    '), T(title, { bold: true, size: 24, color: INK })],
  }));
  add(P(body));
};

/* ----------------------------------------------------------------- cover */
add(
  new Paragraph({ spacing: { after: 0 }, children: [T('MARKET OVERVIEW', { bold: true, size: 20, color: GOLD, spacing: 70 })] }),
  new Paragraph({ spacing: { before: 220, after: 60 }, children: [T('Apex', { bold: true, size: 62, color: FOREST })] }),
  new Paragraph({ spacing: { after: 80 }, children: [T('The market for a members-only business network in the United Kingdom', { size: 26, color: INK })] }),
  new Paragraph({ spacing: { after: 380 }, children: [T('Market conditions, structural readiness and what makes the proposition distinct', { size: 21, color: MUTED })] }),
  RULE,
  table([2500, 6526], [
    new TableRow({ children: [cell('Prepared for', { w: 2500, bold: true, color: MUTED }), cell('Mr Sajjad Kassamali', { w: 6526 })] }),
    new TableRow({ children: [cell('Project', { w: 2500, bold: true, color: MUTED }), cell('Apex — Members Network and Apex Deals', { w: 6526 })] }),
    new TableRow({ children: [cell('Launch market', { w: 2500, bold: true, color: MUTED }), cell('London, United Kingdom', { w: 6526 })] }),
    new TableRow({ children: [cell('Prepared by', { w: 2500, bold: true, color: MUTED }), cell('Nile Technologies', { w: 6526 })] }),
    new TableRow({ children: [cell('Date', { w: 2500, bold: true, color: MUTED }), cell('26 August 2026', { w: 6526 })] }),
    new TableRow({ children: [cell('Reference', { w: 2500, bold: true, color: MUTED }), cell('APX-MKT-2026-01', { w: 6526 })] }),
  ]),
  new Paragraph({ spacing: { before: 420 }, children: [T('Commercial in confidence. Every figure in this document is drawn from published third-party research and is referenced in full at Section 8. This document sets out market conditions and does not contain revenue forecasts.', { size: 18, color: MUTED, italics: true })] }),
);

/* ------------------------------------------------------ 1. the real market */
add(H1B('1.  The market Apex is entering'));
add(P('It is tempting to describe Apex as a business directory. That is not the market it competes in, and thinking of it that way understates the opportunity considerably.'));
add(P([b('Apex competes for a share of the British subscription wallet. '), T('The average Briton now pays for 2.8 subscriptions totalling £65.50 every month, or £786 a year. In London the figure is £77 a month. In 2022 that same wallet held £41.70 a month — it has grown by 57% in three years.')]));
add(STATROW([
  STAT('£65.50', 'Average monthly UK subscription spend', 'Across 2.8 subscriptions'),
  STAT('£77', 'Average monthly London subscription spend', 'The highest-value market in the country'),
  STAT('57%', 'Growth in that wallet since 2022', 'From £41.70 a month'),
]));
add(P('This matters for two reasons. The money Apex is asking for sits in a pool that is expanding rather than being reallocated from a fixed budget. And British consumers have already accepted the idea of paying a monthly fee for access to something — the behaviour Apex depends on is established, not novel.', { before: 160 }));

/* ------------------------------------------------------- 2. the population */
add(H1('2.  The population'));
add(P('London is the launch market and is large enough to be treated as a national-scale opportunity on its own.'));
add(STATROW([
  STAT('9.09m', 'People in London', 'ONS mid-2024 estimate'),
  STAT('7.09m', 'Adults in London', 'The addressable consumer base'),
  STAT('3.58m', 'London households', 'At 2.54 people per household'),
]));
add(P('Behind the consumer side sits the supply side. The United Kingdom has 5.64 million small businesses, representing 99.2% of the entire business population, and 5.7 million SMEs in total, or 99.9%. These are precisely the businesses that have the least access to affordable distribution and the most to gain from it.', { before: 170 }));
add(STATROW([
  STAT('5.64m', 'UK small businesses', '99.2% of all UK businesses'),
  STAT('90%+', 'of British consumers have used a discount code', 'The behaviour is universal'),
  STAT('£1,200', 'Average annual saving per digital coupon user', 'Value consumers already capture'),
]));

/* ------------------------------------------------ 3. the subscription market */
add(H1B('3.  The subscription and loyalty market'));
add(P('Apex sits at the meeting point of two markets that are both growing, and neither of which requires the consumer to learn a new habit.'));

add(H2('The loyalty market'));
add(P('The United Kingdom loyalty programmes market is valued at 2.56 billion US dollars in 2025 and is forecast to reach 4.06 billion by 2029, a compound annual growth rate of 12.2%. Alongside it, the digital coupon market is growing at 18.33% a year.'));

add(H2('Consumer participation'));
add(P('Participation is close to universal. 80% of Britons actively used a loyalty programme during 2025. 97% belong to at least one supermarket scheme. The average shopper holds three separate memberships. And notably, 76% of UK consumers now say loyalty schemes should offer members more than discounts alone — a direct invitation to a proposition built on more than price.'));
add(STATROW([
  STAT('$2.56bn', 'UK loyalty market, 2025', 'Forecast $4.06bn by 2029'),
  STAT('80%', 'of Britons actively used a loyalty programme in 2025', 'Behaviour is mainstream'),
  STAT('3', 'Average memberships held per shopper', 'Room exists for another'),
]));

/* ---------------------------------------------------------- 4. why the UK */
add(H1B('4.  Why the United Kingdom is structurally the right market'));
add(P('Six conditions, each supported by published evidence, make Britain an unusually well-prepared market for this proposition.'));

REASON(1, 'Membership behaviour is already normalised',
  'Eighty per cent of Britons actively used a loyalty programme in 2025, ninety-seven per cent belong to at least one supermarket scheme, and the average shopper already holds three memberships. Apex requires no consumer education. "Join to save" is understood behaviour in this country. This is the single biggest structural advantage available, and it is the reason the United Kingdom is a stronger launch market than most of Europe.');

REASON(2, 'The payments infrastructure is ready',
  'Smartphone penetration is above ninety per cent. Fifty-seven per cent of adults are registered for a mobile wallet, up from forty-two per cent in a single year, and sixty-two per cent of all card payments are now contactless. Subscription billing, in-app purchase and unlocking an offer at the counter are frictionless in a way they were not five years ago.');

REASON(3, 'The subscription wallet is growing, not static',
  'British subscription spending has risen fifty-seven per cent in three years, from £41.70 a month to £65.50, and £77 in London. Apex is competing for a share of a pool that is expanding. It does not need to displace an existing subscription in order to be added.');

REASON(4, 'There is a proven and profitable precedent in this market',
  'A members-only discount network operating in the United Kingdom under a professional eligibility gate reported revenue of £94.6 million and pre-tax profit of £43.1 million in the year to April 2025, serving 5.6 million members across more than fifteen thousand retail partners and delivering £469 million of savings. Whatever else remains uncertain, the two fundamental questions — will British consumers join a members-only discount network, and will British businesses participate at scale — are already answered.');

REASON(5, 'The previous incumbents have left the field',
  'The United Kingdom’s dominant business directory has seen searches for its name fall by ninety-one per cent since 2015, organic traffic halve, and profits fall forty-four per cent in a year. The largest local-deals marketplace saw revenue fall eighty per cent, from three billion dollars to six hundred million, and remained loss-making into 2026. Local commerce discovery in Britain is currently unowned.');

REASON(6, 'Density',
  'London places 9.09 million people, of whom 7.09 million are adults, inside roughly six hundred square miles. A hyperlocal proposition works here in a way it does not across most of the United States, where the same population is spread across whole states. City centres account for 9.1% of all face-to-face consumer spending on 0.1% of the land. One city is a viable launch at national scale.');

/* --------------------------------------------------------------- 5. USPs */
add(H1B('5.  What makes Apex distinct'));
add(P('Four things separate Apex from anything else operating in this space. The first three are competitive advantages. The fourth is the mechanism that guarantees the third, and we have been unable to find it anywhere in the market.'));

add(H2('One  ·  A professional network, not only a discount network'));
add(P('Apex carries two destinations under a single membership. Apex Deals holds the offers. Apex Network holds the opportunities — the same verified businesses, hiring. A member joins for the savings and stays for a reason no discount scheme can match, and a business keeps its listing current because it has two reasons to return rather than one. No comparable platform in the market combines commercial and professional value under one membership.'));

add(H2('Two  ·  Loyalty and membership, with exclusivity as the product'));
add(P('The value of an offer is not visible until a member holds a membership. Browsing the directory is free and always will be, but the discount belongs to members. This converts a directory into a club, and it is the difference between a service people use occasionally and one they belong to. Seventy-six per cent of British consumers say they want loyalty schemes to deliver more than discounts; membership is precisely that answer.'));

add(H2('Three  ·  The best rewards available, by design'));
add(P('The weakness of every discount platform is offer quality. Businesses publish their leftovers, members find the savings marginal, and the audience drifts away. Apex is designed so that publishing your genuinely best offer is the commercially rational choice, not an act of goodwill. That design is the fourth point.'));

add(H2('Four  ·  Vendor revenue share — no equivalent found in the market'));
add(P('Consider what the largest video platform in the world actually did. Its revenue came from advertising. Rather than retain it, it paid a share back to the people making the videos. It never had to commission content or police quality — creators competed with one another to produce the best work available, because the platform paid them to. The content improved itself.'));
add(P('Apex applies the same mechanism to commerce. Our revenue is membership subscription. A defined share of it is paid back to the businesses whose offers members actually redeem. The consequences follow automatically.'));
[
  'A business has a direct financial reason to publish its genuinely best offer on Apex rather than its leftovers.',
  'Businesses compete with one another for the top of the table, which raises the quality of every offer on the platform.',
  'Members see better value, stay longer, and the subscription pool from which payouts are drawn grows.',
  'Apex acquires something a competitor cannot copy quickly — a supply side that is motivated rather than merely present.',
].forEach(t => add(BUL(t)));
add(CALLOUT('The point worth holding on to',
  'We have reviewed the loyalty, directory, discount and employee-benefits sectors in the United Kingdom and internationally. Platforms that charge businesses are commonplace. A platform that pays businesses a share of consumer subscription revenue, ranked on redemption performance, does not appear to exist. This is the part of Apex with no competition to the concept.'));

/* ----------------------------------------------- 6. conditions to respect */
add(H1B('6.  Market conditions the model must respect'));
add(P('A market overview that contained only favourable evidence would not be worth much. Four conditions shape how Apex should be taken to market, and the proposition is stronger for being designed around them from the beginning.'));

add(H2('The supply base is under pressure'));
add(P('Independent retail and hospitality businesses in Britain are trading in difficult conditions, with a substantial number of closures forecast across 2025. This cuts both ways. It makes the businesses Apex depends on harder to sign and harder to keep. It also makes free distribution and a genuine new revenue stream considerably more attractive to them than they would have been five years ago.'));

add(H2('Consumers are auditing their subscriptions'));
add(P('British households waste an estimated £528 a year on forgotten or price-crept subscriptions, and consumers have become notably more disciplined about what they keep. A new monthly charge faces scrutiny. The answer is arithmetic rather than persuasion, which is why the application keeps a running total of what a member has actually saved in front of them at all times.'));

add(H2('Small business marketing budgets are small'));
add(P('Fifty-eight per cent of UK SMEs spend under £250 a month on all marketing combined. Any paid placement Apex offers competes directly with established advertising channels for a genuinely constrained budget, and must be priced and evidenced accordingly. This is why the core listing is free and always should be.'));

add(H2('Discovery must be dense before it is wide'));
add(P('A members network is only worth paying for when there is enough within reach of the member to be worth unlocking. Depth in one area is worth considerably more than thin coverage across a city, and far more than thin coverage across a country. The launch strategy should reflect that.'));

/* --------------------------------------------------- 7. success criteria */
add(H1B('7.  What success looks like'));
add(P('This document deliberately contains no revenue forecast. Forecasts at this stage are guesswork dressed as analysis, and Apex deserves better than that. What can be defined now, precisely, is what a healthy market response looks like — the measurable signals that tell you the market is accepting the proposition long before revenue does.'));

add(H2('Before consumer marketing begins'));
[
  'Three hundred or more verified businesses live in the launch area.',
  'At least eight live offers in each of the leading categories within reach of a typical member.',
  'At least forty per cent of live offers carrying genuine value rather than token discounts.',
].forEach(t => add(BUL(t)));

add(H2('The first ninety days'));
[
  'A median member saving at least three times their subscription within ninety days.',
  'At least a third of unlocked offers actually redeemed in store — the signal that the value is real rather than theoretical.',
  'Seven in ten members still subscribed at month three.',
].forEach(t => add(BUL(t)));

add(H2('The first year'));
[
  'Seven in ten businesses still publishing a live offer at month six. Supply retention matters more than member retention at this stage.',
  'Members reporting the offers as the reason they stay, rather than price alone.',
  'A measurable share of listed businesses choosing to pay for additional visibility — the proof that the audience has become commercially valuable.',
].forEach(t => add(BUL(t)));

add(CALLOUT('The single most important measure',
  'Density before breadth. If there is enough within reach of a member to be worth unlocking, and the businesses stay because the platform pays them to, everything else follows. If either fails, no amount of marketing will compensate.'));

/* ------------------------------------------------------------- 8. sources */
add(H1B('8.  Sources'));
add(P('Every figure in this document is drawn from published third-party research. Nothing has been estimated by Nile Technologies.'));
const SRC = [
  ['Population of London, 9,089,736', 'Office for National Statistics, mid-2024 estimates'],
  ['UK small business population, 5.64m', 'Federation of Small Businesses, UK Small Business Statistics'],
  ['UK subscription spending, £65.50 and £77 per month', 'Aqua, UK Subscription Service Spending 2025'],
  ['UK loyalty market, $2.56bn to $4.06bn by 2029', 'Research and Markets, United Kingdom Loyalty Market Databook'],
  ['80% loyalty programme participation', 'Retail Focus, UK consumer loyalty scheme research 2025'],
  ['Smartphone, mobile wallet and contactless penetration', 'UK Finance, UK Payment Markets 2025'],
  ['Members-only network revenue and membership figures', 'Insider Media, published company results to April 2025'],
  ['Directory and local-deals marketplace decline', 'Business Leader; company quarterly filings 2026'],
  ['Digital coupon market growth and average consumer saving', 'PromoCode UK coupon statistics 2026; Opia voucher trends'],
  ['SME marketing spend, 58% under £250 per month', 'Andava, UK Digital Marketing Statistics'],
  ['Retail and hospitality trading conditions', 'House of Lords Library; RSM UK Leisure and Hospitality Outlook'],
  ['City centre share of face-to-face spending', 'IFA Magazine, reviving UK high streets'],
];
add(table([4400, 4626], [
  new TableRow({ tableHeader: true, children: [hcell('Figure', 4400), hcell('Source', 4626)] }),
  ...SRC.map(([a, b2]) => new TableRow({ children: [cell(a, { w: 4400 }), cell(b2, { w: 4626, color: MUTED })] })),
]));

/* ------------------------------------------------------------- document */
const doc = new Document({
  creator: 'Nile Technologies',
  title: 'Apex - Market Overview',
  description: 'Market conditions for a members-only business network in the United Kingdom',
  numbering: {
    config: [
      { reference: 'bul', levels: [{ level: 0, format: 'bullet', text: '•', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 400, hanging: 220 } } } }] },
      { reference: 'num', levels: [{ level: 0, format: 'decimal', text: '%1.', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 400, hanging: 240 } } } }] },
    ],
  },
  sections: [{
    properties: { page: { margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } } },
    children: K,
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('Apex-Market-Overview.docx', buf);
  console.log('written  ' + (buf.length / 1024).toFixed(0) + ' KB');
});
