const KNOWN_IMAGE_ASPECT_RATIOS: Record<string, string> = {
  "/images/real-work/IMG_1600.jpeg": "8736 / 11648",
  "/images/real-work/IMG_2177.jpeg": "4284 / 5712",
  "/images/real-work/IMG_2178.jpeg": "4284 / 5712",
  "/images/real-work/IMG_2225.jpeg": "1179 / 1474",
  "/images/real-work/IMG_2228.jpeg": "1179 / 1474",
  "/images/real-work/IMG_2677.jpeg": "3648 / 5472",
  "/images/real-work/IMG_6510.jpeg": "3365 / 4206",
  "/images/real-work/IMG_6515.jpeg": "5568 / 6960",
  "/images/real-work/IMG_9284.jpeg": "1179 / 1474",
  "/images/real-work/IMG_9300.jpeg": "1179 / 1474",
  "/images/real-work/IMG_9320.jpeg": "1174 / 1467",
  "/images/real-work/IMG_9751.jpeg": "4000 / 6000",
  "/images/real-work/IMG_9757.jpeg": "3970 / 5955",
};

const FALLBACK_GALLERY_ASPECTS = ["3 / 4", "4 / 5", "2 / 3", "4 / 5", "5 / 7", "3 / 4"];

export function getGalleryImageAspectRatio(src: string, index: number) {
  return KNOWN_IMAGE_ASPECT_RATIOS[src] ?? FALLBACK_GALLERY_ASPECTS[index % FALLBACK_GALLERY_ASPECTS.length];
}
