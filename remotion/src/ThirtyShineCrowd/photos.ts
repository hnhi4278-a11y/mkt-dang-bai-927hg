// Photos go in public/photos/ (not committed — see public/photos/README.md).
export const PHOTOS = [
  "photos/crowd-1.jpg",
  "photos/crowd-2.jpg",
  "photos/crowd-3.jpg",
  "photos/crowd-4.jpg",
  "photos/crowd-5.jpg",
] as const;

export const PHOTO_DURATION = 75; // 2.5s @ 30fps
export const PHOTOS_TOTAL_FRAMES = PHOTOS.length * PHOTO_DURATION;

// Closing end-card, after the photos.
export const OUTRO_FRAMES = 90;

export const TOTAL_FRAMES = PHOTOS_TOTAL_FRAMES + OUTRO_FRAMES;
