export type ExhaustHoodType =
  | "type_i_grease_rated"
  | "type_ii_heat_vapor"
  | "compensating_makeup_air"
  | "backshelf_low_proximity"
  | "island_canopy_center";

interface ExhaustHoodData {
  capture: number;
  grease: number;
  noise: number;
  efficiency: number;
  ehCost: number;
  fireSuppress: boolean;
  forCooking: boolean;
  ventilation: string;
  bestUse: string;
}

const DATA: Record<ExhaustHoodType, ExhaustHoodData> = {
  type_i_grease_rated: {
    capture: 8, grease: 10, noise: 5, efficiency: 7, ehCost: 7,
    fireSuppress: true, forCooking: true,
    ventilation: "ul_listed_baffle_filter_grease",
    bestUse: "commercial_kitchen_fryer_grill",
  },
  type_ii_heat_vapor: {
    capture: 6, grease: 2, noise: 7, efficiency: 6, ehCost: 4,
    fireSuppress: false, forCooking: false,
    ventilation: "mesh_filter_condensate_heat",
    bestUse: "dishwasher_steam_table_oven",
  },
  compensating_makeup_air: {
    capture: 9, grease: 9, noise: 6, efficiency: 9, ehCost: 9,
    fireSuppress: true, forCooking: true,
    ventilation: "integrated_makeup_air_plenum",
    bestUse: "large_kitchen_hvac_balanced",
  },
  backshelf_low_proximity: {
    capture: 7, grease: 8, noise: 8, efficiency: 8, ehCost: 6,
    fireSuppress: true, forCooking: true,
    ventilation: "low_proximity_backshelf_slot",
    bestUse: "counter_service_visible_cooking",
  },
  island_canopy_center: {
    capture: 9, grease: 9, noise: 4, efficiency: 6, ehCost: 10,
    fireSuppress: true, forCooking: true,
    ventilation: "four_sided_canopy_island_mount",
    bestUse: "open_kitchen_display_cooking",
  },
};

function get(t: ExhaustHoodType): ExhaustHoodData {
  return DATA[t];
}

export const capture = (t: ExhaustHoodType) => get(t).capture;
export const grease = (t: ExhaustHoodType) => get(t).grease;
export const noise = (t: ExhaustHoodType) => get(t).noise;
export const efficiency = (t: ExhaustHoodType) => get(t).efficiency;
export const ehCost = (t: ExhaustHoodType) => get(t).ehCost;
export const fireSuppress = (t: ExhaustHoodType) => get(t).fireSuppress;
export const forCooking = (t: ExhaustHoodType) => get(t).forCooking;
export const ventilation = (t: ExhaustHoodType) => get(t).ventilation;
export const bestUse = (t: ExhaustHoodType) => get(t).bestUse;
export const exhaustHoodTypes = (): ExhaustHoodType[] =>
  Object.keys(DATA) as ExhaustHoodType[];
