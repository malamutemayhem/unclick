export type RapierLoomType =
  | "single_rapier"
  | "double_rapier"
  | "flexible_rapier"
  | "rigid_rapier"
  | "telescopic_rapier";

interface RapierLoomData {
  weftRange: number;
  throughput: number;
  fabricWidth: number;
  yarnGentleness: number;
  rlCost: number;
  versatile: boolean;
  forTerry: boolean;
  loomConfig: string;
  bestUse: string;
}

const DATA: Record<RapierLoomType, RapierLoomData> = {
  single_rapier: {
    weftRange: 7, throughput: 6, fabricWidth: 7, yarnGentleness: 8, rlCost: 5,
    versatile: true, forTerry: false,
    loomConfig: "single_rapier_loom_one_carrier_traverse_full_width_insert_weft",
    bestUse: "versatile_weaving_single_rapier_loom_medium_speed_flexible_yarn",
  },
  double_rapier: {
    weftRange: 9, throughput: 9, fabricWidth: 9, yarnGentleness: 9, rlCost: 8,
    versatile: true, forTerry: true,
    loomConfig: "double_rapier_loom_giver_taker_mid_transfer_fast_insertion",
    bestUse: "modern_weaving_double_rapier_loom_fast_versatile_multi_color",
  },
  flexible_rapier: {
    weftRange: 8, throughput: 8, fabricWidth: 10, yarnGentleness: 7, rlCost: 7,
    versatile: true, forTerry: true,
    loomConfig: "flexible_rapier_loom_tape_coil_guide_wheel_wide_fabric_insert",
    bestUse: "wide_fabric_weaving_flexible_rapier_loom_carpet_technical_textile",
  },
  rigid_rapier: {
    weftRange: 7, throughput: 10, fabricWidth: 7, yarnGentleness: 6, rlCost: 6,
    versatile: false, forTerry: false,
    loomConfig: "rigid_rapier_loom_solid_rod_carrier_fast_precise_narrow_width",
    bestUse: "high_speed_narrow_rigid_rapier_loom_fast_precise_commodity_fabric",
  },
  telescopic_rapier: {
    weftRange: 8, throughput: 7, fabricWidth: 8, yarnGentleness: 8, rlCost: 9,
    versatile: true, forTerry: false,
    loomConfig: "telescopic_rapier_loom_extending_arm_compact_wide_reach_insert",
    bestUse: "compact_mill_telescopic_rapier_loom_space_saving_wide_reach",
  },
};

function get(t: RapierLoomType): RapierLoomData {
  return DATA[t];
}

export const weftRange = (t: RapierLoomType) => get(t).weftRange;
export const throughput = (t: RapierLoomType) => get(t).throughput;
export const fabricWidth = (t: RapierLoomType) => get(t).fabricWidth;
export const yarnGentleness = (t: RapierLoomType) => get(t).yarnGentleness;
export const rlCost = (t: RapierLoomType) => get(t).rlCost;
export const versatile = (t: RapierLoomType) => get(t).versatile;
export const forTerry = (t: RapierLoomType) => get(t).forTerry;
export const loomConfig = (t: RapierLoomType) => get(t).loomConfig;
export const bestUse = (t: RapierLoomType) => get(t).bestUse;
export const rapierLoomTypes = (): RapierLoomType[] =>
  Object.keys(DATA) as RapierLoomType[];
