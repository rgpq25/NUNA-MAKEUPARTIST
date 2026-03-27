import type { ReactNode } from "react";
import { cn } from "../lib/utils";

interface WorksPageLayoutProps {
	header?: ReactNode;
	bleedContent?: ReactNode;
	children?: ReactNode;
	className?: string;
	overlayClassName?: string;
	innerClassName?: string;
	containerClassName?: string;
	headerClassName?: string;
	childrenClassName?: string;
}

export default function WorksPageLayout({
	header,
	bleedContent,
	children,
	className,
	overlayClassName,
	innerClassName,
	containerClassName,
	headerClassName,
	childrenClassName,
}: WorksPageLayoutProps) {
	const defaultContainerClassName = "mx-auto w-full max-w-7xl px-6 md:px-10";

	return (
		<section
			className={cn(
				"relative overflow-hidden bg-[#faf8f5] text-[#2a2a2a]",
				className,
			)}
		>
			<div
				className={cn(
					"pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,110,0.14),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.84),rgba(250,248,245,0.98))]",
					overlayClassName,
				)}
			/>

			<div
				className={cn(
					"relative min-h-dvh py-8 md:py-10",
					innerClassName,
				)}
			>
				{header ? (
					<div
						className={cn(
							defaultContainerClassName,
							containerClassName,
							headerClassName,
						)}
					>
						{header}
					</div>
				) : null}

				{bleedContent ? (
					<div className={cn("w-full relative min-h-0")}>
						{bleedContent}
					</div>
				) : null}

				{children ? (
					<div
						className={cn(
							defaultContainerClassName,
							containerClassName,
							childrenClassName,
						)}
					>
						{children}
					</div>
				) : null}
			</div>
		</section>
	);
}
