import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CallToAction() {
  return (
    <section className="bg-navy text-white">
      <Container className="flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
            Solicite su cita en tres pasos
          </h2>
          <p className="mt-2 text-white/70">
            Recibirá un folio de seguimiento seguro. Nadie más sabrá de su
            solicitud.
          </p>
        </div>
        <ButtonLink
          href="/solicitud"
          variant="secondary"
          className="w-full border-transparent md:w-auto"
        >
          Iniciar solicitud
        </ButtonLink>
      </Container>
    </section>
  );
}
