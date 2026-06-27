// Leggett calculator - thatching needle/spar pushing tools

export type LeggettType =
  | "straight_push_standard"
  | "cranked_angle_reach"
  | "double_prong_fork"
  | "spiral_twist_grip"
  | "lightweight_alloy_fast";

const LEGGETT_DATA: Record<
  LeggettType,
  {
    pushForce: number;
    reachDepth: number;
    sparGrip: number;
    speedWork: number;
    cost: number;
    cranked: boolean;
    forLongStraw: boolean;
    prongStyle: string;
    bestUse: string;
  }
> = {
  straight_push_standard: {
    pushForce: 8,
    reachDepth: 7,
    sparGrip: 7,
    speedWork: 8,
    cost: 4,
    cranked: false,
    forLongStraw: false,
    prongStyle: "single_straight_tine",
    bestUse: "general_spar_push",
  },
  cranked_angle_reach: {
    pushForce: 7,
    reachDepth: 10,
    sparGrip: 7,
    speedWork: 7,
    cost: 5,
    cranked: true,
    forLongStraw: true,
    prongStyle: "angled_offset_tine",
    bestUse: "deep_coat_reach",
  },
  double_prong_fork: {
    pushForce: 9,
    reachDepth: 7,
    sparGrip: 9,
    speedWork: 7,
    cost: 5,
    cranked: false,
    forLongStraw: false,
    prongStyle: "twin_fork_spread",
    bestUse: "thick_bundle_hold",
  },
  spiral_twist_grip: {
    pushForce: 7,
    reachDepth: 8,
    sparGrip: 10,
    speedWork: 6,
    cost: 6,
    cranked: false,
    forLongStraw: true,
    prongStyle: "spiral_barb_twist",
    bestUse: "secure_spar_lock",
  },
  lightweight_alloy_fast: {
    pushForce: 6,
    reachDepth: 7,
    sparGrip: 6,
    speedWork: 10,
    cost: 7,
    cranked: false,
    forLongStraw: false,
    prongStyle: "slim_alloy_point",
    bestUse: "rapid_repair_work",
  },
};

export function pushForce(type: LeggettType): number {
  return LEGGETT_DATA[type].pushForce;
}
export function reachDepth(type: LeggettType): number {
  return LEGGETT_DATA[type].reachDepth;
}
export function sparGrip(type: LeggettType): number {
  return LEGGETT_DATA[type].sparGrip;
}
export function speedWork(type: LeggettType): number {
  return LEGGETT_DATA[type].speedWork;
}
export function leggettCost(type: LeggettType): number {
  return LEGGETT_DATA[type].cost;
}
export function cranked(type: LeggettType): boolean {
  return LEGGETT_DATA[type].cranked;
}
export function forLongStraw(type: LeggettType): boolean {
  return LEGGETT_DATA[type].forLongStraw;
}
export function prongStyle(type: LeggettType): string {
  return LEGGETT_DATA[type].prongStyle;
}
export function bestUse(type: LeggettType): string {
  return LEGGETT_DATA[type].bestUse;
}
export function leggetts(): LeggettType[] {
  return Object.keys(LEGGETT_DATA) as LeggettType[];
}
