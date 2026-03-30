import { motion } from "motion/react";
import { type ComponentProps } from "react";

import { getSectionHref } from "../lib/content-links";
import type { OptimizedImageAsset } from "../types/images";
import ExpandableImage from "./ExpandableImage";
import WorksPageHeader from "./WorksPageHeader";
import WorksPageLayout from "./WorksPageLayout";

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

interface PhotoshootGalleryPageProps {
	sectionSlug: string;
	sectionTitle: string;
	photoshoot: {
		title: string;
		description: string;
		images: OptimizedImageAsset[];
	};
}

export default function PhotoshootGalleryPage({
	sectionSlug,
	sectionTitle,
	photoshoot,
}: PhotoshootGalleryPageProps) {
	const buildGalleryItemMotion = (index: number) => {
		return {
			initial: { opacity: 0, y: 34, scale: 0.985 },
			whileInView: { opacity: 1, y: 0, scale: 1 },
			transition: {
				duration: 0.86,
				delay: Math.min(index, 5) * 0.08,
				ease: REVEAL_EASE,
			},
			viewport: { once: true, amount: 0.2 },
		};
	};

	const figureProps = (
		index: number,
	): ComponentProps<typeof motion.figure> => ({
		className:
			"group relative mb-3 md:mb-4 lg:mb-5 inline-block w-full break-inside-avoid overflow-hidden bg-[#efe6da]",
		...buildGalleryItemMotion(index),
	});

	return (
		<WorksPageLayout
			header={
				<WorksPageHeader
					className="mb-6 md:mb-8"
					contentClassName="space-y-2"
					backHref={getSectionHref(sectionSlug)}
					breadcrumbs={[
						{ label: "Works" },
						{
							label: sectionTitle,
							href: getSectionHref(sectionSlug),
						},
						{ label: photoshoot.title },
					]}
					title={photoshoot.title}
					description={photoshoot.description}
					titleClassName="text-4xl md:text-5xl lg:text-6xl"
				/>
			}
		>
			<div className="columns-1 gap-4 md:columns-2 md:gap-5 lg:columns-3 lg:gap-6">
				{photoshoot.images.map((image, imageIndex) => (
					<motion.figure
						key={`${image.src}-${imageIndex}`}
						{...figureProps(imageIndex)}
					>
						<ExpandableImage
							image={image}
							alt={image.title}
							imageClassName="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
							loading={imageIndex < 6 ? "eager" : "lazy"}
							decoding="async"
						/>

						<div className="pointer-events-none absolute left-4 top-4 border border-white/45 bg-white/12 px-3 py-2 font-['Montserrat'] text-[0.62rem] tracking-[0.24em] text-white uppercase backdrop-blur-sm">
							{String(imageIndex + 1).padStart(2, "0")}
						</div>
					</motion.figure>
				))}
			</div>
		</WorksPageLayout>
	);
}
