# Admin Missions Specification

## Purpose

Admin missions list view: fetch, filter, search, and manage mission lifecycle states.

## Requirements

### REQ-MISSIONS-001: Missions Table

| Property | Value |
|----------|-------|
| Priority | High |
| Columns | Title, Reward, XP, Status, Steps, Participants, Actions |

The system MUST render a table of all missions. Each row MUST display: title, token reward, XP reward, status badge, steps count, participants count, and action buttons.

#### Scenario: Table renders with mock data

- GIVEN the missions page loads
- WHEN the mock service returns a mission list
- THEN each mission renders as a table row with all fields populated
- AND the status badge shows the correct color (Inactive=gray, Active=blue, Completed=green, Cancelled=red)

### REQ-MISSIONS-002: Status Filters

| Property | Value |
|----------|-------|
| Priority | High |
| Options | All, Active, Inactive, Completed, Cancelled |

The system MUST provide filter chips/tabs to narrow the mission list by status. "All" is the default selection.

#### Scenario: Filter by status

- GIVEN the missions page is loaded
- WHEN the user clicks "Active"
- THEN only missions with status=Active appear in the table

#### Scenario: No results for filter

- GIVEN no missions match the selected filter
- WHEN the filter is applied
- THEN an empty state message is displayed: "No hay misiones en este estado"

### REQ-MISSIONS-003: State Transitions

| Transition | Allowed? | Notes |
|-----------|----------|-------|
| Inactive → Active | Yes | Locks content, begins timer |
| Active → Completed | Via backend | Manual or expiry |
| Active → Cancelled | Yes | Admin action |
| Inactive → Deleted | Yes | Only if no participants |

The system MUST enforce the mission state machine. Activation MUST require confirmation. Cancellation MUST require a reason.

#### Scenario: Activate mission

- GIVEN a mission is Inactive
- WHEN the admin clicks "Activate"
- THEN a confirmation dialog appears: "¿Activar misión? El contenido quedará bloqueado."
- AND on confirm, the mission status changes to Active

#### Scenario: Cancel active mission

- GIVEN a mission is Active
- WHEN the admin clicks "Cancel"
- THEN a dialog asks for a cancellation reason
- AND on confirm, the mission status changes to Cancelled

#### Scenario: Edit disabled for active mission

- GIVEN a mission is Active
- WHEN the table renders
- THEN the Edit button MUST be hidden or disabled
- AND the View button is the only read action shown

### REQ-MISSIONS-004: Row Actions

| Action | Visible when | Behavior |
|--------|-------------|----------|
| Edit | Inactive | Opens mission form modal |
| Activate | Inactive | Shows confirm → transitions to Active |
| Cancel | Active | Shows reason dialog → transitions to Cancelled |
| View | Always | Opens read-only detail view |
| Delete | Inactive | Shows confirm → removes mission |

The system MUST show context-appropriate action buttons per row. Actions not available for the mission's state MUST be hidden.

#### Scenario: Actions match state

- GIVEN a mission with status=Inactive
- WHEN the row renders
- THEN Edit, Activate, and Delete buttons are visible
- AND Cancel is NOT visible

#### Scenario: Delete inactive mission

- GIVEN a mission is Inactive
- WHEN the admin clicks "Delete"
- THEN a confirmation dialog appears
- AND on confirm, the mission is removed from the list
