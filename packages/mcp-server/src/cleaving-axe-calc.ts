// Cleaving axe calculator - green woodworking splitting tools

export type CleavingAxeType =
  | "kent_pattern_broad"
  | "racing_axe_light"
  | "side_axe_flat"
  | "splitting_maul_heavy"
  | "carving_hatchet_short";

const AXE_DATA: Record<
  CleavingAxeType,
  {
    splitControl: number;
    edgeKeep: number;
    weightBalance: number;
    handleFeel: number;
    cost: number;
    singleBevel: boolean;
    forSplitting: boolean;
    headWeight: string;
    bestUse: string;
  }
> = {
  kent_pattern_broad: {
    splitControl: 8,
    edgeKeep: 8,
    weightBalance: 8,
    handleFeel: 8,
    cost: 6,
    singleBevel: false,
    forSplitting: true,
    headWeight: "medium_3_lb",
    bestUse: "general_cleave_split",
  },
  racing_axe_light: {
    splitControl: 7,
    edgeKeep: 7,
    weightBalance: 9,
    handleFeel: 9,
    cost: 5,
    singleBevel: false,
    forSplitting: true,
    headWeight: "light_2_lb",
    bestUse: "fast_kindling_split",
  },
  side_axe_flat: {
    splitControl: 9,
    edgeKeep: 9,
    weightBalance: 7,
    handleFeel: 7,
    cost: 7,
    singleBevel: true,
    forSplitting: false,
    headWeight: "medium_3_lb",
    bestUse: "flat_face_hewing",
  },
  splitting_maul_heavy: {
    splitControl: 6,
    edgeKeep: 6,
    weightBalance: 6,
    handleFeel: 6,
    cost: 4,
    singleBevel: false,
    forSplitting: true,
    headWeight: "heavy_6_lb",
    bestUse: "large_round_split",
  },
  carving_hatchet_short: {
    splitControl: 8,
    edgeKeep: 9,
    weightBalance: 9,
    handleFeel: 10,
    cost: 7,
    singleBevel: true,
    forSplitting: false,
    headWeight: "light_1_lb",
    bestUse: "detail_shape_carve",
  },
};

export function splitControl(type: CleavingAxeType): number {
  return AXE_DATA[type].splitControl;
}
export function edgeKeep(type: CleavingAxeType): number {
  return AXE_DATA[type].edgeKeep;
}
export function weightBalance(type: CleavingAxeType): number {
  return AXE_DATA[type].weightBalance;
}
export function handleFeel(type: CleavingAxeType): number {
  return AXE_DATA[type].handleFeel;
}
export function axeCost(type: CleavingAxeType): number {
  return AXE_DATA[type].cost;
}
export function singleBevel(type: CleavingAxeType): boolean {
  return AXE_DATA[type].singleBevel;
}
export function forSplitting(type: CleavingAxeType): boolean {
  return AXE_DATA[type].forSplitting;
}
export function headWeight(type: CleavingAxeType): string {
  return AXE_DATA[type].headWeight;
}
export function bestUse(type: CleavingAxeType): string {
  return AXE_DATA[type].bestUse;
}
export function cleavingAxes(): CleavingAxeType[] {
  return Object.keys(AXE_DATA) as CleavingAxeType[];
}
