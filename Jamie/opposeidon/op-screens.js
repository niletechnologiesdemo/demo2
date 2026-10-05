/* OPERATION POSEIDON · public screens */
const SCREENS={}, AFTER={};
const person=k=>PEOPLE[k];
const dateBadge=r=>`<div class="date"><b>${r.day}</b><span>${r.mon}</span></div>`;
const tierPill=t=>t==='free'?`<span class="pill pill-free">${ico('unlock',10)} Free</span>`:`<span class="pill pill-navy">${ico('lock',10)} Members</span>`;
const progOf=c=>Math.round(((S.done[c.id]||[]).length/c.ls.length)*100);

/* ---------- merch illustrations (SVG, no photos needed) ---------- */
function merchSVG(type,col){
  const wave=`<path d="M30 62c8-8 16-8 24 0s16 8 24 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".9"/>`;
  const map={
    tee:`<path d="M30 20l14-8h20l14 8 8 14-12 6v46H34V40l-12-6z" fill="${col}"/><path d="M44 12a10 10 0 0 0 20 0" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/>${wave}`,
    hoodie:`<path d="M28 24l16-10h20l16 10 8 16-12 6v44H32V46l-12-6z" fill="${col}"/><path d="M44 14c0 8 4 14 10 14s10-6 10-14" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/><rect x="40" y="66" width="28" height="12" rx="4" fill="#fff" opacity=".25"/>${wave}`,
    beanie:`<path d="M26 66c0-24 12-40 28-40s28 16 28 40z" fill="${col}"/><rect x="22" y="62" width="64" height="16" rx="6" fill="${col}" stroke="#fff" stroke-width="2" opacity=".95"/><circle cx="54" cy="26" r="6" fill="#fff" opacity=".8"/>${wave.replace('62','44')}`,
    sticker:`<circle cx="54" cy="54" r="34" fill="${col}"/><circle cx="54" cy="54" r="27" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>${wave.replace('62','54')}<text x="54" y="74" text-anchor="middle" font-size="8" fill="#fff" font-family="Inter" font-weight="700" letter-spacing="2">POSEIDON</text>`,
    robe:`<path d="M26 26l18-12h20l18 12 8 18-12 6v46H30V50l-12-6z" fill="${col}"/><path d="M54 14v82" stroke="#fff" stroke-width="2" opacity=".35"/><path d="M42 14c0 10 5 16 12 16s12-6 12-16" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/>${wave.replace('62','70')}`,
    cap:`<path d="M24 62c0-22 13-36 30-36s30 14 30 36z" fill="${col}"/><path d="M24 62h60" stroke="#fff" stroke-width="3" opacity=".8"/>${wave.replace('62','48')}`,
    gloves:`<path d="M30 40h8V26a4 4 0 0 1 8 0v14h4V22a4 4 0 0 1 8 0v18h4V26a4 4 0 0 1 8 0v30c0 14-8 24-20 24S30 70 30 56z" fill="${col}"/><rect x="30" y="66" width="40" height="8" fill="#fff" opacity=".3"/>`,
    float:`<path d="M54 22c18 0 30 14 30 30 0 18-14 34-30 34S24 70 24 52c0-16 12-30 30-30z" fill="${col}"/><path d="M40 52h28" stroke="#fff" stroke-width="3" opacity=".7"/><path d="M54 86v10" stroke="#122129" stroke-width="3"/>`,
    bundle:`<rect x="20" y="36" width="68" height="46" rx="6" fill="${col}"/><path d="M20 52h68" stroke="#fff" stroke-width="2" opacity=".5"/><path d="M54 36v46" stroke="#fff" stroke-width="2" opacity=".5"/><path d="M36 36l18-14 18 14" fill="none" stroke="${col}" stroke-width="6"/>`,
    gift:`<path d="M54 20c-8-10-22-4-14 6 8 6 14 4 14 4s6 2 14-4c8-10-6-16-14-6z" fill="${col}"/><rect x="24" y="32" width="60" height="18" rx="4" fill="${col}"/><rect x="28" y="50" width="52" height="36" rx="4" fill="${col}" opacity=".85"/><path d="M54 32v54" stroke="#fff" stroke-width="4" opacity=".6"/>`,
  };
  return `<div class="merch"><svg viewBox="0 0 108 108">${map[type]||map.tee}</svg></div>`;
}

/* ---------- chrome ---------- */
function nav(active,dark){
  return `<nav class="site-nav ${dark?'dark':''}">
    <a class="brand" data-act="go" data-to="home"><img src="${LOGO}" alt=""><span>Operation Poseidon<small>Surf therapy · Jurassic Coast</small></span></a>
    <div class="links">${[['retreats','Retreats'],['learn','Learn'],['community','Community'],['shop','Shop'],['about','Our mission'],['club','Sea to Summit']].map(([r,l])=>`<a data-act="go" data-to="${r}" class="${active===r?'on':''}">${l}</a>`).join('')}</div>
    <div class="right">
      <button class="btn-icon cartbtn" data-act="go" data-to="cart" title="Bag">${ico('bag',17)}${S.cart.length?`<span class="n">${cartCount()}</span>`:''}</button>
      ${S.signedIn?`<a class="avatar" data-act="go" data-to="account"><img src="${PEOPLE.me.img}" alt="">${PEOPLE.me.first}</a>`:`<a class="btn btn-sm ${dark?'btn-light':'btn-ghost'}" data-act="signin">Sign in</a>`}
      ${S.member?`<span class="pill pill-gold">${ico('award',11)} Crew member</span>`:`<a class="btn btn-sm ${dark?'btn-white':'btn-coral'}" data-act="go" data-to="membership">Join the crew</a>`}
    </div></nav>`;
}
function footer(){
  return `<footer class="foot-site"><div class="wrap"><div class="cols">
    <div><div class="brand"><img src="${LOGO}" alt="">Operation Poseidon</div><p>Surf therapy and blue space retreats on the Jurassic Coast. Free for anyone who cannot pay, funded by our forestry work, our members and this shop.</p></div>
    <div><h5>Do</h5><a data-act="go" data-to="retreats">Retreats</a><a data-act="go" data-to="retreats">Single sessions</a><a data-act="go" data-to="retreat" data-id="r2">Veterans’ week</a><a data-act="go" data-to="shop">Sponsor a place</a></div>
    <div><h5>Learn</h5><a data-act="go" data-to="learn">Course library</a><a data-act="go" data-to="course" data-id="c2">Cold water shock</a><a data-act="go" data-to="community">Community</a><a data-act="go" data-to="membership">Membership</a></div>
    <div><h5>Contact</h5><a data-act="soon">hello@opposeidon.co.uk</a><a data-act="soon">Kimmeridge Bay, Dorset</a><a data-act="soon">Instagram @opposeidon</a><a data-act="soon">Safeguarding &amp; water safety</a></div>
  </div><div class="bottom"><span>© 2026 Operation Poseidon CIC</span><span>Registered community interest company · England &amp; Wales</span><span class="grow"></span><span>Interactive mockup by Nile Technologies</span></div></div></footer>`;
}
function retreatCard(r){
  const left=r.cap-r.booked, low=left<=3, full=left<=0;
  return `<div class="rcard-retreat" data-act="go" data-to="retreat" data-id="${r.id}">
    <div class="ph"><img src="${r.img}" alt="">${dateBadge(r)}<div class="tags">${r.tags.map(t=>`<span class="pill ${t==='Fully funded'?'pill-ok':t==='Waitlist'?'pill-coral':'pill-dark'}">${t}</span>`).join('')}</div></div>
    <div class="bd"><span class="kicker">${r.type}</span><h3>${r.title}</h3>
      <div class="meta"><span>${ico('calendar',13)} ${r.dates}</span><span>${ico('map-pin',13)} ${r.loc}</span></div>
      <p>${r.blurb}</p>
      <div class="foot"><div class="price">${r.price?`<b>${gbp(r.price)}</b><small>${r.free} free places funded</small>`:`<b>Free</b><small>Fully funded · ${r.cap} places</small>`}</div><span class="grow"></span>
      <div class="spots ${low?'low':''}"><span class="bar"><i style="width:${Math.min(100,r.booked/r.cap*100)}%"></i></span>${full?'Full · waitlist':left+' left'}</div></div>
    </div></div>`;
}
function courseCard(c){
  const p=progOf(c);
  return `<div class="ccard" data-act="go" data-to="course" data-id="${c.id}">
    <div class="ph"><img src="${c.img}" alt=""><span class="tier">${tierPill(c.tier)}</span><span class="play">${ico('play',20)}</span><span class="pill pill-dark dur">${c.dur}</span></div>
    <div class="bd"><span class="cat">${c.cat}</span><h3>${c.title}</h3><p>${c.blurb}</p>
      <div class="foot"><span>${ico('layers',13)} ${c.lessons} lessons</span><span>${ico('user',13)} ${person(c.lead).n.split(' ')[0]}</span><span class="grow"></span>${p?`<span style="color:var(--sea)">${p}%</span>`:''}</div>
      ${p?`<div class="prog mt" style="margin-top:10px"><i style="width:${p}%"></i></div>`:''}
    </div></div>`;
}
function productCard(p){
  return `<div class="pcard"><div class="ph">${merchSVG(p.type,p.col)}${p.was?`<span class="pill pill-coral tag">Save ${gbp(p.was-p.price)}</span>`:p.cat==='Give'?`<span class="pill pill-ok tag">100% to free places</span>`:''}</div>
    <div class="bd"><span class="cat">${p.cat}</span><h3>${p.name}</h3><div class="fund">${ico('heart',12)} ${p.funds}</div>
    <div class="foot"><b>${gbp(p.price)}</b>${p.was?`<s>${gbp(p.was)}</s>`:''}<span class="grow"></span><button class="btn btn-sm btn-primary" data-act="add-cart" data-id="${p.id}">${ico('plus',13)} Add</button></div></div></div>`;
}

/* ============================================================ HOME */
SCREENS.home=()=>{
  const next=RETREATS[0];
  return `${nav('home',true)}
  <section class="hero"><img class="bg" src="${P('surf4')}" alt=""><div class="scrim"></div>
    <div class="in"><div class="wrap">
      <span class="kicker light">Surf therapy retreats · Jurassic Coast</span>
      <h1>The sea is a <em>powerful healer.</em></h1>
      <p>Operation Poseidon runs surf and blue space therapy retreats for anyone who needs to press life’s reset button. If you can pay, you fund the next person. If you can’t, you come anyway.</p>
      <div class="cta"><a class="btn btn-lg btn-coral" data-act="go" data-to="retreats">${ico('calendar',16)} Book a retreat</a><a class="btn btn-lg btn-light" data-act="go" data-to="learn">${ico('play',16)} Start learning free</a></div>
      <div class="stats"><div class="stat"><div class="v">312</div><div class="k">People in the water</div></div><div class="stat"><div class="v">86</div><div class="k">Free places funded</div></div><div class="stat"><div class="v">658</div><div class="k">Crew &amp; followers</div></div></div>
    </div></div>
    <div class="hside"><div class="next"><span class="k">Next retreat</span><h4>${next.title}</h4><p>${next.blurb.split('.')[0]}.</p>
      <div class="row">${ico('calendar',14)} ${next.dates}</div><div class="row">${ico('map-pin',14)} ${next.loc}</div><div class="row">${ico('users',14)} ${next.cap-next.booked} places left · ${next.free} free places</div>
      <a class="btn btn-block btn-primary" style="margin-top:14px" data-act="go" data-to="retreat" data-id="${next.id}">See the weekend ${ico('arrow-right',14)}</a></div></div>
  </section>

  <section class="section"><div class="wrap">
    <div class="sec-head center"><span class="kicker">One platform, four ways in</span><h2>Book. Learn. <em>Belong.</em> Give back.</h2></div>
    <div class="grid g4">
      <div class="pillar" data-act="go" data-to="retreats"><img src="${P('grp3')}" alt=""><div class="sc"></div><div class="in"><div class="n">${ico('calendar',20)}</div><h3>Book</h3><p>Retreats, dip days and single sessions. Paid, deposit or apply for a free place.</p><span class="go">Retreat dates ${ico('arrow-right',13)}</span></div></div>
      <div class="pillar" data-act="go" data-to="learn"><img src="${P('surfG')}" alt=""><div class="sc"></div><div class="in"><div class="n">${ico('play',20)}</div><h3>Learn</h3><p>Cold water safety and retreat prep free for all. The full surf programme for members.</p><span class="go">Open the library ${ico('arrow-right',13)}</span></div></div>
      <div class="pillar" data-act="go" data-to="community"><img src="${P('canopy1')}" alt=""><div class="sc"></div><div class="in"><div class="n">${ico('users',20)}</div><h3>Community</h3><p>Reflections, Dip of the Day, ask the crew. The fire circle, every day of the year.</p><span class="go">Join the conversation ${ico('arrow-right',13)}</span></div></div>
      <div class="pillar" data-act="go" data-to="shop"><img src="${P('surfE')}" alt=""><div class="sc"></div><div class="in"><div class="n">${ico('bag',20)}</div><h3>Shop</h3><p>Tees, hoodies, robes and kit. Every order shows exactly what it funds.</p><span class="go">Browse the shop ${ico('arrow-right',13)}</span></div></div>
    </div></div></section>

  <section class="section deep"><div class="wrap"><div class="split">
    <div><span class="kicker light">How it’s funded</span><h2>Forestry pays. Members pay. <em>Nobody is turned away.</em></h2>
      <p>Jamie’s forestry work has funded every free place so far. This platform adds two more engines: a monthly membership that unlocks the full library, and a shop where every hoodie shows which retreat place it paid for.</p>
      <ul class="tick-list"><li>${ico('check-circle',18)}<span><b>Pay what you can.</b> Full price, a deposit, or apply for a funded place in two minutes.</span></li><li>${ico('check-circle',18)}<span><b>Members fund places.</b> Every twelve Crew memberships fund one full retreat place.</span></li><li>${ico('check-circle',18)}<span><b>Transparent.</b> The impact counter on every screen is real and updates with every booking and order.</span></li></ul>
      <a class="btn btn-white mt2" data-act="go" data-to="about">Read the mission ${ico('arrow-right',14)}</a></div>
    <div><div class="impact"><div class="i"><div class="v">86</div><div class="k">Free retreat places funded since 2023</div></div><div class="i"><div class="v">£<em>19k</em></div><div class="k">Value of therapy delivered at no cost</div></div><div class="i"><div class="v">8</div><div class="k">Veterans on the October residential, all funded</div></div><div class="i"><div class="v">100%</div><div class="k">Of “Sponsor a place” goes to a place</div></div></div></div>
  </div></div></section>

  <section class="section"><div class="wrap">
    <div class="sec-head row"><div><span class="kicker">Upcoming</span><h2>Retreats &amp; <em>dip days</em></h2></div><span class="grow"></span><a class="btn btn-ghost" data-act="go" data-to="retreats">All dates ${ico('arrow-right',14)}</a></div>
    <div class="grid g3">${RETREATS.slice(0,3).map(retreatCard).join('')}</div>
  </div></section>

  <section class="section sunk"><div class="wrap">
    <div class="sec-head row"><div><span class="kicker">Learn</span><h2>Start with the <em>free</em> essentials</h2><p>Everyone watches cold water shock before a winter dip. Members get the full surf, breathwork, kayak and climbing programmes.</p></div><span class="grow"></span><a class="btn btn-ghost" data-act="go" data-to="learn">Course library ${ico('arrow-right',14)}</a></div>
    <div class="grid g3">${[COURSES[1],COURSES[3],COURSES[4]].map(courseCard).join('')}</div>
  </div></section>

  <section class="section"><div class="wrap">
    <div class="sec-head center"><span class="kicker">In their words</span><h2>What happens after the <em>cold water</em></h2></div>
    <div class="grid g3">${TESTIMONIALS.map(t=>`<div class="quote">${ico('quote',22)}<p>${t.txt}</p><div class="who"><img src="${person(t.who).img}" alt=""><div><b>${person(t.who).n}</b><span>${person(t.who).role}</span></div></div></div>`).join('')}</div>
  </div></section>

  <section class="section foam"><div class="wrap"><div class="split">
    <div class="ph wide"><img src="${P('grp4')}" alt=""><div class="float">${ico('award',26)}<div><b>Crew membership · £9 a month</b><span>Full library, community, member discounts. Funds free places.</span></div></div></div>
    <div><span class="kicker">Membership</span><h2>Join the crew, <em>fund a place</em></h2><p>Nine pounds a month unlocks every course, the live monthly call with Jamie, ten percent off the shop and priority booking on retreats. Every twelve members fund one free place. You will see your number.</p>
      <div style="display:flex;gap:10px;margin-top:22px"><a class="btn btn-coral" data-act="go" data-to="membership">See plans</a><a class="btn btn-ghost" data-act="go" data-to="shop">Or shop for a cause</a></div></div>
  </div></div></section>
  <section class="section" style="padding:0"><div class="opcard" style="border-radius:0;min-height:420px" data-act="go" data-to="club"><img src="${P('cliff2')}" alt=""><div class="sc"></div><span class="pill pill-coral st" style="left:40px;top:28px">${ico('clock',10)} Coming soon</span><div class="in wrap" style="padding:40px;width:100%;max-width:1240px;margin:0 auto"><span class="k">Water · Land · Air</span><h3 style="font-size:3rem">Sea to <em>Summit</em> Club</h3><p style="max-width:60ch;font-size:1rem">Operation Poseidon is the first of three. Thor takes it onto the land, Pegasus into the air. Corporate team-building pays, therapy stays free.</p><span class="btn btn-white" style="margin-top:18px;width:max-content">See the vision ${ico('arrow-right',14)}</span></div></div></section>
  ${footer()}`;
};

/* ============================================================ RETREATS */
SCREENS.retreats=()=>{
  const f=S.retreatFilter; const list=RETREATS.filter(r=>f==='All'||r.type.includes(f));
  return `${nav('retreats')}
  <section class="pagehero"><img class="bg" src="${P('grp3')}" alt=""><div class="scrim"></div><div class="in"><div class="wrap"><span class="kicker light">Book</span><h1>Retreats, residentials <em>and dip days</em></h1><p>Every date has paid places and funded places. Pay in full, hold a place with a deposit, or apply for a free place. Same water, same fire, same crew.</p></div></div></section>
  <section class="section tight"><div class="wrap">
    <div class="toolbar"><div class="chips">${['All','Weekend','5-day','Single day'].map(x=>`<button class="chip ${f===x?'on':''}" data-act="retreat-filter" data-f="${x}">${x}</button>`).join('')}</div><span class="grow"></span><span class="muted" style="font-size:.8rem;font-weight:600">${list.length} dates · Dorset &amp; Devon</span></div>
    <div class="grid g2">${list.map(retreatCard).join('')}</div>
  </div></section>
  <section class="section sunk"><div class="wrap">
    <div class="sec-head row"><div><span class="kicker">Single sessions</span><h2>Can’t do a weekend? <em>Do a morning.</em></h2><p>Dawn dips, surf lessons, sea kayaking, climbing and try-dives. Book a slot, turn up, get in.</p></div></div>
    <div class="card"><div class="tblwrap"><table class="tbl"><thead><tr><th>Session</th><th>When</th><th>Where</th><th>Lead</th><th>Price</th><th>Spots</th><th></th></tr></thead><tbody>
      ${SESSIONS.map(s=>`<tr><td><div class="thumbcell"><img class="sq" src="${s.img}" alt=""><div><b>${s.title}</b><div class="s">${s.price?'Paid session':'Free · funded'}</div></div></div></td><td>${s.when}</td><td>${s.loc}</td><td>${person(s.lead).n.split(' ')[0]}</td><td class="num">${s.price?gbp(s.price):'Free'}</td><td>${s.spots>0?`<span class="pill ${s.spots<=2?'pill-coral':'pill-ok'}">${s.spots} left</span>`:'<span class="pill pill-soft">Full</span>'}</td><td><div class="acts"><button class="btn btn-sm btn-primary" data-act="session-book" data-id="${s.id}" ${s.spots<=0?'disabled':''}>Book</button></div></td></tr>`).join('')}
    </tbody></table></div></div>
  </div></section>
  <section class="section"><div class="wrap"><div class="split">
    <div><span class="kicker">Free places</span><h2>How a <em>funded place</em> works</h2><p>Pick the retreat, choose “Apply for a free place”, and tell us a little about why. Jamie reads every application himself, usually within two days. There is no means test and no paperwork. If it is a yes, your place is confirmed exactly like a paid one.</p>
      <ul class="tick-list"><li>${ico('check-circle',18)}<span><b>Two-minute application.</b> Three questions, no documents.</span></li><li>${ico('check-circle',18)}<span><b>Referrals welcome.</b> GPs, charities and units can refer someone directly.</span></li><li>${ico('check-circle',18)}<span><b>Same experience.</b> Nobody on the beach knows who paid.</span></li></ul></div>
    <div class="ph"><img src="${P('surf5')}" alt=""><div class="float">${ico('heart',26)}<div><b>${RETREATS.reduce((a,r)=>a+r.free,0)} free places open right now</b><span>Across ${RETREATS.length} upcoming dates</span></div></div></div>
  </div></div></section>
  ${footer()}`;
};

/* ============================================================ RETREAT DETAIL */
SCREENS.retreat=id=>{
  const r=byId(RETREATS,id); const lead=person(r.lead); const left=r.cap-r.booked; const full=left<=0;
  const opt=S.bookOpt||(r.price?'paid':'free');
  const opts=full?[['waitlist','coral','clock','Join the waitlist','We’ll email you the moment a place opens','Free']]:
    r.price?[['paid','sea','card','Paid place','Full price · funds the next person',gbp(r.price)],['deposit','sea','pound','Hold with a deposit','Pay '+gbp(r.deposit)+' now, the rest 14 days before',gbp(r.deposit)+' now'],['free','ok','heart','Apply for a free place',r.free+' funded places on this date','£0']]:
    [['free','ok','heart','Apply for a funded place','All '+r.cap+' places on this date are free','£0']];
  const price=opt==='paid'?r.price:opt==='deposit'?r.deposit:0;
  return `${nav('retreats')}
  <section class="section tight" style="padding-top:34px"><div class="wrap">
    <a class="btn btn-sm btn-ghost" data-act="go" data-to="retreats">${ico('arrow-left',13)} All retreats</a>
    <div class="detail mt2">
      <div>
        <div class="gallery">${r.gal.map(g=>`<img src="${g}" alt="">`).join('')}</div>
        <div class="mt2"><span class="kicker">${r.type} · ${r.level}</span><h1>${r.title}</h1>
        <div class="meta"><span>${ico('calendar',15)} ${r.dates}</span><span>${ico('map-pin',15)} ${r.loc}</span><span>${ico('moon',15)} ${r.nights}</span><span>${ico('users',15)} Max ${r.cap} people</span></div></div>
        <div class="body"><p>${r.desc}</p><p>${r.blurb}</p></div>
        <h3>What the ${r.nights.includes('day')&&!r.nights.includes('days')?'day':'weekend'} looks like</h3>
        <div class="itin">${r.itin.map(([t,b,s])=>`<div class="d"><span class="t">${t}</span><b>${b}</b><span>${s}</span></div>`).join('')}</div>
        <h3>Who’s leading</h3>
        <div class="card pad mt" style="display:flex;gap:16px;align-items:center"><img src="${lead.img}" style="width:64px;height:64px;border-radius:50%;object-fit:cover" alt=""><div><b>${lead.n}</b><div class="muted" style="font-size:.8rem;margin-top:2px">${lead.role}${r.lead==='jamie'?' · Ex-Royal Marines · Surf, scuba, kayak &amp; climbing instructor · Summer mountain leader':''}</div></div><span class="grow"></span><span class="pill pill-ok">${ico('shield-check',11)} Water safety cover</span></div>
        <h3>What’s included</h3>
        <ul class="tick-list">${['Wetsuit, boots, gloves and board','All coaching and beach lifeguard cover','Hot food every evening, breakfast every morning','Access to the “Preparing for your retreat” course the moment you book','A place in the cohort group in the community afterwards'].map(x=>`<li>${ico('check',16)}<span>${x}</span></li>`).join('')}</ul>
      </div>
      <div class="bookbox">
        <div class="top"><span class="k">${full?'This date is full':left+' places left · '+r.free+' free'}</span><div class="when">${r.dates}</div><div class="where">${r.loc}</div></div>
        <div class="bd">
          ${opts.map(([k,c,i,t,s,pr])=>`<div class="opt ${opt===k?'on':''}" data-act="book-opt" data-opt="${k}"><span class="n ${c}">${ico(i,18)}</span><div><b>${t}</b><span>${s}</span></div><span class="pr">${pr}</span></div>`).join('')}
          ${price?`<div class="sum"><span>${opt==='deposit'?'Deposit today':'Retreat place'}</span><span>${gbp(price)}</span></div><div class="sum"><span>Funds towards free places</span><span>${gbp(Math.round(price*.2))}</span></div><div class="sum total"><span>Pay today</span><span>${gbp(price)}</span></div>`:''}
          <button class="btn btn-block btn-lg ${opt==='free'||opt==='waitlist'?'btn-sea':'btn-coral'}" style="margin-top:14px" data-act="book-start" data-id="${r.id}" data-opt="${opt}">${opt==='free'?'Start free place application':opt==='waitlist'?'Join waitlist':'Book this place'} ${ico('arrow-right',15)}</button>
          <div class="note">${ico('shield',15)}<span>Free cancellation up to 14 days before. Deposits are transferable to any future date.</span></div>
        </div>
      </div>
    </div>
  </div></section>
  ${footer()}`;
};

/* ============================================================ BOOKING WIZARD */
SCREENS.book=id=>{
  const b=S.booking; const r=byId(RETREATS,id); const step=b.step; const free=b.opt==='free'; const wait=b.opt==='waitlist';
  const price=b.opt==='paid'?r.price:b.opt==='deposit'?r.deposit:0;
  const steps=free?['Your details','Your story','Confirm']:wait?['Your details','Confirm']:['Your details','Water & health','Payment'];
  const stepHTML=`<div class="steps">${steps.map((s,i)=>`<div class="st ${step===i+1?'on':step>i+1?'done':''}"><i>${step>i+1?ico('check',12):i+1}</i>${s}</div>${i<steps.length-1?'<span class="ln"></span>':''}`).join('')}</div>`;
  let panel='';
  if(step===4) panel=`<div class="panel"><div class="confirm"><div class="ring">${ico(free?'send':'check',40)}</div>
    <h2>${free?'Application sent':wait?'You’re on the list':'You’re booked in'}</h2>
    <p>${free?'Jamie reads every application himself. You will hear back within two days. In the meantime the preparation course is unlocked for you below.':wait?'We will email the moment a place opens on '+r.dates+'. Waitlist places are offered in order.':'Confirmation and your kit list are on their way to '+PEOPLE.me.first.toLowerCase()+'@example.com. The preparation course is unlocked now.'}</p>
    <div class="unlocked"><div class="u" data-act="go" data-to="course" data-id="c4">${ico('play',20)}<div><b>Preparing for your retreat</b><span>Unlocked · 18 min</span></div></div><div class="u" data-act="go" data-to="course" data-id="c2">${ico('wind',20)}<div><b>Cold water shock</b><span>Watch before you come</span></div></div><div class="u" data-act="go" data-to="community">${ico('users',20)}<div><b>${r.title.split('·')[0].trim()} cohort</b><span>Say hello to the group</span></div></div></div>
    <div class="acts"><a class="btn btn-primary" data-act="go" data-to="account">See my bookings</a><a class="btn btn-ghost" data-act="go" data-to="retreats">Back to retreats</a></div></div></div>`;
  else if(step===1) panel=`<div class="panel"><h2>Your details</h2><p>We only ask for what the beach team actually needs.</p>
    <div class="form"><div class="field"><label>First name</label><input class="input" value="${PEOPLE.me.first}"></div><div class="field"><label>Last name</label><input class="input" value="Whitfield"></div><div class="field"><label>Email</label><input class="input" value="tom.whitfield@example.com"></div><div class="field"><label>Mobile</label><input class="input" value="07700 900 123"></div><div class="field full"><label>Emergency contact</label><input class="input" placeholder="Name and number"></div><div class="field full"><label>How did you hear about us?</label><select class="select"><option>Instagram</option><option>A friend who came</option><option>GP or charity referral</option><option>Forces network</option></select></div></div>
    <div class="acts"><a class="btn btn-ghost" data-act="go" data-to="retreat" data-id="${r.id}">Cancel</a><button class="btn btn-primary" data-act="wiz-next">Continue ${ico('arrow-right',14)}</button></div></div>`;
  else if(step===2&&free) panel=`<div class="panel"><h2>Your story</h2><p>Three questions. Short answers are fine. Jamie reads these himself and nothing is shared.</p>
    <div class="form"><div class="field full"><label>Why now?</label><textarea class="textarea" placeholder="What’s going on for you and what do you hope the sea might do?"></textarea></div><div class="field"><label>Water confidence</label><select class="select"><option>Confident swimmer</option><option>Can swim, not confident</option><option>Cannot swim</option></select></div><div class="field"><label>Anything we should know medically?</label><input class="input" placeholder="Optional"></div><div class="field full"><label>Referred by anyone?</label><input class="input" placeholder="GP, charity, unit, or leave blank"></div><label class="check full"><input type="checkbox" checked> I understand a free place is offered on trust and I will let you know if I cannot make it, so someone else can come.</label></div>
    <div class="acts"><button class="btn btn-ghost" data-act="wiz-back">Back</button><button class="btn btn-primary" data-act="wiz-next">Review ${ico('arrow-right',14)}</button></div></div>`;
  else if(step===2&&wait) panel=`<div class="panel"><h2>Confirm waitlist</h2><p>You will be emailed in order the moment a place opens on ${r.dates}.</p><div class="acts"><button class="btn btn-ghost" data-act="wiz-back">Back</button><button class="btn btn-sea" data-act="wiz-finish">Join waitlist ${ico('check',14)}</button></div></div>`;
  else if(step===2) panel=`<div class="panel"><h2>Water &amp; health</h2><p>So the beach team can look after you properly.</p>
    <div class="form"><div class="field"><label>Water confidence</label><select class="select"><option>Confident swimmer</option><option>Can swim, not confident</option><option>Cannot swim</option></select></div><div class="field"><label>Surfed before?</label><select class="select"><option>Never</option><option>Once or twice</option><option>Regularly</option></select></div><div class="field"><label>Wetsuit size</label><select class="select"><option>M</option><option>S</option><option>L</option><option>XL</option></select></div><div class="field"><label>Boot size</label><input class="input" value="UK 9"></div><div class="field full"><label>Medical conditions or medication</label><textarea class="textarea" placeholder="Optional, kept confidential"></textarea></div><div class="field full"><label>Dietary needs</label><input class="input" placeholder="Vegetarian, allergies, etc."></div></div>
    <div class="acts"><button class="btn btn-ghost" data-act="wiz-back">Back</button><button class="btn btn-primary" data-act="wiz-next">To payment ${ico('arrow-right',14)}</button></div></div>`;
  else if(step===3&&free) panel=`<div class="panel"><h2>Review &amp; send</h2><p>Check the details and send your application.</p>
    <dl class="kv mt2"><dt>Retreat</dt><dd>${r.title}</dd><dt>Dates</dt><dd>${r.dates}</dd><dt>Place type</dt><dd>Free place application</dd><dt>Name</dt><dd>${PEOPLE.me.n}</dd><dt>Reply by</dt><dd>Within 2 days · email &amp; WhatsApp</dd></dl>
    <div class="acts"><button class="btn btn-ghost" data-act="wiz-back">Back</button><button class="btn btn-sea" data-act="wiz-finish">Send application ${ico('send',14)}</button></div></div>`;
  else if(step===3) panel=`<div class="panel"><h2>Payment</h2><p>Secure card payment. Apple Pay and Google Pay appear here on a phone.</p>
    <div class="paycard mt2"><div class="field"><label>Card number</label><input class="input" value="4242 4242 4242 4242"></div><div class="row2"><div class="field"><label>Expiry</label><input class="input" value="09 / 28"></div><div class="field"><label>CVC</label><input class="input" value="123"></div></div><div class="field"><label>Name on card</label><input class="input" value="${PEOPLE.me.n}"></div></div>
    <label class="check mt"><input type="checkbox" checked> Round up ${gbp(price)} to ${gbp(price+5)} and put £5 towards a free place</label>
    <div class="acts"><button class="btn btn-ghost" data-act="wiz-back">Back</button><button class="btn btn-coral btn-lg" data-act="wiz-finish">${ico('lock',14)} Pay ${gbp(price)}</button></div></div>`;
  return `${nav('retreats')}<section class="section tight" style="padding-top:34px"><div class="wrap">
    ${step<4?stepHTML:''}
    <div class="wizard">${panel}
      <div class="summary"><span class="k">${free?'Free place application':wait?'Waitlist':'Your booking'}</span><h4>${r.title}</h4>
        <div class="row" style="margin-top:14px"><span>Dates</span><span>${r.dates}</span></div><div class="row"><span>Location</span><span>${r.loc}</span></div><div class="row"><span>Place</span><span>${free?'Funded':wait?'Waitlist':b.opt==='deposit'?'Deposit':'Full price'}</span></div>
        ${price?`<div class="row"><span>Today</span><span>${gbp(price)}</span></div>${b.opt==='deposit'?`<div class="row"><span>Balance ${gbp(r.price-r.deposit)}</span><span>Due 14 days before</span></div>`:''}<div class="row total"><span>Total</span><span>${gbp(price)}</span></div>`:`<div class="row total"><span>Total</span><span>£0</span></div>`}
        <div class="impact-note">${ico('heart',16)}<span>${free?'This place is funded by members and shop customers. When you are able, you can pay it forward the same way.':price?gbp(Math.round(price*.2))+' of this booking goes straight to the free places fund.':'Waitlist places are offered in order, free or paid.'}</span></div>
      </div></div>
  </div></section>${footer()}`;
};

/* ============================================================ LEARN */
SCREENS.learn=()=>{
  const cats=['All',...new Set(COURSES.map(c=>c.cat))];
  const list=COURSES.filter(c=>(S.learnFilter==='All'||c.cat===S.learnFilter)&&(S.learnTier==='All'||c.tier===S.learnTier.toLowerCase()));
  const cont=COURSES.filter(c=>progOf(c)>0&&progOf(c)<100);
  return `${nav('learn')}
  <section class="pagehero"><img class="bg" src="${P('surfG')}" alt=""><div class="scrim"></div><div class="in"><div class="wrap"><span class="kicker light">Learn</span><h1>Cold water, surf and <em>the stuff between</em></h1><p>Safety and preparation are free for everyone, always. The full programmes, breathwork, kayak and climbing are for Crew members, and every membership funds a place.</p>
    <div class="row">${S.member?`<span class="pill pill-gold">${ico('award',11)} Crew member · full access</span>`:`<a class="btn btn-coral" data-act="go" data-to="membership">Unlock everything · £9/mo</a><span style="font-size:.82rem;opacity:.85">${COURSES.filter(c=>c.tier==='free').length} free courses · ${COURSES.filter(c=>c.tier==='member').length} for members</span>`}</div></div></div></section>
  ${cont.length?`<section class="section tight"><div class="wrap"><div class="sec-head row"><div><span class="kicker">Continue</span><h2>Pick up where you <em>left off</em></h2></div></div><div class="grid g3">${cont.map(courseCard).join('')}</div></div></section>`:''}
  <section class="section tight ${cont.length?'sunk':''}"><div class="wrap">
    <div class="toolbar"><div class="chips">${cats.map(x=>`<button class="chip ${S.learnFilter===x?'on':''}" data-act="learn-filter" data-f="${x}">${x}</button>`).join('')}</div><span class="grow"></span><div class="chips">${['All','Free','Member'].map(x=>`<button class="chip ${S.learnTier===x?'on':''}" data-act="learn-tier" data-f="${x}">${x==='Member'?ico('lock',12)+' Members':x==='Free'?ico('unlock',12)+' Free':'Everything'}</button>`).join('')}</div></div>
    <div class="grid g3">${list.map(courseCard).join('')}</div>
  </div></section>
  <section class="section"><div class="wrap"><div class="split">
    <div class="ph wide"><img src="${P('canopy1')}" alt=""><div class="float">${ico('video',26)}<div><b>Live · Ask Jamie anything</b><span>First Thursday monthly · 19:30 · replays in the library</span></div></div></div>
    <div><span class="kicker">Live sessions</span><h2>Once a month, <em>the fire circle</em> goes online</h2><p>Members join a live call with Jamie and the crew. Questions about cold water, kit, fear, funding, whatever is on your mind. Replays land in the library the next morning.</p><a class="btn btn-primary mt2" data-act="go" data-to="course" data-id="c10">Watch September’s replay ${ico('play',14)}</a></div>
  </div></div></section>
  ${footer()}`;
};

/* ============================================================ COURSE PLAYER */
SCREENS.course=id=>{
  const c=byId(COURSES,id); const lead=person(c.lead); const locked=c.tier==='member'&&!S.member; const li=S.lesson[c.id]||0; const done=S.done[c.id]||[]; const L=c.ls[li]; const p=progOf(c);
  const related=COURSES.filter(x=>x.id!==c.id&&x.cat===c.cat).slice(0,2);
  return `${nav('learn')}<section class="section tight" style="padding-top:34px"><div class="wrap">
    <a class="btn btn-sm btn-ghost" data-act="go" data-to="learn">${ico('arrow-left',13)} Library</a>
    <div class="player mt2">
      <div>
        <div class="video"><img src="${c.img}" alt="">
          ${locked?`<div class="lockwall">${ico('lock',40)}<h3>This course is for Crew members</h3><p>£9 a month unlocks the full library, the live monthly call and shop discounts. Every twelve members fund a free retreat place.</p><div style="display:flex;gap:10px;margin-top:18px"><a class="btn btn-coral" data-act="go" data-to="membership">See membership</a><a class="btn btn-light" data-act="go" data-to="course" data-id="c2">Watch a free course first</a></div></div>`:
          `<span class="big">${ico('play',30)}</span><div class="ctl">${ico('pause',18)}<span class="t">${done.includes(li)?L[1]:'0:00'}</span><span class="bar"><i style="width:${done.includes(li)?100:0}%"></i></span><span class="t">${L[1]}</span>${ico('mic',16)}${ico('layout',16)}</div>`}
        </div>
        <div class="about"><span class="kicker">${c.cat} · ${tierPill(c.tier)}</span><h1>${c.title}</h1>
          <div class="by"><img src="${lead.img}" alt=""><span><b>${lead.n}</b> · ${lead.role}</span><span class="grow"></span>${!locked?`<button class="btn btn-sm btn-sea" data-act="lesson-done" data-cid="${c.id}">${ico('check',13)} Mark lesson ${li+1} complete</button>`:''}</div>
          ${!locked?`<div style="display:flex;align-items:center;gap:12px;margin-top:14px;font-size:.78rem;font-weight:600;color:var(--ink-3)"><span>Now playing · Lesson ${li+1}: <b style="color:var(--ink)">${L[0]}</b></span><span class="grow"></span><span>${p}% complete</span></div><div class="prog" style="margin-top:8px"><i style="width:${p}%"></i></div>`:''}
          <div class="tabs">${[['about','About'],['resources','Resources'],['discussion','Discussion']].map(([k,l])=>`<button class="${S.ctab===k?'on':''}" data-act="ctab" data-t="${k}">${l}</button>`).join('')}</div>
          ${S.ctab==='about'?`<p>${c.blurb}</p><p>${c.tier==='free'?'This course is free for everyone, forever. Share it with anyone who is thinking about getting in the sea this winter.':'Recorded on the Jurassic Coast with the Poseidon crew. Members can download lessons for offline viewing on the beach.'}</p>`:
            S.ctab==='resources'?`<div class="grid g2 mt2"><div class="resource">${ico('file-text',20)}<div><b>Lesson notes · PDF</b><span>Key points from every lesson</span></div></div><div class="resource">${ico('clipboard',20)}<div><b>Kit checklist</b><span>Printable, one page</span></div></div><div class="resource">${ico('wind',20)}<div><b>Breathing timer</b><span>4-4-4-4 box breathing audio</span></div></div><div class="resource">${ico('map-pin',20)}<div><b>Our local breaks</b><span>Kimmeridge, Lulworth, Bantham</span></div></div></div>`:
            `<div class="mt2">${S.posts.filter(x=>x.board==='Ask the crew').map(x=>`<div class="post" style="margin-top:10px"><div class="who"><img src="${person(x.who).img}" alt=""><div><b>${person(x.who).n}</b><span>${x.when}</span></div></div><div class="txt">${x.txt}</div></div>`).join('')}<div class="composer mt"><img src="${PEOPLE.me.img}" alt=""><div class="in"><textarea placeholder="Ask a question about this course"></textarea><div class="acts"><span class="grow"></span><button class="btn btn-sm btn-primary" data-act="soon" data-msg="Question posted to the course discussion">Post</button></div></div></div></div>`}
        </div>
      </div>
      <div>
        <div class="lessons"><div class="hd"><b>${c.lessons} lessons · ${c.dur}</b><span>${done.length} of ${c.ls.length} complete</span></div>
          ${c.ls.map(([t,d],i)=>`<div class="lesson ${i===li?'on':''} ${done.includes(i)?'done':''}" ${locked?'data-act="go" data-to="membership"':`data-act="lesson" data-cid="${c.id}" data-i="${i}"`}><span class="n">${done.includes(i)?ico('check',13):i+1}</span><div><b>${t}</b><span>${ico('clock',11)} ${d}</span></div>${locked?`<span class="lk">${ico('lock',14)}</span>`:''}</div>`).join('')}
        </div>
        ${related.length?`<div class="side-card mt"><h4>${ico('layers',16)} More in ${c.cat}</h4>${related.map(x=>`<div class="row-item" data-act="go" data-to="course" data-id="${x.id}" style="cursor:pointer"><div class="ph"><img src="${x.img}" alt=""></div><div><b>${x.title.split(':')[0]}</b><span>${x.dur} · ${x.tier==='free'?'Free':'Members'}</span></div></div>`).join('')}</div>`:''}
        <div class="side-card mt"><h4>${ico('award',16)} Certificate</h4><p class="muted" style="font-size:.8rem;margin-top:8px;line-height:1.5">Finish every lesson and a completion certificate is added to your account. Cold Water Shock is required before any winter dip day.</p></div>
      </div>
    </div></div></section>${footer()}`;
};

/* ============================================================ COMMUNITY */
SCREENS.community=()=>{
  const list=S.posts.filter(p=>S.board==='All posts'||p.board===S.board);
  return `${nav('community')}
  <section class="section tight" style="padding-top:30px"><div class="wrap">
    <div class="pagehead"><div><span class="kicker">Community</span><h2 style="font-family:var(--serif);font-weight:500;font-size:2rem;margin-top:4px">The fire circle, <em style="color:var(--sea)">every day</em></h2></div><span class="grow"></span><span class="pill pill-ok">${ico('users',11)} 214 crew online this week</span></div>
    <div class="community mt">
      <div class="cnav"><div class="lb">Boards</div>${BOARDS.map(([n,i,c])=>`<button class="${S.board===n?'on':''}" data-act="board" data-name="${n}">${ico(i,16)} ${n}${c?`<span class="cnt">${c}</span>`:''}</button>`).join('')}<div class="lb">Your cohorts</div><button data-act="board" data-name="Autumn Reset cohort">${ico('users',16)} Autumn Reset · Oct</button><button data-act="soon">${ico('users',16)} Winter Dip Day · Nov</button></div>
      <div>
        <div class="composer"><img src="${PEOPLE.me.img}" alt=""><div class="in"><textarea id="composer" placeholder="${S.board==='Dip of the Day'?'Where did you get in today?':'Share a reflection, ask the crew, or say hello'}"></textarea><div class="acts"><div class="tools"><button title="Photo">${ico('camera',16)}</button><button title="Tide">${ico('wave',16)}</button><button title="Location">${ico('map-pin',16)}</button></div><span class="grow"></span><span class="muted" style="font-size:.72rem;font-weight:600">Posting to ${S.board==='All posts'?'Reflections':S.board}</span><button class="btn btn-sm btn-primary" data-act="post-submit">${ico('send',13)} Post</button></div></div></div>
        ${list.map(p=>`<div class="post"><div class="who"><img src="${person(p.who).img}" alt=""><div><b>${person(p.who).n}${p.who==='jamie'?' <span class="pill pill-sea" style="margin-left:6px">Founder</span>':''}</b><span>${p.when} · ${person(p.who).role}</span></div><span class="pill pill-soft">${p.board}</span></div>
          <div class="txt">${p.txt}</div>${p.img?`<div class="ph"><img src="${p.img}" alt=""></div>`:''}
          <div class="acts"><button class="${p.liked?'on':''}" data-act="like" data-id="${p.id}">${ico('heart',14)} ${p.likes}</button><button data-act="reply-focus">${ico('message',14)} ${p.replies.length} replies</button><button data-act="soon" data-msg="Link copied">${ico('share',14)} Share</button></div>
          ${p.replies.length?`<div class="replies">${p.replies.map(([w,t])=>`<div class="reply"><img src="${person(w).img}" alt=""><div><b>${person(w).n}</b> ${t}</div></div>`).join('')}</div>`:''}</div>`).join('')}
        ${!list.length?`<div class="empty">${ico('messages',44)}<h3>Nothing here yet</h3><p>Be the first to post in ${S.board}.</p></div>`:''}
      </div>
      <div>
        <div class="side-card"><h4>${ico('sunrise',16)} Your dip streak</h4><div class="dip"><div class="ring"><i>17</i></div><div><b>17 days in the sea this month</b><span>Log today’s dip from the Dip of the Day board. 3 more for the October badge.</span></div></div></div>
        <div class="side-card"><h4>${ico('wave',16)} Kimmeridge today</h4><div class="tide"><div class="r">${ico('sunrise',14)} High tide <b>06:52 · 1.9m</b></div><div class="r">${ico('moon',14)} Low tide <b>13:10 · 0.4m</b></div><div class="r">${ico('thermometer',14)} Sea temp <b>15°C</b></div><div class="r">${ico('wind',14)} Wind <b>SW 9 kt</b></div><div class="r">${ico('activity',14)} Swell <b>1.2m · 9s</b></div></div></div>
        <div class="side-card"><h4>${ico('calendar',16)} Coming up</h4><div class="mt">${[['19','Sep','Dawn Dip · Kimmeridge','07:00 · 6 spots'],['03','Oct','Autumn Reset weekend','3 places · 4 free'],['08','Oct','Live · Ask Jamie anything','19:30 · members'],['14','Nov','Winter Dip Day · Lulworth','11 places']].map(([d,m,t,s])=>`<div class="event-row"><div class="d"><b>${d}</b><span>${m}</span></div><div class="t"><b>${t}</b><span>${s}</span></div></div>`).join('')}</div></div>
        <div class="side-card"><h4>${ico('users',16)} Crew to say hello to</h4><div class="mt">${['kate','hannah','josh'].map(k=>`<div class="member-row"><img src="${person(k).img}" alt=""><div><b>${person(k).n}</b><span>${person(k).role}</span></div><button class="btn btn-sm btn-ghost" data-act="soon" data-msg="Following ${person(k).n.split(' ')[0]}">Follow</button></div>`).join('')}</div></div>
      </div>
    </div></div></section>${footer()}`;
};

/* ============================================================ SHOP */
SCREENS.shop=()=>{
  const cats=['All','Merch','Equipment','Bundles','Give'];
  const list=PRODUCTS.filter(p=>S.shopFilter==='All'||p.cat===S.shopFilter);
  return `${nav('shop')}
  <section class="pagehero" style="min-height:320px"><img class="bg" src="${P('surfE')}" alt=""><div class="scrim"></div><div class="in"><div class="wrap"><span class="kicker light">Shop</span><h1>Wear the wave, <em>fund a place</em></h1><p>Every product tells you exactly what it pays for. Members get ten percent off. Free UK delivery over £60.</p></div></div></section>
  <section class="section tight"><div class="wrap">
    <div class="toolbar"><div class="chips">${cats.map(x=>`<button class="chip ${S.shopFilter===x?'on':''}" data-act="shop-filter" data-f="${x}">${x}</button>`).join('')}</div><span class="grow"></span>${S.member?`<span class="pill pill-gold">${ico('award',11)} Crew discount applied at checkout</span>`:`<span class="muted" style="font-size:.8rem;font-weight:600">Members save 10% · <a data-act="go" data-to="membership" style="color:var(--sea);font-weight:700">join</a></span>`}</div>
    <div class="shopgrid">${list.map(productCard).join('')}</div>
  </div></section>
  <section class="section deep"><div class="wrap"><div class="impact"><div class="i"><div class="v">£<em>4,120</em></div><div class="k">Raised through the shop this year</div></div><div class="i"><div class="v">17</div><div class="k">Free places funded by hoodies alone</div></div><div class="i"><div class="v">2–3</div><div class="k">Working days to dispatch from Dorset</div></div><div class="i"><div class="v">100%</div><div class="k">Of “Sponsor a place” goes to a place</div></div></div></div></section>
  ${footer()}`;
};

/* ============================================================ CART + CHECKOUT */
SCREENS.cart=()=>{
  const ck=S.checkout; const sub=cartTotal(); const disc=S.member?Math.round(sub*.1):0; const ship=sub-disc>=60||sub===0?0:3.95; const tot=sub-disc+ship;
  if(ck&&ck.step===2) return `${nav('shop')}<section class="section"><div class="wrap-n"><div class="card"><div class="confirm"><div class="ring">${ico('check',40)}</div><h2>Order ${ck.id} confirmed</h2><p>Thank you. Your order is being packed in Dorset and will be with you in two to three working days. ${gbp(Math.round(ck.tot*.35))} of this order goes straight to free places.</p><div class="acts"><a class="btn btn-primary" data-act="go" data-to="account">Track in my account</a><a class="btn btn-ghost" data-act="go" data-to="shop">Keep shopping</a></div></div></div></div></section>${footer()}`;
  if(!S.cart.length) return `${nav('shop')}<section class="section"><div class="wrap-n"><div class="card"><div class="empty">${ico('bag',48)}<h3>Your bag is empty</h3><p>Every item funds a place in the sea for someone who needs it.</p><a class="btn btn-primary mt2" data-act="go" data-to="shop">Browse the shop</a></div></div></div></section>${footer()}`;
  const lines=S.cart.map(c=>({...c,p:byId(PRODUCTS,c.id)}));
  return `${nav('shop')}<section class="section tight" style="padding-top:34px"><div class="wrap">
    <div class="pagehead"><div><span class="kicker">${ck?'Checkout':'Your bag'}</span><h2 style="font-family:var(--serif);font-weight:500;font-size:2rem;margin-top:4px">${ck?'Delivery & payment':cartCount()+' items'}</h2></div></div>
    <div class="cartpage mt">
      <div class="card pad">
        ${ck?`<div class="form" style="display:grid;grid-template-columns:1fr 1fr;gap:16px"><div class="field"><label>Full name</label><input class="input" value="${PEOPLE.me.n}"></div><div class="field"><label>Email</label><input class="input" value="tom.whitfield@example.com"></div><div class="field" style="grid-column:1/-1"><label>Address</label><input class="input" value="14 Harbour Row, Swanage"></div><div class="field"><label>Postcode</label><input class="input" value="BH19 2AB"></div><div class="field"><label>Delivery</label><select class="select"><option>Royal Mail 48 · ${ship?gbp2(ship):'Free'}</option><option>Collect at next retreat · Free</option></select></div></div>
          <div class="divider"></div><h3 style="font-size:.95rem;font-weight:700;margin-bottom:12px">Payment</h3><div class="paycard"><div class="field"><label>Card number</label><input class="input" value="4242 4242 4242 4242"></div><div class="row2"><div class="field"><label>Expiry</label><input class="input" value="09 / 28"></div><div class="field"><label>CVC</label><input class="input" value="123"></div></div></div>
          <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px"><button class="btn btn-ghost" data-act="go" data-to="cart">Back to bag</button><button class="btn btn-coral btn-lg" data-act="checkout-pay">${ico('lock',14)} Pay ${gbp2(tot)}</button></div>`:
        lines.map(l=>`<div class="cartline"><div class="ph">${merchSVG(l.p.type,l.p.col)}</div><div><b>${l.p.name}</b><span>${l.p.funds}</span><span style="color:var(--ink-2)">${gbp(l.p.price)} each</span></div><div class="qty"><button data-act="cart-dec" data-id="${l.id}">${ico('minus',13)}</button><b>${l.q}</b><button data-act="cart-inc" data-id="${l.id}">${ico('plus',13)}</button></div><div class="pr">${gbp(l.p.price*l.q)}</div><button class="btn-icon" data-act="cart-remove" data-id="${l.id}" title="Remove">${ico('trash',15)}</button></div>`).join('')}
      </div>
      <div class="summary"><span class="k">Order summary</span><h4>${cartCount()} items</h4>
        <div class="row" style="margin-top:14px"><span>Subtotal</span><span>${gbp2(sub)}</span></div>${disc?`<div class="row"><span>Crew member 10%</span><span>−${gbp2(disc)}</span></div>`:''}<div class="row"><span>Delivery</span><span>${ship?gbp2(ship):'Free'}</span></div><div class="row total"><span>Total</span><span>${gbp2(tot)}</span></div>
        <div class="impact-note">${ico('heart',16)}<span>This order puts about ${gbp(Math.round(tot*.35))} into the free places fund. ${lines.some(l=>l.p.cat==='Give')?'Sponsored places go 100% to a place.':''}</span></div>
        ${!ck?`<button class="btn btn-block btn-coral btn-lg" style="margin-top:18px" data-act="checkout-start">Checkout ${ico('arrow-right',14)}</button><a class="btn btn-block btn-light" style="margin-top:8px" data-act="go" data-to="shop">Keep shopping</a>`:''}
      </div>
    </div></div></section>${footer()}`;
};

/* ============================================================ MEMBERSHIP */
SCREENS.membership=()=>`${nav('membership')}
  <section class="pagehero" style="min-height:340px"><img class="bg" src="${P('grp4')}" alt=""><div class="scrim"></div><div class="in"><div class="wrap"><span class="kicker light">Membership</span><h1>Join the crew. <em>Fund a place.</em></h1><p>Membership pays for the free places. Every twelve Crew members fund one full retreat for someone who could not otherwise come.</p></div></div></section>
  <section class="section"><div class="wrap"><div class="plans">
    <div class="plan"><span class="k">Free</span><h3>Open water</h3><div class="pr"><b>£0</b></div><p>For anyone. Safety first, always free.</p><ul><li>${ico('check',16)} Cold water shock, tides and retreat prep courses</li><li>${ico('check',16)} Book retreats, sessions and free places</li><li>${ico('check',16)} Read the community boards</li><li>${ico('check',16)} Shop access</li></ul><button class="btn btn-ghost btn-block" data-act="join-plan" data-plan="free">${S.signedIn&&!S.member?'Your current plan':'Create free account'}</button></div>
    <div class="plan hi"><span class="pill pill-coral tag">Most popular</span><span class="k">Crew</span><h3>Monthly</h3><div class="pr"><b>£9</b><span>/ month</span></div><p>Cancel any time. Funds a place every twelve members.</p><ul><li>${ico('check',16)} Everything in Free</li><li>${ico('check',16)} Full library: surf, breathwork, kayak, climbing</li><li>${ico('check',16)} Live monthly call with Jamie + replays</li><li>${ico('check',16)} Post in the community, join cohorts</li><li>${ico('check',16)} 10% off the shop</li><li>${ico('check',16)} 48-hour priority booking on new dates</li></ul><button class="btn btn-coral btn-block" data-act="join-plan" data-plan="monthly">${S.plan==='Crew · Monthly'?'Your current plan':'Join for £9 a month'}</button></div>
    <div class="plan"><span class="k">Crew</span><h3>Annual</h3><div class="pr"><b>£79</b><span>/ year</span></div><p>Two months free. Funds a place outright over the year.</p><ul><li>${ico('check',16)} Everything in Crew Monthly</li><li>${ico('check',16)} Poseidon Wave Tee on joining</li><li>${ico('check',16)} Name on the funders’ board at the fire</li><li>${ico('check',16)} One guest pass to a Dip Day</li></ul><button class="btn btn-primary btn-block" data-act="join-plan" data-plan="annual">${S.plan==='Crew · Annual'?'Your current plan':'Join for £79 a year'}</button></div>
  </div>
  <div class="grid g3 mt3">${[['heart','Where the money goes','Around 70% of membership income goes to free places and water safety cover. The rest keeps the lights on and the wetsuits washed.'],['shield-check','Cancel any time','No contract. Your library access runs to the end of the month you cancel in.'],['gift','Gift a membership','Buy a year for someone who needs the sea. They get the tee, you get the good feeling.']].map(([i,t,s])=>`<div class="card pad"><div style="color:var(--sea)">${ico(i,24)}</div><b style="display:block;margin-top:12px">${t}</b><p class="muted" style="font-size:.84rem;line-height:1.55;margin-top:6px">${s}</p></div>`).join('')}</div>
  </div></section>${footer()}`;

/* ============================================================ ACCOUNT */
SCREENS.account=()=>{
  if(!S.signedIn) return `${nav('account')}<section class="section"><div class="wrap-n"><div class="card"><div class="empty">${ico('user',48)}<h3>Sign in to see your account</h3><p>Bookings, courses, orders and membership in one place.</p><button class="btn btn-primary mt2" data-act="signin">Sign in as ${PEOPLE.me.n}</button></div></div></div></section>${footer()}`;
  const t=S.acctTab; const me=PEOPLE.me;
  const bookingRow=b=>{ if(b.session){ const s=byId(SESSIONS,b.session); return `<div class="row-item"><div class="ph"><img src="${s.img}" alt=""></div><div><b>${s.title}</b><span>${s.when} · ${s.loc}</span></div><div class="r"><span class="pill pill-ok">${b.type}</span><span>${b.ref}</span></div></div>`; } const r=byId(RETREATS,b.retreat); return `<div class="row-item" data-act="go" data-to="retreat" data-id="${r.id}" style="cursor:pointer"><div class="ph"><img src="${r.img}" alt=""></div><div><b>${r.title}</b><span>${r.dates} · ${r.loc}</span></div><div class="r"><span class="pill ${b.type.includes('review')?'pill-warn':b.type.includes('Waitlist')?'pill-coral':'pill-ok'}">${b.type}</span><span>${b.ref} · ${b.when}</span></div></div>`; };
  let body='';
  if(t==='overview') body=`<div class="grid g4"><div class="stat"><div class="k">Bookings</div><div class="v">${S.myBookings.length}</div><div class="d sea">${ico('calendar',12)} next: ${byId(RETREATS,'r3').dates.split(' ').slice(0,3).join(' ')}</div></div><div class="stat"><div class="k">Courses started</div><div class="v">${Object.keys(S.done).length}</div><div class="d up">${ico('check-circle',12)} 1 completed</div></div><div class="stat"><div class="k">Dip streak</div><div class="v">17</div><div class="d coral">${ico('sunrise',12)} days this month</div></div><div class="stat"><div class="k">You’ve funded</div><div class="v">${S.member?'0.4':'0.1'}</div><div class="d sea">${ico('heart',12)} of a free place</div></div></div>
    <div class="grid g2 mt2"><div class="card"><div class="hd"><h3>Upcoming</h3></div><div class="bd" style="padding-top:6px">${S.myBookings.slice(0,3).map(bookingRow).join('')}</div></div><div class="card"><div class="hd"><h3>Continue learning</h3></div><div class="bd" style="padding-top:6px">${COURSES.filter(c=>progOf(c)>0&&progOf(c)<100).map(c=>`<div class="row-item" data-act="go" data-to="course" data-id="${c.id}" style="cursor:pointer"><div class="ph"><img src="${c.img}" alt=""></div><div><b>${c.title.split(':')[0]}</b><span>${progOf(c)}% · ${c.dur}</span><div class="prog" style="width:160px;margin-top:6px"><i style="width:${progOf(c)}%"></i></div></div></div>`).join('')}</div></div></div>`;
  else if(t==='bookings') body=`<div class="card"><div class="hd"><h3>All bookings</h3><span class="grow"></span><a class="btn btn-sm btn-primary" data-act="go" data-to="retreats">Book another</a></div><div class="bd" style="padding-top:6px">${S.myBookings.map(bookingRow).join('')}</div></div>`;
  else if(t==='courses') body=`<div class="grid g3">${COURSES.filter(c=>progOf(c)>0).map(courseCard).join('')}</div><div class="card pad mt2" style="display:flex;gap:14px;align-items:center"><div style="color:var(--sea)">${ico('award',28)}</div><div><b>Certificate · Welcome to Operation Poseidon</b><div class="muted" style="font-size:.8rem">Completed 4 Sep 2026</div></div><span class="grow"></span><button class="btn btn-sm btn-ghost" data-act="soon" data-msg="Certificate PDF downloaded">${ico('download',13)} PDF</button></div>`;
  else if(t==='orders') body=`<div class="card"><div class="hd"><h3>Orders</h3></div>${S.myOrders.length?`<div class="tblwrap"><table class="tbl"><thead><tr><th>Order</th><th>Items</th><th>Total</th><th>Status</th><th>Placed</th></tr></thead><tbody>${S.myOrders.map(o=>`<tr><td><b>${o.id}</b></td><td>${o.items}</td><td class="num">${gbp2(o.tot)}</td><td><span class="pill pill-warn">${o.status}</span></td><td>${o.when}</td></tr>`).join('')}</tbody></table></div>`:`<div class="empty">${ico('bag',40)}<h3>No orders yet</h3><p>Every item in the shop funds a place.</p></div>`}</div>`;
  else body=`<div class="card pad"><div style="display:flex;gap:16px;align-items:center"><div style="color:var(--sea)">${ico('award',32)}</div><div><b style="font-size:1.05rem">${S.member?S.plan:'Free · Open water'}</b><div class="muted" style="font-size:.82rem;margin-top:3px">${S.member?'Renews 15 Oct 2026 · £9 · Visa ending 4242':'Upgrade to unlock the full library and fund a place'}</div></div><span class="grow"></span>${S.member?`<button class="btn btn-ghost" data-act="soon" data-msg="Membership paused until next month">Pause</button><button class="btn btn-ghost" data-act="join-plan" data-plan="free">Cancel</button>`:`<a class="btn btn-coral" data-act="go" data-to="membership">See plans</a>`}</div>
    ${S.member?`<div class="divider"></div><div class="grid g3"><div class="stat"><div class="k">Member since</div><div class="v" style="font-size:1.3rem">Today</div></div><div class="stat"><div class="k">Shop savings</div><div class="v" style="font-size:1.3rem">£0</div></div><div class="stat"><div class="k">Your share of places funded</div><div class="v" style="font-size:1.3rem">1/12</div></div></div>`:''}</div>`;
  return `${nav('account')}<section class="section tight" style="padding-top:34px"><div class="wrap"><div class="acct">
    <div><div class="who"><img src="${me.img}" alt=""><b>${me.n}</b><span>${me.role}</span><br><span class="pill ${S.member?'pill-gold':'pill-soft'}">${S.member?ico('award',11)+' '+S.plan:'Free account'}</span></div>
      <div class="menu">${[['overview','home','Overview'],['bookings','calendar','My bookings'],['courses','play','My courses'],['orders','bag','Orders'],['membership','award','Membership']].map(([k,i,l])=>`<button class="${t===k?'on':''}" data-act="acct-tab" data-t="${k}">${ico(i,16)} ${l}</button>`).join('')}<button data-act="signout">${ico('log-out',16)} Sign out</button></div></div>
    <div>${body}</div>
  </div></div></section>${footer()}`;
};

/* ============================================================ ABOUT / MISSION */
SCREENS.about=()=>`${nav('about')}
  <section class="pagehero" style="min-height:440px"><img class="bg" src="${P('surf5')}" alt=""><div class="scrim"></div><div class="in"><div class="wrap"><span class="kicker light">Our mission</span><h1>Press life’s <em>reset button</em></h1><p>Operation Poseidon was started by a Royal Marine who found, after eleven years of service, that the sea did what nothing else could. We take people into cold water, teach them to surf, and give them a fire to sit round afterwards.</p></div></div></section>
  <section class="section"><div class="wrap"><div class="split">
    <div class="ph"><img src="${PEOPLE.jamie.img}" alt=""><div class="float">${ico('anchor',26)}<div><b>Jamie Doxey · Founder</b><span>11 years Royal Marines · forestry · surf, scuba, kayak &amp; climbing instructor</span></div></div></div>
    <div><span class="kicker">Why the sea</span><h2>Blue space therapy, <em>without the waiting list</em></h2><p>Cold water resets the nervous system. Surfing demands total attention, which is the closest thing to silence most of us get. And the walk back up the cliff with someone who has been through something similar does the rest.</p><p>We are not a clinic. We are a crew. Everything we run is led by qualified instructors with lifeguard cover, and everything we say in the circle stays in the circle.</p></div>
  </div></div></section>
  <section class="section deep"><div class="wrap"><div class="sec-head"><span class="kicker light">How it is funded</span><h2>Three engines, <em>one purpose</em></h2></div>
    <div class="grid g3">${[['trees','Forestry','Jamie’s forestry and woodland management business has paid for every free place since 2023. It still does.'],['award','Crew membership','Members fund the library and the live calls. Every twelve members fund one full retreat place.'],['bag','The shop','Tees, hoodies, robes and kit. Roughly a third of every order goes straight to free places, and “Sponsor a place” goes 100%.']].map(([i,t,s])=>`<div class="card pad" style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.12);color:#fff"><div style="color:var(--sea-3)">${ico(i,26)}</div><b style="display:block;margin-top:14px;font-size:1.05rem">${t}</b><p style="font-size:.86rem;line-height:1.6;margin-top:8px;color:rgba(255,255,255,.75)">${s}</p></div>`).join('')}</div>
    <div class="impact mt3"><div class="i"><div class="v">312</div><div class="k">People taken into the water</div></div><div class="i"><div class="v">86</div><div class="k">Free places funded</div></div><div class="i"><div class="v">41</div><div class="k">Serving and ex-serving personnel</div></div><div class="i"><div class="v">0</div><div class="k">People turned away for money</div></div></div>
  </div></section>
  <section class="section"><div class="wrap"><div class="sec-head"><span class="kicker">The crew</span><h2>Who you’ll <em>meet on the beach</em></h2></div>
    <div class="grid g3">${['jamie','hannah','kate'].map(k=>`<div class="card pad" style="display:flex;gap:16px;align-items:center"><img src="${person(k).img}" style="width:72px;height:72px;border-radius:50%;object-fit:cover" alt=""><div><b>${person(k).n}</b><div class="muted" style="font-size:.8rem;margin-top:3px">${person(k).role}</div></div></div>`).join('')}</div>
    <div class="grid g2 mt3"><div class="card pad"><b>Safeguarding &amp; water safety</b><p class="muted" style="font-size:.86rem;line-height:1.6;margin-top:8px">All sessions have qualified lifeguard cover. Instructors are DBS checked. We follow RNLI cold water guidance and no one enters the water without the cold water shock briefing.</p></div><div class="card pad"><b>Refer someone</b><p class="muted" style="font-size:.86rem;line-height:1.6;margin-top:8px">GPs, charities, units and families can refer someone directly for a funded place. Pick a date, choose “Apply for a free place” and tell us you are referring.</p><a class="btn btn-sm btn-primary mt" data-act="go" data-to="retreats">Refer someone</a></div></div>
  </div></section>${footer()}`;

/* ============================================================ SEA TO SUMMIT CLUB · coming soon */
SCREENS.club=()=>`${nav('club',true)}
  <section class="club-hero"><img class="bg" src="${P('cliff2')}" alt=""><div class="scrim"></div><div class="in"><div class="wrap">
    <span class="soon"><i></i> Coming soon · the next chapter</span>
    <h1>Sea to <em>Summit</em> Club</h1>
    <p>Operation Poseidon is the first of three. Water, land and air, one not-for-profit club, one purpose: corporate clients and team-building events pay, so therapy is free for the people who cannot pay for it themselves.</p>
    <div class="cta"><a class="btn btn-lg btn-coral" href="#interest">${ico('briefcase',16)} Bring your team</a><a class="btn btn-lg btn-light" href="#interest">${ico('bell',16)} Join the waitlist</a></div>
    <div class="three"><span>${ico('wave',16)} Operation Poseidon · water</span><span>${ico('mountain',16)} Operation Thor · land</span><span>${ico('wind',16)} Operation Pegasus · air</span></div>
  </div></div></section>

  <section class="section"><div class="wrap">
    <div class="sec-head center"><span class="kicker">Three operations</span><h2>The sky isn’t <em>even the limit</em></h2><p>Every operation runs the same way: paid programmes for companies and groups, free therapy places for individuals, the same qualified instructors and the same fire at the end of the day.</p></div>
    <div class="grid g3">
      <div class="opcard" data-act="go" data-to="home"><img src="${P('surf4')}" alt=""><div class="sc"></div><span class="pill pill-ok st">${ico('check-circle',10)} Live now</span><div class="in"><div class="sym">${ico('wave',26)}</div><span class="k">Water</span><h3>Operation <em>Poseidon</em></h3><p>Blue space therapy and water-based activities. Surf therapy retreats, cold water dips, sea kayaking, scuba and coasteering on the Jurassic Coast.</p><ul><li>Surf therapy</li><li>Cold water</li><li>Kayak</li><li>Scuba</li><li>Coasteering</li></ul></div></div>
      <div class="opcard thor"><img src="${P('climb1')}" alt=""><div class="sc"></div><span class="pill pill-dark st">${ico('clock',10)} Coming 2027</span><div class="in"><div class="sym">${ico('mountain',26)}</div><span class="k">Land</span><h3>Operation <em>Thor</em></h3><p>Land-based activities. Rock climbing on Portland, mountain days led by a qualified summer mountain leader, woodland skills, bushcraft and expedition training.</p><ul><li>Climbing</li><li>Mountain days</li><li>Bushcraft</li><li>Expeditions</li><li>Navigation</li></ul></div></div>
      <div class="opcard pegasus"><img src="${P('cliff1')}" alt=""><div class="sc"></div><span class="pill pill-dark st">${ico('clock',10)} Coming 2027</span><div class="in"><div class="sym">${ico('wind',26)}</div><span class="k">Air</span><h3>Operation <em>Pegasus</em></h3><p>Air-based activities. Paragliding taster days, high ropes and abseils, and the kind of heights that put everything else in perspective.</p><ul><li>Paragliding</li><li>High ropes</li><li>Abseil</li><li>Zip lines</li><li>Skydive days</li></ul></div></div>
    </div>
  </div></section>

  <section class="section deep"><div class="wrap">
    <div class="sec-head center"><span class="kicker light">How the club is funded</span><h2>Companies pay. <em>Therapy is free.</em></h2><p>A not-for-profit with a commercial engine. Corporate away days and team-building events are priced properly, and every one of them funds free places across all three operations.</p></div>
    <div class="flow">
      <div class="f"><div class="sym">${ico('briefcase',24)}</div><b>Corporate clients</b><span>Away days, leadership programmes and team-building events on the water, on the land and in the air.</span></div>
      <span class="arrow">${ico('arrow-right',28)}</span>
      <div class="f"><div class="sym">${ico('heart',24)}</div><b>The free places fund</b><span>A fixed share of every corporate booking, plus memberships and the shop, goes into one transparent pot.</span></div>
      <span class="arrow">${ico('arrow-right',28)}</span>
      <div class="f"><div class="sym">${ico('users',24)}</div><b>Therapy for those who can’t pay</b><span>Veterans, referrals from GPs and charities, and anyone who applies. Nobody on the beach knows who paid.</span></div>
    </div>
    <div class="impact mt3"><div class="i"><div class="v">1</div><div class="k">Corporate away day (12 people)</div></div><div class="i"><div class="v">=</div><div class="k">Funds</div></div><div class="i"><div class="v">4</div><div class="k">Free retreat places</div></div><div class="i"><div class="v">3</div><div class="k">Operations, one booking platform, one crew</div></div></div>
  </div></section>

  <section class="section sunk"><div class="wrap">
    <div class="sec-head"><span class="kicker">For companies</span><h2>Team building that <em>actually builds something</em></h2></div>
    <div class="grid g3">${[['wave','Sea day','Surf, kayak or coasteering with the Poseidon crew. Cold water, warm food, honest debrief round the fire.','From £1,800 · up to 12'],['mountain','Summit day','Climbing on Portland or a mountain day with navigation and leadership tasks. Led by a summer mountain leader.','From £1,600 · up to 12'],['wind','Sky day','High ropes, abseils and a paragliding taster. For teams that need to trust each other.','From £2,200 · up to 10']].map(([i,t,s,p])=>`<div class="card pad"><div style="width:48px;height:48px;border-radius:14px;background:var(--sea-tint);color:var(--sea);display:grid;place-items:center">${ico(i,22)}</div><b style="display:block;margin-top:14px;font-family:var(--serif);font-size:1.4rem;font-weight:500">${t}</b><p class="muted" style="font-size:.86rem;line-height:1.55;margin-top:6px">${s}</p><div class="mt" style="display:flex;align-items:center;gap:10px"><span class="pill pill-navy">${p}</span><span class="grow"></span><span class="pill pill-ok">${ico('heart',10)} funds 4 places</span></div></div>`).join('')}</div>
  </div></section>

  <section class="section" id="interest"><div class="wrap">
    <div class="sec-head"><span class="kicker">Register interest</span><h2>Be first <em>when it opens</em></h2></div>
    <div class="interest">
      <div class="card"><h3>${ico('briefcase',22)}Bring your team</h3><p>Tell us roughly what you have in mind and we will come back with dates and a price. Sea days run now, land and air open in 2027.</p>
        <div class="form"><div class="field"><label>Company</label><input class="input" placeholder="Company name"></div><div class="field"><label>Your name</label><input class="input" placeholder="Name"></div><div class="field"><label>Email</label><input class="input" placeholder="you@company.com"></div><div class="field"><label>Team size</label><select class="select"><option>Up to 8</option><option>8 – 12</option><option>12 – 24</option><option>24+</option></select></div><div class="field full"><label>What are you after?</label><div class="chips">${['Sea day','Summit day','Sky day','Leadership programme','Not sure yet'].map((x,i)=>`<span class="chip ${i===0?'on':''}">${x}</span>`).join('')}</div></div></div>
        <button class="btn btn-coral btn-block btn-lg mt2" data-act="soon" data-msg="Thanks · Jamie will be in touch with dates and a price">${ico('send',15)} Send enquiry</button></div>
      <div class="card"><h3>${ico('bell',22)}Join the waitlist</h3><p>For individuals. You will hear first when Thor and Pegasus open, and you can apply for a free place on any of them the same way you do for Poseidon today.</p>
        <div class="form"><div class="field full"><label>Email</label><input class="input" placeholder="you@example.com"></div><div class="field full"><label>I’m interested in</label><div class="chips">${['Water','Land','Air','All three'].map((x,i)=>`<span class="chip ${i===3?'on':''}">${x}</span>`).join('')}</div></div><label class="check full"><input type="checkbox"> I may want to apply for a free place</label></div>
        <button class="btn btn-sea btn-block btn-lg mt2" data-act="soon" data-msg="You’re on the list · we’ll email when Thor and Pegasus open">${ico('check',15)} Join the waitlist</button>
        <div class="mt2" style="display:flex;gap:10px;align-items:center;font-size:.8rem;color:var(--ink-3);font-weight:600">${ico('info',15)} Already want the water? <a data-act="go" data-to="retreats" style="color:var(--sea);font-weight:700">Poseidon is open now.</a></div></div>
    </div>
  </div></section>
  ${footer()}`;
