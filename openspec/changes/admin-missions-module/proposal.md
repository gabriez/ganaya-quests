# Proposal: Admin Missions Management Module

## Intent

Build the admin panel for managing casino missions — create, edit, activate, cancel, and monitor missions. Currently the admin app (`apps/admin`) has only a login screen and a `/panel` placeholder. Missions are user-facing (card display) with no admin CRUD or state management.

## Scope

### In Scope
- Admin panel layout with sidebar navigation (missions, task review, users)
- Missions list view with status filters, search, and action buttons
- Create/edit mission modal (not separate pages) with full form
- Mission state machine: Inactive → Active → Completed/Cancelled
- Mission types: Daily (24h), Weekly (7d), Fixed (no expiry)
- Content lock on Active (title/description/steps become immutable)
- Admin-only creation; Reviewer role for task validation (layout only, no reviewer logic yet)

### Out of Scope
- Reviewer task validation flow (separate module)
- User management screen (separate module)
- Real API/backend integration (mock data layer in this slice)
- Push notifications or real-time updates
- Tier/Legacy/Elite system (removed from design)

## Capabilities

### New Capabilities
- `admin-layout`: Sidebar, session guard, responsive shell for admin routes
- `admin-missions`: Missions list, filters, state transitions (activate/cancel)
- `admin-mission-form`: Create/edit modal, step builder, content lock on activation

### Modified Capabilities
None — no existing admin specs to modify.

## Approach

Hybrid: modal for create/edit (no route change, keeps context) + dedicated list view. On mount, fetch missions via mock service. Row actions in dropdown: Edit (Inactive only), Activate, Cancel, View. Content FREEZES on Activate — step details and reward values become read-only. Use shared types extended for admin-domain fields. New UI atoms needed: Modal, Select, Textarea, Badge, Pagination, DropdownMenu.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `apps/admin/src/app/panel/` | Modified | Add missions page, sidebar layout |
| `apps/admin/src/components/admin/missions/` | New | Missions list, table, filters, action row |
| `apps/admin/src/components/admin/mission-form/` | New | Create/edit modal, steps builder |
| `apps/admin/src/components/admin/layout/` | New | Sidebar, panel shell |
| `apps/admin/src/components/ui/` | Modified | Add Modal, Select, Textarea, Badge |
| `packages/shared/src/types/` | Modified | Extend `Mission` for admin (state, steps, reward) |
| `packages/shared/src/constants.tsx` | Modified | Add admin route constants |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Content lock edge cases | Med | Explicit state validation before activation |
| Large modal form UX | Med | Break into sections: details, rewards, steps |
| Missing panel layout | Low | Build minimal sidebar first in this change |

## Rollback Plan

Revert commits for `apps/admin/src/components/admin/missions/`, `mission-form/`, `layout/`. Restore `panel/page.tsx` to placeholder. Keep UI atoms in `components/ui/` if non-breaking.

## Dependencies

- Next.js 16.2.6 app router (existing)
- Shared `Mission` type (extend, not replace)
- Material Symbols (already loaded in root layout)

## Success Criteria

- [ ] Admin can see all missions in a filterable table
- [ ] Admin can create a mission (Inactive) via modal
- [ ] Admin can edit an Inactive mission, but NOT an Active one
- [ ] Activating a mission locks all content fields
- [ ] Missions show correct state chip (Inactive/Active/Completed/Cancelled)
- [ ] Sidebar navigation renders with "Misiones" as default active
