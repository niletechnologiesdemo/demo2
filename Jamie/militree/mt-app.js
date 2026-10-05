/* MILITREE · app core */
const $=s=>document.querySelector(s);
const byId=(a,id)=>a.find(x=>x.id===id);
const S0=()=>({route:'home',param:null,admin:false,adminPage:'overview',pres:true,
  enq:JSON.parse(JSON.stringify(ENQ)),crew:JSON.parse(JSON.stringify(CREW)),crewApps:JSON.parse(JSON.stringify(CREW_APPS)),
  wiz:{step:1,svc:'thin'},quote:{state:'sent'},workFilter:'All',drawer:null,cut:50});
let S=S0();
function go(route,param){ S.admin=false; S.route=route; S.param=param||null; if(route==='enquiry') S.wiz={step:1,svc:param||S.wiz.svc||'thin'}; render(); }
function openAdmin(p){ S.admin=true; S.adminPage=p||S.adminPage; render(); }
function render(keep){ const y=window.scrollY; document.body.classList.toggle('admin',S.admin); document.body.classList.toggle('pres',S.pres); $('#presenter').classList.toggle('on',S.pres);
  const app=$('#app'); if(S.admin){ app.innerHTML=ADMIN.shell(); } else { app.innerHTML=(SCREENS[S.route]||SCREENS.home)(S.param); (AFTER[S.route]||(()=>{}))(); }
  if(keep) window.scrollTo(0,y); else window.scrollTo(0,0); syncJump(); }
let toastT; function toast(msg,icon='check-circle'){ const t=$('#toast'); t.innerHTML=ico(icon,18)+'<span>'+msg+'</span>'; t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('show'),2600); }
const JUMPS=[['Public site',[['home','Home'],['services','Services'],['service:thin','Service detail'],['work','Our work'],['enquiry','Site survey request'],['quote','Client quote & deposit'],['crew','Join the crew'],['about','About & credentials']]],
  ['Militree Ops (admin)',[['adm:overview','Overview'],['adm:enquiries','Enquiry pipeline'],['adm:quotes','Quote builder'],['adm:jobs','Jobs & crew calendar'],['adm:crew','Crew register'],['adm:clients','Clients'],['adm:invoices','Invoices & payments'],['adm:settings','Settings']]]];
function initPresenter(){ const sel=$('#jump'); sel.innerHTML=JUMPS.map(([g,items])=>`<optgroup label="${g}">${items.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</optgroup>`).join('');
  sel.onchange=()=>{ const v=sel.value; if(v.startsWith('adm:')) openAdmin(v.slice(4)); else { const [r,p]=v.split(':'); go(r,p); } };
  $('#p-reset').onclick=()=>{ S=S0(); render(); toast('Demo reset','refresh'); };
  $('#p-admin').onclick=()=>{ S.admin?go('home'):openAdmin('overview'); };
  document.addEventListener('keydown',e=>{ if(e.key.toLowerCase()==='p'&&!/input|textarea|select/i.test(e.target.tagName)){ S.pres=!S.pres; document.body.classList.toggle('pres',S.pres); $('#presenter').classList.toggle('on',S.pres);} }); }
function syncJump(){ const sel=$('#jump'); const v=S.admin?'adm:'+S.adminPage:(S.param?S.route+':'+S.param:S.route); if([...sel.options].some(o=>o.value===v)) sel.value=v; $('#p-admin').textContent=S.admin?'Back to public site':'Open Militree Ops (admin)'; }
document.addEventListener('click',e=>{ const el=e.target.closest('[data-act]'); if(!el) return; const A=ACTIONS[el.dataset.act]; if(A){ e.preventDefault(); A(el.dataset,el,e); } });
document.addEventListener('input',e=>{ if(e.target.matches('.baslider input')){ e.target.closest('.baslider').style.setProperty('--cut',e.target.value+'%'); } });
const ACTIONS={
  go:d=>go(d.to,d.id), admin:d=>openAdmin(d.p), 'adm-page':d=>{ S.adminPage=d.p; render(); },
  'work-filter':d=>{ S.workFilter=d.f; render(true); },
  'wiz-svc':d=>{ S.wiz.svc=d.id; render(true); },
  'wiz-next':()=>{ S.wiz.step++; render(); }, 'wiz-back':()=>{ S.wiz.step--; render(); },
  'wiz-finish':()=>{ const id='E-'+(342+S.enq.filter(e=>e.mine).length); S.enq.unshift({id,who:'me',col:0,title:'New enquiry via website · '+byId(SERVICES,S.wiz.svc).title,loc:'Broadstone BH18',svc:S.wiz.svc,when:'Just now',size:'~2 ha',photos:3,note:'Submitted through the site survey form.',new:true,mine:true}); S.wiz.step=5; S.wiz.ref=id; render(); },
  'quote-accept':()=>{ S.quote.state='accepting'; render(); },
  'quote-pay':()=>{ S.quote.state='accepted'; const e=byId(S.enq,'E-336'); if(e){ e.col=3; e.dates='Wk of 3 Nov'; e.crew=['jamie','callum','priya','ben']; } render(); },
  'enq-open':d=>{ S.drawer={kind:'enq',id:d.id}; renderDrawer(); },
  'enq-move':d=>{ const e=byId(S.enq,d.id); e.col=Math.min(3,e.col+1); e.new=false; if(e.col===1) e.survey='Thu 18 Sep · 14:00'; if(e.col===2){ e.quote=e.quote||3800; e.sent='Just now'; } if(e.col===3){ e.dates='TBC'; e.crew=e.crew||['jamie']; } closeDrawer(); render(true); toast(['Survey booked · client texted','Quote sent · 48h reminder set','Job scheduled · crew notified'][e.col-1],'check-circle'); },
  'crew-approve':d=>{ const a=S.crewApps.find(x=>x.who===d.who); S.crewApps=S.crewApps.filter(x=>x.who!==d.who); S.crew.push({id:d.who,who:d.who,tix:a.tix,status:'Available',day:240}); render(true); toast(PEOPLE[d.who].n+' added to the crew register','user-check'); },
  'crew-decline':d=>{ S.crewApps=S.crewApps.filter(x=>x.who!==d.who); render(true); toast('Application closed · polite reply sent','mail'); },
  'crew-assign':d=>{ toast(PEOPLE[d.who].n+' pencilled onto '+(d.job||'Hinton Wood')+' · confirmation text sent','calendar'); },
  'drawer-close':()=>closeDrawer(), toggle:(d,el)=>{ el.classList.toggle('on'); toast(el.classList.contains('on')?'Enabled':'Disabled','sliders'); },
  soon:d=>toast(d.msg||'Available in the full build','info'),
};
function renderDrawer(){ const w=$('#drawer'); if(!S.drawer){ w.classList.remove('on'); w.innerHTML=''; return; } w.innerHTML=`<div class="bg" data-act="drawer-close"></div><div class="drawer">${ADMIN.drawer(S.drawer)}</div>`; w.classList.add('on'); }
function closeDrawer(){ S.drawer=null; renderDrawer(); }
initPresenter(); if(location.hash==="#admin") openAdmin("overview"); else render();
