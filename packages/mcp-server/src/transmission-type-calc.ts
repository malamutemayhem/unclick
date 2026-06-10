export type TransmissionType = "manual" | "automatic" | "cvt" | "dct" | "sequential";

export function driverEngagement(t: TransmissionType): number {
  const m: Record<TransmissionType, number> = {
    manual: 10, automatic: 3, cvt: 2, dct: 7, sequential: 9,
  };
  return m[t];
}

export function shiftSpeed(t: TransmissionType): number {
  const m: Record<TransmissionType, number> = {
    manual: 5, automatic: 7, cvt: 10, dct: 10, sequential: 9,
  };
  return m[t];
}

export function fuelEconomy(t: TransmissionType): number {
  const m: Record<TransmissionType, number> = {
    manual: 8, automatic: 6, cvt: 10, dct: 9, sequential: 5,
  };
  return m[t];
}

export function trafficComfort(t: TransmissionType): number {
  const m: Record<TransmissionType, number> = {
    manual: 2, automatic: 10, cvt: 9, dct: 6, sequential: 3,
  };
  return m[t];
}

export function maintenanceCost(t: TransmissionType): number {
  const m: Record<TransmissionType, number> = {
    manual: 3, automatic: 6, cvt: 7, dct: 8, sequential: 9,
  };
  return m[t];
}

export function requiresClutchPedal(t: TransmissionType): boolean {
  const m: Record<TransmissionType, boolean> = {
    manual: true, automatic: false, cvt: false, dct: false, sequential: false,
  };
  return m[t];
}

export function hasFixedGears(t: TransmissionType): boolean {
  const m: Record<TransmissionType, boolean> = {
    manual: true, automatic: true, cvt: false, dct: true, sequential: true,
  };
  return m[t];
}

export function bestVehicle(t: TransmissionType): string {
  const m: Record<TransmissionType, string> = {
    manual: "sports_car", automatic: "luxury_sedan", cvt: "hybrid",
    dct: "performance_hatch", sequential: "race_car",
  };
  return m[t];
}

export function gearCount(t: TransmissionType): number {
  const m: Record<TransmissionType, number> = {
    manual: 6, automatic: 8, cvt: 0, dct: 7, sequential: 6,
  };
  return m[t];
}

export function transmissionTypes(): TransmissionType[] {
  return ["manual", "automatic", "cvt", "dct", "sequential"];
}
