export const FOLIO_PATTERN = /^GC-\d{5}$/;

/** Normaliza lo que escribe el usuario: "gc 88392", "88392" → "GC-88392". */
export function normalizeFolio(input: string): string {
  const digits = input.replace(/\D/g, "");
  return digits.length === 5 ? `GC-${digits}` : input.trim().toUpperCase();
}
