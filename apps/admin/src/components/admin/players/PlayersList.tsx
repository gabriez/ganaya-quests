"use client";

import { useCallback, useEffect, useReducer } from "react";

import { Pagination } from "@/components/ui/Pagination";
import type { PlayerFilters } from "@/types/adminPlayers";
import { PlayersFilterBar } from "./PlayersFilterBar";
import {
  applyFilters,
  initialState,
  loadPlayers,
  playersReducer,
} from "./PlayersReducer";
import { PlayersTable } from "./PlayersTable";

/**
 * PlayersList — orquestador principal de la pantalla de jugadores.
 *
 * Maneja el estado global (carga, filtros, paginación) y renderiza
 * la barra de búsqueda, filtros, tabla y paginación. Sigue el mismo
 * patrón que UsersList y MissionsList.
 */
function PlayersList() {
  const [state, dispatch] = useReducer(playersReducer, initialState);

  /* ── Load players on mount / page change ── */
  useEffect(() => {
    loadPlayers(dispatch, state.page);
  }, [state.page]);

  /* ── Filtered items ── */
  const pagePlayers = applyFilters(state.players, state.filters);

  /* ── Handlers ── */

  const handleFilterChange = useCallback((filter: Partial<PlayerFilters>) => {
    dispatch({ type: "SET_FILTER", payload: { filter } });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    dispatch({ type: "SET_PAGE", payload: { page } });
  }, []);

  /* ── Loading ── */
  if (state.loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-4xl text-primary animate-pulse">
            stadia_controller
          </span>
          <p className="text-body-md text-on-surface-variant">
            Cargando jugadores...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* ── Title ── */}
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface">
          Jugadores
        </h1>
        <p className="text-body-md text-on-surface-variant mt-1">
          Explorá los jugadores registrados y su estado
        </p>
      </div>

      {/* ── Filter bar ── */}
      <PlayersFilterBar
        filters={state.filters}
        onFilterChange={handleFilterChange}
      />

      {/* ── Table ── */}
      <PlayersTable players={pagePlayers} />

      {/* ── Pagination ── */}
      <div className="flex justify-center pt-4 border-t border-outline-variant/20">
        <Pagination
          current={state.page}
          total={state.totalPages}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

PlayersList.displayName = "PlayersList";

export { PlayersList };
