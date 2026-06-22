interface Props {
  completed?: boolean;
  onClick?: () => void;
}

export const MissionActionButton = ({ completed, onClick }: Props) => {
  if (completed) {
    return (
      <button
        type="submit"
        disabled
        className="px-6 py-2 rounded-xl bg-surface-variant text-on-surface-variant font-bold text-sm cursor-not-allowed"
      >
        Completado
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className="px-6 py-2 rounded-xl bg-primary text-on-primary font-bold text-sm active:scale-95 transition-transform"
    >
      Hacer Misión
    </button>
  );
};
