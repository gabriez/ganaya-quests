import type { AdminMission } from "@shared/types";

export interface RowActionsProps {
  mission: AdminMission;
  onEdit?: (id: string) => void;
  onActivate?: (id: string) => void;
  onCancel?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onDuplicate?: (id: string) => void;
}
