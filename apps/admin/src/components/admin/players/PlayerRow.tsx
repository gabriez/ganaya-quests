"use client";

import type { PlayerRowProps } from "@/types/adminPlayers";

/**
 * PlayerRow — fila individual de la tabla de jugadores.
 *
 * Muestra username con avatar, teléfono y estado (activo/suspendido).
 * Sigue el patrón visual de UserRow según Midnight Harbor.
 */
function PlayerRow({ player }: PlayerRowProps) {
  /* ── Avatar por defecto desde el username ── */
  const initial = player.username.charAt(0).toUpperCase();
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

      {/* Phone */}
      <td className="py-3 px-4 text-body-md text-on-surface-variant">
        {player.phone ?? "—"}
      </td>

      {/* Status */}
      <td className="py-3 px-4">
        {player.isActive ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#4ade80]/15 text-[#4ade80] text-label-sm font-semibold">
            <span className="material-symbols-outlined text-sm">
              check_circle
            </span>
            Activo
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/15 text-secondary text-label-sm font-semibold">
            <span className="material-symbols-outlined text-sm">cancel</span>
            Suspendido
          </span>
        )}
      </td>
    </tr>
  );
}

PlayerRow.displayName = "PlayerRow";

export { PlayerRow };
