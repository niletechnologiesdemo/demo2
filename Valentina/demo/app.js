/* ============================================================
   Product TBD - Clickable Demo (vanilla JS SPA)
   ============================================================ */

// ---------------- Icon system (inline SVG, Feather-style) ----------------
const ICONS = {
  dashboard:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
  book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  userplus:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>',
  barchart:'<line x1="6" y1="20" x2="6" y2="14"/><line x1="12" y1="20" x2="12" y2="8"/><line x1="18" y1="20" x2="18" y2="4"/>',
  card:'<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  home:'<path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  cap:'<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.3 2.7 2.5 6 2.5s6-1.2 6-2.5v-5"/>',
  chat:'<path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/>',
  bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  search:'<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  upload:'<path d="M16 16l-4-4-4 4"/><path d="M12 12v9"/><path d="M20.4 18.4A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>',
  plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  check:'<polyline points="20 6 9 17 4 12"/>',
  file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  trash:'<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  mic:'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/>',
  send:'<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  bulb:'<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.1 14c.2-1 .65-1.74 1.4-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.75.76 1.2 1.5 1.4 2.5"/>',
  lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  shieldcheck:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
  message:'<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/>',
  trendup:'<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  arrow:'<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  refresh:'<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
  award:'<circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/>',
  alert:'<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  globe:'<circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/>',
  play:'<polygon points="6 4 20 12 6 20 6 4"/>',
  logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  eye:'<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>',
  menu:'<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
  building:'<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="7" x2="9" y2="7"/><line x1="15" y1="7" x2="15" y2="7"/><line x1="9" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="15" y2="12"/><path d="M10 22v-4h4v4"/>',
  sliders:'<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
  layers:'<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  zap:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
};
const icon = (name, cls='') => `<svg class="icn ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]||''}</svg>`;

// ---------------- State ----------------
const state = {
  role: 'public', lang: 'EN',
  documents: [
    { name:'CardioX Product Monograph.pdf', type:'Product', date:'Jun 21', size:'2.4 MB', status:'ready' },
    { name:'Battle Card: CardioX vs Competitor.pdf', type:'Battle Card', date:'Jun 21', size:'880 KB', status:'ready' },
    { name:'Dosage & Safety FAQ.pdf', type:'FAQ', date:'Jun 22', size:'1.1 MB', status:'ready' },
    { name:'Objection Handling Playbook.pdf', type:'Playbook', date:'Jun 24', size:'1.6 MB', status:'processing' },
  ],
  traits: [
    { k:'Skeptical', d:'Challenges claims, wants proof before believing benefits.' },
    { k:'Time-pressed', d:'Very little time; rewards concise, high-value messaging.' },
    { k:'Data-driven', d:'Persuaded by clinical evidence, trial data and numbers.' },
    { k:'Price-sensitive', d:'Focused on cost, budget impact and reimbursement.' },
    { k:'Relationship-led', d:'Values rapport and trust over a hard pitch.' },
    { k:'Detail-oriented', d:'Asks precise questions on dosage, safety, interactions.' },
    { k:'Risk-averse', d:'Cautious about switching; worried about side effects.' },
    { k:'Loyal to competitor', d:'Currently prescribes a rival; needs a reason to switch.' },
    { k:'Early adopter', d:'Open to innovation and new mechanisms of action.' },
    { k:'Patient-focused', d:'Frames everything around patient outcomes & quality of life.' },
  ],
  personas: [
    { id:'p1', name:'Dr. Maria Petrou', role:'Cardiologist · Busy hospital', traits:['Skeptical','Time-pressed','Data-driven'], difficulty:'Hard', status:'Active', initials:'MP' },
    { id:'p2', name:'Dr. Andreas Nikolaou', role:'GP · Suburban clinic', traits:['Relationship-led','Price-sensitive'], difficulty:'Medium', status:'Active', initials:'AN' },
    { id:'p3', name:'Dr. Elena Vasiliou', role:'Hospital pharmacist', traits:['Detail-oriented','Risk-averse'], difficulty:'Medium', status:'Active', initials:'EV' },
  ],
  team: [
    { name:'Nikos Georgiou', email:'nikos@brand.com', status:'active', last:'2h ago', plays:14 },
    { name:'Sofia Dimitriou', email:'sofia@brand.com', status:'active', last:'Yesterday', plays:9 },
    { name:'Yannis Pappas', email:'yannis@brand.com', status:'active', last:'3 days ago', plays:21 },
    { name:'Maria Ioannou', email:'maria@brand.com', status:'invited', last:'-', plays:0 },
  ],
  seatsTotal: 15, plan:'Professional', selectedPlan:'Professional', seatsBuying:15, billingCycle:'monthly', rp:null,
};

// ---------------- i18n ----------------
const I18N = {
  EN:{ nav_dashboard:'Dashboard', nav_knowledge:'Knowledge Base', nav_personas:'Personas', nav_team:'Team & Seats',
    nav_analytics:'Analytics', nav_billing:'Billing', nav_settings:'Settings', nav_home:'Home', nav_coach:'Ask the Coach',
    nav_roleplay:'Practice Roleplay', nav_history:'My History', ask_coach:'Ask the Coach', practice:'Practice Roleplay',
    start:'Start roleplay', send:'Send', coach_sub:'Get instant answers about your products', rp_sub:'Train with an AI client' },
  GR:{ nav_dashboard:'Πίνακας', nav_knowledge:'Βάση Γνώσης', nav_personas:'Πρόσωπα', nav_team:'Ομάδα & Θέσεις',
    nav_analytics:'Αναλυτικά', nav_billing:'Χρέωση', nav_settings:'Ρυθμίσεις', nav_home:'Αρχική', nav_coach:'Ρώτησε τον Coach',
    nav_roleplay:'Εξάσκηση Roleplay', nav_history:'Ιστορικό', ask_coach:'Ρώτησε τον Coach', practice:'Εξάσκηση Roleplay',
    start:'Έναρξη roleplay', send:'Αποστολή', coach_sub:'Άμεσες απαντήσεις για τα προϊόντα σου', rp_sub:'Εξασκήσου με AI πελάτη' }
};
const t = k => (I18N[state.lang][k] || I18N.EN[k] || k);

// ---------------- Helpers ----------------
const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const go = h => { location.hash = h; };
const tier = txt => `<span class="tierflag">${txt}</span>`;
function toast(msg){
  let el=$('#toast'); if(!el){el=document.createElement('div');el.id='toast';el.className='toast';document.body.appendChild(el);}
  el.innerHTML=`${icon('check')}<span>${msg}</span>`; el.classList.add('show'); clearTimeout(el._t); el._t=setTimeout(()=>el.classList.remove('show'),2200);
}
const initials = n => n.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
const diffBadge = d => d==='Hard'?'badge-red':d==='Medium'?'badge-amber':'badge-green';

// ============================================================
//  PUBLIC PAGES
// ============================================================
function publicNav(){
  return `<div class="pub-nav">
    <div class="logo-row"><img class="logo-img" src="img/logo.png" alt="Product TBD logo"> Product TBD</div>
    <div class="links"><a href="#/landing">Product</a><a href="#/plans">Pricing</a><a href="#/landing">How it works</a><a href="#/landing">Contact</a></div>
    <div style="display:flex;gap:14px;align-items:center">
      <a href="#/login" class="btn-link">Log in</a>
      <a href="#/signup" class="btn btn-primary btn-sm">Start free trial</a>
    </div>
  </div>`;
}
function ticker(){
  const items=['Cardiology','Oncology','Objection handling','Drug launches','English + Greek','MLR-approved content','HCP personas','GDPR & EU-hosted','Battle cards','Compliance-safe'];
  const row=items.map(i=>`<span class="ticker-dot"></span><span>${i}</span>`).join('');
  return `<div class="ticker"><div class="ticker-track">${row}${row}</div></div>`;
}
function Landing(){
  return {html:`<div class="public">
    ${publicNav()}
    <section class="hero"><div class="hero-inner">
        <span class="chip hero-chip">For Pharma & Medical Sales Teams</span>
        <h1>Train your medical reps with an <span>AI client</span> that never sleeps</h1>
        <p>Upload your product knowledge once. Your reps get an always-on AI coach for instant answers, plus realistic practice against lifelike AI clients.</p>
        <div class="cta"><a href="#/signup" class="btn btn-primary">Start free trial ${icon('arrow')}</a><a href="#/plans" class="btn btn-light">See pricing</a></div>
        <div class="hero-proof">
          <div class="hp-stars"><span class="s">★★★★★</span> Loved by sales trainers</div>
          <div class="hp-div"></div>
          <div class="hp-item">${icon('zap')} 7× more practice per rep</div>
          <div class="hp-item">${icon('globe')} English & Greek</div>
        </div>
    </div></section>

    ${ticker()}

    <div class="stats-band"><div class="stats-grid">
      <div class="stat-box"><div class="sv">7<em>×</em></div><div class="sl">More conversation practice per rep</div></div>
      <div class="stat-box"><div class="sv">27<em>%</em></div><div class="sl">Average lift in sales performance</div></div>
      <div class="stat-box"><div class="sv">90<em>%</em></div><div class="sl">Lower cost vs traditional training</div></div>
      <div class="stat-box"><div class="sv">14<em>+</em></div><div class="sl">Languages supported, including Greek</div></div>
    </div></div>

    <div class="sec-paper"><section class="section">
      <div class="eyebrow">The platform</div>
      <h2>One platform, two powerful tools</h2>
      <p class="sub">Everything your brand needs to onboard reps faster and sell with confidence.</p>
      <div class="grid g3">
        <div class="feature"><div class="fic">${icon('cap','icn-lg')}</div><h3>AI Guided Coaching</h3><p>Reps ask any product question and get instant, accurate answers, grounded only in your approved knowledge base, with sources cited.</p><span class="f-link">Learn more ${icon('arrow','icn-sm')}</span></div>
        <div class="feature"><div class="fic">${icon('chat','icn-lg')}</div><h3>AI Roleplay</h3><p>Build AI client personas with configurable personalities and let reps rehearse real objections in a psychologically safe space.</p><span class="f-link">Learn more ${icon('arrow','icn-sm')}</span></div>
        <div class="feature"><div class="fic">${icon('lock','icn-lg')}</div><h3>Secure Knowledge Base</h3><p>Each brand's documents stay private and isolated. Answers never leak across brands and never go beyond your approved content.</p><span class="f-link">Learn more ${icon('arrow','icn-sm')}</span></div>
      </div>
    </section></div>

    <div class="sec-cream"><section class="section"><div class="showcase">
      <div class="sc-copy">
        <div class="eyebrow" style="text-align:left">See it in action</div>
        <h2>Answers your reps can trust, instantly</h2>
        <p>Every answer is grounded only in your approved documents and cites its source, so your reps get accurate, compliant information in the moment.</p>
        <div class="sc-list">
          <div><span class="ico">${icon('check')}</span> Grounded in your knowledge base, never the open web</div>
          <div><span class="ico">${icon('check')}</span> A source citation on every single answer</div>
          <div><span class="ico">${icon('check')}</span> Speaks your reps' language, English and Greek</div>
        </div>
        <a href="#/signup" class="btn btn-primary">Try the coach ${icon('arrow','icn-sm')}</a>
      </div>
      <div class="browser">
        <div class="bbar"><i></i><i></i><i></i><span class="burl">app.producttbd.com</span></div>
        <div class="bbody">
          <div class="sc-msg bot"><div class="a"><img src="img/logo.png" alt=""></div><div class="b">Ask me anything about your products. I answer only from your approved documents.</div></div>
          <div class="sc-msg me"><div class="a">NG</div><div class="b">What's our key differentiator vs the competitor?</div></div>
          <div class="sc-msg bot"><div class="a"><img src="img/logo.png" alt=""></div><div class="b">A 27% relative risk reduction in major events (PROVE-IT), plus once-daily dosing.<br><span class="sc-cite">${icon('file')} Battle Card v2</span></div></div>
        </div>
      </div>
    </div></section></div>

    <div class="sec-tint"><section class="section">
      <div class="eyebrow">How it works</div>
      <h2>From zero to a trained AI client in minutes</h2>
      <p class="sub">Three simple steps to get your whole team practising.</p>
      <div class="steps">
        <div class="step"><div class="num">1</div><h3>Upload knowledge</h3><p class="muted">Add PDFs, USPs, battle cards and FAQs to your secure base.</p></div>
        <div class="step"><div class="num">2</div><h3>Build personas</h3><p class="muted">Pick personality traits to shape your AI clients.</p></div>
        <div class="step"><div class="num">3</div><h3>Reps practice</h3><p class="muted">Your team coaches and roleplays, unlimited and anytime.</p></div>
      </div>
    </section></div>

    <div class="sec-paper"><section class="section"><div class="testi">
      <div class="stars">★★★★★</div>
      <p class="quote">"Our new reps used to take months to sound confident. Now they rehearse real objections before they ever walk into a clinic, and it <span>shows in the numbers</span>."</p>
      <div class="who"><div class="av">DK</div><div style="text-align:left"><b>Dr. Despina Konstantinou</b><span>Head of Sales Training, Pharma Brand</span></div></div>
    </div></section></div>

    <div class="sec-cream"><section class="section">
      <div class="eyebrow">Pricing</div>
      <h2>Simple, transparent pricing</h2>
      <p class="sub">Pick a plan that fits your team. Cancel anytime.</p>
      ${planGrid(false)}
      <div class="center mt24"><a href="#/plans" class="btn btn-dark">View full pricing ${icon('arrow')}</a></div>
    </section></div>

    <div class="cta-band"><div class="cb-in">
      <h2>Ready to train your reps?</h2>
      <p>Spin up your secure knowledge base and your first AI client in minutes. No card required.</p>
      <div class="center gap12" style="display:flex"><a href="#/signup" class="btn btn-primary">Start free trial ${icon('arrow')}</a><a href="#/plans" class="btn btn-light">See pricing</a></div>
    </div></div>

    <footer class="pub-footer">
      <div class="pf-grid">
        <div class="pf-brand"><div class="logo-row"><img class="logo-img" src="img/logo.png" alt="Product TBD logo"> Product TBD</div><p>The AI sales trainer for medical reps. Coach, roleplay and ramp up faster, all grounded in your brand's approved content.</p></div>
        <div class="pf-col"><h5>Product</h5><a href="#/landing">Features</a><a href="#/plans">Pricing</a><a href="#/login">Log in</a><a href="#/signup">Start free trial</a></div>
        <div class="pf-col"><h5>Company</h5><a href="#/landing">About</a><a href="#/landing">Contact</a><a href="#/landing">Careers</a></div>
        <div class="pf-col"><h5>Legal</h5><a href="#/landing">Privacy (GDPR)</a><a href="#/landing">Terms of service</a><a href="#/landing">Security</a></div>
      </div>
      <div class="pf-bottom"><span>© 2026 Product TBD · A product by Valentina Kordi</span><span>EU-hosted · GDPR compliant</span></div>
    </footer>
  </div>`};
}
function planData(){
  return [
    {name:'Starter', price:'€390', seats:'up to 5 seats', feat:[[1,'AI Guided Coaching'],[1,'AI Roleplay (text)'],[1,'1 knowledge base'],[1,'~40 roleplays / seat / mo'],[0,'Voice mode'],[0,'Scoring & feedback'],[0,'Analytics & SSO']]},
    {name:'Professional', price:'€890', seats:'up to 15 seats', featured:true, feat:[[1,'Everything in Starter'],[1,'Voice mode (EN + GR)'],[1,'Scoring & feedback'],[1,'Multiple personas'],[1,'~80 roleplays / seat / mo'],[0,'Analytics dashboard'],[0,'SSO & priority support']]},
    {name:'Enterprise', price:'€2,000+', seats:'30+ seats', feat:[[1,'Everything in Professional'],[1,'Analytics dashboard'],[1,'Higher / unlimited usage'],[1,'SSO & role controls'],[1,'Onboarding assistance'],[1,'Priority support'],[1,'Custom integrations']]},
  ];
}
function planGrid(selectable){
  return `<div class="plan-grid">${planData().map(p=>`
    <div class="plan ${p.featured?'featured':''} ${selectable&&state.selectedPlan===p.name?'selected':''}" ${selectable?`data-action="selplan" data-plan="${p.name}"`:''}>
      ${p.featured?'<div class="pop">Most popular</div>':''}
      <h3>${p.name}</h3><div class="muted small">${p.seats}</div>
      <div class="price">${p.price}<small>/mo</small></div>
      <ul>${p.feat.map(f=>`<li>${f[0]?icon('check','yes'):icon('x','no')} ${f[1]}</li>`).join('')}</ul>
      ${selectable?`<button class="btn ${state.selectedPlan===p.name?'btn-primary':'btn-ghost'} btn-block">${state.selectedPlan===p.name?'Selected':'Select'}</button>`:`<a href="#/signup" class="btn ${p.featured?'btn-primary':'btn-ghost'} btn-block">Choose ${p.name}</a>`}
    </div>`).join('')}</div>`;
}
function Plans(){
  return {html:`<div class="public">${publicNav()}
    <section class="section">
      <h2>Choose your plan</h2>
      <p class="sub">All plans include the secure knowledge base, AI coaching and roleplay. Upgrade anytime.</p>
      ${planGrid(true)}
      <div class="center mt24"><a href="#/checkout" class="btn btn-primary">Continue with ${state.selectedPlan} ${icon('arrow')}</a></div>
      <p class="center muted small mt16">One-time onboarding help available (€500-€1,500). Annual billing saves 17%.</p>
    </section></div>`,
  after(){ $$('[data-action="selplan"]').forEach(c=>c.onclick=()=>{state.selectedPlan=c.dataset.plan;state.seatsBuying=c.dataset.plan==='Starter'?5:c.dataset.plan==='Professional'?15:30;render();}); }};
}

// ---------------- Auth ----------------
function authAside(){
  return `<div class="auth-aside">
    <div class="logo-row" style="color:#fff;margin-bottom:30px"><img class="logo-img" src="img/logo.png" alt="Product TBD logo"> Product TBD</div>
    <h2>The AI sales trainer for medical reps.</h2>
    <p>Practice real conversations, get instant product answers, and ramp up faster, all grounded in your brand's approved content.</p>
    <div class="qa">
      <div>${icon('check')} 7× more conversation practice per rep</div>
      <div>${icon('check')} Answers grounded in your knowledge base</div>
      <div>${icon('check')} Available in English & Greek</div>
    </div>
  </div>`;
}
function Signup(){
  return {html:`<div class="auth-wrap">${authAside()}
    <div class="auth-main"><div class="auth-card">
      <h1>Create your brand account</h1>
      <p class="muted mb24">Start your free trial. No card required.</p>
      <div class="field"><label>Work email</label><input class="input" placeholder="you@brand.com"></div>
      <div class="field"><label>Password</label><input class="input" type="password" placeholder="••••••••"><div class="strength"><i></i></div><div class="tiny muted mt8">Strong password</div></div>
      <div class="field"><label>Full name</label><input class="input" placeholder="Your name"></div>
      <div class="row"><div class="field col"><label>Company / Brand</label><input class="input" placeholder="Brand A Pharma"></div>
      <div class="field col"><label>Country</label><select><option>Greece</option><option>Cyprus</option><option>Germany</option><option>Other</option></select></div></div>
      <label class="checkbox mb16"><input type="checkbox" checked> I agree to the Terms & Privacy Policy (GDPR)</label>
      <a href="#/plans" class="btn btn-primary btn-block">Create account ${icon('arrow')}</a>
      <p class="center muted small mt16">Already have an account? <a href="#/login" class="btn-link">Log in</a></p>
    </div></div></div>`};
}
function Login(){
  return {html:`<div class="auth-wrap">${authAside()}
    <div class="auth-main"><div class="auth-card">
      <h1>Welcome back</h1>
      <p class="muted mb24">Log in to your workspace.</p>
      <div class="field"><label>Email</label><input class="input" placeholder="you@brand.com"></div>
      <div class="field"><label>Password</label><input class="input" type="password" placeholder="••••••••"></div>
      <div class="between mb16"><label class="checkbox"><input type="checkbox"> Remember me</label><a href="#/login" class="btn-link small">Forgot password?</a></div>
      <p class="small muted mb8">Log in as:</p>
      <div class="row gap12"><button class="btn btn-dark col" data-action="login-admin">Brand Admin</button><button class="btn btn-ghost col" data-action="login-rep">Medical Rep</button></div>
      <p class="center muted small mt16">New here? <a href="#/signup" class="btn-link">Create an account</a></p>
    </div></div></div>`,
  after(){
    $('[data-action="login-admin"]').onclick=()=>{state.role='admin';go('#/admin/dashboard');};
    $('[data-action="login-rep"]').onclick=()=>{state.role='rep';go('#/rep/home');};
  }};
}

// ---------------- Checkout ----------------
function Checkout(){
  const price = state.selectedPlan==='Starter'?390:state.selectedPlan==='Professional'?890:2000;
  const onboard=750, vat=Math.round((price+onboard)*0.24);
  return {html:`<div class="public">${publicNav()}
    <section class="section">
      <h2>Checkout ${tier('Opt 3 · automated')}</h2>
      <p class="sub">Options 1-2: this step becomes “Request activation” and Valentina sends an invoice.</p>
      <div class="row" style="align-items:flex-start;max-width:900px;margin:0 auto">
        <div class="card card-pad col" style="flex:1.4">
          <h3 class="mb16">Payment details</h3>
          <div class="field"><label>Card number</label><input class="input" placeholder="4242 4242 4242 4242"></div>
          <div class="row"><div class="field col"><label>Expiry</label><input class="input" placeholder="12 / 28"></div><div class="field col"><label>CVC</label><input class="input" placeholder="123"></div></div>
          <div class="field"><label>VAT / Company tax ID</label><input class="input" placeholder="EL123456789"></div>
          <div class="field"><label>Billing email</label><input class="input" placeholder="billing@brand.com"></div>
          <button class="btn btn-primary btn-block" data-action="pay">${icon('lock')} Pay & activate</button>
          <p class="center tiny muted mt8">Secured by Stripe · EU-hosted</p>
        </div>
        <div class="card card-pad col" style="position:sticky;top:90px">
          <h3 class="mb16">Order summary</h3>
          <div class="between mb8"><span>${state.selectedPlan} plan</span><b>€${price}</b></div>
          <div class="between mb8"><span class="muted">${state.seatsBuying} seats · ${state.billingCycle}</span><span class="muted">incl.</span></div>
          <div class="between mb8"><span>Onboarding (one-time)</span><b>€${onboard}</b></div>
          <div class="between mb8"><span class="muted">VAT (24%)</span><span>€${vat}</span></div>
          <hr style="border:none;border-top:1px solid var(--line);margin:14px 0">
          <div class="between" style="font-size:18px"><b>Total today</b><b style="color:var(--orange)">€${price+onboard+vat}</b></div>
          <p class="tiny muted mt16">Then €${price}/mo. Cancel anytime.</p>
        </div>
      </div>
    </section></div>`,
  after(){ $('[data-action="pay"]').onclick=()=>{state.role='admin';toast('Payment successful. Welcome aboard!');go('#/onboarding');}; }};
}

// ---------------- Onboarding wizard ----------------
let wizStep = 1;
function Onboarding(){
  const steps=['Add Knowledge','Build a Persona','Invite Reps'];
  const bar = steps.map((s,i)=>{
    const n=i+1, cls = n<wizStep?'done':n===wizStep?'active':'';
    return `<div class="wstep ${cls}"><div class="wn">${n<wizStep?icon('check'):n}</div><div class="wl">${s}</div>${i<2?'<div class="wbar"></div>':''}</div>`;
  }).join('');
  let body='';
  if(wizStep===1){
    body=`<h2 class="mb8">Add your knowledge</h2><p class="muted mb24">Upload the documents your reps and AI personas will use. We process them into a private, secure knowledge base.</p>
      <div class="dropzone" data-action="wupload"><div class="dz-ic">${icon('upload')}</div><b>Drag & drop PDFs here</b><div class="muted small mt8">or click to browse: product sheets, USPs, battle cards, FAQs</div></div>
      <div id="wfiles" class="mt16">${state.documents.slice(0,3).map(docRow).join('')}</div>`;
  } else if(wizStep===2){
    body=`<h2 class="mb8">Build your first persona</h2><p class="muted mb24">Shape an AI client by choosing personality traits from your library.</p>
      <div class="field"><label>Persona name</label><input class="input" value="Dr. Maria Petrou"></div>
      <div class="field"><label>Role / specialty</label><input class="input" value="Cardiologist, busy hospital"></div>
      <div class="field"><label>Personality traits <span class="muted small">(from Valentina's library)</span></label>
        <div class="wrap" style="display:flex;gap:8px">${state.traits.slice(0,6).map((tr,i)=>`<span class="chip selectable ${i<3?'selected':''}" data-trait="${tr.k}">${tr.k}</span>`).join('')}</div></div>
      <div class="field"><label>Difficulty: <b id="dlv" style="color:var(--orange)">Hard</b></label><input type="range" min="1" max="3" value="3" id="dr"></div>`;
  } else {
    body=`<h2 class="mb8">Invite your reps</h2><p class="muted mb24">Add their emails. Each invite uses one seat.</p>
      <div class="field"><label>Rep emails</label><textarea placeholder="nikos@brand.com">nikos@brand.com
sofia@brand.com</textarea></div>
      <div class="callout"><span>${icon('users')}</span><div>Seats used: <b>2 of ${state.seatsTotal}</b></div></div>`;
  }
  return {html:`<div style="min-height:100vh;background:var(--bg)">
    <div class="wizard-top">
      <div class="wizard-brand"><img class="logo-img" src="img/logo.png" alt=""> Product TBD</div>
      <div class="wizard-steps">${bar}</div>
    </div>
    <div style="max-width:640px;margin:36px auto;padding:0 20px">
      <div class="card card-pad">${body}
        <div class="between mt24">
          ${wizStep>1?'<button class="btn btn-ghost" data-action="wback">Back</button>':'<span></span>'}
          <button class="btn btn-primary" data-action="wnext">${wizStep<3?`Continue ${icon('arrow')}`:`Finish setup ${icon('check')}`}</button>
        </div>
      </div>
      <p class="center muted small mt16"><a href="#/admin/dashboard" class="btn-link">Skip for now</a></p>
    </div></div>`,
  after(){
    const up=$('[data-action="wupload"]'); if(up) up.onclick=()=>{
      const f=$('#wfiles'); const d={name:'New Upload.pdf',type:'Product',date:'today',size:'1.2 MB',status:'processing'};
      f.insertAdjacentHTML('beforeend',docRow(d)); const row=f.lastElementChild;
      setTimeout(()=>{ row.outerHTML=docRow({...d,status:'ready'}); },1600); toast('Processing document');
    };
    $$('.chip.selectable').forEach(c=>c.onclick=()=>c.classList.toggle('selected'));
    const dr=$('#dr'); if(dr) dr.oninput=()=>{$('#dlv').textContent=['Easy','Medium','Hard'][dr.value-1];};
    const back=$('[data-action="wback"]'); if(back) back.onclick=()=>{wizStep--;render();};
    $('[data-action="wnext"]').onclick=()=>{ if(wizStep<3){wizStep++;render();} else {wizStep=1;toast('Setup complete. You are ready to go!');go('#/admin/dashboard');} };
  }};
}
function docRow(d){
  const map={ready:['dot-green','Ready'],processing:['dot-amber','Processing'],failed:['dot-red','Failed']};
  const m=map[d.status];
  return `<div class="filerow"><div class="fl"><div class="ficn">${icon('file')}</div><div><b style="font-size:13.5px;color:var(--navy)">${d.name}</b><div class="tiny muted">${d.type} · ${d.size} · ${d.date}</div></div></div>
    <span class="pill-status"><span class="dot ${m[0]}"></span>${m[1]}</span></div>`;
}

// ============================================================
//  APP SHELL
// ============================================================
const ADMIN_NAV=[
  ['#/admin/dashboard','dashboard','nav_dashboard'],['#/admin/knowledge','book','nav_knowledge'],
  ['#/admin/personas','users','nav_personas'],['#/admin/team','userplus','nav_team'],
  ['#/admin/analytics','barchart','nav_analytics','Opt 3'],['#/admin/billing','card','nav_billing'],['#/admin/settings','settings','nav_settings'],
];
const REP_NAV=[
  ['#/rep/home','home','nav_home'],['#/rep/coach','cap','nav_coach'],['#/rep/roleplay','chat','nav_roleplay'],['#/rep/history','clock','nav_history'],
];
function shell(title, contentHTML, opts={}){
  const nav = state.role==='admin'?ADMIN_NAV:REP_NAV;
  const active = location.hash;
  const navHTML = nav.map(n=>{
    const on = active.startsWith(n[0]) || (n[0].includes('personas')&&active.includes('personas'));
    return `<a href="${n[0]}" class="${on?'active':''}">${icon(n[1])} <span>${t(n[2])}</span> ${n[3]?`<span class="nav-tier">${tier(n[3])}</span>`:''}</a>`;
  }).join('');
  const me = state.role==='admin'?'BA':'NG';
  const name = state.role==='admin'?'Brand Admin':'Nikos Georgiou';
  const sub = state.role==='admin'?'Brand A':'Medical Rep';
  return `<div class="shell">
    <aside class="sidebar">
      <div class="brand"><img class="logo-img" src="img/logo.png" alt="Product TBD logo"><div class="name">Product TBD<small>Brand A workspace</small></div></div>
      <nav class="nav"><div class="nav-label">${state.role==='admin'?'Manage':'Train'}</div>${navHTML}</nav>
      <div class="side-foot"><a href="#/landing">${icon('logout')} Exit to site</a></div>
    </aside>
    <div class="main">
      <div class="topbar">
        <div class="tb-left"><span class="tb-title">${title}</span></div>
        <div class="tb-right">
          <div class="lang-toggle"><button class="${state.lang==='EN'?'on':''}" data-action="lang" data-l="EN">EN</button><button class="${state.lang==='GR'?'on':''}" data-action="lang" data-l="GR">GR</button></div>
          <button class="icon-btn" title="Notifications">${icon('bell')}<span class="notif-dot"></span></button>
          <div class="tb-user"><div class="avatar avatar-solid">${me}</div><div class="small" style="line-height:1.15"><b>${name}</b><div class="tiny muted">${sub}</div></div></div>
        </div>
      </div>
      ${opts.full?contentHTML:`<div class="content">${contentHTML}</div>`}
    </div>
  </div>`;
}
function wireShell(){ $$('[data-action="lang"]').forEach(b=>b.onclick=()=>{state.lang=b.dataset.l;render();}); }

// ============================================================
//  ADMIN SCREENS
// ============================================================
const stat=(ic,cls,v,l)=>`<div class="stat"><div class="ic ${cls}">${icon(ic)}</div><div class="v">${v}</div><div class="l">${l}</div></div>`;
const statFeature=(ic,v,l,trend)=>`<div class="stat feature"><div class="ic">${icon(ic)}</div><div class="v">${v}<span class="trend">${icon('trendup','icn-sm')}${trend}</span></div><div class="l">${l}</div></div>`;
const mini=(ic,cls,v,l)=>`<div class="mini"><div class="mi ${cls}">${icon(ic)}</div><div><div class="mv">${v}</div><div class="ml">${l}</div></div></div>`;
function activity(av,txt,meta,bcls,score){
  return `<div style="display:flex;align-items:center;gap:13px;padding:13px 0;border-bottom:1px solid var(--line-2)">
    <div class="avatar" style="width:34px;height:34px;font-size:12px">${av}</div>
    <div style="flex:1"><div class="small" style="color:var(--text)">${txt}</div><div class="tiny muted" style="margin-top:1px">${meta}</div></div>
    ${score?`<span class="badge ${bcls}">${score}</span>`:''}</div>`;
}
function AdminDashboard(){
  const readyDocs=state.documents.filter(d=>d.status==='ready').length;
  const seatsUsed=state.team.filter(x=>x.status!=='invited').length+1;
  const html=`
    <div class="hero-banner">
      <div class="hb-content">
        <div class="hb-eyebrow">${icon('building')} Brand A workspace</div>
        <h1 class="greet">Welcome back, Brand A</h1>
        <p>Your team ran 44 roleplays this month and product knowledge is trending up. Just one setup step to go.</p>
        <div class="hb-cta"><a href="#/admin/personas/new" class="btn btn-primary">${icon('plus','icn-sm')} Create persona</a><a href="#/admin/team" class="btn btn-light">${icon('userplus','icn-sm')} Invite reps</a></div>
      </div>
      <div class="hb-ring"><div class="ring" style="--p:67"><div class="ring-v">67<small>%</small></div></div><span class="hb-ring-l">Setup complete</span></div>
    </div>
    <div class="grid g4 mb24">
      ${stat('users','ic-navy',seatsUsed,'Active reps')}
      ${stat('book','ic-navy',readyDocs,'Documents ready')}
      ${stat('chat','ic-navy',state.personas.length,'Personas')}
      ${statFeature('target','44','Roleplays this month','+18%')}
    </div>
    <div class="card card-pad mb24">
      <div class="between mb16"><div class="app-h" style="margin:0">Finish setting up</div><span class="badge badge-orange">2 of 3 done</span></div>
      <div class="checklist">
        <div class="checkitem done"><div class="ck">${icon('check')}</div><div class="txt"><b>Knowledge base added</b><div>${readyDocs} documents ready</div></div></div>
        <div class="checkitem done"><div class="ck">${icon('check')}</div><div class="txt"><b>Persona created</b><div>${state.personas.length} active personas</div></div></div>
        <div class="checkitem todo"><div class="ck">3</div><div class="txt"><b>Invite your reps</b><div>1 invite still pending</div></div><a href="#/admin/team" class="btn btn-primary btn-sm">Invite</a></div>
      </div>
    </div>
    <div class="row" style="align-items:flex-start">
      <div class="card col" style="flex:1.6">
        <div class="card-h"><h3>Recent activity</h3><a href="#/admin/analytics" class="btn-link small">View analytics ${icon('arrow')}</a></div>
        <div class="card-pad" style="padding-top:6px">
          ${activity('NG','Nikos completed a roleplay with Dr. Maria','Score 72% · 12 min ago','badge-amber','72%')}
          ${activity('YP','Yannis asked the Coach about CardioX dosing','35 min ago','','')}
          ${activity('SD','Sofia completed a roleplay with Dr. Andreas','Score 85% · 2h ago','badge-green','85%')}
          ${activity('NG','Nikos asked the Coach about objection handling','3h ago','','')}
        </div>
      </div>
      <div class="card card-pad col">
        <div class="between mb16"><h3 style="font-size:15px">Usage this month</h3>${tier('Plan cap')}</div>
        <div class="between mb8 small"><span class="muted">Roleplays</span><b>44 / 1,200</b></div>
        <div class="meter mb16"><i style="width:8%"></i></div>
        <div class="between mb8 small"><span class="muted">Seats</span><b>${seatsUsed} / ${state.seatsTotal}</b></div>
        <div class="meter mb24"><i style="width:${seatsUsed/state.seatsTotal*100}%"></i></div>
        <h4 class="small mb12" style="color:var(--text-2);font-weight:600">Quick actions</h4>
        <div style="display:flex;flex-direction:column;gap:8px">
          <a href="#/admin/knowledge" class="btn btn-ghost btn-sm btn-block" style="justify-content:flex-start">${icon('upload')} Upload document</a>
          <a href="#/admin/personas/new" class="btn btn-ghost btn-sm btn-block" style="justify-content:flex-start">${icon('plus')} Create persona</a>
          <a href="#/admin/team" class="btn btn-ghost btn-sm btn-block" style="justify-content:flex-start">${icon('userplus')} Invite rep</a>
        </div>
      </div>
    </div>`;
  return {html:shell('Dashboard',html), after:wireShell};
}

function AdminKnowledge(){
  const rows=state.documents.map((d,i)=>{
    const map={ready:['dot-green','Ready'],processing:['dot-amber','Processing'],failed:['dot-red','Failed']};
    const m=map[d.status];
    return `<tr><td><div class="u">${icon('file')}<b style="color:var(--navy)">${d.name}</b></div></td>
      <td><span class="chip chip-navy">${d.type}</span></td><td class="muted">${d.date}</td>
      <td><span class="pill-status"><span class="dot ${m[0]}"></span>${m[1]}</span></td>
      <td class="muted">${d.size}</td>
      <td><button class="icon-btn" title="Delete" data-del="${i}" style="width:32px;height:32px">${icon('trash','icn-sm')}</button></td></tr>`;
  }).join('');
  const html=`
    <div class="page-head between"><div><h1>Knowledge Base</h1><p>Documents that ground your AI Coach and roleplay personas. Private to Brand A.</p></div>
      <button class="btn btn-primary" data-action="upload">${icon('plus')} Upload documents</button></div>
    <div class="row mb16" style="gap:12px"><div class="input-icon" style="max-width:340px;flex:1">${icon('search')}<input class="input" placeholder="Search documents"></div>
      <select style="max-width:180px"><option>All categories</option><option>Products</option><option>Battle Cards</option><option>FAQs</option></select></div>
    <div class="card" style="overflow:hidden"><table class="tbl"><thead><tr><th>File name</th><th>Type</th><th>Uploaded</th><th>Status</th><th>Size</th><th></th></tr></thead><tbody id="docbody">${rows}</tbody></table></div>
    <div class="callout mt24">${icon('lock')}<div><b>How grounding works:</b> each document is chunked, embedded and indexed with your <code>brand_id</code>. Reps' questions only ever retrieve <b>your</b> chunks, and the AI answers strictly from them.</div></div>`;
  return {html:shell('Knowledge Base',html), after(){
    wireShell();
    $('[data-action="upload"]').onclick=()=>{
      const d={name:'New Product Sheet.pdf',type:'Product',date:'today',size:'1.3 MB',status:'processing'};
      state.documents.push(d);
      $('#docbody').insertAdjacentHTML('beforeend',`<tr id="newrow"><td><div class="u">${icon('file')}<b style="color:var(--navy)">${d.name}</b></div></td><td><span class="chip chip-navy">${d.type}</span></td><td class="muted">today</td><td><span class="pill-status"><span class="dot dot-amber"></span>Processing</span></td><td class="muted">${d.size}</td><td></td></tr>`);
      toast('Uploading & processing');
      setTimeout(()=>{ d.status='ready'; const r=$('#newrow'); if(r) r.querySelector('.pill-status').innerHTML='<span class="dot dot-green"></span>Ready'; toast('Document ready'); },1800);
    };
    $$('[data-del]').forEach(b=>b.onclick=()=>{state.documents.splice(+b.dataset.del,1);render();toast('Document removed');});
  }};
}

function personaCard(p, opts={}){
  const action = opts.rep
    ? `<button class="btn btn-primary btn-block" data-start="${p.id}">Start roleplay ${icon('arrow')}</button>`
    : `<a href="#/admin/personas/new" class="btn btn-ghost btn-sm col">${icon('edit','icn-sm')} Edit</a><span class="badge ${p.status==='Draft'?'badge-grey':'badge-green'}" style="margin-left:auto">${p.status}</span>`;
  return `<div class="persona-card">
    <div class="pc-top"><div class="pc-av">${p.initials}</div><div class="pc-id"><b>${p.name}</b><span>${p.role}</span></div><span class="badge ${diffBadge(p.difficulty)}">${p.difficulty}</span></div>
    <div class="pc-traits">${p.traits.map(x=>`<span class="chip">${x}</span>`).join('')}</div>
    <div class="pc-foot">${action}</div>
  </div>`;
}
function AdminPersonas(){
  const cards=state.personas.map(p=>personaCard(p)).join('');
  const html=`
    <div class="page-head between"><div><h1>Personas</h1><p>The AI clients your reps practice against. Built from Valentina's trait library.</p></div>
      <a href="#/admin/personas/new" class="btn btn-primary">${icon('plus')} Create persona</a></div>
    <div class="persona-grid">${cards}
      <a href="#/admin/personas/new" class="persona-card add">${icon('plus')}<b>New persona</b></a>
    </div>`;
  return {html:shell('Personas',html), after:wireShell};
}

let pbTraits=['Skeptical','Time-pressed','Data-driven'], pbDiff=3, pbName='Dr. Maria Petrou';
function AdminPersonaBuilder(){
  const traitChips=state.traits.map(tr=>`<span class="chip selectable ${pbTraits.includes(tr.k)?'selected':''}" data-trait="${tr.k}" title="${tr.d}">${tr.k}</span>`).join('');
  const dword=['Easy','Medium','Hard'][pbDiff-1];
  const sec=(n,txt)=>`<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px"><div style="width:24px;height:24px;border-radius:7px;background:var(--navy);color:#fff;display:grid;place-items:center;font-size:12px;font-weight:700">${n}</div><h4 style="font-size:15px">${txt}</h4></div>`;
  const html=`
    <div class="page-head"><h1>Persona Builder</h1><p>Configure an AI client from Valentina's trait library and your knowledge base.</p></div>
    <div class="row" style="align-items:flex-start">
      <div class="card card-pad col" style="flex:1.5">
        ${sec(1,'Identity')}
        <div class="field"><label>Name</label><input class="input" id="pbname" value="${pbName}"></div>
        <div class="row"><div class="field col"><label>Role / specialty</label><input class="input" value="Cardiologist, busy hospital"></div>
        <div class="field col"><label>Avatar</label><select><option>Auto (initials)</option><option>Avatar library</option><option disabled>Photo upload (Phase 2)</option></select></div></div>
        <div class="field"><label>Background (optional)</label><textarea>Senior cardiologist, 18 yrs experience, currently prescribes a competitor product. Limited time between rounds.</textarea></div>

        <div style="height:1px;background:var(--line-2);margin:8px 0 22px"></div>
        ${sec(2,'Personality traits')}
        <p class="tiny muted mb12" style="margin-top:-8px">From Valentina's library. Admins select; only Valentina authors the library.</p>
        <div class="wrap" style="display:flex;gap:8px;margin-bottom:8px" id="traitbox">${traitChips}</div>

        <div style="height:1px;background:var(--line-2);margin:22px 0"></div>
        ${sec(3,'Difficulty')}
        <div class="between mb8" style="margin-top:-8px"><span class="small muted">How tough the persona is</span><b id="pbdiff" style="color:var(--orange)">${dword}</b></div>
        <input type="range" min="1" max="3" value="${pbDiff}" id="pbrange" class="mb24">

        <div style="height:1px;background:var(--line-2);margin:8px 0 22px"></div>
        ${sec(4,'Scenario & knowledge')}
        <div class="field"><label>Scenario context (optional)</label><input class="input" value="First meeting, 3 minutes, skeptical about switching from competitor."></div>
        <div class="field"><label>Knowledge scope</label><select><option>All Brand A documents</option><option>Products only</option><option>Battle Cards only</option></select></div>

        <div class="between mt16"><button class="btn btn-ghost" data-action="psave" data-draft="1">Save as draft</button><button class="btn btn-primary" data-action="psave">${icon('check')} Activate persona</button></div>
      </div>

      <div class="card card-pad col" style="position:sticky;top:86px;max-width:380px">
        <h4 class="mb16" style="font-size:14px;color:var(--text-2)">Live preview</h4>
        <div class="persona-card" style="box-shadow:none;border:1px solid var(--line)">
          <div class="pc-top"><div class="pc-av" id="pvinit">${initials(pbName)}</div><div class="pc-id"><b id="pvname">${pbName}</b><span>Cardiologist, busy hospital</span></div></div>
          <div class="pc-traits" id="pvtraits">${pbTraits.map(x=>`<span class="chip">${x}</span>`).join('')}</div>
        </div>
        <div class="msg persona mt16" style="max-width:100%"><div class="ma" id="pvma">${initials(pbName)}</div><div class="mb">"I've got 3 minutes between rounds. Why exactly should I switch my patients to your product?"</div></div>
        <p class="tiny muted mt16">This is how the persona will open the roleplay, shaped by its traits and difficulty.</p>
      </div>
    </div>`;
  return {html:shell('Persona Builder',html), after(){
    wireShell();
    $('#pbname').oninput=e=>{pbName=e.target.value||'Persona';$('#pvname').textContent=pbName;$('#pvinit').textContent=initials(pbName);$('#pvma').textContent=initials(pbName);};
    $$('#traitbox .chip').forEach(c=>c.onclick=()=>{
      const k=c.dataset.trait; c.classList.toggle('selected');
      if(pbTraits.includes(k)) pbTraits=pbTraits.filter(x=>x!==k); else pbTraits.push(k);
      $('#pvtraits').innerHTML=pbTraits.map(x=>`<span class="chip">${x}</span>`).join('');
    });
    $('#pbrange').oninput=e=>{pbDiff=+e.target.value;$('#pbdiff').textContent=['Easy','Medium','Hard'][pbDiff-1];};
    $$('[data-action="psave"]').forEach(b=>b.onclick=()=>{
      const draft=b.dataset.draft; const id='p'+(state.personas.length+1);
      state.personas.unshift({id,name:pbName,role:'Cardiologist · Busy hospital',traits:[...pbTraits],difficulty:['Easy','Medium','Hard'][pbDiff-1],status:draft?'Draft':'Active',initials:initials(pbName)});
      toast(draft?'Saved as draft':'Persona activated'); go('#/admin/personas');
    });
  }};
}

function AdminTeam(){
  const used=state.team.filter(x=>x.status!=='invited').length+1;
  const rows=state.team.map((m,i)=>{
    const map={active:['dot-green','Active'],invited:['dot-amber','Invited'],disabled:['dot-grey','Disabled']};
    const s=map[m.status];
    return `<tr><td><div class="u"><div class="avatar" style="width:32px;height:32px;font-size:11.5px">${initials(m.name)}</div><b style="color:var(--navy)">${m.name}</b></div></td>
      <td class="muted">${m.email}</td><td><span class="chip chip-navy">Rep</span></td>
      <td><span class="pill-status"><span class="dot ${s[0]}"></span>${s[1]}</span></td>
      <td class="muted">${m.last}</td><td><b>${m.plays}</b></td>
      <td>${m.status==='invited'?'<button class="btn-link small">Resend</button>':'<button class="btn-link small" style="color:var(--text-3)">Disable</button>'}</td></tr>`;
  }).join('');
  const html=`
    <div class="page-head between"><div><h1>Team & Seats</h1><p>Manage your medical reps and seat allocation.</p></div>
      <button class="btn btn-primary" data-action="invite">${icon('userplus')} Invite reps</button></div>
    <div class="card card-pad mb24 between">
      <div><b style="color:var(--navy)">${used} of ${state.seatsTotal} seats used</b><div class="tiny muted">${state.plan} plan</div></div>
      <div style="flex:1;max-width:340px;margin:0 24px"><div class="meter"><i style="width:${used/state.seatsTotal*100}%"></i></div></div>
      <a href="#/admin/billing" class="btn btn-ghost btn-sm">${icon('plus','icn-sm')} Add seats</a>
    </div>
    <div class="card" style="overflow:hidden"><table class="tbl"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Last active</th><th>Roleplays</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>`;
  return {html:shell('Team & Seats',html), after(){ wireShell(); $('[data-action="invite"]').onclick=openInvite; }};
}
function openInvite(){
  const m=document.createElement('div'); m.className='modal-back';
  m.innerHTML=`<div class="modal"><div class="card-h"><h3>Invite reps</h3><button class="icon-btn" data-x>${icon('x')}</button></div>
    <div class="card-pad"><div class="field"><label>Email addresses (one per line)</label><textarea placeholder="rep@brand.com"></textarea></div>
    <p class="small muted mb16">Each invite uses one seat. ${state.seatsTotal-(state.team.filter(x=>x.status!=='invited').length+1)} seats available.</p>
    <button class="btn btn-primary btn-block" data-send>Send invites</button></div></div>`;
  document.body.appendChild(m);
  m.querySelector('[data-x]').onclick=()=>m.remove();
  m.onclick=e=>{if(e.target===m)m.remove();};
  m.querySelector('[data-send]').onclick=()=>{m.remove();toast('Invites sent');};
}

function AdminAnalytics(){
  const html=`
    <div class="page-head between"><div><h1>Analytics ${tier('Opt 3')}</h1><p>Training impact across your team. Connect coaching to outcomes.</p></div>
      <div class="row gap8" style="gap:10px"><select style="max-width:160px"><option>Last 30 days</option><option>This quarter</option></select><button class="btn btn-ghost btn-sm">${icon('download','icn-sm')} Export</button></div></div>
    <div class="grid g4 mb24">
      ${stat('target','ic-orange','44','Roleplays')}${stat('trendup','ic-green','78%','Avg score')}${stat('clock','ic-navy','-32%','Ramp-up time')}${stat('message','ic-navy','312','Coach questions')}
    </div>
    <div class="row mb24" style="align-items:stretch">
      <div class="card card-pad col" style="flex:1.5"><h3 class="mb16" style="font-size:15px">Roleplays & average score over time</h3>${barChart()}</div>
      <div class="card card-pad col"><h3 class="mb16" style="font-size:15px">Score by dimension</h3>
        ${rubricBar('Product accuracy',82)}${rubricBar('Objection handling',74)}${rubricBar('Compliance & claims',88)}${rubricBar('Confidence & rapport',71)}</div>
    </div>
    <div class="row" style="align-items:flex-start">
      <div class="card col" style="flex:1.3"><div class="card-h"><h3>${icon('award','icn-sm')} Rep leaderboard</h3></div><table class="tbl"><thead><tr><th>Rep</th><th>Roleplays</th><th>Avg score</th><th>Trend</th></tr></thead><tbody>
        <tr><td><b style="color:var(--navy)">Yannis Pappas</b></td><td>21</td><td><span class="badge badge-green">85%</span></td><td style="color:var(--green);font-weight:600">+6</td></tr>
        <tr><td><b style="color:var(--navy)">Nikos Georgiou</b></td><td>14</td><td><span class="badge badge-amber">72%</span></td><td style="color:var(--green);font-weight:600">+4</td></tr>
        <tr><td><b style="color:var(--navy)">Sofia Dimitriou</b></td><td>9</td><td><span class="badge badge-green">81%</span></td><td class="muted">0</td></tr>
      </tbody></table></div>
      <div class="card card-pad col"><h3 class="mb12" style="font-size:15px;display:flex;align-items:center;gap:8px">${icon('alert','icn-sm')} Knowledge gaps</h3>
        <p class="small muted mb16">Questions the Coach couldn't fully answer. An improvement signal for your knowledge base.</p>
        <div class="checkitem mb8"><div class="ck todo" style="background:rgba(201,138,14,.14);color:var(--amber);border:none">?</div><div class="txt"><b>Pediatric dosing for CardioX</b><div>Asked 7 times · no source</div></div></div>
        <div class="checkitem"><div class="ck todo" style="background:rgba(201,138,14,.14);color:var(--amber);border:none">?</div><div class="txt"><b>Reimbursement in private insurance</b><div>Asked 4 times · no source</div></div></div>
      </div>
    </div>`;
  return {html:shell('Analytics',html), after:wireShell};
}
function barChart(){
  const data=[6,9,7,12,10,15,18]; const max=Math.max(...data);
  return `<div class="bars">${data.map((v,i)=>`<div class="bar-col"><span class="bar-v">${v}</span><div class="bar ${i===data.length-1?'hot':''}" style="height:${v/max*100}%"></div><span class="bar-l">W${i+1}</span></div>`).join('')}</div>`;
}
function rubricBar(label,v){return `<div class="rb-row mb16"><div class="between"><span>${label}</span><b>${v}%</b></div><div class="meter ${v>=85?'':''}"><i style="width:${v}%"></i></div></div>`;}

function AdminBilling(){
  const html=`
    <div class="page-head"><h1>Billing & Subscription</h1><p>Manage your plan, seats and invoices.</p></div>
    <div class="row mb24" style="align-items:stretch">
      <div class="card card-pad col" style="flex:1.3">
        <div class="between mb16"><h3 style="font-size:15px">Current plan</h3><span class="badge badge-navy">${state.plan}</span></div>
        <div class="price" style="font-size:30px;font-weight:800;color:var(--navy)">€890<small style="font-size:15px;color:var(--text-3);font-weight:600">/mo</small></div>
        <p class="muted small mb16">Up to 15 seats · Voice + scoring included · renews Jul 21, 2026</p>
        <div class="row gap8" style="align-items:center"><button class="btn btn-primary btn-sm">Upgrade</button><button class="btn btn-ghost btn-sm">Downgrade</button>
        <div class="lang-toggle" style="margin-left:auto"><button class="on">Monthly</button><button>Annual −17%</button></div></div>
      </div>
      <div class="card card-pad col"><h3 class="mb16" style="font-size:15px">Seats</h3>
        <div class="between mb8 small"><span class="muted">Used</span><b>${state.team.filter(x=>x.status!=='invited').length+1} / 15</b></div>
        <div class="meter mb16"><i style="width:30%"></i></div>
        <button class="btn btn-ghost btn-sm btn-block">${icon('plus','icn-sm')} Add seats (prorated)</button>
        <div class="between mt24 mb8"><h4 class="small" style="color:var(--text-2)">Usage this period</h4>${tier('Fair-use cap')}</div>
        <div class="between small"><span class="muted">Roleplays</span><b>44 / 1,200</b></div>
      </div>
    </div>
    <div class="card" style="overflow:hidden"><div class="card-h"><h3>Invoice history</h3><button class="btn-link small">Update payment method</button></div>
      <table class="tbl"><thead><tr><th>Date</th><th>Description</th><th>Amount</th><th>Status</th><th></th></tr></thead><tbody>
        <tr><td>Jun 21, 2026</td><td>Professional, monthly</td><td>€890</td><td><span class="badge badge-green">Paid</span></td><td><a class="btn-link small">${icon('download','icn-sm')} PDF</a></td></tr>
        <tr><td>Jun 21, 2026</td><td>Onboarding (one-time)</td><td>€750</td><td><span class="badge badge-green">Paid</span></td><td><a class="btn-link small">${icon('download','icn-sm')} PDF</a></td></tr>
        <tr><td>May 21, 2026</td><td>Professional, monthly</td><td>€890</td><td><span class="badge badge-green">Paid</span></td><td><a class="btn-link small">${icon('download','icn-sm')} PDF</a></td></tr>
      </tbody></table></div>
    <div class="callout mt24">${icon('card')}<div><b>Options 1-2:</b> this screen is read-only, “Contact Valentina to change your plan.” Automated Stripe billing unlocks in ${tier('Opt 3')}.</div></div>`;
  return {html:shell('Billing',html), after:wireShell};
}

function AdminSettings(){
  const html=`
    <div class="page-head"><h1>Settings</h1><p>Manage your brand profile, data and team preferences.</p></div>
    <div class="card mb24"><div class="card-h"><h3>${icon('building','icn-sm')} Brand profile</h3></div><div class="card-pad">
      <div class="row"><div class="field col"><label>Brand name</label><input class="input" value="Brand A Pharma"></div>
      <div class="field col"><label>Default language</label><select><option>English</option><option>Greek</option></select></div></div>
      <div class="field" style="margin-bottom:0"><label>Logo</label><div class="dropzone" style="padding:24px"><div class="dz-ic">${icon('upload')}</div><b>Drop logo or click to upload</b></div></div>
    </div></div>
    <div class="card mb24"><div class="card-h"><h3>${icon('shield','icn-sm')} Data & privacy <span class="badge badge-green">GDPR</span></h3></div><div class="card-pad">
      <div class="field"><label>Transcript retention</label><select><option>Keep for 12 months</option><option>Keep for 6 months</option><option>Keep indefinitely</option></select></div>
      <div class="row gap8"><button class="btn btn-ghost btn-sm">${icon('download','icn-sm')} Export all data</button><button class="btn btn-danger btn-sm">${icon('trash','icn-sm')} Delete account</button></div>
    </div></div>
    <div class="card"><div class="card-h"><h3>${icon('bell','icn-sm')} Notifications</h3></div><div class="card-pad">
      <label class="checkbox mb16"><input type="checkbox" checked> Weekly email digest of rep activity</label>
      <label class="checkbox mb16"><input type="checkbox" checked> Alert when a rep completes a roleplay</label>
      <label class="checkbox"><input type="checkbox"> Alert when usage nears the plan cap</label>
    </div></div>`;
  return {html:shell('Settings',html), after:wireShell};
}

// ============================================================
//  REP SCREENS
// ============================================================
function RepHome(){
  const html=`
    <div class="hero-banner">
      <div class="hb-content">
        <div class="hb-eyebrow">${icon('zap')} 4-day streak</div>
        <h1 class="greet">Good to see you, Nikos</h1>
        <p>You're 6 roleplays away from your weekly goal. How about a quick round with Dr. Maria?</p>
        <div class="hb-cta"><a href="#/rep/roleplay" class="btn btn-primary">${icon('play','icn-sm')} Start a roleplay</a><a href="#/rep/coach" class="btn btn-light">${icon('cap','icn-sm')} Ask the Coach</a></div>
      </div>
      <div class="hb-ring"><div class="ring" style="--p:70"><div class="ring-v">14<small>/20</small></div></div><span class="hb-ring-l">Weekly goal</span></div>
    </div>
    <div class="grid g3 mb24">
      ${mini('zap','ic-orange','4 days','Current streak')}
      ${mini('trendup','ic-orange','72%','Last score, improving')}
      ${mini('award','ic-navy','#2','Team rank this week')}
    </div>
    <div class="app-h">What would you like to do?</div>
    <div class="grid g2 mb24">
      <a href="#/rep/coach" class="action-card coach"><div class="ac-ic">${icon('cap','icn-lg')}</div><div><h3>${t('ask_coach')}</h3><p>Instant, sourced answers about your products, in English or Greek.</p></div><span class="ac-go">${icon('arrow','icn-sm')}</span></a>
      <a href="#/rep/roleplay" class="action-card rp"><div class="ac-ic">${icon('chat','icn-lg')}</div><div><h3>${t('practice')}</h3><p>Rehearse real objections with a lifelike AI client, unlimited times.</p></div><span class="ac-go">${icon('arrow','icn-sm')}</span></a>
    </div>
    <div class="row">
      <div class="tile card-pad col"><div class="app-h" style="font-size:14px">Continue where you left off</div>
        <div class="between" style="padding:13px 14px;border:1px solid var(--line);border-radius:14px">
          <div style="display:flex;align-items:center;gap:11px"><div class="avatar">MP</div><div><b class="small" style="color:var(--navy)">Dr. Maria Petrou</b><div class="tiny muted">Last roleplay · 72%</div></div></div>
          <a href="#/rep/roleplay" class="btn btn-ghost btn-sm">Resume ${icon('arrow','icn-sm')}</a></div>
      </div>
      <div class="tile card-pad col"><div class="app-h" style="font-size:14px">Recommended next</div>
        <div class="between" style="padding:13px 14px;border:1px solid var(--line);border-radius:14px">
          <div style="display:flex;align-items:center;gap:11px"><div class="avatar">AN</div><div><b class="small" style="color:var(--navy)">Dr. Andreas Nikolaou</b><div class="tiny muted">Try a price-sensitive GP</div></div></div>
          <a href="#/rep/roleplay" class="btn btn-primary btn-sm">Start</a></div>
      </div>
    </div>`;
  return {html:shell(t('nav_home'),html), after:wireShell};
}

const COACH_QA={
  default:{a:"Based on Brand A's approved materials, CardioX is positioned as a first-line option with a strong cardiovascular outcomes profile. Here are the key points your battle card highlights, with the supporting sources below.",c:['CardioX Monograph','Battle Card v2']},
  diff:{a:"Your key differentiator vs the competitor is the 27% relative risk reduction in major cardiovascular events shown in the PROVE-IT trial, plus once-daily dosing (vs twice-daily). The battle card also notes a cleaner drug-interaction profile.",c:['Battle Card v2','CardioX Monograph']},
  dose:{a:"Standard adult dosing is 10 mg once daily, taken with or without food. It can be titrated to 20 mg after 4 weeks based on response. Renal impairment: no adjustment for mild-moderate; consult the safety section for severe.",c:['Dosage & Safety FAQ','CardioX Monograph']},
  obj:{a:"For the 'too expensive' objection: pivot from acquisition cost to total cost of care: fewer cardiovascular events means fewer hospitalisations. Your playbook frames it as value-per-outcome and points to the reimbursement support programme.",c:['Objection Handling Playbook']},
};
function RepCoach(){
  const html=`<div class="chat">
    <div class="chat-head"><div class="ch-title">${icon('cap')} ${t('ask_coach')} <span class="tiny muted" style="font-weight:400;margin-left:4px">Grounded in Brand A's knowledge base</span></div>
      <span class="chip chip-navy">${icon('lock','icn-sm')} Brand A only</span></div>
    <div class="chat-body"><div class="chat-thread" id="thread">
      <div class="msg bot"><div class="ma"><img src="img/logo.png" alt=""></div><div class="mb">Hi Nikos. Ask me anything about your products. I'll answer only from Brand A's approved documents and show you the sources. Try one of these:</div></div>
      <div class="suggest" id="sugg">
        <button data-q="diff">${icon('zap')} What's our key differentiator vs the competitor?</button>
        <button data-q="dose">${icon('file')} What's the standard dosing for CardioX?</button>
        <button data-q="obj">${icon('message')} How do I handle the “too expensive” objection?</button>
      </div>
    </div></div>
    <div class="chat-input"><div class="ci-row">
      <button class="icon-btn" title="Voice input (Opt 2)">${icon('mic')}</button>
      <input class="input" id="cinput" placeholder="Ask a product question">
      <button class="btn btn-primary" data-action="csend">${icon('send','icn-sm')} ${t('send')}</button>
    </div><p class="center tiny muted mt8">Voice input ${tier('Opt 2')} · responds in ${state.lang}</p></div>
  </div>`;
  return {html:shell(t('ask_coach'),html,{full:true}), after(){
    wireShell();
    const thread=$('#thread'), inp=$('#cinput');
    const ask=(key,text)=>{
      const s=$('#sugg'); if(s) s.remove();
      thread.insertAdjacentHTML('beforeend',`<div class="msg user"><div class="ma">NG</div><div class="mb">${text}</div></div>`);
      const qa=COACH_QA[key]||COACH_QA.default;
      const typ=document.createElement('div'); typ.className='msg bot'; typ.innerHTML=`<div class="ma"><img src="img/logo.png" alt=""></div><div class="mb"><div class="typing"><i></i><i></i><i></i></div></div>`;
      thread.appendChild(typ); thread.parentElement.scrollTop=9e9;
      setTimeout(()=>{ typ.querySelector('.mb').innerHTML=`${qa.a}<div class="cites">${qa.c.map(c=>`<span class="cite">${icon('file','icn-sm')} ${c}</span>`).join('')}</div>`; thread.parentElement.scrollTop=9e9; },900);
    };
    $$('#sugg button').forEach(b=>b.onclick=()=>ask(b.dataset.q,b.textContent.trim()));
    const send=()=>{ const v=inp.value.trim(); if(!v)return; const k=/diff|competitor|differ/i.test(v)?'diff':/dos|mg|titrat/i.test(v)?'dose':/object|expensive|cost|price/i.test(v)?'obj':'default'; inp.value=''; ask(k,v); };
    $('[data-action="csend"]').onclick=send; inp.onkeydown=e=>{if(e.key==='Enter')send();};
  }};
}

function RepRoleplaySelect(){
  const cards=state.personas.map(p=>personaCard(p,{rep:true})).join('');
  const html=`<div class="page-head"><h1>${t('practice')}</h1><p>Choose an AI client to practice against. Each behaves according to its personality traits.</p></div>
    <div class="row mb16"><select style="max-width:180px"><option>All difficulties</option><option>Easy</option><option>Medium</option><option>Hard</option></select></div>
    <div class="persona-grid">${cards}</div>`;
  return {html:shell(t('practice'),html), after(){
    wireShell();
    $$('[data-start]').forEach(b=>b.onclick=()=>{ state.rp={persona:state.personas.find(p=>p.id===b.dataset.start),turns:[],idx:0,mode:'text'}; go('#/rep/roleplay/brief'); });
  }};
}

function RepRoleplayBrief(){
  const p=state.rp?.persona||state.personas[0]; state.rp=state.rp||{persona:p,turns:[],idx:0,mode:'text'};
  const html=`<div class="center" style="min-height:calc(100vh - 62px);padding:30px"><div class="card" style="max-width:520px;width:100%">
    <div class="card-pad">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:18px"><div class="pc-av" style="width:56px;height:56px;font-size:19px">${p.initials}</div><div><h2 style="font-size:20px">${p.name}</h2><p class="muted small">${p.role}</p></div></div>
      <p class="small mb8" style="font-weight:600">Personality</p>
      <div class="wrap mb16" style="display:flex;gap:7px">${p.traits.map(x=>`<span class="chip">${x}</span>`).join('')}</div>
      <div class="callout mb16">${icon('target')}<div><b>Scenario:</b> First meeting, you have ~3 minutes. ${p.name.split(' ')[1]} is ${p.difficulty==='Hard'?'skeptical and pressed for time':'open but cautious'}. Objections will be drawn from Brand A's real product facts.</div></div>
      <p class="small mb8" style="font-weight:600">Mode</p>
      <div class="seg mb16">
        <button class="on" data-mode="text">${icon('message')} Text</button>
        <button data-mode="voice">${icon('mic')} Voice ${tier('Opt 2')}</button>
      </div>
      <button class="btn btn-primary btn-block" data-action="startrp">${icon('play','icn-sm')} ${t('start')}</button>
      <p class="center tiny muted mt8">Treat this like a real call.</p>
    </div></div></div>`;
  return {html:shell('Roleplay',html), after(){
    wireShell();
    $$('[data-mode]').forEach(b=>b.onclick=()=>{$$('[data-mode]').forEach(x=>x.classList.remove('on'));b.classList.add('on');state.rp.mode=b.dataset.mode;});
    $('[data-action="startrp"]').onclick=()=>go('#/rep/roleplay/live');
  }};
}

const RP_LINES=[
  "I've got 3 minutes between rounds. Why exactly should I switch my patients to CardioX?",
  "27% sounds impressive, but that's relative risk. What's the absolute benefit, and in which patient group?",
  "And how does the cost compare to what I'm prescribing now? My budget is already stretched.",
  "Side effects are my real concern. What should I tell patients who are worried about switching?",
  "Alright, that's more convincing than I expected. Send me the trial data and I'll consider it for my next cohort.",
];
function RepRoleplayLive(){
  const p=state.rp?.persona||state.personas[0]; state.rp=state.rp||{persona:p,turns:[],idx:0,mode:'text'};
  if(state.rp.mode==='voice'){
    const html=`<div class="voice-frame"><div class="voice-stage">
      <div class="vs-top">
        <span class="vs-timer"><span class="vs-rec"></span> 02:48</span>
        <button class="v-pill-btn" data-action="endrp">${icon('x','icn-sm')} End call</button>
      </div>
      <div class="vs-center">
        <div class="v-avatar-wrap">
          <span class="v-ring r2"></span><span class="v-ring r1"></span><span class="v-pulse"></span>
          <div class="v-avatar">${p.initials}</div>
        </div>
        <div class="v-name">${p.name}</div>
        <div class="v-role">${p.role} · ${p.difficulty}</div>
        <div class="v-status"><span class="v-eq"><i></i><i></i><i></i><i></i><i></i></span> In character, speaking</div>
        <p class="v-line" id="orbline">${RP_LINES[0]}</p>
      </div>
      <div class="vs-controls">
        <button class="v-btn" title="Hint">${icon('bulb')}</button>
        <div class="v-mic-wrap"><button class="v-mic" data-action="rpnext">${icon('mic','icn-lg')}</button><span class="v-mic-label">Hold to respond</span></div>
        <button class="v-btn end" title="End call" data-action="endrp">${icon('x')}</button>
      </div>
      <div class="vs-foot">${icon('lock','icn-sm')} Live transcript captured for scoring</div>
    </div></div>`;
    return {html:shell('Roleplay',html,{full:true}), after(){
      wireShell();
      $('[data-action="rpnext"]').onclick=()=>{ state.rp.idx++; if(state.rp.idx>=RP_LINES.length){go('#/rep/roleplay/feedback');return;} $('#orbline').textContent=RP_LINES[state.rp.idx]; };
      $$('[data-action="endrp"]').forEach(b=>b.onclick=()=>go('#/rep/roleplay/feedback'));
    }};
  }
  const html=`<div class="chat">
    <div class="chat-head"><div style="display:flex;align-items:center;gap:11px"><div class="avatar">${p.initials}</div><div class="ch-title" style="display:block">${p.name} <span class="badge badge-orange">In character</span><div class="tiny muted" style="font-weight:400">${p.role} · 2:48 left</div></div></div>
      <button class="btn btn-dark btn-sm" data-action="endrp">End session</button></div>
    <div class="chat-body"><div class="chat-thread" id="rpthread">
      <div class="msg persona"><div class="ma">${p.initials}</div><div class="mb">"${RP_LINES[0]}"</div></div>
    </div></div>
    <div class="chat-input"><div class="ci-row">
      <button class="icon-btn" title="Hint (Coaching peek)">${icon('bulb')}</button>
      <input class="input" id="rpinput" placeholder="Type your response to ${p.name.split(' ')[1]}">
      <button class="btn btn-primary" data-action="rpsend">${icon('send','icn-sm')} ${t('send')}</button>
    </div><p class="center tiny muted mt8">Persona objections are drawn from Brand A's product facts · transcript captured</p></div>
  </div>`;
  return {html:shell('Roleplay',html,{full:true}), after(){
    wireShell();
    const thread=$('#rpthread'), inp=$('#rpinput');
    const personaTurn=(text,final)=>{
      const typ=document.createElement('div'); typ.className='msg persona'; typ.innerHTML=`<div class="ma">${p.initials}</div><div class="mb"><div class="typing"><i></i><i></i><i></i></div></div>`;
      thread.appendChild(typ); thread.parentElement.scrollTop=9e9;
      setTimeout(()=>{ typ.querySelector('.mb').innerHTML='"'+text+'"'; thread.parentElement.scrollTop=9e9;
        if(final){ thread.insertAdjacentHTML('beforeend',`<div class="center mt16"><button class="btn btn-primary" data-action="endrp">Finish & see feedback ${icon('arrow','icn-sm')}</button></div>`); $$('[data-action="endrp"]').forEach(b=>b.onclick=()=>go('#/rep/roleplay/feedback')); }
      },1000);
    };
    const send=()=>{
      const v=inp.value.trim(); if(!v)return; inp.value='';
      thread.insertAdjacentHTML('beforeend',`<div class="msg user"><div class="ma">NG</div><div class="mb">${v}</div></div>`);
      thread.parentElement.scrollTop=9e9; state.rp.idx++;
      if(state.rp.idx>=RP_LINES.length){ personaTurn(RP_LINES[RP_LINES.length-1],true); return; }
      personaTurn(RP_LINES[state.rp.idx]);
    };
    $('[data-action="rpsend"]').onclick=send; inp.onkeydown=e=>{if(e.key==='Enter')send();};
    $('[data-action="endrp"]').onclick=()=>go('#/rep/roleplay/feedback');
  }};
}

function RepFeedback(){
  const p=state.rp?.persona||state.personas[0];
  const html=`
    <div class="page-head"><h1>Session complete</h1><p>Roleplay with ${p.name} · 3 min · ${new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short'})}</p></div>
    <div class="row mb24" style="align-items:stretch">
      <div class="card card-pad col center" style="flex-direction:column;flex:.8">
        <div class="gauge" style="--p:72"><div class="gv">72%<small>OVERALL</small></div></div>
        <p class="small muted mt16 center">Solid. Better than your last (68%)</p>
      </div>
      <div class="card card-pad col" style="flex:1.5">
        <div class="between mb16"><h3 style="font-size:15px">Rubric breakdown</h3>${tier('Opt 2')}</div>
        <div class="rubric">${rubricBar('Product accuracy',82)}${rubricBar('Objection handling',68)}${rubricBar('Compliance & claims',90)}${rubricBar('Confidence & rapport',70)}</div>
        <div class="callout mt16">${icon('file')}<div>Product accuracy is scored against Brand A's knowledge base, not the model's general knowledge.</div></div>
      </div>
    </div>
    <div class="row mb24">
      <div class="note-card good col"><h4 style="color:var(--green)">${icon('check','icn-sm')} What went well</h4>
        <ul><li>${icon('check')} Led with the PROVE-IT outcome data; a strong, evidence-first opening.</li><li>${icon('check')} Stayed compliant; no off-label claims.</li></ul></div>
      <div class="note-card improve col"><h4 style="color:var(--orange)">${icon('trendup','icn-sm')} What to improve</h4>
        <ul><li>${icon('arrow')} On cost, pivot to total-cost-of-care sooner; you conceded the price point.</li><li>${icon('arrow')} Acknowledge the safety concern before reframing it.</li></ul></div>
    </div>
    <div class="card mb24"><div class="card-h"><h3>Transcript</h3><button class="btn-link small" data-action="toggletx">Expand</button></div>
      <div class="card-pad" id="tx" style="display:none">
        <div class="msg persona mb16" style="max-width:100%"><div class="ma">${p.initials}</div><div class="mb">"${RP_LINES[0]}"</div></div>
        <div class="msg user mb16" style="max-width:100%"><div class="ma">NG</div><div class="mb">CardioX showed a 27% reduction in major events vs standard care in PROVE-IT, once daily too.</div></div>
        <div class="msg persona" style="max-width:100%"><div class="ma">${p.initials}</div><div class="mb">"${RP_LINES[1]}"</div></div>
      </div></div>
    <div class="center gap12" style="display:flex;flex-wrap:wrap"><a href="#/rep/roleplay/live" class="btn btn-ghost">${icon('refresh','icn-sm')} Practice again</a><a href="#/rep/roleplay" class="btn btn-dark">Try a harder persona</a><a href="#/rep/history" class="btn btn-primary">${icon('check','icn-sm')} Save to history</a></div>`;
  return {html:shell('Feedback',html), after(){
    wireShell();
    $('[data-action="toggletx"]').onclick=e=>{const tx=$('#tx');const open=tx.style.display==='none';tx.style.display=open?'block':'none';e.target.textContent=open?'Collapse':'Expand';};
  }};
}

function RepHistory(){
  const rows=[
    ['Today','Dr. Maria Petrou','3:02','72%','badge-amber'],
    ['Yesterday','Dr. Andreas Nikolaou','4:15','85%','badge-green'],
    ['Jun 24','Dr. Maria Petrou','2:48','68%','badge-amber'],
    ['Jun 22','Dr. Elena Vasiliou','3:30','81%','badge-green'],
  ].map(r=>`<tr><td class="muted">${r[0]}</td><td><b style="color:var(--navy)">${r[1]}</b></td><td>${r[2]}</td><td><span class="badge ${r[4]}">${r[3]}</span></td><td><a href="#/rep/roleplay/feedback" class="btn-link small">${icon('eye','icn-sm')} View transcript</a></td></tr>`).join('');
  const html=`
    <div class="page-head between"><div><h1>${t('nav_history')}</h1><p>Track your improvement over time.</p></div>
      <select style="max-width:180px"><option>All personas</option>${state.personas.map(p=>`<option>${p.name}</option>`).join('')}</select></div>
    <div class="card card-pad mb24"><div class="between mb16"><h4 style="font-size:14px">Score trend</h4>${tier('Opt 2')}</div>
      <div class="bars" style="height:140px">${[68,72,70,81,72,85].map((v,i)=>`<div class="bar-col"><span class="bar-v">${v}%</span><div class="bar ${i===5?'hot':''}" style="height:${v}%"></div></div>`).join('')}</div></div>
    <div class="card" style="overflow:hidden"><table class="tbl"><thead><tr><th>Date</th><th>Persona</th><th>Duration</th><th>Score</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>`;
  return {html:shell(t('nav_history'),html), after:wireShell};
}

// ============================================================
//  DEMO CONTROLS
// ============================================================
function demoControls(){
  let el=$('#democtrl');
  if(!el){ el=document.createElement('div'); el.id='democtrl'; el.className='demo-ctrl'; document.body.appendChild(el); }
  const open=el.classList.contains('open');
  const links=[
    ['PUBLIC & ONBOARDING',[['#/landing','A1 · Landing'],['#/signup','A2 · Sign-up'],['#/plans','A3 · Plans & seats'],['#/checkout','A4 · Checkout'],['#/onboarding','A5 · Onboarding'],['#/login','S1 · Login']]],
    ['ADMIN',[['#/admin/dashboard','B1 · Dashboard'],['#/admin/knowledge','B2 · Knowledge Base'],['#/admin/personas','B3 · Personas'],['#/admin/personas/new','B4 · Persona Builder'],['#/admin/team','B5 · Team & Seats'],['#/admin/analytics','B6 · Analytics'],['#/admin/billing','B7 · Billing'],['#/admin/settings','B8 · Settings']]],
    ['REP',[['#/rep/home','C2 · Home'],['#/rep/coach','C3 · AI Coach'],['#/rep/roleplay','C4 · Persona select'],['#/rep/roleplay/brief','C5 · Pre-brief'],['#/rep/roleplay/live','C6 · Live roleplay'],['#/rep/roleplay/feedback','C7 · Feedback'],['#/rep/history','C8 · History']]],
  ];
  el.innerHTML=`
    <div class="dc-panel">
      <h4>View as</h4>
      <div class="dc-seg">
        <button data-r="public" class="${state.role==='public'?'on':''}">Public</button>
        <button data-r="admin" class="${state.role==='admin'?'on':''}">Admin</button>
        <button data-r="rep" class="${state.role==='rep'?'on':''}">Rep</button>
      </div>
      <h4>Screen map</h4>
      <div class="dc-links">${links.map(g=>`<div class="dc-cat">${g[0]}</div>${g[1].map(l=>`<a href="${l[0]}">${l[1]}</a>`).join('')}`).join('')}</div>
    </div>
    <button class="dc-toggle" title="Demo controls">${open?icon('x'):icon('menu')}</button>`;
  el.querySelector('.dc-toggle').onclick=()=>{ el.classList.toggle('open'); el.querySelector('.dc-toggle').innerHTML=el.classList.contains('open')?icon('x'):icon('menu'); };
  el.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{ state.role=b.dataset.r; go(b.dataset.r==='admin'?'#/admin/dashboard':b.dataset.r==='rep'?'#/rep/home':'#/landing'); });
}

// ============================================================
//  ROUTER
// ============================================================
const ROUTES={
  '#/landing':Landing,'#/plans':Plans,'#/signup':Signup,'#/login':Login,'#/checkout':Checkout,'#/onboarding':Onboarding,
  '#/admin/dashboard':AdminDashboard,'#/admin/knowledge':AdminKnowledge,'#/admin/personas':AdminPersonas,'#/admin/personas/new':AdminPersonaBuilder,
  '#/admin/team':AdminTeam,'#/admin/analytics':AdminAnalytics,'#/admin/billing':AdminBilling,'#/admin/settings':AdminSettings,
  '#/rep/home':RepHome,'#/rep/coach':RepCoach,'#/rep/roleplay':RepRoleplaySelect,'#/rep/roleplay/brief':RepRoleplayBrief,
  '#/rep/roleplay/live':RepRoleplayLive,'#/rep/roleplay/feedback':RepFeedback,'#/rep/history':RepHistory,
};
function render(){
  const hash=location.hash||'#/landing';
  const fn=ROUTES[hash]||Landing;
  if(hash.startsWith('#/admin')) state.role='admin';
  if(hash.startsWith('#/rep')) state.role='rep';
  const {html,after}=fn();
  $('#app').innerHTML=html;
  if(after) after();
  demoControls();
  window.scrollTo(0,0);
}
window.addEventListener('hashchange',render);
window.addEventListener('DOMContentLoaded',()=>{ if(!location.hash) location.hash='#/landing'; render(); });
