# Asian Voyage — ordering, loyalty & POS demo

A clickable prototype covering all three proposed tiers. Static HTML/CSS/vanilla JS,
no build step. Open `index.html` to start.

## Screens

| File | Tier | What it is |
|---|---|---|
| `index.html` | — | Pitch hub: the three tiers, and links into every screen |
| `menu.html` | 1 | Customer QR menu. Reads `?b=<branch>&t=<table>` from the table code |
| `admin.html` | 1 + 3 | Live orders, POS bill builder, kitchen tickets, customers, menu availability, loyalty settings |
| `app.html` | 2 | Customer app in a phone frame — wallet, loyalty, pickup/dine-in |
| `qr.html` | 1 | Printable per-table QR tents for both branches |

## Demo script (about two minutes)

1. Open `menu.html?b=cedar&t=12` — the menu already knows the branch and table.
2. Add a dish, tap **Continue**, enter a name and the mobile **268 723 1188**.
   That guest has points, so the redemption dropdown appears.
3. Place the order.
4. Open `admin.html` in a second tab — the order is already on the board, with the
   guest's points balance and visit count beside their name.
5. Move it through the kitchen, print a ticket, add a tip, take payment.
   Points post on settlement, never before.

Reset everything from the link in the console sidebar, or on the hub.

## Data

`assets/menu-data.js` holds all **162 items** transcribed from the client's `Menu.pdf`
— 22 categories across Starters, Main Course, Sushi & Sashimi and Drinks. Prices are
EC$ and ABST-inclusive as printed; the 10% service charge is added at billing time and
is excluded from dine-in points. Pickup orders carry no service charge.

Items carry `veg` / `spicy` flags, and a `variants` list wherever the kitchen needs a
choice — soup protein, curry colour, wing sauce, Pad Thai protein.

### Open questions flagged for the client

- **Branch two is a placeholder.** Cedar Plaza is real; the second branch name, area
  and phone in `AV_CONFIG.branches` need confirming.
- **Soups** share one price grid on the printed menu (Vegetable $24 / Chicken $26 /
  Shrimp $32), so all four soups are modelled with those three options. Worth checking
  that reading — Wonton Soup is described as a chicken broth.
- **Sparkling water** is listed at EC$18 against EC$8 for still. Possibly a typo.
- **"Vegetable Tempura Roll"** appears twice with different descriptions; the second is
  shown here as "Yasai Tempura Roll".
- **No dish photography** exists, so the menu is designed to read well without it.

## Loyalty rules

Defaults, all editable live from **Admin → Settings**:

- Earn 1 point per EC$1 of item subtotal — service charge and tip excluded
- 100 points = EC$10.00, redeemed in blocks of 100, minimum balance 100
- Points post when the order completes, and are idempotent (settling twice cannot double-post)
- Redeemed value does not itself earn points
- Redemption is capped by both the balance and the bill, so a total can never go negative
- 12-month expiry
- Tier multipliers (Bronze/Silver/Gold) exist but ship switched **off**

## Going live

`assets/store.js` is the only file that touches storage. Everything is async and
returns promises already. The four DRIVER functions at the bottom — read, write,
broadcast, subscribe — are the swap point for Supabase or Firebase:

```
read/write  ->  supabase.from('orders').select() / .upsert()
broadcast   ->  handled server-side by Postgres replication
subscribe   ->  supabase.channel('orders').on('postgres_changes', ...)
```

No screen code changes. Until then, orders sync between tabs on one machine via
`BroadcastChannel`, with a `storage` event fallback.

## QR codes

`assets/qr-codes.js` holds 33 pre-generated matrices (18 Cedar Plaza tables, 12 Jolly
Harbour, 2 pickup counters, 1 app card). Every one was generated with CoreImage and
verified by decoding it back through Apple's Vision framework — 33/33 round-tripped.

They encode `https://asianvoyage.ag/m?b=<branch>&t=<table>`. To repoint at the real
production domain, regenerate them rather than editing by hand — an encoder that
produces a subtly malformed symbol still *looks* like a QR code.

## Notes

- Prata (headings) is the same face as the printed menu; the cream and terracotta
  palette is sampled from it directly. Inter is used for UI text.
- No emoji anywhere — icons are inline SVG in `assets/av-icons.js`.
- Kitchen tickets and receipts have print stylesheets sized for an 80 mm thermal roll;
  the QR sheet prints 3-up on A4.
- Payment is simulated. There is no gateway integration — Antigua is outside Stripe's
  coverage, so a live build needs a local acquirer.
