import type { Mission } from "@shared/types/mission";

interface Props {
  icon: Mission["icon"];
  color: Mission["color"];
}

export const MissionIcon = ({ icon, color }: Props) => (
  <div
    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
    style={{
      backgroundColor: `${color}20`,
    }}
  >
    <span className="material-symbols-outlined text-3xl" style={{ color }}>
      {icon}
    </span>
  </div>
);
