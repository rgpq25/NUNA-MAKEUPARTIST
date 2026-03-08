import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface CTAButtonProps {
  href: string;
  children: ReactNode;
  variant?: "light" | "dark";
}

export default function CTAButton({
  href,
  children,
  variant = "light",
}: CTAButtonProps) {
  const isDark = variant === "dark";

  return (
    <motion.a
      href={href}
      className={[
        "inline-flex items-center gap-3 px-8 py-4 border transition-all duration-300",
        isDark
          ? "border-[#2a2a2a] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-[#faf8f5]"
          : "border-[#faf8f5] text-[#faf8f5] hover:bg-[#faf8f5] hover:text-[#2a2a2a]",
      ].join(" ")}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="font-['Montserrat'] text-sm tracking-wider uppercase">
        {children}
      </span>
      <ArrowRight size={18} />
    </motion.a>
  );
}
