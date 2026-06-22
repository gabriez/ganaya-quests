interface Props {
  reward: string;
  completed?: boolean;
}

export const MissionReward = ({ reward, completed }: Props) => (
  <span
    className={`text-secondary font-bold flex items-center gap-1 ${completed ? "opacity-50 line-through" : ""}`}
  >
    <span
      className="material-symbols-outlined text-sm"
      style={{ fontVariationSettings: "'FILL' 1" }}
    >
      stars
    </span>
    +{reward}
  </span>
);
