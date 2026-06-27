// Croze tool calculator - cooperage groove-cutting tools for barrel heads

export type CrozeToolType =
  | "fixed_depth_standard"
  | "adjustable_fence_set"
  | "wet_barrel_wide"
  | "dry_barrel_tight"
  | "combination_multi_size";

const CROZE_DATA: Record<
  CrozeToolType,
  {
    grooveClean: number;
    depthConsist: number;
    setupSpeed: number;
    sizeRange: number;
    cost: number;
    adjustable: boolean;
    forWetBarrel: boolean;
    cutterShape: string;
    bestUse: string;
  }
> = {
  fixed_depth_standard: {
    grooveClean: 8,
    depthConsist: 9,
    setupSpeed: 9,
    sizeRange: 4,
    cost: 4,
    adjustable: false,
    forWetBarrel: false,
    cutterShape: "single_blade_fixed",
    bestUse: "standard_barrel_groove",
  },
  adjustable_fence_set: {
    grooveClean: 8,
    depthConsist: 8,
    setupSpeed: 6,
    sizeRange: 10,
    cost: 7,
    adjustable: true,
    forWetBarrel: false,
    cutterShape: "movable_blade_rail",
    bestUse: "variable_size_groove",
  },
  wet_barrel_wide: {
    grooveClean: 7,
    depthConsist: 7,
    setupSpeed: 8,
    sizeRange: 6,
    cost: 5,
    adjustable: false,
    forWetBarrel: true,
    cutterShape: "wide_groove_scoop",
    bestUse: "liquid_barrel_seal",
  },
  dry_barrel_tight: {
    grooveClean: 9,
    depthConsist: 9,
    setupSpeed: 7,
    sizeRange: 5,
    cost: 5,
    adjustable: false,
    forWetBarrel: false,
    cutterShape: "narrow_tight_cut",
    bestUse: "dry_goods_barrel",
  },
  combination_multi_size: {
    grooveClean: 7,
    depthConsist: 7,
    setupSpeed: 5,
    sizeRange: 9,
    cost: 8,
    adjustable: true,
    forWetBarrel: true,
    cutterShape: "swap_blade_set",
    bestUse: "all_barrel_types",
  },
};

export function grooveClean(type: CrozeToolType): number {
  return CROZE_DATA[type].grooveClean;
}
export function depthConsist(type: CrozeToolType): number {
  return CROZE_DATA[type].depthConsist;
}
export function setupSpeed(type: CrozeToolType): number {
  return CROZE_DATA[type].setupSpeed;
}
export function sizeRange(type: CrozeToolType): number {
  return CROZE_DATA[type].sizeRange;
}
export function crozeCost(type: CrozeToolType): number {
  return CROZE_DATA[type].cost;
}
export function adjustable(type: CrozeToolType): boolean {
  return CROZE_DATA[type].adjustable;
}
export function forWetBarrel(type: CrozeToolType): boolean {
  return CROZE_DATA[type].forWetBarrel;
}
export function cutterShape(type: CrozeToolType): string {
  return CROZE_DATA[type].cutterShape;
}
export function bestUse(type: CrozeToolType): string {
  return CROZE_DATA[type].bestUse;
}
export function crozeTools(): CrozeToolType[] {
  return Object.keys(CROZE_DATA) as CrozeToolType[];
}
