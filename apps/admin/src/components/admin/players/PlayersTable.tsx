"use client";

import type { PlayersTableProps } from "@/types/adminPlayers";
import { PlayerRow } from "./PlayerRow";

/**
 * PlayersTable — tabla de jugadores de la plataforma.
 *
 * Renderiza el encabezado con las columnas de stats y las filas
 * mediante PlayerRow. Sigue el mismo patrón visual que UsersTable
 * adaptado a los campos de jugador según Midnight Harbor.
 */
function PlayersTable({ players }: PlayersTableProps) {
  if (players.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="material-symbols-outlined text-5xl text-outline/40 mb-3">
          stadia_controller
        </span>
        <p className="text-body-md text-on-surface-variant">
          No se encontraron jugadores
        </p>
        <p className="text-label-sm text-outline mt-1">
          Probá con otros filtros o verificá que haya jugadores registrados
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-outline-variant/20">
      <table className="w-full min-w-200">
        {/* ── Header ── */}
        <thead>
          <tr className="bg-surface-container-high border-b border-outline-variant/20">
            <th className="py-3 px-4 text-left text-label-sm font-semibold text-on-surface-variant">
              Jugador
            </th>
            <th className="py-3 px-4 text-left text-label-sm font-semibold text-on-surface-variant">
              Nivel
            </th>
            <th className="py-3 px-4 text-left text-label-sm font-semibold text-on-surface-variant">
              Experiencia
            </th>
            <th className="py-3 px-4 text-left text-label-sm font-semibold text-on-surface-variant">
              Fichas
            </th>
            <th className="py-3 px-4 text-left text-label-sm font-semibold text-on-surface-variant">
              Completadas
            </th>
            <th className="py-3 px-4 text-left text-label-sm font-semibold text-on-surface-variant">
              En curso
            </th>
          </tr>
        </thead>

        {/* ── Body ── */}
        <tbody>
          {players.map((player) => (
            <PlayerRow key={player.id} player={player} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

PlayersTable.displayName = "PlayersTable";

export { PlayersTable };
