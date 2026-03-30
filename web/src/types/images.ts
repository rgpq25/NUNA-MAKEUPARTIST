import type { ImageMetadata } from "astro";

export interface ImageAsset {
	src: ImageMetadata | string;
	title: string;
	description?: string;
}

export interface OptimizedImageAsset {
	src: string;
	srcSet?: string;
	sizes?: string;
	width: number;
	height: number;
	title: string;
	description?: string;
}
