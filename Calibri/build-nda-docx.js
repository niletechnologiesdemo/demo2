const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  PageNumber, VerticalAlign
} = require('docx');

const NAVY = "1A2238";
const MUTED = "6B7280";
const OUT = path.join(__dirname, 'Mutual-NDA-Nile-Calibri.docx');

const T = (text, o={}) => new TextRun({ text, ...o });
const b = (text, o={}) => new TextRun({ text, bold:true, ...o });
// justified body paragraph
const P = (runs, o={}) => new Paragraph({ alignment:AlignmentType.JUSTIFIED, spacing:{after:140, line:276}, children: Array.isArray(runs)?runs:[T(runs)], ...o });
// numbered section heading
const SH = (n, title) => new Paragraph({ spacing:{before:200, after:80}, keepNext:true,
  children:[ b(`${n}.  `, {color:NAVY}), b(title, {color:NAVY}) ] });

const children = [];

// Title
children.push(new Paragraph({ alignment:AlignmentType.CENTER, spacing:{after:60},
  children:[ b("MUTUAL NON-DISCLOSURE AGREEMENT", {size:28, color:NAVY}) ] }));
children.push(new Paragraph({ alignment:AlignmentType.CENTER, spacing:{after:180},
  border:{ bottom:{ style:BorderStyle.SINGLE, size:6, color:"C2A14D", space:8 } }, children:[] }));

// Preamble
children.push(P([
  T("This Mutual Non-Disclosure Agreement (the "), b("“Agreement”"),
  T(") is entered into as of "), b("[Effective Date]"), T(" (the "), b("“Effective Date”"), T(") by and between:")
]));
children.push(P([
  b("Nile Tech Innovations LLP"), T(", a limited liability partnership organized under the laws of "),
  b("[Jurisdiction]"), T(", with its registered office at "), b("[Address]"), T(" ("), b("“Nile”"), T("); and")
]));
children.push(P([
  b("Calibri Consulting"), T(", "), b("[entity type]"), T(", with its principal place of business at "),
  b("[Address]"), T(" ("), b("“Calibri”"), T(").")
]));
children.push(P([
  T("Nile and Calibri are each a "), b("“Party”"), T(" and together the "), b("“Parties.”"),
  T(" Each Party may act as a discloser ("), b("“Disclosing Party”"), T(") and/or recipient ("),
  b("“Receiving Party”"), T(") of Confidential Information under this Agreement.")
]));

children.push(SH(1,"Purpose"));
children.push(P([
  T("The Parties wish to explore and potentially undertake a business relationship concerning the scoping, design, and development of a software system (the "),
  b("“Almanac project”"), T(") and related services (the "), b("“Purpose”"),
  T("). In connection with the Purpose, each Party may disclose certain confidential and proprietary information to the other.")
]));

children.push(SH(2,"Confidential Information"));
children.push(P([
  b("“Confidential Information”"), T(" means any non-public information disclosed by or on behalf of the Disclosing Party to the Receiving Party, whether orally, in writing, electronically, visually (including by demonstration or screen-share), or in any other form, that is designated as confidential or that a reasonable person would understand to be confidential given its nature or the circumstances of disclosure. It includes, without limitation: business methodologies, frameworks, rules, logic, processes and “know-how”; product concepts, designs, and roadmaps; software, source code, data models, and system architecture; the structure and contents of any Notion workspace, database, or knowledge base; client and prospect information; pricing, financial, and commercial information; and the existence and contents of the Parties’ discussions.")
]));

children.push(SH(3,"Exclusions"));
children.push(P([
  T("Confidential Information does not include information that the Receiving Party can demonstrate by competent evidence: (a) was lawfully in its possession without obligation of confidentiality before disclosure; (b) is or becomes publicly available through no breach of this Agreement by the Receiving Party; (c) is lawfully received from a third party without restriction and without breach of any obligation; or (d) is independently developed by the Receiving Party without use of or reference to the Disclosing Party’s Confidential Information.")
]));

children.push(SH(4,"Obligations of the Receiving Party"));
children.push(P([
  T("The Receiving Party shall: (a) use the Confidential Information solely for the Purpose; (b) hold the Confidential Information in strict confidence and not disclose it to any third party except as permitted herein; (c) protect it using at least the same degree of care it uses for its own confidential information, and in no event less than a reasonable degree of care; and (d) not copy, reproduce, or reverse-engineer the Confidential Information except as reasonably necessary for the Purpose.")
]));

children.push(SH(5,"Permitted Disclosures"));
children.push(P([
  T("The Receiving Party may disclose Confidential Information to its partners, employees, contractors, and professional advisors ("),
  b("“Representatives”"), T(") who have a need to know it for the Purpose, provided each such Representative is bound by confidentiality obligations no less protective than those in this Agreement. The Receiving Party is responsible for any breach by its Representatives. The Receiving Party may also disclose Confidential Information to the extent required by law, regulation, or court order, provided that (where legally permitted) it gives the Disclosing Party prompt prior notice and reasonable cooperation to seek protective treatment.")
]));

children.push(SH(6,"Ownership; No License; Pre-Existing IP"));
children.push(P([
  T("All Confidential Information remains the sole and exclusive property of the Disclosing Party. "),
  b("Nothing in this Agreement transfers or grants any right, title, license, or interest"),
  T(" in or to either Party’s Confidential Information or intellectual property, except the limited right to use it for the Purpose. For clarity and without limitation, all methodologies, frameworks, rules, logic, content, and materials authored or owned by Calibri prior to or independently of the Purpose (including its Notion workspace and knowledge base) remain the exclusive property of Calibri, and Calibri’s disclosure of them under this Agreement grants Nile no ownership or license beyond what is necessary to perform the Purpose. Any rights in deliverables created under a separate services agreement shall be governed by that agreement.")
]));

children.push(SH(7,"No Obligation; No Warranty"));
children.push(P([
  T("This Agreement does not obligate either Party to proceed with any transaction or relationship, and either Party may terminate discussions at any time. All Confidential Information is provided "),
  b("“as is,”"), T(" without warranty of any kind, express or implied.")
]));

children.push(SH(8,"Term and Survival"));
children.push(P([
  T("This Agreement commences on the Effective Date and continues for "), b("[two (2) years]"),
  T(", unless earlier terminated by either Party on "), b("[thirty (30) days’]"),
  T(" written notice. The confidentiality obligations herein survive termination and continue for "),
  b("[three (3) years]"),
  T(" from the date of disclosure, except that Confidential Information constituting a trade secret shall remain protected for as long as it qualifies as a trade secret under applicable law.")
]));

children.push(SH(9,"Return or Destruction"));
children.push(P([
  T("Upon the Disclosing Party’s written request or upon termination, the Receiving Party shall promptly return or destroy (and, on request, certify destruction of) all Confidential Information in its possession or control, except that it may retain one archival copy solely for legal-compliance purposes and copies in routine electronic backups, which remain subject to this Agreement.")
]));

children.push(SH(10,"Remedies"));
children.push(P([
  T("The Parties agree that a breach of this Agreement may cause irreparable harm for which monetary damages would be inadequate, and that the Disclosing Party shall be entitled to seek injunctive or equitable relief in addition to any other remedies available at law, without the need to post bond where permitted.")
]));

children.push(SH(11,"Governing Law and Disputes"));
children.push(P([
  T("This Agreement shall be governed by and construed in accordance with the laws of "),
  b("[State/Country]"),
  T(", without regard to its conflict-of-laws principles. The Parties submit to the exclusive jurisdiction of the courts located in "),
  b("[Jurisdiction]"), T(" for any dispute arising out of or relating to this Agreement.")
]));

children.push(SH(12,"Miscellaneous"));
children.push(P([
  b("(a) Entire Agreement. "), T("This Agreement is the entire understanding between the Parties regarding its subject matter and supersedes all prior discussions. "),
  b("(b) Amendment. "), T("Any amendment must be in writing and signed by both Parties. "),
  b("(c) No Waiver. "), T("Failure to enforce any provision is not a waiver. "),
  b("(d) Assignment. "), T("Neither Party may assign this Agreement without the other’s prior written consent, except to a successor in connection with a merger or sale of substantially all assets. "),
  b("(e) Severability. "), T("If any provision is held unenforceable, the remainder stays in effect. "),
  b("(f) Counterparts. "), T("This Agreement may be executed in counterparts, including by electronic signature, each of which is deemed an original.")
]));

children.push(new Paragraph({ spacing:{before:200, after:160}, children:[
  b("IN WITNESS WHEREOF", {color:NAVY}), T(", the Parties have executed this Agreement as of the Effective Date.")
]}));

// Signature table
const border = { style: BorderStyle.SINGLE, size: 2, color: "D9D3C5" };
const noBorder = { style: BorderStyle.NONE, size:0, color:"FFFFFF" };
const sigLine = (label, val) => new Paragraph({ spacing:{after:160}, children:[ T(label+"  ", {color:MUTED, size:20}), val?b(val):T("_______________________________") ] });
const sigCell = (party, name, title) => new TableCell({
  borders:{ top:border, bottom:noBorder, left:noBorder, right:noBorder },
  width:{size:4680, type:WidthType.DXA}, margins:{top:160,bottom:80,left:0,right:200},
  children:[
    new Paragraph({ spacing:{after:160}, children:[ b(party, {color:NAVY}) ] }),
    sigLine("Signature:"),
    new Paragraph({ spacing:{after:140}, children:[ T("Name:  ",{color:MUTED,size:20}), name?b(name):T("[Name]") ] }),
    new Paragraph({ spacing:{after:140}, children:[ T("Title:  ",{color:MUTED,size:20}), title?b(title):T("[Title]") ] }),
    new Paragraph({ children:[ T("Date:  ",{color:MUTED,size:20}), T("_____________________") ] }),
  ]
});
children.push(new Table({
  width:{size:9360, type:WidthType.DXA}, columnWidths:[4680,4680],
  borders:{ top:noBorder, bottom:noBorder, left:noBorder, right:noBorder, insideHorizontal:noBorder, insideVertical:noBorder },
  rows:[ new TableRow({ children:[
    sigCell("Nile Tech Innovations LLP", null, "[Designated Partner]"),
    sigCell("Calibri Consulting", "Melissa Hartman", null),
  ]}) ]
}));

const doc = new Document({
  styles: { default: { document: { run: { font:"Georgia", size:21, color:"23262F" } } } },
  sections: [{
    properties:{ page:{ size:{ width:12240, height:15840 }, margin:{ top:1440, right:1440, bottom:1296, left:1440 } } },
    footers:{ default: new Footer({ children:[ new Paragraph({
      alignment:AlignmentType.CENTER,
      children:[ T("Mutual Non-Disclosure Agreement  ·  Nile Tech Innovations LLP & Calibri Consulting  ·  Confidential  ·  Page ", {size:15, color:MUTED}),
        new TextRun({ children:[PageNumber.CURRENT], size:15, color:MUTED }) ] }) ] }) },
    children
  }]
});

Packer.toBuffer(doc).then(buf=>{ fs.writeFileSync(OUT, buf); console.log("WROTE "+OUT); });
