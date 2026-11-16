import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LockIcon, ScaleIcon, ShieldIcon } from "@/components/ui/Icons";
import { SectionHeading } from "./SectionHeading";

const PILLARS = [
  {
    icon: LockIcon,
    title: "Discreción",
    href: null,
    body: "Personal sin distintivos, correspondencia sin logotipos y comunicación únicamente por el medio que usted autorice. Su caso se identifica por folio, no por nombre.",
  },
  {
    icon: ScaleIcon,
    title: "Validez jurídica",
    href: { to: "/validez-juridica", label: "Alcances y límites legales" },
    body: "Identificación de los participantes, consentimiento firmado y acta de custodia: los elementos que una autoridad exige para admitir un dictamen genético.",
  },
  {
    icon: ShieldIcon,
    title: "Protección de datos",
    href: { to: "/privacidad", label: "Aviso de privacidad" },
    body: "Los datos genéticos son datos personales sensibles. Se usan solo para la prueba solicitada y las muestras se destruyen al concluir el plazo legal de resguardo.",
  },
];

export function Confidentiality() {
  return (
    <section id="confidencialidad" className="scroll-mt-16 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Confidencialidad"
          title="Un asunto privado, tratado como tal"
        />
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, body, href }) => (
            <div key={title}>
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-navy-tint text-navy">
                <Icon />
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {body}
              </p>
              {href && (
                <Link
                  href={href.to}
                  className="mt-3 inline-block py-1 text-sm font-medium text-navy hover:underline"
                >
                  {href.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
