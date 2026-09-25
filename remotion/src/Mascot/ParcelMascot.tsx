export type Expression = "cheer" | "surprised" | "point";

type ParcelMascotProps = {
  readonly expression: Expression;
  readonly bounce?: number;
  readonly armPointDeg?: number;
};

// A shipping-box mascot — "hàng mới về" energy, fits a resale channel just
// as well as the bag. Kraft-box color, tape cross, a little party-flag
// accessory on top for the "with clothes/accessories" option.
export const ParcelMascot: React.FC<ParcelMascotProps> = ({
  expression,
  bounce = 0,
  armPointDeg = -35,
}) => {
  const squash = 1 - bounce * 0.12;
  const stretch = 1 + bounce * 0.12;
  const boxColor = "#C89B6D";
  const boxDark = "#A97C4F";
  const tape = "#F1E1C6";

  const eyeY = expression === "surprised" ? 178 : 180;
  const eyeR = expression === "surprised" ? 20 : 16;
  const pupilR = expression === "surprised" ? 9 : 8;

  const leftArmRotate = expression === "cheer" ? -145 : expression === "point" ? -15 : -20;
  const rightArmRotate =
    expression === "cheer" ? 145 : expression === "point" ? armPointDeg : 20;

  return (
    <svg viewBox="0 0 300 320" width="100%" height="100%">
      <g transform={`translate(150 300) scale(${stretch} ${squash}) translate(-150 -300)`}>
        <ellipse cx="150" cy="300" rx="85" ry="14" fill="rgba(0,0,0,0.18)" />

        {/* legs */}
        <rect x="120" y="272" width="24" height="30" rx="10" fill={boxDark} />
        <rect x="156" y="272" width="24" height="30" rx="10" fill={boxDark} />

        {/* left arm */}
        <g transform={`rotate(${leftArmRotate} 78 190)`}>
          <rect x="60" y="185" width="66" height="22" rx="11" fill={boxColor} />
        </g>
        {/* right arm */}
        <g transform={`rotate(${rightArmRotate} 222 190)`}>
          <rect x="174" y="185" width="66" height="22" rx="11" fill={boxColor} />
        </g>

        {/* party flag accessory */}
        <line x1="150" y1="70" x2="150" y2="30" stroke={boxDark} strokeWidth="6" strokeLinecap="round" />
        <path d="M 150 30 L 190 42 L 150 54 Z" fill="#FF2E63" />

        {/* box body */}
        <rect x="55" y="90" width="190" height="190" rx="18" fill={boxColor} />
        {/* box top flap shading */}
        <rect x="55" y="90" width="190" height="34" rx="18" fill="rgba(0,0,0,0.08)" />

        {/* tape cross */}
        <rect x="140" y="90" width="20" height="190" fill={tape} />
        <rect x="55" y="170" width="190" height="20" fill={tape} />

        {/* shipping label */}
        <rect x="72" y="230" width="58" height="34" rx="4" fill="#FFFFFF" />
        <line x1="80" y1="240" x2="122" y2="240" stroke="#B7B7B7" strokeWidth="4" />
        <line x1="80" y1="250" x2="110" y2="250" stroke="#B7B7B7" strokeWidth="4" />

        {/* cheeks */}
        <ellipse cx="104" cy="200" rx="14" ry="9" fill="#FF7A9C" opacity="0.5" />
        <ellipse cx="196" cy="200" rx="14" ry="9" fill="#FF7A9C" opacity="0.5" />

        {/* eyes */}
        <ellipse cx="124" cy={eyeY} rx={eyeR} ry={eyeR + 2} fill="#FFFFFF" />
        <ellipse cx="176" cy={eyeY} rx={eyeR} ry={eyeR + 2} fill="#FFFFFF" />
        {expression === "point" ? (
          <>
            <circle cx="129" cy={eyeY + 1} r={pupilR} fill="#16161A" />
            <circle cx="181" cy={eyeY + 1} r={pupilR} fill="#16161A" />
          </>
        ) : (
          <>
            <circle cx="124" cy={eyeY} r={pupilR} fill="#16161A" />
            <circle cx="176" cy={eyeY} r={pupilR} fill="#16161A" />
          </>
        )}

        {expression === "cheer" && (
          <>
            <path d="M 108 152 Q 124 138 140 150" stroke="#16161A" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M 160 150 Q 176 138 192 152" stroke="#16161A" strokeWidth="6" fill="none" strokeLinecap="round" />
          </>
        )}

        {/* mouth */}
        {expression === "surprised" ? (
          <ellipse cx="150" cy="206" rx="15" ry="19" fill="#16161A" />
        ) : expression === "cheer" ? (
          <path d="M 122 198 Q 150 232 178 198 Q 150 216 122 198 Z" fill="#16161A" />
        ) : (
          <path d="M 126 202 Q 150 220 174 202" stroke="#16161A" strokeWidth="8" fill="none" strokeLinecap="round" />
        )}
      </g>
    </svg>
  );
};
