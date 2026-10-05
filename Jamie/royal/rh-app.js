/* ROYAL · app core */
const $=s=>document.querySelector(s);
const byId=(a,id)=>a.find(x=>x.id===id);
const S0=()=>({route:'home',param:null,admin:false,adminPage:'today',pres:true,
  wiz:{step:1,item:'mow',day:2,time:1,oap:true,recur:false,pay:'day',size:'Medium (100–200 m²)'},
  bookings:JSON.parse(JSON.stringify(BOOKINGS)),quotes:JSON.parse(JSON.stringify(QUOTES)),pq:{state:'form'},drawer:null,acct:'jobs'});
let S=S0();
function go(route,param){ S.admin=false; S.route=route; S.param=param||null; if(route==='book'&&param){ S.wiz.item=param; S.wiz.step=2; } if(route==='book'&&!param) S.wiz.step=1; if(route==='quote') S.pq={state:'form',item:param||'extpaint'}; render(); }
function openAdmin(p){ S.admin=true; S.adminPage=p||S.adminPage; render(); }
function render(keep){ const y=window.scrollY; document.body.classList.toggle('admin',S.admin); document.body.classList.toggle('pres',S.pres); $('#presenter').classList.toggle('on',S.pres);
  const app=$('#app'); if(S.admin){ app.innerHTML=ADMIN.shell(); } else { app.innerHTML=(SCREENS[S.route]||SCREENS.home)(S.param); }
  if(keep) window.scrollTo(0,y); else window.scrollTo(0,0); syncJump(); }
let toastT; function toast(msg,icon='check-circle'){ const t=$('#toast'); t.innerHTML=ico(icon,18)+'<span>'+msg+'</span>'; t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('show'),2600); }
const JUMPS=[['Public site',[['home','Home'],['services','Price list'],['book','Book a slot · wizard'],['quote','Photo quote'],['myjobs','My jobs · tracker'],['reviews','Reviews & areas'],['about','About']]],
  ['Back office (admin)',[['adm:today','Today'],['adm:calendar','Week calendar'],['adm:bookings','Bookings'],['adm:quotes','Photo quotes'],['adm:customers','Customers'],['adm:plans','Care plans'],['adm:invoices','Invoices'],['adm:reviews','Reviews'],['adm:settings','Settings']]]];
function initPresenter(){ const sel=$('#jump'); sel.innerHTML=JUMPS.map(([g,items])=>`<optgroup label="${g}">${items.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</optgroup>`).join('');
  sel.onchange=()=>{ const v=sel.value; if(v.startsWith('adm:')) openAdmin(v.slice(4)); else { const [r,p]=v.split(':'); go(r,p); } };
  $('#p-reset').onclick=()=>{ S=S0(); render(); toast('Demo reset','refresh'); };
  $('#p-admin').onclick=()=>{ S.admin?go('home'):openAdmin('today'); };
  document.addEventListener('keydown',e=>{ if(e.key.toLowerCase()==='p'&&!/input|textarea|select/i.test(e.target.tagName)){ S.pres=!S.pres; document.body.classList.toggle('pres',S.pres); $('#presenter').classList.toggle('on',S.pres);} }); }
function syncJump(){ const sel=$('#jump'); const v=S.admin?'adm:'+S.adminPage:S.route; if([...sel.options].some(o=>o.value===v)) sel.value=v; $('#p-admin').textContent=S.admin?'Back to public site':'Open back office (admin)'; }
document.addEventListener('click',e=>{ const el=e.target.closest('[data-act]'); if(!el) return; const A=ACTIONS[el.dataset.act]; if(A){ e.preventDefault(); A(el.dataset,el,e); } });
const priceOf=(item,oap,size)=>{ let p=item.price; if(item.id==='mow'&&size&&size.startsWith('Large')) p=45; if(item.id==='fence') p=item.price*2; return oap&&!item.plan?Math.round(p*.85):p; };
const ACTIONS={
  go:d=>go(d.to,d.id), admin:d=>openAdmin(d.p), 'adm-page':d=>{ S.adminPage=d.p; render(); },
  'book-item':d=>{ S.wiz.item=d.id; S.wiz.step=2; go('book','_'); S.wiz.step=2; render(); },
  'wiz-next':()=>{ S.wiz.step++; render(); }, 'wiz-back':()=>{ S.wiz.step--; render(); },
  'wiz-day':d=>{ S.wiz.day=+d.i; render(true); }, 'wiz-time':d=>{ S.wiz.time=+d.i; render(true); },
  'wiz-oap':()=>{ S.wiz.oap=!S.wiz.oap; render(true); }, 'wiz-recur':()=>{ S.wiz.recur=!S.wiz.recur; render(true); }, 'wiz-pay':d=>{ S.wiz.pay=d.m; render(true); },
  'wiz-size':d=>{ S.wiz.size=d.v; render(true); },
  'wiz-finish':()=>{ const it=byId(ALL_ITEMS,S.wiz.item); const day=DAYS[S.wiz.day]; const id='RB-'+(1182+S.bookings.filter(b=>b.mine).length); const price=priceOf(it,S.wiz.oap,S.wiz.size);
    S.bookings.unshift({id,who:'me',item:it.id,when:`${day[0]} ${day[1]} ${day[2]} · ${TIMES[S.wiz.time][0]}`,status:'Confirmed',price,note:(S.wiz.oap?'Over-65 rate applied':'')+(S.wiz.recur?' · fortnightly':''),recurring:S.wiz.recur?'Fortnightly':null,new:true,mine:true,paid:S.wiz.pay==='now'}); S.wiz.step=6; S.wiz.ref=id; render(); },
  'pq-submit':()=>{ S.pq.state='sent'; S.quotes.unshift({id:'PQ-'+(89+S.quotes.length),who:'me',item:S.pq.item||'extpaint',when:'Just now',status:'new',txt:'Submitted from the website with 3 photos.',img:P('house1'),new:true}); render(); },
  'acct':d=>{ S.acct=d.t; render(true); },
  'onmyway':d=>{ const b=byId(S.bookings,d.id); b.status='On my way'; render(true); toast('Text sent: “Jamie is on his way, ETA 20 min”','navigation'); },
  'job-start':d=>{ const b=byId(S.bookings,d.id); b.status='In progress'; render(true); toast('Job started · timer running','timer'); },
  'job-done':d=>{ const b=byId(S.bookings,d.id); b.status='Done'; render(true); toast('Marked done · photos & invoice sent · review request in 2 h','check-circle'); },
  'pq-open':d=>{ S.drawer={kind:'pq',id:d.id}; renderDrawer(); },
  'pq-send':d=>{ const q=byId(S.quotes,d.id); q.status='sent'; q.quote=q.quote||+(d.v||420); q.new=false; closeDrawer(); render(true); toast('Quote sent · customer can book a slot from the link','send'); },
  'booking-open':d=>{ S.drawer={kind:'booking',id:d.id}; renderDrawer(); },
  'drawer-close':()=>closeDrawer(), toggle:(d,el)=>{ el.classList.toggle('on'); toast(el.classList.contains('on')?'Enabled':'Disabled','sliders'); },
  soon:d=>toast(d.msg||'Available in the full build','info'),
};
function renderDrawer(){ const w=$('#drawer'); if(!S.drawer){ w.classList.remove('on'); w.innerHTML=''; return; } w.innerHTML=`<div class="bg" data-act="drawer-close"></div><div class="drawer">${ADMIN.drawer(S.drawer)}</div>`; w.classList.add('on'); }
function closeDrawer(){ S.drawer=null; renderDrawer(); }
initPresenter(); if(location.hash==='#admin') openAdmin('today'); else render();
