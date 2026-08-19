import re

p = 'build.js'
s = open(p, encoding='utf-8').read()

BAD_JS = '[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F]'

new_helper = (
    "/* XML 1.0 forbids most control characters. Strip them at the boundary so a\n"
    "   stray vertical tab pasted into a string can never produce a corrupt file. */\n"
    "const clean = s => String(s == null ? '' : s)\n"
    "  .replace(/" + BAD_JS + "/g, '')\n"
    "  .replace(/\\u00A0/g, ' ');\n"
)

# Replace whatever version of the helper currently exists.
# lambda replacement: a plain string would have backslash escapes reinterpreted
s = re.sub(r"/\* XML 1\.0 forbids.*?\n\n", lambda m: new_helper + "\n", s, count=1, flags=re.S)

# Route every user-visible string through clean().
subs = [
    ("text, bold: o.bold, italics: o.italics, size: o.size ?? 21,",
     "text: clean(text), bold: o.bold, italics: o.italics, size: o.size ?? 21,"),
    ("new TextRun({ text: t, bold: true, size: 30, color: CLAY, font: 'Calibri' })",
     "new TextRun({ text: clean(t), bold: true, size: 30, color: CLAY, font: 'Calibri' })"),
    ("new TextRun({ text: t, bold: true, size: 23, color: INK, font: 'Calibri' })",
     "new TextRun({ text: clean(t), bold: true, size: 23, color: INK, font: 'Calibri' })"),
    ("new TextRun({ text, size: 21, color: INK, font: 'Calibri' })",
     "new TextRun({ text: clean(text), size: 21, color: INK, font: 'Calibri' })"),
    ("      text, bold: o.bold, size: o.size ?? 20,",
     "      text: clean(text), bold: o.bold, size: o.size ?? 20,"),
]
for a, b in subs:
    if a not in s and b not in s:
        print('WARN: pattern not found ->', a[:60])
    if a in s:
        s = s.replace(a, b)

# Scrub control characters and NBSP already sitting in the source strings.
control_class = '[' + ''.join(chr(c) for c in list(range(0, 9)) + [11, 12] + list(range(14, 32))) + ']'
s = re.sub(control_class, '', s)
s = s.replace(chr(0xA0), ' ')

open(p, 'w', encoding='utf-8').write(s)

bad = sorted({hex(ord(c)) for c in s if (ord(c) < 0x20 and c not in '\n\r\t') or ord(c) == 0xA0})
print('remaining suspect chars in source:', bad or 'none')
print('clean() call sites:', s.count('clean('))
