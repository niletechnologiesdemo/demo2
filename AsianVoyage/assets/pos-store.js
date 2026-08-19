/* ==========================================================================
   Asian Voyage POS — data layer
   --------------------------------------------------------------------------
   A factory, not a singleton, because the restaurant runs two stations:

     POS  — the main counter. Source of truth. Every bill lives here, including
            the ones handed to the back office to print. Reports, day summary
            and the audited figures all come from this store.
     BO   — the back office / overflow station. Holds bills handed over from
            main (with their full history and a sourceCode pointer back to the
            main bill number) plus any orders taken here on a busy night.

   Bills are plain serials — 001, 002, 003 — and each store counts its own.
   A handed-over bill therefore has two numbers: main 045 and back office 012,
   linked by sourceCode so either end can find the other.

   Every method is async and nothing outside this file touches localStorage,
   so going live means re-pointing the DRIVER functions at the bottom at a
   real backend. In production the two stores become two databases and
   BO.receive() becomes an API call.
   ========================================================================== */
(function () {
  const uid = () => Math.random().toString(36).slice(2, 10);
  const now = () => new Date().toISOString();
  const round2 = n => Math.round((n + Number.EPSILON) * 100) / 100;
  const pad = n => String(n).padStart(3, '0');

  const STAFF = [
    { id: 'u1', name: 'Ravi Persaud',   role: 'manager', pin: '1234' },
    { id: 'u2', name: 'Anisha Ramdeen', role: 'cashier', pin: '1111' },
    { id: 'u3', name: 'Kwame Osei',     role: 'waiter',  pin: '2222' },
    { id: 'u4', name: 'Leah Martin',    role: 'waiter',  pin: '3333' },
    { id: 'u5', name: 'Terrence Hodge', role: 'waiter',  pin: '4444' }
  ];
  const VOID_REASONS = ['Wrong item punched', 'Guest changed mind', 'Kitchen unable to serve',
                        'Item unavailable', 'Sent back — quality', 'Duplicate entry'];
  const COMP_REASONS = ['Manager comp — service recovery', 'Staff meal', 'Owner / house',
                        'Promotional', 'Long wait apology'];
  const DISCOUNT_REASONS = ['Regular guest', 'Staff discount', 'Promotion', 'Manager approved'];

  /* ---------------------------- seed: main ------------------------------ */
  function seedMain() {
    const m = n => new Date(Date.now() - n * 60000).toISOString();
    const it = (id, name, price, qty, kot, extra) =>
      Object.assign({ uid: uid(), id, name, price, qty, kot: kot === undefined ? null : kot,
                      course: 1, notes: '', variant: null, voided: null, comp: null }, extra || {});
    const orders = [
      { id: uid(), code: '041', type: 'dine-in', table: 4, guests: 2, waiter: 'u3', openedBy: 'u3',
        status: 'preparing', openedAt: m(14), updatedAt: m(9), tip: 0, discount: null, payments: [],
        kotBatches: [{ n: 1, at: m(12), by: 'u3', kind: 'new' }],
        items: [ it('tom-yum-soup', 'Tom Yum Soup', 26, 2, 1, { variant: 'Chicken' }),
                 it('crab-rangoon', 'Crab Rangoon', 39, 1, 1),
                 it('kung-pao-chicken', 'Kung Pao Chicken', 65, 1, 1, { notes: 'Extra spicy' }) ] },
      { id: uid(), code: '042', type: 'dine-in', table: 9, guests: 4, waiter: 'u4', openedBy: 'u4',
        status: 'ready', openedAt: m(48), updatedAt: m(6), tip: 0, discount: null, payments: [],
        kotBatches: [{ n: 1, at: m(46), by: 'u4', kind: 'new' }, { n: 2, at: m(21), by: 'u4', kind: 'addition' }],
        items: [ it('asian-voyage-house-roll', 'Asian Voyage House Roll', 48, 1, 1),
                 it('salmon-sashimi', 'Salmon Sashimi', 55, 1, 1),
                 it('mongolian-beef', 'Mongolian Beef', 85, 1, 1),
                 it('chicken-fried-rice', 'Chicken Fried Rice', 28, 2, 1),
                 it('carib', 'Carib', 10, 4, 2), it('coca-cola', 'Coca-Cola', 8, 2, 2) ] },
      { id: uid(), code: '043', type: 'counter', table: null, guests: 1, waiter: null, openedBy: 'u2',
        status: 'preparing', openedAt: m(7), updatedAt: m(7), tip: 0, discount: null, payments: [],
        kotBatches: [{ n: 1, at: m(7), by: 'u2', kind: 'new' }],
        items: [ it('nasi-goreng', 'Nasi Goreng', 48, 2, 1), it('chicken-spring-roll', 'Chicken Spring Roll', 28, 1, 1) ] },
      { id: uid(), code: '044', type: 'dine-in', table: 12, guests: 3, waiter: 'u3', openedBy: 'u3',
        status: 'placed', openedAt: m(2), updatedAt: m(2), tip: 0, discount: null, payments: [], kotBatches: [],
        items: [ it('garlic-bok-choy', 'Garlic Bok Choy', 48, 1),
                 it('veg-stir-fried-noodles', 'Veg Stir Fried Noodles', 25, 1),
                 it('sweet-corn-soup', 'Sweet Corn Soup', 24, 3, null, { variant: 'Vegetable' }) ] },
      { id: uid(), code: '039', type: 'dine-in', table: 2, guests: 2, waiter: 'u4', openedBy: 'u4',
        status: 'settled', openedAt: m(96), updatedAt: m(62), settledAt: m(62), tip: 12, settledBy: 'u2',
        discount: null, payments: [{ method: 'card', amount: 169.20, at: m(62) }],
        printStatus: 'printed', printedAt: m(62),
        kotBatches: [{ n: 1, at: m(94), by: 'u4', kind: 'new' }],
        items: [ it('poached-fish', 'Poached Fish', 78, 1, 1), it('garlic-broccoli', 'Garlic Broccoli', 50, 1, 1),
                 it('steamed-rice', 'Steamed Rice', 12, 2, 1) ] },
      { id: uid(), code: '040', type: 'counter', table: null, guests: 1, waiter: null, openedBy: 'u2',
        status: 'settled', openedAt: m(80), updatedAt: m(76), settledAt: m(76), tip: 0, settledBy: 'u2',
        discount: null, payments: [{ method: 'cash', amount: 86, at: m(76) }],
        printStatus: 'printed', printedAt: m(76),
        kotBatches: [{ n: 1, at: m(79), by: 'u2', kind: 'new' }],
        items: [ it('shrimp-fried-rice', 'Shrimp Fried Rice', 36, 1, 1), it('chicken-gyoza', 'Chicken Gyoza', 26, 1, 1),
                 it('ting', 'Ting', 8, 3, 1) ] }
    ];
    return { v: 2, counter: 44, orders, staff: STAFF, audit: [] };
  }

  /* The back office starts empty — it only ever holds what main hands over,
     plus whatever gets taken here on a busy night. */
  function seedBO() { return { v: 2, counter: 0, orders: [], staff: STAFF, audit: [] }; }

  /* ======================================================================
     Store factory
     ====================================================================== */
  function createPOSStore(cfg) {
    const KEY = cfg.key, CH = cfg.channel, LABEL = cfg.label;
    const seed = cfg.seed;
    let db = null;
    const listeners = new Set();

    function load() {
      if (db) return db;
      try { const raw = localStorage.getItem(KEY); db = raw ? JSON.parse(raw) : seed(); }
      catch (e) { db = seed(); }
      if (!db.staff) db.staff = STAFF;
      if (!db.audit) db.audit = [];
      return db;
    }
    function persist(reason) { localStorage.setItem(KEY, JSON.stringify(db)); broadcast(reason); notify(reason); }
    function notify(r) { listeners.forEach(fn => { try { fn(r); } catch (e) { console.error(e); } }); }
    const clone = o => JSON.parse(JSON.stringify(o));
    const wait = v => Promise.resolve(clone(v));
    function logAudit(by, action, detail, orderCode) {
      load().audit.unshift({ at: now(), by, action, detail, orderCode });
    }

    /* One money implementation, shared by the ticket, the bill and the reports,
       so the three can never disagree about what a table owes. */
    function totals(order) {
      const c = window.AV_CONFIG;
      const live = (order.items || []).filter(i => !i.voided);
      const gross = live.reduce((n, i) => n + i.price * i.qty, 0);
      const comps = live.filter(i => i.comp).reduce((n, i) => n + i.price * i.qty, 0);
      const net = gross - comps;
      let discount = 0;
      if (order.discount) {
        discount = order.discount.type === 'pct'
          ? net * (order.discount.value / 100) : Math.min(order.discount.value, net);
      }
      const serviceable = Math.max(0, net - discount);
      const service = order.type === 'dine-in' ? serviceable * (c.serviceChargePct / 100) : 0;
      const tip = order.tip || 0;
      const total = serviceable + service + tip;
      // Menu prices already include ABST, so tax is a memo line, never an addition.
      const abst = serviceable * (c.abstRate / (100 + c.abstRate));
      const paid = (order.payments || []).reduce((n, p) => n + p.amount, 0);
      return {
        gross: round2(gross), comps: round2(comps), net: round2(net), discount: round2(discount),
        serviceable: round2(serviceable), service: round2(service), servicePct: c.serviceChargePct,
        abst: round2(abst), abstRate: c.abstRate, tip: round2(tip), total: round2(total),
        paid: round2(paid), due: round2(Math.max(0, total - paid)), covers: order.guests || 1
      };
    }

    const S = {
      label: LABEL, totals, round2,
      VOID_REASONS, COMP_REASONS, DISCOUNT_REASONS,
      ready() { load(); return Promise.resolve(); },
      money: n => (window.AV_CONFIG ? window.AV_CONFIG.currency : '$') +
        Number(n || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),

      staff: {
        list() { return wait(load().staff); },
        get(id) { return load().staff.find(s => s.id === id) || null; },
        name(id) { const s = S.staff.get(id); return s ? s.name : '—'; },
        byPin(pin) { const s = load().staff.find(s => s.pin === String(pin)); return s ? clone(s) : null; },
        approves(pin) {
          const s = load().staff.find(s => s.pin === String(pin));
          return s && s.role === 'manager' ? clone(s) : null;
        }
      },

      orders: {
        list(f) {
          let rows = load().orders.slice();
          if (f && f.status) rows = rows.filter(o => [].concat(f.status).includes(o.status));
          if (f && f.table) rows = rows.filter(o => o.table === f.table);
          if (f && f.waiter) rows = rows.filter(o => o.waiter === f.waiter);
          if (f && f.type) rows = rows.filter(o => o.type === f.type);
          rows.sort((a, b) => new Date(b.openedAt) - new Date(a.openedAt));
          return wait(rows);
        },
        get(id) { const o = load().orders.find(o => o.id === id); return wait(o || null); },
        getSync(id) { return load().orders.find(o => o.id === id) || null; },
        byCode(code) { const o = load().orders.find(o => o.code === code); return o ? clone(o) : null; },

        create(o) {
          const d = load();
          d.counter += 1;
          const rec = Object.assign({
            id: uid(), code: pad(d.counter), type: 'dine-in', table: null, guests: 1,
            waiter: null, items: [], status: 'placed', openedAt: now(), updatedAt: now(),
            tip: 0, discount: null, payments: [], kotBatches: [], origin: LABEL
          }, o);
          d.orders.unshift(rec);
          logAudit(rec.openedBy, 'order.open',
            rec.type === 'dine-in' ? `Table ${rec.table} · ${rec.guests} covers` : 'Counter order', rec.code);
          persist('order:create');
          return wait(rec);
        },

        addItems(id, lines, by) {
          const o = S.orders.getSync(id);
          if (!o) return Promise.reject(new Error('no order'));
          lines.forEach(l => {
            const same = o.items.find(x => x.kot === null && !x.voided && x.id === l.id &&
              (x.variant || '') === (l.variant || '') && (x.notes || '') === (l.notes || ''));
            if (same) same.qty += l.qty;
            else o.items.push({ uid: uid(), id: l.id, name: l.name, price: l.price, qty: l.qty,
              variant: l.variant || null, notes: l.notes || '', course: l.course || 1,
              kot: null, voided: null, comp: null });
          });
          o.updatedAt = now();
          if (o.status === 'ready') o.status = 'preparing';
          persist('order:update');
          return wait(o);
        },

        setQty(id, lineUid, qty) {
          const o = S.orders.getSync(id);
          const l = o.items.find(i => i.uid === lineUid);
          if (!l) return Promise.reject(new Error('no line'));
          if (l.kot !== null) return Promise.reject(new Error('Already sent to the kitchen — void it instead'));
          if (qty <= 0) o.items = o.items.filter(i => i.uid !== lineUid); else l.qty = qty;
          o.updatedAt = now(); persist('order:update');
          return wait(o);
        },

        setNote(id, lineUid, note) {
          const o = S.orders.getSync(id);
          const l = o.items.find(i => i.uid === lineUid);
          if (l) { l.notes = note; o.updatedAt = now(); persist('order:update'); }
          return wait(o);
        },

        /* Fires the kitchen. Unfired lines get the next batch, so a later round
           prints as an amendment instead of reprinting the whole order. */
        fireKOT(id, by) {
          const o = S.orders.getSync(id);
          const pending = o.items.filter(i => i.kot === null && !i.voided);
          if (!pending.length) return Promise.reject(new Error('Nothing new to send'));
          const n = (o.kotBatches.length ? Math.max.apply(null, o.kotBatches.map(b => b.n)) : 0) + 1;
          pending.forEach(i => i.kot = n);
          o.kotBatches.push({ n, at: now(), by, kind: n === 1 ? 'new' : 'addition' });
          if (o.status === 'placed') o.status = 'preparing';
          o.updatedAt = now();
          logAudit(by, 'kot.fire', `KOT #${n} · ${pending.length} line${pending.length > 1 ? 's' : ''}`, o.code);
          persist('order:kot');
          return wait(o);
        },

        bumpKOT(id, batch) {
          const o = S.orders.getSync(id);
          if (!o) return Promise.reject(new Error('no order'));
          o.bumped = (o.bumped || []).concat(batch).filter((v, i, a) => a.indexOf(v) === i);
          o.updatedAt = now(); persist('order:bump');
          return wait(o);
        },

        /* Before the kitchen sees it a wrong line just goes. After, it needs a
           manager, stays on the bill struck through, and prints a void ticket. */
        voidLine(id, lineUid, reason, by, managerPin) {
          const o = S.orders.getSync(id);
          const l = o.items.find(i => i.uid === lineUid);
          if (!l) return Promise.reject(new Error('no line'));
          if (l.kot === null) {
            o.items = o.items.filter(i => i.uid !== lineUid);
            logAudit(by, 'line.remove', `${l.qty}× ${l.name} (not yet fired)`, o.code);
          } else {
            const mgr = S.staff.approves(managerPin);
            if (!mgr) return Promise.reject(new Error('Manager PIN required to void a sent item'));
            l.voided = { reason, by, approvedBy: mgr.id, at: now() };
            logAudit(by, 'line.void', `${l.qty}× ${l.name} — ${reason} (approved ${mgr.name})`, o.code);
          }
          o.updatedAt = now(); persist('order:update');
          return wait(o);
        },

        compLine(id, lineUid, reason, by, managerPin) {
          const mgr = S.staff.approves(managerPin);
          if (!mgr) return Promise.reject(new Error('Manager PIN required to comp an item'));
          const o = S.orders.getSync(id);
          const l = o.items.find(i => i.uid === lineUid);
          l.comp = { reason, by, approvedBy: mgr.id, at: now() };
          o.updatedAt = now();
          logAudit(by, 'line.comp', `${l.qty}× ${l.name} — ${reason} (approved ${mgr.name})`, o.code);
          persist('order:update'); return wait(o);
        },

        setDiscount(id, discount, by, managerPin) {
          const mgr = S.staff.approves(managerPin);
          if (!mgr) return Promise.reject(new Error('Manager PIN required for a discount'));
          const o = S.orders.getSync(id);
          o.discount = discount ? Object.assign({}, discount, { by, approvedBy: mgr.id, at: now() }) : null;
          o.updatedAt = now();
          logAudit(by, 'order.discount', discount
            ? `${discount.type === 'pct' ? discount.value + '%' : S.money(discount.value)} — ${discount.reason} (approved ${mgr.name})`
            : 'Discount removed', o.code);
          persist('order:update'); return wait(o);
        },

        setTip(id, tip) {
          const o = S.orders.getSync(id);
          o.tip = round2(tip || 0); o.updatedAt = now();
          persist('order:update'); return wait(o);
        },

        closeOrder(id, by) {
          const o = S.orders.getSync(id);
          if (o.items.some(i => i.kot === null && !i.voided))
            return Promise.reject(new Error('Items not sent to the kitchen — send or remove them first'));
          o.status = 'ready'; o.updatedAt = now();
          logAudit(by, 'order.close', 'Ready for billing', o.code);
          persist('order:update'); return wait(o);
        },

        addPayment(id, method, amount, by) {
          const o = S.orders.getSync(id);
          o.payments.push({ method, amount: round2(amount), at: now(), by });
          const t = totals(o);
          if (t.due <= 0.001) {
            o.status = 'settled'; o.settledAt = now(); o.settledBy = by;
            logAudit(by, 'order.settle', `${S.money(t.total)} · ` +
              o.payments.map(p => `${p.method} ${p.amount.toFixed(2)}`).join(' + '), o.code);
          }
          o.updatedAt = now(); persist('order:settle');
          return wait(o);
        },

        /* Deferred printing only. A queued bill is settled, counted in every
           report and in the day summary exactly like one printed at once —
           the only thing deferred is when paper comes out. */
        setPrintStatus(id, status, by) {
          const o = S.orders.getSync(id);
          if (!o) return Promise.reject(new Error('no order'));
          o.printStatus = status;
          if (status === 'printed') { o.printedAt = now(); o.printedBy = by; }
          o.updatedAt = now();
          logAudit(by, 'bill.' + status, status === 'queued' ? 'Handed to back office to print' : 'Printed at the counter', o.code);
          persist('order:print'); return wait(o);
        },
        /* Keyed on print state, not payment — a bill is often handed over before
           the guest has paid, because they want it in hand first. */
        printQueue() {
          return wait(load().orders
            .filter(o => o.printStatus === 'queued' && o.status !== 'void')
            .sort((a, b) => new Date(a.receivedAt || a.updatedAt) - new Date(b.receivedAt || b.updatedAt)));
        },

        /* Records which bill number the other station gave this one, so the
           handover is traceable from both ends. */
        setSentTo(id, code) {
          const o = S.orders.getSync(id);
          if (!o) return Promise.reject(new Error('no order'));
          o.sentToCode = code; o.sentToSystem = 'Back office'; o.updatedAt = now();
          persist('order:update'); return wait(o);
        },

        voidOrder(id, reason, by, managerPin) {
          const mgr = S.staff.approves(managerPin);
          if (!mgr) return Promise.reject(new Error('Manager PIN required to void a bill'));
          const o = S.orders.getSync(id);
          o.status = 'void'; o.voidReason = reason; o.voidedBy = by;
          o.voidApprovedBy = mgr.id; o.updatedAt = now();
          logAudit(by, 'order.void', `${reason} (approved ${mgr.name})`, o.code);
          persist('order:update'); return wait(o);
        },

        reopen(id, reason, by, managerPin) {
          const mgr = S.staff.approves(managerPin);
          if (!mgr) return Promise.reject(new Error('Manager PIN required to reopen a bill'));
          const o = S.orders.getSync(id);
          o.status = 'ready'; o.payments = []; o.settledAt = null; o.settledBy = null;
          o.printStatus = null; o.updatedAt = now();
          logAudit(by, 'order.reopen', `${reason} (approved ${mgr.name})`, o.code);
          persist('order:update'); return wait(o);
        },

        moveTable(id, table, by) {
          const o = S.orders.getSync(id);
          const from = o.table; o.table = table; o.updatedAt = now();
          logAudit(by, 'order.move', `Table ${from} → ${table}`, o.code);
          persist('order:update'); return wait(o);
        },

        /* Takes a full snapshot handed over by another station. The record keeps
           its own local serial and a sourceCode pointing at the origin bill, so
           either end can find the other. */
        receive(payload, fromLabel) {
          const d = load();
          d.counter += 1;
          const rec = Object.assign({}, clone(payload), {
            id: uid(), code: pad(d.counter),
            sourceCode: payload.code, sourceSystem: fromLabel || 'Main',
            receivedAt: now(), printStatus: 'queued', origin: fromLabel || 'Main'
          });
          d.orders.unshift(rec);
          logAudit(payload.settledBy || null, 'bill.received',
            `From ${rec.sourceSystem} bill ${rec.sourceCode}`, rec.code);
          persist('order:receive');
          return wait(rec);
        }
      },

      tables: {
        list() {
          const total = window.AV_CONFIG.restaurant.tables;
          const open = load().orders.filter(o => o.type === 'dine-in' &&
            ['placed', 'preparing', 'ready'].includes(o.status));
          return Array.from({ length: total }, (_, i) => {
            const n = i + 1;
            const o = open.find(x => x.table === n);
            return { n, order: o ? clone(o) : null, status: o ? o.status : 'free' };
          });
        }
      },

      /* -------------------------- reporting ------------------------------
         Every settled bill counts, whether it printed here or was handed to
         the back office. Deferring the paper does not defer the sale. */
      reports: {
        RANGES: [{ id: 'today', label: 'Today' }, { id: 'yday', label: 'Yesterday' },
                 { id: 'week', label: 'Last 7 days' }, { id: 'all', label: 'All time' }],

        rows(range) {
          const d = new Date(); d.setHours(0, 0, 0, 0);
          const t0 = d.getTime();
          const b = { today: [t0, Infinity], yday: [t0 - 86400000, t0],
                      week: [t0 - 6 * 86400000, Infinity], all: [-Infinity, Infinity] }[range || 'today']
                    || [-Infinity, Infinity];
          return load().orders.filter(o => {
            if (o.status !== 'settled') return false;
            const t = new Date(o.settledAt || o.openedAt).getTime();
            return t >= b[0] && t < b[1];
          });
        },

        summary(range) {
          const rows = S.reports.rows(range);
          const sum = f => round2(rows.reduce((n, o) => n + f(o), 0));
          const byMethod = {};
          rows.forEach(o => (o.payments || []).forEach(p => {
            byMethod[p.method] = round2((byMethod[p.method] || 0) + p.amount);
          }));
          const covers = rows.reduce((n, o) => n + (o.guests || 1), 0);
          const total = sum(o => totals(o).total);
          return {
            bills: rows.length, covers,
            gross: sum(o => totals(o).gross), comps: sum(o => totals(o).comps),
            discounts: sum(o => totals(o).discount), net: sum(o => totals(o).serviceable),
            service: sum(o => totals(o).service), tips: sum(o => totals(o).tip),
            abst: sum(o => totals(o).abst), total, byMethod,
            avgBill: rows.length ? round2(total / rows.length) : 0,
            avgCover: covers ? round2(total / covers) : 0,
            dineIn: rows.filter(o => o.type === 'dine-in').length,
            counter: rows.filter(o => o.type === 'counter').length,
            printedHere: rows.filter(o => o.printStatus !== 'queued').length,
            handedOver: rows.filter(o => o.printStatus === 'queued').length
          };
        },

        byItem(range) {
          const map = {};
          S.reports.rows(range).forEach(o => o.items.filter(i => !i.voided).forEach(i => {
            const k = i.name + (i.variant ? ' (' + i.variant + ')' : '');
            map[k] = map[k] || { name: k, qty: 0, value: 0 };
            map[k].qty += i.qty; map[k].value = round2(map[k].value + i.price * i.qty);
          }));
          return Object.values(map).sort((a, b) => b.value - a.value);
        },

        byCategory(range) {
          const cat = id => (window.AV_MENU.find(m => m.id === id) || {}).cat || 'Other';
          const map = {};
          S.reports.rows(range).forEach(o => o.items.filter(i => !i.voided).forEach(i => {
            const k = cat(i.id);
            map[k] = map[k] || { name: k, qty: 0, value: 0 };
            map[k].qty += i.qty; map[k].value = round2(map[k].value + i.price * i.qty);
          }));
          return Object.values(map).sort((a, b) => b.value - a.value);
        },

        /* Full trading-hours spine, so a quiet hour reads as a gap not a hole. */
        byHour(range) {
          const map = {};
          S.reports.rows(range).forEach(o => {
            const h = new Date(o.settledAt || o.openedAt).getHours();
            map[h] = map[h] || { hour: h, bills: 0, covers: 0, value: 0 };
            map[h].bills++; map[h].covers += o.guests || 1;
            map[h].value = round2(map[h].value + totals(o).total);
          });
          /* Span the hours that actually traded, widened to at least eight so a
             single busy hour still reads as a chart rather than one lonely bar.
             Falls back to service hours when nothing has settled yet. */
          const hs = Object.keys(map).map(Number);
          let from = 11, to = 22;
          if (hs.length) {
            from = Math.min.apply(null, hs); to = Math.max.apply(null, hs);
            while (to - from < 7) {
              if (to < 23) to++;
              if (to - from < 7 && from > 0) from--;
            }
          }
          const out = [];
          for (let h = from; h <= to; h++) out.push(map[h] || { hour: h, bills: 0, covers: 0, value: 0 });
          return out;
        },

        byStaff(range) {
          const map = {};
          S.reports.rows(range).forEach(o => {
            const k = o.waiter || o.openedBy;
            map[k] = map[k] || { id: k, name: S.staff.name(k), bills: 0, covers: 0, value: 0 };
            map[k].bills++; map[k].covers += o.guests || 1;
            map[k].value = round2(map[k].value + totals(o).total);
          });
          return Object.values(map)
            .map(s => Object.assign(s, { avgBill: s.bills ? round2(s.value / s.bills) : 0 }))
            .sort((a, b) => b.value - a.value);
        },

        /* What never made it onto a bill, and who approved it. */
        exceptions(range) {
          const inRange = new Set(S.reports.rows(range).map(o => o.id));
          const lines = [], bills = [];
          load().orders.forEach(o => {
            const open = ['placed', 'preparing', 'ready'].includes(o.status);
            if (!inRange.has(o.id) && !open && o.status !== 'void') return;
            o.items.forEach(i => {
              if (i.voided) lines.push({ code: o.code, kind: 'Void', name: i.name, qty: i.qty,
                value: round2(i.price * i.qty), reason: i.voided.reason,
                by: S.staff.name(i.voided.by), approvedBy: S.staff.name(i.voided.approvedBy) });
              if (i.comp) lines.push({ code: o.code, kind: 'Comp', name: i.name, qty: i.qty,
                value: round2(i.price * i.qty), reason: i.comp.reason,
                by: S.staff.name(i.comp.by), approvedBy: S.staff.name(i.comp.approvedBy) });
            });
            if (o.discount) bills.push({ code: o.code, kind: 'Discount',
              detail: o.discount.type === 'pct' ? o.discount.value + '%' : S.money(o.discount.value),
              value: round2(totals(o).discount), reason: o.discount.reason,
              by: S.staff.name(o.discount.by), approvedBy: S.staff.name(o.discount.approvedBy) });
            if (o.status === 'void') bills.push({ code: o.code, kind: 'Bill void', detail: '—',
              value: round2(totals(o).total), reason: o.voidReason || '',
              by: S.staff.name(o.voidedBy), approvedBy: S.staff.name(o.voidApprovedBy) });
          });
          return { lines, bills,
            lineValue: round2(lines.reduce((n, x) => n + x.value, 0)),
            billValue: round2(bills.reduce((n, x) => n + x.value, 0)) };
        }
      },

      audit: { list(limit) { return wait(load().audit.slice(0, limit || 200)); } },

      subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
      reset() { localStorage.removeItem(KEY); db = seed(); persist('reset'); return Promise.resolve(); },

      /* ===================== DRIVER — the swap point ===================== */
      /* Two localStorage keys stand in for two servers. In production these
         become two databases and receive() becomes an API call between them. */
      _drive: null
    };

    let chan = null;
    function broadcast(reason) {
      try {
        if (!chan && 'BroadcastChannel' in window) chan = new BroadcastChannel(CH);
        if (chan) chan.postMessage({ reason, at: Date.now() });
      } catch (e) { /* storage event below still fires */ }
    }
    (function subscribeExternal() {
      try {
        if (!chan && 'BroadcastChannel' in window) chan = new BroadcastChannel(CH);
        if (chan) chan.onmessage = e => { db = null; notify((e.data && e.data.reason) || 'remote'); };
      } catch (e) {}
      window.addEventListener('storage', e => { if (e.key === KEY) { db = null; notify('remote'); } });
    })();

    return S;
  }

  /* ------------------------------ instances ------------------------------ */
  window.createPOSStore = createPOSStore;
  window.POS = createPOSStore({ key: 'av.pos.v2', channel: 'av-pos', label: 'Main', seed: seedMain });
  window.BO  = createPOSStore({ key: 'av.bo.v2',  channel: 'av-bo',  label: 'Back office', seed: seedBO });

  /* Hand a settled bill to the back office to print. The bill stays here in
     full — this only marks where the paper comes out. */
  window.handOverToBackOffice = async function (orderId, by) {
    const o = await window.POS.orders.get(orderId);
    if (!o) throw new Error('no order');
    const rec = await window.BO.orders.receive(o, 'Main');
    await window.POS.orders.setPrintStatus(orderId, 'queued', by);
    await window.POS.orders.setSentTo(orderId, rec.code);
    return rec;
  };

  /* Orders raised at the back office on a busy night are copied back into main
     so the audited books stay complete. Turn off only when the second station
     is a genuinely separate branch keeping its own books. */
  window.SYNC_BACKOFFICE_ORDERS_TO_MAIN = true;
  window.syncBackOfficeOrderToMain = async function (boOrder) {
    if (!window.SYNC_BACKOFFICE_ORDERS_TO_MAIN) return null;
    if (boOrder.sourceCode) return null;           // came from main already
    /* receive() assigns its own id and serial and reads payload.code as the
       back-reference, so the record is handed over intact. */
    const copy = Object.assign({}, boOrder, { origin: 'Back office' });
    return window.POS.orders.receive(copy, 'Back office');
  };
})();
