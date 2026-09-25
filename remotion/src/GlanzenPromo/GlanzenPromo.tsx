import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { PHOTOS, PHOTO_DURATION, PHOTOS_TOTAL_FRAMES, OUTRO_FRAMES } from "./photos";
import { KenBurns } from "../shared/KenBurns";
import { Caption } from "../shared/Caption";
import { Badge } from "../shared/Badge";
import { Outro } from "../shared/Outro";
import { PulseTag } from "./PulseTag";
import { PointerArrow } from "./PointerArrow";
import type { GlanzenPromoProps } from "./schema";

const FADE_FRAMES = 15;
const BADGE_DELAY_FRAMES = 15;
// Photo index (0-based) that gets the "LIMITED" hook badge — the opening
// shot, for a scarcity hook in the first beat.
const HOOK_PHOTO_INDEX = 0;
// Last photo gets the bouncing pointer, right before the CTA end-card.
const POINTER_PHOTO_INDEX = PHOTOS.length - 1;

type SfxCue = {
  readonly frame: number;
  readonly src: string;
  readonly volume: number;
  readonly durationInFrames: number;
};

export const GlanzenPromo: React.FC<GlanzenPromoProps> = ({
  captions,
  hookBadge,
  outroHeadline,
  outroSubline,
  outroCta,
  outroPhone,
  brandColor,
  textColor,
}) => {
  const photoStarts = PHOTOS.map((_, i) => i * PHOTO_DURATION);

  const sfxCues: SfxCue[] = [];
  photoStarts.forEach((start, i) => {
    if (i > 0) {
      sfxCues.push({ frame: start, src: "sfx/whoosh.wav", volume: 0.5, durationInFrames: 20 });
    }
    sfxCues.push({ frame: start, src: "sfx/pop.wav", volume: 0.5, durationInFrames: 10 });
  });
  sfxCues.push({
    frame: PHOTOS_TOTAL_FRAMES,
    src: "sfx/chime.wav",
    volume: 0.7,
    durationInFrames: 30,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Audio src={staticFile("sfx/bg-music-glanzen.wav")} volume={0.4} />

      {PHOTOS.map((src, i) => (
        <Sequence key={src} from={photoStarts[i]} durationInFrames={PHOTO_DURATION}>
          <KenBurns
            src={staticFile(src)}
            durationInFrames={PHOTO_DURATION}
            panDirection={i % 2 === 0 ? "left" : "right"}
            punchIn
          />
          <Caption
            text={captions[i]}
            accentColor={brandColor}
            textColor={textColor}
            fadeInFrames={FADE_FRAMES}
            holdFrames={PHOTO_DURATION - FADE_FRAMES * 2}
            fadeOutFrames={FADE_FRAMES}
            punchy
          />
          <PulseTag text="🔥 HOT" accentColor={brandColor} />
          {i === HOOK_PHOTO_INDEX && (
            <Badge
              text={hookBadge}
              accentColor={brandColor}
              delayFrames={BADGE_DELAY_FRAMES}
              holdFrames={PHOTO_DURATION - BADGE_DELAY_FRAMES - FADE_FRAMES}
              fadeOutFrames={FADE_FRAMES}
            />
          )}
          {i === POINTER_PHOTO_INDEX && (
            <PointerArrow
              text="Chốt đơn ngay"
              accentColor={brandColor}
              fadeInFrames={20}
              holdFrames={PHOTO_DURATION - 20}
            />
          )}
        </Sequence>
      ))}

      <Sequence from={PHOTOS_TOTAL_FRAMES} durationInFrames={OUTRO_FRAMES}>
        <Outro
          headline={outroHeadline}
          subline={outroSubline}
          cta={outroCta}
          phone={outroPhone}
          brandColor={brandColor}
          textColor={textColor}
          fadeInFrames={15}
          holdFrames={OUTRO_FRAMES - 15}
          fadeToBlackFrames={12}
          pulseCta
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
