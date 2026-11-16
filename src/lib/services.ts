import type { Modality, ServiceId } from "./types";

export interface ServiceInfo {
  id: ServiceId;
  name: string;
  shortName: string;
  summary: string;
  details: string[];
  turnaround: string;
  sample: string;
  nextSteps: { title: string; body: string }[];
}

export const SERVICES: Record<ServiceId, ServiceInfo> = {
  paternidad: {
    id: "paternidad",
    name: "Prueba de paternidad neonatal",
    shortName: "Prueba de paternidad",
    summary:
      "Determinación del vínculo biológico desde los primeros días de vida, con cadena de custodia documentada para su uso ante autoridades.",
    details: [
      "Muestra bucal indolora, apta para recién nacidos",
      "Identificación oficial y consentimiento de cada participante",
      "Dictamen pericial firmado por perito en genética forense",
    ],
    turnaround: "5 a 7 días hábiles",
    sample: "Hisopado bucal",
    nextSteps: [
      {
        title: "Confirmación de la cita",
        body: "Un coordinador le contactará en un plazo máximo de 24 horas, por el medio que usted indicó, para confirmar fecha y hora.",
      },
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
        body: "El laboratorio analiza los marcadores genéticos y emite un dictamen firmado, que podrá consultar con su folio.",
      },
    ],
  },
  identidad: {
    id: "identidad",
    name: "Verificación de identidad neonatal",
    shortName: "Verificación de identidad hospitalaria",
    summary:
      "Confirmación genética de la correspondencia entre madre e hijo cuando existe duda razonable sobre un intercambio de recién nacidos en el hospital.",
    details: [
      "Comparación directa madre–recién nacido (y padre, si se desea)",
      "Atención prioritaria: toma de muestra en hospital o domicilio",
      "Informe utilizable ante el hospital y la autoridad competente",
    ],
    turnaround: "48 a 72 horas",
    sample: "Hisopado bucal",
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

export const SERVICE_LIST = [SERVICES.paternidad, SERVICES.identidad];

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
