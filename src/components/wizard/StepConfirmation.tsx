"use client";

import { useState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { formatDate } from "@/lib/format";
import { MODALITIES, SERVICES } from "@/lib/services";
import type { ServiceRequest } from "@/lib/types";

export function StepConfirmation({ request }: { request: ServiceRequest }) {
  const [copied, setCopied] = useState(false);
  const service = SERVICES[request.service];

  async function copyFolio() {
    try {
      await navigator.clipboard.writeText(request.folio);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Portapapeles no disponible: el folio sigue visible y seleccionable.
    }
  }

  const summary = [
    ["Servicio", service.shortName],
    ["Modalidad", MODALITIES[request.modality].name],
    ["Contacto", `${request.contact.email} · ${request.contact.phone}`],
    ["Ciudad", request.contact.city],
    ...(request.contact.preferredDate
      ? [["Fecha preferida", formatDate(request.contact.preferredDate)]]
      : []),
  ];

  return (
    <div>
      <div className="flex items-center gap-3 text-clinic">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-clinic-tint">
          <CheckIcon />
        </span>
        <p className="text-sm font-medium">Solicitud registrada</p>
      </div>
      <h2
        tabIndex={-1}
        data-step-heading
        className="mt-4 font-serif text-2xl font-semibold tracking-tight outline-none sm:text-3xl"
      >
        Guarde su folio de seguimiento
      </h2>
      <p className="mt-2 text-ink-soft">
        Es la única referencia de su caso. No lo comparta: quien lo tenga podrá
        consultar el estatus de la muestra.
      </p>

      <div className="mt-6 flex flex-col gap-4 rounded-lg border border-navy bg-navy-tint p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-navy">
            Folio de Seguimiento Seguro
          </p>
          <p className="mt-1 font-mono text-3xl font-semibold tracking-wider text-navy-deep sm:text-4xl">
            {request.folio}
          </p>
        </div>
        <Button variant="secondary" onClick={copyFolio} aria-live="polite">
          {copied ? "Copiado" : "Copiar folio"}
        </Button>
      </div>

      <dl className="mt-8 divide-y divide-line border-y border-line text-sm">
        {summary.map(([term, value]) => (
          <div key={term} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-6">
            <dt className="text-ink-muted sm:w-40 sm:shrink-0">{term}</dt>
            <dd className="font-medium break-words">{value}</dd>
          </div>
        ))}
      </dl>

      <h3 className="mt-10 font-serif text-xl font-semibold">
        Siguientes pasos
      </h3>
      <ol className="mt-5 space-y-5">
        {service.nextSteps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line-strong text-sm font-medium text-ink-soft">
              {index + 1}
            </span>
            <div>
              <p className="font-medium">{step.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={`/seguimiento?folio=${request.folio}`}>
          Ver estatus de mi solicitud
        </ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Volver al inicio
        </ButtonLink>
      </div>
    </div>
  );
}
