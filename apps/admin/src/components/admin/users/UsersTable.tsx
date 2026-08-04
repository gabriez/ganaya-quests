"use client";

import type { UsersTableProps } from "@/types/adminUsers";
import { UserRow } from "./UserRow";

/**
 * UsersTable — tabla de usuarios administrativos.
 *
 * Renderiza el encabezado con las columnas y las filas mediante UserRow.
 * Sigue el mismo patrón visual que MissionTable, adaptado a los campos
 * de usuario según Midnight Harbor.
 */
function UsersTable({ users, onEdit, onToggleActive }: UsersTableProps) {
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="material-symbols-outlined text-5xl text-outline/40 mb-3">
          group_off
        </span>
        <p className="text-body-md text-on-surface-variant">
          No se encontraron usuarios
        </p>
        <p className="text-label-sm text-outline mt-1">
          Probá con otros filtros o creá un nuevo usuario
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-outline-variant/20">
      <table className="w-full min-w-150">
        {/* ── Header ── */}
        <thead>
          <tr className="bg-surface-container-high border-b border-outline-variant/20">
            <th className="py-3 px-4 text-left text-label-sm font-semibold text-on-surface-variant">
              Usuario
            </th>
            <th className="py-3 px-4 text-left text-label-sm font-semibold text-on-surface-variant">
              Contraseña
            </th>
            <th className="py-3 px-4 text-left text-label-sm font-semibold text-on-surface-variant">
              Rol
            </th>
            <th className="py-3 px-4 text-left text-label-sm font-semibold text-on-surface-variant">
              Estado
            </th>
            <th className="py-3 px-4 text-left text-label-sm font-semibold text-on-surface-variant">
              Acciones
            </th>
          </tr>
        </thead>

        {/* ── Body ── */}
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onEdit={onEdit}
              onToggleActive={onToggleActive}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

UsersTable.displayName = "UsersTable";

export { UsersTable };
