"use client";

import type { ReviewMissionType } from "@/types/review/ReviewQueueByPlayer";
import type { ReviewFilter } from "@/types/review/ReviewSubmission";

const TABS: { value: ReviewFilter; label: string }[] = [
  { value: "pending", label: "Pendientes" },
  { value: "approved", label: "Aprobadas" },
  { value: "rejected", label: "Rechazadas" },
];

const TYPE_OPTIONS: { value: ReviewMissionType | "all"; label: string }[] = [
  { value: "all", label: "Todas las categorías" },
  { value: "DAILY", label: "Diaria" },
  { value: "WEEKLY", label: "Semanal" },
  { value: "FIXED", label: "Fija" },
];

interface ReviewFilterBarProps {
  activeTab: ReviewFilter;
  activeType: ReviewMissionType | "all";
  onTabChange: (tab: ReviewFilter) => void;
  onTypeChange: (type: ReviewMissionType | "all") => void;
}

function ReviewFilterBar({
  activeTab,
  activeType,
  onTabChange,
  onTypeChange,
}: ReviewFilterBarProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Status tabs */}
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filtrar por estado"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.value)}
              className={`
                px-4 py-2 rounded-full text-label-sm font-semibold
                transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5
                ${
                  isActive
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-label-sm text-on-surface-variant shrink-0">
            Categoría:
          </span>
          <select
            value={activeType}
            onChange={(e) =>
              onTypeChange(e.target.value as ReviewMissionType | "all")
            }
            className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-3 py-2 text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors cursor-pointer"
            aria-label="Filtrar por categoría de misión"
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

ReviewFilterBar.displayName = "ReviewFilterBar";

export { ReviewFilterBar };
