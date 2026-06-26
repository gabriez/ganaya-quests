/**
 * FieldGroup — label + required marker + input + error message.
 */
export function FieldGroup({
  label,
  required = false,
  error,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-label-sm text-on-surface-variant mb-1 block"
      >
        {label}
        {required && <span className="text-error ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-label-sm text-error">{error}</p>}
    </div>
  );
}
