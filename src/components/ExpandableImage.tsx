import { X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
	type MouseEventHandler,
	type PointerEventHandler,
	useEffect,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "../lib/utils";
import type { OptimizedImageData } from "../types/images";

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;
const DRAG_THRESHOLD_PX = 10;
const OVERLAY_PADDING_MOBILE = 16;
const OVERLAY_PADDING_DESKTOP = 32;
const EXPAND_DURATION_MS = 520;
const CLOSE_DURATION_MS = 380;
const CLOSE_BACKDROP_DURATION_MS = 150;

interface Rect {
	top: number;
	left: number;
	width: number;
	height: number;
}

interface ViewportSize {
	width: number;
	height: number;
}

interface ExpandableImageProps {
	image: OptimizedImageData;
	alt: string;
	title: string;
	description?: string;
	onOpenChange?: (isOpen: boolean) => void;
	triggerClassName?: string;
	frameClassName?: string;
	imageClassName?: string;
	overlayImageClassName?: string;
	loading?: "eager" | "lazy";
	decoding?: "async" | "sync" | "auto";
	draggable?: boolean;
}

const getViewportSize = (): ViewportSize => ({
	width: window.innerWidth,
	height: window.innerHeight,
});

const getTargetRect = (
	viewport: ViewportSize,
	image: OptimizedImageData,
): Rect => {
	const padding =
		viewport.width >= 768
			? OVERLAY_PADDING_DESKTOP
			: OVERLAY_PADDING_MOBILE;
	const maxWidth = Math.max(viewport.width - padding * 2, 0);
	const maxHeight = Math.max(viewport.height - padding * 2, 0);
	const imageAspectRatio = image.width / image.height;
	let width = maxWidth;
	let height = width / imageAspectRatio;

	if (height > maxHeight) {
		height = maxHeight;
		width = height * imageAspectRatio;
	}

	return {
		top: Math.round((viewport.height - height) / 2),
		left: Math.round((viewport.width - width) / 2),
		width: Math.round(width),
		height: Math.round(height),
	};
};

export default function ExpandableImage({
	image,
	alt,
	title,
	description,
	onOpenChange,
	triggerClassName,
	frameClassName,
	imageClassName,
	overlayImageClassName,
	loading = "lazy",
	decoding = "async",
	draggable = false,
}: ExpandableImageProps) {
	const shouldReduceMotion = useReducedMotion();
	const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
	const [originRect, setOriginRect] = useState<Rect | null>(null);
	const [viewport, setViewport] = useState<ViewportSize | null>(null);
	const [isMounted, setIsMounted] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [isClosingBehindNav, setIsClosingBehindNav] = useState(false);
	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const closeButtonRef = useRef<HTMLButtonElement | null>(null);
	const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
	const suppressNextClickRef = useRef(false);
	const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const closeBackdropTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const animationFrameRef = useRef<number | null>(null);

	useEffect(() => {
		setPortalTarget(document.body);
		return () => {
			if (closeTimeoutRef.current) {
				clearTimeout(closeTimeoutRef.current);
			}
			if (closeBackdropTimeoutRef.current) {
				clearTimeout(closeBackdropTimeoutRef.current);
			}
			if (animationFrameRef.current !== null) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, []);

	useEffect(() => {
		if (!isMounted) {
			return;
		}

		const bodyStyle = document.body.style;
		const documentStyle = document.documentElement.style;
		const previousBodyOverflow = bodyStyle.overflow;
		const previousBodyTouchAction = bodyStyle.touchAction;
		const previousDocumentOverflow = documentStyle.overflow;

		bodyStyle.overflow = "hidden";
		bodyStyle.touchAction = "none";
		documentStyle.overflow = "hidden";
		closeButtonRef.current?.focus();

		const handleResize = () => {
			setViewport(getViewportSize());
			if (triggerRef.current) {
				const nextRect = triggerRef.current.getBoundingClientRect();
				setOriginRect({
					top: nextRect.top,
					left: nextRect.left,
					width: nextRect.width,
					height: nextRect.height,
				});
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.preventDefault();
				closeImage();
			}
		};

		window.addEventListener("resize", handleResize);
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("keydown", handleKeyDown);
			bodyStyle.overflow = previousBodyOverflow;
			bodyStyle.touchAction = previousBodyTouchAction;
			documentStyle.overflow = previousDocumentOverflow;
			triggerRef.current?.focus();
		};
	}, [isMounted]);

	const clearPointerTracking = () => {
		pointerStartRef.current = null;
	};

	const clearCloseTimeout = () => {
		if (closeTimeoutRef.current) {
			clearTimeout(closeTimeoutRef.current);
			closeTimeoutRef.current = null;
		}
	};

	const clearCloseBackdropTimeout = () => {
		if (closeBackdropTimeoutRef.current) {
			clearTimeout(closeBackdropTimeoutRef.current);
			closeBackdropTimeoutRef.current = null;
		}
	};

	const openImage = () => {
		if (!triggerRef.current) {
			return;
		}

		clearCloseTimeout();
		clearCloseBackdropTimeout();
		const nextRect = triggerRef.current.getBoundingClientRect();
		setOriginRect({
			top: nextRect.top,
			left: nextRect.left,
			width: nextRect.width,
			height: nextRect.height,
		});
		setViewport(getViewportSize());
		setIsClosing(false);
		setIsClosingBehindNav(false);
		setIsMounted(true);
		setIsVisible(false);
		onOpenChange?.(true);

		animationFrameRef.current = requestAnimationFrame(() => {
			setIsVisible(true);
			animationFrameRef.current = null;
		});
	};

	const closeImage = () => {
		if (!isMounted) {
			return;
		}

		clearPointerTracking();
		suppressNextClickRef.current = false;
		setIsClosing(true);
		setIsClosingBehindNav(false);
		setIsVisible(false);
		clearCloseTimeout();
		clearCloseBackdropTimeout();
		closeBackdropTimeoutRef.current = setTimeout(
			() => {
				setIsClosingBehindNav(true);
				closeBackdropTimeoutRef.current = null;
			},
			shouldReduceMotion ? 0 : CLOSE_BACKDROP_DURATION_MS,
		);
		closeTimeoutRef.current = setTimeout(
			() => {
				setIsMounted(false);
				setIsClosing(false);
				setIsClosingBehindNav(false);
				onOpenChange?.(false);
				closeTimeoutRef.current = null;
			},
			shouldReduceMotion ? 10 : CLOSE_DURATION_MS,
		);
	};

	const handlePointerDown: PointerEventHandler<HTMLButtonElement> = (
		event,
	) => {
		if (event.pointerType === "mouse" && event.button !== 0) {
			return;
		}

		suppressNextClickRef.current = false;
		pointerStartRef.current = {
			x: event.clientX,
			y: event.clientY,
		};
	};

	const handlePointerMove: PointerEventHandler<HTMLButtonElement> = (
		event,
	) => {
		if (!pointerStartRef.current) {
			return;
		}

		const deltaX = event.clientX - pointerStartRef.current.x;
		const deltaY = event.clientY - pointerStartRef.current.y;

		if (Math.hypot(deltaX, deltaY) >= DRAG_THRESHOLD_PX) {
			suppressNextClickRef.current = true;
		}
	};

	const handleTriggerClick: MouseEventHandler<HTMLButtonElement> = (
		event,
	) => {
		if (suppressNextClickRef.current) {
			event.preventDefault();
			suppressNextClickRef.current = false;
			clearPointerTracking();
			return;
		}

		clearPointerTracking();
		openImage();
	};

	const targetRect = viewport ? getTargetRect(viewport, image) : null;
	const activeRect =
		originRect && targetRect ? (isVisible ? targetRect : originRect) : null;
	const motionDurationMs = isClosing ? CLOSE_DURATION_MS : EXPAND_DURATION_MS;
	const animationTransition = shouldReduceMotion
		? { duration: 0 }
		: { duration: motionDurationMs / 1000, ease: REVEAL_EASE };
	const backdropTransition = shouldReduceMotion
		? { duration: 0 }
		: {
				duration: isClosing ? CLOSE_BACKDROP_DURATION_MS / 1000 : 0.2,
				ease: REVEAL_EASE,
		  };

	return (
		<>
			<button
				ref={triggerRef}
				type="button"
				className={cn(
					"group relative block w-full cursor-zoom-in text-left",
					triggerClassName,
					isMounted ? "pointer-events-none" : undefined,
				)}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerCancel={clearPointerTracking}
				onPointerLeave={clearPointerTracking}
				onPointerUp={clearPointerTracking}
				onClick={handleTriggerClick}
				aria-expanded={isMounted}
				aria-label={`Open image: ${title}`}
			>
				<div
					className={cn(
						"relative overflow-hidden bg-[#efe6da]",
						frameClassName,
						isMounted ? "opacity-0" : undefined,
					)}
				>
					<img
						src={image.src}
						srcSet={image.srcSet}
						sizes={image.sizes}
						width={image.width}
						height={image.height}
						alt={alt}
						loading={loading}
						decoding={decoding}
						draggable={draggable}
						className={cn(
							"block h-full w-full object-cover",
							imageClassName,
						)}
					/>
				</div>
			</button>

			{portalTarget && isMounted && activeRect
				? createPortal(
						<>
							<div
								className="fixed inset-0 z-80"
								role="dialog"
								aria-modal="true"
								aria-label={title}
							>
								<motion.div
									className="absolute inset-0 bg-[#120d09]/82 backdrop-blur-[3px]"
									initial={false}
									animate={{ opacity: isVisible ? 1 : 0 }}
									transition={backdropTransition}
									onClick={closeImage}
								/>

								<motion.button
									ref={closeButtonRef}
									type="button"
									onClick={closeImage}
									className="absolute right-4 top-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white transition-colors duration-300 hover:bg-white/16 md:right-6 md:top-6"
									aria-label={`Close image: ${title}`}
									initial={false}
									animate={{
										opacity: isVisible && !isClosing ? 1 : 0,
									}}
									transition={backdropTransition}
								>
									<X className="h-5 w-5" strokeWidth={1.8} />
								</motion.button>
							</div>

							<div
								className={cn(
									"pointer-events-none fixed inset-0",
									isClosingBehindNav ? "z-40" : "z-[81]",
								)}
							>
								<motion.div
									className="pointer-events-auto absolute overflow-hidden"
									initial={false}
									animate={{
										top: activeRect.top,
										left: activeRect.left,
										width: activeRect.width,
										height: activeRect.height,
									}}
									transition={animationTransition}
									onClick={(event) => event.stopPropagation()}
								>
									<img
										src={image.src}
										srcSet={image.srcSet}
										sizes={image.sizes}
										width={image.width}
										height={image.height}
										alt={alt}
										decoding={decoding}
										draggable={false}
										className={cn(
											"absolute inset-0 h-full w-full",
											overlayImageClassName,
											isClosing
												? "object-cover"
												: "object-contain",
										)}
									/>

									{isClosing ? null : (
										<>
											<div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,rgba(18,13,9,0)_0%,rgba(18,13,9,0.18)_42%,rgba(18,13,9,0.78)_100%)]" />
											<motion.div
												className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4 text-white md:p-6 lg:p-7"
												initial={false}
												animate={{
													opacity: isVisible ? 1 : 0,
													y: isVisible ? 0 : 12,
												}}
												transition={
													shouldReduceMotion
														? { duration: 0.01 }
														: {
																duration: 0.34,
																delay: isVisible
																	? 0.14
																	: 0,
																ease: REVEAL_EASE,
														  }
												}
											>
												<p className="font-['Montserrat'] text-[0.68rem] tracking-[0.28em] text-white/72 uppercase">
													Image preview
												</p>
												<h3 className="max-w-[24rem] font-['Cormorant_Garamond'] text-[2rem] leading-[0.95] md:text-[2.4rem] lg:text-[2.85rem]">
													{title}
												</h3>
												{description ? (
													<p className="max-w-lg font-['Montserrat'] text-sm leading-relaxed text-white/82 md:text-[0.96rem]">
														{description}
													</p>
												) : null}
											</motion.div>
										</>
									)}
								</motion.div>
							</div>
						</>,
						portalTarget,
					)
				: null}
		</>
	);
}
