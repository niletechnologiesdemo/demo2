// VEYE — onboarding auth: password visibility toggle + remember-me persistence
document.addEventListener('click', function (e) {
  var btn = e.target.closest('.field__eye');
  if (!btn) return;
  var field = btn.closest('.field');
  var input = field && field.querySelector('input');
  if (!input) return;
  var reveal = input.type === 'password';
  input.type = reveal ? 'text' : 'password';
  btn.classList.toggle('is-on', reveal);
  btn.setAttribute('aria-label', reveal ? 'Hide password' : 'Show password');
});

(function () {
  function nameFromEmail(email) {
    return email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  // Login: prefill the remembered email, if any.
  var loginForm = document.querySelector('.auth__form[data-auth="login"]');
  if (loginForm) {
    try {
      var saved = JSON.parse(localStorage.getItem('veye_user') || 'null');
      var emailInput = loginForm.querySelector('input[name="email"]');
      if (saved && saved.email && emailInput) emailInput.value = saved.email;
    } catch (e) {}
  }

  // Signup: pre-fill the address typed at the onboarding result gate. Prototype
  // only — the value is read once from sessionStorage and the key is cleared, so
  // it never persists beyond the visit and nothing is transmitted.
  var signupForm = document.querySelector('.auth__form[data-auth="signup"]');
  if (signupForm) {
    try {
      var prefill = sessionStorage.getItem('veye_prefill_email');
      if (prefill) {
        var signupEmail = signupForm.querySelector('input[name="email"]');
        if (signupEmail && !signupEmail.value) signupEmail.value = prefill;
        sessionStorage.removeItem('veye_prefill_email');
      }
    } catch (e) {}
  }

  /** Storage-aware navigation, so the file:// fallback keeps carrying the
   *  onboarding state. Falls back to a plain assignment if the engine is absent. */
  function go(href) {
    var CALC = window.VeyeCalculations;
    if (CALC && CALC.storage && typeof CALC.storage.navigate === 'function') CALC.storage.navigate(href);
    else window.location.href = href;
  }

  // Login + signup submit.
  //
  // Both forms carry action="dashboard.html" method="get" as a no-JS fallback,
  // but a GET submit puts every field — including `password` and
  // `confirmPassword` — into the dashboard's URL. There is no backend and the
  // dashboard reads no query parameters at all, so the submit is intercepted
  // here and turned into a plain navigation.
  //
  // The password fields are never read, never stored and never travel anywhere.
  // Only identity metadata is kept, and only when Remember me is ticked.
  document.querySelectorAll('.auth__form[data-auth]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var isSignup = form.getAttribute('data-auth') === 'signup';
      var value = function (name) {
        var input = form.querySelector('[name="' + name + '"]');
        return input ? input.value.trim() : '';
      };

      var email = value('email');
      var rememberInput = form.querySelector('input[name="remember"]');
      var remember = !rememberInput || rememberInput.checked;

      try {
        if (email && remember) {
          var first = isSignup ? value('firstName') : '';
          var last = isSignup ? value('lastName') : '';
          var full = (first + ' ' + last).trim();
          var record = { email: email, name: full || nameFromEmail(email),
                         signedInAt: new Date().toISOString() };
          if (first) record.firstName = first;
          if (last) record.lastName = last;
          localStorage.setItem('veye_user', JSON.stringify(record));
        } else if (rememberInput && !rememberInput.checked) {
          localStorage.removeItem('veye_user');
        }
      } catch (err) {}

      go('dashboard.html');
    });
  });
})();
