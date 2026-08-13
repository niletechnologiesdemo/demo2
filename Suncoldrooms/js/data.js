/* ============================================================
   Suncool Coldrooms — demo data layer & rental engine
   Fleet, pricing, seed bookings, availability logic.
   Custom bookings persist in localStorage so the customer
   site, account page and admin console all stay in sync.
   ============================================================ */

window.SC = (function () {
  const LS = {
    bookings: 'sc_demo_bookings_v1',
    units: 'sc_demo_units_v1',
    pricing: 'sc_demo_pricing_v1',
    quotes: 'sc_demo_quotes_v1',
    user: 'sc_demo_user_v1'
  };

  /* ---------- pricing config (editable in admin) ---------- */
  const defaultPricing = {
    daily: 195,
    weekend: 495,          // Fri -> Mon package
    weekly: 1150,          // 7 day package
    railsFee: 75,          // meat rail trailer, per hire
    addons: {
      shelving: { label: 'Shelving kit', price: 40, desc: 'Two-tier removable shelving, fitted before handover' },
      tiedowns: { label: 'Tie-down & load kit', price: 20, desc: 'Straps, hooks and non-slip matting for transit' },
      leads: { label: 'Backup power lead kit', price: 15, desc: '15 m mains / generator lead for extended cloudy periods' }
    },
    deliveryPerKm: 4,      // $ per km, per leg
    deliveryMinLeg: 75,    // minimum $ per leg
    deliveryMaxKm: 100,    // beyond this -> custom quote
    bond: 500,             // refundable, collected at handover
    bufferHours: 4,        // turnaround between hires
    longTermDays: 7        // longer than this -> custom quote
  };

  /* ---------- fleet (editable in admin) ---------- */
  const defaultUnits = [
    { id: 'SC-01', name: 'Suncool Trailer 01', rails: false, status: 'active', note: '' },
    { id: 'SC-02', name: 'Suncool Trailer 02', rails: false, status: 'active', note: '' },
    { id: 'SC-03', name: 'Suncool Trailer 03', rails: false, status: 'maintenance', note: 'Compressor service — back Sat 15 Aug' },
    { id: 'SC-04', name: 'Suncool Trailer 04', rails: true, status: 'active', note: 'Fitted with meat rails' }
  ];

  /* ---------- seed bookings (Aug–Sep 2026) ---------- */
  const seedBookings = [
    bk('SC-2026-1031', 'Marion Whitfield', 'marion.w@outlook.com', '0412 664 210', '2026-08-07', '2026-08-09', 'SC-01', false, ['shelving'], 'pickup', null, 0, 'paid', 'completed', 'online'),
    bk('SC-2026-1032', 'Dale Hutchins', 'dale@hutchinsfarming.com.au', '0400 118 552', '2026-08-08', '2026-08-11', 'SC-02', false, [], 'delivery', 'Beaudesert QLD', 60, 'paid', 'completed', 'online'),
    bk('SC-2026-1033', 'Lions Club of Kilcoy', 'events@kilcoylions.org.au', '0407 883 190', '2026-08-12', '2026-08-14', 'SC-01', false, ['tiedowns'], 'pickup', null, 0, 'paid', 'active', 'phone'),
    bk('SC-2026-1034', 'Priya Raman', 'priya.raman@gmail.com', '0433 902 471', '2026-08-14', '2026-08-17', 'SC-04', true, [], 'delivery', 'Nerang QLD', 7, 'paid', 'confirmed', 'online'),
    bk('SC-2026-1035', 'Burleigh Farmers Market', 'ops@burleighmarkets.com.au', '0421 337 655', '2026-08-15', '2026-08-16', 'SC-02', false, ['shelving', 'leads'], 'pickup', null, 0, 'paid', 'confirmed', 'online'),
    bk('SC-2026-1036', 'Tom & Erin Calloway', 'calloway.station@bigpond.com', '0418 220 984', '2026-08-19', '2026-08-26', 'SC-01', false, [], 'delivery', 'Canungra QLD', 42, 'paid', 'confirmed', 'online'),
    bk('SC-2026-1037', 'Redland Bay Seafood Co-op', 'admin@rbseafood.com.au', '0402 556 730', '2026-08-21', '2026-08-24', 'SC-04', true, ['tiedowns'], 'pickup', null, 0, 'pending', 'confirmed', 'phone'),
    bk('SC-2026-1038', 'Gemma Liu', 'gemma.liu.events@gmail.com', '0430 118 264', '2026-08-22', '2026-08-23', 'SC-02', false, [], 'pickup', null, 0, 'paid', 'confirmed', 'online'),
    bk('SC-2026-1039', 'Scenic Rim Ag Show', 'secretary@srags.org.au', '0409 771 388', '2026-08-28', '2026-08-31', 'SC-01', false, ['shelving'], 'delivery', 'Boonah QLD', 75, 'paid', 'confirmed', 'online'),
    bk('SC-2026-1040', 'Whitmore Catering', 'jobs@whitmorecatering.com.au', '0416 902 118', '2026-09-04', '2026-09-07', 'SC-02', false, ['leads'], 'pickup', null, 0, 'paid', 'confirmed', 'online'),
    bk('SC-2026-1041', 'Mudgeeraba Butchery', 'orders@mudgeerababutchery.com.au', '0411 273 645', '2026-09-05', '2026-09-08', 'SC-04', true, [], 'pickup', null, 0, 'pending', 'confirmed', 'phone'),
    bk('SC-2026-1042', 'Currumbin SLSC', 'functions@currumbinslsc.com.au', '0424 660 391', '2026-09-11', '2026-09-14', 'SC-01', false, ['shelving', 'tiedowns'], 'delivery', 'Currumbin QLD', 18, 'paid', 'confirmed', 'online')
  ];

  const seedQuotes = [
    { id: 'Q-2026-014', name: 'Harkness Drilling Pty Ltd', email: 'site@harknessdrilling.com.au', phone: '0408 552 019', start: '2026-09-14', days: 21, message: 'Remote site near Injune, need continuous cold storage for camp catering. Delivery required.', status: 'new', created: '2026-08-11' },
    { id: 'Q-2026-013', name: 'Tamborine Wine Trail', email: 'coordinator@tamborinewinetrail.com.au', phone: '0431 887 220', start: '2026-10-02', days: 10, message: 'Festival weekend plus lead-in. Two trailers if possible.', status: 'quoted', created: '2026-08-08' }
  ];

  function bk(ref, name, email, phone, start, end, unitId, rails, addons, fulfil, address, km, payment, status, source) {
    const days = diffDays(start, end);
    const p = defaultPricing;
    const rental = rentalPriceFor(days, start, p).price;
    const railsFee = rails ? p.railsFee : 0;
    const addonsTotal = addons.reduce((s, k) => s + (p.addons[k] ? p.addons[k].price : 0), 0);
    const delivery = fulfil === 'delivery' ? legFee(km, p) * 2 : 0;
    return {
      ref, customer: { name, email, phone }, start, end, days, unitId, rails, addons,
      fulfil, address, km, payment, status, source,
      charges: { rental, railsFee, addons: addonsTotal, delivery, total: rental + railsFee + addonsTotal + delivery },
      created: start
    };
  }

  /* ---------- delivery distance table (from Gold Coast workshop) ---------- */
  const distances = [
    ['Southport QLD', 8], ['Surfers Paradise QLD', 10], ['Nerang QLD', 7], ['Robina QLD', 12],
    ['Burleigh Heads QLD', 15], ['Currumbin QLD', 18], ['Coomera QLD', 18], ['Tweed Heads NSW', 30],
    ['Gold Coast Hinterland QLD', 35], ['Beenleigh QLD', 32], ['Canungra QLD', 42], ['Logan QLD', 40],
    ['Redland Bay QLD', 55], ['Beaudesert QLD', 60], ['Brisbane CBD QLD', 66], ['Boonah QLD', 75],
    ['Ipswich QLD', 96], ['Byron Bay NSW', 95], ['Caboolture QLD', 110], ['Ballina NSW', 120],
    ['Sunshine Coast QLD', 140], ['Toowoomba QLD', 160]
  ];

  /* ---------- storage helpers ---------- */
  function read(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  }
  function write(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { } }

  function getPricing() { return Object.assign({}, defaultPricing, read(LS.pricing, {})); }
  function savePricing(p) { write(LS.pricing, p); }

  function getUnits() { return read(LS.units, null) || defaultUnits.map(u => Object.assign({}, u)); }
  function saveUnits(units) { write(LS.units, units); }

  function getBookings() {
    const custom = read(LS.bookings, []);
    return seedBookings.concat(custom).sort((a, b) => a.start < b.start ? -1 : 1);
  }
  function addBooking(b) { const c = read(LS.bookings, []); c.push(b); write(LS.bookings, c); }
  function updateBooking(ref, patch) {
    const c = read(LS.bookings, []);
    const i = c.findIndex(x => x.ref === ref);
    if (i >= 0) { Object.assign(c[i], patch); write(LS.bookings, c); return true; }
    return false; // seed bookings are immutable in the demo
  }

  function getQuotes() { return seedQuotes.concat(read(LS.quotes, [])); }
  function addQuote(q) { const c = read(LS.quotes, []); c.push(q); write(LS.quotes, c); }

  function getUser() { return read(LS.user, null); }
  function saveUser(u) { write(LS.user, u); }

  function resetDemo() { Object.values(LS).forEach(k => localStorage.removeItem(k)); }

  /* ---------- date helpers ---------- */
  function toISO(d) { return d.toISOString().slice(0, 10); }
  function parse(iso) { const [y, m, dd] = iso.split('-').map(Number); return new Date(y, m - 1, dd); }
  function diffDays(a, b) { return Math.max(1, Math.round((parse(b) - parse(a)) / 86400000)); }
  function addDays(iso, n) { const d = parse(iso); d.setDate(d.getDate() + n); return toISO(new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12)); }
  function fmtDate(iso, opts) {
    return parse(iso).toLocaleDateString('en-AU', opts || { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  }
  function fmtShort(iso) { return parse(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' }); }
  function todayISO() { return '2026-08-13'; } // demo "today"

  /* ---------- money ---------- */
  function money(n) { return '$' + Number(n).toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 2 }); }

  /* ---------- pricing engine ---------- */
  function legFee(km, p) { p = p || getPricing(); return Math.max(p.deliveryMinLeg, Math.round(km * p.deliveryPerKm)); }

  function rentalPriceFor(days, startISO, p) {
    p = p || getPricing();
    const startDay = parse(startISO).getDay(); // 5 = Friday
    if (days === 3 && startDay === 5) {
      return { price: p.weekend, label: 'Weekend package (Fri – Mon)', saving: days * p.daily - p.weekend };
    }
    if (days === 7) {
      return { price: p.weekly, label: 'Weekly package (7 days)', saving: days * p.daily - p.weekly };
    }
    return { price: days * p.daily, label: days + ' day' + (days > 1 ? 's' : '') + ' × ' + money(p.daily), saving: 0 };
  }

  /* ---------- availability engine ----------
     Day-granular: a unit is occupied for every date in [start, end).
     The configurable turnaround buffer additionally blocks the
     changeover day itself (end date) for back-to-back hires.       */
  function occupiedDates(booking, p) {
    p = p || getPricing();
    const out = {};
    let d = booking.start;
    while (d < booking.end) { out[d] = true; d = addDays(d, 1); }
    if (p.bufferHours > 0) out[booking.end] = 'buffer';
    return out;
  }

  function unitFree(unitId, startISO, endISO, opts) {
    const bookings = getBookings().filter(b => b.unitId === unitId && b.status !== 'cancelled');
    const p = getPricing();
    for (const b of bookings) {
      if (opts && opts.ignoreRef && b.ref === opts.ignoreRef) continue;
      const occ = occupiedDates(b, p);
      let d = startISO;
      while (d < endISO) { if (occ[d]) return false; d = addDays(d, 1); }
      if (occ[startISO] === 'buffer') return false;
    }
    return true;
  }

  function findFreeUnit(startISO, endISO, needRails) {
    const units = getUnits().filter(u => u.status === 'active' && (!needRails || u.rails));
    for (const u of units) if (unitFree(u.id, startISO, endISO)) return u;
    return null;
  }

  /* how many units (matching rails requirement) are free on a given date */
  function freeCount(dateISO, needRails) {
    const units = getUnits().filter(u => u.status === 'active' && (!needRails || u.rails));
    const next = addDays(dateISO, 1);
    return units.filter(u => unitFree(u.id, dateISO, next)).length;
  }

  function fleetSize(needRails) {
    return getUnits().filter(u => u.status === 'active' && (!needRails || u.rails)).length;
  }

  /* ---------- refs ---------- */
  function newRef() {
    const used = getBookings().map(b => Number(b.ref.split('-').pop())).filter(n => !isNaN(n));
    const next = Math.max(1042, ...used) + 1;
    return 'SC-2026-' + next;
  }
  function newQuoteRef() {
    const used = getQuotes().map(q => Number(q.id.split('-').pop())).filter(n => !isNaN(n));
    return 'Q-2026-' + String(Math.max(14, ...used) + 1).padStart(3, '0');
  }

  return {
    LS, distances,
    getPricing, savePricing,
    getUnits, saveUnits,
    getBookings, addBooking, updateBooking,
    getQuotes, addQuote,
    getUser, saveUser, resetDemo,
    toISO, parse, diffDays, addDays, fmtDate, fmtShort, todayISO,
    money, legFee, rentalPriceFor,
    unitFree, findFreeUnit, freeCount, fleetSize,
    newRef, newQuoteRef
  };
})();
