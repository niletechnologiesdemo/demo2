# GoodhuePB — Adobe Firefly Image Prompt Pack

Generate **11 unique images** for the wireframes. Save each with the filename
listed under its prompt so I can drop them into `/Users/aadityanilesiphone/Documents/GoodhuePB-Wireframes/img/`
and wire them into the CSS in one pass.

---

## Shared visual style (paste at the START of every prompt as a "style preamble")

> Editorial sports photography in the style of a premium training-app (Strava /
> Nike Training Club / Whoop). Real people playing pickleball — diverse ages,
> races, and body types; recreational to club-level players in everyday athletic
> wear, NOT pro athletes with sponsor logos. Natural soft light, often golden
> hour or open shade. Shallow depth of field, 50mm or 85mm, f/2–f/2.8 feel.
> Cinematic, not posed. Cool blue and violet ambient tones where possible to
> match the brand. Slight motion blur on swings, crisp on faces. Composition
> leaves clear negative space on one side for text overlay.

### Always add as a NEGATIVE PROMPT
> text, watermarks, logos, brand names on clothing, professional stadium
> signage, oversaturated cartoon colors, plastic stock-photo look, thumbs-up
> poses, suits, gym-selfie energy, AI-rendered hands, distorted faces, extra
> fingers

### Adobe Firefly settings
- **Content Type:** Photo
- **Effects:** none (keep realistic — don't apply Firefly art presets)
- **Visual Intensity:** Medium
- **Color & Tone:** Cool Tones (use Warm Tones where called out)
- Generate **2–3 variants per prompt**, pick the best one

---

## Set 1 · Hero strips (4 images · **16:9 widescreen · ~1920×1080**)

These sit behind big text — be sure there's a clear empty area on one side.

### 1. `hero-img-pb-1.jpg` — Dashboard welcome hero
> [style preamble] Solo player mid-swing on a forehand drive at an outdoor
> pickleball court, golden hour, focused-but-joyful expression, slight motion
> blur on the paddle, soft blue-violet sky behind, blurred trees in the
> distance. Low-angle shot. **Negative space on the LEFT half** for welcome
> text. Warm-cool color contrast.

### 2. `hero-img-pb-2.jpg` — The Drop (video library) hero
> [style preamble] Wide cinematic shot of a doubles rally at the kitchen line
> with the pickleball mid-flight between players, dynamic action, slight motion
> blur, dusk lighting with violet/pink sky, urban park court, film-grain
> texture, sports-magazine feel. **Negative space on the LEFT third** — this is
> a video-library hero. Mood: "Film. Learn. Steal moves."

### 3. `hero-img-pb-3.jpg` — Performance / Schedule hero
> [style preamble] Athletic player (woman, mid-30s) celebrating a winning point
> mid-court — paddle raised, joyful expression, partner blurred in background.
> Late afternoon warm light, vibrant green court surface, editorial portrait
> energy. **Negative space on the LEFT** for headline text. Use Warm Tones.

### 4. `hero-img-pb-4.jpg` — Tournaments featured banner (Sydney Open)
> [style preamble] Wide elevated view of a multi-court pickleball tournament in
> progress — several courts visible with players in action, banners (no readable
> text), spectators in dappled shade, late afternoon golden light, lush trees
> framing the venue. Editorial event photography. **Negative space toward the
> RIGHT** so headline text on the LEFT reads clean.

---

## Set 2 · Tournament card covers (6 images · **3:2 landscape · ~1200×800**)

Smaller, more atmospheric, each conveys a different event vibe.

### 5. `thumb-pb-1.jpg` — Doubles (Canberra Cup)
> [style preamble] Two doubles partners slapping paddles in celebration after
> winning a point, mid-action, warm court lighting, friendly competitive
> energy, slightly blurred net in the background. Authentic moment, not posed.

### 6. `thumb-pb-2.jpg` — Tournament court atmosphere (NSW Doubles Masters)
> [style preamble] Empty outdoor pickleball court with a paddle and ball
> resting on the baseline, late afternoon light streaking diagonally across the
> court, anticipation-before-match mood, long shadows, minimalist composition.

### 7. `thumb-pb-3.jpg` — Mixed doubles (Wollongong Round Robin)
> [style preamble] Mixed-doubles team — a man and a woman — playing together at
> the net, both focused on the ball, captured in a dynamic moment of teamwork,
> soft natural outdoor lighting, blurred crowd behind.

### 8. `thumb-pb-4.jpg` — National championship (Australian National Champs)
> [style preamble] Player at the apex of a serve toss, full court visible
> beneath them, dramatic side-lighting, slight low angle, professional national
> event vibe but human and unposed. Deep blue court surface, clean lines.

### 9. `thumb-pb-5.jpg` — Premier doubles event (Brisbane Open Doubles)
> [style preamble] Two doubles teams facing off across the net, all four
> players visible in athletic stance, golden hour, indoor-outdoor venue with
> trees and high ceilings, polished but human, editorial.

### 10. `thumb-pb-6.jpg` — Singles match (Newcastle Singles Challenge)
> [style preamble] Solo player at the baseline preparing to receive a serve,
> focused expression, balanced athletic stance, soft natural light, plenty of
> court space around them, single-portrait energy.

---

## Set 3 · Login dark hero background (1 image · **portrait 3:4 or 4:5 · ~1200×1600**)

This sits behind a heavy dark gradient — don't worry about it looking dark, that's intentional.

### 11. `login-bg.jpg` — Atmospheric aspirational
> [style preamble] Solo pickleball player silhouette at sunset on an outdoor
> court, holding paddle, looking out toward the net. Deep blue and violet sky
> behind, soft lens flare from the side, minimal detail on the face (silhouette
> is fine). Mood: anticipation, the beginning of a journey. Cinematic, will be
> heavily darkened by an overlay so it can already be moody. **Negative space
> top-half** so the brand text on the LEFT panel reads cleanly.

---

## Optional Set 4 · Sectional accent images (if you want extras)

These aren't required but would give the design more depth. Generate only if you have time.

### 12. `accent-paddle.jpg` — for Notes / The Drop card thumbnails (**1:1 square · 600×600**)
> [style preamble] Top-down flat-lay of two pickleball paddles crossed over a
> ball, on a textured wood surface, soft natural window light, editorial
> still-life. Negative space around the edges.

### 13. `accent-court.jpg` — for Schedule calendar empty states (**3:2 · 1200×800**)
> [style preamble] Top-down or high-angle shot of an empty outdoor pickleball
> court, fresh paint lines, late-day shadows from the surrounding fence,
> minimalist, calming.

---

## How to share them back with me

When you've generated and chosen the best variant per image:

1. Save them with the exact filenames listed above (`hero-img-pb-1.jpg`, etc.)
2. Put them all in a single folder
3. Either:
   - **zip and attach** in this chat, OR
   - **upload to Google Drive / Dropbox** and paste the share link

Once I have them I'll:
- Drop them into `/Users/aadityanilesiphone/Documents/GoodhuePB-Wireframes/img/`
- Update `styles.css` to point `.hero-img-pb-*` and `.thumb-pb-*` and `.login-hero` at the local files (no more Unsplash dependency)
- Hard-refresh the wireframes — every empty area now has the right photo

---

## Quick consistency checklist (when picking variants in Firefly)

Pick the variant that:
- [ ] Has clear negative space on the side specified for text overlay
- [ ] Feels like the same photographer shot the whole set (similar light, depth, contrast)
- [ ] Shows real human moments — focused faces, natural body language
- [ ] Stays in the blue/violet/warm-gold palette family
- [ ] Avoids the "stock photo" aesthetic (no over-bright, over-clean, over-posed shots)

If two variants both look great, pick the more **understated** one. Heroes are
backgrounds — they shouldn't fight the text.
