import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Aviso de privacidad" };

export default function PrivacyPage() {
  return (
    <Container className="max-w-3xl py-16">
      <h1 className="font-serif text-3xl font-semibold tracking-tight">
        Aviso de privacidad
      </h1>
      <p className="mt-4 rounded-md border border-line bg-surface p-4 text-sm text-ink-soft">
        Texto provisional del MVP. Antes de operar, este aviso debe ser
        redactado y revisado por un abogado conforme a la legislación de
        protección de datos aplicable.
      </p>
      <div className="mt-8 space-y-5 leading-relaxed text-ink-soft">
        <p>
          Los datos de contacto y los datos genéticos se consideran datos
          personales sensibles. Se recaban con consentimiento expreso y se
          utilizan únicamente para realizar la prueba solicitada y entregar su
          resultado.
        </p>
        <p>
          No se comparten con terceros salvo mandato de autoridad competente.
          Usted puede ejercer en todo momento sus derechos de acceso,
          rectificación, cancelación y oposición.
        </p>
      </div>
    </Container>
  );
}
