import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { OptimizedImageData } from "../types/images";
import CTAButton from "./CTAButton";

interface PreviewCarouselProps {
	title: string;
	description: string;
	images: OptimizedImageData[];
	href: string;
	reversed?: boolean;
}

const AUTO_SCROLL_INTERVAL_MS = 3000;

export default function PreviewCarousel({
	title,
	description,
	images,
	href,
	reversed = false,
}: PreviewCarouselProps) {
	const shouldReduceMotion = useReducedMotion();
	const autoScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
		null,
	);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
	const [prevDisabled, setPrevDisabled] = useState(images.length < 2);
	const [nextDisabled, setNextDisabled] = useState(images.length < 2);
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: "start",
		dragFree: false,
		duration: shouldReduceMotion ? 0 : 25,
		loop: images.length > 1,
		skipSnaps: false,
		slidesToScroll: 1,
	});

	const textMotion = {
		initial: { opacity: 0, y: 40 },
		whileInView: { opacity: 1, y: 0 },
		transition: { duration: 0.4, delay: 0.2 },
		viewport: { once: true },
	};
	const carouselMotion = {
		initial: { opacity: 0, y: 40 },
		whileInView: { opacity: 1, y: 0 },
		transition: { duration: 0.4, delay: 0.2 },
		viewport: { once: true },
	};

	const clearAutoScroll = useCallback(() => {
		if (autoScrollTimeoutRef.current !== null) {
			clearTimeout(autoScrollTimeoutRef.current);
			autoScrollTimeoutRef.current = null;
		}
	}, []);

	const updateEmblaState = useCallback(() => {
		if (!emblaApi) {
			return;
		}

		setSelectedIndex(emblaApi.selectedScrollSnap());
		setScrollSnaps(emblaApi.scrollSnapList());
		setPrevDisabled(!emblaApi.canScrollPrev());
		setNextDisabled(!emblaApi.canScrollNext());
	}, [emblaApi]);

	const scheduleAutoScroll = useCallback(() => {
		clearAutoScroll();

		if (!emblaApi || shouldReduceMotion || images.length < 2) {
			return;
		}

		autoScrollTimeoutRef.current = setTimeout(() => {
			emblaApi.scrollNext();
		}, AUTO_SCROLL_INTERVAL_MS);
	}, [clearAutoScroll, emblaApi, images.length, shouldReduceMotion]);

	useEffect(() => {
		if (!emblaApi) {
			return;
		}

		updateEmblaState();
		scheduleAutoScroll();
		emblaApi
			.on("pointerDown", clearAutoScroll)
			.on("reInit", updateEmblaState)
			.on("reInit", scheduleAutoScroll)
			.on("select", updateEmblaState)
			.on("settle", scheduleAutoScroll);

		return () => {
			clearAutoScroll();
			emblaApi
				.off("pointerDown", clearAutoScroll)
				.off("reInit", updateEmblaState)
				.off("reInit", scheduleAutoScroll)
				.off("select", updateEmblaState)
				.off("settle", scheduleAutoScroll);
		};
	}, [clearAutoScroll, emblaApi, scheduleAutoScroll, updateEmblaState]);

	const scrollPrev = useCallback(() => {
		clearAutoScroll();
		emblaApi?.scrollPrev();
	}, [clearAutoScroll, emblaApi]);

	const scrollNext = useCallback(() => {
		clearAutoScroll();
		emblaApi?.scrollNext();
	}, [clearAutoScroll, emblaApi]);

	const scrollTo = useCallback(
		(index: number) => {
			clearAutoScroll();
			emblaApi?.scrollTo(index);
		},
		[clearAutoScroll, emblaApi],
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
						<div
							className="relative"
							onMouseEnter={clearAutoScroll}
							onMouseLeave={scheduleAutoScroll}
						>
							<div ref={emblaRef} className="overflow-hidden">
								<div className="-mx-2 flex touch-pan-y">
									{images.map((img, index) => (
										<div
											key={`${img.src}-${index}`}
											className="min-w-0 shrink-0 basis-full px-2 sm:basis-1/2 lg:basis-1/3"
										>
											<div className="aspect-3/4 overflow-hidden">
												<img
													src={img.src}
													srcSet={img.srcSet}
													sizes={img.sizes}
													width={img.width}
													height={img.height}
													alt={`${title} ${index + 1}`}
													className="h-full w-full object-cover"
													draggable={false}
													loading="lazy"
													decoding="async"
												/>
											</div>
										</div>
									))}
								</div>
							</div>

							{scrollSnaps.length > 1 ? (
								<>
									<button
										type="button"
										onClick={scrollPrev}
										disabled={prevDisabled}
										className="absolute top-1/2 -left-7.5 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center text-[#c9a96e]/50 transition hover:text-[#c9a96e] disabled:cursor-not-allowed disabled:opacity-30 md:-left-10"
										aria-label="Previous slide"
									>
										<ChevronLeft
											className="h-6 w-6"
											strokeWidth={1.75}
										/>
									</button>

									<button
										type="button"
										onClick={scrollNext}
										disabled={nextDisabled}
										className="absolute top-1/2 -right-7.5 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center text-[#c9a96e]/50 transition hover:text-[#c9a96e] disabled:cursor-not-allowed disabled:opacity-30 md:-right-10"
										aria-label="Next slide"
									>
										<ChevronRight
											className="h-6 w-6"
											strokeWidth={1.75}
										/>
									</button>

									<div className="absolute -bottom-9 md:-bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-2">
										{scrollSnaps.map((_, index) => {
											const isActive =
												index === selectedIndex;

											return (
												<button
													key={`${title}-dot-${index}`}
													type="button"
													onClick={() =>
														scrollTo(index)
													}
													className={`h-2 w-2 rounded-full bg-[#c9a96e] transition-opacity ${
														isActive
															? "opacity-100"
															: "opacity-30 hover:opacity-60"
													}`}
													aria-label={`Go to slide ${index + 1}`}
													aria-current={
														isActive
															? "true"
															: undefined
													}
												/>
											);
										})}
									</div>
								</>
							) : null}
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
