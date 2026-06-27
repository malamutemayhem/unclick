// Corner chisel timber calculator - timber framing corner chisel tools

export type CornerChiselTimberType =
  | "right_angle_standard"
  | "obtuse_angle_wide"
  | "acute_angle_tight"
  | "adjustable_angle_set"
  | "heavy_timber_large";

const CHISEL_DATA: Record<
  CornerChiselTimberType,
  {
    cornerClean: number;
    depthReach: number;
    controlHit: number;
    edgeKeep: number;
    cost: number;
    adjustable: boolean;
    forHeavy: boolean;
    angleType: string;
    bestUse: string;
  }
> = {
  right_angle_standard: {
    cornerClean: 9,
    depthReach: 7,
    controlHit: 8,
    edgeKeep: 8,
    cost: 4,
    adjustable: false,
    forHeavy: false,
    angleType: "fixed_90_degree",
    bestUse: "standard_mortise_corner",
  },
  obtuse_angle_wide: {
    cornerClean: 8,
    depthReach: 7,
    controlHit: 7,
    edgeKeep: 7,
    cost: 5,
    adjustable: false,
    forHeavy: false,
    angleType: "fixed_120_degree",
    bestUse: "dovetail_corner_clean",
  },
  acute_angle_tight: {
    cornerClean: 8,
    depthReach: 6,
    controlHit: 7,
    edgeKeep: 7,
    cost: 5,
    adjustable: false,
    forHeavy: false,
    angleType: "fixed_60_degree",
    bestUse: "tight_joint_corner",
  },
  adjustable_angle_set: {
    cornerClean: 7,
    depthReach: 7,
    controlHit: 7,
    edgeKeep: 6,
    cost: 8,
    adjustable: true,
    forHeavy: false,
    angleType: "variable_angle_set",
    bestUse: "multi_angle_work",
  },
  heavy_timber_large: {
    cornerClean: 10,
    depthReach: 9,
    controlHit: 8,
    edgeKeep: 9,
    cost: 7,
    adjustable: false,
    forHeavy: true,
    angleType: "large_90_heavy",
    bestUse: "heavy_timber_mortise",
  },
};

export function cornerClean(type: CornerChiselTimberType): number {
  return CHISEL_DATA[type].cornerClean;
}
export function depthReach(type: CornerChiselTimberType): number {
  return CHISEL_DATA[type].depthReach;
}
export function controlHit(type: CornerChiselTimberType): number {
  return CHISEL_DATA[type].controlHit;
}
export function edgeKeep(type: CornerChiselTimberType): number {
  return CHISEL_DATA[type].edgeKeep;
}
export function chiselCost(type: CornerChiselTimberType): number {
  return CHISEL_DATA[type].cost;
}
export function adjustable(type: CornerChiselTimberType): boolean {
  return CHISEL_DATA[type].adjustable;
}
export function forHeavy(type: CornerChiselTimberType): boolean {
  return CHISEL_DATA[type].forHeavy;
}
export function angleType(type: CornerChiselTimberType): string {
  return CHISEL_DATA[type].angleType;
}
export function bestUse(type: CornerChiselTimberType): string {
  return CHISEL_DATA[type].bestUse;
}
export function cornerChiselTimbers(): CornerChiselTimberType[] {
  return Object.keys(CHISEL_DATA) as CornerChiselTimberType[];
}
