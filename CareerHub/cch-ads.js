/* Cheetahs Career Hub — ad creative library.
   Renders display-ad units with inline SVG illustrations so sample
   campaigns read like real ads, not placeholders. */
(function () {
  const ART = {
    gradcap: `<svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="128" rx="62" ry="10" fill="rgba(0,0,0,.18)"/>
      <rect x="58" y="96" width="84" height="14" rx="4" fill="rgba(255,255,255,.55)"/>
      <rect x="64" y="82" width="72" height="14" rx="4" fill="rgba(255,255,255,.75)"/>
      <rect x="52" y="110" width="96" height="14" rx="4" fill="rgba(255,255,255,.35)"/>
      <path d="M100 22L168 48L100 74L32 48L100 22Z" fill="#fff"/>
      <path d="M100 74L60 59V78C60 87 78 95 100 95C122 95 140 87 140 78V59L100 74Z" fill="rgba(255,255,255,.85)"/>
      <path d="M168 48V76" stroke="#FDE047" stroke-width="5" stroke-linecap="round"/>
      <circle cx="168" cy="82" r="7" fill="#FDE047"/>
      <path d="M40 18l3.5 8 8 3.5-8 3.5-3.5 8-3.5-8-8-3.5 8-3.5z" fill="#FDE047"/>
      <path d="M162 14l2.4 5.4 5.4 2.4-5.4 2.4-2.4 5.4-2.4-5.4-5.4-2.4 5.4-2.4z" fill="rgba(255,255,255,.8)"/>
    </svg>`,
    laptop: `<svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="132" rx="70" ry="9" fill="rgba(0,0,0,.18)"/>
      <rect x="45" y="30" width="110" height="74" rx="8" fill="#fff"/>
      <rect x="53" y="38" width="94" height="58" rx="4" fill="rgba(13,110,110,.18)"/>
      <rect x="61" y="74" width="10" height="16" rx="2" fill="#0F766E"/>
      <rect x="77" y="62" width="10" height="28" rx="2" fill="#14B8A6"/>
      <rect x="93" y="52" width="10" height="38" rx="2" fill="#0F766E"/>
      <rect x="109" y="66" width="10" height="24" rx="2" fill="#14B8A6"/>
      <rect x="125" y="46" width="10" height="44" rx="2" fill="#FDE047"/>
      <path d="M60 52l14-8 12 5 16-11 14 6" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>
      <path d="M32 104h136l10 16a4 4 0 0 1-3.6 5.8H25.6A4 4 0 0 1 22 120l10-16z" fill="rgba(255,255,255,.85)"/>
      <rect x="84" y="110" width="32" height="6" rx="3" fill="rgba(0,0,0,.2)"/>
      <path d="M172 30l2.8 6.4 6.4 2.8-6.4 2.8-2.8 6.4-2.8-6.4-6.4-2.8 6.4-2.8z" fill="#FDE047"/>
    </svg>`,
    suit: `<svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="134" rx="58" ry="9" fill="rgba(0,0,0,.18)"/>
      <path d="M64 132V66c0-14 8-26 20-30l16 10 16-10c12 4 20 16 20 30v66H64z" fill="#fff"/>
      <path d="M84 36L64 66l18 12 8-30-6-12z" fill="rgba(255,255,255,.7)"/>
      <path d="M116 36l20 30-18 12-8-30 6-12z" fill="rgba(255,255,255,.7)"/>
      <path d="M100 46l-8 12 8 44 8-44-8-12z" fill="#FDE047"/>
      <circle cx="100" cy="104" r="3.5" fill="rgba(0,0,0,.25)"/>
      <path d="M40 34l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="rgba(255,255,255,.85)"/>
      <path d="M160 96l2.6 6 6 2.6-6 2.6-2.6 6-2.6-6-6-2.6 6-2.6z" fill="#FDE047"/>
    </svg>`,
    office: `<svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="134" rx="70" ry="9" fill="rgba(0,0,0,.18)"/>
      <rect x="30" y="58" width="56" height="42" rx="6" fill="#fff"/>
      <rect x="38" y="66" width="40" height="8" rx="3" fill="rgba(3,105,161,.35)"/>
      <rect x="38" y="80" width="28" height="8" rx="3" fill="rgba(3,105,161,.2)"/>
      <rect x="26" y="100" width="64" height="10" rx="4" fill="rgba(255,255,255,.7)"/>
      <rect x="104" y="34" width="66" height="76" rx="8" fill="rgba(255,255,255,.9)"/>
      <rect x="112" y="44" width="50" height="12" rx="4" fill="rgba(3,105,161,.3)"/>
      <rect x="112" y="62" width="50" height="12" rx="4" fill="rgba(3,105,161,.2)"/>
      <rect x="112" y="80" width="34" height="12" rx="4" fill="#FDE047"/>
      <rect x="96" y="110" width="82" height="14" rx="5" fill="rgba(255,255,255,.65)"/>
      <path d="M44 24l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#FDE047"/>
    </svg>`,
    plane: `<svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="132" rx="64" ry="9" fill="rgba(0,0,0,.16)"/>
      <path d="M28 92l128-44c8-3 16 1 18 8 2 8-3 15-11 17L120 90l-26 28-14-4 14-26-40 12-16-8z" fill="#fff"/>
      <circle cx="160" cy="56" r="5" fill="#FDE047"/>
      <path d="M40 44h34" stroke="rgba(255,255,255,.7)" stroke-width="5" stroke-linecap="round"/>
      <path d="M28 58h22" stroke="rgba(255,255,255,.5)" stroke-width="5" stroke-linecap="round"/>
      <path d="M150 108l2.8 6.4 6.4 2.8-6.4 2.8-2.8 6.4-2.8-6.4-6.4-2.8 6.4-2.8z" fill="#FDE047"/>
    </svg>`
  };

  /* campaign catalog — used by the portals to render live ad slots,
     and by the admin Advertiser Network for creative previews */
  window.AD_CAMPAIGNS = {
    careerboost: {
      brand: 'CareerBoost Academy', audience: 'Candidate portal',
      grad: 'linear-gradient(118deg,#4F46E5,#9333EA)', art: 'gradcap',
      burst: '50% OFF AUGUST',
      title: 'Get certified. Get hired faster.',
      copy: 'Evening classes in customer service, bookkeeping & food safety — island-wide.',
      cta: 'Browse courses'
    },
    toolkit: {
      brand: 'SharpFit Attire', audience: 'Candidate portal',
      grad: 'linear-gradient(118deg,#E11D48,#F97316)', art: 'suit',
      burst: null,
      title: 'Dress for the job you want.',
      copy: 'Interview suit rentals & pro headshots. Same-day fitting in Port of Spain.',
      cta: 'Book a fitting'
    },
    techhub: {
      brand: 'TechHub Computers', audience: 'Employer portal',
      grad: 'linear-gradient(118deg,#0F766E,#0891B2)', art: 'laptop',
      burst: 'BUSINESS LEASING',
      title: 'New team? New machines.',
      copy: 'Laptops, desktops & printers with island-wide delivery and 3-year support.',
      cta: 'Get a quote'
    },
    islandoffice: {
      brand: 'Island Office Supplies', audience: 'Employer portal',
      grad: 'linear-gradient(118deg,#0369A1,#38BDF8)', art: 'office',
      burst: null,
      title: 'Stock the office, skip the errands.',
      copy: 'Furniture, stationery & breakroom supplies. Next-day corporate delivery.',
      cta: 'Open an account'
    },
    skypath: {
      brand: 'SkyPath Travel', audience: 'Candidate portal',
      grad: 'linear-gradient(118deg,#0284C7,#6366F1)', art: 'plane',
      burst: null,
      title: 'Relocating for work?',
      copy: 'Discounted fares & baggage bundles for placed candidates heading abroad.',
      cta: 'See fares'
    }
  };

  window.adUnit = function (key, opts) {
    const c = window.AD_CAMPAIGNS[key];
    if (!c) return '';
    opts = opts || {};
    const click = opts.onclick || "window.toast && toast('Sponsored link — the advertiser\\'s website would open')";
    return `
    <div class="ad ${opts.cls || ''}" style="background:${c.grad}">
      <span class="ad-tag">Ad</span>
      ${c.burst ? '<span class="ad-burst">' + c.burst + '</span>' : ''}
      <div class="ad-copy" ${c.burst ? 'style="padding-top:34px"' : ''}>
        <span class="ad-brand"><span class="bdot"><svg width="11" height="11" viewBox="0 0 24 24" fill="${c.grad.match(/#[0-9A-F]{6}/i)[0]}"><circle cx="12" cy="12" r="10"/></svg></span>${c.brand}</span>
        <h4>${c.title}</h4>
        <p>${c.copy}</p>
        <button class="ad-cta" onclick="${click}">${c.cta}</button>
      </div>
      <div class="ad-art">${ART[c.art] || ''}</div>
    </div>`;
  };
})();
