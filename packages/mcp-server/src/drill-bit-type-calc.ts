export type DrillBitType =
  | "twist_drill_hss_standard"
  | "carbide_insert_indexable"
  | "spade_flat_blade"
  | "gun_drill_deep_hole"
  | "step_drill_cone_unibody";

interface DrillBitData {
  speed: number;
  accuracy: number;
  depth: number;
  chipEvac: number;
  dbCost: number;
  coolantFed: boolean;
  forDeep: boolean;
  point: string;
  bestUse: string;
}

const DATA: Record<DrillBitType, DrillBitData> = {
  twist_drill_hss_standard: {
    speed: 6, accuracy: 6, depth: 5, chipEvac: 5, dbCost: 2,
    coolantFed: false, forDeep: false,
    point: "118_deg_split_point",
    bestUse: "general_purpose_through_hole",
  },
  carbide_insert_indexable: {
    speed: 9, accuracy: 8, depth: 6, chipEvac: 8, dbCost: 7,
    coolantFed: true, forDeep: false,
    point: "insert_tip_replaceable",
    bestUse: "high_production_cnc_drilling",
  },
  spade_flat_blade: {
    speed: 7, accuracy: 4, depth: 4, chipEvac: 3, dbCost: 3,
    coolantFed: false, forDeep: false,
    point: "flat_blade_center_spur",
    bestUse: "large_diameter_wood_rough",
  },
  gun_drill_deep_hole: {
    speed: 5, accuracy: 9, depth: 10, chipEvac: 9, dbCost: 8,
    coolantFed: true, forDeep: true,
    point: "single_lip_kidney_shape",
    bestUse: "deep_bore_barrel_mold_pin",
  },
  step_drill_cone_unibody: {
    speed: 7, accuracy: 5, depth: 2, chipEvac: 4, dbCost: 4,
    coolantFed: false, forDeep: false,
    point: "stepped_cone_multi_diameter",
    bestUse: "sheet_metal_multi_size_hole",
  },
};

function get(t: DrillBitType): DrillBitData {
  return DATA[t];
}

export const speed = (t: DrillBitType) => get(t).speed;
export const accuracy = (t: DrillBitType) => get(t).accuracy;
export const depth = (t: DrillBitType) => get(t).depth;
export const chipEvac = (t: DrillBitType) => get(t).chipEvac;
export const dbCost = (t: DrillBitType) => get(t).dbCost;
export const coolantFed = (t: DrillBitType) => get(t).coolantFed;
export const forDeep = (t: DrillBitType) => get(t).forDeep;
export const point = (t: DrillBitType) => get(t).point;
export const bestUse = (t: DrillBitType) => get(t).bestUse;
export const drillBitTypes = (): DrillBitType[] =>
  Object.keys(DATA) as DrillBitType[];
