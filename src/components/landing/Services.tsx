import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";
import { SERVICE_LIST } from "@/lib/services";
import { SectionHeading } from "./SectionHeading";

export function Services() {
  return (
    <section id="servicios" className="scroll-mt-16 py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Servicios" title="Dos situaciones que no admiten dudas">
          Nos dedicamos exclusivamente a dos pruebas. Ambas se realizan con una
          muestra bucal indolora, segura para un recién nacido.
        </SectionHeading>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {SERVICE_LIST.map((service, index) => (
            <article
              key={service.id}
              className="flex flex-col rounded-lg border border-line bg-surface p-6 sm:p-8"
            >
              <p className="font-serif text-sm text-ink-muted">
                0{index + 1}
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

              <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
                <div>
                  <dt className="text-ink-muted">Entrega de resultado</dt>
                  <dd className="mt-1 font-medium">{service.turnaround}</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">Tipo de muestra</dt>
                  <dd className="mt-1 font-medium">{service.sample}</dd>
                </div>
              </dl>

              <Link
                href={`/solicitud?servicio=${service.id}`}
                className="mt-8 inline-flex items-center gap-2 self-start text-sm font-medium text-navy hover:underline"
              >
                Solicitar este servicio
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
