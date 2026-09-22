import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { displayFontFamily, bodyFontFamily } from "../fonts";

// Lightens a #rrggbb color by mixing in white, for a subtle same-hue
// gradient instead of fading toward black/gray.
function lighten(hex: string, amount: number): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

type OutroProps = {
  readonly headline: string;
  readonly subline: string;
  readonly cta: string;
  readonly phone: string;
  readonly brandColor: string;
  readonly textColor: string;
  readonly fadeInFrames: number;
  readonly holdFrames: number;
  readonly fadeToBlackFrames: number;
};

// Closing end-card: leaves the busy footage behind for a clean, readable
// call-to-action on a solid brand-navy background, with a white CTA pill
// (bold navy text) for a clear next step.
export const Outro: React.FC<OutroProps> = ({
  headline,
  subline,
  cta,
  phone,
  brandColor,
  textColor,
  fadeInFrames,
  holdFrames,
  fadeToBlackFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, fadeInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pop = spring({ frame, fps, config: { damping: 200 } });
  const scale = interpolate(pop, [0, 1], [0.85, 1]);
  const textOpacity = interpolate(frame, [0, fadeInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaPop = spring({
    frame: frame - fadeInFrames - 10,
    fps,
    config: { damping: 200 },
  });
  const ctaScale = interpolate(ctaPop, [0, 1], [0.8, 1]);
  const ctaOpacity = interpolate(ctaPop, [0, 1], [0, 1]);

  const phoneOpacity = interpolate(frame, [fadeInFrames + 22, fadeInFrames + 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const totalFrames = fadeInFrames + holdFrames;
  const blackOpacity = interpolate(
    frame,
    [totalFrames - fadeToBlackFrames, totalFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: bgOpacity,
        background: `linear-gradient(160deg, ${brandColor} 0%, ${lighten(brandColor, 0.22)} 100%)`,
      }}
    >
      <div
        style={{
          opacity: textOpacity,
          transform: `scale(${scale})`,
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontFamily: displayFontFamily,
            fontWeight: 900,
            fontSize: 74,
            color: textColor,
            lineHeight: 1.2,
            textShadow: "0 6px 20px rgba(0,0,0,0.5)",
          }}
        >
          {headline}
        </div>
        <div
          style={{
            marginTop: 24,
            fontFamily: bodyFontFamily,
            fontWeight: 800,
            fontSize: 38,
            color: textColor,
            opacity: 0.92,
          }}
        >
          {subline}
        </div>
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
            marginTop: 44,
            display: "inline-block",
            backgroundColor: "#FFFFFF",
            color: brandColor,
            fontFamily: bodyFontFamily,
            fontWeight: 900,
            fontSize: 40,
            letterSpacing: 1,
            padding: "22px 52px",
            borderRadius: 999,
            boxShadow: "0 14px 40px rgba(0,0,0,0.45)",
          }}
        >
          {cta}
        </div>
        <div
          style={{
            opacity: phoneOpacity,
            marginTop: 26,
            fontFamily: bodyFontFamily,
            fontWeight: 800,
            fontSize: 34,
            letterSpacing: 1,
            color: textColor,
            textShadow: "0 4px 14px rgba(0,0,0,0.5)",
          }}
        >
          📞 {phone}
        </div>
      </div>
      <AbsoluteFill style={{ backgroundColor: "black", opacity: blackOpacity }} />
    </AbsoluteFill>
  );
};
