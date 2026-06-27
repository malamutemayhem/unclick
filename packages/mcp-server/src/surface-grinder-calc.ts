export type SurfaceGrinderType =
  | "horizontal_spindle_reciprocating"
  | "horizontal_spindle_rotary"
  | "vertical_spindle_rotary"
  | "double_disc"
  | "creep_feed";

interface SurfaceGrinderData {
  precision: number;
  materialRemoval: number;
  surfaceFinish: number;
  throughput: number;
  sgCost: number;
  cnc: boolean;
  forHardMaterial: boolean;
  grinding: string;
  bestUse: string;
}

const DATA: Record<SurfaceGrinderType, SurfaceGrinderData> = {
  horizontal_spindle_reciprocating: {
    precision: 9, materialRemoval: 6, surfaceFinish: 9, throughput: 5, sgCost: 5,
    cnc: false, forHardMaterial: true,
    grinding: "peripheral_wheel_reciprocating_table_incremental_downfeed",
    bestUse: "tool_die_shop_precision_flat_surface_small_batch_manual",
  },
  horizontal_spindle_rotary: {
    precision: 8, materialRemoval: 7, surfaceFinish: 8, throughput: 7, sgCost: 7,
    cnc: true, forHardMaterial: true,
    grinding: "peripheral_wheel_rotary_table_continuous_feed_segment",
    bestUse: "bearing_ring_seal_face_round_part_batch_production_auto",
  },
  vertical_spindle_rotary: {
    precision: 7, materialRemoval: 9, surfaceFinish: 7, throughput: 9, sgCost: 8,
    cnc: true, forHardMaterial: true,
    grinding: "cup_wheel_face_grinding_rotary_table_blanchard_style",
    bestUse: "casting_forging_deburr_high_stock_removal_blanchard_grind",
  },
  double_disc: {
    precision: 8, materialRemoval: 8, surfaceFinish: 7, throughput: 10, sgCost: 9,
    cnc: true, forHardMaterial: false,
    grinding: "two_parallel_wheels_simultaneous_both_sides_through_feed",
    bestUse: "automotive_brake_disc_piston_ring_high_volume_parallel",
  },
  creep_feed: {
    precision: 10, materialRemoval: 10, surfaceFinish: 8, throughput: 6, sgCost: 10,
    cnc: true, forHardMaterial: true,
    grinding: "deep_cut_slow_feed_profile_wheel_continuous_dress_coolant",
    bestUse: "turbine_blade_root_form_aerospace_profile_deep_slot_grind",
  },
};

function get(t: SurfaceGrinderType): SurfaceGrinderData {
  return DATA[t];
}

export const precision = (t: SurfaceGrinderType) => get(t).precision;
export const materialRemoval = (t: SurfaceGrinderType) => get(t).materialRemoval;
export const surfaceFinish = (t: SurfaceGrinderType) => get(t).surfaceFinish;
export const throughput = (t: SurfaceGrinderType) => get(t).throughput;
export const sgCost = (t: SurfaceGrinderType) => get(t).sgCost;
export const cnc = (t: SurfaceGrinderType) => get(t).cnc;
export const forHardMaterial = (t: SurfaceGrinderType) => get(t).forHardMaterial;
export const grinding = (t: SurfaceGrinderType) => get(t).grinding;
export const bestUse = (t: SurfaceGrinderType) => get(t).bestUse;
export const surfaceGrinderTypes = (): SurfaceGrinderType[] =>
  Object.keys(DATA) as SurfaceGrinderType[];
