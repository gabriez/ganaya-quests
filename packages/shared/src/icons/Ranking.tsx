import type { IconsProps } from "../types/iconsProps";

export const Ranking = ({
  fill = "#5A4100",
  height = 24,
  width = 24,
}: IconsProps) => {
  return (
    <svg
      aria-label="ranking-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      height={`${height}px`}
      width={`${width}px`}
      fill={fill}
    >
      <title>Ranking Icon</title>
      <path d="M160-200h160v-320H160v320Zm240 0h160v-560H400v560Zm240 0h160v-240H640v240ZM80-120v-480h240v-240h320v320h240v400H80Z" />
    </svg>
  );
};
