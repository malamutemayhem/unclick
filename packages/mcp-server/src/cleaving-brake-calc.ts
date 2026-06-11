// Cleaving brake calculator - basket weaving splitting/cleaving tools

export type CleavingBrakeType =
  | "three_way_splitter"
  | "four_way_quarter"
  | "flat_shave_horse"
  | "spring_clamp_hold"
  | "adjustable_fence_guide";

const CLEAVING_DATA: Record<
  CleavingBrakeType,
  {
    splitEven: number;
    speedCleave: number;
    controlGuide: number;
    materialRange: number;
    cost: number;
    adjustable: boolean;
    forRound: boolean;
    clampStyle: string;
    bestUse: string;
  }
> = {
  three_way_splitter: {
    splitEven: 9,
    speedCleave: 8,
    controlGuide: 7,
    materialRange: 6,
    cost: 4,
    adjustable: false,
    forRound: true,
    clampStyle: "tri_blade_center",
    bestUse: "round_rod_thirds",
  },
  four_way_quarter: {
    splitEven: 8,
    speedCleave: 8,
    controlGuide: 7,
    materialRange: 5,
    cost: 4,
    adjustable: false,
    forRound: true,
    clampStyle: "quad_blade_cross",
    bestUse: "round_rod_quarters",
  },
  flat_shave_horse: {
    splitEven: 7,
    speedCleave: 6,
    controlGuide: 9,
    materialRange: 8,
    cost: 7,
    adjustable: false,
    forRound: false,
    clampStyle: "foot_pedal_clamp",
    bestUse: "long_splint_shave",
  },
  spring_clamp_hold: {
    splitEven: 6,
    speedCleave: 7,
    controlGuide: 8,
    materialRange: 7,
    cost: 3,
    adjustable: false,
    forRound: false,
    clampStyle: "spring_jaw_grip",
    bestUse: "hold_while_split",
  },
  adjustable_fence_guide: {
    splitEven: 10,
    speedCleave: 7,
    controlGuide: 10,
    materialRange: 9,
    cost: 6,
    adjustable: true,
    forRound: false,
    clampStyle: "sliding_fence_rail",
    bestUse: "precise_width_split",
  },
};

export function splitEven(type: CleavingBrakeType): number {
  return CLEAVING_DATA[type].splitEven;
}
export function speedCleave(type: CleavingBrakeType): number {
  return CLEAVING_DATA[type].speedCleave;
}
export function controlGuide(type: CleavingBrakeType): number {
  return CLEAVING_DATA[type].controlGuide;
}
export function materialRange(type: CleavingBrakeType): number {
  return CLEAVING_DATA[type].materialRange;
}
export function brakeCost(type: CleavingBrakeType): number {
  return CLEAVING_DATA[type].cost;
}
export function adjustable(type: CleavingBrakeType): boolean {
  return CLEAVING_DATA[type].adjustable;
}
export function forRound(type: CleavingBrakeType): boolean {
  return CLEAVING_DATA[type].forRound;
}
export function clampStyle(type: CleavingBrakeType): string {
  return CLEAVING_DATA[type].clampStyle;
}
export function bestUse(type: CleavingBrakeType): string {
  return CLEAVING_DATA[type].bestUse;
}
export function cleavingBrakes(): CleavingBrakeType[] {
  return Object.keys(CLEAVING_DATA) as CleavingBrakeType[];
}
