import type { Dispatch } from "react";
import { sileo } from "sileo";

import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import type {
  Player,
  PlayerFilters,
  PlayersAction,
  PlayersState,
} from "@/types/adminPlayers";

/* ── Constants ── */

export const PAGE_SIZE = 10;

/* ── Initial State ── */

export const initialFilters: PlayerFilters = {
  search: "",
  status: "all",
};

export const initialState: PlayersState = {
  players: [],
  filters: initialFilters,
  page: 1,
  totalPages: 1,
  loading: true,
};

/* ── Filter helpers ── */

export function applyFilters(
  players: Player[],
  filters: PlayerFilters,
): Player[] {
  let filtered = players;

  if (filters.search.trim()) {
    const q = filters.search.trim().toLowerCase();
    filtered = filtered.filter((p) => p.username.toLowerCase().includes(q));
  }

  if (filters.status === "active") {
    filtered = filtered.filter((p) => p.isActive === true);
  } else if (filters.status === "suspended") {
    filtered = filtered.filter((p) => p.isActive === false);
  }

  return filtered;
}

/* ── Filtros por rango (legados, comentados para uso futuro) ──────────────
 * El backend Player NO expone level / coins / completedMissions /
 * inProgressMissions. Estos helpers y la rama de filtrado por rango se
 * conservan comentados por si el backend llega a incluirlos. Reactivar
 * junto con los tipos y Selects comentados (adminPlayers.ts y
 * PlayersFilterBar.tsx) y con los campos correspondientes del Player.
 */
// function matchesLevelRange(level: number, range: LevelRange): boolean {
//   switch (range) {
//     case "all":
//       return true;
//     case "1-5":
//       return level >= 1 && level <= 5;
//     case "6-10":
//       return level >= 6 && level <= 10;
//     case "11-15":
//       return level >= 11 && level <= 15;
//     case "16-20":
//       return level >= 16 && level <= 20;
//     case "21+":
//       return level >= 21;
//   }
// }
//
// function matchesCoinsRange(coins: number, range: CoinsRange): boolean {
//   switch (range) {
//     case "all":
//       return true;
//     case "0-1000":
//       return coins >= 0 && coins <= 1000;
//     case "1001-5000":
//       return coins >= 1001 && coins <= 5000;
//     case "5001-10000":
//       return coins >= 5001 && coins <= 10000;
//     case "10001+":
//       return coins >= 10001;
//   }
// }
//
// function matchesMissionsRange(count: number, range: MissionsRange): boolean {
//   switch (range) {
//     case "all":
//       return true;
//     case "0":
//       return count === 0;
//     case "1-5":
//       return count >= 1 && count <= 5;
//     case "6-10":
//       return count >= 6 && count <= 10;
//     case "11+":
//       return count >= 11;
//   }
// }
//
// function matchesInProgressRange(
//   count: number,
//   range: InProgressRange,
// ): boolean {
//   switch (range) {
//     case "all":
//       return true;
//     case "0":
//       return count === 0;
//     case "1-2":
//       return count >= 1 && count <= 2;
//     case "3-5":
//       return count >= 3 && count <= 5;
//     case "6+":
//       return count >= 6;
//   }
// }
//
// // Dentro de applyFilters, tras el filtro por username:
// //   filtered = filtered.filter((p) =>
// //     matchesLevelRange(p.level, filters.levelRange),
// //   );
// //   filtered = filtered.filter((p) =>
// //     matchesCoinsRange(p.coins, filters.coinsRange),
// //   );
// //   filtered = filtered.filter((p) =>
// //     matchesMissionsRange(p.completedMissions, filters.completedRange),
// //   );
// //   filtered = filtered.filter((p) =>
// //     matchesInProgressRange(p.inProgressMissions, filters.inProgressRange),
// //   );

/* ── Reducer ── */

export function playersReducer(
  state: PlayersState,
  action: PlayersAction,
): PlayersState {
  switch (action.type) {
    case "SET_PLAYERS": {
      return {
        ...state,
        players: action.payload.players,
        totalPages: action.payload.totalPages,
        loading: false,
      };
    }

    case "SET_FILTER": {
      return {
        ...state,
        filters: { ...state.filters, ...action.payload.filter },
        page: 1,
      };
    }

    case "SET_PAGE": {
      return { ...state, page: action.payload.page };
    }

    case "SET_LOADING": {
      return { ...state, loading: action.payload.loading };
    }

    default:
      return state;
  }
}

/* ── Helpers ── */

function getMessage(msg: string | string[] | undefined): string {
  if (!msg) return "Ocurrió un error inesperado";
  return Array.isArray(msg) ? msg.join("; ") : msg;
}

/* ── Action dispatchers ── */

export async function loadPlayers(
  dispatch: Dispatch<PlayersAction>,
  page: number,
) {
  dispatch({ type: "SET_LOADING", payload: { loading: true } });

  const result = await apiAdminGanaya.getPlayers({
    take: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
  });

  if (result.status && result.data) {
    dispatch({
      type: "SET_PLAYERS",
      payload: {
        players: result.data,
        totalPages: result.meta?.totalPages ?? 1,
      },
    });
    return;
  }

  // Evita dejar el spinner en loop y permite mostrar el empty state.
  dispatch({ type: "SET_PLAYERS", payload: { players: [], totalPages: 1 } });
  sileo.error({
    title: "Error al cargar jugadores",
    description: getMessage(result.message),
  });
}
