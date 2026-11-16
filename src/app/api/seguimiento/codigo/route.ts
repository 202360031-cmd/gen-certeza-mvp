import { after } from "next/server";
import { FOLIO_PATTERN, normalizeFolio } from "@/lib/folio";
import { CODE_TTL_MINUTES, issueCode } from "@/lib/server/access";
import { sendAccessCode } from "@/lib/server/email";
import { json, readJson, serverError, tooMany } from "@/lib/server/http";
import { allow, clientKey } from "@/lib/server/rate-limit";
import { getContactEmail } from "@/lib/server/requests";

/**
 * Paso 1 de la consulta: envía un código al correo registrado.
 * La respuesta es idéntica exista o no el folio, y el trabajo real ocurre
 * después de responder, para que no se pueda averiguar qué folios existen.
 */
export async function POST(request: Request) {
  try {
    const folio = normalizeFolio(String((await readJson(request)).folio ?? ""));
    if (!FOLIO_PATTERN.test(folio)) {
      return json({ error: "El folio no tiene un formato válido." }, 400);
    }

    const byClient = await allow(`codigo:ip:${clientKey(request)}`, 10, 15);
    const byFolio = await allow(`codigo:folio:${folio}`, 3, 15);
    if (!byClient || !byFolio) return tooMany();

    after(async () => {
      try {
        const email = await getContactEmail(folio);
        if (!email) return;
        await sendAccessCode(email, await issueCode(folio), CODE_TTL_MINUTES);
      } catch (error) {
        console.error("[codigo]", error instanceof Error ? error.message : error);
      }
    });

    return json({ ok: true, expiresInMinutes: CODE_TTL_MINUTES });
  } catch (error) {
    return serverError(error);
  }
}
