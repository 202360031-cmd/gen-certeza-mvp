import { HelixIcon, ShieldIcon } from "@/components/ui/Icons";
import { SERVICE_LIST } from "@/lib/services";
import type { ServiceId } from "@/lib/types";
import { OptionCard } from "./OptionCard";

const ICONS: Record<ServiceId, React.ReactNode> = {
  paternidad: <HelixIcon />,
  identidad: <ShieldIcon />,
};

export function StepService({
  value,
  onChange,
}: {
  value: ServiceId | null;
  onChange: (service: ServiceId) => void;
}) {
  return (
    <fieldset>
      <legend className="font-serif text-2xl font-semibold tracking-tight">
        ¿Qué servicio necesita?
      </legend>
      <p className="mt-2 text-ink-soft">
        Seleccione una opción. Podrá resolver cualquier duda con el coordinador
        antes de la toma de muestra.
      </p>
      <div className="mt-6 grid gap-4">
        {SERVICE_LIST.map((service) => (
          <OptionCard
            key={service.id}
            name="servicio"
            value={service.id}
            checked={value === service.id}
            onChange={(v) => onChange(v as ServiceId)}
            title={service.shortName}
            description={service.summary}
            icon={ICONS[service.id]}
          >
            <span className="mt-3 block text-sm text-ink-muted">
              Resultado en {service.turnaround}
            </span>
          </OptionCard>
        ))}
      </div>
    </fieldset>
  );
}
