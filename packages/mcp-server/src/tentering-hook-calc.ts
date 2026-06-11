// Tentering hook calculator - textile stretching/drying tools

export type TenteringHookType =
  | "pin_stenter_frame"
  | "clip_stenter_grip"
  | "hook_rail_slide"
  | "adjustable_width_bar"
  | "portable_stretch_clamp";

const TENTER_DATA: Record<
  TenteringHookType,
  {
    stretchEven: number;
    fabricSafe: number;
    widthRange: number;
    setupSpeed: number;
    cost: number;
    adjustable: boolean;
    forDelicate: boolean;
    gripType: string;
    bestUse: string;
  }
> = {
  pin_stenter_frame: {
    stretchEven: 9,
    fabricSafe: 7,
    widthRange: 8,
    setupSpeed: 6,
    cost: 6,
    adjustable: false,
    forDelicate: false,
    gripType: "pin_pierce_hold",
    bestUse: "woven_cloth_dry",
  },
  clip_stenter_grip: {
    stretchEven: 8,
    fabricSafe: 9,
    widthRange: 7,
    setupSpeed: 8,
    cost: 7,
    adjustable: false,
    forDelicate: true,
    gripType: "clip_jaw_grip",
    bestUse: "delicate_fabric_dry",
  },
  hook_rail_slide: {
    stretchEven: 8,
    fabricSafe: 6,
    widthRange: 9,
    setupSpeed: 7,
    cost: 5,
    adjustable: true,
    forDelicate: false,
    gripType: "hook_slide_rail",
    bestUse: "heavy_cloth_stretch",
  },
  adjustable_width_bar: {
    stretchEven: 9,
    fabricSafe: 8,
    widthRange: 10,
    setupSpeed: 7,
    cost: 8,
    adjustable: true,
    forDelicate: false,
    gripType: "bar_clamp_slide",
    bestUse: "variable_width_dry",
  },
  portable_stretch_clamp: {
    stretchEven: 6,
    fabricSafe: 8,
    widthRange: 5,
    setupSpeed: 10,
    cost: 3,
    adjustable: true,
    forDelicate: false,
    gripType: "clamp_edge_grip",
    bestUse: "small_piece_stretch",
  },
};

export function stretchEven(type: TenteringHookType): number {
  return TENTER_DATA[type].stretchEven;
}
export function fabricSafe(type: TenteringHookType): number {
  return TENTER_DATA[type].fabricSafe;
}
export function widthRange(type: TenteringHookType): number {
  return TENTER_DATA[type].widthRange;
}
export function setupSpeed(type: TenteringHookType): number {
  return TENTER_DATA[type].setupSpeed;
}
export function tenterCost(type: TenteringHookType): number {
  return TENTER_DATA[type].cost;
}
export function adjustable(type: TenteringHookType): boolean {
  return TENTER_DATA[type].adjustable;
}
export function forDelicate(type: TenteringHookType): boolean {
  return TENTER_DATA[type].forDelicate;
}
export function gripType(type: TenteringHookType): string {
  return TENTER_DATA[type].gripType;
}
export function bestUse(type: TenteringHookType): string {
  return TENTER_DATA[type].bestUse;
}
export function tenteringHooks(): TenteringHookType[] {
  return Object.keys(TENTER_DATA) as TenteringHookType[];
}
