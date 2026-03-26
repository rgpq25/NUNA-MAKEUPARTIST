import type { ImgHTMLAttributes } from "react";

import { getResponsiveImageSource } from "../lib/responsive-images";

type ResponsiveImageProps = Omit<
	ImgHTMLAttributes<HTMLImageElement>,
	"sizes" | "src" | "srcSet"
> & {
	sizes: string;
	src: string;
	priority?: boolean;
};

export default function ResponsiveImage({
	alt,
	decoding,
	fetchPriority,
	loading,
	priority = false,
	sizes,
	src,
	...rest
}: ResponsiveImageProps) {
	const image = getResponsiveImageSource(src, sizes);

	return (
		<img
			{...rest}
			alt={alt}
			decoding={decoding ?? "async"}
			fetchPriority={priority ? "high" : fetchPriority}
			height={image.height}
			loading={loading ?? (priority ? "eager" : "lazy")}
			sizes={image.srcSet ? image.sizes : undefined}
			src={image.src}
			srcSet={image.srcSet}
			width={image.width}
		/>
	);
}
