"use client";

import { useCallback } from "react";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { PlayersFilterBarProps } from "@/types/adminPlayers";

/**
 * PlayersFilterBar — barra de búsqueda y filtros para la tabla de jugadores.
 *
 * Incluye búsqueda por username y filtros por rango de nivel, fichas,
 * misiones completadas y misiones en curso. Sigue el patrón Midnight Harbor.
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

      {/* Filter dropdowns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Level range */}
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

        {/* Coins range */}
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

        {/* Completed missions range */}
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

        {/* In-progress missions range */}
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
      </div>
    </div>
  );
}

PlayersFilterBar.displayName = "PlayersFilterBar";

export { PlayersFilterBar };
