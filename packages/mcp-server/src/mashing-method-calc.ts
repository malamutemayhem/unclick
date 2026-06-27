export type MashingMethod = "single_infusion" | "step_mash" | "decoction" | "cereal_mash" | "no_sparge";

export function complexityScore(m_: MashingMethod): number {
  const m: Record<MashingMethod, number> = {
    single_infusion: 2, step_mash: 5, decoction: 9, cereal_mash: 7, no_sparge: 3,
  };
  return m[m_];
}

export function timeMinutes(m_: MashingMethod): number {
  const m: Record<MashingMethod, number> = {
    single_infusion: 60, step_mash: 90, decoction: 180, cereal_mash: 120, no_sparge: 45,
  };
  return m[m_];
}

export function extractionEfficiency(m_: MashingMethod): number {
  const m: Record<MashingMethod, number> = {
    single_infusion: 7, step_mash: 8, decoction: 9, cereal_mash: 6, no_sparge: 5,
  };
  return m[m_];
}

export function melanoidinProduction(m_: MashingMethod): number {
  const m: Record<MashingMethod, number> = {
    single_infusion: 3, step_mash: 5, decoction: 10, cereal_mash: 6, no_sparge: 2,
  };
  return m[m_];
}

export function waterUsage(m_: MashingMethod): number {
  const m: Record<MashingMethod, number> = {
    single_infusion: 6, step_mash: 7, decoction: 9, cereal_mash: 8, no_sparge: 3,
  };
  return m[m_];
}

export function requiresDirectHeat(m_: MashingMethod): boolean {
  const m: Record<MashingMethod, boolean> = {
    single_infusion: false, step_mash: true, decoction: true, cereal_mash: true, no_sparge: false,
  };
  return m[m_];
}

export function beginnerFriendly(m_: MashingMethod): boolean {
  const m: Record<MashingMethod, boolean> = {
    single_infusion: true, step_mash: false, decoction: false, cereal_mash: false, no_sparge: true,
  };
  return m[m_];
}

export function bestStyleMatch(m_: MashingMethod): string {
  const m: Record<MashingMethod, string> = {
    single_infusion: "english_ales", step_mash: "german_wheat",
    decoction: "czech_pilsner", cereal_mash: "american_adjunct_lager",
    no_sparge: "partigyle_small_beer",
  };
  return m[m_];
}

export function equipmentNeeded(m_: MashingMethod): string {
  const m: Record<MashingMethod, string> = {
    single_infusion: "insulated_tun", step_mash: "heated_vessel",
    decoction: "kettle_and_tun", cereal_mash: "separate_cereal_pot",
    no_sparge: "basic_tun",
  };
  return m[m_];
}

export function mashingMethods(): MashingMethod[] {
  return ["single_infusion", "step_mash", "decoction", "cereal_mash", "no_sparge"];
}
