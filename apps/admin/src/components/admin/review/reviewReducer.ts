import type { Dispatch } from "react";
import { sileo } from "sileo";

import type { ReviewSubmission } from "@shared/types";

import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import { stepSubmissionToReview } from "@/types/review/api-mappers";
import type { ReviewFilter } from "@/types/review/ReviewSubmission";

export interface ReviewState {
  submissions: ReviewSubmission[];
  filter: ReviewFilter;
  sortOrder: "newest" | "oldest";
  search: string;
  loading: boolean;
  selectedSubmission:
    | (ReviewSubmission & {
        verificationCriteria?: import("@shared/types").VerificationCriterion[];
      })
    | null;
  modalOpen: boolean;
}

export type ReviewAction =
  | { type: "LOAD_SUBMISSIONS"; payload: { submissions: ReviewSubmission[] } }
  | { type: "SET_FILTER"; payload: { filter: ReviewFilter } }
  | { type: "SET_SORT_ORDER"; payload: { sortOrder: "newest" | "oldest" } }
  | { type: "SET_SEARCH"; payload: { search: string } }
  | { type: "SELECT_SUBMISSION"; payload: { submission: ReviewSubmission } }
  | { type: "CLOSE_MODAL" }
  | { type: "UPDATE_STATUS"; payload: { id: string } };

export function reviewReducer(
  state: ReviewState,
  action: ReviewAction,
): ReviewState {
  switch (action.type) {
    case "LOAD_SUBMISSIONS":
      return {
        ...state,
        submissions: action.payload.submissions,
        loading: false,
      };
    case "SET_FILTER":
      return { ...state, filter: action.payload.filter };
    case "SET_SORT_ORDER":
      return { ...state, sortOrder: action.payload.sortOrder };
    case "SET_SEARCH":
      return { ...state, search: action.payload.search };
    case "SELECT_SUBMISSION":
      return {
        ...state,
        selectedSubmission: action.payload.submission,
        modalOpen: true,
      };
    case "CLOSE_MODAL":
      return { ...state, modalOpen: false, selectedSubmission: null };
    case "UPDATE_STATUS":
      return {
        ...state,
        submissions: state.submissions.filter(
          (s) => s.id !== action.payload.id,
        ),
        modalOpen: false,
        selectedSubmission: null,
      };
    default:
      return state;
  }
}

function getMessage(msg: string | string[] | undefined): string {
  if (!msg) return "Ocurrió un error inesperado";
  return Array.isArray(msg) ? msg.join("; ") : msg;
}

/* ── Action dispatchers (thunk-like wrappers) ── */

export async function loadReviewQueue(dispatch: Dispatch<ReviewAction>) {
  const result = await apiAdminGanaya.getReviewQueue();

  if (result.status && result.data) {
    const submissions = result.data.map(stepSubmissionToReview);
    dispatch({ type: "LOAD_SUBMISSIONS", payload: { submissions } });
    return;
  }

  sileo.error({
    title: "Error al cargar la cola de revisión",
    description: getMessage(result.message),
  });
  dispatch({ type: "LOAD_SUBMISSIONS", payload: { submissions: [] } });
}

export async function submitReview(
  dispatch: Dispatch<ReviewAction>,
  submissionId: string,
  body: { status: "APPROVED" | "REJECTED"; reviewerNotes?: string },
) {
  const result = await apiAdminGanaya.reviewStep(Number(submissionId), body);

  if (result.status) {
    sileo.success({
      title:
        body.status === "APPROVED"
          ? "Tarea aprobada correctamente"
          : "Tarea rechazada",
      duration: 3000,
    });
    dispatch({ type: "UPDATE_STATUS", payload: { id: submissionId } });
    return;
  }

  sileo.error({
    title: "Error al enviar la revisión",
    description: getMessage(result.message),
  });
}
