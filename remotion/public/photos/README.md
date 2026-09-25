# Photos

Photos go here for compositions that render real client photos (e.g.
`ThirtyShineCrowd`). These are client-provided assets (often with
identifiable people in them), not code, so they aren't committed to git
(see `.gitignore`).

For `ThirtyShineCrowd`, place the 5 photos here as:

```
crowd-1.jpg
crowd-2.jpg
crowd-3.jpg
crowd-4.jpg
crowd-5.jpg
```

Any resolution/aspect ratio works — `KenBurns` (`src/shared/KenBurns.tsx`)
crops to fill the 1080×1920 frame. If you use a different number of
photos, update `PHOTOS` and the caption-photo indices in
`src/ThirtyShineCrowd/photos.ts` / `ThirtyShineCrowd.tsx` to match.
