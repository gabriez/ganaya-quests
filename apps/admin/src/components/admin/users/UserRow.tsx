"use client";

import { useCallback, useState } from "react";

import type { UserRowProps } from "@/types/adminUsers";

/**
 * UserRow — fila individual de la tabla de usuarios administrativos.
 *
 * Muestra username, password (enmascarado con toggle), rol y estado activo.
 * Incluye acciones para editar y activar/desactivar al usuario.
 */
function UserRow({ user, onEdit, onToggleActive }: UserRowProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const roleLabel = user.role === "admin" ? "Admin" : "Reviewer";

  return (
    <tr className="border-b border-outline-variant/20 last:border-b-0 hover:bg-surface-container-high/50 transition-colors">
      {/* Username */}
      <td className="py-3 px-4">
        <span className="text-body-md text-on-surface font-medium">
          {user.username}
        </span>
      </td>

      {/* Password (masked with toggle) */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <span className="text-body-md text-on-surface-variant font-mono">
            {showPassword ? user.password : "•".repeat(12)}
          </span>
          <button
            type="button"
            onClick={handleTogglePassword}
            className="text-outline hover:text-primary transition-colors cursor-pointer shrink-0"
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            <span className="material-symbols-outlined text-lg">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        </div>
      </td>

      {/* Role */}
      <td className="py-3 px-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-label-sm font-semibold ${
            user.role === "admin"
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
