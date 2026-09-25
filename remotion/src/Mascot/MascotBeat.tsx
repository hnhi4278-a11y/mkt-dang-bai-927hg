import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BagMascot, type Expression } from "./BagMascot";

type FlyFrom = "bottom" | "left" | "right";

type MascotCharacterProps = {
  readonly expression: Expression;
  readonly bodyColor?: string;
  readonly bounce?: number;
};

type MascotBeatProps = {
  readonly expression: Expression;
  readonly flyFrom: FlyFrom;
  readonly delayFrames: number;
  readonly size?: number;
  readonly bodyColor?: string;
  readonly bottomOffset?: number;
  readonly character?: React.FC<MascotCharacterProps>;
};

// Flies the mascot in from off-screen with a bouncy overshoot, then keeps
// it gently bobbing/wobbling so it never sits perfectly still — the "never
// stand idle" note from the reference clip.
export const MascotBeat: React.FC<MascotBeatProps> = ({
  expression,
  flyFrom,
  delayFrames,
  size = 340,
  bodyColor = "#FF2E63",
  bottomOffset = 60,
  character: Character = BagMascot,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - delayFrames;

  const entry = spring({
    frame: localFrame,
    fps,
    config: { damping: 10, stiffness: 120, mass: 0.6 },
  });

  const startOffset =
    flyFrom === "bottom" ? { x: 0, y: 500 } : flyFrom === "left" ? { x: -500, y: 60 } : { x: 500, y: 60 };

  const x = interpolate(entry, [0, 1], [startOffset.x, 0]);
  const yFly = interpolate(entry, [0, 1], [startOffset.y, 0]);

  const idleBob = localFrame > 18 ? Math.sin((localFrame - 18) * 0.12) * 10 : 0;
  const idleTilt = localFrame > 18 ? Math.sin((localFrame - 18) * 0.09) * 4 : 0;
  const bounce = Math.max(0, Math.sin(Math.min(entry, 1) * Math.PI));

  const opacity = interpolate(localFrame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: bottomOffset }}>
      <div
        style={{
          width: size,
          height: size,
          opacity,
          transform: `translate(${x}px, ${yFly + idleBob}px) rotate(${idleTilt}deg)`,
        }}
      >
        <Character expression={expression} bodyColor={bodyColor} bounce={bounce} />
      </div>
    </AbsoluteFill>
  );
};
