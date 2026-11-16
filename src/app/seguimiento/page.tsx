import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { TrackingPanel } from "@/components/tracking/TrackingPanel";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Consultar folio" };

export default function TrackingPage() {
  return (
    <Container className="max-w-3xl py-10 sm:py-16">
      <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        Estatus de su muestra
      </h1>
      <p className="mt-3 text-ink-soft">
        Ingrese su folio y confirme su identidad con el código que enviaremos a
        su correo.
      </p>
      <div className="mt-8">
        <Suspense fallback={<div className="h-44 rounded-lg border border-line bg-surface" />}>
          <TrackingPanel />
        </Suspense>
      </div>
      <p className="mt-6 text-sm text-ink-muted">
        ¿Aún no tiene folio?{" "}
        <Link href="/solicitud" className="text-navy underline">
          Solicite su cita
        </Link>
      </p>
    </Container>
  );
}
