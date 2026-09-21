import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type TextBeatProps = {
  readonly fadeInFrames: number;
  readonly holdFrames: number;
  readonly fadeOutFrames: number;
  readonly zoom?: boolean;
  readonly children: React.ReactNode;
};

// One "beat" of the timeline: fades in (optionally with a slight zoom),
// holds, then fades out. Meant to be used inside a <Sequence>, so
// useCurrentFrame() here is relative to that Sequence's start.
export const TextBeat: React.FC<TextBeatProps> = ({
  fadeInFrames,
  holdFrames,
  fadeOutFrames,
  zoom = false,
  children,
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

  const entrance = spring({
    frame,
    fps,
    durationInFrames: fadeInFrames,
    config: { damping: 200 },
  });
  const scale = zoom ? interpolate(entrance, [0, 1], [0.86, 1]) : 1;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ opacity, transform: `scale(${scale})` }}>{children}</div>
    </AbsoluteFill>
  );
};
