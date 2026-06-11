// Croze plane calculator - coopering groove cutting tools

export type CrozePlaneType =
  | "fixed_cutter_standard"
  | "adjustable_fence_set"
  | "wet_barrel_heavy"
  | "dry_barrel_light"
  | "router_style_modern";

const CROZE_DATA: Record<
  CrozePlaneType,
  {
    grooveClean: number;
    depthConsist: number;
    setupSpeed: number;
    barrelRange: number;
    cost: number;
    adjustable: boolean;
    forWet: boolean;
    cutterStyle: string;
    bestUse: string;
  }
> = {
  fixed_cutter_standard: {
    grooveClean: 8,
    depthConsist: 8,
    setupSpeed: 8,
    barrelRange: 6,
    cost: 5,
    adjustable: false,
    forWet: false,
    cutterStyle: "fixed_blade_set",
    bestUse: "standard_barrel_groove",
  },
  adjustable_fence_set: {
    grooveClean: 9,
    depthConsist: 9,
    setupSpeed: 6,
    barrelRange: 10,
    cost: 7,
    adjustable: true,
    forWet: false,
    cutterStyle: "sliding_fence_blade",
    bestUse: "multi_size_barrel",
  },
  wet_barrel_heavy: {
    grooveClean: 7,
    depthConsist: 8,
    setupSpeed: 7,
    barrelRange: 7,
    cost: 6,
    adjustable: false,
    forWet: true,
    cutterStyle: "heavy_wet_blade",
    bestUse: "wine_barrel_groove",
  },
  dry_barrel_light: {
    grooveClean: 9,
    depthConsist: 8,
    setupSpeed: 9,
    barrelRange: 6,
    cost: 4,
    adjustable: false,
    forWet: false,
    cutterStyle: "light_dry_blade",
    bestUse: "dry_cask_groove",
  },
  router_style_modern: {
    grooveClean: 10,
    depthConsist: 10,
    setupSpeed: 7,
    barrelRange: 8,
    cost: 8,
    adjustable: true,
    forWet: false,
    cutterStyle: "router_bit_head",
    bestUse: "precision_tight_groove",
  },
};

export function grooveClean(type: CrozePlaneType): number {
  return CROZE_DATA[type].grooveClean;
}
export function depthConsist(type: CrozePlaneType): number {
  return CROZE_DATA[type].depthConsist;
}
export function setupSpeed(type: CrozePlaneType): number {
  return CROZE_DATA[type].setupSpeed;
}
export function barrelRange(type: CrozePlaneType): number {
  return CROZE_DATA[type].barrelRange;
}
export function crozeCost(type: CrozePlaneType): number {
  return CROZE_DATA[type].cost;
}
export function adjustable(type: CrozePlaneType): boolean {
  return CROZE_DATA[type].adjustable;
}
export function forWet(type: CrozePlaneType): boolean {
  return CROZE_DATA[type].forWet;
}
export function cutterStyle(type: CrozePlaneType): string {
  return CROZE_DATA[type].cutterStyle;
}
export function bestUse(type: CrozePlaneType): string {
  return CROZE_DATA[type].bestUse;
}
export function crozePlanes(): CrozePlaneType[] {
  return Object.keys(CROZE_DATA) as CrozePlaneType[];
}
