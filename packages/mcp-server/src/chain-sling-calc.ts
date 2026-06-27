export type ChainSlingType =
  | "single_leg_vertical"
  | "double_leg_bridle"
  | "triple_leg_basket"
  | "quad_leg_four_point"
  | "adjustable_chain_shortener";

interface ChainSlingData {
  capacity: number;
  reach: number;
  durability: number;
  flexibility: number;
  csCost: number;
  adjustable: boolean;
  forOverhead: boolean;
  grade: string;
  bestUse: string;
}

const DATA: Record<ChainSlingType, ChainSlingData> = {
  single_leg_vertical: {
    capacity: 5, reach: 8, durability: 9, flexibility: 7, csCost: 3,
    adjustable: false, forOverhead: true,
    grade: "grade_80_alloy_quench_temper",
    bestUse: "single_point_vertical_lift_simple",
  },
  double_leg_bridle: {
    capacity: 8, reach: 7, durability: 9, flexibility: 6, csCost: 6,
    adjustable: false, forOverhead: true,
    grade: "grade_100_high_strength_alloy",
    bestUse: "balanced_load_two_point_beam_pick",
  },
  triple_leg_basket: {
    capacity: 9, reach: 6, durability: 9, flexibility: 5, csCost: 8,
    adjustable: false, forOverhead: true,
    grade: "grade_100_high_strength_alloy",
    bestUse: "irregular_shape_three_point_stable",
  },
  quad_leg_four_point: {
    capacity: 10, reach: 6, durability: 9, flexibility: 4, csCost: 10,
    adjustable: false, forOverhead: true,
    grade: "grade_100_high_strength_alloy",
    bestUse: "heavy_precast_machine_four_corner",
  },
  adjustable_chain_shortener: {
    capacity: 7, reach: 9, durability: 8, flexibility: 9, csCost: 7,
    adjustable: true, forOverhead: true,
    grade: "grade_80_alloy_grab_hook_clutch",
    bestUse: "uneven_load_variable_length_level",
  },
};

function get(t: ChainSlingType): ChainSlingData {
  return DATA[t];
}

export const capacity = (t: ChainSlingType) => get(t).capacity;
export const reach = (t: ChainSlingType) => get(t).reach;
export const durability = (t: ChainSlingType) => get(t).durability;
export const flexibility = (t: ChainSlingType) => get(t).flexibility;
export const csCost = (t: ChainSlingType) => get(t).csCost;
export const adjustable = (t: ChainSlingType) => get(t).adjustable;
export const forOverhead = (t: ChainSlingType) => get(t).forOverhead;
export const grade = (t: ChainSlingType) => get(t).grade;
export const bestUse = (t: ChainSlingType) => get(t).bestUse;
export const chainSlingTypes = (): ChainSlingType[] =>
  Object.keys(DATA) as ChainSlingType[];
