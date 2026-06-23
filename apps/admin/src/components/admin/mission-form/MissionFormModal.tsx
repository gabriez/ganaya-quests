"use client";

import type {
  AdminMission,
  MissionStep,
  VerificationType,
} from "@shared/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { MissionFields } from "./MissionFields";
import { StepBuilder } from "./StepBuilder";

interface MissionFormModalProps {
  open: boolean;
  onClose: () => void;
  /** null = create mode, AdminMission = edit/view mode */
  mission: AdminMission | null;
  onSave: (
    data: Omit<AdminMission, "id" | "createdAt" | "participants">,
    isCreate: boolean,
  ) => void;
}

const DEFAULT_STEP: MissionStep = {
  id: "new_step_1",
  title: "",
  verificationType: "upload_image" as VerificationType,
  order: 1,
};

function createEmptyFormData(): Omit<
  AdminMission,
  "id" | "createdAt" | "participants"
> {
  return {
    title: "",
    description: "",
    tokenReward: 0,
    bonusPercent: 0,
    xpReward: 0,
    category: "daily",
    status: "inactive",
    steps: [{ ...DEFAULT_STEP, id: crypto.randomUUID() }],
  };
}

export interface FormErrors {
  title?: string;
  description?: string;
  tokenReward?: string;
  bonusPercent?: string;
  xpReward?: string;
  category?: string;
  steps?: string;
  [key: `step_${number}_title`]: string;
}

/**
 * MissionFormModal — modal de creación/edición de misión.
 *
 * Integra MissionFields + StepBuilder, maneja dirty state para el
 * confirm de descarte, y bloquea contenido en misiones activas.
 */
function MissionFormModal({
  open,
  onClose,
  mission,
  onSave,
}: MissionFormModalProps) {
  const isCreating = mission === null;
  const readOnly = !isCreating && mission.status === "active";

  const isDirtyRef = useRef(false);
  const [formData, setFormData] = useState<Partial<AdminMission>>(
    isCreating ? createEmptyFormData() : { ...mission },
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  /* ── Reset form state when modal opens ── */
  useEffect(() => {
    if (open) {
      if (isCreating) {
        setFormData(createEmptyFormData());
      } else {
        setFormData({ ...mission });
      }
      setErrors({});
      isDirtyRef.current = false;
      setShowDiscardConfirm(false);
    }
  }, [open, isCreating, mission]);

  /* ── Field change handler ── */
  const handleFieldChange = useCallback((field: string, value: unknown) => {
    isDirtyRef.current = true;
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for the changed field
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field as keyof FormErrors];
      return next;
    });
  }, []);

  /* ── Steps change handler ── */
  const handleStepsChange = useCallback((steps: MissionStep[]) => {
    isDirtyRef.current = true;
    setFormData((prev) => ({ ...prev, steps }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.steps;
      // Clear per-step errors
      Object.keys(next).forEach((key) => {
        if (key.startsWith("step_")) delete next[key as keyof FormErrors];
      });
      return next;
    });
  }, []);

  /* ── Validation ── */
  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Title: required, min 3 chars
    const title = formData.title;
    if (!title || title.toString().trim().length < 3) {
      newErrors.title = "El título debe tener al menos 3 caracteres";
    }

    // Description: required, min 10 chars
    const description = formData.description;
    if (!description || description.toString().trim().length < 10) {
      newErrors.description =
        "La descripción debe tener al menos 10 caracteres";
    }

    // Token reward: required, > 0
    const tokenReward = Number(formData.tokenReward);
    if (
      !formData.tokenReward ||
      Number.isNaN(tokenReward) ||
      tokenReward <= 0
    ) {
      newErrors.tokenReward = "La recompensa debe ser mayor a 0";
    }

    // XP reward: required, > 0
    const xpReward = Number(formData.xpReward);
    if (!formData.xpReward || Number.isNaN(xpReward) || xpReward <= 0) {
      newErrors.xpReward = "La experiencia debe ser mayor a 0";
    }

    // Category: required
    if (!formData.category) {
      newErrors.category = "Seleccioná una categoría";
    }

    // Steps: at least 1, each with title
    const steps = (formData.steps as MissionStep[]) || [];
    if (steps.length === 0) {
      newErrors.steps = "Agregá al menos un paso";
    }
    steps.forEach((step, i) => {
      if (!step.title || step.title.trim().length < 1) {
        newErrors[`step_${i}_title`] = "El título del paso es obligatorio";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  /* ── Save handler ── */
  const handleSave = useCallback(() => {
    if (!validate()) return;

    const steps = ((formData.steps as MissionStep[]) || []).map((s, i) => ({
      ...s,
      order: i + 1,
    }));

    if (isCreating) {
      const createData: Omit<
        AdminMission,
        "id" | "createdAt" | "participants"
      > = {
        title: (formData.title as string) || "",
        description: (formData.description as string) || "",
        tokenReward: Number(formData.tokenReward) || 0,
        bonusPercent: Number(formData.bonusPercent) || 0,
        xpReward: Number(formData.xpReward) || 0,
        category: (formData.category as AdminMission["category"]) || "daily",
        status: "inactive",
        steps,
        coverImage: formData.coverImage as string | undefined,
      };
      onSave(createData, true);
    } else {
      const updateData: Omit<
        AdminMission,
        "id" | "createdAt" | "participants"
      > = {
        title: formData.title as string,
        description: formData.description as string,
        tokenReward: Number(formData.tokenReward),
        bonusPercent: Number(formData.bonusPercent),
        xpReward: Number(formData.xpReward),
        category: formData.category as AdminMission["category"],
        status: (formData.status as AdminMission["status"]) || "inactive",
        steps,
        coverImage: formData.coverImage as string | undefined,
      };
      onSave(updateData, false);
    }

    isDirtyRef.current = false;
  }, [isCreating, formData, validate, onSave]);

  /* ── Close with dirty guard ── */
  const handleClose = useCallback(() => {
    if (isDirtyRef.current) {
      setShowDiscardConfirm(true);
    } else {
      onClose();
    }
  }, [onClose]);

  const confirmDiscard = useCallback(() => {
    setShowDiscardConfirm(false);
    isDirtyRef.current = false;
    onClose();
  }, [onClose]);

  const cancelDiscard = useCallback(() => {
    setShowDiscardConfirm(false);
  }, []);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        title={isCreating ? "Nueva Misión" : "Editar Misión"}
        size="lg"
      >
        {/* Content Lock Banner */}
        {readOnly && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/15 mb-4">
            <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">
              info
            </span>
            <p className="text-body-md text-on-surface-variant">
              Misión activa — contenido bloqueado. Los parámetros no pueden
              modificarse.
            </p>
          </div>
        )}

        {/* Mission Fields */}
        <MissionFields
          mission={formData}
          onChange={handleFieldChange}
          errors={errors as Record<string, string>}
          readOnly={readOnly}
        />

        {/* Step Builder — hidden in readOnly mode */}
        {!readOnly && (
          <div className="mt-6 pt-6 border-t border-outline-variant/20">
            <StepBuilder
              steps={(formData.steps as MissionStep[]) || []}
              onChange={handleStepsChange}
              readOnly={readOnly}
              errors={undefined}
            />
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-outline-variant/20">
          <Button variant="ghost" onClick={handleClose}>
            Descartar
          </Button>
          <Button variant="primary" disabled={readOnly} onClick={handleSave}>
            Guardar
          </Button>
        </div>
      </Modal>

      {/* Discard Confirmation Dialog */}
      {showDiscardConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Invisible backdrop */}
          <button
            type="button"
            aria-label="Cancelar descarte"
            className="absolute inset-0 bg-black/50 cursor-default"
            onClick={cancelDiscard}
          />
          <div className="relative bg-surface-container border border-white/10 rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-title-md text-on-surface mb-2">
              ¿Descartar cambios?
            </h3>
            <p className="text-body-md text-on-surface-variant mb-4">
              Los cambios sin guardar se perderán.
            </p>
            <div className="flex items-center justify-end gap-3">
              <Button variant="ghost" onClick={cancelDiscard}>
                Seguir editando
              </Button>
              <Button variant="danger" onClick={confirmDiscard}>
                Descartar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

MissionFormModal.displayName = "MissionFormModal";

export { MissionFormModal };
export type { MissionFormModalProps };
