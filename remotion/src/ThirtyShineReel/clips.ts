// The 4 salon clips, in chronological order, with their exact frame counts
// at 30fps (from ffprobe) so each <Sequence> lines up frame-accurately with
// no black gaps or frozen last frames.
export const CLIPS = [
  { src: "footage/clip-1.mov", frames: 149 },
  { src: "footage/clip-2.mov", frames: 182 },
  { src: "footage/clip-3.mov", frames: 198 },
  { src: "footage/clip-4.mov", frames: 137 },
] as const;

export const TOTAL_FRAMES = CLIPS.reduce((sum, clip) => sum + clip.frames, 0);
