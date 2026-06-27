export type FlashingTypeType =
  | "step_flashing_metal_shingle"
  | "counter_flashing_reglet_embed"
  | "valley_flashing_w_profile"
  | "drip_edge_fascia_gutter"
  | "through_wall_membrane_weep";

interface FlashingTypeData {
  waterproof: number;
  durability: number;
  installEase: number;
  aesthetic: number;
  ftCost: number;
  selfAdhesive: boolean;
  forRoof: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<FlashingTypeType, FlashingTypeData> = {
  step_flashing_metal_shingle: {
    waterproof: 8, durability: 8, installEase: 6, aesthetic: 7, ftCost: 5,
    selfAdhesive: false, forRoof: true,
    material: "galvanized_steel_l_shaped_step",
    bestUse: "roof_wall_junction_shingle_course",
  },
  counter_flashing_reglet_embed: {
    waterproof: 9, durability: 9, installEase: 4, aesthetic: 8, ftCost: 7,
    selfAdhesive: false, forRoof: true,
    material: "sheet_metal_reglet_masonry_slot",
    bestUse: "parapet_chimney_masonry_roof_seal",
  },
  valley_flashing_w_profile: {
    waterproof: 9, durability: 7, installEase: 7, aesthetic: 6, ftCost: 4,
    selfAdhesive: false, forRoof: true,
    material: "aluminum_copper_w_valley_pan",
    bestUse: "roof_valley_intersection_water_path",
  },
  drip_edge_fascia_gutter: {
    waterproof: 7, durability: 8, installEase: 9, aesthetic: 7, ftCost: 3,
    selfAdhesive: false, forRoof: true,
    material: "galvanized_steel_bent_edge_strip",
    bestUse: "eave_rake_edge_water_divert_gutter",
  },
  through_wall_membrane_weep: {
    waterproof: 10, durability: 9, installEase: 3, aesthetic: 4, ftCost: 8,
    selfAdhesive: true, forRoof: false,
    material: "rubberized_asphalt_membrane_sheet",
    bestUse: "cavity_wall_lintel_weep_hole_drain",
  },
};

function get(t: FlashingTypeType): FlashingTypeData {
  return DATA[t];
}

export const waterproof = (t: FlashingTypeType) => get(t).waterproof;
export const durability = (t: FlashingTypeType) => get(t).durability;
export const installEase = (t: FlashingTypeType) => get(t).installEase;
export const aesthetic = (t: FlashingTypeType) => get(t).aesthetic;
export const ftCost = (t: FlashingTypeType) => get(t).ftCost;
export const selfAdhesive = (t: FlashingTypeType) => get(t).selfAdhesive;
export const forRoof = (t: FlashingTypeType) => get(t).forRoof;
export const material = (t: FlashingTypeType) => get(t).material;
export const bestUse = (t: FlashingTypeType) => get(t).bestUse;
export const flashingTypeTypes = (): FlashingTypeType[] =>
  Object.keys(DATA) as FlashingTypeType[];
