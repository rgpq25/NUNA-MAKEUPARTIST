import type { ReactNode } from "react";
import { cn } from "../lib/utils";

interface WorksPageLayoutProps {
	header?: ReactNode;
	bleedContent?: ReactNode;
	children?: ReactNode;
	overlayClassName?: string;
	className?: string;
	containerClassName?: string;
	headerClassName?: string;
	childrenClassName?: string;
}

export default function WorksPageLayout({
	header,
	bleedContent,
	children,
	className,
	containerClassName,
	headerClassName,
	childrenClassName,
}: WorksPageLayoutProps) {
	const defaultContainerClassName = "mx-auto w-full max-w-7xl px-6 md:px-10";

	return (
		<section
			className={cn(
				"relative overflow-hidden min-h-dvh py-8 md:py-10",
				className,
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
		</section>
	);
}
