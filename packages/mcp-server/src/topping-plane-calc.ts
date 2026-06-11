// Topping plane calculator - coopering barrel leveling tools

export type ToppingPlaneType =
  | "standard_flat_top"
  | "angled_chime_bevel"
  | "compass_round_follow"
  | "adjustable_depth_set"
  | "combination_level_check";

const PLANE_DATA: Record<
  ToppingPlaneType,
  {
    levelFlat: number;
    chimeBevel: number;
    setupSpeed: number;
    barrelRange: number;
    cost: number;
    adjustable: boolean;
    forChime: boolean;
    soleShape: string;
    bestUse: string;
  }
> = {
  standard_flat_top: {
    levelFlat: 9,
    chimeBevel: 5,
    setupSpeed: 8,
    barrelRange: 7,
    cost: 4,
    adjustable: false,
    forChime: false,
    soleShape: "flat_wide_sole",
    bestUse: "basic_barrel_level",
  },
  angled_chime_bevel: {
    levelFlat: 7,
    chimeBevel: 10,
    setupSpeed: 7,
    barrelRange: 6,
    cost: 6,
    adjustable: false,
    forChime: true,
    soleShape: "angled_bevel_sole",
    bestUse: "chime_edge_bevel",
  },
  compass_round_follow: {
    levelFlat: 8,
    chimeBevel: 7,
    setupSpeed: 6,
    barrelRange: 9,
    cost: 7,
    adjustable: false,
    forChime: false,
    soleShape: "curved_compass_sole",
    bestUse: "curved_head_level",
  },
  adjustable_depth_set: {
    levelFlat: 9,
    chimeBevel: 8,
    setupSpeed: 6,
    barrelRange: 10,
    cost: 8,
    adjustable: true,
    forChime: false,
    soleShape: "adjustable_sole",
    bestUse: "multi_depth_level",
  },
  combination_level_check: {
    levelFlat: 10,
    chimeBevel: 6,
    setupSpeed: 5,
    barrelRange: 8,
    cost: 9,
    adjustable: true,
    forChime: false,
    soleShape: "level_check_sole",
    bestUse: "precision_head_flat",
  },
};

export function levelFlat(type: ToppingPlaneType): number {
  return PLANE_DATA[type].levelFlat;
}
export function chimeBevel(type: ToppingPlaneType): number {
  return PLANE_DATA[type].chimeBevel;
}
export function setupSpeed(type: ToppingPlaneType): number {
  return PLANE_DATA[type].setupSpeed;
}
export function barrelRange(type: ToppingPlaneType): number {
  return PLANE_DATA[type].barrelRange;
}
export function planeCost(type: ToppingPlaneType): number {
  return PLANE_DATA[type].cost;
}
export function adjustable(type: ToppingPlaneType): boolean {
  return PLANE_DATA[type].adjustable;
}
export function forChime(type: ToppingPlaneType): boolean {
  return PLANE_DATA[type].forChime;
}
export function soleShape(type: ToppingPlaneType): string {
  return PLANE_DATA[type].soleShape;
}
export function bestUse(type: ToppingPlaneType): string {
  return PLANE_DATA[type].bestUse;
}
export function toppingPlanes(): ToppingPlaneType[] {
  return Object.keys(PLANE_DATA) as ToppingPlaneType[];
}
