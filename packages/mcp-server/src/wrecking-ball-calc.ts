export type WreckingBallType =
  | "standard_cast_steel_sphere"
  | "pear_shaped_drop_weight"
  | "headache_ball_crane_weight"
  | "demolition_clamshell_grab"
  | "concrete_crusher_jaw_pulverize";

interface WreckingBallData {
  impact: number;
  reach: number;
  precision: number;
  speed: number;
  wbCost: number;
  swinging: boolean;
  forMasonry: boolean;
  attachment: string;
  bestUse: string;
}

const DATA: Record<WreckingBallType, WreckingBallData> = {
  standard_cast_steel_sphere: {
    impact: 10, reach: 8, precision: 3, speed: 6, wbCost: 5,
    swinging: true, forMasonry: true,
    attachment: "cable_suspended_free_swing_sphere",
    bestUse: "masonry_concrete_wall_chimney_drop",
  },
  pear_shaped_drop_weight: {
    impact: 9, reach: 6, precision: 4, speed: 7, wbCost: 4,
    swinging: false, forMasonry: true,
    attachment: "crane_boom_drop_pear_shaped_mass",
    bestUse: "slab_foundation_overhead_drop_break",
  },
  headache_ball_crane_weight: {
    impact: 3, reach: 9, precision: 5, speed: 3, wbCost: 2,
    swinging: false, forMasonry: false,
    attachment: "hook_block_overhaul_weight_ball",
    bestUse: "crane_counterweight_line_tension",
  },
  demolition_clamshell_grab: {
    impact: 6, reach: 7, precision: 7, speed: 8, wbCost: 7,
    swinging: false, forMasonry: false,
    attachment: "hydraulic_jaw_grab_clam_open_close",
    bestUse: "steel_frame_sort_load_debris_pick",
  },
  concrete_crusher_jaw_pulverize: {
    impact: 8, reach: 7, precision: 8, speed: 7, wbCost: 8,
    swinging: false, forMasonry: true,
    attachment: "hydraulic_jaw_crusher_rebar_cut",
    bestUse: "selective_concrete_crush_rebar_separate",
  },
};

function get(t: WreckingBallType): WreckingBallData {
  return DATA[t];
}

export const impact = (t: WreckingBallType) => get(t).impact;
export const reach = (t: WreckingBallType) => get(t).reach;
export const precision = (t: WreckingBallType) => get(t).precision;
export const speed = (t: WreckingBallType) => get(t).speed;
export const wbCost = (t: WreckingBallType) => get(t).wbCost;
export const swinging = (t: WreckingBallType) => get(t).swinging;
export const forMasonry = (t: WreckingBallType) => get(t).forMasonry;
export const attachment = (t: WreckingBallType) => get(t).attachment;
export const bestUse = (t: WreckingBallType) => get(t).bestUse;
export const wreckingBallTypes = (): WreckingBallType[] =>
  Object.keys(DATA) as WreckingBallType[];
