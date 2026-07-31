/* ==========================================================================
   Asian Voyage — data layer
   --------------------------------------------------------------------------
   Every method is async and returns a Promise, and nothing outside this file
   touches localStorage. That is deliberate: to go live, only the four DRIVER
   functions at the bottom (read / write / broadcast / subscribe) need to be
   re-pointed at Supabase or Firebase. No screen code changes.

   Cross-tab sync uses BroadcastChannel, with a `storage` event fallback, so
   an order placed on the QR menu appears on the admin console instantly.
   ========================================================================== */
(function () {
  const KEY = 'av.demo.v1';
  const CH = 'av-demo';

  /* ------------------------------ defaults ------------------------------ */
  const DEFAULT_SETTINGS = {
    loyalty: {
      enabled: true,
      earnPerDollar: 1,        // points earned per EC$1 of item subtotal
      pointValue: 0.10,        // EC$ delivered per point when redeemed
      redeemBlock: 100,        // points must be redeemed in blocks of this size
      minRedeem: 100,          // minimum balance before redemption unlocks
      postOn: 'completed',     // points post when the order completes, not when placed
      expiryMonths: 12,
      stackWithDiscounts: false,
      tiersEnabled: false,     // flat rate by default; switch on to demo the upsell
      tiers: [
        { id: 'bronze', name: 'Bronze', from: 0,    mult: 1,    perk: 'Earn 1 point per EC$1' },
        { id: 'silver', name: 'Silver', from: 500,  mult: 1.25, perk: '25% bonus points + priority pickup' },
        { id: 'gold',   name: 'Gold',   from: 2000, mult: 1.5,  perk: '50% bonus points + a birthday main course' }
      ]
    },
    unavailable: {}            // { 'cedar': ['lobster-tempura-roll', ...] }
  };

  const uid = () => Math.random().toString(36).slice(2, 10);

  /* --------------------------- seed demo data --------------------------- */
  function seed() {
    const now = Date.now();
    const mins = m => new Date(now - m * 60000).toISOString();
    const days = d => new Date(now - d * 86400000).toISOString();

    const customers = {
      '2687231188': {
        phone: '2687231188', name: 'Marcus Bailey', points: 340, lifetimePoints: 1240,
        visits: 9, joinedAt: days(210), lastSeen: days(6),
        ledger: [
          { ts: days(6),  type: 'earn',   points: 118, orderCode: 'AV-1031', note: 'Dine-in · Cedar Plaza' },
          { ts: days(24), type: 'redeem', points: -200, orderCode: 'AV-0994', note: 'EC$20.00 off' },
          { ts: days(24), type: 'earn',   points: 96,  orderCode: 'AV-0994', note: 'Dine-in · Cedar Plaza' },
          { ts: days(58), type: 'earn',   points: 155, orderCode: 'AV-0912', note: 'Pickup · Jolly Harbour' }
        ]
      },
      '2684455021': {
        phone: '2684455021', name: 'Anisha Ramdeen', points: 95, lifetimePoints: 95,
        visits: 1, joinedAt: days(12), lastSeen: days(12),
        ledger: [{ ts: days(12), type: 'earn', points: 95, orderCode: 'AV-1018', note: 'Dine-in · Cedar Plaza' }]
      },
      '2687700934': {
        phone: '2687700934', name: 'Devon Christian', points: 1180, lifetimePoints: 3420,
        visits: 22, joinedAt: days(430), lastSeen: days(2),
        ledger: [
          { ts: days(2),  type: 'earn',   points: 210, orderCode: 'AV-1044', note: 'Dine-in · Jolly Harbour' },
          { ts: days(15), type: 'earn',   points: 174, orderCode: 'AV-1009', note: 'Dine-in · Cedar Plaza' },
          { ts: days(41), type: 'redeem', points: -300, orderCode: 'AV-0951', note: 'EC$30.00 off' }
        ]
      }
    };

    const orders = [
      { id: uid(), code: 'AV-1052', branch: 'cedar', table: 7, mode: 'dine-in', source: 'qr',
        customer: { name: 'Marcus Bailey', phone: '2687231188' },
        items: [
          { id: 'tom-yum-soup', name: 'Tom Yum Soup', variant: 'Chicken', qty: 2, price: 26 },
          { id: 'crab-rangoon', name: 'Crab Rangoon', qty: 1, price: 39 },
          { id: 'kung-pao-chicken', name: 'Kung Pao Chicken', qty: 1, price: 65, notes: 'Extra spicy' }
        ],
        status: 'new', placedAt: mins(3), updatedAt: mins(3), pointsRedeemed: 0, tip: 0, paid: false },

      { id: uid(), code: 'AV-1051', branch: 'cedar', table: 12, mode: 'dine-in', source: 'qr',
        customer: { name: 'Kayla Joseph', phone: '2687712204' },
        items: [
          { id: 'asian-voyage-house-roll', name: 'Asian Voyage House Roll', qty: 1, price: 48 },
          { id: 'salmon-sashimi', name: 'Salmon Sashimi', qty: 1, price: 55 },
          { id: 'sparkling-water', name: 'Sparkling Water', qty: 2, price: 18 }
        ],
        status: 'preparing', placedAt: mins(11), updatedAt: mins(6), pointsRedeemed: 0, tip: 0, paid: false },

      { id: uid(), code: 'AV-1050', branch: 'jolly', table: null, mode: 'pickup', source: 'app',
        customer: { name: 'Devon Christian', phone: '2687700934' },
        items: [
          { id: 'nasi-goreng', name: 'Nasi Goreng', qty: 2, price: 48 },
          { id: 'chicken-spring-roll', name: 'Chicken Spring Roll', qty: 1, price: 28 }
        ],
        status: 'ready', placedAt: mins(22), updatedAt: mins(4), pointsRedeemed: 100, tip: 0, paid: false },

      { id: uid(), code: 'AV-1049', branch: 'cedar', table: 3, mode: 'dine-in', source: 'pos',
        customer: { name: 'Walk-in', phone: '' },
        items: [
          { id: 'garlic-bok-choy', name: 'Garlic Bok Choy', qty: 1, price: 48 },
          { id: 'chicken-fried-rice', name: 'Chicken Fried Rice', qty: 1, price: 28 },
          { id: 'carib', name: 'Carib', qty: 3, price: 10 }
        ],
        status: 'paid', placedAt: mins(74), updatedAt: mins(41), pointsRedeemed: 0, tip: 12,
        paid: true, paymentMethod: 'card' }
    ];

    return { orders, customers, settings: DEFAULT_SETTINGS, counter: 1052, v: 1 };
  }

  /* ------------------------- in-memory + storage ------------------------ */
  let db = null;
  const listeners = new Set();

  function load() {
    if (db) return db;
    try {
      const raw = localStorage.getItem(KEY);
      db = raw ? JSON.parse(raw) : seed();
    } catch (e) { db = seed(); }
    if (!db.settings) db.settings = DEFAULT_SETTINGS;
    // Merge in any loyalty keys added since this browser last cached the demo.
    db.settings.loyalty = Object.assign({}, DEFAULT_SETTINGS.loyalty, db.settings.loyalty);
    return db;
  }

  function persist(reason) {
    localStorage.setItem(KEY, JSON.stringify(db));
    broadcast(reason);
    notify(reason);
  }

  function notify(reason) { listeners.forEach(fn => { try { fn(reason); } catch (e) { console.error(e); } }); }

  const clone = o => JSON.parse(JSON.stringify(o));
  const wait = v => Promise.resolve(clone(v));   // mimics a network round-trip shape

  /* ------------------------------ money --------------------------------- */
  // Kept here so the QR menu, the app and the POS can never disagree on a total.
  function totals(order, settings) {
    const s = (settings || load().settings);
    const subtotal = (order.items || []).reduce((n, i) => n + i.price * i.qty, 0);
    const svcPct = (window.AV_CONFIG && window.AV_CONFIG.serviceChargePct) || 0;
    const service = order.mode === 'pickup' ? 0 : round2(subtotal * svcPct / 100);
    const discount = round2((order.pointsRedeemed || 0) * s.loyalty.pointValue);
    const tip = round2(order.tip || 0);
    const total = Math.max(0, round2(subtotal + service + tip - discount));
    return { subtotal: round2(subtotal), service, discount, tip, total, servicePct: svcPct };
  }
  const round2 = n => Math.round(n * 100) / 100;

  /* ------------------------------- API ---------------------------------- */
  const AV = {
    totals, round2,

    ready() { load(); return Promise.resolve(); },

    /* --- orders --- */
    orders: {
      list(filter) {
        const d = load();
        let rows = d.orders.slice();
        if (filter && filter.branch && filter.branch !== 'all') rows = rows.filter(o => o.branch === filter.branch);
        if (filter && filter.status) rows = rows.filter(o => [].concat(filter.status).includes(o.status));
        if (filter && filter.phone) rows = rows.filter(o => o.customer && o.customer.phone === filter.phone);
        rows.sort((a, b) => new Date(b.placedAt) - new Date(a.placedAt));
        return wait(rows);
      },
      get(id) {
        const o = load().orders.find(o => o.id === id);
        return wait(o || null);
      },
      create(order) {
        const d = load();
        d.counter += 1;
        const rec = Object.assign({
          id: uid(), code: 'AV-' + d.counter, status: 'new',
          placedAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
          pointsRedeemed: 0, tip: 0, paid: false, source: 'qr'
        }, order);
        d.orders.unshift(rec);

        // Register the guest so the admin can see who is at the table.
        if (rec.customer && rec.customer.phone) {
          const c = d.customers[rec.customer.phone] || {
            phone: rec.customer.phone, name: rec.customer.name, points: 0,
            lifetimePoints: 0, visits: 0, joinedAt: new Date().toISOString(), ledger: []
          };
          c.name = rec.customer.name || c.name;
          c.lastSeen = new Date().toISOString();
          d.customers[rec.customer.phone] = c;
        }
        persist('order:create');
        return wait(rec);
      },
      update(id, patch) {
        const d = load();
        const o = d.orders.find(o => o.id === id);
        if (!o) return Promise.reject(new Error('order not found: ' + id));
        Object.assign(o, patch, { updatedAt: new Date().toISOString() });
        persist('order:update');
        return wait(o);
      },
      remove(id) {
        const d = load();
        d.orders = d.orders.filter(o => o.id !== id);
        persist('order:remove');
        return Promise.resolve();
      }
    },

    /* --- customers --- */
    customers: {
      get(phone) { return wait(load().customers[normPhone(phone)] || null); },
      list() {
        const rows = Object.values(load().customers)
          .sort((a, b) => (b.lifetimePoints || 0) - (a.lifetimePoints || 0));
        return wait(rows);
      },
      upsert(phone, patch) {
        const d = load(); const p = normPhone(phone);
        const c = d.customers[p] || { phone: p, name: '', points: 0, lifetimePoints: 0, visits: 0, joinedAt: new Date().toISOString(), ledger: [] };
        Object.assign(c, patch);
        d.customers[p] = c;
        persist('customer:upsert');
        return wait(c);
      },
      /* Writes a ledger row and moves the balance. Positive = earn, negative = redeem. */
      adjust(phone, points, entry) {
        const d = load(); const p = normPhone(phone);
        const c = d.customers[p];
        if (!c) return Promise.reject(new Error('no customer ' + p));
        c.points = Math.max(0, (c.points || 0) + points);
        if (points > 0) c.lifetimePoints = (c.lifetimePoints || 0) + points;
        c.ledger = c.ledger || [];
        c.ledger.unshift(Object.assign({ ts: new Date().toISOString(), points }, entry));
        persist('customer:adjust');
        return wait(c);
      }
    },

    /* --- settings --- */
    settings: {
      get() { return wait(load().settings); },
      getSync() { return load().settings; },
      set(patch) {
        const d = load();
        d.settings = Object.assign({}, d.settings, patch);
        persist('settings');
        return wait(d.settings);
      },
      setLoyalty(patch) {
        const d = load();
        d.settings.loyalty = Object.assign({}, d.settings.loyalty, patch);
        persist('settings');
        return wait(d.settings);
      },
      toggleAvailability(branch, itemId) {
        const d = load();
        const list = d.settings.unavailable[branch] || [];
        d.settings.unavailable[branch] = list.includes(itemId)
          ? list.filter(x => x !== itemId) : list.concat(itemId);
        persist('settings');
        return wait(d.settings.unavailable);
      },
      isAvailable(branch, itemId) {
        const list = load().settings.unavailable[branch] || [];
        return !list.includes(itemId);
      }
    },

    /* --- lifecycle --- */
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    reset() { localStorage.removeItem(KEY); db = seed(); persist('reset'); return Promise.resolve(); },
    raw() { return clone(load()); }
  };

  function normPhone(p) { return String(p || '').replace(/\D/g, ''); }
  AV.normPhone = normPhone;
  AV.fmtPhone = p => {
    const d = normPhone(p);
    return d.length === 10 ? `${d.slice(0,3)}-${d.slice(3,6)}-${d.slice(6)}` : (p || '');
  };
  AV.money = n => (window.AV_CONFIG ? window.AV_CONFIG.currency : '$') +
    Number(n || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  /* ======================= DRIVER — the swap point ======================= */
  /* Replace the four functions below with Supabase realtime + Postgres and
     every screen keeps working unchanged.
       read/write  -> supabase.from('orders').select() / .upsert()
       broadcast   -> handled server-side by Postgres replication
       subscribe   -> supabase.channel('orders').on('postgres_changes', ...)   */
  let chan = null;
  function broadcast(reason) {
    try {
      if (!chan && 'BroadcastChannel' in window) chan = new BroadcastChannel(CH);
      if (chan) chan.postMessage({ reason, at: Date.now() });
    } catch (e) { /* Safari private mode — the storage event below still fires */ }
  }
  function subscribeExternal() {
    try {
      if (!chan && 'BroadcastChannel' in window) chan = new BroadcastChannel(CH);
      if (chan) chan.onmessage = e => { db = null; notify((e.data && e.data.reason) || 'remote'); };
    } catch (e) { /* fall through to storage */ }
    window.addEventListener('storage', e => {
      if (e.key === KEY) { db = null; notify('remote'); }
    });
  }
  subscribeExternal();
  /* ====================================================================== */

  window.AV = AV;
})();
