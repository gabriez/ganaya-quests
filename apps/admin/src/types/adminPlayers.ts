/**
 * Player — jugador registrado en la plataforma.
 *
 * Representa un usuario con progreso, nivel y estadísticas
 * de misión. Visible en el panel de administración.
 */
export interface Player {
  id: string;
  username: string;
  level: number;
  experience: number;
  coins: number;
  completedMissions: number;
  inProgressMissions: number;
}

/* ── Filter helpers ── */

export type LevelRange = "all" | "1-5" | "6-10" | "11-15" | "16-20" | "21+";
export type CoinsRange =
  | "all"
  | "0-1000"
  | "1001-5000"
  | "5001-10000"
  | "10001+";
export type MissionsRange = "all" | "0" | "1-5" | "6-10" | "11+";
export type InProgressRange = "all" | "0" | "1-2" | "3-5" | "6+";

export interface PlayerFilters {
  search: string;
  levelRange: LevelRange;
  coinsRange: CoinsRange;
  completedRange: MissionsRange;
  inProgressRange: InProgressRange;
}

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
  | { type: "SET_PLAYERS"; payload: { players: Player[] } }
  | { type: "SET_FILTER"; payload: { filter: Partial<PlayerFilters> } }
  | { type: "SET_PAGE"; payload: { page: number } };

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
