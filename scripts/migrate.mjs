// Aplica db/schema.sql a la base indicada en DATABASE_URL.
// Uso: npm run db:migrate   (lee .env.local si existe)
import { readFile } from "node:fs/promises";
import postgres from "postgres";

if (!process.env.DATABASE_URL) {
  console.error("Falta DATABASE_URL (defínala en .env.local).");
  process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL, { max: 1, onnotice: () => {} });
try {
  const schema = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");
  await sql.unsafe(schema);
  console.log("Esquema aplicado correctamente.");
} finally {
  await sql.end();
}
