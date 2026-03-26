export const localImageManifest = {
  "/images/real-work/IMG_1600.webp": {
    width: 8736,
    height: 11648,
    variants: [480, 768, 1024, 1440, 1920],
  },
  "/images/real-work/IMG_2166.webp": {
    width: 8736,
    height: 11648,
    variants: [480, 768, 1024, 1440, 1920],
  },
  "/images/real-work/IMG_2177.webp": {
    width: 4284,
    height: 5712,
    variants: [480, 768, 1024, 1440, 1920],
  },
  "/images/real-work/IMG_2178.webp": {
    width: 4284,
    height: 5712,
    variants: [480, 768, 1024, 1440, 1920],
  },
  "/images/real-work/IMG_2225.webp": {
    width: 1179,
    height: 1474,
    variants: [480, 768, 1024],
  },
  "/images/real-work/IMG_2228.webp": {
    width: 1179,
    height: 1474,
    variants: [480, 768, 1024],
  },
  "/images/real-work/IMG_2677.webp": {
    width: 3648,
    height: 5472,
    variants: [480, 768, 1024, 1440, 1920],
  },
  "/images/real-work/IMG_6510.webp": {
    width: 3365,
    height: 4206,
    variants: [480, 768, 1024, 1440, 1920],
  },
  "/images/real-work/IMG_6515.webp": {
    width: 5568,
    height: 6960,
    variants: [480, 768, 1024, 1440, 1920],
  },
  "/images/real-work/IMG_9284.webp": {
    width: 1179,
    height: 1474,
    variants: [480, 768, 1024],
  },
  "/images/real-work/IMG_9300.webp": {
    width: 1179,
    height: 1474,
    variants: [480, 768, 1024],
  },
  "/images/real-work/IMG_9320.webp": {
    width: 1174,
    height: 1467,
    variants: [480, 768, 1024],
  },
  "/images/real-work/IMG_9751.webp": {
    width: 4000,
    height: 6000,
    variants: [480, 768, 1024, 1440, 1920],
  },
  "/images/real-work/IMG_9757.webp": {
    width: 3970,
    height: 5955,
    variants: [480, 768, 1024, 1440, 1920],
  },
} as const;

export type LocalImagePath = keyof typeof localImageManifest;

export const localImagePaths = Object.keys(localImageManifest) as LocalImagePath[];
