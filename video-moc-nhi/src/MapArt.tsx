import React from 'react';
import {getLength, getPointAtLength} from '@remotion/paths';
import {useCurrentFrame} from 'remotion';
import {C} from './theme';
import {BODY} from './fonts';

// Schematic map (not to scale) in a 360x640 world.
const CANAL = 'M262 -20 C 222 180, 182 300, 176 420 S 156 600, 146 680';
export const ROUTE = 'M100 600 C 108 520, 122 440, 140 360 L 218 360 C 214 385, 211 408, 209 430';
const ROUTE_LEN = getLength(ROUTE);

// Route progress (0..1) at each landmark.
export const P = {start: 0, phamVanChi: 0.28, loGomBridge: 0.56, crossed: 0.82, shop: 1};

export type Cam = {k: number; x: number; y: number};

export const MapArt: React.FC<{progress: number; cam: Cam; dim?: number; showLabels?: boolean}> = ({
  progress,
  cam,
  dim = 0,
  showLabels = true,
}) => {
  const frame = useCurrentFrame();
  const pt = getPointAtLength(ROUTE, ROUTE_LEN * Math.max(0, Math.min(1, progress)));
  const pulse = (frame % 40) / 40;
  // center the camera point a bit above middle (caption sits low)
  const tx = 180 - cam.x * cam.k;
  const ty = 290 - cam.y * cam.k;
  const label = (x: number, y: number, t: string, color: string = C.gold, size = 11, weight = 800) => (
    <text x={x} y={y} fill={color} fontSize={size} fontWeight={weight} fontFamily={BODY} style={{paintOrder: 'stroke'}} stroke="rgba(8,32,31,.85)" strokeWidth={3}>
      {t}
    </text>
  );
  return (
    <svg viewBox="0 0 360 640" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{position: 'absolute', inset: 0}}>
      <defs>
        <path id="canal" d={CANAL} />
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g transform={`translate(${tx} ${ty}) scale(${cam.k})`}>
        <rect x="-400" y="-400" width="1200" height="1500" fill={C.land} />
        {/* city blocks */}
        <g fill="rgba(255,255,255,.035)">
          {Array.from({length: 60}).map((_, i) => {
            const x = ((i * 97) % 520) - 80;
            const y = ((i * 151) % 780) - 60;
            return <rect key={i} x={x} y={y} width={28 + (i % 4) * 8} height={20 + (i % 3) * 10} rx="3" />;
          })}
        </g>
        <g stroke="rgba(255,255,255,.09)" strokeWidth="9" fill="none">
          <path d="M-60 250 L 150 230" />
          <path d="M230 300 L 440 260" />
          <path d="M235 540 L 440 560" />
          <path d="M300 120 L 380 360" />
        </g>
        {/* named roads */}
        <path d="M-80 600 L 440 600" stroke={C.road} strokeOpacity=".9" strokeWidth="16" fill="none" />
        <path d="M-80 494 L 440 470" stroke={C.road} strokeOpacity=".8" strokeWidth="13" fill="none" />
        <use href="#canal" transform="translate(-40 0)" stroke={C.road} strokeOpacity=".75" strokeWidth="11" fill="none" />
        <use href="#canal" transform="translate(40 0)" stroke={C.road} strokeOpacity=".9" strokeWidth="13" fill="none" />
        {/* canal with moving shimmer */}
        <use href="#canal" stroke={C.water} strokeWidth="30" fill="none" />
        <use href="#canal" stroke="rgba(255,255,255,.35)" strokeWidth="2" strokeDasharray="6 22" strokeDashoffset={-frame * 0.8} fill="none" />
        {/* bridges */}
        <rect x="128" y="590" width="40" height="20" rx="3" fill="#cfd8d3" />
        <rect x="146" y="475" width="44" height="18" rx="3" fill="#cfd8d3" transform="rotate(-2.6 168 484)" />
        <rect x="132" y="352" width="96" height="16" rx="3" fill="#cfd8d3" />
        {showLabels && (
          <g>
            {label(196, 630, 'Đ. Hậu Giang', C.road, 10, 600)}
            {label(40, 628, 'Cầu Hậu Giang')}
            {label(-6, 480, 'Đ. Phạm Văn Chí', C.road, 9, 600)}
            {label(196, 504, 'Cầu Phạm Văn Chí')}
            {label(236, 350, 'Cầu Lò Gốm')}
            <g transform="translate(236 250) rotate(-70)">{label(0, 0, 'Đ. Lò Gốm', C.road, 10, 600)}</g>
            <g transform="translate(190 300) rotate(-72)">
              <text fill={C.ink} fontSize="9" fontWeight="700" fontFamily={BODY}>Rạch Lò Gốm</text>
            </g>
            {label(242, 432, 'Mộc Nhi', C.text, 13, 900)}
            {label(242, 446, '1065 Lò Gốm', C.muted, 9, 600)}
          </g>
        )}
        {/* route: faint full + bright drawn part */}
        <path d={ROUTE} stroke="rgba(242,195,107,.25)" strokeWidth="5" strokeDasharray="2 6" strokeLinecap="round" fill="none" />
        <path
          d={ROUTE}
          stroke={C.gold}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray={ROUTE_LEN}
          strokeDashoffset={ROUTE_LEN * (1 - Math.max(0, Math.min(1, progress)))}
          filter="url(#glow)"
        />
        {/* shop pin */}
        <g transform="translate(222 432)">
          <circle r={8 + pulse * 18} fill={C.pin} opacity={0.6 * (1 - pulse)} />
          <path d="M0 2 C -9 -8, -10 -12, -10 -16 A10 10 0 1 1 10 -16 C 10 -12, 9 -8, 0 2 Z" fill={C.pin} />
          <circle cy="-16" r="3.6" fill="#fff" />
        </g>
        {/* rider */}
        <g transform={`translate(${pt.x} ${pt.y})`}>
          <circle r="16" fill={C.blue} opacity=".25" />
          <circle r="8.5" fill={C.blue} stroke="#fff" strokeWidth="3" />
        </g>
      </g>
      {dim > 0 && <rect width="360" height="640" fill={C.ink} opacity={dim} />}
    </svg>
  );
};
