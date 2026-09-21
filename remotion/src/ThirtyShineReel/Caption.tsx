import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { bodyFontFamily } from "../fonts";

type CaptionProps = {
  readonly text: string;
  readonly accentColor: string;
  readonly textColor: string;
  readonly fadeInFrames: number;
  readonly holdFrames: number;
  readonly fadeOutFrames: number;
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
}) => {
  const frame = useCurrentFrame();
  const totalFrames = fadeInFrames + holdFrames + fadeOutFrames;

  const opacity = interpolate(
    frame,
    [0, fadeInFrames, fadeInFrames + holdFrames, totalFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 220 }}
    >
      <div
        style={{
          opacity,
          fontFamily: bodyFontFamily,
          fontWeight: 900,
          fontSize: 58,
          lineHeight: 1.3,
          textAlign: "center",
          color: textColor,
          WebkitTextStroke: `9px ${accentColor}`,
          paintOrder: "stroke fill",
          padding: "0 64px",
          maxWidth: 980,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
