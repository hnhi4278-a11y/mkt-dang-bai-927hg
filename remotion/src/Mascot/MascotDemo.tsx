import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { MascotBeat } from "./MascotBeat";
import { displayFontFamily, bodyFontFamily } from "../fonts";

const BEAT = 75; // 2.5s @ 30fps
const PINK = "#FF2E63";

type Beat = {
  readonly title?: string;
  readonly sub: string;
  readonly expression: "cheer" | "surprised" | "point";
  readonly flyFrom: "bottom" | "left" | "right";
};

const BEATS: Beat[] = [
  { title: "SÀI GÌ BÁN ĐÓ", sub: "Có mascot mới rồi nè 🎉", expression: "cheer", flyFrom: "bottom" },
  { sub: "Thấy đồ hot là mê liền 👀", expression: "surprised", flyFrom: "left" },
  { sub: "Đồ ngon – bổ – rẻ, review liền tay", expression: "point", flyFrom: "right" },
  { sub: "Theo dõi kênh để không bỏ lỡ nha!", expression: "cheer", flyFrom: "bottom" },
];

const SketchFrame: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 40,
      border: "6px solid #16161A",
      borderRadius: 40,
    }}
  />
);

const BeatCaption: React.FC<{ title?: string; sub: string; frame: number }> = ({
  title,
  sub,
  frame,
}) => {
  const opacity = interpolate(frame, [0, 12, BEAT - 12, BEAT], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rise = interpolate(frame, [0, 12], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 130 }}>
      <div style={{ opacity, transform: `translateY(${rise}px)`, textAlign: "center", padding: "0 90px" }}>
        {title && (
          <div
            style={{
              fontFamily: displayFontFamily,
              fontWeight: 900,
              fontSize: 68,
              color: "#16161A",
              WebkitTextStroke: `4px ${PINK}`,
              paintOrder: "stroke fill",
              lineHeight: 1.15,
              marginBottom: 18,
            }}
          >
            {title}
          </div>
        )}
        <div
          style={{
            display: "inline-block",
            fontFamily: bodyFontFamily,
            fontWeight: 800,
            fontSize: 36,
            color: "#16161A",
            backgroundColor: "#FFE066",
            padding: "12px 26px",
            borderRadius: 14,
            boxShadow: "0 6px 0 rgba(0,0,0,0.12)",
          }}
        >
          {sub}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const DemoBeat: React.FC<Beat> = ({ title, sub, expression, flyFrom }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <BeatCaption title={title} sub={sub} frame={frame} />
      <MascotBeat expression={expression} flyFrom={flyFrom} delayFrames={0} bodyColor={PINK} />
    </AbsoluteFill>
  );
};

export const MascotDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFF8E7" }}>
      <SketchFrame />
      {BEATS.map((beat, i) => (
        <Sequence key={i} from={i * BEAT} durationInFrames={BEAT}>
          <DemoBeat {...beat} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
