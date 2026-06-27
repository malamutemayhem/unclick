// Scratch stock calculator - decorative groove scratch tools

export type ScratchStockType =
  | "wooden_fence_holder"
  | "metal_body_adjust"
  | "combination_plane_set"
  | "shop_made_simple"
  | "beading_tool_profile";

const STOCK_DATA: Record<
  ScratchStockType,
  {
    grooveClean: number;
    profileAccuracy: number;
    setupSpeed: number;
    bladeRange: number;
    cost: number;
    adjustable: boolean;
    forBead: boolean;
    bodyStyle: string;
    bestUse: string;
  }
> = {
  wooden_fence_holder: {
    grooveClean: 7,
    profileAccuracy: 7,
    setupSpeed: 8,
    bladeRange: 6,
    cost: 3,
    adjustable: false,
    forBead: false,
    bodyStyle: "wood_fence_clamp",
    bestUse: "simple_line_groove",
  },
  metal_body_adjust: {
    grooveClean: 9,
    profileAccuracy: 9,
    setupSpeed: 7,
    bladeRange: 8,
    cost: 6,
    adjustable: true,
    forBead: false,
    bodyStyle: "metal_adjust_fence",
    bestUse: "precision_inlay_groove",
  },
  combination_plane_set: {
    grooveClean: 9,
    profileAccuracy: 10,
    setupSpeed: 5,
    bladeRange: 10,
    cost: 8,
    adjustable: true,
    forBead: true,
    bodyStyle: "plane_body_multi",
    bestUse: "multi_profile_mold",
  },
  shop_made_simple: {
    grooveClean: 6,
    profileAccuracy: 6,
    setupSpeed: 9,
    bladeRange: 4,
    cost: 1,
    adjustable: false,
    forBead: false,
    bodyStyle: "wood_block_slot",
    bestUse: "quick_string_line",
  },
  beading_tool_profile: {
    grooveClean: 8,
    profileAccuracy: 8,
    setupSpeed: 7,
    bladeRange: 5,
    cost: 4,
    adjustable: false,
    forBead: true,
    bodyStyle: "handle_profile_blade",
    bestUse: "bead_edge_detail",
  },
};

export function grooveClean(type: ScratchStockType): number {
  return STOCK_DATA[type].grooveClean;
}
export function profileAccuracy(type: ScratchStockType): number {
  return STOCK_DATA[type].profileAccuracy;
}
export function setupSpeed(type: ScratchStockType): number {
  return STOCK_DATA[type].setupSpeed;
}
export function bladeRange(type: ScratchStockType): number {
  return STOCK_DATA[type].bladeRange;
}
export function stockCost(type: ScratchStockType): number {
  return STOCK_DATA[type].cost;
}
export function adjustable(type: ScratchStockType): boolean {
  return STOCK_DATA[type].adjustable;
}
export function forBead(type: ScratchStockType): boolean {
  return STOCK_DATA[type].forBead;
}
export function bodyStyle(type: ScratchStockType): string {
  return STOCK_DATA[type].bodyStyle;
}
export function bestUse(type: ScratchStockType): string {
  return STOCK_DATA[type].bestUse;
}
export function scratchStocks(): ScratchStockType[] {
  return Object.keys(STOCK_DATA) as ScratchStockType[];
}
