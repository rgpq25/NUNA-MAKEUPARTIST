import { motion, useReducedMotion } from "motion/react";

import WorksBreadcrumbs, { type WorksBreadcrumbItem } from "./WorksBreadcrumbs";

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

interface WorksPageHeaderProps {
	backHref: string;
	backLabel?: string;
	breadcrumbs: WorksBreadcrumbItem[];
	title: string;
	description?: string;
	className?: string;
	contentClassName?: string;
	titleWrapperClassName?: string;
	titleClassName?: string;
	descriptionClassName?: string;
}

const buttonClassName =
	"shrink-0 border border-[#2a2a2a]/15 px-4 py-3 font-['Montserrat'] text-[0.68rem] tracking-[0.24em] text-[#2a2a2a]/75 uppercase transition-colors duration-300 hover:border-[#c9a96e]/45 hover:text-[#c9a96e]";

const defaultTitleClassName =
	"font-['Cormorant_Garamond'] text-5xl leading-none text-[#2a2a2a] md:text-7xl lg:text-8xl";

const defaultDescriptionClassName =
	"max-w-4xl font-['Montserrat'] text-sm leading-relaxed text-[#2a2a2a]/68 md:text-base";

export default function WorksPageHeader({
	backHref,
	backLabel = "Volver",
	breadcrumbs,
	title,
	description,
	className,
	contentClassName,
	titleWrapperClassName,
	titleClassName = defaultTitleClassName,
	descriptionClassName = defaultDescriptionClassName,
}: WorksPageHeaderProps) {
	const shouldReduceMotion = useReducedMotion();
	const rootClassName = ["space-y-4 md:space-y-0", className]
		.filter(Boolean)
		.join(" ");
	const resolvedContentClassName = ["space-y-1", contentClassName]
		.filter(Boolean)
		.join(" ");

	const buildRevealMotion = (delay: number, y = 24) =>
		shouldReduceMotion
			? {}
			: {
					initial: { opacity: 0, y },
					animate: { opacity: 1, y: 0 },
					transition: {
						duration: 0.82,
						delay,
						ease: REVEAL_EASE,
					},
				};

	return (
		<div className={rootClassName}>
			<motion.a
				href={backHref}
				className={`${buttonClassName} inline-flex md:hidden`}
				{...buildRevealMotion(0.08, 14)}
			>
				{backLabel}
			</motion.a>

			<motion.div
				className={resolvedContentClassName}
				{...buildRevealMotion(0.08, 18)}
			>
				<div className="flex items-start justify-between gap-6">
					<div className={titleWrapperClassName}>
						<WorksBreadcrumbs
							items={breadcrumbs}
							className="mb-4"
						/>
						<h1 className={titleClassName}>{title}</h1>
					</div>

					<motion.a
						href={backHref}
						className={`${buttonClassName} hidden md:inline-flex`}
						{...buildRevealMotion(0.14, 14)}
					>
						{backLabel}
					</motion.a>
				</div>

				{description ? (
					<p className={descriptionClassName}>{description}</p>
				) : null}
			</motion.div>
		</div>
	);
}
