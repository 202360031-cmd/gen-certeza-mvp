import "server-only";
import postgres from "postgres";

type Sql = ReturnType<typeof postgres>;

// Una sola conexión por instancia (también entre recargas en desarrollo).
const globalForDb = globalThis as unknown as { __gcSql?: Sql };

export function db(): Sql {
  if (!globalForDb.__gcSql) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("Falta la variable de entorno DATABASE_URL.");
    globalForDb.__gcSql = postgres(url, {
      // Necesario con el "transaction pooler" de Supabase (pgbouncer).
      prepare: false,
      max: 5,
      idle_timeout: 20,
    });
  }
  return globalForDb.__gcSql;
}
