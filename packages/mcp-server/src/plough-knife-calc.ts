// Plough knife calculator - bookbinding plough trimming tools

export type PloughKnifeType =
  | "single_bevel_standard"
  | "double_bevel_center"
  | "replaceable_blade_swap"
  | "skiving_thin_edge"
  | "carbide_tip_long";

const KNIFE_DATA: Record<
  PloughKnifeType,
  {
    cutClean: number;
    edgeHold: number;
    sharpenEase: number;
    depthControl: number;
    cost: number;
    replaceable: boolean;
    forSkiving: boolean;
    bevelStyle: string;
    bestUse: string;
  }
> = {
  single_bevel_standard: {
    cutClean: 9,
    edgeHold: 7,
    sharpenEase: 8,
    depthControl: 8,
    cost: 4,
    replaceable: false,
    forSkiving: false,
    bevelStyle: "single_flat_bevel",
    bestUse: "standard_plough_trim",
  },
  double_bevel_center: {
    cutClean: 8,
    edgeHold: 7,
    sharpenEase: 7,
    depthControl: 7,
    cost: 4,
    replaceable: false,
    forSkiving: false,
    bevelStyle: "double_center_bevel",
    bestUse: "both_hand_plough",
  },
  replaceable_blade_swap: {
    cutClean: 7,
    edgeHold: 5,
    sharpenEase: 10,
    depthControl: 7,
    cost: 5,
    replaceable: true,
    forSkiving: false,
    bevelStyle: "snap_in_blade",
    bestUse: "quick_change_trim",
  },
  skiving_thin_edge: {
    cutClean: 8,
    edgeHold: 6,
    sharpenEase: 7,
    depthControl: 10,
    cost: 5,
    replaceable: false,
    forSkiving: true,
    bevelStyle: "low_angle_skive",
    bestUse: "leather_cover_skive",
  },
  carbide_tip_long: {
    cutClean: 9,
    edgeHold: 10,
    sharpenEase: 4,
    depthControl: 8,
    cost: 8,
    replaceable: false,
    forSkiving: false,
    bevelStyle: "carbide_insert_tip",
    bestUse: "heavy_board_trim",
  },
};

export function cutClean(type: PloughKnifeType): number {
  return KNIFE_DATA[type].cutClean;
}
export function edgeHold(type: PloughKnifeType): number {
  return KNIFE_DATA[type].edgeHold;
}
export function sharpenEase(type: PloughKnifeType): number {
  return KNIFE_DATA[type].sharpenEase;
}
export function depthControl(type: PloughKnifeType): number {
  return KNIFE_DATA[type].depthControl;
}
export function knifeCost(type: PloughKnifeType): number {
  return KNIFE_DATA[type].cost;
}
export function replaceable(type: PloughKnifeType): boolean {
  return KNIFE_DATA[type].replaceable;
}
export function forSkiving(type: PloughKnifeType): boolean {
  return KNIFE_DATA[type].forSkiving;
}
export function bevelStyle(type: PloughKnifeType): string {
  return KNIFE_DATA[type].bevelStyle;
}
export function bestUse(type: PloughKnifeType): string {
  return KNIFE_DATA[type].bestUse;
}
export function ploughKnives(): PloughKnifeType[] {
  return Object.keys(KNIFE_DATA) as PloughKnifeType[];
}
