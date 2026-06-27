export type BowlCutterType =
  | "standard_cutter"
  | "vacuum_cutter"
  | "high_speed"
  | "cooking_cutter"
  | "mini_tabletop";

interface BowlCutterData {
  emulsionQuality: number;
  throughput: number;
  temperatureControl: number;
  particleFineness: number;
  bcCost: number;
  vacuum_capable: boolean;
  forFrankfurt: boolean;
  cutterConfig: string;
  bestUse: string;
}

const DATA: Record<BowlCutterType, BowlCutterData> = {
  standard_cutter: {
    emulsionQuality: 7, throughput: 7, temperatureControl: 6, particleFineness: 7, bcCost: 5,
    vacuum_capable: false, forFrankfurt: true,
    cutterConfig: "standard_bowl_cutter_rotating_bowl_knife_set_chop_mix_emulsify",
    bestUse: "sausage_production_standard_bowl_cutter_chop_mix_emulsify_meat",
  },
  vacuum_cutter: {
    emulsionQuality: 10, throughput: 8, temperatureControl: 8, particleFineness: 9, bcCost: 9,
    vacuum_capable: true, forFrankfurt: true,
    cutterConfig: "vacuum_bowl_cutter_sealed_lid_deaerate_emulsify_fine_texture",
    bestUse: "premium_frankfurter_vacuum_bowl_cutter_no_air_fine_emulsion",
  },
  high_speed: {
    emulsionQuality: 9, throughput: 10, temperatureControl: 7, particleFineness: 10, bcCost: 8,
    vacuum_capable: false, forFrankfurt: true,
    cutterConfig: "high_speed_bowl_cutter_fast_knife_rpm_ultra_fine_particle_cut",
    bestUse: "industrial_sausage_high_speed_cutter_ultra_fine_emulsion_fast",
  },
  cooking_cutter: {
    emulsionQuality: 8, throughput: 7, temperatureControl: 10, particleFineness: 8, bcCost: 10,
    vacuum_capable: true, forFrankfurt: false,
    cutterConfig: "cooking_bowl_cutter_steam_jacket_cook_emulsify_single_machine",
    bestUse: "processed_cheese_cooking_cutter_emulsify_cook_blend_one_step",
  },
  mini_tabletop: {
    emulsionQuality: 6, throughput: 3, temperatureControl: 5, particleFineness: 6, bcCost: 3,
    vacuum_capable: false, forFrankfurt: true,
    cutterConfig: "mini_tabletop_bowl_cutter_small_batch_lab_trial_recipe_develop",
    bestUse: "butcher_shop_mini_bowl_cutter_small_batch_recipe_development",
  },
};

function get(t: BowlCutterType): BowlCutterData {
  return DATA[t];
}

export const emulsionQuality = (t: BowlCutterType) => get(t).emulsionQuality;
export const throughput = (t: BowlCutterType) => get(t).throughput;
export const temperatureControl = (t: BowlCutterType) => get(t).temperatureControl;
export const particleFineness = (t: BowlCutterType) => get(t).particleFineness;
export const bcCost = (t: BowlCutterType) => get(t).bcCost;
export const vacuum_capable = (t: BowlCutterType) => get(t).vacuum_capable;
export const forFrankfurt = (t: BowlCutterType) => get(t).forFrankfurt;
export const cutterConfig = (t: BowlCutterType) => get(t).cutterConfig;
export const bestUse = (t: BowlCutterType) => get(t).bestUse;
export const bowlCutterTypes = (): BowlCutterType[] =>
  Object.keys(DATA) as BowlCutterType[];
