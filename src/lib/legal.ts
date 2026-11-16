/**
 * Datos del responsable y control de versiones de los textos legales.
 * Complete los campos entre corchetes antes de operar.
 */
export const LEGAL = {
  razonSocial: "[RAZÓN SOCIAL DEL RESPONSABLE]",
  nombreComercial: "GenCerteza",
  domicilio: "[CALLE, NÚMERO, COLONIA, C.P., MUNICIPIO], Veracruz, México",
  correoPrivacidad: "[privacidad@su-dominio.mx]",
  /** Días naturales que se conserva la muestra biológica tras entregar el resultado. */
  diasConservacionMuestra: "[30]",
  /** Años que se conserva el expediente (dictamen, actas y consentimientos). */
  aniosConservacionExpediente: "[5]",

  /**
   * Versión del aviso de privacidad. Se guarda junto a cada solicitud como
   * constancia de qué texto aceptó la persona. Cámbiela al modificar el aviso.
   */
  version: "2026-11-borrador",
  fechaActualizacion: "16 de noviembre de 2026",

  /** Póngalo en true cuando un abogado haya revisado y aprobado los textos. */
  revisadoPorAbogado: false,
};
