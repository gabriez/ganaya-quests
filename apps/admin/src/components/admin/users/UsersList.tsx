"use client";

import { useCallback, useEffect, useReducer, useState } from "react";
import { sileo } from "sileo";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Pagination } from "@/components/ui/Pagination";
import type { AdminUserFormData, UserRole } from "@/types/adminUsers";
import { UserFilterTabs } from "./UserFilterTabs";
import { UserFormModal } from "./UserFormModal";
import {
  createUser,
  getCurrentPageItems,
  initialState,
  loadUsers,
  updateUser,
  usersReducer,
} from "./UsersReducer";
import { UsersTable } from "./UsersTable";

/**
 * UsersList — orquestador principal de la página de usuarios administrativos.
 *
 * Maneja estado paginado con useReducer, filtros paralelos (rol + estado activo),
 * búsqueda por username, y el modal de creación/edición. Las operaciones
 * CRUD se delegan al API real mediante apiAdminGanaya.
 *
 * La contraseña solo es accesible para SUPER_ADMIN (puede establecerla pero
 * nunca verla — la API no la devuelve).
 */
function UsersList() {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  /* ── User Form Modal state ── */
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);

  /* ── Load users on mount ── */
  useEffect(() => {
    loadUsers(dispatch);
  }, []);

  /* ── Filtered + paginated items ── */
  const pageUsers = getCurrentPageItems(
    state.users,
    state.roleFilter,
    state.activeFilter,
    state.search,
    state.page,
  );

  /* ── Handlers ── */

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_SEARCH", payload: { search: e.target.value } });
    },
    [],
  );

  const handleRoleChange = useCallback((roleFilter: UserRole | "all") => {
    dispatch({ type: "SET_ROLE_FILTER", payload: { roleFilter } });
  }, []);

  const handleActiveChange = useCallback(
    (activeFilter: "all" | "active" | "inactive") => {
      dispatch({ type: "SET_ACTIVE_FILTER", payload: { activeFilter } });
    },
    [],
  );

  const handlePageChange = useCallback((page: number) => {
    dispatch({ type: "SET_PAGE", payload: { page } });
  }, []);

  const handleCreate = useCallback(() => {
    setEditingUser(null);
    setShowFormModal(true);
  }, []);

  const handleEdit = useCallback((id: number) => {
    setEditingUser(id);
    setShowFormModal(true);
  }, []);

  const handleToggleActive = useCallback(
    (id: number) => {
      const user = state.users.find((u) => u.id === id);
      if (!user) return;

      const willActivate = !user.isActive;
      const actionText = willActivate ? "activar" : "desactivar";

      sileo.action({
        title: willActivate ? "¿Activar usuario?" : "¿Desactivar usuario?",
        description: `¿Estás seguro de ${actionText} a "${user.username}"?`,
        button: {
          title: willActivate ? "Sí, activar" : "Sí, desactivar",
          onClick: async () => {
            const ok = await updateUser(dispatch, id, {
              isActive: !user.isActive,
            });
            if (ok) {
              sileo.success({
                title: willActivate
                  ? "Usuario activado"
                  : "Usuario desactivado",
                description: `El usuario "${user.username}" fue ${actionText} correctamente.`,
              });
            } else {
              sileo.error({
                title: "Error",
                description: `No se pudo ${actionText} al usuario "${user.username}".`,
              });
            }
          },
        },
        duration: 8000,
      });
    },
    [state.users],
  );

  /* ── User Form Modal handlers ── */

  const handleSave = useCallback(
    async (data: AdminUserFormData, isCreate: boolean) => {
      let ok: boolean;
      if (isCreate) {
        ok = await createUser(dispatch, data);
      } else if (editingUser !== null) {
        ok = await updateUser(dispatch, editingUser, data);
      } else {
        return;
      }
      if (ok) {
        setShowFormModal(false);
        setEditingUser(null);
        sileo.success({
          title: isCreate ? "Usuario creado" : "Usuario actualizado",
          description: `El usuario "${data.username}" fue ${
            isCreate ? "creado" : "actualizado"
          } correctamente.`,
        });
      } else {
        sileo.error({
          title: "Error",
          description: `No se pudo ${
            isCreate ? "crear" : "actualizar"
          } el usuario.`,
        });
      }
    },
    [editingUser],
  );

  const handleCloseModal = useCallback(() => {
    setShowFormModal(false);
    setEditingUser(null);
  }, []);

  /* ── Derive editing user object ── */
  const editingUserObj =
    editingUser !== null
      ? (state.users.find((u) => u.id === editingUser) ?? null)
      : null;

  /* ── Loading ── */
  if (state.loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-4xl text-primary animate-pulse">
            sync
          </span>
          <p className="text-body-md text-on-surface-variant">
            Cargando usuarios...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* ── Title ── */}
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface">Usuarios</h1>
        <p className="text-body-md text-on-surface-variant mt-1">
          Gestioná los administradores y revisores del panel
        </p>
      </div>

      {/* ── Top bar: Search + Create Button ── */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="w-full lg:max-w-sm">
          <Input
            id="search-users"
            icon="search"
            placeholder="Buscar por usuario..."
            value={state.search}
            onChange={handleSearchChange}
            wrapperClassName="w-full"
          />
        </div>
        <Button
          leadingIcon="person_add"
          onClick={handleCreate}
          className="whitespace-nowrap shrink-0 cursor-pointer max-md:w-full text-base font-bold bg-secondary hover:bg-secondary-fixed-dim"
        >
          Crear usuario
        </Button>
      </div>

      {/* ── Filter tabs ── */}
      <UserFilterTabs
        roleFilter={state.roleFilter}
        activeFilter={state.activeFilter}
        onRoleChange={handleRoleChange}
        onActiveChange={handleActiveChange}
      />

      {/* ── Table ── */}
      <UsersTable
        users={pageUsers}
        onEdit={handleEdit}
        onToggleActive={handleToggleActive}
      />

      {/* ── Pagination ── */}
      <div className="flex justify-center pt-4 border-t border-outline-variant/20">
        <Pagination
          current={state.page}
          total={state.totalPages}
          onChange={handlePageChange}
        />
      </div>

      {/* ── User Form Modal ── */}
      {showFormModal && (
        <UserFormModal
          open={showFormModal}
          onClose={handleCloseModal}
          user={editingUserObj}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

UsersList.displayName = "UsersList";

export { UsersList };
