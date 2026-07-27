"use client";

import { useState } from "react";
import type { MissionCategory } from "@shared/types";
import type { ReviewModalProps } from "@/types/review/ReviewSubmission";
import { Modal } from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Textarea";
import { ReviewStatusBadge } from "./ReviewStatusBadge";
import Image from "next/image";

const categoryLabels: Record<MissionCategory, string> = {
  daily: "Diaria",
  weekly: "Semanal",
  fixed: "Fija",
  special_event: "Evento",
};

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `hace ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs} h`;
  const days = Math.floor(hrs / 24);
  return `hace ${days} d`;
}

function getInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function ReviewModal({
  submission,
  open,
  onClose,
  onApprove,
  onReject,
}: ReviewModalProps) {
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const handleReject = () => {
    if (!notes.trim()) { setError("El motivo es obligatorio para rechazar"); return; }
    setError("");
    onReject(submission.id, notes.trim());
    setNotes("");
  };

  const handleApprove = () => {
    setError("");
    onApprove(submission.id, notes.trim() || undefined);
    setNotes("");
  };

  const handleClose = () => { setError(""); setNotes(""); onClose(); };

  return (
    <Modal open={open} onClose={handleClose} title="Revisar tarea" size="lg">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 overflow-hidden">
            {submission.userAvatar ? (
              <Image
                width={40}
                height={40}
                src={submission.userAvatar}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-label-sm font-bold text-on-surface-variant">
                {getInitials(submission.userName)}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-label-md text-on-surface font-semibold">
              {submission.userName}
            </p>
            <p className="text-body-md text-on-surface font-semibold">
              {submission.missionTitle}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-label-sm">
              {categoryLabels[submission.missionCategory]}
            </span>
            <ReviewStatusBadge status={submission.status} />
          </div>
        </div>

        <p className="text-label-sm text-on-surface-variant">
          Enviado {relativeTime(submission.submittedAt)}
        </p>

        {submission.images && submission.images.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-label-md text-on-surface font-semibold">
              Imágenes enviadas
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {submission.images.map((src, i) => (
                <div
                  key={src}
                  className="w-30 h-30 rounded-md overflow-hidden shrink-0 bg-surface-container-high"
                >
                  <Image
                    width={120}
                    height={120}
                    src={src}
                    alt={`Captura ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {submission.userNote && (
          <div className="flex flex-col gap-2">
            <p className="text-label-md text-on-surface font-semibold">
              Nota del usuario
            </p>
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-3 text-body-md text-on-surface-variant">
              {submission.userNote}
            </div>
          </div>
        )}

        {submission.verificationCriteria &&
          submission.verificationCriteria.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-label-md text-on-surface font-semibold">
                Criterios de verificación
              </p>
              <div className="flex flex-col gap-1.5">
                {submission.verificationCriteria.map((c) => (
                  <div key={c.id} className="flex items-center gap-2">
                    <span
                      className={`material-symbols-outlined text-lg ${
                        c.passed ? "text-[#4ade80]" : "text-error"
                      }`}
                    >
                      {c.passed ? "check_circle" : "cancel"}
                    </span>
                    <span className="text-body-md text-on-surface-variant">
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        <div className="flex flex-col gap-2">
          <p className="text-label-md text-on-surface font-semibold">
            Notas del revisor
          </p>
          <Textarea
            placeholder="Escribí tus observaciones aquí..."
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              if (error) setError("");
            }}
            error={error}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleReject}
            className="flex-1 inline-flex items-center justify-center gap-2 font-headline-lg-mobile text-headline-lg-mobile py-4 px-6 rounded-lg transition-all duration-200 border border-error/60 text-error hover:bg-error/10 active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
            Rechazar
          </button>
          <button
            type="button"
            onClick={handleApprove}
            className="flex-1 inline-flex items-center justify-center gap-2 font-headline-lg-mobile text-headline-lg-mobile py-4 px-6 rounded-lg transition-all duration-200 bg-secondary text-on-secondary hover:bg-secondary-fixed-dim active:scale-[0.98] glow-gold-sm cursor-pointer"
          >
            <span className="material-symbols-outlined">check</span>
            Aprobar
          </button>
        </div>
      </div>
    </Modal>
  );
}

export { ReviewModal };
