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

