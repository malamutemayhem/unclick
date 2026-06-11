// Raddle cross calculator - weaving warp spacing tools

export type RaddleCrossType =
  | "peg_raddle_wood"
  | "nail_raddle_board"
  | "adjustable_slot_metal"
  | "clamp_raddle_table"
  | "portable_fold_travel";

const RADDLE_DATA: Record<
  RaddleCrossType,
  {
    spacingEven: number;
    warpSafe: number;
    setupSpeed: number;
    densityRange: number;
    cost: number;
    adjustable: boolean;
    portable: boolean;
    pegStyle: string;
    bestUse: string;
  }
> = {
  peg_raddle_wood: {
    spacingEven: 8,
    warpSafe: 9,
    setupSpeed: 7,
    densityRange: 6,
    cost: 3,
    adjustable: false,
    portable: false,
    pegStyle: "round_wood_dowel",
    bestUse: "general_warp_spread",
  },
  nail_raddle_board: {
    spacingEven: 7,
    warpSafe: 6,
    setupSpeed: 8,
    densityRange: 5,
    cost: 2,
    adjustable: false,
    portable: false,
    pegStyle: "wire_nail_driven",
    bestUse: "quick_setup_spread",
  },
  adjustable_slot_metal: {
    spacingEven: 9,
    warpSafe: 8,
    setupSpeed: 6,
    densityRange: 10,
    cost: 7,
    adjustable: true,
    portable: false,
    pegStyle: "slide_slot_plate",
    bestUse: "variable_sett_weave",
  },
  clamp_raddle_table: {
    spacingEven: 8,
    warpSafe: 8,
    setupSpeed: 9,
    densityRange: 7,
    cost: 5,
    adjustable: false,
    portable: false,
    pegStyle: "clamp_mount_peg",
    bestUse: "table_loom_warp",
  },
  portable_fold_travel: {
    spacingEven: 7,
    warpSafe: 8,
    setupSpeed: 8,
    densityRange: 6,
    cost: 6,
    adjustable: true,
    portable: true,
    pegStyle: "fold_hinge_peg",
    bestUse: "workshop_travel_warp",
  },
};

export function spacingEven(type: RaddleCrossType): number {
  return RADDLE_DATA[type].spacingEven;
}
export function warpSafe(type: RaddleCrossType): number {
  return RADDLE_DATA[type].warpSafe;
}
export function setupSpeed(type: RaddleCrossType): number {
  return RADDLE_DATA[type].setupSpeed;
}
export function densityRange(type: RaddleCrossType): number {
  return RADDLE_DATA[type].densityRange;
}
export function raddleCost(type: RaddleCrossType): number {
  return RADDLE_DATA[type].cost;
}
export function adjustable(type: RaddleCrossType): boolean {
  return RADDLE_DATA[type].adjustable;
}
export function portable(type: RaddleCrossType): boolean {
  return RADDLE_DATA[type].portable;
}
export function pegStyle(type: RaddleCrossType): string {
  return RADDLE_DATA[type].pegStyle;
}
export function bestUse(type: RaddleCrossType): string {
  return RADDLE_DATA[type].bestUse;
}
export function raddleCrosses(): RaddleCrossType[] {
  return Object.keys(RADDLE_DATA) as RaddleCrossType[];
}
