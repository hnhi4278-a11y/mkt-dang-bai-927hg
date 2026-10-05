import React from 'react';
import {
  AbsoluteFill,
  Easing,
  getStaticFiles,
  interpolate,
  OffthreadVideo,
  Img,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {C} from './theme';
import {BODY} from './fonts';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/* ---------- cinematic layers ---------- */

export const Grain: React.FC<{opacity?: number}> = ({opacity = 0.09}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'overlay', opacity}}>
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={frame % 8} />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};

export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 45%, transparent 45%, rgba(0,0,0,.65) 100%)'}}
  />
);

export const LightLeak: React.FC<{at?: number}> = ({at = 0}) => {
  const frame = useCurrentFrame();
  const t = frame - at;
  const o = interpolate(t, [0, 8, 26], [0, 0.55, 0], clamp);
  const x = interpolate(t, [0, 26], [-30, 60], clamp);
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        opacity: o,
        mixBlendMode: 'screen',
        background: `radial-gradient(circle at ${x}% 30%, ${C.gold} 0%, rgba(242,195,107,.4) 22%, transparent 55%)`,
      }}
    />
  );
};

export const Letterbox: React.FC<{size?: number}> = ({size = 110}) => {
  const frame = useCurrentFrame();
  const h = interpolate(frame, [0, 14], [0, size], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <>
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: h, background: '#000'}} />
      <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: h, background: '#000'}} />
    </>
  );
};

/* ---------- B-roll: real clip if dropped in public/broll, else a designed fallback ---------- */

const available = () => {
  try {
    return new Set(getStaticFiles().map((f) => f.name));
  } catch {
    return new Set<string>();
  }
};

export const findBroll = (name: string): {kind: 'video' | 'image'; src: string} | null => {
  const files = available();
  for (const ext of ['mp4', 'mov', 'webm']) if (files.has(`broll/${name}.${ext}`)) return {kind: 'video', src: `broll/${name}.${ext}`};
  for (const ext of ['jpg', 'jpeg', 'png', 'webp']) if (files.has(`broll/${name}.${ext}`)) return {kind: 'image', src: `broll/${name}.${ext}`};
  return null;
};

export const Broll: React.FC<{name: string; fallback: React.ReactNode; startFrom?: number}> = ({name, fallback, startFrom = 0}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const found = findBroll(name);
  if (!found) return <>{fallback}</>;
  // slow push-in, slightly graded toward the teal palette
  const scale = interpolate(frame, [0, durationInFrames], [1.08, 1.18]);
  const style: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transform: `scale(${scale})`,
    filter: 'saturate(1.1) contrast(1.08) brightness(.88)',
  };
  return (
    <AbsoluteFill style={{background: C.ink}}>
      {found.kind === 'video' ? (
        <OffthreadVideo src={staticFile(found.src)} muted startFrom={startFrom} style={style} />
      ) : (
        <Img src={staticFile(found.src)} style={style} />
      )}
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(8,32,31,.35) 0%, rgba(8,32,31,0) 35%, rgba(8,32,31,.85) 100%)'}} />
    </AbsoluteFill>
  );
};

/* ---------- text ---------- */

// Word-by-word pop with blur, TikTok style.
export const Kinetic: React.FC<{
  text: string;
  delay?: number;
  size?: number;
  color?: string;
  highlight?: string[];
  weight?: number;
  stagger?: number;
  align?: 'left' | 'center';
}> = ({text, delay = 0, size = 96, color = C.text, highlight = [], weight = 900, stagger = 3, align = 'center'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = text.split(' ');
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        gap: `0 ${size * 0.26}px`,
        fontFamily: BODY,
        fontWeight: weight,
        fontSize: size,
        lineHeight: 1.12,
        color,
        textShadow: '0 6px 30px rgba(0,0,0,.45)',
      }}
    >
      {words.map((w, i) => {
        const s = spring({frame: frame - delay - i * stagger, fps, config: {damping: 13, stiffness: 160}});
        const hl = highlight.some((h) => w.toLowerCase().includes(h.toLowerCase()));
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              transform: `translateY(${(1 - s) * size * 0.7}px) scale(${0.7 + s * 0.3})`,
              opacity: Math.min(1, s * 1.4),
              filter: `blur(${(1 - Math.min(1, s)) * 12}px)`,
              color: hl ? C.gold : undefined,
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

// Subtitle bar: words light up in sequence like auto-captions.
export const Caption: React.FC<{text: string; delay?: number; perWord?: number}> = ({text, delay = 6, perWord = 5}) => {
  const frame = useCurrentFrame();
  const words = text.split(' ');
  const appear = interpolate(frame, [delay - 4, delay + 4], [0, 1], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: 70,
        right: 70,
        bottom: 230,
        textAlign: 'center',
        background: 'rgba(8,32,31,.72)',
        borderRadius: 28,
        padding: '18px 22px',
        opacity: appear,
        transform: `translateY(${(1 - appear) * 20}px)`,
        fontFamily: BODY,
        fontWeight: 800,
        fontSize: 50,
        lineHeight: 1.3,
      }}
    >
      {words.map((w, i) => {
        const on = frame >= delay + i * perWord;
        return (
          <span
            key={i}
            style={{
              color: on ? C.text : 'rgba(246,248,243,.35)',
              background: on && frame < delay + (i + 1) * perWord ? C.gold : 'transparent',
              ...(on && frame < delay + (i + 1) * perWord ? {color: C.ink} : {}),
              borderRadius: 10,
              padding: '0 8px',
              WebkitTextStroke: '1px rgba(0,0,0,.15)',
            }}
          >
            {w}{' '}
          </span>
        );
      })}
    </div>
  );
};

/* ---------- icons (inline SVG, stroke style) ---------- */

type IconName = 'pin' | 'bridge' | 'star' | 'clock' | 'bike' | 'canal' | 'store' | 'arrow' | 'flag' | 'drop';

export const Icon: React.FC<{name: IconName; size?: number; color?: string; stroke?: number}> = ({
  name,
  size = 64,
  color = C.ink,
  stroke = 2.2,
}) => {
  const p = {fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};
  const paths: Record<IconName, React.ReactNode> = {
    pin: (<><path {...p} d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" /><circle {...p} cx="12" cy="10" r="2.6" /></>),
    bridge: (<><path {...p} d="M2 16h20M4 16v4M20 16v4M4 16c2-5 6-7 8-7s6 2 8 7" /><path {...p} d="M8 12v4M12 9v7M16 12v4" /></>),
    star: <path {...p} fill={color} d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z" />,
    clock: (<><circle {...p} cx="12" cy="12" r="9" /><path {...p} d="M12 7v5l3 2" /></>),
    bike: (<><circle {...p} cx="5.5" cy="17" r="3" /><circle {...p} cx="18.5" cy="17" r="3" /><path {...p} d="M5.5 17l4-7h5l4 7M9.5 10L8 7H5M14.5 10l1.5-3h3" /></>),
    canal: (<><path {...p} d="M2 8c2.5 2 5 2 7.5 0s5-2 7.5 0 3.5 1.5 5 1" /><path {...p} d="M2 14c2.5 2 5 2 7.5 0s5-2 7.5 0 3.5 1.5 5 1" /></>),
    store: (<><path {...p} d="M3 9l1.5-5h15L21 9M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0zM5 13v8h14v-8" /><path {...p} d="M10 21v-5h4v5" /></>),
    arrow: <path {...p} d="M5 12h14M13 6l6 6-6 6" />,
    flag: <path {...p} d="M5 21V4M5 4h11l-2 4 2 4H5" />,
    drop: <path {...p} d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  );
};

/* ---------- step chip ---------- */

export const StepCard: React.FC<{n: string; title: string; sub: string; icon: IconName; delay?: number}> = ({
  n,
  title,
  sub,
  icon,
  delay = 4,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - delay, fps, config: {damping: 15, stiffness: 120}});
  const s2 = spring({frame: frame - delay - 8, fps, config: {damping: 12}});
  return (
    <div
      style={{
        position: 'absolute',
        left: 60,
        right: 60,
        top: 190,
        transform: `translateX(${(1 - s) * -900}px)`,
        display: 'flex',
        gap: 28,
        alignItems: 'center',
        fontFamily: BODY,
      }}
    >
      <div
        style={{
          width: 150,
          height: 150,
          borderRadius: 40,
          background: C.gold,
          display: 'grid',
          placeItems: 'center',
          transform: `rotate(${(1 - s2) * -40}deg) scale(${0.6 + s2 * 0.4})`,
          boxShadow: '0 20px 50px rgba(0,0,0,.4)',
          flexShrink: 0,
        }}
      >
        <Icon name={icon} size={92} />
      </div>
      <div style={{minWidth: 0}}>
        <div style={{color: C.leaf, fontSize: 34, fontWeight: 700, letterSpacing: 6, textTransform: 'uppercase'}}>{n}</div>
        <div style={{color: C.text, fontSize: 64, fontWeight: 900, lineHeight: 1.08, textShadow: '0 6px 24px rgba(0,0,0,.5)'}}>{title}</div>
        <div style={{color: C.muted, fontSize: 36, fontWeight: 500, marginTop: 8}}>{sub}</div>
      </div>
    </div>
  );
};

export {clamp};
