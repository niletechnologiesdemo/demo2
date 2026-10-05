/* ==========================================================
   MERIT · module flows: Transport · Dining · Build · Designer
   ========================================================== */

/* ---------- stylised map ---------- */
function mapSVG(route){
  return `<svg viewBox="0 0 390 420" preserveAspectRatio="xMidYMid slice">
    <rect width="390" height="420" fill="#EEF0EA"/>
    <path class="water" d="M-10 300 C 80 260, 160 340, 260 300 S 380 250, 420 290 L420 420 L-10 420Z"/>
    <rect class="park" x="40" y="60" width="120" height="90" rx="14"/>
    <rect class="park" x="250" y="330" width="90" height="60" rx="10"/>
    ${[[0,20,390,20],[0,110,390,110],[0,200,390,200],[0,270,390,270],[60,0,60,420],[150,0,150,420],[240,0,240,420],[330,0,330,420]].map(([a,b,c,d])=>`<line class="rd" x1="${a}" y1="${b}" x2="${c}" y2="${d}"/>`).join('')}
    ${[[105,0,105,420],[195,0,195,420],[285,0,285,420],[0,65,390,65],[0,155,390,155],[0,235,390,235]].map(([a,b,c,d])=>`<line class="rd2" x1="${a}" y1="${b}" x2="${c}" y2="${d}"/>`).join('')}
    ${[[70,120,30,30],[160,30,30,26],[250,30,70,26],[160,120,70,26],[250,120,70,26],[340,30,40,26],[70,210,30,50],[160,210,70,50],[250,210,70,50],[340,210,40,50]].map(([x,y,w,h])=>`<rect class="blk" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>`).join('')}
    ${route ? `<path class="route" d="M 105 300 L 105 200 L 240 200 L 240 110 L 330 110 L 330 65"/>` : ''}
  </svg>`;
}
const ROUTE_PTS = [[105,300],[105,200],[240,200],[240,110],[330,110],[330,65]];
function routePoint(t){ // t 0..1 along polyline
  const segs=[]; let total=0; for(let i=1;i<ROUTE_PTS.length;i++){ const [a,b]=ROUTE_PTS[i-1],[c,d]=ROUTE_PTS[i]; const l=Math.hypot(c-a,d-b); segs.push(l); total+=l; }
  let dist=t*total; for(let i=0;i<segs.length;i++){ if(dist<=segs[i]){ const [a,b]=ROUTE_PTS[i],[c,d]=ROUTE_PTS[i+1]; const k=dist/segs[i]; return [a+(c-a)*k, b+(d-b)*k]; } dist-=segs[i]; }
  return ROUTE_PTS[ROUTE_PTS.length-1];
}
const pct = ([x,y]) => `left:${x/390*100}%;top:${y/420*100}%`;

/* ==========================================================
   TRANSPORT
   ========================================================== */
SCREENS.ride = (p={}) => {
  const later = S.ride.when==='later';
  return `
  <div class="map" style="height:300px">${mapSVG(false)}
    ${floatnav(`<span class="badge badge-glass">${later?'Scheduled ride':'Ride now'}</span>`)}
    <span class="mepulse" style="${pct([105,300])}"></span>
    <div class="pin" style="${pct([105,300])};margin-top:-14px"><span class="lb">You · Mount Street</span></div>
  </div>
  <div class="ridesheet" style="max-height:none;flex:1"><div class="grab"></div>
    <div class="routebox"><span class="ln"></span>
      <div class="pt"><i></i><div class="t">Mount Street, Mayfair<small>Pickup · current location</small></div></div>
      <div class="pt"><i class="sq"></i><input id="destin" placeholder="Where to?" autofocus></div>
    </div>
    ${later ? `<div class="optrow">${['Today 18:30','Tomorrow 07:15','Pick a time'].map((t,i)=>`<button class="opt ${i===0?'on':''}">${ico('clock',14)} ${t}</button>`).join('')}</div>` : ''}
    <div class="sugg">${DESTS.map(d=>`<button data-act="pickdest" data-arg="${d.id}"><span class="ic">${ico(d.icon,17)}</span><div class="g" style="flex:1"><div class="n">${d.n}</div><div class="s">${d.s}</div></div><span class="d">${d.d}</span></button>`).join('')}</div>
  </div>`;
};
SCREENS.tiers = () => {
  const d = byId(DESTS, S.ride.dest); const sel = S.ride.tier;
  return `
  <div class="map" style="height:260px">${mapSVG(true)}
    ${floatnav(`<span class="badge badge-glass">${d.d} · ${d.min} min</span>`)}
    <span class="mepulse" style="${pct([105,300])}"></span>
    <div class="pin below" style="${pct([330,65])}"><span class="lb g">${d.n}</span><span class="dot"></span></div>
  </div>
  <div class="ridesheet" style="max-height:none;flex:1;display:flex;flex-direction:column;padding-bottom:0"><div class="grab"></div>
    <div class="scroll" style="margin:0 -20px;padding:0 20px">
      <div class="sech first"><span class="t">Choose your ride</span><span class="a">${S.ride.when==='later'?'Today 18:30':'Now'}</span></div>
      ${TIERS.map(t=>`<button class="tier ${t.id===sel?'sel':''}" data-act="picktier" data-arg="${t.id}"><div class="img"><img src="${img(t.img)}" alt=""></div>
        <div class="g"><div class="n">${t.n}${t.star?`<span class="badge badge-gold">Signature</span>`:''}</div><div class="s">${t.s} · ${t.eta} min away</div></div>
        <div class="p">${money(d.prices[t.id])}<small>fixed</small></div></button>`).join('')}
      ${payrow()}
      <div style="height:16px"></div>
    </div>
    <div class="bottomact" style="margin:0 -20px"><button class="btn btn-gold btn-block btn-lg" data-act="confirmride">Confirm ${byId(TIERS,sel).n} · ${money(d.prices[sel])}</button></div>
  </div>`;
};
SCREENS.match = () => {
  const d = byId(DESTS, S.ride.dest), t = byId(TIERS, S.ride.tier), dr = DRIVERS[S.ride.tier];
  const found = S.ride.status==='found';
  return `
  <div class="map" style="height:${found?'300px':'380px'}">${mapSVG(true)}
    ${floatnav()}
    <span class="mepulse" style="${pct([105,300])}"></span>
    <div class="pin below" style="${pct([330,65])}"><span class="lb g">${d.n}</span><span class="dot"></span></div>
    ${found ? `<div class="carmk" style="${pct([60,235])}">${ico('car',22)}</div>` : ''}
  </div>
  <div class="ridesheet" style="max-height:none;flex:1"><div class="grab"></div>
    ${found ? `
      <div class="eta rise"><div class="big">${t.eta}<small>min</small></div><div class="k">${dr.n.split(' ')[0]} is on the way</div></div>
      <div class="driver rise rise-2"><div class="avatar lg"><img src="${img(dr.img)}" alt=""></div>
        <div class="g"><div class="n">${dr.n}</div><div class="m">${stars(dr.rating)}<span>${dr.trips} trips</span><span>${t.n}</span></div><span class="plate">${dr.plate}</span></div>
        <div class="car"><img src="${img(t.img)}" alt=""></div></div>
      <div class="note rise rise-3" style="text-align:center">${dr.car} · Look for the plate, confirm the face, then get in.</div>
      <div class="contactrow rise rise-3"><button class="btn btn-ghost" data-act="soon">${ico('message',16)} Message</button><button class="btn btn-ghost" data-act="soon">${ico('phone',16)} Call</button><button class="btn btn-ghost" data-act="cancelride">${ico('x',16)} Cancel</button></div>
      <button class="btn btn-primary btn-block" style="margin-top:14px" data-act="startride">Driver has arrived · Start trip</button>`
    : `<div class="pulsewrap"><div class="pulse">${ico('car',30)}</div></div>
      <div class="center"><h2>Finding your ${t.n}</h2><p>Matching the nearest Merit driver to Mount Street. Fixed fare ${money(d.prices[t.id])} to ${d.n}.</p></div>
      <button class="btn btn-ghost btn-block" style="margin-top:22px" data-act="cancelride">Cancel request</button>`}
  </div>`;
};
AFTER.match = el => { if(S.ride.status!=='found') later(()=>{ S.ride.status='found'; S.ride.driver = DRIVERS[S.ride.tier]; refresh(); }, 2400); };
SCREENS.live = () => {
  const d = byId(DESTS, S.ride.dest), t = byId(TIERS, S.ride.tier), dr = DRIVERS[S.ride.tier];
  return `
  <div class="map full">${mapSVG(true)}
    ${floatnav(`<span class="badge badge-glass" id="livebadge">On the way · ${d.min} min</span>`)}
    <div class="pin below" style="${pct([330,65])}"><span class="lb g">${d.n}</span><span class="dot"></span></div>
    <div class="carmk" id="carmk" style="${pct([105,300])}">${ico('car',22)}</div>
  </div>
  <div class="ridesheet"><div class="grab"></div>
    <div class="driver"><div class="avatar lg"><img src="${img(dr.img)}" alt=""></div>
      <div class="g"><div class="n">${dr.n}</div><div class="m">${stars(dr.rating)}<span>${t.n}</span><span class="plate" style="margin:0;font-size:.7rem;padding:3px 7px">${dr.plate}</span></div></div>
      <button class="iconbtn" data-act="soon">${ico('share',18)}</button></div>
    <div class="timeline" id="ridetl">
      <div class="tl done"><i>${ico('check',10)}</i><div class="n">Picked up · Mount Street</div><div class="s">09:41</div></div>
      <div class="tl now"><i></i><div class="n">En route via Park Lane</div><div class="s">Arriving ${d.min} min · fixed fare ${money(d.prices[t.id])}</div></div>
      <div class="tl"><i></i><div class="n">${d.n}</div><div class="s">${d.s}</div></div>
    </div>
    <button class="btn btn-primary btn-block" data-act="endride">Arrive now</button>
  </div>`;
};
AFTER.live = el => {
  const car = el.querySelector('#carmk'); let t = 0;
  every(()=>{ t = Math.min(1, t + 0.05); const [x,y] = routePoint(t); car.style.left = x/390*100+'%'; car.style.top = y/420*100+'%';
    if(t>=1){ later(()=>{ if(S.stack[S.stack.length-1].n==='live') finishRide(); }, 900); } }, 1200);
};
function finishRide(){ const d = byId(DESTS,S.ride.dest); const fare = d.prices[S.ride.tier];
  spend(fare, `Ride to ${d.n}`, 'transport'); addActivity({ mod:'transport', n:`Ride to ${d.n}`, s:`Today · ${byId(TIERS,S.ride.tier).n} · ${DRIVERS[S.ride.tier].n.split(' ')[0]} ${DRIVERS[S.ride.tier].n.split(' ')[1][0]}.`, v:fare, img:byId(TIERS,S.ride.tier).img, status:'Completed' });
  replace('ridedone'); }
SCREENS.ridedone = () => { const d = byId(DESTS,S.ride.dest), t = byId(TIERS,S.ride.tier), dr = DRIVERS[S.ride.tier]; const fare = d.prices[t.id];
  return statusbar() + `<div class="scroll"><div class="pad pb" style="padding-top:26px">
    ${successMark()}
    <div class="center"><h2>You’ve arrived.</h2><p>${d.n} · ${d.min} min with ${dr.n.split(' ')[0]}. Paid from your Merit Wallet.</p></div>
    <div class="ratestars" id="rate">${[1,2,3,4,5].map(i=>`<button data-act="rate" data-arg="${i}">${ico('star',30)}</button>`).join('')}</div>
    <div class="receipt" style="margin-top:14px">
      <div class="ln"><span>${t.n} · fixed fare</span><span>${money(fare)}</span></div>
      <div class="ln"><span>Merit Points earned</span><span style="color:var(--gold);font-weight:800">+${Math.round(fare*2)}</span></div>
      <div class="ln tot"><span>Charged to Merit Wallet</span><span>${money(fare)}</span></div>
    </div>
    <div class="grid2" style="margin-top:14px">
      <button class="btn btn-ghost" data-act="soon">${ico('gift',16)} Tip ${dr.n.split(' ')[0]}</button>
      <button class="btn btn-ghost" data-act="soon">${ico('receipt',16)} Receipt</button>
    </div>
    <button class="btn btn-primary btn-block btn-lg" style="margin-top:22px" data-act="home">Back to Merit</button>
  </div></div>`; };

/* ==========================================================
   DINING
   ========================================================== */
function basketCount(){ return Object.values(S.basket.items).reduce((a,b)=>a+b,0); }
function basketTotal(){ const r = byId(RESTAURANTS,S.basket.rid); if(!r) return 0; return Object.entries(S.basket.items).reduce((t,[id,q])=> t + byId(r.menu,id).p*q, 0); }
function floatBasket(){ const n = basketCount(); if(!n) return ''; const r = byId(RESTAURANTS,S.basket.rid);
  return `<button class="floatcta" data-go="basket"><span class="q">${n}</span><span class="t">View basket<small>${r.n} · ${S.basket.mode}</small></span><span class="btn btn-sm">${money(basketTotal())}</span></button>`; }

SCREENS.dining = (p={}) => {
  const f = S.diningFilter; const all = RESTAURANTS;
  const list = all.filter(r => f==='all' || r.tags.includes(f) || (f==='kitchens'&&r.merit));
  const kitchens = all.filter(r=>r.merit);
  const restCard = r => `<button class="tile" data-go="restaurant" data-p='"${r.id}"'><div class="media"><img src="${img(r.img)}" alt=""><div class="veil"></div><div class="cnr">${r.merit?'<span class="badge badge-gold">Merit</span>':''}</div><span class="cnr-r badge badge-glass">${r.price}</span></div>
      <div class="body"><h4>${r.n}</h4><div class="meta">${stars(r.rating)}<span>${r.cuisine.split(' · ')[0]}</span></div><div class="meta" style="margin-top:3px"><span>${r.area}</span><span>${r.time}</span></div></div></button>`;
  const chips = [['all','All'],['kitchens','Merit Kitchens'],['nigerian','Nigerian'],['british','British'],['italian','Italian'],['japanese','Japanese'],['indian','Indian'],['caribbean','Caribbean'],['seafood','Seafood'],['chinese','Sichuan'],['vegan','Plant-based'],['brunch','Brunch']];
  return `
  <div class="cover hub" style="height:210px"><img src="${img('hero-dining.jpg')}" alt=""><div class="sc"></div>${floatnav(`<button class="iconbtn glass" data-act="soon">${ico('heart',18)}</button>`)}
    <div class="in"><div class="k">Merit Dining · ${S.basket.mode==='collection'?'Collection':'Delivery to Mount Street'}</div><h2>What are you <em>hungry</em> for?</h2></div></div>
  <div class="scroll"><div class="pad pb overlap">
    <div class="searchfield">${ico('search',18)}<input placeholder="Croaker, omakase, jerk, table for two…"></div>
    <div class="chips" style="margin-top:14px">${chips.map(([id,n])=>`<button class="chip ${f===id?'on':''}" data-act="dfilter" data-arg="${id}">${n}</button>`).join('')}</div>
    ${f==='all' ? `${sech('Merit Kitchens','Our own')}
      <div class="rail">${kitchens.concat(all.filter(r=>!r.merit).slice(0,3)).map(r=>`<button class="pick" style="width:200px;height:132px" data-go="restaurant" data-p='"${r.id}"'><img src="${img(r.img)}" alt=""><div class="sc"></div>${r.merit?'<span class="tagm badge badge-gold">Merit Kitchens</span>':''}
        <div class="in"><div class="k">${r.cuisine.split(' · ')[0]} · ${r.area}</div><h4>${r.n}</h4><p>${stars(r.rating)} · ${r.time}</p></div></button>`).join('')}</div>` : ''}
    ${sech(f==='all'?'All restaurants':'Results', `${list.length} places`)}
    <div class="grid2">${list.map(restCard).join('')}</div>
    <div class="note" style="text-align:center;margin-top:18px">${all.length} restaurants on Merit in London · more join every week</div>
  </div></div>${floatBasket()}`;
};
SCREENS.restaurant = (rid) => {
  const r = byId(RESTAURANTS, rid); const tab = S.reserve.rid===rid && S.reserve.open ? 'reserve' : 'menu';
  return `
  <div class="cover short"><img src="${img(r.img)}" alt=""><div class="sc"></div>${floatnav(`<button class="iconbtn glass" data-act="soon">${ico('heart',18)}</button><button class="iconbtn glass" data-act="soon">${ico('share',18)}</button>`)}
    <div class="in"><div class="k">${r.cuisine} · ${r.area}</div><h2>${r.n}</h2><div class="meta">${stars(r.rating)}<span>${r.time}</span><span>${r.price}</span>${r.merit?'<span class="badge badge-gold">Merit Kitchens</span>':''}</div></div></div>
  <div class="tabs"><button class="${tab==='menu'?'on':''}" data-act="rtab" data-arg="menu">Order</button><button class="${tab==='reserve'?'on':''}" data-act="rtab" data-arg="reserve">Book a table</button><button data-act="soon">About</button></div>
  <div class="scroll"><div class="pad pb">
    ${tab==='menu' ? `
      <div class="segctl" style="margin-top:14px"><button class="${S.basket.mode==='delivery'?'on':''}" data-act="bmode" data-arg="delivery">Delivery · 25 min</button><button class="${S.basket.mode==='collection'?'on':''}" data-act="bmode" data-arg="collection">Collection · 15 min</button></div>
      <p class="note">${r.blurb}</p>
      ${sech('Menu')}
      ${r.menu.map(m=>{ const q = S.basket.rid===r.id ? (S.basket.items[m.id]||0) : 0; return `<div class="menuitem"><div class="thumb"><img src="${img(m.img)}" alt=""></div>
        <div class="g"><div class="n">${m.n}</div><div class="d">${m.d}</div><div class="p"><span>${money(m.p)}</span>${q?`<span class="stepper"><button data-act="dec" data-arg="${r.id}|${m.id}">${ico('minus',14)}</button><b>${q}</b><button class="add" data-act="inc" data-arg="${r.id}|${m.id}">${ico('plus',14)}</button></span>`:`<button class="addbtn" data-act="inc" data-arg="${r.id}|${m.id}">${ico('plus',16)}</button>`}</div></div></div>`; }).join('')}
      <div style="height:70px"></div>`
    : `
      <div class="field"><label>Party size</label><div class="optrow" style="margin-top:0">${[1,2,3,4,6,8].map(n=>`<button class="opt ${S.reserve.party===n?'on':''}" data-act="party" data-arg="${n}">${n}</button>`).join('')}</div></div>
      <div class="field"><label>Tonight</label><div class="slots" style="margin-top:0">${TIMES.map(t=>`<button class="slot ${S.reserve.time===t?'on':''}" data-act="rtime" data-arg="${t}"><b>${t}</b><span>${+t.slice(0,2)<17?'Lunch':'Dinner'}</span></button>`).join('')}</div></div>
      <div class="field"><label>Requests</label><textarea placeholder="Window table, birthday, allergies…"></textarea></div>
      <div class="infoline">${ico('sparkle',16)}<div class="g">Merit members hold a table with <b>no card</b> and earn points on the bill.</div></div>
      <button class="btn btn-gold btn-block btn-lg" style="margin-top:18px" data-act="reserve" data-arg="${r.id}">Reserve table for ${S.reserve.party} · ${S.reserve.time}</button>`}
  </div></div>${tab==='menu'?floatBasket():''}`;
};
SCREENS.basket = () => { const r = byId(RESTAURANTS,S.basket.rid); const sub = basketTotal(); const fee = S.basket.mode==='delivery'?2.5:0; const tot = sub+fee;
  return navbar('Your basket', r.n) + `<div class="scroll"><div class="pad pb">
    <div class="segctl"><button class="${S.basket.mode==='delivery'?'on':''}" data-act="bmode" data-arg="delivery">Delivery · 25–35 min</button><button class="${S.basket.mode==='collection'?'on':''}" data-act="bmode" data-arg="collection">Collection · 15 min</button></div>
    <div class="card tight" style="margin-top:14px;padding:4px 16px">${Object.entries(S.basket.items).map(([id,q])=>{ const m=byId(r.menu,id); return `<div class="menuitem"><div class="thumb" style="width:56px;height:56px"><img src="${img(m.img)}" alt=""></div><div class="g"><div class="n">${m.n}</div><div class="p"><span>${money(m.p*q)}</span><span class="stepper"><button data-act="dec" data-arg="${r.id}|${m.id}">${ico('minus',14)}</button><b>${q}</b><button class="add" data-act="inc" data-arg="${r.id}|${m.id}">${ico('plus',14)}</button></span></div></div></div>`; }).join('')}</div>
    ${S.basket.mode==='delivery' ? `<div class="addrbox on"><span class="ic">${ico('pin',18)}</span><div class="g"><div class="n">Mount Street, Mayfair W1K</div><div class="s">Leave with concierge · ring 4B</div></div>${ico('right',16)}</div>` : `<div class="addrbox on"><span class="ic">${ico('store',18)}</span><div class="g"><div class="n">Collect from ${r.n}</div><div class="s">${r.area} · ready in 15 min</div></div></div>`}
    ${payrow()}
    <div class="receipt" style="margin-top:14px">
      <div class="ln"><span>Items</span><span>${money(sub)}</span></div>
      <div class="ln"><span>${S.basket.mode==='delivery'?'Merit delivery':'Collection'}</span><span>${fee?money(fee):'Free'}</span></div>
      <div class="ln"><span>Service fee</span><span style="color:var(--success);font-weight:800">Waived · member</span></div>
      <div class="ln tot"><span>Total</span><span>${money(tot)}</span></div>
    </div>
  </div></div>
  <div class="bottomact"><button class="btn btn-gold btn-block btn-lg" data-act="placeorder">Place order · ${money(tot)}</button></div>`; };
SCREENS.ordertrack = () => { const r = byId(RESTAURANTS,S.basket.rid); const st = S.order.stage;
  const steps = S.basket.mode==='delivery' ? ['Order confirmed','Kitchen preparing','Dele is on the way','Delivered'] : ['Order confirmed','Kitchen preparing','Ready to collect','Collected'];
  return `
  <div class="map" style="height:280px">${mapSVG(true)}${floatnav(`<span class="badge badge-glass" id="ordbadge">${steps[st]}</span>`)}
    <div class="pin" style="${pct([105,300])}"><span class="lb">Home</span><span class="dot"></span></div>
    <div class="pin below" style="${pct([330,65])}"><span class="lb g">${r.n}</span><span class="dot gold"></span></div>
    ${st>=2 && S.basket.mode==='delivery' ? `<div class="carmk" style="${pct(routePoint(1 - Math.min(1,(st-2)*0.5+0.35)))}">${ico('bike',22)}</div>` : ''}
  </div>
  <div class="ridesheet" style="max-height:none;flex:1"><div class="grab"></div>
    <div class="eta"><div class="big">${st===3?"Here":Math.max(1, 28 - st*9)}<small>${st===3?"":"min"}</small></div><div class="k">${st===3?"Delivered · enjoy":"Estimated arrival 10:09"}</div></div>
    <div class="timeline">${steps.map((s,i)=>`<div class="tl ${i<st?'done':i===st?'now':''}"><i>${i<st?ico('check',10):''}</i><div class="n">${s}</div><div class="s">${i===0?'09:41':i===1?'Chef Tolu has your croaker on the grill':i===2?(S.basket.mode==='delivery'?'Merit e-bike · 1.2 mi':'Counter 2 · show your code'):'Rate your meal'}</div></div>`).join('')}</div>
    ${S.basket.mode==='delivery' ? `<div class="courierbar"><div class="avatar"><img src="${img(COURIER.img)}" alt=""></div><div class="g"><div class="n">${COURIER.n} · ${COURIER.vehicle}</div><div class="s">Contact is relayed through Merit</div></div><button class="iconbtn" style="background:rgba(255,255,255,.14);border-color:transparent;color:#fff" data-act="soon">${ico('message',18)}</button></div>` : ''}
    ${st>=3 ? `<button class="btn btn-primary btn-block" style="margin-top:16px" data-act="orderdone">Done</button>` : ''}
  </div>`; };
AFTER.ordertrack = () => { if(S.order.stage<3) later(()=>{ S.order.stage++; refresh(); }, 2600); };
SCREENS.orderdone = () => { const r = { n: S.order.rname || 'Merit Kitchens' };
  return statusbar() + `<div class="scroll"><div class="pad pb" style="padding-top:26px">${successMark()}
    <div class="center"><h2>Bon appétit, ${USER.first}.</h2><p>${r.n} · ${S.order.count} items · paid from Merit Wallet.</p></div>
    <div class="ratestars">${[1,2,3,4,5].map(i=>`<button data-act="rate" data-arg="${i}">${ico('star',30)}</button>`).join('')}</div>
    <div class="receipt" style="margin-top:14px"><div class="ln"><span>Order total</span><span>${money(S.order.total)}</span></div><div class="ln"><span>Merit Points earned</span><span style="color:var(--gold);font-weight:800">+${Math.round(S.order.total*2)}</span></div></div>
    <button class="btn btn-primary btn-block btn-lg" style="margin-top:22px" data-act="home">Back to Merit</button></div></div>`; };
SCREENS.reservedone = (rid) => { const r = byId(RESTAURANTS,rid);
  return statusbar() + `<div class="scroll"><div class="pad pb" style="padding-top:26px">${successMark(true)}
    <div class="center"><h2>Table held.</h2><p>${r.n} · tonight ${S.reserve.time} · party of ${S.reserve.party}. No card needed — you’re a Merit member.</p></div>
    <div class="card" style="margin-top:18px"><div class="infoline">${ico('calendar',16)}<div class="g">Tonight, <b>${S.reserve.time}</b> · ${r.area}</div></div><div class="infoline">${ico('car',16)}<div class="g">A <b>Merit Exec</b> can be here at ${(+S.reserve.time.slice(0,2)-1)}:${S.reserve.time.slice(3)} — one tap.</div><button class="btn btn-quiet btn-sm" data-act="ridetodinner">Book</button></div></div>
    <button class="btn btn-primary btn-block btn-lg" style="margin-top:22px" data-act="home">Back to Merit</button></div></div>`; };

/* ==========================================================
   BUILD & PROPERTY · find providers, send an inquiry, get a reply in-app
   ========================================================== */
function provCard(p){
  return `<button class="provcard" data-go="provider" data-p='"${p.id}"'><div class="avatar lg"><img src="${img(p.img)}" alt=""></div>
    <div class="g"><div class="n">${p.n}${p.verified?`<span class="badge badge-verified">${ico('shield',10)} Vetted</span>`:''}${p.merit?'<span class="badge badge-gold">Merit</span>':''}</div>
    <div class="s">${p.s}<br>${p.area} · ${p.jobs}</div><div class="m">${stars(p.rating)}<span class="rep">${ico('message',12)} ${p.replies}</span></div></div>${ico('right',16)}</button>`;
}
SCREENS.build = () => { const f = S.provFilter || 'all'; const list = PROVIDERS.filter(p => f==='all' || p.cat===f);
  return `
  <div class="cover hub"><img src="${img('hero-build.jpg')}" alt=""><div class="sc"></div>${floatnav()}
    <div class="in"><div class="k">Merit Build & Property</div><h2>Find the right <em>people</em>.</h2></div></div>
  <div class="scroll"><div class="pad pb overlap">
    <div class="searchfield">${ico('search',18)}<input placeholder="Builder, architect, estate agent, surveyor…"></div>
    <div class="duo" style="margin-top:14px">
      <button class="bigtile" style="height:130px" data-go="listings"><img src="${img('home-2.jpg')}" alt=""><div class="sc"></div><div class="in"><div class="ic">${ico('home',16)}</div><h4>Buy a home</h4><p>Handpicked listings</p></div></button>
      <button class="bigtile" style="height:130px" data-go="inquiry" data-p='"meritprop"'><img src="${img('home-int-3.jpg')}" alt=""><div class="sc"></div><div class="in"><div class="ic">${ico('send',16)}</div><h4>Sell a home</h4><p>Free valuation · Merit Property</p></div></button>
    </div>
    <div class="chips" style="margin-top:16px">${PROVIDER_CATS.map(c=>`<button class="chip ${f===c.id?'on':''}" data-act="pfilter" data-arg="${c.id}">${c.n}</button>`).join('')}</div>
    ${sech(f==='all'?'Merit-vetted providers':byId(PROVIDER_CATS,f).n, `${list.length} listed`)}
    ${list.map(provCard).join('')}
    ${sech('How it works')}
    <div class="listcard">${[['search','Browse vetted providers','Builders, architects, trades, agents, surveyors'],['send','Send one inquiry','Describe the job; your number stays private'],['message','They reply in Merit','Chat, book a visit, keep everything in one thread']].map(([i,n,t])=>`<div class="it"><span class="ic">${ico(i,18)}</span><div class="g"><div class="n">${n}</div><div class="s">${t}</div></div></div>`).join('')}</div>
  </div></div>`; };
SCREENS.provider = (id) => { const p = byId(PROVIDERS,id);
  return `
  <div class="cover"><img src="${img(p.cover)}" alt=""><div class="sc"></div>${floatnav(`<button class="iconbtn glass" data-act="soon">${ico('heart',18)}</button><button class="iconbtn glass" data-act="soon">${ico('share',18)}</button>`)}
    <div class="in"><div class="k">${byId(PROVIDER_CATS,p.cat).n} · ${p.area}</div><h2>${p.n}</h2><div class="meta">${stars(p.rating)}<span>${p.jobs}</span>${p.verified?`<span class="badge badge-verified">${ico('shield',10)} Vetted</span>`:''}</div></div></div>
  <div class="scroll"><div class="pad pb">
    <div style="display:flex;gap:12px;align-items:center;margin-top:14px"><div class="avatar xl" style="margin-top:-50px;position:relative"><img src="${img(p.img)}" alt=""></div><div style="flex:1"><div class="note" style="margin:0;color:var(--success)">${ico('message',13)} ${p.replies}</div></div></div>
    <p class="wizs">${p.about}</p>
    ${sech('Services')}<div class="svcchips" style="margin-top:0">${p.services.map(x=>`<span>${x}</span>`).join('')}</div>
    ${sech('Recent work')}<div class="gallery">${p.gal.map(g=>`<img src="${img(g)}" alt="">`).join('')}</div>
    ${sech('Reviews', '4.9 · 120')}
    <div class="card"><div class="infoline">${ico('star',16)}<div class="g"><b>“Turned up when they said they would, finished a week early.”</b><br>Amara O. · Chelsea · Aug 2026</div></div><div class="infoline">${ico('star',16)}<div class="g"><b>“Clear, honest and tidy. Would use again.”</b><br>Daniel K. · Notting Hill · Jul 2026</div></div></div>
    <div class="infoline" style="margin-top:14px">${ico('shield',16)}<div class="g">Your contact details stay private. <b>${p.n.split(' ')[0]}</b> replies to you inside Merit.</div></div>
  </div></div>
  <div class="bottomact"><button class="btn btn-gold btn-block btn-lg" data-go="inquiry" data-p='"${p.id}"'>${ico('send',18)} Send an inquiry</button></div>`; };
SCREENS.inquiry = (id) => { const p = byId(PROVIDERS,id); const q = S.inquiry; const isAgent = p.cat==='agents';
  const types = isAgent ? ['Selling','Buying','Valuation','Lettings'] : INQ_TYPES.filter(t=>!['Buying','Selling','Valuation'].includes(t));
  if(!types.includes(q.type)) q.type = types[0];
  return navbar('Send an inquiry', p.n) + `<div class="scroll"><div class="pad pb">
    <div class="agent" style="margin-top:6px"><div class="avatar lg"><img src="${img(p.img)}" alt=""></div><div class="g"><div class="n">${p.n}</div><div class="s">${p.s}</div></div><span class="badge badge-live">${p.replies.replace('Replies ','')}</span></div>
    <div class="field"><label>What do you need?</label><div class="optrow" style="margin-top:0">${types.map(t=>`<button class="opt ${q.type===t?'on':''}" data-act="itype" data-arg="${t}">${t}</button>`).join('')}</div></div>
    <div class="field"><label>Property</label><div class="addrbox on"><span class="ic">${ico('pin',18)}</span><div class="g"><div class="n">Elgin Crescent, Notting Hill W11</div><div class="s">Victorian terrace · 4 bed · owner-occupied</div></div>${ico('right',16)}</div></div>
    <div class="field"><label>When</label><div class="optrow" style="margin-top:0">${INQ_WHEN.map(t=>`<button class="opt ${q.when===t?'on':''}" data-act="iwhen" data-arg="${t}">${t}</button>`).join('')}</div></div>
    <div class="field"><label>Tell them about it</label><textarea id="inqmsg" placeholder="${isAgent?'We’re thinking of selling next spring — could you value the house?':'Open the kitchen into the garden room, Crittall doors, underfloor heating…'}">${esc(q.msg)}</textarea></div>
    <div class="field"><label>Photos (optional)</label><div class="gallery"><img src="${img('home-int-3.jpg')}" alt=""><img src="${img('home-int-4.jpg')}" alt=""><button class="slot" style="width:120px;height:90px;display:grid;place-items:center;color:var(--ink-3)">${ico('camera',22)}</button></div></div>
    <div class="field"><label>How should they reach you?</label><div class="optrow" style="margin-top:0"><button class="opt wide ${q.contact==='app'?'on':''}" data-act="icontact" data-arg="app">${ico('message',14)} In the Merit app</button><button class="opt wide ${q.contact==='call'?'on':''}" data-act="icontact" data-arg="call">${ico('phone',14)} Relayed call</button></div></div>
    <div class="infoline">${ico('shield',16)}<div class="g">Merit shares your first name and the property area only. Your number stays private until you choose to share it.</div></div>
  </div></div>
  <div class="bottomact"><button class="btn btn-gold btn-block btn-lg" data-act="sendinquiry" data-arg="${p.id}">${ico('send',18)} Send to ${p.n.split(' ')[0]}</button></div>`; };
AFTER.inquiry = el => { const t = el.querySelector('#inqmsg'); if(t) t.addEventListener('input', e => S.inquiry.msg = e.target.value); };
SCREENS.inquirydone = (id) => { const p = byId(PROVIDERS,id);
  return statusbar() + `<div class="scroll"><div class="pad pb" style="padding-top:26px">${successMark(true)}
    <div class="center"><h2>Inquiry sent.</h2><p>${p.n} has it. They ${p.replies.toLowerCase().replace('replies','usually reply')} — you’ll get a notification and the reply lands in your Merit inbox.</p></div>
    <div class="agent" style="margin-top:18px"><div class="avatar lg"><img src="${img(p.img)}" alt=""></div><div class="g"><div class="n">${p.n}</div><div class="s">${S.inquiry.type} · ${S.inquiry.when}</div></div><span class="badge badge-gold">Sent</span></div>
    <button class="btn btn-primary btn-block btn-lg" style="margin-top:18px" data-act="openthread" data-arg="${p.id}">Open the conversation</button>
    <button class="btn btn-ghost btn-block" style="margin-top:10px" data-act="home">Back to Merit</button></div></div>`; };
SCREENS.thread = (id) => { const p = byId(PROVIDERS,id); const msgs = S.threads[id] || THREADS[id] || []; const waiting = S.threads[id] && S.threads[id].waiting;
  return navbar('') + `
  <div class="threadhead"><div class="avatar lg"><img src="${img(p.img)}" alt=""></div><div style="flex:1"><div class="n">${p.n}</div><div class="s">${p.s}</div></div><button class="iconbtn" data-act="soon">${ico('phone',18)}</button></div>
  <div class="scroll"><div class="pad thread" id="threadscroll">
    <div class="note" style="text-align:center;margin:6px 0 4px">${ico('shield',12)} Relayed through Merit · your number stays private</div>
    ${msgs.map(m=>`<div class="bubble ${m.me?'me':'them'}">${esc(m.m)}<span class="t">${m.t}</span></div>`).join('')}
    ${waiting?`<div class="bubble them typing"><span></span><span></span><span></span></div>`:''}
    ${(!waiting && msgs.length>1) ? `<div class="optrow" style="margin-top:14px"><button class="opt" data-act="threadreply" data-arg="${id}|Tuesday works — 10am?">Tuesday works — 10am?</button><button class="opt" data-act="threadreply" data-arg="${id}|Thursday please">Thursday please</button></div>` : ''}
  </div></div>
  <div class="composer"><div class="in"><input placeholder="Message ${p.n.split(' ')[0]}…" id="threadin"></div><button class="addbtn" style="width:42px;height:42px" data-act="threadsend" data-arg="${id}">${ico('send',18)}</button></div>`; };
AFTER.thread = (el,id) => {
  const sc = el.querySelector('.scroll'); sc.scrollTop = sc.scrollHeight;
  const th = S.threads[id];
  if(th && th.waiting){ later(()=>{ th.waiting = false; const p = byId(PROVIDERS,id); const first = p.n.split(' ')[0];
    th.push({ me:false, t:'Just now', m: p.cat==='agents' ? `Hi ${USER.first}, thanks for getting in touch. I can come and value the house this week — would Tuesday or Thursday afternoon suit? Priya, Merit Property.` : `Hi ${USER.first}, thanks for the inquiry — that’s very much our kind of job. Happy to come and take a look next week. Tuesday or Thursday? ${first} team.` });
    S.activity.forEach(a=>{ if(a.thread===id){ a.status='Replied'; a.s = a.s.replace('sent just now','replied just now'); } });
    S.notifs = (S.notifs||0)+1; refresh(); toast(`${p.n} replied`,'message'); }, 3200); }
  const inp = el.querySelector('#threadin'); if(inp) inp.addEventListener('keydown', e=>{ if(e.key==='Enter') moduleAction('threadsend', id); });
};
/* ==========================================================
   DESIGNER · ATELIER
   ========================================================== */
function prodCard(p){ const d = byId(DESIGNERS,p.by);
  return `<button class="prod" data-go="product" data-p='"${p.id}"'><div class="img"><img src="${img(p.img)}" alt="">${p.tag?`<span class="tg badge ${p.tag==='New'?'badge-gold':'badge-glass'}">${p.tag}</span>`:''}<span class="hb">${ico('heart',15)}</span></div>
    <div class="n">${p.n}</div><div class="d">${d.n}</div><div class="p">${money0(p.p)}</div></button>`; }
function bagCount(){ return S.bag.length; }
function bagTotal(){ return S.bag.reduce((t,b)=> t + byId(PRODUCTS,b.pid).p, 0); }
function floatBag(){ if(!S.bag.length) return ''; return `<button class="floatcta" data-go="bag"><span class="q">${bagCount()}</span><span class="t">View bag<small>${S.bag.length===1?'1 piece':S.bag.length+' pieces'} · made to order</small></span><span class="btn btn-sm">${money0(bagTotal())}</span></button>`; }
SCREENS.atelier = () => { const tab = S.atelierTab; const feat = DESIGNERS[0];
  const shopTile = d => `<button class="tile" data-go="designer" data-p='"${d.id}"'><div class="media" style="height:120px"><img src="${img(d.cover)}" alt=""><div class="veil"></div><div class="cnr"><span class="badge badge-glass">${d.from}</span></div></div>
      <div class="body" style="display:flex;gap:10px;align-items:center;padding-top:10px"><div class="avatar" style="margin-top:-30px;border:2.5px solid #fff;position:relative;width:44px;height:44px"><img src="${img(d.img)}" alt=""></div><div style="min-width:0"><h4 style="font-size:.84rem">${d.n}</h4><div class="meta" style="margin-top:2px"><span>${d.s}</span></div><div class="meta" style="margin-top:2px"><span>${PRODUCTS.filter(p=>p.by===d.id).length} pieces</span></div></div></div></button>`;
  return `
  <div class="cover hub" style="height:210px"><img src="${img('hero-design.jpg')}" alt=""><div class="sc"></div>${floatnav(`<button class="iconbtn glass" data-act="soon">${ico('heart',18)}</button><button class="iconbtn glass" data-go="bag">${ico('bag',18)}</button>`)}
    <div class="in"><div class="k">Merit Designer · ${DESIGNERS.length} independent London labels</div><h2>Dress on <em>merit</em>.</h2></div></div>
  <div class="tabs" style="margin-top:-16px;position:relative;z-index:3;background:var(--paper)"><button class="${tab==='newin'?'on':''}" data-act="atab" data-arg="newin">New in</button><button class="${tab==='designers'?'on':''}" data-act="atab" data-arg="designers">Shops</button><button class="${tab==='bespoke'?'on':''}" data-act="atab" data-arg="bespoke">Made to measure</button><button class="${tab==='window'?'on':''}" data-act="atab" data-arg="window">Merit Window</button></div>
  <div class="scroll"><div class="pad pb">
    ${tab==='newin' ? `${sech('Shops','All shops','data-act="atab" data-arg="designers"')}<div class="desrail">${DESIGNERS.map(d=>`<button class="des" data-go="designer" data-p='"${d.id}"'><div class="av"><img src="${img(d.img)}" alt=""></div><div class="n">${d.n.split(' ')[0]}</div><div class="s">${d.s}</div></button>`).join('')}</div>
      ${sech('New this week')}<div class="prodgrid">${PRODUCTS.filter(p=>p.tag==='New').concat(PRODUCTS.filter(p=>p.tag!=='New')).slice(0,8).map(prodCard).join('')}</div>
      ${sech('Designer of the week')}
      <button class="windowtile" data-go="designer" data-p='"${feat.id}"'><img src="${img(feat.img)}" alt=""><div class="sc"></div><div class="in"><div class="k">${feat.s}</div><h3>${feat.n}</h3><p>${feat.bio}</p></div></button>
      ${sech('Everything else', `${PRODUCTS.length} pieces`)}<div class="prodgrid">${PRODUCTS.slice(8).map(prodCard).join('')}</div>
      <div style="height:70px"></div>` : ''}
    ${tab==='designers' ? `<div class="chips" style="margin-top:14px">${['All','Womenswear','Menswear','Accessories','Made to measure'].map((c,i)=>`<button class="chip ${i===0?'on':''}">${c}</button>`).join('')}</div>
      ${sech('Shops on Merit', `${DESIGNERS.length} labels`)}<div class="grid2">${DESIGNERS.map(shopTile).join('')}</div>
      <div class="infoline" style="margin-top:16px">${ico('store',16)}<div class="g">Every shop is an independent London designer, <b>vetted by Merit</b>. New labels are added every fortnight.</div></div>
      <div style="height:70px"></div>` : ''}
    ${tab==='bespoke' ? `<div class="card" style="margin-top:14px"><span class="eyebrow gold">Made to measure</span><h2 class="wizq" style="font-size:1.4rem">Cut for you, in ten days.</h2><p class="wizs">Book a fitting at a Merit Window, or scan your measurements in-app. ${DESIGNERS.filter(d=>PRODUCTS.some(p=>p.by===d.id&&p.tag==='Made to order')).map(d=>d.n.split(' ')[0]).join(', ')} take bespoke commissions.</p>
      <div class="choicegrid">${[['scissors','Book a fitting','Regent Street · 30 min'],['camera','Scan at home','Phone camera · 2 min']].map(([i,n,s])=>`<button class="choice" data-act="soon"><div class="ic">${ico(i,18)}</div><div class="n">${n}</div><div class="s">${s}</div></button>`).join('')}</div></div>
      ${sech('Made to order', `${PRODUCTS.filter(p=>p.tag==='Made to order').length} pieces`)}<div class="prodgrid">${PRODUCTS.filter(p=>p.tag==='Made to order').map(prodCard).join('')}</div>` : ''}
    ${tab==='window' ? `<p class="wizs" style="margin-top:14px">Physical shop windows in the West End, curated from Merit designers and rotated every fortnight. Scan any window to buy the look.</p>
      ${WINDOWS.map(w=>`<button class="windowtile" style="margin-top:14px" data-act="soon"><img src="${img(w.img)}" alt=""><div class="sc"></div><div class="in"><div class="k">Now showing</div><h3>${w.n}</h3><p>${w.s}</p></div></button>`).join('')}
      <div class="infoline" style="margin-top:14px">${ico('car',16)}<div class="g">A <b>Merit ride</b> to Regent Street from Mount Street is 9 minutes.</div></div>` : ''}
  </div></div>${floatBag()}`; };
SCREENS.designer = (id) => { const d = byId(DESIGNERS,id); const ps = PRODUCTS.filter(p=>p.by===id);
  return `
  <div class="cover"><img src="${img(d.cover)}" alt=""><div class="sc"></div>${floatnav(`<button class="iconbtn glass" data-act="soon">${ico('heart',18)}</button><button class="iconbtn glass" data-go="bag">${ico('bag',18)}</button>`)}
    <div class="in"><div class="k">${d.s} · ${d.from}</div><h2>${d.n}</h2></div></div>
  <div class="scroll"><div class="pad pb">
    <div style="display:flex;gap:12px;align-items:center;margin-top:14px"><div class="avatar xl" style="margin-top:-50px;position:relative"><img src="${img(d.img)}" alt=""></div><div style="flex:1"><div class="meta" style="font-size:.74rem;color:var(--ink-3);font-weight:600">${stars('4.9')} · 312 orders · ships in 10 days</div></div><button class="btn btn-quiet btn-sm" data-act="soon">Follow</button></div>
    <p class="wizs">${d.bio}</p>
    ${sech('Collection', `${ps.length} pieces`)}<div class="prodgrid">${ps.map(prodCard).join('')}</div>
    <div style="height:70px"></div>
  </div></div>${floatBag()}`; };
SCREENS.product = (id) => { const p = byId(PRODUCTS,id), d = byId(DESIGNERS,p.by); const o = S.prodOpt;
  return `
  <div class="hero-prod"><img src="${img(p.img)}" alt=""><div class="sc"></div>${floatnav(`<button class="iconbtn glass" data-act="like" data-arg="${p.id}" style="color:${S.liked.has(p.id)?'var(--alert)':'inherit'}">${ico('heart',18)}</button><button class="iconbtn glass" data-go="bag">${ico('bag',18)}</button>`)}<div class="dots"><i class="on"></i><i></i><i></i></div></div>
  <div class="scroll"><div class="prodhead">
    <button class="by" data-go="designer" data-p='"${d.id}"'><span class="av"><img src="${img(d.img)}" alt=""></span>${d.n} · ${d.s}</button>
    <h2>${p.n}</h2><div class="pr">${money0(p.p)}<small>${p.tag==='Made to order'?'made to order · 10 days':'ships in 2–3 days'}</small></div></div>
    <div class="pad pb">
      <div class="field"><label>Size</label><div class="sizes" style="margin-top:0">${p.sizes.map(s=>`<button class="size ${o.size===s?'on':''}" style="${s.length>3?'width:auto;padding:0 14px':''}" data-act="size" data-arg="${s}">${s}</button>`).join('')}</div></div>
      <div class="field"><label>Colour</label><div class="swatches" style="margin-top:0">${p.colors.map((c,i)=>`<button class="sw ${o.color===i?'on':''}" style="background:${c}" data-act="color" data-arg="${i}"></button>`).join('')}</div></div>
      <p class="wizs">${p.d}. Made in London in small runs. Free alterations at any Merit Window within 30 days.</p>
      <div class="listcard" style="margin-top:14px">${[['store','Try it in a Merit Window','Regent Street · in stock this week'],['scissors','Alter to fit','Complimentary for members'],['shield','Authentic & traceable','Every piece is signed by the maker']].map(([i,n,s])=>`<div class="it"><span class="ic">${ico(i,18)}</span><div class="g"><div class="n">${n}</div><div class="s">${s}</div></div></div>`).join('')}</div>
    </div></div>
  <div class="bottomact"><button class="btn btn-gold btn-block btn-lg" data-act="addbag" data-arg="${p.id}">${o.size?`Add to bag · ${money0(p.p)}`:'Choose a size'}</button></div>`; };
AFTER.product = (el,id) => { const p = byId(PRODUCTS,id); if(!S.prodOpt.size || !p.sizes.includes(S.prodOpt.size)){ S.prodOpt = { size:null, color:0 }; } };
SCREENS.bag = () => navbar('Your bag', `${S.bag.length} ${S.bag.length===1?'piece':'pieces'}`) + `<div class="scroll"><div class="pad pb">
    ${S.bag.length ? `<div class="card tight" style="padding:4px 16px">${S.bag.map((b,i)=>{ const p=byId(PRODUCTS,b.pid), d=byId(DESIGNERS,p.by); return `<div class="bagline"><div class="img"><img src="${img(p.img)}" alt=""></div><div class="g"><div class="n">${p.n}</div><div class="s">${d.n} · Size ${b.size}</div><div class="p">${money0(p.p)}</div></div><button class="iconbtn" data-act="rmbag" data-arg="${i}">${ico('x',16)}</button></div>`; }).join('')}</div>
      ${sech('Delivery')}
      <button class="addrbox ${S.bagMode!=='window'?'on':''}" data-act="bagmode" data-arg="home"><span class="ic">${ico('pin',18)}</span><div class="g"><div class="n">Mount Street, Mayfair W1K</div><div class="s">Merit courier · free for members</div></div></button>
      <button class="addrbox ${S.bagMode==='window'?'on':''}" data-act="bagmode" data-arg="window"><span class="ic">${ico('store',18)}</span><div class="g"><div class="n">Collect at Merit Window · Regent Street</div><div class="s">Try on and alter in-store</div></div></button>
      ${payrow()}
      <div class="receipt" style="margin-top:14px"><div class="ln"><span>Pieces</span><span>${money0(bagTotal())}</span></div><div class="ln"><span>Delivery</span><span style="color:var(--success);font-weight:800">Free · member</span></div><div class="ln tot"><span>Total</span><span>${money0(bagTotal())}</span></div></div>`
    : `<div class="empty"><div class="ic">${ico('bag',24)}</div><h4>Your bag is empty</h4><p>Pieces you add from any Merit designer gather here.</p></div>`}
  </div></div>
  ${S.bag.length ? `<div class="bottomact"><button class="btn btn-gold btn-block btn-lg" data-act="checkout">Pay ${money0(bagTotal())} with Merit Wallet</button></div>` : ''}`;
SCREENS.bagdone = () => statusbar() + `<div class="scroll"><div class="pad pb" style="padding-top:26px">${successMark(true)}
    <div class="center"><h2>Ordered. The maker has it.</h2><p>${S.lastOrder.count} ${S.lastOrder.count===1?'piece':'pieces'} · ${money0(S.lastOrder.total)} · ${S.bagMode==='window'?'collect at Merit Window, Regent Street':'to Mount Street'} in about 10 days.</p></div>
    <div class="timeline" style="margin-top:20px"><div class="tl done"><i>${ico('check',10)}</i><div class="n">Order placed</div><div class="s">Paid from Merit Wallet · +${Math.round(S.lastOrder.total*2)} points</div></div><div class="tl now"><i></i><div class="n">In the studio</div><div class="s">You’ll see photos as it’s made</div></div><div class="tl"><i></i><div class="n">Quality check & sign-off</div><div class="s">By the designer</div></div><div class="tl"><i></i><div class="n">${S.bagMode==='window'?'Ready at Regent Street':'Merit courier to Mount Street'}</div><div class="s">Alterations free for 30 days</div></div></div>
    <button class="btn btn-primary btn-block btn-lg" data-act="home">Back to Merit</button></div></div>`;

/* ==========================================================
   module actions
   ========================================================== */
function moduleAction(a, arg, btn, scr){
  switch(a){
    case 'home': home(); break;
    case 'rate': scr.querySelectorAll('.ratestars button').forEach(b => b.classList.toggle('on', +b.dataset.arg <= +arg)); break;
    /* transport */
    case 'pickdest': S.ride.dest = arg; go('tiers'); break;
    case 'picktier': S.ride.tier = arg; refresh(); break;
    case 'confirmride': S.ride.status = 'searching'; go('match'); break;
    case 'cancelride': S.ride.status='idle'; back(); toast('Ride cancelled — no charge','x'); break;
    case 'startride': replace('live'); break;
    case 'endride': finishRide(); break;
    case 'ridetodinner': S.ride = { dest:'shard', tier:'exec', status:'idle', when:'later', driver:null }; go('tiers'); break;
    /* dining */
    case 'dfilter': S.diningFilter = arg; refresh(); break;
    case 'bmode': S.basket.mode = arg; refresh(); break;
    case 'rtab': { const rid = S.stack[S.stack.length-1].p; S.reserve.rid = rid; S.reserve.open = (arg==='reserve'); refresh(); break; }
    case 'inc': { const [rid,mid] = arg.split('|'); if(S.basket.rid !== rid){ S.basket.rid = rid; S.basket.items = {}; } S.basket.items[mid] = (S.basket.items[mid]||0)+1; refresh(); break; }
    case 'dec': { const [rid,mid] = arg.split('|'); S.basket.items[mid] = (S.basket.items[mid]||0)-1; if(S.basket.items[mid]<=0) delete S.basket.items[mid]; if(!basketCount()) S.basket.rid = null; refresh(); break; }
    case 'party': S.reserve.party = +arg; refresh(); break;
    case 'rtime': S.reserve.time = arg; refresh(); break;
    case 'reserve': { const r = byId(RESTAURANTS,arg); addActivity({ mod:'dining', n:`Table at ${r.n}`, s:`Tonight ${S.reserve.time} · party of ${S.reserve.party}`, v:0, img:r.img, status:'Reserved', live:true }); S.reserve.open=false; replace('reservedone', arg); break; }
    case 'placeorder': { const r = byId(RESTAURANTS,S.basket.rid); const tot = basketTotal() + (S.basket.mode==='delivery'?2.5:0); const n = basketCount();
      spend(tot, r.n, 'dining'); S.order = { stage:0, total:tot, count:n }; addActivity({ mod:'dining', n:r.n, s:`Today · ${S.basket.mode==='delivery'?'Delivery':'Collection'} · ${n} items`, v:tot, img:r.menu[0].img, status:'Preparing', live:true });
      replace('ordertrack'); break; }
    case 'orderdone': { const r = byId(RESTAURANTS,S.basket.rid); S.order.rname = r ? r.n : 'Merit Kitchens'; S.activity.forEach(x=>{ if(x.mod==='dining' && x.live && x.status==='Preparing'){ x.live=false; x.status='Delivered'; } }); replace('orderdone'); S.basket = { rid:null, items:{}, mode:'delivery' }; break; }
    /* build & property */
    case 'pfilter': S.provFilter = arg; refresh(); break;
    case 'itype': S.inquiry.type = arg; refresh(); break;
    case 'iwhen': S.inquiry.when = arg; refresh(); break;
    case 'icontact': S.inquiry.contact = arg; refresh(); break;
    case 'sendinquiry': { const p = byId(PROVIDERS,arg); const msg = S.inquiry.msg || (p.cat==='agents' ? 'We’re thinking of selling Elgin Crescent next spring — could you come and value it?' : 'Open the kitchen into the garden room, Crittall doors, underfloor heating, keep the original floorboards. Could you come and look?');
      S.threads[arg] = [{ me:true, t:'Just now', m:msg }]; S.threads[arg].waiting = true;
      addActivity({ mod:'build', n:`Inquiry · ${p.n}`, s:`${S.inquiry.type} · Notting Hill · sent just now`, v:0, img:p.cover, status:'Sent', live:true, thread:arg });
      S.inquiry.msg=''; replace('inquirydone', arg); break; }
    case 'openthread': replace('thread', arg); break;
    case 'threadreply': { const [id,txt] = arg.split('|'); if(!S.threads[id]) S.threads[id] = THREADS[id].map(m=>({...m})); S.threads[id].push({ me:true, t:'Just now', m:txt }); S.threads[id].waiting = true; refresh(); break; }
    case 'threadsend': { const id = arg; const inp = scr && scr.querySelector('#threadin'); const txt = inp && inp.value.trim(); if(!txt) break; if(!S.threads[id]) S.threads[id] = THREADS[id].map(m=>({...m})); S.threads[id].push({ me:true, t:'Just now', m:txt }); S.threads[id].waiting = true; refresh(); break; }
    case 'lfilter': S.listFilter = arg; refresh(); break;
    case 'vslot': S.viewing.slot = +arg; refresh(); break;
    case 'bookviewing': { const l = byId(LISTINGS,arg); addActivity({ mod:'build', n:`Viewing · ${l.n}`, s:`${AGENT.n} · Merit Exec included`, v:0, img:l.img, status:'Booked', live:true }); replace('viewingdone', arg); break; }
    /* designer */
    case 'atab': S.atelierTab = arg; refresh(); break;
    case 'size': S.prodOpt.size = arg; refresh(); break;
    case 'color': S.prodOpt.color = +arg; refresh(); break;
    case 'like': if(S.liked.has(arg)) S.liked.delete(arg); else S.liked.add(arg); refresh(); break;
    case 'addbag': { if(!S.prodOpt.size){ toast('Choose a size first','info'); break; } S.bag.push({ pid:arg, size:S.prodOpt.size, color:S.prodOpt.color }); toast('Added to your bag','bag'); back(); break; }
    case 'rmbag': S.bag.splice(+arg,1); refresh(); break;
    case 'bagmode': S.bagMode = arg; refresh(); break;
    case 'checkout': { const tot = bagTotal(), n = S.bag.length; const first = byId(PRODUCTS,S.bag[0].pid); spend(tot, `${first.n}${n>1?` +${n-1}`:''}`, 'design');
      addActivity({ mod:'design', n:`${first.n}${n>1?` +${n-1} more`:''}`, s:`${byId(DESIGNERS,first.by).n} · made to order`, v:tot, img:first.img, status:'In the studio', live:true }); S.lastOrder = { total:tot, count:n }; S.bag = []; replace('bagdone'); break; }
    default: console.warn('unhandled action', a);
  }
}
