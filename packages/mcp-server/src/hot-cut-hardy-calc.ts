// Hot cut hardy calculator - blacksmithing hot cut tools

export type HotCutHardyType =
  | "standard_hot_cut"
  | "spring_hot_cut"
  | "handled_hot_chisel"
  | "guillotine_hot_set"
  | "slitting_chisel_narrow";

const CUT_DATA: Record<
  HotCutHardyType,
  {
    cutClean: number;
    edgeLife: number;
    speedCut: number;
    thicknessRange: number;
    cost: number;
    hardyFit: boolean;
    springAction: boolean;
    edgeProfile: string;
    bestUse: string;
  }
> = {
  standard_hot_cut: {
    cutClean: 8,
    edgeLife: 7,
    speedCut: 8,
    thicknessRange: 7,
    cost: 3,
    hardyFit: true,
    springAction: false,
    edgeProfile: "single_bevel_edge",
    bestUse: "general_hot_cut",
  },
  spring_hot_cut: {
    cutClean: 9,
    edgeLife: 8,
    speedCut: 10,
    thicknessRange: 8,
    cost: 6,
    hardyFit: false,
    springAction: true,
    edgeProfile: "matched_pair_edge",
    bestUse: "fast_repeat_cut",
  },
  handled_hot_chisel: {
    cutClean: 8,
    edgeLife: 7,
    speedCut: 7,
    thicknessRange: 9,
    cost: 3,
    hardyFit: false,
    springAction: false,
    edgeProfile: "hand_held_bevel",
    bestUse: "positioned_cut_mark",
  },
  guillotine_hot_set: {
    cutClean: 10,
    edgeLife: 9,
    speedCut: 9,
    thicknessRange: 8,
    cost: 8,
    hardyFit: false,
    springAction: false,
    edgeProfile: "guided_shear_edge",
    bestUse: "production_clean_cut",
  },
  slitting_chisel_narrow: {
    cutClean: 7,
    edgeLife: 7,
    speedCut: 7,
    thicknessRange: 6,
    cost: 3,
    hardyFit: false,
    springAction: false,
    edgeProfile: "narrow_slit_point",
    bestUse: "slot_slit_open",
  },
};

export function cutClean(type: HotCutHardyType): number {
  return CUT_DATA[type].cutClean;
}
export function edgeLife(type: HotCutHardyType): number {
  return CUT_DATA[type].edgeLife;
}
export function speedCut(type: HotCutHardyType): number {
  return CUT_DATA[type].speedCut;
}
export function thicknessRange(type: HotCutHardyType): number {
  return CUT_DATA[type].thicknessRange;
}
export function cutCost(type: HotCutHardyType): number {
  return CUT_DATA[type].cost;
}
export function hardyFit(type: HotCutHardyType): boolean {
  return CUT_DATA[type].hardyFit;
}
export function springAction(type: HotCutHardyType): boolean {
  return CUT_DATA[type].springAction;
}
export function edgeProfile(type: HotCutHardyType): string {
  return CUT_DATA[type].edgeProfile;
}
export function bestUse(type: HotCutHardyType): string {
  return CUT_DATA[type].bestUse;
}
export function hotCutHardys(): HotCutHardyType[] {
  return Object.keys(CUT_DATA) as HotCutHardyType[];
}
