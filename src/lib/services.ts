import type { Modality, ServiceId } from "./types";

export interface ServiceVariant {
  id: string;
  name: string;
  description: string;
  turnaround: string;
  /** Precio en pesos mexicanos. `null` = aún no definido (se muestra "por confirmar"). */
  price: number | null;
}

export interface ServiceInfo {
  id: ServiceId;
  name: string;
  shortName: string;
  stage: string;
  summary: string;
  details: string[];
  sample: string;
  /** Siempre hay al menos una. Con una sola no se muestra selector. */
  variants: ServiceVariant[];
  nextSteps: { title: string; body: string }[];
}

/** Variante implícita de los servicios sin opciones. */
export const SINGLE_VARIANT = "unica";

const CONFIRMATION_STEP = {
  title: "Confirmación de la cita",
  body: "Un coordinador le contactará en un plazo máximo de 24 horas, por el medio que usted indicó, para confirmar fecha y hora.",
};

/*
 * CATÁLOGO DE SERVICIOS
 * Para fijar precios, cambie `price: null` por el importe en pesos (p. ej. 8500).
 * Los plazos de entrega son provisionales: ajústelos a los del laboratorio.
 */
export const SERVICES: Record<ServiceId, ServiceInfo> = {
  prenatal: {
    id: "prenatal",
    name: "Paternidad prenatal no invasiva",
    shortName: "Paternidad prenatal no invasiva",
    stage: "Durante el embarazo",
    summary:
      "Determina la paternidad a partir de la 7.ª semana de gestación con una muestra de sangre de la madre, sin riesgo para el embarazo.",
    details: [
      "Sangre venosa de la madre e hisopado bucal del presunto padre",
      "Sin amniocentesis ni procedimientos invasivos",
      "Requiere la participación y el consentimiento de la madre",
    ],
    sample: "Sangre materna + hisopado bucal",
    variants: [
      {
        id: "estandar",
        name: "Estándar",
        description: "Análisis completo con el plazo de entrega habitual.",
        turnaround: "7 a 10 días hábiles",
        price: null,
      },
      {
        id: "expres",
        name: "Exprés",
        description: "El mismo análisis, con procesamiento prioritario en laboratorio.",
        turnaround: "3 a 5 días hábiles",
        price: null,
      },
      {
        id: "premium",
        name: "Premium VIP",
        description:
          "Procesamiento prioritario, toma de muestra a domicilio en el horario que elija y un coordinador dedicado a su caso.",
        turnaround: "3 a 5 días hábiles",
        price: null,
      },
    ],
    nextSteps: [
      CONFIRMATION_STEP,
      {
        title: "Confirmación de la edad gestacional",
        body: "Se requieren al menos 7 semanas de gestación cumplidas. Tenga a la mano un ultrasonido o la constancia de su médico.",
      },
      {
        title: "Toma de muestras",
        body: "Personal sanitario toma una muestra de sangre del brazo de la madre y un hisopado bucal del presunto padre. Ambos se identifican y firman su consentimiento.",
      },
      {
        title: "Análisis y resultado",
        body: "El laboratorio aísla el ADN fetal que circula en la sangre materna y lo compara con el del presunto padre. Podrá seguir el avance con su folio.",
      },
    ],
  },

  paternidad: {
    id: "paternidad",
    name: "Paternidad neonatal",
    shortName: "Paternidad neonatal",
    stage: "Primeros días de vida",
    summary:
      "Determinación del vínculo biológico desde los primeros días de vida, con cadena de custodia documentada para su uso ante autoridades.",
    details: [
      "Hisopado bucal indoloro, apto para recién nacidos",
      "Identificación oficial y consentimiento de cada participante",
      "Dictamen pericial firmado por perito en genética forense",
    ],
    sample: "Hisopado bucal",
    variants: [
      {
        id: SINGLE_VARIANT,
        name: "Con cadena de custodia",
        description: "Dictamen con validez pericial.",
        turnaround: "5 a 7 días hábiles",
        price: null,
      },
    ],
    nextSteps: [
      CONFIRMATION_STEP,
      {
        title: "Identificación y consentimiento",
        body: "El día de la toma, cada participante presenta identificación oficial. Para el menor se requiere acta o certificado de nacimiento y la firma de quien ejerce la patria potestad.",
      },
      {
        title: "Toma de muestra con cadena de custodia",
        body: "Personal sanitario toma las muestras, las sella con precinto numerado y firma el acta de custodia junto con los participantes.",
      },
      {
        title: "Análisis y dictamen pericial",
        body: "El laboratorio analiza los marcadores genéticos y emite un dictamen firmado. Podrá seguir el avance con su folio.",
      },
    ],
  },

  adulto: {
    id: "adulto",
    name: "Pruebas en vida adulta",
    shortName: "Prueba en vida adulta",
    stage: "Niños, jóvenes y adultos",
    summary:
      "Pruebas de paternidad y parentesco para cualquier edad, con fines informativos privados o con validez ante autoridades.",
    details: [
      "Hisopado bucal de cada participante",
      "Consentimiento de todos los participantes en ambas modalidades",
      "La prueba informativa puede repetirse después en su versión legal",
    ],
    sample: "Hisopado bucal",
    variants: [
      {
        id: "informativa",
        name: "Informativa (privada)",
        description:
          "Para conocer el resultado de forma personal. No tiene validez ante juzgados ni autoridades.",
        turnaround: "5 a 7 días hábiles",
        price: null,
      },
      {
        id: "legal",
        name: "Legal (con cadena de custodia)",
        description:
          "Identificación de los participantes, muestras selladas y dictamen pericial para presentarse ante un juzgado o autoridad.",
        turnaround: "5 a 7 días hábiles",
        price: null,
      },
    ],
    nextSteps: [
      CONFIRMATION_STEP,
      {
        title: "Consentimiento de los participantes",
        body: "Todos los participantes mayores de edad firman su consentimiento. Por un menor firma quien ejerce la patria potestad. En la prueba legal, además, cada uno presenta identificación oficial.",
      },
      {
        title: "Toma de muestra",
        body: "Personal sanitario toma el hisopado bucal. En la prueba legal las muestras se sellan con precinto numerado y se levanta el acta de custodia.",
      },
      {
        title: "Análisis y resultado",
        body: "Recibirá un informe de resultados (prueba informativa) o un dictamen pericial firmado (prueba legal). Podrá seguir el avance con su folio.",
      },
    ],
  },

  identidad: {
    id: "identidad",
    name: "Verificación de identidad neonatal",
    shortName: "Verificación de identidad hospitalaria",
    stage: "Tras el nacimiento",
    summary:
      "Confirmación genética de la correspondencia entre madre e hijo cuando existe duda razonable sobre un intercambio de recién nacidos en el hospital.",
    details: [
      "Comparación directa madre–recién nacido (y padre, si se desea)",
      "Atención prioritaria: toma de muestra en hospital o domicilio",
      "Informe utilizable ante el hospital y la autoridad competente",
    ],
    sample: "Hisopado bucal",
    variants: [
      {
        id: SINGLE_VARIANT,
        name: "Atención prioritaria",
        description: "Con cadena de custodia.",
        turnaround: "48 a 72 horas",
        price: null,
      },
    ],
    nextSteps: [
      {
        title: "Contacto prioritario",
        body: "Un coordinador le llamará en las próximas horas para acordar la toma de muestra, incluso dentro del hospital si aún no ha sido dada de alta.",
      },
      {
        title: "Documentación",
        body: "Tenga a la mano su identificación oficial, el certificado de nacimiento y, si lo conserva, el brazalete de identificación del recién nacido.",
      },
      {
        title: "Toma de muestra con cadena de custodia",
        body: "Se toman muestras de la madre y del recién nacido, selladas con precinto numerado y registradas en acta de custodia.",
      },
      {
        title: "Informe y orientación",
        body: "Recibirá el informe de correspondencia genética. Si el resultado lo amerita, le orientamos sobre los pasos ante el hospital y la autoridad.",
      },
    ],
  },
};

export const SERVICE_LIST = [
  SERVICES.prenatal,
  SERVICES.paternidad,
  SERVICES.adulto,
  SERVICES.identidad,
];

export const isServiceId = (v: unknown): v is ServiceId =>
  typeof v === "string" && Object.hasOwn(SERVICES, v);

export function findVariant(service: ServiceId, variantId: unknown) {
  return SERVICES[service].variants.find((v) => v.id === variantId) ?? null;
}

/** "Paternidad prenatal no invasiva · Exprés"; sin sufijo si no hay opciones. */
export function serviceLabel(service: ServiceId, variantId: string): string {
  const info = SERVICES[service];
  const variant = findVariant(service, variantId);
  return info.variants.length > 1 && variant
    ? `${info.shortName} · ${variant.name}`
    : info.shortName;
}

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export const formatPrice = (price: number | null) =>
  price === null ? "Precio por confirmar" : `${currency.format(price)} MXN`;

export const MODALITIES: Record<
  Modality,
  { id: Modality; name: string; description: string }
> = {
  domicilio: {
    id: "domicilio",
    name: "Toma de muestra a domicilio",
    description:
      "Personal sanitario acude a su domicilio u hospital, sin distintivos visibles.",
  },
  clinica: {
    id: "clinica",
    name: "Clínica asociada",
    description:
      "Acude con cita a una clínica de la red, en un consultorio privado.",
  },
};
