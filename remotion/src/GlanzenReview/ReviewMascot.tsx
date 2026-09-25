import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BagMascotStyled } from "../Mascot/BagMascotStyled";
import type { Beat } from "./beats";

type ReviewMascotProps = {
  readonly beats: readonly Beat[];
};

// Docks in the corner for the whole clip (unlike MascotBeat, which flies
// off-screen between beats) — flies in once at the start, then reacts with
// a little bounce + expression swap at each beat boundary while gently
// bobbing in between, so it stays alive next to the real voiceover without
// competing with the caption/CTA area at the bottom.
export const ReviewMascot: React.FC<ReviewMascotProps> = ({ beats }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({ frame, fps, config: { damping: 11, stiffness: 110, mass: 0.6 } });
  const entryY = interpolate(entry, [0, 1], [260, 0]);
  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  let current = beats[0];
  for (const beat of beats) {
    if (frame >= beat.start) current = beat;
  }
  const localFrame = frame - current.start;

  const reactionBounce =
    localFrame < 14 ? Math.max(0, Math.sin(Math.min(localFrame / 14, 1) * Math.PI)) : 0;
  const idleBob = Math.sin(frame * 0.1) * 8;
  const idleTilt = Math.sin(frame * 0.07) * 3;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 30,
          top: "23%",
          width: 230,
          height: 230,
          opacity,
          transform: `translateY(${entryY + idleBob}px) rotate(${idleTilt}deg)`,
        }}
      >
        <BagMascotStyled expression={current.expression} bounce={reactionBounce} />
      </div>
    </AbsoluteFill>
  );
};
