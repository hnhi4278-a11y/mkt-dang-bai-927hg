import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  getStaticFiles,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {TransitionSeries, linearTiming, springTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {C, SHOP} from './theme';
import {BODY, DISPLAY} from './fonts';
import {Cam, MapArt, P} from './MapArt';
import {Broll, Caption, clamp, findBroll, Grain, Icon, Kinetic, Letterbox, LightLeak, StepCard, Vignette} from './ui';

const ease = Easing.bezier(0.6, 0.05, 0.25, 1);
const lerpCam = (a: Cam, b: Cam, t: number): Cam => ({k: a.k + (b.k - a.k) * t, x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t});

/* ---------- 1. Hook ---------- */
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, 90], [0, 1], {...clamp, easing: ease});
  const shake = Math.sin(frame * 1.7) * interpolate(frame, [0, 10], [10, 0], clamp);
  return (
    <AbsoluteFill style={{background: C.ink}}>
      <Broll
        name="hook"
        fallback={<MapArt progress={0} cam={lerpCam({k: 1.98, x: 222, y: 430}, {k: 1, x: 175, y: 450}, t)} dim={0.45} />}
      />
      <AbsoluteFill style={{justifyContent: 'center', padding: '0 70px', transform: `translateX(${shake}px)`}}>
        <Kinetic text="Lần đầu tới Mộc Nhi?" size={118} highlight={['Mộc', 'Nhi?']} />
        <div style={{height: 40}} />
        <Kinetic text="Xem hết clip này là không lạc!" size={64} weight={700} delay={22} color={C.leaf} />
      </AbsoluteFill>
      <LightLeak at={0} />
    </AbsoluteFill>
  );
};

/* ---------- 2. Brand ---------- */
const Brand: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = interpolate(frame, [4, 34], [0, 100], {...clamp, easing: ease});
  const rating = interpolate(frame, [30, 60], [0, SHOP.rating], clamp);
  const pop = spring({frame: frame - 34, fps, config: {damping: 12}});
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 40%, ${C.deep}, ${C.ink} 70%)`}}>
      <Broll name="shop" startFrom={60} fallback={null} />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', fontFamily: BODY}}>
        <div style={{color: C.leaf, fontSize: 38, fontWeight: 700, letterSpacing: 10, textTransform: 'uppercase', opacity: reveal / 100}}>
          Gội đầu dưỡng sinh
        </div>
        <div
          style={{
            fontFamily: DISPLAY,
            fontSize: 260,
            color: C.gold,
            lineHeight: 1.1,
            clipPath: `inset(0 ${100 - reveal}% 0 0)`,
            textShadow: '0 10px 60px rgba(242,195,107,.35)',
          }}
        >
          Mộc Nhi
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 22, transform: `scale(${pop})`, marginTop: 20}}>
          <span style={{fontSize: 120, fontWeight: 900, color: C.text, fontVariantNumeric: 'tabular-nums'}}>{rating.toFixed(1)}</span>
          <div>
            <div style={{display: 'flex', gap: 6}}>
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} style={{transform: `scale(${spring({frame: frame - 40 - i * 4, fps, config: {damping: 9}})})`}}>
                  <Icon name="star" size={58} color={C.gold} />
                </div>
              ))}
            </div>
            <div style={{color: C.muted, fontSize: 36, fontWeight: 500}}>{SHOP.reviews} đánh giá trên Google Maps</div>
          </div>
        </div>
      </AbsoluteFill>
      <Caption text="Tiệm Gội Đầu Mộc Nhi, 1065 đường Lò Gốm, Quận 6." delay={40} perWord={4} />
    </AbsoluteFill>
  );
};

/* ---------- 3. Route overview infographic ---------- */
const stops = [
  {icon: 'flag' as const, t: 'Cầu Hậu Giang', at: P.start},
  {icon: 'bridge' as const, t: 'Cầu Phạm Văn Chí', at: P.phamVanChi},
  {icon: 'bridge' as const, t: 'Cầu Lò Gốm', at: P.loGomBridge},
  {icon: 'pin' as const, t: 'Mộc Nhi', at: P.shop},
];
const Overview: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const prog = interpolate(frame, [10, 100], [0, 1], {...clamp, easing: Easing.inOut(Easing.quad)});
  return (
    <AbsoluteFill style={{background: C.ink}}>
      <MapArt progress={prog} cam={{k: 1, x: 165, y: 470}} />
      <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(8,32,31,.92) 0%, rgba(8,32,31,.5) 45%, transparent 70%)'}} />
      <div style={{position: 'absolute', top: 180, left: 60, right: 60, fontFamily: BODY}}>
        <Kinetic text="Toàn bộ lộ trình" size={84} align="left" />
        <div style={{display: 'flex', gap: 18, marginTop: 24}}>
          {[
            ['3', 'cây cầu'],
            ['4', 'chặng'],
            ['1', 'con kênh'],
          ].map(([n, l], i) => {
            const s = spring({frame: frame - 14 - i * 6, fps, config: {damping: 12}});
            return (
              <div key={l} style={{background: C.gold, color: C.ink, borderRadius: 26, padding: '14px 26px', transform: `scale(${s})`}}>
                <span style={{fontSize: 64, fontWeight: 900}}>{n}</span>
                <span style={{fontSize: 32, fontWeight: 700, marginLeft: 10}}>{l}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* vertical timeline that fills as the route draws */}
      <div style={{position: 'absolute', left: 80, top: 640, bottom: 420, width: 8, borderRadius: 4, background: 'rgba(255,255,255,.15)'}}>
        <div style={{width: '100%', height: `${prog * 100}%`, background: C.gold, borderRadius: 4}} />
      </div>
      {stops.map((s, i) => {
        const on = prog >= s.at - 0.001;
        const sp = spring({frame: frame - 10 - s.at * 90, fps, config: {damping: 12}});
        const top = 640 + i * ((1920 - 640 - 420) / 3) - 50;
        return (
          <div key={s.t} style={{position: 'absolute', left: 34, top, display: 'flex', alignItems: 'center', gap: 26, fontFamily: BODY}}>
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                background: on ? C.gold : C.deep,
                border: `4px solid ${C.gold}`,
                display: 'grid',
                placeItems: 'center',
                transform: `scale(${0.8 + sp * 0.2})`,
              }}
            >
              <Icon name={s.icon} size={56} color={on ? C.ink : C.gold} />
            </div>
            <div style={{fontSize: 46, fontWeight: 800, color: on ? C.text : C.muted, opacity: 0.4 + sp * 0.6}}>{s.t}</div>
          </div>
        );
      })}
      <Caption text="Đi qua ba cây cầu là tới." delay={30} />
    </AbsoluteFill>
  );
};

/* ---------- 4–7. Steps ---------- */
type StepDef = {
  broll: string;
  n: string;
  title: string;
  sub: string;
  icon: 'flag' | 'bridge' | 'canal' | 'bike';
  from: number;
  to: number;
  camA: Cam;
  camB: Cam;
  say: string;
};
const STEPS: StepDef[] = [
  {broll: 'step1', n: 'Bước 1', title: 'Dưới chân cầu Hậu Giang', sub: 'Điểm xuất phát', icon: 'flag', from: 0, to: 0.06,
   camA: {k: 1.86, x: 105, y: 590}, camB: {k: 1.49, x: 110, y: 560}, say: 'Bắt đầu từ dưới chân cầu Hậu Giang.'},
  {broll: 'step2', n: 'Bước 2', title: 'Tới cầu Phạm Văn Chí', sub: 'Chạy dọc kênh Rạch Lò Gốm', icon: 'canal', from: 0.06, to: P.phamVanChi,
   camA: {k: 1.49, x: 110, y: 560}, camB: {k: 1.36, x: 130, y: 490}, say: 'Chạy dọc kênh Rạch Lò Gốm, tới cầu Phạm Văn Chí.'},
  {broll: 'step3', n: 'Bước 3', title: 'Lên cầu Lò Gốm', sub: 'Qua cầu sang bên kia kênh', icon: 'bridge', from: P.phamVanChi, to: P.crossed,
   camA: {k: 1.36, x: 130, y: 470}, camB: {k: 1.49, x: 185, y: 365}, say: 'Chạy thẳng tới cầu Lò Gốm, lên cầu rồi xuống cầu.'},
  {broll: 'step4', n: 'Bước 4', title: 'Vào đường Lò Gốm', sub: 'Đi chậm, nhìn dãy nhà ven kênh', icon: 'bike', from: P.crossed, to: P.shop,
   camA: {k: 1.49, x: 185, y: 365}, camB: {k: 1.86, x: 214, y: 420}, say: 'Xuống cầu, chạy vào đường Lò Gốm, đi chậm lại nha.'},
];

const MiniMap: React.FC<{progress: number}> = ({progress}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - 10, fps, config: {damping: 14}});
  return (
    <div
      style={{
        position: 'absolute',
        right: 50,
        top: 470,
        width: 300,
        height: 420,
        borderRadius: 36,
        overflow: 'hidden',
        border: `5px solid ${C.gold}`,
        boxShadow: '0 20px 60px rgba(0,0,0,.5)',
        transform: `scale(${s})`,
        transformOrigin: 'top right',
      }}
    >
      <MapArt progress={progress} cam={{k: 1, x: 165, y: 470}} showLabels={false} />
    </div>
  );
};

const Step: React.FC<{d: StepDef}> = ({d}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = interpolate(frame, [6, durationInFrames - 10], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const progress = d.from + (d.to - d.from) * t;
  const hasClip = !!findBroll(d.broll);
  return (
    <AbsoluteFill style={{background: C.ink}}>
      <Broll name={d.broll} fallback={<MapArt progress={progress} cam={lerpCam(d.camA, d.camB, t)} />} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(8,32,31,.85) 0%, transparent 28%, transparent 70%, rgba(8,32,31,.8) 100%)'}} />
      {hasClip && <MiniMap progress={progress} />}
      <StepCard n={d.n} title={d.title} sub={d.sub} icon={d.icon} />
      <Caption text={d.say} delay={14} />
    </AbsoluteFill>
  );
};

/* ---------- 8. Arrive ---------- */
const Storefront: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #6fb6c9 0%, #cfe7e4 55%, #8a9a95 56%, #5d6b67 100%)`}}>
      {/* building */}
      <div style={{position: 'absolute', left: 90, right: 90, top: 520, height: 900, background: '#d9d4c9', borderRadius: 12}} />
      {/* awning sign */}
      <div
        style={{
          position: 'absolute',
          left: 60,
          right: 60,
          top: 640,
          height: 190,
          background: '#1f7a63',
          borderRadius: 14,
          display: 'grid',
          placeItems: 'center',
          
          boxShadow: '0 20px 40px rgba(0,0,0,.25)',
        }}
      >
        <span style={{fontFamily: DISPLAY, fontSize: 110, color: '#f6f8f3'}}>Nối Mi Nails</span>
      </div>
      {/* glass door */}
      <div style={{position: 'absolute', left: 300, right: 300, top: 900, height: 520, background: 'linear-gradient(135deg,#9fc3c7,#5b7f86)', border: '10px solid #3a3f3e'}} />
      <div style={{position: 'absolute', left: 120, top: 980, width: 140, height: 140, borderRadius: 70, background: C.ink, display: 'grid', placeItems: 'center', opacity: 0.9}}>
        <span style={{fontFamily: DISPLAY, fontSize: 34, color: C.gold}}>Mộc Nhi</span>
      </div>
      {/* parked bikes */}
      {[0, 1, 2].map((i) => (
        <div key={i} style={{position: 'absolute', left: 130 + i * 290, top: 1270, transform: `translateX(${Math.sin((frame + i * 20) / 30) * 3}px)`}}>
          <Icon name="bike" size={200} color="#2b302f" stroke={1.6} />
        </div>
      ))}
    </AbsoluteFill>
  );
};

const Arrive: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const box = interpolate(frame, [14, 40], [0, 1], {...clamp, easing: ease});
  const pin = spring({frame: frame - 36, fps, config: {damping: 8, stiffness: 140}});
  const zoom = interpolate(frame, [0, 120], [1, 1.12]);
  const hasClip = !!findBroll('shop');
  return (
    <AbsoluteFill style={{background: C.ink}}>
      <AbsoluteFill style={{transform: `scale(${zoom})`}}>
        <Broll name="shop" fallback={<Storefront />} />
      </AbsoluteFill>
      {/* animated highlight box around the green sign (illustration only; a real clip won't line up) */}
      {!hasClip && <svg width="1080" height="1920" style={{position: 'absolute', inset: 0}}>
        <rect
          x="40"
          y="600"
          width="1000"
          height="270"
          rx="28"
          fill="none"
          stroke={C.gold}
          strokeWidth="12"
          strokeDasharray="2540"
          strokeDashoffset={2540 * (1 - box)}
        />
      </svg>}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 420,
          display: 'flex',
          justifyContent: 'center',
          transform: `translateY(${(1 - pin) * -500}px)`,
        }}
      >
        <div style={{background: C.pin, color: '#fff', fontFamily: BODY, fontWeight: 900, fontSize: 54, padding: '18px 36px', borderRadius: 999, display: 'flex', gap: 14, alignItems: 'center', boxShadow: '0 20px 50px rgba(0,0,0,.4)'}}>
          <Icon name="pin" size={56} color="#fff" stroke={2.6} /> Mộc Nhi ở đây!
        </div>
      </div>
      <div style={{position: 'absolute', top: 180, left: 60, right: 60}}>
        <Kinetic text="Thấy bảng hiệu xanh là tới!" size={84} highlight={['xanh']} delay={4} />
      </div>
      <Caption text="Bảng hiệu xanh Nối Mi Nails, Mộc Nhi ở ngay trong đó." delay={20} perWord={4} />
      <LightLeak at={36} />
    </AbsoluteFill>
  );
};

/* ---------- 9. Stats: gauge + bar chart ---------- */
const Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const g = interpolate(frame, [8, 50], [0, SHOP.rating / 5], {...clamp, easing: Easing.out(Easing.cubic)});
  const R = 190;
  const circ = 2 * Math.PI * R;
  const reviews = Math.round(interpolate(frame, [20, 60], [0, SHOP.reviews], clamp));
  const rows = [
    {icon: 'star' as const, k: 'Điểm Google', v: `${SHOP.rating} / 5`},
    {icon: 'store' as const, k: 'Lượt đánh giá', v: `${reviews}`},
    {icon: 'clock' as const, k: 'Mở cửa từ', v: SHOP.opens},
  ];
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 30%, ${C.deep}, ${C.ink} 70%)`, fontFamily: BODY}}>
      <div style={{position: 'absolute', top: 180, left: 60, right: 60}}>
        <Kinetic text="Khách nói gì về Mộc Nhi?" size={80} highlight={['Mộc', 'Nhi?']} />
      </div>
      <div style={{position: 'absolute', top: 450, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <svg width="480" height="480" viewBox="0 0 480 480">
          <circle cx="240" cy="240" r={R} stroke="rgba(255,255,255,.12)" strokeWidth="34" fill="none" />
          <circle
            cx="240"
            cy="240"
            r={R}
            stroke={C.gold}
            strokeWidth="34"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - g)}
            transform="rotate(-90 240 240)"
          />
          <text x="240" y="262" textAnchor="middle" fill={C.text} fontSize="130" fontWeight="900" fontFamily={BODY}>
            {(g * 5).toFixed(1)}
          </text>
          <text x="240" y="320" textAnchor="middle" fill={C.muted} fontSize="34" fontWeight="600" fontFamily={BODY}>
            trên 5 sao
          </text>
        </svg>
      </div>
      <div style={{position: 'absolute', top: 1000, left: 70, right: 70, display: 'flex', flexDirection: 'column', gap: 26}}>
        {rows.map((r, i) => {
          const s = spring({frame: frame - 30 - i * 8, fps, config: {damping: 14}});
          return (
            <div
              key={r.k}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 26,
                background: 'rgba(255,255,255,.07)',
                border: '2px solid rgba(255,255,255,.1)',
                borderRadius: 30,
                padding: '24px 34px',
                transform: `translateX(${(1 - s) * 700}px)`,
                opacity: s,
              }}
            >
              <div style={{width: 92, height: 92, borderRadius: 26, background: C.leaf, display: 'grid', placeItems: 'center'}}>
                <Icon name={r.icon} size={58} />
              </div>
              <div style={{flex: 1, color: C.muted, fontSize: 42, fontWeight: 600}}>{r.k}</div>
              <div style={{color: C.text, fontSize: 60, fontWeight: 900, fontVariantNumeric: 'tabular-nums'}}>{r.v}</div>
            </div>
          );
        })}
      </div>
      <Caption text="Gần năm sao trên Google, mở cửa từ chín giờ rưỡi." delay={40} perWord={4} />
    </AbsoluteFill>
  );
};

/* ---------- 10. Outro CTA ---------- */
const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - 4, fps, config: {damping: 13}});
  const chips = ['Lưu video lại', 'Tìm "Mộc Nhi" trên Google Maps', 'Gửi cho đứa bạn hay lạc'];
  return (
    <AbsoluteFill style={{background: C.ink, fontFamily: BODY}}>
      <MapArt progress={1} cam={{k: 1.4 + frame * 0.003, x: 214, y: 425}} dim={0.72} showLabels={false} />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', gap: 30, padding: '0 70px'}}>
        <div style={{fontFamily: DISPLAY, fontSize: 220, color: C.gold, transform: `scale(${s})`, lineHeight: 1}}>Mộc Nhi</div>
        <div style={{color: C.text, fontSize: 50, fontWeight: 800, textAlign: 'center', opacity: s}}>{SHOP.address}</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 20, marginTop: 30, alignItems: 'center'}}>
          {chips.map((c, i) => {
            const cs = spring({frame: frame - 16 - i * 7, fps, config: {damping: 12}});
            return (
              <div
                key={c}
                style={{
                  background: i === 0 ? C.gold : 'rgba(255,255,255,.1)',
                  color: i === 0 ? C.ink : C.text,
                  border: i === 0 ? 'none' : '2px solid rgba(255,255,255,.25)',
                  fontSize: 42,
                  fontWeight: 800,
                  padding: '20px 40px',
                  borderRadius: 999,
                  transform: `scale(${cs})`,
                  display: 'flex',
                  gap: 16,
                  alignItems: 'center',
                }}
              >
                <Icon name={i === 1 ? 'pin' : 'arrow'} size={44} color={i === 0 ? C.ink : C.gold} />
                {c}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ---------- timeline ---------- */
const D = {hook: 90, brand: 105, overview: 120, step: 105, arrive: 120, stats: 120, outro: 105};
const TR = 12;
export const TOTAL = D.hook + D.brand + D.overview + D.step * 4 + D.arrive + D.stats + D.outro - TR * 9;

const has = (name: string) => {
  try {
    return getStaticFiles().some((f) => f.name === name);
  } catch {
    return false;
  }
};

export const DuongDenMocNhi: React.FC = () => {
  const t = linearTiming({durationInFrames: TR});
  const st = springTiming({config: {damping: 200}, durationInFrames: TR});
  return (
    <AbsoluteFill style={{background: C.ink}}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={D.hook}><Hook /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={D.brand}><Brand /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({direction: 'from-left'})} timing={st} />
        <TransitionSeries.Sequence durationInFrames={D.overview}><Overview /></TransitionSeries.Sequence>
        {STEPS.map((d, i) => (
          <React.Fragment key={d.n}>
            <TransitionSeries.Transition presentation={slide({direction: i % 2 ? 'from-left' : 'from-right'})} timing={st} />
            <TransitionSeries.Sequence durationInFrames={D.step}><Step d={d} /></TransitionSeries.Sequence>
          </React.Fragment>
        ))}
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={D.arrive}><Arrive /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({direction: 'from-bottom'})} timing={st} />
        <TransitionSeries.Sequence durationInFrames={D.stats}><Stats /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={D.outro}><Outro /></TransitionSeries.Sequence>
      </TransitionSeries>
      <Letterbox size={70} />
      <Vignette />
      <Grain />
      {has('music.mp3') && <Audio src={staticFile('music.mp3')} volume={(f) => interpolate(f, [0, 20, TOTAL - 30, TOTAL], [0, 0.35, 0.35, 0], clamp)} />}
      {has('voice.mp3') && <Audio src={staticFile('voice.mp3')} />}
    </AbsoluteFill>
  );
};
