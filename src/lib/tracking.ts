import type { TrackingStage } from "./types";

export const TRACKING_STAGES: TrackingStage[] = [
  {
    id: "registrada",
    title: "Solicitud registrada",
    description: "Recibimos su solicitud. Un coordinador confirmará la cita.",
  },
  {
    id: "toma",
    title: "Toma de muestra realizada",
    description: "Muestras selladas con precinto y acta de custodia firmada.",
  },
  {
    id: "recibida",
    title: "Muestra recibida en laboratorio",
    description: "El laboratorio verificó la integridad de los precintos.",
  },
  {
    id: "analisis",
    title: "En proceso de análisis genético",
    description: "Extracción de ADN y comparación de marcadores genéticos.",
  },
  {
    id: "dictamen",
    title: "Dictamen pericial listo",
    description: "El dictamen firmado está disponible para su entrega.",
  },
];
