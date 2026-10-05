/* ==========================================================
   MERIT · core: state, navigation, home wheel, root tabs
   ========================================================== */
const ico = (n,s=20,cls='') => `<svg width="${s}" height="${s}" class="${cls}"><use href="#i-${n}"/></svg>`;
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const money = n => (n<0?'−':'') + '£' + Math.abs(n).toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2});
const money0 = n => '£' + Math.round(n).toLocaleString('en-GB');
const img = f => IMG + f;
const byId = (arr,id) => arr.find(x => x.id === id);
const cat = id => byId(CATS,id);
const SCREENS = {}, AFTER = {};
const T = [];
const later = (fn,ms) => { const t = setTimeout(fn,ms); T.push(t); return t; };
const every = (fn,ms) => { const t = setInterval(fn,ms); T.push(t); return t; };
const clearTimers = () => { T.forEach(t => { clearTimeout(t); clearInterval(t); }); T.length = 0; };

/* ---------- state ---------- */
let S;
function freshState(){
  return {
    stack:[{n:'welcome'}], tab:'home', signedIn:false,
    balance:USER.balance, points:USER.points,
    wheel:{ cat:0, sub:null },
    activity:ACTIVITY_SEED.map(a=>({...a})), wallet:WALLET_SEED.map(w=>({...w})),
    notifs:NOTIFS.length,
    ride:{ dest:null, tier:'go', status:'idle', when:'now', driver:null },
    basket:{ rid:null, items:{}, mode:'delivery' },
    reserve:{ rid:null, time:'19:30', party:2 },
    provFilter:'all', inquiry:{ type:'Renovation', when:'Within 3 months', msg:'', contact:'app' }, threads:{},
    viewing:{ id:null, slot:null },
    bag:[], prodOpt:{ size:null, color:0 },
    liked:new Set(['dress']), diningFilter:'all', listFilter:'all', atelierTab:'newin',
    phone:'', otp:0,
  };
}

/* ---------- navigation ---------- */
let animating = false;
function go(n,p){ if(animating) return; S.stack.push({n,p}); render('push'); }
function back(){ if(animating || S.stack.length<2) return; S.stack.pop(); render('pop'); }
function replace(n,p){ S.stack[S.stack.length-1] = {n,p}; render('fade'); }
function setTab(t){ if(S.tab===t && S.stack.length===1) return; S.tab=t; S.stack=[{n:t}]; render('fade'); }
function home(){ S.tab='home'; S.stack=[{n:'home'}]; render('fade'); }
function refresh(){ render('none'); }

function render(mode='fade'){
  clearTimers();
  const app = document.getElementById('app');
  const top = S.stack[S.stack.length-1];
  const fn = SCREENS[top.n];
  if(!fn){ console.error('no screen', top.n); return; }
  const prev = app.querySelector('.screen');
  const scrollPos = (mode==='none' && prev) ? (prev.querySelector('.scroll')||{}).scrollTop : 0;
  const el = document.createElement('div');
  el.className = 'screen ' + (top.n==='home'?'home ':'');
  el.innerHTML = fn(top.p);
  if(mode==='push'){ el.classList.add('enter-r'); if(prev) prev.classList.add('exit-l'); }
  else if(mode==='pop'){ el.classList.add('enter-l'); if(prev) prev.classList.add('exit-r'); el.style.zIndex=0; if(prev) prev.style.zIndex=2; }
  else if(mode==='fade'){ el.classList.add('fade'); }
  app.appendChild(el);
  if(AFTER[top.n]) AFTER[top.n](el, top.p);
  if(mode==='none' && scrollPos){ const sc = el.querySelector('.scroll'); if(sc) sc.scrollTop = scrollPos; }
  if(prev){
    if(mode==='none'){ prev.remove(); }
    else { animating = true; setTimeout(()=>{ prev.remove(); animating=false; }, 380); }
  }
  syncStage();
}

/* ---------- shared chrome ---------- */
function statusbar(light){ return `<div class="statusbar ${light?'light':''}"><span>09:41</span><span class="dots"><b></b><b></b><b></b><b></b>&nbsp;${ico('activity',14)}</span></div>`; }
function navbar(title, sub='', right=''){
  return statusbar() + `<div class="navbar"><button class="backbtn" data-back>${ico('left',18)}</button>
    <div class="ttl">${title}${sub?`<small>${sub}</small>`:''}</div>${right}</div>`;
}
function floatnav(right=''){ return `<div class="floatnav"><button class="backbtn glass" data-back>${ico('left',18)}</button><span class="grow"></span>${right}</div>`; }
function tabbar(){
  const tabs = [['home','grid','Merit'],['activity','activity','Activity'],['wallet','wallet','Wallet'],['profile','user','Profile']];
  return `<div class="tabbar">${tabs.map(([t,i,l]) => `<button class="tb ${S.tab===t?'on':''}" data-tab="${t}"><span class="dot"></span>${ico(i,22)}<span>${l}</span></button>`).join('')}</div>`;
}
function modtag(m){ const c = cat(m) || {name:'Merit'}; return `<span class="modtag mod-${m}">${c.name.split(' ')[0]}</span>`; }
function sech(t,a='',act=''){ return `<div class="sech"><span class="t">${t}</span>${a?`<button class="a" ${act}>${a}</button>`:''}</div>`; }
function stars(r){ return `<span class="stars">${ico('star',12)}${r}</span>`; }
function successMark(gold){ return `<div class="successmark ${gold?'gold':''} pop">${ico('check',40)}</div>`; }
function payrow(label='Merit Wallet'){ return `<div class="payrow">${ico('wallet',20)}<div class="g">${label}<small>Balance ${money(S.balance)} · Merit Points earned on every spend</small></div><span class="badge badge-gold">Default</span></div>`; }

function toast(msg, icon='check'){
  const w = document.getElementById('toasts');
  const t = document.createElement('div'); t.className='toast'; t.innerHTML = ico(icon,18) + `<span>${msg}</span>`;
  w.appendChild(t); setTimeout(()=>{ t.classList.add('out'); setTimeout(()=>t.remove(),320); }, 2400);
}
function openSheet(html){ const s = document.getElementById('sheet'); s.className='sheetwrap on'; s.innerHTML = `<div class="scrim" data-close></div><div class="sheet"><div class="grab"></div>${html}</div>`; }
function closeSheet(){ const s = document.getElementById('sheet'); if(!s.classList.contains('on')) return; s.classList.add('closing'); setTimeout(()=>{ s.className='sheetwrap'; s.innerHTML=''; },280); }

/* wallet helpers */
function spend(n, label, mod){ S.balance -= n; S.points += Math.round(n*2); S.wallet.unshift({n:label, s:'Just now', v:-n, mod}); }
function addActivity(a){ S.activity.unshift({ id:'a'+Date.now(), ...a }); }

/* ==========================================================
   WELCOME · AUTH
   ========================================================== */
SCREENS.welcome = () => `
  <div class="cine"><img src="${img('city-dusk.jpg')}" alt=""><div class="scrim"></div></div>
  ${statusbar(true)}
  <div class="welcome">
    <img class="seal" src="${img('logo-app.png')}" alt="Merit">
    <div class="wm">MERIT<small>THE SUPER APP</small></div>
    <h1>One city. Every service.<br><em>On merit.</em></h1>
    <p>Rides, restaurants, builders, designers &mdash; one account, one wallet, one standard.</p>
    <div class="modstrip">${CATS.map(c=>`<span>${c.name.split(' ')[0]}</span>`).join('')}<span class="soon">Finance · Phase 2</span></div>
    <div class="acts">
      <button class="btn btn-gold btn-lg" data-go="phone">${ico('phone',18)} Continue with mobile</button>
      <div style="display:flex;gap:10px">
        <button class="btn btn-light btn-block" data-act="social">${ico('apple',18)} Apple</button>
        <button class="btn btn-light btn-block" data-act="social">${ico('google',18)} Google</button>
      </div>
    </div>
    <div class="legal">By continuing you agree to Merit’s terms and privacy policy.</div>
  </div>`;

SCREENS.phone = () => navbar('') + `
  <div class="scroll"><div class="authwrap">
    <span class="eyebrow gold">Step 1 of 2</span>
    <h2>Your mobile number</h2>
    <p>We’ll send a six-digit code. Your number is your Merit ID across every service.</p>
    <div class="field"><label>Mobile</label><div class="in"><span class="pre">+44</span><input id="phonein" inputmode="tel" placeholder="7351 166 670" value="${esc(S.phone)}" autofocus></div></div>
    <button class="btn btn-primary btn-block btn-lg" style="margin-top:22px" data-act="sendcode">Send code ${ico('right',18)}</button>
    <div class="note">Merit never shares your number with a driver, restaurant or contractor. Calls are relayed.</div>
  </div></div>`;
AFTER.phone = el => { const i = el.querySelector('#phonein'); i.addEventListener('input', e => S.phone = e.target.value); };

SCREENS.otp = () => navbar('') + `
  <div class="scroll"><div class="authwrap">
    <span class="eyebrow gold">Step 2 of 2</span>
    <h2>Enter the code</h2>
    <p>Sent to +44 ${esc(S.phone||'7351 166 670')}. It fills in automatically on this device.</p>
    <div class="otp" id="otp">${[0,1,2,3,4,5].map(()=>'<b></b>').join('')}</div>
    <div class="resend">Didn’t get it? <b>Resend in 0:24</b></div>
  </div></div>`;
AFTER.otp = el => {
  const code = '4 8 2 9 1 7'.split(' '); const cells = el.querySelectorAll('#otp b');
  code.forEach((c,i)=> later(()=>{ cells[i].textContent=c; cells[i].classList.add('f'); }, 500+i*140));
  later(()=>{ S.signedIn = true; home(); toast(`Welcome to Merit, ${USER.first}`,'sparkle'); }, 1900);
};

/* ==========================================================
   HOME · the wheel
   ========================================================== */
const WHEEL = { R:159, r:62, N:CATS.length };
function segPath(i){
  const {R,r,N} = WHEEL, cx=159, cy=159, gap=1.6;
  const a0 = (i*360/N - 90 - 180/N + gap) * Math.PI/180, a1 = ((i+1)*360/N - 90 - 180/N - gap) * Math.PI/180;
  const p = (rad,a)=>[cx+rad*Math.cos(a), cy+rad*Math.sin(a)];
  const [x0,y0]=p(R-4,a0),[x1,y1]=p(R-4,a1),[x2,y2]=p(r+8,a1),[x3,y3]=p(r+8,a0);
  return `M${x0} ${y0} A${R-4} ${R-4} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${r+8} ${r+8} 0 0 0 ${x3} ${y3} Z`;
}
function wheelHTML(){
  const sel = S.wheel.cat, rot = -sel*360/WHEEL.N;
  return `
  <div class="wheelwrap" id="wheelwrap">
    <div class="pointer"></div>
    <div class="wheel" id="wheel" style="transform:rotate(${rot}deg)">
      <svg viewBox="0 0 318 318">
        <circle class="ring" cx="159" cy="159" r="158"/>
        <circle class="ringo" cx="159" cy="159" r="150"/>
        ${CATS.map((c,i)=>`<g class="seg ${i===sel?'on':''} ${c.locked?'locked':''}" data-seg="${i}"><path class="fill" d="${segPath(i)}"/></g>`).join('')}
      </svg>
    </div>
    ${CATS.map((c,i)=>{ const a = i*360/WHEEL.N + rot; const rad = (WHEEL.R+WHEEL.r)/2 + 4;
      return `<div class="seglabel ${i===sel?'on':''} ${c.locked?'locked':''}" data-lbl="${i}" style="transform:rotate(${a}deg) translate(0,-${rad}px) rotate(${-a}deg)">
        <div class="ic">${ico(c.locked?'lock':c.icon,18)}</div><div class="n">${c.name}</div><div class="s">${c.sub}</div></div>`; }).join('')}
    <button class="meritbtn ${S.wheel.sub?'ready':''}" id="meritbtn" data-act="merit">
      <span class="halo"></span><span class="halo h2"></span>
      <img src="${img('logo-round.png')}" alt="Merit">
      <span class="go" id="meritgo">${meritLabel()}</span>
    </button>
  </div>`;
}
function meritLabel(){ const c = CATS[S.wheel.cat]; const s = c.subs.find(x=>x.id===S.wheel.sub); return s ? s.n : 'Pick a service'; }
function subrowHTML(){
  const c = CATS[S.wheel.cat];
  if(c.locked) return `<div class="subrow"><div class="k">Phase 2 · Finance</div>
    <div class="lockednote">Global money transfer, Merit Pay and savings arrive once the network is live. <b>Built on the same wallet you already hold.</b></div>
    <div class="subchips" style="margin-top:10px">${c.subs.map(s=>`<span class="subchip soon">${ico('lock',14)} ${s.n}</span>`).join('')}</div></div>`;
  return `<div class="subrow"><div class="k">${c.name} · choose a service</div>
    <div class="subchips">${c.subs.map(s=>`<button class="subchip ${S.wheel.sub===s.id?'on':''}" data-sub="${s.id}">${ico(s.icon,15)} ${s.n}</button>`).join('')}</div></div>`;
}
SCREENS.home = () => {
  const c = CATS[S.wheel.cat];
  const live = S.activity.filter(a=>a.live);
  return `
  <div class="homebg" id="homebg">${CATS.map((x,i)=>`<img src="${img(x.bg)}" data-bg="${i}" class="${i===S.wheel.cat?'on':''}" alt="">`).join('')}<div class="scrim"></div><div class="tint"></div></div>
  <div class="topchrome" id="topchrome">${statusbar()}
    <div class="homebar">
      <div class="avatar" data-tab="profile"><img src="${img(USER.avatar)}" alt=""></div>
      <div class="hi"><div class="g">Good morning</div><div class="n">${USER.first}</div></div>
      <button class="iconbtn" data-act="notifs">${ico('bell',18)}${S.notifs?`<span class="pip">${S.notifs}</span>`:''}</button>
      <button class="iconbtn" data-act="search">${ico('search',18)}</button>
    </div>
  </div>
  <div class="scroll" id="homescroll">
    <div class="hubhead"><div class="k">${USER.area}</div><h2 id="hubhead">${c.head}</h2></div>
    ${wheelHTML()}
    <div id="subrow">${subrowHTML()}</div>
    <div class="pad pb">
      ${live.length ? sech('Live now','See all','data-tab="activity"') + `<div class="card tight">${live.slice(0,2).map(a=>activityRow(a)).join('')}</div>` : ''}
      ${sech('Today, for you','')}
      <div class="rail">${PICKS.map(p=>`<button class="pick" data-go="${p.go}" data-p='${JSON.stringify(p.p2)}'><img src="${img(p.img)}" alt=""><div class="sc"></div><span class="tagm">${modtag(p.mod)}</span>
        <div class="in"><div class="k">${p.k}</div><h4>${p.h}</h4><p>${p.p}</p></div></button>`).join('')}</div>
      ${sech('Your Merit','Wallet','data-tab="wallet"')}
      <div class="statrow">
        <div class="s"><div class="v">${money0(S.balance)}</div><div class="k">Balance</div></div>
        <div class="s"><div class="v">${S.points.toLocaleString()}</div><div class="k">Points</div></div>
        <div class="s"><div class="v">4</div><div class="k">Services</div></div>
      </div>
    </div>
  </div>
  ${tabbar()}`;
};
AFTER.home = el => {
  const sc = el.querySelector('#homescroll'), chrome = el.querySelector('#topchrome');
  sc.addEventListener('scroll', ()=> chrome.classList.toggle('solid', sc.scrollTop > 120));
  el.querySelectorAll('[data-seg]').forEach(g => g.addEventListener('click', e => selectCat(+g.dataset.seg, el)));
  el.querySelectorAll('[data-lbl]').forEach(l => l.style.pointerEvents='none');
};
function selectCat(i, el){
  if(i === S.wheel.cat){ return; }
  S.wheel.cat = i; S.wheel.sub = null;
  const rot = -i*360/WHEEL.N;
  el.querySelector('#wheel').style.transform = `rotate(${rot}deg)`;
  el.querySelectorAll('[data-seg]').forEach(g => g.classList.toggle('on', +g.dataset.seg===i));
  el.querySelectorAll('[data-lbl]').forEach(l => { const k=+l.dataset.lbl; const a = k*360/WHEEL.N + rot; const rad=(WHEEL.R+WHEEL.r)/2+4;
    l.style.transform = `rotate(${a}deg) translate(0,-${rad}px) rotate(${-a}deg)`; l.classList.toggle('on', k===i); });
  el.querySelectorAll('[data-bg]').forEach(b => b.classList.toggle('on', +b.dataset.bg===i));
  const h = el.querySelector('#hubhead'); h.style.opacity=0; setTimeout(()=>{ h.innerHTML = CATS[i].head; h.style.opacity=1; }, 220);
  el.querySelector('#subrow').innerHTML = subrowHTML();
  el.querySelector('#meritgo').textContent = meritLabel();
  el.querySelector('#meritbtn').classList.remove('ready');
}
function selectSub(id, el){
  S.wheel.sub = id;
  el.querySelectorAll('[data-sub]').forEach(b => b.classList.toggle('on', b.dataset.sub===id));
  el.querySelector('#meritgo').textContent = meritLabel();
  el.querySelector('#meritbtn').classList.add('ready');
}
function pressMerit(){
  const c = CATS[S.wheel.cat];
  if(c.locked){ go('finance'); return; }
  const sub = S.wheel.sub || c.subs[0].id;
  S.wheel.sub = sub;
  launch(c.id, sub);
}
function launch(catId, sub){
  switch(catId){
    case 'transport':
      S.ride = { dest: sub==='airport' ? 'lhr' : null, tier: sub==='chauffeur' ? 'chauffeur' : 'go', status:'idle', when: sub==='schedule' ? 'later' : 'now', driver:null };
      go(sub==='airport' ? 'tiers' : 'ride', {sub}); break;
    case 'dining':
      S.diningFilter = sub==='kitchens' ? 'kitchens' : 'all'; S.basket.mode = sub==='collect' ? 'collection' : 'delivery';
      go('dining', {sub}); break;
    case 'build':
      if(sub==='buy'){ go('listings'); } else if(sub==='sell'){ go('inquiry', 'meritprop'); } else { S.provFilter = sub==='architects' ? 'architects' : 'builders'; go('build', {sub}); } break;
    case 'design':
      S.atelierTab = sub==='designers' ? 'designers' : 'newin'; go('atelier', {sub}); break;
  }
}

/* ==========================================================
   ACTIVITY · WALLET · PROFILE
   ========================================================== */
function activityRow(a){
  return `<button class="actrow" style="padding:13px 16px" data-act="openactivity" data-arg="${a.id}">
    <div class="thumb"><img src="${img(a.img)}" alt=""></div>
    <div class="g"><div class="n">${a.n}</div><div class="m">${modtag(a.mod)}<span>${a.s}</span></div></div>
    <div class="v">${a.v>=1000?money0(a.v):money(a.v)}<small style="color:${a.live?'var(--gold)':'var(--success)'}">${a.status}</small></div></button>`;
}
SCREENS.activity = () => statusbar() + `
  <div class="navbar" style="padding-left:20px"><div class="ttl" style="font-size:1.3rem">Activity<small>Every service · one history</small></div><button class="iconbtn" data-act="filter">${ico('filter',18)}</button></div>
  <div class="scroll"><div class="pad pb">
    <div class="chips">${['All','Transport','Dining','Build','Designer'].map((c,i)=>`<button class="chip ${i===0?'on':''}">${c}</button>`).join('')}</div>
    ${sech('This week')}
    <div class="card tight">${S.activity.slice(0,3).map(activityRow).join('')}</div>
    ${sech('Earlier')}
    <div class="card tight">${S.activity.slice(3).map(activityRow).join('')}</div>
  </div></div>${tabbar()}`;

SCREENS.wallet = () => statusbar() + `
  <div class="navbar" style="padding-left:20px"><div class="ttl" style="font-size:1.3rem">Wallet<small>One balance across Merit</small></div><button class="iconbtn" data-act="soon">${ico('cog',18)}</button></div>
  <div class="scroll"><div class="pad pb">
    <div class="mcard"><div class="sheen"></div>
      <div class="top"><span class="wm">MERIT</span><span class="tier">${USER.tier}</span></div>
      <span class="chip"></span>
      <div class="bal"><div class="k">Available balance</div><div class="v">${money(S.balance)}</div></div>
      <div class="rw"><div><div class="k">Member</div><div class="v">${USER.name.toUpperCase()}</div></div><div><div class="k">No.</div><div class="v">${USER.memberNo}</div></div></div>
    </div>
    <div class="quick">
      <button data-act="topup"><span class="ic">${ico('plus',18)}</span>Top up</button>
      <button data-act="soon"><span class="ic">${ico('send',18)}</span>Send</button>
      <button data-act="soon"><span class="ic">${ico('card',18)}</span>Cards</button>
      <button data-act="soon"><span class="ic">${ico('receipt',18)}</span>Statements</button>
    </div>
    <div class="pointsbar">${ico('sparkle',22)}<div class="g"><div class="n">Merit Points</div><div class="s">2 points per £1, on every service. Redeem anywhere in Merit.</div></div><div class="v">${S.points.toLocaleString()}</div></div>
    <button class="soonbanner" data-go="finance" style="width:100%;text-align:left"><img src="${img('city-aerial.jpg')}" alt=""><div class="sc"></div>
      <div class="in"><div class="k">Phase 2 · Merit Finance</div><h4>Send money to 190+ countries</h4><p>Lagos, Dubai, New York — from the balance you already hold.</p></div></button>
    ${sech('Recent','See all')}
    <div class="card tight">${S.wallet.map(w=>`<div class="actrow" style="padding:13px 16px">
      <div class="ic mod-${w.mod}">${ico(w.mod==='finance'?'plus':w.mod==='merit'?'sparkle':cat(w.mod).icon,20)}</div>
      <div class="g"><div class="n">${w.n}</div><div class="m">${w.s}</div></div>
      <div class="v" style="color:${w.v>0?'var(--success)':'inherit'}">${w.v>0?'+':''}${Math.abs(w.v)>=1000?money0(w.v):money(w.v)}</div></div>`).join('')}</div>
  </div></div>${tabbar()}`;

SCREENS.profile = () => statusbar() + `
  <div class="profhead"><div class="avatar xl"><img src="${img(USER.avatar)}" alt=""></div><div><div class="n">${USER.name}</div><div class="s">${USER.area} · Member since ${USER.since}</div><span class="badge badge-gold" style="margin-top:6px">${USER.tier}</span></div></div>
  <div class="scroll"><div class="pad pb">
    <div class="statrow" style="margin-top:8px">
      <div class="s"><div class="v">27</div><div class="k">Rides</div></div>
      <div class="s"><div class="v">14</div><div class="k">Orders</div></div>
      <div class="s"><div class="v">3</div><div class="k">Inquiries</div></div>
    </div>
    <button class="biztile" data-act="business"><div class="k">Merit for business</div><h4>Sell, drive, cook or build on Merit</h4><p>Restaurants, drivers, contractors and designers get their own Merit console. Apply in two minutes.</p></button>
    ${sech('Account')}
    <div class="listcard">
      ${[['user','Personal details','Femi Adeyemi · +44 7351 ···670'],['pin','Addresses','Home · Work · 2 saved'],['card','Payment methods','Merit Wallet · HSBC •• 4417'],['heart','Saved','6 restaurants · 4 designers · 2 homes']].map(([i,n,s])=>`<button class="it" data-act="soon"><span class="ic">${ico(i,18)}</span><div class="g"><div class="n">${n}</div><div class="s">${s}</div></div>${ico('right',16)}</button>`).join('')}
    </div>
    ${sech('Preferences')}
    <div class="listcard">
      ${[['bell','Notifications','Rides, orders, milestones'],['shield','Privacy & security','Face ID · relayed calls'],['globe','Language & region','English (UK) · GBP'],['info','Help & support','24/7 concierge']].map(([i,n,s])=>`<button class="it" data-act="soon"><span class="ic">${ico(i,18)}</span><div class="g"><div class="n">${n}</div><div class="s">${s}</div></div>${ico('right',16)}</button>`).join('')}
      <button class="it" data-act="signout"><span class="ic">${ico('out',18)}</span><div class="g"><div class="n">Sign out</div></div></button>
    </div>
  </div></div>${tabbar()}`;

SCREENS.finance = () => `
  <div class="cover tall"><img src="${img('city-aerial.jpg')}" alt=""><div class="sc"></div>${floatnav()}
    <div class="in"><div class="k">Phase 2 · Coming soon</div><h2>Money that moves <em>with you</em>.</h2><p>Merit Finance opens once the network is live: global transfers, Merit Pay at every Merit partner, and savings.</p></div></div>
  <div class="scroll"><div class="pad pb">
    ${sech('What arrives in Phase 2')}
    <div class="listcard">
      ${[['send','Global transfer','Lagos, Accra, Dubai, New York · same-day'],['card','Merit Pay','One tap at every restaurant, ride and store'],['shield','Merit Save','Pots, goals and cashback in one place'],['users','Merit Business accounts','Payouts for drivers, kitchens, contractors, designers']].map(([i,n,s])=>`<div class="it"><span class="ic">${ico(i,18)}</span><div class="g"><div class="n">${n}</div><div class="s">${s}</div></div><span class="badge badge-soft">Soon</span></div>`).join('')}
    </div>
    <div class="escrow"><div class="k">Already live</div><div class="v">${money(S.balance)}</div><p>Your Merit Wallet already settles every service. Finance simply lets it travel.</p></div>
    <button class="btn btn-primary btn-block btn-lg" style="margin-top:18px" data-act="waitlist">Join the Finance waitlist</button>
  </div></div>`;

/* ==========================================================
   sheets
   ========================================================== */
function notifSheet(){
  S.notifs = 0;
  openSheet(`<h3>Notifications</h3><div class="p">Across every Merit service.</div>
    <div class="card tight" style="margin-top:14px">${NOTIFS.map(n=>`<div class="actrow" style="padding:13px 16px"><div class="ic mod-${n.mod}">${ico(n.mod==='merit'?'sparkle':cat(n.mod).icon,20)}</div><div class="g"><div class="n">${n.n}</div><div class="m">${n.s}</div></div><span style="font-size:.66rem;color:var(--ink-3);font-weight:700">${n.t}</span></div>`).join('')}</div>
    <button class="btn btn-ghost btn-block" style="margin-top:14px" data-close>Close</button>`);
  const home = document.querySelector('.homebar .pip'); if(home) home.remove();
}
function searchSheet(){
  openSheet(`<h3>Search Merit</h3><div class="searchfield" style="margin-top:12px">${ico('search',18)}<input placeholder="Croaker, chauffeur, Hampstead, Adaeze…" autofocus></div>
    <div class="p" style="margin-top:14px;font-weight:800;color:var(--ink);font-size:.8rem">Try</div>
    <div class="optrow">${['Ride to Heathrow','Nigerian near me','Kitchen renovation','Made to measure','5 bed Hampstead'].map(t=>`<button class="opt" data-close>${t}</button>`).join('')}</div>`);
}
function businessSheet(){
  openSheet(`<span class="eyebrow gold">Merit for business</span><h3 style="margin-top:6px">Every provider gets a console</h3><div class="p">Drivers, kitchens, contractors and designers run their side of Merit from a dedicated web console — orders, dispatch, payouts, reviews.</div>
    <div class="choicegrid" style="margin-top:14px">${[['car','Drive','Fleet & dispatch'],['chef','Cook','Menus, orders, tables'],['hammer','Build','Leads, quotes, milestones'],['hanger','Design','Store, stock, made-to-order']].map(([i,n,s])=>`<div class="choice"><div class="ic">${ico(i,18)}</div><div class="n">${n}</div><div class="s">${s}</div></div>`).join('')}</div>
    <button class="btn btn-primary btn-block" style="margin-top:16px" data-close>Apply as a partner</button>`);
}

/* ==========================================================
   global event delegation
   ========================================================== */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-go],[data-back],[data-tab],[data-act],[data-close],[data-sub]');
  if(!t) return;
  const scr = document.querySelector('#app .screen:last-child');
  if(t.hasAttribute('data-close')){ closeSheet(); return; }
  if(t.hasAttribute('data-back')){ back(); return; }
  if(t.dataset.tab){ closeSheet(); setTab(t.dataset.tab); return; }
  if(t.dataset.sub){ selectSub(t.dataset.sub, scr); return; }
  if(t.dataset.go){ closeSheet(); let p; try{ p = t.dataset.p ? JSON.parse(t.dataset.p) : undefined; }catch(_){ p = t.dataset.p; } go(t.dataset.go, p); return; }
  if(t.dataset.act){ action(t.dataset.act, t.dataset.arg, t, scr); }
});
function action(a, arg, btn, scr){
  switch(a){
    case 'merit': pressMerit(); break;
    case 'social': S.signedIn = true; home(); toast(`Welcome to Merit, ${USER.first}`,'sparkle'); break;
    case 'sendcode': go('otp'); break;
    case 'notifs': notifSheet(); break;
    case 'search': searchSheet(); break;
    case 'business': businessSheet(); break;
    case 'soon': toast('Included in the full build', 'info'); break;
    case 'filter': toast('Filter by service, date or amount', 'filter'); break;
    case 'topup': S.balance += 250; S.wallet.unshift({n:'Top up · HSBC •• 4417', s:'Just now', v:+250, mod:'finance'}); refresh(); toast('£250 added to your Merit Wallet','wallet'); break;
    case 'waitlist': toast('You’re on the Finance waitlist','check'); break;
    case 'signout': S = freshState(); render('fade'); break;
    case 'openactivity': { const it = byId(S.activity, arg); if(!it) break;
      if(it.thread){ go('thread', it.thread); } else toast(`${it.n} · ${it.status}`,'receipt'); break; }
    default: if(typeof moduleAction === 'function') moduleAction(a, arg, btn, scr);
  }
}

/* ---------- stage ---------- */
function syncStage(){
  const lg = document.getElementById('modlegend'); if(!lg) return;
  lg.innerHTML = CATS.filter(c=>!c.locked).map(c=>`<button class="m" data-jump="${c.id}"><span class="ic mod-${c.id}">${ico(c.icon,17)}</span><div><div class="n">${c.name}</div><div class="s">${c.subs.map(s=>s.n).slice(0,2).join(' · ')}…</div></div></button>`).join('');
}
function boot(){
  S = freshState(); render('fade');
  document.getElementById('resetbtn').onclick = ()=>{ closeSheet(); S = freshState(); render('fade'); toast('Reset to the welcome screen','check'); };
  document.getElementById('skipbtn').onclick = ()=>{ closeSheet(); S.signedIn = true; home(); };
  document.getElementById('modlegend').addEventListener('click', e => { const b = e.target.closest('[data-jump]'); if(!b) return;
    closeSheet(); S.signedIn = true; S.wheel.cat = CATS.findIndex(c=>c.id===b.dataset.jump); S.wheel.sub = null; home(); });
}
