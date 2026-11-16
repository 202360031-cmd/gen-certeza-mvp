import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/Icons";

const FACTS = [
  { value: "Desde la semana 7", label: "Paternidad prenatal no invasiva" },
  { value: "Desde el día 1", label: "Paternidad e identidad neonatal" },
  { value: "A cualquier edad", label: "Pruebas informativas y legales" },
];

export function Hero() {
  return (
    <section className="border-b border-line">
      <Container className="py-16 sm:py-24">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-clinic">
          Genética forense · Paternidad, parentesco e identidad
        </p>
        <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Certeza sobre el vínculo biológico, en cada etapa de la vida.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Pruebas de paternidad prenatales, neonatales y en vida adulta, y
          verificación de identidad del recién nacido. Las pruebas con validez
          legal se realizan bajo cadena de custodia documentada; todas, con la
          discreción que el asunto exige.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/solicitud">
            Solicitar cita o kit
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/seguimiento" variant="secondary">
            Consultar mi folio
          </ButtonLink>
        </div>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
          {FACTS.map((fact) => (
            <div key={fact.label} className="bg-surface px-6 py-5">
              <dt className="text-sm text-ink-muted">{fact.label}</dt>
              <dd className="mt-1 font-serif text-2xl font-semibold text-navy">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
