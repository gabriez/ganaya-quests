export type MissionStatus = "inactive" | "active" | "completed" | "cancelled";
export type MissionCategory = "daily" | "weekly" | "fixed" | "special_event";
export type VerificationType = "upload_image" | "submit_text" | "manual_review";

export interface MissionStep {
  id: string;
  title: string;
  verificationType: VerificationType;
  description?: string;
  order: number;
}

export interface AdminMission {
  id: string;
  title: string;
  description: string;
  tokenReward: number;
  bonusPercent: number;
  xpReward: number;
  category: MissionCategory;
  status: MissionStatus;
  steps: MissionStep[];
  coverImage?: string;
  participants: number;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  cancelReason?: string;
}

export interface AdminSidebarLink {
  path: string;
  icon: string;
  text: string;
}
