/* Nile Technologies — site behaviour (vanilla JS) */
(function(){
  // Inject inline SVG icons for <i class="i" data-icon="name">
  document.querySelectorAll('[data-icon]').forEach(function(el){
    el.innerHTML = window.ntIcon(el.getAttribute('data-icon'));
    el.classList.add('i');
  });

  // Mobile nav
  var burger = document.querySelector('.burger');
  var mnav = document.querySelector('.mobile-nav');
  if (burger && mnav){
    burger.addEventListener('click', function(){ mnav.classList.add('open'); document.body.style.overflow='hidden'; });
    mnav.querySelectorAll('[data-close], a').forEach(function(a){
      a.addEventListener('click', function(){ mnav.classList.remove('open'); document.body.style.overflow=''; });
    });
  }

  // Active nav link
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a, .mobile-nav a').forEach(function(a){
    var href = a.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });

  // Reveal on scroll
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
    rv.forEach(function(el){ io.observe(el); });
  } else { rv.forEach(function(el){ el.classList.add('in'); }); }
  // Safety net: never leave content hidden if the observer does not fire
  setTimeout(function(){ rv.forEach(function(el){ el.classList.add('in'); }); }, 2500);

  // Counters
  var counters = document.querySelectorAll('[data-count]');
  function runCounter(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1400, start = null;
    function step(ts){
      if (!start) start = ts;
      var p = Math.min((ts - start)/dur, 1);
      var eased = 1 - Math.pow(1-p, 3);
      el.firstChild.nodeValue = Math.round(target*eased).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    }
    el.innerHTML = '0<span>'+suffix+'</span>';
    requestAnimationFrame(step);
  }
  if (counters.length && 'IntersectionObserver' in window){
    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting){ runCounter(e.target); cio.unobserve(e.target); } });
    }, {threshold:.4});
    counters.forEach(function(el){ cio.observe(el); });
  } else { counters.forEach(function(el){ el.innerHTML = el.getAttribute('data-count') + '<span>' + (el.getAttribute('data-suffix')||'') + '</span>'; }); }

  // Horizontal decks (work cards, testimonials)
  document.querySelectorAll('[data-deck]').forEach(function(wrap){
    var track = wrap.querySelector('.deck, .track');
    wrap.querySelectorAll('[data-dir]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var card = track.firstElementChild;
        var w = card ? card.getBoundingClientRect().width + 22 : 400;
        track.scrollBy({left: (btn.getAttribute('data-dir') === 'next' ? 1 : -1) * w, behavior:'smooth'});
      });
    });
  });

  // Duplicate logo tracks for seamless marquee
  document.querySelectorAll('.logo-track').forEach(function(t){ t.innerHTML += t.innerHTML; });

  // Contact form tabs + mailto composer (no backend required)
  var tabs = document.querySelectorAll('.tabs button');
  tabs.forEach(function(b){
    b.addEventListener('click', function(){
      tabs.forEach(function(x){ x.classList.remove('active'); });
      b.classList.add('active');
      var kind = b.getAttribute('data-tab');
      var sel = document.querySelector('#f-subject');
      if (sel) sel.value = kind;
      var cv = document.querySelector('#cv-row');
      if (cv) cv.style.display = kind === 'Job Application' ? 'grid' : 'none';
    });
  });
  var form = document.querySelector('#contact-form');
  if (form){
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var d = new FormData(form);
      var body = ['Name: '+d.get('name'), 'Email: '+d.get('email'), 'Phone: '+(d.get('phone')||'-'), 'Company: '+(d.get('company')||'-'), 'Service: '+(d.get('service')||'-'), '', d.get('message')].join('\n');
      var subject = '['+d.get('subject')+'] Website enquiry from '+d.get('name');
      window.location.href = 'mailto:enquiry@niletechnologies.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
      var n = document.querySelector('.notice'); if (n) n.classList.add('show');
    });
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function(el){ el.textContent = new Date().getFullYear(); });
})();
