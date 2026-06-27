// Howel plane calculator - cooperage inside-chamfer planes

export type HowelPlaneType =
  | "round_sole_standard"
  | "flat_sole_finish"
  | "adjustable_mouth_set"
  | "scrub_rough_fast"
  | "sun_plane_outside";

const HOWEL_DATA: Record<
  HowelPlaneType,
  {
    chamferSmooth: number;
    cutSpeed: number;
    radiusMatch: number;
    adjustRange: number;
    cost: number;
    adjustable: boolean;
    forInside: boolean;
    soleShape: string;
    bestUse: string;
  }
> = {
  round_sole_standard: {
    chamferSmooth: 8,
    cutSpeed: 7,
    radiusMatch: 9,
    adjustRange: 5,
    cost: 5,
    adjustable: false,
    forInside: true,
    soleShape: "curved_round_sole",
    bestUse: "inside_head_chamfer",
  },
  flat_sole_finish: {
    chamferSmooth: 9,
    cutSpeed: 6,
    radiusMatch: 5,
    adjustRange: 4,
    cost: 4,
    adjustable: false,
    forInside: false,
    soleShape: "flat_smooth_sole",
    bestUse: "flat_surface_finish",
  },
  adjustable_mouth_set: {
    chamferSmooth: 8,
    cutSpeed: 7,
    radiusMatch: 8,
    adjustRange: 10,
    cost: 8,
    adjustable: true,
    forInside: true,
    soleShape: "variable_mouth_gap",
    bestUse: "multi_barrel_size",
  },
  scrub_rough_fast: {
    chamferSmooth: 5,
    cutSpeed: 10,
    radiusMatch: 6,
    adjustRange: 4,
    cost: 4,
    adjustable: false,
    forInside: true,
    soleShape: "cambered_rough_sole",
    bestUse: "quick_stock_remove",
  },
  sun_plane_outside: {
    chamferSmooth: 8,
    cutSpeed: 7,
    radiusMatch: 8,
    adjustRange: 5,
    cost: 6,
    adjustable: false,
    forInside: false,
    soleShape: "concave_outside_sole",
    bestUse: "outside_stave_round",
  },
};

export function chamferSmooth(type: HowelPlaneType): number {
  return HOWEL_DATA[type].chamferSmooth;
}
export function cutSpeed(type: HowelPlaneType): number {
  return HOWEL_DATA[type].cutSpeed;
}
export function radiusMatch(type: HowelPlaneType): number {
  return HOWEL_DATA[type].radiusMatch;
}
export function adjustRange(type: HowelPlaneType): number {
  return HOWEL_DATA[type].adjustRange;
}
export function howelCost(type: HowelPlaneType): number {
  return HOWEL_DATA[type].cost;
}
export function adjustable(type: HowelPlaneType): boolean {
  return HOWEL_DATA[type].adjustable;
}
export function forInside(type: HowelPlaneType): boolean {
  return HOWEL_DATA[type].forInside;
}
export function soleShape(type: HowelPlaneType): string {
  return HOWEL_DATA[type].soleShape;
}
export function bestUse(type: HowelPlaneType): string {
  return HOWEL_DATA[type].bestUse;
}
export function howelPlanes(): HowelPlaneType[] {
  return Object.keys(HOWEL_DATA) as HowelPlaneType[];
}
