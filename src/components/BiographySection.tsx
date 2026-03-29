import { motion, useReducedMotion } from "motion/react";

import type { OptimizedImageData } from "../types/images";

interface BiographySectionProps {
	title: string;
	image: OptimizedImageData;
	imageAlt: string;
	paragraphs: string[];
	certificationsTitle: string;
	certifications: string[];
}

export default function BiographySection({
	title,
	image,
	imageAlt,
	paragraphs,
	certificationsTitle,
	certifications,
}: BiographySectionProps) {
	const shouldReduceMotion = useReducedMotion();
	const leftMotion = {
		initial: { opacity: 0, x: -40 },
		whileInView: { opacity: 1, x: 0 },
		transition: { duration: 0.4, delay: 0.2 },
		viewport: { once: true },
	};
	const rightMotion = {
		initial: { opacity: 0, x: 40 },
		whileInView: { opacity: 1, x: 0 },
		transition: { duration: 0.4, delay: 0.2 },
		viewport: { once: true },
	};

	return (
		<section className="bg-[#f5f2ed] px-8 md:px-16 py-14 md:py-24 lg:py-32">
			<div className="mx-auto max-w-7xl">
				<div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20">
					<motion.div className="order-2 lg:order-1" {...leftMotion}>
						<div className="aspect-3/4 overflow-hidden">
							<img
								src={image.src}
								srcSet={image.srcSet}
								sizes={image.sizes}
								width={image.width}
								height={image.height}
								alt={imageAlt}
								className="h-full w-full object-cover"
								loading="lazy"
								decoding="async"
							/>
						</div>
					</motion.div>

					<motion.div
						className="order-1 flex flex-col justify-center lg:order-2"
						{...rightMotion}
					>
						<h2 className="font-['Cormorant_Garamond'] text-5xl sm:text-6xl md:text-7xl tracking-wide text-[#2a2a2a]">
							{title}
						</h2>
						<div className="mt-3.5 space-y-2 md:space-y-6">
							{paragraphs.map((paragraph, idx) => (
								<p
									key={idx}
									className="font-['Montserrat'] text-base leading-relaxed text-[#2a2a2a]/70"
								>
									{paragraph}
								</p>
							))}
						</div>

						{certifications.length > 0 && (
							<div className="mt-5 border-t border-[#2a2a2a]/10 pt-5">
								<p className="mb-4 font-['Montserrat'] text-xs tracking-widest text-[#2a2a2a]/50 uppercase">
									{certificationsTitle}
								</p>
								<div className="space-y-2">
									{certifications.map(
										(certification, idx) => (
											<p
												key={idx}
												className="font-['Montserrat'] text-sm text-[#2a2a2a]/60"
											>
												• {certification}
											</p>
										),
									)}
								</div>
							</div>
						)}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
