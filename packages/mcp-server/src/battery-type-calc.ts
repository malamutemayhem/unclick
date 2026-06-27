export type BatteryType = "lithium_ion" | "lead_acid" | "nickel_metal" | "solid_state" | "flow";

export function energyDensityWhPerKg(bat: BatteryType): number {
  const m: Record<BatteryType, number> = {
    lithium_ion: 250, lead_acid: 40, nickel_metal: 80, solid_state: 400, flow: 25,
  };
  return m[bat];
}

export function cycleLife(bat: BatteryType): number {
  const m: Record<BatteryType, number> = {
    lithium_ion: 2000, lead_acid: 500, nickel_metal: 1000, solid_state: 5000, flow: 10000,
  };
  return m[bat];
}

export function chargingSpeed(bat: BatteryType): number {
  const m: Record<BatteryType, number> = {
    lithium_ion: 8, lead_acid: 3, nickel_metal: 5, solid_state: 10, flow: 6,
  };
  return m[bat];
}

export function safetyRating(bat: BatteryType): number {
  const m: Record<BatteryType, number> = {
    lithium_ion: 6, lead_acid: 7, nickel_metal: 8, solid_state: 10, flow: 9,
  };
  return m[bat];
}

export function costPerKwh(bat: BatteryType): number {
  const m: Record<BatteryType, number> = {
    lithium_ion: 150, lead_acid: 100, nickel_metal: 300, solid_state: 500, flow: 250,
  };
  return m[bat];
}

export function recyclable(bat: BatteryType): boolean {
  const m: Record<BatteryType, boolean> = {
    lithium_ion: true, lead_acid: true, nickel_metal: true, solid_state: true, flow: true,
  };
  return m[bat];
}

export function liquidElectrolyte(bat: BatteryType): boolean {
  const m: Record<BatteryType, boolean> = {
    lithium_ion: true, lead_acid: true, nickel_metal: true, solid_state: false, flow: true,
  };
  return m[bat];
}

export function bestApplication(bat: BatteryType): string {
  const m: Record<BatteryType, string> = {
    lithium_ion: "electric_vehicle", lead_acid: "backup_power", nickel_metal: "hybrid_vehicle",
    solid_state: "next_gen_ev", flow: "grid_storage",
  };
  return m[bat];
}

export function selfDischargePerMonth(bat: BatteryType): number {
  const m: Record<BatteryType, number> = {
    lithium_ion: 2, lead_acid: 5, nickel_metal: 20, solid_state: 1, flow: 0,
  };
  return m[bat];
}

export function batteryTypes(): BatteryType[] {
  return ["lithium_ion", "lead_acid", "nickel_metal", "solid_state", "flow"];
}
