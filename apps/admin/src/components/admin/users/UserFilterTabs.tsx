"use client";

import type {
  UserActiveStatus,
  UserFilterTabsProps,
  UserRole,
} from "@/types/adminUsers";

const ROLE_OPTIONS: { value: UserRole | "all"; label: string }[] = [
  { value: "all", label: "Todos los roles" },
  { value: "admin", label: "Admin" },
  { value: "reviewer", label: "Reviewer" },
];

const ACTIVE_OPTIONS: { value: UserActiveStatus; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "active", label: "Activos" },
  { value: "inactive", label: "Inactivos" },
];

/**
 * UserFilterTabs — filtros de rol y estado para la tabla de usuarios.
 *
 * Dos grupos de chips tipo pill: uno para filtrar por rol (admin/reviewer/todos),
 * otro para filtrar por estado activo/inactivo. Sigue el mismo patrón que
 * FilterTabs del módulo de misiones.
 */
function UserFilterTabs({
  roleFilter,
  activeFilter,
  onRoleChange,
  onActiveChange,
}: UserFilterTabsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
      {/* Role filter */}
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filtrar por rol"
      >
        {ROLE_OPTIONS.map((opt) => {
          const isActive = roleFilter === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onRoleChange(opt.value)}
              className={`px-4 py-2 rounded-full text-label-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-higher"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Active status filter */}
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filtrar por estado"
      >
        {ACTIVE_OPTIONS.map((opt) => {
          const isActive = activeFilter === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onActiveChange(opt.value)}
              className={`px-4 py-2 rounded-full text-label-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-primary/15 text-primary glow-primary-sm"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-higher"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

UserFilterTabs.displayName = "UserFilterTabs";

export { UserFilterTabs };
