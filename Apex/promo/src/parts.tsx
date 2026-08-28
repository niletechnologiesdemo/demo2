import React from 'react';
import { AbsoluteFill, Img, staticFile, interpolate, useCurrentFrame, Easing } from 'remotion';
import { INK, FOREST, FOREST2, GOLD, GOLD2, GOLD3, CREAM } from './theme';

export const ease = Easing.bezier(0.22, 1, 0.36, 1);

/** fade + rise, the workhorse reveal */
export const rise = (frame: number, start: number, dur = 26, dist = 34) => {
  const t = interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease,
  });
  return { opacity: t, transform: `translateY(${(1 - t) * dist}px)` };
};

/** fade in then out, for scene-scoped elements */
export const window_ = (frame: number, a: number, b: number, fade = 18) =>
  interpolate(frame, [a, a + fade, b - fade, b], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease,
  });

/* ------------------------------------------------------------ background */
export const Background: React.FC = () => {
  const f = useCurrentFrame();
  const blob = (i: number, x: number, y: number, size: number, col: string, sp: number) => {
    const dx = Math.sin((f + i * 90) / (58 * sp)) * 90;
    const dy = Math.cos((f + i * 140) / (72 * sp)) * 70;
    return (
      <div key={i} style={{
        position: 'absolute', left: x + dx, top: y + dy, width: size, height: size,
        borderRadius: '50%', background: col, filter: 'blur(120px)', opacity: 0.5,
      }} />
    );
  };
  return (
    <AbsoluteFill style={{ background: `radial-gradient(1400px 900px at 20% 0%, ${FOREST2} 0%, ${FOREST} 45%, ${INK} 100%)` }}>
      {blob(0, -160, -120, 720, 'rgba(169,122,49,0.40)', 1)}
      {blob(1, 1180, 520, 640, 'rgba(210,162,84,0.26)', 1.4)}
      {blob(2, 420, 700, 560, 'rgba(18,59,49,0.85)', 0.8)}
      {/* fine grain keeps the gradients from banding */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05, mixBlendMode: 'overlay' }}>
        <filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" /></filter>
        <rect width="100%" height="100%" filter="url(#g)" />
      </svg>
      <AbsoluteFill style={{ background: 'radial-gradient(120% 100% at 50% 50%, transparent 45%, rgba(0,0,0,0.55) 100%)' }} />
    </AbsoluteFill>
  );
};

/* --------------------------------------------------- gold liquid streaks */
export const GoldSweep: React.FC<{ start: number; dur?: number; angle?: number; w?: number }> =
({ start, dur = 46, angle = 18, w = 420 }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [start, start + dur], [-0.35, 1.35], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease,
  });
  const o = interpolate(f, [start, start + 8, start + dur - 12, start + dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{ overflow: 'hidden', pointerEvents: 'none', opacity: o }}>
      <div style={{
        position: 'absolute', top: '-40%', height: '180%', width: w,
        left: `${p * 100}%`, transform: `rotate(${angle}deg)`,
        background: `linear-gradient(90deg, transparent, ${GOLD3}55 42%, ${GOLD2}88 52%, transparent)`,
        filter: 'blur(26px)',
      }} />
    </AbsoluteFill>
  );
};

/** slow-drifting gold motes */
export const Motes: React.FC<{ n?: number }> = ({ n = 26 }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {new Array(n).fill(0).map((_, i) => {
        const seed = (i * 9301 + 49297) % 233280 / 233280;
        const x = seed * 1920;
        const speed = 0.25 + seed * 0.5;
        const y = (1080 + 120 - ((f * speed * 6) + seed * 1400) % (1080 + 240));
        const s = 2 + seed * 4;
        const o = 0.15 + Math.abs(Math.sin((f + i * 30) / 40)) * 0.4;
        return <div key={i} style={{
          position: 'absolute', left: x, top: y, width: s, height: s, borderRadius: '50%',
          background: GOLD3, opacity: o, filter: 'blur(0.6px)',
          boxShadow: `0 0 ${s * 3}px ${GOLD2}`,
        }} />;
      })}
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- device */
export const Phone: React.FC<{
  screens: { src: string; from: number; to: number }[];
  style?: React.CSSProperties;
}> = ({ screens, style }) => {
  const f = useCurrentFrame();
  return (
    <div style={{
      width: 404, height: 874, borderRadius: 58, background: '#0E1114',
      padding: 12, position: 'relative',
      boxShadow: `0 60px 120px -40px rgba(0,0,0,0.85), 0 0 0 1px ${GOLD}55, 0 0 90px -20px ${GOLD}55`,
      ...style,
    }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 47, overflow: 'hidden', background: CREAM }}>
        {screens.map((s, i) => {
          const o = interpolate(f, [s.from, s.from + 16, s.to - 16, s.to], [0, 1, 1, 0], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease,
          });
          const k = interpolate(f, [s.from, s.to], [1.035, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          if (o <= 0) return null;
          return <Img key={i} src={staticFile(s.src)} style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', opacity: o, transform: `scale(${k})`,
          }} />;
        })}
      </div>
      {/* notch */}
      <div style={{
        position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)',
        width: 116, height: 30, borderRadius: 99, background: '#0E1114',
      }} />
    </div>
  );
};

/* ------------------------------------------------------------- type bits */
export const Kicker: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{
    fontSize: 19, fontWeight: 800, letterSpacing: '0.36em', textTransform: 'uppercase',
    color: GOLD2, ...style,
  }}>{children}</div>
);

export const FoilRule: React.FC<{ w?: number; style?: React.CSSProperties }> = ({ w = 200, style }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: w, ...style }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD2}, transparent)` }} />
    <div style={{ width: 6, height: 6, transform: 'rotate(45deg)', background: GOLD2 }} />
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD2}, transparent)` }} />
  </div>
);
