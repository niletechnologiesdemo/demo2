# TCH Arms — Website Demo

A working front-end demo of a redesigned tch-arms.com, built to present to the client.
Static HTML, CSS and vanilla JavaScript. No build step, no dependencies, no server required
beyond a plain static host.

## Running it

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 dev-server.py 8731
```

Then visit <http://localhost:8731>. The dev server sends `no-store` so edits show up on reload.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home. Hero, both models, brand story, multi-angle viewer, FFL steps, gallery teaser |
| `rs9.html` | RS9 Vampir specifications |
| `rs9x.html` | RS9 X Vampir specifications |
| `gallery.html` | Photo gallery, product video, reviewer cards |
| `accessories.html` | Tee shirt, 18 and 10 round magazines, dovetail mount |
| `product.html?id=` | Product detail. Accepts `tee`, `mag18`, `mag10`, `mount` |
| `order.html` | Order page for both pistols plus the mount, with the five-step process |
| `cart.html` | Full cart page |
| `checkout.html` | Four-step checkout including FFL dealer capture |
| `contact.html` | Contact form, hours, direct details |
| `about.html` | Company and manufacturer background |
| `admin.html` | Media Manager for photos, video and reviewers |

`rs9.html` and `rs9x.html` share `js/spec-page.js`, driven by `<body data-model>`.

## How it is wired

- **`js/tch-data.js`** holds everything editable: products, prices, stock, the full specification
  tables, FFL and legal copy, gallery manifest, video and reviewer entries, and the tax, shipping
  and card-fee rates. Change a price or a spec here and every page follows.
- **`js/tch.js`** injects the nav, footer, cart drawer, lightbox and toasts into all pages, so the
  chrome never drifts between them. It also runs the cart, the multi-angle viewer, scroll reveals
  and form validation.
- Pages that need their own logic define a global `pageInit()`, which runs before the DOM scanners
  so injected markup still gets picked up by the reveal and counter observers.

## Checkout maths

Set in `TCH.rates`:

- Sales tax `8.988%` (O'Fallon, MO combined rate)
- Shipping `$45.00` when the order contains a firearm, otherwise `$9.50`
- Card processing `3.5%`, applied to subtotal plus shipping plus tax

Worked example, one RS9 and two 10-round magazines:
subtotal `$1,349.00`, shipping `$45.00`, tax `$121.25`, card fee `$53.03`, total `$1,568.28`.

The payment step hands off to the client's existing card processor rather than taking card details
on the site. The FFL dealer's name, phone and address are captured before that handoff.

## Theme

Light throughout. The page plane is `#F4F7FA`, cards and chart surfaces are white, and depth comes
from layered shadow rather than borders. Product figures sit on a soft cool wash with a grounded
drop shadow, which is what makes the black pistols read as the darkest thing on the page.

| Role | Value | Note |
| --- | --- | --- |
| Page | `#F4F7FA` | |
| Card / panel | `#FFFFFF` | |
| Figure wash | `#FFFFFF` to `#E7EFF8` | where the pistols sit |
| Brand blue | `#0096FC` | fills, marks, focus rings, underlines. Never text |
| Blue ink | `#0A6FBF` | links and labels, 5.2:1 on white |
| Heading ink | `#131820` | |
| Body text | `#2E3846` | |
| VAMPIR red | `#F60000` | wordmark and display type only |
| Compliance amber | rule `#E0A526`, text `#8A6410` | ATF and FFL notices |

The vivid brand blue is only 3.1:1 on white, so it is reserved for fills while `--blue-ink` carries
text. Every page was audited: all body text meets 4.5:1 and all large text 3:1 against its actual
composited background.

Two logo files ship. `tch-logo-light.webp` (blue shield, dark wordmark) is what the site uses.
`tch-logo.webp` is a white-wordmark variant, unused by the site but kept for dark collateral.

## Assets

`assets/` is generated from the client's supplied files, reduced from roughly 250 MB of source to
about 2 MB of WebP.

- The pistol PNGs arrived with an alpha channel over a green chroma matte. The pipeline despills
  the green fringe, trims to the alpha bounding box, then places all six angles of a model on one
  shared 1500x1000 canvas at a single scale, so the viewer never jumps and relative size between
  the RS9 and RS9 X stays truthful.
- The supplied logo is used close to as-delivered on the light theme: the shield keeps its blue and
  the black wordmark is deepened slightly to `#131820` so it reads as ink rather than pure black.
- Gallery images keep their natural aspect ratio everywhere they appear. Nothing is cropped.

## Placeholders needing client input

1. **Video files.** The client holds the masters on WeTransfer. `TCH.videos[].src` is empty and the
   cards carry poster frames. Drop the files in and set `src`.
2. **Reviewer cards.** The three entries in `TCH.influencers` are layout samples, flagged as such
   on the page. They are not real endorsements and must be replaced before launch.
3. **Accessory photography.** The tee, magazines and mount are cropped from the client's own
   screenshots and are low resolution. They need proper product shots.
4. **Gallery image 7** was missing from the supplied set.
5. **RS9 X specification sheet.** The client said "same for X model", so the RS9 table was cloned
   with barrel-derived figures adjusted (length, sight radius, muzzle velocity, weight). These need
   confirming against the real figures.
6. **Tax rate** is set to O'Fallon, MO. Confirm how the client charges tax out of state.

## Media Manager

`admin.html` demonstrates the upload and delete workflow the client asked for. Drag photographs in
or browse for them, add video and reviewer entries, delete anything, reset to the supplied set.
State is held in the browser for the demo. On the live site the same screen writes to the server.

## Browser support

Modern evergreen browsers. Uses CSS grid, custom properties, `IntersectionObserver` and WebP.
Honours `prefers-reduced-motion`, which turns off every animation and reveal.
