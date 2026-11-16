import "server-only";
import { fingerprint } from "./crypto";
import { db } from "./db";

/**
 * Límite de intentos con ventana fija, guardado en PostgreSQL para que
 * funcione entre instancias sin servidor. Devuelve true si se permite.
 */
export async function allow(
  key: string,
  max: number,
  windowMinutes: number,
): Promise<boolean> {
  const sql = db();
  const [row] = await sql<{ cuenta: number }[]>`
    insert into limites (clave, cuenta, inicio)
    values (${key}, 1, now())
    on conflict (clave) do update set
      cuenta = case
        when limites.inicio < now() - make_interval(mins => ${windowMinutes})
        then 1 else limites.cuenta + 1 end,
      inicio = case
        when limites.inicio < now() - make_interval(mins => ${windowMinutes})
        then now() else limites.inicio end
    returning cuenta
  `;
  return row.cuenta <= max;
}

/** Identificador del cliente sin guardar su IP en claro. */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const ip =
    forwarded.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "desconocida";
  return fingerprint(`ip:${ip}`);
}
