export type JawCrusherType =
  | "single_toggle_overhead"
  | "double_toggle_heavy"
  | "jaw_roll_hybrid"
  | "portable_track_mobile"
  | "high_reduction_deep_chamber";

interface JawCrusherData {
  capacity: number;
  reductionRatio: number;
  feedSize: number;
  wear: number;
  jcCost: number;
  mobile: boolean;
  forHard: boolean;
  toggle: string;
  bestUse: string;
}

const DATA: Record<JawCrusherType, JawCrusherData> = {
  single_toggle_overhead: {
    capacity: 8, reductionRatio: 6, feedSize: 8, wear: 6, jcCost: 5,
    mobile: false, forHard: true,
    toggle: "eccentric_shaft_overhead_single_swing",
    bestUse: "primary_crush_quarry_mine_feed_prep",
  },
  double_toggle_heavy: {
    capacity: 7, reductionRatio: 7, feedSize: 9, wear: 8, jcCost: 7,
    mobile: false, forHard: true,
    toggle: "double_toggle_pitman_nonchoking_action",
    bestUse: "very_hard_abrasive_rock_granite_basalt",
  },
  jaw_roll_hybrid: {
    capacity: 6, reductionRatio: 8, feedSize: 6, wear: 5, jcCost: 6,
    mobile: false, forHard: false,
    toggle: "jaw_plus_roll_two_stage_single_unit",
    bestUse: "medium_hard_limestone_coal_secondary",
  },
  portable_track_mobile: {
    capacity: 5, reductionRatio: 5, feedSize: 7, wear: 5, jcCost: 8,
    mobile: true, forHard: true,
    toggle: "track_mounted_self_propelled_diesel",
    bestUse: "demolition_recycle_site_mobile_crush",
  },
  high_reduction_deep_chamber: {
    capacity: 9, reductionRatio: 10, feedSize: 10, wear: 7, jcCost: 9,
    mobile: false, forHard: true,
    toggle: "deep_cavity_steep_angle_high_stroke",
    bestUse: "high_ratio_single_stage_mine_primary",
  },
};

function get(t: JawCrusherType): JawCrusherData {
  return DATA[t];
}

export const capacity = (t: JawCrusherType) => get(t).capacity;
export const reductionRatio = (t: JawCrusherType) => get(t).reductionRatio;
export const feedSize = (t: JawCrusherType) => get(t).feedSize;
export const wear = (t: JawCrusherType) => get(t).wear;
export const jcCost = (t: JawCrusherType) => get(t).jcCost;
export const mobile = (t: JawCrusherType) => get(t).mobile;
export const forHard = (t: JawCrusherType) => get(t).forHard;
export const toggle = (t: JawCrusherType) => get(t).toggle;
export const bestUse = (t: JawCrusherType) => get(t).bestUse;
export const jawCrusherTypes = (): JawCrusherType[] =>
  Object.keys(DATA) as JawCrusherType[];
