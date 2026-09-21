import { AbsoluteFill, Sequence } from "remotion";
import { TextBeat } from "./TextBeat";
import { displayFontFamily, bodyFontFamily } from "./fonts";
import type { ThirtyShinePromoProps } from "./schema";

const textShadow = "0 4px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.6)";

// Each beat is 60 frames (2s @ 30fps): fade in, hold, fade out.
const BEAT = 60;

export const ThirtyShinePromo: React.FC<ThirtyShinePromoProps> = ({
  brand,
  tagline,
  services,
  cta,
  accentColor,
  textColor,
}) => {
  const serviceItems = services
    .split("•")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <AbsoluteFill>
      {/* Beat 1: logo / brand name */}
      <Sequence from={0} durationInFrames={BEAT} layout="none">
        <TextBeat fadeInFrames={18} holdFrames={24} fadeOutFrames={18}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: displayFontFamily,
                fontWeight: 900,
                fontSize: 190,
                letterSpacing: 6,
                color: textColor,
                textShadow,
                lineHeight: 1,
              }}
            >
              {brand}
            </div>
            <div
              style={{
                margin: "28px auto 0",
                width: 160,
                height: 8,
                borderRadius: 4,
                backgroundColor: accentColor,
              }}
            />
          </div>
        </TextBeat>
      </Sequence>

      {/* Beat 2: tagline, with a slight zoom-in entrance */}
      <Sequence from={BEAT} durationInFrames={BEAT} layout="none">
        <TextBeat fadeInFrames={18} holdFrames={24} fadeOutFrames={18} zoom>
          <div
            style={{
              fontFamily: displayFontFamily,
              fontWeight: 900,
              fontSize: 92,
              letterSpacing: 1,
              color: textColor,
              textShadow,
              textAlign: "center",
              lineHeight: 1.15,
              padding: "0 80px",
              textTransform: "uppercase",
            }}
          >
            {tagline}
          </div>
        </TextBeat>
      </Sequence>

      {/* Beat 3: services list */}
      <Sequence from={BEAT * 2} durationInFrames={BEAT} layout="none">
        <TextBeat fadeInFrames={18} holdFrames={24} fadeOutFrames={18}>
          <div
            style={{
              fontFamily: bodyFontFamily,
              fontWeight: 800,
              fontSize: 52,
              color: textColor,
              textShadow,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {serviceItems.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </TextBeat>
      </Sequence>

      {/* Beat 4: call to action */}
      <Sequence from={BEAT * 3} durationInFrames={BEAT} layout="none">
        <TextBeat fadeInFrames={18} holdFrames={32} fadeOutFrames={10}>
          <div
            style={{
              fontFamily: bodyFontFamily,
              fontWeight: 800,
              fontSize: 54,
              letterSpacing: 1,
              color: "#0B0B0B",
              textAlign: "center",
              lineHeight: 1.3,
              backgroundColor: accentColor,
              padding: "36px 56px",
              borderRadius: 24,
              boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
              maxWidth: 880,
            }}
          >
            {cta}
          </div>
        </TextBeat>
      </Sequence>
    </AbsoluteFill>
  );
};
