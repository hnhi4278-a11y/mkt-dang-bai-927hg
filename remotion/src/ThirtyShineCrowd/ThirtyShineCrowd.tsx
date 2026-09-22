import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { PHOTOS, PHOTO_DURATION, PHOTOS_TOTAL_FRAMES, OUTRO_FRAMES } from "./photos";
import { KenBurns } from "../shared/KenBurns";
import { Caption } from "../shared/Caption";
import { Outro } from "../shared/Outro";
import type { ThirtyShineCrowdProps } from "./schema";

const FADE_FRAMES = 15;
// Photo indices (0-based) that get a caption; the rest are just the
// crowd shots on their own, kept clean per "ít chữ".
const INTRO_PHOTO_INDEX = 0;
const SOCIAL_PROOF_PHOTO_INDEX = 4;

type SfxCue = {
  readonly frame: number;
  readonly src: string;
  readonly volume: number;
  readonly durationInFrames: number;
};

export const ThirtyShineCrowd: React.FC<ThirtyShineCrowdProps> = ({
  introCaption,
  socialProofCaption,
  outroHeadline,
  outroSubline,
  outroCta,
  brandColor,
  textColor,
}) => {
  const photoStarts = PHOTOS.map((_, i) => i * PHOTO_DURATION);

  const sfxCues: SfxCue[] = [];
  photoStarts.forEach((start, i) => {
    if (i > 0) {
      sfxCues.push({ frame: start, src: "sfx/whoosh.wav", volume: 0.5, durationInFrames: 20 });
    }
  });
  sfxCues.push({
    frame: photoStarts[INTRO_PHOTO_INDEX],
    src: "sfx/pop.wav",
    volume: 0.55,
    durationInFrames: 10,
  });
  sfxCues.push({
    frame: photoStarts[SOCIAL_PROOF_PHOTO_INDEX],
    src: "sfx/pop.wav",
    volume: 0.55,
    durationInFrames: 10,
  });
  sfxCues.push({
    frame: PHOTOS_TOTAL_FRAMES,
    src: "sfx/chime.wav",
    volume: 0.7,
    durationInFrames: 30,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Audio src={staticFile("sfx/bg-music-crowd.wav")} volume={0.4} />

      {PHOTOS.map((src, i) => (
        <Sequence key={src} from={photoStarts[i]} durationInFrames={PHOTO_DURATION}>
          <KenBurns
            src={staticFile(src)}
            durationInFrames={PHOTO_DURATION}
            panDirection={i % 2 === 0 ? "left" : "right"}
          />
          {i === INTRO_PHOTO_INDEX && (
            <Caption
              text={introCaption}
              accentColor={brandColor}
              textColor={textColor}
              fadeInFrames={FADE_FRAMES}
              holdFrames={PHOTO_DURATION - FADE_FRAMES * 2}
              fadeOutFrames={FADE_FRAMES}
            />
          )}
          {i === SOCIAL_PROOF_PHOTO_INDEX && (
            <Caption
              text={socialProofCaption}
              accentColor={brandColor}
              textColor={textColor}
              fadeInFrames={FADE_FRAMES}
              holdFrames={PHOTO_DURATION - FADE_FRAMES * 2}
              fadeOutFrames={FADE_FRAMES}
            />
          )}
        </Sequence>
      ))}

      <Sequence from={PHOTOS_TOTAL_FRAMES} durationInFrames={OUTRO_FRAMES}>
        <Outro
          headline={outroHeadline}
          subline={outroSubline}
          cta={outroCta}
          brandColor={brandColor}
          textColor={textColor}
          fadeInFrames={15}
          holdFrames={OUTRO_FRAMES - 15}
          fadeToBlackFrames={12}
        />
      </Sequence>

      {sfxCues.map((cue, i) => (
        <Sequence key={`${cue.src}-${i}`} from={cue.frame} durationInFrames={cue.durationInFrames}>
          <Audio src={staticFile(cue.src)} volume={cue.volume} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
