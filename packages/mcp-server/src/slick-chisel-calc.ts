// Slick chisel calculator - timber framing large paring chisels

export type SlickChiselType =
  | "standard_flat_wide"
  | "corner_chisel_square"
  | "cranked_neck_offset"
  | "skew_angle_dovetail"
  | "timber_framing_long";

const SLICK_DATA: Record<
  SlickChiselType,
  {
    pareSmooth: number;
    reachDepth: number;
    controlPush: number;
    edgeRetention: number;
    cost: number;
    cranked: boolean;
    forMortise: boolean;
    bladeWidth: string;
    bestUse: string;
  }
> = {
  standard_flat_wide: {
    pareSmooth: 9,
    reachDepth: 7,
    controlPush: 8,
    edgeRetention: 7,
    cost: 6,
    cranked: false,
    forMortise: false,
    bladeWidth: "three_inch_flat",
    bestUse: "tenon_cheek_pare",
  },
  corner_chisel_square: {
    pareSmooth: 7,
    reachDepth: 8,
    controlPush: 7,
    edgeRetention: 8,
    cost: 7,
    cranked: false,
    forMortise: true,
    bladeWidth: "l_shaped_corner",
    bestUse: "mortise_corner_clean",
  },
  cranked_neck_offset: {
    pareSmooth: 8,
    reachDepth: 9,
    controlPush: 7,
    edgeRetention: 7,
    cost: 8,
    cranked: true,
    forMortise: false,
    bladeWidth: "two_inch_offset",
    bestUse: "flush_surface_pare",
  },
  skew_angle_dovetail: {
    pareSmooth: 8,
    reachDepth: 6,
    controlPush: 9,
    edgeRetention: 8,
    cost: 7,
    cranked: false,
    forMortise: false,
    bladeWidth: "angled_skew_edge",
    bestUse: "dovetail_corner_trim",
  },
  timber_framing_long: {
    pareSmooth: 10,
    reachDepth: 10,
    controlPush: 6,
    edgeRetention: 7,
    cost: 9,
    cranked: false,
    forMortise: false,
    bladeWidth: "four_inch_extra",
    bestUse: "large_beam_surface",
  },
};

export function pareSmooth(type: SlickChiselType): number {
  return SLICK_DATA[type].pareSmooth;
}
export function reachDepth(type: SlickChiselType): number {
  return SLICK_DATA[type].reachDepth;
}
export function controlPush(type: SlickChiselType): number {
  return SLICK_DATA[type].controlPush;
}
export function edgeRetention(type: SlickChiselType): number {
  return SLICK_DATA[type].edgeRetention;
}
export function slickCost(type: SlickChiselType): number {
  return SLICK_DATA[type].cost;
}
export function cranked(type: SlickChiselType): boolean {
  return SLICK_DATA[type].cranked;
}
export function forMortise(type: SlickChiselType): boolean {
  return SLICK_DATA[type].forMortise;
}
export function bladeWidth(type: SlickChiselType): string {
  return SLICK_DATA[type].bladeWidth;
}
export function bestUse(type: SlickChiselType): string {
  return SLICK_DATA[type].bestUse;
}
export function slickChisels(): SlickChiselType[] {
  return Object.keys(SLICK_DATA) as SlickChiselType[];
}
