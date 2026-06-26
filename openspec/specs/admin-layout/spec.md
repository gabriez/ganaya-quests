# Admin Layout Specification

## Purpose

Provides the authenticated admin shell: sidebar navigation, session guard, and responsive wrapper for all panel routes (`/panel/*`).

## Requirements

### REQ-LAYOUT-001: Session Guard

| Property | Value |
|----------|-------|
| Priority | High |
| Method | `layout.tsx` guard (parent layout check) |

The admin layout MUST redirect unauthenticated users to `/login` before rendering any panel content. Session state MUST be checked on mount and on route change.

#### Scenario: Unauthenticated user redirected

- GIVEN the user is NOT authenticated
- WHEN they navigate to `/panel/misiones`
- THEN they are redirected to `/login`
- AND the panel content is NOT rendered

#### Scenario: Authenticated user sees panel

- GIVEN the user IS authenticated
- WHEN they navigate to `/panel/*`
- THEN the layout renders the sidebar and content area

### REQ-LAYOUT-002: Sidebar Navigation

| Property | Value |
|----------|-------|
| Priority | High |
| Collapsible | Mobile: hidden behind hamburger; Desktop: always visible |

The sidebar MUST display navigation items: **Misiones** (default active), **Revisión de Tareas** (placeholder), and **Usuarios** (placeholder). Active route MUST be visually highlighted.

#### Scenario: Sidebar highlights active route

- GIVEN the user is on `/panel/misiones`
- WHEN the sidebar renders
- THEN "Misiones" is marked as active with the primary accent color

#### Scenario: Mobile sidebar collapses

- GIVEN the viewport is < 768px
- WHEN the panel loads
- THEN the sidebar is hidden
- AND a hamburger icon is shown to toggle it

### REQ-LAYOUT-003: Responsive Shell

| Property | Value |
|----------|-------|
| Breakpoint | 768px (mobile/desktop) |
| Max width | 1280px content area |

The shell MUST provide a consistent layout: sidebar (desktop) + top bar (mobile) + content area with padding per the Midnight Harbor container specs.

#### Scenario: Desktop layout

- GIVEN the viewport is >= 768px
- WHEN the panel renders
- THEN the sidebar is fixed on the left
- AND the content area fills the remaining width with 32px padding

#### Scenario: Mobile layout

- GIVEN the viewport is < 768px
- WHEN the panel renders
- THEN the sidebar overlays the content as a drawer
- AND the content area has 16px padding
