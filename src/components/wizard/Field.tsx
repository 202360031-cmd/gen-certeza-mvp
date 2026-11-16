const inputClass =
  "mt-1.5 block w-full rounded-md border bg-surface px-3.5 py-2.5 text-base text-ink placeholder:text-ink-muted/70 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy";

type Props = {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  multiline?: boolean;
  onValue: (value: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;

export function Field({
  label,
  error,
  hint,
  optional,
  multiline,
  onValue,
  id,
  ...props
}: Props) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const shared = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    className: `${inputClass} ${error ? "border-alert" : "border-line-strong"}`,
  };

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {optional && (
          <span className="ml-1.5 font-normal text-ink-muted">(opcional)</span>
        )}
      </label>
      {multiline ? (
        <textarea
          {...shared}
          rows={3}
          value={props.value}
          placeholder={props.placeholder}
          onChange={(e) => onValue(e.target.value)}
        />
      ) : (
        <input {...shared} {...props} onChange={(e) => onValue(e.target.value)} />
      )}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-alert">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-muted">
            {hint}
          </p>
        )
      )}
    </div>
  );
}
