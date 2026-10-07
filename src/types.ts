export type QuoteStatus = 'submitted' | 'under_review' | 'quoted' | 'archived';

export interface QuoteRequest {
  id?: string;
  clientName: string;
  companyTitle: string;
  designation?: string;
  email: string;
  phone: string;
  whatsapp?: string;
  cargoType: string;
  cargoDescription?: string;
  services: string[];
  origin?: string;
  destination?: string;
  weightPerUnit?: number;
  totalUnits?: number;
  metricType?: string;
  documentNames?: string[];
  status: QuoteStatus;
  createdAt: string;
  userId?: string;
}

export type RegistrationStatus = 'submitted' | 'verified' | 'approved' | 'rejected';

export interface VehicleItem {
  plateNumber: string;
  vehicleType: string; // e.g. Flatbed 40ft, Multi-axle Low-bed, Reefer, Tanker/Bowzer, Curtain Sider
  chassisNumber?: string;
  payloadCapacityTons: number;
  province?: string;
  year?: string;
}

export interface VehicleRegistration {
  id?: string;
  fullName: string;
  companyName: string;
  designation?: string;
  email: string;
  phone: string;
  whatsapp?: string;
  primaryCargoType: string;
  maxPayloadTons?: number;
  vehicles: VehicleItem[];
  status: RegistrationStatus;
  createdAt: string;
  userId?: string;
}

export interface ConsortiumCompany {
  id: string;
  name: string;
  brandTag: string;
  tagline: string;
  description: string;
  specialties: string[];
  operationalHubs: string[];
  keyHighlights: string[];
  accentColor: string;
  badge: string;
  fleetCount?: string;
  established?: string;
}

export interface TradeCorridor {
  id: string;
  name: string;
  code: string;
  category: 'Maritime' | 'Afghan Transit' | 'TIR Corridors' | 'Domestic Pakistan';
  origin: string;
  destination: string;
  transitTime: string;
  mode: string;
  operatingEntity: string;
  keyCheckpoints: string[];
  description: string;
}
