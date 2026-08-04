"use client";

import { useCallback } from "react";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type {
  PlayerStatusFilter,
  PlayersFilterBarProps,
} from "@/types/adminPlayers";

/**
 * PlayersFilterBar — barra de búsqueda y filtros para la tabla de jugadores.
 *
 * Incluye búsqueda por username y filtro por estado (activo/suspendido).
 * Sigue el patrón Midnight Harbor.
 */
function PlayersFilterBar({ filters, onFilterChange }: PlayersFilterBarProps) {
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFilterChange({ search: e.target.value });
    },
    [onFilterChange],
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="w-full lg:max-w-sm">
        <Input
          id="search-players"
          icon="search"
          placeholder="Buscar por usuario..."
          value={filters.search}
          onChange={handleSearch}
          wrapperClassName="w-full"
        />
      </div>

      {/* Status filter */}
      <div className="w-full lg:max-w-xs">
        <Select
          id="filter-status"
          icon="verified_user"
          placeholder="Estado"
          value={filters.status}
          onChange={(val) =>
            onFilterChange({ status: val as PlayerStatusFilter })
          }
          options={[
            { value: "all", label: "Todos" },
            { value: "active", label: "Activos" },
            { value: "suspended", label: "Suspendidos" },
          ]}
        />
      </div>

      {/* ── Filtros por rango (legados, comentados para uso futuro) ──
       * El backend Player NO expone level / coins / completedMissions /
       * inProgressMissions. Estos Selects se conservan comentados por si el
       * backend llega a incluirlos; reactivar junto con los tipos y helpers
       * comentados en adminPlayers.ts y PlayersReducer.ts.
       */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Select
          id="filter-level"
          icon="stars"
          placeholder="Nivel"
          value={filters.levelRange}
          onChange={(val) =>
            onFilterChange({
              levelRange: val as PlayersFilterBarProps["filters"]["levelRange"],
            })
          }
          options={[
            { value: "all", label: "Todos los niveles" },
            { value: "1-5", label: "1 – 5" },
            { value: "6-10", label: "6 – 10" },
            { value: "11-15", label: "11 – 15" },
            { value: "16-20", label: "16 – 20" },
            { value: "21+", label: "21+" },
          ]}
        />

        <Select
          id="filter-coins"
          icon="token"
          placeholder="Fichas"
          value={filters.coinsRange}
          onChange={(val) =>
            onFilterChange({
              coinsRange: val as PlayersFilterBarProps["filters"]["coinsRange"],
            })
          }
          options={[
            { value: "all", label: "Todas las fichas" },
            { value: "0-1000", label: "0 – 1,000" },
            { value: "1001-5000", label: "1,001 – 5,000" },
            { value: "5001-10000", label: "5,001 – 10,000" },
            { value: "10001+", label: "10,001+" },
          ]}
        />

        <Select
          id="filter-completed"
          icon="check_circle"
          placeholder="Completadas"
          value={filters.completedRange}
          onChange={(val) =>
            onFilterChange({
              completedRange:
                val as PlayersFilterBarProps["filters"]["completedRange"],
            })
          }
          options={[
            { value: "all", label: "Todas" },
            { value: "0", label: "0" },
            { value: "1-5", label: "1 – 5" },
            { value: "6-10", label: "6 – 10" },
            { value: "11+", label: "11+" },
          ]}
        />

        <Select
          id="filter-inprogress"
          icon="pending_actions"
          placeholder="En curso"
          value={filters.inProgressRange}
          onChange={(val) =>
            onFilterChange({
              inProgressRange:
                val as PlayersFilterBarProps["filters"]["inProgressRange"],
            })
          }
          options={[
            { value: "all", label: "Todas" },
            { value: "0", label: "0" },
            { value: "1-2", label: "1 – 2" },
            { value: "3-5", label: "3 – 5" },
            { value: "6+", label: "6+" },
          ]}
        />
      </div> */}
    </div>
  );
}

PlayersFilterBar.displayName = "PlayersFilterBar";

export { PlayersFilterBar };
