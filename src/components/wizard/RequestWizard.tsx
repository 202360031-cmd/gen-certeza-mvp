"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { generateFolio } from "@/lib/folio";
import { folioExists, saveRequest } from "@/lib/storage";
import { DEMO_FOLIOS } from "@/lib/tracking";
import type {
  ContactData,
  Modality,
  ServiceId,
  ServiceRequest,
} from "@/lib/types";
import { StepConfirmation } from "./StepConfirmation";
import { StepContact, type ContactErrors } from "./StepContact";
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

function todayISO() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function validate(contact: ContactData, modality: Modality | null) {
  const errors: ContactErrors = {};
  if (!modality) errors.modality = "Seleccione una modalidad.";
  if (contact.fullName.trim().length < 3)
    errors.fullName = "Escriba su nombre completo.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact.email.trim()))
    errors.email = "Escriba un correo válido, por ejemplo nombre@correo.com.";
  if (contact.phone.replace(/\D/g, "").length < 10)
    errors.phone = "Escriba un teléfono de 10 dígitos.";
  if (!contact.city.trim()) errors.city = "Indique su ciudad.";
  if (modality === "domicilio" && contact.address.trim().length < 6)
    errors.address = "Indique el domicilio u hospital para la toma.";
  if (contact.preferredDate && contact.preferredDate < todayISO())
    errors.preferredDate = "Elija una fecha a partir de hoy.";
  if (!contact.consent)
    errors.consent = "Debe aceptar para continuar con la solicitud.";
  return errors;
}

function uniqueFolio() {
  let folio = generateFolio();
  while (DEMO_FOLIOS.includes(folio) || folioExists(folio)) {
    folio = generateFolio();
  }
  return folio;
}

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

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (step === 1) {
      if (service) setStep(2);
      return;
    }

    const found = validate(contact, modality);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document
        .getElementById(firstInvalid === "modality" ? "panel-solicitud" : firstInvalid)
        ?.focus();
      return;
    }
    if (!service || !modality) return;

    // MVP: se guarda en el navegador. En producción, POST a la API.
    const created: ServiceRequest = {
      folio: uniqueFolio(),
      service,
      modality,
      contact: {
        ...contact,
        fullName: contact.fullName.trim(),
        email: contact.email.trim(),
        phone: contact.phone.trim(),
        city: contact.city.trim(),
      },
      createdAt: new Date().toISOString(),
    };
    saveRequest(created);
    setRequest(created);
    setStep(3);
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

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between">
              {step === 2 ? (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setStep(1)}
                >
                  Atrás
                </Button>
              ) : (
                <span />
              )}
              <Button type="submit" disabled={step === 1 && !service}>
                {step === 1 ? "Continuar" : "Confirmar solicitud"}
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
