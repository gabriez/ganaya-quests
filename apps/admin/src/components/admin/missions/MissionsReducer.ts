/**
 * MissionsReducer — state management for the Mission Control page.
 *
 * Uses useReducer pattern (page-local state, zero external deps).
 * Handles loading, filtering, searching, pagination, and all
 * mission CRUD / state transitions.
 */

import type { AdminMission, MissionStatus } from "@shared/types";
import { MockDataService } from "./MockDataService";

/* ── Constants ── */

const PAGE_SIZE = 8;

/* ── State ── */

export interface MissionsState {
  missions: AdminMission[];
  filter: "all" | MissionStatus;
  search: string;
  page: number;
  totalPages: number;
  loading: boolean;
}

export const initialState: MissionsState = {
  missions: [],
  filter: "all",
  search: "",
  page: 1,
  totalPages: 1,
  loading: true,
};

/* ── Action Types ── */

export type MissionsAction =
  | {
      type: "LOAD_MISSIONS";
      payload: { missions: AdminMission[] };
    }
  | {
      type: "SET_FILTER";
      payload: { filter: "all" | MissionStatus };
    }
  | {
      type: "SET_SEARCH";
      payload: { search: string };
    }
  | {
      type: "SET_PAGE";
      payload: { page: number };
    }
  | {
      type: "CREATE_MISSION";
      payload: { mission: AdminMission };
    }
  | {
      type: "UPDATE_MISSION";
      payload: { mission: AdminMission };
    }
  | {
      type: "DELETE_MISSION";
      payload: { id: string };
    };

/* ── Filter + Search logic ── */

function applyFilters(
  missions: AdminMission[],
  filter: "all" | MissionStatus,
  search: string,
): AdminMission[] {
  let filtered = missions;

  // Status filter
  if (filter !== "all") {
    filtered = filtered.filter((m) => m.status === filter);
  }

  // Search by title
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q),
    );
  }

  return filtered;
}

/* ── Reducer ── */

export function missionsReducer(
  state: MissionsState,
  action: MissionsAction,
): MissionsState {
  switch (action.type) {
    case "LOAD_MISSIONS": {
      const missions = action.payload.missions;
      const filtered = applyFilters(missions, state.filter, state.search);
      return {
        ...state,
        missions,
        totalPages: Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)),
        loading: false,
        page: 1,
      };
    }

    case "SET_FILTER": {
      const { filter } = action.payload;
      const filtered = applyFilters(state.missions, filter, state.search);
      return {
        ...state,
        filter,
        totalPages: Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)),
        page: 1,
      };
    }

    case "SET_SEARCH": {
      const { search } = action.payload;
      const filtered = applyFilters(state.missions, state.filter, search);
      return {
        ...state,
        search,
        totalPages: Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)),
        page: 1,
      };
    }

    case "SET_PAGE": {
      return { ...state, page: action.payload.page };
    }

    case "CREATE_MISSION": {
      const missions = [action.payload.mission, ...state.missions];
      const filtered = applyFilters(missions, state.filter, state.search);
      return {
        ...state,
        missions,
        totalPages: Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)),
      };
    }

    case "UPDATE_MISSION": {
      const missions = state.missions.map((m) =>
        m.id === action.payload.mission.id ? action.payload.mission : m,
      );
      const filtered = applyFilters(missions, state.filter, state.search);
      return {
        ...state,
        missions,
        totalPages: Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)),
      };
    }

    case "DELETE_MISSION": {
      const missions = state.missions.filter((m) => m.id !== action.payload.id);
      const filtered = applyFilters(missions, state.filter, state.search);
      const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
      const page = Math.min(state.page, totalPages);
      return { ...state, missions, totalPages, page };
    }

    default:
      return state;
  }
}

/* ── Selector: get current page items ── */

export function getCurrentPageItems(
  missions: AdminMission[],
  filter: "all" | MissionStatus,
  search: string,
  page: number,
): AdminMission[] {
  const filtered = applyFilters(missions, filter, search);
  const start = (page - 1) * PAGE_SIZE;
  return filtered.slice(start, start + PAGE_SIZE);
}

/* ── Action dispatchers (thunk-like wrappers) ── */

export async function loadMissions(dispatch: React.Dispatch<MissionsAction>) {
  const missions = await MockDataService.getMissions();
  dispatch({ type: "LOAD_MISSIONS", payload: { missions } });
}

export async function createMission(
  dispatch: React.Dispatch<MissionsAction>,
  data: Parameters<typeof MockDataService.createMission>[0],
) {
  const mission = await MockDataService.createMission(data);
  dispatch({ type: "CREATE_MISSION", payload: { mission } });
}

export async function updateMission(
  dispatch: React.Dispatch<MissionsAction>,
  id: string,
  data: Partial<AdminMission>,
) {
  const mission = await MockDataService.updateMission(id, data);
  dispatch({ type: "UPDATE_MISSION", payload: { mission } });
}

export async function activateMission(
  dispatch: React.Dispatch<MissionsAction>,
  id: string,
) {
  const mission = await MockDataService.activateMission(id);
  dispatch({ type: "UPDATE_MISSION", payload: { mission } });
}

export async function cancelMission(
  dispatch: React.Dispatch<MissionsAction>,
  id: string,
  reason: string,
) {
  const mission = await MockDataService.cancelMission(id, reason);
  dispatch({ type: "UPDATE_MISSION", payload: { mission } });
}

export async function deleteMission(
  dispatch: React.Dispatch<MissionsAction>,
  id: string,
) {
  await MockDataService.deleteMission(id);
  dispatch({ type: "DELETE_MISSION", payload: { id } });
}
