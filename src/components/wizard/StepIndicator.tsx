import { CheckIcon } from "@/components/ui/Icons";

const STEPS = ["Servicio", "Datos y modalidad", "Confirmación"];

export function StepIndicator({ current }: { current: number }) {
  return (
    <ol className="flex items-center" aria-label="Progreso de la solicitud">
      {STEPS.map((label, index) => {
        const step = index + 1;
        const done = step < current;
        const active = step === current;
        return (
          <li
            key={label}
            aria-current={active ? "step" : undefined}
            className="flex flex-1 items-center last:flex-none"
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium ${
                done
                  ? "border-clinic bg-clinic text-white"
                  : active
                    ? "border-navy bg-navy text-white"
                    : "border-line-strong bg-surface text-ink-muted"
              }`}
            >
              {done ? <CheckIcon className="h-4 w-4" /> : step}
            </span>
            <span
              className={`ml-2.5 text-sm ${active ? "font-medium text-ink" : "text-ink-muted"} ${active ? "" : "hidden sm:inline"}`}
            >
              <span className="sr-only">Paso {step}: </span>
              {label}
            </span>
            {step < STEPS.length && (
              <span
                aria-hidden="true"
                className={`mx-3 h-px flex-1 sm:mx-4 ${done ? "bg-clinic" : "bg-line-strong"}`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
