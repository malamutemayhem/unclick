// Scorp spoon calculator - green woodworking spoon carving tools

export type ScorpSpoonType =
  | "tight_curve_small"
  | "open_sweep_large"
  | "right_hand_hook"
  | "left_hand_hook"
  | "double_edge_tweezer";

const SCORP_DATA: Record<
  ScorpSpoonType,
  {
    hollowDepth: number;
    surfaceSmooth: number;
    controlPull: number;
    curveRange: number;
    cost: number;
    doubleEdge: boolean;
    forDeep: boolean;
    sweepRadius: string;
    bestUse: string;
  }
> = {
  tight_curve_small: {
    hollowDepth: 9,
    surfaceSmooth: 7,
    controlPull: 8,
    curveRange: 5,
    cost: 5,
    doubleEdge: false,
    forDeep: true,
    sweepRadius: "tight_15mm",
    bestUse: "deep_spoon_bowl",
  },
  open_sweep_large: {
    hollowDepth: 6,
    surfaceSmooth: 9,
    controlPull: 7,
    curveRange: 9,
    cost: 6,
    doubleEdge: false,
    forDeep: false,
    sweepRadius: "open_40mm",
    bestUse: "wide_bowl_hollow",
  },
  right_hand_hook: {
    hollowDepth: 8,
    surfaceSmooth: 8,
    controlPull: 9,
    curveRange: 7,
    cost: 5,
    doubleEdge: false,
    forDeep: true,
    sweepRadius: "medium_25mm",
    bestUse: "right_pull_carve",
  },
  left_hand_hook: {
    hollowDepth: 8,
    surfaceSmooth: 8,
    controlPull: 9,
    curveRange: 7,
    cost: 5,
    doubleEdge: false,
    forDeep: true,
    sweepRadius: "medium_25mm",
    bestUse: "left_pull_carve",
  },
  double_edge_tweezer: {
    hollowDepth: 7,
    surfaceSmooth: 8,
    controlPull: 7,
    curveRange: 8,
    cost: 7,
    doubleEdge: true,
    forDeep: false,
    sweepRadius: "variable_20mm",
    bestUse: "ambidextrous_hollow",
  },
};

export function hollowDepth(type: ScorpSpoonType): number {
  return SCORP_DATA[type].hollowDepth;
}
export function surfaceSmooth(type: ScorpSpoonType): number {
  return SCORP_DATA[type].surfaceSmooth;
}
export function controlPull(type: ScorpSpoonType): number {
  return SCORP_DATA[type].controlPull;
}
export function curveRange(type: ScorpSpoonType): number {
  return SCORP_DATA[type].curveRange;
}
export function scorpCost(type: ScorpSpoonType): number {
  return SCORP_DATA[type].cost;
}
export function doubleEdge(type: ScorpSpoonType): boolean {
  return SCORP_DATA[type].doubleEdge;
}
export function forDeep(type: ScorpSpoonType): boolean {
  return SCORP_DATA[type].forDeep;
}
export function sweepRadius(type: ScorpSpoonType): string {
  return SCORP_DATA[type].sweepRadius;
}
export function bestUse(type: ScorpSpoonType): string {
  return SCORP_DATA[type].bestUse;
}
export function scorpSpoons(): ScorpSpoonType[] {
  return Object.keys(SCORP_DATA) as ScorpSpoonType[];
}
