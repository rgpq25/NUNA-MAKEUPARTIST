import { getImage } from "astro:assets";

import type { ImageAsset, OptimizedImageAsset } from "../types/images";

interface OptimizeImageOptions {
	format?: "avif" | "jpeg" | "jpg" | "png" | "webp";
	quality?: "low" | "mid" | "high" | "max" | number;
	sizes?: string;
	width?: number;
	widths?: number[];
}

export async function optimizeImage(
	imageAsset: ImageAsset,
	options: OptimizeImageOptions = {},
): Promise<OptimizedImageAsset> {
	const image = await getImage({
		src: imageAsset.src,
		format: options.format ?? "webp",
		quality: options.quality ?? "mid",
		inferSize: typeof imageAsset.src === "string",
		width: options.width,
		widths: options.widths,
		sizes: options.sizes,
	});

	return {
		title: imageAsset.title,
		description: imageAsset.description,
		src: image.src,
		srcSet: image.srcSet?.attribute,
		sizes:
			typeof image.attributes.sizes === "string"
				? image.attributes.sizes
				: options.sizes,
		width: Number(image.attributes.width),
		height: Number(image.attributes.height),
	};
}

export async function optimizeImages(
	imageAssets: ImageAsset[],
	options: OptimizeImageOptions = {},
): Promise<OptimizedImageAsset[]> {
	return Promise.all(
		imageAssets.map((imageAsset) => optimizeImage(imageAsset, options)),
	);
}
