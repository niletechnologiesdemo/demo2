/* ==========================================================================
   Asian Voyage POS — the application, mounted against a store.
   counter.html mounts it against POS (main), backoffice.html against BO, so
   the two stations are the same software looking at different books.
   ========================================================================== */
(function () {
  const $ = s => document.querySelector(s);

  window.POSApp = {
    mount(opts) {
      const S = opts.store;
      const BACK = !!opts.isBackOffice;
      const money = S.money, totals = S.totals;

      let ME = 'u2';
      let view = BACK ? 'queue' : 'floor';
      let punchId = null;
      let cat = AV_SECTIONS[0].cats[0];
      let range = 'today';
      let seen = new Set(), first = true;

      const VIEWS = [
        { id: 'floor',   label: 'Floor',         icon: 'table',    title: 'Floor' },
        { id: 'punch',   label: 'New order',     icon: 'plus',     title: 'New order' },
        { id: 'orders',  label: 'Active orders', icon: 'list',     title: 'Active orders' },
        { id: 'kitchen', label: 'Kitchen',       icon: 'chef',     title: 'Kitchen tickets' },
        { id: 'queue',   label: BACK ? 'To print' : 'Print queue', icon: 'printer',
          title: BACK ? 'Bills to print' : 'Print queue' },
        { id: 'reports', label: 'Reports',       icon: 'trending', title: 'Reports' }
      ];

      /* ------------------------------ chrome ------------------------------ */
      function paintNav(counts) {
        $('#nav').innerHTML = VIEWS.map(v => {
          const n = v.id === 'orders' ? counts.ready : v.id === 'queue' ? counts.queued : 0;
          return `<button data-v="${v.id}" aria-current="${v.id === view}">
            ${icon(v.icon, 18)}<span>${v.label}</span>
            ${n ? `<span class="badge">${n}</span>` : ''}</button>`;
        }).join('');
        const me = S.staff.get(ME);
        $('#who').innerHTML = `<b>${UI.esc(me.name)}</b><span>${UI.esc(me.role)} · tap to switch</span>`;
      }
      $('#nav').onclick = e => {
        const b = e.target.closest('[data-v]'); if (!b) return;
        view = b.dataset.v; if (view === 'punch') punchId = null; render();
      };
      $('#who').onclick = () => {
        UI.modal('Switch user', `<div class="stack">${['u1','u2','u3','u4','u5'].map(id => {
          const s = S.staff.get(id);
          return `<button class="tile" style="flex-direction:row;align-items:center;gap:11px;min-height:0" data-u="${id}">
            ${icon('user', 17)}<span class="grow"><b>${UI.esc(s.name)}</b>
            <span class="tiny muted" style="display:block">${UI.esc(s.role)} · PIN ${s.pin}</span></span></button>`;
        }).join('')}</div>`);
        $('#mBody').onclick = e => { const b = e.target.closest('[data-u]'); if (b) { ME = b.dataset.u; UI.close(); render(); } };
      };

      /* ------------------------------ render ------------------------------ */
      async function render() {
        const all = await S.orders.list();
        const active = all.filter(o => ['placed', 'preparing', 'ready'].includes(o.status));
        paintNav({
          ready: active.filter(o => o.status === 'ready').length,
          queued: all.filter(o => o.printStatus === 'queued' && o.status !== 'void').length
        });
        $('#title').textContent = (VIEWS.find(v => v.id === view) || {}).title;
        $('#view').classList.toggle('view-flush', view === 'punch');
        $('#barActions').innerHTML = (view === 'floor' || view === 'orders')
          ? `<button class="btn btn-primary btn-sm" id="newCounter">${icon('bag', 15)} Counter order</button>` : '';
        const nc = $('#newCounter'); if (nc) nc.onclick = () => newOrder('counter');

        if (view === 'floor')   floorView(all);
        if (view === 'punch')   punchView();
        if (view === 'orders')  ordersView(all, active);
        if (view === 'kitchen') kitchenView(active);
        if (view === 'queue')   queueView(all);
        if (view === 'reports') reportsView();
        active.forEach(o => seen.add(o.id));
        first = false;
      }

      /* ------------------------------- floor ------------------------------ */
      function floorView(all) {
        const tables = S.tables.list();
        const counter = all.filter(o => o.type === 'counter' && ['placed','preparing','ready'].includes(o.status));
        $('#view').innerHTML = `
          <div class="floor">${tables.map(t => {
            if (!t.order) return `<button class="tbl free" data-new="${t.n}">
              <div class="tn">${t.n}</div><div class="meta">Free</div>
              <div class="amt" style="color:var(--ink-soft);font-size:13px">Tap to seat</div></button>`;
            const tt = totals(t.order);
            return `<button class="tbl ${t.status}" data-open="${t.order.id}">
              <div class="between"><span class="tn">${t.n}</span>${UI.statusChip(t.order.status)}</div>
              <div class="meta">${t.order.guests} cover${t.order.guests > 1 ? 's' : ''} · ${UI.ago(t.order.openedAt)}</div>
              <div class="meta">${UI.esc(S.staff.name(t.order.waiter || t.order.openedBy))}</div>
              <div class="amt">${money(tt.total)}</div></button>`;
          }).join('')}</div>
          ${counter.length ? `<h3 style="font-size:15px;margin:22px 0 10px">Counter orders</h3>
            <div class="floor">${counter.map(o => `<button class="tbl ${o.status}" data-open="${o.id}">
              <div class="between"><span class="tn" style="font-size:17px">${UI.esc(o.code)}</span>${UI.statusChip(o.status)}</div>
              <div class="meta">Takeaway · ${UI.ago(o.openedAt)}</div>
              <div class="amt">${money(totals(o).total)}</div></button>`).join('')}</div>` : ''}`;
        $('#view').onclick = e => {
          const nw = e.target.closest('[data-new]'), op = e.target.closest('[data-open]');
          if (nw) return newOrder('dine-in', +nw.dataset.new);
          if (op) { punchId = op.dataset.open; view = 'punch'; render(); }
        };
      }

      function newOrder(type, table) {
        if (type === 'counter') {
          S.orders.create({ type: 'counter', table: null, guests: 1, openedBy: ME })
            .then(o => { punchId = o.id; view = 'punch'; render(); });
          return;
        }
        UI.modal(`Seat table ${table}`, `
          <label class="field"><span>Covers</span>
            <div class="row" style="gap:7px;flex-wrap:wrap" id="cov">
              ${[1,2,3,4,5,6,8,10].map(n => `<button class="btn btn-ghost" data-g="${n}" style="min-width:52px">${n}</button>`).join('')}
            </div></label>
          <label class="field"><span>Server</span>
            <select class="input" id="wtr">${['u3','u4','u5'].map(id =>
              `<option value="${id}">${UI.esc(S.staff.name(id))}</option>`).join('')}</select></label>`);
        $('#cov').onclick = async e => {
          const b = e.target.closest('[data-g]'); if (!b) return;
          const o = await S.orders.create({ type: 'dine-in', table, guests: +b.dataset.g,
            waiter: $('#wtr').value, openedBy: ME });
          UI.close(); punchId = o.id; view = 'punch'; render();
        };
      }

      /* ------------------------------- punch ------------------------------ */
      async function punchView() {
        if (!punchId) {
          $('#view').classList.remove('view-flush');
          $('#view').innerHTML = `<div class="empty">${icon('table', 38)}<h3>Pick a table or start a counter order</h3>
            <p class="small">Choose a free table on the Floor screen, or start a counter order.</p>
            <div class="row" style="justify-content:center;gap:9px;margin-top:16px">
              <button class="btn btn-ghost" id="toFloor">Go to floor</button>
              <button class="btn btn-primary" id="toCounter">${icon('bag', 15)} Counter order</button></div></div>`;
          $('#toFloor').onclick = () => { view = 'floor'; render(); };
          $('#toCounter').onclick = () => newOrder('counter');
          return;
        }
        const o = await S.orders.get(punchId);
        if (!o) { punchId = null; return punchView(); }
        const items = AV_MENU.filter(i => i.cat === cat);
        const cats = AV_SECTIONS.reduce((a, s) => a.concat(s.cats), []);
        const t = totals(o);
        const pending = o.items.filter(i => i.kot === null && !i.voided).length;

        $('#view').innerHTML = `<div class="punch">
          <div class="punch-menu">
            <div class="cat-rail">${cats.map(c => `<button data-c="${UI.esc(c)}" aria-pressed="${c === cat}">${UI.esc(c)}</button>`).join('')}</div>
            <div class="grid">${items.map(i => `<button class="tile" data-add="${i.id}">
              <b>${UI.esc(i.name)}</b>
              <span class="marks">${i.veg ? '<span class="mark mark-veg"></span>' : ''}${i.spicy ? icon('fire', 12) : ''}</span>
              <span class="price">${i.price != null ? money(i.price) : 'from ' + money(Math.min.apply(null, i.variants.map(v => v.p)))}</span>
            </button>`).join('')}</div>
          </div>
          <div class="ticket">
            <div class="ticket-head"><div class="between">
              <div><b style="font-size:16px">${o.type === 'dine-in' ? 'Table ' + o.table : 'Counter'}</b>
                <div class="tiny muted">Bill ${UI.esc(o.code)} · ${o.guests} cover${o.guests > 1 ? 's' : ''} · ${UI.esc(S.staff.name(o.waiter || o.openedBy))}</div></div>
              ${UI.statusChip(o.status)}</div></div>
            <div class="ticket-lines" id="tl">${lineHTML(o)}</div>
            <div class="ticket-foot">
              <div class="trow"><span class="muted">Subtotal</span><span class="num">${money(t.gross)}</span></div>
              ${t.comps ? `<div class="trow" style="color:var(--green)"><span>Comps</span><span class="num">−${money(t.comps)}</span></div>` : ''}
              ${t.discount ? `<div class="trow" style="color:var(--green)"><span>Discount</span><span class="num">−${money(t.discount)}</span></div>` : ''}
              ${t.service ? `<div class="trow"><span class="muted">Service ${t.servicePct}%</span><span class="num">${money(t.service)}</span></div>` : ''}
              <div class="trow grand"><span>Total</span><span class="price">${money(t.total)}</span></div>
              <div class="trow tiny muted"><span>ABST ${t.abstRate}% included</span><span class="num">${money(t.abst)}</span></div>
              <div class="row" style="gap:7px;margin-top:11px">
                <button class="btn ${pending ? 'btn-primary' : 'btn-ghost'} grow" id="fire" ${pending ? '' : 'disabled'}>
                  ${icon('chef', 16)} ${pending ? `Send ${pending} to kitchen` : 'Kitchen up to date'}</button>
              </div>
              <div class="row" style="gap:7px;margin-top:7px">
                <button class="btn btn-ghost btn-sm grow" id="disc">${icon('percent', 14)} Discount</button>
                <button class="btn btn-ghost btn-sm grow" id="reprint" ${o.kotBatches.length ? '' : 'disabled'}>${icon('printer', 14)} Reprint KOT</button>
              </div>
              ${o.items.filter(i => !i.voided).length ? `
                <div class="row" style="gap:7px;margin-top:7px">
                  <button class="btn btn-ghost btn-sm grow" id="printBill">${icon('printer', 14)} Print bill</button>
                  ${BACK ? '' : `<button class="btn btn-ghost btn-sm grow" id="toBO" ${o.printStatus === 'queued' ? 'disabled' : ''}>
                    ${icon('layers', 14)} ${o.printStatus === 'queued' ? 'With back office' : 'Ready to print'}</button>`}
                </div>` : ''}
              <button class="btn btn-dark btn-block" id="bill" style="margin-top:7px" ${o.items.filter(i => !i.voided).length ? '' : 'disabled'}>
                ${icon('receipt', 16)} ${o.status === 'settled' ? 'Bill settled' : 'Bill &amp; settle'}</button>
              <div class="row" style="gap:7px;margin-top:6px">
                <button class="btn btn-quiet tiny grow" id="park">Park &amp; return to floor</button>
                <button class="btn btn-quiet tiny" id="voidOrder" style="color:var(--red)">Void bill</button>
              </div>
            </div>
          </div></div>`;

        $('.cat-rail').onclick = e => { const b = e.target.closest('[data-c]'); if (b) { cat = b.dataset.c; punchView(); } };
        $('.grid').onclick = e => { const b = e.target.closest('[data-add]'); if (b) addItem(o, b.dataset.add); };
        $('#tl').onclick = e => { const b = e.target.closest('[data-line]'); if (b) lineActions(o, b.dataset.line); };
        $('#fire').onclick = async () => {
          try {
            const u = await S.orders.fireKOT(o.id, ME);
            const b = u.kotBatches[u.kotBatches.length - 1];
            UI.toast('KOT #' + b.n + ' sent to kitchen', 'good');
            showKOT(u, b.n); render();
          } catch (err) { UI.toast(err.message); }
        };
        $('#reprint').onclick = () => showKOT(o, o.kotBatches[o.kotBatches.length - 1].n, true);
        $('#disc').onclick = () => discountFlow(o);
        $('#bill').onclick = () => billFlow(o.id);

        /* Print and hand-over are available on the open bill too, not only after
           payment — the guest usually wants the bill in hand before they pay. */
        const pb = $('#printBill');
        if (pb) pb.onclick = async () => {
          if (o.status === 'settled') await S.orders.setPrintStatus(o.id, 'printed', ME);
          showBill(await S.orders.get(o.id));
          render();
        };
        const tb = $('#toBO');
        if (tb) tb.onclick = async () => {
          const rec = await window.handOverToBackOffice(o.id, ME);
          UI.toast(`Bill ${o.code} sent to back office as ${rec.code}`, 'good');
          punchId = null; view = 'floor'; render();
        };
        $('#park').onclick = () => { punchId = null; view = 'floor'; render(); };
        $('#voidOrder').onclick = () => reasonFlow('Void the whole bill', S.VOID_REASONS, true, async (r, pin) => {
          try { await S.orders.voidOrder(o.id, r, ME, pin); UI.toast('Bill ' + o.code + ' voided', 'good');
                punchId = null; view = 'floor'; render(); }
          catch (err) { UI.toast(err.message); }
        });
      }

      function lineHTML(o) {
        if (!o.items.length) return `<div class="empty" style="padding:34px 10px">${icon('receipt', 30)}<p class="small">Tap menu items to add</p></div>`;
        return o.items.map(i => {
          const cls = i.voided ? 'void' : i.comp ? 'comp' : i.kot !== null ? 'fired' : '';
          return `<div class="tline ${cls}">
            <span class="grow">
              <span class="nm">${i.qty}× ${UI.esc(i.name)}</span>
              ${i.variant ? `<span class="sub">${UI.esc(i.variant)}</span>` : ''}
              ${i.notes ? `<span class="sub" style="color:var(--clay)">${icon('edit', 10)} ${UI.esc(i.notes)}</span>` : ''}
              ${i.voided ? `<span class="sub" style="color:var(--red)">Voided — ${UI.esc(i.voided.reason)}</span>` : ''}
              ${i.comp ? `<span class="sub" style="color:var(--green)">${UI.esc(i.comp.reason)}</span>` : ''}
              <span class="row" style="gap:5px;margin-top:5px">
                <span class="kotdot ${i.kot === null ? 'pending' : ''}">${i.kot === null ? 'NOT SENT' : 'KOT ' + i.kot}</span>
                ${i.voided ? '' : `<button class="btn-quiet tiny" data-line="${i.uid}" style="padding:2px 6px">Edit</button>`}
              </span>
            </span>
            <span class="amt">${i.comp ? '—' : money(i.price * i.qty)}</span></div>`;
        }).join('');
      }

      async function addItem(o, id) {
        const it = AV_MENU.find(i => i.id === id);
        if (!it.variants) {
          await S.orders.addItems(o.id, [{ id: it.id, name: it.name, price: it.price, qty: 1 }], ME);
          return punchView();
        }
        UI.modal(it.name, `${it.desc ? `<p class="muted small" style="margin-bottom:12px">${UI.esc(it.desc)}</p>` : ''}
          <div class="stack">${it.variants.map(v =>
            `<button class="tile" style="flex-direction:row;align-items:center;min-height:0" data-v="${UI.esc(v.l)}" data-p="${v.p}">
              <span class="grow"><b>${UI.esc(v.l)}</b></span><span class="price">${money(v.p)}</span></button>`).join('')}</div>`);
        $('#mBody').onclick = async e => {
          const b = e.target.closest('[data-v]'); if (!b) return;
          await S.orders.addItems(o.id, [{ id: it.id, name: it.name, price: +b.dataset.p, qty: 1, variant: b.dataset.v }], ME);
          UI.close(); punchView();
        };
      }

      async function lineActions(o, uid) {
        const fresh = await S.orders.get(o.id);
        const l = fresh.items.find(i => i.uid === uid);
        const fired = l.kot !== null;
        UI.modal(`${l.qty}× ${l.name}`, `
          ${fired ? `<div class="notice" style="margin-bottom:14px">${icon('alert', 14)} Already sent to the kitchen on KOT #${l.kot}. Voiding needs a manager and prints a cancellation ticket.</div>` : ''}
          ${!fired ? `<div class="between" style="margin-bottom:16px"><b>Quantity</b>
            <span class="qty"><button id="qm">${icon('minus', 16)}</button><span id="qv">${l.qty}</span><button id="qp">${icon('plus', 16)}</button></span></div>
            <label class="field"><span>Note for the kitchen</span>
              <input class="input" id="ln" value="${UI.esc(l.notes)}" placeholder="No peanuts, extra spicy…"></label>` : ''}
          <div class="stack" style="margin-top:8px">
            <button class="btn btn-ghost btn-block" id="doComp">${icon('gift', 15)} Comp this item</button>
            <button class="btn btn-danger btn-block" id="doVoid">${icon('trash', 15)} ${fired ? 'Void' : 'Remove'} this item</button>
          </div>`, !fired ? `<button class="btn btn-primary btn-block" id="saveLine">Save</button>` : '');
        if (!fired) {
          let q = l.qty;
          const sync = () => { $('#qv').textContent = q; $('#qm').disabled = q <= 1; };
          $('#qm').onclick = () => { if (q > 1) { q--; sync(); } };
          $('#qp').onclick = () => { q++; sync(); }; sync();
          $('#saveLine').onclick = async () => {
            await S.orders.setQty(o.id, uid, q);
            await S.orders.setNote(o.id, uid, $('#ln').value.trim());
            UI.close(); punchView();
          };
        }
        $('#doVoid').onclick = () => reasonFlow(fired ? 'Void a sent item' : 'Remove item', S.VOID_REASONS, fired,
          async (reason, pin) => {
            try {
              await S.orders.voidLine(o.id, uid, reason, ME, pin);
              UI.toast(fired ? 'Voided — cancellation ticket printed' : 'Removed', 'good');
              if (fired) showVoidTicket(await S.orders.get(o.id), l, reason);
              punchView(); render();
            } catch (err) { UI.toast(err.message); }
          });
        $('#doComp').onclick = () => reasonFlow('Comp this item', S.COMP_REASONS, true, async (reason, pin) => {
          try { await S.orders.compLine(o.id, uid, reason, ME, pin); UI.toast('Item comped', 'good'); punchView(); render(); }
          catch (err) { UI.toast(err.message); }
        });
      }

      function reasonFlow(title, reasons, needsPin, done) {
        UI.modal(title, `
          <label class="field"><span>Reason</span>
            <select class="input" id="rsn">${reasons.map(r => `<option>${UI.esc(r)}</option>`).join('')}</select></label>
          ${needsPin ? `<label class="field"><span>Manager PIN</span>
            <input class="input" id="pin" type="password" inputmode="numeric" maxlength="4" placeholder="••••" autocomplete="off">
            <span class="tiny muted" style="display:block;margin-top:5px">Demo manager PIN is 1234</span></label>` : ''}`,
          `<button class="btn btn-primary btn-block" id="ok">Confirm</button>`);
        $('#ok').onclick = () => { const r = $('#rsn').value, p = needsPin ? $('#pin').value : null; UI.close(); done(r, p); };
      }

      function discountFlow(o) {
        UI.modal('Apply discount', `
          <div class="row" style="gap:7px;margin-bottom:14px">
            ${[5,10,15,20].map(p => `<button class="btn btn-ghost grow" data-pct="${p}">${p}%</button>`).join('')}</div>
          <label class="field"><span>Or a fixed amount (${AV_CONFIG.currency})</span>
            <input class="input" id="amt" type="number" min="0" step="1" placeholder="0.00"></label>
          <label class="field"><span>Reason</span>
            <select class="input" id="rsn">${S.DISCOUNT_REASONS.map(r => `<option>${UI.esc(r)}</option>`).join('')}</select></label>
          <label class="field"><span>Manager PIN</span>
            <input class="input" id="pin" type="password" inputmode="numeric" maxlength="4" placeholder="••••">
            <span class="tiny muted" style="display:block;margin-top:5px">Demo manager PIN is 1234</span></label>
          ${o.discount ? `<button class="btn btn-quiet btn-block" id="clr" style="margin-top:6px;color:var(--red)">Remove current discount</button>` : ''}`,
          `<button class="btn btn-primary btn-block" id="ok">Apply</button>`);
        const apply = async d => {
          try { await S.orders.setDiscount(o.id, d, ME, $('#pin').value); UI.close();
                UI.toast(d ? 'Discount applied' : 'Discount removed', 'good'); punchView(); }
          catch (err) { UI.toast(err.message); }
        };
        $('#mBody').onclick = e => { const b = e.target.closest('[data-pct]');
          if (b) apply({ type: 'pct', value: +b.dataset.pct, reason: $('#rsn').value }); };
        $('#ok').onclick = () => { const v = parseFloat($('#amt').value);
          if (!v) return UI.toast('Enter an amount or pick a percentage');
          apply({ type: 'amt', value: v, reason: $('#rsn').value }); };
        const c = $('#clr'); if (c) c.onclick = () => apply(null);
      }

      /* ------------------------------ billing ----------------------------- */
      async function billFlow(id) {
        let method = 'cash';
        const draw = async () => {
          const cur = await S.orders.get(id);
          const t = totals(cur);
          $('#mBody').innerHTML = `
            <div class="between" style="margin-bottom:12px">
              <div><b>Bill ${UI.esc(cur.code)}</b><div class="tiny muted">${cur.type === 'dine-in' ? 'Table ' + cur.table + ' · ' + cur.guests + ' covers' : 'Counter'}</div></div>
              ${UI.statusChip(cur.status)}</div>
            ${cur.items.filter(i => !i.voided).map(i => `<div class="trow">
              <span class="grow">${i.qty}× ${UI.esc(i.name)}${i.comp ? ' <span class="chip green">comp</span>' : ''}</span>
              <span class="num">${i.comp ? '—' : money(i.price * i.qty)}</span></div>`).join('')}
            <div style="border-top:1px dashed var(--line);margin-top:12px;padding-top:10px">
              <div class="trow"><span class="muted">Subtotal</span><span class="num">${money(t.gross)}</span></div>
              ${t.comps ? `<div class="trow" style="color:var(--green)"><span>Comps</span><span class="num">−${money(t.comps)}</span></div>` : ''}
              ${t.discount ? `<div class="trow" style="color:var(--green)"><span>Discount</span><span class="num">−${money(t.discount)}</span></div>` : ''}
              ${t.service ? `<div class="trow"><span class="muted">Service ${t.servicePct}%</span><span class="num">${money(t.service)}</span></div>` : ''}
              ${t.tip ? `<div class="trow"><span class="muted">Tip</span><span class="num">${money(t.tip)}</span></div>` : ''}
              <div class="trow grand"><span>Total</span><span class="price">${money(t.total)}</span></div>
              ${t.paid ? `<div class="trow" style="color:var(--green)"><span>Paid so far</span><span class="num">${money(t.paid)}</span></div>
                <div class="trow grand"><span>Balance due</span><span class="price">${money(t.due)}</span></div>` : ''}
            </div>
            ${cur.type === 'dine-in' ? `<div class="field" style="margin-top:14px"><span>Tip</span>
              <div class="row" style="gap:5px" id="tips">${AV_CONFIG.tipPresets.map(p =>
                `<button class="btn btn-ghost btn-sm grow" data-t="${p}" aria-pressed="${Math.abs(t.tip - t.serviceable * p / 100) < .01 && (p > 0 || t.tip === 0)}">${p ? p + '%' : 'None'}</button>`).join('')}</div></div>` : ''}
            <div class="field"><span>Payment method</span>
              <div class="row" style="gap:5px" id="pm">${[['cash','Cash','cash'],['card','Card','card'],['mobile','Mobile','smartphone']].map(([k,l,ic]) =>
                `<button class="btn btn-ghost btn-sm grow" data-m="${k}" aria-pressed="${method === k}">${icon(ic, 14)} ${l}</button>`).join('')}</div></div>
            <label class="field"><span>Amount tendered (blank pays the balance)</span>
              <input class="input" id="tend" type="number" step="0.01" placeholder="${t.due.toFixed(2)}"></label>`;
          UI.setFoot(`<button class="btn btn-primary btn-block btn-lg" id="take">Take ${money(t.due)} ${method}</button>`);

          const tp = $('#tips');
          if (tp) tp.onclick = async e => { const b = e.target.closest('[data-t]'); if (!b) return;
            await S.orders.setTip(id, S.round2(t.serviceable * (+b.dataset.t) / 100)); draw(); };
          $('#pm').onclick = e => { const b = e.target.closest('[data-m]'); if (b) { method = b.dataset.m; draw(); } };
          $('#take').onclick = async () => {
            const typed = parseFloat($('#tend').value);
            const amount = isNaN(typed) || typed <= 0 ? t.due : Math.min(typed, t.due);
            const change = isNaN(typed) ? 0 : Math.max(0, typed - t.due);
            await S.orders.addPayment(id, method, amount, ME);
            const after = await S.orders.get(id);
            if (after.status === 'settled') {
              /* An order raised at this station on a busy night is copied into
                 main, so the audited books stay complete. Handed-over bills
                 already live there and are skipped by the sync. */
              if (BACK) {
                const synced = await window.syncBackOfficeOrderToMain(after);
                if (synced) UI.toast('Recorded in main as bill ' + synced.code, 'good');
              }
              UI.close(); printChoice(after, change); render();
            }
            else { UI.toast('Part payment taken — ' + money(totals(after).due) + ' still due', 'good'); draw(); render(); }
          };
        };
        UI.modal('Bill', '<p class="muted small">Loading…</p>');
        draw();
      }

      /* The handover point. Both paths record the bill identically here — the
         only difference is which printer the paper comes out of. */
      function printChoice(o, change) {
        UI.modal('Bill ' + o.code + ' settled', `
          <div class="notice" style="margin-bottom:16px;background:var(--green-wash);border-left:3px solid var(--green)">
            ${icon('check', 14)} ${money(totals(o).total)} taken${change > 0 ? ` · change ${money(change)}` : ''}.
            This bill is recorded and counts in today's reports either way.</div>
          <div class="stack">
            <button class="tile" style="flex-direction:row;align-items:center;gap:12px;min-height:0;padding:15px" id="pNow">
              <span class="led-ic" style="width:38px;height:38px;border-radius:10px;background:var(--clay-wash);color:var(--clay);display:grid;place-items:center">${icon('printer', 19)}</span>
              <span class="grow"><b style="font-size:15px">Print now</b>
              <span class="tiny muted" style="display:block">Prints here at the counter and hands to the guest</span></span></button>
            ${BACK ? '' : `<button class="tile" style="flex-direction:row;align-items:center;gap:12px;min-height:0;padding:15px" id="pLater">
              <span class="led-ic" style="width:38px;height:38px;border-radius:10px;background:var(--gold-wash);color:#8A6414;display:grid;place-items:center">${icon('layers', 19)}</span>
              <span class="grow"><b style="font-size:15px">Ready to print</b>
              <span class="tiny muted" style="display:block">Hands it to the back office to print on their printer</span></span></button>`}
          </div>`);
        $('#pNow').onclick = async () => {
          await S.orders.setPrintStatus(o.id, 'printed', ME);
          UI.close(); showBill(await S.orders.get(o.id), change);
          punchId = null; view = BACK ? 'queue' : 'floor'; render();
        };
        const pl = $('#pLater');
        if (pl) pl.onclick = async () => {
          const rec = await window.handOverToBackOffice(o.id, ME);
          UI.close();
          UI.toast(`Bill ${o.code} sent to back office as ${rec.code}`, 'good');
          punchId = null; view = 'floor'; render();
        };
      }

      /* ---------------------------- print queue --------------------------- */
      function queueView(all) {
        /* A bill can be handed over before it is paid — the guest normally wants
           it in hand first — so the queue is keyed on print state, not payment. */
        const rows = all.filter(o => o.printStatus === 'queued' && o.status !== 'void');
        const done = all.filter(o => o.printStatus === 'printed' && o.sourceCode);
        $('#view').innerHTML = `
          <p class="muted small" style="margin-bottom:16px">${BACK
            ? 'Bills handed over from the counter, with the full order behind each one. Print here and give the paper to the guest.'
            : 'Bills settled here and handed to the back office to print. They are already counted in today\'s reports — only the printing is elsewhere.'}</p>
          ${rows.length ? `<div class="board" style="grid-template-columns:repeat(auto-fill,minmax(320px,1fr))">
            ${rows.map(o => qcard(o, false)).join('')}</div>`
            : `<div class="empty">${icon('printer', 38)}<h3>Nothing waiting</h3>
              <p class="small">${BACK ? 'Bills sent from the counter land here.' : 'Bills you mark "Ready to print" appear here.'}</p></div>`}
          ${done.length ? `<h3 style="font-size:15px;margin:26px 0 10px">Printed earlier</h3>
            <div class="board" style="grid-template-columns:repeat(auto-fill,minmax(320px,1fr))">
              ${done.map(o => qcard(o, true)).join('')}</div>` : ''}`;
        $('#view').onclick = async e => {
          const p = e.target.closest('[data-print]'), d = e.target.closest('[data-detail]');
          if (p) {
            const o = await S.orders.get(p.dataset.print);
            await S.orders.setPrintStatus(o.id, 'printed', ME);
            showBill(await S.orders.get(o.id));
            render();
          }
          if (d) showChain(await S.orders.get(d.dataset.detail));
        };
      }

      function qcard(o, printed) {
        const t = totals(o);
        return `<div class="qcard ${printed ? 'done' : ''}">
          <div class="between">
            <div><b class="price" style="font-size:19px">${UI.esc(o.code)}</b>
              <div class="tiny muted">${o.type === 'dine-in' ? 'Table ' + o.table + ' · ' + o.guests + ' covers' : 'Counter'} · ${UI.esc(S.staff.name(o.waiter || o.openedBy))}</div></div>
            <b class="price" style="font-size:17px">${money(t.total)}</b></div>
          ${o.sourceCode ? `<div class="chain">${icon('arrowRight', 12)}
            <span>From <b>${UI.esc(o.sourceSystem)}</b> bill <b>${UI.esc(o.sourceCode)}</b></span></div>` : ''}
          ${o.sentToCode ? `<div class="chain">${icon('arrowRight', 12)}
            <span>Sent to <b>back office</b> as bill <b>${UI.esc(o.sentToCode)}</b></span></div>` : ''}
          <div class="row" style="gap:6px;flex-wrap:wrap">
            ${o.status === 'settled'
              ? `<span class="chip green">${icon('check', 11)} Paid · ${(o.payments || []).map(p => p.method).join(' + ')}</span>`
              : `<span class="chip gold">${icon('clock', 11)} Payment pending</span>`}
            <span class="chip gray">${o.items.filter(i => !i.voided).reduce((n, i) => n + i.qty, 0)} items</span>
          </div>
          <div class="tiny muted">${o.status === 'settled'
            ? 'Settled ' + UI.ago(o.settledAt) + ' ago'
            : 'Guest still to pay — settle at the counter'}</div>
          <div class="row" style="gap:7px">
            <button class="btn ${printed ? 'btn-ghost' : 'btn-primary'} btn-sm grow" data-print="${o.id}">
              ${icon('printer', 14)} ${printed ? 'Print again' : 'Print bill'}</button>
            <button class="btn btn-ghost btn-sm" data-detail="${o.id}">History</button>
          </div></div>`;
      }

      /* The full chain behind a handed-over bill — what the back office needs
         to answer a guest's question without ringing the counter. */
      function showChain(o) {
        const t = totals(o);
        UI.modal('Bill ' + o.code + ' — history', `
          ${o.sourceCode ? `<div class="chain" style="margin-bottom:14px">${icon('layers', 13)}
            <span>Received from <b>${UI.esc(o.sourceSystem)}</b> bill <b>${UI.esc(o.sourceCode)}</b> · ${UI.ago(o.receivedAt)} ago</span></div>` : ''}
          <table class="tb" style="margin-bottom:14px"><tbody>
            <tr><td class="muted">Opened</td><td>${new Date(o.openedAt).toLocaleString()}</td></tr>
            <tr><td class="muted">${o.type === 'dine-in' ? 'Table' : 'Type'}</td><td>${o.type === 'dine-in' ? o.table + ' · ' + o.guests + ' covers' : 'Counter / takeaway'}</td></tr>
            <tr><td class="muted">Server</td><td>${UI.esc(S.staff.name(o.waiter || o.openedBy))}</td></tr>
            ${(o.kotBatches || []).map(b => `<tr><td class="muted">KOT #${b.n}${b.kind === 'addition' ? ' (addition)' : ''}</td>
              <td>${new Date(b.at).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})} · ${UI.esc(S.staff.name(b.by))}</td></tr>`).join('')}
            <tr><td class="muted">Settled</td><td>${o.settledAt ? new Date(o.settledAt).toLocaleString() : '—'}</td></tr>
            <tr><td class="muted">Payment</td><td>${(o.payments || []).map(p => p.method + ' ' + money(p.amount)).join(' + ') || '—'}</td></tr>
          </tbody></table>
          <h3 style="font-size:14px;margin-bottom:8px">Items</h3>
          ${o.items.map(i => `<div class="trow ${i.voided ? 'muted' : ''}">
            <span class="grow" style="${i.voided ? 'text-decoration:line-through' : ''}">${i.qty}× ${UI.esc(i.name)}${i.variant ? ' (' + UI.esc(i.variant) + ')' : ''}
              ${i.notes ? `<span class="tiny" style="color:var(--clay);display:block">${UI.esc(i.notes)}</span>` : ''}</span>
            <span class="num">${i.comp ? 'comp' : money(i.price * i.qty)}</span></div>`).join('')}
          <div class="trow grand"><span>Total</span><span class="price">${money(t.total)}</span></div>`,
          `<button class="btn btn-primary btn-block" id="pb">${icon('printer', 16)} Print bill</button>`);
        $('#pb').onclick = async () => { await S.orders.setPrintStatus(o.id, 'printed', ME); showBill(await S.orders.get(o.id)); render(); };
      }

      /* -------------------------- printed documents ----------------------- */
      const R = () => AV_CONFIG.restaurant;

      function showKOT(o, batch, reprint) {
        const lines = o.items.filter(i => i.kot === batch && !i.voided);
        const b = o.kotBatches.find(x => x.n === batch) || {};
        const amend = b.kind === 'addition';
        UI.modal('Kitchen ticket', `<div class="doc ${amend ? 'amend' : ''}">
          <div class="center"><h4>${amend ? '*** ADDITION ***' : '*** KITCHEN ORDER ***'}</h4>
          <div>${UI.esc(R().name)}</div>${reprint ? '<div><b>** REPRINT **</b></div>' : ''}</div>
          <div class="dash"></div>
          <div class="between"><b>Bill ${UI.esc(o.code)}</b><span>KOT #${batch}</span></div>
          <div class="between"><span>${o.type === 'dine-in' ? 'TABLE ' + o.table : 'COUNTER / TAKEAWAY'}</span>
            <span>${new Date(b.at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
          <div>Server: ${UI.esc(S.staff.name(b.by || o.openedBy))}${o.type === 'dine-in' ? ' · ' + o.guests + ' covers' : ''}</div>
          <div class="dash"></div>
          ${lines.map(i => `<div class="krow"><span class="kq">${i.qty}</span>
            <span class="grow">${UI.esc(i.name.toUpperCase())}${i.variant ? `<br><span style="font-size:11px">&gt; ${UI.esc(i.variant)}</span>` : ''}</span></div>
            ${i.notes ? `<div class="knote">** ${UI.esc(i.notes.toUpperCase())} **</div>` : ''}`).join('')}
          <div class="dash"></div>
          <div class="center" style="font-size:11px">${lines.reduce((n, i) => n + i.qty, 0)} items</div></div>`,
          `<button class="btn btn-primary btn-block" id="pr">${icon('printer', 16)} Print to kitchen printer</button>`);
        $('#pr').onclick = UI.print;
      }

      function showVoidTicket(o, line, reason) {
        UI.modal('Cancellation ticket', `<div class="doc voidt">
          <div class="center"><h4>*** VOID / CANCEL ***</h4><div>${UI.esc(R().name)}</div></div>
          <div class="dash"></div>
          <div class="between"><b>Bill ${UI.esc(o.code)}</b><span>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
          <div>${o.type === 'dine-in' ? 'TABLE ' + o.table : 'COUNTER'}</div>
          <div class="dash"></div>
          <div class="krow"><span class="kq">${line.qty}</span><span class="grow"><b>${UI.esc(line.name.toUpperCase())}</b></span></div>
          <div class="knote">REASON: ${UI.esc(reason.toUpperCase())}</div>
          <div class="dash"></div>
          <div class="center" style="font-size:11px">DO NOT PREPARE</div></div>`,
          `<button class="btn btn-primary btn-block" id="pr">${icon('printer', 16)} Print to kitchen</button>`);
        $('#pr').onclick = UI.print;
      }

      function showBill(o, change) {
        const t = totals(o);
        UI.modal('Bill ' + o.code, `<div class="doc">
          <div class="center"><h4>${UI.esc(AV_CONFIG.name.toUpperCase())}</h4>
            <div style="font-size:11px">${UI.esc(R().name)} · ${UI.esc(R().area)}</div>
            <div style="font-size:11px">${UI.esc(R().phone)}</div>
            <div style="font-size:11px">${UI.esc(AV_CONFIG.operator)}</div></div>
          <div class="dash"></div>
          <div class="between"><span>BILL ${UI.esc(o.code)}</span><span>${new Date().toLocaleString()}</span></div>
          ${o.sourceCode ? `<div class="between" style="font-size:11px"><span>Counter ref</span><span>${UI.esc(o.sourceCode)}</span></div>` : ''}
          <div class="between"><span>${o.type === 'dine-in' ? 'Table ' + o.table + ' · ' + o.guests + ' covers' : 'Counter'}</span>
            <span>${UI.esc(S.staff.name(o.waiter || o.openedBy))}</span></div>
          <div class="dash"></div>
          ${o.items.filter(i => !i.voided).map(i => `<div class="krow"><span class="kq">${i.qty}</span>
            <span class="grow">${UI.esc(i.name)}${i.variant ? ' (' + UI.esc(i.variant) + ')' : ''}${i.comp ? ' [COMP]' : ''}</span>
            <span>${i.comp ? '0.00' : (i.price * i.qty).toFixed(2)}</span></div>`).join('')}
          <div class="dash"></div>
          <div class="between"><span>Subtotal</span><span>${money(t.gross)}</span></div>
          ${t.comps ? `<div class="between"><span>Comps</span><span>−${money(t.comps)}</span></div>` : ''}
          ${t.discount ? `<div class="between"><span>Discount — ${UI.esc(o.discount.reason)}</span><span>−${money(t.discount)}</span></div>` : ''}
          ${t.service ? `<div class="between"><span>Service charge ${t.servicePct}%</span><span>${money(t.service)}</span></div>` : ''}
          ${t.tip ? `<div class="between"><span>Tip</span><span>${money(t.tip)}</span></div>` : ''}
          <div class="between" style="font-weight:700;font-size:14px;margin-top:5px"><span>TOTAL</span><span>${money(t.total)}</span></div>
          <div class="between" style="font-size:11px"><span>ABST ${t.abstRate}% included</span><span>${money(t.abst)}</span></div>
          ${(o.payments || []).map(p => `<div class="between"><span>Paid — ${p.method}</span><span>${money(p.amount)}</span></div>`).join('')}
          ${change > 0 ? `<div class="between"><span>Change</span><span>${money(change)}</span></div>` : ''}
          <div class="dash"></div>
          <div class="center" style="font-size:11px">${UI.esc(AV_CONFIG.taxNote)}<br>Thank you — please come again</div></div>`,
          `<button class="btn btn-primary btn-block" id="pr">${icon('printer', 16)} Print bill</button>`);
        $('#pr').onclick = UI.print;
      }

      /* --------------------------- active orders -------------------------- */
      function ordersView(all, active) {
        const cols = [['placed','Placed'],['preparing','Under preparation'],['ready','Ready for billing'],['settled','Settled']];
        $('#view').innerHTML = `<div class="board">${cols.map(([k, label]) => {
          const rows = k === 'settled' ? all.filter(o => o.status === 'settled') : active.filter(o => o.status === k);
          return `<div><div class="col-h"><h3>${label}</h3><span class="n">${rows.length}</span></div>
            ${rows.map(o => {
              const t = totals(o);
              const pend = o.items.filter(i => i.kot === null && !i.voided).length;
              return `<button class="ocard${!first && !seen.has(o.id) ? ' fresh' : ''}" data-open="${o.id}">
                <div class="between"><b class="price" style="font-size:16px">${UI.esc(o.code)}</b>${UI.statusChip(o.status)}</div>
                <div class="tiny muted" style="margin-top:2px">${o.type === 'dine-in' ? 'Table ' + o.table + ' · ' + o.guests + ' covers' : 'Counter / takeaway'} · ${UI.ago(o.openedAt)}</div>
                <div class="tiny muted">${UI.esc(S.staff.name(o.waiter || o.openedBy))}</div>
                <div style="margin:8px 0;font-size:13px">${o.items.filter(i => !i.voided).slice(0, 3).map(i => `<div>${i.qty}× ${UI.esc(i.name)}</div>`).join('')}
                  ${o.items.filter(i => !i.voided).length > 3 ? `<div class="muted">+${o.items.filter(i => !i.voided).length - 3} more</div>` : ''}</div>
                ${pend ? `<span class="chip gold">${pend} not sent to kitchen</span>` : ''}
                ${o.printStatus === 'queued' ? `<span class="chip gold">${icon('printer', 11)} With back office</span>` : ''}
                <div class="between" style="margin-top:8px;padding-top:8px;border-top:1px solid var(--line-soft)">
                  <span class="tiny muted">${o.status === 'settled' ? (o.payments[0] || {}).method || '' : 'Total'}</span>
                  <b class="price">${money(t.total)}</b></div></button>`;
            }).join('') || `<div class="card card-pad center small muted">Nothing here</div>`}</div>`;
        }).join('')}</div>`;
        $('#view').onclick = async e => {
          const b = e.target.closest('[data-open]'); if (!b) return;
          const o = all.find(x => x.id === b.dataset.open);
          if (o.status === 'settled') return showChain(o);
          punchId = o.id; view = 'punch'; render();
        };
      }

      /* ------------------------------ kitchen ----------------------------- */
      function kitchenView(active) {
        const tickets = [];
        active.forEach(o => o.kotBatches.forEach(b => {
          const lines = o.items.filter(i => i.kot === b.n && !i.voided);
          if (lines.length) tickets.push({ o, b, lines });
        }));
        tickets.sort((a, x) => new Date(a.b.at) - new Date(x.b.at));
        $('#view').innerHTML = `
          <p class="muted small" style="margin-bottom:14px">Everything the kitchen has been sent — the same tickets that print at the pass.</p>
          ${tickets.length ? `<div class="kds">${tickets.map(({ o, b, lines }) => {
            const mins = Math.round((Date.now() - new Date(b.at)) / 60000);
            return `<div class="doc ${mins > 20 ? 'old' : ''}">
              <div class="between"><b>Bill ${UI.esc(o.code)}</b><span class="age ${mins > 20 ? 'late' : ''}">${mins}m</span></div>
              <div>${o.type === 'dine-in' ? 'TABLE ' + o.table : 'COUNTER'} · KOT #${b.n}${b.kind === 'addition' ? ' (ADD)' : ''}</div>
              <div class="dash"></div>
              ${lines.map(i => `<div class="krow"><span class="kq">${i.qty}</span>
                <span class="grow">${UI.esc(i.name.toUpperCase())}${i.variant ? `<br><span style="font-size:11px">&gt; ${UI.esc(i.variant)}</span>` : ''}</span></div>
                ${i.notes ? `<div class="knote">** ${UI.esc(i.notes.toUpperCase())} **</div>` : ''}`).join('')}
              <div class="dash"></div>
              <button class="btn btn-ghost btn-sm btn-block no-print" data-rp="${o.id}|${b.n}">${icon('printer', 14)} Reprint</button>
            </div>`;
          }).join('')}</div>` : `<div class="empty">${icon('chef', 38)}<h3>Kitchen is clear</h3></div>`}`;
        $('#view').onclick = async e => {
          const b = e.target.closest('[data-rp]'); if (!b) return;
          const [id, n] = b.dataset.rp.split('|');
          showKOT(await S.orders.get(id), +n, true);
        };
      }

      /* ============================= REPORTS ============================== */
      function reportsView() {
        const s = S.reports.summary(range);
        const hours = S.reports.byHour(range);
        const items = S.reports.byItem(range);
        const cats = S.reports.byCategory(range);
        const staff = S.reports.byStaff(range);
        const ex = S.reports.exceptions(range);
        const rangeLabel = (S.reports.RANGES.find(r => r.id === range) || {}).label;

        const peak = Math.max.apply(null, hours.map(h => h.value).concat([1]));
        const payTotal = Object.values(s.byMethod).reduce((a, b) => a + b, 0) || 1;
        const itemTop = items.slice(0, 10);
        const itemMax = itemTop.length ? itemTop[0].value : 1;
        const catTotal = cats.reduce((a, c) => a + c.value, 0) || 1;

        $('#view').innerHTML = `
          <div class="between no-print" style="margin-bottom:16px;flex-wrap:wrap;gap:10px">
            <div class="range" id="rng">${S.reports.RANGES.map(r =>
              `<button data-r="${r.id}" aria-pressed="${r.id === range}">${r.label}</button>`).join('')}</div>
            <button class="btn btn-ghost btn-sm" id="printSummary">${icon('printer', 14)} Print summary</button>
          </div>

          ${!s.bills ? `<div class="empty">${icon('trending', 38)}<h3>Nothing settled ${rangeLabel.toLowerCase()}</h3>
            <p class="small">Bills appear here once they are paid.</p></div>` : `
          <div class="dash">
            <div class="panel">
              <div class="strip">
                <div><div class="lab">Bills</div><div class="val">${s.bills}</div>
                  <div class="sub">${s.dineIn} dine-in · ${s.counter} counter</div></div>
                <div><div class="lab">Covers</div><div class="val">${s.covers}</div>
                  <div class="sub">${money(s.avgCover)} per cover</div></div>
                <div><div class="lab">Net sales</div><div class="val clay">${money(s.net)}</div>
                  <div class="sub">after comps &amp; discounts</div></div>
                <div><div class="lab">Average bill</div><div class="val">${money(s.avgBill)}</div>
                  <div class="sub">${rangeLabel}</div></div>
                <div><div class="lab">Total taken</div><div class="val">${money(s.total)}</div>
                  <div class="sub">incl. service &amp; tips</div></div>
              </div>
            </div>

            <div class="panel c8">
              <h3>Sales by hour</h3>
              <div class="chart">${hours.map(h => {
                const pct = Math.round((h.value / peak) * 100);
                return `<div class="col ${h.value === peak && peak > 1 ? 'peak' : ''}">
                  <div class="bar" style="height:${Math.max(2, pct)}%">
                    <span class="amt-pop">${money(h.value)} · ${h.bills} bill${h.bills === 1 ? '' : 's'}</span></div>
                  <span class="hr">${String(h.hour).padStart(2, '0')}</span></div>`;
              }).join('')}</div>
            </div>

            <div class="panel c4">
              <h3>Payment methods</h3>
              <div class="share">${Object.keys(s.byMethod).length ? Object.entries(s.byMethod).map(([m, v], i) => `
                <div><div class="row2"><span style="text-transform:capitalize">${UI.esc(m)}</span>
                  <b>${money(v)}</b></div>
                  <div class="track"><div class="fill ${i % 2 ? 'alt' : ''}" style="width:${Math.round(v / payTotal * 100)}%"></div></div>
                  <span class="tiny muted">${Math.round(v / payTotal * 100)}% of takings</span></div>`).join('')
                : '<p class="small muted">No payments recorded.</p>'}</div>
            </div>

            <div class="panel c5">
              <h3>Day summary</h3>
              <div class="summary-rows">
                <div class="trow"><span class="muted">Gross sales</span><span class="num">${money(s.gross)}</span></div>
                <div class="trow"><span class="muted">Comps</span><span class="num">−${money(s.comps)}</span></div>
                <div class="trow"><span class="muted">Discounts</span><span class="num">−${money(s.discounts)}</span></div>
                <div class="trow rule"><span><b>Net sales</b></span><span class="num"><b>${money(s.net)}</b></span></div>
                <div class="trow"><span class="muted">Service charge</span><span class="num">${money(s.service)}</span></div>
                <div class="trow"><span class="muted">Tips</span><span class="num">${money(s.tips)}</span></div>
                <div class="trow grand"><span>Total taken</span><span class="price">${money(s.total)}</span></div>
                <div class="trow tiny muted"><span>ABST ${AV_CONFIG.abstRate}% included in net</span><span class="num">${money(s.abst)}</span></div>
              </div>
              ${!BACK && s.handedOver ? `<div class="pill-note" style="margin-top:12px">${icon('printer', 12)}
                ${s.printedHere} printed here · ${s.handedOver} printed by the back office — all counted above</div>` : ''}
            </div>

            <div class="panel c7">
              <h3>Category mix</h3>
              <div class="share">${cats.slice(0, 7).map((c, i) => `
                <div><div class="row2"><span>${UI.esc(c.name)}</span>
                  <b>${money(c.value)} <span class="tiny muted">· ${c.qty}</span></b></div>
                  <div class="track"><div class="fill ${i % 2 ? 'alt' : ''}" style="width:${Math.round(c.value / catTotal * 100)}%"></div></div>
                </div>`).join('')}</div>
            </div>

            <div class="panel c7">
              <h3>Top sellers</h3>
              <table class="tb"><thead><tr><th>Item</th><th class="r">Qty</th><th class="r">Value</th><th style="width:110px">Share</th></tr></thead>
                <tbody>${itemTop.map(i => `<tr><td>${UI.esc(i.name)}</td><td class="r num">${i.qty}</td>
                  <td class="r num">${money(i.value)}</td>
                  <td><div class="track" style="height:6px;background:var(--paper-3);border-radius:999px;overflow:hidden">
                    <div style="height:100%;width:${Math.round(i.value / itemMax * 100)}%;background:var(--clay);border-radius:999px"></div></div></td></tr>`).join('')}
                </tbody></table>
            </div>

            <div class="panel c5">
              <h3>Servers</h3>
              <table class="tb"><thead><tr><th>Name</th><th class="r">Bills</th><th class="r">Covers</th><th class="r">Value</th></tr></thead>
                <tbody>${staff.map(x => `<tr><td>${UI.esc(x.name)}</td><td class="r num">${x.bills}</td>
                  <td class="r num">${x.covers}</td><td class="r num">${money(x.value)}</td></tr>`).join('')}</tbody></table>
            </div>

            <div class="panel">
              <h3>Voids, comps &amp; discounts</h3>
              ${ex.lines.length || ex.bills.length ? `
                <div class="row" style="gap:9px;margin-bottom:12px;flex-wrap:wrap">
                  <span class="chip red">${ex.lines.filter(l => l.kind === 'Void').length} voids · ${money(ex.lines.filter(l => l.kind === 'Void').reduce((n, l) => n + l.value, 0))}</span>
                  <span class="chip gold">${ex.lines.filter(l => l.kind === 'Comp').length} comps · ${money(ex.lines.filter(l => l.kind === 'Comp').reduce((n, l) => n + l.value, 0))}</span>
                  <span class="chip gray">${ex.bills.length} bill-level · ${money(ex.billValue)}</span>
                </div>
                <table class="tb"><thead><tr><th>Bill</th><th>Type</th><th>Item</th><th class="r">Value</th><th>Reason</th><th>By</th><th>Approved</th></tr></thead>
                <tbody>${ex.lines.map(l => `<tr><td>${UI.esc(l.code)}</td>
                    <td><span class="chip ${l.kind === 'Void' ? 'red' : 'gold'}">${l.kind}</span></td>
                    <td>${l.qty}× ${UI.esc(l.name)}</td><td class="r num">${money(l.value)}</td>
                    <td class="muted small">${UI.esc(l.reason)}</td><td class="small">${UI.esc(l.by)}</td>
                    <td class="small">${UI.esc(l.approvedBy)}</td></tr>`).join('')}
                  ${ex.bills.map(b => `<tr><td>${UI.esc(b.code)}</td>
                    <td><span class="chip gray">${b.kind}</span></td><td>${UI.esc(b.detail)}</td>
                    <td class="r num">${money(b.value)}</td><td class="muted small">${UI.esc(b.reason)}</td>
                    <td class="small">${UI.esc(b.by)}</td><td class="small">${UI.esc(b.approvedBy)}</td></tr>`).join('')}
                </tbody></table>`
                : `<p class="small muted">Nothing voided, comped or discounted ${rangeLabel.toLowerCase()}.</p>`}
            </div>
          </div>`}`;

        $('#rng').onclick = e => { const b = e.target.closest('[data-r]'); if (b) { range = b.dataset.r; reportsView(); } };
        $('#printSummary').onclick = () => printSummary(s, rangeLabel);
      }

      function printSummary(s, label) {
        UI.modal('Sales summary', `<div class="doc">
          <div class="center"><h4>*** SALES SUMMARY ***</h4>
            <div>${UI.esc(AV_CONFIG.name)} · ${UI.esc(R().name)}</div>
            <div style="font-size:11px">${UI.esc(label)} · printed ${new Date().toLocaleString()}</div>
            ${BACK ? '<div style="font-size:11px">BACK OFFICE STATION</div>' : ''}</div>
          <div class="dash"></div>
          <div class="between"><span>Bills</span><span>${s.bills}</span></div>
          <div class="between"><span>Covers</span><span>${s.covers}</span></div>
          <div class="between"><span>Average bill</span><span>${money(s.avgBill)}</span></div>
          <div class="dash"></div>
          <div class="between"><span>Gross sales</span><span>${money(s.gross)}</span></div>
          <div class="between"><span>Comps</span><span>−${money(s.comps)}</span></div>
          <div class="between"><span>Discounts</span><span>−${money(s.discounts)}</span></div>
          <div class="between" style="font-weight:700"><span>NET SALES</span><span>${money(s.net)}</span></div>
          <div class="between"><span>Service charge</span><span>${money(s.service)}</span></div>
          <div class="between"><span>Tips</span><span>${money(s.tips)}</span></div>
          <div class="between" style="font-weight:700"><span>TOTAL TAKEN</span><span>${money(s.total)}</span></div>
          <div class="between" style="font-size:11px"><span>ABST ${AV_CONFIG.abstRate}% included</span><span>${money(s.abst)}</span></div>
          <div class="dash"></div>
          ${Object.entries(s.byMethod).map(([m, v]) => `<div class="between"><span style="text-transform:capitalize">${m}</span><span>${money(v)}</span></div>`).join('')}
          <div class="dash"></div>
          <div class="center" style="font-size:11px">Signed ______________________</div></div>`,
          `<button class="btn btn-primary btn-block" id="pr">${icon('printer', 16)} Print</button>`);
        $('#pr').onclick = UI.print;
      }

      /* ------------------------------- boot ------------------------------- */
      UI.init();
      S.subscribe(reason => {
        if (reason === 'order:receive' && BACK && view !== 'queue') UI.toast('Bill received from the counter');
        render();
      });
      if (BACK) window.BO.subscribe(() => {});
      render();
    }
  };
})();
