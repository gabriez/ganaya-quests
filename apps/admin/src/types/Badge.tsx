import type { ReactNode } from "react";

export type BadgeVariant = "inactive" | "active" | "completed" | "cancelled";
export interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
}
