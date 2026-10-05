/* OPERATION POSEIDON · app core: state, router, presenter, actions */
const $=s=>document.querySelector(s);
const byId=(a,id)=>a.find(x=>x.id===id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

const S0=()=>({
  route:'home',param:null,admin:false,adminPage:'overview',pres:true,
  signedIn:true,member:false,plan:null,
  cart:[],myBookings:[{retreat:'r3',type:'Paid place',ref:'B-1990',when:'Booked 2 Sep'}],myOrders:[],
  booking:null,checkout:null,
  liked:{},posts:JSON.parse(JSON.stringify(POSTS)),apps:JSON.parse(JSON.stringify(APPLICATIONS)),orders:JSON.parse(JSON.stringify(ORDERS)),bookingsAdmin:JSON.parse(JSON.stringify(BOOKINGS)),
  board:'All posts',learnFilter:'All',learnTier:'All',shopFilter:'All',
  lesson:{},done:{c1:[0,1,2],c2:[0,1,2],c5:[0,1,2]},ctab:'about',acctTab:'overview',
  drawer:null,retreatFilter:'All',
});
let S=S0();

/* ---------- navigation ---------- */
function go(route,param,opts={}){
  S.admin=false; S.route=route; S.param=param||null;
  if(route==='book'){ const r=byId(RETREATS,param); S.booking={retreat:param,opt:opts.opt||(r.price?'paid':'free'),step:1}; }
  render();
}
function openAdmin(page){ S.admin=true; S.adminPage=page||S.adminPage||'overview'; render(); }
function render(keep){
  const y=window.scrollY;
  document.body.classList.toggle('admin',S.admin);
  document.body.classList.toggle('pres',S.pres);
  $('#presenter').classList.toggle('on',S.pres);
  const app=$('#app');
  if(S.admin){ app.innerHTML=ADMIN.shell(); (ADMIN.after[S.adminPage]||(()=>{}))(); }
  else { const fn=SCREENS[S.route]||SCREENS.home; app.innerHTML=fn(S.param); (AFTER[S.route]||(()=>{}))(S.param); }
  if(keep) window.scrollTo(0,y); else window.scrollTo(0,0);
  syncJump();
}
let toastT;
function toast(msg,icon='check-circle'){
  const t=$('#toast'); t.innerHTML=ico(icon,18)+'<span>'+msg+'</span>'; t.classList.add('show');
  clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('show'),2600);
}
const cartCount=()=>S.cart.reduce((a,c)=>a+c.q,0);
const cartTotal=()=>S.cart.reduce((a,c)=>a+c.q*byId(PRODUCTS,c.id).price,0);

/* ---------- presenter ---------- */
const JUMPS=[
  ['Public site',[['home','Home'],['retreats','Retreats & sessions'],['retreat:r1','Retreat detail'],['book:r1','Booking wizard'],['learn','Learn library'],['course:c2','Course player · free'],['course:c5','Course player · members'],['community','Community'],['shop','Shop'],['cart','Cart & checkout'],['membership','Membership plans'],['account','My account'],['about','Our mission'],['club','Sea to Summit Club · coming soon']]],
  ['Admin console',[['adm:overview','Overview'],['adm:bookings','Bookings & calendar'],['adm:applications','Free place applications'],['adm:sessions','Sessions'],['adm:courses','Courses & content'],['adm:community','Community moderation'],['adm:orders','Shop orders'],['adm:products','Products & stock'],['adm:members','Members'],['adm:money','Funding & payouts']]],
];
function initPresenter(){
  const sel=$('#jump'); sel.innerHTML=JUMPS.map(([g,items])=>`<optgroup label="${g}">${items.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</optgroup>`).join('');
  sel.onchange=()=>{ const v=sel.value; if(v.startsWith('adm:')) openAdmin(v.slice(4)); else { const [r,p]=v.split(':'); go(r,p); } };
  $('#p-reset').onclick=()=>{ S=S0(); render(); toast('Demo reset','refresh'); };
  $('#p-admin').onclick=()=>{ if(S.admin){ go('home'); } else openAdmin('overview'); };
  document.addEventListener('keydown',e=>{ if(e.key.toLowerCase()==='p'&&!/input|textarea|select/i.test(e.target.tagName)){ S.pres=!S.pres; document.body.classList.toggle('pres',S.pres); $('#presenter').classList.toggle('on',S.pres);} });
}
function syncJump(){ const sel=$('#jump'); const v=S.admin?'adm:'+S.adminPage:(S.param?S.route+':'+S.param:S.route); if([...sel.options].some(o=>o.value===v)) sel.value=v; $('#p-admin').textContent=S.admin?'Back to public site':'Open admin console'; }

/* ---------- actions (event delegation) ---------- */
document.addEventListener('click',e=>{
  const el=e.target.closest('[data-act]'); if(!el) return;
  const a=el.dataset.act, d=el.dataset;
  const A=ACTIONS[a]; if(A){ e.preventDefault(); A(d,el,e); }
});
const ACTIONS={
  go:d=>go(d.to,d.id),
  admin:d=>openAdmin(d.p),
  signin:()=>{ S.signedIn=true; render(true); toast('Signed in as '+PEOPLE.me.n,'user'); },
  signout:()=>{ S.signedIn=false; go('home'); toast('Signed out','log-out'); },
  /* retreats */
  'retreat-filter':d=>{ S.retreatFilter=d.f; render(true); },
  'book-opt':d=>{ S.bookOpt=d.opt; render(true); },
  'book-start':d=>{ go('book',d.id,{opt:S.bookOpt||d.opt}); },
  'wiz-next':()=>{ S.booking.step++; render(); },
  'wiz-back':()=>{ S.booking.step--; render(); },
  'wiz-finish':()=>{ const b=S.booking, r=byId(RETREATS,b.retreat); const ref='B-'+(2042+S.myBookings.length);
    S.myBookings.unshift({retreat:r.id,type:b.opt==='paid'?'Paid place':b.opt==='deposit'?'Deposit paid':b.opt==='waitlist'?'Waitlist':'Free place · under review',ref,when:'Booked today'});
    S.bookingsAdmin.unshift({id:ref,who:'me',retreat:r.id,type:b.opt==='paid'?'Paid place':b.opt==='deposit'?'Deposit':b.opt==='waitlist'?'Waitlist':'Free place application',paid:b.opt==='paid'?r.price:b.opt==='deposit'?r.deposit:0,status:b.opt==='free'?'Under review':b.opt==='waitlist'?'Waitlisted':'Confirmed',when:'Just now',new:true});
    if(b.opt==='free') S.apps.unshift({id:'a'+(S.apps.length+1),who:'me',retreat:r.id,when:'Just now',status:'new',ref:'Self-referral',txt:'Submitted via the website booking flow.',swim:'Confident',medical:'None declared'});
    if(b.opt!=='free'&&b.opt!=='waitlist') r.booked++;
    b.step=4; render(); },
  'session-book':d=>{ const s=byId(SESSIONS,d.id); S.myBookings.unshift({session:s.id,type:s.price?'Paid session':'Free session',ref:'S-'+(510+S.myBookings.length),when:'Booked today'}); s.spots--; render(true); toast(s.title+' booked · '+s.when,'calendar'); },
  /* learn */
  'learn-filter':d=>{ S.learnFilter=d.f; render(true); },
  'learn-tier':d=>{ S.learnTier=d.f; render(true); },
  lesson:d=>{ S.lesson[d.cid]=+d.i; render(true); },
  'lesson-done':d=>{ const c=byId(COURSES,d.cid); const i=S.lesson[d.cid]||0; S.done[d.cid]=S.done[d.cid]||[]; if(!S.done[d.cid].includes(i)) S.done[d.cid].push(i); if(i<c.ls.length-1) S.lesson[d.cid]=i+1; render(true); toast('Lesson complete · progress saved','check-circle'); },
  ctab:d=>{ S.ctab=d.t; render(true); },
  /* community */
  like:d=>{ const p=byId(S.posts,d.id); p.liked=!p.liked; p.likes+=p.liked?1:-1; render(true); },
  board:d=>{ S.board=d.name; render(true); },
  'post-submit':()=>{ const ta=$('#composer'); const v=ta&&ta.value.trim(); if(!v){ toast('Write something first','info'); return; } S.posts.unshift({id:'p'+Date.now(),who:'me',when:'Just now',board:S.board==='All posts'?'Reflections':S.board,txt:esc(v),likes:0,liked:false,replies:[]}); render(true); toast('Posted to '+(S.board==='All posts'?'Reflections':S.board),'send'); },
  'reply-focus':()=>toast('Reply box opens under the post','message'),
  /* shop */
  'shop-filter':d=>{ S.shopFilter=d.f; render(true); },
  'add-cart':d=>{ const l=S.cart.find(c=>c.id===d.id); if(l) l.q++; else S.cart.push({id:d.id,q:1}); render(true); toast(byId(PRODUCTS,d.id).name+' added to bag','bag'); },
  'cart-inc':d=>{ S.cart.find(c=>c.id===d.id).q++; render(true); },
  'cart-dec':d=>{ const l=S.cart.find(c=>c.id===d.id); l.q--; if(l.q<=0) S.cart=S.cart.filter(c=>c.id!==d.id); render(true); },
  'cart-remove':d=>{ S.cart=S.cart.filter(c=>c.id!==d.id); render(true); },
  'checkout-start':()=>{ S.checkout={step:1}; render(); },
  'checkout-pay':()=>{ const id='O-'+(1189+S.myOrders.length); const items=S.cart.map(c=>byId(PRODUCTS,c.id).name+' ×'+c.q).join(', '); const tot=cartTotal()+(cartTotal()>=60?0:3.95);
    S.myOrders.unshift({id,items,tot,status:'Processing',when:'Just now'}); S.orders.unshift({id,who:'me',items,tot,status:'To dispatch',when:'Just now',new:true}); S.cart=[]; S.checkout={step:2,id,tot}; render(); },
  /* membership */
  'join-plan':d=>{ S.member=d.plan!=='free'; S.plan=d.plan==='monthly'?'Crew · Monthly':d.plan==='annual'?'Crew · Annual':'Free'; render(); toast(S.member?'Welcome to the crew · full library unlocked':'Free account ready','award'); if(S.member&&S.route==='course') return; go(S.member?'learn':'account'); },
  'acct-tab':d=>{ S.acctTab=d.t; render(true); },
  /* admin */
  'adm-page':d=>{ S.adminPage=d.p; render(); },
  'app-approve':d=>{ const a=byId(S.apps,d.id); a.status='approved'; render(true); toast('Free place approved · confirmation email sent to '+PEOPLE[a.who].n.split(' ')[0],'check-circle'); },
  'app-decline':d=>{ const a=byId(S.apps,d.id); a.status='declined'; a.note='Offered next available date'; render(true); toast('Marked as not this time · kind reply drafted','mail'); },
  'app-open':d=>{ S.drawer={kind:'app',id:d.id}; renderDrawer(); },
  'booking-open':d=>{ S.drawer={kind:'booking',id:d.id}; renderDrawer(); },
  'order-open':d=>{ S.drawer={kind:'order',id:d.id}; renderDrawer(); },
  'order-dispatch':d=>{ const o=byId(S.orders,d.id); o.status='Dispatched'; o.new=false; closeDrawer(); render(true); toast('Order '+o.id+' marked dispatched · tracking sent','truck'); },
  'drawer-close':()=>closeDrawer(),
  toggle:(d,el)=>{ el.classList.toggle('on'); toast(el.classList.contains('on')?'Enabled':'Disabled','sliders'); },
  'tier-toggle':(d,el)=>{ const c=byId(COURSES,d.id); c.tier=c.tier==='free'?'member':'free'; render(true); toast(c.title.split(':')[0]+' is now '+(c.tier==='free'?'free for everyone':'members only'),'lock'); },
  soon:d=>toast(d.msg||'Available in the full build','info'),
};
function renderDrawer(){ const w=$('#drawer'); if(!S.drawer){ w.classList.remove('on'); w.innerHTML=''; return; } w.innerHTML=`<div class="bg" data-act="drawer-close"></div><div class="drawer">${ADMIN.drawer(S.drawer)}</div>`; w.classList.add('on'); }
function closeDrawer(){ S.drawer=null; renderDrawer(); }

initPresenter(); render();
