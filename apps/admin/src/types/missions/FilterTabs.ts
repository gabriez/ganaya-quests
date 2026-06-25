import type { MissionStatus } from "@shared/types";

export type FilterValue = "all" | MissionStatus;

export interface FilterTabsProps {
  activeFilter: FilterValue;
  onChange: (filter: FilterValue) => void;
}
