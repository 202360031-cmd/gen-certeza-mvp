import type { ServiceRequest, TrackingRecord, TrackingStage } from "./types";

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

/**
 * Folios de demostración. En producción esta información viene de la API del
 * laboratorio, protegida con un segundo factor (ver README).
 */
const DEMO_RECORDS: Record<string, TrackingRecord> = {
  "GC-88392": {
    folio: "GC-88392",
    service: "paternidad",
    modality: "domicilio",
    currentStage: 3,
    stageDates: [
      "2026-11-09T10:12:00",
      "2026-11-11T09:30:00",
      "2026-11-12T08:05:00",
      "2026-11-13T11:40:00",
    ],
    estimatedDelivery: "2026-11-19",
  },
  "GC-10457": {
    folio: "GC-10457",
    service: "identidad",
    modality: "clinica",
    currentStage: 2,
    stageDates: [
      "2026-11-14T16:20:00",
      "2026-11-15T09:00:00",
      "2026-11-16T07:45:00",
    ],
    estimatedDelivery: "2026-11-18",
  },
  "GC-77120": {
    folio: "GC-77120",
    service: "paternidad",
    modality: "clinica",
    currentStage: 4,
    stageDates: [
      "2026-11-02T12:00:00",
      "2026-11-04T10:15:00",
      "2026-11-05T08:30:00",
      "2026-11-06T09:10:00",
      "2026-11-12T13:25:00",
    ],
  },
};

export const DEMO_FOLIOS = Object.keys(DEMO_RECORDS);

export function findDemoRecord(folio: string): TrackingRecord | null {
  return DEMO_RECORDS[folio] ?? null;
}

/** Una solicitud recién creada siempre está en la primera etapa. */
export function recordFromRequest(request: ServiceRequest): TrackingRecord {
  return {
    folio: request.folio,
    service: request.service,
    modality: request.modality,
    currentStage: 0,
    stageDates: [request.createdAt],
  };
}
