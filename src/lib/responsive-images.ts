import {
	localImageManifest,
	type LocalImagePath,
} from "../data/local-image-manifest";

const LOCAL_IMAGE_ORIGINAL_WIDTH_LIMIT = 1920;
const UNSPLASH_WIDTHS = [480, 768, 1080, 1440, 1920] as const;

export interface ResponsiveImageSource {
	src: string;
	srcSet?: string;
	sizes?: string;
	width?: number;
	height?: number;
}

const hasOwn = <T extends object>(object: T, key: PropertyKey): key is keyof T =>
	Object.prototype.hasOwnProperty.call(object, key);

const isLocalResponsiveImage = (src: string): src is LocalImagePath =>
	hasOwn(localImageManifest, src);

const isUnsplashImage = (src: string) =>
	src.startsWith("https://images.unsplash.com/");

const buildLocalVariantPath = (src: string, width: number) =>
	src.replace(/\.webp$/i, `-${width}w.webp`);

const buildUnsplashVariantUrl = (src: string, width: number) => {
	const url = new URL(src);

	url.searchParams.set("fit", "max");
	url.searchParams.set("fm", "webp");
	url.searchParams.set("q", "75");
	url.searchParams.set("w", String(width));

	return url.toString();
};

export function getResponsiveImageSource(
	src: string,
	sizes: string,
): ResponsiveImageSource {
	if (isLocalResponsiveImage(src)) {
		const image = localImageManifest[src];
		const candidates = image.variants.map((width) => ({
			url: buildLocalVariantPath(src, width),
			width,
		}));
		const canUseOriginal = image.width <= LOCAL_IMAGE_ORIGINAL_WIDTH_LIMIT;
		const fallbackCandidate = candidates.at(-1);

		if (canUseOriginal) {
			candidates.push({ url: src, width: image.width });
		}

		return {
			src: canUseOriginal ? src : fallbackCandidate?.url ?? src,
			srcSet: candidates
				.map((candidate) => `${candidate.url} ${candidate.width}w`)
				.join(", "),
			sizes,
			width: image.width,
			height: image.height,
		};
	}

	if (isUnsplashImage(src)) {
		return {
			src: buildUnsplashVariantUrl(src, 1080),
			srcSet: UNSPLASH_WIDTHS.map(
				(width) => `${buildUnsplashVariantUrl(src, width)} ${width}w`,
			).join(", "),
			sizes,
		};
	}

	return { src };
}
