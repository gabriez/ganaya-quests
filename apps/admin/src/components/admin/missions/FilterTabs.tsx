"use client";

import type { FilterTabsProps, FilterValue } from "@/types/missions/FilterTabs";

const FILTER_OPTIONS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "active", label: "Activas" },
  { value: "inactive", label: "Inactivas" },
  { value: "completed", label: "Completadas" },
  { value: "cancelled", label: "Canceladas" },
];

/**
 * FilterTabs — horizontal filter chips for mission status.
 *
 * Renders pill-shaped tabs for each status filter. The selected
 * tab is highlighted with primary color. Matches the Midnight
 * Harbor design system pattern for segmented controls.
 */
function FilterTabs({ activeFilter, onChange }: FilterTabsProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Filtrar por estado"
    >
      {FILTER_OPTIONS.map((opt) => {
        const isActive = activeFilter === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.value)}
            className={`
              px-4 py-2 rounded-full text-label-sm font-semibold
              transition-all duration-200 cursor-pointer
              ${
                isActive
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-higher"
              }
            `}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

FilterTabs.displayName = "FilterTabs";

export { FilterTabs };
