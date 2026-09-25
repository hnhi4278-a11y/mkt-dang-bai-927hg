import { BagMascot, type Expression } from "./BagMascot";

type BagMascotStyledProps = {
  readonly expression: Expression;
  readonly bodyColor?: string;
  readonly bounce?: number;
  readonly armPointDeg?: number;
};

// Same bag mascot, dressed up: a knotted bandana across the top and a pair
// of cool sunglasses — the chosen "with clothes" option.
export const BagMascotStyled: React.FC<BagMascotStyledProps> = ({
  expression,
  bodyColor = "#FF2E63",
  bounce = 0,
  armPointDeg = -35,
}) => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <BagMascot
        expression={expression}
        bodyColor={bodyColor}
        bounce={bounce}
        armPointDeg={armPointDeg}
      />
      <svg
        viewBox="0 0 300 320"
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
      >
        {/* bandana across the top of the bag */}
        <path d="M 80 118 L 220 118 L 150 150 Z" fill="#FFE066" />
        <path d="M 80 118 L 220 118 L 220 108 L 80 108 Z" fill="#FFD23F" />
        {/* knot */}
        <circle cx="150" cy="118" r="10" fill="#FFD23F" />

        {/* sunglasses */}
        <rect x="96" y="140" width="44" height="26" rx="10" fill="#16161A" />
        <rect x="160" y="140" width="44" height="26" rx="10" fill="#16161A" />
        <rect x="140" y="148" width="20" height="8" fill="#16161A" />
        <rect x="100" y="146" width="12" height="8" rx="3" fill="rgba(255,255,255,0.35)" />
        <rect x="164" y="146" width="12" height="8" rx="3" fill="rgba(255,255,255,0.35)" />
      </svg>
    </div>
  );
};
