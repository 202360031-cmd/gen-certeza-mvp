import { FOLIO_PATTERN, normalizeFolio } from "@/lib/folio";
import { checkCode, startSession } from "@/lib/server/access";
import { json, readJson, serverError, tooMany } from "@/lib/server/http";
import { allow, clientKey } from "@/lib/server/rate-limit";
import { getTrackingRecord } from "@/lib/server/requests";

/** Paso 2 de la consulta: valida el código y abre una sesión de 15 minutos. */
export async function POST(request: Request) {
  try {
    const body = await readJson(request);
    const folio = normalizeFolio(String(body.folio ?? ""));
    const code = String(body.code ?? "").replace(/\D/g, "");
    const invalid = () =>
      json({ error: "El código no es correcto o ya venció. Solicite uno nuevo si es necesario." }, 401);

    if (!FOLIO_PATTERN.test(folio) || code.length !== 6) return invalid();

    const byClient = await allow(`verificar:ip:${clientKey(request)}`, 20, 15);
    const byFolio = await allow(`verificar:folio:${folio}`, 10, 15);
    if (!byClient || !byFolio) return tooMany();

    if (!(await checkCode(folio, code))) return invalid();
    const record = await getTrackingRecord(folio);
    if (!record) return invalid();

    await startSession(folio);
    return json({ record });
  } catch (error) {
    return serverError(error);
  }
}
