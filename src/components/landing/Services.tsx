import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";
import { SERVICE_LIST, formatPrice } from "@/lib/services";
import { SectionHeading } from "./SectionHeading";

export function Services() {
  return (
    <section id="servicios" className="scroll-mt-16 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Servicios"
          title="Una prueba para cada etapa"
        >
          Desde la 7.ª semana de embarazo hasta la vida adulta. Todas las
          muestras las toma personal sanitario, con el consentimiento de los
          participantes.
        </SectionHeading>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {SERVICE_LIST.map((service) => {
            const multiple = service.variants.length > 1;
            return (
              <article
                key={service.id}
                className="flex flex-col rounded-lg border border-line bg-surface p-6 sm:p-8"
              >
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-clinic">
                  {service.stage}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold tracking-tight">
                  {service.name}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">
                  {service.summary}
                </p>

                <ul className="mt-6 space-y-3 text-sm">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex gap-3">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-clinic" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex-1 border-t border-line pt-2">
                  <ul className="divide-y divide-line">
                    {service.variants.map((variant) => (
                      <li
                        key={variant.id}
                        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
                      >
                        <div className="min-w-0 flex-1 basis-56">
                          <p className="font-medium">{variant.name}</p>
                          <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                            {multiple
                              ? variant.description
                              : `Muestra: ${service.sample.toLowerCase()}.`}
                          </p>
                        </div>
                        <div className="text-sm sm:text-right">
                          <p className="font-medium text-navy">
                            {formatPrice(variant.price)}
                          </p>
                          <p className="mt-0.5 text-ink-muted">
                            {variant.turnaround}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/solicitud?servicio=${service.id}`}
                  className="mt-4 inline-flex items-center gap-2 self-start py-2 text-sm font-medium text-navy hover:underline"
                >
                  Solicitar este servicio
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
