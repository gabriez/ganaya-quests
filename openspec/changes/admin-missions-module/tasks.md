# Tasks: Admin Missions Module

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~1800-2200 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 (types+atoms) → PR 2 (layout) → PR 3 (missions page) → PR 4 (form modal) |
| Delivery strategy | auto-chain |
| Chain strategy | feature-branch-chain |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Foundation + UI atoms | PR 1 | Base = feature/tracker branch |
| 2 | Admin layout + sidebar | PR 2 | Base = PR #1 branch |
| 3 | Mission control page | PR 3 | Base = PR #2 branch |
| 4 | Mission form modal | PR 4 | Base = PR #3 branch |

## Phase 1: Foundation & UI Atoms — PR #1

- [x] 1.1 Create `packages/shared/src/types/admin.ts` — AdminMission, MissionStatus, MissionStep, MissionCategory, VerificationType
- [x] 1.2 Export new admin types from `packages/shared/src/types/index.ts`
- [x] 1.3 Add ADMIN_ROUTES, ADMIN_LINKS to `packages/shared/src/constants.tsx`
- [x] 1.4 Create `apps/admin/src/components/ui/Modal.tsx` — glassmorphism overlay with backdrop blur
- [x] 1.5 Create `apps/admin/src/components/ui/Select.tsx` — dropdown with focus glow (match Input pattern)
- [x] 1.6 Create `apps/admin/src/components/ui/Textarea.tsx` — multi-line with char counter
- [x] 1.7 Create `apps/admin/src/components/ui/Badge.tsx` — status color variants (gray/blue/green/red)
- [x] 1.8 Create `apps/admin/src/components/ui/Pagination.tsx` — page nav with active highlight
- [x] 1.9 Create `apps/admin/src/components/ui/DropdownMenu.tsx` — action menu with icons

## Phase 2: Admin Layout — PR #2

- [x] 2.1 Create `apps/admin/src/components/admin/layout/AdminSidebar.tsx` — nav, CTA, user badge, settings+logout
- [x] 2.2 Create `apps/admin/src/components/admin/layout/MobileDrawer.tsx` — overlay with hamburger toggle
- [x] 2.3 Create `apps/admin/src/app/panel/layout.tsx` — shell: sidebar + drawer + content area

## Phase 3: Mission Control Page — PR #3

- [x] 3.1 Create `apps/admin/src/components/admin/missions/MockDataService.ts` — typed in-memory CRUD
- [x] 3.2 Create `apps/admin/src/components/admin/missions/MissionsReducer.ts` — LOAD/SET_FILTER/SET_SEARCH/CREATE/UPDATE/ACTIVATE/CANCEL/DELETE
- [x] 3.3 Create `apps/admin/src/components/admin/missions/FilterTabs.tsx` — status filter chips
- [x] 3.4 Create `apps/admin/src/components/admin/missions/MissionTable.tsx` — table layout
- [x] 3.5 Create `apps/admin/src/components/admin/missions/MissionRow.tsx` — row with all fields
- [x] 3.6 Create `apps/admin/src/components/admin/missions/RowActions.tsx` — contextual buttons per state
- [x] 3.7 Create `apps/admin/src/components/admin/missions/MissionsList.tsx` — orchestrator: search+filters+table+pagination
- [x] 3.8 Update `apps/admin/src/app/panel/page.tsx` — wire reducer + MissionsList + right panel

## Phase 4: Mission Form Modal — PR #4

- [ ] 4.1 Create `apps/admin/src/components/admin/mission-form/StepCard.tsx` — step row with up/down/remove
- [ ] 4.2 Create `apps/admin/src/components/admin/mission-form/StepBuilder.tsx` — step list + add/reorder
- [ ] 4.3 Create `apps/admin/src/components/admin/mission-form/MissionFields.tsx` — field group with inline validation
- [ ] 4.4 Create `apps/admin/src/components/admin/mission-form/MissionFormModal.tsx` — modal wrapper + content lock + submit
- [ ] 4.5 Wire create/edit/activate/cancel flows in page.tsx via reducer dispatch
