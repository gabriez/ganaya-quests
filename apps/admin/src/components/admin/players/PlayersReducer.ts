import type { Dispatch } from "react";

import type {
  CoinsRange,
  InProgressRange,
  LevelRange,
  MissionsRange,
  Player,
  PlayerFilters,
  PlayersAction,
  PlayersState,
} from "@/types/adminPlayers";
import { MOCK_PLAYERS } from "./mockData";

/* ── Constants ── */

const PAGE_SIZE = 10;

/* ── Initial State ── */

export const initialFilters: PlayerFilters = {
  search: "",
  levelRange: "all",
  coinsRange: "all",
  completedRange: "all",
  inProgressRange: "all",
};

export const initialState: PlayersState = {
  players: [],
  filters: initialFilters,
  page: 1,
  totalPages: 1,
  loading: true,
};

/* ── Filter helpers ── */

function matchesLevelRange(level: number, range: LevelRange): boolean {
  switch (range) {
    case "all":
      return true;
    case "1-5":
      return level >= 1 && level <= 5;
    case "6-10":
      return level >= 6 && level <= 10;
    case "11-15":
      return level >= 11 && level <= 15;
    case "16-20":
      return level >= 16 && level <= 20;
    case "21+":
      return level >= 21;
  }
}

function matchesCoinsRange(coins: number, range: CoinsRange): boolean {
  switch (range) {
    case "all":
      return true;
    case "0-1000":
      return coins >= 0 && coins <= 1000;
    case "1001-5000":
      return coins >= 1001 && coins <= 5000;
    case "5001-10000":
      return coins >= 5001 && coins <= 10000;
    case "10001+":
      return coins >= 10001;
  }
}

function matchesMissionsRange(count: number, range: MissionsRange): boolean {
  switch (range) {
    case "all":
      return true;
    case "0":
      return count === 0;
    case "1-5":
      return count >= 1 && count <= 5;
    case "6-10":
      return count >= 6 && count <= 10;
    case "11+":
      return count >= 11;
  }
}

function matchesInProgressRange(
  count: number,
  range: InProgressRange,
): boolean {
  switch (range) {
    case "all":
      return true;
    case "0":
      return count === 0;
    case "1-2":
      return count >= 1 && count <= 2;
    case "3-5":
      return count >= 3 && count <= 5;
    case "6+":
      return count >= 6;
  }
}

function applyFilters(players: Player[], filters: PlayerFilters): Player[] {
  let filtered = players;

  if (filters.search.trim()) {
    const q = filters.search.trim().toLowerCase();
    filtered = filtered.filter((p) => p.username.toLowerCase().includes(q));
  }

  filtered = filtered.filter((p) =>
    matchesLevelRange(p.level, filters.levelRange),
  );
  filtered = filtered.filter((p) =>
    matchesCoinsRange(p.coins, filters.coinsRange),
  );
  filtered = filtered.filter((p) =>
    matchesMissionsRange(p.completedMissions, filters.completedRange),
  );
  filtered = filtered.filter((p) =>
    matchesInProgressRange(p.inProgressMissions, filters.inProgressRange),
  );

  return filtered;
}

function getTotalPages(length: number) {
  return Math.max(1, Math.ceil(length / PAGE_SIZE));
}

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
        totalPages: getTotalPages(action.payload.players.length),
        loading: false,
        page: 1,
      };
    }

    case "SET_FILTER": {
      const newFilters = { ...state.filters, ...action.payload.filter };
      const filtered = applyFilters(state.players, newFilters);
      return {
        ...state,
        filters: newFilters,
        totalPages: getTotalPages(filtered.length),
        page: 1,
      };
    }

    case "SET_PAGE": {
      return { ...state, page: action.payload.page };
    }

    default:
      return state;
  }
}

/* ── Selector: get current page items ── */

export function getCurrentPageItems(
  players: Player[],
  filters: PlayerFilters,
  page: number,
): Player[] {
  const filtered = applyFilters(players, filters);
  const start = (page - 1) * PAGE_SIZE;
  return filtered.slice(start, start + PAGE_SIZE);
}

/* ── Action dispatchers ── */

export async function loadPlayers(dispatch: Dispatch<PlayersAction>) {
  await new Promise((r) => setTimeout(r, 300));
  dispatch({ type: "SET_PLAYERS", payload: { players: MOCK_PLAYERS } });
}
