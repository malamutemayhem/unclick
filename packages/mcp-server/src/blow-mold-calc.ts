export type BlowMoldType =
  | "extrusion_blow_continuous"
  | "injection_blow_preform"
  | "stretch_blow_pet"
  | "accumulator_head_large"
  | "coextrusion_multi_layer";

interface BlowMoldData {
  precision: number;
  speed: number;
  sizeRange: number;
  wallControl: number;
  bmCost: number;
  multiLayer: boolean;
  forPet: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<BlowMoldType, BlowMoldData> = {
  extrusion_blow_continuous: {
    precision: 7, speed: 9, sizeRange: 8, wallControl: 7, bmCost: 5,
    multiLayer: false, forPet: false,
    material: "hdpe_pp_parison_continuous",
    bestUse: "detergent_bottle_drum_container",
  },
  injection_blow_preform: {
    precision: 9, speed: 7, sizeRange: 5, wallControl: 9, bmCost: 8,
    multiLayer: false, forPet: false,
    material: "preform_injection_core_pin",
    bestUse: "pharma_bottle_cosmetic_small",
  },
  stretch_blow_pet: {
    precision: 9, speed: 10, sizeRange: 6, wallControl: 9, bmCost: 9,
    multiLayer: false, forPet: true,
    material: "pet_preform_biaxial_stretch",
    bestUse: "water_soda_pet_bottle_clear",
  },
  accumulator_head_large: {
    precision: 6, speed: 4, sizeRange: 10, wallControl: 6, bmCost: 7,
    multiLayer: false, forPet: false,
    material: "hdpe_accumulator_large_parison",
    bestUse: "ibc_tank_kayak_automotive_duct",
  },
  coextrusion_multi_layer: {
    precision: 8, speed: 7, sizeRange: 7, wallControl: 8, bmCost: 10,
    multiLayer: true, forPet: false,
    material: "multi_layer_barrier_evoh_nylon",
    bestUse: "fuel_tank_food_barrier_bottle",
  },
};

function get(t: BlowMoldType): BlowMoldData {
  return DATA[t];
}

export const precision = (t: BlowMoldType) => get(t).precision;
export const speed = (t: BlowMoldType) => get(t).speed;
export const sizeRange = (t: BlowMoldType) => get(t).sizeRange;
export const wallControl = (t: BlowMoldType) => get(t).wallControl;
export const bmCost = (t: BlowMoldType) => get(t).bmCost;
export const multiLayer = (t: BlowMoldType) => get(t).multiLayer;
export const forPet = (t: BlowMoldType) => get(t).forPet;
export const material = (t: BlowMoldType) => get(t).material;
export const bestUse = (t: BlowMoldType) => get(t).bestUse;
export const blowMoldTypes = (): BlowMoldType[] =>
  Object.keys(DATA) as BlowMoldType[];
