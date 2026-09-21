import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import type { FadeTextProps } from "./schema";

// Text fades in, holds, then fades out. No background is set, so the
// composition stays transparent — render with an alpha-capable codec
// (see README) to get a transparent-background file.
export const FadeText: React.FC<FadeTextProps> = ({
  text,
  color,
  fontSize,
  fadeInFrames,
  holdFrames,
  fadeOutFrames,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [
      0,
      fadeInFrames,
      fadeInFrames + holdFrames,
      fadeInFrames + holdFrames + fadeOutFrames,
    ],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          opacity,
          color,
          fontSize,
          fontWeight: 700,
          fontFamily: "Arial, Helvetica, sans-serif",
          textAlign: "center",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
