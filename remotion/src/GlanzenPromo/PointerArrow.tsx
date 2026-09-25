import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { bodyFontFamily } from "../fonts";

type PointerArrowProps = {
  readonly text: string;
  readonly accentColor: string;
  readonly fadeInFrames: number;
  readonly holdFrames: number;
};

// A bouncing down-arrow + short hint, bottom-left — the "look where the
// shop card/cart sits" nudge affiliate product videos use to drive clicks.
export const PointerArrow: React.FC<PointerArrowProps> = ({
  text,
  accentColor,
  fadeInFrames,
  holdFrames,
}) => {
  const frame = useCurrentFrame();
  const totalFrames = fadeInFrames + holdFrames;

  const opacity = interpolate(frame, [0, fadeInFrames, totalFrames - 10, totalFrames], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bounce = Math.abs(Math.sin(frame * 0.18)) * 14;

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "flex-start" }}>
      <div
        style={{
          opacity,
          margin: "0 0 130px 56px",
          transform: `translateY(${bounce}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <div
          style={{
            fontFamily: bodyFontFamily,
            fontWeight: 900,
            fontSize: 30,
            color: "#FFFFFF",
            WebkitTextStroke: `6px ${accentColor}`,
            paintOrder: "stroke fill",
          }}
        >
          {text}
        </div>
        <div style={{ fontSize: 40, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))" }}>
          👇
        </div>
      </div>
    </AbsoluteFill>
  );
};
