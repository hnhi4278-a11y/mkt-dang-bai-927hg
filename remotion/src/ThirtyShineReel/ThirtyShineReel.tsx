import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";
import { CLIPS } from "./clips";
import { Caption } from "./Caption";
import type { ThirtyShineReelProps } from "./schema";

const FADE_FRAMES = 15;

export const ThirtyShineReel: React.FC<ThirtyShineReelProps> = ({
  captions,
  accentColor,
  textColor,
}) => {
  let from = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {CLIPS.map((clip, i) => {
        const sequence = (
          <Sequence key={clip.src} from={from} durationInFrames={clip.frames}>
            <OffthreadVideo
              src={staticFile(clip.src)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Caption
              text={captions[i]}
              accentColor={accentColor}
              textColor={textColor}
              fadeInFrames={FADE_FRAMES}
              holdFrames={clip.frames - FADE_FRAMES * 2}
              fadeOutFrames={FADE_FRAMES}
            />
          </Sequence>
        );
        from += clip.frames;
        return sequence;
      })}
    </AbsoluteFill>
  );
};
