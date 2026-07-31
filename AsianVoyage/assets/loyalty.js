/* ==========================================================================
   Asian Voyage — loyalty engine
   --------------------------------------------------------------------------
   Default rules (all editable live from Admin → Settings):
     · Earn   1 point per EC$1 of item subtotal — service charge and tip excluded
     · Redeem 100 points = EC$10.00, in blocks of 100, minimum balance 100
     · Points post when the order COMPLETES, never when it is placed
     · Points expire 12 months after they are earned
     · Points do not stack with other discounts
   Tier multipliers exist but ship switched off, so the flat rate is the default.
   ========================================================================== */
(function () {
  const S = () => window.AV.settings.getSync().loyalty;

  const Loyalty = {

    /* ------------------------------ tiers ------------------------------- */
    tierFor(customer) {
      const s = S();
      const base = s.tiers[0];
      if (!s.tiersEnabled || !customer) return base;
      const lt = customer.lifetimePoints || 0;
      return s.tiers.slice().reverse().find(t => lt >= t.from) || base;
    },

    nextTier(customer) {
      const s = S();
      if (!s.tiersEnabled || !customer) return null;
      const lt = customer.lifetimePoints || 0;
      return s.tiers.find(t => lt < t.from) || null;
    },

    tierProgress(customer) {
      const nxt = this.nextTier(customer);
      if (!nxt) return { pct: 100, need: 0, next: null };
      const cur = this.tierFor(customer);
      const lt = customer.lifetimePoints || 0;
      const span = nxt.from - cur.from;
      return {
        pct: Math.min(100, Math.round(((lt - cur.from) / span) * 100)),
        need: nxt.from - lt,
        next: nxt
      };
    },

    /* ------------------------------ earning ----------------------------- */
    /* Points are earned on the item subtotal only. Charging guests points on
       the service charge would inflate the liability without adding sales. */
    earnedFor(order, customer) {
      const s = S();
      if (!s.enabled) return 0;
      const t = window.AV.totals(order);
      const mult = s.tiersEnabled ? this.tierFor(customer).mult : 1;
      const base = Math.max(0, t.subtotal - t.discount);   // redeemed value does not re-earn
      return Math.floor(base * s.earnPerDollar * mult);
    },

    /* ----------------------------- redeeming ---------------------------- */
    redeemValue(points) { return window.AV.round2((points || 0) * S().pointValue); },

    /* Largest block a guest may actually spend on this bill. Capped by their
       balance, by the bill itself (no negative totals), and by the block size. */
    maxRedeemable(customer, order) {
      const s = S();
      if (!s.enabled || !customer) return 0;
      const bal = customer.points || 0;
      if (bal < s.minRedeem) return 0;
      const t = window.AV.totals(Object.assign({}, order, { pointsRedeemed: 0 }));
      const ceilingByBill = Math.floor((t.subtotal / s.pointValue));
      const usable = Math.min(bal, ceilingByBill);
      return Math.floor(usable / s.redeemBlock) * s.redeemBlock;
    },

    redeemOptions(customer, order) {
      const s = S();
      const max = this.maxRedeemable(customer, order);
      const out = [];
      for (let p = s.redeemBlock; p <= max; p += s.redeemBlock) out.push({ points: p, value: this.redeemValue(p) });
      return out;
    },

    canRedeem(customer) {
      const s = S();
      return !!(s.enabled && customer && (customer.points || 0) >= s.minRedeem);
    },

    /* ----------------------------- expiry ------------------------------- */
    expiringSoon(customer, withinDays) {
      const s = S();
      if (!customer || !customer.ledger) return { points: 0, on: null };
      const cutoff = Date.now() - (s.expiryMonths * 30.44 * 86400000) + ((withinDays || 60) * 86400000);
      let pts = 0, oldest = null;
      customer.ledger.filter(l => l.points > 0).forEach(l => {
        const ts = new Date(l.ts).getTime();
        if (ts <= cutoff) { pts += l.points; if (!oldest || ts < oldest) oldest = ts; }
      });
      const capped = Math.min(pts, customer.points || 0);
      return {
        points: capped,
        on: oldest ? new Date(oldest + s.expiryMonths * 30.44 * 86400000) : null
      };
    },

    /* --------------------------- posting points -------------------------- */
    /* Called when an order completes. Idempotent: the order carries a
       `pointsAwarded` flag so double-tapping "Mark paid" cannot double-post. */
    async settle(order) {
      const s = S();
      if (!s.enabled) return { earned: 0, skipped: 'loyalty-off' };
      if (order.pointsAwarded) return { earned: 0, skipped: 'already-awarded' };
      const phone = order.customer && window.AV.normPhone(order.customer.phone);
      if (!phone) return { earned: 0, skipped: 'no-phone' };

      const customer = await window.AV.customers.get(phone);
      if (!customer) return { earned: 0, skipped: 'no-customer' };

      const label = `${order.mode === 'pickup' ? 'Pickup' : 'Dine-in'} · ${branchName(order.branch)}`;

      if (order.pointsRedeemed > 0) {
        await window.AV.customers.adjust(phone, -order.pointsRedeemed, {
          type: 'redeem', orderCode: order.code,
          note: `${window.AV.money(this.redeemValue(order.pointsRedeemed))} off`
        });
      }

      const earned = this.earnedFor(order, customer);
      if (earned > 0) {
        await window.AV.customers.adjust(phone, earned, { type: 'earn', orderCode: order.code, note: label });
      }
      const fresh = await window.AV.customers.get(phone);
      await window.AV.customers.upsert(phone, { visits: (fresh.visits || 0) + 1, lastSeen: new Date().toISOString() });
      await window.AV.orders.update(order.id, { pointsAwarded: true, pointsEarned: earned });
      return { earned, balance: (fresh.points || 0) };
    },

    /* ------------------------- copy for the UI --------------------------- */
    rules() {
      const s = S();
      const money = window.AV.money;
      return [
        { icon: 'star',    title: 'Earn as you eat',
          body: `${s.earnPerDollar} point for every ${money(1)} spent on food and drink. The service charge and any tip are excluded.` },
        { icon: 'gift',    title: 'Redeem in blocks',
          body: `${s.redeemBlock} points = ${money(s.redeemBlock * s.pointValue)} off your bill. You can start redeeming at ${s.minRedeem} points.` },
        { icon: 'check',   title: 'Points land when you pay',
          body: 'Points are added once your order is completed and settled, so cancelled orders never award points.' },
        { icon: 'clock',   title: `Valid for ${s.expiryMonths} months`,
          body: `Each point expires ${s.expiryMonths} months after it is earned. Your oldest points are always spent first.` }
      ];
    },

    summaryLine() {
      const s = S();
      return `${s.earnPerDollar} pt per ${window.AV.money(1)} · ${s.redeemBlock} pts = ${window.AV.money(s.redeemBlock * s.pointValue)}`;
    }
  };

  function branchName(id) {
    const b = (window.AV_CONFIG.branches || []).find(b => b.id === id);
    return b ? b.name : id;
  }

  window.Loyalty = Loyalty;
})();
