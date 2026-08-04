"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";

import { ReviewableCard } from "./ReviewableCard";
import { ReviewFilterBar } from "./ReviewFilterBar";
import { ReviewModal } from "./ReviewModal";
import {
  loadReviewQueue,
  type ReviewState,
  reviewReducer,
  submitReview,
} from "./reviewReducer";
import { SkeletonCard } from "./SkeletonCard";

const INITIAL_STATE: ReviewState = {
  submissions: [],
  filter: "pending",
  sortOrder: "newest",
  search: "",
  loading: true,
  selectedSubmission: null,
  modalOpen: false,
};

const EMPTY_MESSAGES: Record<
  string,
  { icon: string; title: string; desc: string }
> = {
  pending: {
    icon: "fact_check",
    title: "No hay tareas pendientes de revisión",
    desc: "Los submissions aparecerán aquí cuando los usuarios completen misiones.",
  },
  approved: {
    icon: "task_alt",
    title: "No hay tareas aprobadas",
    desc: "Las revisiones aprobadas aún no están disponibles: el endpoint de cola solo expone pendientes.",
  },
  rejected: {
    icon: "gpp_bad",
    title: "No hay tareas rechazadas",
    desc: "Las revisiones rechazadas aún no están disponibles: el endpoint de cola solo expone pendientes.",
  },
};

function ReviewList() {
  const [state, dispatch] = useReducer(reviewReducer, INITIAL_STATE);

  useEffect(() => {
    loadReviewQueue(dispatch);
  }, []);

  const handleSelect = useCallback(
    (id: string) => {
      const sub = state.submissions.find((s) => s.id === id);
      if (sub)
        dispatch({
          type: "SELECT_SUBMISSION",
          payload: { submission: sub },
        });
    },
    [state.submissions],
  );

  const handleClose = useCallback(() => {
    dispatch({ type: "CLOSE_MODAL" });
  }, []);

  const handleApprove = useCallback(async (id: string, notes?: string) => {
    await submitReview(dispatch, id, {
      status: "APPROVED",
      reviewerNotes: notes,
    });
  }, []);

  const handleReject = useCallback(async (id: string, notes: string) => {
    await submitReview(dispatch, id, {
      status: "REJECTED",
      reviewerNotes: notes,
    });
  }, []);

  const filtered = useMemo(() => {
    const { filter, sortOrder, search, submissions } = state;

    let result = submissions;

    // Status filter
    result = result.filter((s) => s.status === filter);

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.userName.toLowerCase().includes(q) ||
          s.userNote?.toLowerCase().includes(q) ||
          s.missionTitle.toLowerCase().includes(q),
      );
    }

    // Date sort (missing/empty dates sort as the oldest)
    result = [...result].sort((a, b) => {
      const timeA = Date.parse(a.submittedAt || "") || 0;
      const timeB = Date.parse(b.submittedAt || "") || 0;
      const diff = timeB - timeA;
      return sortOrder === "newest" ? diff : -diff;
    });

    return result;
  }, [state]);

  const counts = useMemo(
    () => ({
      pending: state.submissions.filter((s) => s.status === "pending").length,
      approved: state.submissions.filter((s) => s.status === "approved").length,
      rejected: state.submissions.filter((s) => s.status === "rejected").length,
    }),
    [state.submissions],
  );

  const empty = EMPTY_MESSAGES[state.filter];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-headline-lg text-on-surface font-headline-lg">
        Revisión de Tareas
      </h1>

      <ReviewFilterBar
        activeTab={state.filter}
        counts={counts}
        sortOrder={state.sortOrder}
        onTabChange={(tab) =>
          dispatch({ type: "SET_FILTER", payload: { filter: tab } })
        }
        onSortChange={(order) =>
          dispatch({ type: "SET_SORT_ORDER", payload: { sortOrder: order } })
        }
      />

      {state.loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }, () => crypto.randomUUID()).map((key) => (
            <SkeletonCard key={key} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <span className="material-symbols-outlined text-6xl text-outline/40">
            {empty.icon}
          </span>
          <p className="text-title-md text-on-surface-variant text-center">
            {empty.title}
          </p>
          <p className="text-body-md text-outline text-center max-w-md">
            {empty.desc}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((submission) => (
            <ReviewableCard
              key={submission.id}
              submission={submission}
              onClick={handleSelect}
            />
          ))}
        </div>
      )}

      {state.selectedSubmission && (
        <ReviewModal
          submission={state.selectedSubmission}
          open={state.modalOpen}
          onClose={handleClose}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}

export { ReviewList };
