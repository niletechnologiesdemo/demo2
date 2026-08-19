/* =============================================================================
   Academy of Medical Science — Proposal and Scope of Work
   Sections: Concept Note · App Advantage · Scope of Work · Commercials ·
             Payment Terms · The Nile Promise
   ========================================================================== */
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, ImageRun
} = require('docx');

/* ------------------------------------------------------------- palette */
const W      = 9026;
const BLUE   = '004AAD';   // academy logo blue
const NAVY   = '062A57';
const ACCENT = '1F6FD0';
const INK    = '0B1B33';
const MUTED  = '55657C';
const LINE   = 'D7E2F1';
const WASH   = 'EAF1FC';
const TEAL   = '0E7C72';

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

const H1  = t => new Paragraph({
  heading: HeadingLevel.HEADING_1, spacing: { before: 340, after: 150 },
  children: [T(t, { bold: true, size: 29, color: BLUE })]
});
const H1B = t => new Paragraph({
  heading: HeadingLevel.HEADING_1, pageBreakBefore: true, spacing: { after: 150 },
  children: [T(t, { bold: true, size: 29, color: BLUE })]
});
const H2  = t => new Paragraph({
  heading: HeadingLevel.HEADING_2, spacing: { before: 250, after: 90 },
  children: [T(t, { bold: true, size: 23, color: NAVY })]
});
const H3  = t => new Paragraph({
  spacing: { before: 190, after: 70 },
  children: [T(t, { bold: true, size: 21, color: INK })]
});
const EYE = t => new Paragraph({
  spacing: { before: 200, after: 60 },
  children: [T(t, { bold: true, size: 17, color: ACCENT, spacing: 60 })]
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
const hcell = (t, w, o = {}) => cell(t, { w, bold: true, fill: NAVY, color: 'FFFFFF', size: 19, ...o });

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
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT } },
  children: [T('')]
});

const CALLOUT = (title, body) => new Table({
  columnWidths: [W],
  width: { size: W, type: WidthType.DXA },
  borders: {
    top:{style:BorderStyle.SINGLE,size:4,color:ACCENT}, bottom:{style:BorderStyle.SINGLE,size:4,color:ACCENT},
    left:{style:BorderStyle.SINGLE,size:18,color:BLUE}, right:{style:BorderStyle.SINGLE,size:4,color:ACCENT},
    insideHorizontal:{style:BorderStyle.NONE,size:0,color:'FFFFFF'},
    insideVertical:{style:BorderStyle.NONE,size:0,color:'FFFFFF'}
  },
  rows: [new TableRow({ children: [new TableCell({
    width: { size: W, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: WASH, color: 'auto' },
    margins: { top: 150, bottom: 150, left: 180, right: 180 },
    children: [
      new Paragraph({ spacing: { after: 70 }, children: [T(title, { bold: true, size: 21, color: BLUE })] }),
      ...(Array.isArray(body) ? body : [body]).map(x =>
        typeof x === 'string' ? new Paragraph({ spacing: { after: 0 }, children: [T(x)] }) : x)
    ]
  })] })]
});

const usd = n => '$' + n.toLocaleString('en-US');

/* ------------------------------------------------------------- amounts */
const WEBAPP = 8000;
const MOBILE = 4000;
const TOTAL  = WEBAPP + MOBILE;

/* --------------------------------------------------------------- body */
const K = [];
const add = x => K.push(x);

/* ------------------------------------------------------------ cover */
const logo = fs.readFileSync(__dirname + '/../assets/img/ams-logo.png');
add(new Paragraph({
  alignment: AlignmentType.CENTER, spacing: { before: 900, after: 200 },
  children: [new ImageRun({ data: logo, transformation: { width: 190, height: 146 }, type: 'png' })]
}));
add(P([T('ACADEMY OF MEDICAL SCIENCE', { bold: true, size: 30, color: NAVY, spacing: 60 })],
  { align: AlignmentType.CENTER, after: 60 }));
add(P([T('Helping You Succeed', { size: 20, color: MUTED, italics: true })],
  { align: AlignmentType.CENTER, after: 420 }));
add(RULE);
add(P([T('Proposal and Scope of Work', { bold: true, size: 40, color: BLUE })],
  { align: AlignmentType.CENTER, after: 110 }));
add(P([T('Student Web Application  ·  Mobile Applications for iOS and Android', { size: 23, color: INK })],
  { align: AlignmentType.CENTER, after: 40 }));
add(P([T('Administration Console  ·  Online Enrolment and Payment  ·  Course Content Delivery', { size: 21, color: MUTED })],
  { align: AlignmentType.CENTER, after: 460 }));
add(RULE);
add(P([T('Prepared for', { size: 19, color: MUTED, spacing: 40 })], { align: AlignmentType.CENTER, after: 50 }));
add(P([T('Mr. Suresh', { bold: true, size: 25, color: INK })], { align: AlignmentType.CENTER, after: 30 }));
add(P([T('Academy of Medical Science, 10 George St N, Brampton, Ontario  L6X 1R2', { size: 19, color: MUTED })],
  { align: AlignmentType.CENTER, after: 320 }));
add(P([T('Prepared by', { size: 19, color: MUTED, spacing: 40 })], { align: AlignmentType.CENTER, after: 50 }));
add(P([T('Nile Technologies', { bold: true, size: 25, color: BLUE })], { align: AlignmentType.CENTER, after: 30 }));
add(P([T('Enterprise Software  ·  Web and Mobile Applications  ·  Artificial Intelligence', { size: 19, color: MUTED })],
  { align: AlignmentType.CENTER, after: 30 }));
add(P([T('Established 2011  ·  niletechnologies.com', { size: 19, color: MUTED })],
  { align: AlignmentType.CENTER, after: 300 }));
add(P([T('August 2026', { size: 19, color: MUTED })], { align: AlignmentType.CENTER, after: 0 }));

/* =========================================================== 1. concept */
add(H1B('1.  Concept Note'));

add(P('Academy of Medical Science trains healthcare professionals in Brampton, Ontario. Around thirty programmes are offered today, from the accredited Micro-Credential Phlebotomy certificate through to ECG and Holter monitoring, intramuscular injection, medication administration, ultrasound, WHMIS certification and MLPAO / CSMLS examination preparation. The students are doctors and international medical graduates, nurses, medical laboratory technicians and technologists, pharmacists, dentists, medical office assistants and physician assistants.'));

add(P('Almost every one of those programmes is hybrid. The theory is studied online, on the student’s own time, from videos, PDFs and recorded lectures. The practical component cannot be. A student learns venipuncture, ECG lead placement or intramuscular injection by doing it in person, with real equipment, in front of an instructor who signs them off. That split is the defining characteristic of the academy, and it is the thing the platform has to be built around.'));

add(H2('Where the academy is today'));
add(P('The current website is a static, informational site. It describes the programmes, and there it stops. Everything that follows — answering questions, quoting the fee, collecting payment, registering the student, sending the material, arranging the practical date — happens by phone, email and staff time. At the volume the academy is planning for, that is the constraint on growth. It also means a prospective student who visits at eleven at night, decides they want the course and is ready to pay has no way to act on that decision.'));

add(H2('What we are proposing'));
add(P('A platform on which the student completes the entire journey themselves, without a member of the academy team being involved until the day they arrive on campus:'));
[
  'Review the academy and its programmes, in proper detail — what is covered, who it is for, how long it takes, what it costs, where graduates work.',
  'Select a programme and pay the fee online.',
  'Have an account created automatically, with that programme, and only that programme, unlocked in their profile.',
  'Study the online theory — videos, PDFs and recorded lectures, module by module, with progress tracked and quizzes along the way.',
  'Book the in-person practical session on a date that suits them, and be reminded before it.',
  'Receive the certificate, in their account, the day they are signed off.'
].forEach(t => add(NUM(t)));

add(P('The same platform is delivered on the web and as mobile applications for iOS and Android, so a student can move between a laptop at home and a phone on the subway and find themselves in the same place in the same lesson.', { before: 130 }));

add(H2('And what the academy sees'));
add(P('Behind the student experience sits an administration console. It is where Suresh and the team add and price programmes, upload the videos, PDFs and recorded lectures, build the quizzes, schedule the practical sessions and their room capacity, confirm e-Transfers, track enrolments and payments, and watch revenue by month and by programme. Content published there appears on the web application and the mobile applications at the same time, with no developer involved. This is what makes the platform an asset the academy operates, rather than a system it depends on us to run.'));

add(CALLOUT('The design mock-up',
  'A complete, working design mock-up has already been built and shared, at no cost and with no obligation, using the academy’s own logo, brand colours, programme names and module content taken from the flyer and website. It covers the student web application, fourteen screens of the mobile application, and the administration console. This proposal describes the build of that mock-up into a live platform.'));

add(H2('Scale the platform is built for'));
add(P('The academy expects thirty to forty enrolments a month at an average programme fee of two to three thousand dollars. The platform is sized comfortably above that, and hosted on Google or Amazon cloud infrastructure so that capacity is a setting rather than a rebuild.'));

add(H2('Deliberately not in this proposal'));
add(P('The separate paid practice-examination platform — the bank of over a thousand multiple-choice questions for candidates preparing for their licensing examination — is not included here. It is a distinct product with a distinct audience and a one-time-purchase model, and our recommendation remains that it is built as a web platform rather than an app. We will propose it separately once this platform is live.'));

/* ======================================================= 2. app advantage */
add(H1B('2.  The App Advantage'));

add(P('The web application is the foundation. It works on every device, including a phone, through the browser. A student can do everything on it. The question is what the mobile applications add on top, and the honest answer is that they add three things a website cannot do at all, and one it does not do well.'));

add(H2('Study without a connection'));
add(P('This is the decisive one. A mobile application downloads lesson videos, recorded lectures and PDFs to the device over wi-fi and plays them with no connection at all. A website, however well built, cannot. The people enrolling here are working shifts. They study on the subway between Brampton and downtown, in a hospital basement with no signal, in a staff room between patients, on a plane. Every one of those is a moment where a website shows a loading spinner and an app plays the lesson. Over a two-month programme that difference compounds into completion rates.'));

add(H2('Reach every student directly, at will'));
add(P('Once the application is on a phone, the academy can send a notification to that phone at any time. It appears on the home screen whether or not the student is thinking about the academy that day. Consider what that is worth to this business specifically:'));
[
  'A new programme opens for enrolment — every past and present student is told within seconds, rather than waiting for them to visit the website.',
  'Four seats remain on the September practical — announce it and fill them.',
  'The free weekly MLPAO / CSMLS review session is on Thursday — a reminder that morning materially changes attendance.',
  'A student is booked for a practical on Saturday — a reminder the evening before reduces no-shows on a session with twelve seats and an instructor already paid for.',
  'A cohort has stalled at forty per cent — a nudge brings them back.'
].forEach(t => add(BUL(t)));
add(P('On a website, none of this is possible. The academy can publish an announcement and then wait, and hope, for people to come and read it. That is the whole difference between broadcasting and being visited.', { before: 130 }));

add(H2('A digital asset that compounds'));
add(P('Website traffic arrives and leaves. An installed application does not. It sits on the home screen, and the App Store and Google Play both publish the number of times it has been downloaded. After two years at thirty to forty enrolments a month, plus the students who install it to browse, that is a visible install base carrying the academy’s name. If the business is ever sold, valued, franchised or extended to a second location, an established application with a real install base is a tangible asset on the balance sheet in a way that a website is not.'));

add(H2('An experience that keeps students coming back'));
add(P('A native application is simply better at the daily act of studying — it opens instantly, it remembers exactly where the student stopped, it handles video properly, it works one-handed, and it puts the schedule and the certificates one tap away. A student who enjoys using the platform finishes the programme. A student who finishes the programme leaves a review, recommends the academy and comes back for the next certificate.'));

add(CALLOUT('Our recommendation',
  'Commission the web application and the mobile applications together. The mobile applications reuse the same platform, the same content and the same administration console, which is why they cost a fraction of the web application rather than the same again. Building them alongside is materially cheaper and faster than adding them in six months, and it means the offline study and the push notifications are there from the first cohort rather than the fourth.'));

/* ======================================================== 3. scope of work */
add(H1B('3.  Scope of Work'));
add(P('Everything below is included in the fee quoted in Section 4. Nothing here is an optional extra.'));

/* ---- 3.1 web app */
add(H2('3.1  Student Web Application'));

add(H3('Public site and programme discovery'));
[
  'A complete public website presenting the academy — who it is for, the hybrid model, the instructors, student outcomes and contact details — replacing the current static site.',
  'A programme catalogue covering all thirty programmes, with search and with filters by category and by format (hybrid, online, in person).',
  'A detail page for every programme: description, learning outcomes, the audience it is designed for, the full module and lesson breakdown, duration, format, next intake date, seats remaining, fee, and where graduates work.',
  'An enquiry form on each programme for students who want to ask before they commit.',
  'Fully responsive, so the site is properly usable on a phone browser as well as a laptop.'
].forEach(t => add(BUL(t)));

add(H3('Accounts, enrolment and payment'));
[
  'Student account creation and secure sign-in, with password reset.',
  'An enrolment and checkout flow: student details, healthcare background, programme confirmation and payment.',
  'Online card payment through a payment gateway, taking Visa, Mastercard and American Express.',
  'Interac e-Transfer as an alternative method, with the academy confirming receipt from the administration console to release access.',
  'Automatic tax calculation, emailed receipts and an invoice record against the student account.',
  'The academy’s cancellation policy, including the thirty per cent office charge, presented at the point of purchase.',
  'On successful payment, the account is created and that programme — and only that programme — is unlocked in the student’s profile.'
].forEach(t => add(BUL(t)));

add(H3('Course content delivery'));
[
  'A structured curriculum for every programme: modules containing lessons, in a fixed order, exactly as the academy defines it.',
  'Video lessons, streamed with playback position remembered.',
  'PDF documents — workbooks, reference charts, forms and checklists — viewable in the browser and downloadable.',
  'Recorded lectures as audio, with a player suited to listening rather than watching.',
  'Per-lesson completion, per-module completion and an overall programme progress percentage.',
  'A dashboard that opens on the exact lesson the student stopped at, across every programme they are enrolled in.',
  'Access to purchased content for twelve months from enrolment.'
].forEach(t => add(BUL(t)));

add(H3('Quizzes and knowledge checks'));
[
  'Multiple-choice quizzes attached to any module, built by the academy in the administration console.',
  'Immediate marking, the correct answer, and an explanation shown to the student.',
  'Scores recorded against the student record and visible to the academy.',
  'Optional pass threshold on a module before the student may book the practical session that follows it.'
].forEach(t => add(BUL(t)));

add(H3('In-person practical scheduling'));
[
  'In-person sessions presented as part of the curriculum, in sequence, so the student sees where the campus days fall.',
  'Available dates published by the academy, showing time, room, instructor and seats remaining.',
  'Student self-booking, rescheduling and cancellation within the academy’s notice window.',
  'Confirmation and reminder emails, with location and what to bring.',
  'Directions to 10 George St N from the booking screen.'
].forEach(t => add(BUL(t)));

add(H3('Certificates and student account'));
[
  'A certificate issued automatically on programme completion, in the academy’s branding, downloadable as a PDF and shareable with an employer.',
  'A certificate number recorded against each award.',
  'Full payment and receipt history.',
  'Profile management and notification preferences.'
].forEach(t => add(BUL(t)));

/* ---- 3.2 admin */
add(H2('3.2  Administration Console'));
add(P('Delivered as part of the web application, and the reason the platform needs no developer after handover.'));

add(H3('Programmes and content'));
[
  'Create, edit, price, publish and retire programmes; set duration, format, category, intake dates and seat limits.',
  'A content manager per programme: create modules, add lessons, and reorder both by dragging.',
  'Upload video, PDF and audio files directly, with automatic processing for playback on the web and on mobile.',
  'Build and edit quizzes, with answers and explanations.',
  'Publish changes to the web application and the mobile applications simultaneously; hide a lesson from students without deleting it.'
].forEach(t => add(BUL(t)));

add(H3('Students, enrolments and payments'));
[
  'A searchable student register with programmes held, progress, lifetime value and last activity.',
  'The full transaction record: card payments and e-Transfers, with status.',
  'Confirm a received e-Transfer to release a student’s access.',
  'Manual enrolment for students who pay in person or by another route.',
  'Export of students and of transactions.'
].forEach(t => add(BUL(t)));

add(H3('Practical sessions'));
[
  'Schedule sessions against a programme, with date, time, room, instructor and capacity.',
  'Live booking counts and a full-session indicator.',
  'Attendance sheets and competency sign-off.',
  'Automatic reminders to booked students, configurable by the academy.',
  'Room register with capacity and utilisation.'
].forEach(t => add(BUL(t)));

add(H3('Instructors and reporting'));
[
  'Instructor records, credentials, biographies and session assignment.',
  'Revenue by month and by programme, enrolment counts, completion rates and session utilisation.',
  'Exportable reports.',
  'Multiple console users with role-based permissions — director, operations and instructor.'
].forEach(t => add(BUL(t)));

/* ---- 3.3 mobile */
add(H2('3.3  Mobile Applications for iOS and Android'));
add(P('Two native applications, drawing on the same platform, the same content and the same administration console as the web application.'));
[
  'Sign-in with the same account, and a home screen that opens on the lesson the student stopped at.',
  'The full programme catalogue, with enrolment and payment inside the application.',
  'The complete content player: video, PDF and recorded lectures, with progress and quizzes.',
  'Offline downloads — lessons and documents saved to the device over wi-fi and played with no connection, with a download manager showing what is stored.',
  'The practical schedule: booking, rescheduling, directions and reminders.',
  'Certificates, viewable and shareable from the phone.',
  'Push notifications, sent by the academy from the administration console to all students or to a selected group.',
  'Publication to the Apple App Store and Google Play under the academy’s own developer accounts, including store listings, screenshots and the review process on both stores.'
].forEach(t => add(BUL(t)));

/* ---- 3.4 delivery */
add(H2('3.4  Delivery'));
add(P('Work runs in four stages. Stages overlap where it is safe to overlap them — mobile development begins while the web application is in quality assurance, which is why both surfaces together take two and a half to three months rather than the four a strictly sequential reading would suggest.'));
add(table([1400, 4400, 3226], [
  new TableRow({ tableHeader: true, children: [
    hcell('Stage', 1400), hcell('What happens', 4400), hcell('Duration', 3226, { align: AlignmentType.CENTER })] }),
  new TableRow({ children: [
    cell('One', { w: 1400, bold: true }),
    cell('Requirements confirmation, and interface design for every screen of all three surfaces, through to your written sign-off.', { w: 4400 }),
    cell('2 to 3 weeks', { w: 3226, align: AlignmentType.CENTER })] }),
  new TableRow({ children: [
    cell('Two', { w: 1400, bold: true }),
    cell('Build of the student web application and the administration console: catalogue, enrolment, payment, content delivery, quizzes, scheduling and certificates.', { w: 4400 }),
    cell('4 to 5 weeks', { w: 3226, align: AlignmentType.CENTER })] }),
  new TableRow({ children: [
    cell('Three', { w: 1400, bold: true }),
    cell('Build of the iOS and Android applications, including offline downloads and push notifications.', { w: 4400 }),
    cell('3 to 4 weeks', { w: 3226, align: AlignmentType.CENTER })] }),
  new TableRow({ children: [
    cell('Four', { w: 1400, bold: true }),
    cell('Content loading support, your testing and feedback, corrections, go-live on your domain, and submission to both app stores.', { w: 4400 }),
    cell('2 weeks', { w: 3226, align: AlignmentType.CENTER })] }),
  new TableRow({ children: [
    cell('Total', { w: 1400, bold: true, fill: NAVY, color: 'FFFFFF' }),
    cell('From signing to live on your domain and published on both app stores', { w: 4400, bold: true, fill: NAVY, color: 'FFFFFF' }),
    cell('10 to 12 weeks', { w: 3226, bold: true, align: AlignmentType.CENTER, fill: NAVY, color: 'FFFFFF' })] })
]));

add(H2('3.5  What is handed over'));
[
  'The complete platform, live on the academy’s own domain and hosted on Google or Amazon cloud infrastructure in the academy’s name.',
  'Both mobile applications published on the Apple App Store and Google Play under the academy’s developer accounts.',
  'The full source code of everything built.',
  'Administrator training for the academy team on the console, and a written guide.',
  'Support with loading the first programmes and their content.'
].forEach(t => add(BUL(t)));
add(P([b('Ownership.  '), T('On final payment, the platform, its source code, its design and its data belong to Academy of Medical Science absolutely. It is not licensed, rented or subscribed. There is no monthly fee and no annual fee payable to Nile Technologies for the platform itself.')], { before: 140 }));

/* ========================================================= 4. commercials */
add(H1B('4.  Commercials'));

add(table([5000, 4026], [
  new TableRow({ tableHeader: true, children: [
    hcell('Component', 5000), hcell('Fee', 4026, { align: AlignmentType.RIGHT })] }),
  new TableRow({ children: [
    cell([
      new Paragraph({ spacing: { after: 40 }, children: [T('Student Web Application', { bold: true, size: 21 })] }),
      new Paragraph({ spacing: { after: 0 }, children: [T('Public site, programme catalogue, enrolment and online payment, student portal, course content delivery, quizzes, practical scheduling, certificates — and the complete administration console.', { size: 19, color: MUTED })] })
    ], { w: 5000 }),
    cell(usd(WEBAPP), { w: 4026, bold: true, size: 24, align: AlignmentType.RIGHT, fill: WASH })] }),
  new TableRow({ children: [
    cell([
      new Paragraph({ spacing: { after: 40 }, children: [T('Mobile Applications — iOS and Android', { bold: true, size: 21 })] }),
      new Paragraph({ spacing: { after: 0 }, children: [T('Two native applications with the full student experience, offline downloads and push notifications, published to the Apple App Store and Google Play.', { size: 19, color: MUTED })] })
    ], { w: 5000 }),
    cell(usd(MOBILE), { w: 4026, bold: true, size: 24, align: AlignmentType.RIGHT, fill: WASH })] }),
  new TableRow({ children: [
    cell('Total', { w: 5000, bold: true, size: 23, fill: NAVY, color: 'FFFFFF' }),
    cell(usd(TOTAL), { w: 4026, bold: true, size: 28, align: AlignmentType.RIGHT, fill: NAVY, color: 'FFFFFF' })] })
]));

add(P([T('All figures are in United States dollars. The administration console is included within the web application fee and is not charged separately. The mobile applications are priced at '), b(usd(MOBILE)), T(' rather than as a second platform because they reuse the same foundation, the same content and the same console built in the web application — which is also why commissioning them alongside costs materially less than adding them later.')], { before: 150 }));

add(P([b('The web application may be commissioned on its own at '), b(usd(WEBAPP)), b('.  '), T('It is a complete, working platform in itself, and the mobile applications can be added in a later phase without any of the work being wasted. Our recommendation, for the reasons set out in Section 2, is to commission both together.')], { before: 130 }));

add(CALLOUT('One fee, and then it is yours',
  'This is a one-time cost to design, build, publish and hand over the platform. There is no monthly licence, no annual licence, and no per-student charge payable to Nile Technologies. Cloud hosting, the payment gateway’s transaction fees, and the two app store developer accounts are paid by the academy directly to those providers and form no part of our fee.'));

/* ======================================================= 5. payment terms */
add(H1('5.  Payment Terms'));
add(P('Payments are milestone-based, in the ratio 30 : 30 : 30 : 10. Apart from the payment on signing, every payment falls due only when work has been delivered to the academy and approved.'));

add(table([5000, 1400, 2626], [
  new TableRow({ tableHeader: true, children: [
    hcell('Milestone', 5000), hcell('Share', 1400, { align: AlignmentType.CENTER }), hcell('Amount', 2626, { align: AlignmentType.RIGHT })] }),
  new TableRow({ children: [
    cell('On signing, to commence work', { w: 5000 }),
    cell('30%', { w: 1400, align: AlignmentType.CENTER }),
    cell(usd(TOTAL * 0.3), { w: 2626, bold: true, align: AlignmentType.RIGHT, fill: WASH })] }),
  new TableRow({ children: [
    cell('Interface design for all three surfaces delivered and signed off', { w: 5000 }),
    cell('30%', { w: 1400, align: AlignmentType.CENTER }),
    cell(usd(TOTAL * 0.3), { w: 2626, bold: true, align: AlignmentType.RIGHT, fill: WASH })] }),
  new TableRow({ children: [
    cell('Development complete and the platform submitted to the academy for testing', { w: 5000 }),
    cell('30%', { w: 1400, align: AlignmentType.CENTER }),
    cell(usd(TOTAL * 0.3), { w: 2626, bold: true, align: AlignmentType.RIGHT, fill: WASH })] }),
  new TableRow({ children: [
    cell('Go-live on the academy’s domain, source code handed over, and both applications published to the app stores', { w: 5000 }),
    cell('10%', { w: 1400, align: AlignmentType.CENTER }),
    cell(usd(TOTAL * 0.1), { w: 2626, bold: true, align: AlignmentType.RIGHT, fill: WASH })] }),
  new TableRow({ children: [
    cell('Total', { w: 5000, bold: true, fill: NAVY, color: 'FFFFFF' }),
    cell('100%', { w: 1400, bold: true, align: AlignmentType.CENTER, fill: NAVY, color: 'FFFFFF' }),
    cell(usd(TOTAL), { w: 2626, bold: true, size: 23, align: AlignmentType.RIGHT, fill: NAVY, color: 'FFFFFF' })] })
]));

add(P('Invoices are payable within fifteen days. Applicable taxes and bank charges are additional. If the web application is commissioned on its own, the same ratio applies to the fee of ' + usd(WEBAPP) + ', giving milestones of ' + usd(WEBAPP * 0.3) + ', ' + usd(WEBAPP * 0.3) + ', ' + usd(WEBAPP * 0.3) + ' and ' + usd(WEBAPP * 0.1) + '.', { before: 140 }));

add(P([b('Why we structure it this way.  '), T('Only the first payment is made on trust. Every payment after it is made against something the academy can see, use and judge — the finished designs, then the working platform in your hands for testing, then the live system and the source code. If work is not delivered, the payment does not fall due. We would rather earn each stage than ask for it in advance.')], { before: 140 }));

/* ======================================================= 6. nile promise */
add(H1B('6.  The Nile Promise'));

add(P([
  T('A build of this size evolves as the detail becomes clear. Screens get refined, a workflow turns out to need an extra step, wording changes after you see it on a real page. So we make a simple promise: the refinements, adjustments and natural back-and-forth of getting this platform right, '),
  b('within the scope described in this document'),
  T(', will not cost you anything extra. The fee is the fee. If, together, we decide to add something genuinely new and beyond this scope, we will agree it in a short written note before any work starts. Never a surprise, and never a mid-project renegotiation. This is our written assurance to you.')
]));

add(H2('Who you are working with'));
add(P('Nile Technologies was founded in 2011 by Mr. Atul Kapoor, formerly Senior Director at Oracle India. Our first five years were spent implementing Oracle software for large enterprises — Airtel, Genpact, Reliance Jio, GE Oil & Gas, Accenture — and that is where our discipline around delivery was formed. Since 2015 we have delivered between twenty-five and thirty-five web and mobile applications a year to small and medium businesses across the United States, the United Kingdom, Canada and Australia, alongside a growing artificial intelligence practice. We are a team of around seventy-five, headquartered in Noida, India.'));

add(H2('On working with a team you have not met'));
add(P('We know this is the real question, and we would rather answer it directly than leave it unsaid. Three things:'));
[
  [b('The payment structure answers most of it.  '), T('Apart from the first payment, you pay only for work you have already received and approved. Your exposure at any moment is one milestone, not the project.')],
  [b('We will give you our customers.  '), T('We will provide direct contact details for clients in the United States and the United Kingdom whom we have never met in person and for whom we have delivered complete platforms. Call them without telling us. We would encourage it.')],
  [b('You will see us constantly.  '), T('A named project manager, regular calls on your schedule and in your time zone, and working builds you can open and use from early in the project rather than a demonstration at the end.')]
].forEach(t => add(BUL(t)));

add(H2('On security'));
add(P('The platform is hosted on Google or Amazon cloud infrastructure, not on a private server, which means the academy inherits the security posture of two of the largest technology companies in the world. The mobile applications are distributed only through the Apple App Store and Google Play, and both review every submission. Card details are handled by the payment gateway and are never stored on the platform.'));

add(CALLOUT('And after go-live',
  'We do not build and disappear. Our longest-standing client came to us in 2018 with an idea and no business behind it. We designed and built his platform, we support it around the clock today, and we are presently rebuilding it on current technology seven years later. That is the relationship we are proposing here.'));

add(RULE);
add(P([T('Nile Technologies', { bold: true, size: 23, color: BLUE })], { align: AlignmentType.CENTER, after: 40 }));
add(P([T('Aaditya Kapoor  ·  aadityakapoor.nile@gmail.com  ·  niletechnologies.com', { size: 19, color: MUTED })],
  { align: AlignmentType.CENTER, after: 30 }));
add(P([T('Prepared for Academy of Medical Science, August 2026', { size: 18, color: MUTED, italics: true })],
  { align: AlignmentType.CENTER, after: 0 }));

/* --------------------------------------------------------------- build */
const doc = new Document({
  numbering: {
    config: [
      { reference: 'bul', levels: [{ level: 0, format: 'bullet', text: '•', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 220 } } } }] },
      { reference: 'num', levels: [{ level: 0, format: 'decimal', text: '%1.', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 380, hanging: 240 } } } }] }
    ]
  },
  styles: { default: { document: { run: { font: 'Calibri', size: 21, color: INK } } } },
  sections: [{
    properties: { page: { margin: { top: 1100, right: 1100, bottom: 1100, left: 1100 } } },
    children: K
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(__dirname + '/Academy-of-Medical-Science-Proposal.docx', buf);
  console.log('written  ' + buf.length.toLocaleString() + ' bytes');
});
