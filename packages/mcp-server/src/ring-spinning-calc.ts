export type RingSpinningType =
  | "conventional_ring"
  | "compact_suction"
  | "siro_twin_strand"
  | "traveller_modified"
  | "long_staple_worsted";

interface RingSpinningData {
  yarnStrength: number;
  spindleSpeed: number;
  yarnHairiness: number;
  countRange: number;
  rsCost: number;
  compact: boolean;
  forFine: boolean;
  draftSystem: string;
  bestUse: string;
}

const DATA: Record<RingSpinningType, RingSpinningData> = {
  conventional_ring: {
    yarnStrength: 7, spindleSpeed: 8, yarnHairiness: 5, countRange: 9, rsCost: 5,
    compact: false, forFine: false,
    draftSystem: "3_over_3_apron_draft_ring_traveller_cop_wind_standard_twist",
    bestUse: "general_purpose_cotton_yarn_weaving_warp_weft_knitting_count",
  },
  compact_suction: {
    yarnStrength: 10, spindleSpeed: 8, yarnHairiness: 10, countRange: 8, rsCost: 9,
    compact: true, forFine: true,
    draftSystem: "perforated_drum_suction_compact_fiber_ribbon_reduce_triangle",
    bestUse: "premium_combed_cotton_fine_count_smooth_yarn_low_hairiness",
  },
  siro_twin_strand: {
    yarnStrength: 9, spindleSpeed: 7, yarnHairiness: 7, countRange: 7, rsCost: 6,
    compact: false, forFine: false,
    draftSystem: "twin_roving_feed_parallel_draft_ply_twist_single_spindle_siro",
    bestUse: "siro_spun_yarn_two_ply_effect_single_pass_uniform_twist_blend",
  },
  traveller_modified: {
    yarnStrength: 8, spindleSpeed: 10, yarnHairiness: 6, countRange: 8, rsCost: 7,
    compact: false, forFine: false,
    draftSystem: "low_mass_traveller_modified_ring_high_speed_reduced_heat_wear",
    bestUse: "high_speed_medium_count_production_polyester_cotton_blend_yarn",
  },
  long_staple_worsted: {
    yarnStrength: 8, spindleSpeed: 6, yarnHairiness: 8, countRange: 6, rsCost: 8,
    compact: false, forFine: true,
    draftSystem: "french_draft_long_apron_worsted_count_system_wool_fiber_spin",
    bestUse: "worsted_wool_yarn_suiting_knitwear_long_staple_smooth_finish",
  },
};

function get(t: RingSpinningType): RingSpinningData {
  return DATA[t];
}

export const yarnStrength = (t: RingSpinningType) => get(t).yarnStrength;
export const spindleSpeed = (t: RingSpinningType) => get(t).spindleSpeed;
export const yarnHairiness = (t: RingSpinningType) => get(t).yarnHairiness;
export const countRange = (t: RingSpinningType) => get(t).countRange;
export const rsCost = (t: RingSpinningType) => get(t).rsCost;
export const compact = (t: RingSpinningType) => get(t).compact;
export const forFine = (t: RingSpinningType) => get(t).forFine;
export const draftSystem = (t: RingSpinningType) => get(t).draftSystem;
export const bestUse = (t: RingSpinningType) => get(t).bestUse;
export const ringSpinningTypes = (): RingSpinningType[] =>
  Object.keys(DATA) as RingSpinningType[];
