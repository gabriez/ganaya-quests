import { MissionsList } from "@/components/admin/missions/MissionsList";

/**
 * PanelPage — Mission Control page for the admin panel.
 *
 * Renders the full MissionsList orchestrator with search, filters,
 * table, right sidebar, and pagination. Uses "use client" inside
 * MissionsList — this page stays as a server component wrapper.
 */
export default function PanelPage() {
  return <MissionsList />;
}
