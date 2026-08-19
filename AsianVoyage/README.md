# Asian Voyage — Restaurant POS demo

Single-site point of sale for Cedar Plaza: billing counter, waiter tablets, kitchen
tickets, and a second station for busy nights. Static HTML/CSS/vanilla JS, no build step.

## Running it

```bash
node .claude/serve.js 8177
```

Then open <http://localhost:8177>. A server is needed rather than opening the files
directly, because the browser blocks `file://` pages from loading the shared scripts.

## Screens

| File | Who uses it | What it does |
|---|---|---|
| `index.html` | — | Landing page |
| `counter.html` | Admin / cashier | **Source of truth.** Floor plan, punch orders, fire KOTs, bill and settle, print queue, reports |
| `waiter.html` | Floor staff | PIN sign-in, seat a table, take the order, send to kitchen, close for billing |
| `kitchen.html` | Kitchen | Live tickets with age timers and amendment flags, bump when plated |
| `backoffice.html` | Station 2 | Same software, second station. Prints handed-over bills, takes extra orders on busy nights |

Open several in separate windows — they share data, so an order punched on the tablet
appears at the counter immediately.

## The two stations

Both stations run the same application (`assets/pos-app.js`) mounted against different
stores, so they look and behave identically. What differs is the books they keep.

**Main counter** holds every bill, including the ones handed over to print. It is what
reports, the day summary and the audited figures come from.

**Back office** holds bills handed over from the counter, plus anything taken there on
a chaotic night.

Bills are plain serials — `001, 002, 003` — and **each station counts its own**. A
handed-over bill therefore has two numbers, linked in both directions:

```
Counter bill 045  ──sentToCode──▶  Back office bill 001
Counter bill 045  ◀──sourceCode──  Back office bill 001
```

The back office shows that chain on every received bill, along with the full order
history — items, both KOT batches with times and who fired them, covers, server,
settlement and payment — so it can answer a guest's question without ringing the counter.
The printed bill carries a `Counter ref` line for the same reason.

### Print now vs ready to print

When a bill settles, the counter offers two choices:

- **Print now** — prints here and hands the paper to the guest.
- **Ready to print** — hands it to the back office, which prints on its own printer.

**Both paths record the bill identically.** A handed-over bill is settled, counted in
every report, and included in the day summary exactly like one printed at the counter.
The only thing deferred is which printer the paper comes out of. The Reports day summary
shows the split (`n printed here · n printed by the back office — all counted above`)
so the two numbers can always be reconciled.

### Orders raised at the back office

Orders taken at station 2 are copied into main automatically, so the audited books stay
complete. Bills handed over from main are skipped, so nothing is duplicated.

That behaviour is a flag — `window.SYNC_BACKOFFICE_ORDERS_TO_MAIN` in `assets/pos-store.js`,
default `true`. Turn it off only if the second station is genuinely a separate branch
keeping its own books.

## Demo script (about three minutes)

1. **Waiter tablet** — sign in as Kwame (PIN `2222`). Tap a free table, set covers.
2. Punch a few items. Note the `NOT SENT` badge on each line.
3. **Send to kitchen.** The lines flip to `KOT 1`.
4. Add a round of drinks and send again — it fires as **KOT 2**, and the kitchen display
   flags it `ADDITION` rather than reprinting the whole order.
5. **Kitchen display** — age timers turn amber at 12 minutes and red at 20. Bump one.
6. Back on the tablet, **Close — ready for billing**.
7. **Billing counter** — the table is green on the floor plan. Open it, add a tip, take
   part cash and part card, then choose **Ready to print**.
8. **Back office** — the bill is waiting with its full history. Hit History, then Print.
9. **Counter → Reports** — the handed-over bill is in the totals, and the day summary
   shows the printed-here / printed-elsewhere split.

Reset from the landing page at any time.

### Manager-gated actions

PIN `1234` (Ravi Persaud, manager). Required for: voiding an item the kitchen already
has, comping an item, applying a discount, voiding a bill, and reopening a settled bill.

Other PINs: Anisha `1111` (cashier), Kwame `2222`, Leah `3333`, Terrence `4444` (waiters).

## Order lifecycle

**Placed** → **Under preparation** (KOT fired) → **Ready for billing** (waiter closed it)
→ **Settled**. Counter orders follow the same path but carry no service charge.

Two details worth pointing out in a demo:

- **KOT batching.** Each line carries the batch it fired in, so a second round prints as
  an amendment and the kitchen never re-cooks the starters.
- **Void is two different acts.** Before the kitchen has the ticket, a mistyped line just
  disappears. After, it needs a manager PIN, stays on the bill struck through, and prints
  a cancellation ticket so the pass stops work.

## Money

Menu prices are EC$ and **ABST-inclusive**, exactly as printed on the client's menu, so
the bill shows tax as a memo line rather than adding it. The 10% service charge is added
on top for dine-in only. Tips sit on top of the service charge.

**Confirm the ABST rate before go-live.** `AV_CONFIG.abstRate` in `assets/menu-data.js`
is set to 15 and drives every tax figure on the bill and in reports.

## Files

```
assets/
  menu-data.js   162 items transcribed from the client's Menu.pdf, plus config
  pos-store.js   store factory; POS (main) and BO (back office) instances, money, reports
  pos-app.js     the application, mounted against a store by counter.html / backoffice.html
  pos-ui.js      shared modal / toast / print / PIN pad
  pos.css        POS layout — counter, tablet, kitchen, reports dashboard
  styles.css     brand tokens and base styles
  av-icons.js    inline SVG icons — no emoji anywhere
```

## Going live

`assets/pos-store.js` is the only file that touches storage and everything is already
async. The DRIVER functions at the bottom of the factory (read / write / broadcast /
subscribe) are the swap point. In production the two stores become two databases and the
handover becomes an API call between them; no screen code changes.

Until then, the stations sync via `BroadcastChannel` across tabs on one machine, with a
`storage` event fallback.

## Known gaps for a production build

Scoped out deliberately — worth pricing separately:

- **Real printer integration.** Print layouts are sized for an 80 mm roll and print
  through the browser. Driving network or USB thermal printers — and routing the back
  office to a *different* printer — needs a local print bridge.
- **Offline resilience.** A till that stops when the internet drops is unusable; needs a
  local-first store with sync on reconnect.
- **Payment processing.** Card payment is recorded, not processed. Antigua is outside
  Stripe's coverage, so this needs a local acquirer.
- **Split bill by item.** Split *payment* across methods works; splitting one table into
  separate bills does not.
- **Course firing.** Every line carries a `course` field, but nothing drives it yet.
- **Cash reconciliation.** Shift open/close, float, drops and drawer variance were
  removed at the client's request. If they later want end-of-day cash counting, that is
  a small addition on top of the existing day summary.
