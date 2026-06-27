export type BulldozerType =
  | "standard_straight_blade_s"
  | "universal_u_blade_bowl"
  | "semi_u_blade_su"
  | "angle_blade_tilt"
  | "swamp_low_ground_pressure";

interface BulldozerData {
  push: number;
  spread: number;
  grading: number;
  flotation: number;
  bdCost: number;
  ripper: boolean;
  forClearing: boolean;
  blade: string;
  bestUse: string;
}

const DATA: Record<BulldozerType, BulldozerData> = {
  standard_straight_blade_s: {
    push: 8, spread: 7, grading: 8, flotation: 5, bdCost: 6,
    ripper: true, forClearing: true,
    blade: "straight_flat_no_wing",
    bestUse: "general_push_grade_rip_backfill",
  },
  universal_u_blade_bowl: {
    push: 10, spread: 5, grading: 4, flotation: 5, bdCost: 7,
    ripper: false, forClearing: false,
    blade: "curved_bowl_tall_wing_side",
    bestUse: "stockpile_push_long_distance_loose",
  },
  semi_u_blade_su: {
    push: 9, spread: 6, grading: 6, flotation: 5, bdCost: 7,
    ripper: true, forClearing: true,
    blade: "semi_curved_moderate_wing",
    bestUse: "versatile_push_grade_combo",
  },
  angle_blade_tilt: {
    push: 6, spread: 9, grading: 9, flotation: 5, bdCost: 6,
    ripper: false, forClearing: false,
    blade: "angled_tilt_side_cast",
    bestUse: "ditch_cut_road_side_drain_spread",
  },
  swamp_low_ground_pressure: {
    push: 7, spread: 7, grading: 5, flotation: 10, bdCost: 9,
    ripper: false, forClearing: true,
    blade: "wide_track_low_pressure_lgp",
    bestUse: "wetland_peat_soft_ground_clearing",
  },
};

function get(t: BulldozerType): BulldozerData {
  return DATA[t];
}

export const push = (t: BulldozerType) => get(t).push;
export const spread = (t: BulldozerType) => get(t).spread;
export const grading = (t: BulldozerType) => get(t).grading;
export const flotation = (t: BulldozerType) => get(t).flotation;
export const bdCost = (t: BulldozerType) => get(t).bdCost;
export const ripper = (t: BulldozerType) => get(t).ripper;
export const forClearing = (t: BulldozerType) => get(t).forClearing;
export const blade = (t: BulldozerType) => get(t).blade;
export const bestUse = (t: BulldozerType) => get(t).bestUse;
export const bulldozerTypes = (): BulldozerType[] =>
  Object.keys(DATA) as BulldozerType[];
