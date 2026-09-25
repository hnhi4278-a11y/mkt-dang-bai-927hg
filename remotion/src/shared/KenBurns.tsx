import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";

type KenBurnsProps = {
  readonly src: string;
  readonly durationInFrames: number;
  readonly panDirection?: "left" | "right";
  // Adds a fast "snap" zoom-out in the first ~10 frames on top of the
  // slow pan/zoom, for a punchier cut — the kind affiliate/product-ad
  // edits use instead of a plain hard cut. Off by default.
  readonly punchIn?: boolean;
};

// Slow zoom-in with a slight horizontal pan, so a still photo reads as
// motion instead of a static slide.
export const KenBurns: React.FC<KenBurnsProps> = ({
  src,
  durationInFrames,
  panDirection = "left",
  punchIn = false,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const baseScale = interpolate(progress, [0, 1], [1.0, 1.15]);
  const punch = punchIn
    ? interpolate(frame, [0, 10], [0.22, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;
  const scale = baseScale + punch;
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
