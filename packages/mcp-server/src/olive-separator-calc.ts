export type OliveSeparatorType =
  | "leaf_blower"
  | "vibrating_screen"
  | "destoner_float"
  | "washing_drum"
  | "defoliator";

interface OliveSeparatorData {
  cleaningEfficiency: number;
  throughput: number;
  fruitDamage: number;
  foreignRemoval: number;
  osCost: number;
  waterBased: boolean;
  forTable: boolean;
  separatorConfig: string;
  bestUse: string;
}

const DATA: Record<OliveSeparatorType, OliveSeparatorData> = {
  leaf_blower: {
    cleaningEfficiency: 7, throughput: 9, fruitDamage: 9, foreignRemoval: 6, osCost: 3,
    waterBased: false, forTable: true,
    separatorConfig: "leaf_blower_olive_separator_fan_air_blast_leaf_twig_remove_conveyor",
    bestUse: "olive_mill_intake_leaf_blower_first_stage_clean_remove_leaf_twig",
  },
  vibrating_screen: {
    cleaningEfficiency: 8, throughput: 10, fruitDamage: 8, foreignRemoval: 8, osCost: 4,
    waterBased: false, forTable: true,
    separatorConfig: "vibrating_screen_olive_size_grade_soil_stone_debris_remove_sort",
    bestUse: "olive_mill_vibrating_screen_size_grade_debris_remove_pre_wash",
  },
  destoner_float: {
    cleaningEfficiency: 9, throughput: 7, fruitDamage: 7, foreignRemoval: 10, osCost: 6,
    waterBased: true, forTable: true,
    separatorConfig: "destoner_float_olive_water_tank_stone_metal_sink_olive_float_clean",
    bestUse: "quality_olive_mill_destoner_float_tank_stone_metal_foreign_remove",
  },
  washing_drum: {
    cleaningEfficiency: 10, throughput: 8, fruitDamage: 7, foreignRemoval: 9, osCost: 5,
    waterBased: true, forTable: false,
    separatorConfig: "washing_drum_olive_rotating_cylinder_water_spray_scrub_soil_clean",
    bestUse: "olive_mill_washing_drum_final_clean_soil_spray_residue_remove",
  },
  defoliator: {
    cleaningEfficiency: 6, throughput: 10, fruitDamage: 10, foreignRemoval: 5, osCost: 3,
    waterBased: false, forTable: true,
    separatorConfig: "defoliator_olive_counter_rotating_roller_strip_leaf_stem_gentle",
    bestUse: "harvest_intake_defoliator_gentle_roller_strip_leaf_stem_olive_clean",
  },
};

function get(t: OliveSeparatorType): OliveSeparatorData {
  return DATA[t];
}

export const cleaningEfficiency = (t: OliveSeparatorType) => get(t).cleaningEfficiency;
export const throughput = (t: OliveSeparatorType) => get(t).throughput;
export const fruitDamage = (t: OliveSeparatorType) => get(t).fruitDamage;
export const foreignRemoval = (t: OliveSeparatorType) => get(t).foreignRemoval;
export const osCost = (t: OliveSeparatorType) => get(t).osCost;
export const waterBased = (t: OliveSeparatorType) => get(t).waterBased;
export const forTable = (t: OliveSeparatorType) => get(t).forTable;
export const separatorConfig = (t: OliveSeparatorType) => get(t).separatorConfig;
export const bestUse = (t: OliveSeparatorType) => get(t).bestUse;
export const oliveSeparatorTypes = (): OliveSeparatorType[] =>
  Object.keys(DATA) as OliveSeparatorType[];
