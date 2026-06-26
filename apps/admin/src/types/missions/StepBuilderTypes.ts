import type { MissionStep } from "@shared/types";

export interface StepBuilderProps {
  steps: MissionStep[];
  onChange: (steps: MissionStep[]) => void;
  readOnly?: boolean;
  errors?: Record<string, Record<string, string>>;
}

export interface StepCardProps {
  step: MissionStep;
  index: number;
  totalSteps: number;
  onChange: (updatedStep: MissionStep) => void;
  onRemove: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  errors?: Record<string, string>;
}
