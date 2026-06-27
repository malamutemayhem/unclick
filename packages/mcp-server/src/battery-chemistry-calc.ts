export type BatteryChemistry = "lithium_ion" | "lead_acid" | "nickel_metal_hydride" | "solid_state" | "sodium_ion";

export function energyDensityWhKg(b: BatteryChemistry): number {
  const m: Record<BatteryChemistry, number> = {
    lithium_ion: 250, lead_acid: 40, nickel_metal_hydride: 80, solid_state: 400, sodium_ion: 150,
  };
  return m[b];
}

export function cycleLife(b: BatteryChemistry): number {
  const m: Record<BatteryChemistry, number> = {
    lithium_ion: 1500, lead_acid: 500, nickel_metal_hydride: 800, solid_state: 5000, sodium_ion: 2000,
  };
  return m[b];
}

export function chargingSpeed(b: BatteryChemistry): number {
  const m: Record<BatteryChemistry, number> = {
    lithium_ion: 8, lead_acid: 3, nickel_metal_hydride: 5, solid_state: 10, sodium_ion: 7,
  };
  return m[b];
}

export function safetyRating(b: BatteryChemistry): number {
  const m: Record<BatteryChemistry, number> = {
    lithium_ion: 6, lead_acid: 5, nickel_metal_hydride: 8, solid_state: 10, sodium_ion: 9,
  };
  return m[b];
}

export function costPerKwh(b: BatteryChemistry): number {
  const m: Record<BatteryChemistry, number> = {
    lithium_ion: 5, lead_acid: 2, nickel_metal_hydride: 6, solid_state: 10, sodium_ion: 3,
  };
  return m[b];
}

export function flammable(b: BatteryChemistry): boolean {
  const m: Record<BatteryChemistry, boolean> = {
    lithium_ion: true, lead_acid: false, nickel_metal_hydride: false, solid_state: false, sodium_ion: false,
  };
  return m[b];
}

export function recyclable(b: BatteryChemistry): boolean {
  const m: Record<BatteryChemistry, boolean> = {
    lithium_ion: true, lead_acid: true, nickel_metal_hydride: true, solid_state: true, sodium_ion: true,
  };
  return m[b];
}

export function primaryApplication(b: BatteryChemistry): string {
  const m: Record<BatteryChemistry, string> = {
    lithium_ion: "electric_vehicles", lead_acid: "car_starter",
    nickel_metal_hydride: "hybrid_vehicles", solid_state: "next_gen_ev",
    sodium_ion: "grid_storage",
  };
  return m[b];
}

export function keyElement(b: BatteryChemistry): string {
  const m: Record<BatteryChemistry, string> = {
    lithium_ion: "lithium", lead_acid: "lead",
    nickel_metal_hydride: "nickel", solid_state: "lithium",
    sodium_ion: "sodium",
  };
  return m[b];
}

export function batteryChemistries(): BatteryChemistry[] {
  return ["lithium_ion", "lead_acid", "nickel_metal_hydride", "solid_state", "sodium_ion"];
}
