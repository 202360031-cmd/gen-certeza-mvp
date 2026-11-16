import { FOLIO_PATTERN } from "@/lib/folio";
import { safeEqual } from "@/lib/server/crypto";
import { json, readJson, serverError, tooMany } from "@/lib/server/http";
import { allow, clientKey } from "@/lib/server/rate-limit";
import { updateStage } from "@/lib/server/requests";

/**
 * Uso interno del laboratorio: actualiza la etapa de una muestra.
 *   PATCH /api/admin/solicitudes/GC-12345
 *   Authorization: Bearer <ADMIN_API_TOKEN>
 *   { "stage": 2, "estimatedDelivery": "2026-12-01" }
 * Solución provisional hasta contar con un panel interno con usuarios.
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ folio: string }> },
) {
  try {
    const token = process.env.ADMIN_API_TOKEN ?? "";
    const given = request.headers.get("authorization") ?? "";
    if (token.length < 32 || !safeEqual(given, `Bearer ${token}`)) {
      if (!(await allow(`admin:${clientKey(request)}`, 10, 15))) return tooMany();
      return json({ error: "No autorizado." }, 401);
    }

    const { folio } = await params;
    const body = await readJson(request);
    const delivery = body.estimatedDelivery;
    if (
      !FOLIO_PATTERN.test(folio) ||
      typeof body.stage !== "number" ||
      !(
        delivery === undefined ||
        delivery === null ||
        (typeof delivery === "string" && /^\d{4}-\d{2}-\d{2}$/.test(delivery))
      )
    ) {
      return json({ error: "Datos no válidos." }, 400);
    }

    try {
      const record = await updateStage(folio, body.stage, delivery);
      return record ? json({ record }) : json({ error: "Folio no encontrado." }, 404);
    } catch (error) {
      if (error instanceof RangeError) return json({ error: error.message }, 400);
      throw error;
    }
  } catch (error) {
    return serverError(error);
  }
}
