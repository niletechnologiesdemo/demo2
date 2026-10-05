/* ==========================================================
   MERIT · Business Console — Restaurant + Designer store
   ========================================================== */
const ico = (n,s=18) => `<svg width="${s}" height="${s}"><use href="#i-${n}"/></svg>`;
const img = f => IMG + f;
const money = n => '£' + n.toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2});
const money0 = n => '£' + Math.round(n).toLocaleString('en-GB');
const byId = (a,id) => a.find(x=>x.id===id);
const stars = r => `<span style="color:var(--gold);font-weight:800;display:inline-flex;gap:3px;align-items:center">${ico('star',12)}${r}</span>`;
const pill = (t,c='soft') => `<span class="pill badge-${c}">${t}</span>`;

/* ---------------- trade definitions ---------------- */
const TRADES = {
  restaurant: {
    name:'Ìyálọja by Merit', sub:'Restaurant · Mayfair', img:'rest-warm.jpg', hero:'hero-dining.jpg', person:{n:'Tolu Adebayo', role:'Head chef & owner', img:'chef.jpg'},
    nav:[ ['Trading',[['overview','chart','Overview'],['orders','board','Live orders','pip'],['reservations','table','Reservations'],['menu','menu','Menu']]],
          ['Reputation & money',[['reviews','star','Reviews'],['payouts','wallet','Payouts']]],
          ['Account',[['profile','store','Restaurant profile']]] ],
  },
  designer: {
    name:'Adaeze Okonkwo', sub:'Designer store · Peckham studio', img:'designer-adaeze.jpg', hero:'hero-design.jpg', person:{n:'Adaeze Okonkwo', role:'Designer & founder', img:'designer-adaeze.jpg'},
    nav:[ ['Trading',[['overview','chart','Overview'],['orders','board','Orders','pip'],['pieces','hanger','Pieces & stock'],['window','store','Merit Window']]],
          ['Reputation & money',[['reviews','star','Reviews'],['payouts','wallet','Payouts']]],
          ['Account',[['profile','user','Studio profile']]] ],
  },
};

/* ---------------- seeded orders ---------------- */
const CUST = { femi:{n:'Femi A.', img:'me.jpg', member:true}, amara:{n:'Amara O.', img:'p-22.jpg', member:true}, daniel:{n:'Daniel K.', img:'p-3.jpg'}, priya:{n:'Priya R.', img:'host.jpg'}, ken:{n:'Kenji T.', img:'p-20.jpg', member:true}, sofia:{n:'Sofia M.', img:'p-23.jpg'}, ade:{n:'Adeola B.', img:'designer-zuri.jpg', member:true} };
function seedOrders(){
  return {
    restaurant:[
      { id:'M-4471', c:'femi', col:0, mode:'Delivery', items:[[2,'Grilled Croaker & Yaji'],[1,'Efo Riro & Pounded Yam']], tot:69.50, note:'Leave with concierge · ring 4B', placed:'09:41', prep:25, new:true },
      { id:'M-4470', c:'sofia', col:0, mode:'Collection', items:[[1,'Suya Platter'],[2,'Puff-Puff & Salted Caramel']], tot:36.00, placed:'09:38', prep:15 },
      { id:'M-4468', c:'ken', col:1, mode:'Delivery', items:[[1,'Seafood Okra'],[1,'Grilled Croaker & Yaji']], tot:46.00, placed:'09:22', prep:25, left:9 },
      { id:'M-4467', c:'daniel', col:1, mode:'Collection', items:[[2,'Efo Riro & Pounded Yam']], tot:38.00, placed:'09:19', prep:20, left:4 },
      { id:'M-4465', c:'ade', col:2, mode:'Delivery', items:[[1,'Suya Platter'],[1,'Seafood Okra']], tot:40.00, placed:'09:04', courier:'Dele A.' },
      { id:'M-4461', c:'amara', col:3, mode:'Delivery', items:[[2,'Grilled Croaker & Yaji']], tot:48.00, placed:'08:31', done:'09:02' },
      { id:'M-4459', c:'priya', col:3, mode:'Collection', items:[[1,'Puff-Puff & Salted Caramel']], tot:9.00, placed:'08:20', done:'08:36' },
    ],
    designer:[
      { id:'A-1187', c:'femi', col:0, mode:'Made to order', items:[[1,'Heritage Accessories · one size']], tot:95.00, placed:'Today 09:41', ship:'Mount Street · Merit courier', new:true },
      { id:'A-1186', c:'amara', col:0, mode:'Made to order', items:[[1,'Floral Wrap Dress · size 10']], tot:210.00, placed:'Today 08:12', ship:'Collect at Merit Window, Regent St' },
      { id:'A-1183', c:'ade', col:1, mode:'Made to order', items:[[1,'Floral Wrap Dress · size 12']], tot:210.00, placed:'Tue 2 Sep', due:'Fri 12 Sep', photos:1 },
      { id:'A-1181', c:'sofia', col:1, mode:'Made to order', items:[[1,'Heritage Accessories'],[1,'Floral Wrap Dress · size 8']], tot:305.00, placed:'Mon 1 Sep', due:'Thu 11 Sep', photos:0 },
      { id:'A-1179', c:'ken', col:2, mode:'Made to order', items:[[1,'Floral Wrap Dress · size 10']], tot:210.00, placed:'Wed 27 Aug', due:'Today' },
      { id:'A-1174', c:'daniel', col:3, mode:'Shipped', items:[[1,'Heritage Accessories']], tot:95.00, placed:'Fri 22 Aug', done:'Tue 2 Sep' },
      { id:'A-1172', c:'priya', col:3, mode:'Collected', items:[[1,'Floral Wrap Dress · size 8']], tot:210.00, placed:'Thu 21 Aug', done:'Mon 1 Sep' },
    ],
  };
}
const COLS = {
  restaurant:[ ['New','var(--gold)'], ['In the kitchen','var(--harbor)'], ['Ready · with courier','var(--forest)'], ['Completed','var(--ink-3)'] ],
  designer:[ ['New','var(--gold)'], ['In the studio','var(--harbor)'], ['Quality check · ready','var(--forest)'], ['Shipped / collected','var(--ink-3)'] ],
};
const MENU = RESTAURANTS[0].menu.map(m => ({...m, on:true, sec: m.id==='puff' ? 'Desserts' : 'Mains', sold: {croaker:214, efo:168, okra:121, suya:190, puff:246}[m.id]}));
const PIECES = PRODUCTS.filter(p=>p.by==='adaeze').concat([
  { id:'kaftan', n:'Ankara Kaftan', p:165, img:'designer-adaeze.jpg', d:'Wax print, silk lining', tag:'Made to order' },
  { id:'wrap', n:'Head Wrap Set', p:45, img:'rack-3.jpg', d:'3 × wax print' },
  { id:'coat', n:'Print Trench', p:320, img:'hero-design.jpg', d:'Cotton drill, wax lining', tag:'Made to order' },
]).map(p=>({...p, on:true, lead: p.tag==='Made to order' ? 10 : 2, stock: p.tag==='Made to order' ? null : 6, sold:{access:38,dress:27,kaftan:19,wrap:52,coat:8}[p.id]||12}));
const REVIEWS = {
  restaurant:[ {c:'amara', r:5, t:'Sun 31 Aug', p:'The croaker is the best in London, full stop. Yaji had real heat. Puff-puff arrived warm — how?', reply:'Thank you Amara — the puff-puff goes in the bag last, thirty seconds before Dele leaves. Tolu'}, {c:'ken', r:5, t:'Fri 29 Aug', p:'Booked through Merit, table held with no card, Exec ride home. Seamless.'}, {c:'daniel', r:4, t:'Wed 27 Aug', p:'Efo riro was outstanding. Collection took ten minutes longer than the app said.'} ],
  designer:[ {c:'priya', r:5, t:'Mon 1 Sep', p:'The dress fits like it was made for me — because it was. Studio photos while it was being sewn were a lovely touch.', reply:'Priya, it was a joy to make. Wear it loudly. Adaeze'}, {c:'daniel', r:5, t:'Tue 2 Sep', p:'Bought the accessories set as a gift after seeing it in the Regent Street window. Beautifully packaged.'}, {c:'ade', r:4, t:'Thu 28 Aug', p:'Gorgeous print. Ten days felt long but the alteration at the window was free and quick.'} ],
};
const PAYOUTS = {
  restaurant:{ bal:2340.50, next:'Mon 8 Sep', weekly:[[ 'w/c 25 Aug', 9840, 787, 9053],['w/c 18 Aug', 9120, 730, 8390],['w/c 11 Aug', 8760, 701, 8059],['w/c 4 Aug', 8210, 657, 7553]], fee:'8%' },
  designer:{ bal:1615.00, next:'Mon 8 Sep', weekly:[[ 'w/c 25 Aug', 2410, 241, 2169],['w/c 18 Aug', 1980, 198, 1782],['w/c 11 Aug', 2650, 265, 2385],['w/c 4 Aug', 1720, 172, 1548]], fee:'10%' },
};
const RESERVATIONS = [
  { t:'12:30', c:'sofia', n:2, tbl:'T4', st:'seated' }, { t:'13:00', c:'daniel', n:4, tbl:'T9', st:'seated' }, { t:'13:30', c:'ken', n:2, tbl:'T2', st:'booked' },
  { t:'19:00', c:'ade', n:6, tbl:'T11', st:'booked' }, { t:'19:30', c:'femi', n:2, tbl:'T6', st:'booked', member:true, note:'Merit member · no card · anniversary' }, { t:'20:00', c:'amara', n:3, tbl:'T8', st:'booked' }, { t:'20:30', c:'priya', n:2, tbl:'T3', st:'booked' },
];

/* ---------------- state ---------------- */
let S = { trade:'restaurant', nav:'overview', open:true, orders:seedOrders(), menu:MENU, pieces:PIECES, reviews:JSON.parse(JSON.stringify(REVIEWS)), res:RESERVATIONS.map(r=>({...r})), windowApplied:false, drawer:null };
const T = TRADES[S.trade] ? null : null;
const trade = () => TRADES[S.trade];
const orders = () => S.orders[S.trade];
const newCount = () => orders().filter(o=>o.col===0).length;

/* ---------------- shell ---------------- */
function renderSide(){
  const t = trade();
  document.getElementById('side').innerHTML = `
    <div class="brand"><img src="${img('logo-app.png')}" alt=""><div><div class="wm">MERIT</div><div class="sub">Business</div></div></div>
    <div class="openstate ${S.open?'':'off'}" id="openstate"><i></i>${S.open ? (S.trade==='restaurant'?'Accepting orders':'Taking orders') : 'Paused'}<span class="grow"></span><button class="tog ${S.open?'on':''}" data-act="toggleopen" title="Pause"></button></div>
    ${t.nav.map(([lab,items])=>`<div class="navlabel">${lab}</div>` + items.map(([id,ic,n,p])=>`<button class="nav ${S.nav===id?'on':''}" data-nav="${id}">${ico(ic,17)}${n}${p&&newCount()?`<span class="pipn">${newCount()}</span>`:''}</button>`).join('')).join('')}
    <div class="foot"><div class="bizswitch"><img src="${img(t.img)}" alt=""><div><div class="n">${t.name}</div><div class="s">Verified · ${t.sub.split(' · ')[1]}</div></div></div></div>`;
  document.getElementById('dbname').textContent = t.name;
  document.querySelectorAll('#tradeswitch button').forEach(b=>b.classList.toggle('on', b.dataset.trade===S.trade));
}
const TITLES = { overview:['Overview','Today at a glance'], orders:['Live orders','Accept, cook, hand over — every order from the Merit app lands here'], reservations:['Reservations','Tonight’s book and floor'], menu:['Menu','Prices, availability and sold-out in one tap'], pieces:['Pieces & stock','Made-to-order lead times and ready stock'], window:['Merit Window','Your West End shop window'], reviews:['Reviews','Every review comes from a verified Merit order'], payouts:['Payouts','Weekly settlement to your bank'], profile:['Profile','What customers see in the Merit app'] };
function renderTop(){
  const t = trade(); const [h,s] = TITLES[S.nav]; const nav = S.nav==='orders' && S.trade==='designer' ? ['Orders','Every piece bought in the Merit app, from new to shipped'] : [h,s];
  document.getElementById('topbar').innerHTML = `<div><h1>${nav[0]}</h1><div class="sub">${nav[1]}</div></div><span class="grow"></span>
    <button class="btn btn-ghost btn-sm" data-act="notify">${ico('bell',16)} ${newCount()?`${newCount()} new`:'No new'}</button>
    <span class="who"><img src="${img(t.person.img)}" alt="">${t.person.n}</span>`;
}
function render(){ renderSide(); renderTop(); const fn = PAGES[S.nav] || PAGES.overview; document.getElementById('content').innerHTML = fn(); window.scrollTo(0,0); }

/* ---------------- pages ---------------- */
const PAGES = {};
const custCell = c => { const u = CUST[c]; return `<span class="who"><img src="${img(u.img)}" alt="">${u.n}${u.member?' '+pill('Member','gold'):''}</span>`; };

PAGES.overview = () => { const t = trade(); const R = S.trade==='restaurant';
  const stats = R ? [['Today’s revenue','£2,340','up','+18% vs last Thu'],['Orders today','38','up','21 delivery · 17 collection'],['Covers tonight','64','gold','7 bookings · 3 Merit members'],['Rating','4.9','flat','312 verified reviews']]
                  : [['This month','£8,420','up','+31% vs Aug'],['Orders','34','up','9 in the studio'],['Window footfall','1,180','gold','Regent St · this week'],['Rating','4.9','flat','96 verified reviews']];
  const bars = R ? [62,48,70,55,88,100,74] : [30,55,42,70,64,100,82];
  const top = R ? S.menu.slice().sort((a,b)=>b.sold-a.sold).slice(0,5).map(m=>[m.n,m.sold]) : S.pieces.slice().sort((a,b)=>b.sold-a.sold).slice(0,5).map(p=>[p.n,p.sold]);
  const max = top[0][1];
  return `
  <div class="masthead"><img class="bg" src="${img(t.hero)}" alt=""><div class="sc"></div>
    <div class="in"><div><div class="k">${t.sub}</div><h2>Good morning, <em>${t.person.n.split(' ')[0]}</em>.</h2><p>${R ? 'Ìyálọja is live in the Merit app. Orders, bookings, reviews and payouts all flow through this console.' : 'Your pieces are live in the Merit app and in the Regent Street window. Orders, studio updates and payouts all flow through this console.'}</p></div>
      <span class="grow"></span><div class="spark">${stats.slice(0,2).map(([k,v,d,s])=>`<div class="sp"><div class="k">${k}</div><div class="v">${v}</div><div class="d">${s}</div></div>`).join('')}</div></div></div>
  <div class="grid g4">${stats.map(([k,v,d,s])=>`<div class="stat"><div class="k">${k}</div><div class="v">${v}</div><div class="d ${d}">${d==='up'?ico('trend',13):''}${s}</div></div>`).join('')}</div>
  <div class="grid g2 mt">
    <div class="card"><div class="hd"><h3>${R?'Revenue · last 7 days':'Revenue · last 7 weeks'}</h3><span class="grow"></span>${pill('Merit app','verified')}</div><div class="bd"><div class="mini">${bars.map((b,i)=>`<span class="${i===5?'hi':''}" style="height:${b}%"></span>`).join('')}</div><div class="minilab">${(R?['Fri','Sat','Sun','Mon','Tue','Wed','Thu']:['w29','w30','w31','w32','w33','w34','w35']).map(d=>`<span>${d}</span>`).join('')}</div></div></div>
    <div class="card"><div class="hd"><h3>${R?'Top dishes':'Best sellers'}</h3><span class="grow"></span><span class="s" style="width:auto">this month</span></div><div class="bd"><div class="barrow">${top.map(([n,v],i)=>`<div class="b"><span class="nm">${n}</span><span class="tr"><i class="${i===0?'gold':''}" style="width:${v/max*100}%"></i></span><span class="vv">${v}</span></div>`).join('')}</div></div></div>
  </div>
  <div class="grid g2 mt">
    <div class="card"><div class="hd"><h3>${R?'Needs attention':'Needs attention'}</h3><span class="grow"></span><button class="btn btn-quiet btn-sm" data-nav="orders">Open board</button></div>
      <div class="bd" style="padding-top:8px">${orders().filter(o=>o.col===0).map(o=>`<div class="resrow"><div class="tm" style="font-size:.9rem;font-family:var(--sans);font-weight:800;color:var(--gold)">${o.id}</div>${custCell(o.c)}<div class="g"><div class="s">${o.items.map(([q,n])=>q+'× '+n).join(', ')}</div></div><b>${money(o.tot)}</b><button class="btn btn-primary btn-sm" data-act="accept" data-arg="${o.id}">${R?'Accept':'Start'}</button></div>`).join('') || '<div class="rev" style="border:0;color:var(--ink-3)">All caught up.</div>'}</div></div>
    <div class="card"><div class="hd"><h3>${R?'Tonight’s bookings':'Merit Window · Regent Street'}</h3><span class="grow"></span><button class="btn btn-quiet btn-sm" data-nav="${R?'reservations':'window'}">${R?'Floor plan':'Manage'}</button></div>
      <div class="bd" style="padding-top:8px">${R ? S.res.filter(r=>+r.t.slice(0,2)>=19).map(r=>`<div class="resrow"><div class="tm">${r.t}</div><img src="${img(CUST[r.c].img)}" alt=""><div class="g"><div class="n">${CUST[r.c].n} · ${r.n}</div><div class="s">${r.tbl}${r.note?' · '+r.note:''}</div></div>${r.member?pill('Member','gold'):''}</div>`).join('')
        : `<div class="barrow"><div class="b"><span class="nm">Footfall</span><span class="tr"><i style="width:82%"></i></span><span class="vv">1,180</span></div><div class="b"><span class="nm">QR scans</span><span class="tr"><i style="width:31%"></i></span><span class="vv">214</span></div><div class="b"><span class="nm">Purchases from window</span><span class="tr"><i class="gold" style="width:12%"></i></span><span class="vv">41</span></div></div><p style="font-size:.78rem;color:var(--ink-2);margin-top:14px;line-height:1.5">Your window runs until <b>28 Sep</b>. Carnaby slot opens 3 Oct — apply from the Merit Window page.</p>`}</div></div>
  </div>`;
};

/* ---- orders board (shared) ---- */
function orderCard(o){ const R = S.trade==='restaurant'; const u = CUST[o.c];
  const acts = R ? [ [`Accept · ${o.prep} min`,'accept'], ['Mark ready','ready'], ['Handed over','done'], [] ][o.col]
                 : [ ['Start making','accept'], ['Send to QC','ready'], [o.mode==='Made to order'&&/Collect/.test(o.ship||'')?'Ready to collect':'Ship it','done'], [] ][o.col];
  return `<div class="ocard ${o.new&&o.col===0?'new':''}">
    <div class="top"><span class="id">${o.id}</span>${pill(o.mode, o.mode==='Delivery'?'blue':o.mode==='Collection'?'soft':'gold')}<span class="grow" style="flex:1"></span>${o.col===1 && R ? `<span class="timer">${ico('clock',12)} ${o.left} min left</span>` : o.col===1 ? `<span class="timer">${ico('clock',12)} due ${o.due}</span>` : ''}</div>
    <div class="who"><img src="${img(u.img)}" alt="">${u.n}${u.member?pill('Member','gold'):''}</div>
    <ul>${o.items.map(([q,n])=>`<li><b>${q}×</b><span style="flex:1">${n}</span></li>`).join('')}</ul>
    ${o.note?`<div class="note">${o.note}</div>`:''}
    <div class="meta"><span>${o.placed}</span>${o.courier?`<span>· ${ico('bike',12)} ${o.courier}</span>`:''}${o.done?`<span>· done ${o.done}</span>`:''}${o.ship?`<span>· ${o.ship}</span>`:''}<span class="tot">${money(o.tot)}</span></div>
    <div class="acts">${acts.length?`<button class="btn btn-primary" data-act="${acts[1]}" data-arg="${o.id}">${acts[0]}</button>`:''}${!R && o.col===1 ? `<button class="btn btn-ghost" data-act="photo" data-arg="${o.id}">${ico('camera',14)} Studio photo</button>`:''}<button class="btn btn-ghost" data-act="detail" data-arg="${o.id}" style="flex:0 0 auto">${ico('info',14)}</button></div>
  </div>`;
}
PAGES.orders = () => { const cols = COLS[S.trade];
  return `<div class="pagehead"><div><h2>${S.trade==='restaurant'?'Kitchen board':'Studio board'}</h2><p>${S.trade==='restaurant'?'New orders arrive on the left with a sound. Accepting one tells the customer the prep time; marking it ready dispatches a Merit courier or pings the collector.':'Every purchase from the app or a window scan lands here. Studio photos you send appear in the customer’s order in the Merit app.'}</p></div><span class="grow"></span><button class="btn btn-ghost btn-sm" data-act="simulate">${ico('sparkle',14)} Simulate a new order</button></div>
  <div class="board">${cols.map(([n,c],i)=>`<div class="col"><div class="ch"><i style="background:${c}"></i>${n}<span class="cnt">${orders().filter(o=>o.col===i).length}</span></div>${orders().filter(o=>o.col===i).map(orderCard).join('')}</div>`).join('')}</div>`;
};

/* ---- restaurant pages ---- */
PAGES.reservations = () => { const tables = [['T1',2],['T2',2],['T3',2],['T4',2],['T5',4],['T6',2],['T7',4],['T8',4],['T9',4],['T10',6],['T11',6],['T12',8]];
  const st = t => { const r = S.res.find(r=>r.tbl===t); return r ? r.st : ''; };
  return `<div class="grid g2">
    <div class="card"><div class="hd"><h3>Floor · tonight</h3><span class="grow"></span>${pill('64 covers','verified')}</div><div class="bd"><div class="floor">${tables.map(([t,n])=>`<div class="tbls ${st(t)}">${t}<small>${n} seats</small></div>`).join('')}</div><div class="legend"><span><i style="background:var(--forest)"></i>Seated</span><span><i style="background:var(--gold-tint);border-color:var(--gold-2)"></i>Booked</span><span><i></i>Free</span></div></div></div>
    <div class="card"><div class="hd"><h3>The book</h3><span class="grow"></span><button class="btn btn-quiet btn-sm" data-act="soon">${ico('plus',14)} Walk-in</button></div><div class="bd" style="padding-top:6px">${S.res.map((r,i)=>`<div class="resrow"><div class="tm">${r.t}</div><img src="${img(CUST[r.c].img)}" alt=""><div class="g"><div class="n">${CUST[r.c].n} · party of ${r.n}</div><div class="s">${r.tbl}${r.note?' · '+r.note:''}</div></div>${r.st==='seated'?pill('Seated','verified'):`<button class="btn btn-ghost btn-sm" data-act="seat" data-arg="${i}">Seat</button>`}</div>`).join('')}</div></div>
  </div>
  <div class="card mt"><div class="hd"><h3>Booking rules</h3><span class="s">Merit members hold tables with no card; no-shows are charged to their Merit Wallet under your policy.</span></div><div class="bd"><div class="frow"><div class="fld"><label>Max party online</label><input value="8"></div><div class="fld"><label>Turn time</label><input value="1h 45m"></div><div class="fld"><label>No-show fee</label><input value="£15 per cover"></div><div class="fld"><label>Last booking</label><input value="21:30"></div></div></div></div>`;
};
PAGES.menu = () => `<div class="pagehead"><div><h2>${S.menu.filter(m=>m.on).length} of ${S.menu.length} dishes live</h2><p>Switch a dish off and it disappears from the Merit app instantly. Prices update in real time.</p></div><span class="grow"></span><button class="btn btn-primary btn-sm" data-act="soon">${ico('plus',14)} Add dish</button></div>
  ${['Mains','Desserts'].map(sec=>`<div class="card mt"><div class="hd"><h3>${sec}</h3></div>${S.menu.filter(m=>m.sec===sec).map(m=>`<div class="dishrow ${m.on?'':'off'}"><img src="${img(m.img)}" alt=""><div class="g"><div class="n">${m.n}</div><div class="s">${m.d} · ${m.sold} sold this month</div></div><span class="st">${m.on?'Live in app':'Sold out · hidden'}</span><span class="p">${money(m.p)}</span><button class="tog ${m.on?'on':''}" data-act="togdish" data-arg="${m.id}"></button></div>`).join('')}</div>`).join('')}`;

/* ---- designer pages ---- */
PAGES.pieces = () => `<div class="pagehead"><div><h2>${S.pieces.filter(p=>p.on).length} pieces live</h2><p>Made-to-order pieces show their lead time in the app. Ready stock sells from the studio or the window.</p></div><span class="grow"></span><button class="btn btn-primary btn-sm" data-act="soon">${ico('plus',14)} Add piece</button></div>
  <div class="prodgridw">${S.pieces.map(p=>`<div class="pcard"><div class="im"><img src="${img(p.img)}" alt="">${p.tag?pill(p.tag, p.tag==='New'?'gold':'glass'):''}</div><div class="bd"><div class="n">${p.n}</div><div class="s">${p.stock==null?`Made to order · ${p.lead} days`:`${p.stock} in stock · ships ${p.lead} days`} · ${p.sold} sold</div><div class="r"><span>${money0(p.p)}</span><button class="tog ${p.on?'on':''}" data-act="togpiece" data-arg="${p.id}"></button></div></div></div>`).join('')}</div>`;
PAGES.window = () => `<div class="grid g2">
    <div class="windowhero"><img src="${img('window-1.jpg')}" alt=""><div class="sc"></div><div class="in"><div class="k">Now showing · until 28 Sep</div><h3>Regent Street window</h3><p>Adaeze Okonkwo × Zuri Adebayo · 6 pieces on display · QR to buy the look</p></div></div>
    <div class="card"><div class="hd"><h3>This window · 12 days</h3></div><div class="bd"><div class="grid g3"><div class="stat"><div class="k">Footfall</div><div class="v">1,180</div></div><div class="stat"><div class="k">QR scans</div><div class="v">214</div></div><div class="stat"><div class="k">Sales</div><div class="v">41</div><div class="d up">${ico('trend',13)} £6,930</div></div></div>
      <div class="barrow mt">${[['Floral Wrap Dress',18],['Heritage Accessories',12],['Ankara Kaftan',7],['Head Wrap Set',4]].map(([n,v],i)=>`<div class="b"><span class="nm">${n}</span><span class="tr"><i class="${i===0?'gold':''}" style="width:${v/18*100}%"></i></span><span class="vv">${v}</span></div>`).join('')}</div></div></div>
  </div>
  <div class="card mt"><div class="hd"><h3>Upcoming slots</h3><span class="s">Merit curates each fortnight. Apply with the pieces you’d show.</span></div><div class="bd" style="padding-top:6px">
    ${[['3 – 16 Oct','Carnaby · window B','Nia Charles confirmed · one slot left'],['17 – 30 Oct','Regent Street · window A','Open'],['31 Oct – 13 Nov','King’s Road · window A','Open']].map(([d,n,s],i)=>`<div class="slotrow"><div class="d">${d}</div><div class="g"><div class="n">${n}</div><div class="s">${s}</div></div>${i===0 ? (S.windowApplied ? pill('Applied','verified') : `<button class="btn btn-gold btn-sm" data-act="applywindow">Apply</button>`) : `<button class="btn btn-ghost btn-sm" data-act="soon">Apply</button>`}</div>`).join('')}</div></div>`;

/* ---- shared pages ---- */
PAGES.reviews = () => { const list = S.reviews[S.trade];
  return `<div class="grid g4" style="margin-bottom:16px"><div class="stat"><div class="k">Rating</div><div class="v">4.9</div><div class="d flat">${S.trade==='restaurant'?'312':'96'} verified reviews</div></div><div class="stat"><div class="k">5 stars</div><div class="v">86%</div></div><div class="stat"><div class="k">Replied</div><div class="v">${Math.round(list.filter(r=>r.reply).length/list.length*100)}%</div><div class="d gold">Replies show in the app</div></div><div class="stat"><div class="k">Would reorder</div><div class="v">93%</div></div></div>
  <div class="card">${list.map((r,i)=>`<div class="rev"><div class="h"><img src="${img(CUST[r.c].img)}" alt=""><div><div class="n">${CUST[r.c].n} ${stars(r.r+'.0')}</div><div class="s">${r.t} · verified Merit order</div></div></div><p>${r.p}</p>${r.reply?`<div class="reply"><b>Your reply</b>${r.reply}</div>`:`<div class="replybox"><input id="rep${i}" placeholder="Reply publicly…"><button class="btn btn-primary btn-sm" data-act="reply" data-arg="${i}">Reply</button></div>`}</div>`).join('')}</div>`; };
PAGES.payouts = () => { const p = PAYOUTS[S.trade];
  return `<div class="grid g2">
    <div class="paycard"><div class="k">Settling ${p.next}</div><div class="v">${money(p.bal)}</div><div class="s">Everything sold through Merit since Monday, less the Merit fee of ${p.fee}. Merit Points and member perks are funded by Merit, never by you.</div><div class="row"><div><div class="k2">Paid to</div><div class="v2">HSBC •• 2291</div></div><div><div class="k2">Cadence</div><div class="v2">Weekly · Monday</div></div><div><div class="k2">Merit fee</div><div class="v2">${p.fee}</div></div></div></div>
    <div class="card"><div class="hd"><h3>This week so far</h3></div><div class="bd"><div class="barrow">${(S.trade==='restaurant'?[['Delivery',1410],['Collection',640],['Tables · Merit Pay',290]]:[['App orders',1120],['Window scans',495]]).map(([n,v],i)=>`<div class="b"><span class="nm">${n}</span><span class="tr"><i class="${i===0?'gold':''}" style="width:${v/1410*100}%"></i></span><span class="vv">${money0(v)}</span></div>`).join('')}</div><p style="font-size:.76rem;color:var(--ink-3);margin-top:14px;line-height:1.5">Refunds and disputes are settled by Merit support and netted from the next payout with a line-item explanation.</p></div></div>
  </div>
  <div class="card mt"><div class="hd"><h3>Previous payouts</h3><span class="grow"></span><button class="btn btn-ghost btn-sm" data-act="soon">${ico('receipt',14)} Statements</button></div><div class="tblwrap"><table class="tbl"><tr><th>Week</th><th>Gross</th><th>Merit fee</th><th>Paid out</th><th>Status</th></tr>${p.weekly.map(([w,g,f,n])=>`<tr><td><b>${w}</b></td><td class="num">${money0(g)}</td><td class="num" style="color:var(--ink-3)">−${money0(f)}</td><td class="num">${money0(n)}</td><td>${pill('Paid','verified')}</td></tr>`).join('')}</table></div></div>`; };
PAGES.profile = () => { const t = trade(); const R = S.trade==='restaurant';
  return `<div class="grid g2">
    <div class="card"><div class="hd"><h3>Listing</h3><span class="s">This is what customers see in the Merit app.</span></div><div class="bd"><div class="frow"><div class="fld" style="grid-column:1/-1"><label>Name</label><input value="${t.name}"></div><div class="fld"><label>${R?'Cuisine':'Craft'}</label><input value="${R?'Modern Nigerian':'Ankara couture'}"></div><div class="fld"><label>Area</label><input value="${R?'Mayfair, W1K':'Peckham, SE15'}"></div><div class="fld" style="grid-column:1/-1"><label>About</label><textarea>${R?RESTAURANTS[0].blurb:DESIGNERS[0].bio}</textarea></div></div>
      <div class="fld mt"><label>Photos</label><div class="photos">${(R?['rest-warm.jpg','dish-fish.jpg','dish-efo.jpg']:['designer-adaeze.jpg','prod-dress.jpg','prod-access.jpg']).map(f=>`<img src="${img(f)}" alt="">`).join('')}<div class="add">${ico('image',20)}</div></div></div></div></div>
    <div class="card"><div class="hd"><h3>${R?'Hours & delivery':'Studio & fulfilment'}</h3></div><div class="bd">${R?`<div class="hours">${[['Mon – Thu','12:00','22:30'],['Fri – Sat','12:00','23:30'],['Sunday','12:00','21:00']].map(([d,a,b])=>`<div class="h"><span>${d}</span><input value="${a}"><input value="${b}"><button class="tog on"></button></div>`).join('')}</div><div class="frow mt"><div class="fld"><label>Delivery radius</label><input value="3.5 miles"></div><div class="fld"><label>Default prep time</label><input value="25 min"></div><div class="fld"><label>Min. order</label><input value="£15"></div></div>`
      :`<div class="frow"><div class="fld"><label>Made-to-order lead time</label><input value="10 days"></div><div class="fld"><label>Ready stock ships in</label><input value="2 days"></div><div class="fld"><label>Alterations</label><input value="Free · any Merit Window · 30 days"></div><div class="fld"><label>Fittings</label><input value="Regent Street · Tue & Thu"></div></div>`}
      <div class="mt" style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-primary btn-sm" data-act="save">Save changes</button><button class="btn btn-ghost btn-sm" data-act="soon">Preview in app</button></div></div></div>
  </div>
  <div class="card mt"><div class="hd"><h3>Team</h3><span class="grow"></span><button class="btn btn-quiet btn-sm" data-act="soon">${ico('plus',14)} Invite</button></div><div class="tblwrap"><table class="tbl"><tr><th>Person</th><th>Role</th><th>Access</th><th></th></tr>${(R?[[t.person,'Owner · head chef','Everything'],[{n:'Kemi Lawal',img:'p-14.jpg'},'Front of house','Reservations, reviews'],[{n:'Sam Obi',img:'driver-go.jpg'},'Kitchen lead','Orders, menu']]:[[t.person,'Owner · designer','Everything'],[{n:'Ife Nwosu',img:'designer-zuri.jpg'},'Studio manager','Orders, pieces'],[{n:'Tom Reid',img:'p-3.jpg'},'Window & events','Merit Window']]).map(([p,r,a])=>`<tr><td><span class="thumbcell"><img src="${img(p.img)}" alt="" style="border-radius:50%"><b>${p.n}</b></span></td><td>${r}</td><td>${a}</td><td class="acts"><button class="btn btn-ghost btn-sm" data-act="soon">Edit</button></td></tr>`).join('')}</table></div></div>`; };

/* ---------------- drawer / toast ---------------- */
function toast(msg, icon='check'){ const t = document.createElement('div'); t.className='wtoast'; t.innerHTML = ico(icon,16)+`<span>${msg}</span>`; document.body.appendChild(t); setTimeout(()=>t.remove(), 2600); }
function openDrawer(html){ const d = document.getElementById('drawer'); d.className='drawerwrap on'; d.innerHTML = `<div class="scrim" data-close></div><div class="drawer"><button class="iconbtn close" data-close>${ico('x',16)}</button>${html}</div>`; }
function closeDrawer(){ const d = document.getElementById('drawer'); d.className='drawerwrap'; d.innerHTML=''; }
function orderDetail(o){ const R = S.trade==='restaurant'; const u = CUST[o.c];
  const steps = R ? ['Placed in the Merit app','Accepted · prep time sent','Ready · courier dispatched','Handed over'] : ['Bought in the Merit app','In the studio','Quality check','Shipped / collected'];
  openDrawer(`<span class="eyebrow gold">${o.id}</span><h3 style="margin-top:6px">${u.n} · ${money(o.tot)}</h3>
    <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">${pill(o.mode,'blue')}${u.member?pill('Merit member','gold'):''}${pill('Paid · Merit Wallet','verified')}</div>
    <div class="card mt"><div class="bd" style="padding:14px 16px"><ul style="list-style:none;display:grid;gap:8px;font-size:.84rem">${o.items.map(([q,n])=>`<li style="display:flex;justify-content:space-between"><span><b>${q}×</b> ${n}</span></li>`).join('')}</ul>${o.note?`<div class="ocard note" style="margin-top:10px;padding:8px 10px;border:0;box-shadow:none">${o.note}</div>`:''}</div></div>
    <div class="card mt"><div class="bd"><div class="tl-w">${steps.map((s,i)=>`<div class="t ${i<o.col?'done':i===o.col?'now':''}"><i></i><b>${s}</b><span>${i===0?o.placed:i<=o.col?'Done':'—'}</span></div>`).join('')}</div></div></div>
    <div class="card mt"><div class="bd" style="font-size:.8rem;color:var(--ink-2);line-height:1.55">${ico('shield',14)} Customer contact is relayed through Merit. ${R?'Delivery address is shared with the courier only.':'Shipping address is shared with the courier at dispatch.'}<div style="display:flex;gap:8px;margin-top:12px"><button class="btn btn-ghost btn-sm" data-act="soon">${ico('message',14)} Message ${u.n.split(' ')[0]}</button><button class="btn btn-ghost btn-sm" data-act="soon">${ico('receipt',14)} Refund</button></div></div></div>`);
}

/* ---------------- actions ---------------- */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-nav],[data-act],[data-trade],[data-close]'); if(!t) return;
  if(t.hasAttribute('data-close')){ closeDrawer(); return; }
  if(t.dataset.trade){ S.trade = t.dataset.trade; S.nav='overview'; render(); return; }
  if(t.dataset.nav){ S.nav = t.dataset.nav; render(); return; }
  const a = t.dataset.act, arg = t.dataset.arg; const o = arg && orders().find(x=>x.id===arg); const R = S.trade==='restaurant';
  switch(a){
    case 'toggleopen': S.open = !S.open; render(); toast(S.open?'You’re live in the Merit app again':'Paused — customers see “back soon”', S.open?'play':'pause'); break;
    case 'accept': o.col=1; o.new=false; if(R) o.left=o.prep; else o.due='in 10 days'; render(); toast(R?`${o.id} accepted · ${CUST[o.c].n} told ${o.prep} min`:`${o.id} started · ${CUST[o.c].n} can follow it in the app`,'check'); break;
    case 'ready': o.col=2; if(R){ o.courier = o.mode==='Delivery' ? 'Dele A.' : null; } render(); toast(R?(o.courier?`Merit courier Dele A. dispatched for ${o.id}`:`${CUST[o.c].n} pinged — ready to collect`):`${o.id} in quality check`,'bike'); break;
    case 'done': o.col=3; o.done='Just now'; render(); toast(`${o.id} complete · ${money(o.tot)} settles Monday`,'wallet'); break;
    case 'detail': orderDetail(o); break;
    case 'photo': toast(`Studio photo sent to ${CUST[o.c].n} in the Merit app`,'camera'); o.photos=(o.photos||0)+1; break;
    case 'simulate': { const id = (R?'M-':'A-') + (4472 + Math.floor(Math.random()*20)); const c = ['ken','sofia','ade','amara'][Math.floor(Math.random()*4)];
      orders().unshift(R ? { id, c, col:0, mode:Math.random()>.5?'Delivery':'Collection', items:[[1,'Grilled Croaker & Yaji'],[1,'Puff-Puff & Salted Caramel']], tot:33.00, placed:'Just now', prep:25, new:true }
                       : { id, c, col:0, mode:'Made to order', items:[[1,'Ankara Kaftan · size M']], tot:165.00, placed:'Just now', ship:'Merit courier', new:true }); render(); toast(`New order ${id} from the Merit app`,'bell'); break; }
    case 'seat': S.res[+arg].st='seated'; render(); toast(`${CUST[S.res[+arg].c].n} seated at ${S.res[+arg].tbl}`,'table'); break;
    case 'togdish': { const m = byId(S.menu,arg); m.on=!m.on; render(); toast(m.on?`${m.n} is back on the app`:`${m.n} marked sold out — hidden in the app`, m.on?'check':'pause'); break; }
    case 'togpiece': { const p = byId(S.pieces,arg); p.on=!p.on; render(); toast(p.on?`${p.n} is live`:`${p.n} hidden from the app`,'check'); break; }
    case 'reply': { const inp = document.getElementById('rep'+arg); const txt = inp && inp.value.trim(); if(!txt){ toast('Write a reply first','info'); break; } S.reviews[S.trade][+arg].reply = txt; render(); toast('Reply published in the Merit app','check'); break; }
    case 'applywindow': S.windowApplied = true; render(); toast('Applied for Carnaby · 3–16 Oct. Merit curation replies within 3 days','store'); break;
    case 'save': toast('Saved — live in the Merit app','check'); break;
    case 'notify': S.nav='orders'; render(); break;
    default: toast('Included in the full build','info');
  }
});
render();
