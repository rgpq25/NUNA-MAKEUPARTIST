import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { NavLink } from "../data/home";

interface NavigationProps {
  brandTitle: string;
  brandSubtitle: string;
  links: NavLink[];
}

export default function Navigation({ brandTitle, brandSubtitle, links }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const leftLinks = links.slice(0, 2);
  const rightLinks = links.slice(2, 4);
  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 0.2 },
      };
  const drawerMotion = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.2 },
      };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-[#2a2a2a]/10 bg-[#faf8f5]/95 px-6 py-4 backdrop-blur-sm md:px-16 md:py-5"
      {...motionProps}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="relative grid grid-cols-[auto_1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <div className="hidden items-center gap-10 md:flex">
            {leftLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-['Montserrat'] text-[0.95rem] font-medium tracking-[0.16em] text-[#2a2a2a]/70 uppercase transition-colors duration-300 hover:text-[#c9a96e]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-11 w-11 items-center justify-center border border-[#2a2a2a]/10 text-[#2a2a2a] transition-colors duration-300 hover:border-[#c9a96e] hover:text-[#c9a96e] md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

            <a href="#top" className="flex flex-col items-center justify-center text-center">
              <span className="font-['Cormorant_Garamond'] text-[2.45rem] leading-none tracking-[0.08em] text-[#2a2a2a] md:text-[4.2rem]">
                {brandTitle}
              </span>
              <span className="font-['Cormorant_Garamond'] text-[0.95rem] leading-none italic tracking-[0.04em] text-[#2a2a2a]/70 md:text-[1.65rem]">
                {brandSubtitle}
              </span>
            </a>

          <div className="hidden items-center justify-end gap-10 md:flex">
            {rightLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-['Montserrat'] text-[0.95rem] font-medium tracking-[0.16em] text-[#2a2a2a]/70 uppercase transition-colors duration-300 hover:text-[#c9a96e]"
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
              className="overflow-hidden md:hidden"
              {...drawerMotion}
            >
              <div className="mt-4 border-t border-[#2a2a2a]/10 bg-[#faf8f5] px-1 pb-2 pt-4">
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
