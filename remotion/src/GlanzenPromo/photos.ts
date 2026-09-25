// Photos go in public/photos/ (not committed — see public/photos/README.md).
export const PHOTOS = [
  "photos/glanzen-1.jpg",
  "photos/glanzen-2.jpg",
  "photos/glanzen-3.jpg",
  "photos/glanzen-4.jpg",
] as const;

export const PHOTO_DURATION = 90; // 3s @ 30fps
export const PHOTOS_TOTAL_FRAMES = PHOTOS.length * PHOTO_DURATION;

// Closing end-card, after the photos.
export const OUTRO_FRAMES = 90;

export const TOTAL_FRAMES = PHOTOS_TOTAL_FRAMES + OUTRO_FRAMES;
