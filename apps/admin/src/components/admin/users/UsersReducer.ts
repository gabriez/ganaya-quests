/**
 * UsersReducer — state management for the Users admin page.
 *
 * Page-local state via useReducer. Handles loading, filtering by role and
 * active status, text search, and pagination. Follows the same pattern
 * as MissionsReducer.
 */

import type { Dispatch } from "react";

import type {
  AdminUser,
  AdminUserFormData,
  UserActiveStatus,
  UserRole,
  UsersAction,
  UsersState,
} from "@/types/adminUsers";
import { MOCK_USERS } from "./mockData";

/* ── Constants ── */

const PAGE_SIZE = 8;

/* ── Initial State ── */

export const initialState: UsersState = {
  users: [],
  roleFilter: "all",
  activeFilter: "all",
  search: "",
  page: 1,
  totalPages: 1,
  loading: true,
};

/* ── Filter + Search logic ── */

function applyFilters(
  users: AdminUser[],
  roleFilter: UserRole | "all",
  activeFilter: UserActiveStatus,
  search: string,
): AdminUser[] {
  let filtered = users;

  // Role filter
  if (roleFilter !== "all") {
    filtered = filtered.filter((u) => u.role === roleFilter);
  }

  // Active status filter
  if (activeFilter === "active") {
    filtered = filtered.filter((u) => u.isActive);
  } else if (activeFilter === "inactive") {
    filtered = filtered.filter((u) => !u.isActive);
  }

  // Text search by username
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter((u) => u.username.toLowerCase().includes(q));
  }

  return filtered;
}

function getTotalPages(length: number) {
  return Math.max(1, Math.ceil(length / PAGE_SIZE));
}

/* ── Reducer ── */

export function usersReducer(
  state: UsersState,
  action: UsersAction,
): UsersState {
  switch (action.type) {
    case "SET_USERS": {
      const users = action.payload.users;
      const filtered = applyFilters(
        users,
        state.roleFilter,
        state.activeFilter,
        state.search,
      );
      return {
        ...state,
        users,
        totalPages: getTotalPages(filtered.length),
        loading: false,
        page: 1,
      };
    }

    case "SET_ROLE_FILTER": {
      const { roleFilter } = action.payload;
      const filtered = applyFilters(
        state.users,
        roleFilter,
        state.activeFilter,
        state.search,
      );
      return {
        ...state,
        roleFilter,
        totalPages: getTotalPages(filtered.length),
        page: 1,
      };
    }

    case "SET_ACTIVE_FILTER": {
      const { activeFilter } = action.payload;
      const filtered = applyFilters(
        state.users,
        state.roleFilter,
        activeFilter,
        state.search,
      );
      return {
        ...state,
        activeFilter,
        totalPages: getTotalPages(filtered.length),
        page: 1,
      };
    }

    case "SET_SEARCH": {
      const { search } = action.payload;
      const filtered = applyFilters(
        state.users,
        state.roleFilter,
        state.activeFilter,
        search,
      );
      return {
        ...state,
        search,
        totalPages: getTotalPages(filtered.length),
        page: 1,
      };
    }

    case "SET_PAGE": {
      return { ...state, page: action.payload.page };
    }

    case "CREATE_USER": {
      const users = [action.payload.user, ...state.users];
      const filtered = applyFilters(
        users,
        state.roleFilter,
        state.activeFilter,
        state.search,
      );
      return {
        ...state,
        users,
        totalPages: getTotalPages(filtered.length),
      };
    }

    case "UPDATE_USER": {
      const users = state.users.map((u) =>
        u.id === action.payload.user.id ? action.payload.user : u,
      );
      const filtered = applyFilters(
        users,
        state.roleFilter,
        state.activeFilter,
        state.search,
      );
      return {
        ...state,
        users,
        totalPages: getTotalPages(filtered.length),
      };
    }

    case "TOGGLE_USER_ACTIVE": {
      const users = state.users.map((u) =>
        u.id === action.payload.id ? { ...u, isActive: !u.isActive } : u,
      );
      const filtered = applyFilters(
        users,
        state.roleFilter,
        state.activeFilter,
        state.search,
      );
      return {
        ...state,
        users,
        totalPages: getTotalPages(filtered.length),
      };
    }

    default:
      return state;
  }
}

/* ── Selector: get current page items ── */

export function getCurrentPageItems(
  users: AdminUser[],
  roleFilter: UserRole | "all",
  activeFilter: UserActiveStatus,
  search: string,
  page: number,
): AdminUser[] {
  const filtered = applyFilters(users, roleFilter, activeFilter, search);
  const start = (page - 1) * PAGE_SIZE;
  return filtered.slice(start, start + PAGE_SIZE);
}

/* ── Helpers ── */

let nextId = 11;

/** Generate a sequential ID for new users */
export function generateUserId(): string {
  return String(nextId++);
}

/* ── Action dispatchers (simulated async) ── */

/** Load mock users on mount */
export async function loadUsers(dispatch: Dispatch<UsersAction>) {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 300));
  dispatch({ type: "SET_USERS", payload: { users: MOCK_USERS } });
}

/** Create a new user from form data */
export async function createUser(
  dispatch: Dispatch<UsersAction>,
  data: AdminUserFormData,
): Promise<boolean> {
  const newUser: AdminUser = {
    id: generateUserId(),
    username: data.username,
    password: data.password,
    role: data.role,
    isActive: data.isActive,
    createdAt: new Date().toISOString(),
  };

  dispatch({ type: "CREATE_USER", payload: { user: newUser } });
  return true;
}

/** Update an existing user */
export async function updateUser(
  dispatch: Dispatch<UsersAction>,
  id: string,
  data: AdminUserFormData,
): Promise<boolean> {
  const updatedUser: AdminUser = {
    id,
    username: data.username,
    password: data.password,
    role: data.role,
    isActive: data.isActive,
    createdAt: new Date().toISOString(),
  };

  dispatch({ type: "UPDATE_USER", payload: { user: updatedUser } });
  return true;
}
