import type { ImageMetadata } from "astro";

export type ImageSource = ImageMetadata | string;

export interface OptimizedImageData {
	src: string;
	srcSet?: string;
	sizes?: string;
	width: number;
	height: number;
}
