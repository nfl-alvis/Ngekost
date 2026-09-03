import * as React from "react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const buttonVariants = {
  primary:
    "bg-nk-accent text-nk-text-inverse transition-opacity hover:opacity-90 active:scale-[0.99]",
  outline:
    "border border-nk-border bg-nk-surface text-nk-text transition-colors hover:bg-nk-warm active:scale-[0.99]",
  ghost:
    "text-nk-text transition-colors hover:text-nk-text-muted active:scale-[0.99]",
  light:
    "border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-[0.99]",
} as const;

const buttonSizes = {
  default: "px-5 py-2.5 text-sm font-medium",
  sm: "px-3 py-1.5 text-xs font-medium",
  lg: "px-6 py-3 text-sm font-medium",
  icon: "size-10",
} as const;

type ButtonVariant = keyof typeof buttonVariants;
type ButtonSize = keyof typeof buttonSizes;

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  children?: React.ReactNode;
  renderAsLink?: boolean;
};

function Button({
  variant = "primary",
  size = "default",
  href,
  className,
  children,
  renderAsLink = true,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg",
    buttonVariants[variant],
    buttonSizes[size],
    className,
  );

  if (href && renderAsLink) {
    return (
      <Link href={href as `/${string}`} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}

export { Button };
