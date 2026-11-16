"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import type {
  ContactData,
  Modality,
  ServiceId,
  ServiceRequest,
} from "@/lib/types";
import {
  todayISO,
  validateRequest,
  type ContactErrors,
} from "@/lib/validation";
import { StepConfirmation } from "./StepConfirmation";
import { StepContact } from "./StepContact";
import { StepIndicator } from "./StepIndicator";
import { StepService } from "./StepService";

const EMPTY_CONTACT: ContactData = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  address: "",
  preferredDate: "",
  notes: "",
  consent: false,
};

export function RequestWizard() {
  const preselected = useSearchParams().get("servicio");
  const [step, setStep] = useState(1);
  const [service, setService] = useState<ServiceId | null>(
    preselected === "paternidad" || preselected === "identidad"
      ? preselected
      : null,
  );
  const [modality, setModality] = useState<Modality | null>(null);
  const [contact, setContact] = useState<ContactData>(EMPTY_CONTACT);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // Al cambiar de paso, lleva la vista y el foco al inicio del panel.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    panelRef.current?.scrollIntoView({ block: "start" });
    const target =
      panelRef.current?.querySelector<HTMLElement>("[data-step-heading]") ??
      panelRef.current;
    target?.focus({ preventScroll: true });
  }, [step]);

  function updateContact<K extends keyof ContactData>(
    key: K,
    value: ContactData[K],
  ) {
    setContact((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function focusFirstError(found: ContactErrors) {
    const first = Object.keys(found)[0];
    if (!first) return;
    const id = first === "modality" || first === "service" ? "panel-solicitud" : first;
    document.getElementById(id)?.focus();
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (step === 1) {
      if (service) setStep(2);
      return;
    }
    if (sending) return;

    const found = validateRequest(contact, modality);
    setErrors(found);
    if (Object.keys(found).length || !service || !modality) {
      focusFirstError(found);
      return;
    }

    setSending(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, modality, contact }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.status === 422 && data.errors) {
        setErrors(data.errors);
        focusFirstError(data.errors);
        return;
      }
      if (!response.ok || !data.folio) {
        setSubmitError(
          data.error ??
            "No pudimos registrar su solicitud. Intente de nuevo en unos minutos.",
        );
        return;
      }

      setRequest({
        folio: data.folio,
        service,
        modality,
        contact,
        createdAt: new Date().toISOString(),
      });
      setStep(3);
    } catch {
      setSubmitError(
        "No hay conexión con el servidor. Sus datos siguen en el formulario; intente de nuevo.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      <StepIndicator current={step} />

      <div
        id="panel-solicitud"
        ref={panelRef}
        tabIndex={-1}
        className="mt-8 scroll-mt-24 rounded-lg border border-line bg-surface p-5 outline-none sm:p-8"
      >
        {step === 3 && request ? (
          <StepConfirmation request={request} />
        ) : (
          <form onSubmit={submit} noValidate>
            {step === 1 ? (
              <StepService value={service} onChange={setService} />
            ) : (
              <StepContact
                contact={contact}
                modality={modality}
                errors={errors}
                minDate={todayISO()}
                onContact={updateContact}
                onModality={(m) => {
                  setModality(m);
                  setErrors((prev) => ({ ...prev, modality: undefined }));
                }}
              />
            )}

            {submitError && (
              <p
                role="alert"
                className="mt-6 rounded-md border border-alert/40 bg-alert/5 p-4 text-sm text-alert"
              >
                {submitError}
              </p>
            )}

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between">
              {step === 2 ? (
                <Button
                  type="button"
                  variant="secondary"
                  disabled={sending}
                  onClick={() => setStep(1)}
                >
                  Atrás
                </Button>
              ) : (
                <span />
              )}
              <Button
                type="submit"
                disabled={(step === 1 && !service) || sending}
              >
                {step === 1
                  ? "Continuar"
                  : sending
                    ? "Registrando…"
                    : "Confirmar solicitud"}
                {!sending && <ArrowRightIcon className="h-4 w-4" />}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
