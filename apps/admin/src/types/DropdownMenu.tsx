import type { ReactNode } from "react";
export interface DropdownItem {
  label: string;
  icon?: string;
  onClick: () => void;
  variant?: "default" | "danger";
}

export interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownItem[];
}
