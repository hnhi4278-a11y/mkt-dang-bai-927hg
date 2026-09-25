import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { KenBurns } from "../shared/KenBurns";
import { Caption } from "../shared/Caption";
import { PointerArrow } from "../GlanzenPromo/PointerArrow";
import { ReviewMascot } from "./ReviewMascot";
import { BEATS, TOTAL_FRAMES } from "./beats";

const BRAND_COLOR = "#AE2930";
const TEXT_COLOR = "#FFFFFF";
const CAPTION_FADE = 10;

// Real voiceover (public/audio/glanzen-review.m4a) with the mascot reacting
// in the corner and captions synced to the script — see beats.ts for the
// timing. No background music: the real voice is the focus here, not an ad
// jingle.
export const GlanzenReview: React.FC = () => {
  const beatDurations = BEATS.map((beat, i) =>
    (i + 1 < BEATS.length ? BEATS[i + 1].start : TOTAL_FRAMES) - beat.start,
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Audio src={staticFile("audio/glanzen-review.m4a")} />

      {BEATS.map((beat, i) => (
        <Sequence key={i} from={beat.start} durationInFrames={beatDurations[i]}>
          <KenBurns
            src={staticFile(beat.photo)}
            durationInFrames={beatDurations[i]}
            panDirection={i % 2 === 0 ? "left" : "right"}
          />
          <Caption
            text={beat.caption}
            accentColor={BRAND_COLOR}
            textColor={TEXT_COLOR}
            fadeInFrames={CAPTION_FADE}
            holdFrames={Math.max(0, beatDurations[i] - CAPTION_FADE * 2)}
            fadeOutFrames={CAPTION_FADE}
            fontSize={40}
            punchy
          />
          {i === BEATS.length - 1 && (
            <PointerArrow
              text="Mua ngay"
              accentColor={BRAND_COLOR}
              fadeInFrames={20}
              holdFrames={Math.max(0, beatDurations[i] - 20)}
            />
          )}
        </Sequence>
      ))}

      <ReviewMascot beats={BEATS} />
    </AbsoluteFill>
  );
};
