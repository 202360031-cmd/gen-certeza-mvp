import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { LockIcon } from "@/components/ui/Icons";
import { RequestWizard } from "@/components/wizard/RequestWizard";

export const metadata: Metadata = { title: "Solicitar cita o kit" };

export default function RequestPage() {
  return (
    <Container className="max-w-3xl py-10 sm:py-16">
      <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        Solicitud de cita
      </h1>
      <p className="mt-3 flex items-start gap-2 text-sm text-ink-soft">
        <LockIcon className="mt-0.5 h-4 w-4 shrink-0 text-clinic" />
        Sus datos se tratan de forma confidencial y solo se usan para coordinar
        la toma de muestra.
      </p>
      <div className="mt-8">
        <Suspense
          fallback={
            <div className="h-96 rounded-lg border border-line bg-surface" />
          }
        >
          <RequestWizard />
        </Suspense>
      </div>
    </Container>
  );
}
