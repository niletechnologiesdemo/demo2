import React from 'react';
import { AbsoluteFill, Img, staticFile, Sequence, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/InstrumentSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PlusJakartaSans';
import { GOLD, GOLD2, GOLD3, CREAM, BEAT } from './theme';
import { Background, GoldSweep, Motes, Phone, Kicker, FoilRule, rise, window_, ease } from './parts';

const { fontFamily: SERIF } = loadSerif('normal', { subsets: ['latin'], weights: ['400'] });
const { fontFamily: SANS } = loadSans('normal', { subsets: ['latin'], weights: ['400', '600', '800'] });

const SCREENS = [
  { src: 'screens/01-welcome.png', from: 240, to: 404 },
  { src: 'screens/02-home.png',    from: 392, to: 586 },
  { src: 'screens/03-locked.png',  from: 574, to: 730 },
  { src: 'screens/04-plans.png',   from: 718, to: 852 },
  { src: 'screens/05-code.png',    from: 840, to: 970 },
  { src: 'screens/07-deals.png',   from: 958, to: 1020 },
];

/* left-hand copy, one block per beat */
const BEATS: { a: number; b: number; kicker: string; head: string; em?: string; sub?: string }[] = [
  { a: BEAT.s_home[0],  b: BEAT.s_home[1],  kicker: 'Apex Deals',    head: 'Every offer in London,', em: 'in one place.',
    sub: 'Twenty-six verified houses. Forty-six live offers. One membership.' },
  { a: BEAT.s_lock[0],  b: BEAT.s_lock[1],  kicker: 'Members only',  head: 'The value stays', em: 'hidden until you join.',
    sub: 'Browse the directory free. The discount is for members.' },
  { a: BEAT.s_plans[0], b: BEAT.s_plans[1], kicker: 'Ten pounds',    head: 'Ten times', em: 'back.',
    sub: 'Members using fifteen offers a month save around £104.' },
  { a: BEAT.s_code[0],  b: BEAT.s_code[1],  kicker: 'At the counter', head: 'One code,', em: 'verified in seconds.',
    sub: 'Unlock a deal, show the code, the business confirms it.' },
  { a: BEAT.s_deals[0], b: BEAT.s_deals[1], kicker: 'Apex Network',  head: 'Deals and', em: 'opportunities.',
    sub: 'The same businesses are hiring.' },
];

export const ApexPromo: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* the device rides in once and stays for the middle of the film */
  const inS  = spring({ frame: f - BEAT.phoneIn[0], fps, config: { damping: 200, mass: 1.1 } });
  const outT = interpolate(f, [BEAT.phoneIn[1] - 26, BEAT.phoneIn[1]], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });
  const phoneOpacity = inS * (1 - outT);
  const phoneY = (1 - inS) * 200 + outT * -120;
  const phoneRot = (1 - inS) * 9 - outT * 5;
  const phoneScale = 0.86 + inS * 0.14 - outT * 0.08;
  /* drifts gently from centre to the right as the copy comes in */
  const phoneX = interpolate(f, [BEAT.phoneIn[0], 400], [0, 400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });

  return (
    <AbsoluteFill style={{ fontFamily: SANS, backgroundColor: '#040D0A' }}>
      <Background />
      <Motes />

      {/* ---------------------------------------------------------- 1. logo */}
      <Sequence from={BEAT.logo[0]} durationInFrames={BEAT.logo[1] - BEAT.logo[0] + 20}>
        <LogoOpen />
      </Sequence>

      {/* ------------------------------------------------------- 2. tagline */}
      <Sequence from={BEAT.tagline[0]} durationInFrames={BEAT.tagline[1] - BEAT.tagline[0] + 10}>
        <Tagline />
      </Sequence>

      {/* --------------------------------------------------------- 3. phone */}
      {phoneOpacity > 0.001 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            opacity: phoneOpacity,
            transform: `translate(${phoneX}px, ${phoneY}px) scale(${phoneScale}) rotate(${phoneRot}deg)`,
          }}>
            <Phone screens={SCREENS} />
          </div>
        </AbsoluteFill>
      )}

      {/* ---------------------------------------------------- 4. copy beats */}
      {BEATS.map((b, i) => {
        const o = window_(f, b.a, b.b, 20);
        if (o <= 0.001) return null;
        return (
          <AbsoluteFill key={i} style={{ justifyContent: 'center', paddingLeft: 150, opacity: o }}>
            <div style={{ maxWidth: 690 }}>
              <div style={rise(f, b.a + 2, 24)}><Kicker>{b.kicker}</Kicker></div>
              <div style={{ ...rise(f, b.a + 8, 28), marginTop: 20 }}>
                <div style={{ fontFamily: SERIF, fontSize: 84, lineHeight: 1.06, color: CREAM, letterSpacing: '-0.02em' }}>
                  {b.head}<br /><span style={{ fontStyle: 'italic', color: GOLD3 }}>{b.em}</span>
                </div>
              </div>
              <div style={{ ...rise(f, b.a + 16, 28), marginTop: 26 }}>
                <FoilRule w={170} />
                <div style={{ marginTop: 22, fontSize: 25, lineHeight: 1.6, color: 'rgba(251,249,246,0.76)', maxWidth: 560 }}>
                  {b.sub}
                </div>
              </div>
            </div>
          </AbsoluteFill>
        );
      })}

      {/* sweeps land on the scene changes */}
      <GoldSweep start={BEAT.phoneIn[0] - 12} dur={54} />
      <GoldSweep start={BEAT.s_lock[0] - 14} dur={46} angle={-14} w={320} />
      <GoldSweep start={BEAT.s_code[0] - 14} dur={46} w={360} />

      {/* ---------------------------------------------------------- 5. outro */}
      <Sequence from={BEAT.outro[0]}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};

/* =========================================================== scene parts */

const LogoOpen: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 200, mass: 0.9 } });
  const out = interpolate(f, [104, 130], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });
  const glow = interpolate(f, [0, 40, 90], [0, 1, 0.55], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: out }}>
      <div style={{ transform: `scale(${0.72 + s * 0.28})`, filter: `drop-shadow(0 0 ${60 * glow}px ${GOLD}88)` }}>
        <Img src={staticFile('brand/logo-seal.png')} style={{ width: 300, opacity: s }} />
      </div>
      <div style={{ ...rise(f, 26, 30), marginTop: 44 }}>
        <Img src={staticFile('brand/logo-word-light.png')} style={{ width: 380 }} />
      </div>
      <div style={{ ...rise(f, 44, 30), marginTop: 30 }}>
        <Kicker style={{ fontSize: 16, letterSpacing: '0.44em' }}>Exclusive access &middot; London</Kicker>
      </div>
      <GoldSweep start={18} dur={64} w={520} />
    </AbsoluteFill>
  );
};

const Tagline: React.FC = () => {
  const f = useCurrentFrame();
  const out = interpolate(f, [110, 134], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: out, textAlign: 'center' }}>
      <div style={rise(f, 6, 30)}>
        <div style={{ fontFamily: SERIF, fontSize: 116, lineHeight: 1.02, color: CREAM, letterSpacing: '-0.025em' }}>
          London,
        </div>
        <div style={{ fontFamily: SERIF, fontSize: 116, lineHeight: 1.06, fontStyle: 'italic', color: GOLD3, letterSpacing: '-0.025em' }}>
          by membership.
        </div>
      </div>
      <div style={{ ...rise(f, 30, 30), marginTop: 40, display: 'flex', justifyContent: 'center' }}>
        <FoilRule w={260} />
      </div>
      <div style={{ ...rise(f, 42, 30), marginTop: 30, fontSize: 27, color: 'rgba(251,249,246,0.74)', maxWidth: 720 }}>
        A members-only network of verified British businesses.
      </div>
    </AbsoluteFill>
  );
};

const Outro: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 200, mass: 0.9 } });
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ transform: `scale(${0.84 + s * 0.16})`, opacity: s }}>
        <Img src={staticFile('brand/logo-lockup.png')} style={{ width: 330, filter: `drop-shadow(0 0 70px ${GOLD}66)` }} />
      </div>
      <div style={{ ...rise(f, 22, 28), marginTop: 34 }}>
        <div style={{ fontFamily: SERIF, fontSize: 52, color: CREAM, letterSpacing: '-0.015em' }}>
          Apex Deals <span style={{ color: GOLD2 }}>&middot;</span> Apex Network
        </div>
      </div>
      <div style={{ ...rise(f, 36, 28), marginTop: 30, display: 'flex', justifyContent: 'center' }}>
        <FoilRule w={230} />
      </div>
      <div style={{ ...rise(f, 46, 28), marginTop: 28 }}>
        <Kicker style={{ fontSize: 17, letterSpacing: '0.4em' }}>Exclusive access &middot; Trusted connections</Kicker>
      </div>
      <GoldSweep start={10} dur={70} w={560} />
    </AbsoluteFill>
  );
};
