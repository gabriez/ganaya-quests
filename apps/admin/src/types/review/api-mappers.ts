/**
 * api-mappers — field mappers between UI ReviewSubmission and backend StepSubmission.
 *
 * Handles:
 * - status (lowercase ↔ UPPERCASE)
 * - degraded fallbacks for derived fields the backend response does not yet
 *   include (player name, mission title/category, submission timestamp)
 */

// TODO(backend): backend enhancements needed to fully populate the admin review panel:
// 1. Enrich GET /admin/missions/review-queue to return mission title/type and player name (the panel currently cannot show them).
// 2. Expose a submittedAt/createdAt timestamp on StepSubmission for relative-time display (only reviewedAt is available now, and it's null while PENDING).
// 3. Persist the real reviewer id on review (backend currently hardcodes reviewerId = 1, see TODO in backend).
// 4. Validate the review request body with a DTO (backend currently uses an inline unvalidated body).
// 5. Expose an endpoint for APPROVED/REJECTED review history (the panel has history tabs but the queue endpoint returns only PENDING).

import type { ReviewStatus, ReviewSubmission } from "@shared/types";

import type {
  StepSubmission,
  StepSubmissionStatus,
} from "@/types/review/StepSubmission";

/* ── Constants ── */

const STATUS_TO_FRONTEND: Record<StepSubmissionStatus, ReviewStatus> = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

/* ── Mappers ── */

/**
 * Map backend step status to frontend review status.
 */
export function mapStepStatus(status: StepSubmissionStatus): ReviewStatus {
  return STATUS_TO_FRONTEND[status];
}

/**
 * Convert backend StepSubmission → frontend ReviewSubmission.
 *
 * Derived fields not present in the backend response degrade gracefully;
 * each one is annotated with a TODO(backend).
 */
export function stepSubmissionToReview(step: StepSubmission): ReviewSubmission {
  return {
    id: String(step.id),
    missionId: String(step.userMissionId), // TODO(backend): real missionId not in response
    userId: String(step.userMissionId), // TODO(backend): real userId not in response
    userName: "", // TODO(backend): player name not in response
    missionTitle: `Paso ${step.missionStepId}`, // TODO(backend): mission title not in response
    missionCategory: undefined, // TODO(backend): mission type not in response
    missionDescription: undefined,
    submittedAt: step.reviewedAt ?? "", // TODO(backend): no submittedAt field
    images: step.submissionImageUrl ? [step.submissionImageUrl] : [],
    userNote: step.submissionText ?? undefined,
    status: mapStepStatus(step.status),
  };
}
