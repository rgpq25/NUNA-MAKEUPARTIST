import type { ImageMetadata } from "astro";

export type ImageSource = ImageMetadata | string;

export interface ImageAsset {
	src: ImageSource;
	title: string;
	description?: string;
}

export interface OptimizedImageData {
	src: string;
	srcSet?: string;
	sizes?: string;
	width: number;
	height: number;
}

export interface OptimizedImageAsset extends OptimizedImageData {
	title: string;
	description?: string;
}
