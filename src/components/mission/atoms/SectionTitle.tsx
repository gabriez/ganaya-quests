interface Props {
  title: string;
  color?: string;
}

export const SectionTitle = ({ title, color }: Props) => (
  <h2
    className="font-title-md text-title-md"
    style={{ color: color ?? "var(--color-on-surface)" }}
  >
    {title}
  </h2>
);
