export type DryerType = "vented_electric" | "vented_gas" | "heat_pump" | "condenser" | "ventless_combo";

export function dryingSpeed(d: DryerType): number {
  const m: Record<DryerType, number> = {
    vented_electric: 7, vented_gas: 9, heat_pump: 4, condenser: 5, ventless_combo: 3,
  };
  return m[d];
}

export function energyEfficiency(d: DryerType): number {
  const m: Record<DryerType, number> = {
    vented_electric: 4, vented_gas: 5, heat_pump: 10, condenser: 7, ventless_combo: 8,
  };
  return m[d];
}

export function operatingCost(d: DryerType): number {
  const m: Record<DryerType, number> = {
    vented_electric: 7, vented_gas: 5, heat_pump: 3, condenser: 6, ventless_combo: 4,
  };
  return m[d];
}

export function purchasePrice(d: DryerType): number {
  const m: Record<DryerType, number> = {
    vented_electric: 3, vented_gas: 5, heat_pump: 10, condenser: 7, ventless_combo: 8,
  };
  return m[d];
}

export function fabricCare(d: DryerType): number {
  const m: Record<DryerType, number> = {
    vented_electric: 5, vented_gas: 6, heat_pump: 10, condenser: 8, ventless_combo: 7,
  };
  return m[d];
}

export function requiresVentDuct(d: DryerType): boolean {
  const m: Record<DryerType, boolean> = {
    vented_electric: true, vented_gas: true, heat_pump: false, condenser: false, ventless_combo: false,
  };
  return m[d];
}

export function requiresGasLine(d: DryerType): boolean {
  const m: Record<DryerType, boolean> = {
    vented_electric: false, vented_gas: true, heat_pump: false, condenser: false, ventless_combo: false,
  };
  return m[d];
}

export function heatSource(d: DryerType): string {
  const m: Record<DryerType, string> = {
    vented_electric: "resistance_coil_element", vented_gas: "natural_gas_burner",
    heat_pump: "refrigerant_cycle_low_temp", condenser: "electric_condenser_loop",
    ventless_combo: "condensation_no_exhaust",
  };
  return m[d];
}

export function bestInstallation(d: DryerType): string {
  const m: Record<DryerType, string> = {
    vented_electric: "standard_laundry_room", vented_gas: "high_volume_household",
    heat_pump: "energy_star_premium", condenser: "apartment_no_vent_access",
    ventless_combo: "closet_install_small_unit",
  };
  return m[d];
}

export function dryerTypes(): DryerType[] {
  return ["vented_electric", "vented_gas", "heat_pump", "condenser", "ventless_combo"];
}
