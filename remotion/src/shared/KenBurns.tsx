import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";

type KenBurnsProps = {
  readonly src: string;
  readonly durationInFrames: number;
  readonly panDirection?: "left" | "right";
};

// Slow zoom-in with a slight horizontal pan, so a still photo reads as
// motion instead of a static slide.
export const KenBurns: React.FC<KenBurnsProps> = ({
  src,
  durationInFrames,
  panDirection = "left",
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(progress, [0, 1], [1.0, 1.15]);
  const panPx = interpolate(
    progress,
    [0, 1],
    panDirection === "left" ? [0, -36] : [0, 36],
  );

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "black" }}>
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translateX(${panPx}px)`,
        }}
      />
    </AbsoluteFill>
  );
};
