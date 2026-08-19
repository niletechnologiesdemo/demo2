/* LEAD — shared site behavior */

/* SVG sprite injected once so every page shares the icon set */
document.body.insertAdjacentHTML('afterbegin',
'<svg width="0" height="0" style="position:absolute"><defs>' +
'<symbol id="i-check" viewBox="0 0 24 24"><path d="m4.5 12.5 5 5 10-11"/></symbol>' +
'<symbol id="i-arr-r" viewBox="0 0 24 24"><path d="M4 12h15M13.5 6l6 6-6 6"/></symbol>' +
'<symbol id="i-chev-r" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></symbol>' +
'<symbol id="i-cert" viewBox="0 0 24 24"><circle cx="12" cy="9.5" r="5.5"/><path d="m8.8 14.2-1.3 6.3 4.5-2.4 4.5 2.4-1.3-6.3"/></symbol>' +
'<symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8.5" r="3.2"/><path d="M3.2 19.5c.7-3.1 3-4.7 5.8-4.7s5.1 1.6 5.8 4.7"/><path d="M15.5 5.6a3.2 3.2 0 0 1 0 5.8M17.6 14.9c2 .6 3.3 2 3.8 4.3"/></symbol>' +
'<symbol id="i-book" viewBox="0 0 24 24"><path d="M12 6.5c-1.8-1.6-4.4-2-8-1.6V19c3.6-.4 6.2 0 8 1.6 1.8-1.6 4.4-2 8-1.6V4.9c-3.6-.4-6.2 0-8 1.6Z"/><path d="M12 6.5v14"/></symbol>' +
'<symbol id="i-video" viewBox="0 0 24 24"><rect x="3" y="6" width="13" height="12" rx="2.5"/><path d="m16 10.5 5-2.8v8.6l-5-2.8Z"/></symbol>' +
'<symbol id="i-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><path d="M12 12h.01" stroke-width="2.6"/></symbol>' +
'<symbol id="i-mic" viewBox="0 0 24 24"><rect x="9" y="3.5" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3"/></symbol>' +
'<symbol id="i-spark" viewBox="0 0 24 24"><path d="M12 2.8c.7 4.9 2.3 6.5 7.2 7.2-4.9.7-6.5 2.3-7.2 7.2-.7-4.9-2.3-6.5-7.2-7.2 4.9-.7 6.5-2.3 7.2-7.2Z" fill="currentColor" stroke="none"/><path d="M19 15.5c.35 2.45 1.15 3.25 3.6 3.6-2.45.35-3.25 1.15-3.6 3.6-.35-2.45-1.15-3.25-3.6-3.6 2.45-.35 3.25-1.15 3.6-3.6Z" fill="currentColor" stroke="none" opacity=".7"/></symbol>' +
'<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3 5 5.8v5.4c0 4.5 2.9 7.7 7 9.3 4.1-1.6 7-4.8 7-9.3V5.8Z"/><path d="m9 11.6 2.2 2.2 4-4.2"/></symbol>' +
'<symbol id="i-msg" viewBox="0 0 24 24"><path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 20.5l1.5-5.4A8.5 8.5 0 1 1 21 11.5Z"/></symbol>' +
'<symbol id="i-cal" viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.8h17M8 3v4M16 3v4"/></symbol>' +
'<symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3c0 5.4-7.5 10-7.5 10Z"/></symbol>' +
'<symbol id="i-home" viewBox="0 0 24 24"><path d="M3.5 10.5 12 3.5l8.5 7V20a1 1 0 0 1-1 1h-4.8v-5.6H9.3V21H4.5a1 1 0 0 1-1-1Z"/></symbol>' +
'<symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.6"/><path d="M5 20.2c.8-3.6 3.6-5.4 7-5.4s6.2 1.8 7 5.4"/></symbol>' +
'<symbol id="i-star" viewBox="0 0 24 24"><path d="m12 3.2 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.4l5.9-.8Z" fill="currentColor" stroke="none"/></symbol>' +
'<symbol id="i-up" viewBox="0 0 24 24"><path d="M12 19V6M6 12l6-6 6 6"/></symbol>' +
'<symbol id="i-quote" viewBox="0 0 24 24"><path d="M5 7h5v5H7c0 2.2.9 3.4 3 3.8V18c-3.6-.5-5-3-5-6.5V7Zm9 0h5v5h-3c0 2.2.9 3.4 3 3.8V18c-3.6-.5-5-3-5-6.5V7Z" fill="currentColor" stroke="none"/></symbol>' +
'<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2.5"/></symbol>' +
'<symbol id="i-doc" viewBox="0 0 24 24"><path d="M6.5 3.5h7l4.5 4.5v12a1 1 0 0 1-1 1h-10.5a1 1 0 0 1-1-1v-15.5a1 1 0 0 1 1-1Z"/><path d="M13.5 3.5V8H18M9 12.5h6M9 16h6"/></symbol>' +
'<symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>' +
'<symbol id="i-x" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></symbol>' +
'<symbol id="i-play" viewBox="0 0 24 24"><path d="M8.5 5.8v12.4a.7.7 0 0 0 1.06.6l10-6.2a.7.7 0 0 0 0-1.2l-10-6.2a.7.7 0 0 0-1.06.6Z" fill="currentColor" stroke="none"/></symbol>' +
'<symbol id="i-lock" viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="9.5" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></symbol>' +
'<symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.6 2.3 3.9 5.1 3.9 8.5s-1.3 6.2-3.9 8.5c-2.6-2.3-3.9-5.1-3.9-8.5s1.3-6.2 3.9-8.5Z"/></symbol>' +
'<symbol id="i-bulb" viewBox="0 0 24 24"><path d="M9 18h6M10 21h4"/><path d="M12 3.5a6 6 0 0 1 3.5 10.9c-.8.6-1 1.3-1 2.1h-5c0-.8-.2-1.5-1-2.1A6 6 0 0 1 12 3.5Z"/></symbol>' +
'<symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="m4 7.5 8 6 8-6"/></symbol>' +
'<symbol id="i-phone" viewBox="0 0 24 24"><path d="M6 3.5h4l1.5 4.5-2.3 1.7a12 12 0 0 0 5.1 5.1l1.7-2.3 4.5 1.5v4a1.5 1.5 0 0 1-1.7 1.5C10.9 18.9 5.1 13.1 4.5 5.2A1.5 1.5 0 0 1 6 3.5Z"/></symbol>' +
'</defs></svg>');

/* nav scroll state */
var nav = document.getElementById('nav');
function onScroll(){ nav.classList.toggle('scrolled', scrollY > 40); }
addEventListener('scroll', onScroll, {passive:true}); onScroll();

/* burger */
function toggleMenu(){ document.getElementById('mmenu').classList.toggle('open'); }

/* reveal on scroll (staggered via --d inline var) */
var io = new IntersectionObserver(function(es){
  es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, {threshold:.1});
document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });

/* community pricing toggle */
function setPlan(p){
  var m = document.getElementById('pM'), y = document.getElementById('pY');
  if (!m) return;
  m.classList.toggle('on', p==='m'); y.classList.toggle('on', p==='y');
  document.getElementById('prAmt').innerHTML = p==='m' ? '$19<small>/month</small>' : '$149<small>/year</small>';
  document.getElementById('prNote').textContent = p==='m' ? 'Cancel anytime · 7-day free trial · indicative pricing' : 'Two months free · 7-day free trial · indicative pricing';
}

/* demo forms */
function joined(ev, btnId){
  ev.preventDefault();
  var b = document.getElementById(btnId || 'waitBtn');
  if (b){ b.textContent = "You're on the list"; b.classList.remove('lime'); b.style.background = '#fff'; b.style.color = 'var(--navy)'; }
  var inp = ev.target.querySelector('input'); if (inp) inp.value = '';
}
function sentForm(ev){
  ev.preventDefault();
  var b = ev.target.querySelector('button[type=submit]');
  b.textContent = 'Message sent — we’ll be in touch';
  b.disabled = true; b.style.opacity = .85;
}
