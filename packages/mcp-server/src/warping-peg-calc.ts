// Warping peg calculator - weaving warp measuring tools

export type WarpingPegType =
  | "single_clamp_peg"
  | "double_post_pair"
  | "warping_board_frame"
  | "warping_mill_rotary"
  | "paddle_cross_guide";

const WARPING_DATA: Record<
  WarpingPegType,
  {
    tensionConsist: number;
    lengthAccuracy: number;
    setupSpeed: number;
    warpCapacity: number;
    cost: number;
    freestanding: boolean;
    forLongWarp: boolean;
    mountStyle: string;
    bestUse: string;
  }
> = {
  single_clamp_peg: {
    tensionConsist: 6,
    lengthAccuracy: 7,
    setupSpeed: 9,
    warpCapacity: 4,
    cost: 2,
    freestanding: false,
    forLongWarp: false,
    mountStyle: "table_clamp_single",
    bestUse: "short_sample_warp",
  },
  double_post_pair: {
    tensionConsist: 7,
    lengthAccuracy: 8,
    setupSpeed: 8,
    warpCapacity: 5,
    cost: 3,
    freestanding: false,
    forLongWarp: false,
    mountStyle: "table_clamp_double",
    bestUse: "cross_thread_warp",
  },
  warping_board_frame: {
    tensionConsist: 8,
    lengthAccuracy: 9,
    setupSpeed: 7,
    warpCapacity: 7,
    cost: 5,
    freestanding: false,
    forLongWarp: false,
    mountStyle: "wall_mount_frame",
    bestUse: "medium_length_warp",
  },
  warping_mill_rotary: {
    tensionConsist: 9,
    lengthAccuracy: 9,
    setupSpeed: 6,
    warpCapacity: 10,
    cost: 8,
    freestanding: true,
    forLongWarp: true,
    mountStyle: "floor_stand_rotary",
    bestUse: "long_production_warp",
  },
  paddle_cross_guide: {
    tensionConsist: 8,
    lengthAccuracy: 8,
    setupSpeed: 8,
    warpCapacity: 8,
    cost: 4,
    freestanding: false,
    forLongWarp: false,
    mountStyle: "hand_held_paddle",
    bestUse: "multi_end_cross_warp",
  },
};

export function tensionConsist(type: WarpingPegType): number {
  return WARPING_DATA[type].tensionConsist;
}
export function lengthAccuracy(type: WarpingPegType): number {
  return WARPING_DATA[type].lengthAccuracy;
}
export function setupSpeed(type: WarpingPegType): number {
  return WARPING_DATA[type].setupSpeed;
}
export function warpCapacity(type: WarpingPegType): number {
  return WARPING_DATA[type].warpCapacity;
}
export function warpingCost(type: WarpingPegType): number {
  return WARPING_DATA[type].cost;
}
export function freestanding(type: WarpingPegType): boolean {
  return WARPING_DATA[type].freestanding;
}
export function forLongWarp(type: WarpingPegType): boolean {
  return WARPING_DATA[type].forLongWarp;
}
export function mountStyle(type: WarpingPegType): string {
  return WARPING_DATA[type].mountStyle;
}
export function bestUse(type: WarpingPegType): string {
  return WARPING_DATA[type].bestUse;
}
export function warpingPegs(): WarpingPegType[] {
  return Object.keys(WARPING_DATA) as WarpingPegType[];
}
