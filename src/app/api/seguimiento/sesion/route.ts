import { endSession, sessionFolio } from "@/lib/server/access";
import { json, serverError } from "@/lib/server/http";
import { getTrackingRecord } from "@/lib/server/requests";

/** Devuelve el estatus si hay una sesión de consulta vigente. */
export async function GET() {
  try {
    const folio = await sessionFolio();
    const record = folio ? await getTrackingRecord(folio) : null;
    return json({ record });
  } catch (error) {
    return serverError(error);
  }
}

/** Cierra la sesión de consulta. */
export async function DELETE() {
  await endSession();
  return json({ ok: true });
}
