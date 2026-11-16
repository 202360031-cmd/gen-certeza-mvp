import {
  DropIcon,
  HelixIcon,
  PeopleIcon,
  ShieldIcon,
} from "@/components/ui/Icons";
import { SERVICES, SERVICE_LIST, formatPrice } from "@/lib/services";
import type { ServiceId } from "@/lib/types";
import { OptionCard } from "./OptionCard";

const ICONS: Record<ServiceId, React.ReactNode> = {
  prenatal: <DropIcon />,
  paternidad: <HelixIcon />,
  adulto: <PeopleIcon />,
  identidad: <ShieldIcon />,
};

export function StepService({
  service,
  variant,
  onService,
  onVariant,
}: {
  service: ServiceId | null;
  variant: string | null;
  onService: (service: ServiceId) => void;
  onVariant: (variant: string) => void;
}) {
  const variants = service ? SERVICES[service].variants : [];

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
        {SERVICE_LIST.map((item) => {
          const only = item.variants.length === 1 ? item.variants[0] : null;
          return (
            <div key={item.id}>
              <OptionCard
                name="servicio"
                value={item.id}
                checked={service === item.id}
                onChange={(v) => onService(v as ServiceId)}
                title={item.shortName}
                description={item.summary}
                icon={ICONS[item.id]}
              >
                <span className="mt-3 block text-sm text-ink-muted">
                  {only
                    ? `${formatPrice(only.price)} · Resultado en ${only.turnaround}`
                    : `${item.variants.length} opciones: ${item.variants.map((v) => v.name).join(", ")}`}
                </span>
              </OptionCard>

              {/* Las opciones aparecen justo debajo del servicio elegido. */}
              {service === item.id && variants.length > 1 && (
                <fieldset className="mt-3 ml-3 border-l-2 border-navy pl-4 sm:ml-5 sm:pl-5">
                  <legend className="sr-only">
                    Opciones de {item.shortName}
                  </legend>
                  <p className="text-sm font-medium" aria-hidden="true">
                    Elija una opción
                  </p>
                  <div className="mt-3 grid gap-3">
                    {variants.map((option) => (
                      <OptionCard
                        key={option.id}
                        name="variante"
                        value={option.id}
                        checked={variant === option.id}
                        onChange={onVariant}
                        title={option.name}
                        description={option.description}
                      >
                        <span className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                          <span className="font-medium text-navy">
                            {formatPrice(option.price)}
                          </span>
                          <span className="text-ink-muted">
                            Resultado en {option.turnaround}
                          </span>
                        </span>
                      </OptionCard>
                    ))}
                  </div>
                </fieldset>
              )}
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
