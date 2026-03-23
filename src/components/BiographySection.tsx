import { motion, useReducedMotion } from "motion/react";

interface BiographySectionProps {
	title: string;
	image: string;
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
	const leftMotion = shouldReduceMotion
		? {}
		: {
				initial: { opacity: 0, x: -40 },
				whileInView: { opacity: 1, x: 0 },
				transition: { duration: 0.8 },
				viewport: { once: true },
			};
	const rightMotion = shouldReduceMotion
		? {}
		: {
				initial: { opacity: 0, x: 40 },
				whileInView: { opacity: 1, x: 0 },
				transition: { duration: 0.8, delay: 0.2 },
				viewport: { once: true },
			};

	return (
		<section className="bg-[#f5f2ed] px-8 py-24 md:min-h-screen md:px-16 md:py-32">
			<div className="container mx-auto max-w-6xl">
				<div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-20">
					<motion.div className="order-2 md:order-1" {...leftMotion}>
						<div className="aspect-3/4 overflow-hidden">
							<img
								src={image}
								alt={imageAlt}
								className="h-full w-full object-cover"
							/>
						</div>
					</motion.div>

					<motion.div
						className="order-1 flex flex-col justify-center md:order-2"
						{...rightMotion}
					>
						<h2 className="mb-8 font-['Cormorant_Garamond'] text-6xl tracking-wide text-[#2a2a2a] md:text-7xl">
							{title}
						</h2>
						<div className="space-y-6">
							{paragraphs.map((paragraph, idx) => (
								<p
									key={idx}
									className="font-['Montserrat'] text-base leading-relaxed text-[#2a2a2a]/70"
								>
									{paragraph}
								</p>
							))}
						</div>

						<div className="mt-10 border-t border-[#2a2a2a]/10 pt-8">
							<p className="mb-4 font-['Montserrat'] text-xs tracking-widest text-[#2a2a2a]/50 uppercase">
								{certificationsTitle}
							</p>
							<div className="space-y-2">
								{certifications.map((certification, idx) => (
									<p
										key={idx}
										className="font-['Montserrat'] text-sm text-[#2a2a2a]/60"
									>
										• {certification}
									</p>
								))}
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
