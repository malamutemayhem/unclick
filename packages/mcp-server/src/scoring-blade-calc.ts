// scoring-blade-calc - paper scoring blade types

export type ScoringBlade =
  | "bone_blade_classic"
  | "teflon_blade_smooth"
  | "metal_blade_sharp"
  | "wheel_blade_roll"
  | "spring_blade_press";

const DATA: Record<ScoringBlade, {
  scoreCrisp: number; controlFine: number; durability: number; paperRange: number;
  cost: number; replaceable: boolean; forThick: boolean; edgeProfile: string; bestUse: string;
}> = {
  bone_blade_classic: { scoreCrisp: 7, controlFine: 8, durability: 7, paperRange: 7, cost: 4, replaceable: false, forThick: false, edgeProfile: "rounded_bone_edge", bestUse: "general_hand_score" },
  teflon_blade_smooth: { scoreCrisp: 8, controlFine: 8, durability: 8, paperRange: 8, cost: 6, replaceable: false, forThick: false, edgeProfile: "smooth_teflon_tip", bestUse: "coated_paper_score" },
  metal_blade_sharp: { scoreCrisp: 10, controlFine: 7, durability: 10, paperRange: 6, cost: 7, replaceable: true, forThick: true, edgeProfile: "hardened_steel_edge", bestUse: "thick_card_score" },
  wheel_blade_roll: { scoreCrisp: 8, controlFine: 6, durability: 9, paperRange: 9, cost: 8, replaceable: true, forThick: false, edgeProfile: "rolling_disc_wheel", bestUse: "long_straight_score" },
  spring_blade_press: { scoreCrisp: 9, controlFine: 9, durability: 8, paperRange: 7, cost: 9, replaceable: true, forThick: true, edgeProfile: "spring_loaded_tip", bestUse: "precision_detail_score" },
};

const get = (b: ScoringBlade) => DATA[b];
export const scoreCrisp = (b: ScoringBlade) => get(b).scoreCrisp;
export const controlFine = (b: ScoringBlade) => get(b).controlFine;
export const durability = (b: ScoringBlade) => get(b).durability;
export const paperRange = (b: ScoringBlade) => get(b).paperRange;
export const bladeCost = (b: ScoringBlade) => get(b).cost;
export const replaceable = (b: ScoringBlade) => get(b).replaceable;
export const forThick = (b: ScoringBlade) => get(b).forThick;
export const edgeProfile = (b: ScoringBlade) => get(b).edgeProfile;
export const bestUse = (b: ScoringBlade) => get(b).bestUse;
export const scoringBlades = (): ScoringBlade[] => Object.keys(DATA) as ScoringBlade[];
