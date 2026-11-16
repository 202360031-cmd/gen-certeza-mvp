import "server-only";
import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  hkdfSync,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";

/**
 * Criptografía de la aplicación. De una sola clave maestra
 * (DATA_ENCRYPTION_KEY) se derivan con HKDF claves independientes para
 * cifrar, firmar sesiones y calcular huellas, de modo que comprometer un uso
 * no compromete los demás.
 */

type Purpose = "cifrado" | "sesion" | "huella";
const derived = new Map<Purpose, Buffer>();

function key(purpose: Purpose): Buffer {
  const cached = derived.get(purpose);
  if (cached) return cached;

  const master = Buffer.from(process.env.DATA_ENCRYPTION_KEY ?? "", "base64");
  if (master.length !== 32) {
    throw new Error(
      "DATA_ENCRYPTION_KEY debe ser una clave de 32 bytes en base64 (openssl rand -base64 32).",
    );
  }
  const out = Buffer.from(
    hkdfSync("sha256", master, Buffer.alloc(0), `gencerteza:${purpose}:v1`, 32),
  );
  derived.set(purpose, out);
  return out;
}

const b64 = (buf: Buffer) => buf.toString("base64url");

/**
 * Cifra con AES-256-GCM. `context` (el folio) se autentica junto al texto:
 * un valor cifrado copiado a otra fila no se puede descifrar.
 * Formato: v1.<iv>.<cifrado>.<etiqueta>
 */
export function encrypt(plaintext: string, context: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key("cifrado"), iv);
  cipher.setAAD(Buffer.from(context));
  const data = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  return ["v1", b64(iv), b64(data), b64(cipher.getAuthTag())].join(".");
}

export function decrypt(payload: string, context: string): string {
  const [version, iv, data, tag] = payload.split(".");
  if (version !== "v1" || !iv || !data || !tag) {
    throw new Error("Formato de dato cifrado no reconocido.");
  }
  const decipher = createDecipheriv(
    "aes-256-gcm",
    key("cifrado"),
    Buffer.from(iv, "base64url"),
  );
  decipher.setAAD(Buffer.from(context));
  decipher.setAuthTag(Buffer.from(tag, "base64url"));
  return Buffer.concat([
    decipher.update(Buffer.from(data, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}

/** Huella irreversible (HMAC): para códigos de acceso e IP en los límites. */
export function fingerprint(value: string): string {
  return createHmac("sha256", key("huella")).update(value).digest("base64url");
}

export function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/** Token firmado "<carga>.<firma>" para la sesión de consulta. */
export function sign(payload: object): string {
  const body = b64(Buffer.from(JSON.stringify(payload)));
  const mac = createHmac("sha256", key("sesion")).update(body).digest("base64url");
  return `${body}.${mac}`;
}

export function verify<T>(token: string): T | null {
  const [body, mac] = token.split(".");
  if (!body || !mac) return null;
  const expected = createHmac("sha256", key("sesion"))
    .update(body)
    .digest("base64url");
  if (!safeEqual(mac, expected)) return null;
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as T;
  } catch {
    return null;
  }
}
