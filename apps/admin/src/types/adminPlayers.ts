/**
 * Player — jugador registrado en la plataforma (modelo backend).
 */
export interface Player {
  id: number;
  username: string;
  phone: string | null;
  isActive: boolean;
}

export type PlayerStatusFilter = "all" | "active" | "suspended";

export interface PlayerFilters {
  search: string;
  status: PlayerStatusFilter;
}

/* ── Filtros por rango (legados, comentados para uso futuro) ──────────────
 * El modelo backend de Player NO expone level / coins / completedMissions /
 * inProgressMissions. Estos tipos se conservan comentados por si el backend
 * llega a incluirlos; reactivar junto con los helpers y los Selects
 * comentados en PlayersReducer.ts y PlayersFilterBar.tsx.
 */
// export type LevelRange = "all" | "1-5" | "6-10" | "11-15" | "16-20" | "21+";
// export type CoinsRange =
//   | "all"
//   | "0-1000"
//   | "1001-5000"
//   | "5001-10000"
//   | "10001+";
// export type MissionsRange = "all" | "0" | "1-5" | "6-10" | "11+";
// export type InProgressRange = "all" | "0" | "1-2" | "3-5" | "6+";

// export interface PlayerFiltersLegacy {
//   search: string;
//   levelRange: LevelRange;
//   coinsRange: CoinsRange;
//   completedRange: MissionsRange;
//   inProgressRange: InProgressRange;
// }

/** Estado del reducer */
export interface PlayersState {
  players: Player[];
  filters: PlayerFilters;
  page: number;
  totalPages: number;
  loading: boolean;
}

/** Acciones del reducer */
export type PlayersAction =
  | {
      type: "SET_PLAYERS";
      payload: { players: Player[]; totalPages: number };
    }
  | { type: "SET_FILTER"; payload: { filter: Partial<PlayerFilters> } }
  | { type: "SET_PAGE"; payload: { page: number } }
  | { type: "SET_LOADING"; payload: { loading: boolean } };

/** Props para la fila de la tabla */
export interface PlayerRowProps {
  player: Player;
}

/** Props para la tabla de jugadores */
export interface PlayersTableProps {
  players: Player[];
}

/** Props para la barra de filtros */
export interface PlayersFilterBarProps {
  filters: PlayerFilters;
  onFilterChange: (filter: Partial<PlayerFilters>) => void;
}
