const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
  Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
  WidthType, ShadingType, VerticalAlign, PageNumber
} = require('docx');

const NAVY="16284D", NAVY2="1E3A5F", GOLD="9A7B23", GOLDFILL="F3ECD8", NAVYFILL="EAF0FA",
      INK="23262F", MUTED="6B7280", LINE="D9D3C5";
const DIR=__dirname, OUT=path.join(DIR,'Almanac-Proposal-and-Agreement.docx');

const H1=(t)=>new Paragraph({heading:HeadingLevel.HEADING_1, children:[new TextRun(t)]});
const P=(runs,o={})=>new Paragraph({spacing:{after:130,line:278}, children:Array.isArray(runs)?runs:[new TextRun(runs)], ...o});
const T=(text,o={})=>new TextRun({text,...o});
const b=(text,o={})=>new TextRun({text,bold:true,...o});
const bullet=(runs)=>new Paragraph({numbering:{reference:"bullets",level:0}, spacing:{after:80,line:272}, children:Array.isArray(runs)?runs:[new TextRun(runs)]});
const numItem=(ref,runs)=>new Paragraph({numbering:{reference:ref,level:0}, spacing:{after:80,line:272}, children:Array.isArray(runs)?runs:[new TextRun(runs)]});

const border={style:BorderStyle.SINGLE,size:2,color:LINE};
const borders={top:border,bottom:border,left:border,right:border};
const cm={top:90,bottom:90,left:130,right:130};
const headerCell=(text,w)=>new TableCell({borders,width:{size:w,type:WidthType.DXA},margins:cm,shading:{fill:NAVY,type:ShadingType.CLEAR},verticalAlign:VerticalAlign.CENTER,children:[new Paragraph({children:[new TextRun({text,bold:true,color:"FFFFFF",size:20})]})]});
function cell(children,w,opts={}){
  if(typeof children==='string') children=[new Paragraph({children:[new TextRun({text:children,size:20})]})];
  else if(!Array.isArray(children)) children=[children];
  return new TableCell({borders,width:{size:w,type:WidthType.DXA},margins:cm,verticalAlign:VerticalAlign.CENTER,shading:opts.fill?{fill:opts.fill,type:ShadingType.CLEAR}:undefined,children});
}

const children=[];

// Logo
try{ const logo=fs.readFileSync(path.join(DIR,'logo.png'));
  children.push(new Paragraph({spacing:{after:120}, children:[new ImageRun({type:"png",data:logo,transformation:{width:188,height:81},altText:{title:"Calibri Consulting",description:"logo",name:"logo"}})]}));
}catch(e){}

children.push(new Paragraph({border:{bottom:{style:BorderStyle.SINGLE,size:12,color:GOLD,space:6}}, spacing:{before:60,after:8},
  children:[new TextRun({text:"Almanac",font:"Georgia",size:52,bold:true,color:NAVY})]}));
children.push(new Paragraph({spacing:{after:200}, children:[new TextRun({text:"Proposal & Engagement Agreement — Practice Transition & Handover Tool",size:23,color:GOLD,bold:true})]}));

children.push(new Table({width:{size:9360,type:WidthType.DXA},columnWidths:[1900,7460],rows:[
  new TableRow({children:[cell([new Paragraph({children:[b("Prepared for",{size:20})]})],1900,{fill:NAVYFILL}),cell("Calibri Consulting · Melissa Hartman",7460)]}),
  new TableRow({children:[cell([new Paragraph({children:[b("Prepared by",{size:20})]})],1900,{fill:NAVYFILL}),cell("Nile Technologies Pvt. Ltd.",7460)]}),
  new TableRow({children:[cell([new Paragraph({children:[b("Re",{size:20})]})],1900,{fill:NAVYFILL}),cell("Almanac — turning Calibri's transition methodology into a product",7460)]}),
  new TableRow({children:[cell([new Paragraph({children:[b("Status",{size:20})]})],1900,{fill:NAVYFILL}),cell("Proposal & engagement agreement — for review and signature",7460)]}),
]}));
children.push(P("",{spacing:{after:120}}));

// 1. Executive summary  (pricing options removed)
children.push(H1("1.  Executive summary"));
children.push(P([
  T("Calibri's value in a practice transition is its method for moving what lives inside a departing advisor's head — not just "),
  T("what",{italics:true}),T(" they do, but "),T("how",{italics:true}),T(" and "),T("why",{italics:true}),
  T(" — onto the acquiring firm so that clients, relationships, and judgment survive the handover. Today that method lives in Melissa's head and in a personal Notion + Claude setup. "),
  b("Almanac turns it into a proper, repeatable product"),T(" the Calibri team can run on every engagement.")
]));
children.push(P([
  T("We have already designed and built a "),b("clickable, high-fidelity prototype"),
  T(" of the full product. This document sets out the complete Almanac system, what it costs, and how we will work together. Once signed, it also serves as our engagement agreement.")
]));

// 2. App concept
children.push(H1("2.  App concept"));
children.push(P([b("Almanac is a case-based workspace."),T(" One case = one transition (one seller practice handing over to one buyer practice). Each case moves through a clear path:")]));
children.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:60,after:120},children:[new TextRun({text:"Onboard the Seller  →  Onboard the Buyer  →  Map the handover  →  Close",bold:true,color:NAVY,size:22})]}));
children.push(P([
  T("For each practice the team builds a living record across four steps — a free-form "),b("practice almanac"),T(", the "),b("roles / who's who"),T(", "),b("KPI capture"),
  T(" (the what/how/why of each role), and an "),b("org map"),T(". Once both sides are captured, the team "),b("maps"),
  T(" each seller responsibility onto a buyer owner — carrying across the reasoning, not just the task list — and the system surfaces every "),b("gap"),T(" and "),b("open item"),
  T(" that has no home in the buyer practice. When the handover is complete, the case is "),b("closed"),T(" and client data is purged.")
]));
children.push(P([T("The guiding principle, in Calibri's own words: "),T("the judgment that ran the practice survives the transition.",{italics:true})]));

// 3. Scope of work  (option tags removed)
children.push(H1("3.  Scope of work"));
children.push(P("The scope below is exactly what the prototype demonstrates, and is delivered in full under this engagement."));
children.push(P([b("Core platform")],{spacing:{after:60}}));
[
  ["Sign-in & team","log in as a Calibri team member; per-user identity on cases."],
  ["Dashboard & case management","active and closed cases, status, progress, “Start a new case.”"],
  ["Practice Almanac (questionnaire)","a flowing, document-style file per practice — pre-set prompts plus your own titled sections, reorderable; a Compile (edit) view and a View-as-file dossier. The file that starts the case and feeds everything downstream."],
  ["Roles & who's who","each person, title, and the responsibilities they own."],
  ["KPI capture","per responsibility, record the What / How / Why; scannable at a glance, click to expand."],
  ["Org map","the captured structure of each practice, with completeness per role."],
  ["Mapping (responsibility-level)","assign each seller responsibility to a buyer owner; coverage derived (Full / Partial / Gap); a Summary table of the whole mapping and every open item, plus a Detailed reassignment view."],
  ["Close & handover","generate the handover package; explicit “kept vs. purged” view; close the case and purge client data."],
  ["Export","almanac file and handover summary as exportable documents."],
].forEach(([a,c])=>children.push(bullet([b(a+" — "),T(c)])));
children.push(P([b("AI copilot & knowledge base")],{spacing:{before:80,after:60}}));
[
  ["AI Copilot","a full-page chat assistant with a context selector (whole case, or any individual). It suggests interview questions, pushes for the why between the lines, and flags contradictions across roles. Powered by Calibri's methodology exported from Notion."],
  ["Methodology base","the imported core knowledge (interview method, question banks, contradiction patterns), shown and re-syncable."],
].forEach(([a,c])=>children.push(bullet([b(a+" — "),T(c)])));
children.push(P([b("Adaptive layer")],{spacing:{before:80,after:60}}));
children.push(bullet([b("Learning loop — "),T("after a case closes, abstracted lessons (better questions, new contradiction patterns, risk heuristics) are retained and grow the methodology for future cases — while client data is purged.")]));

// 4. Logic & data flow
children.push(H1("4.  Logic & data flow"));
children.push(P("End-to-end, a case flows like this:"));
[
  "Create case — name it, set the seller and buyer practices, assign a lead.",
  "Seller almanac — the team writes the practice file. This seeds the per-case knowledge base.",
  "Seller roles — who's who and what they own.",
  "Seller KPI capture — the human intelligence: what / how / why per responsibility.",
  "AI Copilot reads the per-case context (almanac + roles + KPIs) on top of Calibri's core methodology, and returns: the next questions to ask, prompts for missing why, and contradictions across roles.",
  "Buyer — the same four steps for the acquiring practice.",
  "Mapping — each seller responsibility is assigned to a buyer owner. The captured why travels with it. Anything unassigned is surfaced as an open item / gap.",
  "Close — a handover package is produced for the buyer. The case closes; client-identifying data is purged.",
  "Learn — abstracted lessons are folded back into the methodology base for the next case.",
].forEach(t=>children.push(numItem("flow",t)));

// 5. Information layering
children.push(H1("5.  Information layering"));
children.push(P("Almanac's intelligence is deliberately built in layers:"));
children.push(bullet([b("Layer 1 — Core knowledge (every case). "),T("Calibri's methodology and contradiction patterns, exported from Notion into the product's knowledge base. Durable, reusable, authored content — not a model to re-train. Makes the copilot smart.")]));
children.push(bullet([b("Layer 2 — Per-case context (this case only). "),T("The almanac, roles, and KPIs for one engagement. Makes the copilot relevant to this specific seller and buyer. At query time the copilot combines Layer 1 + Layer 2.")]));
children.push(bullet([b("Layer 3 — Adaptive lessons. "),T("On close, the system keeps the lessons and purges the client data. The methodology grows; no client information is retained.")]));
children.push(P([T("The principle stated plainly: "),b("the system gets smarter over time, but client data does not persist"),T(" — reconciled by abstracting lessons away from the data that produced them.")]));

// 6. Tech stack
children.push(H1("6.  Tech stack"));
children.push(P("Chosen for a fast, secure, low-maintenance internal tool that can later grow into SaaS without re-platforming."));
const tsRow=(a,c,d)=>new TableRow({children:[cell([new Paragraph({children:[b(a,{size:20})]})],1900,{fill:NAVYFILL}),cell(c,3400),cell(d,4060)]});
children.push(new Table({width:{size:9360,type:WidthType.DXA},columnWidths:[1900,3400,4060],rows:[
  new TableRow({tableHeader:true,children:[headerCell("Layer",1900),headerCell("Technology",3400),headerCell("Why",4060)]}),
  tsRow("Front end","React + TypeScript, Tailwind CSS","Componentises the design already built; maintainable and fast."),
  tsRow("Back end / API","Node.js (serverless functions)","Lightweight; scales to zero for an internal tool."),
  tsRow("Database","PostgreSQL (Supabase) + row-level security","Relational fit for cases/roles/KPIs/mapping; per-case data isolation."),
  tsRow("Auth","Managed auth (Supabase / Clerk)","Secure team sign-in without building it from scratch."),
  tsRow("AI","Claude API — Claude Sonnet 4.6 (workhorse), Claude Opus 4.8 (hardest reasoning)","Best fit for interview guidance, why-probing, and contradiction detection. Matches Melissa's existing Claude workflow."),
  tsRow("Knowledge base","Notion export → embeddings + vector search (pgvector)","The methodology becomes queryable context for the copilot."),
  tsRow("Hosting","Vercel (front end) + Supabase (data/auth/vector)","Simple, secure, inexpensive to run."),
  tsRow("Security","Per-case isolation, encrypted at rest, hard purge on close","“Your data never moves” — honoured as a real constraint."),
]}));
children.push(P([b("Note on AI running costs: "),T("the Claude API is billed per use and is separate from the build price. For internal, self-use volumes it is modest (estimated tens of dollars per month at typical case loads). We confirm a precise estimate once the Notion foundation is sized.")],{spacing:{before:80}}));

// 7. Investment (single price, page break)
children.push(new Paragraph({pageBreakBefore:true,heading:HeadingLevel.HEADING_1,children:[new TextRun("7.  Investment")]}));
children.push(P([
  T("The complete Almanac system described above is delivered for a fixed engagement fee of "),
  b("USD $23,000",{color:NAVY}),
  T(". This is all-inclusive — design, development, deployment, and handover — and covers everything in the scope above, including ingesting and using your Notion foundation.")
]));
children.push(P([b("Indicative timeline: "),T("approximately 8–10 weeks from kickoff. Kickoff begins once the NDA is in place and we've completed the requirements session on your Notion foundation.")]));

// 8. Payment terms 30:30:30:10
children.push(H1("8.  Payment terms"));
children.push(P("Payments are milestone-based, in the ratio 30 : 30 : 30 : 10:"));
children.push(new Table({width:{size:9360,type:WidthType.DXA},columnWidths:[5560,1400,2400],rows:[
  new TableRow({tableHeader:true,children:[headerCell("Milestone",5560),headerCell("%",1400),headerCell("Amount (USD)",2400)]}),
  new TableRow({children:[cell("Deposit — on signing, to begin",5560),cell("30%",1400),cell([new Paragraph({children:[b("$6,900",{size:20})]})],2400,{fill:GOLDFILL})]}),
  new TableRow({children:[cell("Design completion & submission",5560),cell("30%",1400),cell([new Paragraph({children:[b("$6,900",{size:20})]})],2400,{fill:GOLDFILL})]}),
  new TableRow({children:[cell("Development completion & UAT submission for approval",5560),cell("30%",1400),cell([new Paragraph({children:[b("$6,900",{size:20})]})],2400,{fill:GOLDFILL})]}),
  new TableRow({children:[cell("Go-live",5560),cell("10%",1400),cell([new Paragraph({children:[b("$2,300",{size:20})]})],2400,{fill:GOLDFILL})]}),
  new TableRow({children:[cell([new Paragraph({children:[b("Total",{size:20})]})],5560,{fill:NAVY,}),cell([new Paragraph({children:[b("100%",{size:20,color:"FFFFFF"})]})],1400,{fill:NAVY}),cell([new Paragraph({children:[b("$23,000",{size:20,color:"FFFFFF"})]})],2400,{fill:NAVY})]}),
]}));
children.push(P([T("Third-party running costs — hosting and Claude AI usage — are billed separately at cost and are modest for internal use.")],{spacing:{before:80}}));

// 9. The Nile Promise
children.push(H1("9.  The Nile Promise"));
children.push(P([
  T("We know a build like this evolves as we learn the detail of your system. So we make you a simple promise: the refinements, adjustments, and natural back-and-forth of getting Almanac right — "),
  b("within the scope described above"),
  T(" — will not cost you anything extra. The fee is the fee. If, together, we ever decide to add something genuinely new and beyond this scope, we'll simply agree it in a short written add-on before starting — never a surprise. This is our written assurance to you.")
]));

// 10. What we need from Calibri
children.push(H1("10.  What we need from Calibri"));
[
  "A requirements session with access to your Notion workspace, so we can map your methodology into the system. (Confirmed: Melissa is comfortable making this available under NDA.)",
  "Sign-off on the mapping model (responsibility-level, as built in the prototype).",
  "A first real case's content to validate against, and timely feedback with a single point of contact for decisions.",
].forEach(t=>children.push(numItem("need",t)));

// 11. Assumptions
children.push(H1("11.  Assumptions"));
[
  "The tool is for Calibri's internal / self-use. SaaS is out of scope for now and can be revisited later without re-platforming.",
  "A practice (never an individual) is on each side of a case.",
  "A case closes after handover; live client data does not persist beyond the engagement.",
  "The engagement fee is fixed; third-party running costs (hosting, AI API) are billed at cost and are modest for internal use.",
].forEach(t=>children.push(bullet(t)));

// 12. Terms & Conditions (page break)
children.push(new Paragraph({pageBreakBefore:true,heading:HeadingLevel.HEADING_1,children:[new TextRun("12.  Terms & Conditions")]}));
const tc=(n,title,body)=>{ children.push(new Paragraph({spacing:{before:120,after:40},children:[b(`${n}.  ${title}. `,{color:NAVY2}),T(body)]})); };
tc(1,"Scope & changes","Nile will deliver the scope of work set out in this document. Work beyond that scope will be agreed in writing (scope, cost, timeline) before it begins.");
tc(2,"Fees, payment & taxes","Fees are as set out in the Investment and Payment Terms sections, in USD, and are payable within fifteen (15) days of each milestone invoice. Applicable taxes, bank charges, and third-party running costs (hosting, AI usage) are additional and billed at cost.");
tc(3,"Timeline & dependencies","Timelines are good-faith estimates and assume timely feedback, approvals, access, and materials from Calibri (including the Notion requirements session). Delays in these may shift delivery dates accordingly.");
tc(4,"Client responsibilities","Calibri will provide a single point of contact for decisions, timely feedback and approvals at each stage, and the access and materials reasonably needed for the work.");
tc(5,"Intellectual property","On receipt of full payment, all rights in the delivered Almanac product (its code and design) belong to Calibri. Calibri's pre-existing materials — its methodology, rules, Notion workspace and knowledge base, and all Calibri content and data — remain Calibri's exclusive property. Nile retains its own pre-existing tools, libraries, and general know-how used to build the product, which contain nothing specific to Calibri or Almanac.");
tc(6,"Confidentiality","Each party keeps the other's confidential information in confidence and uses it only for this engagement, as set out in the separate Mutual Non-Disclosure Agreement between the parties, which continues to apply.");
tc(7,"Warranty & support","Nile will perform the work in a professional and workmanlike manner. For thirty (30) days after go-live, Nile will correct, at no charge, any defects in the delivered scope that Calibri reports. Ongoing support and maintenance can be arranged under a separate agreement.");
tc(8,"Liability","Neither party is liable for indirect or consequential losses. Each party's total liability under this engagement is limited to the fees paid under it. Both parties will act in good faith to put things right.");
tc(9,"Independent contractor","Nile acts as an independent contractor; nothing here creates a partnership, employment, or agency relationship.");
tc(10,"Termination","Either party may end the engagement on fifteen (15) days' written notice. On termination, Calibri pays for work completed to that date and receives the work produced so far; each party returns or destroys the other's confidential materials.");
tc(11,"General","This document, together with the Mutual NDA, is the entire agreement between the parties on this project and supersedes prior discussions. Any change must be in writing and signed by both parties. It is governed by the laws of [governing law]. It may be signed in counterparts, including electronically. The parties will first seek to resolve any dispute amicably.");

// 13. Next steps
children.push(H1("13.  Next steps"));
children.push(P("To proceed, please sign below and return a copy. We'll put the mutual NDA in place (if not already), book the requirements session on your Notion foundation, and confirm firm dates at kickoff. We're genuinely excited to begin."));

// 14. Acceptance
children.push(H1("14.  Acceptance & signatures"));
children.push(P("Agreed and accepted on the terms set out in this Proposal & Engagement Agreement:"));
const noB={style:BorderStyle.NONE,size:0,color:"FFFFFF"};
const sigCell=(party,name,title)=>new TableCell({borders:{top:{style:BorderStyle.SINGLE,size:2,color:LINE},bottom:noB,left:noB,right:noB},width:{size:4680,type:WidthType.DXA},margins:{top:170,bottom:80,left:0,right:200},children:[
  new Paragraph({spacing:{after:150},children:[b(party,{color:NAVY})]}),
  new Paragraph({spacing:{after:150},children:[T("Signature:  ",{color:MUTED,size:20}),T("____________________________")]}),
  new Paragraph({spacing:{after:140},children:[T("Name:  ",{color:MUTED,size:20}),name?b(name):T("[Name]")]}),
  new Paragraph({spacing:{after:140},children:[T("Title:  ",{color:MUTED,size:20}),title?b(title):T("[Title]")]}),
  new Paragraph({children:[T("Date:  ",{color:MUTED,size:20}),T("______________")]}),
]});
children.push(new Table({width:{size:9360,type:WidthType.DXA},columnWidths:[4680,4680],
  borders:{top:noB,bottom:noB,left:noB,right:noB,insideHorizontal:noB,insideVertical:noB},
  rows:[new TableRow({children:[
    sigCell("For Nile Technologies Pvt. Ltd.","Aaditya Kapoor","Chief Operating Officer"),
    sigCell("For Calibri Consulting","Melissa Hartman",null),
  ]})]
}));

const doc=new Document({
  styles:{ default:{document:{run:{font:"Arial",size:22,color:INK}}},
    paragraphStyles:[
      {id:"Heading1",name:"Heading 1",basedOn:"Normal",next:"Normal",quickFormat:true,
        run:{size:30,bold:true,font:"Arial",color:NAVY},
        paragraph:{spacing:{before:300,after:140},outlineLevel:0,border:{bottom:{style:BorderStyle.SINGLE,size:6,color:"E5E1D6",space:6}}}},
    ]},
  numbering:{config:[
    {reference:"bullets",levels:[{level:0,format:LevelFormat.BULLET,text:"•",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:560,hanging:280}}}}]},
    {reference:"flow",levels:[{level:0,format:LevelFormat.DECIMAL,text:"%1.",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:560,hanging:300}}}}]},
    {reference:"need",levels:[{level:0,format:LevelFormat.DECIMAL,text:"%1.",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:560,hanging:300}}}}]},
  ]},
  sections:[{
    properties:{page:{size:{width:12240,height:15840},margin:{top:1296,right:1440,bottom:1296,left:1440}}},
    footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,border:{top:{style:BorderStyle.SINGLE,size:4,color:"E5E1D6",space:6}},
      children:[new TextRun({text:"Almanac — Proposal & Engagement Agreement  ·  Nile Technologies Pvt. Ltd. & Calibri Consulting  ·  Confidential        Page ",size:16,color:MUTED}),
        new TextRun({children:[PageNumber.CURRENT],size:16,color:MUTED})]})]})},
    children
  }]
});

Packer.toBuffer(doc).then(buf=>{fs.writeFileSync(OUT,buf); console.log("WROTE "+OUT);});
