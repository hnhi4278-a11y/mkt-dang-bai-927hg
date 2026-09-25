import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { bodyFontFamily } from "../fonts";

type CaptionProps = {
  readonly text: string;
  readonly accentColor: string;
  readonly textColor: string;
  readonly fadeInFrames: number;
  readonly holdFrames: number;
  readonly fadeOutFrames: number;
  // Bouncy scale-in entrance instead of a plain fade — more energetic,
  // affiliate/product-ad style. Off by default.
  readonly punchy?: boolean;
};

// TikTok-style burned-in caption: bold white fill with a thick colored
// outline, sitting in the lower third over the footage.
export const Caption: React.FC<CaptionProps> = ({
  text,
  accentColor,
  textColor,
  fadeInFrames,
  holdFrames,
  fadeOutFrames,
  punchy = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const totalFrames = fadeInFrames + holdFrames + fadeOutFrames;

  const opacity = interpolate(
    frame,
    [0, fadeInFrames, fadeInFrames + holdFrames, totalFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const bounce = spring({
    frame,
    fps,
    config: { damping: 9, stiffness: 160, mass: 0.5 },
    durationInFrames: fadeInFrames,
  });
  const scale = punchy ? interpolate(bounce, [0, 1], [0.4, 1]) : 1;

  return (
    // TikTok safe zone: the bottom ~260px and a ~150px strip on the right
    // are covered by the caption/username/action-button UI, so the text
    // block stays centered, clear of the bottom edge and inset from both
    // sides well past that right-side column.
    <AbsoluteFill
      style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 270 }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          fontFamily: bodyFontFamily,
          fontWeight: 900,
          fontSize: 56,
          lineHeight: 1.3,
          textAlign: "center",
          color: textColor,
          WebkitTextStroke: `9px ${accentColor}`,
          paintOrder: "stroke fill",
          padding: "0 96px",
          maxWidth: 900,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
