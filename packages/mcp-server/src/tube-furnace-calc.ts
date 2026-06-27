export type TubeFurnaceType =
  | "single_zone_tube"
  | "multi_zone_tube"
  | "rotary_tube"
  | "vertical_tube"
  | "split_hinge_tube";

interface TubeFurnaceData {
  maxTemp: number;
  throughput: number;
  uniformity: number;
  gasControl: number;
  tfCost: number;
  multiZone: boolean;
  forCvd: boolean;
  furnaceConfig: string;
  bestUse: string;
}

const DATA: Record<TubeFurnaceType, TubeFurnaceData> = {
  single_zone_tube: {
    maxTemp: 7, throughput: 6, uniformity: 7, gasControl: 7, tfCost: 4,
    multiZone: false, forCvd: false,
    furnaceConfig: "single_zone_tube_furnace_one_heating_element_uniform_hot_zone",
    bestUse: "lab_anneal_single_zone_tube_furnace_simple_controlled_atmosphere",
  },
  multi_zone_tube: {
    maxTemp: 8, throughput: 7, uniformity: 10, gasControl: 9, tfCost: 7,
    multiZone: true, forCvd: true,
    furnaceConfig: "multi_zone_tube_furnace_three_zone_gradient_profile_long_hot",
    bestUse: "cvd_growth_multi_zone_tube_furnace_temperature_gradient_profile",
  },
  rotary_tube: {
    maxTemp: 8, throughput: 9, uniformity: 8, gasControl: 8, tfCost: 8,
    multiZone: false, forCvd: false,
    furnaceConfig: "rotary_tube_furnace_rotating_tube_powder_calcine_continuous",
    bestUse: "powder_calcine_rotary_tube_furnace_continuous_tumble_uniform",
  },
  vertical_tube: {
    maxTemp: 9, throughput: 5, uniformity: 8, gasControl: 9, tfCost: 6,
    multiZone: false, forCvd: true,
    furnaceConfig: "vertical_tube_furnace_gravity_drop_fiber_draw_crystal_grow",
    bestUse: "fiber_draw_vertical_tube_furnace_gravity_assist_crystal_grow",
  },
  split_hinge_tube: {
    maxTemp: 7, throughput: 8, uniformity: 7, gasControl: 7, tfCost: 5,
    multiZone: false, forCvd: false,
    furnaceConfig: "split_hinge_tube_furnace_clamshell_open_fast_load_access",
    bestUse: "quick_load_split_hinge_tube_furnace_clamshell_rapid_access",
  },
};

function get(t: TubeFurnaceType): TubeFurnaceData {
  return DATA[t];
}

export const maxTemp = (t: TubeFurnaceType) => get(t).maxTemp;
export const throughput = (t: TubeFurnaceType) => get(t).throughput;
export const uniformity = (t: TubeFurnaceType) => get(t).uniformity;
export const gasControl = (t: TubeFurnaceType) => get(t).gasControl;
export const tfCost = (t: TubeFurnaceType) => get(t).tfCost;
export const multiZone = (t: TubeFurnaceType) => get(t).multiZone;
export const forCvd = (t: TubeFurnaceType) => get(t).forCvd;
export const furnaceConfig = (t: TubeFurnaceType) => get(t).furnaceConfig;
export const bestUse = (t: TubeFurnaceType) => get(t).bestUse;
export const tubeFurnaceTypes = (): TubeFurnaceType[] =>
  Object.keys(DATA) as TubeFurnaceType[];
