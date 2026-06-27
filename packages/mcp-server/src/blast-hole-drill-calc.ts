export type BlastHoleDrillType =
  | "rotary_tricone"
  | "down_the_hole"
  | "top_hammer"
  | "rotary_air_blast"
  | "hydraulic_crawler";

interface BlastHoleDrillData {
  speed: number;
  holeDepth: number;
  holeDiameter: number;
  accuracy: number;
  bdCost: number;
  autonomous: boolean;
  forHardRock: boolean;
  drilling: string;
  bestUse: string;
}

const DATA: Record<BlastHoleDrillType, BlastHoleDrillData> = {
  rotary_tricone: {
    speed: 8, holeDepth: 10, holeDiameter: 10, accuracy: 7, bdCost: 9,
    autonomous: true, forHardRock: true,
    drilling: "tricone_roller_bit_rotary_weight_on_bit_large_diameter",
    bestUse: "large_open_pit_blast_hole_200_400mm_overburden_ore_bench",
  },
  down_the_hole: {
    speed: 7, holeDepth: 9, holeDiameter: 8, accuracy: 9, bdCost: 7,
    autonomous: false, forHardRock: true,
    drilling: "pneumatic_hammer_at_bit_face_rotation_from_surface_air",
    bestUse: "quarry_medium_hard_rock_150_250mm_precise_straight_hole",
  },
  top_hammer: {
    speed: 9, holeDepth: 6, holeDiameter: 5, accuracy: 8, bdCost: 5,
    autonomous: false, forHardRock: true,
    drilling: "hydraulic_percussion_at_top_energy_through_drill_string",
    bestUse: "construction_quarry_secondary_blast_small_diameter_fast",
  },
  rotary_air_blast: {
    speed: 10, holeDepth: 5, holeDiameter: 4, accuracy: 6, bdCost: 4,
    autonomous: false, forHardRock: false,
    drilling: "drag_bit_rotary_air_flush_shallow_soft_formation_fast",
    bestUse: "exploration_shallow_soft_ground_geotechnical_grade_control",
  },
  hydraulic_crawler: {
    speed: 7, holeDepth: 8, holeDiameter: 7, accuracy: 9, bdCost: 8,
    autonomous: true, forHardRock: true,
    drilling: "hydraulic_feed_crawler_mounted_multi_pass_angle_capable",
    bestUse: "versatile_bench_pre_split_presplit_contour_angle_drilling",
  },
};

function get(t: BlastHoleDrillType): BlastHoleDrillData {
  return DATA[t];
}

export const speed = (t: BlastHoleDrillType) => get(t).speed;
export const holeDepth = (t: BlastHoleDrillType) => get(t).holeDepth;
export const holeDiameter = (t: BlastHoleDrillType) => get(t).holeDiameter;
export const accuracy = (t: BlastHoleDrillType) => get(t).accuracy;
export const bdCost = (t: BlastHoleDrillType) => get(t).bdCost;
export const autonomous = (t: BlastHoleDrillType) => get(t).autonomous;
export const forHardRock = (t: BlastHoleDrillType) => get(t).forHardRock;
export const drilling = (t: BlastHoleDrillType) => get(t).drilling;
export const bestUse = (t: BlastHoleDrillType) => get(t).bestUse;
export const blastHoleDrillTypes = (): BlastHoleDrillType[] =>
  Object.keys(DATA) as BlastHoleDrillType[];
