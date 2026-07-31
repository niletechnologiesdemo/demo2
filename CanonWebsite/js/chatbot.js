/* ============ Canon House Assistant ============
   Self-contained site chatbot. Knowledge base is built from the
   content of every page; answers link visitors to the right page
   and section. Anything product-related routes to Dorothy and the
   PromoPlace catalogue. No external services required. */
(function () {
  'use strict';

  var CATALOG_URL = 'https://www.promoplace.com/6598';
  var DOROTHY = 'dplatter@thecanonhouse.com';
  var STEVE = 'steve@thecanonhouse.com';
  var PHONE = '+1.314.266.3361';

  /* ---------- Knowledge base ---------- */
  /* strong: phrases (worth 4 each) — keywords: single tokens (worth 1) */
  var INTENTS = [
    {
      id: 'products',
      strong: ['promotional product', 'promotional products', 'logo merchandise', 'promo product', 'branded clothing', 'ad specialties', 'ad specialities', 'hats and caps', 'coolers and mugs', 'sports bags', 'backpacks', 'incentive program', 'product catalog', 'product catalogue'],
      keywords: ['product', 'products', 'merchandise', 'merch', 'swag', 'promo', 'promotional', 'catalog', 'catalogue', 'awards', 'award', 'trophies', 'trophy', 'bags', 'bag', 'backpack', 'backpacks', 'clothing', 'apparel', 'shirts', 'shirt', 'polo', 'hats', 'hat', 'caps', 'cap', 'mugs', 'mug', 'coolers', 'cooler', 'drinkware', 'gifts', 'gift', 'giveaways', 'giveaway', 'branded', 'logo', 'incentives', 'reunions', 'dorothy'],
      html: '<p>For anything promotional — branded products, logo merchandise, awards, apparel, custom sourcing and your <b>exclusive pricing</b> — please contact <b>Dorothy Platter</b> at <a class="chb-inline" href="mailto:' + DOROTHY + '">' + DOROTHY + '</a>.</p><p>You can also browse our full product catalogue (prices shown are retail only):</p>',
      links: [
        { t: 'Email Dorothy', href: 'mailto:' + DOROTHY + '?subject=Promotional%20Products%20Enquiry', ext: true },
        { t: 'Browse Product Catalogue', href: CATALOG_URL, ext: true },
        { t: 'Promotional Products Page', href: 'logo-merchandise.html' }
      ]
    },
    {
      id: 'meeting-production',
      strong: ['meeting production', 'event production', 'meeting and event', 'corporate meeting', 'produce my meeting', 'meeting planner'],
      keywords: ['meeting', 'meetings', 'event', 'events', 'conference', 'conferences', 'corporate', 'broadway', 'television', 'produce', 'production'],
      html: '<p><b>Meeting &amp; Event Production</b> is what we do best — over 50 years of production experience from Broadway and Television to Corporate Meetings, for the simplest or the most complex event.</p><p>We cover Audio Visual Support, Graphics and PowerPoint, Staging Design &amp; Construction, and Creative Services.</p>',
      links: [
        { t: 'Meeting & Event Production', href: 'services.html#Meeting' },
        { t: 'Plan Your Event', href: 'contact.html' }
      ]
    },
    {
      id: 'staging',
      strong: ['stage set', 'set design', 'pipe and drape', 'trade show', 'trade shows', 'hybrid meeting', 'set construction'],
      keywords: ['staging', 'stage', 'sets', 'tradeshow', 'tradeshows', 'rentals', 'labor', 'logistics', 'transport', 'hybrid', 'online'],
      html: '<p>We offer <b>complete staging services</b> for meetings and tradeshows — we design the set and stage, and build it too. AV equipment rentals, full labor support, transport/logistics, set design &amp; construction, and price-saving technologies for in-person, hybrid or online meetings.</p><p>Also worth a look: our <b>FastSET</b> system delivers hard sets at pipe-and-drape prices.</p>',
      links: [
        { t: 'Staging Services', href: 'services.html#Staging' },
        { t: 'FastSET System', href: 'experience-value.html#fastset' }
      ]
    },
    {
      id: 'creative',
      strong: ['script writing', 'speech coaching', 'talent booking', 'creative services'],
      keywords: ['creative', 'script', 'scripts', 'speech', 'coaching', 'talent', 'design', 'direction', 'powerpoint', 'graphics'],
      html: '<p>Our <b>Creative</b> team helps make simple meetings and complex conferences worth your audience’s time: experiences in/out of the ballroom, design and direction, script writing, speech coaching, talent booking, and awards &amp; incentives.</p>',
      links: [{ t: 'Creative Services', href: 'services.html#Creative' }]
    },
    {
      id: 'production-media',
      strong: ['video production', 'post production', 'post-production', 'name entertainment', 'guest speaker', 'guest speakers', 'live infotainment'],
      keywords: ['video', 'videos', 'media', 'filming', 'entertainment', 'entertainer', 'speakers', 'speaker', 'singers', 'dancers', 'comedy', 'illusionists', 'performers', 'infotainment', 'software'],
      html: '<p>Our <b>Production</b> experience spans Corporate theater, Broadway and Network Television worldwide: video production, post-production, Live INFOtainment, presentation technologies, specialty software programming, <b>Name Entertainment</b> and <b>Guest Speakers</b>.</p><p>We can bring in singers and dancers from Broadway, comedy troupes, illusionists — anything your meeting needs to be memorable.</p>',
      links: [
        { t: 'Production Services', href: 'services.html#Production' },
        { t: 'Watch Our Videos', href: 'experience-value.html#innovation-video' }
      ]
    },
    {
      id: 'av',
      strong: ['av solutions', 'audio visual', 'av equipment', 'led wall'],
      keywords: ['av', 'audio', 'visual', 'sound', 'lighting', 'lights', 'projector', 'projection', 'led'],
      html: '<p>We provide full <b>AV Solutions</b> — audio visual support and equipment, lighting, LED walls and presentation technologies — backed by 50 years of broadcast-standard production experience.</p>',
      links: [
        { t: 'Our Services', href: 'services.html' },
        { t: 'Décor, Lights & Structures Guide', href: 'downloads.html' }
      ]
    },
    {
      id: 'softset',
      strong: ['softset', 'soft set', 'spandex set'],
      keywords: ['spandex', 'aluminum', 'lightweight', 'transformable'],
      html: '<p><b>SoftSET</b> — spandex forms on aluminum frames make a set system that is easily transformable, lightweight, time-saving and budget-saving. It gives a big look for the audience, changes day-to-day or speaker-to-speaker, and collapses to ship small. Recently proven at meetings in Mexico, Monaco and Puerto Rico.</p>',
      links: [{ t: 'SoftSET Details', href: 'experience-value.html#softset' }]
    },
    {
      id: 'fastset',
      strong: ['fastset', 'fast set', 'hard set', 'hard sets'],
      keywords: ['hardcover', 'affordable', 'snaps', 'velcro', 'fascia'],
      html: '<p><b>FastSET</b> — hard sets at pipe-and-drape prices. Standard hard sets cost 4–10× the cost of pipe and drape; our square aluminum pipe system snaps together fast, packs light, and takes fascia and banners with Velcro. Invented for a tight Miami Beach venue and perfected since.</p>',
      links: [{ t: 'FastSET Details', href: 'experience-value.html#fastset' }]
    },
    {
      id: 'infopods',
      strong: ['infopods', 'info pods', 'out of the ballroom', 'outside the ballroom'],
      keywords: ['interactive', 'trivia', 'teambuilding', 'breaks', 'foyer', 'breakout'],
      html: '<p><b>INFOpods – Interactive</b> — create inviting areas outside the ballroom at breaks and meals: clearly differentiated zones for relaxation, fun, information, trivia and teambuilding, using old and new display technologies with interactivity that draws your audience in.</p>',
      links: [{ t: 'INFOpods Details', href: 'experience-value.html#infopods' }]
    },
    {
      id: 'value',
      strong: ['experience and value', 'value page', 'proprietary methods', 'innovations'],
      keywords: ['value', 'innovation', 'proprietary', 'homegrown'],
      html: '<p>Our <b>Value</b> page covers proprietary methods and homegrown innovations that give your meeting a bigger look, a smaller footprint, and a better number at the bottom of the page:</p><p><b>SoftSET</b> · <b>FastSET</b> · <b>INFOpods – Interactive</b> — plus our innovation videos.</p>',
      links: [
        { t: 'SoftSET', href: 'experience-value.html#softset' },
        { t: 'FastSET', href: 'experience-value.html#fastset' },
        { t: 'INFOpods', href: 'experience-value.html#infopods' },
        { t: 'Innovation Videos', href: 'experience-value.html#innovation-video' }
      ]
    },
    {
      id: 'videos',
      strong: ['innovation in action', 'laser show', 'mark walberg', 'holodisplay', 'got dances', 'acapella', 'watch videos'],
      keywords: ['watch', 'youtube', 'laser', 'hologram'],
      html: '<p>Our <b>Innovation in Action</b> videos: Laser Show Chartered Ship, Meeting Host Mark Walberg, HoloDisplay, GOT Dances, and Acapella.</p>',
      links: [{ t: 'Watch the Videos', href: 'experience-value.html#innovation-video' }]
    },
    {
      id: 'screen-size',
      strong: ['screen size', 'what size screen', 'sightlines', 'screen width'],
      keywords: ['screen', 'screens', 'sizing', 'sightline'],
      html: '<p>Rule of thumb: measure from the screen to the back row and <b>divide by six</b> for your minimum screen width, then set your front row and screen height for clear sightlines. Our free guide covers the details and what it means for your graphics.</p>',
      links: [{ t: 'Screen Size & Graphics Guide', href: 'downloads.html' }]
    },
    {
      id: 'downloads',
      strong: ['free guides', 'meeting basics', 'presentation tips', 'download pdf'],
      keywords: ['download', 'downloads', 'pdf', 'pdfs', 'guide', 'guides', 'checklist', 'tips', 'resources'],
      html: '<p>Fifty years of meeting production boiled down into short, practical guides — free to download and share with your team:</p><p><b>Meeting Basics</b> (presentation tips) · <b>Décor, Lights &amp; Structures</b> (the out-of-ballroom experience) · <b>Screen Size &amp; Graphics Content</b> (sizing rules of thumb).</p>',
      links: [{ t: 'Go to Downloads', href: 'downloads.html' }]
    },
    {
      id: 'gallery',
      strong: ['your work', 'past events', 'portfolio', 'case studies', 'photo gallery'],
      keywords: ['gallery', 'photos', 'pictures', 'pics', 'work', 'projects', 'spectrum', 'tsv', 'gea', 'summit'],
      html: '<p>Have a look through our <b>Gallery</b> — technical excellence in every frame, including live events like Spectrum ’24, TSV 25 and the GEA Summit. Click any image for details and a larger view.</p>',
      links: [{ t: 'View the Gallery', href: 'gallery.html' }]
    },
    {
      id: 'contact',
      strong: ['contact us', 'get in touch', 'talk to someone', 'get a quote', 'request a quote', 'speak to', 'reach you', 'phone number', 'email address'],
      keywords: ['contact', 'quote', 'quotes', 'call', 'phone', 'email', 'enquiry', 'inquiry', 'talk', 'steve', 'reach', 'hire', 'book', 'booking'],
      html: '<p>We’d love to talk. Email <a class="chb-inline" href="mailto:' + STEVE + '">' + STEVE + '</a> or call <b>' + PHONE + '</b> — or send an inquiry through the form and one of our meeting and production specialists will contact you within 24 business hours.</p><p>(For promotional products, contact <b>Dorothy</b> at <a class="chb-inline" href="mailto:' + DOROTHY + '">' + DOROTHY + '</a>.)</p>',
      links: [
        { t: 'Contact Page', href: 'contact.html' },
        { t: 'Email Steve', href: 'mailto:' + STEVE, ext: true }
      ]
    },
    {
      id: 'location',
      strong: ['where are you', 'your address', 'your office', 'located', 'saint charles', 'st louis', 'st. louis'],
      keywords: ['address', 'location', 'office', 'mailing', 'missouri', 'fallon', 'where'],
      html: '<p><b>Mailing Address:</b> 703 Rolling Wind Drive, O’Fallon, Missouri 63368 USA</p><p><b>Office Address:</b> 2745 West Clay St., Suites J &amp; K, Saint Charles, Missouri 63301 USA</p><p>And we work anywhere — around the corner or around the globe.</p>',
      links: [{ t: 'Contact Page', href: 'contact.html' }]
    },
    {
      id: 'about',
      strong: ['about you', 'about canon house', 'who are you', 'your company', 'your experience', 'how long', 'years of experience'],
      keywords: ['about', 'company', 'history', 'who', 'experience', 'firm', 'canon'],
      html: '<p><b>The Canon House, Ltd.</b> is an internationally experienced firm of meeting production, promotions and staging specialists — Design, Staging, AV equipment, Labor and Promotional Products.</p><p>Over 50 years of production experience from Broadway and Television to Corporate Meetings. When the house lights go down and your CEO stands center stage — <b>experience counts</b>.</p>',
      links: [
        { t: 'Our Services', href: 'services.html' },
        { t: 'See Our Work', href: 'gallery.html' }
      ]
    },
    {
      id: 'pricing',
      strong: ['how much', 'price list', 'pricing', 'cost of', 'budget for'],
      keywords: ['price', 'prices', 'cost', 'costs', 'budget', 'rates', 'expensive', 'cheap'],
      html: '<p>Every meeting is different, so we quote per project — and we’re proud of staying <b>on time and on budget</b>. Innovations like SoftSET and FastSET are designed specifically to save you money.</p><p>For a production quote, contact <b>Steve</b> at <a class="chb-inline" href="mailto:' + STEVE + '">' + STEVE + '</a>. For promotional product pricing, contact <b>Dorothy</b> at <a class="chb-inline" href="mailto:' + DOROTHY + '">' + DOROTHY + '</a> (catalogue prices are retail only — ask her for your exclusive pricing).</p>',
      links: [
        { t: 'Contact Us', href: 'contact.html' },
        { t: 'Product Catalogue', href: CATALOG_URL, ext: true }
      ]
    },
    {
      id: 'services-overview',
      strong: ['your services', 'what do you do', 'what do you offer', 'what can you do', 'services page', 'list of services'],
      keywords: ['services', 'service', 'offer', 'capabilities', 'help'],
      html: '<p>We deliver high impact across four areas:</p><p><b>01 Meeting &amp; Event Production</b> · <b>02 Staging</b> · <b>03 Creative</b> · <b>04 Production</b> — plus <b>05 Ad Specialties &amp; Logo Merchandise</b>.</p>',
      links: [
        { t: 'Meeting & Event Production', href: 'services.html#Meeting' },
        { t: 'Staging', href: 'services.html#Staging' },
        { t: 'Creative', href: 'services.html#Creative' },
        { t: 'Production', href: 'services.html#Production' },
        { t: 'Promotional Products', href: 'logo-merchandise.html' }
      ]
    },
    {
      id: 'greeting',
      strong: ['good morning', 'good afternoon', 'good evening'],
      keywords: ['hi', 'hello', 'hey', 'howdy', 'greetings'],
      html: '<p>Hello! I’m the Canon House assistant. Ask me anything about our meeting production, staging, creative services, promotional products or free guides — I’ll point you to the right place.</p>',
      chips: true
    },
    {
      id: 'thanks',
      strong: ['thank you', 'thanks a lot'],
      keywords: ['thanks', 'thx', 'bye', 'goodbye', 'great', 'awesome', 'perfect'],
      html: '<p>You’re welcome! If you need anything else, I’m right here — or reach us directly at <a class="chb-inline" href="mailto:' + STEVE + '">' + STEVE + '</a> / ' + PHONE + '.</p>'
    }
  ];

  var FALLBACK = {
    html: '<p>I’m not sure I caught that — but here’s where I can help. Try one of these, or rephrase your question:</p>',
    chips: true
  };

  var CHIPS = [
    { t: 'Our Services', q: 'What services do you offer?' },
    { t: 'Promotional Products', q: 'I’m interested in promotional products' },
    { t: 'SoftSET & FastSET', q: 'Tell me about your value innovations' },
    { t: 'Free Guides', q: 'What free guides can I download?' },
    { t: 'See Your Work', q: 'Can I see your past events?' },
    { t: 'Contact Info', q: 'How do I contact you?' }
  ];

  /* ---------- Matching engine ---------- */
  function normalize(s) {
    return s.toLowerCase().replace(/[^a-z0-9\s'&.-]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function match(input) {
    var text = normalize(input);
    if (!text) return null;
    var tokens = text.split(' ');
    var best = null;
    var bestScore = 0;
    for (var i = 0; i < INTENTS.length; i++) {
      var intent = INTENTS[i];
      var score = 0;
      var j;
      for (j = 0; j < intent.strong.length; j++) {
        if (text.indexOf(intent.strong[j]) !== -1) score += 4;
      }
      for (j = 0; j < tokens.length; j++) {
        if (intent.keywords.indexOf(tokens[j]) !== -1) score += 1;
      }
      if (score > bestScore) { bestScore = score; best = intent; }
    }
    return bestScore >= 1 ? best : null;
  }

  /* ---------- UI ---------- */
  var ICONS = {
    chat: '<svg class="chb-chat-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><svg class="chb-close-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    badge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 1 7 7v1h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1a7 7 0 0 1-14 0H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h1V9a7 7 0 0 1 7-7z"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>'
  };

  var msgsEl, inputEl, panelEl, launcherEl;
  var history = [];

  function loadHistory() {
    try {
      var raw = sessionStorage.getItem('chbHistory');
      if (raw) history = JSON.parse(raw);
    } catch (e) { history = []; }
  }
  function saveHistory() {
    try { sessionStorage.setItem('chbHistory', JSON.stringify(history.slice(-40))); } catch (e) {}
  }

  function esc(s) {
    var d = document.createElement('div');
    d.appendChild(document.createTextNode(s));
    return d.innerHTML;
  }

  function linksHtml(links) {
    if (!links || !links.length) return '';
    var out = '<span class="chb-links">';
    for (var i = 0; i < links.length; i++) {
      var l = links[i];
      var extAttr = l.ext ? ' target="_blank" rel="noopener"' : '';
      out += '<a href="' + l.href + '"' + extAttr + '>' + l.t + (l.ext ? ICONS.external : ICONS.arrow) + '</a>';
    }
    return out + '</span>';
  }

  function chipsHtml() {
    var out = '<div class="chb-chips">';
    for (var i = 0; i < CHIPS.length; i++) {
      out += '<button type="button" data-q="' + esc(CHIPS[i].q) + '">' + CHIPS[i].t + '</button>';
    }
    return out + '</div>';
  }

  function renderMsg(who, html, skipSave) {
    var el = document.createElement('div');
    el.className = 'chb-msg chb-' + who;
    el.innerHTML = html;
    msgsEl.appendChild(el);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    if (!skipSave) {
      history.push({ who: who, html: html });
      saveHistory();
    }
  }

  function renderChips(skipSave) {
    var wrap = document.createElement('div');
    wrap.innerHTML = chipsHtml();
    var el = wrap.firstChild;
    msgsEl.appendChild(el);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    if (!skipSave) {
      history.push({ who: 'chips' });
      saveHistory();
    }
  }

  function showTyping() {
    var el = document.createElement('div');
    el.className = 'chb-typing';
    el.innerHTML = '<i></i><i></i><i></i>';
    msgsEl.appendChild(el);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return el;
  }

  function answer(query) {
    var intent = match(query);
    var typing = showTyping();
    setTimeout(function () {
      typing.parentNode && typing.parentNode.removeChild(typing);
      if (intent) {
        renderMsg('bot', intent.html + linksHtml(intent.links));
        if (intent.chips) renderChips();
      } else {
        renderMsg('bot', FALLBACK.html + linksHtml([
          { t: 'Contact Us', href: 'contact.html' }
        ]));
        renderChips();
      }
    }, 450 + Math.random() * 350);
  }

  function submit(text) {
    var q = (text || '').trim();
    if (!q) return;
    renderMsg('user', esc(q));
    answer(q);
  }

  /* The site uses GSAP ScrollSmoother, which breaks native #hash jumps —
     scroll to sections through the smoother (fallback: scrollIntoView). */
  function scrollToHash(hash) {
    if (!hash || hash.length < 2) return;
    var el;
    try { el = document.getElementById(hash.slice(1)); } catch (e) { el = null; }
    if (!el) return;
    var smoother = (window.ScrollSmoother && window.ScrollSmoother.get) ? window.ScrollSmoother.get() : null;
    if (smoother) smoother.scrollTo(el, true, 'top 110px');
    else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function currentPage() {
    var p = location.pathname.split('/').pop();
    return p === '' ? 'index.html' : p;
  }

  function setOpen(open) {
    panelEl.classList.toggle('chb-open', open);
    launcherEl.classList.toggle('chb-open', open);
    launcherEl.setAttribute('aria-expanded', open ? 'true' : 'false');
    try { sessionStorage.setItem('chbOpen', open ? '1' : '0'); } catch (e) {}
    if (open) inputEl.focus();
  }

  function build() {
    launcherEl = document.createElement('button');
    launcherEl.id = 'chb-launcher';
    launcherEl.type = 'button';
    launcherEl.setAttribute('aria-label', 'Chat with the Canon House assistant');
    launcherEl.setAttribute('aria-expanded', 'false');
    launcherEl.innerHTML = ICONS.chat;

    panelEl = document.createElement('div');
    panelEl.id = 'chb-panel';
    panelEl.setAttribute('role', 'dialog');
    panelEl.setAttribute('aria-label', 'Canon House assistant');
    panelEl.innerHTML =
      '<div class="chb-head">' +
        '<span class="chb-head-badge">' + ICONS.badge + '</span>' +
        '<span class="chb-head-titles"><h4>Canon House Assistant</h4><span>PRODUCTIONS · PROMOTIONS · STAGING</span></span>' +
        '<button type="button" class="chb-head-x" aria-label="Close chat">' + ICONS.x + '</button>' +
      '</div>' +
      '<div class="chb-msgs"></div>' +
      '<form class="chb-inputbar">' +
        '<input type="text" placeholder="Ask about services, products, staging..." aria-label="Type your question" maxlength="300">' +
        '<button type="submit" aria-label="Send">' + ICONS.send + '</button>' +
      '</form>';

    document.body.appendChild(launcherEl);
    document.body.appendChild(panelEl);

    msgsEl = panelEl.querySelector('.chb-msgs');
    inputEl = panelEl.querySelector('input');

    launcherEl.addEventListener('click', function () {
      setOpen(!panelEl.classList.contains('chb-open'));
    });
    panelEl.querySelector('.chb-head-x').addEventListener('click', function () { setOpen(false); });
    panelEl.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault();
      submit(inputEl.value);
      inputEl.value = '';
    });
    msgsEl.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('button[data-q]') : null;
      if (btn) { submit(btn.getAttribute('data-q')); return; }
      /* Same-page section links: scroll through the smoother instead of reloading */
      var a = e.target.closest ? e.target.closest('a[href]') : null;
      if (a) {
        var href = a.getAttribute('href') || '';
        var hashIdx = href.indexOf('#');
        if (hashIdx !== -1 && href.indexOf('//') === -1) {
          var page = href.slice(0, hashIdx);
          if (page === '' || page === currentPage()) {
            e.preventDefault();
            scrollToHash(href.slice(hashIdx));
          }
        }
      }
    });

    loadHistory();
    if (history.length) {
      for (var i = 0; i < history.length; i++) {
        if (history[i].who === 'chips') renderChips(true);
        else renderMsg(history[i].who, history[i].html, true);
      }
      msgsEl.scrollTop = msgsEl.scrollHeight;
    } else {
      renderMsg('bot', '<p>Welcome to <b>The Canon House</b>! I can help you find our services, staging innovations, promotional products, free guides and contact details. What are you looking for?</p>');
      renderChips();
    }

    var wasOpen = false;
    try { wasOpen = sessionStorage.getItem('chbOpen') === '1'; } catch (e) {}
    if (wasOpen) setOpen(true);

    /* Arriving from a chatbot link on another page: honor the #hash once
       the smoother has initialized */
    if (location.hash) {
      setTimeout(function () { scrollToHash(location.hash); }, 700);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
