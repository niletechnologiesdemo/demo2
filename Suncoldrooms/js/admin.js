/* ============================================================
   Suncool Coldrooms — owner console logic
   ============================================================ */
(function () {
  const $ = id => document.getElementById(id);
  const money = SC.money;
  const TODAY = SC.todayISO();
  let calMonth = 7; // 0-indexed; August
  let calYear = 2026;
  let selectedDay = null;
  const quoteStatusOverride = {};

  const TITLES = {
    dashboard: ['Dashboard', 'Thursday 13 August 2026 · Suncool Coldrooms rentals at a glance'],
    calendar: ['Availability Calendar', 'Every trailer, every day — bookings, turnaround buffers and maintenance'],
    bookings: ['Bookings', 'Online and phone bookings in one place'],
    quotes: ['Quote Requests', 'Long-term hires steered to custom pricing'],
    fleet: ['Fleet Management', 'Add trailers, or pull one out for maintenance'],
    pricing: ['Pricing & Rules', 'Rates, extras, delivery and booking rules']
  };

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    document.querySelectorAll('#admNav button').forEach(b => b.addEventListener('click', () => showSec(b.dataset.sec)));
    $('resetDemo').addEventListener('click', e => { e.preventDefault(); SC.resetDemo(); location.reload(); });
    $('calPrev').addEventListener('click', () => moveMonth(-1));
    $('calNext').addEventListener('click', () => moveMonth(1));

    /* bookings */
    ['bkSearch', 'bkFilter', 'bkSource'].forEach(id => $(id).addEventListener('input', renderBookings));
    $('newManualBk').addEventListener('click', openManual);
    ['mbStart', 'mbEnd', 'mbRails', 'mbFulfil', 'mbAddr'].forEach(id => $(id).addEventListener('input', manualPrice));
    $('mbFulfil').addEventListener('change', () => { $('mbAddrRow').style.display = $('mbFulfil').value === 'delivery' ? 'block' : 'none'; manualPrice(); });
    $('mbSave').addEventListener('click', saveManual);

    /* fleet */
    $('addUnitBtn').addEventListener('click', () => { $('nuName').value = nextUnitName(); $('unitModal').classList.add('open'); });
    $('nuSave').addEventListener('click', saveUnit);

    /* pricing */
    $('savePricing').addEventListener('click', savePricing);
    $('revertPricing').addEventListener('click', () => { localStorage.removeItem(SC.LS.pricing); renderPricing(); toast('Pricing reverted to defaults'); });

    renderAll();
  }

  function renderAll() {
    renderDashboard(); renderCalendar(); renderBookings(); renderQuotes(); renderFleet(); renderPricing();
    const fresh = SC.getQuotes().filter(q => (quoteStatusOverride[q.id] || q.status) === 'new').length;
    $('quoteBadge').textContent = fresh || '';
    $('quoteBadge').style.display = fresh ? '' : 'none';
  }

  function showSec(sec) {
    document.querySelectorAll('#admNav button').forEach(b => b.classList.toggle('active', b.dataset.sec === sec));
    document.querySelectorAll('.adm-section').forEach(s => s.classList.remove('active'));
    $('sec-' + sec).classList.add('active');
    $('secTitle').textContent = TITLES[sec][0];
    $('secSub').innerHTML = TITLES[sec][1];
  }

  function toast(msg) {
    const t = $('toast');
    t.innerHTML = I('checkCircle', 18) + '<span>' + msg + '</span>';
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* ================= dashboard ================= */
  function onHireCount(dateISO) {
    return SC.getBookings().filter(b => b.status !== 'cancelled' && b.start <= dateISO && dateISO < b.end).length;
  }

  function renderDashboard() {
    const all = SC.getBookings().filter(b => b.status !== 'cancelled');
    const aug = all.filter(b => b.start >= '2026-08-01' && b.start <= '2026-08-31');
    const augRev = aug.reduce((s, b) => s + b.charges.total, 0);
    const fleet = SC.fleetSize(false) + SC.getUnits().filter(u => u.status !== 'active').length;
    const activeFleet = SC.fleetSize(false);

    /* utilisation next 14 days */
    let hireDays = 0;
    for (let i = 0; i < 14; i++) hireDays += onHireCount(SC.addDays(TODAY, i));
    const util = activeFleet ? Math.round(hireDays / (activeFleet * 14) * 100) : 0;

    const week = all.filter(b => (b.start >= TODAY && b.start <= SC.addDays(TODAY, 6)) || (b.end >= TODAY && b.end <= SC.addDays(TODAY, 6)));

    $('kpiGrid').innerHTML =
      kpi('August bookings', aug.length, aug.filter(b => b.source === 'online').length + ' booked online', 'calendar', '') +
      kpi('August revenue', money(augRev), 'paid via Stripe + phone bookings', 'dollar', 'orange') +
      kpi('Fleet utilisation', util + '%', 'next 14 days · ' + activeFleet + ' of ' + fleet + ' trailers active', 'truck', '') +
      kpi('Handovers this week', week.length, 'pickups, deliveries & returns', 'clock', 'orange');

    $('fleetCap').textContent = activeFleet;
    renderOccChart(activeFleet);
    renderRevChart();
    renderHandovers();

    function kpi(l, n, sub, icon, cls) {
      return '<div class="kpi ' + cls + '"><div class="k-top"><span class="k-label">' + l + '</span><span class="k-icon">' + I(icon, 19) + '</span></div><div class="k-num">' + n + '</div><div class="k-sub">' + sub + '</div></div>';
    }
  }

  /* --- occupancy bar chart, next 14 days --- */
  function renderOccChart(cap) {
    const W = 520, H = 210, padL = 30, padB = 26, padT = 12;
    const bw = (W - padL - 8) / 14;
    const max = Math.max(cap, 1);
    let bars = '', grid = '', labels = '';
    for (let g = 0; g <= max; g++) {
      const y = padT + (H - padT - padB) * (1 - g / max);
      grid += '<line x1="' + padL + '" y1="' + y + '" x2="' + W + '" y2="' + y + '" stroke="#E2EAF1" stroke-width="1"/>' +
              '<text x="' + (padL - 8) + '" y="' + (y + 4) + '" text-anchor="end" font-size="10" fill="#8FA1B0">' + g + '</text>';
    }
    const data = [];
    for (let i = 0; i < 14; i++) {
      const d = SC.addDays(TODAY, i);
      data.push({ d, n: onHireCount(d) });
    }
    data.forEach((pt, i) => {
      const x = padL + i * bw + 3;
      const h = (H - padT - padB) * (pt.n / max);
      const y = H - padB - h;
      const dt = SC.parse(pt.d);
      if (pt.n > 0) bars += '<rect class="bar" data-tip="' + SC.fmtShort(pt.d) + ': <strong>' + pt.n + ' of ' + cap + '</strong> on hire" x="' + x + '" y="' + y + '" width="' + (bw - 6) + '" height="' + h + '" rx="4" fill="#1B75BC"/>';
      else bars += '<rect class="bar" data-tip="' + SC.fmtShort(pt.d) + ': all free" x="' + x + '" y="' + (H - padB - 3) + '" width="' + (bw - 6) + '" height="3" rx="1.5" fill="#CBD8E2"/>';
      if (i % 2 === 0) labels += '<text x="' + (x + (bw - 6) / 2) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="10" fill="#8FA1B0">' + dt.getDate() + '/' + (dt.getMonth() + 1) + '</text>';
    });
    $('occChart').innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '">' + grid + bars + labels + '</svg><div class="chart-tip" id="occTip"></div>';
    hookTips($('occChart'), 'occTip');
  }

  /* --- weekly revenue bars --- */
  function renderRevChart() {
    const weeks = [];
    let ws = '2026-07-13';
    for (let i = 0; i < 9; i++) { weeks.push(ws); ws = SC.addDays(ws, 7); }
    const all = SC.getBookings().filter(b => b.status !== 'cancelled');
    const data = weeks.map(w => {
      const we = SC.addDays(w, 7);
      const rev = all.filter(b => b.start >= w && b.start < we).reduce((s, b) => s + b.charges.total, 0);
      return { w, rev };
    });
    const W = 520, H = 210, padL = 46, padB = 26, padT = 12;
    const bw = (W - padL - 8) / data.length;
    const max = Math.max(...data.map(d => d.rev), 500);
    const steps = 4;
    let grid = '', bars = '', labels = '';
    for (let g = 0; g <= steps; g++) {
      const v = max / steps * g;
      const y = padT + (H - padT - padB) * (1 - g / steps);
      grid += '<line x1="' + padL + '" y1="' + y + '" x2="' + W + '" y2="' + y + '" stroke="#E2EAF1" stroke-width="1"/>' +
              '<text x="' + (padL - 8) + '" y="' + (y + 4) + '" text-anchor="end" font-size="10" fill="#8FA1B0">$' + (v >= 1000 ? (v / 1000).toFixed(1) + 'k' : Math.round(v)) + '</text>';
    }
    data.forEach((pt, i) => {
      const x = padL + i * bw + 4;
      const h = (H - padT - padB) * (pt.rev / max);
      const y = H - padB - h;
      const cur = TODAY >= pt.w && TODAY < SC.addDays(pt.w, 7);
      if (pt.rev > 0) bars += '<rect class="bar" data-tip="Week of ' + SC.fmtShort(pt.w) + ': <strong>' + money(pt.rev) + '</strong>" x="' + x + '" y="' + y + '" width="' + (bw - 8) + '" height="' + h + '" rx="4" fill="' + (cur ? '#F58220' : '#1B75BC') + '"/>';
      else bars += '<rect class="bar" data-tip="Week of ' + SC.fmtShort(pt.w) + ': no bookings" x="' + x + '" y="' + (H - padB - 3) + '" width="' + (bw - 8) + '" height="3" rx="1.5" fill="#CBD8E2"/>';
      labels += '<text x="' + (x + (bw - 8) / 2) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="9.5" fill="#8FA1B0">' + SC.fmtShort(pt.w) + '</text>';
    });
    $('revChart').innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '">' + grid + bars + labels +
      '<g><rect x="' + (W - 150) + '" y="2" width="10" height="10" rx="3" fill="#F58220"/><text x="' + (W - 135) + '" y="11" font-size="10" fill="#5B6C7C">current week</text></g></svg><div class="chart-tip" id="revTip"></div>';
    hookTips($('revChart'), 'revTip');
  }

  function hookTips(wrap, tipId) {
    const tip = document.getElementById(tipId);
    wrap.querySelectorAll('.bar').forEach(b => {
      b.addEventListener('mousemove', e => {
        const r = wrap.getBoundingClientRect();
        tip.innerHTML = b.dataset.tip;
        tip.style.left = (e.clientX - r.left) + 'px';
        tip.style.top = (e.clientY - r.top - 6) + 'px';
        tip.style.opacity = 1;
      });
      b.addEventListener('mouseleave', () => { tip.style.opacity = 0; });
    });
  }

  /* --- handover table --- */
  function renderHandovers() {
    const events = [];
    SC.getBookings().filter(b => b.status !== 'cancelled').forEach(b => {
      if (b.start >= TODAY && b.start <= SC.addDays(TODAY, 6)) {
        events.push({ date: b.start, type: b.fulfil === 'delivery' ? 'Deliver to site' : 'Customer pickup', b });
      }
      if (b.end >= TODAY && b.end <= SC.addDays(TODAY, 6)) {
        events.push({ date: b.end, type: b.fulfil === 'delivery' ? 'Collect from site' : 'Customer return', b });
      }
    });
    events.sort((a, b2) => a.date < b2.date ? -1 : 1);
    let html = '<thead><tr><th>Date</th><th>Event</th><th>Customer</th><th>Trailer</th><th>Where</th><th>Amount</th></tr></thead><tbody>';
    if (!events.length) html += '<tr><td colspan="6" style="color:var(--faint);text-align:center;padding:26px">No handovers in the next 7 days</td></tr>';
    events.forEach(ev => {
      const out = ev.type.indexOf('Deliver') === 0 || ev.type.indexOf('pickup') > 0;
      html += '<tr onclick="ADM.detail(\'' + ev.b.ref + '\')">' +
        '<td><strong>' + SC.fmtShort(ev.date) + '</strong><div class="sub">' + (ev.b.time || '9:00 am') + '</div></td>' +
        '<td><span class="pill ' + (out ? 'orange' : 'blue') + '">' + ev.type + '</span></td>' +
        '<td class="cust">' + ev.b.customer.name + '<div class="sub">' + ev.b.customer.phone + '</div></td>' +
        '<td>' + ev.b.unitId + (ev.b.rails ? '<div class="sub">meat rails</div>' : '') + '</td>' +
        '<td>' + (ev.b.fulfil === 'delivery' ? (ev.b.address || 'On site') : 'Workshop') + '</td>' +
        '<td>' + money(ev.b.charges.total) + '</td></tr>';
    });
    $('handoverTable').innerHTML = html + '</tbody>';
  }

  /* ================= calendar ================= */
  function moveMonth(dir) {
    calMonth += dir;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    if (calMonth < 0) { calMonth = 11; calYear--; }
    selectedDay = null; $('calDayDetail').style.display = 'none';
    renderCalendar();
  }

  function renderCalendar() {
    $('calMonthLabel').textContent = new Date(calYear, calMonth, 1).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });
    const firstDow = (new Date(calYear, calMonth, 1).getDay() + 6) % 7;
    const daysIn = new Date(calYear, calMonth + 1, 0).getDate();
    const units = SC.getUnits();
    const activeUnits = units.filter(u => u.status === 'active');
    const maintUnits = units.filter(u => u.status !== 'active');
    let html = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => '<div class="dw">' + d + '</div>').join('');
    for (let i = 0; i < firstDow; i++) html += '<div class="dc off"></div>';
    for (let d = 1; d <= daysIn; d++) {
      const iso = calYear + '-' + String(calMonth + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
      const onHire = onHireCount(iso);
      const free = Math.max(0, activeUnits.length - onHire);
      let load = '';
      if (onHire === 0) load = '<span class="lb free">' + free + ' free</span>';
      else if (free === 0) load = '<span class="lb full">Booked out</span>';
      else load = '<span class="lb part">' + onHire + ' on hire</span><span class="lb free">' + free + ' free</span>';
      if (maintUnits.length) load += '<span class="lb maint">' + maintUnits.length + ' maint.</span>';
      html += '<div class="dc' + (iso === TODAY ? ' today' : '') + (iso === selectedDay ? ' sel' : '') + '" data-iso="' + iso + '"><span class="dn">' + d + '</span><div class="load">' + load + '</div></div>';
    }
    $('admCal').innerHTML = html;
    $('admCal').querySelectorAll('.dc[data-iso]').forEach(c => c.addEventListener('click', () => showDay(c.dataset.iso)));
  }

  function showDay(iso) {
    selectedDay = iso;
    renderCalendar();
    const list = SC.getBookings().filter(b => b.status !== 'cancelled' && b.start <= iso && iso <= b.end);
    let html = '<div class="p-head"><h2>' + SC.fmtDate(iso) + '</h2><span class="hint">' + list.length + ' booking' + (list.length === 1 ? '' : 's') + ' touching this day</span></div>';
    if (!list.length) html += '<p style="color:var(--faint);padding:8px 0 4px">No bookings — all active trailers free.</p>';
    else {
      html += '<div style="overflow-x:auto"><table class="adm-table"><thead><tr><th>Ref</th><th>Customer</th><th>Hire</th><th>Trailer</th><th>Handover</th><th>Status</th></tr></thead><tbody>';
      list.forEach(b => {
        const isStart = b.start === iso, isEnd = b.end === iso;
        html += '<tr onclick="ADM.detail(\'' + b.ref + '\')"><td><strong>' + b.ref + '</strong></td>' +
          '<td class="cust">' + b.customer.name + '</td>' +
          '<td>' + SC.fmtShort(b.start) + ' &rarr; ' + SC.fmtShort(b.end) + (isStart ? ' <span class="pill orange">starts</span>' : isEnd ? ' <span class="pill blue">returns</span>' : '') + '</td>' +
          '<td>' + b.unitId + (b.rails ? '<div class="sub">meat rails</div>' : '') + '</td>' +
          '<td>' + (b.fulfil === 'delivery' ? 'Delivery' : 'Pickup') + '</td>' +
          '<td>' + statusPill(b) + '</td></tr>';
      });
      html += '</tbody></table></div>';
      html += '<div class="notice info" style="margin-top:16px">' + I('clock', 18) + '<div>A <strong>' + SC.getPricing().bufferHours + '-hour turnaround buffer</strong> is held after each return for cleaning and checks before the next hire can start.</div></div>';
    }
    $('calDayDetail').style.display = 'block';
    $('calDayDetail').innerHTML = html;
  }

  /* ================= bookings ================= */
  function statusPill(b) {
    if (b.status === 'completed') return '<span class="pill gray">Completed</span>';
    if (b.status === 'active' || (b.start <= TODAY && TODAY < b.end)) return '<span class="pill blue">On hire</span>';
    return '<span class="pill good">Confirmed</span>';
  }
  function payPill(b) {
    if (b.payment === 'paid') return '<span class="pill good">Paid</span>';
    if (b.payment === 'cash') return '<span class="pill blue">Cash</span>';
    return '<span class="pill warn">Pending</span>';
  }

  function renderBookings() {
    const q = ($('bkSearch').value || '').toLowerCase();
    const st = $('bkFilter').value, src = $('bkSource').value;
    let list = SC.getBookings().filter(b => b.status !== 'cancelled').slice().reverse();
    if (st) list = list.filter(b => st === 'active' ? (b.status === 'active' || (b.start <= TODAY && TODAY < b.end)) : b.status === st);
    if (src) list = list.filter(b => b.source === src);
    if (q) list = list.filter(b => (b.customer.name + ' ' + b.ref + ' ' + (b.address || '')).toLowerCase().includes(q));

    let html = '<thead><tr><th>Ref</th><th>Customer</th><th>Hire dates</th><th>Trailer</th><th>Handover</th><th>Source</th><th>Payment</th><th>Status</th><th>Total</th></tr></thead><tbody>';
    if (!list.length) html += '<tr><td colspan="9" style="text-align:center;color:var(--faint);padding:30px">No bookings match</td></tr>';
    list.forEach(b => {
      html += '<tr onclick="ADM.detail(\'' + b.ref + '\')">' +
        '<td><strong>' + b.ref + '</strong></td>' +
        '<td class="cust">' + b.customer.name + '<div class="sub">' + b.customer.phone + '</div></td>' +
        '<td>' + SC.fmtShort(b.start) + ' &rarr; ' + SC.fmtShort(b.end) + '<div class="sub">' + b.days + ' day' + (b.days > 1 ? 's' : '') + '</div></td>' +
        '<td>' + b.unitId + (b.rails ? '<div class="sub">meat rails</div>' : '') + '</td>' +
        '<td>' + (b.fulfil === 'delivery' ? 'Delivery<div class="sub">' + (b.address || '') + '</div>' : 'Pickup') + '</td>' +
        '<td><span class="pill ' + (b.source === 'online' ? 'blue' : 'gray') + '">' + (b.source === 'online' ? 'Online' : 'Phone') + '</span></td>' +
        '<td>' + payPill(b) + '</td>' +
        '<td>' + statusPill(b) + '</td>' +
        '<td><strong>' + money(b.charges.total) + '</strong></td></tr>';
    });
    $('bkTable').innerHTML = html + '</tbody>';
  }

  window.ADM = window.ADM || {};
  ADM.detail = function (ref) {
    const b = SC.getBookings().find(x => x.ref === ref);
    if (!b) return;
    const P = SC.getPricing();
    $('dtTitle').textContent = b.ref;
    let rows = '';
    rows += r('Customer', b.customer.name + ' · ' + b.customer.phone + (b.customer.email ? '<br>' + b.customer.email : ''));
    rows += r('Hire period', SC.fmtDate(b.start) + ' &rarr; ' + SC.fmtDate(b.end) + ' (' + b.days + ' day' + (b.days > 1 ? 's' : '') + ', handover ' + (b.time || '9:00 am') + ')');
    rows += r('Trailer', b.unitId + (b.rails ? ' — fitted with meat rails' : ' — standard'));
    if (b.addons && b.addons.length) rows += r('Extras', b.addons.map(k => P.addons[k] ? P.addons[k].label : k).join(', '));
    rows += r('Handover', b.fulfil === 'delivery' ? 'Delivery to ' + (b.address || 'site') + (b.km ? ' (' + b.km + ' km each way)' : '') : 'Pickup from workshop');
    rows += r('Charges', 'Rental ' + money(b.charges.rental) +
      (b.charges.railsFee ? ' · Rails ' + money(b.charges.railsFee) : '') +
      (b.charges.addons ? ' · Extras ' + money(b.charges.addons) : '') +
      (b.charges.delivery ? ' · Delivery ' + money(b.charges.delivery) : '') +
      ' · <strong>Total ' + money(b.charges.total) + '</strong>');
    rows += r('Payment / status', payPill(b) + ' ' + statusPill(b) + ' <span class="pill ' + (b.source === 'online' ? 'blue' : 'gray') + '">' + (b.source === 'online' ? 'Booked online' : 'Manual entry') + '</span>');
    $('dtBody').innerHTML = '<div class="deliv-result" style="margin:0 0 18px">' + rows + '</div>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
      '<a class="btn btn-ghost btn-sm" href="invoice.html?ref=' + encodeURIComponent(b.ref) + '">' + I('doc', 15) + 'View invoice</a>' +
      '<button class="btn btn-ghost btn-sm" onclick="document.getElementById(\'detailModal\').classList.remove(\'open\')">Close</button></div>';
    $('detailModal').classList.add('open');
    function r(k, v) { return '<div class="d-row" style="align-items:flex-start"><span style="flex:none;width:130px;color:var(--muted)">' + k + '</span><span style="text-align:right">' + v + '</span></div>'; }
  };

  /* --- manual booking --- */
  function openManual() {
    $('manualModal').classList.add('open');
    manualPrice();
  }

  function manualCharges() {
    const start = $('mbStart').value, end = $('mbEnd').value;
    if (!start || !end || end <= start) return null;
    const days = SC.diffDays(start, end);
    const P = SC.getPricing();
    const rails = $('mbRails').value === '1';
    const rp = SC.rentalPriceFor(days, start);
    let delivery = 0, km = 0, address = null;
    if ($('mbFulfil').value === 'delivery') {
      const q = ($('mbAddr').value || '').trim();
      const hit = q ? SC.distances.find(d => d[0].toLowerCase().includes(q.toLowerCase())) : null;
      km = hit ? hit[1] : 45;
      address = hit ? hit[0] : (q || 'To be confirmed');
      delivery = SC.legFee(km) * 2;
    }
    const railsFee = rails ? P.railsFee : 0;
    return { start, end, days, rails, rp, delivery, km, address, railsFee, total: rp.price + railsFee + delivery };
  }

  function manualPrice() {
    const c = manualCharges();
    if (!c) { $('mbPrice').innerHTML = '<div class="d-row"><span>Select valid dates to price the hire</span></div>'; $('mbWarn').style.display = 'none'; return; }
    const free = SC.findFreeUnit(c.start, c.end, c.rails);
    $('mbWarn').style.display = free ? 'none' : 'flex';
    $('mbSave').disabled = !free;
    $('mbPrice').innerHTML =
      '<div class="d-row"><span>' + c.rp.label + '</span><strong>' + money(c.rp.price) + '</strong></div>' +
      (c.railsFee ? '<div class="d-row"><span>Meat rails</span><strong>' + money(c.railsFee) + '</strong></div>' : '') +
      (c.delivery ? '<div class="d-row"><span>Delivery &amp; collection (' + c.km + ' km)</span><strong>' + money(c.delivery) + '</strong></div>' : '') +
      '<div class="d-row" style="border-top:1px dashed var(--line-strong);margin-top:6px;padding-top:8px"><span><strong>Total</strong>' + (free ? ' · assigns ' + free.id : '') + '</span><strong style="color:var(--orange-dark)">' + money(c.total) + '</strong></div>';
  }

  function saveManual() {
    const name = $('mbName').value.trim(), phone = $('mbPhone').value.trim();
    if (!name || !phone) { alert('Customer name and phone are required.'); return; }
    const c = manualCharges();
    if (!c) { alert('Please select valid dates.'); return; }
    const unit = SC.findFreeUnit(c.start, c.end, c.rails);
    if (!unit) return;
    SC.addBooking({
      ref: SC.newRef(),
      customer: { name, email: $('mbEmail').value.trim() || '—', phone },
      start: c.start, end: c.end, days: c.days, time: '9:00 am',
      unitId: unit.id, rails: c.rails, addons: [],
      fulfil: $('mbFulfil').value, address: c.address, km: c.km,
      payment: $('mbPay').value, status: 'confirmed', source: 'phone',
      charges: { rental: c.rp.price, railsFee: c.railsFee, addons: 0, delivery: c.delivery, total: c.total },
      created: TODAY
    });
    $('manualModal').classList.remove('open');
    ['mbName', 'mbPhone', 'mbEmail', 'mbAddr'].forEach(id => $(id).value = '');
    toast('Manual booking saved — trailer ' + unit.id + ' blocked out');
    renderAll();
  }

  /* ================= quotes ================= */
  function renderQuotes() {
    const list = SC.getQuotes().slice().reverse();
    let html = '<thead><tr><th>Ref</th><th>Contact</th><th>Requested hire</th><th>Message</th><th>Status</th><th></th></tr></thead><tbody>';
    if (!list.length) html += '<tr><td colspan="6" style="text-align:center;color:var(--faint);padding:30px">No quote requests yet</td></tr>';
    list.forEach(q2 => {
      const st = quoteStatusOverride[q2.id] || q2.status;
      html += '<tr><td><strong>' + q2.id + '</strong><div class="sub">' + SC.fmtShort(q2.created) + '</div></td>' +
        '<td class="cust">' + q2.name + '<div class="sub">' + q2.phone + ' · ' + q2.email + '</div></td>' +
        '<td>' + (q2.start ? SC.fmtShort(q2.start) + ' start' : '—') + '<div class="sub">' + q2.days + ' days</div></td>' +
        '<td style="max-width:280px"><div class="sub" style="font-size:12.5px;white-space:normal">' + q2.message + '</div></td>' +
        '<td>' + (st === 'new' ? '<span class="pill orange">New</span>' : '<span class="pill good">Quoted</span>') + '</td>' +
        '<td>' + (st === 'new' ? '<button class="btn btn-ghost btn-sm" onclick="ADM.markQuoted(\'' + q2.id + '\')">Mark quoted</button>' : '') + '</td></tr>';
    });
    $('quoteTable').innerHTML = html + '</tbody>';
  }
  ADM.markQuoted = function (id) { quoteStatusOverride[id] = 'quoted'; renderQuotes(); renderAll(); toast('Marked as quoted'); };

  /* ================= fleet ================= */
  function renderFleet() {
    const units = SC.getUnits();
    $('fleetGrid').innerHTML = units.map((u, i) => {
      const upcoming = SC.getBookings().filter(b => b.unitId === u.id && b.status !== 'cancelled' && b.end >= TODAY).length;
      return '<div class="unit-card">' +
        '<div class="u-head"><div><div class="u-id">' + u.id + '</div><h3>' + u.name + '</h3></div>' +
        (u.rails ? '<span class="pill orange">Meat rails</span>' : '<span class="pill blue">Standard</span>') + '</div>' +
        '<div class="u-note">' + (u.status === 'active' ? upcoming + ' upcoming booking' + (upcoming === 1 ? '' : 's') : (u.note || 'Out for maintenance')) + '</div>' +
        '<div class="u-foot">' +
          '<label class="toggle"><input type="checkbox" data-i="' + i + '"' + (u.status === 'active' ? ' checked' : '') + '><span class="tr"></span><span>' + (u.status === 'active' ? 'Available for booking' : 'Maintenance — hidden') + '</span></label>' +
        '</div></div>';
    }).join('');
    $('fleetGrid').querySelectorAll('input[type=checkbox]').forEach(cb => cb.addEventListener('change', () => {
      const units2 = SC.getUnits();
      const u = units2[Number(cb.dataset.i)];
      u.status = cb.checked ? 'active' : 'maintenance';
      if (cb.checked) u.note = '';
      SC.saveUnits(units2);
      toast(u.id + (cb.checked ? ' is back in the booking pool' : ' pulled from availability'));
      renderAll();
    }));
  }

  function nextUnitName() {
    const n = SC.getUnits().length + 1;
    return 'Suncool Trailer ' + String(n).padStart(2, '0');
  }
  function saveUnit() {
    const units = SC.getUnits();
    const n = units.length + 1;
    units.push({
      id: 'SC-' + String(n).padStart(2, '0'),
      name: $('nuName').value.trim() || nextUnitName(),
      rails: $('nuRails').checked, status: 'active', note: ''
    });
    SC.saveUnits(units);
    $('unitModal').classList.remove('open');
    toast('Trailer added — now offered for new bookings');
    renderAll();
  }

  /* ================= pricing ================= */
  function priceField(label, key, val, prefix, suffix, hint) {
    return '<div class="price-field"><label>' + label + '</label><div class="in">' +
      (prefix ? '<span>' + prefix + '</span>' : '') +
      '<input type="number" step="0.5" min="0" data-key="' + key + '" value="' + val + '">' +
      (suffix ? '<span style="padding:10px 13px 10px 0">' + suffix + '</span>' : '') +
      '</div>' + (hint ? '<div class="hint">' + hint + '</div>' : '') + '</div>';
  }

  function renderPricing() {
    const P = SC.getPricing();
    $('priceGrid1').innerHTML =
      priceField('Daily rate', 'daily', P.daily, '$', '/ day', 'Minimum hire is one day') +
      priceField('Weekend package (Fri–Mon)', 'weekend', P.weekend, '$', '', '3 days · vs ' + money(P.daily * 3) + ' at daily rate') +
      priceField('Weekly package (7 days)', 'weekly', P.weekly, '$', '', 'vs ' + money(P.daily * 7) + ' at daily rate');
    $('priceGrid2').innerHTML =
      priceField('Meat rail trailer', 'railsFee', P.railsFee, '$', '/ hire', '') +
      priceField('Shelving kit', 'addons.shelving.price', P.addons.shelving.price, '$', '/ hire', '') +
      priceField('Tie-down & load kit', 'addons.tiedowns.price', P.addons.tiedowns.price, '$', '/ hire', '') +
      priceField('Backup power lead kit', 'addons.leads.price', P.addons.leads.price, '$', '/ hire', '') +
      priceField('Delivery rate', 'deliveryPerKm', P.deliveryPerKm, '$', '/ km each way', 'Minimum ' + money(P.deliveryMinLeg) + ' per leg') +
      priceField('Minimum delivery leg', 'deliveryMinLeg', P.deliveryMinLeg, '$', '/ leg', '');
    $('priceGrid3').innerHTML =
      priceField('Standard delivery range', 'deliveryMaxKm', P.deliveryMaxKm, '', 'km', 'Beyond this, customers are asked to get a delivery quote') +
      priceField('Security bond', 'bond', P.bond, '$', '', 'Refundable — collected at handover, not online') +
      priceField('Turnaround buffer', 'bufferHours', P.bufferHours, '', 'hours', 'Held between hires for cleaning and checks') +
      priceField('Custom quote threshold', 'longTermDays', P.longTermDays, '', 'days', 'Longer bookings are steered to a custom quote');
  }

  function savePricing() {
    const P = SC.getPricing();
    document.querySelectorAll('.price-field input[data-key]').forEach(inp => {
      const v = Number(inp.value);
      const path = inp.dataset.key.split('.');
      if (path.length === 1) P[path[0]] = v;
      else P[path[0]][path[1]][path[2]] = v;
    });
    SC.savePricing(P);
    renderPricing();
    toast('Pricing saved — live on the booking site now');
  }
})();
