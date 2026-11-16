import type { ContactData, Modality } from "./types";

export type ContactErrors = Partial<
  Record<keyof ContactData | "modality" | "service" | "variant", string>
>;

/** Fecha local de hoy en formato YYYY-MM-DD. */
export function todayISO(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

const MAX = { fullName: 120, email: 160, phone: 30, city: 80, address: 240, notes: 600 };

/** Reglas compartidas por el formulario (cliente) y la API (servidor). */
export function validateRequest(
  contact: ContactData,
  modality: Modality | null,
  minDate = todayISO(),
): ContactErrors {
  const errors: ContactErrors = {};
  if (!modality) errors.modality = "Seleccione una modalidad.";
  if (contact.fullName.trim().length < 3 || contact.fullName.length > MAX.fullName)
    errors.fullName = "Escriba su nombre completo.";
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact.email.trim()) ||
    contact.email.length > MAX.email
  )
    errors.email = "Escriba un correo válido, por ejemplo nombre@correo.com.";
  const digits = contact.phone.replace(/\D/g, "").length;
  if (digits < 10 || digits > 15 || contact.phone.length > MAX.phone)
    errors.phone = "Escriba un teléfono de 10 dígitos.";
  if (!contact.city.trim() || contact.city.length > MAX.city)
    errors.city = "Indique su ciudad.";
  if (
    modality === "domicilio" &&
    (contact.address.trim().length < 6 || contact.address.length > MAX.address)
  )
    errors.address = "Indique el domicilio u hospital para la toma.";
  if (
    contact.preferredDate &&
    (!/^\d{4}-\d{2}-\d{2}$/.test(contact.preferredDate) ||
      contact.preferredDate < minDate)
  )
    errors.preferredDate = "Elija una fecha a partir de hoy.";
  if (contact.notes.length > MAX.notes)
    errors.notes = "Las indicaciones no pueden exceder 600 caracteres.";
  if (!contact.consent)
    errors.consent =
      "Para continuar debe aceptar el aviso de privacidad y el tratamiento de sus datos.";
  if (!contact.legitimacy)
    errors.legitimacy = "Para continuar debe confirmar esta declaración.";
  return errors;
}

export const isModality = (v: unknown): v is Modality =>
  v === "domicilio" || v === "clinica";
