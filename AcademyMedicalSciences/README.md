# Academy of Medical Science — design mock-up

Free mock-up for Suresh (Academy of Medical Science, Brampton ON), prepared for the
follow-up meeting after the 18 August 2026 call.

Open **`index.html`** — it is the launcher with live previews of all three surfaces.

| File | Surface | What it shows |
|---|---|---|
| `index.html` | Launcher | Live iframe previews, what is real vs sample data |
| `web.html` | Student web app | Public site, catalogue, enrolment + payment, student portal, content player, scheduling, certificates |
| `app.html` | Mobile app | 14 interactive iOS/Android screens + filmstrip of all of them |
| `admin.html` | Admin console | Revenue reporting, content manager, students, payments, sessions, instructors, settings |

## Demo path for the call

1. `index.html` → open the **web app**
2. Browse programs → open **Micro-Credential Phlebotomy** → **Enrol now** → 3-step checkout
3. Land in the portal → **Continue learning** → the order-of-draw PDF and the quiz
4. **Practical Schedule** → book a Saturday session
5. Back to `index.html` → **mobile app** (offline downloads, push notifications)
6. → **admin console** (Course Content tab shows how Suresh uploads video/PDF/lectures)

## What is the academy's own material

Extracted from the flyer PDF and academyofmedicalscience.ca (sources kept in `assets/source/`):

- **Logo** — lifted out of the flyer PDF, cleaned to transparent PNG + white knockout
- **Brand colours** — `#004AAD` (logo blue), `#257CDD` (flyer accent), navy `#062A57`
- **21 programmes** named on the flyer and website
- **Real module content** — e.g. Phlebotomy: order of draw, vacutainer tubes, lab requisition,
  patient identification, Canadian protocol, legal issues, complications, special populations,
  vitals and urinalysis, medical/family history technique
- **Medical Assistant at $1,999**, two-month hybrid (the one price published on the flyer)
- **Free weekly MLPAO / CSMLS exam preparation session**
- **Contact** — 437-898-3761, 647-524-5976, 10 George St N Brampton ON L6X 1R2,
  medicalacademyinfo@gmail.com, e-Transfer to academy.medicalscience@gmail.com
- **30% cancellation charge** policy

## What is sample data

All other fees, intake dates, student records, instructors, testimonials, revenue figures and
enrolment counts are illustrative. Fees were set across a $199–$2,899 range consistent with the
$2–3k average Suresh quoted on the call.

Out of scope by request: the separate paid practice-exam platform (1,000+ questions) — quoted
later as a web-only build.

## Running it

Static files, no build step. Either open `index.html` directly, or serve the folder:

```bash
node .claude/serve.js
```

Then visit http://localhost:8129. Serving is only needed if you want the live iframe previews on
the launcher page to load.

## Structure

```
assets/
  ams.css     shared design tokens (brand palette, buttons, badges, forms)
  web.css     web application styles
  app.css     mobile application styles
  icons.js    SVG sprite — real line icons, no emoji
  data.js     programmes, modules, student, admin datasets
  img/        33 optimised images (1.9 MB total)
  source/     the client's original flyer PDF and offer graphic
```
