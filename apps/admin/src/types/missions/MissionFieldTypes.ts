import type { AdminMission } from "@shared/types";

export interface MissionFieldsProps {
  mission: Partial<AdminMission>;
  onChange: (field: string, value: unknown) => void;
  errors?: Record<string, string>;
  readOnly?: boolean;
}
