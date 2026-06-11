// Lewis pin calculator - stone lifting lewis pin tools

export type LewisPinType =
  | "three_piece_standard"
  | "two_piece_simple"
  | "expanding_bolt_modern"
  | "chain_lewis_heavy"
  | "scissor_grip_clamp";

const LEWIS_DATA: Record<
  LewisPinType,
  {
    liftCapacity: number;
    gripSecure: number;
    setupSpeed: number;
    stoneRange: number;
    cost: number;
    reusable: boolean;
    forHeavy: boolean;
    gripMethod: string;
    bestUse: string;
  }
> = {
  three_piece_standard: {
    liftCapacity: 9,
    gripSecure: 9,
    setupSpeed: 6,
    stoneRange: 8,
    cost: 6,
    reusable: true,
    forHeavy: true,
    gripMethod: "tapered_wedge_grip",
    bestUse: "general_block_lift",
  },
  two_piece_simple: {
    liftCapacity: 7,
    gripSecure: 7,
    setupSpeed: 8,
    stoneRange: 6,
    cost: 4,
    reusable: true,
    forHeavy: false,
    gripMethod: "split_wedge_pair",
    bestUse: "light_stone_lift",
  },
  expanding_bolt_modern: {
    liftCapacity: 8,
    gripSecure: 9,
    setupSpeed: 9,
    stoneRange: 7,
    cost: 7,
    reusable: true,
    forHeavy: false,
    gripMethod: "expanding_anchor",
    bestUse: "modern_install_lift",
  },
  chain_lewis_heavy: {
    liftCapacity: 10,
    gripSecure: 8,
    setupSpeed: 5,
    stoneRange: 9,
    cost: 8,
    reusable: true,
    forHeavy: true,
    gripMethod: "chain_link_hold",
    bestUse: "heavy_quarry_lift",
  },
  scissor_grip_clamp: {
    liftCapacity: 7,
    gripSecure: 8,
    setupSpeed: 10,
    stoneRange: 6,
    cost: 5,
    reusable: true,
    forHeavy: false,
    gripMethod: "scissor_clamp_grip",
    bestUse: "quick_slab_lift",
  },
};

export function liftCapacity(type: LewisPinType): number {
  return LEWIS_DATA[type].liftCapacity;
}
export function gripSecure(type: LewisPinType): number {
  return LEWIS_DATA[type].gripSecure;
}
export function setupSpeed(type: LewisPinType): number {
  return LEWIS_DATA[type].setupSpeed;
}
export function stoneRange(type: LewisPinType): number {
  return LEWIS_DATA[type].stoneRange;
}
export function lewisCost(type: LewisPinType): number {
  return LEWIS_DATA[type].cost;
}
export function reusable(type: LewisPinType): boolean {
  return LEWIS_DATA[type].reusable;
}
export function forHeavy(type: LewisPinType): boolean {
  return LEWIS_DATA[type].forHeavy;
}
export function gripMethod(type: LewisPinType): string {
  return LEWIS_DATA[type].gripMethod;
}
export function bestUse(type: LewisPinType): string {
  return LEWIS_DATA[type].bestUse;
}
export function lewisPins(): LewisPinType[] {
  return Object.keys(LEWIS_DATA) as LewisPinType[];
}
