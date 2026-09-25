import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { displayFontFamily } from "../fonts";

type PulseTagProps = {
  readonly text: string;
  readonly accentColor: string;
};

// A small corner tag that pulses continuously for the whole clip — the
// "🔥 HOT" style eye-catcher affiliate/product-ad edits keep on screen.
export const PulseTag: React.FC<PulseTagProps> = ({ text, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const popIn = spring({ frame, fps, config: { damping: 10, stiffness: 180 } });
  const introScale = interpolate(popIn, [0, 1], [0.3, 1]);
  const pulse = 1 + Math.sin(frame * 0.2) * 0.06;

  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
      <div
        style={{
          margin: "110px 0 0 64px",
          transform: `scale(${introScale * pulse})`,
          fontFamily: displayFontFamily,
          fontWeight: 900,
          fontSize: 40,
          color: "#FFFFFF",
          backgroundColor: accentColor,
          padding: "12px 26px",
          borderRadius: 14,
          boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
