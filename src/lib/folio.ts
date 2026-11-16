export const FOLIO_PATTERN = /^GC-\d{5}$/;

/** Genera un folio con formato GC-##### usando una fuente criptográfica. */
export function generateFolio(): string {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  const digits = 10000 + (buffer[0] % 90000);
  return `GC-${digits}`;
}

/** Normaliza lo que escribe el usuario: "gc 88392", "88392" → "GC-88392". */
export function normalizeFolio(input: string): string {
  const digits = input.replace(/\D/g, "");
  return digits.length === 5 ? `GC-${digits}` : input.trim().toUpperCase();
}
