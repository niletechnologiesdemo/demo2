/* ============================================================
   Business Website Integration, interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---- Sticky header state ---- */
  var header = document.getElementById('header');
  function onScroll() {
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav ---- */
  var toggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') navLinks.classList.remove('open');
    });
  }

  /* ---- Year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---- Count-up numbers ---- */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var dur = 1500, start = null;
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = val.toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(frame);
  }

  /* ---- Gauge ring + mini bars ---- */
  function animateGauge(panel) {
    var arc = document.getElementById('gaugeArc');
    if (arc) {
      var circumference = 465; // 2πr, r=74
      var pct = 0.98;
      arc.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)';
      arc.style.strokeDashoffset = String(circumference * (1 - pct));
    }
    panel.querySelectorAll('.fill').forEach(function (f) {
      f.style.width = (f.getAttribute('data-fill') || 0) + '%';
    });
  }

  /* ---- Reveal on scroll (IntersectionObserver) ---- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      el.classList.add('in');

      // trigger counters within this element
      el.querySelectorAll('[data-count]').forEach(countUp);
      if (el.hasAttribute('data-count')) countUp(el);

      // gauge panel
      if (el.querySelector('#gaugeArc') || el.querySelector('.fill')) animateGauge(el);

      io.unobserve(el);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Observe stat/gauge containers that may not carry .reveal counters directly
  document.querySelectorAll('.glass-panel').forEach(function (el) { io.observe(el); });

  /* ---- Contact form (demo, no backend) ---- */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name');
      var email = form.querySelector('#email');
      if (!name.value.trim() || !email.value.trim()) {
        if (note) { note.textContent = 'Please add your name and email so we can reply.'; note.style.color = '#ff8a8a'; }
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(function () {
        form.reset();
        btn.innerHTML = 'Message sent ✓';
        if (note) { note.textContent = "Thanks, we'll be in touch within one business day."; note.style.color = 'var(--teal)'; }
        setTimeout(function () {
          btn.disabled = false;
          btn.innerHTML = 'Send message';
        }, 2600);
      }, 900);
    });
  }
})();
