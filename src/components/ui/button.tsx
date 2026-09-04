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
  success:
    "bg-[#2F6B3C] text-white transition-opacity hover:opacity-90 active:scale-[0.99]",
  destructive:
    "border border-[#EBC4C0] bg-transparent text-[#9C3B32] transition-colors hover:bg-[#FAEAE8] active:scale-[0.99]",
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
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
  "aria-describedby"?: string;
};

function Button({
  variant = "primary",
  size = "default",
  href,
  className,
  children,
  renderAsLink = true,
  type,
  onClick,
  disabled,
  ...ariaProps
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg disabled:cursor-not-allowed disabled:opacity-50",
    buttonVariants[variant],
    buttonSizes[size],
    className,
  );

  if (href && renderAsLink && !disabled) {
    return (
      <Link href={href as `/${string}`} className={classes} {...ariaProps}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...ariaProps}>
        {children}
      </a>
    );
  }

  return (
    <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={classes} {...ariaProps}>
      {children}
    </button>
  );
}

export { Button, buttonVariants };
