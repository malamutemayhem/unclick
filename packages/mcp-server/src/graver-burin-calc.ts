// Graver burin calculator - engraving cutting tool selection

export type GraverBurinType =
  | "flat_graver_line"
  | "round_graver_shade"
  | "onglette_graver_point"
  | "knife_graver_cut"
  | "bevel_graver_bright";

const GRAVER_DATA: Record<
  GraverBurinType,
  {
    cutPrecision: number;
    lineWidth: number;
    depthControl: number;
    steelHardness: number;
    cost: number;
    forShading: boolean;
    forBright: boolean;
    crossSection: string;
    bestUse: string;
  }
> = {
  flat_graver_line: {
    cutPrecision: 8,
    lineWidth: 7,
    depthControl: 8,
    steelHardness: 8,
    cost: 4,
    forShading: false,
    forBright: false,
    crossSection: "flat_rectangle",
    bestUse: "straight_line_engrave",
  },
  round_graver_shade: {
    cutPrecision: 7,
    lineWidth: 6,
    depthControl: 7,
    steelHardness: 8,
    cost: 4,
    forShading: true,
    forBright: false,
    crossSection: "round_half_circle",
    bestUse: "shade_texture_fill",
  },
  onglette_graver_point: {
    cutPrecision: 10,
    lineWidth: 3,
    depthControl: 9,
    steelHardness: 9,
    cost: 5,
    forShading: false,
    forBright: false,
    crossSection: "diamond_point_fine",
    bestUse: "fine_detail_letter",
  },
  knife_graver_cut: {
    cutPrecision: 8,
    lineWidth: 5,
    depthControl: 8,
    steelHardness: 8,
    cost: 4,
    forShading: false,
    forBright: false,
    crossSection: "knife_edge_angle",
    bestUse: "script_curve_cut",
  },
  bevel_graver_bright: {
    cutPrecision: 9,
    lineWidth: 8,
    depthControl: 9,
    steelHardness: 9,
    cost: 6,
    forShading: false,
    forBright: true,
    crossSection: "bevel_v_bright",
    bestUse: "bright_cut_facet",
  },
};

export function cutPrecision(type: GraverBurinType): number {
  return GRAVER_DATA[type].cutPrecision;
}
export function lineWidth(type: GraverBurinType): number {
  return GRAVER_DATA[type].lineWidth;
}
export function depthControl(type: GraverBurinType): number {
  return GRAVER_DATA[type].depthControl;
}
export function steelHardness(type: GraverBurinType): number {
  return GRAVER_DATA[type].steelHardness;
}
export function graverCost(type: GraverBurinType): number {
  return GRAVER_DATA[type].cost;
}
export function forShading(type: GraverBurinType): boolean {
  return GRAVER_DATA[type].forShading;
}
export function forBright(type: GraverBurinType): boolean {
  return GRAVER_DATA[type].forBright;
}
export function crossSection(type: GraverBurinType): string {
  return GRAVER_DATA[type].crossSection;
}
export function bestUse(type: GraverBurinType): string {
  return GRAVER_DATA[type].bestUse;
}
export function graverBurins(): GraverBurinType[] {
  return Object.keys(GRAVER_DATA) as GraverBurinType[];
}
