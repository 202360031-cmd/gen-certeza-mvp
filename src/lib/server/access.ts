import "server-only";
import { randomInt } from "node:crypto";
import { cookies } from "next/headers";
import { fingerprint, safeEqual, sign, verify } from "./crypto";
import { db } from "./db";

export const CODE_TTL_MINUTES = 10;
const MAX_ATTEMPTS_PER_CODE = 5;
const SESSION_MINUTES = 15;
const COOKIE = "gc_sesion";

const hashCode = (folio: string, code: string) =>
  fingerprint(`codigo:${folio}:${code}`);

/** Crea un código de 6 dígitos e invalida los anteriores del mismo folio. */
export async function issueCode(folio: string): Promise<string> {
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  const sql = db();
  await sql.begin(async (tx) => {
    await tx`update codigos_acceso set usado = true where folio = ${folio} and not usado`;
    await tx`
      insert into codigos_acceso (folio, codigo_hash, expira_en)
      values (${folio}, ${hashCode(folio, code)},
              now() + make_interval(mins => ${CODE_TTL_MINUTES}))
    `;
  });
  return code;
}

/**
 * Comprueba el código. Cada intento se cuenta de forma atómica antes de
 * comparar, así que 5 fallos anulan el código aunque lleguen en paralelo.
 */
export async function checkCode(folio: string, code: string): Promise<boolean> {
  const sql = db();
  const [row] = await sql<{ id: string; codigo_hash: string }[]>`
    update codigos_acceso set intentos = intentos + 1
    where id = (
      select id from codigos_acceso
      where folio = ${folio} and not usado and expira_en > now()
        and intentos < ${MAX_ATTEMPTS_PER_CODE}
      order by creado_en desc limit 1
    )
    returning id, codigo_hash
  `;
  if (!row || !safeEqual(row.codigo_hash, hashCode(folio, code))) return false;
  await sql`update codigos_acceso set usado = true where id = ${row.id}`;
  return true;
}

interface Session {
  folio: string;
  exp: number;
}

/** Sesión corta, ligada a un solo folio, en cookie firmada y HttpOnly. */
export async function startSession(folio: string): Promise<void> {
  const exp = Date.now() + SESSION_MINUTES * 60_000;
  (await cookies()).set(COOKIE, sign({ folio, exp } satisfies Session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MINUTES * 60,
  });
}

export async function sessionFolio(): Promise<string | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const session = verify<Session>(token);
  return session && session.exp > Date.now() ? session.folio : null;
}

export async function endSession(): Promise<void> {
  (await cookies()).delete(COOKIE);
}
