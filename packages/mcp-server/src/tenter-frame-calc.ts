export type TenterFrameType =
  | "pin_chain"
  | "clip_chain"
  | "combination_pin_clip"
  | "biaxial_stretching"
  | "relaxation_dryer";

interface TenterFrameData {
  fabricSpeed: number;
  widthControl: number;
  temperatureRange: number;
  fabricDamage: number;
  tfCost: number;
  heated: boolean;
  forKnit: boolean;
  holdingMethod: string;
  bestUse: string;
}

const DATA: Record<TenterFrameType, TenterFrameData> = {
  pin_chain: {
    fabricSpeed: 8, widthControl: 8, temperatureRange: 9, fabricDamage: 6, tfCost: 6,
    heated: true, forKnit: true,
    holdingMethod: "sharp_pin_penetrate_selvage_edge_chain_conveyor_transport",
    bestUse: "knit_fabric_open_width_heat_set_dimensional_stability",
  },
  clip_chain: {
    fabricSpeed: 9, widthControl: 9, temperatureRange: 9, fabricDamage: 8, tfCost: 7,
    heated: true, forKnit: false,
    holdingMethod: "spring_loaded_clip_grip_selvage_no_pin_hole_damage_clean",
    bestUse: "woven_fabric_coating_laminate_film_stretching_clean_edge",
  },
  combination_pin_clip: {
    fabricSpeed: 8, widthControl: 9, temperatureRange: 9, fabricDamage: 7, tfCost: 8,
    heated: true, forKnit: true,
    holdingMethod: "selectable_pin_or_clip_per_fabric_type_versatile_change",
    bestUse: "multi_product_mill_knit_woven_mix_flexible_production",
  },
  biaxial_stretching: {
    fabricSpeed: 7, widthControl: 10, temperatureRange: 8, fabricDamage: 5, tfCost: 10,
    heated: true, forKnit: false,
    holdingMethod: "diverging_clip_chain_stretch_md_td_simultaneously_orient",
    bestUse: "bopp_bopet_film_biaxial_orient_stretch_packaging_film",
  },
  relaxation_dryer: {
    fabricSpeed: 7, widthControl: 7, temperatureRange: 8, fabricDamage: 9, tfCost: 5,
    heated: true, forKnit: true,
    holdingMethod: "overfeed_conveyor_belt_support_no_tension_relax_shrink_dry",
    bestUse: "knit_fabric_shrinkage_control_tumble_dry_relaxation_finish",
  },
};

function get(t: TenterFrameType): TenterFrameData {
  return DATA[t];
}

export const fabricSpeed = (t: TenterFrameType) => get(t).fabricSpeed;
export const widthControl = (t: TenterFrameType) => get(t).widthControl;
export const temperatureRange = (t: TenterFrameType) => get(t).temperatureRange;
export const fabricDamage = (t: TenterFrameType) => get(t).fabricDamage;
export const tfCost = (t: TenterFrameType) => get(t).tfCost;
export const heated = (t: TenterFrameType) => get(t).heated;
export const forKnit = (t: TenterFrameType) => get(t).forKnit;
export const holdingMethod = (t: TenterFrameType) => get(t).holdingMethod;
export const bestUse = (t: TenterFrameType) => get(t).bestUse;
export const tenterFrameTypes = (): TenterFrameType[] =>
  Object.keys(DATA) as TenterFrameType[];
