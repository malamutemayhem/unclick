// Spar hook calculator - thatching spar-making/twisting tools

export type SparHookType =
  | "hand_twist_hook"
  | "bench_mount_clamp"
  | "spring_loaded_auto"
  | "adjustable_angle_set"
  | "portable_field_fold";

const SPAR_DATA: Record<
  SparHookType,
  {
    twistSpeed: number;
    sparConsist: number;
    gripSecure: number;
    portability: number;
    cost: number;
    mounted: boolean;
    forHazel: boolean;
    hookShape: string;
    bestUse: string;
  }
> = {
  hand_twist_hook: {
    twistSpeed: 7,
    sparConsist: 7,
    gripSecure: 8,
    portability: 10,
    cost: 2,
    mounted: false,
    forHazel: true,
    hookShape: "simple_j_hook",
    bestUse: "field_spar_twist",
  },
  bench_mount_clamp: {
    twistSpeed: 9,
    sparConsist: 10,
    gripSecure: 9,
    portability: 3,
    cost: 7,
    mounted: true,
    forHazel: true,
    hookShape: "clamped_lever_hook",
    bestUse: "batch_spar_produce",
  },
  spring_loaded_auto: {
    twistSpeed: 10,
    sparConsist: 8,
    gripSecure: 8,
    portability: 6,
    cost: 8,
    mounted: false,
    forHazel: false,
    hookShape: "spring_return_hook",
    bestUse: "rapid_spar_make",
  },
  adjustable_angle_set: {
    twistSpeed: 7,
    sparConsist: 9,
    gripSecure: 8,
    portability: 5,
    cost: 6,
    mounted: false,
    forHazel: true,
    hookShape: "angle_set_pivot",
    bestUse: "variable_wood_type",
  },
  portable_field_fold: {
    twistSpeed: 6,
    sparConsist: 6,
    gripSecure: 7,
    portability: 9,
    cost: 4,
    mounted: false,
    forHazel: false,
    hookShape: "folding_pocket_hook",
    bestUse: "onsite_repair_spar",
  },
};

export function twistSpeed(type: SparHookType): number {
  return SPAR_DATA[type].twistSpeed;
}
export function sparConsist(type: SparHookType): number {
  return SPAR_DATA[type].sparConsist;
}
export function gripSecure(type: SparHookType): number {
  return SPAR_DATA[type].gripSecure;
}
export function portability(type: SparHookType): number {
  return SPAR_DATA[type].portability;
}
export function sparCost(type: SparHookType): number {
  return SPAR_DATA[type].cost;
}
export function mounted(type: SparHookType): boolean {
  return SPAR_DATA[type].mounted;
}
export function forHazel(type: SparHookType): boolean {
  return SPAR_DATA[type].forHazel;
}
export function hookShape(type: SparHookType): string {
  return SPAR_DATA[type].hookShape;
}
export function bestUse(type: SparHookType): string {
  return SPAR_DATA[type].bestUse;
}
export function sparHooks(): SparHookType[] {
  return Object.keys(SPAR_DATA) as SparHookType[];
}
