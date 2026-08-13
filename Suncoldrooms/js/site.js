/* ============================================================
   Suncool Coldrooms — shared shell: icons, header, footer, art
   ============================================================ */

/* ---------- icon library (24px, stroke) ---------- */
window.I = function (name, size) {
  size = size || 20;
  const paths = {
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    checkCircle: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    chev: '<polyline points="6 9 12 15 18 9"/>',
    chevR: '<polyline points="9 18 15 12 9 6"/>',
    arrowR: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    arrowL: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    snow: '<path d="M12 2v20M17 5l-5 3-5-3M17 19l-5-3-5 3M2 12h20M5 7l3 5-3 5M19 7l-3 5 3 5"/>',
    battery: '<rect x="2" y="7" width="16" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/><line x1="6" y1="10" x2="6" y2="14"/><line x1="10" y1="10" x2="10" y2="14"/>',
    bolt: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35a1 1 0 0 0-.78-.38H14"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    shieldCheck: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>',
    doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    menu: '<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>',
    box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/>',
    tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    chart: '<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    dollar: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    hook: '<path d="M12 2v6"/><path d="M12 8a5 5 0 1 0 5 5"/><circle cx="12" cy="4" r="2"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
    list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
    edit: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    volume: '<path d="M11 5 6 9H2v6h4l5 4z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>',
    thermometer: '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"/>'
  };
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || '') + '</svg>';
};

/* ---------- decorative sun-ray fan (echoes the logo) ---------- */
window.raysSVG = function (size, color) {
  size = size || 220; color = color || '#F58220';
  let rays = '';
  for (let i = 0; i < 14; i++) {
    const a = (i / 13) * Math.PI * 1.05 + Math.PI * 0.6;
    const x1 = 110 + Math.cos(a) * 52, y1 = 110 + Math.sin(a) * 52;
    const x2 = 110 + Math.cos(a) * (86 + (i % 2) * 14), y2 = 110 + Math.sin(a) * (86 + (i % 2) * 14);
    rays += '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + color + '" stroke-width="9" stroke-linecap="round"/>';
  }
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 220 220" fill="none" aria-hidden="true">' + rays + '</svg>';
};

/* ---------- coldroom trailer illustration ---------- */
window.trailerArt = function (opts) {
  opts = opts || {};
  const rails = opts.rails;
  return '' +
  '<svg viewBox="0 0 660 430" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Solar powered coldroom trailer">' +
    /* sun */
    '<g opacity=".95">' +
      '<circle cx="92" cy="86" r="34" fill="#F58220"/>' +
      '<g stroke="#F58220" stroke-width="8" stroke-linecap="round">' +
        '<line x1="92" y1="26" x2="92" y2="10"/><line x1="92" y1="146" x2="92" y2="162"/>' +
        '<line x1="32" y1="86" x2="16" y2="86"/><line x1="152" y1="86" x2="168" y2="86"/>' +
        '<line x1="49" y1="43" x2="38" y2="32"/><line x1="135" y1="129" x2="146" y2="140"/>' +
        '<line x1="49" y1="129" x2="38" y2="140"/><line x1="135" y1="43" x2="146" y2="32"/>' +
      '</g>' +
    '</g>' +
    /* ground */
    '<line x1="24" y1="392" x2="636" y2="392" stroke="#CBD8E2" stroke-width="3" stroke-linecap="round"/>' +
    '<g stroke="#CBD8E2" stroke-width="3" stroke-linecap="round"><line x1="60" y1="392" x2="66" y2="380"/><line x1="590" y1="392" x2="596" y2="380"/><line x1="608" y1="392" x2="602" y2="382"/></g>' +
    '<ellipse cx="380" cy="394" rx="210" ry="10" fill="#0C2740" opacity=".08"/>' +
    /* solar panel */
    '<g>' +
      '<rect x="216" y="96" width="300" height="26" rx="6" fill="#0E3A5C"/>' +
      '<g stroke="#3E7FB4" stroke-width="2.5">' +
        '<line x1="253" y1="98" x2="253" y2="120"/><line x1="290" y1="98" x2="290" y2="120"/>' +
        '<line x1="327" y1="98" x2="327" y2="120"/><line x1="364" y1="98" x2="364" y2="120"/>' +
        '<line x1="401" y1="98" x2="401" y2="120"/><line x1="438" y1="98" x2="438" y2="120"/>' +
        '<line x1="475" y1="98" x2="475" y2="120"/><line x1="216" y1="109" x2="516" y2="109"/>' +
      '</g>' +
      '<rect x="240" y="122" width="12" height="16" fill="#123A5C"/><rect x="480" y="122" width="12" height="16" fill="#123A5C"/>' +
    '</g>' +
    /* trailer body */
    '<rect x="196" y="138" width="340" height="192" rx="14" fill="#FFFFFF" stroke="#123A5C" stroke-width="4"/>' +
    '<rect x="196" y="292" width="340" height="38" rx="0" fill="#1B75BC" opacity=".95"/>' +
    '<rect x="196" y="138" width="340" height="192" rx="14" fill="none" stroke="#123A5C" stroke-width="4"/>' +
    /* door */
    '<rect x="432" y="158" width="84" height="152" rx="8" fill="#F4F8FB" stroke="#123A5C" stroke-width="3.5"/>' +
    '<rect x="444" y="216" width="26" height="9" rx="4.5" fill="#123A5C"/>' +
    '<circle cx="508" cy="172" r="4" fill="#123A5C"/><circle cx="508" cy="296" r="4" fill="#123A5C"/>' +
    /* branding on body */
    '<g>' +
      '<circle cx="254" cy="200" r="19" fill="#F58220"/>' +
      '<g stroke="#F58220" stroke-width="4.5" stroke-linecap="round">' +
        '<line x1="254" y1="168" x2="254" y2="160"/><line x1="254" y1="232" x2="254" y2="240"/>' +
        '<line x1="222" y1="200" x2="214" y2="200"/><line x1="286" y1="200" x2="294" y2="200"/>' +
        '<line x1="231" y1="177" x2="225" y2="171"/><line x1="277" y1="223" x2="283" y2="229"/>' +
        '<line x1="231" y1="223" x2="225" y2="229"/><line x1="277" y1="177" x2="283" y2="171"/>' +
      '</g>' +
      '<text x="316" y="196" font-family="Outfit,Arial,sans-serif" font-weight="800" font-size="23" fill="#1B75BC">SUNCOOL</text>' +
      '<text x="316" y="220" font-family="Outfit,Arial,sans-serif" font-weight="700" font-size="15" letter-spacing="3" fill="#123A5C">COLDROOMS</text>' +
    '</g>' +
    /* temp readout */
    '<rect x="222" y="252" width="86" height="30" rx="7" fill="#0C2740"/>' +
    '<circle cx="238" cy="267" r="4" fill="#43D18A"/>' +
    '<text x="250" y="273" font-family="Outfit,Arial,sans-serif" font-weight="700" font-size="17" fill="#FFFFFF">2.0&#176;C</text>' +
    (rails ? '<g stroke="#123A5C" stroke-width="3"><line x1="340" y1="252" x2="420" y2="252"/><line x1="352" y1="252" x2="352" y2="266"/><line x1="376" y1="252" x2="376" y2="266"/><line x1="400" y1="252" x2="400" y2="266"/><circle cx="352" cy="270" r="4" fill="#F58220" stroke="none"/><circle cx="376" cy="270" r="4" fill="#F58220" stroke="none"/><circle cx="400" cy="270" r="4" fill="#F58220" stroke="none"/></g>' : '') +
    /* wheels + guard */
    '<path d="M258 330 a 40 40 0 0 1 80 0" fill="#123A5C"/>' +
    '<circle cx="298" cy="348" r="32" fill="#1E2A35"/><circle cx="298" cy="348" r="17" fill="#8FA1B0"/><circle cx="298" cy="348" r="6" fill="#123A5C"/>' +
    '<g stroke="#123A5C" stroke-width="3"><line x1="298" y1="331" x2="298" y2="365"/><line x1="281" y1="348" x2="315" y2="348"/></g>' +
    /* drawbar */
    '<path d="M196 306 L120 336" stroke="#123A5C" stroke-width="9" stroke-linecap="round"/>' +
    '<path d="M120 336 L92 336" stroke="#123A5C" stroke-width="9" stroke-linecap="round"/>' +
    '<circle cx="86" cy="336" r="8" fill="none" stroke="#123A5C" stroke-width="5"/>' +
    '<line x1="130" y1="336" x2="130" y2="378" stroke="#123A5C" stroke-width="6" stroke-linecap="round"/>' +
    '<circle cx="130" cy="384" r="8" fill="#1E2A35"/>' +
    /* energy line from panel */
    '<path d="M560 122 q 30 10 30 44 v 120" stroke="#F58220" stroke-width="4" stroke-dasharray="2 9" stroke-linecap="round" fill="none"/>' +
    '<g transform="translate(578,296)"><circle r="17" fill="#F58220"/><path d="M2.5 -9 L-5 1.5 L-0.5 1.5 L-2.5 9 L5.5 -1.5 L0.5 -1.5 Z" fill="#fff"/></g>' +
  '</svg>';
};

/* ---------- header & footer injection ---------- */
(function () {
  const page = document.body ? document.body.dataset.page : '';

  function active(p) { return page === p ? ' class="active"' : ''; }

  const headerHTML = '' +
  '<div class="topbar"><div class="container">' +
    '<div style="display:flex;align-items:center;gap:8px">' + I('pin', 15) + '<span>Based in South East Queensland &mdash; servicing all of Australia</span></div>' +
    '<div class="tb-right">' +
      '<a href="tel:0411478110">' + I('phone', 15) + '0411 478 110</a>' +
      '<a href="mailto:info@suncoolcoldrooms.com.au">' + I('mail', 15) + 'info@suncoolcoldrooms.com.au</a>' +
    '</div>' +
  '</div></div>' +
  '<nav class="nav-row">' +
    '<a class="brand" href="index.html" aria-label="Suncool Coldrooms home"><img src="Logo1-Photoroom.png" alt="Suncool Coldrooms"></a>' +
    '<div class="main-nav">' +
      '<a href="index.html"' + active('home') + '>Home</a>' +
      '<a href="about.html"' + active('about') + '>About Us</a>' +
      '<div class="nav-drop">' +
        '<a href="solar-powered.html"' + (page === 'solar' || page === 'retrofit' ? ' class="active"' : '') + '>Services ' + I('chev', 15) + '</a>' +
        '<div class="nav-drop-menu">' +
          '<a href="solar-powered.html"' + active('solar') + '>Mobile Solar-Powered Coldrooms<span>Trailer-mounted, fully off-grid</span></a>' +
          '<a href="retrofit.html"' + active('retrofit') + '>Suncool Retrofit Coldrooms<span>Convert your existing coldroom</span></a>' +
        '</div>' +
      '</div>' +
      '<a href="rent.html"' + active('rent') + ' style="color:var(--orange-dark)">Rent a Coldroom</a>' +
      '<a href="faqs.html"' + active('faqs') + '>FAQs</a>' +
      '<a href="contact.html"' + active('contact') + '>Contact Us</a>' +
    '</div>' +
    '<div class="nav-cta">' +
      '<a href="account.html" class="btn btn-ghost btn-sm">' + I('user', 16) + 'My Account</a>' +
      '<a href="rent.html" class="btn btn-orange btn-sm">Book a Rental ' + I('arrowR', 16) + '</a>' +
      '<button class="nav-burger" aria-label="Menu" onclick="document.getElementById(\'mobileNav\').classList.toggle(\'open\')">' + I('menu', 26) + '</button>' +
    '</div>' +
  '</nav>' +
  '<div class="mobile-nav" id="mobileNav">' +
    '<a href="index.html">Home</a><a href="about.html">About Us</a>' +
    '<a href="solar-powered.html">Mobile Solar-Powered Coldrooms</a>' +
    '<a href="retrofit.html">Suncool Retrofit Coldrooms</a>' +
    '<a href="rent.html" style="color:var(--orange-dark)">Rent a Coldroom</a>' +
    '<a href="faqs.html">FAQs</a><a href="contact.html">Contact Us</a>' +
    '<a href="account.html">My Account</a>' +
    '<a href="rent.html" class="btn btn-orange">Book a Rental</a>' +
  '</div>';

  const footerHTML = '' +
  '<div class="container">' +
    '<div class="foot-main">' +
      '<div class="foot-brand">' +
        '<div class="foot-logo">' + raysSVG(46) + '<span>SUNCOOL<br>COLDROOMS</span></div>' +
        '<p>Reliable, solar-powered refrigeration for farms, markets, events and off-grid worksites across Australia.</p>' +
        '<p style="margin-top:14px;font-family:var(--font-display);font-weight:700;color:#fff">Cold storage. No grid needed.</p>' +
        '<div style="margin-top:18px;font-size:13.5px">Want updates on new products or ways to stay cool off-grid?</div>' +
        '<form class="foot-sub" onsubmit="event.preventDefault();this.innerHTML=\'<span style=&quot;color:#43D18A;font-weight:600;padding:10px 0&quot;>Thanks &mdash; you are subscribed.</span>\'">' +
          '<input type="email" placeholder="Your email address" required><button type="submit" aria-label="Subscribe">' + I('arrowR', 18) + '</button>' +
        '</form>' +
      '</div>' +
      '<div><h4>Explore</h4>' +
        '<a href="index.html">Home</a><a href="about.html">About Us</a>' +
        '<a href="solar-powered.html">Solar-Powered Coldrooms</a>' +
        '<a href="retrofit.html">Retrofit Coldrooms</a>' +
        '<a href="faqs.html">FAQs</a><a href="contact.html">Contact Us</a>' +
      '</div>' +
      '<div><h4>Rentals</h4>' +
        '<a href="rent.html">Book a coldroom trailer</a>' +
        '<a href="rent.html#availability">Check availability</a>' +
        '<a href="account.html">My account &amp; bookings</a>' +
        '<a href="faqs.html#rental">Rental FAQs</a>' +
        '<a href="contact.html">Long-term hire quotes</a>' +
      '</div>' +
      '<div><h4>Get in Touch</h4><ul class="foot-contact">' +
        '<li>' + I('phone', 17) + '<a href="tel:0411478110" style="display:inline;padding:0">0411 478 110</a></li>' +
        '<li>' + I('mail', 17) + '<a href="mailto:info@suncoolcoldrooms.com.au" style="display:inline;padding:0">info@suncoolcoldrooms.com.au</a></li>' +
        '<li>' + I('pin', 17) + '<span>Workshop on the Gold Coast, QLD<br>Handover address in your confirmation</span></li>' +
        '<li>' + I('clock', 17) + '<span>Mon &ndash; Fri 7:00am &ndash; 4:30pm<br>Weekend handovers by arrangement</span></li>' +
      '</ul></div>' +
    '</div>' +
    '<div class="foot-bottom">' +
      '<span>Copyright &copy; 2026 Suncool Coldrooms, All Rights Reserved.</span>' +
      '<span><a href="admin.html">Owner login</a> &nbsp;&middot;&nbsp; Demo concept by Nile Technologies</span>' +
    '</div>' +
  '</div>';

  document.addEventListener('DOMContentLoaded', function () {
    const h = document.getElementById('siteHeader');
    if (h) h.innerHTML = headerHTML;
    const f = document.getElementById('siteFooter');
    if (f) f.innerHTML = footerHTML;
    document.querySelectorAll('[data-art="trailer"]').forEach(el => { el.innerHTML = trailerArt({ rails: el.dataset.rails === '1' }); });
    document.querySelectorAll('[data-art="rays"]').forEach(el => { el.innerHTML = raysSVG(Number(el.dataset.size || 220), el.dataset.color || '#F58220'); });
    document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = I(el.dataset.icon, Number(el.dataset.size || 20)); });
  });
})();
