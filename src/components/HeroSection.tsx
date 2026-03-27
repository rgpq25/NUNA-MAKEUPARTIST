import { motion, useReducedMotion } from "motion/react";

import type { OptimizedImageData } from "../types/images";

interface HeroSectionProps {
	brandTitle: string;
	brandSubtitle: string;
	headline: string;
	description: string;
	location: string;
	image: OptimizedImageData;
	imageAlt: string;
}

export default function HeroSection({
	brandTitle,
	brandSubtitle,
	headline,
	description,
	location,
	image,
	imageAlt,
}: HeroSectionProps) {
	const shouldReduceMotion = useReducedMotion();
	const leftMotion = shouldReduceMotion
		? {}
		: {
				initial: { opacity: 0, x: -40 },
				animate: { opacity: 1, x: 0 },
				transition: { duration: 1, delay: 0.5 },
			};
	const rightMotion = shouldReduceMotion
		? {}
		: {
				initial: { opacity: 0, x: 40 },
				animate: { opacity: 1, x: 0 },
				transition: { duration: 1, delay: 0.3 },
			};

	return (
		<section
			className="bg-[#faf8f5] px-5 md:px-10 lg:px-16"
			style={{
				// paddingTop:
				// 	"calc(var(--site-nav-height, 88px) + clamp(1.5rem, 3vw, 6rem))",
				// paddingBottom: "clamp(1.5rem, 3vw, 6rem)",
				marginTop: 'calc(var(--site-nav-height, 88px)'
			}}
		>
			<div className="mx-auto max-w-7xl py-5 md:py-10">
				<div className="overflow-hidden  grid grid-cols-1 items-start gap-6 sm:gap-8 md:gap-10 lg:gap-14 xl:gap-20 lg:h-[calc(100dvh-var(--site-nav-height,88px)-4.5rem)] lg:max-h-192 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center">
					<motion.div
						className="lg:h-full"
						{...leftMotion}
					>
						<div className="aspect-4/5 overflow-hidden bg-[#efe7dc] shadow-[0_24px_70px_rgba(42,42,42,0.08)] sm:aspect-5/6 lg:h-full lg:aspect-auto lg:max-h-192">
							<img
								src={image.src}
								srcSet={image.srcSet}
								sizes={image.sizes}
								width={image.width}
								height={image.height}
								alt={imageAlt}
								loading="eager"
								decoding="sync"
								fetchPriority="high"
								className="h-full w-full object-cover object-center"
							/>
						</div>
					</motion.div>

					<motion.div
						className="flex flex-col justify-center gap-3 self-center lg:gap-4"
						{...rightMotion}
					>
						<div className="space-y-2">
							<p className="font-['Montserrat'] text-[0.7rem] font-medium tracking-[0.3em] text-[#2a2a2a]/55 uppercase sm:text-[0.78rem]">
								{brandSubtitle}
							</p>
							<h1 className="font-['Cormorant_Garamond'] text-[clamp(3.4rem,12vw,6.6rem)] leading-[0.9] tracking-[0.06em] text-[#2a2a2a]">
								{brandTitle}
							</h1>
						</div>

						<h2 className=" font-['Cormorant_Garamond'] text-[clamp(2rem,6vw,3rem)] leading-[1.02] text-[#2a2a2a] italic">
							{headline}
						</h2>

						<p className="font-['Montserrat'] text-[0.85rem] sm:text-[0.98rem] text-[#2a2a2a]/72 md:text-base leading-6">
							{description}
						</p>

						<p className="border-l border-[#c9a96e]/50 pl-4 font-['Montserrat'] text-[0.70rem] sm:text-[0.80rem] leading-relaxed tracking-[0.18em] text-[#2a2a2a]/62 uppercase">
							{location}
						</p>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
