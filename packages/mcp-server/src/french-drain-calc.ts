export type FrenchDrainType =
  | "traditional_gravel_trench"
  | "perforated_pipe_fabric"
  | "ez_drain_no_gravel"
  | "curtain_drain_hillside"
  | "interior_footing_drain";

interface FrenchDrainData {
  drainage: number;
  longevity: number;
  installEase: number;
  depth: number;
  fdCost: number;
  fabricWrapped: boolean;
  forFoundation: boolean;
  pipe: string;
  bestUse: string;
}

const DATA: Record<FrenchDrainType, FrenchDrainData> = {
  traditional_gravel_trench: {
    drainage: 8, longevity: 7, installEase: 4, depth: 7, fdCost: 5,
    fabricWrapped: true, forFoundation: true,
    pipe: "perforated_corrugated_hdpe",
    bestUse: "yard_surface_water_diversion",
  },
  perforated_pipe_fabric: {
    drainage: 9, longevity: 8, installEase: 6, depth: 8, fdCost: 6,
    fabricWrapped: true, forFoundation: true,
    pipe: "rigid_pvc_perforated_schedule",
    bestUse: "foundation_perimeter_drainage",
  },
  ez_drain_no_gravel: {
    drainage: 6, longevity: 6, installEase: 10, depth: 5, fdCost: 7,
    fabricWrapped: true, forFoundation: false,
    pipe: "styrofoam_aggregate_wrap_pipe",
    bestUse: "diy_shallow_yard_drain",
  },
  curtain_drain_hillside: {
    drainage: 8, longevity: 7, installEase: 3, depth: 6, fdCost: 6,
    fabricWrapped: true, forFoundation: false,
    pipe: "perforated_hdpe_uphill_intercept",
    bestUse: "hillside_water_intercept_divert",
  },
  interior_footing_drain: {
    drainage: 9, longevity: 9, installEase: 2, depth: 10, fdCost: 9,
    fabricWrapped: false, forFoundation: true,
    pipe: "rigid_pvc_sump_connection",
    bestUse: "basement_waterproofing_interior",
  },
};

function get(t: FrenchDrainType): FrenchDrainData {
  return DATA[t];
}

export const drainage = (t: FrenchDrainType) => get(t).drainage;
export const longevity = (t: FrenchDrainType) => get(t).longevity;
export const installEase = (t: FrenchDrainType) => get(t).installEase;
export const depth = (t: FrenchDrainType) => get(t).depth;
export const fdCost = (t: FrenchDrainType) => get(t).fdCost;
export const fabricWrapped = (t: FrenchDrainType) => get(t).fabricWrapped;
export const forFoundation = (t: FrenchDrainType) => get(t).forFoundation;
export const pipe = (t: FrenchDrainType) => get(t).pipe;
export const bestUse = (t: FrenchDrainType) => get(t).bestUse;
export const frenchDrainTypes = (): FrenchDrainType[] =>
  Object.keys(DATA) as FrenchDrainType[];
