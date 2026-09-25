export type Expression = "cheer" | "surprised" | "point";

type HoodieBlobProps = {
  readonly expression: Expression;
  readonly bodyColor?: string;
  readonly bounce?: number;
  readonly armPointDeg?: number;
};

// A round, squishy blob mascot wearing a hoodie — a different silhouette
// from the bag mascot, same face-drawing language for a consistent family.
export const HoodieBlob: React.FC<HoodieBlobProps> = ({
  expression,
  bodyColor = "#00C2A8",
  bounce = 0,
  armPointDeg = -35,
}) => {
  const squash = 1 - bounce * 0.12;
  const stretch = 1 + bounce * 0.12;
  const darker = "#009E88";

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
        <rect x="118" y="270" width="26" height="34" rx="12" fill={darker} />
        <rect x="156" y="270" width="26" height="34" rx="12" fill={darker} />

        {/* left arm */}
        <g transform={`rotate(${leftArmRotate} 82 195)`}>
          <rect x="64" y="190" width="66" height="22" rx="11" fill={bodyColor} />
        </g>
        {/* right arm */}
        <g transform={`rotate(${rightArmRotate} 218 195)`}>
          <rect x="170" y="190" width="66" height="22" rx="11" fill={bodyColor} />
        </g>

        {/* hood (peeks out behind the head) */}
        <path
          d="M 90 130 Q 90 45 150 45 Q 210 45 210 130 L 195 150 Q 150 110 105 150 Z"
          fill={darker}
        />

        {/* main hoodie body */}
        <ellipse cx="150" cy="195" rx="105" ry="95" fill={bodyColor} />

        {/* hood opening / face field */}
        <ellipse cx="150" cy="178" rx="78" ry="66" fill={bodyColor} />

        {/* drawstrings */}
        <line x1="132" y1="215" x2="126" y2="255" stroke={darker} strokeWidth="6" strokeLinecap="round" />
        <line x1="168" y1="215" x2="174" y2="255" stroke={darker} strokeWidth="6" strokeLinecap="round" />
        <circle cx="126" cy="258" r="7" fill={darker} />
        <circle cx="174" cy="258" r="7" fill={darker} />

        {/* pocket */}
        <path d="M 108 245 Q 150 268 192 245" stroke={darker} strokeWidth="6" fill="none" strokeLinecap="round" />

        {/* cheeks */}
        <ellipse cx="102" cy="205" rx="14" ry="9" fill="#FF7A9C" opacity="0.55" />
        <ellipse cx="198" cy="205" rx="14" ry="9" fill="#FF7A9C" opacity="0.55" />

        {/* eyes */}
        <ellipse cx="122" cy={eyeY} rx={eyeR} ry={eyeR + 2} fill="#FFFFFF" />
        <ellipse cx="178" cy={eyeY} rx={eyeR} ry={eyeR + 2} fill="#FFFFFF" />
        {expression === "point" ? (
          <>
            <circle cx="127" cy={eyeY + 1} r={pupilR} fill="#16161A" />
            <circle cx="183" cy={eyeY + 1} r={pupilR} fill="#16161A" />
          </>
        ) : (
          <>
            <circle cx="122" cy={eyeY} r={pupilR} fill="#16161A" />
            <circle cx="178" cy={eyeY} r={pupilR} fill="#16161A" />
          </>
        )}

        {expression === "cheer" && (
          <>
            <path d="M 106 150 Q 122 136 138 148" stroke="#16161A" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M 162 148 Q 178 136 194 150" stroke="#16161A" strokeWidth="6" fill="none" strokeLinecap="round" />
          </>
        )}

        {/* mouth */}
        {expression === "surprised" ? (
          <ellipse cx="150" cy="228" rx="15" ry="19" fill="#16161A" />
        ) : expression === "cheer" ? (
          <path d="M 120 220 Q 150 258 180 220 Q 150 240 120 220 Z" fill="#16161A" />
        ) : (
          <path d="M 124 224 Q 150 244 176 224" stroke="#16161A" strokeWidth="8" fill="none" strokeLinecap="round" />
        )}
      </g>
    </svg>
  );
};
