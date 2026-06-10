export type PressurePotType = "paint_pot_convert" | "purpose_built_resin" | "vacuum_chamber_degas" | "combo_pressure_vacuum" | "mini_pot_jewelry";

export function bubbleRemoval(t: PressurePotType): number {
  const m: Record<PressurePotType, number> = {
    paint_pot_convert: 8, purpose_built_resin: 10, vacuum_chamber_degas: 9, combo_pressure_vacuum: 10, mini_pot_jewelry: 7,
  };
  return m[t];
}

export function capacity(t: PressurePotType): number {
  const m: Record<PressurePotType, number> = {
    paint_pot_convert: 8, purpose_built_resin: 9, vacuum_chamber_degas: 7, combo_pressure_vacuum: 8, mini_pot_jewelry: 4,
  };
  return m[t];
}

export function pressureRating(t: PressurePotType): number {
  const m: Record<PressurePotType, number> = {
    paint_pot_convert: 7, purpose_built_resin: 10, vacuum_chamber_degas: 3, combo_pressure_vacuum: 9, mini_pot_jewelry: 6,
  };
  return m[t];
}

export function easeOfUse(t: PressurePotType): number {
  const m: Record<PressurePotType, number> = {
    paint_pot_convert: 6, purpose_built_resin: 9, vacuum_chamber_degas: 7, combo_pressure_vacuum: 8, mini_pot_jewelry: 10,
  };
  return m[t];
}

export function potCost(t: PressurePotType): number {
  const m: Record<PressurePotType, number> = {
    paint_pot_convert: 1, purpose_built_resin: 3, vacuum_chamber_degas: 2, combo_pressure_vacuum: 4, mini_pot_jewelry: 2,
  };
  return m[t];
}

export function usesPressure(t: PressurePotType): boolean {
  const m: Record<PressurePotType, boolean> = {
    paint_pot_convert: true, purpose_built_resin: true, vacuum_chamber_degas: false, combo_pressure_vacuum: true, mini_pot_jewelry: true,
  };
  return m[t];
}

export function usesVacuum(t: PressurePotType): boolean {
  const m: Record<PressurePotType, boolean> = {
    paint_pot_convert: false, purpose_built_resin: false, vacuum_chamber_degas: true, combo_pressure_vacuum: true, mini_pot_jewelry: false,
  };
  return m[t];
}

export function vesselType(t: PressurePotType): string {
  const m: Record<PressurePotType, string> = {
    paint_pot_convert: "converted_paint_tank",
    purpose_built_resin: "resin_specific_vessel",
    vacuum_chamber_degas: "acrylic_vacuum_lid",
    combo_pressure_vacuum: "dual_function_chamber",
    mini_pot_jewelry: "small_desktop_pot",
  };
  return m[t];
}

export function bestCast(t: PressurePotType): string {
  const m: Record<PressurePotType, string> = {
    paint_pot_convert: "dice_set_clear",
    purpose_built_resin: "production_run_batch",
    vacuum_chamber_degas: "silicone_mold_degas",
    combo_pressure_vacuum: "large_clear_casting",
    mini_pot_jewelry: "ring_pendant_small",
  };
  return m[t];
}

export function pressurePots(): PressurePotType[] {
  return ["paint_pot_convert", "purpose_built_resin", "vacuum_chamber_degas", "combo_pressure_vacuum", "mini_pot_jewelry"];
}
