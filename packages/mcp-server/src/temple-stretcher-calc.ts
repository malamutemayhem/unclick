// Temple stretcher calculator - weaving width tension tools

export type TempleStretcherType =
  | "roller_temple_metal"
  | "pin_temple_wood"
  | "spring_temple_clip"
  | "adjustable_slide_bar"
  | "hook_temple_comb";

const TEMPLE_DATA: Record<
  TempleStretcherType,
  {
    gripHold: number;
    widthConsist: number;
    fabricSafe: number;
    adjustSpeed: number;
    cost: number;
    adjustable: boolean;
    forDelicate: boolean;
    gripMethod: string;
    bestUse: string;
  }
> = {
  roller_temple_metal: {
    gripHold: 8,
    widthConsist: 9,
    fabricSafe: 7,
    adjustSpeed: 7,
    cost: 5,
    adjustable: false,
    forDelicate: false,
    gripMethod: "roller_pin_press",
    bestUse: "general_loom_tension",
  },
  pin_temple_wood: {
    gripHold: 7,
    widthConsist: 7,
    fabricSafe: 9,
    adjustSpeed: 6,
    cost: 3,
    adjustable: false,
    forDelicate: true,
    gripMethod: "wood_pin_gentle",
    bestUse: "delicate_fabric_hold",
  },
  spring_temple_clip: {
    gripHold: 9,
    widthConsist: 8,
    fabricSafe: 6,
    adjustSpeed: 9,
    cost: 6,
    adjustable: true,
    forDelicate: false,
    gripMethod: "spring_jaw_clip",
    bestUse: "quick_change_weave",
  },
  adjustable_slide_bar: {
    gripHold: 7,
    widthConsist: 10,
    fabricSafe: 8,
    adjustSpeed: 8,
    cost: 7,
    adjustable: true,
    forDelicate: false,
    gripMethod: "slide_bar_lock",
    bestUse: "variable_width_weave",
  },
  hook_temple_comb: {
    gripHold: 8,
    widthConsist: 8,
    fabricSafe: 5,
    adjustSpeed: 7,
    cost: 4,
    adjustable: false,
    forDelicate: false,
    gripMethod: "hook_comb_teeth",
    bestUse: "heavy_rug_tension",
  },
};

export function gripHold(type: TempleStretcherType): number {
  return TEMPLE_DATA[type].gripHold;
}
export function widthConsist(type: TempleStretcherType): number {
  return TEMPLE_DATA[type].widthConsist;
}
export function fabricSafe(type: TempleStretcherType): number {
  return TEMPLE_DATA[type].fabricSafe;
}
export function adjustSpeed(type: TempleStretcherType): number {
  return TEMPLE_DATA[type].adjustSpeed;
}
export function templeCost(type: TempleStretcherType): number {
  return TEMPLE_DATA[type].cost;
}
export function adjustable(type: TempleStretcherType): boolean {
  return TEMPLE_DATA[type].adjustable;
}
export function forDelicate(type: TempleStretcherType): boolean {
  return TEMPLE_DATA[type].forDelicate;
}
export function gripMethod(type: TempleStretcherType): string {
  return TEMPLE_DATA[type].gripMethod;
}
export function bestUse(type: TempleStretcherType): string {
  return TEMPLE_DATA[type].bestUse;
}
export function templeStretchers(): TempleStretcherType[] {
  return Object.keys(TEMPLE_DATA) as TempleStretcherType[];
}
