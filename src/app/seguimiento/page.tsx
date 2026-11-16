import type { Metadata } from "next";
import { Suspense } from "react";
import {
  TrackingEmptyHelp,
  TrackingPanel,
} from "@/components/tracking/TrackingPanel";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Consultar folio" };

export default function TrackingPage() {
  return (
    <Container className="max-w-3xl py-10 sm:py-16">
      <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        Estatus de su muestra
      </h1>
      <p className="mt-3 text-ink-soft">
        Ingrese su folio para conocer en qué etapa se encuentra su caso.
      </p>
      <div className="mt-8">
        <Suspense fallback={<div className="h-44 rounded-lg border border-line bg-surface" />}>
          <TrackingPanel />
        </Suspense>
      </div>
      <TrackingEmptyHelp />
    </Container>
  );
}
