"use client";

import type { PlayerRowProps } from "@/types/adminPlayers";

/**
 * PlayerRow — fila individual de la tabla de jugadores.
 *
 * Muestra username, nivel, experiencia, fichas, misiones completadas
 * y en curso. Sigue el patrón visual de UserRow adaptado a stats de jugador.
 */
function PlayerRow({ player }: PlayerRowProps) {
  /* ── Avatar por defecto desde el username ── */
  const initial = player.username.charAt(0).toUpperCase();

  /* ── Barra de XP hacia el siguiente nivel ── */
  const xpForCurrentLevel = (player.level - 1) * 1000;
  const xpForNextLevel = player.level * 1000;
  const xpProgress = Math.min(
    ((player.experience - xpForCurrentLevel) /
      (xpForNextLevel - xpForCurrentLevel)) *
      100,
    100,
  );

  return (
    <tr className="border-b border-outline-variant/20 last:border-b-0 hover:bg-surface-container-high/50 transition-colors">
      {/* Username + avatar */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/15 text-primary text-label-md font-bold shrink-0">
            {initial}
          </span>
          <span className="text-body-md text-on-surface font-medium">
            {player.username}
          </span>
        </div>
      </td>

      {/* Level */}
      <td className="py-3 px-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/15 text-primary text-label-sm font-semibold">
          <span className="material-symbols-outlined text-sm">stars</span>
          {player.level}
        </span>
      </td>

      {/* Experience */}
      <td className="py-3 px-4">
        <div className="flex flex-col gap-1 min-w-32">
          <div className="flex items-center justify-between text-label-sm text-on-surface-variant">
            <span>{player.experience.toLocaleString()} XP</span>
            <span>Nv. {player.level + 1}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-outline-variant/30 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${xpProgress}%` }}
              role="progressbar"
              aria-valuenow={Math.round(xpProgress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${Math.round(xpProgress)}% de progreso al nivel ${player.level + 1}`}
            />
          </div>
        </div>
      </td>

      {/* Coins */}
      <td className="py-3 px-4">
        <span className="inline-flex items-center gap-1.5 text-label-md font-semibold text-secondary">
          <span className="material-symbols-outlined text-lg">token</span>
          {player.coins.toLocaleString()}
        </span>
      </td>

      {/* Completed missions */}
      <td className="py-3 px-4">
        <span className="inline-flex items-center gap-1.5 text-body-md text-on-surface-variant">
          <span className="material-symbols-outlined text-lg text-[#4ade80]">
            check_circle
          </span>
          {player.completedMissions}
        </span>
      </td>

      {/* In-progress missions */}
      <td className="py-3 px-4">
        <span className="inline-flex items-center gap-1.5 text-body-md text-on-surface-variant">
          <span className="material-symbols-outlined text-lg text-primary">
            pending_actions
          </span>
          {player.inProgressMissions}
        </span>
      </td>
    </tr>
  );
}

PlayerRow.displayName = "PlayerRow";

export { PlayerRow };
