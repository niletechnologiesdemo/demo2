# Off That Couch Fitness — Phase 1 Scope of Work

**Client:** Steve Clark, Off That Couch Fitness (UK)
**Prepared by:** Nile Technologies
**Status:** Pre-sales draft — for scoping call, not yet contractual
**Purpose:** Define Phase 1 in enough detail to drive wireframes, estimate, and contract.

---

## 1. Positioning decision (read this before the module list)

Transition.fun is a venture-style product whose pitch is *"AI replaces your human coach at a fraction of the cost."* It sells at ~$139/yr and competes with TriDot and TrainingPeaks on their own ground.

Steve is the opposite shape of business: a practising British Triathlon Level 2 coach with a named race team, in-person swim video analysis, sports massage, blood lactate and VO2 testing, Wattbike FTP testing, hydrotherapy, bike box hire, a merch shop and a club tier. His coaching judgement is the asset. His constraint is that he can only be in one place at a time.

**A straight clone of Transition is the wrong product for him.** It would put a solo UK coach in a head-on fight with a funded competitor, cannibalise his highest-margin 1-to-1 work, and saddle him with permanent AI running costs against a tiny subscriber base.

**The product this scope describes instead:**

> **OTCF's coaching methodology, delivered at scale, with Steve still in the loop — and the app acting as the front door to his in-person services.**

Three consequences that shape Phase 1:

1. **The Coach Console is not back-office admin — it is the differentiator.** Steve must be able to see every athlete, override any plan, and message anyone. This is what Transition structurally cannot offer. It belongs in Phase 1.
2. **The app should route revenue back to his existing services.** Baseline numbers can be *entered by Steve* from a real Wattbike FTP or lactate test. Swim video can be uploaded for *Steve* to review as a paid service — years before any AI does it. Every one of those is revenue with zero AI cost.
3. **Scope discipline is a commercial requirement, not a technical preference.** At a £10,000 Phase 1 the margin for scope drift is nil.

---

## 2. Verdict on the proposed phase split

The proposed split is sound. Six items are correct as stated. Three need adjustment, and there are gaps that must be added or Phase 1 will not survive contact with real athletes.

### 2.1 Confirmed as proposed

| Item | Verdict |
|---|---|
| Race library, plan categories, associated plans | ✅ Correct — this is the spine of Phase 1 |
| AI Coach *without* life-proof rescheduling or race prediction | ✅ Correct trim. Plan **mutation** is where cost and liability live; conversation and analysis are cheap |
| Apple Health + Health Connect integration | ✅ Correct — free, no partner approval, covers the majority of devices |
| Wearable input data (workouts, steps, HR, sleep) | ✅ Correct, with scope caveats in §8 |
| AI video form analysis → Phase 3 | ✅ Strongly agree. It is a standalone computer-vision product across three sports |
| Photo-based protein tracking → Phase 1 | ✅ Acceptable. Genuinely cheap with a modern vision model, and it demos extremely well |

### 2.2 Adjustments recommended

**a) Analytics — move a thin slice into Phase 1.**
Deferring analytics wholesale leaves the app hollow in week two and starves the AI Coach of anything to analyse. The AI Coach *is* an analytics feature — you cannot ship one without the other.

- **Into Phase 1:** planned vs actual weekly hours by discipline, plan compliance %, a simple rolling training-load line (7-day vs 28-day), weight trend, and a session history list.
- **Stays in Phase 2:** per-discipline fitness curves, form/freshness modelling, HRV and sleep-based readiness scoring, race-readiness projections.

**b) Race-day prep — the cheap half is already free in Phase 1.**
Taper is simply the final two to three weeks of a plan template that runs to a race date. Brick sessions and T1/T2 transition practice are just workout types in the session library. Both come free once the plan library exists.

- **Free in Phase 1:** templated taper, brick and transition sessions as first-class workout types.
- **Stays in Phase 2/3:** dynamic taper that responds to accumulated fatigue, race-week checklists, pacing and nutrition race plans, kit lists.

**c) Session fuelling guidance — the static half is nearly free.**
Rules-based fuelling text attached to session type and duration ("session over 90 min → carb target per hour, pre/post window") is a content exercise, not an engineering one. Recommend pulling the *static* version into Phase 1 and leaving *adaptive, load-aware* fuelling and guided visualisation / breathwork audio in Phase 2/3 as proposed.

### 2.3 Gaps — must be added to Phase 1

| # | Gap | Why it cannot wait |
|---|---|---|
| G1 | **Coach Console (web)** | The entire positioning in §1 collapses without it. Steve cannot see, help, or retain a single athlete. Also his only tool to correct a bad AI answer. |
| G2 | **Manual reschedule / plan shift** | "Life-proof rescheduling" (AI auto-reshuffle) is correctly excluded — but if a missed Tuesday permanently breaks the plan, athletes churn in week two. The rules-based version (move a session, shift the whole plan by N days, swap a discipline) is trivial and mandatory. |
| G3 | **Push notifications** | Today's session, missed-session nudge, coach message. The single highest-leverage retention feature in any training app and near-free to build. |
| G4 | **PAR-Q health screening + disclaimers** | A UK app prescribing training to strangers must screen for contraindications and disclaim. Cheap now, expensive and reputationally awkward to retrofit. |
| G5 | **AI safety guardrails** | Red-flag escalation (chest pain, injury, disordered-eating signals), refusal boundaries, and "see Steve or your GP" routing. Non-negotiable given the app gives training *and* nutrition guidance. |
| G6 | **Strength training in the plan library** | The reference app includes it, triathletes need it, and it is pure content cost — no new engineering. |
| G7 | **Coach-entered baseline testing** | Lets Steve push real Wattbike FTP / lactate / VO2 numbers into an athlete's profile. Directly monetises his existing in-person testing services through the app. |
| G8 | **UK GDPR posture** | Health data is special-category. Explicit consent, privacy notice, data export and deletion, an LLM provider under a DPA with no-training commitments, and UK/EU hosting. |

### 2.4 Overall

**Yes — this split is viable for a launch in this domain, with §2.2 and §2.3 folded in.** What it produces is not an AI coach replacement. It is a *coached training app*: a credible, personalised plan the athlete follows daily, their real wearable data flowing in against it, an AI layer that explains and analyses that data in Steve's voice, and Steve himself one tap away. For his existing athletes and his club that is a stronger product than Transition. For cold-market strangers it is not — and it should not try to be in Phase 1.

**On the £10,000 ceiling:** achievable, but only under the constraints in §13. It is tight, not comfortable. The things that would break it are named in §13.3 so they can be defended in the contract.

---

## 3. Phase 1 scope boundary

### 3.1 In scope

1. Athlete mobile app — iOS and Android from a single codebase
2. Onboarding, profile, PAR-Q, goals, availability, baseline zones
3. Race library and plan library with parameterised personalisation
4. Training calendar with Today view, session detail, completion, manual reschedule
5. Apple Health and Health Connect read integration, with auto-completion matching
6. AI Coach — conversational Q&A and automated weekly review, grounded in the athlete's own data
7. Photo-based protein estimation and daily protein target
8. Static session fuelling guidance
9. Light analytics — compliance, volume, load trend, weight trend
10. Push notifications
11. Coach Console (web) — roster, athlete detail, plan override, messaging, baseline entry
12. Admin — users, content, plan templates, race library, AI usage monitoring
13. Access control and monetisation (mechanism per §12 decision)
14. Legal and compliance surface — privacy, terms, health disclaimer, consent, data export/delete
15. App Store and Play Store submission

### 3.2 Explicitly out of scope in Phase 1

Adaptive/self-modifying plan engine · AI-driven automatic rescheduling · race time prediction · outbound structured-workout push to Garmin/Wahoo devices · smart trainer control · AI video form analysis · full analytics suite (fitness curves, form/freshness, HRV readiness scoring) · guided visualisation and breathwork audio · dynamic taper · race-week planner · Strava, Zwift, Rouvy, Wahoo integrations · merch shop · podcast · web marketing site rebuild · social/community features · leaderboards · Apple Watch or Wear OS companion app · offline mode beyond basic caching.

---

## 4. User roles

| Role | Platform | Description |
|---|---|---|
| **Athlete** | iOS / Android | Primary user. Follows a plan, logs sessions, talks to the AI Coach, tracks protein. |
| **Coach (Steve)** | Web console | Sees all athletes, overrides plans, enters test results, messages athletes, reviews flagged AI conversations. |
| **Admin** | Web console | Manages plan templates, session library, race library, users, subscriptions, AI usage. Initially the same person as Coach; kept as a separate permission set. |

---

## 5. End-to-end flows

### 5.1 Flow A — New athlete onboarding to first session

```
Launch → Welcome carousel → Sign up (Email / Apple / Google)
  → [if coach-provisioned] Access code entry
  → Consent gate: T&Cs, Privacy, Health Disclaimer  [blocking]
  → PAR-Q health screening
      ├─ any red flag → advisory screen → require acknowledgement + notify Coach
      └─ clear → continue
  → Profile basics (name, DOB, sex, height, weight, units)
  → Sport background (years training, disciplines, prior race distances)
  → Goal selection
      ├─ Race-driven → Race library search → select race → race date locked
      ├─ Distance-driven, no race yet → pick category + target date
      └─ Longevity / general fitness → no race date
  → Availability (training days, hours per week, max session length,
                  pool access, indoor trainer, gym access)
  → Baseline numbers per discipline
      ├─ I know my numbers → manual entry (swim CSS/400m, bike FTP, run threshold)
      ├─ Estimate for me → derived from recent race/effort times
      └─ Test me later → provisional zones + a scheduled field test in week 1
  → Limitations & injuries (checklist + free text)
  → Connect data source (Apple Health / Health Connect) — primer, then system permission sheet
      └─ skippable, with a persistent prompt afterwards
  → PLAN PREVIEW  ← key screen
      shows: plan name, weeks to race, weekly hours, phase breakdown,
             sample week, discipline split, taper window
      actions: Adjust availability | Change race | Confirm
  → Access gate (subscription purchase / coach-granted / trial)
  → Home (Today)
```

### 5.2 Flow B — Daily loop (the core retention loop)

```
Push notification 06:00 "Today: 45min Z2 run + 20min core"
  → Today screen → tap hero session
  → Session detail: structured steps, targets in the athlete's own zones,
                    coach notes, fuelling note, warm-up/main/cool-down
  → Athlete trains (device of their choice, outside the app)
  → Garmin/Apple Watch/Coros syncs to Apple Health or Health Connect
  → App foregrounds → reads new workouts → auto-match engine
      ├─ matched (date + discipline + duration within tolerance)
      │     → session auto-marked complete → "We logged your run ✓" card
      │     → prompt for RPE (1–10) + optional note
      └─ unmatched → workout appears in "Unmatched activity" tray
            → athlete can attach it to a planned session or discard
  → No data source / no device → manual log (duration, distance, RPE, note)
  → Today updates: compliance, week progress, streak
```

### 5.3 Flow C — Missed session (rules-based, no AI)

```
Session date passes with no completion
  → 20:00 nudge "Did you get your swim done?"
      ├─ Yes → manual log
      ├─ Move it → date picker → session relocated within a ±7 day window
      │             (guard: no more than 2 hard sessions on consecutive days)
      ├─ Swap discipline → substitution rules (pool closed → turbo or dryland;
      │                    weather → indoor equivalent of the same duration/intensity)
      └─ Skip it → marked missed, counts against compliance, no plan mutation
  → After 3 missed sessions in 7 days:
      → in-app prompt "Want to shift the whole plan back a week?"
      → and a flag raised on the Coach Console
```

### 5.4 Flow D — AI Coach conversation

```
Coach tab → chat
  → suggested prompts ("How did my week go?", "Why is this session Zone 2?",
                       "My calf is tight", "I'm travelling next week")
  → athlete message
  → context assembled server-side:
        profile · zones · race + weeks remaining · current phase
        · last 14 days planned vs actual · RPE trend · weight trend
        · injury flags · OTCF methodology content
  → safety classifier runs first
        ├─ red flag (chest pain, syncope, acute injury,
        │            disordered-eating signal, medication/medical question)
        │     → templated safe response + escalate + notify Coach Console
        └─ clear → coaching response generated
  → response rendered with a persistent "guidance, not medical advice" footer
  → athlete can tap "Send this to Steve" on any exchange
```

> **Hard boundary:** the AI Coach may *explain, analyse, motivate, and recommend the athlete speak to Steve*. It may **not** write to the plan. All plan changes in Phase 1 are athlete-initiated (Flow C) or coach-initiated (Flow F).

### 5.5 Flow E — Photo protein tracking

```
Fuel tab → Add meal → Camera or Library
  → image sent for vision analysis
  → returns: identified items, estimated portions, protein grams, confidence band
  → CONFIRM/EDIT screen (mandatory — never auto-saves)
        athlete can correct items, adjust portion, override grams
  → saved to today's log → daily protein ring updates against target
  → target = bodyweight × factor, adjusted for the day's training load
  → image discarded after processing (retention setting per §11)
  → daily cap on analyses per athlete (cost control)
```

### 5.6 Flow F — Coach (Steve) daily loop

```
Coach Console login
  → Roster: every athlete, sorted by attention needed
        flags: ≥3 missed sessions · PAR-Q red flag · AI escalation
               · unread message · plan ending soon · no sync in 7 days
  → Athlete detail
        plan calendar · planned vs actual · session history · RPE and weight trends
        · AI conversation log (subject to athlete consent) · notes
  → Actions:
        Enter test result (Wattbike FTP, lactate, VO2, swim CSS) → recalculates zones
        Override a session · assign a different plan template · shift plan
        Send a message (lands in the athlete's Coach tab and as a push)
        Add a private coaching note
```

---

## 6. Module specification

### M1 — Accounts, access and consent

- Email/password, Sign in with Apple (mandatory on iOS if any social login is offered), Google Sign-In.
- Password reset, email verification, session persistence, sign out, delete account (GDPR — must actually delete, and must be reachable in-app).
- Consent gate before any data collection: Terms, Privacy Notice, Health Disclaimer, explicit special-category health data consent. Versioned and timestamped; re-prompt on material change.
- Optional access-code path for coach-provisioned athletes.

**Screens:** Welcome · Sign up · Sign in · Forgot password · Access code · Consent gate · Delete account confirmation.

### M2 — Athlete profile and PAR-Q

- Identity: name, DOB, sex at birth (for physiological calculation), height, weight, unit preference (metric default, imperial toggle), photo, timezone.
- Sport background: years training, disciplines, longest prior distance per discipline, previous race results (free text).
- PAR-Q+ derived screening — cardiac conditions, chest pain, dizziness, joint problems, medication, pregnancy, other. Any positive answer produces an advisory screen, requires acknowledgement, and raises a Coach flag.
- Injuries and limitations: structured checklist (shoulder, knee, achilles, back, other) plus free text. Feeds AI Coach context and appears on the Coach Console.

**Screens:** Profile basics · Sport background · PAR-Q (multi-step) · PAR-Q advisory · Injuries & limitations · Profile edit.

### M3 — Race library

- Seeded, searchable catalogue of triathlon events (UK-weighted, with major international events).
- Record: name, date, location, distance category, discipline distances, swim type (pool / lake / sea), terrain notes, official URL, logo.
- Search by name, filter by date range, distance, country, swim type.
- "My race isn't listed" → custom race entry (name, date, distance category).
- Admin-managed: add, edit, archive, bulk import via CSV, annual roll-forward of recurring events.

**Screens:** Race search · Race filters · Race detail · Custom race entry · Selected race confirmation.
**Admin screens:** Race list · Race editor · CSV import.

### M4 — Plan library and personalisation engine

This is the spine of the product. It is **parameterised template instantiation**, not an adaptive engine.

**Plan template structure**

```
Template
 ├─ Category: Sprint | Olympic | 70.3 | Ironman | Longevity
 ├─ Level: Beginner | Intermediate | Advanced
 ├─ Duration: 8 / 12 / 16 / 20 / 24 weeks
 ├─ Phases: Base → Build → Peak → Taper  (each with % of total duration)
 └─ Week archetypes, each containing session slots:
       discipline · session archetype · target duration ·
       target intensity zone · priority (key / supporting / optional) ·
       preferred day-of-week
```

**Session archetypes** (the reusable library):

- **Swim:** technique/drill, endurance, threshold, CSS intervals, open-water skills, time trial
- **Bike:** endurance, tempo, sweet spot, FTP intervals, VO2 intervals, recovery spin, indoor turbo equivalent
- **Run:** easy/Z2, long run, tempo, threshold intervals, hills, strides, off-the-bike run
- **Brick:** bike→run combinations at multiple durations
- **Transition:** T1/T2 practice, logged and tracked as a workout type
- **Strength:** general prep, tri-specific strength, core/stability, mobility *(gap G6)*
- **Test:** 400m swim TT, 20-min FTP test, run threshold test, RPE baseline
- **Rest / recovery**

**Personalisation inputs → outputs**

| Input | Effect on the generated plan |
|---|---|
| Race date (or target date) | Total weeks available; phase lengths scaled proportionally; taper anchored to race week |
| Available training days | Session slots mapped onto real days; key sessions protected on the athlete's best days |
| Weekly hours available | Volume scaling factor applied across all sessions, with floors and ceilings per phase |
| Max session length | Long sessions capped or split |
| Pool / turbo / gym access | Session substitution (no pool → dryland + extra bike; no turbo → outdoor-only bike) |
| Level | Template variant selection, progression rate, intensity ceiling |
| Baseline zones | Every session's targets rendered in the athlete's own paces, powers and heart rates |
| Injuries / limitations | Flagged archetypes swapped for alternatives (e.g. achilles flag → run volume reduced, bike/swim increased) |

**Generation output:** a set of dated session instances from today (or a chosen start date) to race day, each carrying discipline, archetype, structured steps, computed targets, coach notes, fuelling note, priority and status.

**Zone calculation**

- **Swim:** CSS from a 400m and 200m time trial (or a single 400m with a standard estimate) → pace bands per 100m
- **Bike:** FTP from a 20-min test × 0.95, or coach-entered from a Wattbike/lactate test → 7 power zones; HR zones derived where power is unavailable
- **Run:** threshold pace from a recent race or field test → 5 pace zones and matching HR zones

> **Naming note:** TSS, CTL, ATL, TSB, Normalized Power and Intensity Factor are TrainingPeaks trademarks. Use OTCF's own terminology throughout (e.g. "OTC Load", "7-day load", "28-day load").

**Screens:** Plan preview · Plan confirm · Plan calendar (week) · Plan calendar (month) · Phase overview / race countdown · Plan settings (shift plan, change availability, change race, regenerate) · Regenerate warning.
**Admin screens:** Template list · Template editor (phases, week archetypes, slots) · Session archetype library · Session editor (steps, targets, notes, media).

### M5 — Today, session detail and completion

**Today screen** — the app's home. Contains:

- Date, current phase, weeks to race
- Hero card: today's key session (discipline icon, title, duration, primary target, status)
- Secondary sessions for today
- "Yesterday" strip if an unlogged session is outstanding
- Week progress: completed vs planned hours, compliance ring
- Fuelling note for today's load
- Last-sync indicator for the connected data source
- Coach message banner if Steve has sent something unread

**Session detail** — structured steps rendered as a vertical list:

```
Warm-up   10 min   Z1        —  easy spin, build cadence
Main      5 × 4min Z4        —  3 min recovery @ Z1
                              targets: 245–265 W  /  152–162 bpm
Cool-down  8 min   Z1
```

Plus: purpose ("why this session, this week"), coach notes, optional demo media, fuelling guidance, and actions — Start/Complete, Log manually, Move, Swap, Skip, Ask the Coach about this session.

**Completion paths:** auto-match from wearable data · manual log · attach an unmatched activity.
**Post-completion:** RPE 1–10, optional note, actual vs planned comparison.

**Screens:** Today · Session detail · Manual log · Post-session RPE & notes · Move session · Swap session · Skip confirmation · Unmatched activity tray · Attach activity to session.

### M6 — Wearable and health data integration

See §8 for the platform reality, including Garmin.

- **Apple Health (HealthKit):** read workouts (type, start/end, duration, distance, active energy, average and max heart rate), heart rate, resting heart rate, steps, sleep analysis, body mass. HRV is read and stored for Phase 2 use, not surfaced in Phase 1.
- **Health Connect (Android):** read exercise sessions, heart rate, steps, sleep, weight.
- Granular permission primer screen before the OS permission sheet — explaining what is read and why — materially improves grant rates and is an App Review expectation.
- Background delivery / background refresh where the platform allows; a manual "Sync now" control regardless.
- Auto-match engine: incoming workout → candidate planned sessions within ±36 hours → discipline match → duration within tolerance → highest-confidence match auto-completes; ambiguous matches go to the unmatched tray.
- Deduplication where an activity arrives from more than one source.
- Data-source status screen: connected sources, last sync time, permissions granted/denied, reconnect and disconnect.

**Screens:** Connect data source primer · Permission explainer per data type · Data sources & sync status · Sync troubleshooting · Manual entry fallback.

### M7 — AI Coach

**What it is in Phase 1:** a conversational coach grounded in (a) the athlete's own training data and (b) OTCF's coaching methodology, plus an automated weekly review.

**What it is not:** it does not modify the plan, predict race times, reschedule sessions, or give medical, diagnostic, pharmacological or supplement advice.

**Context assembled per conversation:** profile and zones · goal race and weeks remaining · current phase and week · last 14 days planned vs actual · RPE trend · recent weight trend · injury and PAR-Q flags · protein adherence · retrieved OTCF methodology content.

**Capabilities**

| Capability | Example |
|---|---|
| Explain a session | "Why is Thursday's ride only Zone 2?" |
| Interpret the athlete's data | "How was my week?" → grounded, specific, references actual sessions |
| Troubleshoot execution | "I couldn't hit the power targets" → causes, what to do next time |
| Motivate and reassure | Phase-appropriate, references the athlete's actual progress |
| Route to Steve | "That's worth a conversation with Steve — shall I flag it?" |
| Weekly review | Auto-generated Sunday summary: what was done, compliance, what's coming, one focus point |

**Guardrails (gap G5)**

1. Pre-response safety classifier on every inbound message.
2. Red-flag categories → templated safe response, no model-generated advice, escalation flag on the Coach Console, and a push to Steve: chest pain / cardiac symptoms · syncope or blackout · acute or worsening injury · disordered-eating signals or extreme weight-loss requests · medication, supplement or medical questions · pregnancy · mental health crisis language.
3. Hard refusals: no diagnosis, no medication or supplement dosing, no weight targets below a healthy BMI, no advice to train through a red-flag symptom.
4. Persistent disclaimer on every AI surface.
5. Full conversation logging, visible to Steve, with a thumbs-down mechanism that raises a review flag.

**Cost controls** (this is a permanent monthly bill, not a build cost)

- Per-athlete daily and monthly message caps, with a clear in-app limit state.
- Tiered model routing: a small cheap model for classification and intent, a capable model only for actual coaching responses.
- Aggressive caching of the methodology corpus and of stable athlete context.
- Context truncation with a hard token ceiling per request.
- Admin dashboard: cost per athlete per month, total spend, outlier users.

**Screens:** Coach chat (empty state, suggested prompts, conversation, streaming response, limit-reached state) · Weekly review card and detail · Escalation/safety response state · Send-to-Steve confirmation · Coach message thread with Steve (human).

### M8 — Nutrition: photo protein tracking and fuelling

**Photo protein (gap-free, as proposed for Phase 1)**

- Capture or select a photo → vision analysis → identified items, estimated portions, protein grams, confidence.
- **Mandatory confirm/edit screen.** Never auto-saves. The athlete can correct items, adjust portions, or override the total. This is both an accuracy and a liability requirement.
- Daily protein target: bodyweight × a factor, adjusted for that day's training load; coach-overridable.
- Daily ring, meal list, history by day, weekly average.
- Manual entry fallback for when a photo isn't practical.
- Explicit "estimate only, not a substitute for dietary advice" labelling.
- Per-athlete daily analysis cap.

**Static fuelling guidance (pulled forward per §2.2c)**

- Rules-based text attached to session type and duration: pre-session, during (for sessions over ~75–90 min), and post-session recovery window.
- Authored as content by Steve, not generated. Zero AI cost.
- Surfaces on Today and on Session detail.

**Screens:** Fuel home (protein ring, meals, target) · Camera capture · Analysis in progress · Confirm & edit result · Manual meal entry · Meal history · Protein target settings · Fuelling guidance detail.

### M9 — Light analytics (per §2.2a)

Phase 1 shows what happened. Phase 2 models what it means.

- Weekly volume by discipline — planned vs actual, bar chart, last 12 weeks
- Compliance % — this week, 4-week rolling
- Training load — a simple session load score (duration × intensity factor), charted as a 7-day vs 28-day rolling line with a plain-English read ("building", "steady", "backing off")
- Weight trend line
- Session history — filterable list, tappable through to session detail
- Personal bests / test result history per discipline

**Screens:** Progress home · Volume by discipline · Load trend · Weight trend · Session history · Test results history.

### M10 — Notifications (gap G3)

- Morning session reminder (time configurable)
- Evening missed-session nudge
- Session auto-completed confirmation
- Weekly review ready
- Coach message received
- Plan milestone (phase change, taper start, race week, N weeks to go)
- Re-engagement after 5 and 14 days inactive
- Full per-category opt-out in settings

**Screens:** Notification permission primer · Notification settings.

### M11 — Coach Console, web (gap G1)

**Roster** — every athlete, with sortable attention flags: ≥3 missed sessions in 7 days · PAR-Q red flag · AI safety escalation · unread athlete message · no data sync in 7+ days · plan ending within 2 weeks · subscription lapsing.

**Athlete detail** — profile and PAR-Q answers · current plan with full calendar · planned vs actual · session history with RPE · weight and load trends · AI conversation log (subject to athlete consent, disclosed in the privacy notice) · private coach notes.

**Coach actions**

- Enter a test result (Wattbike FTP, blood lactate, VO2, swim CSS, run threshold) → recalculates zones → all future session targets update *(gap G7 — directly monetises his in-person testing)*
- Assign or change a plan template
- Shift the whole plan by N days
- Override an individual session — change duration, intensity, discipline, or notes
- Add a coach note to a specific session, visible to the athlete
- Message an athlete (lands in the Coach tab and as a push)
- Broadcast to a segment (e.g. everyone racing the same event)
- Resolve an AI escalation flag

**Screens:** Coach login · Roster (with filters) · Athlete detail · Plan editor · Session override · Test result entry · Message thread · Broadcast composer · Escalation queue.

### M12 — Admin

- User management: list, search, view, suspend, delete (GDPR), grant access, reset
- Plan template management (per M4)
- Session archetype and content library — including fuelling text and coach notes
- Race library management (per M3)
- Subscription and access management
- AI usage and cost dashboard
- Basic product analytics: signups, activation (plan confirmed), 7/30-day retention, session completion rate

### M13 — Access, monetisation and billing

The mechanism is a **decision required before build** (§12, Q1). Two viable Phase-1 routes:

| Route | Mechanism | Cost & implication |
|---|---|---|
| **A — Coach-provisioned (recommended for Phase 1)** | Steve grants access via code or invite; athletes pay him as they do today (bank transfer, Stripe link, existing coaching fee) | Cheapest to build. Because it accompanies a real human coaching service rather than selling standalone digital content, it sits far more comfortably outside the store IAP requirement. Zero store commission. Fastest to launch. |
| **B — Self-serve subscription** | Apple In-App Purchase and Google Play Billing, monthly and annual, free trial | Materially more build (store products, receipt validation, entitlement service, restore, trial and lapse handling) plus 30%/15% platform commission. Required if strangers can buy in-app. |

**Recommendation:** launch Phase 1 on Route A, aimed at his existing athletes, race team and club. Add Route B in Phase 2 once retention and AI running costs are known against real usage. This removes the single largest avoidable chunk of Phase-1 engineering and defers the commission entirely.

> App Store rules on this are nuanced and change; the final position should be confirmed against current guidelines at build time.

**Screens (Route A):** Access code entry · Access status in settings · Expired/no-access state.
**Screens (Route B, if selected):** Paywall · Plan comparison · Purchase confirmation · Manage subscription · Restore purchases · Lapsed state.

### M14 — Support and legal surface

In-app: Help/FAQ, contact support, Privacy Notice, Terms, Health Disclaimer, data export (GDPR), delete account, app version and build.

---

## 7. Screen inventory for wireframing

**Athlete app — approx. 55 screens/states**

| Group | Screens |
|---|---|
| Onboarding (17) | Welcome carousel · Sign up · Sign in · Forgot password · Access code · Consent gate · PAR-Q (×3 steps) · PAR-Q advisory · Profile basics · Sport background · Goal type · Race search · Race detail · Custom race · Availability · Baseline numbers (×3 disciplines) · Injuries · Health data primer · Plan preview · Plan confirm |
| Today (9) | Today · Session detail · Manual log · Post-session RPE · Move session · Swap session · Skip confirm · Unmatched activity tray · Attach activity |
| Plan (6) | Week calendar · Month calendar · Phase / race countdown · Plan settings · Shift plan · Regenerate warning |
| Coach (7) | Chat empty state · Chat conversation · Streaming response · Limit reached · Safety/escalation state · Weekly review · Steve message thread |
| Fuel (8) | Fuel home · Camera · Analysing · Confirm & edit · Manual entry · Meal history · Protein settings · Fuelling guidance detail |
| Progress (6) | Progress home · Volume by discipline · Load trend · Weight trend · Session history · Test results |
| Me / Settings (10) | Profile · Edit profile · Baseline & zones · Data sources · Sync troubleshooting · Notifications · Access/subscription · Help & FAQ · Legal documents · Delete account |

**Coach Console — approx. 9 screens**
Login · Roster · Athlete detail · Plan editor · Session override · Test result entry · Message thread · Broadcast · Escalation queue

**Admin — approx. 8 screens**
Dashboard · Users · Plan templates · Template editor · Session library · Race library · Content/fuelling library · AI usage & cost

**Global states to wireframe:** loading · empty · error · offline · no data source connected · no access/expired · permission denied.

---

## 8. Integration reality — including Garmin

### 8.1 Garmin: researched, and the answer is nuanced

**Direct Garmin integration cannot be committed to for Phase 1.**

Garmin has **paused new applications to the Garmin Connect Developer Program** — the API layer covering health and activity data. The public access-request form has been removed and there is no published reopening date. Garmin's stated reason is that they are "evolving and modernizing" the programme. Existing approved integrations continue to work; only new applicants are blocked. (Connect IQ — watch faces and on-device apps — is a different programme and remains open, but it is not the data API we need.)

Even before the pause, the programme was business-only, approval-gated, and the *Training API* (pushing structured workouts out to a Garmin device) is a separate grant within it — which is out of Phase-1 scope regardless.

**So: yes, Garmin data is achievable in Phase 1 — via a route that does not need Garmin's approval.**

| Route | Feasible now? | Recommendation |
|---|---|---|
| **Garmin → Apple Health / Health Connect → our app** | ✅ Yes, today, free, no approval | **Phase 1.** The Garmin Connect app writes workouts, steps, heart rate, sleep and body metrics into Apple Health, and into Android's Health Connect (Garmin joined Health Connect in 2025). Our app already reads both. |
| **Aggregator (Terra / Spike / Rook) using *their* approved Garmin credentials** | ✅ Yes — this is the standard workaround | **Phase 2 option.** Richer, server-side, more reliable Garmin data with no Garmin approval needed. But it carries a real monthly platform fee — Terra's entry tier is around $499/month — which is not defensible against a Phase-1 subscriber base of tens. |
| **Direct Garmin Connect Developer Program** | ⛔ Paused for new applicants | **Register interest now** so OTCF is in the queue if it reopens. Do not put it on the critical path or in the contract. |
| **Garmin Training API (push workouts to device)** | ⛔ Gated behind the same paused programme | Out of scope, Phase 2/3 at the earliest, and conditional on the programme reopening. |

**What this means practically:** a Garmin athlete installs Garmin Connect (which they already have), grants it permission to write to Apple Health or Health Connect, and their sessions flow into the app automatically. From the athlete's point of view the app "works with Garmin." What we should **not** claim in marketing is a *direct* Garmin partnership or integration.

### 8.2 Strava — recommend explicit exclusion

Strava's API terms now prohibit using Strava data in AI models or in the development of AI features, no longer support routing data through third-party intermediary platforms, restrict third-party apps to showing a user only their own data, and as of 2026 require a paid developer subscription. **For an app whose centrepiece is an AI coach analysing training data, Strava is a poor fit and a compliance risk.** Recommend excluding it entirely and saying so plainly to the client, since the reference app lists it.

### 8.3 Data availability caveats to set expectations on

- Apple Health and Health Connect are **on-device** stores. There is no server-side pull — data reaches our backend only when the app runs. Hence the "last synced" indicator and background refresh in M6, and hence the fact that Steve's console can lag an athlete's device by hours.
- Summary-level data (type, duration, distance, average/max HR, energy) is reliably available. **Interval-by-interval structure is not.** We can confirm a threshold session was done for 48 minutes; we cannot reliably verify each rep was hit. Zone-level and stroke-level detail varies by device and by what the manufacturer's app writes.
- Cycling power availability through the health stores varies by device and OS version and must be verified during build before anything is promised.
- Historical data does not reliably backfill on first connect. Onboarding should not depend on it.

### 8.4 Devices covered in Phase 1 without any additional work

Anything that writes to Apple Health or Health Connect — Apple Watch, Garmin, Coros, Polar, Suunto, Wahoo, Whoop, Oura, Fitbit, Samsung, Google Pixel Watch, plus most phone-tracked activity.

---

## 9. Data model outline

`User` · `AthleteProfile` · `ParqResponse` · `Injury` · `BaselineTest` · `Zone` · `Race` · `AthleteGoal` · `PlanTemplate` · `PlanPhase` · `WeekArchetype` · `SessionArchetype` · `AthletePlan` · `PlannedSession` · `SessionStep` · `CompletedActivity` · `ActivityMatch` · `SessionFeedback` (RPE, notes) · `HealthMetric` (weight, HR, sleep, steps, HRV) · `DataSourceConnection` · `Meal` · `MealItem` · `ProteinTarget` · `AiConversation` · `AiMessage` · `AiEscalation` · `CoachNote` · `CoachMessage` · `Notification` · `ConsentRecord` · `AccessGrant` / `Subscription` · `AuditLog`

---

## 10. Technical approach (for estimate integrity)

- **Mobile:** single cross-platform codebase (React Native/Expo or Flutter) shipping to both stores. Two native codebases are not affordable at this budget.
- **Backend:** managed platform (e.g. Supabase or Firebase) — Postgres, auth, storage, functions. UK/EU region.
- **Coach Console & Admin:** responsive web app against the same backend.
- **AI:** hosted LLM via API under a DPA with no-training-on-customer-data commitments; tiered model routing per M7.
- **Health data:** native HealthKit and Health Connect modules — the one place native platform code is unavoidable.
- **Push:** platform push services via the managed backend.
- **No custom design system.** A single well-executed component set, OTCF brand colours and the existing logo.

---

## 11. Compliance, privacy and store readiness

- **UK GDPR:** health and fitness data is special-category. Requires explicit, granular, versioned consent; a plain-English privacy notice; lawful basis documented; data export and true deletion in-app; a defined retention policy; and a records-of-processing entry. LLM provider and any sub-processors under a DPA, listed in the privacy notice.
- **Data residency:** UK/EU hosting.
- **Meal images:** recommend deleting after processing, or a short fixed retention with the athlete informed.
- **AI conversation logs visible to Steve:** must be disclosed in the privacy notice and consented to at onboarding.
- **Apple App Review:** HealthKit usage-description strings; HealthKit data must not be used for advertising; health/fitness apps are reviewed against physical-harm guidance; account deletion must be reachable in-app.
- **Google Play:** Health Connect declaration form, sensitive-data policy, data-safety section.
- **Regulatory positioning:** the app must present as fitness and performance guidance, not medical advice or diagnosis. This keeps it outside medical-device classification. All copy, and the AI Coach system prompt, must hold this line.
- **Liability:** PAR-Q at onboarding, persistent health disclaimer, "consult a doctor" routing on red flags. Steve should confirm his coaching insurance extends to app-delivered guidance.

---

## 12. Decisions required from the client before build

| # | Question | Why it matters |
|---|---|---|
| Q1 | **Who is Phase 1 for — his existing athletes and club, or the cold market?** | Decides monetisation route (M13 A vs B), which is the single largest swing in Phase-1 cost. |
| Q2 | **Does the app replace, extend, or feed his 1-to-1 coaching?** | If it undercuts his own coaching fees he loses money launching it. §1 assumes "feed". |
| Q3 | **How many plan templates for launch?** | Category × level × duration multiplies fast. Recommend a deliberately small launch set (see §13.2). |
| Q4 | **Who authors the plan content and coaching methodology corpus?** | This is Steve's IP and his time, not development time. It is a dependency, and it is on the critical path. |
| Q5 | **Is his existing swim video analysis sold *through* the app in Phase 1?** | Upload → Steve reviews manually → he charges. Revenue with zero AI cost, and it seeds Phase 3. |
| Q6 | **Is Steve willing to be visible in the app day to day?** | The Coach Console only creates value if he uses it. |
| Q7 | **Confirm £10,000 is a build budget excluding running costs.** | See §13.4. |
| Q8 | **Android at launch, or iOS first?** | Dropping Android from Phase 1 is the cleanest available cost reduction if the budget bites. |
| Q9 | **iOS-only would also remove Health Connect work — is his athlete base iPhone-dominant?** | Worth asking; UK endurance athletes skew iPhone, but his club may not. |

---

## 13. Budget reality against £10,000

### 13.1 Honest position

£10,000 for a cross-platform app plus backend plus AI plus a coach console plus two store submissions is **tight but achievable** — and only under the constraints in §10 and §13.2. It is not a comfortable budget. It should be contracted as a fixed scope, not a fixed outcome, with §13.3 named explicitly as change-order territory.

### 13.2 Constraints that make it fit

- Single cross-platform codebase; managed backend; no bespoke infrastructure
- A **deliberately small launch plan library** — suggest 6–8 templates (e.g. Sprint and Olympic at two levels, 70.3 at two levels, plus Longevity), not the full category × level × duration matrix
- Route A monetisation (coach-provisioned access), deferring all IAP work
- Component-library UI on OTCF brand, not a bespoke design system
- Content (plans, session library, coaching corpus, fuelling text) authored by Steve, not by us
- Race library seeded from a supplied or scraped list, not hand-curated
- One round of consolidated feedback per milestone

### 13.3 What would break the budget (name these in the contract)

Adaptive plan generation · AI writing to the plan · in-app purchase and subscription billing · a full analytics suite · direct Garmin or aggregator integration · video upload and review workflow · Apple Watch or Wear OS companion · offline-first architecture · bespoke design system or illustration · unlimited plan templates · marketing website rebuild · unbounded revision rounds.

### 13.4 Running costs — not in the £10,000

LLM usage for the AI Coach and photo protein analysis (scales per active athlete, per message, per photo — permanent) · backend hosting · push service · Apple Developer Program (~$99/yr) · Google Play (~$25 one-off) · domain and email · any aggregator fee if Garmin is added in Phase 2 (~$499/mo at Terra's entry tier) · ongoing maintenance and OS-version support.

**This must be modelled against subscriber revenue before launch, not after.** A £10 per month subscriber base of 30 athletes does not carry an uncapped AI bill — which is precisely why the per-athlete caps in M7 are in Phase 1 rather than bolted on later.

---

## 14. Phase 2 and Phase 3 map

**Phase 2** — full analytics (per-discipline fitness curves, form/freshness, HRV and sleep readiness scoring) · adaptive/auto-rescheduling plan engine · race-time prediction · adaptive load-aware fuelling · guided visualisation and breathwork library · dynamic taper and race-week planner · self-serve subscription billing (Route B) · richer Garmin via aggregator or direct if the programme reopens · additional integrations (Zwift, Rouvy, Wahoo) subject to their own approvals.

**Phase 3** — AI video form analysis across swim, bike and run · outbound structured-workout push to devices · smart trainer control · community and social features · marketplace or club tier in-app.

---

## 15. Assumptions and dependencies

**Assumptions:** Steve provides all coaching content and methodology; brand assets exist (logos supplied); one consolidated feedback round per milestone; English UK only; metric primary with an imperial toggle; no offline-first requirement; no accessibility certification beyond reasonable practice.

**Dependencies on the client (critical path):** plan templates and session library authored · coaching methodology corpus for the AI · fuelling guidance text · race list · Apple and Google developer accounts in OTCF's name · confirmation of insurance cover · sign-off on privacy notice and terms · timely feedback.

**Key risks**

| Risk | Mitigation |
|---|---|
| Garmin programme stays closed | Phase 1 already routes Garmin via Apple Health / Health Connect; no dependency created |
| AI running costs exceed subscription revenue | Per-athlete caps, tiered model routing, cost dashboard from day one |
| Content authoring slips | Named as a critical-path client dependency with dates; contract milestones gated on it |
| Health-data permissions denied by athletes | Manual logging fallback exists throughout; permission primer improves grant rates |
| App Review rejection on health grounds | Disclaimers, PAR-Q, non-medical positioning, and correct HealthKit usage strings built in from the start |
| Scope creep toward Transition feature parity | §3.2 and §13.3 exist to make every addition an explicit, costed decision |

---

*Sources for the integration findings in §8 are listed with the accompanying research summary.*
