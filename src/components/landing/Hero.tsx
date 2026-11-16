import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/Icons";

const FACTS = [
  { value: "48–72 h", label: "Verificación de identidad neonatal" },
  { value: "5–7 días", label: "Dictamen de paternidad" },
  { value: "100 %", label: "Muestras con precinto y acta de custodia" },
];

export function Hero() {
  return (
    <section className="border-b border-line">
      <Container className="py-16 sm:py-24">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-clinic">
          Genética forense · Filiación e identidad neonatal
        </p>
        <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Certeza sobre el vínculo con su hijo, desde los primeros días.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Pruebas de paternidad neonatales y verificación de identidad del
          recién nacido. Cada muestra se toma, sella y analiza bajo cadena de
          custodia documentada, con la discreción que el asunto exige.
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
