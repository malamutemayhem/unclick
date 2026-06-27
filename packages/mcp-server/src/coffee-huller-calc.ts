export type CoffeeHullerType =
  | "disc_huller"
  | "engelberg_huller"
  | "friction_polisher"
  | "destoner_gravity"
  | "color_sorter";

interface CoffeeHullerData {
  hullEfficiency: number;
  beanBreakage: number;
  throughput: number;
  cleanOutput: number;
  chCost: number;
  multiStage: boolean;
  forDry: boolean;
  hullerConfig: string;
  bestUse: string;
}

const DATA: Record<CoffeeHullerType, CoffeeHullerData> = {
  disc_huller: {
    hullEfficiency: 8, beanBreakage: 7, throughput: 8, cleanOutput: 7, chCost: 5,
    multiStage: false, forDry: true,
    hullerConfig: "disc_huller_rotating_disc_abrasion_parchment_remove_green_bean",
    bestUse: "standard_dry_mill_disc_huller_parchment_removal_green_bean_prep",
  },
  engelberg_huller: {
    hullEfficiency: 7, beanBreakage: 5, throughput: 9, cleanOutput: 6, chCost: 4,
    multiStage: false, forDry: true,
    hullerConfig: "engelberg_huller_cylinder_bar_friction_hull_one_pass_simple_design",
    bestUse: "commodity_coffee_mill_engelberg_huller_simple_high_throughput_hull",
  },
  friction_polisher: {
    hullEfficiency: 9, beanBreakage: 8, throughput: 7, cleanOutput: 9, chCost: 7,
    multiStage: true, forDry: true,
    hullerConfig: "friction_polisher_gentle_rub_silver_skin_remove_smooth_green_bean",
    bestUse: "specialty_dry_mill_friction_polisher_silver_skin_smooth_appearance",
  },
  destoner_gravity: {
    hullEfficiency: 6, beanBreakage: 10, throughput: 8, cleanOutput: 10, chCost: 6,
    multiStage: true, forDry: true,
    hullerConfig: "destoner_gravity_table_vibrating_deck_stone_foreign_object_remove",
    bestUse: "dry_mill_destoner_gravity_table_stone_metal_foreign_object_remove",
  },
  color_sorter: {
    hullEfficiency: 5, beanBreakage: 10, throughput: 7, cleanOutput: 10, chCost: 10,
    multiStage: true, forDry: true,
    hullerConfig: "color_sorter_optical_camera_air_jet_defect_bean_reject_grade_sort",
    bestUse: "export_grade_coffee_mill_color_sorter_optical_defect_reject_grade",
  },
};

function get(t: CoffeeHullerType): CoffeeHullerData {
  return DATA[t];
}

export const hullEfficiency = (t: CoffeeHullerType) => get(t).hullEfficiency;
export const beanBreakage = (t: CoffeeHullerType) => get(t).beanBreakage;
export const throughput = (t: CoffeeHullerType) => get(t).throughput;
export const cleanOutput = (t: CoffeeHullerType) => get(t).cleanOutput;
export const chCost = (t: CoffeeHullerType) => get(t).chCost;
export const multiStage = (t: CoffeeHullerType) => get(t).multiStage;
export const forDry = (t: CoffeeHullerType) => get(t).forDry;
export const hullerConfig = (t: CoffeeHullerType) => get(t).hullerConfig;
export const bestUse = (t: CoffeeHullerType) => get(t).bestUse;
export const coffeeHullerTypes = (): CoffeeHullerType[] =>
  Object.keys(DATA) as CoffeeHullerType[];
