import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { displayFontFamily } from "../fonts";

type BadgeProps = {
  readonly text: string;
  readonly accentColor: string;
  readonly delayFrames: number;
  readonly holdFrames: number;
  readonly fadeOutFrames: number;
};

// A highlighted white chip (bold navy text) that pops in on top of the
// frame, e.g. a combo package name or a social-proof callout.
export const Badge: React.FC<BadgeProps> = ({
  text,
  accentColor,
  delayFrames,
  holdFrames,
  fadeOutFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - delayFrames;
  const totalAfterDelay = holdFrames + fadeOutFrames;

  const pop = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.5 },
  });
  const scale = interpolate(pop, [0, 1], [0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(
    localFrame,
    [0, 6, totalAfterDelay - fadeOutFrames, totalAfterDelay],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    // Stays well clear of the top status-bar/tab area and inset from both
    // sides (TikTok safe zone).
    <AbsoluteFill
      style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 300 }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          fontFamily: displayFontFamily,
          fontWeight: 900,
          fontSize: 60,
          letterSpacing: 1,
          color: accentColor,
          backgroundColor: "#FFFFFF",
          padding: "18px 44px",
          borderRadius: 20,
          boxShadow: "0 14px 40px rgba(0,0,0,0.5)",
          textTransform: "uppercase",
          maxWidth: 880,
          textAlign: "center",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
