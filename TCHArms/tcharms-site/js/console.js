/* ==========================================================================
   TCH Arms Admin Console
   Single-page console over the SEED model. State is mirrored to localStorage
   so a demo survives a reload; "Reset demo data" puts it back.
   ========================================================================== */
(function () {
  "use strict";

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const KEY = "tch_console_v1";

  const money = n => "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const money0 = n => "$" + Math.round(n).toLocaleString("en-US");
  const esc = s => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const uid = p => p + Math.random().toString(36).slice(2, 8);
  const clone = o => JSON.parse(JSON.stringify(o));

  /* ------------------------------------------------------------ icons */
  const I = {
    dash:    '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
    orders:  '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>',
    box:     '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m21 8-9-5-9 5 9 5 9-5Z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>',
    tags:    '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v5.6a2 2 0 0 0 .6 1.4l7.4 7.4a2 2 0 0 0 2.8 0l5.6-5.6a2 2 0 0 0 0-2.8L12 5.6A2 2 0 0 0 10.6 5H5a2 2 0 0 0-2 2Z"/><circle cx="7.5" cy="9.5" r="1.2"/></svg>',
    layers:  '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></svg>',
    text:    '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6V4h16v2M9 20h6M12 4v16"/></svg>',
    people:  '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/></svg>',
    shield:  '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>',
    gear:    '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 7 19.4a1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.2-2.9H1a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 2.6 7a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H7a1.7 1.7 0 0 0 1-1.5V1a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V7a1.7 1.7 0 0 0 1.5 1H23a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></svg>',
    plus:    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    search:  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>',
    x:       '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    check:   '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    warn:    '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>',
    clock:   '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    truck:   '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 3h13v13H1zM14 8h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="2"/><circle cx="17.5" cy="18.5" r="2"/></svg>',
    trash:   '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>',
    burger:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    up:      '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
    down:    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>'
  };

  /* ------------------------------------------------------------ state */
  let S = null;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      S = raw ? JSON.parse(raw) : clone(SEED);
    } catch (e) { S = clone(SEED); }
    // guard against a stale shape from an older demo run
    ["types", "products", "orders", "content", "revenue"].forEach(k => {
      if (!Array.isArray(S[k])) S[k] = clone(SEED[k]);
    });
    if (!S.rates) S.rates = clone(SEED.rates);
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
  }

  /* ------------------------------------------------------------ derived */
  const productById = id => S.products.find(p => p.id === id);
  const typeById = id => S.types.find(t => t.id === id);
  const stockOf = p => p.variants.reduce((n, v) => n + (+v.stock || 0), 0);

  function lineTotal(it) {
    const p = productById(it.pid);
    if (!p) return 0;
    const v = p.variants.find(x => x.id === it.vid);
    return (p.price + (v ? (+v.delta || 0) : 0)) * it.qty;
  }
  function orderHasFirearm(o) {
    return o.items.some(it => { const p = productById(it.pid); return p && typeById(p.type) && typeById(p.type).requiresFFL; });
  }
  function orderTotals(o) {
    const sub = o.items.reduce((n, it) => n + lineTotal(it), 0);
    const firearm = orderHasFirearm(o);
    const ship = o.items.length ? (firearm ? 45 : 9.5) : 0;
    const tax = sub * S.rates.taxRate;
    const fee = (sub + ship + tax) * S.rates.ccFeeRate;
    return { sub, ship, tax, fee, total: sub + ship + tax + fee, firearm };
  }
  function revenueTotal() {
    return S.orders.filter(o => o.payment === "paid")
      .reduce((n, o) => n + orderTotals(o).total, 0);
  }
  function needsAttention() {
    return S.orders.filter(o =>
      o.fulfilment === "awaiting-ffl" || o.payment === "pending" ||
      (o.ffl && !o.ffl.verified)).length;
  }
  function lowStock() {
    return S.products.filter(p => p.status !== "discontinued" && stockOf(p) <= p.reorderPoint);
  }

  /* ------------------------------------------------------------ toast */
  function toast(msg) {
    const stack = $("#toasts");
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = I.check + "<span>" + esc(msg) + "</span>";
    stack.appendChild(el);
    requestAnimationFrame(() => el.classList.add("is-in"));
    setTimeout(() => { el.classList.remove("is-in"); setTimeout(() => el.remove(), 420); }, 2800);
  }

  /* ------------------------------------------------------------ modal */
  function openModal(title, bodyHTML, footHTML) {
    $("#modalTitle").textContent = title;
    $("#modalBody").innerHTML = bodyHTML;
    $("#modalFoot").innerHTML = footHTML || "";
    $("#modal").classList.add("is-open");
    $("#veil").classList.add("is-open");
    const first = $("#modalBody .inp");
    if (first) setTimeout(() => first.focus(), 60);
  }
  function closeModal() {
    $("#modal").classList.remove("is-open");
    if (!$("#drawer").classList.contains("is-open")) $("#veil").classList.remove("is-open");
  }
  function openDrawer(title, bodyHTML, footHTML) {
    $("#drawerTitle").textContent = title;
    $("#drawerBody").innerHTML = bodyHTML;
    $("#drawerFoot").innerHTML = footHTML || "";
    $("#drawer").classList.add("is-open");
    $("#veil").classList.add("is-open");
  }
  function closeDrawer() {
    $("#drawer").classList.remove("is-open");
    if (!$("#modal").classList.contains("is-open")) $("#veil").classList.remove("is-open");
  }

  /* ============================================================ DASHBOARD */
  function viewDashboard() {
    const paidOrders = S.orders.filter(o => o.payment === "paid");
    const rev = revenueTotal();
    const units = S.orders.filter(o => o.fulfilment !== "cancelled")
      .reduce((n, o) => n + o.items.reduce((m, it) => m + it.qty, 0), 0);
    const attn = needsAttention();
    const low = lowStock();

    const last = S.revenue[S.revenue.length - 1];
    const prev = S.revenue[S.revenue.length - 2];
    const lastSum = last.firearm + last.accessory + last.apparel;
    const prevSum = prev.firearm + prev.accessory + prev.apparel;
    const delta = ((lastSum - prevSum) / prevSum) * 100;

    $("#viewDashboard").innerHTML = `
      <div class="grid g-4" style="margin-bottom:18px">
        <div class="kpi">
          <div class="k">Revenue, 12 weeks</div>
          <div class="v">${money0(S.revenue.reduce((n, w) => n + w.firearm + w.accessory + w.apparel, 0))}</div>
          <div class="d ${delta >= 0 ? "up" : "down"}">${delta >= 0 ? I.up : I.down}
            ${Math.abs(delta).toFixed(1)}% vs previous week</div>
        </div>
        <div class="kpi">
          <div class="k">Orders booked</div>
          <div class="v">${S.orders.length}</div>
          <div class="d flat">${paidOrders.length} settled &middot; ${units} units</div>
        </div>
        <div class="kpi">
          <div class="k">Needs attention</div>
          <div class="v" style="color:${attn ? "var(--st-crit)" : "var(--ink)"}">${attn}</div>
          <div class="d ${attn ? "down" : "flat"}">${attn ? I.warn + " awaiting FFL or payment" : "Nothing outstanding"}</div>
        </div>
        <div class="kpi">
          <div class="k">Low stock lines</div>
          <div class="v" style="color:${low.length ? "var(--st-warn)" : "var(--ink)"}">${low.length}</div>
          <div class="d flat">${low.length ? low.map(p => esc(p.name)).join(", ") : "All above reorder point"}</div>
        </div>
      </div>

      <div class="grid g-main" style="margin-bottom:18px">
        <div class="card">
          <div class="card-head">
            <h3>Revenue by product type</h3>
            <div class="act">
              <div class="seg" id="chartMode">
                <button class="is-active" data-mode="chart">Chart</button>
                <button data-mode="table">Table</button>
              </div>
            </div>
          </div>
          <div class="legend">
            ${SERIES.map(s => `<span><i style="background:${s.color}"></i>${s.label}</span>`).join("")}
          </div>
          <div class="chart-wrap" id="chartWrap"></div>
          <div class="chart-wrap" id="chartTable" style="display:none"></div>
        </div>

        <div class="card">
          <div class="card-head"><h3>Transfer pipeline</h3></div>
          <div class="card-body" id="pipeline"></div>
        </div>
      </div>

      <div class="card">
        <div class="card-head">
          <h3>Recent orders</h3>
          <div class="act"><button class="btn btn-ghost btn-sm" data-goto="orders">View all</button></div>
        </div>
        <div class="card-body flush tbl-scroll">
          <table class="tbl">
            <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Payment</th>
              <th>Fulfilment</th><th class="num">Total</th></tr></thead>
            <tbody>${S.orders.slice(0, 6).map(orderRow).join("")}</tbody>
          </table>
        </div>
      </div>`;

    drawChart();
    drawPipeline();
    $$("#chartMode button").forEach(b => b.addEventListener("click", () => {
      $$("#chartMode button").forEach(x => x.classList.toggle("is-active", x === b));
      const tbl = b.dataset.mode === "table";
      $("#chartWrap").style.display = tbl ? "none" : "";
      $("#chartTable").style.display = tbl ? "" : "none";
      if (tbl) drawChartTable();
    }));
    $$("[data-goto]").forEach(b => b.addEventListener("click", () => go(b.dataset.goto)));
    wireOrderRows();
  }

  /* ------------------------------------------------------------ chart
     Stacked bars, one bar per week. A 2px surface gap separates segments and
     the top of each stack carries a 4px rounded data-end. Gridlines and axes
     stay recessive; only the peak and the latest week are direct-labelled.  */
  function drawChart() {
    const data = S.revenue;
    const W = 720, H = 260, padL = 52, padR = 14, padT = 18, padB = 30;
    const plotW = W - padL - padR, plotH = H - padT - padB;
    const totals = data.map(d => d.firearm + d.accessory + d.apparel);
    const peak = Math.max.apply(null, totals);
    const step = Math.pow(10, String(Math.round(peak)).length - 1);
    const top = Math.ceil(peak / step) * step;
    const ticks = 4;
    const bw = Math.min(38, (plotW / data.length) * 0.62);
    const gap = plotW / data.length;
    const y = v => padT + plotH - (v / top) * plotH;
    const maxIdx = totals.indexOf(peak);

    let svg = `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img"
      aria-label="Weekly revenue by product type, stacked bars">`;

    for (let i = 0; i <= ticks; i++) {
      const v = (top / ticks) * i, yy = y(v);
      svg += `<line x1="${padL}" x2="${W - padR}" y1="${yy}" y2="${yy}" stroke="var(--grid)" stroke-width="1"/>`;
      svg += `<text x="${padL - 9}" y="${yy + 4}" text-anchor="end" font-size="10.5"
        fill="var(--dim)" style="font-variant-numeric:tabular-nums">${money0(v)}</text>`;
    }
    svg += `<line x1="${padL}" x2="${W - padR}" y1="${y(0)}" y2="${y(0)}" stroke="var(--axis)" stroke-width="1"/>`;

    data.forEach((d, i) => {
      const x = padL + gap * i + (gap - bw) / 2;
      let acc = 0;
      const segs = SERIES.map(s => ({ s: s, v: d[s.key] })).filter(o => o.v > 0);
      segs.forEach((o, si) => {
        const isTop = si === segs.length - 1;
        const y0 = y(acc + o.v), y1 = y(acc);
        // 2px surface gap between stacked segments
        let h = Math.max(1, (y1 - y0) - (si === 0 ? 0 : 2));
        const yy = y0;
        const r = isTop ? 4 : 0;
        svg += `<path d="${roundedTop(x, yy, bw, h, r)}" fill="${o.s.color}"/>`;
        acc += o.v;
      });
      svg += `<rect class="hit" x="${padL + gap * i}" y="${padT}" width="${gap}" height="${plotH}"
        fill="transparent" data-i="${i}" style="cursor:pointer"/>`;
      svg += `<text x="${x + bw / 2}" y="${H - 10}" text-anchor="middle" font-size="10"
        fill="var(--dim)">${d.week}</text>`;
      // selective direct labels: the peak and the most recent week only
      if (i === maxIdx || i === data.length - 1) {
        svg += `<text x="${x + bw / 2}" y="${y(totals[i]) - 7}" text-anchor="middle" font-size="10.5"
          font-weight="700" fill="var(--ink)" style="font-variant-numeric:tabular-nums">${money0(totals[i])}</text>`;
      }
    });
    svg += `</svg>`;
    $("#chartWrap").innerHTML = svg;

    const tip = $("#chartTip");
    $$("#chartWrap .hit").forEach(r => {
      r.addEventListener("mousemove", e => {
        const d = data[+r.dataset.i];
        const tot = d.firearm + d.accessory + d.apparel;
        tip.innerHTML = `<div class="t">Week of ${esc(d.week)}</div>` +
          SERIES.map(s => `<div class="r"><i style="background:${s.color}"></i>${s.label}<b>${money0(d[s.key])}</b></div>`).join("") +
          `<div class="tot">Total<b>${money0(tot)}</b></div>`;
        tip.classList.add("is-on");
        const w = 190;
        tip.style.left = Math.min(e.clientX + 14, window.innerWidth - w - 14) + "px";
        tip.style.top = Math.max(12, e.clientY - 90) + "px";
      });
      r.addEventListener("mouseleave", () => tip.classList.remove("is-on"));
    });
  }

  // path for a bar with optionally rounded top corners
  function roundedTop(x, y, w, h, r) {
    if (!r) return `M${x},${y} h${w} v${h} h${-w} Z`;
    r = Math.min(r, h, w / 2);
    return `M${x},${y + r} a${r},${r} 0 0 1 ${r},${-r} h${w - 2 * r} a${r},${r} 0 0 1 ${r},${r} v${h - r} h${-w} Z`;
  }

  function drawChartTable() {
    $("#chartTable").innerHTML = `
      <div class="tbl-scroll"><table class="tbl">
        <thead><tr><th>Week</th>${SERIES.map(s => `<th class="num">${s.label}</th>`).join("")}
          <th class="num">Total</th></tr></thead>
        <tbody>${S.revenue.map(d => {
          const t = d.firearm + d.accessory + d.apparel;
          return `<tr style="cursor:default">
            <td class="strong">${esc(d.week)}</td>
            ${SERIES.map(s => `<td class="num">${money0(d[s.key])}</td>`).join("")}
            <td class="num strong">${money0(t)}</td></tr>`;
        }).join("")}</tbody>
      </table></div>`;
  }

  function drawPipeline() {
    const stages = [
      { k: "awaiting-ffl", label: "Awaiting FFL",  cls: "b-warn" },
      { k: "ffl-verified", label: "FFL verified",  cls: "b-info" },
      { k: "shipped",      label: "Shipped",       cls: "b-info" },
      { k: "transferred",  label: "Complete",      cls: "b-ok" }
    ];
    const counts = stages.map(s => S.orders.filter(o => o.fulfilment === s.k).length);
    const max = Math.max.apply(null, counts.concat([1]));
    $("#pipeline").innerHTML = stages.map((s, i) => `
      <div style="margin-bottom:15px">
        <div style="display:flex;align-items:center;gap:9px;margin-bottom:6px">
          <span class="badge ${s.cls}">${s.label}</span>
          <b style="margin-left:auto;font-variant-numeric:tabular-nums;color:var(--ink)">${counts[i]}</b>
        </div>
        <div class="meter"><i style="width:${(counts[i] / max) * 100}%;background:var(--s1);opacity:${0.35 + i * 0.2}"></i></div>
      </div>`).join("") + `
      <div class="note" style="margin-top:4px">
        <b>${counts[0]}</b> order${counts[0] === 1 ? "" : "s"} cannot ship until the customer nominates a
        dealer and the licence is checked.
      </div>`;
  }

  /* ============================================================ ORDERS */
  let orderFilter = { q: "", status: "all" };

  function orderRow(o) {
    const t = orderTotals(o);
    const f = FULFILMENT[o.fulfilment] || FULFILMENT["awaiting-ffl"];
    const p = PAYMENT[o.payment] || PAYMENT.paid;
    const items = o.items.reduce((n, it) => n + it.qty, 0);
    const flag = o.flags && o.flags.length
      ? ` <span class="badge b-crit" title="${esc(o.flags.join(" · "))}">${I.warn}${o.flags.length}</span>` : "";
    return `<tr data-order="${o.id}">
      <td><span class="id">${o.id}</span><div class="sub">${o.placed} &middot; ${esc(o.channel)}</div></td>
      <td><span class="strong">${esc(o.customer.name)}</span>
          <div class="sub">${esc(o.customer.city)}, ${esc(o.customer.state)}</div></td>
      <td>${items} item${items === 1 ? "" : "s"}${orderHasFirearm(o) ? ' <span class="badge b-idle">FFL</span>' : ""}</td>
      <td><span class="badge ${p.cls}">${p.label}</span></td>
      <td><span class="badge ${f.cls}">${f.label}</span>${flag}</td>
      <td class="num strong">${money(t.total)}</td>
    </tr>`;
  }

  function viewOrders() {
    const q = orderFilter.q.toLowerCase();
    const list = S.orders.filter(o => {
      if (orderFilter.status === "attention") {
        if (!(o.fulfilment === "awaiting-ffl" || o.payment === "pending" || (o.ffl && !o.ffl.verified))) return false;
      } else if (orderFilter.status !== "all" && o.fulfilment !== orderFilter.status) return false;
      if (!q) return true;
      return (o.id + " " + o.customer.name + " " + o.customer.email + " " +
              (o.ffl ? o.ffl.dealer : "")).toLowerCase().includes(q);
    });

    $("#viewOrders").innerHTML = `
      <div class="filters">
        <div class="search">
          ${I.search}
          <input class="inp" id="oq" placeholder="Search order, customer or dealer" value="${esc(orderFilter.q)}">
        </div>
        <div class="seg" id="ostatus">
          ${[["all","All"],["attention","Needs attention"],["awaiting-ffl","Awaiting FFL"],
             ["ffl-verified","Verified"],["shipped","Shipped"],["transferred","Complete"]]
            .map(s => `<button data-s="${s[0]}" class="${orderFilter.status===s[0]?"is-active":""}">${s[1]}</button>`).join("")}
        </div>
        <span style="margin-left:auto;font-size:.84rem;color:var(--dim)" class="mono">${list.length} of ${S.orders.length}</span>
      </div>

      <div class="card">
        <div class="card-body flush tbl-scroll">
          ${list.length ? `<table class="tbl">
            <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Payment</th>
              <th>Fulfilment</th><th class="num">Total</th></tr></thead>
            <tbody>${list.map(orderRow).join("")}</tbody>
          </table>` : `<div class="empty"><h4>No matching orders</h4><p>Adjust the search or filter.</p></div>`}
        </div>
      </div>`;

    const box = $("#oq");
    box.addEventListener("input", () => {
      orderFilter.q = box.value;
      const at = box.selectionStart;
      viewOrders();
      const nb = $("#oq"); nb.focus(); nb.setSelectionRange(at, at);
    });
    $$("#ostatus button").forEach(b => b.addEventListener("click", () => {
      orderFilter.status = b.dataset.s; viewOrders();
    }));
    wireOrderRows();
  }

  function wireOrderRows() {
    $$("[data-order]").forEach(r => r.addEventListener("click", () => showOrder(r.dataset.order)));
  }

  /* ------------------------------------------------------------ order detail */
  function showOrder(id) {
    const o = S.orders.find(x => x.id === id);
    if (!o) return;
    const t = orderTotals(o);
    const f = FULFILMENT[o.fulfilment] || FULFILMENT["awaiting-ffl"];
    const p = PAYMENT[o.payment] || PAYMENT.paid;
    const needsFFL = orderHasFirearm(o);

    // Resolve the current step by key, not by a fixed index: accessory-only
    // orders drop the two FFL steps, so positions shift.
    const steps = PIPELINE.filter(s => !s.fflOnly || needsFFL);
    let currentKey = o.fulfilment === "cancelled" ? "placed"
                   : o.payment === "pending" ? "paid"
                   : o.fulfilment;
    let at = steps.findIndex(s => s.key === currentKey) + 1;
    if (at < 1) at = 1;

    const flags = (o.flags || []).length ? `
      <div class="note amber" style="margin-bottom:16px">
        <b>Needs attention.</b> ${o.flags.map(esc).join(". ")}.
      </div>` : "";

    openDrawer(o.id, `
      ${flags}
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px">
        <span class="badge ${p.cls}">Payment: ${p.label}</span>
        <span class="badge ${f.cls}">${f.label}</span>
        ${needsFFL ? '<span class="badge b-idle">FFL transfer</span>' : '<span class="badge b-idle">Direct ship</span>'}
        <span class="badge b-idle">${esc(o.channel)}</span>
      </div>

      <div class="card" style="margin-bottom:16px">
        <div class="card-head"><h3>Items</h3></div>
        <div class="card-body">
          ${o.items.map(it => {
            const pr = productById(it.pid);
            if (!pr) return "";
            const v = pr.variants.find(x => x.id === it.vid);
            return `<div class="line">
              <span class="thumb"><img src="${pr.img}" alt=""></span>
              <span class="line-n">
                <span class="t">${esc(pr.name)}</span>
                <span class="m">${v ? esc(v.label) + " &middot; " : ""}${esc(v ? v.sku : pr.sku)} &middot; Qty ${it.qty}</span>
              </span>
              <span class="line-p">${money(lineTotal(it))}</span>
            </div>`;
          }).join("")}
          <div class="sum">
            <div><span>Subtotal</span><span>${money(t.sub)}</span></div>
            <div><span>Shipping${t.firearm ? " to dealer" : ""}</span><span>${money(t.ship)}</span></div>
            <div><span>Sales tax</span><span>${money(t.tax)}</span></div>
            <div><span>Card processing 3.5%</span><span>${money(t.fee)}</span></div>
            <div class="tot"><span>Total</span><span>${money(t.total)}</span></div>
          </div>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px">
        <div class="card-head"><h3>Customer</h3></div>
        <div class="card-body">
          <dl class="kv">
            <dt>Name</dt><dd class="strong">${esc(o.customer.name)}</dd>
            <dt>Email</dt><dd><a href="mailto:${esc(o.customer.email)}">${esc(o.customer.email)}</a></dd>
            <dt>Phone</dt><dd>${esc(o.customer.phone)}</dd>
            <dt>Address</dt><dd>${esc(o.customer.address)}<br>${esc(o.customer.city)}, ${esc(o.customer.state)} ${esc(o.customer.zip)}</dd>
          </dl>
        </div>
      </div>

      ${needsFFL ? `
      <div class="card" style="margin-bottom:16px">
        <div class="card-head"><h3>Transfer dealer</h3>
          <div class="act">${o.ffl
            ? (o.ffl.verified ? '<span class="badge b-ok">' + I.check + 'Verified</span>'
                              : '<span class="badge b-warn">' + I.clock + 'Not verified</span>')
            : '<span class="badge b-crit">' + I.warn + 'Missing</span>'}</div>
        </div>
        <div class="card-body">
          ${o.ffl ? `<dl class="kv">
            <dt>Dealer</dt><dd class="strong">${esc(o.ffl.dealer)}</dd>
            <dt>FFL number</dt><dd class="mono">${esc(o.ffl.licence)}</dd>
            <dt>Licence expires</dt><dd>${esc(o.ffl.expires)}</dd>
            <dt>Phone</dt><dd>${esc(o.ffl.phone)}</dd>
            <dt>Address</dt><dd>${esc(o.ffl.address)}<br>${esc(o.ffl.city)}, ${esc(o.ffl.state)} ${esc(o.ffl.zip)}</dd>
          </dl>` : `<p style="color:var(--muted);margin:0 0 12px">
            The customer has not nominated a dealer yet. Nothing ships until this is on file
            and the licence has been checked.</p>
            <button class="btn btn-ghost btn-sm" data-act="add-ffl">Record dealer details</button>`}
        </div>
      </div>` : ""}

      <div class="card">
        <div class="card-head"><h3>Progress</h3></div>
        <div class="card-body">
          <ul class="timeline">
            ${steps.map((s, i) => {
              const state = o.fulfilment === "cancelled" ? (i === 0 ? "done" : "")
                          : (i + 1 < at ? "done" : i + 1 === at ? "now" : "");
              return `<li class="${state}">
                <div class="t">${s.label}</div>
                <div class="m">${i === 0 ? o.placed : state === "done" ? "Done" : state === "now" ? "Current step" : "Pending"}</div>
              </li>`;
            }).join("")}
            ${o.fulfilment === "cancelled" ? '<li><div class="t">Cancelled</div><div class="m">Order refunded</div></li>' : ""}
          </ul>
          ${o.tracking ? `<div class="note" style="margin-top:12px">${I.truck}
            <span style="margin-left:6px">Tracking <b class="mono">${esc(o.tracking)}</b></span></div>` : ""}
        </div>
      </div>
    `, orderActions(o));

    $$("#drawerFoot [data-adv]").forEach(b => b.addEventListener("click", () => advance(o.id, b.dataset.adv)));
    const addFfl = $("#drawerBody [data-act='add-ffl']");
    if (addFfl) addFfl.addEventListener("click", () => fflForm(o.id));
  }

  function orderActions(o) {
    if (o.fulfilment === "cancelled") return `<span style="color:var(--dim);font-size:.86rem">Order cancelled and refunded.</span>`;
    const btns = [];
    if (o.payment === "pending") btns.push(`<button class="btn btn-primary btn-sm" data-adv="settle">Mark payment settled</button>`);
    if (orderHasFirearm(o)) {
      if (!o.ffl) btns.push(`<button class="btn btn-primary btn-sm" data-adv="ffl">Record dealer</button>`);
      else if (!o.ffl.verified) btns.push(`<button class="btn btn-primary btn-sm" data-adv="verify">Verify licence</button>`);
      else if (o.fulfilment === "ffl-verified") btns.push(`<button class="btn btn-primary btn-sm" data-adv="ship">Mark shipped</button>`);
      else if (o.fulfilment === "shipped") btns.push(`<button class="btn btn-primary btn-sm" data-adv="done">Mark transferred</button>`);
    } else {
      if (o.fulfilment !== "shipped" && o.fulfilment !== "transferred")
        btns.push(`<button class="btn btn-primary btn-sm" data-adv="ship">Mark shipped</button>`);
      else if (o.fulfilment === "shipped") btns.push(`<button class="btn btn-primary btn-sm" data-adv="done">Mark delivered</button>`);
    }
    btns.push(`<button class="btn btn-ghost btn-sm" data-adv="email">Email customer</button>`);
    if (o.fulfilment !== "transferred") btns.push(`<button class="btn btn-danger btn-sm" data-adv="cancel">Cancel order</button>`);
    return btns.join("");
  }

  function advance(id, what) {
    const o = S.orders.find(x => x.id === id);
    if (!o) return;
    if (what === "settle") { o.payment = "paid"; o.flags = (o.flags || []).filter(f => !/payment/i.test(f)); toast("Payment marked settled"); }
    if (what === "verify") { o.ffl.verified = true; o.fulfilment = "ffl-verified";
      o.flags = (o.flags || []).filter(f => !/verified/i.test(f)); toast("Dealer licence verified"); }
    if (what === "ship") { o.fulfilment = "shipped"; o.tracking = o.tracking || "1Z999AA" + Math.floor(1e9 + Math.random() * 9e9);
      toast("Marked shipped, tracking generated"); }
    if (what === "done") { o.fulfilment = "transferred"; toast("Order complete"); }
    if (what === "cancel") { o.fulfilment = "cancelled"; o.payment = "refunded"; toast("Order cancelled and refunded"); }
    if (what === "email") { toast("Demo build. This is where the customer email would send."); return; }
    if (what === "ffl") { fflForm(id); return; }
    save(); showOrder(id); refresh();
  }

  function fflForm(id) {
    const o = S.orders.find(x => x.id === id);
    openModal("Record transfer dealer", `
      <div class="note" style="margin-bottom:18px">
        Firearms ship to a licensed dealer only. Record the dealer the customer nominated,
        then verify the licence before shipping.
      </div>
      <div class="fld"><label>Dealer business name <span class="req">*</span></label>
        <input class="inp" id="fDealer" placeholder="Midwest Firearms LLC">
        <div class="err">Required.</div></div>
      <div class="row row-2">
        <div class="fld"><label>FFL number</label><input class="inp" id="fLic" placeholder="5-43-XXX-XX-2K-01197"></div>
        <div class="fld"><label>Licence expiry</label><input class="inp" id="fExp" type="date"></div>
      </div>
      <div class="fld"><label>Phone <span class="req">*</span></label>
        <input class="inp" id="fPhone" placeholder="636-555-0144"><div class="err">Required.</div></div>
      <div class="fld"><label>Address <span class="req">*</span></label>
        <input class="inp" id="fAddr" placeholder="88 Trade Rd"><div class="err">Required.</div></div>
      <div class="row row-3">
        <div class="fld"><label>City</label><input class="inp" id="fCity"></div>
        <div class="fld"><label>State</label><input class="inp" id="fState" maxlength="2" placeholder="MO"></div>
        <div class="fld"><label>ZIP</label><input class="inp" id="fZip"></div>
      </div>`,
      `<button class="btn btn-ghost" data-close>Cancel</button>
       <button class="btn btn-primary" id="fSave">Save dealer</button>`);

    $("#fSave").addEventListener("click", () => {
      const req = ["fDealer", "fPhone", "fAddr"];
      let ok = true;
      req.forEach(x => {
        const el = $("#" + x), bad = !el.value.trim();
        el.closest(".fld").classList.toggle("bad", bad);
        if (bad) ok = false;
      });
      if (!ok) { toast("Complete the highlighted fields"); return; }
      o.ffl = { dealer: $("#fDealer").value.trim(), licence: $("#fLic").value.trim() || "Not supplied",
        phone: $("#fPhone").value.trim(), address: $("#fAddr").value.trim(),
        city: $("#fCity").value.trim(), state: $("#fState").value.trim().toUpperCase(),
        zip: $("#fZip").value.trim(), expires: $("#fExp").value || "Not supplied", verified: false };
      o.flags = (o.flags || []).filter(f => !/dealer details/i.test(f));
      save(); closeModal(); showOrder(id); refresh();
      toast("Dealer recorded. Verify the licence to continue.");
    });
  }

  /* ============================================================ PRODUCTS */
  function viewProducts() {
    $("#viewProducts").innerHTML = `
      <div class="filters">
        <span style="font-size:.86rem;color:var(--dim)">${S.products.length} products across ${S.types.length} types</span>
        <div style="margin-left:auto;display:flex;gap:9px">
          <button class="btn btn-ghost" id="newType">${I.plus} New product type</button>
          <button class="btn btn-primary" id="newProduct">${I.plus} New product</button>
        </div>
      </div>

      <div class="card">
        <div class="card-body flush tbl-scroll">
          <table class="tbl">
            <thead><tr><th>Product</th><th>Type</th><th>SKU</th><th>Variants</th>
              <th>Stock</th><th class="num">Price</th><th>Status</th></tr></thead>
            <tbody>${S.products.map(p => {
              const ty = typeById(p.type);
              const st = stockOf(p);
              const low = st <= p.reorderPoint;
              const pct = Math.min(100, (st / Math.max(p.reorderPoint * 3, 1)) * 100);
              const stat = p.status === "active" ? '<span class="badge b-ok">Active</span>'
                : p.status === "draft" ? '<span class="badge b-idle">Draft</span>'
                : '<span class="badge b-warn">Discontinued</span>';
              return `<tr data-product="${p.id}">
                <td><div class="cell"><span class="thumb"><img src="${p.img}" alt=""></span>
                  <span><span class="strong">${esc(p.name)}</span>
                  <div class="sub">${esc(p.line)}${p.caliber ? " &middot; " + esc(p.caliber) : ""}</div></span></div></td>
                <td>${ty ? esc(ty.name) : "&mdash;"}${ty && ty.requiresFFL ? ' <span class="badge b-idle">FFL</span>' : ""}</td>
                <td class="mono sub">${esc(p.sku)}</td>
                <td>${p.variants.length}</td>
                <td><span class="${low ? "strong" : ""}" style="${low ? "color:var(--st-warn)" : ""}">${st}</span>
                  <div class="meter"><i style="width:${pct}%;background:${low ? "var(--st-warn)" : "var(--s1)"}"></i></div></td>
                <td class="num strong">${money(p.price)}</td>
                <td>${stat}</td>
              </tr>`;
            }).join("")}</tbody>
          </table>
        </div>
      </div>`;

    $("#newType").addEventListener("click", typeForm);
    $("#newProduct").addEventListener("click", () => productForm(null));
    $$("[data-product]").forEach(r => r.addEventListener("click", () => productForm(r.dataset.product)));
  }

  /* ------------------------------------------------------------ product type */
  function typeForm() {
    openModal("New product type", `
      <p style="color:var(--muted);font-size:.88rem;margin-top:0">
        A type carries the rules that apply to every product filed under it, so compliance is
        set once rather than per product.
      </p>
      <div class="fld"><label>Type name <span class="req">*</span></label>
        <input class="inp" id="tName" placeholder="Holsters"><div class="err">Required.</div></div>
      <div class="row row-2">
        <div class="fld"><label>Shipping rate</label>
          <input class="inp" id="tShip" type="number" step="0.01" value="9.50"></div>
        <div class="fld"><label>Minimum age</label>
          <select class="inp" id="tAge"><option value="0">No restriction</option>
            <option value="18">18 or older</option><option value="21">21 or older</option></select></div>
      </div>
      <div class="fld"><label>Rules</label>
        <label class="check" style="margin-bottom:9px"><input type="checkbox" id="tFFL">
          <span>Requires FFL transfer
          <span class="sub">Products of this type ship to a licensed dealer, never to a home address.</span></span></label>
        <label class="check" style="margin-bottom:9px"><input type="checkbox" id="tSerial">
          <span>Serialised
          <span class="sub">Each unit carries a serial number recorded at dispatch.</span></span></label>
        <label class="check"><input type="checkbox" id="tTax" checked>
          <span>Taxable<span class="sub">Sales tax applies at the configured rate.</span></span></label>
      </div>
      <div class="fld"><label>Internal note</label>
        <textarea class="inp" id="tNote" placeholder="Anything staff should know when filing products here"></textarea></div>`,
      `<button class="btn btn-ghost" data-close>Cancel</button>
       <button class="btn btn-primary" id="tSave">Create type</button>`);

    $("#tSave").addEventListener("click", () => {
      const name = $("#tName").value.trim();
      if (!name) { $("#tName").closest(".fld").classList.add("bad"); toast("Give the type a name"); return; }
      S.types.push({ id: uid("ty_"), name: name, requiresFFL: $("#tFFL").checked,
        ageLimit: +$("#tAge").value, taxable: $("#tTax").checked,
        shipRate: parseFloat($("#tShip").value) || 0, serialised: $("#tSerial").checked,
        note: $("#tNote").value.trim() });
      save(); closeModal(); refresh();
      toast('Product type "' + name + '" created');
    });
  }

  /* ------------------------------------------------------------ product form */
  let draftVariants = [];

  function productForm(id) {
    const p = id ? productById(id) : null;
    draftVariants = p ? clone(p.variants) : [{ id: uid("v_"), label: "Standard", sku: "", delta: 0, stock: 0, status: "active" }];

    openModal(p ? "Edit product" : "New product", `
      <div class="row row-2">
        <div class="fld"><label>Product name <span class="req">*</span></label>
          <input class="inp" id="pName" value="${esc(p ? p.name : "")}" placeholder="RS9 Vampir">
          <div class="err">Required.</div></div>
        <div class="fld"><label>Product type <span class="req">*</span></label>
          <select class="inp" id="pType">
            ${S.types.map(t => `<option value="${t.id}" ${p && p.type === t.id ? "selected" : ""}>${esc(t.name)}</option>`).join("")}
          </select>
          <div class="hint" id="typeHint"></div></div>
      </div>
      <div class="row row-3">
        <div class="fld"><label>Base price <span class="req">*</span></label>
          <input class="inp" id="pPrice" type="number" step="0.01" value="${p ? p.price : ""}" placeholder="1285.00">
          <div class="err">Required.</div></div>
        <div class="fld"><label>Base SKU</label>
          <input class="inp" id="pSku" value="${esc(p ? p.sku : "")}" placeholder="TCH-RS9-9MM"></div>
        <div class="fld"><label>Reorder point</label>
          <input class="inp" id="pReorder" type="number" value="${p ? p.reorderPoint : 10}"></div>
      </div>
      <div class="row row-2">
        <div class="fld"><label>Product line</label>
          <input class="inp" id="pLine" value="${esc(p ? p.line : "")}" placeholder="Vampir"></div>
        <div class="fld"><label>Caliber or spec</label>
          <input class="inp" id="pCal" value="${esc(p ? p.caliber : "")}" placeholder="9mmx19"></div>
      </div>
      <div class="fld"><label>Status</label>
        <select class="inp" id="pStatus">
          <option value="active" ${p && p.status === "active" ? "selected" : ""}>Active, on sale</option>
          <option value="draft" ${p && p.status === "draft" ? "selected" : ""}>Draft, hidden from the site</option>
          <option value="discontinued" ${p && p.status === "discontinued" ? "selected" : ""}>Discontinued</option>
        </select></div>

      <div style="border-top:1px solid var(--line-soft);margin:20px 0 16px;padding-top:18px">
        <div style="display:flex;align-items:center;margin-bottom:11px">
          <b style="font-size:.9rem;color:var(--ink)">Variants</b>
          <span style="font-size:.8rem;color:var(--dim);margin-left:9px">
            Sizes, finishes or capacities. Each holds its own SKU and stock.</span>
          <button class="btn btn-ghost btn-sm" id="addVar" style="margin-left:auto">${I.plus} Add variant</button>
        </div>
        <div class="var-head"><span>Label</span><span>SKU</span><span>Price +/-</span><span>Stock</span><span></span></div>
        <div id="varList"></div>
      </div>`,
      `${p ? '<button class="btn btn-danger" id="pDel" style="margin-right:auto">Delete</button>' : ""}
       <button class="btn btn-ghost" data-close>Cancel</button>
       <button class="btn btn-primary" id="pSave">${p ? "Save changes" : "Create product"}</button>`);

    paintVariants();
    updateTypeHint();
    $("#pType").addEventListener("change", updateTypeHint);
    $("#addVar").addEventListener("click", () => {
      draftVariants.push({ id: uid("v_"), label: "", sku: "", delta: 0, stock: 0, status: "active" });
      paintVariants();
    });
    $("#pSave").addEventListener("click", () => saveProduct(id));
    const del = $("#pDel");
    if (del) del.addEventListener("click", () => {
      S.products = S.products.filter(x => x.id !== id);
      save(); closeModal(); refresh(); toast("Product deleted");
    });
  }

  function updateTypeHint() {
    const t = typeById($("#pType").value);
    if (!t) return;
    const bits = [];
    if (t.requiresFFL) bits.push("ships to an FFL dealer");
    if (t.ageLimit) bits.push(t.ageLimit + "+ only");
    if (t.serialised) bits.push("serialised");
    bits.push("shipping " + money(t.shipRate));
    $("#typeHint").textContent = bits.join(", ") + ".";
  }

  function paintVariants() {
    $("#varList").innerHTML = draftVariants.map((v, i) => `
      <div class="var-row">
        <input class="inp" data-v="${i}" data-k="label" value="${esc(v.label)}" placeholder="Black">
        <input class="inp" data-v="${i}" data-k="sku" value="${esc(v.sku)}" placeholder="SKU">
        <input class="inp" data-v="${i}" data-k="delta" type="number" step="0.01" value="${v.delta}">
        <input class="inp" data-v="${i}" data-k="stock" type="number" value="${v.stock}">
        <button class="var-del" data-vd="${i}" aria-label="Remove variant">${I.trash}</button>
      </div>`).join("") || `<p style="color:var(--dim);font-size:.85rem;margin:0">
        No variants. Add at least one so the product can hold stock.</p>`;

    $$("#varList [data-v]").forEach(inp => inp.addEventListener("input", () => {
      const v = draftVariants[+inp.dataset.v], k = inp.dataset.k;
      v[k] = (k === "delta" || k === "stock") ? (parseFloat(inp.value) || 0) : inp.value;
    }));
    $$("#varList [data-vd]").forEach(b => b.addEventListener("click", () => {
      draftVariants.splice(+b.dataset.vd, 1); paintVariants();
    }));
  }

  function saveProduct(id) {
    const name = $("#pName").value.trim();
    const price = parseFloat($("#pPrice").value);
    let ok = true;
    if (!name) { $("#pName").closest(".fld").classList.add("bad"); ok = false; }
    if (!(price >= 0)) { $("#pPrice").closest(".fld").classList.add("bad"); ok = false; }
    if (!ok) { toast("Complete the highlighted fields"); return; }
    if (!draftVariants.length) { toast("Add at least one variant"); return; }

    const base = {
      name: name, type: $("#pType").value, price: price,
      sku: $("#pSku").value.trim() || name.toUpperCase().replace(/[^A-Z0-9]+/g, "-").slice(0, 18),
      line: $("#pLine").value.trim(), caliber: $("#pCal").value.trim(),
      reorderPoint: parseInt($("#pReorder").value, 10) || 0,
      status: $("#pStatus").value,
      variants: draftVariants.map(v => ({ ...v, label: v.label || "Standard", sku: v.sku || "" }))
    };

    if (id) {
      Object.assign(productById(id), base);
      toast("Product updated");
    } else {
      S.products.push({ id: uid("p_"), img: "assets/guns/rs9-right.webp", ...base });
      toast('"' + name + '" created');
    }
    save(); closeModal(); refresh();
  }

  /* ============================================================ TYPES VIEW */
  function viewTypes() {
    $("#viewTypes").innerHTML = `
      <div class="filters">
        <span style="font-size:.86rem;color:var(--dim)">Rules applied to every product filed under a type</span>
        <button class="btn btn-primary" id="newType2" style="margin-left:auto">${I.plus} New product type</button>
      </div>
      <div class="grid g-2">
        ${S.types.map(t => {
          const count = S.products.filter(p => p.type === t.id).length;
          return `<div class="card">
            <div class="card-head"><h3>${esc(t.name)}</h3>
              <div class="act"><span class="badge b-idle">${count} product${count === 1 ? "" : "s"}</span></div></div>
            <div class="card-body">
              <div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:14px">
                ${t.requiresFFL ? '<span class="badge b-warn">' + I.warn + 'FFL required</span>'
                                : '<span class="badge b-ok">' + I.check + 'Ships direct</span>'}
                ${t.ageLimit ? '<span class="badge b-idle">' + t.ageLimit + '+</span>' : ""}
                ${t.serialised ? '<span class="badge b-idle">Serialised</span>' : ""}
                ${t.taxable ? '<span class="badge b-idle">Taxable</span>' : '<span class="badge b-idle">Tax exempt</span>'}
                <span class="badge b-idle">Ship ${money(t.shipRate)}</span>
              </div>
              <p style="color:var(--muted);font-size:.86rem;margin:0">${esc(t.note || "No note.")}</p>
            </div>
          </div>`;
        }).join("")}
      </div>`;
    $("#newType2").addEventListener("click", typeForm);
  }

  /* ============================================================ CONTENT */
  function viewContent() {
    $("#viewContent").innerHTML = `
      <div class="filters">
        <span style="font-size:.86rem;color:var(--dim)">
          Copy blocks the storefront reads. Locked blocks carry legal wording.</span>
        <a class="btn btn-ghost" href="admin.html" style="margin-left:auto">Open Media Manager</a>
      </div>
      <div class="grid g-2">
        ${S.content.map(c => `
          <div class="card">
            <div class="card-head">
              <h3>${esc(c.label)}</h3>
              <div class="act">
                ${c.locked ? '<span class="badge b-warn">' + I.warn + 'Legal</span>' : ""}
                <span class="badge b-idle">${esc(c.where)}</span>
              </div>
            </div>
            <div class="card-body">
              ${c.locked ? `<div class="note amber" style="margin-bottom:12px">
                <b>Reviewed wording.</b> Changing this alters a compliance notice. Check with
                whoever signs off your ATF and FFL copy first.</div>` : ""}
              <div class="fld mb-0">
                <textarea class="inp" data-c="${c.id}" rows="${c.type === "line" ? 2 : 4}">${esc(c.value)}</textarea>
              </div>
              <div style="display:flex;gap:8px;margin-top:11px">
                <button class="btn btn-primary btn-sm" data-save="${c.id}">Save</button>
                <button class="btn btn-ghost btn-sm" data-revert="${c.id}">Revert</button>
              </div>
            </div>
          </div>`).join("")}
      </div>`;

    $$("[data-save]").forEach(b => b.addEventListener("click", () => {
      const id = b.dataset.save;
      const block = S.content.find(c => c.id === id);
      block.value = $('[data-c="' + id + '"]').value;
      save(); toast('"' + block.label + '" saved');
    }));
    $$("[data-revert]").forEach(b => b.addEventListener("click", () => {
      const id = b.dataset.revert;
      const orig = SEED.content.find(c => c.id === id);
      const block = S.content.find(c => c.id === id);
      block.value = orig.value;
      $('[data-c="' + id + '"]').value = orig.value;
      save(); toast("Reverted to the original wording");
    }));
  }

  /* ============================================================ CUSTOMERS */
  function viewCustomers() {
    const map = {};
    S.orders.forEach(o => {
      const k = o.customer.email;
      if (!map[k]) map[k] = { c: o.customer, orders: 0, spend: 0, last: o.placed, ffl: o.ffl ? o.ffl.dealer : null };
      map[k].orders++;
      if (o.payment === "paid") map[k].spend += orderTotals(o).total;
      if (o.placed > map[k].last) map[k].last = o.placed;
      if (o.ffl && !map[k].ffl) map[k].ffl = o.ffl.dealer;
    });
    const rows = Object.values(map).sort((a, b) => b.spend - a.spend);

    $("#viewCustomers").innerHTML = `
      <div class="filters"><span style="font-size:.86rem;color:var(--dim)">
        ${rows.length} customers, built from order history</span></div>
      <div class="card"><div class="card-body flush tbl-scroll">
        <table class="tbl">
          <thead><tr><th>Customer</th><th>Location</th><th>Usual dealer</th>
            <th class="num">Orders</th><th class="num">Lifetime</th><th>Last order</th></tr></thead>
          <tbody>${rows.map(r => `<tr style="cursor:default">
            <td><span class="strong">${esc(r.c.name)}</span><div class="sub">${esc(r.c.email)}</div></td>
            <td>${esc(r.c.city)}, ${esc(r.c.state)}</td>
            <td>${r.ffl ? esc(r.ffl) : '<span style="color:var(--dim)">Direct ship only</span>'}</td>
            <td class="num">${r.orders}</td>
            <td class="num strong">${money(r.spend)}</td>
            <td class="sub">${r.last}</td>
          </tr>`).join("")}</tbody>
        </table>
      </div></div>`;
  }

  /* ============================================================ DEALERS */
  function viewDealers() {
    const map = {};
    S.orders.filter(o => o.ffl).forEach(o => {
      const k = o.ffl.dealer;
      if (!map[k]) map[k] = { ...o.ffl, orders: 0 };
      map[k].orders++;
      if (o.ffl.verified) map[k].verified = true;
    });
    const rows = Object.values(map);
    const today = "2026-08-05";
    const soon = d => { if (!d || d === "Not supplied") return false;
      const diff = (new Date(d) - new Date(today)) / 86400000; return diff > 0 && diff < 90; };

    $("#viewDealers").innerHTML = `
      <div class="filters"><span style="font-size:.86rem;color:var(--dim)">
        Dealers customers have nominated. Licences are checked before anything ships.</span></div>
      <div class="card"><div class="card-body flush tbl-scroll">
        ${rows.length ? `<table class="tbl">
          <thead><tr><th>Dealer</th><th>FFL number</th><th>Location</th><th>Expires</th>
            <th class="num">Transfers</th><th>Status</th></tr></thead>
          <tbody>${rows.map(d => `<tr style="cursor:default">
            <td><span class="strong">${esc(d.dealer)}</span><div class="sub">${esc(d.phone)}</div></td>
            <td class="mono sub">${esc(d.licence)}</td>
            <td>${esc(d.city)}, ${esc(d.state)}</td>
            <td>${esc(d.expires)}${soon(d.expires) ? ' <span class="badge b-warn">' + I.clock + 'Soon</span>' : ""}</td>
            <td class="num">${d.orders}</td>
            <td>${d.verified ? '<span class="badge b-ok">' + I.check + 'Verified</span>'
                             : '<span class="badge b-warn">' + I.clock + 'Pending</span>'}</td>
          </tr>`).join("")}</tbody></table>`
        : `<div class="empty"><h4>No dealers on file</h4><p>They appear once a customer nominates one.</p></div>`}
      </div></div>`;
  }

  /* ============================================================ SETTINGS */
  function viewSettings() {
    $("#viewSettings").innerHTML = `
      <div class="grid g-2">
        <div class="card">
          <div class="card-head"><h3>Charges</h3></div>
          <div class="card-body">
            <div class="row row-2">
              <div class="fld"><label>Sales tax rate</label>
                <input class="inp" id="sTax" type="number" step="0.001" value="${(S.rates.taxRate * 100).toFixed(3)}">
                <div class="hint">Percent. O'Fallon, MO combined rate is 8.988.</div></div>
              <div class="fld"><label>Card processing fee</label>
                <input class="inp" id="sFee" type="number" step="0.1" value="${(S.rates.ccFeeRate * 100).toFixed(1)}">
                <div class="hint">Percent, applied to subtotal plus shipping plus tax.</div></div>
            </div>
            <button class="btn btn-primary" id="sSave">Save charges</button>
          </div>
        </div>

        <div class="card">
          <div class="card-head"><h3>Shipping by type</h3></div>
          <div class="card-body">
            ${S.types.map(t => `<div class="line">
              <span class="line-n"><span class="t">${esc(t.name)}</span>
                <span class="m">${t.requiresFFL ? "To dealer" : "Direct to customer"}</span></span>
              <span class="line-p">${money(t.shipRate)}</span></div>`).join("")}
            <p style="color:var(--dim);font-size:.82rem;margin:12px 0 0">
              Edit a rate from the product type it belongs to.</p>
          </div>
        </div>

        <div class="card">
          <div class="card-head"><h3>Worked example</h3></div>
          <div class="card-body" id="sExample"></div>
        </div>

        <div class="card">
          <div class="card-head"><h3>Demo data</h3></div>
          <div class="card-body">
            <p style="color:var(--muted);font-size:.88rem">
              Everything in this console is held in your browser so the workflow can be tried end
              to end. On the live build these screens read and write the shop database.</p>
            <button class="btn btn-danger" id="sReset">Reset demo data</button>
          </div>
        </div>
      </div>`;

    paintExample();
    $("#sSave").addEventListener("click", () => {
      S.rates.taxRate = (parseFloat($("#sTax").value) || 0) / 100;
      S.rates.ccFeeRate = (parseFloat($("#sFee").value) || 0) / 100;
      save(); refresh(); paintExample(); toast("Charges saved");
    });
    $("#sReset").addEventListener("click", () => {
      S = clone(SEED); save(); refresh(); toast("Demo data reset");
    });
  }

  function paintExample() {
    const sub = 1285 + 32 * 2, ship = 45;
    const tax = sub * S.rates.taxRate, fee = (sub + ship + tax) * S.rates.ccFeeRate;
    $("#sExample").innerHTML = `
      <p style="color:var(--muted);font-size:.86rem;margin-top:0">One RS9 and two 10 round magazines.</p>
      <div class="sum" style="border-top:0;margin-top:0;padding-top:0">
        <div><span>Subtotal</span><span>${money(sub)}</span></div>
        <div><span>Shipping to dealer</span><span>${money(ship)}</span></div>
        <div><span>Sales tax</span><span>${money(tax)}</span></div>
        <div><span>Card processing</span><span>${money(fee)}</span></div>
        <div class="tot"><span>Total</span><span>${money(sub + ship + tax + fee)}</span></div>
      </div>`;
  }

  /* ------------------------------------------------------------ router */
  const VIEWS = {
    dashboard: { title: "Dashboard",     sub: "Trading position and anything blocked",  fn: viewDashboard },
    orders:    { title: "Orders",        sub: "Review, progress and transfer",          fn: viewOrders },
    products:  { title: "Products",      sub: "Catalogue, variants and stock",          fn: viewProducts },
    types:     { title: "Product Types", sub: "Rules inherited by the products",        fn: viewTypes },
    content:   { title: "Content",       sub: "Copy blocks the storefront reads",       fn: viewContent },
    customers: { title: "Customers",     sub: "Built from order history",               fn: viewCustomers },
    dealers:   { title: "FFL Dealers",   sub: "Licence status and transfer volume",     fn: viewDealers },
    settings:  { title: "Settings",      sub: "Charges and demo data",                  fn: viewSettings }
  };
  let current = "dashboard";

  function go(key) {
    if (!VIEWS[key]) key = "dashboard";
    current = key;
    $$(".view").forEach(v => v.classList.remove("is-active"));
    $("#view" + key[0].toUpperCase() + key.slice(1)).classList.add("is-active");
    $$(".side-nav button").forEach(b => b.classList.toggle("is-active", b.dataset.view === key));
    $("#pageTitle").textContent = VIEWS[key].title;
    $("#pageSub").textContent = VIEWS[key].sub;
    VIEWS[key].fn();
    $("#side").classList.remove("is-open");
    window.scrollTo(0, 0);
  }

  function refresh() {
    VIEWS[current].fn();
    const n = needsAttention();
    const pill = $("#attnPill");
    pill.textContent = n;
    pill.style.display = n ? "" : "none";
  }

  /* ------------------------------------------------------------ boot */
  document.addEventListener("DOMContentLoaded", function () {
    load();

    $("#sideNav").innerHTML = `
      <div class="side-group">Overview</div>
      <button data-view="dashboard">${I.dash}Dashboard</button>
      <button data-view="orders">${I.orders}Orders<span class="pill" id="attnPill">0</span></button>
      <div class="side-group">Catalogue</div>
      <button data-view="products">${I.box}Products</button>
      <button data-view="types">${I.tags}Product Types</button>
      <div class="side-group">Store</div>
      <button data-view="content">${I.text}Content</button>
      <button data-view="customers">${I.people}Customers</button>
      <button data-view="dealers">${I.shield}FFL Dealers</button>
      <button data-view="settings">${I.gear}Settings</button>`;

    $$(".side-nav button").forEach(b => b.addEventListener("click", () => go(b.dataset.view)));
    $("#modalX").addEventListener("click", closeModal);
    $("#drawerX").addEventListener("click", closeDrawer);
    $("#veil").addEventListener("click", () => { closeModal(); closeDrawer(); });
    $("#burger").addEventListener("click", () => $("#side").classList.toggle("is-open"));
    document.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeModal(); });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") { closeModal(); closeDrawer(); }
    });

    go("dashboard");
    refresh();
  });
})();
