/* =============================================================
   OSSEP — client-side interactivity (vanilla JS)
   ============================================================= */
(function () {
  'use strict';

  /* ----------  Cart model (localStorage line items, shared across pages)  ---------- */
  var CART_KEY = 'ossep_cart';
  var COLOR_IMG = { Bone: 'assets/img/g1.jpg', Eclipse: 'assets/img/m2.jpg', Fog: 'assets/img/prod3.jpg' };

  function getCart() {
    try {
      var c = JSON.parse(localStorage.getItem(CART_KEY));
      return Array.isArray(c) ? c : [];
    } catch (e) { return []; }
  }
  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderBag();
  }
  function cartCount() {
    return getCart().reduce(function (n, i) { return n + (i.qty || 0); }, 0);
  }
  function addItem(item) {
    var cart = getCart();
    var key = function (i) { return i.name + '|' + i.size + '|' + i.color; };
    var found = cart.filter(function (i) { return key(i) === key(item); })[0];
    if (found) { found.qty += item.qty; } else { cart.push(item); }
    saveCart(cart);
  }
  function renderBag() {
    var n = cartCount();
    document.querySelectorAll('[data-bag-count]').forEach(function (el) {
      el.textContent = '(' + n + ')';
    });
  }
  renderBag();

  /* ----------  Toast  ---------- */
  var toast;
  function showToast(msg) {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = '<span class="dot"></span>' + msg;
    // force reflow so re-trigger animates
    void toast.offsetWidth;
    toast.classList.add('toast--show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
      toast.classList.remove('toast--show');
    }, 2600);
  }

  /* ----------  Mobile menu  ---------- */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav__toggle');
  if (toggle && header) {
    toggle.addEventListener('click', function () {
      header.classList.toggle('mobile-open');
      var open = header.classList.contains('mobile-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ----------  Header scroll state (home hero overlay)  ---------- */
  if (header && header.classList.contains('site-header--over-hero')) {
    var onScroll = function () {
      var hero = document.querySelector('.hero');
      var threshold = hero ? hero.offsetHeight - 120 : 400;
      header.classList.toggle('site-header--scrolled', window.scrollY > threshold);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----------  Accordions  ---------- */
  document.querySelectorAll('.acc__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var panel = btn.nextElementSibling;
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      panel.style.maxHeight = expanded ? '0px' : panel.scrollHeight + 'px';
    });
  });

  /* ----------  Option pickers (colorway / size)  ---------- */
  function makePicker(selector) {
    var group = document.querySelectorAll(selector);
    group.forEach(function (btn) {
      btn.addEventListener('click', function () {
        group.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
      });
    });
  }
  makePicker('.swatch');
  makePicker('.size');

  /* ----------  Add to cart  ---------- */
  document.querySelectorAll('[data-add-to-cart]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var sizeEl = document.querySelector('.size[aria-pressed="true"]');
      if (btn.getAttribute('data-require-size') === 'true' && !sizeEl) {
        showToast('Select a size first');
        var sizesEl = document.querySelector('.sizes');
        if (sizesEl) {
          sizesEl.animate(
            [{ transform: 'translateX(-4px)' }, { transform: 'translateX(4px)' }, { transform: 'translateX(0)' }],
            { duration: 220, iterations: 2 }
          );
        }
        return;
      }
      var colorEl = document.querySelector('.swatch[aria-pressed="true"]');
      var color = colorEl ? (colorEl.getAttribute('aria-label') || '') : '';
      var name = btn.getAttribute('data-name') || 'Essential Sock';
      addItem({
        name: name,
        price: parseFloat(btn.getAttribute('data-price') || '24'),
        size: sizeEl ? sizeEl.textContent.trim() : 'OS',
        color: color,
        img: COLOR_IMG[color] || 'assets/img/prod3.jpg',
        qty: 1
      });
      showToast(name + ' added to bag');
    });
  });

  /* ----------  Cart page rendering  ---------- */
  var cartRoot = document.querySelector('[data-cart-root]');
  if (cartRoot) {
    var money = function (n) { return '$' + n.toFixed(2); };
    var renderCart = function () {
      var cart = getCart();
      if (!cart.length) {
        cartRoot.innerHTML =
          '<div class="cart-empty"><p>Your bag is empty.</p>' +
          '<a class="btn" href="collections.html">Shop Collection <span class="btn__plus">+</span></a></div>';
        return;
      }
      var lines = cart.map(function (i, idx) {
        return '<div class="cart-line">' +
            '<span class="cart-line__img"><img src="' + i.img + '" alt="' + i.name + '"></span>' +
            '<div><div class="cart-line__name">' + i.name + '</div>' +
              '<div class="cart-line__meta">' + (i.color ? i.color + ' · ' : '') + 'Size ' + i.size + '</div>' +
              '<div class="qty" data-idx="' + idx + '"><button data-dec aria-label="Decrease">−</button><span>' + i.qty + '</span><button data-inc aria-label="Increase">+</button></div>' +
              '<button class="cart-line__remove" data-remove="' + idx + '">Remove</button>' +
            '</div>' +
            '<div class="cart-line__price">' + money(i.price * i.qty) + '</div>' +
          '</div>';
      }).join('');

      var subtotal = cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
      var shipping = 0;
      var summary =
        '<aside class="summary"><h2>Order summary</h2>' +
          '<div class="summary__row"><span>Subtotal</span><span>' + money(subtotal) + '</span></div>' +
          '<div class="summary__row"><span>Shipping</span><span>Free</span></div>' +
          '<div class="summary__row summary__row--total"><span>Total</span><span>' + money(subtotal + shipping) + '</span></div>' +
          '<button class="btn btn--block" style="margin-top:22px" data-checkout>Checkout <span class="btn__plus">→</span></button>' +
          '<p class="pdp__note" style="margin-top:14px">Free domestic shipping · Free returns, no questions asked</p>' +
        '</aside>';

      cartRoot.innerHTML = '<div class="cart"><div>' + lines + '</div>' + summary + '</div>';
    };

    cartRoot.addEventListener('click', function (e) {
      var t = e.target;
      var cart = getCart();
      if (t.hasAttribute('data-remove')) {
        cart.splice(+t.getAttribute('data-remove'), 1); saveCart(cart); renderCart(); return;
      }
      var qtyBox = t.closest('.qty');
      if (qtyBox) {
        var idx = +qtyBox.getAttribute('data-idx');
        if (t.hasAttribute('data-inc')) cart[idx].qty += 1;
        if (t.hasAttribute('data-dec')) cart[idx].qty = Math.max(1, cart[idx].qty - 1);
        saveCart(cart); renderCart(); return;
      }
      if (t.hasAttribute('data-checkout')) {
        showToast('Checkout is a demo — no payment taken');
      }
    });

    renderCart();
  }

  /* ----------  Account auth forms (demo)  ---------- */
  document.querySelectorAll('[data-auth-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast('Accounts are a demo — nothing was submitted');
    });
  });

  /* ----------  Newsletter (demo)  ---------- */
  document.querySelectorAll('.signup__form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input');
      if (input && input.value.indexOf('@') > 0) {
        showToast('You’re on the list. Welcome to OSSEP.');
        input.value = '';
      } else {
        showToast('Enter a valid email');
      }
    });
  });
})();
