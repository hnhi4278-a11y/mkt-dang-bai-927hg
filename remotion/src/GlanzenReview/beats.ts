import type { Expression } from "../Mascot/BagMascot";

// The real recorded voiceover — see public/audio/README.md. Its total
// duration (measured with ffprobe): 49.088s @ 30fps.
export const AUDIO_DURATION_SECONDS = 49.088;
export const FPS = 30;
export const TOTAL_FRAMES = Math.round(AUDIO_DURATION_SECONDS * FPS);

export type Beat = {
  readonly start: number; // frame, inclusive
  readonly caption: string;
  readonly expression: Expression;
  readonly photo: string;
};

// Beat boundaries are estimated by word-count proportion against the
// audio's total duration (no word-level timestamps from the recording) —
// close enough for reaction timing, but re-time by ear against the actual
// file if a beat visibly drifts from the voice.
const SCRIPT: { readonly words: number; readonly caption: string; readonly expression: Expression; readonly photo: string }[] = [
  {
    words: 24,
    caption: "Hôm nay mình cầm trên tay sáp Glänzen 🙌",
    expression: "cheer",
    photo: "photos/glanzen-1.jpg",
  },
  {
    words: 27,
    caption: "Sáp vuốt tóc kiểu matte, không bóng dầu",
    expression: "point",
    photo: "photos/glanzen-2.jpg",
  },
  {
    words: 23,
    caption: "Bơ hạt mỡ • Dầu oliu • Jojoba dưỡng tóc mỗi lần vuốt",
    expression: "cheer",
    photo: "photos/glanzen-3.jpg",
  },
  {
    words: 26,
    caption: "Giữ form lâu mà vẫn mềm tự nhiên, không cứng gồng",
    expression: "surprised",
    photo: "photos/glanzen-4.jpg",
  },
  {
    words: 26,
    caption: "Để lại thông tin, mình gửi link mua ngay 👇",
    expression: "point",
    photo: "photos/glanzen-4.jpg",
  },
];

const TOTAL_WORDS = SCRIPT.reduce((sum, b) => sum + b.words, 0);

let cumulativeWords = 0;
export const BEATS: Beat[] = SCRIPT.map((b) => {
  const start = Math.round((cumulativeWords / TOTAL_WORDS) * TOTAL_FRAMES);
  cumulativeWords += b.words;
  return { start, caption: b.caption, expression: b.expression, photo: b.photo };
});
