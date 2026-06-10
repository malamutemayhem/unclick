export type MilkFrother = "steam_wand" | "automatic_jug" | "handheld_whisk" | "french_press_manual" | "induction_pitcher";

export function foamQuality(m2: MilkFrother): number {
  const m: Record<MilkFrother, number> = {
    steam_wand: 10, automatic_jug: 7, handheld_whisk: 4, french_press_manual: 5, induction_pitcher: 8,
  };
  return m[m2];
}

export function temperatureControl(m2: MilkFrother): number {
  const m: Record<MilkFrother, number> = {
    steam_wand: 9, automatic_jug: 8, handheld_whisk: 1, french_press_manual: 1, induction_pitcher: 10,
  };
  return m[m2];
}

export function skillRequired(m2: MilkFrother): number {
  const m: Record<MilkFrother, number> = {
    steam_wand: 9, automatic_jug: 2, handheld_whisk: 3, french_press_manual: 4, induction_pitcher: 2,
  };
  return m[m2];
}

export function cleanupEase(m2: MilkFrother): number {
  const m: Record<MilkFrother, number> = {
    steam_wand: 4, automatic_jug: 6, handheld_whisk: 10, french_press_manual: 5, induction_pitcher: 7,
  };
  return m[m2];
}

export function frotherCost(m2: MilkFrother): number {
  const m: Record<MilkFrother, number> = {
    steam_wand: 0, automatic_jug: 5, handheld_whisk: 1, french_press_manual: 2, induction_pitcher: 7,
  };
  return m[m2];
}

export function standalone(m2: MilkFrother): boolean {
  const m: Record<MilkFrother, boolean> = {
    steam_wand: false, automatic_jug: true, handheld_whisk: true, french_press_manual: true, induction_pitcher: true,
  };
  return m[m2];
}

export function heatsMillk(m2: MilkFrother): boolean {
  const m: Record<MilkFrother, boolean> = {
    steam_wand: true, automatic_jug: true, handheld_whisk: false, french_press_manual: false, induction_pitcher: true,
  };
  return m[m2];
}

export function mechanism(m2: MilkFrother): string {
  const m: Record<MilkFrother, string> = {
    steam_wand: "pressurized_steam_injection", automatic_jug: "spinning_disc_heat_coil",
    handheld_whisk: "battery_motor_spring_whisk", french_press_manual: "mesh_plunger_pump_action",
    induction_pitcher: "magnetic_whisk_induction_heat",
  };
  return m[m2];
}

export function bestDrink(m2: MilkFrother): string {
  const m: Record<MilkFrother, string> = {
    steam_wand: "latte_art_cappuccino_pro", automatic_jug: "daily_latte_hot_chocolate",
    handheld_whisk: "quick_foam_matcha_whip", french_press_manual: "cold_foam_iced_coffee",
    induction_pitcher: "precise_temp_flat_white",
  };
  return m[m2];
}

export function milkFrothers(): MilkFrother[] {
  return ["steam_wand", "automatic_jug", "handheld_whisk", "french_press_manual", "induction_pitcher"];
}
