/* ==========================================================================
   TCH Arms - interface behaviour
   Chrome (nav, footer, cart drawer, lightbox) is injected from here so the
   twelve pages stay in sync rather than each carrying its own copy.
   ========================================================================== */
(function () {
  "use strict";

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const money = n => "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  /* ------------------------------------------------------------ icons */
  const I = {
    cart:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.4 12.1a1.6 1.6 0 0 0 1.6 1.3h8.5a1.6 1.6 0 0 0 1.6-1.3L21 7H6"/></svg>',
    close: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>',
    right: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg>',
    left:  '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M13 5l-7 7 7 7"/></svg>',
    phone: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.4 2.1L8 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2Z"/></svg>',
    mail:  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
    pin:   '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    play:  '<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M8 5.5v13l11-6.5z"/></svg>',
    check: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    trash: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>',
    drag:  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5 4 12l5 7M15 5l5 7-5 7"/></svg>',
    lock:  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
    ext:   '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>'
  };
  window.TCHIcons = I;

  /* ------------------------------------------------------------ chrome */
  const NAV = [
    { href: "rs9.html",         label: "Specs RS9 Vampir",   key: "rs9" },
    { href: "rs9x.html",        label: "Specs RS9 X Vampir", key: "rs9x" },
    { href: "gallery.html",     label: "Gallery",            key: "gallery" },
    { href: "accessories.html", label: "Accessories",        key: "accessories" },
    { href: "order.html",       label: "Order Here",         key: "order",
      sub: [{ href: "order.html#rs9", label: "VAMPIR RS9" }, { href: "order.html#rs9x", label: "VAMPIR RS9 X" }] },
    { href: "about.html",       label: "About",              key: "about" },
    { href: "contact.html",     label: "Contact Us",         key: "contact" }
  ];

  function mountChrome() {
    const page = document.body.dataset.page || "";

    const links = NAV.map(n => {
      const active = n.key === page ? " is-active" : "";
      if (!n.sub) return `<a href="${n.href}" class="${active.trim()}">${n.label}</a>`;
      return `<div class="nav-drop"><a href="${n.href}" class="${active.trim()}">${n.label}</a>
        <div class="nav-drop-menu">${n.sub.map(s => `<a href="${s.href}">${s.label}</a>`).join("")}</div></div>`;
    }).join("");

    document.body.insertAdjacentHTML("afterbegin", `
      <header class="nav" id="nav">
        <div class="nav-inner">
          <a href="index.html" class="nav-logo"><img src="assets/brand/tch-logo.webp" alt="TCH Arms"></a>
          <nav class="nav-links" id="navLinks">${links}</nav>
          <a href="cart.html" class="nav-cart" id="navCart" aria-label="Cart">
            ${I.cart}<span class="count" id="cartCount">0</span>
          </a>
          <button class="nav-burger" id="navBurger" aria-label="Menu"><span></span><span></span><span></span></button>
        </div>
      </header>`);

    const c = TCH.company;
    document.body.insertAdjacentHTML("beforeend", `
      <footer class="footer">
        <div class="shell">
          <div class="footer-grid">
            <div>
              <div class="footer-logo"><img src="assets/brand/tch-logo.webp" alt="TCH Arms"></div>
              <p style="color:var(--muted);font-size:.9rem;max-width:290px">
                ${c.tagline}
              </p>
            </div>
            <div>
              <h5>Support</h5>
              <ul class="footer-contact">
                <li>${I.phone}<a href="tel:13142663361">${c.phone}</a></li>
                <li>${I.mail}<a href="mailto:${c.email}">${c.email}</a></li>
                <li>${I.pin}<span>${c.street}<br>${c.city}</span></li>
              </ul>
            </div>
            <div>
              <h5>Shop</h5>
              <ul>
                <li><a href="rs9.html">RS9 Tech Specs</a></li>
                <li><a href="rs9x.html">RS9 X Tech Specs</a></li>
                <li><a href="accessories.html">Accessories</a></li>
                <li><a href="order.html">Order Here</a></li>
                <li><a href="cart.html">Cart</a></li>
              </ul>
            </div>
            <div>
              <h5>Company</h5>
              <ul>
                <li><a href="about.html">About TCH Arms</a></li>
                <li><a href="gallery.html">Gallery</a></li>
                <li><a href="contact.html">Contact Us</a></li>
                <li><a href="admin.html">Media Manager</a></li>
              </ul>
            </div>
          </div>
          <p class="footer-legal">
            <b>${TCH.legal.regs}</b> ${TCH.legal.restrict} ${TCH.legal.age}
            ${TCH.legal.warranty}
          </p>
          <div class="footer-bottom">
            <span>&copy; ${new Date().getFullYear()} ${c.name}. Manufactured by ${c.maker}, ${c.origin}.</span>
            <span>${c.street}, ${c.city}</span>
          </div>
        </div>
      </footer>

      <div class="drawer-veil" id="drawerVeil"></div>
      <aside class="drawer" id="drawer" aria-label="Cart">
        <div class="drawer-head">
          <h3>Your Cart</h3>
          <button class="drawer-close" id="drawerClose" aria-label="Close">${I.close}</button>
        </div>
        <div class="drawer-body" id="drawerBody"></div>
        <div class="drawer-foot" id="drawerFoot"></div>
      </aside>

      <div class="lightbox" id="lightbox">
        <button class="lightbox-close" aria-label="Close">${I.close}</button>
        <button class="lightbox-nav prev" aria-label="Previous">${I.left}</button>
        <button class="lightbox-nav next" aria-label="Next">${I.right}</button>
        <img alt="">
        <div class="lightbox-cap"></div>
      </div>

      <div class="toast-stack" id="toastStack"></div>`);

    // sticky nav condense
    const nav = $("#nav");
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // mobile menu
    const burger = $("#navBurger"), navLinks = $("#navLinks");
    burger.addEventListener("click", () => {
      burger.classList.toggle("is-open");
      navLinks.classList.toggle("is-open");
    });

    // cart icon opens the drawer instead of navigating, unless already on cart
    $("#navCart").addEventListener("click", e => {
      if (page !== "cart") { e.preventDefault(); Cart.open(); }
    });
    $("#drawerClose").addEventListener("click", Cart.close);
    $("#drawerVeil").addEventListener("click", Cart.close);
  }

  /* ------------------------------------------------------------ toast */
  function toast(msg) {
    const stack = $("#toastStack");
    if (!stack) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = I.check + "<span>" + msg + "</span>";
    stack.appendChild(el);
    requestAnimationFrame(() => el.classList.add("is-in"));
    setTimeout(() => {
      el.classList.remove("is-in");
      setTimeout(() => el.remove(), 450);
    }, 2900);
  }
  window.tchToast = toast;

  /* ------------------------------------------------------------ cart */
  const Cart = {
    KEY: "tch_cart_v1",
    items: [],

    load() {
      try { this.items = JSON.parse(localStorage.getItem(this.KEY)) || []; }
      catch (e) { this.items = []; }
    },
    save() {
      localStorage.setItem(this.KEY, JSON.stringify(this.items));
      this.paint();
      document.dispatchEvent(new CustomEvent("cart:change"));
    },
    add(id, opts) {
      opts = opts || {};
      const p = TCH.products[id];
      if (!p) return;
      const variant = opts.variant || "";
      const found = this.items.find(i => i.id === id && i.variant === variant);
      if (found) found.qty += (opts.qty || 1);
      else this.items.push({ id, variant, qty: opts.qty || 1 });
      this.save();
      toast(p.name + " added to cart");
      const badge = $("#cartCount");
      if (badge) { badge.classList.add("is-bump"); setTimeout(() => badge.classList.remove("is-bump"), 460); }
    },
    setQty(idx, q) {
      if (q <= 0) this.items.splice(idx, 1);
      else this.items[idx].qty = q;
      this.save();
    },
    remove(idx) { this.items.splice(idx, 1); this.save(); },
    clear() { this.items = []; this.save(); },

    count() { return this.items.reduce((n, i) => n + i.qty, 0); },

    totals() {
      let sub = 0, hasFirearm = false;
      this.items.forEach(i => {
        const p = TCH.products[i.id];
        if (!p) return;
        sub += p.price * i.qty;
        if (i.id === "rs9" || i.id === "rs9x") hasFirearm = true;
      });
      const r = TCH.rates;
      const shipping = this.items.length === 0 ? 0 : (hasFirearm ? r.shipFirearm : r.shipAccessory);
      const tax = sub * r.taxRate;
      const ccFee = (sub + shipping + tax) * r.ccFeeRate;
      return { sub, shipping, tax, ccFee, total: sub + shipping + tax + ccFee, hasFirearm };
    },

    lineHTML(i, idx) {
      const p = TCH.products[i.id];
      if (!p) return "";
      return `<div class="line-item">
        <div class="line-thumb"><img src="${p.img}" alt="${p.name}"></div>
        <div class="line-info">
          <h5>${p.name}</h5>
          ${i.variant ? `<div class="v">Size: ${i.variant}</div>` : (p.caliber ? `<div class="v">${p.caliber}</div>` : "")}
          <div class="line-price">${money(p.price * i.qty)}</div>
          <div class="qty">
            <button data-qty="${idx}" data-d="-1" aria-label="Decrease">&minus;</button>
            <span>${i.qty}</span>
            <button data-qty="${idx}" data-d="1" aria-label="Increase">+</button>
          </div>
        </div>
        <button class="line-remove" data-remove="${idx}" aria-label="Remove">${I.trash}</button>
      </div>`;
    },

    paint() {
      const badge = $("#cartCount");
      if (badge) {
        const n = this.count();
        badge.textContent = n;
        badge.classList.toggle("is-on", n > 0);
      }
      const body = $("#drawerBody"), foot = $("#drawerFoot");
      if (!body) return;

      if (!this.items.length) {
        body.innerHTML = `<div class="empty-state">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.4 12.1a1.6 1.6 0 0 0 1.6 1.3h8.5a1.6 1.6 0 0 0 1.6-1.3L21 7H6"/></svg>
          <p>Your cart is empty.</p>
          <a href="order.html" class="btn btn-ghost btn-sm">Browse the VAMPIR line</a>
        </div>`;
        foot.innerHTML = "";
        return;
      }

      body.innerHTML = this.items.map((i, x) => this.lineHTML(i, x)).join("");
      const t = this.totals();
      foot.innerHTML = `
        <div class="totals">
          <div class="total-row"><span>Subtotal</span><span>${money(t.sub)}</span></div>
          <div class="total-row"><span>Shipping${t.hasFirearm ? " (to your FFL)" : ""}</span><span>${money(t.shipping)}</span></div>
          <div class="total-row"><span>Estimated tax</span><span>${money(t.tax)}</span></div>
          <div class="total-row"><span>Card processing <span class="fee">3.5%</span></span><span>${money(t.ccFee)}</span></div>
          <div class="total-row grand"><span>Total</span><span>${money(t.total)}</span></div>
        </div>
        <a href="checkout.html" class="btn btn-primary btn-block">Proceed to Checkout</a>`;

      $$("[data-qty]", body).forEach(b => b.addEventListener("click", () => {
        const idx = +b.dataset.qty;
        this.setQty(idx, this.items[idx].qty + (+b.dataset.d));
      }));
      $$("[data-remove]", body).forEach(b => b.addEventListener("click", () => this.remove(+b.dataset.remove)));
    },

    open() { $("#drawer").classList.add("is-open"); $("#drawerVeil").classList.add("is-open"); },
    close() { $("#drawer").classList.remove("is-open"); $("#drawerVeil").classList.remove("is-open"); }
  };
  window.TCHCart = Cart;
  window.tchMoney = money;

  /* ------------------------------------------------------------ reveal */
  function initReveal() {
    const els = $$("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach(e => e.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const d = parseInt(en.target.dataset.delay || 0, 10);
        setTimeout(() => en.target.classList.add("is-in"), d);
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(e => io.observe(e));
  }

  /* ------------------------------------------------------------ counters */
  function initCounters() {
    const els = $$("[data-count]");
    if (!els.length || !("IntersectionObserver" in window)) {
      els.forEach(e => e.textContent = e.dataset.count);
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target;
        const target = parseFloat(el.dataset.count);
        const dec = (el.dataset.count.split(".")[1] || "").length;
        const dur = 1150;
        let t0 = null;
        const tick = ts => {
          if (!t0) t0 = ts;
          const p = Math.min((ts - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * eased).toFixed(dec);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(e => io.observe(e));
  }

  /* ------------------------------------------------------------ viewer */
  function initViewers() {
    $$("[data-viewer]").forEach(root => {
      const model = root.dataset.viewer;
      const p = TCH.products[model];
      if (!p) return;

      const stage = $(".viewer-stage", root);
      const dots  = $(".viewer-dots", root);
      const hint  = $(".viewer-hint", root);

      stage.innerHTML = p.angles.map((a, i) =>
        `<img src="assets/guns/${model}-${a}.webp" alt="${p.name}, ${p.angleLabels[i]}"
              class="${i === 0 ? "is-active" : ""}" draggable="false">`).join("");
      dots.innerHTML = p.angles.map((a, i) =>
        `<button aria-label="${p.angleLabels[i]}" class="${i === 0 ? "is-active" : ""}"></button>`).join("");

      const imgs = $$("img", stage), btns = $$("button", dots);
      let idx = 0, touched = false;

      const show = n => {
        idx = (n + imgs.length) % imgs.length;
        imgs.forEach((im, i) => im.classList.toggle("is-active", i === idx));
        btns.forEach((b, i) => b.classList.toggle("is-active", i === idx));
        if (!touched) { touched = true; hint && hint.classList.add("is-hidden"); }
      };
      btns.forEach((b, i) => b.addEventListener("click", () => show(i)));

      // drag to step through angles
      let down = false, startX = 0, lastIdx = 0;
      const DRAG_STEP = 42;
      const begin = x => { down = true; startX = x; lastIdx = idx; stage.classList.add("is-dragging"); };
      const move = x => {
        if (!down) return;
        show(lastIdx + Math.round((x - startX) / DRAG_STEP));
      };
      const end = () => { down = false; stage.classList.remove("is-dragging"); };

      stage.addEventListener("mousedown", e => { e.preventDefault(); begin(e.clientX); });
      window.addEventListener("mousemove", e => move(e.clientX));
      window.addEventListener("mouseup", end);
      stage.addEventListener("touchstart", e => begin(e.touches[0].clientX), { passive: true });
      stage.addEventListener("touchmove", e => move(e.touches[0].clientX), { passive: true });
      stage.addEventListener("touchend", end);

      root.tabIndex = 0;
      root.addEventListener("keydown", e => {
        if (e.key === "ArrowRight") { show(idx + 1); e.preventDefault(); }
        if (e.key === "ArrowLeft")  { show(idx - 1); e.preventDefault(); }
      });
    });
  }

  /* ------------------------------------------------------------ lightbox */
  function initLightbox() {
    const box = $("#lightbox");
    if (!box) return;
    const img = $("img", box), cap = $(".lightbox-cap", box);
    let list = [], at = 0;

    const render = () => {
      const it = list[at];
      if (!it) return;
      img.src = it.src;
      img.alt = it.caption;
      cap.textContent = it.caption + "  (" + (at + 1) + " / " + list.length + ")";
    };
    const open = (items, i) => {
      list = items; at = i; render();
      box.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };
    const close = () => { box.classList.remove("is-open"); document.body.style.overflow = ""; };

    $(".lightbox-close", box).addEventListener("click", close);
    $(".prev", box).addEventListener("click", () => { at = (at - 1 + list.length) % list.length; render(); });
    $(".next", box).addEventListener("click", () => { at = (at + 1) % list.length; render(); });
    box.addEventListener("click", e => { if (e.target === box) close(); });
    document.addEventListener("keydown", e => {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") { at = (at + 1) % list.length; render(); }
      if (e.key === "ArrowLeft") { at = (at - 1 + list.length) % list.length; render(); }
    });
    window.tchLightbox = open;
  }

  /* ------------------------------------------------------------ forms */
  function initForms() {
    $$("form[data-validate]").forEach(form => {
      form.addEventListener("submit", e => {
        e.preventDefault();
        let ok = true;
        $$("[required]", form).forEach(f => {
          const wrap = f.closest(".field") || f.closest(".check");
          const good = f.type === "checkbox" ? f.checked : f.value.trim() !== "" &&
            (f.type !== "email" || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value));
          if (wrap) wrap.classList.toggle("field-error", !good);
          if (!good) ok = false;
        });
        if (!ok) { toast("Please complete the highlighted fields"); return; }
        const done = form.dataset.validate;
        if (done === "contact") {
          form.innerHTML = `<div class="empty-state" style="padding:40px 20px">
            <div style="color:var(--ok);margin-bottom:12px">${I.check}</div>
            <h3 style="margin-bottom:9px">Message sent</h3>
            <p style="color:var(--muted)">We will be in touch on the number or email you provided.</p>
          </div>`;
        } else {
          window.location.href = form.dataset.next || "index.html";
        }
      });
      $$("[required]", form).forEach(f => f.addEventListener("input", () => {
        const wrap = f.closest(".field") || f.closest(".check");
        wrap && wrap.classList.remove("field-error");
      }));
    });
  }

  /* ------------------------------------------------------------ add to cart */
  function initAddButtons() {
    document.addEventListener("click", e => {
      const b = e.target.closest("[data-add]");
      if (!b) return;
      e.preventDefault();
      const id = b.dataset.add;
      const sel = b.dataset.variantFrom ? $(b.dataset.variantFrom) : null;
      if (sel && !sel.value) {
        const wrap = sel.closest(".field");
        wrap && wrap.classList.add("field-error");
        toast("Choose a size first");
        return;
      }
      const qtyEl = b.dataset.qtyFrom ? $(b.dataset.qtyFrom) : null;
      Cart.add(id, { variant: sel ? sel.value : "", qty: qtyEl ? +qtyEl.value : 1 });
      Cart.open();
    });
  }

  /* ------------------------------------------------------------ boot */
  document.addEventListener("DOMContentLoaded", function () {
    mountChrome();
    Cart.load();
    Cart.paint();
    initLightbox();
    // page scripts inject their own markup, so they run before anything scans the DOM
    if (typeof window.pageInit === "function") window.pageInit();
    initReveal();
    initCounters();
    initViewers();
    initForms();
    initAddButtons();
  });
})();
