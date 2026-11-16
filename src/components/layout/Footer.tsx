import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SERVICE_LIST } from "@/lib/services";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white/70">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Pruebas genéticas de paternidad, parentesco e identidad neonatal, con
            cadena de custodia documentada y trato estrictamente confidencial.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-medium text-white">Servicios</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SERVICE_LIST.map((service) => (
              <li key={service.id}>
                <Link
                  href={`/solicitud?servicio=${service.id}`}
                  className="hover:text-white"
                >
                  {service.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/seguimiento" className="hover:text-white">
                Consultar folio
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-medium text-white">Atención</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>Lunes a domingo, 8:00 a 20:00</li>
            <li>contacto@gencerteza.example</li>
            <li>
              <Link href="/privacidad" className="hover:text-white">
                Aviso de privacidad
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-6 text-xs leading-relaxed text-white/50">
          <p>
            La admisibilidad de un dictamen genético depende de la legislación
            y de la autoridad de cada jurisdicción. GenCerteza documenta la
            cadena de custodia conforme a estándares periciales; no sustituye
            la asesoría de un abogado.
          </p>
          <p className="mt-2">
            © {2026} GenCerteza. Versión de demostración (MVP).
          </p>
        </Container>
      </div>
    </footer>
  );
}
