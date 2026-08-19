/* ==========================================================================
   Shared UI plumbing for the POS screens — modal, toast, print, and the small
   formatters the counter, waiter tablet and kitchen display all need.
   Expects #scrim, #modal (+ #mTitle/#mBody/#mFoot, #mClose) and #toasts.
   ========================================================================== */
(function () {
  const $ = s => document.querySelector(s);

  const UI = {
    esc(s) {
      return String(s == null ? '' : s)
        .replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    },

    ago(ts) {
      const m = Math.round((Date.now() - new Date(ts)) / 60000);
      if (m < 1) return 'just now';
      if (m < 60) return m + 'm';
      return Math.floor(m / 60) + 'h ' + (m % 60) + 'm';
    },

    STATUS: {
      placed:    { label: 'Placed',      chip: 'gold'  },
      preparing: { label: 'Preparing',   chip: 'clay'  },
      ready:     { label: 'Ready to bill', chip: 'green' },
      settled:   { label: 'Settled',     chip: 'gray'  },
      void:      { label: 'Void',        chip: 'red'   },
      free:      { label: 'Free',        chip: 'gray'  }
    },
    statusChip(s) {
      const x = UI.STATUS[s] || { label: s, chip: 'gray' };
      return `<span class="chip ${x.chip}">${x.label}</span>`;
    },

    /* ------------------------------ modal ------------------------------- */
    modal(title, body, foot) {
      $('#mTitle').textContent = title;
      $('#mBody').innerHTML = body;
      UI.setFoot(foot);
      $('#modal').classList.add('open');
      $('#scrim').classList.add('open');
    },

    /* Always set the footer through this. Writing to #mFoot.innerHTML directly
       leaves display:none in place when the modal was opened without a footer,
       which silently hides the button that was just added. */
    setFoot(html) {
      const f = $('#mFoot');
      f.innerHTML = html || '';
      f.style.display = html ? '' : 'none';
    },
    close() {
      $('#modal').classList.remove('open');
      $('#modal').classList.remove('printing');
      $('#scrim').classList.remove('open');
    },

    /* Prints just the open modal — the print stylesheet hides everything else. */
    print() {
      $('#modal').classList.add('printing');
      window.print();
      setTimeout(() => $('#modal').classList.remove('printing'), 400);
    },

    /* ------------------------------ toast ------------------------------- */
    toast(msg, kind) {
      const el = document.createElement('div');
      el.className = 'toast' + (kind ? ' ' + kind : '');
      el.innerHTML = (kind === 'good' ? icon('check', 15) : icon('info', 15)) +
        '<span>' + UI.esc(msg) + '</span>';
      $('#toasts').appendChild(el);
      setTimeout(() => el.remove(), 2800);
    },

    /* A numeric PIN pad — waiters log in on a tablet with no keyboard. */
    pinPad(target, onComplete, length) {
      const len = length || 4;
      let val = '';
      const dots = () => target.querySelector('.pindots').innerHTML =
        Array.from({ length: len }, (_, i) => `<i class="${i < val.length ? 'on' : ''}"></i>`).join('');
      target.innerHTML = `<div class="pindots"></div>
        <div class="pinpad">
          ${[1,2,3,4,5,6,7,8,9].map(n => `<button data-k="${n}">${n}</button>`).join('')}
          <button data-k="clear" style="font-size:13px;font-family:var(--body)">Clear</button>
          <button data-k="0">0</button>
          <button data-k="del" style="font-size:13px;font-family:var(--body)">←</button>
        </div>`;
      dots();
      target.querySelector('.pinpad').onclick = e => {
        const b = e.target.closest('[data-k]'); if (!b) return;
        const k = b.dataset.k;
        if (k === 'clear') val = '';
        else if (k === 'del') val = val.slice(0, -1);
        else if (val.length < len) val += k;
        dots();
        if (val.length === len) setTimeout(() => { const v = val; val = ''; dots(); onComplete(v); }, 120);
      };
    },

    init() {
      const close = $('#mClose');
      if (close) { close.innerHTML = icon('x', 18); close.onclick = UI.close; }
      const scrim = $('#scrim');
      if (scrim) scrim.onclick = UI.close;
      document.addEventListener('keydown', e => { if (e.key === 'Escape') UI.close(); });
    }
  };

  window.UI = UI;
})();
