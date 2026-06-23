"use client";

import { useCallback, useEffect, useReducer } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Pagination } from "@/components/ui/Pagination";
import type { FilterValue } from "./FilterTabs";
import { FilterTabs } from "./FilterTabs";
import {
  activateMission,
  cancelMission,
  deleteMission,
  getCurrentPageItems,
  initialState,
  loadMissions,
  missionsReducer,
} from "./MissionsReducer";
import { MissionTable } from "./MissionTable";

/**
 * MissionsList — main orchestrator for the Mission Control page.
 *
 * Provides:
 * 1. Search bar + "Crear misión" button (top)
 * 2. Status filter tabs
 * 3. Missions table (left) + Right sidebar (assets + hints)
 * 4. Pagination (bottom)
 *
 * Uses useReducer for page-local state. All actions go through
 * the reducer → MockDataService → dispatch cycle.
 */
function MissionsList() {
  const [state, dispatch] = useReducer(missionsReducer, initialState);

  /* ── Load missions on mount ── */
  useEffect(() => {
    loadMissions(dispatch);
  }, []);

  /* ── Filtered + paginated items ── */
  const pageMissions = getCurrentPageItems(
    state.missions,
    state.filter,
    state.search,
    state.page,
  );

  /* ── Handlers ── */

  const handleFilterChange = useCallback((filter: FilterValue) => {
    dispatch({ type: "SET_FILTER", payload: { filter } });
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_SEARCH", payload: { search: e.target.value } });
    },
    [],
  );

  const handlePageChange = useCallback((page: number) => {
    dispatch({ type: "SET_PAGE", payload: { page } });
  }, []);

  const handleCreate = useCallback(() => {
    // PR #4: open MissionFormModal
    console.log("Crear misión — modal coming in PR #4");
  }, []);

  const handleEdit = useCallback((id: string) => {
    // PR #4: open MissionFormModal in edit mode
    console.log("Edit mission:", id);
  }, []);

  const handleView = useCallback((id: string) => {
    // PR #4: open read-only view
    console.log("View mission:", id);
  }, []);

  const handleDuplicate = useCallback((id: string) => {
    // PR #4: duplicate through modal
    console.log("Duplicate mission:", id);
  }, []);

  const handleActivate = useCallback((id: string) => {
    const confirmed = window.confirm(
      "¿Activar misión? El contenido quedará bloqueado.",
    );
    if (!confirmed) return;
    activateMission(dispatch, id).catch((err) => {
      console.error("Failed to activate mission:", err);
    });
  }, []);

  const handleCancel = useCallback((id: string) => {
    const reason = window.prompt("Motivo de cancelación:");
    if (!reason || !reason.trim()) return;
    cancelMission(dispatch, id, reason.trim()).catch((err) => {
      console.error("Failed to cancel mission:", err);
    });
  }, []);

  const handleDelete = useCallback((id: string) => {
    const confirmed = window.confirm("¿Eliminar misión?");
    if (!confirmed) return;
    deleteMission(dispatch, id).catch((err) => {
      console.error("Failed to delete mission:", err);
    });
  }, []);

  /* ── Loading ── */
  if (state.loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-4xl text-primary animate-pulse">
            sync
          </span>
          <p className="text-body-md text-on-surface-variant">
            Cargando misiones...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* ── Top bar: Search + Create Button ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-full sm:max-w-sm">
          <Input
            icon="search"
            placeholder="Buscar misiones..."
            value={state.search}
            onChange={handleSearchChange}
            wrapperClassName="w-full"
          />
        </div>
        <Button
          leadingIcon="add_circle"
          onClick={handleCreate}
          className="whitespace-nowrap shrink-0"
        >
          Crear misión
        </Button>
      </div>

      {/* ── Filter Tabs ── */}
      <FilterTabs activeFilter={state.filter} onChange={handleFilterChange} />

      {/* ── Main content: Table + Right sidebar ── */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Table area */}
        <div className="flex-1 min-w-0">
          <MissionTable
            missions={pageMissions}
            onEdit={handleEdit}
            onActivate={handleActivate}
            onCancel={handleCancel}
            onDelete={handleDelete}
            onView={handleView}
            onDuplicate={handleDuplicate}
          />
        </div>

        {/* Right sidebar */}
        <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
          {/* Mission Assets placeholder */}
          <div className="rounded-lg border-2 border-dashed border-outline-variant/40 p-8 flex flex-col items-center text-center gap-3 transition-colors hover:border-primary/30">
            <span className="material-symbols-outlined text-4xl text-outline/60">
              cloud_upload
            </span>
            <p className="text-body-md font-semibold text-on-surface-variant">
              Mission Assets
            </p>
            <p className="text-label-sm text-outline">
              Subí imágenes, íconos o recursos multimedia para la misión
            </p>
            <button
              type="button"
              className="mt-2 px-4 py-2 rounded-lg border border-primary/40 text-primary text-label-sm font-semibold hover:bg-primary/10 transition-colors cursor-pointer"
              onClick={() => console.log("Upload assets — coming in future PR")}
            >
              Seleccionar archivos
            </button>
          </div>

          {/* Configuration hint */}
          <div className="rounded-lg bg-primary/5 border border-primary/15 p-4 flex items-start gap-3">
            <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">
              info
            </span>
            <div className="text-body-md text-on-surface-variant">
              <p className="font-semibold text-on-surface mb-1">
                Configuración bloqueada
              </p>
              <p>
                Las misiones activas tienen su contenido bloqueado. Cancelá la
                misión primero si necesitás editarla.
              </p>
            </div>
          </div>
        </aside>
      </div>

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

MissionsList.displayName = "MissionsList";

export { MissionsList };
