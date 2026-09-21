# Footage

Raw video clips go here for compositions that render real footage (e.g.
`ThirtyShineReel`). These are client-provided assets, not code, so they
aren't committed to git (see `.gitignore`).

For `ThirtyShineReel`, place the 4 salon clips here as:

```
clip-1.mov
clip-2.mov
clip-3.mov
clip-4.mov
```

If you use different footage, update the frame counts in
`src/ThirtyShineReel/clips.ts` to match (get them with
`npx remotion ffprobe -- your-file.mov` — look for `nb_frames` per clip, or
`Duration` × fps).
