import { after } from "next/server";
import { sendRequestConfirmation } from "@/lib/server/email";
import { json, readJson, serverError, tooMany } from "@/lib/server/http";
import { allow, clientKey } from "@/lib/server/rate-limit";
import { createRequest } from "@/lib/server/requests";
import type { ContactData } from "@/lib/types";
import { findVariant, isServiceId } from "@/lib/services";
import { isModality, validateRequest } from "@/lib/validation";

const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** Registra una solicitud y devuelve su folio. */
export async function POST(request: Request) {
  try {
    if (!(await allow(`solicitud:${clientKey(request)}`, 5, 60))) return tooMany();

    const body = await readJson(request);
    const raw = (body.contact ?? {}) as Record<string, unknown>;
    const contact: ContactData = {
      fullName: text(raw.fullName),
      email: text(raw.email).toLowerCase(),
      phone: text(raw.phone),
      city: text(raw.city),
      address: text(raw.address),
      preferredDate: text(raw.preferredDate),
      notes: text(raw.notes),
      consent: raw.consent === true,
      legitimacy: raw.legitimacy === true,
    };
    const modality = isModality(body.modality) ? body.modality : null;

    // Un día de margen: el "hoy" del cliente puede ir por detrás del servidor.
    const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
    const errors = validateRequest(contact, modality, yesterday);
    const service = isServiceId(body.service) ? body.service : null;
    const variant = service ? findVariant(service, body.variant) : null;
    if (!service) errors.service = "Seleccione un servicio.";
    else if (!variant) errors.variant = "Seleccione una opción del servicio.";
    if (Object.keys(errors).length || !modality || !service || !variant) {
      return json({ error: "Revise los datos del formulario.", errors }, 422);
    }
    if (modality === "clinica") contact.address = "";

    const folio = await createRequest(service, variant.id, modality, contact);

    after(() =>
      sendRequestConfirmation(contact.email, folio).catch((error) =>
        console.error("[correo]", error instanceof Error ? error.message : error),
      ),
    );
    return json({ folio }, 201);
  } catch (error) {
    return serverError(error);
  }
}
