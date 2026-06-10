export type VacuumSealerType = "countertop_channel" | "handheld_cordless" | "chamber_commercial" | "foodsaver_roll_cut" | "sous_vide_combo";

export function sealStrength(t: VacuumSealerType): number {
  const m: Record<VacuumSealerType, number> = {
    countertop_channel: 8, handheld_cordless: 5, chamber_commercial: 10, foodsaver_roll_cut: 7, sous_vide_combo: 8,
  };
  return m[t];
}

export function suctionPower(t: VacuumSealerType): number {
  const m: Record<VacuumSealerType, number> = {
    countertop_channel: 7, handheld_cordless: 4, chamber_commercial: 10, foodsaver_roll_cut: 7, sous_vide_combo: 8,
  };
  return m[t];
}

export function portability(t: VacuumSealerType): number {
  const m: Record<VacuumSealerType, number> = {
    countertop_channel: 5, handheld_cordless: 10, chamber_commercial: 2, foodsaver_roll_cut: 6, sous_vide_combo: 4,
  };
  return m[t];
}

export function easeOfUse(t: VacuumSealerType): number {
  const m: Record<VacuumSealerType, number> = {
    countertop_channel: 8, handheld_cordless: 9, chamber_commercial: 5, foodsaver_roll_cut: 7, sous_vide_combo: 6,
  };
  return m[t];
}

export function sealerCost(t: VacuumSealerType): number {
  const m: Record<VacuumSealerType, number> = {
    countertop_channel: 5, handheld_cordless: 4, chamber_commercial: 10, foodsaver_roll_cut: 6, sous_vide_combo: 8,
  };
  return m[t];
}

export function sealsLiquid(t: VacuumSealerType): boolean {
  const m: Record<VacuumSealerType, boolean> = {
    countertop_channel: false, handheld_cordless: false, chamber_commercial: true, foodsaver_roll_cut: false, sous_vide_combo: true,
  };
  return m[t];
}

export function builtInCutter(t: VacuumSealerType): boolean {
  const m: Record<VacuumSealerType, boolean> = {
    countertop_channel: false, handheld_cordless: false, chamber_commercial: false, foodsaver_roll_cut: true, sous_vide_combo: false,
  };
  return m[t];
}

export function sealMethod(t: VacuumSealerType): string {
  const m: Record<VacuumSealerType, string> = {
    countertop_channel: "external_suction_heat_bar",
    handheld_cordless: "pump_valve_zipper_bag",
    chamber_commercial: "chamber_vacuum_impulse_seal",
    foodsaver_roll_cut: "roll_feed_auto_detect_seal",
    sous_vide_combo: "dual_pump_immersion_ready",
  };
  return m[t];
}

export function bestUse(t: VacuumSealerType): string {
  const m: Record<VacuumSealerType, string> = {
    countertop_channel: "home_freezer_meal_prep",
    handheld_cordless: "snack_bag_quick_reseal",
    chamber_commercial: "bulk_process_restaurant",
    foodsaver_roll_cut: "custom_size_bag_family",
    sous_vide_combo: "precision_cooking_marinade",
  };
  return m[t];
}

export function vacuumSealers(): VacuumSealerType[] {
  return ["countertop_channel", "handheld_cordless", "chamber_commercial", "foodsaver_roll_cut", "sous_vide_combo"];
}
