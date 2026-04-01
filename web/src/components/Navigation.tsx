import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { NavLink } from "../types/content";

interface NavigationProps {
	brandTitle: string;
	brandSubtitle: string;
	links: NavLink[];
}

export default function Navigation({
	brandTitle,
	brandSubtitle,
	links,
}: NavigationProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const shouldReduceMotion = useReducedMotion();
	const leftLinks = links.slice(0, 2);
	const rightLinks = links.slice(2, 4);
	const motionProps = {
		initial: { opacity: 0, y: shouldReduceMotion ? -20 : undefined },
		animate: { opacity: 1, y: shouldReduceMotion ? 0 : undefined },
		transition: { duration: 0.2 },
	};
	const drawerMotion = {
		initial: { opacity: 0, y: -12 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -12 },
		transition: { duration: 0.2 },
	};

	return (
		<motion.nav
			className="fixed inset-x-0 top-0 z-50 border-b border-[#2a2a2a]/10 bg-[#faf8f5] pl-6 md:pl-16 pr-[calc(1.5rem+var(--scrollbar-compensation,0px))] md:pr-[calc(4rem+var(--scrollbar-compensation,0px))]"
			{...motionProps}
		>
			<div className="container relative mx-auto max-w-7xl py-4 md:py-5">
				<div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
					<div className="hidden items-center gap-10 md:flex overflow-hidden">
						{leftLinks.map((link) => (
							<a
								key={link.label}
								href={link.href}
								className="font-['Montserrat'] text-[0.95rem] font-medium tracking-[0.16em] text-[#2a2a2a]/70 uppercase transition-colors duration-300 hover:text-[#c9a96e] truncate"
							>
								{link.label}
							</a>
						))}
					</div>

					<button
						type="button"
						aria-expanded={isMenuOpen}
						aria-label={
							isMenuOpen
								? "Close navigation menu"
								: "Open navigation menu"
						}
						className="inline-flex h-11 w-11 items-center justify-center border border-[#2a2a2a]/10 text-[#2a2a2a] transition-colors duration-300 hover:border-[#c9a96e] hover:text-[#c9a96e] md:hidden"
						onClick={() => setIsMenuOpen((open) => !open)}
					>
						{isMenuOpen ? <X size={20} /> : <Menu size={20} />}
					</button>

					<a
						href="#top"
						className="flex flex-col items-center justify-center text-center"
					>
						<span className="font-['Cormorant_Garamond'] text-[2.45rem] leading-none tracking-[0.08em] text-[#2a2a2a] md:text-[3rem]">
							{brandTitle}
						</span>
						<span className="font-['Cormorant_Garamond'] text-[0.95rem] leading-none italic tracking-[0.04em] text-[#2a2a2a]/70 md:text-[1.4rem]">
							{brandSubtitle}
						</span>
					</a>

					<div className="hidden items-center justify-end gap-10 md:flex overflow-hidden">
						{rightLinks.map((link) => (
							<a
								key={link.label}
								href={link.href}
								className="font-['Montserrat'] text-[0.95rem] font-medium tracking-[0.16em] text-[#2a2a2a]/70 uppercase transition-colors duration-300 hover:text-[#c9a96e] truncate"
							>
								{link.label}
							</a>
						))}
					</div>

					<div className="h-11 w-11 md:hidden" />
				</div>

				<AnimatePresence>
					{isMenuOpen ? (
						<motion.div
							className="absolute inset-x-0 top-full overflow-hidden md:hidden -mx-6 shadow-md"
							{...drawerMotion}
						>
							<div className="border-t border-[#2a2a2a]/10 bg-[#faf8f5] p-6">
								<div className="grid gap-2">
									{links.map((link) => (
										<a
											key={link.label}
											href={link.href}
											className="block border border-[#2a2a2a]/10 px-4 py-3 font-['Montserrat'] text-sm tracking-[0.16em] text-[#2a2a2a]/70 uppercase transition-colors duration-300 hover:border-[#c9a96e]/40 hover:text-[#c9a96e]"
											onClick={() => setIsMenuOpen(false)}
										>
											{link.label}
										</a>
									))}
								</div>
							</div>
						</motion.div>
					) : null}
				</AnimatePresence>
			</div>
		</motion.nav>
	);
}
