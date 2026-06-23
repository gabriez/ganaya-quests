"use client";

import type { MissionStep, VerificationType } from "@shared/types";
import { Button } from "@/components/ui/Button";
import { StepCard } from "./StepCard";

interface StepBuilderProps {
  steps: MissionStep[];
  onChange: (steps: MissionStep[]) => void;
  readOnly?: boolean;
  errors?: Record<string, Record<string, string>>;
}

/**
 * StepBuilder — lista de pasos con ordenamiento y agregado.
 *
 * Renderiza un StepCard por cada paso y un botón "Agregar paso"
 * al final. Reordena los pasos al mover arriba/abajo o eliminar.
 */
function StepBuilder({
  steps,
  onChange,
  readOnly = false,
  errors,
}: StepBuilderProps) {
  const handleChange = (index: number, updatedStep: MissionStep) => {
    const newSteps = steps.map((s, i) => (i === index ? updatedStep : s));
    onChange(newSteps);
  };

  const handleRemove = (index: number) => {
    if (steps.length <= 1) return;
    const newSteps = steps
      .filter((_, i) => i !== index)
      .map((s, i) => ({ ...s, order: i + 1 }));
    onChange(newSteps);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newSteps = [...steps];
    [newSteps[index - 1], newSteps[index]] = [
      newSteps[index],
      newSteps[index - 1],
    ];
    const reordered = newSteps.map((s, i) => ({ ...s, order: i + 1 }));
    onChange(reordered);
  };

  const handleMoveDown = (index: number) => {
    if (index === steps.length - 1) return;
    const newSteps = [...steps];
    [newSteps[index], newSteps[index + 1]] = [
      newSteps[index + 1],
      newSteps[index],
    ];
    const reordered = newSteps.map((s, i) => ({ ...s, order: i + 1 }));
    onChange(reordered);
  };

  const handleAdd = () => {
    const newStep: MissionStep = {
      id: crypto.randomUUID(),
      title: "",
      verificationType: "upload_image" as VerificationType,
      order: steps.length + 1,
    };
    onChange([...steps, newStep]);
  };

  if (readOnly) return null;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-title-md text-on-surface font-semibold">Pasos</h3>

      {steps.length === 0 && (
        <p className="text-body-md text-outline">
          No hay pasos. Agregá al menos uno para crear la misión.
        </p>
      )}

      {steps.map((step, index) => (
        <StepCard
          key={step.id}
          step={step}
          index={index}
          totalSteps={steps.length}
          onChange={(updated) => handleChange(index, updated)}
          onRemove={() => handleRemove(index)}
          onMoveUp={() => handleMoveUp(index)}
          onMoveDown={() => handleMoveDown(index)}
          errors={errors?.[index]}
        />
      ))}

      <Button
        variant="ghost"
        leadingIcon="add"
        onClick={handleAdd}
        className="self-start mt-2"
      >
        Agregar paso
      </Button>
    </div>
  );
}

StepBuilder.displayName = "StepBuilder";

export { StepBuilder };
export type { StepBuilderProps };
