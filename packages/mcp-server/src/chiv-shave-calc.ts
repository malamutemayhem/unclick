// Chiv shave calculator - coopering inside shaving tools

export type ChivShaveType =
  | "round_pull_standard"
  | "flat_push_inside"
  | "swift_long_reach"
  | "buzz_short_quick"
  | "inshave_deep_scoop";

const CHIV_DATA: Record<
  ChivShaveType,
  {
    surfaceSmooth: number;
    reachDepth: number;
    controlPull: number;
    shaveSpeed: number;
    cost: number;
    pushCut: boolean;
    forDeep: boolean;
    bladeArc: string;
    bestUse: string;
  }
> = {
  round_pull_standard: {
    surfaceSmooth: 8,
    reachDepth: 7,
    controlPull: 8,
    shaveSpeed: 7,
    cost: 5,
    pushCut: false,
    forDeep: false,
    bladeArc: "medium_curve_arc",
    bestUse: "general_inside_shave",
  },
  flat_push_inside: {
    surfaceSmooth: 9,
    reachDepth: 6,
    controlPull: 7,
    shaveSpeed: 8,
    cost: 5,
    pushCut: true,
    forDeep: false,
    bladeArc: "shallow_flat_arc",
    bestUse: "finish_smooth_inside",
  },
  swift_long_reach: {
    surfaceSmooth: 7,
    reachDepth: 10,
    controlPull: 7,
    shaveSpeed: 8,
    cost: 6,
    pushCut: false,
    forDeep: true,
    bladeArc: "long_reach_arc",
    bestUse: "deep_barrel_inside",
  },
  buzz_short_quick: {
    surfaceSmooth: 7,
    reachDepth: 5,
    controlPull: 9,
    shaveSpeed: 10,
    cost: 4,
    pushCut: false,
    forDeep: false,
    bladeArc: "short_tight_arc",
    bestUse: "quick_rough_inside",
  },
  inshave_deep_scoop: {
    surfaceSmooth: 8,
    reachDepth: 9,
    controlPull: 8,
    shaveSpeed: 6,
    cost: 7,
    pushCut: false,
    forDeep: true,
    bladeArc: "deep_scoop_arc",
    bestUse: "hollow_bilge_shave",
  },
};

export function surfaceSmooth(type: ChivShaveType): number {
  return CHIV_DATA[type].surfaceSmooth;
}
export function reachDepth(type: ChivShaveType): number {
  return CHIV_DATA[type].reachDepth;
}
export function controlPull(type: ChivShaveType): number {
  return CHIV_DATA[type].controlPull;
}
export function shaveSpeed(type: ChivShaveType): number {
  return CHIV_DATA[type].shaveSpeed;
}
export function chivCost(type: ChivShaveType): number {
  return CHIV_DATA[type].cost;
}
export function pushCut(type: ChivShaveType): boolean {
  return CHIV_DATA[type].pushCut;
}
export function forDeep(type: ChivShaveType): boolean {
  return CHIV_DATA[type].forDeep;
}
export function bladeArc(type: ChivShaveType): string {
  return CHIV_DATA[type].bladeArc;
}
export function bestUse(type: ChivShaveType): string {
  return CHIV_DATA[type].bestUse;
}
export function chivShaves(): ChivShaveType[] {
  return Object.keys(CHIV_DATA) as ChivShaveType[];
}
