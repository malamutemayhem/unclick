export type JawCrushType =
  | "single_toggle_overhead"
  | "double_toggle_blake"
  | "jaw_roll_hybrid"
  | "portable_track_mount"
  | "lab_sample_prep";

interface JawCrushData {
  reductionRatio: number;
  throughput: number;
  feedSize: number;
  durability: number;
  jcCost: number;
  mobile: boolean;
  forPrimary: boolean;
  toggle: string;
  bestUse: string;
}

const DATA: Record<JawCrushType, JawCrushData> = {
  single_toggle_overhead: {
    reductionRatio: 7, throughput: 9, feedSize: 9, durability: 8, jcCost: 6,
    mobile: false, forPrimary: true,
    toggle: "single_toggle_eccentric_overhead",
    bestUse: "quarry_mining_primary_crush_hard",
  },
  double_toggle_blake: {
    reductionRatio: 6, throughput: 7, feedSize: 10, durability: 10, jcCost: 8,
    mobile: false, forPrimary: true,
    toggle: "double_toggle_blake_pitman_arm",
    bestUse: "hard_abrasive_granite_basalt_ore",
  },
  jaw_roll_hybrid: {
    reductionRatio: 8, throughput: 8, feedSize: 7, durability: 7, jcCost: 7,
    mobile: false, forPrimary: false,
    toggle: "jaw_plus_roll_combo_two_stage",
    bestUse: "coal_soft_limestone_two_stage",
  },
  portable_track_mount: {
    reductionRatio: 7, throughput: 7, feedSize: 8, durability: 7, jcCost: 9,
    mobile: true, forPrimary: true,
    toggle: "single_toggle_tracked_chassis",
    bestUse: "demolition_recycle_site_mobile",
  },
  lab_sample_prep: {
    reductionRatio: 9, throughput: 2, feedSize: 3, durability: 6, jcCost: 4,
    mobile: false, forPrimary: false,
    toggle: "small_toggle_bench_lab_scale",
    bestUse: "lab_assay_sample_prep_geology",
  },
};

function get(t: JawCrushType): JawCrushData {
  return DATA[t];
}

export const reductionRatio = (t: JawCrushType) => get(t).reductionRatio;
export const throughput = (t: JawCrushType) => get(t).throughput;
export const feedSize = (t: JawCrushType) => get(t).feedSize;
export const durability = (t: JawCrushType) => get(t).durability;
export const jcCost = (t: JawCrushType) => get(t).jcCost;
export const mobile = (t: JawCrushType) => get(t).mobile;
export const forPrimary = (t: JawCrushType) => get(t).forPrimary;
export const toggle = (t: JawCrushType) => get(t).toggle;
export const bestUse = (t: JawCrushType) => get(t).bestUse;
export const jawCrushTypes = (): JawCrushType[] =>
  Object.keys(DATA) as JawCrushType[];
