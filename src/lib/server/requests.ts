import "server-only";
import { randomInt } from "node:crypto";
import { LEGAL } from "@/lib/legal";
import { TRACKING_STAGES } from "@/lib/tracking";
import type {
  ContactData,
  Modality,
  ServiceId,
  TrackingRecord,
} from "@/lib/types";
import { decrypt, encrypt } from "./crypto";
import { db } from "./db";

interface Row {
  folio: string;
  servicio: ServiceId;
  variante: string;
  modalidad: Modality;
  etapa: number;
  fechas_etapas: string[];
  entrega_estimada: string | null;
}

const toRecord = (row: Row): TrackingRecord => ({
  folio: row.folio,
  service: row.servicio,
  variant: row.variante,
  modality: row.modalidad,
  currentStage: row.etapa,
  stageDates: row.fechas_etapas,
  estimatedDelivery: row.entrega_estimada ?? undefined,
});

const newFolio = () => `GC-${randomInt(10000, 100000)}`;

/** Guarda la solicitud con los datos de contacto cifrados. Devuelve el folio. */
export async function createRequest(
  service: ServiceId,
  variant: string,
  modality: Modality,
  contact: ContactData,
): Promise<string> {
  const sql = db();
  for (let attempt = 0; attempt < 8; attempt++) {
    const folio = newFolio();
    const inserted = await sql`
      insert into solicitudes (
        folio, servicio, variante, modalidad, contacto_cifrado, fechas_etapas,
        aviso_version, consentimiento_en
      )
      values (
        ${folio}, ${service}, ${variant}, ${modality},
        ${encrypt(JSON.stringify(contact), folio)},
        ${sql.json([new Date().toISOString()])},
        ${LEGAL.version}, now()
      )
      on conflict (folio) do nothing
      returning folio
    `;
    if (inserted.length) return folio;
  }
  throw new Error("No fue posible asignar un folio único.");
}

/** Solo estatus: nunca devuelve datos de contacto. */
export async function getTrackingRecord(
  folio: string,
): Promise<TrackingRecord | null> {
  const [row] = await db()<Row[]>`
    select folio, servicio, variante, modalidad, etapa, fechas_etapas,
           to_char(entrega_estimada, 'YYYY-MM-DD') as entrega_estimada
    from solicitudes where folio = ${folio}
  `;
  return row ? toRecord(row) : null;
}

/** Correo del solicitante, descifrado solo para enviarle su código. */
export async function getContactEmail(folio: string): Promise<string | null> {
  const [row] = await db()<{ contacto_cifrado: string }[]>`
    select contacto_cifrado from solicitudes where folio = ${folio}
  `;
  if (!row) return null;
  const contact = JSON.parse(decrypt(row.contacto_cifrado, folio)) as ContactData;
  return contact.email;
}

/** Uso del laboratorio: avanza la etapa y registra la fecha. */
export async function updateStage(
  folio: string,
  stage: number,
  estimatedDelivery?: string | null,
): Promise<TrackingRecord | null> {
  if (!Number.isInteger(stage) || stage < 0 || stage >= TRACKING_STAGES.length) {
    throw new RangeError("Etapa fuera de rango.");
  }
  const sql = db();
  const current = await getTrackingRecord(folio);
  if (!current) return null;

  const now = new Date().toISOString();
  const dates = Array.from(
    { length: stage + 1 },
    (_, i) => current.stageDates[i] ?? now,
  );
  await sql`
    update solicitudes set
      etapa = ${stage},
      fechas_etapas = ${sql.json(dates)},
      entrega_estimada = ${
        estimatedDelivery === undefined
          ? sql`entrega_estimada`
          : estimatedDelivery
      }
    where folio = ${folio}
  `;
  return getTrackingRecord(folio);
}
