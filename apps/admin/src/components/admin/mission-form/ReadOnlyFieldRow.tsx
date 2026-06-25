import { Badge } from "@/components/ui/Badge";

export function ReadOnlyFieldRow({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) {
  return (
    <div className="flex items-start gap-3 py-2">
      <span className="text-label-sm text-outline w-44 shrink-0 pt-0.5">
        {label}
      </span>
      <div className="flex items-center gap-2 flex-1">
        <span className="text-body-md text-on-surface">
          {value != null ? String(value) : "—"}
        </span>
        <Badge variant="inactive">Bloqueado</Badge>
      </div>
    </div>
  );
}
