# Audio

Real voice recordings the client sends (e.g. a product review voiceover)
go here. Client-provided media, not code — not committed to git (see
`.gitignore`).

For `GlanzenReview`, place the recorded narration here as:

```
glanzen-review.m4a
```

It must match the script in `src/GlanzenReview/beats.ts` (`GlanzenReview`
lays captions and mascot reactions on top of it timed by word-count
proportion against the file's total duration) — if you re-record with a
different script or pacing, update `beats.ts`'s beat boundaries and
`TOTAL_FRAMES` to match the new file's duration.
