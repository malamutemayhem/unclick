export type MashType = "single_infusion" | "step_mash" | "decoction_single" | "decoction_double" | "cereal_mash";

export function restCount(type: MashType): number {
  const r: Record<MashType, number> = {
    single_infusion: 1, step_mash: 3, decoction_single: 2,
    decoction_double: 3, cereal_mash: 2,
  };
  return r[type];
}

export function totalTimeMinutes(type: MashType): number {
  const t: Record<MashType, number> = {
    single_infusion: 60, step_mash: 90, decoction_single: 120,
    decoction_double: 180, cereal_mash: 150,
  };
  return t[type];
}

export function saccharificationTempCelsius(type: MashType): number {
  const t: Record<MashType, number> = {
    single_infusion: 67, step_mash: 66, decoction_single: 65,
    decoction_double: 64, cereal_mash: 67,
  };
  return t[type];
}

export function efficiencyPercent(type: MashType): number {
  const e: Record<MashType, number> = {
    single_infusion: 72, step_mash: 78, decoction_single: 82,
    decoction_double: 88, cereal_mash: 75,
  };
  return e[type];
}

export function bodyCharacter(type: MashType): string {
  const b: Record<MashType, string> = {
    single_infusion: "medium", step_mash: "light_to_medium",
    decoction_single: "full", decoction_double: "very_full",
    cereal_mash: "medium_full",
  };
  return b[type];
}

export function directHeatRequired(type: MashType): boolean {
  return type === "decoction_single" || type === "decoction_double" || type === "cereal_mash";
}

export function skillLevel(type: MashType): number {
  const s: Record<MashType, number> = {
    single_infusion: 2, step_mash: 4, decoction_single: 6,
    decoction_double: 9, cereal_mash: 7,
  };
  return s[type];
}

export function bestForStyle(type: MashType): string {
  const s: Record<MashType, string> = {
    single_infusion: "ale", step_mash: "wheat_beer",
    decoction_single: "lager", decoction_double: "bock",
    cereal_mash: "american_adjunct",
  };
  return s[type];
}

export function energyCostRating(type: MashType): number {
  const e: Record<MashType, number> = {
    single_infusion: 2, step_mash: 4, decoction_single: 7,
    decoction_double: 9, cereal_mash: 6,
  };
  return e[type];
}

export function mashTypes(): MashType[] {
  return ["single_infusion", "step_mash", "decoction_single", "decoction_double", "cereal_mash"];
}
