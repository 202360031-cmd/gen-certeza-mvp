/** Tarjeta seleccionable construida sobre un radio nativo (accesible por teclado). */
export function OptionCard({
  name,
  value,
  checked,
  onChange,
  title,
  description,
  icon,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  title: string;
  description: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <label
      className={`relative flex cursor-pointer gap-4 rounded-lg border bg-surface p-5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy ${
        checked
          ? "border-navy ring-1 ring-navy"
          : "border-line hover:border-line-strong"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      {icon && (
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${checked ? "bg-navy text-white" : "bg-navy-tint text-navy"}`}
        >
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block font-medium">{title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-ink-soft">
          {description}
        </span>
        {children}
      </span>
      <span
        aria-hidden="true"
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${checked ? "border-navy" : "border-line-strong"}`}
      >
        {checked && <span className="h-2.5 w-2.5 rounded-full bg-navy" />}
      </span>
    </label>
  );
}
