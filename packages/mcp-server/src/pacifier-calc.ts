export type PacifierType = "orthodontic_silicone" | "natural_rubber_round" | "one_piece_hospital" | "glow_dark_night" | "fruit_feeder_mesh";

export function soothingPower(t: PacifierType): number {
  const m: Record<PacifierType, number> = {
    orthodontic_silicone: 9, natural_rubber_round: 8, one_piece_hospital: 7, glow_dark_night: 8, fruit_feeder_mesh: 6,
  };
  return m[t];
}

export function dentalSafety(t: PacifierType): number {
  const m: Record<PacifierType, number> = {
    orthodontic_silicone: 10, natural_rubber_round: 7, one_piece_hospital: 8, glow_dark_night: 9, fruit_feeder_mesh: 6,
  };
  return m[t];
}

export function durability(t: PacifierType): number {
  const m: Record<PacifierType, number> = {
    orthodontic_silicone: 8, natural_rubber_round: 5, one_piece_hospital: 9, glow_dark_night: 7, fruit_feeder_mesh: 6,
  };
  return m[t];
}

export function cleanEase(t: PacifierType): number {
  const m: Record<PacifierType, number> = {
    orthodontic_silicone: 9, natural_rubber_round: 7, one_piece_hospital: 10, glow_dark_night: 8, fruit_feeder_mesh: 5,
  };
  return m[t];
}

export function pacifierCost(t: PacifierType): number {
  const m: Record<PacifierType, number> = {
    orthodontic_silicone: 5, natural_rubber_round: 6, one_piece_hospital: 3, glow_dark_night: 7, fruit_feeder_mesh: 8,
  };
  return m[t];
}

export function bpaFree(t: PacifierType): boolean {
  const m: Record<PacifierType, boolean> = {
    orthodontic_silicone: true, natural_rubber_round: true, one_piece_hospital: true, glow_dark_night: true, fruit_feeder_mesh: true,
  };
  return m[t];
}

export function dishwasherSafe(t: PacifierType): boolean {
  const m: Record<PacifierType, boolean> = {
    orthodontic_silicone: true, natural_rubber_round: false, one_piece_hospital: true, glow_dark_night: true, fruit_feeder_mesh: false,
  };
  return m[t];
}

export function nippleMaterial(t: PacifierType): string {
  const m: Record<PacifierType, string> = {
    orthodontic_silicone: "medical_grade_silicone_flat",
    natural_rubber_round: "natural_latex_cherry_round",
    one_piece_hospital: "molded_silicone_seamless",
    glow_dark_night: "phosphorescent_silicone_shell",
    fruit_feeder_mesh: "food_grade_silicone_mesh",
  };
  return m[t];
}

export function bestAge(t: PacifierType): string {
  const m: Record<PacifierType, string> = {
    orthodontic_silicone: "newborn_to_six_months",
    natural_rubber_round: "breastfed_baby_transition",
    one_piece_hospital: "preemie_nicu_first_days",
    glow_dark_night: "nighttime_sleep_find_easy",
    fruit_feeder_mesh: "teething_six_months_plus",
  };
  return m[t];
}

export function pacifiers(): PacifierType[] {
  return ["orthodontic_silicone", "natural_rubber_round", "one_piece_hospital", "glow_dark_night", "fruit_feeder_mesh"];
}
