export type BlowMolderType =
  | "extrusion_blow"
  | "injection_blow"
  | "stretch_blow_pet"
  | "continuous_extrusion"
  | "accumulator_head";

interface BlowMolderData {
  productionSpeed: number;
  wallUniformity: number;
  clarityFinish: number;
  sizeRange: number;
  bmCost: number;
  biaxial: boolean;
  forPET: boolean;
  molderConfig: string;
  bestUse: string;
}

const DATA: Record<BlowMolderType, BlowMolderData> = {
  extrusion_blow: {
    productionSpeed: 8, wallUniformity: 7, clarityFinish: 6, sizeRange: 9, bmCost: 5,
    biaxial: false, forPET: false,
    molderConfig: "continuous_parison_extrude_mold_close_blow_air_inflate_eject",
    bestUse: "hdpe_bottle_container_drum_industrial_packaging_general_blow",
  },
  injection_blow: {
    productionSpeed: 7, wallUniformity: 10, clarityFinish: 9, sizeRange: 5, bmCost: 7,
    biaxial: false, forPET: false,
    molderConfig: "injection_mold_preform_transfer_blow_station_precise_neck_wall",
    bestUse: "pharmaceutical_cosmetic_small_bottle_precise_neck_finish_wall",
  },
  stretch_blow_pet: {
    productionSpeed: 10, wallUniformity: 9, clarityFinish: 10, sizeRange: 7, bmCost: 9,
    biaxial: true, forPET: true,
    molderConfig: "preform_reheat_stretch_rod_blow_biaxial_orient_pet_crystal",
    bestUse: "pet_water_beverage_bottle_high_clarity_lightweight_biaxial",
  },
  continuous_extrusion: {
    productionSpeed: 9, wallUniformity: 6, clarityFinish: 5, sizeRange: 10, bmCost: 6,
    biaxial: false, forPET: false,
    molderConfig: "continuous_wheel_parison_multi_cavity_high_speed_small_bottle",
    bestUse: "high_volume_small_hdpe_bottle_dairy_juice_continuous_wheel_run",
  },
  accumulator_head: {
    productionSpeed: 5, wallUniformity: 7, clarityFinish: 5, sizeRange: 10, bmCost: 8,
    biaxial: false, forPET: false,
    molderConfig: "accumulator_head_large_parison_shot_weight_big_part_blow_mold",
    bestUse: "large_tank_drum_automotive_duct_fuel_tank_accumulator_shot",
  },
};

function get(t: BlowMolderType): BlowMolderData {
  return DATA[t];
}

export const productionSpeed = (t: BlowMolderType) => get(t).productionSpeed;
export const wallUniformity = (t: BlowMolderType) => get(t).wallUniformity;
export const clarityFinish = (t: BlowMolderType) => get(t).clarityFinish;
export const sizeRange = (t: BlowMolderType) => get(t).sizeRange;
export const bmCost = (t: BlowMolderType) => get(t).bmCost;
export const biaxial = (t: BlowMolderType) => get(t).biaxial;
export const forPET = (t: BlowMolderType) => get(t).forPET;
export const molderConfig = (t: BlowMolderType) => get(t).molderConfig;
export const bestUse = (t: BlowMolderType) => get(t).bestUse;
export const blowMolderTypes = (): BlowMolderType[] =>
  Object.keys(DATA) as BlowMolderType[];
