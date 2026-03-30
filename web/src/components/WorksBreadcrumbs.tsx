import { Fragment } from "react";

export interface WorksBreadcrumbItem {
  label: string;
  href?: string;
}

interface WorksBreadcrumbsProps {
  items: WorksBreadcrumbItem[];
  className?: string;
}

const baseClassName =
  "font-['Montserrat'] text-[0.68rem] tracking-[0.34em] text-[#2a2a2a]/44 uppercase";

export default function WorksBreadcrumbs({ items, className }: WorksBreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={className ? `${baseClassName} ${className}` : baseClassName}
    >
      {items.map((item, index) => {
        const isCurrentPage = index === items.length - 1;

        return (
          <Fragment key={`${item.label}-${index}`}>
            {index > 0 ? <span aria-hidden="true"> / </span> : null}
            {item.href ? (
              <a href={item.href} className="transition-colors duration-300 hover:text-[#c9a96e]">
                {item.label}
              </a>
            ) : (
              <span aria-current={isCurrentPage ? "page" : undefined}>{item.label}</span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
