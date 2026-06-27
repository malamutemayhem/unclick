export type LaminatorType = "pouch_personal_basic" | "pouch_office_fast" | "cold_adhesive_press" | "roll_wide_format" | "thermal_id_card";

export function laminateQuality(t: LaminatorType): number {
  const m: Record<LaminatorType, number> = {
    pouch_personal_basic: 6, pouch_office_fast: 8, cold_adhesive_press: 7, roll_wide_format: 10, thermal_id_card: 9,
  };
  return m[t];
}

export function speed(t: LaminatorType): number {
  const m: Record<LaminatorType, number> = {
    pouch_personal_basic: 4, pouch_office_fast: 9, cold_adhesive_press: 6, roll_wide_format: 10, thermal_id_card: 7,
  };
  return m[t];
}

export function maxWidth(t: LaminatorType): number {
  const m: Record<LaminatorType, number> = {
    pouch_personal_basic: 5, pouch_office_fast: 7, cold_adhesive_press: 6, roll_wide_format: 10, thermal_id_card: 2,
  };
  return m[t];
}

export function compactSize(t: LaminatorType): number {
  const m: Record<LaminatorType, number> = {
    pouch_personal_basic: 10, pouch_office_fast: 6, cold_adhesive_press: 7, roll_wide_format: 2, thermal_id_card: 8,
  };
  return m[t];
}

export function laminatorCost(t: LaminatorType): number {
  const m: Record<LaminatorType, number> = {
    pouch_personal_basic: 2, pouch_office_fast: 5, cold_adhesive_press: 4, roll_wide_format: 9, thermal_id_card: 6,
  };
  return m[t];
}

export function noWarmUp(t: LaminatorType): boolean {
  const m: Record<LaminatorType, boolean> = {
    pouch_personal_basic: false, pouch_office_fast: false, cold_adhesive_press: true, roll_wide_format: false, thermal_id_card: false,
  };
  return m[t];
}

export function twoSided(t: LaminatorType): boolean {
  const m: Record<LaminatorType, boolean> = {
    pouch_personal_basic: true, pouch_office_fast: true, cold_adhesive_press: false, roll_wide_format: true, thermal_id_card: true,
  };
  return m[t];
}

export function feedMethod(t: LaminatorType): string {
  const m: Record<LaminatorType, string> = {
    pouch_personal_basic: "hot_roller_pouch_feed",
    pouch_office_fast: "dual_hot_roller_rapid",
    cold_adhesive_press: "pressure_adhesive_cold",
    roll_wide_format: "continuous_roll_hot_feed",
    thermal_id_card: "small_pouch_thermal_seal",
  };
  return m[t];
}

export function bestUse(t: LaminatorType): string {
  const m: Record<LaminatorType, string> = {
    pouch_personal_basic: "home_school_photo_craft",
    pouch_office_fast: "office_badge_sign_volume",
    cold_adhesive_press: "ink_jet_heat_sensitive",
    roll_wide_format: "poster_banner_wide_print",
    thermal_id_card: "id_badge_membership_card",
  };
  return m[t];
}

export function laminators(): LaminatorType[] {
  return ["pouch_personal_basic", "pouch_office_fast", "cold_adhesive_press", "roll_wide_format", "thermal_id_card"];
}
