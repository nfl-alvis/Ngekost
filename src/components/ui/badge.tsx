import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "border-transparent bg-nk-accent text-nk-text-inverse",
  secondary: "border-transparent bg-nk-warm text-nk-text",
  outline: "border-nk-border bg-transparent text-nk-text",
} as const;

type BadgeVariant = keyof typeof badgeVariants;

function Badge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & { variant?: BadgeVariant }) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
