/* ==========================================================================
   LAPOSTOLLE ADMIN — sample store manager
   ========================================================================== */

const LS = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
};

/* overrides so admin edits flow to the storefront */
const OV = LS.get("lw_overrides", {});
CATALOGUE.forEach(p => {
  if (OV[p.id]) {
    if (OV[p.id].price != null) p.price = OV[p.id].price;
    if (OV[p.id].stock != null) p.stock = OV[p.id].stock;
  }
});

let toastTimer;
function toast(msg) {
  const t = document.getElementById("toast");
  document.getElementById("toastMsg").textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
}

/* ---------- seed orders (merged with live sample orders) ---------- */
const SEED = [
  { ref: "LW-2026-1288", ts: "2026-08-11T16:44:00Z", status: "processing", name: "Harriet Coles", total: 262.5, items: [{ id: "851983506", qty: 2 }, { id: "324483793", qty: 1 }] },
  { ref: "LW-2026-1287", ts: "2026-08-11T09:12:00Z", status: "transit", name: "Dominic Shaw", total: 98, items: [{ id: "325474185", qty: 1 }] },
  { ref: "LW-2026-1286", ts: "2026-08-10T18:03:00Z", status: "transit", name: "Priya Nair", total: 134, items: [{ id: "741242253", qty: 1 }] },
  { ref: "LW-2026-1285", ts: "2026-08-09T13:37:00Z", status: "delivered", name: "George Ellery", total: 47.98, items: [{ id: "324494039", qty: 3 }] },
  { ref: "LW-2026-1284", ts: "2026-07-28T11:24:00Z", status: "delivered", name: "Ronnie Hazell", total: 144.5, items: [{ id: "325453319", qty: 1 }, { id: "324483793", qty: 1 }] },
  { ref: "LW-2026-1283", ts: "2026-07-25T10:00:00Z", status: "delivered", name: "Sophie Trent", total: 82, items: [{ id: "325453236", qty: 1 }] },
  { ref: "LW-2026-1282", ts: "2026-07-22T15:20:00Z", status: "delivered", name: "Michael Obi", total: 259, items: [{ id: "728874612", qty: 2 }] },
];

function allOrders() {
  const mine = LS.get("lw_orders", []).map(o => ({ ...o, mine: true }));
  const seen = new Set(mine.map(o => o.ref));
  return [...mine, ...SEED.filter(o => !seen.has(o.ref))];
}

const gbDate = ts => new Date(ts).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

/* ---------- navigation ---------- */
const TITLES = {
  dash: ["Overview", "Dashboard"], orders: ["Sales", "Orders"], products: ["Catalogue", "Products"],
  club: ["Members", "Le Club"], content: ["Site", "Content"], discounts: ["Marketing", "Discounts"],
  compliance: ["Legal", "Compliance"], settings: ["Store", "Settings"]
};
function go(v) {
  document.querySelectorAll(".a-view").forEach(s => s.classList.toggle("on", s.id === "v-" + v));
  document.querySelectorAll("#aNav button").forEach(b => b.classList.toggle("on", b.dataset.v === v));
  document.getElementById("aCrumb").textContent = TITLES[v][0];
  document.getElementById("aTitle").textContent = TITLES[v][1];
  scrollTo({ top: 0 });
}
document.querySelectorAll("#aNav button").forEach(b => b.onclick = () => go(b.dataset.v));

/* ---------- dashboard ---------- */
function statusBadge(s) {
  const label = { processing: "Processing", transit: "In transit", delivered: "Delivered" }[s] || s;
  return `<span class="b-status ${s}">${label}</span>`;
}

function renderDash() {
  const orders = allOrders();
  const rev = orders.reduce((a, o) => a + o.total, 0) + 8143;
  document.getElementById("kRev").textContent = "£" + Math.round(rev).toLocaleString("en-GB");
  document.getElementById("kOrders").textContent = orders.length + 96;
  document.getElementById("kAov").textContent = "£" + (rev / (orders.length + 96)).toFixed(2);

  /* best sellers */
  const best = [
    ["325453319", 38], ["324486316", 34], ["741242253", 21], ["325474185", 19], ["324483793", 17]
  ];
  document.getElementById("bestTable").innerHTML =
    `<tr><th>Wine</th><th class="num">Sold</th><th class="num">Revenue</th></tr>` +
    best.map(([id, n]) => {
      const p = findProduct(id);
      return `<tr>
        <td><div style="display:flex;gap:12px;align-items:center">
          <div class="thumb"><img src="${p.images[0]}" alt=""></div>
          <div><div class="pname">${p.name} ${p.vintage || ""}</div><div class="psub">${p.range}</div></div>
        </div></td>
        <td class="num">${n}</td>
        <td class="num">${money(p.price * n)}</td></tr>`;
    }).join("");

  /* recent orders */
  document.getElementById("recentOrders").innerHTML =
    `<tr><th>Ref</th><th>Customer</th><th>Date</th><th class="num">Total</th><th>Status</th></tr>` +
    allOrders().slice(0, 5).map(o => `<tr>
      <td><b>${o.ref}</b>${o.mine ? ' <span style="color:var(--gold-ink);font-size:10px;letter-spacing:.08em">● NEW</span>' : ""}</td>
      <td>${o.name}</td><td>${gbDate(o.ts)}</td>
      <td class="num">${money(o.total)}</td><td>${statusBadge(o.status)}</td></tr>`).join("");

  /* low stock */
  const low = [...CATALOGUE].sort((a, b) => a.stock - b.stock).slice(0, 5);
  document.getElementById("lowStock").innerHTML =
    `<tr><th>Wine</th><th class="num">Stock</th></tr>` +
    low.map(p => `<tr>
      <td><div style="display:flex;gap:12px;align-items:center">
        <div class="thumb"><img src="${p.images[0]}" alt=""></div>
        <div><div class="pname">${p.name} ${p.vintage || ""}</div><div class="psub">SKU ${p.sku}</div></div>
      </div></td>
      <td class="num"><span class="stock-pill ${p.stock <= 8 ? "low" : ""}">${p.stock}</span></td></tr>`).join("");

  drawRevChart();
}

function drawRevChart() {
  const c = document.getElementById("revChart");
  const ctx = c.getContext("2d");
  const W = c.width = c.offsetWidth * 2, H = c.height = 480;
  ctx.scale(1, 1);
  const data = [640, 720, 585, 810, 905, 850, 1020, 980, 1140, 1075, 1260, 1390];
  const max = Math.max(...data) * 1.15;
  const px = i => 40 + i * ((W - 80) / (data.length - 1));
  const py = v => H - 60 - (v / max) * (H - 110);
  /* grid */
  ctx.strokeStyle = "rgba(120,100,60,.14)"; ctx.lineWidth = 1;
  for (let g = 0; g <= 4; g++) {
    const y = 30 + g * ((H - 90) / 4);
    ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(W - 40, y); ctx.stroke();
  }
  /* area */
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "rgba(201,168,106,.32)"); grad.addColorStop(1, "rgba(201,168,106,0)");
  ctx.beginPath(); ctx.moveTo(px(0), py(data[0]));
  data.forEach((v, i) => ctx.lineTo(px(i), py(v)));
  ctx.lineTo(px(data.length - 1), H - 40); ctx.lineTo(px(0), H - 40); ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();
  /* line */
  ctx.beginPath(); ctx.moveTo(px(0), py(data[0]));
  data.forEach((v, i) => ctx.lineTo(px(i), py(v)));
  ctx.strokeStyle = "#a8894f"; ctx.lineWidth = 3; ctx.lineJoin = "round"; ctx.stroke();
  /* dots */
  data.forEach((v, i) => {
    ctx.beginPath(); ctx.arc(px(i), py(v), 5, 0, 7);
    ctx.fillStyle = "#ffffff"; ctx.fill();
    ctx.strokeStyle = "#a8894f"; ctx.lineWidth = 2.4; ctx.stroke();
  });
  /* labels */
  ctx.fillStyle = "rgba(122,111,95,.95)"; ctx.font = "20px Jost";
  ["May", "Jun", "Jul", "Aug"].forEach((m, i) => ctx.fillText(m, 60 + i * ((W - 120) / 3.2), H - 12));
}

/* ---------- orders ---------- */
function renderOrders() {
  document.getElementById("ordersTable").innerHTML =
    `<tr><th>Ref</th><th>Customer</th><th>Date</th><th>Items</th><th class="num">Total</th><th>Status</th><th></th></tr>` +
    allOrders().map(o => `<tr>
      <td><b>${o.ref}</b>${o.mine ? ' <span style="color:var(--gold-ink);font-size:10px;letter-spacing:.08em">● NEW</span>' : ""}</td>
      <td>${o.name}</td>
      <td>${gbDate(o.ts)}</td>
      <td>${o.items.reduce((a, b) => a + b.qty, 0)}</td>
      <td class="num">${money(o.total)}</td>
      <td>${statusBadge(o.status)}</td>
      <td class="num"><button class="a-btn tiny" onclick='toast("Sample only. The full build opens the order with courier tracking, refunds and invoices")'>Open</button></td>
    </tr>`).join("");
}

/* ---------- products ---------- */
function renderProducts() {
  document.getElementById("prodTable").innerHTML =
    `<tr><th>Wine</th><th>SKU</th><th>Category</th><th>Price (£)</th><th>Stock</th><th></th></tr>` +
    CATALOGUE.map(p => `<tr>
      <td><div style="display:flex;gap:12px;align-items:center">
        <div class="thumb"><img src="${p.images[0]}" alt=""></div>
        <div><div class="pname">${p.name} ${p.vintage || ""}</div><div class="psub">${p.range} · ${p.region}</div></div>
      </div></td>
      <td>${p.sku}</td>
      <td style="font-size:12px;color:var(--mut)">${p.cat.replace(" and ", " & ")}</td>
      <td><input class="inline" id="pr-${p.id}" value="${p.price.toFixed(2)}" inputmode="decimal"></td>
      <td><input class="inline" id="st-${p.id}" value="${p.stock}" inputmode="numeric" style="width:64px"></td>
      <td class="num"><button class="a-btn tiny" onclick="saveProduct('${p.id}')">Save</button></td>
    </tr>`).join("");
}

function saveProduct(id) {
  const price = parseFloat(document.getElementById("pr-" + id).value);
  const stock = parseInt(document.getElementById("st-" + id).value, 10);
  if (isNaN(price) || isNaN(stock)) { toast("Enter a valid price and stock figure"); return; }
  const ov = LS.get("lw_overrides", {});
  ov[id] = { price, stock };
  LS.set("lw_overrides", ov);
  const p = findProduct(id); p.price = price; p.stock = stock;
  toast(`${p.name} updated. The storefront now shows ${money(price)}`);
}

/* ---------- le club ---------- */
function renderClub() {
  document.getElementById("clubPassInput").value = LS.get("lw_club_pass", null) || LECLUB.password;
  const slots = LS.get("lw_club_slots", null) || LECLUB.slots;
  document.getElementById("clubSlots").innerHTML = slots.map((id, i) => {
    const p = findProduct(id);
    return `<div class="slot">
      <div class="s-num">Allocation ${String(i + 1).padStart(2, "0")}</div>
      <div class="s-img"><img id="slotimg-${i}" src="${p.images[0]}" alt=""></div>
      <select id="slot-${i}" onchange="document.getElementById('slotimg-${i}').src = findProduct(this.value).images[0]">
        ${CATALOGUE.map(x => `<option value="${x.id}" ${x.id === id ? "selected" : ""}>${x.name} ${x.vintage || ""} — ${money(x.price)}</option>`).join("")}
      </select>
    </div>`;
  }).join("");
}

function saveClubPass() {
  const v = (document.getElementById("clubPassInput").value || "").trim().toUpperCase();
  if (v.length < 4) { toast("Password needs at least 4 characters"); return; }
  LS.set("lw_club_pass", v);
  LS.set("lw_club", { open: false });
  toast(`Le Club password changed to ${v}. Members must re-enter`);
}

function saveClubSlots() {
  const slots = Array.from({ length: 8 }, (_, i) => document.getElementById("slot-" + i).value);
  LS.set("lw_club_slots", slots);
  toast("Allocations saved. Le Club now shows the new wines");
}

function resetClubSlots() {
  localStorage.removeItem("lw_club_slots");
  renderClub();
  toast("Allocations reset to default");
}

/* ---------- compliance ---------- */
const SEEDLOG = [
  { kind: "age-gate", choice: "confirmed 18+", ts: "2026-08-11T19:22:41Z", ua: "Safari 19 · iPhone" },
  { kind: "cookie-consent", choice: "agreed", ts: "2026-08-11T19:22:52Z", ua: "Safari 19 · iPhone" },
  { kind: "age-gate", choice: "declined — under 18", ts: "2026-08-11T16:04:19Z", ua: "Chrome 139 · Android" },
  { kind: "age-gate", choice: "confirmed 18+", ts: "2026-08-11T14:47:03Z", ua: "Edge 139 · Windows" },
  { kind: "cookie-consent", choice: "disagreed", ts: "2026-08-11T14:47:15Z", ua: "Edge 139 · Windows" },
  { kind: "le-club", choice: "unlocked", ts: "2026-08-10T20:15:44Z", ua: "Safari 19 · macOS" },
  { kind: "age-gate", choice: "confirmed 18+", ts: "2026-08-10T20:15:02Z", ua: "Safari 19 · macOS" },
];

function allLogs() { return [...LS.get("lw_compliance", []).map(l => ({ ...l, mine: true })), ...SEEDLOG]; }

function renderCompliance() {
  document.getElementById("logRows").innerHTML = allLogs().slice(0, 40).map(l => `
    <div class="log-row">
      <span class="k">${l.kind}</span>
      <span class="t">${new Date(l.ts).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</span>
      <span>${l.choice}${l.mine ? ' <span style="color:var(--gold-ink);font-size:10px">● THIS DEVICE</span>' : ""}</span>
      <span class="ua">${l.ua || ""}</span>
    </div>`).join("");
}

function exportLog() {
  const rows = [["kind", "timestamp", "choice", "agent"], ...allLogs().map(l => [l.kind, l.ts, l.choice, (l.ua || "").replace(/,/g, ";")])];
  const csv = rows.map(r => r.join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = "lapostolle-consent-log.csv";
  a.click();
  toast("Consent log exported");
}

/* ---------- boot ---------- */
renderDash();
renderOrders();
renderProducts();
renderClub();
renderCompliance();
addEventListener("resize", drawRevChart);
