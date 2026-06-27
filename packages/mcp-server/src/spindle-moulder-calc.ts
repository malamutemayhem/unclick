export type SpindleMoulderType =
  | "fixed_spindle"
  | "tilting_spindle"
  | "sliding_table"
  | "programmable_cnc"
  | "heavy_duty_shaper";

interface SpindleMoulderData {
  profileAccuracy: number;
  spindleSpeed: number;
  feedRate: number;
  cutterCapacity: number;
  smCost: number;
  tilting: boolean;
  forCurved: boolean;
  spindleConfig: string;
  bestUse: string;
}

const DATA: Record<SpindleMoulderType, SpindleMoulderData> = {
  fixed_spindle: {
    profileAccuracy: 7, spindleSpeed: 8, feedRate: 7, cutterCapacity: 7, smCost: 4,
    tilting: false, forCurved: false,
    spindleConfig: "single_fixed_vertical_spindle_standard_fence_guide_straight",
    bestUse: "basic_moulding_profile_edge_straight_run_small_workshop_shape",
  },
  tilting_spindle: {
    profileAccuracy: 9, spindleSpeed: 8, feedRate: 7, cutterCapacity: 8, smCost: 7,
    tilting: true, forCurved: false,
    spindleConfig: "tilting_spindle_45_degree_angle_compound_profile_bevel_shape",
    bestUse: "angled_profile_compound_moulding_bevel_edge_tilted_spindle_cut",
  },
  sliding_table: {
    profileAccuracy: 8, spindleSpeed: 7, feedRate: 8, cutterCapacity: 7, smCost: 6,
    tilting: false, forCurved: true,
    spindleConfig: "sliding_carriage_table_template_guided_curved_work_safe_feed",
    bestUse: "curved_template_work_arched_component_sliding_table_safe_feed",
  },
  programmable_cnc: {
    profileAccuracy: 10, spindleSpeed: 10, feedRate: 10, cutterCapacity: 10, smCost: 10,
    tilting: true, forCurved: true,
    spindleConfig: "cnc_servo_spindle_auto_tool_change_programmed_profile_path",
    bestUse: "production_moulding_complex_profile_auto_tool_change_cnc_path",
  },
  heavy_duty_shaper: {
    profileAccuracy: 8, spindleSpeed: 6, feedRate: 6, cutterCapacity: 10, smCost: 8,
    tilting: false, forCurved: false,
    spindleConfig: "large_bore_spindle_heavy_cutterhead_power_feeder_deep_profile",
    bestUse: "deep_profile_large_moulding_stair_handrail_heavy_stock_shape",
  },
};

function get(t: SpindleMoulderType): SpindleMoulderData {
  return DATA[t];
}

export const profileAccuracy = (t: SpindleMoulderType) => get(t).profileAccuracy;
export const spindleSpeed = (t: SpindleMoulderType) => get(t).spindleSpeed;
export const feedRate = (t: SpindleMoulderType) => get(t).feedRate;
export const cutterCapacity = (t: SpindleMoulderType) => get(t).cutterCapacity;
export const smCost = (t: SpindleMoulderType) => get(t).smCost;
export const tilting = (t: SpindleMoulderType) => get(t).tilting;
export const forCurved = (t: SpindleMoulderType) => get(t).forCurved;
export const spindleConfig = (t: SpindleMoulderType) => get(t).spindleConfig;
export const bestUse = (t: SpindleMoulderType) => get(t).bestUse;
export const spindleMoulderTypes = (): SpindleMoulderType[] =>
  Object.keys(DATA) as SpindleMoulderType[];
