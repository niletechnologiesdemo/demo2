/* ============================================================
   Product TBD - Medical Rep, mobile-responsive web (Direction B)
   Same brief and functionality as Direction A; crisper product-UI
   treatment: navy brand header, white surfaces, bottom-sheet brief.
   ============================================================ */
const ICONS = {
  home:'<path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  cap:'<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.3 2.7 2.5 6 2.5s6-1.2 6-2.5v-5"/>',
  chat:'<path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/>',
  mic:'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/>',
  send:'<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  arrow:'<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  back:'<polyline points="15 18 9 12 15 6"/>',
  menu:'<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
  check:'<polyline points="20 6 9 17 4 12"/>',
  file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  bulb:'<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.1 14c.2-1 .65-1.74 1.4-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.75.76 1.2 1.5 1.4 2.5"/>',
  lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  play:'<polygon points="6 4 20 12 6 20 6 4"/>',
  trendup:'<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  zap:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  award:'<circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/>',
  logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  refresh:'<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.5 9a9 9 0 0 1 14.8-3.4L23 10M1 14l4.6 4.4A9 9 0 0 0 20.5 15"/>',
  wifi:'<path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 15.5a5 5 0 0 1 7 0"/><line x1="12" y1="19" x2="12" y2="19"/>',
  signal:'<line x1="4" y1="20" x2="4" y2="16"/><line x1="9" y1="20" x2="9" y2="13"/><line x1="14" y1="20" x2="14" y2="9"/><line x1="19" y1="20" x2="19" y2="5"/>',
  battery:'<rect x="2" y="8" width="18" height="8" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/>',
};
const icon = (n, c='') => `<svg class="icn ${c}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]||''}</svg>`;

const state = {
  screen:'home',
  sheetOpen:false,
  personas:[
    { id:'p1', name:'Dr. Maria Petrou', role:'Cardiologist · Busy hospital', traits:['Skeptical','Time-pressed','Data-driven'], difficulty:'Hard', initials:'MP' },
    { id:'p2', name:'Dr. Andreas Nikolaou', role:'GP · Suburban clinic', traits:['Relationship-led','Price-sensitive'], difficulty:'Medium', initials:'AN' },
    { id:'p3', name:'Dr. Elena Vasiliou', role:'Hospital pharmacist', traits:['Detail-oriented','Risk-averse'], difficulty:'Medium', initials:'EV' },
  ],
  rp:null,
};
const diffBadge = d => d==='Hard'?'b-red':d==='Medium'?'b-amber':'b-green';
const diffSpine = d => d==='Hard'?'hard':d==='Medium'?'med':'easy';

const COACH_QA={
  diff:{a:"Your key differentiator vs the competitor is the 27% relative risk reduction in major cardiovascular events (PROVE-IT trial), plus once-daily dosing versus twice-daily.",c:['Battle Card v2','CardioX Monograph']},
  dose:{a:"Standard adult dosing is 10 mg once daily, with or without food. Titrate to 20 mg after 4 weeks based on response. No adjustment for mild to moderate renal impairment.",c:['Dosage & Safety FAQ']},
  obj:{a:"For “too expensive”, pivot from acquisition cost to total cost of care: fewer events means fewer hospitalisations. Point to the reimbursement support programme.",c:['Objection Handling Playbook']},
  default:{a:"Based on Brand A's approved materials, here are the key points, with sources below.",c:['CardioX Monograph']},
};
const RP_LINES=[
  "I've got 3 minutes between rounds. Why should I switch my patients to CardioX?",
  "27% sounds good, but that's relative risk. What's the absolute benefit?",
  "And the cost compared to what I prescribe now? My budget is stretched.",
  "Side effects are my concern. What do I tell patients worried about switching?",
  "Alright, that's more convincing than I expected. Send me the trial data.",
];

const go = s => { state.screen = s; state.sheetOpen = false; render(); };
function toast(msg){
  const s = document.querySelector('.screen'); if(!s) return;
  let el = s.querySelector('.toast');
  if(!el){ el=document.createElement('div'); el.className='toast'; s.appendChild(el); }
  el.innerHTML = `${icon('check')}<span>${msg}</span>`;
  el.classList.add('show'); clearTimeout(el._t); el._t=setTimeout(()=>el.classList.remove('show'),1900);
}

// ---------- Browser + site chrome ----------
const statusbar = () => `<div class="statusbar"><span>9:41</span><div class="sb-r">${icon('signal','icn-sm')}${icon('wifi','icn-sm')}${icon('battery','icn-sm')}</div></div>`;
const browserbar = () => `<div class="browserbar"><div class="bb-url">${icon('lock','icn-sm')} app.producttbd.com/rep</div><span class="bb-ico">${icon('refresh')}</span></div>`;
const siteheader = () => `<div class="siteheader">
    <button class="sh-menu" data-drawer>${icon('menu')}</button>
    <div class="sh-brand"><img src="../img/logo.png" alt=""><div>Product TBD<small>Brand A workspace</small></div></div>
    <div class="avatar">NG</div>
  </div><div class="brandline"></div>`;
const hdr = () => statusbar() + browserbar() + siteheader();

function pageband(o){
  const left = o.back
    ? `<a class="pb-back" data-nav="${o.back}">${icon('back')} ${o.title}</a>`
    : `<h2>${o.iconName?icon(o.iconName,'icn-sm'):''} ${o.title}</h2>`;
  return `<div class="pageband">${left}${o.right||''}</div>`;
}

const NAV = [['home','home','Home'],['coach','cap','Ask the Coach'],['roleplay','chat','Practice Roleplay'],['history','clock','My History']];
function drawer(){
  const map = { home:'home', coach:'coach', roleplay:'roleplay', rplive:'roleplay', rpvoice:'roleplay', feedback:'roleplay', history:'history' };
  const active = map[state.screen]||'home';
  const items = NAV.map(n=>`<a class="dr-item ${active===n[0]?'on':''}" data-nav="${n[0]}">${icon(n[1])} ${n[2]}</a>`).join('');
  return `<div class="scrim" data-close></div><aside class="drawer">
    <div class="dr-brand"><img src="../img/logo.png" alt=""><div><b>Product TBD</b><small>Brand A workspace</small></div></div>
    <div class="dr-label">Train</div>
    <nav class="dr-nav">${items}</nav>
    <div class="dr-foot"><a data-close>${icon('logout')} Exit to site</a></div>
  </aside>`;
}

// ---------- Screens ----------
function Home(){
  return `${hdr()}
    <div class="body">
      <section class="sect greet">
        <h1>Hi Nikos</h1>
        <p>Friday · Brand A · Medical Rep</p>
      </section>
      <section class="sect goal">
        <div class="g-top"><span>Weekly goal</span><b>14 of 20 roleplays</b></div>
        <div class="gbar"><i style="width:70%"></i></div>
        <div class="g-meta">
          <span class="pill">${icon('zap')} 4-day streak</span>
          <span class="pill soft">72% last score</span>
          <span class="pill soft">#2 team rank</span>
        </div>
      </section>
      <section class="sect">
        <div class="s-label">What would you like to do?</div>
        <div class="quick">
          <a class="qt orange" data-nav="coach"><span class="q-ic">${icon('cap')}</span><span><b>Ask the Coach</b><small>Instant sourced answers</small></span><span class="q-arrow">${icon('arrow')}</span></a>
          <a class="qt navy" data-nav="roleplay"><span class="q-ic">${icon('chat')}</span><span><b>Practice Roleplay</b><small>Rehearse objections</small></span><span class="q-arrow">${icon('arrow')}</span></a>
        </div>
      </section>
      <section style="padding:14px 0 4px">
        <div class="s-label" style="padding:0 20px;margin-bottom:4px">Continue where you left off</div>
        <div class="lrow" data-persona="p1">
          <div class="av-soft">MP</div>
          <div><b>Dr. Maria Petrou</b><div class="l-meta">Last roleplay · 72%</div></div>
          <span class="l-go">${icon('arrow')}</span>
        </div>
      </section>
    </div>
    ${drawer()}`;
}

function Coach(){
  return `${hdr()}
    ${pageband({title:'Ask the Coach', iconName:'cap', right:`<span class="lock-chip">${icon('lock')} Brand A only</span>`})}
    <div class="chat-body" id="thread">
      <div class="msg bot"><div class="ma"><img src="../img/logo.png" alt=""></div><div class="mb">Hi Nikos. Ask me anything about your products. I answer only from Brand A's approved documents, with sources.</div></div>
      <div class="suggest" id="sugg">
        <button data-q="diff">${icon('zap')} Key differentiator vs the competitor?</button>
        <button data-q="dose">${icon('file')} Standard dosing for CardioX?</button>
        <button data-q="obj">${icon('chat')} Handle the “too expensive” objection?</button>
      </div>
    </div>
    <div class="chat-input">
      <button class="ci-btn" title="Voice">${icon('mic')}</button>
      <input id="cin" placeholder="Ask a product question…">
      <button class="ci-btn send" data-send>${icon('send','icn-sm')}</button>
    </div>
    ${drawer()}`;
}

function RoleplayList(){
  const rows = state.personas.map(p=>`
    <div class="prow" data-persona="${p.id}">
      <span class="spine ${diffSpine(p.difficulty)}"></span>
      <div class="p-main">
        <b>${p.name}</b>
        <div class="p-role">${p.role}</div>
        <div class="p-traits">${p.traits.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      </div>
      <span class="badge ${diffBadge(p.difficulty)}">${p.difficulty}</span>
    </div>`).join('');
  const p = state.rp ? state.rp.persona : null;
  const sheet = p ? `
    <div class="sheet ${state.sheetOpen?'':''}" id="sheet">
      <div class="grab"></div>
      <div class="sh-top"><div class="sh-av">${p.initials}</div><div><b>${p.name}</b><div class="sh-role">${p.role} · ${p.difficulty}</div></div></div>
      <div class="s-label">Personality</div>
      <div class="p-traits">${p.traits.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      <div class="s-label">Scenario</div>
      <div class="scenario"><b>First meeting, ~3 minutes.</b> ${p.name.split(' ')[1]} is ${p.difficulty==='Hard'?'skeptical and pressed for time':'open but cautious'}. Objections come from Brand A's real product facts.</div>
      <div class="s-label">Mode</div>
      <div class="seg" id="mode">
        <button class="on" data-mode="text">${icon('chat')} Text</button>
        <button data-mode="voice">${icon('mic')} Voice</button>
      </div>
      <button class="btn btn-primary btn-block" data-action="startrp">${icon('play','icn-sm')} Start roleplay</button>
    </div>` : '';
  return `${hdr()}
    ${pageband({title:'Practice Roleplay', iconName:'chat', right:`<span class="pb-sub">${state.personas.length} personas</span>`})}
    <div class="body">${rows}</div>
    ${drawer()}${sheet}`;
}

function Live(){
  const p = state.rp.persona;
  return `${hdr()}
    ${pageband({title:`${p.name} · in character`, back:'roleplay', right:`<button class="pb-end" data-action="endrp">End session</button>`})}
    <div class="chat-body" id="rpthread">
      <div style="text-align:center;font-size:11.5px;color:var(--text-3);margin:-2px 0 4px">2:48 left · transcript captured for scoring</div>
      <div class="msg persona"><div class="ma">${p.initials}</div><div class="mb">"${RP_LINES[0]}"</div></div>
    </div>
    <div class="chat-input">
      <button class="ci-btn" title="Hint">${icon('bulb')}</button>
      <input id="rpin" placeholder="Type your response…">
      <button class="ci-btn send" data-rpsend>${icon('send','icn-sm')}</button>
    </div>
    ${drawer()}`;
}

function Voice(){
  const p = state.rp.persona;
  return `${statusbar()}${browserbar()}
    <div class="voice">
      <div class="v-top"><span class="v-timer"><span class="v-rec"></span> 02:48</span><button class="v-btn" style="width:40px;height:40px;border-radius:12px" data-action="endrp">${icon('x','icn-sm')}</button></div>
      <div class="v-mid">
        <div class="v-av-wrap"><span class="v-ring b"></span><span class="v-ring a"></span><div class="v-av">${p.initials}</div></div>
        <div class="v-name">${p.name}</div>
        <div class="v-role">${p.role} · ${p.difficulty}</div>
        <div class="v-status"><span class="v-eq"><i></i><i></i><i></i><i></i></span> In character, speaking</div>
        <p class="v-line" id="vline">"${RP_LINES[0]}"</p>
      </div>
      <div class="v-ctrl">
        <button class="v-btn" title="Hint">${icon('bulb')}</button>
        <button class="v-mic" data-action="rpnext">${icon('mic')}</button>
        <button class="v-btn end" data-action="endrp">${icon('x')}</button>
      </div>
      <div class="v-hint">Hold to respond · transcript captured for scoring</div>
    </div>`;
}

function Feedback(){
  const p = state.rp?.persona || state.personas[0];
  return `${hdr()}
    ${pageband({title:'Session complete', iconName:'check', right:`<span class="pb-sub">just now</span>`})}
    <div class="body">
      <section class="sect score-band">
        <div class="score-num">72<small>%</small></div>
        <div class="score-info">
          <div class="si-t">Roleplay with ${p.name}</div>
          <div class="si-s">3 minutes · text mode</div>
          <span class="delta">${icon('trendup')} +4 vs your last session</span>
        </div>
      </section>
      <section class="sect">
        <div class="s-label">Rubric breakdown</div>
        ${rb('Product accuracy',82)}${rb('Objection handling',68,true)}${rb('Compliance & claims',90)}${rb('Confidence & rapport',70,true)}
      </section>
      <section class="sect">
        <div class="note good"><h4>${icon('check','icn-sm')} What went well</h4><ul><li>${icon('check')} Led with the PROVE-IT outcome data.</li><li>${icon('check')} Stayed compliant; no off-label claims.</li></ul></div>
        <div class="note improve"><h4>${icon('trendup','icn-sm')} What to improve</h4><ul><li>${icon('arrow')} Pivot to total-cost-of-care sooner.</li><li>${icon('arrow')} Acknowledge the safety concern first.</li></ul></div>
      </section>
      <section class="sect fb-actions">
        <button class="btn btn-primary btn-block" data-nav="history">${icon('check','icn-sm')} Save to history</button>
        <button class="btn btn-ghost btn-block" data-persona="${p.id}">${icon('refresh','icn-sm')} Practice again</button>
      </section>
    </div>
    ${drawer()}`;
}
const rb = (t,v,hot) => `<div class="rb"><div class="rb-t"><span>${t}</span><b>${v}%</b></div><div class="meter"><i class="${hot?'hot':''}" style="width:${v}%"></i></div></div>`;

function History(){
  const rows=[['Today','Dr. Maria Petrou','72%','b-amber'],['Yesterday','Dr. Andreas Nikolaou','85%','b-green'],['Jun 24','Dr. Maria Petrou','68%','b-amber'],['Jun 22','Dr. Elena Vasiliou','81%','b-green']];
  return `${hdr()}
    ${pageband({title:'My History', iconName:'clock', right:`<span class="pb-sub">last 30 days</span>`})}
    <div class="body">
      <section class="sect">
        <div class="s-label">Score trend</div>
        <div class="bars">${[68,72,70,81,72,85].map((v,i)=>`<div class="bc"><span class="bv">${v}</span><div class="bar ${i===5?'hot':''}" style="height:${v}%"></div></div>`).join('')}</div>
      </section>
      <section style="padding-top:8px">
        <div class="s-label" style="padding:0 20px;margin-bottom:2px">Sessions</div>
        ${rows.map(r=>`<div class="lrow"><div class="av-soft">${r[1].split(' ')[1][0]}${r[1].split(' ')[1][1]}</div><div><b>${r[1]}</b><div class="l-meta">${r[0]} · roleplay</div></div><span class="badge ${r[3]}" style="margin-left:auto">${r[2]}</span></div>`).join('')}
      </section>
    </div>
    ${drawer()}`;
}

const SCREENS = { home:Home, coach:Coach, roleplay:RoleplayList, rplive:Live, rpvoice:Voice, feedback:Feedback, history:History };

// ---------- render + wire ----------
function render(){
  const scr = document.querySelector('.screen');
  scr.innerHTML = SCREENS[state.screen]();
  wire(scr);
  const b = scr.querySelector('.body, .chat-body'); if(b) b.scrollTop = 0;
  if(state.sheetOpen){
    setTimeout(()=>{
      const sh=scr.querySelector('#sheet'), sc=scr.querySelector('.scrim');
      if(sh) sh.classList.add('open');
      if(sc) sc.classList.add('open');
    },30);
  }
}
function openDrawer(scr,on){ const d=scr.querySelector('.drawer'), s=scr.querySelector('.scrim'); if(!d)return; d.classList.toggle('open',on); if(s) s.classList.toggle('open',on); }
function closeSheet(scr){
  const sh=scr.querySelector('#sheet'), sc=scr.querySelector('.scrim');
  if(sh) sh.classList.remove('open');
  if(sc) sc.classList.remove('open');
  state.sheetOpen=false;
}
function wire(scr){
  const dr = scr.querySelector('[data-drawer]'); if(dr) dr.onclick=()=>openDrawer(scr,true);
  scr.querySelectorAll('[data-close]').forEach(c=>c.onclick=()=>{ openDrawer(scr,false); if(state.sheetOpen) closeSheet(scr); });
  scr.querySelectorAll('[data-nav]').forEach(n=>n.onclick=()=>go(n.dataset.nav));
  scr.querySelectorAll('[data-persona]').forEach(b=>b.onclick=()=>{
    state.rp={persona:state.personas.find(p=>p.id===b.dataset.persona),idx:0,mode:'text'};
    state.sheetOpen=true;
    if(state.screen!=='roleplay'){ state.screen='roleplay'; }
    render();
  });

  // scrim closes whichever overlay is open
  const scrim = scr.querySelector('.scrim');
  if(scrim) scrim.onclick=()=>{ openDrawer(scr,false); closeSheet(scr); };

  if(state.screen==='coach'){
    const thread=scr.querySelector('#thread'), inp=scr.querySelector('#cin');
    const ask=(k,text)=>{
      const s=scr.querySelector('#sugg'); if(s) s.remove();
      thread.insertAdjacentHTML('beforeend',`<div class="msg user"><div class="ma">NG</div><div class="mb">${text}</div></div>`);
      const qa=COACH_QA[k]||COACH_QA.default;
      const typ=document.createElement('div'); typ.className='msg bot'; typ.innerHTML=`<div class="ma"><img src="../img/logo.png" alt=""></div><div class="mb"><div class="typing"><i></i><i></i><i></i></div></div>`;
      thread.appendChild(typ); thread.scrollTop=9e9;
      setTimeout(()=>{ typ.querySelector('.mb').innerHTML=`${qa.a}<div class="cites">${qa.c.map(c=>`<span class="cite">${icon('file','icn-sm')} ${c}</span>`).join('')}</div>`; thread.scrollTop=9e9; },850);
    };
    scr.querySelectorAll('#sugg button').forEach(b=>b.onclick=()=>ask(b.dataset.q,b.textContent.trim()));
    const send=()=>{ const v=inp.value.trim(); if(!v)return; const k=/diff|compet/i.test(v)?'diff':/dos|mg/i.test(v)?'dose':/cost|expens|price|object/i.test(v)?'obj':'default'; inp.value=''; ask(k,v); };
    scr.querySelector('[data-send]').onclick=send;
    inp.onkeydown=e=>{ if(e.key==='Enter')send(); };
  }

  if(state.screen==='roleplay' && state.sheetOpen){
    scr.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{ scr.querySelectorAll('[data-mode]').forEach(x=>x.classList.remove('on')); b.classList.add('on'); state.rp.mode=b.dataset.mode; });
    const st = scr.querySelector('[data-action="startrp"]');
    if(st) st.onclick=()=>go(state.rp.mode==='voice'?'rpvoice':'rplive');
  }

  if(state.screen==='rplive'){
    const thread=scr.querySelector('#rpthread'), inp=scr.querySelector('#rpin'), p=state.rp.persona;
    const personaTurn=(text,final)=>{
      const typ=document.createElement('div'); typ.className='msg persona'; typ.innerHTML=`<div class="ma">${p.initials}</div><div class="mb"><div class="typing"><i></i><i></i><i></i></div></div>`;
      thread.appendChild(typ); thread.scrollTop=9e9;
      setTimeout(()=>{ typ.querySelector('.mb').innerHTML='"'+text+'"'; thread.scrollTop=9e9;
        if(final){ thread.insertAdjacentHTML('beforeend',`<div style="text-align:center;padding:10px 0"><button class="btn btn-primary btn-sm" data-action="endrp">See feedback ${icon('arrow','icn-sm')}</button></div>`); scr.querySelectorAll('[data-action="endrp"]').forEach(b=>b.onclick=()=>go('feedback')); }
      },850);
    };
    const send=()=>{ const v=inp.value.trim(); if(!v)return; inp.value='';
      thread.insertAdjacentHTML('beforeend',`<div class="msg user"><div class="ma">NG</div><div class="mb">${v}</div></div>`); thread.scrollTop=9e9;
      state.rp.idx++;
      if(state.rp.idx>=RP_LINES.length){ personaTurn(RP_LINES[RP_LINES.length-1],true); return; }
      personaTurn(RP_LINES[state.rp.idx]);
    };
    scr.querySelector('[data-rpsend]').onclick=send;
    inp.onkeydown=e=>{ if(e.key==='Enter')send(); };
    scr.querySelectorAll('[data-action="endrp"]').forEach(b=>b.onclick=()=>go('feedback'));
  }

  if(state.screen==='rpvoice'){
    scr.querySelector('[data-action="rpnext"]').onclick=()=>{ state.rp.idx++; if(state.rp.idx>=RP_LINES.length){ go('feedback'); return; } scr.querySelector('#vline').textContent='"'+RP_LINES[state.rp.idx]+'"'; };
    scr.querySelectorAll('[data-action="endrp"]').forEach(b=>b.onclick=()=>go('feedback'));
  }

  if(state.screen==='feedback'){ toast('Saved to your history'); }
}

document.addEventListener('DOMContentLoaded', render);
