export type WaxMeltPotType = "double_boiler_stove" | "electric_presto_pot" | "wax_melter_pitcher" | "slow_cooker_large" | "induction_plate_precise";

export function meltSpeed(t: WaxMeltPotType): number {
  const m: Record<WaxMeltPotType, number> = {
    double_boiler_stove: 6, electric_presto_pot: 9, wax_melter_pitcher: 8, slow_cooker_large: 4, induction_plate_precise: 10,
  };
  return m[t];
}

export function tempControl(t: WaxMeltPotType): number {
  const m: Record<WaxMeltPotType, number> = {
    double_boiler_stove: 7, electric_presto_pot: 8, wax_melter_pitcher: 6, slow_cooker_large: 5, induction_plate_precise: 10,
  };
  return m[t];
}

export function capacity(t: WaxMeltPotType): number {
  const m: Record<WaxMeltPotType, number> = {
    double_boiler_stove: 6, electric_presto_pot: 8, wax_melter_pitcher: 5, slow_cooker_large: 10, induction_plate_precise: 7,
  };
  return m[t];
}

export function pourEase(t: WaxMeltPotType): number {
  const m: Record<WaxMeltPotType, number> = {
    double_boiler_stove: 5, electric_presto_pot: 7, wax_melter_pitcher: 10, slow_cooker_large: 4, induction_plate_precise: 6,
  };
  return m[t];
}

export function potCost(t: WaxMeltPotType): number {
  const m: Record<WaxMeltPotType, number> = {
    double_boiler_stove: 1, electric_presto_pot: 2, wax_melter_pitcher: 2, slow_cooker_large: 1, induction_plate_precise: 3,
  };
  return m[t];
}

export function hasSpigot(t: WaxMeltPotType): boolean {
  const m: Record<WaxMeltPotType, boolean> = {
    double_boiler_stove: false, electric_presto_pot: true, wax_melter_pitcher: false, slow_cooker_large: false, induction_plate_precise: false,
  };
  return m[t];
}

export function dedicatedUnit(t: WaxMeltPotType): boolean {
  const m: Record<WaxMeltPotType, boolean> = {
    double_boiler_stove: false, electric_presto_pot: true, wax_melter_pitcher: true, slow_cooker_large: false, induction_plate_precise: false,
  };
  return m[t];
}

export function heatSource(t: WaxMeltPotType): string {
  const m: Record<WaxMeltPotType, string> = {
    double_boiler_stove: "water_bath_stovetop",
    electric_presto_pot: "electric_element_base",
    wax_melter_pitcher: "electric_wrap_around",
    slow_cooker_large: "low_heat_ceramic",
    induction_plate_precise: "magnetic_induction_coil",
  };
  return m[t];
}

export function bestScale(t: WaxMeltPotType): string {
  const m: Record<WaxMeltPotType, string> = {
    double_boiler_stove: "small_batch_hobby",
    electric_presto_pot: "medium_production_run",
    wax_melter_pitcher: "single_candle_pour",
    slow_cooker_large: "large_batch_bulk",
    induction_plate_precise: "precision_temp_soy",
  };
  return m[t];
}

export function waxMeltPots(): WaxMeltPotType[] {
  return ["double_boiler_stove", "electric_presto_pot", "wax_melter_pitcher", "slow_cooker_large", "induction_plate_precise"];
}
