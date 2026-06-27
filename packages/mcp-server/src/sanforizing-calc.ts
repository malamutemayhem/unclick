export type SanforizingType =
  | "rubber_belt"
  | "felt_blanket"
  | "compressive_roll"
  | "steam_relaxation"
  | "dual_shrinkage";

interface SanforizingData {
  shrinkageControl: number;
  fabricSpeed: number;
  fabricHand: number;
  dimensionalStability: number;
  szCost: number;
  heated: boolean;
  forKnit: boolean;
  mechanismConfig: string;
  bestUse: string;
}

const DATA: Record<SanforizingType, SanforizingData> = {
  rubber_belt: {
    shrinkageControl: 10, fabricSpeed: 8, fabricHand: 7, dimensionalStability: 10, szCost: 7,
    heated: true, forKnit: false,
    mechanismConfig: "endless_rubber_belt_heated_drum_compress_warp_shrink_control",
    bestUse: "woven_cotton_shirting_sheeting_guaranteed_shrinkage_below_one",
  },
  felt_blanket: {
    shrinkageControl: 8, fabricSpeed: 7, fabricHand: 9, dimensionalStability: 8, szCost: 5,
    heated: true, forKnit: true,
    mechanismConfig: "wool_felt_blanket_wrap_drum_gentle_compaction_soft_hand_feel",
    bestUse: "knit_jersey_interlock_gentle_compaction_soft_hand_finish",
  },
  compressive_roll: {
    shrinkageControl: 7, fabricSpeed: 9, fabricHand: 6, dimensionalStability: 7, szCost: 4,
    heated: false, forKnit: false,
    mechanismConfig: "steel_roll_pair_mechanical_compression_simple_shrinkage_set",
    bestUse: "budget_woven_basic_shrinkage_reduction_simple_line_compact",
  },
  steam_relaxation: {
    shrinkageControl: 6, fabricSpeed: 10, fabricHand: 10, dimensionalStability: 6, szCost: 6,
    heated: true, forKnit: true,
    mechanismConfig: "conveyor_steam_chamber_relax_tension_free_natural_shrinkage",
    bestUse: "synthetic_knit_lycra_blend_tension_free_relaxation_shrinkage",
  },
  dual_shrinkage: {
    shrinkageControl: 9, fabricSpeed: 6, fabricHand: 8, dimensionalStability: 9, szCost: 9,
    heated: true, forKnit: false,
    mechanismConfig: "rubber_belt_plus_felt_sequential_warp_and_weft_dual_compact",
    bestUse: "premium_woven_twill_poplin_bidirectional_shrinkage_guarantee",
  },
};

function get(t: SanforizingType): SanforizingData {
  return DATA[t];
}

export const shrinkageControl = (t: SanforizingType) => get(t).shrinkageControl;
export const fabricSpeed = (t: SanforizingType) => get(t).fabricSpeed;
export const fabricHand = (t: SanforizingType) => get(t).fabricHand;
export const dimensionalStability = (t: SanforizingType) => get(t).dimensionalStability;
export const szCost = (t: SanforizingType) => get(t).szCost;
export const heated = (t: SanforizingType) => get(t).heated;
export const forKnit = (t: SanforizingType) => get(t).forKnit;
export const mechanismConfig = (t: SanforizingType) => get(t).mechanismConfig;
export const bestUse = (t: SanforizingType) => get(t).bestUse;
export const sanforizingTypes = (): SanforizingType[] =>
  Object.keys(DATA) as SanforizingType[];
