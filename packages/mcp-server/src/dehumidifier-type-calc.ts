export type DehumidifierType = "compressor" | "desiccant" | "peltier" | "ventilating" | "whole_house";

export function moistureRemoval(d: DehumidifierType): number {
  const m: Record<DehumidifierType, number> = {
    compressor: 9, desiccant: 8, peltier: 4, ventilating: 5, whole_house: 10,
  };
  return m[d];
}

export function energyUse(d: DehumidifierType): number {
  const m: Record<DehumidifierType, number> = {
    compressor: 6, desiccant: 8, peltier: 4, ventilating: 3, whole_house: 7,
  };
  return m[d];
}

export function coldPerformance(d: DehumidifierType): number {
  const m: Record<DehumidifierType, number> = {
    compressor: 3, desiccant: 10, peltier: 5, ventilating: 6, whole_house: 4,
  };
  return m[d];
}

export function noiseOutput(d: DehumidifierType): number {
  const m: Record<DehumidifierType, number> = {
    compressor: 7, desiccant: 5, peltier: 2, ventilating: 4, whole_house: 6,
  };
  return m[d];
}

export function purchasePrice(d: DehumidifierType): number {
  const m: Record<DehumidifierType, number> = {
    compressor: 5, desiccant: 7, peltier: 3, ventilating: 6, whole_house: 10,
  };
  return m[d];
}

export function portable(d: DehumidifierType): boolean {
  const m: Record<DehumidifierType, boolean> = {
    compressor: true, desiccant: true, peltier: true, ventilating: false, whole_house: false,
  };
  return m[d];
}

export function requiresDrain(d: DehumidifierType): boolean {
  const m: Record<DehumidifierType, boolean> = {
    compressor: true, desiccant: false, peltier: true, ventilating: false, whole_house: true,
  };
  return m[d];
}

export function operatingPrinciple(d: DehumidifierType): string {
  const m: Record<DehumidifierType, string> = {
    compressor: "refrigerant_condensation", desiccant: "silica_gel_absorption",
    peltier: "thermoelectric_cooling", ventilating: "air_exchange_exhaust",
    whole_house: "integrated_hvac_coil",
  };
  return m[d];
}

export function idealSpace(d: DehumidifierType): string {
  const m: Record<DehumidifierType, string> = {
    compressor: "basement_large_room", desiccant: "cold_garage_boat",
    peltier: "closet_small_room", ventilating: "bathroom_laundry",
    whole_house: "entire_residence",
  };
  return m[d];
}

export function dehumidifierTypes(): DehumidifierType[] {
  return ["compressor", "desiccant", "peltier", "ventilating", "whole_house"];
}
