import type { ServiceRequest } from "./types";

/**
 * Persistencia simulada en el navegador. Solo para el MVP: en producción las
 * solicitudes deben guardarse cifradas en el servidor, nunca en localStorage.
 */
const KEY = "gencerteza.solicitudes";

function readAll(): Record<string, ServiceRequest> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function saveRequest(request: ServiceRequest): void {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({ ...readAll(), [request.folio]: request }),
    );
  } catch {
    // Sin almacenamiento disponible (modo privado): el folio sigue mostrándose.
  }
}

export function findRequest(folio: string): ServiceRequest | null {
  return readAll()[folio] ?? null;
}

export function folioExists(folio: string): boolean {
  return folio in readAll();
}
