"use client";

import type { UserRowProps } from "@/types/adminUsers";

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  REVIEWER: "Reviewer",
};

/**
 * UserRow — fila individual de la tabla de usuarios administrativos.
 *
 * Muestra username, rol y estado activo. La contraseña nunca se muestra
 * (la API no la devuelve). Incluye acciones para editar y activar/desactivar.
 */
function UserRow({ user, onEdit, onToggleActive }: UserRowProps) {
  const roleLabel = ROLE_LABELS[user.role] ?? user.role;

  return (
    <tr className="border-b border-outline-variant/20 last:border-b-0 hover:bg-surface-container-high/50 transition-colors">
      {/* Username */}
      <td className="py-3 px-4">
        <span className="text-body-md text-on-surface font-medium">
          {user.username}
        </span>
      </td>

      {/* Role */}
      <td className="py-3 px-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-label-sm font-semibold ${
            user.role === "SUPER_ADMIN"
              ? "bg-tertiary/15 text-tertiary"
              : "bg-primary/15 text-primary"
          }`}
        >
          {roleLabel}
        </span>
      </td>

      {/* Active status */}
      <td className="py-3 px-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-label-sm font-semibold ${
            user.isActive
              ? "bg-[#22c55e]/15 text-[#4ade80]"
              : "bg-error-container/30 text-error"
          }`}
        >
          {user.isActive ? "Activo" : "Inactivo"}
        </span>
      </td>

      {/* Actions */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(user.id)}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-outline hover:text-primary hover:bg-primary/10 transition-all cursor-pointer"
            aria-label={`Editar ${user.username}`}
          >
            <span className="material-symbols-outlined text-lg">edit</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleActive(user.id)}
            className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all cursor-pointer ${
              user.isActive
                ? "text-outline hover:text-error hover:bg-error/10"
                : "text-outline hover:text-[#4ade80] hover:bg-[#22c55e]/10"
            }`}
            aria-label={
              user.isActive
                ? `Desactivar ${user.username}`
                : `Activar ${user.username}`
            }
          >
            <span className="material-symbols-outlined text-lg">
              {user.isActive ? "block" : "check_circle"}
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
}

UserRow.displayName = "UserRow";

export { UserRow };
