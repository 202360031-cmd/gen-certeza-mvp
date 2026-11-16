import "server-only";

const NO_STORE = { "Cache-Control": "no-store" };

export const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: NO_STORE });

export const tooMany = () =>
  json(
    { error: "Demasiados intentos. Espere unos minutos antes de volver a intentar." },
    429,
  );

export const serverError = (error: unknown) => {
  // Nunca se registran datos personales: solo el mensaje técnico.
  console.error("[api]", error instanceof Error ? error.message : error);
  return json(
    { error: "No pudimos procesar su solicitud. Intente de nuevo en unos minutos." },
    500,
  );
};

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  try {
    const body = await request.json();
    return body && typeof body === "object" ? body : {};
  } catch {
    return {};
  }
}
