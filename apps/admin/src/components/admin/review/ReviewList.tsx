"use client";

import { useCallback, useEffect, useReducer } from "react";

import { Pagination } from "@/components/ui/Pagination";
import type { ReviewMissionType } from "@/types/review/ReviewQueueByPlayer";
import type { ReviewFilter } from "@/types/review/ReviewSubmission";
import { ReviewableCard } from "./ReviewableCard";
import { ReviewFilterBar } from "./ReviewFilterBar";
import { ReviewModal } from "./ReviewModal";
import {
  initialState,
  loadReviewQueue,
  reviewReducer,
  submitReview,
} from "./reviewReducer";
import { SkeletonCard } from "./SkeletonCard";

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
    title: "Sin tareas aprobadas",
    desc: "Cuando apruebes tareas, aparecerán en esta sección.",
  },
  rejected: {
    icon: "gpp_bad",
    title: "Sin tareas rechazadas",
    desc: "Las tareas que rechaces se guardarán en esta sección.",
  },
};

function ReviewList() {
  const [state, dispatch] = useReducer(reviewReducer, initialState);

  useEffect(() => {
    loadReviewQueue(dispatch, {
      filter: state.filter,
      missionType: state.missionType,
      page: state.page,
    });
  }, [state.filter, state.missionType, state.page]);

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

  const handleTabChange = useCallback((filter: ReviewFilter) => {
    dispatch({ type: "SET_FILTER", payload: { filter } });
  }, []);

  const handleTypeChange = useCallback(
    (missionType: ReviewMissionType | "all") => {
      dispatch({ type: "SET_MISSION_TYPE", payload: { missionType } });
    },
    [],
  );

  const handlePageChange = useCallback((page: number) => {
    dispatch({ type: "SET_PAGE", payload: { page } });
  }, []);

  const empty = EMPTY_MESSAGES[state.filter];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-headline-lg text-on-surface font-headline-lg">
        Revisión de Tareas
      </h1>

      <ReviewFilterBar
        activeTab={state.filter}
        activeType={state.missionType}
        onTabChange={handleTabChange}
        onTypeChange={handleTypeChange}
      />

      {state.loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }, () => crypto.randomUUID()).map((key) => (
            <SkeletonCard key={key} />
          ))}
        </div>
      ) : state.submissions.length === 0 ? (
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.submissions.map((submission) => (
              <ReviewableCard
                key={submission.id}
                submission={submission}
                onClick={handleSelect}
              />
            ))}
          </div>

          {state.totalPages > 1 && (
            <div className="flex justify-center pt-4 border-t border-outline-variant/20">
              <Pagination
                current={state.page}
                total={state.totalPages}
                onChange={handlePageChange}
              />
            </div>
          )}
        </>
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
