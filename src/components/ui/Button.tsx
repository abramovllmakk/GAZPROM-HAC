import clsx from "clsx";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Density = "normal" | "compact";

const styles: Record<Variant, string> = {
  primary: "bg-accent text-white shadow-sm hover:bg-accent-strong font-semibold",
  secondary: "border border-line-strong bg-surface text-ink shadow-sm hover:border-accent hover:bg-accent-soft/50",
  ghost: "text-muted hover:bg-raised hover:text-ink",
  danger: "border border-crit/40 bg-surface text-crit hover:border-crit hover:bg-crit/5",
};

const base =
  "inline-flex min-w-0 max-w-full items-center justify-center gap-2 rounded-[var(--radius-control)] text-center leading-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
const densityStyles: Record<Density, string> = {
  normal: "min-h-10 px-3.5 py-2 text-sm",
  compact: "min-h-8 px-2.5 py-1 text-xs",
};

export function Button({
  variant = "secondary",
  density = "normal",
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; density?: Density; children: ReactNode }) {
  return (
    <button className={clsx(base, densityStyles[density], styles[variant], className)} {...rest}>
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "secondary",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={clsx(base, styles[variant], className)}>
      {children}
    </Link>
  );
}
