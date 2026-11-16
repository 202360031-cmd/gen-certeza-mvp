"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { LockIcon } from "@/components/ui/Icons";
import { formatDate } from "@/lib/format";
import { FOLIO_PATTERN, normalizeFolio } from "@/lib/folio";
import { MODALITIES, SERVICES } from "@/lib/services";
import { TRACKING_STAGES } from "@/lib/tracking";
import type { TrackingRecord } from "@/lib/types";
import { StatusTimeline } from "./StatusTimeline";

type Phase = "loading" | "folio" | "code" | "record";

const inputClass =
  "block min-h-11 w-full flex-1 rounded-md border bg-surface px-3.5 font-mono text-base tracking-wider placeholder:text-ink-muted/60 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy";

async function post(url: string, body: object) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, data };
}

const NETWORK_ERROR = "No hay conexión con el servidor. Intente de nuevo.";

export function TrackingPanel() {
  const folioParam = useSearchParams().get("folio") ?? "";
  const [phase, setPhase] = useState<Phase>("loading");
  const [folio, setFolio] = useState(folioParam);
  const [code, setCode] = useState("");
  const [record, setRecord] = useState<TrackingRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const codeRef = useRef<HTMLInputElement>(null);

  // Si hay una sesión de consulta vigente (cookie), muestra el estatus.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/seguimiento/sesion")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const active: TrackingRecord | null = data.record ?? null;
        // Un enlace a otro folio no debe mostrar el de la sesión anterior.
        if (active && (!folioParam || normalizeFolio(folioParam) === active.folio)) {
          setRecord(active);
          setPhase("record");
        } else {
          setPhase("folio");
        }
      })
      .catch(() => !cancelled && setPhase("folio"));
    return () => {
      cancelled = true;
    };
  }, [folioParam]);

  useEffect(() => {
    if (phase === "code") codeRef.current?.focus();
  }, [phase]);

  async function requestCode(event?: React.FormEvent) {
    event?.preventDefault();
    const normalized = normalizeFolio(folio);
    if (!FOLIO_PATTERN.test(normalized)) {
      setError("El folio tiene el formato GC- seguido de 5 dígitos, por ejemplo GC-88392.");
      return;
    }
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const { ok, data } = await post("/api/seguimiento/codigo", { folio: normalized });
      if (!ok) {
        setError(data.error ?? "No pudimos enviar el código. Intente más tarde.");
        return;
      }
      setFolio(normalized);
      setCode("");
      setNotice(
        phase === "code" ? "Enviamos un código nuevo. El anterior ya no es válido." : null,
      );
      setPhase("code");
    } catch {
      setError(NETWORK_ERROR);
    } finally {
      setBusy(false);
    }
  }

  async function verifyCode(event: React.FormEvent) {
    event.preventDefault();
    if (code.length !== 6) {
      setError("Escriba los 6 dígitos del código.");
      return;
    }
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const { ok, data } = await post("/api/seguimiento/verificar", { folio, code });
      if (!ok || !data.record) {
        setError(data.error ?? "No pudimos verificar el código.");
        setCode("");
        return;
      }
      setRecord(data.record);
      setPhase("record");
    } catch {
      setError(NETWORK_ERROR);
    } finally {
      setBusy(false);
    }
  }

  async function close() {
    await fetch("/api/seguimiento/sesion", { method: "DELETE" }).catch(() => {});
    setRecord(null);
    setCode("");
    setFolio("");
    setError(null);
    setNotice(null);
    setPhase("folio");
  }

  if (phase === "loading") {
    return <div className="h-44 rounded-lg border border-line bg-surface" aria-busy="true" />;
  }

  if (phase === "record" && record) {
    return <RecordView record={record} onClose={close} />;
  }

  return (
    <div className="rounded-lg border border-line bg-surface p-5 sm:p-6">
      <p className="text-sm text-ink-muted">
        Paso {phase === "folio" ? 1 : 2} de 2
      </p>

      {phase === "folio" ? (
        <form onSubmit={requestCode} noValidate className="mt-2">
          <label htmlFor="folio" className="font-medium">
            Folio de Seguimiento Seguro
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id="folio"
              value={folio}
              onChange={(e) => setFolio(e.target.value)}
              placeholder="GC-00000"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              aria-invalid={error ? true : undefined}
              aria-describedby="folio-ayuda"
              className={`${inputClass} uppercase ${error ? "border-alert" : "border-line-strong"}`}
            />
            <Button type="submit" disabled={busy}>
              {busy ? "Enviando…" : "Enviar código"}
            </Button>
          </div>
          <p
            id="folio-ayuda"
            aria-live="polite"
            className={`mt-2 text-sm ${error ? "text-alert" : "text-ink-muted"}`}
          >
            {error ??
              "Enviaremos un código de verificación al correo con el que registró su solicitud."}
          </p>
        </form>
      ) : (
        <form onSubmit={verifyCode} noValidate className="mt-2">
          <label htmlFor="codigo" className="font-medium">
            Código de verificación
          </label>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">
            Si el folio <span className="font-mono">{folio}</span> existe,
            enviamos un código de 6 dígitos al correo registrado. Vence en 10
            minutos.
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="codigo"
              ref={codeRef}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="000000"
              inputMode="numeric"
              autoComplete="one-time-code"
              aria-invalid={error ? true : undefined}
              aria-describedby="codigo-ayuda"
              className={`${inputClass} sm:max-w-48 ${error ? "border-alert" : "border-line-strong"}`}
            />
            <Button type="submit" disabled={busy}>
              {busy ? "Verificando…" : "Ver estatus"}
            </Button>
          </div>
          <p
            id="codigo-ayuda"
            aria-live="polite"
            className={`mt-2 min-h-5 text-sm ${error ? "text-alert" : "text-clinic"}`}
          >
            {error ?? notice}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-4 text-sm">
            <button
              type="button"
              disabled={busy}
              onClick={() => requestCode()}
              className="py-1 text-navy underline disabled:opacity-50"
            >
              Reenviar código
            </button>
            <button
              type="button"
              onClick={() => {
                setPhase("folio");
                setError(null);
                setNotice(null);
              }}
              className="py-1 text-ink-soft underline"
            >
              Usar otro folio
            </button>
          </div>
        </form>
      )}

      <p className="mt-5 flex items-start gap-2 border-t border-line pt-4 text-sm text-ink-muted">
        <LockIcon className="mt-0.5 h-4 w-4 shrink-0 text-clinic" />
        El folio por sí solo no da acceso: la consulta requiere el código
        enviado a su correo y los intentos están limitados.
      </p>
    </div>
  );
}

function RecordView({
  record,
  onClose,
}: {
  record: TrackingRecord;
  onClose: () => void;
}) {
  const service = SERVICES[record.service];
  const stage = TRACKING_STAGES[record.currentStage];
  const ready = record.currentStage === TRACKING_STAGES.length - 1;

  return (
    <section className="rounded-lg border border-line bg-surface" aria-live="polite">
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
            {ready
              ? "Concluido"
              : `Etapa ${record.currentStage + 1} de ${TRACKING_STAGES.length}`}
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

      <footer className="flex flex-col gap-4 border-t border-line bg-paper/60 p-5 text-sm leading-relaxed text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="max-w-md">
          {ready
            ? "Por seguridad, el dictamen se entrega únicamente al solicitante, previa verificación de identidad. Su coordinador le contactará."
            : "Aquí solo se muestra el estatus. El resultado nunca se publica en línea."}{" "}
          La sesión se cierra sola a los 15 minutos.
        </p>
        <Button variant="secondary" onClick={onClose}>
          Cerrar consulta
        </Button>
      </footer>
    </section>
  );
}
