import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LEGAL } from "@/lib/legal";

const DOCUMENTS = [
  { href: "/privacidad", label: "Aviso de privacidad" },
  { href: "/consentimiento", label: "Consentimiento informado" },
  { href: "/validez-juridica", label: "Validez jurídica" },
];

/** Marco común de los textos legales: título, versión, índice y estilos. */
export function LegalDocument({
  title,
  intro,
  current,
  children,
}: {
  title: string;
  intro: string;
  current: string;
  children: React.ReactNode;
}) {
  return (
    <Container className="max-w-3xl py-10 sm:py-16">
      <nav
        aria-label="Documentos legales"
        className="flex flex-wrap gap-2 text-sm"
      >
        {DOCUMENTS.map((doc) => (
          <Link
            key={doc.href}
            href={doc.href}
            aria-current={doc.href === current ? "page" : undefined}
            className="rounded-md border border-line-strong px-3 py-1.5 text-ink-soft hover:border-ink-muted aria-[current=page]:border-navy aria-[current=page]:bg-navy aria-[current=page]:text-white"
          >
            {doc.label}
          </Link>
        ))}
      </nav>

      <h1 className="mt-8 font-serif text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-sm text-ink-muted">
        Versión {LEGAL.version} · Última actualización:{" "}
        {LEGAL.fechaActualizacion}
      </p>
      <p className="mt-5 text-lg leading-relaxed text-ink-soft">{intro}</p>

      {!LEGAL.revisadoPorAbogado && (
        <p className="mt-6 rounded-md border border-line-strong bg-surface p-4 text-sm leading-relaxed text-ink-soft">
          <strong className="font-medium text-ink">
            Documento en revisión.
          </strong>{" "}
          Este texto está pendiente de validación por asesoría jurídica y puede
          cambiar. Los datos entre corchetes se completarán antes del inicio de
          operaciones.
        </p>
      )}

      <div className="legal mt-10">{children}</div>
    </Container>
  );
}

/** Sección numerada de un documento legal. */
export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="font-serif text-xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-3 space-y-4 leading-relaxed text-ink-soft [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_strong]:font-medium [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
