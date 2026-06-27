export type TemperingUnitType =
  | "continuous_temper"
  | "batch_temper"
  | "seed_temper"
  | "scraped_surface"
  | "multi_zone_temper";

interface TemperingUnitData {
  tempControl: number;
  throughput: number;
  crystalQuality: number;
  repeatability: number;
  tuCost: number;
  automated: boolean;
  forChocolate: boolean;
  temperConfig: string;
  bestUse: string;
}

const DATA: Record<TemperingUnitType, TemperingUnitData> = {
  continuous_temper: {
    tempControl: 9, throughput: 10, crystalQuality: 9, repeatability: 9, tuCost: 8,
    automated: true, forChocolate: true,
    temperConfig: "continuous_temper_unit_multi_stage_cool_heat_crystal_form_inline",
    bestUse: "chocolate_line_continuous_temper_unit_inline_multi_stage_crystal",
  },
  batch_temper: {
    tempControl: 7, throughput: 5, crystalQuality: 7, repeatability: 6, tuCost: 4,
    automated: false, forChocolate: true,
    temperConfig: "batch_temper_unit_kettle_jacket_heat_cool_manual_seed_artisan",
    bestUse: "artisan_chocolate_batch_temper_unit_small_lot_hand_craft_quality",
  },
  seed_temper: {
    tempControl: 8, throughput: 7, crystalQuality: 10, repeatability: 8, tuCost: 7,
    automated: true, forChocolate: true,
    temperConfig: "seed_temper_unit_inject_cocoa_butter_seed_crystal_nucleate_fast",
    bestUse: "premium_chocolate_seed_temper_unit_perfect_crystal_gloss_snap",
  },
  scraped_surface: {
    tempControl: 8, throughput: 9, crystalQuality: 7, repeatability: 8, tuCost: 6,
    automated: true, forChocolate: false,
    temperConfig: "scraped_surface_temper_unit_rotating_blade_wall_scrape_cool_fat",
    bestUse: "margarine_scraped_surface_temper_unit_fat_crystal_texture_spread",
  },
  multi_zone_temper: {
    tempControl: 10, throughput: 9, crystalQuality: 10, repeatability: 10, tuCost: 10,
    automated: true, forChocolate: true,
    temperConfig: "multi_zone_temper_unit_independent_zone_precise_profile_recipe",
    bestUse: "industrial_chocolate_multi_zone_temper_unit_recipe_profile_precise",
  },
};

function get(t: TemperingUnitType): TemperingUnitData {
  return DATA[t];
}

export const tempControl = (t: TemperingUnitType) => get(t).tempControl;
export const throughput = (t: TemperingUnitType) => get(t).throughput;
export const crystalQuality = (t: TemperingUnitType) => get(t).crystalQuality;
export const repeatability = (t: TemperingUnitType) => get(t).repeatability;
export const tuCost = (t: TemperingUnitType) => get(t).tuCost;
export const automated = (t: TemperingUnitType) => get(t).automated;
export const forChocolate = (t: TemperingUnitType) => get(t).forChocolate;
export const temperConfig = (t: TemperingUnitType) => get(t).temperConfig;
export const bestUse = (t: TemperingUnitType) => get(t).bestUse;
export const temperingUnitTypes = (): TemperingUnitType[] =>
  Object.keys(DATA) as TemperingUnitType[];
