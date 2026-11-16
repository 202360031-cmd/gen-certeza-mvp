import { Container } from "@/components/ui/Container";
import { SectionHeading } from "./SectionHeading";

const QUESTIONS = [
  {
    q: "¿Desde qué edad puede tomarse la muestra a un recién nacido?",
    a: "Desde el primer día de vida. Se utiliza un hisopo bucal suave; no hay punción ni molestia para el bebé.",
  },
  {
    q: "¿Quién debe autorizar la prueba de un menor?",
    a: "Quien ejerce la patria potestad o la tutela debe firmar el consentimiento. Para que el resultado tenga valor ante una autoridad, todos los participantes deben identificarse y consentir.",
  },
  {
    q: "¿El resultado sirve en un juicio?",
    a: "El dictamen se emite con cadena de custodia documentada, que es el requisito habitual para su admisión. La valoración final corresponde al juez de cada jurisdicción; le recomendamos consultarlo con su abogado.",
  },
  {
    q: "Sospecho que me entregaron a otro bebé. ¿Qué hago primero?",
    a: "Conserve el brazalete y la documentación del hospital y solicite la verificación cuanto antes. Atendemos estos casos con prioridad y podemos tomar la muestra dentro del hospital.",
  },
];

export function Faq() {
  return (
    <section className="border-t border-line bg-surface py-16 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading eyebrow="Preguntas frecuentes" title="Lo que suele preguntarse antes de decidir" />
        <div className="divide-y divide-line border-y border-line">
          {QUESTIONS.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-medium [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="mt-0.5 text-xl leading-none text-ink-muted transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-soft">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
