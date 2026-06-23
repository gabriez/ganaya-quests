"use client";

import type { ReactNode } from "react";

type BadgeVariant = "inactive" | "active" | "completed" | "cancelled";

interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  inactive: "bg-outline-variant/30 text-on-surface-variant",
  active: "bg-primary/15 text-primary",
  completed: "bg-[#22c55e]/15 text-[#4ade80]",
  cancelled: "bg-error-container/30 text-error",
};

const statusLabels: Record<BadgeVariant, string> = {
  inactive: "Inactiva",
  active: "Activa",
  completed: "Completada",
  cancelled: "Cancelada",
};

/**
 * Badge — etiqueta de estado tipo píldora.
 *
 * Variantes de color: gray (inactive), blue/primary (active),
 * green (completed), red (cancelled). Texto en uppercase label-sm.
 */
function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5
        rounded-full text-label-sm uppercase tracking-wider
        ${variantStyles[variant]}
      `}
    >
      {children}
    </span>
  );
}

Badge.displayName = "Badge";

export { Badge, statusLabels };
export type { BadgeProps, BadgeVariant };
