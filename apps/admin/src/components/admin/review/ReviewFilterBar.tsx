"use client";

import type { ReviewFilter } from "@/types/review/ReviewSubmission";

const TABS: { value: ReviewFilter; label: string }[] = [
  { value: "pending", label: "Pendientes" },
  { value: "approved", label: "Aprobadas" },
  { value: "rejected", label: "Rechazadas" },
];

const SORT_OPTIONS: { value: "newest" | "oldest"; label: string }[] = [
  { value: "newest", label: "Más recientes" },
  { value: "oldest", label: "Más antiguas" },
];

interface ReviewFilterBarProps {
  activeTab: ReviewFilter;
  counts: Record<ReviewFilter, number>;
  sortOrder: "newest" | "oldest";
  onTabChange: (tab: ReviewFilter) => void;
  onSortChange: (order: "newest" | "oldest") => void;
}

function ReviewFilterBar({
  activeTab,
  counts,
  sortOrder,
  onTabChange,
  onSortChange,
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
              <span
                className={`inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-[11px] font-bold ${
                  isActive
                    ? "bg-on-primary/20 text-on-primary"
                    : "bg-white/10 text-on-surface-variant"
                }`}
              >
                {counts[tab.value]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Date filter */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-label-sm text-on-surface-variant shrink-0">
            Orden:
          </span>
          <select
            value={sortOrder}
            onChange={(e) =>
              onSortChange(e.target.value as "newest" | "oldest")
            }
            className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-3 py-2 text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors cursor-pointer"
            aria-label="Ordenar por fecha"
          >
            {SORT_OPTIONS.map((opt) => (
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
