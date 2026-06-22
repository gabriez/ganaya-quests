interface Props {
  completed?: boolean;
}

export const MissionStatus = ({ completed }: Props) => {
  if (!completed) return null;

  return (
    <div className="absolute top-2 right-2 rotate-12">
      <span className="bg-secondary-container text-on-secondary-container px-4 py-1 rounded-lg font-black text-xs">
        COMPLETADA
      </span>
    </div>
  );
};
