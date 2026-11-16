import "server-only";

/**
 * Envío de correo con Resend. Los mensajes son deliberadamente neutros: ni el
 * asunto ni el cuerpo mencionan la naturaleza del servicio.
 */
async function send(to: string, subject: string, text: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Correo no configurado: faltan RESEND_API_KEY o EMAIL_FROM.");
    }
    console.info(`\n[correo de desarrollo] Para: ${to}\n${subject}\n${text}\n`);
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, text }),
  });
  if (!response.ok) {
    throw new Error(`El proveedor de correo respondió ${response.status}.`);
  }
}

export function sendAccessCode(to: string, code: string, minutes: number) {
  return send(
    to,
    "Su código de verificación",
    `Su código de verificación es: ${code}\n\nVence en ${minutes} minutos. Si usted no lo solicitó, ignore este mensaje; nadie puede consultar su folio sin este código.`,
  );
}

export function sendRequestConfirmation(to: string, folio: string) {
  return send(
    to,
    "Confirmación de su solicitud",
    `Su solicitud quedó registrada con el folio ${folio}.\n\nConserve este folio: lo necesitará para consultar el avance. Un coordinador le contactará para confirmar la cita.`,
  );
}
