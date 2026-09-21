import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile } from "remotion";
import { CLIPS, CLIPS_TOTAL_FRAMES, OUTRO_FRAMES } from "./clips";
import { Caption } from "./Caption";
import { ComboBadge } from "./ComboBadge";
import { Outro } from "./Outro";
import type { ThirtyShineReelProps } from "./schema";

const FADE_FRAMES = 15;
const COMBO_DELAY_FRAMES = 20;
// Index of the clip (0-based) whose services caption gets the combo badge.
const COMBO_CLIP_INDEX = 2;

type SfxCue = {
  readonly frame: number;
  readonly src: string;
  readonly volume: number;
  readonly durationInFrames: number;
};

export const ThirtyShineReel: React.FC<ThirtyShineReelProps> = ({
  captions,
  comboHighlight,
  outroHeadline,
  outroSubline,
  outroCta,
  strokeColor,
  highlightColor,
  textColor,
}) => {
  const clipStarts: number[] = [];
  let cursor = 0;
  for (const clip of CLIPS) {
    clipStarts.push(cursor);
    cursor += clip.frames;
  }

  const sfxCues: SfxCue[] = [];
  clipStarts.forEach((start, i) => {
    if (i > 0) {
      sfxCues.push({ frame: start, src: "sfx/whoosh.wav", volume: 0.5, durationInFrames: 20 });
    }
    sfxCues.push({ frame: start, src: "sfx/pop.wav", volume: 0.55, durationInFrames: 10 });
  });
  sfxCues.push({
    frame: clipStarts[COMBO_CLIP_INDEX] + COMBO_DELAY_FRAMES,
    src: "sfx/pop.wav",
    volume: 0.42,
    durationInFrames: 10,
  });
  sfxCues.push({
    frame: CLIPS_TOTAL_FRAMES,
    src: "sfx/chime.wav",
    volume: 0.7,
    durationInFrames: 30,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {CLIPS.map((clip, i) => (
        <Sequence key={clip.src} from={clipStarts[i]} durationInFrames={clip.frames}>
          <OffthreadVideo
            src={staticFile(clip.src)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Caption
            text={captions[i]}
            accentColor={strokeColor}
            textColor={textColor}
            fadeInFrames={FADE_FRAMES}
            holdFrames={clip.frames - FADE_FRAMES * 2}
            fadeOutFrames={FADE_FRAMES}
          />
          {i === COMBO_CLIP_INDEX && (
            <ComboBadge
              text={comboHighlight}
              accentColor={highlightColor}
              delayFrames={COMBO_DELAY_FRAMES}
              holdFrames={clip.frames - COMBO_DELAY_FRAMES - FADE_FRAMES}
              fadeOutFrames={FADE_FRAMES}
            />
          )}
        </Sequence>
      ))}

      <Sequence from={CLIPS_TOTAL_FRAMES} durationInFrames={OUTRO_FRAMES}>
        <Outro
          headline={outroHeadline}
          subline={outroSubline}
          cta={outroCta}
          highlightColor={highlightColor}
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
