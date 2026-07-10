const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
  Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
  WidthType, ShadingType, VerticalAlign, PageNumber, BorderStyle: BS
} = require('docx');

const NAVY = "16284D";
const NAVY2 = "1E3A5F";
const GOLD = "9A7B23";
const GOLDFILL = "F3ECD8";
const NAVYFILL = "EAF0FA";
const INK = "23262F";
const MUTED = "6B7280";
const LINE = "D9D3C5";

const DIR = __dirname;
const OUT = path.join(DIR, 'Almanac-Engagement-Agreement.docx');

const H1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children:[new TextRun(t)] });
const P = (runs, opts={}) => new Paragraph({ spacing:{after:130, line:278}, children: Array.isArray(runs)?runs:[new TextRun(runs)], ...opts });
const T = (text, o={}) => new TextRun({ text, ...o });
const b = (text, o={}) => new TextRun({ text, bold:true, ...o });
const bullet = (runs) => new Paragraph({ numbering:{reference:"bullets", level:0}, spacing:{after:80, line:272}, children: Array.isArray(runs)?runs:[new TextRun(runs)] });

const border = { style: BorderStyle.SINGLE, size: 2, color: LINE };
const borders = { top:border, bottom:border, left:border, right:border };
const cellMargins = { top:90, bottom:90, left:130, right:130 };
function headerCell(text, w) {
  return new TableCell({ borders, width:{size:w, type:WidthType.DXA}, margins:cellMargins,
    shading:{ fill:NAVY, type:ShadingType.CLEAR }, verticalAlign:VerticalAlign.CENTER,
    children:[ new Paragraph({ children:[ new TextRun({ text, bold:true, color:"FFFFFF", size:20 }) ] }) ] });
}
function cell(children, w, opts={}) {
  if (typeof children === 'string') children = [new Paragraph({ children:[new TextRun({text:children, size:20})] })];
  else if (!Array.isArray(children)) children = [children];
  return new TableCell({ borders, width:{size:w, type:WidthType.DXA}, margins:cellMargins, verticalAlign:VerticalAlign.CENTER,
    shading: opts.fill ? { fill:opts.fill, type:ShadingType.CLEAR } : undefined, children });
}

const children = [];

// Logo
try {
  const logo = fs.readFileSync(path.join(DIR, 'logo.png'));
  children.push(new Paragraph({ alignment:AlignmentType.RIGHT, spacing:{after:60},
    children:[ new ImageRun({ type:"png", data:logo, transformation:{ width:150, height:65 },
      altText:{ title:"Calibri Consulting", description:"Calibri Consulting logo", name:"logo" } }) ] }));
} catch(e){}

// Title
children.push(new Paragraph({ spacing:{after:6},
  children:[ new TextRun({ text:"Engagement Agreement", font:"Georgia", size:46, bold:true, color:NAVY }) ] }));
children.push(new Paragraph({ spacing:{after:180}, border:{ bottom:{ style:BorderStyle.SINGLE, size:12, color:GOLD, space:6 } },
  children:[ new TextRun({ text:"Almanac — Practice Transition & Handover Tool", size:24, color:GOLD, bold:true }) ] }));

// Parties meta
children.push(new Table({ width:{size:9360,type:WidthType.DXA}, columnWidths:[2000,7360], rows:[
  new TableRow({children:[ cell([new Paragraph({children:[b("Between",{size:20})]})],2000,{fill:NAVYFILL}), cell("Nile Technologies Pvt. Ltd. (“Nile”) — [registered address]",7360) ]}),
  new TableRow({children:[ cell([new Paragraph({children:[b("And",{size:20})]})],2000,{fill:NAVYFILL}), cell("Calibri Consulting (“Calibri”) — [address]",7360) ]}),
  new TableRow({children:[ cell([new Paragraph({children:[b("Effective date",{size:20})]})],2000,{fill:NAVYFILL}), cell("[Effective Date]",7360) ]}),
  new TableRow({children:[ cell([new Paragraph({children:[b("Re",{size:20})]})],2000,{fill:NAVYFILL}), cell("Design and build of “Almanac”, Calibri’s practice-transition and handover tool",7360) ]}),
]}));
children.push(P("",{spacing:{after:80}}));

// 1. About
children.push(H1("1.  About this engagement"));
children.push(P([
  T("This Engagement Agreement (the “Agreement”) is between "), b("Nile Technologies Pvt. Ltd."),
  T(" (“Nile”, “we”, “us”) and "), b("Calibri Consulting"),
  T(" (“Calibri”, “you”). It sets out the product we will build for you, what it will cost, and how we will work together. We’ve written it to be read easily and to be fair to both sides — the intent is clarity, not complexity.")
]));

// 2. What we're building
children.push(H1("2.  What we’re building"));
children.push(P([
  b("Almanac"), T(" is a case-based workspace that captures how a departing advisor’s practice really works — not just what each person does, but how and why — and maps it cleanly onto the acquiring firm so that clients, relationships, and judgment survive the handover. Each case moves through a clear path: onboard the seller, onboard the buyer, map the handover, and close. When a handover is complete, the case is closed and client data is purged.")
]));

// 3. Scope of work
children.push(H1("3.  Scope of work"));
children.push(P("We will design, build, and deliver the complete Almanac system, comprising:"));
children.push(P([b("Core platform")], {spacing:{after:50}}));
[
  ["Sign-in & team","secure access for the Calibri team."],
  ["Dashboard & case management","all active and closed cases, status, and progress."],
  ["Practice Almanac","a flowing, document-style file per practice — pre-set prompts plus your own titled sections, reorderable; a Compile view and a View-as-file dossier. The file that starts each case."],
  ["Roles & who’s who","each person, title, and the responsibilities they own."],
  ["Task & KPI capture","each role’s responsibilities and the what / how / why behind them, drawn from your task library and guided conversationally by the copilot."],
  ["Org map","the captured structure of each practice at a glance."],
  ["Mapping","assign each seller responsibility to a buyer owner; a summary table of the whole mapping, coverage, gaps, and every open item, plus a detailed reassignment view."],
  ["Close & handover","generate the handover package; close the case and purge client data. Almanac file and handover summary are exportable."],
].forEach(([a,c])=> children.push(bullet([b(a+" — "), T(c)])));

children.push(P([b("AI copilot & knowledge base")], {spacing:{before:70,after:50}}));
[
  ["Notion ingestion","your methodology, rules, structure, and routing logic — the foundation you’ve built in Notion — brought across to become the system’s knowledge base."],
  ["AI Copilot","a full-page, contextual chat assistant that suggests the questions to ask, probes for the why between the lines, and flags contradictions across roles."],
  ["Methodology base","the imported core knowledge, shown and re-syncable."],
].forEach(([a,c])=> children.push(bullet([b(a+" — "), T(c)])));

children.push(P([b("Adaptive layer")], {spacing:{before:70,after:50}}));
children.push(bullet([b("Learning loop — "), T("after a case closes, abstracted lessons (better questions, new patterns, risk heuristics) are retained to improve the methodology for future cases — while client data is purged.")]));
children.push(bullet([b("Delivery — "), T("production deployment, a secure database, and handover with training for your team.")]));

// 4. Nile Promise
children.push(H1("4.  The Nile Promise"));
children.push(P([
  T("We know a build like this evolves as we learn the detail of your system. So we make you a simple promise: the refinements, adjustments, and natural back-and-forth of getting Almanac right — "),
  b("within the scope described above"),
  T(" — will not cost you anything extra. The fee is the fee. If, together, we ever decide to add something genuinely new and beyond this scope, we’ll simply agree it in a short written add-on before starting — never a surprise. This is our written assurance to you.")
]));

// 5. Notion / methodology
children.push(H1("5.  Your methodology, and how we use it"));
children.push(P([
  T("The heart of Almanac is the work you’ve already done in Notion. You will not recreate it. In a requirements session with our technical team, we will review your Notion workspace and carry your foundation — the rules, structure, methodology, and routing logic — across into the system’s knowledge base. "),
  b("Everything you’ve built remains entirely yours"),
  T("; we use it only to build Almanac for you. We have already accounted for this work in the fee below, so the session is about building faithfully to what you’ve created, not about pricing.")
]));

// 6. Fees & payment
children.push(H1("6.  Fees & payment"));
children.push(P([ T("The fee for the complete Almanac system described above is "), b("USD $24,000"), T(". We suggest the following simple schedule, adjustable by mutual agreement:") ]));
children.push(new Table({ width:{size:9360,type:WidthType.DXA}, columnWidths:[4560,3000,1800], rows:[
  new TableRow({tableHeader:true, children:[ headerCell("Milestone",4560), headerCell("When",3000), headerCell("Amount",1800) ]}),
  new TableRow({children:[ cell("On signing — to begin",4560), cell("Kickoff",3000), cell([new Paragraph({children:[b("$9,600",{size:20})]})],1800,{fill:GOLDFILL}) ]}),
  new TableRow({children:[ cell("Development midpoint",4560), cell("Mid-build",3000), cell([new Paragraph({children:[b("$7,200",{size:20})]})],1800,{fill:GOLDFILL}) ]}),
  new TableRow({children:[ cell("Delivery & your acceptance",4560), cell("Completion",3000), cell([new Paragraph({children:[b("$7,200",{size:20})]})],1800,{fill:GOLDFILL}) ]}),
  new TableRow({children:[ cell([new Paragraph({children:[b("Total",{size:20})]})],4560,{fill:NAVYFILL}), cell("",3000,{fill:NAVYFILL}), cell([new Paragraph({children:[b("$24,000",{size:20})]})],1800,{fill:NAVYFILL}) ]}),
]}));
children.push(P([ T("Third-party running costs — hosting and the Claude AI usage — are billed separately at cost and are modest for internal use (estimated tens of dollars per month). We’ll confirm once your Notion foundation is sized.") ], {spacing:{before:90}}));

// 7. Timeline
children.push(H1("7.  Timeline"));
children.push(P([
  T("We estimate approximately "), b("8–10 weeks"),
  T(" from kickoff to delivery. Kickoff begins once the NDA is in place and we’ve completed the requirements session on your Notion foundation. This is an honest estimate; we’ll agree firm dates at kickoff and keep you updated throughout.")
]));

// 8. What we'll need from you
children.push(H1("8.  What we’ll need from you"));
[
  "The mutual NDA in place (provided separately).",
  "A requirements session with access to your Notion workspace, so we can map your methodology into the system.",
  "A first real case’s content to validate against.",
  "Timely feedback, and a single point of contact for decisions.",
].forEach(t=> children.push(bullet(t)));

// 9. Ownership
children.push(H1("9.  Ownership"));
children.push(P([
  b("Almanac belongs to you. "),
  T("The product we build — its code and design — becomes Calibri’s property once the fees are paid in full. Everything you bring to the project stays yours: your methodology, rules, Notion workspace and knowledge base, and all Calibri content and data remain your exclusive property, and nothing here gives Nile any ownership of them beyond using them to build Almanac for you. Nile keeps only its own pre-existing tools, libraries, and general know-how used to build the product; these contain nothing specific to Calibri or Almanac.")
]));

// 10. Confidentiality
children.push(H1("10.  Confidentiality"));
children.push(P("We treat everything you share as confidential and use it only to build Almanac. This is set out in full in the separate Mutual Non-Disclosure Agreement between us, which continues to apply."));

// 11. Your data
children.push(H1("11.  Your data"));
children.push(P("Client information within a case exists only for the transition it belongs to. When a case closes, identifiable client data is purged — the system keeps only the abstracted lessons that improve the methodology, never the underlying client records."));

// 12. Working together
children.push(H1("12.  Working together, changes, and ending the engagement"));
children.push(P("We’ll work in close, regular contact and keep you updated as we go. If we ever agree to add something genuinely new and beyond the scope above, we’ll capture it in a short written add-on (scope, cost, timeline) before starting — so there are never surprises. Either of us may end the engagement with reasonable written notice; if that happens, you pay for the work completed to that point and receive everything produced so far, and each of us returns the other’s confidential materials."));

// 13. General
children.push(H1("13.  A few general points"));
children.push(P("This Agreement, together with our Mutual NDA, is the whole understanding between us on this project. Any change to it will be in writing and signed by both sides. It is governed by the laws of [governing law], and may be signed in counterparts, including electronically. Each party’s liability under this Agreement is limited to the fees paid under it, and we’ll always act in good faith to put things right."));

// 14. Acceptance
children.push(H1("14.  Acceptance"));
children.push(P("If this reflects our understanding, we’re delighted to begin. Please sign below; a countersigned copy will be returned to you."));

const noB = { style: BorderStyle.NONE, size:0, color:"FFFFFF" };
const sigCell = (party, name, title) => new TableCell({
  borders:{ top:{style:BorderStyle.SINGLE,size:2,color:LINE}, bottom:noB, left:noB, right:noB },
  width:{size:4680, type:WidthType.DXA}, margins:{top:160,bottom:80,left:0,right:200},
  children:[
    new Paragraph({ spacing:{after:150}, children:[ b(party, {color:NAVY}) ] }),
    new Paragraph({ spacing:{after:150}, children:[ T("Signature:  ",{color:MUTED,size:20}), T("____________________________") ] }),
    new Paragraph({ spacing:{after:140}, children:[ T("Name:  ",{color:MUTED,size:20}), name?b(name):T("[Name]") ] }),
    new Paragraph({ spacing:{after:140}, children:[ T("Title:  ",{color:MUTED,size:20}), title?b(title):T("[Title]") ] }),
    new Paragraph({ children:[ T("Date:  ",{color:MUTED,size:20}), T("______________") ] }),
  ]
});
children.push(new Table({ width:{size:9360, type:WidthType.DXA}, columnWidths:[4680,4680],
  borders:{ top:noB, bottom:noB, left:noB, right:noB, insideHorizontal:noB, insideVertical:noB },
  rows:[ new TableRow({ children:[
    sigCell("For Nile Technologies Pvt. Ltd.", "Aaditya Kapoor", "Chief Operating Officer"),
    sigCell("For Calibri Consulting", "Melissa Hartman", null),
  ]}) ]
}));

const doc = new Document({
  styles: {
    default: { document: { run: { font:"Arial", size:22, color:INK } } },
    paragraphStyles: [
      { id:"Heading1", name:"Heading 1", basedOn:"Normal", next:"Normal", quickFormat:true,
        run:{ size:26, bold:true, font:"Arial", color:NAVY },
        paragraph:{ spacing:{before:280, after:120}, outlineLevel:0,
          border:{ bottom:{ style:BorderStyle.SINGLE, size:6, color:"E5E1D6", space:6 } } } },
    ]
  },
  numbering: { config: [
    { reference:"bullets", levels:[{ level:0, format:LevelFormat.BULLET, text:"•", alignment:AlignmentType.LEFT, style:{ paragraph:{ indent:{left:560, hanging:280} } } }] },
  ]},
  sections: [{
    properties:{ page:{ size:{ width:12240, height:15840 }, margin:{ top:1296, right:1440, bottom:1296, left:1440 } } },
    footers:{ default: new Footer({ children:[ new Paragraph({
      alignment:AlignmentType.CENTER, border:{ top:{ style:BorderStyle.SINGLE, size:4, color:"E5E1D6", space:6 } },
      children:[ new TextRun({ text:"Almanac — Engagement Agreement  ·  Nile Technologies Pvt. Ltd. & Calibri Consulting  ·  Confidential        Page ", size:16, color:MUTED }),
        new TextRun({ children:[PageNumber.CURRENT], size:16, color:MUTED }) ] }) ] }) },
    children
  }]
});

Packer.toBuffer(doc).then(buf=>{ fs.writeFileSync(OUT, buf); console.log("WROTE "+OUT); });
