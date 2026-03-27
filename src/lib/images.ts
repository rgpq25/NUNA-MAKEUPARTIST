import { getImage } from "astro:assets";

import type { OptimizedImageData, ImageSource } from "../types/images";

interface OptimizeImageOptions {
	format?: "avif" | "jpeg" | "jpg" | "png" | "webp";
	quality?: "low" | "mid" | "high" | "max" | number;
	sizes?: string;
	width?: number;
	widths?: number[];
}

export async function optimizeImage(
	src: ImageSource,
	options: OptimizeImageOptions = {},
): Promise<OptimizedImageData> {
	const image = await getImage({
		src,
		format: options.format ?? "webp",
		quality: options.quality ?? "mid",
		inferSize: typeof src === "string",
		width: options.width,
		widths: options.widths,
		sizes: options.sizes,
	});

	return {
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
	sources: ImageSource[],
	options: OptimizeImageOptions = {},
): Promise<OptimizedImageData[]> {
	return Promise.all(
		sources.map((source) => optimizeImage(source, options)),
	);
}
