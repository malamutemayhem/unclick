export type SawmillBladeType =
  | "bandsaw_horizontal"
  | "bandsaw_vertical"
  | "circular_head_rig"
  | "frame_gang"
  | "thin_kerf_circular";

interface SawmillBladeData {
  speed: number;
  yieldRecovery: number;
  cutAccuracy: number;
  logDiameter: number;
  sbCost: number;
  resaw: boolean;
  forHardwood: boolean;
  blade: string;
  bestUse: string;
}

const DATA: Record<SawmillBladeType, SawmillBladeData> = {
  bandsaw_horizontal: {
    speed: 7, yieldRecovery: 9, cutAccuracy: 8, logDiameter: 9, sbCost: 6,
    resaw: true, forHardwood: true,
    blade: "continuous_band_loop_horizontal_carriage_log_feed_thin_kerf",
    bestUse: "hardwood_sawmill_custom_cut_grade_lumber_large_diameter_log",
  },
  bandsaw_vertical: {
    speed: 8, yieldRecovery: 9, cutAccuracy: 9, logDiameter: 10, sbCost: 7,
    resaw: true, forHardwood: true,
    blade: "vertical_band_loop_log_carriage_setworks_variable_thickness",
    bestUse: "primary_breakdown_large_log_hardwood_softwood_headrig",
  },
  circular_head_rig: {
    speed: 10, yieldRecovery: 6, cutAccuracy: 7, logDiameter: 7, sbCost: 5,
    resaw: false, forHardwood: false,
    blade: "large_diameter_circular_blade_fixed_arbor_high_speed_feed",
    bestUse: "softwood_pine_dimension_lumber_high_speed_production_mill",
  },
  frame_gang: {
    speed: 9, yieldRecovery: 7, cutAccuracy: 8, logDiameter: 6, sbCost: 8,
    resaw: false, forHardwood: false,
    blade: "multiple_parallel_blades_frame_reciprocate_multi_cut_pass",
    bestUse: "softwood_cants_to_boards_multiple_simultaneous_cut_batch",
  },
  thin_kerf_circular: {
    speed: 10, yieldRecovery: 8, cutAccuracy: 9, logDiameter: 5, sbCost: 9,
    resaw: true, forHardwood: false,
    blade: "thin_kerf_carbide_tipped_circular_blade_optimized_feed",
    bestUse: "resaw_edging_trimming_optimized_recovery_small_log_mill",
  },
};

function get(t: SawmillBladeType): SawmillBladeData {
  return DATA[t];
}

export const speed = (t: SawmillBladeType) => get(t).speed;
export const yieldRecovery = (t: SawmillBladeType) => get(t).yieldRecovery;
export const cutAccuracy = (t: SawmillBladeType) => get(t).cutAccuracy;
export const logDiameter = (t: SawmillBladeType) => get(t).logDiameter;
export const sbCost = (t: SawmillBladeType) => get(t).sbCost;
export const resaw = (t: SawmillBladeType) => get(t).resaw;
export const forHardwood = (t: SawmillBladeType) => get(t).forHardwood;
export const blade = (t: SawmillBladeType) => get(t).blade;
export const bestUse = (t: SawmillBladeType) => get(t).bestUse;
export const sawmillBladeTypes = (): SawmillBladeType[] =>
  Object.keys(DATA) as SawmillBladeType[];
