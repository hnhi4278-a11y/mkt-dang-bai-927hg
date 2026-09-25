export type Expression = "cheer" | "surprised" | "point" | "idle";

type BagMascotProps = {
  readonly expression: Expression;
  readonly bodyColor?: string;
  readonly bounce?: number; // 0..1, vertical squash/stretch for a landing bounce
  readonly armPointDeg?: number; // for "point": angle of the pointing arm
};

// A round-cornered shopping-bag mascot, ties directly to a resale/affiliate
// channel's branding. Pure SVG (no raster assets), so it renders crisp at
// any size and is cheap to animate frame-by-frame in Remotion.
export const BagMascot: React.FC<BagMascotProps> = ({
  expression,
  bodyColor = "#FF2E63",
  bounce = 0,
  armPointDeg = -35,
}) => {
  const squash = 1 - bounce * 0.12;
  const stretch = 1 + bounce * 0.12;

  const eyeY = expression === "surprised" ? 150 : 152;
  const eyeR = expression === "surprised" ? 20 : 16;
  const pupilR = expression === "surprised" ? 9 : 8;

  const leftArmRotate =
    expression === "cheer" ? -150 : expression === "point" ? -10 : -15;
  const rightArmRotate =
    expression === "cheer"
      ? 150
      : expression === "point"
        ? armPointDeg
        : 15;

  return (
    <svg viewBox="0 0 300 320" width="100%" height="100%">
      <g transform={`translate(150 300) scale(${stretch} ${squash}) translate(-150 -300)`}>
        {/* shadow */}
        <ellipse cx="150" cy="300" rx="80" ry="14" fill="rgba(0,0,0,0.18)" />

        {/* left arm */}
        <g transform={`rotate(${leftArmRotate} 78 175)`}>
          <rect x="60" y="170" width="70" height="20" rx="10" fill={bodyColor} />
        </g>
        {/* right arm */}
        <g transform={`rotate(${rightArmRotate} 222 175)`}>
          <rect x="170" y="170" width="70" height="20" rx="10" fill={bodyColor} />
        </g>

        {/* bag handle */}
        <path
          d="M 105 95 Q 105 35 150 35 Q 195 35 195 95"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="16"
          strokeLinecap="round"
        />

        {/* bag body */}
        <path
          d="M 75 100 L 225 100 L 250 270 Q 250 290 230 290 L 70 290 Q 50 290 50 270 Z"
          fill={bodyColor}
        />
        {/* bag fold shading */}
        <path
          d="M 75 100 L 225 100 L 230 130 L 70 130 Z"
          fill="rgba(255,255,255,0.14)"
        />

        {/* cheeks */}
        <ellipse cx="98" cy="190" rx="14" ry="9" fill="#FF7A9C" opacity="0.55" />
        <ellipse cx="202" cy="190" rx="14" ry="9" fill="#FF7A9C" opacity="0.55" />

        {/* eyes */}
        <ellipse cx="118" cy={eyeY} rx={eyeR} ry={eyeR + 2} fill="#FFFFFF" />
        <ellipse cx="182" cy={eyeY} rx={eyeR} ry={eyeR + 2} fill="#FFFFFF" />
        {expression === "point" ? (
          <>
            <circle cx="123" cy={eyeY + 1} r={pupilR} fill="#16161A" />
            <circle cx="187" cy={eyeY + 1} r={pupilR} fill="#16161A" />
          </>
        ) : (
          <>
            <circle cx="118" cy={eyeY} r={pupilR} fill="#16161A" />
            <circle cx="182" cy={eyeY} r={pupilR} fill="#16161A" />
          </>
        )}

        {/* eyebrows (cheer only, for extra energy) */}
        {expression === "cheer" && (
          <>
            <path d="M 102 122 Q 118 108 134 120" stroke="#16161A" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M 166 120 Q 182 108 198 122" stroke="#16161A" strokeWidth="6" fill="none" strokeLinecap="round" />
          </>
        )}

        {/* mouth */}
        {expression === "surprised" ? (
          <ellipse cx="150" cy="205" rx="16" ry="20" fill="#16161A" />
        ) : expression === "cheer" ? (
          <path d="M 118 195 Q 150 235 182 195 Q 150 215 118 195 Z" fill="#16161A" />
        ) : (
          <path d="M 122 200 Q 150 222 178 200" stroke="#16161A" strokeWidth="8" fill="none" strokeLinecap="round" />
        )}
      </g>
    </svg>
  );
};
