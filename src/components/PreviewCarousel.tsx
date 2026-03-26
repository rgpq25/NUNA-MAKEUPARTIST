import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CTAButton from "./CTAButton";
import ResponsiveImage from "./ResponsiveImage";

interface PreviewCarouselProps {
	title: string;
	description: string;
	images: string[];
	href: string;
	reversed?: boolean;
}

export default function PreviewCarousel({
	title,
	description,
	images,
	href,
	reversed = false,
}: PreviewCarouselProps) {
	const [mounted, setMounted] = useState(false);
	const shouldReduceMotion = useReducedMotion();

	useEffect(() => {
		setMounted(true);
	}, []);

	const textMotion = shouldReduceMotion
		? {}
		: {
				initial: { opacity: 0, x: reversed ? 40 : -40 },
				whileInView: { opacity: 1, x: 0 },
				transition: { duration: 0.8 },
				viewport: { once: true },
			};
	const carouselMotion = shouldReduceMotion
		? {}
		: {
				initial: { opacity: 0, y: 40 },
				whileInView: { opacity: 1, y: 0 },
				transition: { duration: 0.8, delay: 0.2 },
				viewport: { once: true },
			};

	const settings = {
		dots: true,
		infinite: true,
		speed: shouldReduceMotion ? 0 : 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: !shouldReduceMotion,
		autoplaySpeed: 3000,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	const staticGallery = (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
			{images.map((img, index) => (
				<div key={index} className="overflow-hidden">
					<div className="aspect-3/4 overflow-hidden">
						<ResponsiveImage
							src={img}
							alt={`${title} ${index + 1}`}
							sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
							className="h-full w-full object-cover"
						/>
					</div>
				</div>
			))}
		</div>
	);

	return (
		<section className="px-8 md:px-16 pt-12 pb-16 md:pt-20 md:pb-20">
			<div className="mx-auto max-w-7xl">
				<div className="grid grid-cols-1 items-center gap-8 md:gap-10 lg:gap-20 lg:grid-cols-12">
					<motion.div
						className={`lg:col-span-4 ${reversed ? "lg:order-2" : ""}`}
						{...textMotion}
					>
						<h3 className="font-['Cormorant_Garamond'] text-[40px] tracking-wide text-[#2a2a2a] sm:text-5xl">
							{title}
						</h3>
						<p className="max-w-full sm:max-w-xl lg:max-w-full sm:mt-1 font-['Montserrat'] text-sm leading-relaxed text-[#2a2a2a]/70">
							{description}
						</p>
						<CTAButton href={href} variant="dark" className="mt-3">
							Ver todo
						</CTAButton>
					</motion.div>

					<motion.div
						className={`lg:col-span-8 ${reversed ? "lg:order-1" : ""}`}
						{...carouselMotion}
					>
						<div className="preview-carousel">
							{mounted ? (
								<Slider {...settings} >
									{images.map((img, index) => (
										<div key={index} className="px-2">
											<div className="aspect-3/4 overflow-hidden">
												<ResponsiveImage
													src={img}
													alt={`${title} ${index + 1}`}
													sizes="(max-width: 639px) 88vw, (max-width: 1023px) 48vw, 30vw"
													className="h-full w-full object-cover"
												/>
											</div>
										</div>
									))}
								</Slider>
							) : (
								staticGallery
							)}
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
