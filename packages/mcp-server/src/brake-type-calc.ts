export type BrakeType = "disc" | "drum" | "ceramic" | "carbon_ceramic" | "regenerative";

export function stoppingPower(b: BrakeType): number {
  const m: Record<BrakeType, number> = {
    disc: 7, drum: 5, ceramic: 9, carbon_ceramic: 10, regenerative: 4,
  };
  return m[b];
}

export function heatResistance(b: BrakeType): number {
  const m: Record<BrakeType, number> = {
    disc: 6, drum: 4, ceramic: 9, carbon_ceramic: 10, regenerative: 8,
  };
  return m[b];
}

export function wetPerformance(b: BrakeType): number {
  const m: Record<BrakeType, number> = {
    disc: 8, drum: 4, ceramic: 9, carbon_ceramic: 9, regenerative: 7,
  };
  return m[b];
}

export function weightKg(b: BrakeType): number {
  const m: Record<BrakeType, number> = {
    disc: 8, drum: 10, ceramic: 5, carbon_ceramic: 3, regenerative: 6,
  };
  return m[b];
}

export function lifespanKm(b: BrakeType): number {
  const m: Record<BrakeType, number> = {
    disc: 60000, drum: 50000, ceramic: 80000, carbon_ceramic: 120000, regenerative: 200000,
  };
  return m[b];
}

export function selfEnergizing(b: BrakeType): boolean {
  const m: Record<BrakeType, boolean> = {
    disc: false, drum: true, ceramic: false, carbon_ceramic: false, regenerative: false,
  };
  return m[b];
}

export function recoversEnergy(b: BrakeType): boolean {
  const m: Record<BrakeType, boolean> = {
    disc: false, drum: false, ceramic: false, carbon_ceramic: false, regenerative: true,
  };
  return m[b];
}

export function bestVehicle(b: BrakeType): string {
  const m: Record<BrakeType, string> = {
    disc: "passenger_car", drum: "economy_rear", ceramic: "performance_sedan",
    carbon_ceramic: "supercar", regenerative: "electric_vehicle",
  };
  return m[b];
}

export function costMultiplier(b: BrakeType): number {
  const m: Record<BrakeType, number> = {
    disc: 1.0, drum: 0.6, ceramic: 3.0, carbon_ceramic: 8.0, regenerative: 2.0,
  };
  return m[b];
}

export function brakeTypes(): BrakeType[] {
  return ["disc", "drum", "ceramic", "carbon_ceramic", "regenerative"];
}
