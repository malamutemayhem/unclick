export type SippyCupType = "soft_spout_trainer" | "straw_weighted_any_angle" | "360_rim_flow" | "open_cup_trainer_handles" | "insulated_sport_bottle";

export function spillProof(t: SippyCupType): number {
  const m: Record<SippyCupType, number> = {
    soft_spout_trainer: 9, straw_weighted_any_angle: 8, "360_rim_flow": 10, open_cup_trainer_handles: 2, insulated_sport_bottle: 7,
  };
  return m[t];
}

export function drinkingSkillBuild(t: SippyCupType): number {
  const m: Record<SippyCupType, number> = {
    soft_spout_trainer: 4, straw_weighted_any_angle: 6, "360_rim_flow": 8, open_cup_trainer_handles: 10, insulated_sport_bottle: 5,
  };
  return m[t];
}

export function cleanEase(t: SippyCupType): number {
  const m: Record<SippyCupType, number> = {
    soft_spout_trainer: 7, straw_weighted_any_angle: 4, "360_rim_flow": 6, open_cup_trainer_handles: 10, insulated_sport_bottle: 5,
  };
  return m[t];
}

export function durability(t: SippyCupType): number {
  const m: Record<SippyCupType, number> = {
    soft_spout_trainer: 7, straw_weighted_any_angle: 6, "360_rim_flow": 8, open_cup_trainer_handles: 5, insulated_sport_bottle: 9,
  };
  return m[t];
}

export function cupCost(t: SippyCupType): number {
  const m: Record<SippyCupType, number> = {
    soft_spout_trainer: 2, straw_weighted_any_angle: 4, "360_rim_flow": 5, open_cup_trainer_handles: 3, insulated_sport_bottle: 6,
  };
  return m[t];
}

export function dishwasherSafe(t: SippyCupType): boolean {
  const m: Record<SippyCupType, boolean> = {
    soft_spout_trainer: true, straw_weighted_any_angle: true, "360_rim_flow": true, open_cup_trainer_handles: true, insulated_sport_bottle: false,
  };
  return m[t];
}

export function hasHandles(t: SippyCupType): boolean {
  const m: Record<SippyCupType, boolean> = {
    soft_spout_trainer: true, straw_weighted_any_angle: false, "360_rim_flow": true, open_cup_trainer_handles: true, insulated_sport_bottle: false,
  };
  return m[t];
}

export function cupMaterial(t: SippyCupType): string {
  const m: Record<SippyCupType, string> = {
    soft_spout_trainer: "polypropylene_silicone_spout",
    straw_weighted_any_angle: "tritan_weighted_straw",
    "360_rim_flow": "pp_silicone_valve_rim",
    open_cup_trainer_handles: "bamboo_fiber_open_rim",
    insulated_sport_bottle: "stainless_double_wall",
  };
  return m[t];
}

export function bestAge(t: SippyCupType): string {
  const m: Record<SippyCupType, string> = {
    soft_spout_trainer: "four_to_nine_months",
    straw_weighted_any_angle: "nine_months_plus_active",
    "360_rim_flow": "twelve_months_transition",
    open_cup_trainer_handles: "eighteen_months_skill",
    insulated_sport_bottle: "toddler_three_plus_outdoor",
  };
  return m[t];
}

export function sippyCups(): SippyCupType[] {
  return ["soft_spout_trainer", "straw_weighted_any_angle", "360_rim_flow", "open_cup_trainer_handles", "insulated_sport_bottle"];
}
