(function () {
  'use strict';

  function findTarget(btn) {
    var sel = btn.getAttribute('data-target');
    if (sel) {
      var el = document.querySelector(sel);
      if (el) return el;
    }
    var field = btn.closest('.field');
    if (field) {
      var ta = field.querySelector('textarea, input[type="text"]');
      if (ta) return ta;
    }
    return null;
  }

  function getRecognizer() {
    var Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Ctor) return null;
    var r = new Ctor();
    r.continuous = true;
    r.interimResults = true;
    r.lang = (navigator.language || 'en-US');
    return r;
  }

  function buildStatusEl(btn) {
    var statusEl = btn.parentNode.querySelector('.mic-status');
    if (statusEl) return statusEl;
    statusEl = document.createElement('span');
    statusEl.className = 'mic-status';
    statusEl.innerHTML = '<span class="mic-dot"></span><span class="mic-text">Listening… tap mic to stop</span>';
    btn.insertAdjacentElement('afterend', statusEl);
    return statusEl;
  }

  function start(btn) {
    var target = findTarget(btn);
    var statusEl = buildStatusEl(btn);
    btn.classList.add('listening');
    statusEl.classList.add('on');
    btn.setAttribute('aria-pressed', 'true');
    btn.querySelector('.mic-label').textContent = 'Stop';

    var rec = getRecognizer();
    btn._rec = rec;

    if (!rec) {
      btn._demoTimer = setInterval(function () {
        if (!target) return;
        var samples = [
          'Working on third-shot drop consistency. ',
          'Reset footwork looks more stable today. ',
          'Add cross-court dink ladder drill next session. ',
          'Good improvement on backhand block volley. '
        ];
        var phrase = samples[Math.floor(Math.random() * samples.length)];
        var sep = target.value && !/\s$/.test(target.value) ? ' ' : '';
        target.value += sep + phrase;
        target.dispatchEvent(new Event('input', { bubbles: true }));
      }, 2200);
      return;
    }

    var baseline = target ? target.value : '';
    rec.onresult = function (e) {
      if (!target) return;
      var finalText = '';
      var interim = '';
      for (var i = 0; i < e.results.length; i++) {
        var r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript;
        else interim += r[0].transcript;
      }
      var joined = baseline;
      if (finalText) {
        if (joined && !/\s$/.test(joined)) joined += ' ';
        joined += finalText;
      }
      if (interim) {
        if (joined && !/\s$/.test(joined)) joined += ' ';
        joined += interim;
      }
      target.value = joined;
      target.dispatchEvent(new Event('input', { bubbles: true }));
    };
    rec.onend = function () { stop(btn, true); };
    rec.onerror = function () { stop(btn, true); };
    try { rec.start(); } catch (err) { stop(btn, true); }
  }

  function stop(btn, fromEvent) {
    btn.classList.remove('listening');
    btn.setAttribute('aria-pressed', 'false');
    var label = btn.querySelector('.mic-label');
    if (label) label.textContent = btn.getAttribute('data-label') || 'Speak';
    var statusEl = btn.parentNode.querySelector('.mic-status');
    if (statusEl) statusEl.classList.remove('on');
    if (btn._demoTimer) { clearInterval(btn._demoTimer); btn._demoTimer = null; }
    if (!fromEvent && btn._rec) { try { btn._rec.stop(); } catch (e) {} }
    btn._rec = null;
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.mic-btn');
    if (!btn) return;
    e.preventDefault();
    if (btn.classList.contains('listening')) stop(btn);
    else start(btn);
  });
})();
