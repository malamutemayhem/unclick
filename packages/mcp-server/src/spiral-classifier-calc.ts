export type SpiralClassifierType =
  | "single_spiral_standard"
  | "double_spiral_high_cap"
  | "submerged_spiral_fine"
  | "high_weir_coarse_cut"
  | "low_weir_dewater";

interface SpiralClassifierData {
  cutPoint: number;
  capacity: number;
  sandRecovery: number;
  reliability: number;
  scCost: number;
  submerged: boolean;
  forCoarse: boolean;
  spiral: string;
  bestUse: string;
}

const DATA: Record<SpiralClassifierType, SpiralClassifierData> = {
  single_spiral_standard: {
    cutPoint: 6, capacity: 6, sandRecovery: 7, reliability: 9, scCost: 4,
    submerged: false, forCoarse: true,
    spiral: "single_screw_inclined_trough_drag",
    bestUse: "ball_mill_closed_circuit_classify",
  },
  double_spiral_high_cap: {
    cutPoint: 6, capacity: 10, sandRecovery: 8, reliability: 9, scCost: 6,
    submerged: false, forCoarse: true,
    spiral: "twin_screw_parallel_high_tonnage",
    bestUse: "high_tonnage_mine_overflow_classify",
  },
  submerged_spiral_fine: {
    cutPoint: 9, capacity: 5, sandRecovery: 6, reliability: 8, scCost: 5,
    submerged: true, forCoarse: false,
    spiral: "submerged_screw_deep_pool_fine_cut",
    bestUse: "fine_separation_deep_pool_slow_settle",
  },
  high_weir_coarse_cut: {
    cutPoint: 4, capacity: 8, sandRecovery: 9, reliability: 9, scCost: 4,
    submerged: false, forCoarse: true,
    spiral: "high_weir_overflow_coarse_sand_drag",
    bestUse: "coarse_sand_dewatering_wash_plant",
  },
  low_weir_dewater: {
    cutPoint: 3, capacity: 7, sandRecovery: 10, reliability: 8, scCost: 3,
    submerged: false, forCoarse: true,
    spiral: "low_weir_maximum_dewater_sand_screw",
    bestUse: "sand_dewatering_maximum_moisture_remove",
  },
};

function get(t: SpiralClassifierType): SpiralClassifierData {
  return DATA[t];
}

export const cutPoint = (t: SpiralClassifierType) => get(t).cutPoint;
export const capacity = (t: SpiralClassifierType) => get(t).capacity;
export const sandRecovery = (t: SpiralClassifierType) => get(t).sandRecovery;
export const reliability = (t: SpiralClassifierType) => get(t).reliability;
export const scCost = (t: SpiralClassifierType) => get(t).scCost;
export const submerged = (t: SpiralClassifierType) => get(t).submerged;
export const forCoarse = (t: SpiralClassifierType) => get(t).forCoarse;
export const spiral = (t: SpiralClassifierType) => get(t).spiral;
export const bestUse = (t: SpiralClassifierType) => get(t).bestUse;
export const spiralClassifierTypes = (): SpiralClassifierType[] =>
  Object.keys(DATA) as SpiralClassifierType[];
