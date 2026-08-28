# Apex promo video

37s / 1920x1080 / 30fps, rendered with Remotion. No paid template, no After Effects.

    npm run preview        # live editor at localhost:3000, scrub the timeline
    npm run render         # writes out/apex-promo.mp4

**Screens** are captured from the live mockups, not pasted in by hand:

    node .claude/serve.js &        # from ../ , serves the mockups on :8741
    node capture.js                # re-shoots promo/screens/*.png

So when a screen changes, re-run `capture.js` then `npm run render` and the film is current.

**Timing** lives in `src/theme.ts` (`BEAT`) — every scene start/end in frames at 30fps.
**Copy** lives in the `BEATS` array in `src/ApexPromo.tsx`.

To add music, drop a track at `public/music.mp3` and add to `ApexPromo.tsx`:

    import { Audio, staticFile } from 'remotion';
    <Audio src={staticFile('music.mp3')} volume={0.7} />
