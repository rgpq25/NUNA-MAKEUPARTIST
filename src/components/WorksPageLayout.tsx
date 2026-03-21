import type { ReactNode } from "react";

interface WorksPageLayoutProps {
  header?: ReactNode;
  bleedContent?: ReactNode;
  children?: ReactNode;
  className?: string;
  overlayClassName?: string;
  innerClassName?: string;
  containerClassName?: string;
  headerClassName?: string;
  bleedContentClassName?: string;
  childrenClassName?: string;
}

const defaultSectionClassName =
  "relative overflow-hidden bg-[#faf8f5] text-[#2a2a2a]";

const defaultOverlayClassName =
  "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,169,110,0.14),_transparent_38%),linear-gradient(180deg,_rgba(255,255,255,0.84),_rgba(250,248,245,0.98))]";

const defaultInnerClassName = "relative min-h-dvh py-8 md:py-10";

const defaultContainerClassName = "mx-auto w-full max-w-7xl px-6 md:px-10";

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
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
  bleedContentClassName,
  childrenClassName,
}: WorksPageLayoutProps) {
  const resolvedContainerClassName = joinClassNames(
    defaultContainerClassName,
    containerClassName,
  );

  return (
    <section className={joinClassNames(defaultSectionClassName, className)}>
      <div className={joinClassNames(defaultOverlayClassName, overlayClassName)} />

      <div className={joinClassNames(defaultInnerClassName, innerClassName)}>
        {header ? (
          <div className={joinClassNames(resolvedContainerClassName, headerClassName)}>{header}</div>
        ) : null}

        {bleedContent ? (
          <div className={joinClassNames("w-full", bleedContentClassName)}>{bleedContent}</div>
        ) : null}

        {children ? (
          <div className={joinClassNames(resolvedContainerClassName, childrenClassName)}>{children}</div>
        ) : null}
      </div>
    </section>
  );
}
