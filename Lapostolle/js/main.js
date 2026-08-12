/* ==========================================================================
   LAPOSTOLLE WINES UK — shared runtime
   Age gate · cookie consent · header/footer · cart · search · animations
   ========================================================================== */

const LS = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
};

/* price/stock overrides made in the admin demo flow through to the shop */
(function applyOverrides() {
  const ov = LS.get("lw_overrides", {});
  CATALOGUE.forEach(p => {
    if (ov[p.id]) {
      if (ov[p.id].price != null) p.price = ov[p.id].price;
      if (ov[p.id].stock != null) p.stock = ov[p.id].stock;
    }
  });
})();

const ICONS = {
  search: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>',
  user: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>',
  bag: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 7h12l1 14H5L6 7z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg>',
  burger: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M3 12h18M3 18h12"/></svg>',
  close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 5l14 14M19 5L5 19"/></svg>',
  arrow: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>',
  tick: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12.5 9.5 18 20 6"/></svg>',
  ship: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M1 8h13v9H1zM14 11h4l3 3v3h-7z"/><circle cx="5.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/></svg>',
  shield: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 2 4 5.5V11c0 5.2 3.4 9.4 8 11 4.6-1.6 8-5.8 8-11V5.5L12 2z"/><path d="M8.5 12l2.4 2.4 4.6-4.8"/></svg>',
  refresh: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M20 11A8 8 0 1 0 18.9 15"/><path d="M20 4v7h-7"/></svg>',
  key: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="8" cy="14" r="5"/><path d="M11.5 10.5 21 3m-4 1 3 3m-6 0 2 2"/></svg>',
  info: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9.2"/><path d="M12 10.8v6M12 7.4v.4"/></svg>',
  pin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>',
  mail: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 6 9-6"/></svg>',
  phone: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
  fb: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 9H16l.5-3h-3V4.5c0-.9.3-1.5 1.6-1.5H16.6V.2C16.3.2 15.3 0 14.1 0 11.6 0 10 1.5 10 4.3V6H7v3h3v9h3.5V9z"/></svg>',
  ig: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.8" cy="6.2" r="1.1" fill="currentColor" stroke="none"/></svg>',
  tw: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.9c-.7.3-1.5.6-2.3.7a4 4 0 0 0 1.7-2.2c-.8.5-1.6.8-2.5 1a4 4 0 0 0-6.9 3.6A11.3 11.3 0 0 1 3.9 4.8a4 4 0 0 0 1.2 5.3c-.6 0-1.3-.2-1.8-.5v.1a4 4 0 0 0 3.2 3.9 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.2a11.3 11.3 0 0 0 6.1 1.8c7.4 0 11.4-6.1 11.4-11.4v-.5c.8-.6 1.5-1.3 2-2.2z"/></svg>',
  yt: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2s-.2-1.6-.9-2.3c-.8-.9-1.8-.9-2.2-1C16.7 3.6 12 3.6 12 3.6s-4.7 0-7.9.3c-.4.1-1.4.1-2.2 1-.7.7-.9 2.3-.9 2.3S.8 9.1.8 11v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.8.9 1.9.8 2.4 1 1.7.2 7.7.3 7.7.3s4.7 0 7.9-.4c.4-.1 1.4-.1 2.2-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8zM9.8 14.9V8.6l6.1 3.2-6.1 3.1z"/></svg>'
};

const NAV = [
  ["index.html", "Home"],
  ["store.html", "Shop Wines"],
  ["leclub.html", "Le Club"],
  ["vineyards.html", "Vineyards"],
  ["news.html", "News"],
  ["contact.html", "Contact"]
];

/* ---------- header / footer ---------- */
function here() { return (location.pathname.split("/").pop() || "index.html"); }

function buildChrome() {
  const page = here();
  const hdr = document.createElement("div");
  hdr.innerHTML = `
  <header class="site" id="siteHeader">
    <div class="top-note">Flat £9 delivery · No minimum order · UK mainland</div>
    <div class="h-inner">
      <nav class="h-nav main">
        ${NAV.slice(1, 4).map(([h, l]) => `<a href="${h}" class="${page === h ? "on" : ""}">${l}</a>`).join("")}
      </nav>
      <button class="hbtn burger" id="burgerBtn" aria-label="Menu">${ICONS.burger}</button>
      <a class="h-logo" href="index.html" aria-label="Lapostolle Wines home">
        <img class="lg-light" src="assets/site/logo-light.png" alt="">
        <img class="lg-dark" src="assets/site/logo.png" alt="Lapostolle — French in Essence, Chilean by Birth">
      </a>
      <div class="h-actions">
        <nav class="h-nav main" style="margin-right:14px">
          ${NAV.slice(4).map(([h, l]) => `<a href="${h}" class="${page === h ? "on" : ""}">${l}</a>`).join("")}
        </nav>
        <button class="hbtn" id="searchBtn" aria-label="Search">${ICONS.search}</button>
        <a class="hbtn" href="account.html" aria-label="Account">${ICONS.user}</a>
        <button class="hbtn" id="cartBtn" aria-label="Cart">${ICONS.bag}<span class="count" id="cartCount"></span></button>
      </div>
    </div>
  </header>
  <div id="menuDrawer" aria-hidden="true">
    <div class="veil" data-close></div>
    <div class="panel">
      <button class="hbtn" data-close style="align-self:flex-end">${ICONS.close}</button>
      <nav>
        ${NAV.map(([h, l], i) => `<a href="${h}"><span>${l}</span><small>0${i + 1}</small></a>`).join("")}
        <a href="account.html"><span>Account</span><small>07</small></a>
      </nav>
      <p style="margin-top:auto;font-size:12px;color:var(--muted)">Flat £9 delivery · No minimum order<br>info@lapostollewines.co.uk</p>
    </div>
  </div>
  <div id="searchOverlay">
    <button class="hbtn search-close" data-closesearch>${ICONS.close}</button>
    <div class="search-inner">
      <input id="searchInput" type="text" placeholder="Search wines, vintages…" autocomplete="off">
      <div class="search-results" id="searchResults"></div>
    </div>
  </div>
  <div id="cartDrawer" aria-hidden="true">
    <div class="veil" data-closecart></div>
    <div class="panel">
      <div class="cart-head"><h3>Your Cart</h3><button class="hbtn" data-closecart>${ICONS.close}</button></div>
      <div class="cart-items" id="cartItems"></div>
      <div class="cart-foot" id="cartFoot"></div>
    </div>
  </div>
  <div id="toast"><span class="tick">${ICONS.tick}</span><span id="toastMsg"></span></div>
  <div id="lightbox"><img alt=""></div>`;
  document.body.prepend(hdr);

  const ftr = document.createElement("div");
  ftr.innerHTML = `
  <section class="newsband">
    <div class="wrap newsband-in">
      <div>
        <div class="eyebrow">Keep up to date</div>
        <h2 class="h-2" style="margin-top:14px">New releases<br>&amp; offers</h2>
      </div>
      <form onsubmit="event.preventDefault(); toast('Thank you — you are on the list.'); this.reset();">
        <input type="email" required placeholder="Your email address">
        <button type="submit">Subscribe</button>
      </form>
    </div>
  </section>
  <div class="trust">
    <div class="wrap trust-grid">
      <div class="trust-item">${ICONS.ship}<div><h4>Flat £9 delivery</h4><p>No minimum order. Pay the same for 1 bottle as for 120.</p></div></div>
      <div class="trust-item">${ICONS.refresh}<div><h4>Money back</h4><p>100% refund guaranteed.</p></div></div>
      <div class="trust-item">${ICONS.shield}<div><h4>Safe payment</h4><p>Secure online payments in GBP.</p></div></div>
    </div>
  </div>
  <footer class="site">
    <div class="wrap">
      <div class="f-grid">
        <div class="f-col">
          <img class="f-logo" src="assets/site/logo-light.png" alt="Lapostolle">
          <p>Lapostolle Wines are terroir-driven wines produced in Chile by the 7th generation of the Bournet-Lapostolle family.</p>
          <div class="f-social">
            <a href="https://facebook.com/LapostolleWines" target="_blank" rel="noopener" aria-label="Facebook">${ICONS.fb}</a>
            <a href="https://instagram.com/lapostollewines" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.ig}</a>
            <a href="https://twitter.com/LapostolleWine" target="_blank" rel="noopener" aria-label="Twitter">${ICONS.tw}</a>
            <a href="https://youtube.com/user/LapostolleWinery" target="_blank" rel="noopener" aria-label="YouTube">${ICONS.yt}</a>
          </div>
        </div>
        <div class="f-col">
          <h5>Shop</h5>
          <nav>
            <a href="store.html?cat=wines">Lapostolle Wines and Pisco</a>
            <a href="store.html?cat=icons">Clos Apalta &amp; Clos du Lican</a>
            <a href="store.html?cat=cases">Mixed Cases</a>
            <a href="leclub.html">Le Club</a>
          </nav>
        </div>
        <div class="f-col">
          <h5>Discover</h5>
          <nav>
            <a href="vineyards.html">Our Vineyards</a>
            <a href="news.html">News</a>
            <a href="contact.html">Contact Us</a>
            <a href="terms.html">Terms &amp; Conditions</a>
          </nav>
        </div>
        <div class="f-col">
          <h5>Contact</h5>
          <p>Lapostolle Wines<br>Unit 14 Sheddingdean Business Centre<br>Marchants Way, Burgess Hill<br>West Sussex RH15 8QY</p>
          <p>info@lapostollewines.co.uk<br>07785 258 129</p>
        </div>
      </div>
      <div class="f-legal">
        <span>© 2026 Lapostolle Wines UK · All rights reserved</span>
        <div class="regs">
          <span>AWRS XEAW 000 0011 3663</span>
          <span>Company No. 12134764</span>
          <span>VAT 334 5735 95</span>
        </div>
        <span>Please drink responsibly · drinkaware.co.uk</span>
      </div>
    </div>
  </footer>`;
  document.body.appendChild(ftr);
}

/* ---------- age gate + cookie consent ---------- */
function complianceLog(kind, choice) {
  const log = LS.get("lw_compliance", []);
  log.unshift({ kind, choice, ts: new Date().toISOString(), ua: navigator.userAgent.slice(0, 80) });
  LS.set("lw_compliance", log.slice(0, 200));
}

function buildAgeGate() {
  /* the 18+ gate greets every new visit (per browser session), as required */
  let ageOk = false;
  try { ageOk = JSON.parse(sessionStorage.getItem("lw_age") || "null")?.ok; } catch {}
  if (ageOk) return showCookieBar();
  const g = document.createElement("div");
  g.id = "ageGate";
  g.innerHTML = `
    <div class="gate-card">
      <img class="crest" src="assets/site/crest-dark.png" alt="">
      <h1>Welcome to<br>Lapostolle Wines</h1>
      <div class="gate-rule"></div>
      <p>To enter this site you must be of legal drinking age<br>in the United Kingdom.</p>
      <p class="serif italic" style="font-size:19px;color:var(--tx)">Are you 18 years or older?</p>
      <div class="gate-actions">
        <button class="btn solid" id="ageYes">Yes — I am 18 or over</button>
        <button class="btn" id="ageNo">No — I am under 18</button>
      </div>
      <p class="gate-fine">By entering you agree to our <a href="terms.html">Terms &amp; Conditions</a>. Your choice is recorded for compliance. Please drink responsibly — <a href="https://www.drinkaware.co.uk" target="_blank" rel="noopener">drinkaware.co.uk</a></p>
    </div>`;
  document.body.appendChild(g);
  document.body.style.overflow = "hidden";
  g.querySelector("#ageYes").onclick = () => {
    sessionStorage.setItem("lw_age", JSON.stringify({ ok: true, ts: new Date().toISOString() }));
    complianceLog("age-gate", "confirmed 18+");
    g.style.transition = "opacity .7s ease"; g.style.opacity = 0;
    document.body.style.overflow = "";
    setTimeout(() => { g.remove(); showCookieBar(); }, 700);
  };
  g.querySelector("#ageNo").onclick = () => {
    complianceLog("age-gate", "declined — under 18");
    g.classList.add("denied");
    g.querySelector(".gate-card").innerHTML = `
      <img class="crest" src="assets/site/crest-dark.png" alt="">
      <h1>We're sorry</h1>
      <div class="gate-rule"></div>
      <p>You must be 18 or over to visit lapostollewines.co.uk.<br>This site sells alcohol and entry has been declined.</p>
      <p class="gate-fine" style="margin-top:30px">For facts about alcohol visit <a href="https://www.drinkaware.co.uk" target="_blank" rel="noopener">drinkaware.co.uk</a></p>`;
  };
}

function showCookieBar() {
  if (LS.get("lw_cookies", null)) return;
  const b = document.createElement("div");
  b.id = "cookieBar";
  b.innerHTML = `
    <h4>Cookies &amp; privacy</h4>
    <p>We use essential cookies to run the store, and optional analytics cookies to improve the site. Your choice is recorded. See our <a href="terms.html">Terms &amp; Conditions</a>.</p>
    <div class="cookie-actions">
      <button class="btn solid sm" id="ckYes">Agree</button>
      <button class="btn sm" id="ckNo">Disagree</button>
    </div>`;
  document.body.appendChild(b);
  requestAnimationFrame(() => setTimeout(() => b.classList.add("show"), 900));
  const done = (choice) => {
    LS.set("lw_cookies", { choice, ts: new Date().toISOString() });
    complianceLog("cookie-consent", choice);
    b.classList.remove("show");
    setTimeout(() => b.remove(), 600);
  };
  b.querySelector("#ckYes").onclick = () => done("agreed");
  b.querySelector("#ckNo").onclick = () => done("disagreed");
}

/* ---------- cart ---------- */
const Cart = {
  get items() { return LS.get("lw_cart", []); },
  set items(v) { LS.set("lw_cart", v); renderCartCount(); },
  add(id, qty = 1) {
    const items = this.items;
    const row = items.find(i => i.id === id);
    if (row) row.qty += qty; else items.push({ id, qty });
    this.items = items;
    const p = findProduct(id);
    toast(`${p.name} ${p.vintage || ""} added to your cart`);
    renderCartDrawer();
  },
  setQty(id, qty) {
    let items = this.items;
    if (qty <= 0) items = items.filter(i => i.id !== id);
    else items.find(i => i.id === id).qty = qty;
    this.items = items;
    renderCartDrawer();
  },
  clear() { this.items = []; renderCartDrawer(); },
  get count() { return this.items.reduce((a, b) => a + b.qty, 0); },
  get subtotal() { return this.items.reduce((a, b) => a + findProduct(b.id).price * b.qty, 0); }
};

function renderCartCount() {
  const el = document.getElementById("cartCount");
  if (!el) return;
  el.textContent = Cart.count;
  el.classList.toggle("on", Cart.count > 0);
}

function renderCartDrawer() {
  const wrap = document.getElementById("cartItems");
  const foot = document.getElementById("cartFoot");
  if (!wrap) return;
  if (!Cart.items.length) {
    wrap.innerHTML = `<div class="cart-empty">${ICONS.bag.replace('width="19" height="19"', 'width="44" height="44"')}<p>Your cart is empty.</p><a class="link-arrow" href="store.html">Shop the wines ${ICONS.arrow}</a></div>`;
    foot.innerHTML = "";
    return;
  }
  wrap.innerHTML = Cart.items.map(({ id, qty }) => {
    const p = findProduct(id);
    return `<div class="ci">
      <div class="im"><img src="${p.images[0]}" alt=""></div>
      <div>
        <h4>${p.name} ${p.vintage ? `<span class="gold italic serif">${p.vintage}</span>` : ""}</h4>
        <div class="meta">${p.region}</div>
        <div class="qty">
          <button onclick="Cart.setQty('${id}', ${qty - 1})" aria-label="Decrease">−</button>
          <span>${qty}</span>
          <button onclick="Cart.setQty('${id}', ${qty + 1})" aria-label="Increase">+</button>
        </div>
      </div>
      <div class="rt">
        <span class="pr">${money(p.price * qty)}</span>
        <button class="rm" onclick="Cart.setQty('${id}', 0)">Remove</button>
      </div>
    </div>`;
  }).join("");
  foot.innerHTML = `
    <div class="cart-line"><span>Subtotal (${Cart.count} bottle${Cart.count > 1 ? "s" : ""})</span><span>${money(Cart.subtotal)}</span></div>
    <div class="cart-line"><span>Delivery — flat rate, any quantity</span><span>${money(SHIPPING_FLAT)}</span></div>
    <div class="cart-line total"><span>Total</span><span>${money(Cart.subtotal + SHIPPING_FLAT)}</span></div>
    <p class="cart-note">Same £9 delivery for 1 bottle or 120 · UK mainland</p>
    <a class="btn solid" href="checkout.html">Checkout ${ICONS.arrow}</a>`;
}

function openCart() { document.getElementById("cartDrawer").classList.add("open"); renderCartDrawer(); }
function closeCart() { document.getElementById("cartDrawer").classList.remove("open"); }

let toastTimer;
function toast(msg) {
  const t = document.getElementById("toast");
  document.getElementById("toastMsg").textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

/* ---------- product card builder (shared) ---------- */
function productCard(p, opts = {}) {
  const save = p.was ? Math.round((1 - p.price / p.was) * 100) : 0;
  const topScore = p.scores?.length ? p.scores.reduce((a, b) => b[1] > a[1] ? b : a) : null;
  return `<article class="pcard rv" style="--d:${(opts.i || 0) * 0.07}s">
    <a class="ph" href="product.html?id=${p.id}">
      <div class="flags">
        ${topScore ? `<span class="flag score">${topScore[1]} pts ${topScore[0].split(" ")[1] || topScore[0]}</span>` : ""}
        ${p.was ? `<span class="flag sale">Save ${save}%</span>` : ""}
        ${p.limited && !topScore ? `<span class="flag">Limited</span>` : ""}
      </div>
      <img loading="lazy" src="${p.images[0]}" alt="${p.title}">
      <div class="quick"><button onclick="event.preventDefault(); Cart.add('${p.id}')">Add to cart — ${money(p.price)}</button></div>
    </a>
    <div class="pb">
      <span class="rng">${p.range}</span>
      <h3><a href="product.html?id=${p.id}">${p.name} ${p.vintage ? `<span class="vint">${p.vintage}</span>` : ""}</a></h3>
      <span class="reg">${p.region}</span>
      <div class="prices">
        <span class="pr">${money(p.price)}</span>
        ${p.was ? `<span class="was">${money(p.was)}</span><span class="save">−${save}%</span>` : ""}
      </div>
    </div>
  </article>`;
}

/* ---------- search ---------- */
function bindSearch() {
  const ov = document.getElementById("searchOverlay");
  const input = document.getElementById("searchInput");
  const res = document.getElementById("searchResults");
  document.getElementById("searchBtn").onclick = () => { ov.classList.add("open"); setTimeout(() => input.focus(), 60); };
  ov.querySelector("[data-closesearch]").onclick = () => ov.classList.remove("open");
  document.addEventListener("keydown", e => { if (e.key === "Escape") { ov.classList.remove("open"); closeCart(); document.getElementById("menuDrawer").classList.remove("open"); } });
  input.oninput = () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { res.innerHTML = ""; return; }
    const hits = CATALOGUE.filter(p => (p.title + p.name + p.range + p.grape + (p.vintage || "")).toLowerCase().includes(q)).slice(0, 8);
    res.innerHTML = hits.length ? hits.map(p => `
      <a class="sr-row" href="product.html?id=${p.id}">
        <img src="${p.images[0]}" alt="">
        <div><div class="nm">${p.name} ${p.vintage || ""}</div><div class="meta">${p.range} · ${p.region}</div></div>
        <span class="pr">${money(p.price)}</span>
      </a>`).join("") : `<p class="muted" style="padding:16px 12px">No wines match “${input.value}”.</p>`;
  };
}

/* ---------- animations ---------- */
function bindAnimations() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  document.querySelectorAll(".rv, .mask-lines").forEach(el => io.observe(el));

  /* header behaviour */
  const h = document.getElementById("siteHeader");
  let lastY = scrollY;
  h.classList.toggle("solid", scrollY > 30);
  addEventListener("scroll", () => {
    h.classList.toggle("solid", scrollY > 30);
    h.classList.toggle("hide", scrollY > 500 && scrollY > lastY);
    lastY = scrollY;
    /* hero parallax */
    document.querySelectorAll("[data-plx]").forEach(el => {
      const f = parseFloat(el.dataset.plx || .25);
      el.style.transform = `translateY(${scrollY * f}px)`;
    });
  }, { passive: true });
}

/* ---------- page transitions ---------- */
function bindTransitions() {
  document.addEventListener("click", e => {
    const a = e.target.closest("a[href]");
    if (!a || a.target === "_blank" || a.getAttribute("href").startsWith("#") || a.getAttribute("href").startsWith("http") || a.hasAttribute("data-nofade")) return;
    e.preventDefault();
    document.body.classList.add("leaving");
    setTimeout(() => location.href = a.getAttribute("href"), 240);
  });
}

/* ---------- boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  buildChrome();
  buildAgeGate();
  renderCartCount();
  bindSearch();
  bindAnimations();
  bindTransitions();
  document.getElementById("cartBtn").onclick = openCart;
  document.querySelectorAll("[data-closecart]").forEach(b => b.onclick = closeCart);
  document.getElementById("burgerBtn").onclick = () => document.getElementById("menuDrawer").classList.add("open");
  document.querySelectorAll("#menuDrawer [data-close]").forEach(b => b.onclick = () => document.getElementById("menuDrawer").classList.remove("open"));
  /* lightbox */
  const lb = document.getElementById("lightbox");
  lb.onclick = () => lb.classList.remove("open");
  document.body.classList.add("ready");
  if (document.querySelector(".hero, .page-hero")) document.body.classList.remove("headed");
  else document.body.classList.add("headed");
});
