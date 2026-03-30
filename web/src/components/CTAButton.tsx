import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "../lib/utils";

interface CTAButtonProps {
	href: string;
	className?: string;
	children: ReactNode;
	variant?: "light" | "dark";
}

export default function CTAButton({
	href,
	className,
	children,
	variant = "light",
}: CTAButtonProps) {
	const isDark = variant === "dark";

	return (
		<motion.a
			href={href}
			className={cn(
				"group inline-flex items-center gap-3 px-6 py-3.5 md:px-8 md:py-4 border transition-all duration-300",
				isDark
					? "border-[#2a2a2a] text-[#2a2a2a] hover:bg-[#2a2a2a]"
					: "border-[#faf8f5] text-[#faf8f5] hover:bg-[#faf8f5]",
				className,
			)}
		>
			<span
				className={cn(
					"font-['Montserrat'] text-sm tracking-wider uppercase",
					isDark
						? "group-hover:text-[#faf8f5]"
						: "group-hover:text-[#2a2a2a]",
				)}
			>
				{children}
			</span>
			<ArrowRight
				size={18}
				className={cn(
					isDark
						? "group-hover:stroke-[#faf8f5]"
						: "group-hover:stroke-[#2a2a2a]",
				)}
			/>
		</motion.a>
	);
}
