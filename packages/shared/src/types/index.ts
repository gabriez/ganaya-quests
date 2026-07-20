import type { JSX } from "react";

import type { IconsProps } from "./iconsProps";

export type SidebarLinkType = {
  path: string;
  icon: (props: IconsProps) => JSX.Element;
  text: string;
};

export type {
  AdminMission,
  AdminSidebarLink,
  MissionCategory,
  MissionStatus,
  MissionStep,
  ReviewStatus,
  ReviewSubmission,
  ReviewVerdict,
  VerificationCriterion,
  VerificationType,
} from "./admin";
