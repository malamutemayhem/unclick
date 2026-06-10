export type PropulsionType = "turbofan" | "turboprop" | "turbojet" | "ramjet" | "electric";

export function thrustKn(p: PropulsionType): number {
  const m: Record<PropulsionType, number> = {
    turbofan: 300, turboprop: 50, turbojet: 150, ramjet: 200, electric: 10,
  };
  return m[p];
}

export function fuelEfficiency(p: PropulsionType): number {
  const m: Record<PropulsionType, number> = {
    turbofan: 8, turboprop: 10, turbojet: 4, ramjet: 3, electric: 9,
  };
  return m[p];
}

export function noiseLevel(p: PropulsionType): number {
  const m: Record<PropulsionType, number> = {
    turbofan: 6, turboprop: 7, turbojet: 9, ramjet: 10, electric: 1,
  };
  return m[p];
}

export function maxMachNumber(p: PropulsionType): number {
  const m: Record<PropulsionType, number> = {
    turbofan: 0.9, turboprop: 0.6, turbojet: 2.0, ramjet: 6.0, electric: 0.4,
  };
  return m[p];
}

export function reliabilityScore(p: PropulsionType): number {
  const m: Record<PropulsionType, number> = {
    turbofan: 10, turboprop: 9, turbojet: 7, ramjet: 4, electric: 8,
  };
  return m[p];
}

export function requiresIntake(p: PropulsionType): boolean {
  const m: Record<PropulsionType, boolean> = {
    turbofan: true, turboprop: true, turbojet: true, ramjet: true, electric: false,
  };
  return m[p];
}

export function zeroCarbonEmission(p: PropulsionType): boolean {
  const m: Record<PropulsionType, boolean> = {
    turbofan: false, turboprop: false, turbojet: false, ramjet: false, electric: true,
  };
  return m[p];
}

export function bestAircraft(p: PropulsionType): string {
  const m: Record<PropulsionType, string> = {
    turbofan: "airliner", turboprop: "regional",
    turbojet: "military_fighter", ramjet: "missile", electric: "urban_air_taxi",
  };
  return m[p];
}

export function maintenanceIntervalHours(p: PropulsionType): number {
  const m: Record<PropulsionType, number> = {
    turbofan: 5000, turboprop: 3000, turbojet: 2000, ramjet: 500, electric: 10000,
  };
  return m[p];
}

export function propulsionTypes(): PropulsionType[] {
  return ["turbofan", "turboprop", "turbojet", "ramjet", "electric"];
}
