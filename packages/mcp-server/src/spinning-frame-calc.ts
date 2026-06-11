export type SpinningFrameType =
  | "ring_spinning"
  | "open_end_rotor"
  | "air_jet_vortex"
  | "compact_spinning"
  | "friction_dref";

interface SpinningFrameData {
  speed: number;
  yarnStrength: number;
  yarnFineness: number;
  energyEfficiency: number;
  sfCost: number;
  continuous: boolean;
  forFineCount: boolean;
  twist: string;
  bestUse: string;
}

const DATA: Record<SpinningFrameType, SpinningFrameData> = {
  ring_spinning: {
    speed: 5, yarnStrength: 10, yarnFineness: 10, energyEfficiency: 5, sfCost: 6,
    continuous: false, forFineCount: true,
    twist: "traveler_ring_spindle_true_twist_cop_winding_bobbin",
    bestUse: "fine_count_cotton_blend_apparel_high_quality_compact_yarn",
  },
  open_end_rotor: {
    speed: 10, yarnStrength: 6, yarnFineness: 5, energyEfficiency: 9, sfCost: 7,
    continuous: true, forFineCount: false,
    twist: "rotor_cup_fiber_peel_off_point_open_end_wrap_splice_join",
    bestUse: "coarse_medium_count_denim_towel_knitting_bulk_yarn",
  },
  air_jet_vortex: {
    speed: 9, yarnStrength: 7, yarnFineness: 7, energyEfficiency: 8, sfCost: 9,
    continuous: true, forFineCount: false,
    twist: "air_vortex_nozzle_fasciated_wrap_fiber_around_parallel_core",
    bestUse: "knitting_yarn_polyester_blend_t_shirt_smooth_low_hairiness",
  },
  compact_spinning: {
    speed: 5, yarnStrength: 10, yarnFineness: 10, energyEfficiency: 4, sfCost: 8,
    continuous: false, forFineCount: true,
    twist: "condensing_zone_suction_slot_compact_triangle_ring_twist",
    bestUse: "premium_shirting_fine_weaving_yarn_low_hairiness_high_luster",
  },
  friction_dref: {
    speed: 8, yarnStrength: 5, yarnFineness: 3, energyEfficiency: 7, sfCost: 5,
    continuous: true, forFineCount: false,
    twist: "two_perforated_drums_suction_friction_wrap_core_sheath",
    bestUse: "thick_count_technical_yarn_insulation_filtration_composite",
  },
};

function get(t: SpinningFrameType): SpinningFrameData {
  return DATA[t];
}

export const speed = (t: SpinningFrameType) => get(t).speed;
export const yarnStrength = (t: SpinningFrameType) => get(t).yarnStrength;
export const yarnFineness = (t: SpinningFrameType) => get(t).yarnFineness;
export const energyEfficiency = (t: SpinningFrameType) => get(t).energyEfficiency;
export const sfCost = (t: SpinningFrameType) => get(t).sfCost;
export const continuous = (t: SpinningFrameType) => get(t).continuous;
export const forFineCount = (t: SpinningFrameType) => get(t).forFineCount;
export const twist = (t: SpinningFrameType) => get(t).twist;
export const bestUse = (t: SpinningFrameType) => get(t).bestUse;
export const spinningFrameTypes = (): SpinningFrameType[] =>
  Object.keys(DATA) as SpinningFrameType[];
