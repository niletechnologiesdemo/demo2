// VEYE — shared site chrome (announcement bar + nav + footer) for inner pages.
// Inner pages include an empty <div id="site-nav"></div> and <div id="site-footer"></div>
// and set <body data-page="pricing|help|about|why|how"> for the active nav state.
(function () {
  var page = document.body.getAttribute('data-page') || '';
  function active(p) { return p === page ? ' class="is-active"' : ''; }

  var nav =
  '<div class="announce"><div class="announce__track">' +
    Array(6).join('x').split('x').map(function(){return '<span class="announce__item">Notifications, Offers, Announcements, VIP Specials</span>';}).join('') +
  '</div></div>' +
  '<header class="nav"><div class="container nav__inner">' +
    '<a class="nav__logo" href="index.html" aria-label="Veye home"><img src="assets/web/wp/veye-id.svg" alt="Veye"></a>' +
    '<ul class="nav__links" id="navLinks">' +
      '<li><a' + active('how') + ' href="index.html#how-it-works">How it works</a></li>' +
      '<li><a' + active('why') + ' href="why-veye.html">Why Veye</a></li>' +
      '<li><a' + active('pricing') + ' href="pricing.html">Pricing</a></li>' +
      '<li><a' + active('help') + ' href="help.html">Help</a></li>' +
      '<li><a' + active('about') + ' href="about.html">About</a></li>' +
    '</ul>' +
    '<div class="nav__right">' +
      '<a class="nav__user" href="login.html" aria-label="Sign in"><img src="assets/web/svg/user.svg" alt=""></a>' +
      '<a class="nav__cta" href="onboarding.html"><span>Get Started</span><span class="nav__cta-box"></span></a>' +
      '<button class="nav__burger" id="navBurger" aria-label="Menu"><span></span><span></span><span></span></button>' +
    '</div>' +
  '</div></header>';

  var footer =
  '<footer class="footer"><div class="container">' +
    '<div class="footer__top">' +
      '<div class="footer__brand"><img class="footer__logo" src="assets/web/svg/veye-logo-footer.svg" alt="Veye"></div>' +
      '<div class="footer__col"><ul>' +
        '<li><a href="index.html#how-it-works">How it works</a></li><li><a href="pricing.html">Pricing</a></li>' +
        '<li><a href="why-veye.html">Why Veye</a></li><li><a href="why-veye.html">Treatments</a></li><li><a href="about.html">Gift Cards</a></li>' +
      '</ul></div>' +
      '<div class="footer__col"><ul>' +
        '<li><a href="about.html">About</a></li><li><a href="help.html">Resources</a></li><li><a href="about.html">Partnerships</a></li>' +
        '<li><a href="about.html">Affiliates</a></li><li><a href="about.html">Corporate</a></li>' +
      '</ul></div>' +
      '<div class="footer__col"><ul>' +
        '<li><a href="https://www.linkedin.com" target="_blank" rel="noopener">LinkedIn</a></li><li><a href="https://www.facebook.com" target="_blank" rel="noopener">Facebook</a></li><li><a href="https://www.instagram.com" target="_blank" rel="noopener">Instagram</a></li>' +
      '</ul></div>' +
      '<div class="footer__connect">' +
        '<p>Stay connected with health tips, specials and the latest,<br>100% natural treatments from Veye.</p>' +
        '<a class="footer__signup" href="signup.html">Sign up <span class="nav__cta-box"></span></a>' +
        '<p class="footer__fine">By clicking &ldquo;Sign up,&rdquo; you acknowledge that you have read, understood, and accepted the Privacy Policy (including sensitive data processing) and Terms of Use.</p>' +
        '<div class="footer__stores">' +
          '<a href="#"><img src="assets/web/svg/badge-appstore.svg" alt="Download on the App Store"></a>' +
          '<a href="#"><img src="assets/web/svg/badge-playstore.svg" alt="Get it on Google Play"></a>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<hr class="footer__divider">' +
    '<p class="footer__copy">&copy;2024 Veye LLC. All rights reserved. <a href="terms.html">Terms</a>. <a href="terms.html">Privacy</a>.<br>This website is for informational purpose and should not be used as medical advice.</p>' +
  '</div></footer>';

  var navHost = document.getElementById('site-nav');
  var footHost = document.getElementById('site-footer');
  if (navHost) navHost.innerHTML = nav;
  if (footHost) footHost.innerHTML = footer;

  // Mobile menu
  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function () { links.classList.toggle('open'); });
    links.addEventListener('click', function (e) { if (e.target.tagName === 'A') links.classList.remove('open'); });
  }
  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href'); if (id.length < 2) return;
      var t = document.querySelector(id); if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
    });
  });
})();
