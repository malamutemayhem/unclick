// Slick timber calculator - green woodworking timber slick tools

export type SlickTimberType =
  | "straight_slick_long"
  | "cranked_neck_offset"
  | "corner_slick_angle"
  | "paring_slick_thin"
  | "ship_slick_heavy";

const SLICK_DATA: Record<
  SlickTimberType,
  {
    cutSmooth: number;
    reachDepth: number;
    controlPush: number;
    bladeWidth: number;
    cost: number;
    cranked: boolean;
    forCorner: boolean;
    handleLength: string;
    bestUse: string;
  }
> = {
  straight_slick_long: {
    cutSmooth: 9,
    reachDepth: 8,
    controlPush: 8,
    bladeWidth: 8,
    cost: 6,
    cranked: false,
    forCorner: false,
    handleLength: "long_24_inch",
    bestUse: "flat_timber_smooth",
  },
  cranked_neck_offset: {
    cutSmooth: 8,
    reachDepth: 10,
    controlPush: 7,
    bladeWidth: 7,
    cost: 7,
    cranked: true,
    forCorner: false,
    handleLength: "medium_18_inch",
    bestUse: "deep_mortise_clean",
  },
  corner_slick_angle: {
    cutSmooth: 7,
    reachDepth: 7,
    controlPush: 8,
    bladeWidth: 5,
    cost: 6,
    cranked: false,
    forCorner: true,
    handleLength: "short_14_inch",
    bestUse: "corner_joint_pare",
  },
  paring_slick_thin: {
    cutSmooth: 10,
    reachDepth: 6,
    controlPush: 9,
    bladeWidth: 6,
    cost: 5,
    cranked: false,
    forCorner: false,
    handleLength: "medium_16_inch",
    bestUse: "fine_surface_pare",
  },
  ship_slick_heavy: {
    cutSmooth: 8,
    reachDepth: 9,
    controlPush: 7,
    bladeWidth: 10,
    cost: 8,
    cranked: false,
    forCorner: false,
    handleLength: "long_30_inch",
    bestUse: "heavy_beam_smooth",
  },
};

export function cutSmooth(type: SlickTimberType): number {
  return SLICK_DATA[type].cutSmooth;
}
export function reachDepth(type: SlickTimberType): number {
  return SLICK_DATA[type].reachDepth;
}
export function controlPush(type: SlickTimberType): number {
  return SLICK_DATA[type].controlPush;
}
export function bladeWidth(type: SlickTimberType): number {
  return SLICK_DATA[type].bladeWidth;
}
export function slickCost(type: SlickTimberType): number {
  return SLICK_DATA[type].cost;
}
export function cranked(type: SlickTimberType): boolean {
  return SLICK_DATA[type].cranked;
}
export function forCorner(type: SlickTimberType): boolean {
  return SLICK_DATA[type].forCorner;
}
export function handleLength(type: SlickTimberType): string {
  return SLICK_DATA[type].handleLength;
}
export function bestUse(type: SlickTimberType): string {
  return SLICK_DATA[type].bestUse;
}
export function slickTimbers(): SlickTimberType[] {
  return Object.keys(SLICK_DATA) as SlickTimberType[];
}
