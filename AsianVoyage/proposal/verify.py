import zipfile, re
from xml.etree import ElementTree as ET

NS = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
WNS = NS['w']
z = zipfile.ZipFile('Asian-Voyage-POS-Proposal.docx')
raw = z.read('word/document.xml')

# 1. well-formedness
root = ET.fromstring(raw)
print('XML parses cleanly:', True)
print('parts in package:', len(z.namelist()))

# 2. illegal control characters anywhere in the text
text_all = ''.join(t.text or '' for t in root.iter('{%s}t' % WNS))
illegal = sorted({hex(ord(c)) for c in text_all if ord(c) < 0x20 and c not in '\n\r\t'})
print('illegal control chars in text:', illegal or 'none')

body = root.find('w:body', NS)

def ptext(p):
    return ''.join(t.text or '' for t in p.iter('{%s}t' % WNS))

def pstyle(p):
    ps = p.find('w:pPr/w:pStyle', NS)
    return ps.get('{%s}val' % WNS) if ps is not None else ''

heads, bullets, paras, tables, breaks = [], 0, 0, [], 0
for el in body:
    tag = el.tag.split('}')[1]
    if tag == 'p':
        t = ptext(el).strip()
        if pstyle(el).startswith('Heading'):
            heads.append(t)
        elif el.find('w:pPr/w:numPr', NS) is not None:
            bullets += 1
        elif t:
            paras += 1
        if el.find('.//w:br[@w:type="page"]', NS) is not None:
            breaks += 1
    elif tag == 'tbl':
        rows = el.findall('w:tr', NS)
        grid = [int(c.get('{%s}w' % WNS)) for c in el.findall('w:tblGrid/w:gridCol', NS)]
        cells = rows[0].findall('w:tc', NS) if rows else []
        cw = []
        for c in cells:
            tw = c.find('w:tcPr/w:tcW', NS)
            cw.append(int(tw.get('{%s}w' % WNS)) if tw is not None else 0)
        tables.append({'rows': len(rows), 'cols': len(cells),
                       'grid_sum': sum(grid), 'cell_sum': sum(cw)})

print('\nheadings=%d  bullets=%d  paragraphs=%d  tables=%d  pagebreaks=%d'
      % (len(heads), bullets, paras, len(tables), breaks))

print('\n--- HEADINGS ---')
for h in heads:
    print('  ', h)

print('\n--- TABLE WIDTH INTEGRITY (grid must equal cell sum, target 9026) ---')
ok = True
for i, t in enumerate(tables, 1):
    good = t['grid_sum'] == t['cell_sum'] == 9026
    ok = ok and good
    print('  table %d: %dx%d  grid=%d  cells=%d  %s'
          % (i, t['rows'], t['cols'], t['grid_sum'], t['cell_sum'], 'OK' if good else 'MISMATCH'))
print('  all tables consistent:', ok)

print('\n--- COMMERCIAL FIGURES ---')
# Cell texts concatenate with no separator in the flat blob, so word-boundary
# checks are unreliable there. Read the payment table cell by cell instead.
pay = None
for el in body.iter('{%s}tbl' % WNS):
    rows = el.findall('w:tr', NS)
    grid = [''.join(t.text or '' for t in c.iter('{%s}t' % WNS)) for c in rows[0].findall('w:tc', NS)]
    if 'Milestone' in grid:
        pay = [[''.join(t.text or '' for t in c.iter('{%s}t' % WNS)) for c in r.findall('w:tc', NS)]
               for r in rows]
        break

if not pay:
    print('  PAYMENT TABLE NOT FOUND')
else:
    print('  payment schedule:')
    for r in pay:
        print('    ' + ' | '.join(x.ljust(34)[:34] for x in r))
    shares, amounts = [], []
    for r in pay[1:]:
        m = re.fullmatch(r'(\d+)%', r[2].strip())
        a = re.fullmatch(r'([\d,]+)', r[3].strip())
        if m and a and r[1].strip().lower() != 'total':
            shares.append(int(m.group(1)))
            amounts.append(int(a.group(1).replace(',', '')))
    print('  milestone shares :', shares, '-> sum', sum(shares))
    print('  milestone amounts:', amounts, '-> sum', sum(amounts))
    print('  shares total 100%:', sum(shares) == 100)
    print('  amounts total 7000:', sum(amounts) == 7000)
    print('  each share matches its amount:',
          all(round(7000 * s / 100) == a for s, a in zip(shares, amounts)))

print('  "USD 7,000" appears:', len(re.findall(r'USD 7,000', text_all)), 'time(s)')

print('\n--- REQUIRED SCOPE COVERAGE ---')
required = ['KOT', 'Waiter Interface', 'Admin Interface', 'Takeaway', 'Counter orders',
            'Report generation', 'service charge', 'ABST', 'Out of Scope', 'Acceptance',
            'Floor', 'Bill', 'settle', 'Deposit', 'Design completion', 'Go live']
missing = [k for k in required if k.lower() not in text_all.lower()]
for k in required:
    print('  %-20s %s' % (k, 'YES' if k.lower() in text_all.lower() else 'MISSING'))
print('\n  missing:', missing or 'none')

print('\n--- PLACEHOLDERS TO FILL BEFORE SENDING ---')
for m in sorted(set(re.findall(r'\[[^\]]+\]', text_all))):
    print('  ', m)
