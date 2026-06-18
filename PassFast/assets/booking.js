/* PassFast Intensive — booking wizard logic (vanilla JS, no deps) */
(function () {
  'use strict';

  // ---- Package catalogue (edit prices/hours here) ----
  var PACKAGES = {
    '10': { id: '10', name: '10-Hour Confidence Booster', hours: 10, sessions: 5,  price: 200,  sub: 'Final polish before your test',  icon: 'bolt' },
    '20': { id: '20', name: '20-Hour Course',             hours: 20, sessions: 10, price: 600,  sub: 'Beginner to test-ready',         icon: 'check' },
    '25': { id: '25', name: '25-Hour Course',             hours: 25, sessions: 13, price: 750,  sub: '12 lessons + 1hr mock test',     icon: 'bars' },
    '48': { id: '48', name: '48-Hour Intensive',          hours: 48, sessions: 24, price: 1500, sub: 'Zero to confident driver',       icon: 'star' }
  };
  var ORDER = ['10', '20', '25', '48'];
  var DEPOSIT_RATE = 0.25;
  var SLOT_TIMES = ['08:00–10:00', '10:00–12:00', '12:00–14:00', '14:00–16:00', '16:00–18:00', '18:00–20:00'];
  var DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  var ICONS = {
    bolt:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    bars:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20v-6M6 20v-4M18 20v-9M3 20h18"/></svg>',
    star:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>',
    tick:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
  };

  // ---- State ----
  var state = {
    step: 1,
    pkg: null,
    firstDate: '',
    days: [],
    tods: [],
    slots: {},          // key 'YYYY-MM-DD|time' => true
    pay: 'full'
  };

  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };
  var gbp = function (n) { return '£' + Number(n).toLocaleString('en-GB'); };

  // =========================================================
  // STEP 1 — package list
  // =========================================================
  function renderPackages() {
    var list = $('#pkgList');
    list.innerHTML = ORDER.map(function (id) {
      var p = PACKAGES[id];
      return '<div class="opt' + (state.pkg === id ? ' selected' : '') + '" data-pkg="' + id + '">' +
        '<span class="opt-check">' + ICONS.tick + '</span>' +
        '<span class="opt-ic">' + ICONS[p.icon] + '</span>' +
        '<div class="opt-body"><b>' + p.name + '</b><small>' + p.hours + ' hours · ' + p.sessions + ' × 2-hour sessions · ' + p.sub + '</small></div>' +
        '<div class="opt-price"><span class="amt">' + gbp(p.price) + '</span><span class="per">total</span></div>' +
        '</div>';
    }).join('');
    $$('#pkgList .opt').forEach(function (el) {
      el.addEventListener('click', function () {
        state.pkg = el.getAttribute('data-pkg');
        renderPackages();
        syncSummary();
      });
    });
  }

  // =========================================================
  // STEP 2 — schedule
  // =========================================================
  function renderDayChips() {
    var wrap = $('#dayChips');
    wrap.innerHTML = DAYS.map(function (d) {
      return '<span class="chip' + (state.days.indexOf(d) > -1 ? ' on' : '') + '" data-day="' + d + '">' + d + '</span>';
    }).join('');
    $$('#dayChips .chip').forEach(function (el) {
      el.addEventListener('click', function () {
        toggle(state.days, el.getAttribute('data-day'));
        el.classList.toggle('on');
      });
    });
  }

  function bindTodChips() {
    $$('#todChips .chip').forEach(function (el) {
      el.addEventListener('click', function () {
        toggle(state.tods, el.getAttribute('data-tod'));
        el.classList.toggle('on');
      });
    });
  }

  function toggle(arr, val) {
    var i = arr.indexOf(val);
    if (i > -1) arr.splice(i, 1); else arr.push(val);
  }

  function fmtDay(d) {
    return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  }
  function isoDate(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function renderSlots() {
    var max = state.pkg ? Math.min(PACKAGES[state.pkg].sessions, 8) : 0;
    $('#slotMax').textContent = max;
    var container = $('#slotDays');
    var start = state.firstDate ? new Date(state.firstDate + 'T00:00:00') : new Date();
    if (isNaN(start.getTime())) start = new Date();

    var html = '';
    for (var i = 0; i < 7; i++) {
      var d = new Date(start.getTime());
      d.setDate(d.getDate() + i);
      var iso = isoDate(d);
      html += '<div class="slot-day"><div class="sd-head">' + fmtDay(d) + '</div><div class="slot-pills">';
      html += SLOT_TIMES.map(function (t) {
        var key = iso + '|' + t;
        return '<span class="slot' + (state.slots[key] ? ' on' : '') + '" data-key="' + key + '">' + t + '</span>';
      }).join('');
      html += '</div></div>';
    }
    container.innerHTML = html;

    $$('#slotDays .slot').forEach(function (el) {
      el.addEventListener('click', function () {
        var key = el.getAttribute('data-key');
        var count = Object.keys(state.slots).length;
        if (!state.slots[key] && count >= max) return; // cap reached
        if (state.slots[key]) delete state.slots[key]; else state.slots[key] = true;
        el.classList.toggle('on');
        updateSlotCount();
        syncSummary();
      });
    });
    updateSlotCount();
  }

  function updateSlotCount() {
    $('#slotCount').textContent = Object.keys(state.slots).length;
  }

  // Cancellation window helper based on days until first lesson
  function cancelWindow(daysUntil) {
    if (daysUntil >= 5) return { hrs: 24, band: '5 or more days away' };
    if (daysUntil >= 3) return { hrs: 8, band: 'within the next 3–5 days' };
    return { hrs: 2, band: 'less than 3 days away' };
  }

  function updateCancelNote() {
    var note = $('#cancelNote');
    if (!state.firstDate) { note.style.display = 'none'; return; }
    var d = new Date(state.firstDate + 'T00:00:00');
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var daysUntil = Math.round((d - today) / 86400000);
    var w = cancelWindow(daysUntil);
    note.style.display = 'flex';
    $('#cancelNoteText').innerHTML = 'Your first lesson is <strong>' + w.band + '</strong>, so you can cancel free of charge up to <strong>' + w.hrs + ' hours</strong> after booking. After that, a cancellation fee applies.';
  }

  // =========================================================
  // STEP 4 — payment
  // =========================================================
  function bindPayOpts() {
    $$('#payOpts .pay-opt').forEach(function (el) {
      el.addEventListener('click', function () {
        state.pay = el.getAttribute('data-pay');
        $$('#payOpts .pay-opt').forEach(function (o) { o.classList.remove('selected'); });
        el.classList.add('selected');
        updatePayAmounts();
      });
    });

    // input formatting
    $('#cardNum').addEventListener('input', function (e) {
      var v = e.target.value.replace(/\D/g, '').slice(0, 16);
      e.target.value = v.replace(/(.{4})/g, '$1 ').trim();
    });
    $('#cardExp').addEventListener('input', function (e) {
      var v = e.target.value.replace(/\D/g, '').slice(0, 4);
      if (v.length >= 3) v = v.slice(0, 2) + ' / ' + v.slice(2);
      e.target.value = v;
    });
    $('#cardCvc').addEventListener('input', function (e) {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
    });
  }

  function amounts() {
    var total = state.pkg ? PACKAGES[state.pkg].price : 0;
    var deposit = Math.round(total * DEPOSIT_RATE);
    return { total: total, deposit: deposit, due: state.pay === 'deposit' ? deposit : total };
  }

  function updatePayAmounts() {
    var a = amounts();
    $('#payFullAmt').textContent = gbp(a.total);
    $('#payDepAmt').textContent = gbp(a.deposit);
    $('#payDepSub').textContent = '25% now · ' + gbp(a.total - a.deposit) + ' later';
    $('#payBtnLabel').textContent = 'Pay ' + gbp(a.due);
    syncSummary();
  }

  // =========================================================
  // SUMMARY
  // =========================================================
  function syncSummary() {
    var p = state.pkg ? PACKAGES[state.pkg] : null;
    var a = amounts();
    $('#sumName').textContent = p ? p.name : 'Select a package';
    $('#sumSub').textContent = p ? (p.hours + ' hours of tuition') : '2-hour lessons with a DVSA instructor';
    $('#sumSessions').textContent = p ? (p.sessions + ' × 2 hours') : '—';
    $('#sumDate').textContent = state.firstDate ? new Date(state.firstDate + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
    var n = Object.keys(state.slots).length;
    $('#sumSlots').textContent = n ? (n + ' preferred') : '—';
    $('#sumTotal').textContent = gbp(a.total);
    var due = $('#sumDue');
    if (p && state.pay === 'deposit') {
      due.textContent = 'Deposit due now: ' + gbp(a.deposit);
    } else if (p) {
      due.textContent = 'Pay in full at checkout';
    } else {
      due.textContent = '';
    }
  }

  // =========================================================
  // VALIDATION
  // =========================================================
  function setInvalid(field, bad) {
    var f = field.closest('.field');
    if (f) f.classList.toggle('invalid', bad);
  }

  function validateStep(step) {
    if (step === 1) {
      if (!state.pkg) { flash('Please choose a package to continue.'); return false; }
      return true;
    }
    if (step === 2) {
      var fd = $('#firstDate');
      if (!state.firstDate) { setInvalid(fd, true); fd.focus(); return false; }
      setInvalid(fd, false);
      return true;
    }
    if (step === 3) {
      var ok = true;
      var checks = [
        ['#firstName', function (v) { return v.trim().length > 0; }],
        ['#lastName', function (v) { return v.trim().length > 0; }],
        ['#email', function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }],
        ['#phone', function (v) { return v.replace(/\D/g, '').length >= 7; }],
        ['#postcode', function (v) { return v.trim().length >= 3; }],
        ['#licence', function (v) { return v !== ''; }]
      ];
      checks.forEach(function (c) {
        var el = $(c[0]);
        var good = c[1](el.value);
        setInvalid(el, !good);
        if (!good && ok) el.focus();
        if (!good) ok = false;
      });
      return ok;
    }
    if (step === 4) {
      var ok4 = true;
      var pay = [
        ['#cardName', function (v) { return v.trim().length > 1; }],
        ['#cardNum', function (v) { return v.replace(/\s/g, '').length >= 15; }],
        ['#cardExp', function (v) { return /^\d{2}\s?\/\s?\d{2}$/.test(v); }],
        ['#cardCvc', function (v) { return /^\d{3,4}$/.test(v); }]
      ];
      pay.forEach(function (c) {
        var el = $(c[0]);
        var good = c[1](el.value);
        setInvalid(el, !good);
        if (!good && ok4) el.focus();
        if (!good) ok4 = false;
      });
      return ok4;
    }
    return true;
  }

  var flashTimer;
  function flash(msg) {
    var f = $('#flash');
    if (!f) {
      f = document.createElement('div');
      f.id = 'flash';
      f.style.cssText = 'position:fixed;left:50%;bottom:26px;transform:translateX(-50%);background:#0E1726;color:#fff;padding:13px 22px;border-radius:999px;font-weight:600;font-size:.92rem;z-index:999;box-shadow:0 14px 40px rgba(0,0,0,.25);opacity:0;transition:opacity .25s,transform .25s;';
      document.body.appendChild(f);
    }
    f.textContent = msg;
    requestAnimationFrame(function () { f.style.opacity = '1'; f.style.transform = 'translateX(-50%) translateY(0)'; });
    clearTimeout(flashTimer);
    flashTimer = setTimeout(function () { f.style.opacity = '0'; }, 2600);
  }

  // =========================================================
  // NAVIGATION
  // =========================================================
  function showStep(step) {
    state.step = step;
    $$('.step-pane').forEach(function (p) {
      p.classList.toggle('active', Number(p.getAttribute('data-pane')) === step);
    });
    // stepper
    $$('#stepper .st').forEach(function (st) {
      var n = Number(st.getAttribute('data-step'));
      st.classList.toggle('active', n === step);
      st.classList.toggle('done', n < step);
    });
    $$('#stepper .st-line').forEach(function (line, i) {
      line.classList.toggle('fill', i < step - 1);
    });
    // hide wizard grid on confirmation
    $('#wizardGrid').style.display = step === 5 ? 'none' : 'grid';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function next() {
    if (!validateStep(state.step)) return;
    if (state.step === 2) { /* slots optional */ }
    showStep(state.step + 1);
    if (state.step === 4) updatePayAmounts();
  }
  function back() { showStep(state.step - 1); }

  // =========================================================
  // PAYMENT submit -> confirmation
  // =========================================================
  function pay() {
    if (!validateStep(4)) return;
    var btn = $('#payBtn');
    var label = $('#payBtnLabel');
    var original = label.textContent;
    btn.disabled = true;
    label.textContent = 'Processing…';
    setTimeout(function () {
      buildConfirmation();
      showStep(5);
      btn.disabled = false;
      label.textContent = original;
    }, 1100);
  }

  function buildConfirmation() {
    var a = amounts();
    var ref = 'PF-' + Math.floor(100000 + Math.random() * 899999);
    $('#confRef').textContent = ref;
    $('#confName').textContent = ($('#firstName').value || 'there').trim();

    var paidLine = state.pay === 'deposit'
      ? 'your <strong>' + gbp(a.deposit) + ' deposit</strong> is secured (balance ' + gbp(a.total - a.deposit) + ' due before your course)'
      : 'your <strong>' + gbp(a.total) + '</strong> payment is secured';
    $('#confirmLede').innerHTML = "Thanks <span id=\"confName\">" + ($('#firstName').value || 'there').trim() +
      "</span> — we've received your booking request for the <strong>" + PACKAGES[state.pkg].name + "</strong> and " + paidLine + '.';

    // cancellation note
    var d = new Date(state.firstDate + 'T00:00:00');
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var daysUntil = Math.round((d - today) / 86400000);
    var w = cancelWindow(daysUntil);
    $('#confCancelText').innerHTML = 'Changed your mind? Your first lesson is ' + w.band + ', so you can cancel free of charge up to <strong>' + w.hrs + ' hours</strong> after this booking.';
  }

  // =========================================================
  // INIT
  // =========================================================
  function init() {
    renderPackages();
    renderDayChips();
    bindTodChips();
    bindPayOpts();
    syncSummary();

    // first date constraints
    var fd = $('#firstDate');
    var tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
    fd.min = isoDate(tomorrow);
    fd.addEventListener('change', function () {
      state.firstDate = fd.value;
      setInvalid(fd, false);
      renderSlots();
      updateCancelNote();
      syncSummary();
    });

    // wizard buttons (delegated)
    $$('[data-next]').forEach(function (b) { b.addEventListener('click', next); });
    $$('[data-back]').forEach(function (b) { b.addEventListener('click', back); });
    $('#payBtn').addEventListener('click', pay);

    // stepper click-back (only to completed steps)
    $$('#stepper .st').forEach(function (st) {
      st.addEventListener('click', function () {
        var n = Number(st.getAttribute('data-step'));
        if (n < state.step && state.step < 5) showStep(n);
      });
    });

    // preselect package from ?pkg=
    var params = new URLSearchParams(window.location.search);
    var pre = params.get('pkg');
    if (pre && PACKAGES[pre]) {
      state.pkg = pre;
      renderPackages();
      syncSummary();
    }

    renderSlots();
    showStep(1);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
