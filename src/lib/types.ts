export type ServiceId = "prenatal" | "paternidad" | "adulto" | "identidad";
export type Modality = "domicilio" | "clinica";

export interface ContactData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  preferredDate: string;
  notes: string;
  /** Aceptación del aviso de privacidad y del tratamiento de datos sensibles. */
  consent: boolean;
  /** Declaración de estar legitimado para solicitar la prueba. */
  legitimacy: boolean;
}

export interface ServiceRequest {
  folio: string;
  service: ServiceId;
  variant: string;
  modality: Modality;
  contact: ContactData;
  createdAt: string;
}

export type StageState = "done" | "current" | "pending";

export interface TrackingStage {
  id: string;
  title: string;
  description: string;
}

export interface TrackingRecord {
  folio: string;
  service: ServiceId;
  variant: string;
  modality: Modality;
  /** Índice de la etapa actual dentro de TRACKING_STAGES */
  currentStage: number;
  /** Fechas ISO por etapa completada o en curso */
  stageDates: string[];
  estimatedDelivery?: string;
}
