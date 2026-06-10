export type BrakeSystem = "disc" | "drum" | "carbon_ceramic" | "regenerative" | "air_brake";

export function stoppingPower(b: BrakeSystem): number {
  const m: Record<BrakeSystem, number> = {
    disc: 8, drum: 5, carbon_ceramic: 10, regenerative: 4, air_brake: 7,
  };
  return m[b];
}

export function heatDissipation(b: BrakeSystem): number {
  const m: Record<BrakeSystem, number> = {
    disc: 8, drum: 3, carbon_ceramic: 10, regenerative: 9, air_brake: 6,
  };
  return m[b];
}

export function costScore(b: BrakeSystem): number {
  const m: Record<BrakeSystem, number> = {
    disc: 5, drum: 2, carbon_ceramic: 10, regenerative: 7, air_brake: 6,
  };
  return m[b];
}

export function maintenanceFrequency(b: BrakeSystem): number {
  const m: Record<BrakeSystem, number> = {
    disc: 5, drum: 4, carbon_ceramic: 2, regenerative: 1, air_brake: 6,
  };
  return m[b];
}

export function fadingResistance(b: BrakeSystem): number {
  const m: Record<BrakeSystem, number> = {
    disc: 7, drum: 3, carbon_ceramic: 10, regenerative: 8, air_brake: 6,
  };
  return m[b];
}

export function recoversEnergy(b: BrakeSystem): boolean {
  const m: Record<BrakeSystem, boolean> = {
    disc: false, drum: false, carbon_ceramic: false, regenerative: true, air_brake: false,
  };
  return m[b];
}

export function selfAdjusting(b: BrakeSystem): boolean {
  const m: Record<BrakeSystem, boolean> = {
    disc: false, drum: true, carbon_ceramic: false, regenerative: true, air_brake: true,
  };
  return m[b];
}

export function typicalVehicle(b: BrakeSystem): string {
  const m: Record<BrakeSystem, string> = {
    disc: "passenger_car", drum: "economy_rear_axle",
    carbon_ceramic: "supercar_race_car", regenerative: "hybrid_ev",
    air_brake: "heavy_truck_bus",
  };
  return m[b];
}

export function activationMechanism(b: BrakeSystem): string {
  const m: Record<BrakeSystem, string> = {
    disc: "hydraulic_caliper", drum: "hydraulic_wheel_cylinder",
    carbon_ceramic: "hydraulic_caliper", regenerative: "motor_generator",
    air_brake: "compressed_air",
  };
  return m[b];
}

export function brakeSystems(): BrakeSystem[] {
  return ["disc", "drum", "carbon_ceramic", "regenerative", "air_brake"];
}
