"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { formatDate } from "@/lib/format";
import { FOLIO_PATTERN, normalizeFolio } from "@/lib/folio";
import { MODALITIES, SERVICES } from "@/lib/services";
import { findRequest } from "@/lib/storage";
import {
  DEMO_FOLIOS,
  TRACKING_STAGES,
  findDemoRecord,
  recordFromRequest,
} from "@/lib/tracking";
import type { TrackingRecord } from "@/lib/types";
import { StatusTimeline } from "./StatusTimeline";

type Result =
  | { kind: "idle" }
  | { kind: "invalid" }
  | { kind: "not-found"; folio: string }
  | { kind: "found"; record: TrackingRecord };

function lookup(raw: string): Result {
  const folio = normalizeFolio(raw);
  if (!FOLIO_PATTERN.test(folio)) return { kind: "invalid" };
  const demo = findDemoRecord(folio);
  if (demo) return { kind: "found", record: demo };
  const request = findRequest(folio);
  if (request) return { kind: "found", record: recordFromRequest(request) };
  return { kind: "not-found", folio };
}

export function TrackingPanel() {
  const router = useRouter();
  const folioParam = useSearchParams().get("folio") ?? "";
  const [input, setInput] = useState(folioParam);
  const [syncedParam, setSyncedParam] = useState(folioParam);
  const [invalid, setInvalid] = useState(false);

  // La URL es la fuente de verdad: permite enlazar y usar el botón Atrás.
  if (syncedParam !== folioParam) {
    setSyncedParam(folioParam);
    setInput(folioParam);
    setInvalid(false);
  }

  // Este componente solo se renderiza en el cliente (useSearchParams bajo
  // Suspense), por lo que la consulta puede leer localStorage directamente.
  const result: Result = invalid
    ? { kind: "invalid" }
    : folioParam
      ? lookup(folioParam)
      : { kind: "idle" };

  function search(raw: string) {
    const folio = normalizeFolio(raw);
    const ok = FOLIO_PATTERN.test(folio);
    setInvalid(!ok);
    if (!ok) return;
    setInput(folio);
    if (folio !== folioParam) {
      router.replace(`/seguimiento?folio=${folio}`, { scroll: false });
    }
  }

  const error =
    result.kind === "invalid"
      ? "El folio tiene el formato GC- seguido de 5 dígitos, por ejemplo GC-88392."
      : result.kind === "not-found"
        ? `No encontramos el folio ${result.folio}. Verifique los dígitos o contacte a su coordinador.`
        : null;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          search(input);
        }}
        className="rounded-lg border border-line bg-surface p-5 sm:p-6"
        noValidate
      >
        <label htmlFor="folio" className="text-sm font-medium">
          Folio de Seguimiento Seguro
        </label>
        <div className="mt-1.5 flex flex-col gap-3 sm:flex-row">
          <input
            id="folio"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="GC-00000"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "folio-error" : "folio-hint"}
            className={`block min-h-11 w-full flex-1 rounded-md border bg-surface px-3.5 font-mono text-base tracking-wider uppercase placeholder:text-ink-muted/60 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy ${error ? "border-alert" : "border-line-strong"}`}
          />
          <Button type="submit">Consultar estatus</Button>
        </div>
        <div aria-live="polite">
          {error ? (
            <p id="folio-error" className="mt-2 text-sm text-alert">
              {error}
            </p>
          ) : (
            <p id="folio-hint" className="mt-2 text-sm text-ink-muted">
              Lo recibió al confirmar su solicitud.
            </p>
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-4 text-sm text-ink-muted">
          <span>Folios de demostración:</span>
          {DEMO_FOLIOS.map((folio) => (
            <button
              key={folio}
              type="button"
              onClick={() => search(folio)}
              className="rounded border border-line-strong px-2.5 py-1.5 font-mono text-xs text-ink-soft hover:border-navy hover:text-navy"
            >
              {folio}
            </button>
          ))}
        </div>
      </form>

      <div aria-live="polite">
        {result.kind === "found" && <RecordView record={result.record} />}
      </div>
    </div>
  );
}

function RecordView({ record }: { record: TrackingRecord }) {
  const service = SERVICES[record.service];
  const stage = TRACKING_STAGES[record.currentStage];
  const ready = record.currentStage === TRACKING_STAGES.length - 1;

  return (
    <section className="mt-6 rounded-lg border border-line bg-surface">
      <header className="border-b border-line p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-sm tracking-wider text-ink-muted">
              {record.folio}
            </p>
            <h2 className="mt-1 font-serif text-2xl font-semibold tracking-tight">
              {stage.title}
            </h2>
          </div>
          <span
            className={`rounded px-2.5 py-1 text-xs font-medium ${ready ? "bg-clinic-tint text-clinic" : "bg-navy-tint text-navy"}`}
          >
            {ready ? "Concluido" : `Etapa ${record.currentStage + 1} de ${TRACKING_STAGES.length}`}
          </span>
        </div>

        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-ink-muted">Servicio</dt>
            <dd className="mt-0.5 font-medium">{service.shortName}</dd>
          </div>
          <div>
            <dt className="text-ink-muted">Modalidad</dt>
            <dd className="mt-0.5 font-medium">
              {MODALITIES[record.modality].name}
            </dd>
          </div>
          <div>
            <dt className="text-ink-muted">Entrega estimada</dt>
            <dd className="mt-0.5 font-medium">
              {ready
                ? "Disponible"
                : record.estimatedDelivery
                  ? formatDate(record.estimatedDelivery)
                  : "Se define tras la toma de muestra"}
            </dd>
          </div>
        </dl>
      </header>

      <div className="p-5 sm:p-6">
        <StatusTimeline record={record} />
      </div>

      <footer className="border-t border-line bg-paper/60 p-5 text-sm leading-relaxed text-ink-soft sm:p-6">
        {ready ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md">
              Por seguridad, el dictamen se entrega únicamente al solicitante,
              previa verificación de identidad.
            </p>
            <Button disabled title="No disponible en la versión de demostración">
              Descargar dictamen
            </Button>
          </div>
        ) : (
          <p>
            Por confidencialidad, aquí solo se muestra el estatus. El resultado
            nunca se publica en línea sin verificar su identidad.
          </p>
        )}
      </footer>
    </section>
  );
}

export function TrackingEmptyHelp() {
  return (
    <p className="mt-6 text-sm text-ink-muted">
      ¿Aún no tiene folio?{" "}
      <ButtonLink href="/solicitud" variant="ghost" className="!min-h-0 !px-0 underline">
        Solicite su cita
      </ButtonLink>
    </p>
  );
}
