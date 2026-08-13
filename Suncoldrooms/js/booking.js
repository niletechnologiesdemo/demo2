/* ============================================================
   Suncool Coldrooms — rental booking engine (customer side)
   ============================================================ */
(function () {
  const P = SC.getPricing();
  const state = {
    step: 1,
    start: null, end: null, days: 0,
    time: '9:00 am',
    rails: false,
    addons: [],
    fulfil: 'pickup',
    address: '', km: 0, delivOk: true, delivCalculated: false,
    calOffset: 0
  };

  const $ = id => document.getElementById(id);
  const money = SC.money;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    renderCalendars();
    renderStepper();
    renderSummary();
    renderAddons();

    $('handoverTime').addEventListener('change', e => { state.time = e.target.value; renderSummary(); });
    $('toStep2').addEventListener('click', () => { renderTrailerChoices(); go(2); });
    $('toStep3').addEventListener('click', () => go(3));
    $('toStep4').addEventListener('click', tryStep4);
    $('toStep5').addEventListener('click', tryStep5);
    document.querySelectorAll('[data-back]').forEach(b => b.addEventListener('click', () => go(Number(b.dataset.back))));

    /* fulfilment */
    $('chPickup').addEventListener('click', () => setFulfil('pickup'));
    $('chDelivery').addEventListener('click', () => setFulfil('delivery'));
    const dl = $('suburbList');
    SC.distances.forEach(d => { const o = document.createElement('option'); o.value = d[0]; dl.appendChild(o); });
    $('calcDelivery').addEventListener('click', calcDelivery);
    $('delivAddress').addEventListener('input', () => { state.delivCalculated = false; $('delivResult').style.display = 'none'; $('delivTooFar').style.display = 'none'; });

    /* account demo fill */
    $('fillDemo').addEventListener('click', e => {
      e.preventDefault();
      $('acName').value = 'Sam Parker'; $('acPhone').value = '0400 123 456';
      $('acEmail').value = 'sam.parker@example.com'; $('acPass').value = 'demo-password';
    });

    /* long-term quote */
    $('qtSubmit').addEventListener('click', submitQuote);

    /* payment niceties */
    $('ccNum').addEventListener('input', e => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
    });
    $('ccExp').addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 4);
      if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
      e.target.value = v;
    });
    $('payBtn').addEventListener('click', pay);
  }

  /* ================= stepper & navigation ================= */
  function go(n) {
    state.step = n;
    document.querySelectorAll('.bk-step').forEach(s => s.classList.remove('active'));
    $('step' + n).classList.add('active');
    renderStepper();
    renderSummary();
    if (n === 4) renderReview();
    if (n === 5) $('payAmt').textContent = money(total().total);
    window.scrollTo({ top: 220, behavior: 'smooth' });
  }
  function renderStepper() {
    document.querySelectorAll('#stepper .st').forEach(el => {
      const n = Number(el.dataset.st);
      el.classList.toggle('current', n === state.step);
      el.classList.toggle('done', n < state.step);
    });
  }

  /* ================= calendars ================= */
  function renderCalendars() {
    const base = SC.parse(SC.todayISO());
    drawCal($('calA'), new Date(base.getFullYear(), base.getMonth() + state.calOffset, 1), state.calOffset > 0);
    drawCal($('calB'), new Date(base.getFullYear(), base.getMonth() + state.calOffset + 1, 1), true, true);
  }

  function drawCal(root, monthDate, allowPrev, isRight) {
    const y = monthDate.getFullYear(), m = monthDate.getMonth();
    const monthName = monthDate.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });
    const firstDow = (new Date(y, m, 1).getDay() + 6) % 7; // Mon-first
    const daysIn = new Date(y, m + 1, 0).getDate();
    const today = SC.todayISO();

    let html = '<div class="cal-head">' +
      '<button data-nav="-1"' + (allowPrev ? '' : ' style="visibility:hidden"') + '>' + I('arrowL', 15) + '</button>' +
      '<span class="m">' + monthName + '</span>' +
      '<button data-nav="1"' + (isRight ? '' : ' style="visibility:hidden"') + '>' + I('arrowR', 15) + '</button></div>' +
      '<div class="dow"><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span></div><div class="days">';

    for (let i = 0; i < firstDow; i++) html += '<div class="day off"></div>';
    for (let d = 1; d <= daysIn; d++) {
      const iso = y + '-' + String(m + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
      const past = iso < today;
      const free = past ? 0 : SC.freeCount(iso, false);
      const fleet = SC.fleetSize(false);
      let cls = 'day', av = '';
      if (past) cls += ' off';
      else if (free === 0) cls += ' full';
      else if (free === 1) av = '<span class="av lo">Low</span>';
      else av = '<span class="av hi">' + free + ' free</span>';
      if (iso === today) cls += ' today';
      if (state.start && iso === state.start) cls += ' sel';
      if (state.end && iso === state.end) cls += ' sel';
      if (state.start && state.end && iso > state.start && iso < state.end) cls += ' inrange';
      html += '<div class="' + cls + '" data-iso="' + iso + '"><span>' + d + '</span>' + av + '</div>';
    }
    html += '</div>';
    root.innerHTML = html;

    root.querySelectorAll('[data-nav]').forEach(b => b.addEventListener('click', () => {
      state.calOffset = Math.max(0, state.calOffset + Number(b.dataset.nav));
      renderCalendars();
    }));
    root.querySelectorAll('.day[data-iso]').forEach(cell => {
      if (cell.classList.contains('off') || cell.classList.contains('full')) return;
      cell.addEventListener('click', () => pickDate(cell.dataset.iso));
    });
  }

  function pickDate(iso) {
    if (!state.start || (state.start && state.end)) {
      state.start = iso; state.end = null;
    } else if (iso <= state.start) {
      state.start = iso;
    } else {
      /* validate every hire day in [start, iso) has a free trailer */
      if (!SC.findFreeUnit(state.start, iso, false)) {
        flashDates('Some of those days are booked out — try a shorter range or different dates.', 'warn');
        state.start = iso; state.end = null;
        renderCalendars(); renderSummary(); return;
      }
      state.end = iso;
    }
    afterDateChange();
  }

  function afterDateChange() {
    state.days = (state.start && state.end) ? SC.diffDays(state.start, state.end) : 0;
    const longTerm = state.days > P.longTermDays;
    $('longTermPanel').style.display = longTerm ? 'block' : 'none';
    $('toStep2').disabled = !(state.start && state.end) || longTerm;

    if (state.start && state.end && !longTerm) {
      const rp = SC.rentalPriceFor(state.days, state.start);
      flashDates('<strong>' + SC.fmtDate(state.start) + ' &rarr; ' + SC.fmtDate(state.end) + '</strong> &middot; ' +
        state.days + ' day' + (state.days > 1 ? 's' : '') + ' &middot; ' + rp.label + ' = <strong>' + money(rp.price) + '</strong>' +
        (rp.saving > 0 ? ' <span class="s-saving">(you save ' + money(rp.saving) + ')</span>' : ''), 'info');
    } else if (state.start && !state.end) {
      flashDates('Start day selected: <strong>' + SC.fmtDate(state.start) + '</strong>. Now choose your return day.', 'info');
    } else {
      $('dateSummary').style.display = 'none';
    }
    /* rails choice may no longer be valid for new dates */
    if (state.rails && state.start && state.end && !SC.findFreeUnit(state.start, state.end, true)) state.rails = false;
    renderCalendars();
    renderSummary();
  }

  function flashDates(html, kind) {
    $('dateSummary').style.display = 'block';
    const el = $('dateSummaryInner');
    el.className = 'notice ' + (kind || 'info');
    el.innerHTML = I(kind === 'warn' ? 'alert' : 'calendar', 20) + '<div>' + html + '</div>';
  }

  /* ================= long-term quote ================= */
  function submitQuote() {
    const name = $('qtName').value.trim(), phone = $('qtPhone').value.trim(), email = $('qtEmail').value.trim();
    if (!name || !phone || !email) { alert('Please fill in your name, phone and email so we can come back to you.'); return; }
    SC.addQuote({
      id: SC.newQuoteRef(), name, email, phone,
      start: state.start, days: state.days,
      message: $('qtMsg').value.trim() || ('Long-term hire, ' + state.days + ' days from ' + SC.fmtDate(state.start)),
      status: 'new', created: SC.todayISO()
    });
    $('qtDone').style.display = 'flex';
    $('qtSubmit').disabled = true;
  }

  /* ================= trailer & add-ons ================= */
  function renderTrailerChoices() {
    const stdFree = SC.getUnits().filter(u => u.status === 'active' && !u.rails && SC.unitFree(u.id, state.start, state.end)).length;
    const railsFree = SC.getUnits().filter(u => u.status === 'active' && u.rails && SC.unitFree(u.id, state.start, state.end)).length;
    const railsOk = railsFree > 0;

    $('trailerChoices').innerHTML =
      '<label class="choice' + (!state.rails ? ' selected' : '') + '" id="chStd">' +
        '<input type="radio" name="trailer" value="std"' + (!state.rails ? ' checked' : '') + '>' +
        '<span class="c-check">' + I('check', 15) + '</span>' +
        '<div class="c-head"><span class="c-title">Standard coldroom trailer</span><span class="c-price">Included</span></div>' +
        '<p>Solar panels, battery bank, 24V DC refrigeration, LED lighting, non-slip floor and security lock. Holds a steady 2&deg;C.</p>' +
        '<div style="margin-top:12px"><span class="pill ' + (stdFree > 1 ? 'good' : 'warn') + '">' + stdFree + ' available for your dates</span></div>' +
      '</label>' +
      '<label class="choice' + (state.rails ? ' selected' : '') + (railsOk ? '' : ' disabled') + '" id="chRails">' +
        '<input type="radio" name="trailer" value="rails"' + (state.rails ? ' checked' : '') + (railsOk ? '' : ' disabled') + '>' +
        '<span class="c-check">' + I('check', 15) + '</span>' +
        '<div class="c-head"><span class="c-title">Trailer with meat rails</span><span class="c-price">+ ' + money(P.railsFee) + ' per hire</span></div>' +
        '<p>Everything in the standard trailer, plus rails and hooks for hanging carcasses after a kill &mdash; cool it down before you cut, bag and freeze.</p>' +
        '<div style="margin-top:12px"><span class="pill ' + (railsOk ? 'good' : 'bad') + '">' + (railsOk ? railsFree + ' available for your dates' : 'Booked out for your dates') + '</span></div>' +
      '</label>';

    $('chStd').addEventListener('click', () => { state.rails = false; renderTrailerChoices(); renderSummary(); });
    if (railsOk) $('chRails').addEventListener('click', () => { state.rails = true; renderTrailerChoices(); renderSummary(); });
  }

  function renderAddons() {
    let html = '';
    Object.keys(P.addons).forEach(k => {
      const a = P.addons[k];
      html += '<label class="addon' + (state.addons.includes(k) ? ' selected' : '') + '" data-k="' + k + '">' +
        '<input type="checkbox"' + (state.addons.includes(k) ? ' checked' : '') + '>' +
        '<div class="a-body"><div class="a-title">' + a.label + '</div><div class="a-desc">' + a.desc + '</div></div>' +
        '<span class="a-price">+ ' + money(a.price) + '</span></label>';
    });
    $('addonList').innerHTML = html;
    document.querySelectorAll('#addonList .addon').forEach(row => {
      row.addEventListener('change', () => {
        const k = row.dataset.k;
        if (row.querySelector('input').checked) { if (!state.addons.includes(k)) state.addons.push(k); }
        else state.addons = state.addons.filter(x => x !== k);
        row.classList.toggle('selected', row.querySelector('input').checked);
        renderSummary();
      });
    });
  }

  /* ================= fulfilment ================= */
  function setFulfil(mode) {
    state.fulfil = mode;
    $('chPickup').classList.toggle('selected', mode === 'pickup');
    $('chDelivery').classList.toggle('selected', mode === 'delivery');
    $('deliveryForm').style.display = mode === 'delivery' ? 'block' : 'none';
    renderSummary();
  }

  function calcDelivery() {
    const q = $('delivAddress').value.trim();
    if (!q) { alert('Enter your delivery suburb or address first.'); return; }
    const hit = SC.distances.find(d => d[0].toLowerCase().includes(q.toLowerCase()) || q.toLowerCase().includes(d[0].split(' ')[0].toLowerCase()));
    const km = hit ? hit[1] : 45;
    state.address = hit ? hit[0] : q;
    state.km = km;
    state.delivCalculated = true;
    state.delivOk = km <= P.deliveryMaxKm;

    if (!state.delivOk) {
      $('delivResult').style.display = 'none';
      $('delivTooFar').style.display = 'flex';
    } else {
      const leg = SC.legFee(km);
      $('delivTooFar').style.display = 'none';
      $('delivResult').style.display = 'block';
      $('delivResult').innerHTML =
        '<div class="d-row"><span>' + (hit ? 'Distance from our workshop' : 'Estimated distance (we\'ll confirm)') + '</span><strong>' + km + ' km</strong></div>' +
        '<div class="d-row"><span>Delivery to site (' + money(P.deliveryPerKm) + '/km, min ' + money(P.deliveryMinLeg) + ')</span><strong>' + money(leg) + '</strong></div>' +
        '<div class="d-row"><span>Collection at end of hire</span><strong>' + money(leg) + '</strong></div>' +
        '<div class="d-row" style="border-top:1px dashed var(--line-strong);margin-top:8px;padding-top:10px"><span><strong>Total delivery &amp; collection</strong></span><strong style="color:var(--orange-dark)">' + money(leg * 2) + '</strong></div>';
    }
    renderSummary();
  }

  /* ================= totals ================= */
  function total() {
    const out = { rental: 0, rentalLabel: '', saving: 0, rails: 0, addons: [], delivery: 0, total: 0 };
    if (state.start && state.end) {
      const rp = SC.rentalPriceFor(state.days, state.start);
      out.rental = rp.price; out.rentalLabel = rp.label; out.saving = rp.saving;
    }
    if (state.rails) out.rails = P.railsFee;
    state.addons.forEach(k => out.addons.push({ label: P.addons[k].label, price: P.addons[k].price }));
    if (state.fulfil === 'delivery' && state.delivCalculated && state.delivOk) out.delivery = SC.legFee(state.km) * 2;
    out.total = out.rental + out.rails + out.addons.reduce((s, a) => s + a.price, 0) + out.delivery;
    return out;
  }

  /* ================= summary aside ================= */
  function renderSummary() {
    const el = $('summaryBody');
    if (!state.start) { el.innerHTML = '<div class="s-empty">Select your dates to get started</div>'; return; }
    const t = total();
    let html = '';
    html += row('Start', state.start ? SC.fmtDate(state.start) + ', ' + state.time : '—');
    html += row('Return', state.end ? SC.fmtDate(state.end) + ', by ' + state.time : 'Choose return day');
    if (state.days) html += row('Duration', state.days + ' day' + (state.days > 1 ? 's' : ''));
    html += row('Trailer', state.rails ? 'With meat rails' : 'Standard coldroom');
    html += row('Handover', state.fulfil === 'delivery' ? 'Delivery' + (state.address ? ' — ' + state.address : '') : 'Pickup — Gold Coast workshop');
    if (t.rental) {
      html += '<div class="s-row line"><span class="k">' + t.rentalLabel + '</span><span class="v">' + money(t.rental) + '</span></div>';
      if (t.saving > 0) html += '<div class="s-row"><span class="k">Package saving</span><span class="v s-saving">&ndash; you save ' + money(t.saving) + '</span></div>';
    }
    if (t.rails) html += row('Meat rails', money(t.rails));
    t.addons.forEach(a => { html += row(a.label, money(a.price)); });
    if (state.fulfil === 'delivery') html += row('Delivery & collection', t.delivery ? money(t.delivery) : (state.delivCalculated && !state.delivOk ? 'Needs quote' : 'Calculate in step 3'));
    html += '<div class="s-row total line"><span class="k">Total to pay</span><span class="v">' + money(t.total) + '</span></div>';
    html += '<div class="s-note">' + I('shieldCheck', 16) + '<span>Plus a <strong>' + money(P.bond) + ' refundable bond</strong> at handover &mdash; not charged online.</span></div>';
    el.innerHTML = html;

    function row(k, v) { return '<div class="s-row"><span class="k">' + k + '</span><span class="v">' + v + '</span></div>'; }
  }

  /* ================= step validation ================= */
  function tryStep4() {
    if (state.fulfil === 'delivery') {
      if (!state.delivCalculated) { alert('Please calculate your delivery fee first, so your total is exact.'); return; }
      if (!state.delivOk) { alert('That address is beyond our standard delivery range. Choose pickup, or contact us for a custom delivery quote.'); return; }
    }
    go(4);
  }

  function renderReview() {
    const t = total();
    let html = '<div class="deliv-result" style="margin-top:0">';
    html += drow('Hire period', SC.fmtDate(state.start) + ', ' + state.time + ' &rarr; ' + SC.fmtDate(state.end) + ', by ' + state.time + ' (' + state.days + ' day' + (state.days > 1 ? 's' : '') + ')');
    html += drow('Trailer', state.rails ? 'Coldroom trailer with meat rails' : 'Standard coldroom trailer');
    html += drow('Extras', t.addons.length ? t.addons.map(a => a.label).join(', ') : 'None');
    html += drow('Handover', state.fulfil === 'delivery' ? 'Delivered to ' + state.address + ' (' + state.km + ' km)' : 'Pickup from our Gold Coast workshop');
    html += drow('Rental', t.rentalLabel + ' — ' + money(t.rental) + (t.saving ? ' (saving ' + money(t.saving) + ')' : ''));
    if (t.rails) html += drow('Meat rails', money(t.rails));
    t.addons.forEach(a => { html += drow(a.label, money(a.price)); });
    if (t.delivery) html += drow('Delivery & collection', money(t.delivery));
    html += '<div class="d-row" style="border-top:1px dashed var(--line-strong);margin-top:8px;padding-top:10px"><span><strong>Total payable today</strong></span><strong style="color:var(--orange-dark);font-size:18px">' + money(t.total) + '</strong></div>';
    html += '</div>';
    $('reviewBox').innerHTML = html;
    $('bondAmt').textContent = money(P.bond);
    function drow(k, v) { return '<div class="d-row"><span>' + k + '</span><strong style="text-align:right">' + v + '</strong></div>'; }
  }

  function tryStep5() {
    const name = $('acName').value.trim(), phone = $('acPhone').value.trim(),
      email = $('acEmail').value.trim(), pass = $('acPass').value.trim();
    if (!name || !phone || !email || !pass) { alert('Please complete your account details — name, mobile, email and password.'); return; }
    if (!$('agreeTerms').checked) { alert('Please accept the hire agreement to continue.'); return; }
    SC.saveUser({ name, phone, email });
    go(5);
  }

  /* ================= payment & confirmation ================= */
  function pay() {
    if (!$('ccName').value.trim() || $('ccNum').value.replace(/\s/g, '').length < 12 || !$('ccExp').value.trim() || !$('ccCvc').value.trim()) {
      alert('Please complete the card details. (This is a demo — any test values work, e.g. 4242 4242 4242 4242.)');
      return;
    }
    const btn = $('payBtn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span>&nbsp; Processing payment&hellip;';
    setTimeout(finishBooking, 1700);
  }

  function finishBooking() {
    const t = total();
    const unit = SC.findFreeUnit(state.start, state.end, state.rails);
    const user = SC.getUser();
    const ref = SC.newRef();
    const booking = {
      ref,
      customer: { name: user.name, email: user.email, phone: user.phone },
      start: state.start, end: state.end, days: state.days,
      time: state.time,
      unitId: unit ? unit.id : 'SC-01',
      rails: state.rails, addons: state.addons.slice(),
      fulfil: state.fulfil, address: state.fulfil === 'delivery' ? state.address : null,
      km: state.fulfil === 'delivery' ? state.km : 0,
      payment: 'paid', status: 'confirmed', source: 'online',
      charges: { rental: t.rental, railsFee: t.rails, addons: t.addons.reduce((s, a) => s + a.price, 0), delivery: t.delivery, total: t.total },
      created: SC.todayISO()
    };
    SC.addBooking(booking);

    $('payBox').style.display = 'none';
    $('confBox').style.display = 'block';
    $('confRef').textContent = ref;
    $('confEmail').textContent = booking.customer.email;
    $('confInvoice').href = 'invoice.html?ref=' + encodeURIComponent(ref);
    $('confGrid').innerHTML =
      tile('Hire period', SC.fmtShort(state.start) + ' &rarr; ' + SC.fmtShort(state.end) + ' (' + state.days + ' day' + (state.days > 1 ? 's' : '') + ')') +
      tile('Trailer', (state.rails ? 'Meat rails — ' : 'Standard — ') + (unit ? unit.id : '')) +
      tile('Handover', state.fulfil === 'delivery' ? 'Delivery to ' + state.address : 'Pickup, Gold Coast workshop') +
      tile('Paid via Stripe', money(t.total));
    $('confNext').innerHTML = state.fulfil === 'delivery'
      ? 'We\'ll deliver your trailer to <strong>' + state.address + '</strong> on <strong>' + SC.fmtDate(state.start) + '</strong> around ' + state.time + ', and collect it on ' + SC.fmtDate(state.end) + '.'
      : 'Collect your trailer from our Gold Coast workshop on <strong>' + SC.fmtDate(state.start) + '</strong> at ' + state.time + ' — we\'ll have it cold and ready, and walk you through the full handover.';
    window.scrollTo({ top: 220, behavior: 'smooth' });

    function tile(t2, d) { return '<div class="conf-tile"><div class="t">' + t2 + '</div><div class="d">' + d + '</div></div>'; }
  }
})();
