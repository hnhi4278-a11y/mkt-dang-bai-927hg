import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { MarketingVideoProps } from "./schema";

// A vertical (9:16) template suited for Facebook/TikTok/Instagram/Zalo posts.
export const MarketingVideo: React.FC<MarketingVideoProps> = ({
  title,
  subtitle,
  cta,
  backgroundColorFrom,
  backgroundColorTo,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 200 } });
  const titleTranslate = interpolate(titleIn, [0, 1], [40, 0]);
  const titleOpacity = interpolate(titleIn, [0, 1], [0, 1]);

  const subtitleIn = spring({
    frame: frame - 12,
    fps,
    config: { damping: 200 },
  });
  const subtitleOpacity = interpolate(subtitleIn, [0, 1], [0, 1]);

  const ctaIn = spring({ frame: frame - 24, fps, config: { damping: 200 } });
  const ctaScale = interpolate(ctaIn, [0, 1], [0.8, 1]);
  const ctaOpacity = interpolate(ctaIn, [0, 1], [0, 1]);

  // Fade the whole scene out just before the video ends.
  const outroOpacity = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames - 5],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${backgroundColorFrom} 0%, ${backgroundColorTo} 100%)`,
        opacity: outroOpacity,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: "0 90px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          transform: `translateY(${titleTranslate}px)`,
          opacity: titleOpacity,
          color: "white",
          fontSize: 84,
          fontWeight: 800,
          lineHeight: 1.15,
        }}
      >
        {title}
      </div>
      <div
        style={{
          opacity: subtitleOpacity,
          color: "rgba(255,255,255,0.85)",
          fontSize: 40,
          marginTop: 28,
        }}
      >
        {subtitle}
      </div>
      <div
        style={{
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
          marginTop: 64,
          backgroundColor: accentColor,
          color: "white",
          fontSize: 36,
          fontWeight: 700,
          padding: "20px 48px",
          borderRadius: 999,
        }}
      >
        {cta}
      </div>
    </AbsoluteFill>
  );
};
