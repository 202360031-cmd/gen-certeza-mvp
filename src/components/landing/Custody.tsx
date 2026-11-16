import { Container } from "@/components/ui/Container";
import { SectionHeading } from "./SectionHeading";

const STEPS = [
  {
    title: "Identificación",
    body: "Se verifica la identidad de cada participante con documento oficial, fotografía y huella. Se firma el consentimiento informado.",
  },
  {
    title: "Toma y sellado",
    body: "Personal sanitario toma la muestra y la sella frente a usted con un precinto numerado e inviolable.",
  },
  {
    title: "Traslado registrado",
    body: "Cada entrega queda asentada en el acta de custodia: quién, cuándo y en qué condiciones recibió la muestra.",
  },
  {
    title: "Análisis y dictamen",
    body: "El laboratorio comprueba los precintos antes de analizar. El dictamen lo firma un perito en genética forense.",
  },
];

export function Custody() {
  return (
    <section
      id="custodia"
      className="scroll-mt-16 border-y border-line bg-surface py-16 sm:py-24"
    >
      <Container>
        <SectionHeading
          eyebrow="Cadena de custodia"
          title="Un resultado solo tiene valor si puede demostrarse su origen"
        >
          La cadena de custodia es el registro ininterrumpido de quién tuvo la
          muestra en cada momento. Es lo que permite presentar el dictamen ante
          un juez, un hospital o una autoridad.
        </SectionHeading>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="border-t-2 border-navy pt-5">
              <p className="font-serif text-sm text-ink-muted">
                Paso {index + 1}
              </p>
              <h3 className="mt-1 font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
