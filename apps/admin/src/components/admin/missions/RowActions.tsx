"use client";

import { DropdownMenu } from "@/components/ui/DropdownMenu";
import type { DropdownItem } from "@/types/DropdownMenu";
import type { RowActionsProps } from "@/types/missions/RowActions";

/**
 * RowActions — contextual action buttons per mission state.
 *
 * Shows different actions based on mission status:
 * - Inactive: Edit, Activate, Delete
 * - Active: View, Cancel
 * - Completed: View, Duplicate
 * - Cancelled: View
 *
 * Uses DropdownMenu for compact display.
 */
function RowActions({
  mission,
  onEdit,
  onActivate,
  onCancel,
  onDelete,
  onView,
  onDuplicate,
}: RowActionsProps) {
  const items: DropdownItem[] = [];

  switch (mission.status) {
    case "inactive": {
      if (onEdit) {
        items.push({
          label: "Editar",
          icon: "edit",
          onClick: () => onEdit(mission.id),
        });
      }
      if (onActivate) {
        items.push({
          label: "Activar",
          icon: "play_circle",
          onClick: () => onActivate(mission.id),
        });
      }
      if (onDelete) {
        items.push({
          label: "Eliminar",
          icon: "delete",
          variant: "danger",
          onClick: () => onDelete(mission.id),
        });
      }
      break;
    }

    case "active": {
      if (onView) {
        items.push({
          label: "Ver",
          icon: "visibility",
          onClick: () => onView(mission.id),
        });
      }
      if (onCancel) {
        items.push({
          label: "Cancelar",
          icon: "block",
          variant: "danger",
          onClick: () => onCancel(mission.id),
        });
      }
      break;
    }

    case "completed": {
      if (onView) {
        items.push({
          label: "Ver",
          icon: "visibility",
          onClick: () => onView(mission.id),
        });
      }
      if (onDuplicate) {
        items.push({
          label: "Duplicar",
          icon: "content_copy",
          onClick: () => onDuplicate(mission.id),
        });
      }
      break;
    }

    case "cancelled": {
      if (onView) {
        items.push({
          label: "Ver",
          icon: "visibility",
          onClick: () => onView(mission.id),
        });
      }
      break;
    }
  }

  if (items.length === 0) return null;

  return (
    <DropdownMenu
      trigger={
        <span className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-colors">
          more_vert
        </span>
      }
      items={items}
    />
  );
}

RowActions.displayName = "RowActions";

export { RowActions };
