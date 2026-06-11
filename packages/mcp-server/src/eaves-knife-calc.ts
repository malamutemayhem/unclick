// Eaves knife calculator - thatching eave trimming/dressing tools

export type EavesKnifeType =
  | "flat_blade_dress"
  | "curved_blade_scoop"
  | "toothed_comb_rake"
  | "angled_tip_tuck"
  | "wide_paddle_press";

const EAVES_DATA: Record<
  EavesKnifeType,
  {
    dressSmooth: number;
    tuckForce: number;
    controlFeel: number;
    coverWidth: number;
    cost: number;
    toothed: boolean;
    forDressing: boolean;
    bladeWidth: string;
    bestUse: string;
  }
> = {
  flat_blade_dress: {
    dressSmooth: 9,
    tuckForce: 7,
    controlFeel: 8,
    coverWidth: 7,
    cost: 4,
    toothed: false,
    forDressing: true,
    bladeWidth: "four_inch_flat",
    bestUse: "eave_face_dress",
  },
  curved_blade_scoop: {
    dressSmooth: 7,
    tuckForce: 8,
    controlFeel: 8,
    coverWidth: 6,
    cost: 5,
    toothed: false,
    forDressing: false,
    bladeWidth: "three_inch_curve",
    bestUse: "valley_tuck_shape",
  },
  toothed_comb_rake: {
    dressSmooth: 6,
    tuckForce: 5,
    controlFeel: 7,
    coverWidth: 9,
    cost: 4,
    toothed: true,
    forDressing: true,
    bladeWidth: "six_inch_comb",
    bestUse: "straw_align_comb",
  },
  angled_tip_tuck: {
    dressSmooth: 7,
    tuckForce: 9,
    controlFeel: 9,
    coverWidth: 5,
    cost: 5,
    toothed: false,
    forDressing: false,
    bladeWidth: "two_inch_angle",
    bestUse: "tight_corner_tuck",
  },
  wide_paddle_press: {
    dressSmooth: 8,
    tuckForce: 7,
    controlFeel: 6,
    coverWidth: 10,
    cost: 5,
    toothed: false,
    forDressing: true,
    bladeWidth: "eight_inch_paddle",
    bestUse: "wide_surface_press",
  },
};

export function dressSmooth(type: EavesKnifeType): number {
  return EAVES_DATA[type].dressSmooth;
}
export function tuckForce(type: EavesKnifeType): number {
  return EAVES_DATA[type].tuckForce;
}
export function controlFeel(type: EavesKnifeType): number {
  return EAVES_DATA[type].controlFeel;
}
export function coverWidth(type: EavesKnifeType): number {
  return EAVES_DATA[type].coverWidth;
}
export function eavesCost(type: EavesKnifeType): number {
  return EAVES_DATA[type].cost;
}
export function toothed(type: EavesKnifeType): boolean {
  return EAVES_DATA[type].toothed;
}
export function forDressing(type: EavesKnifeType): boolean {
  return EAVES_DATA[type].forDressing;
}
export function bladeWidth(type: EavesKnifeType): string {
  return EAVES_DATA[type].bladeWidth;
}
export function bestUse(type: EavesKnifeType): string {
  return EAVES_DATA[type].bestUse;
}
export function eavesKnives(): EavesKnifeType[] {
  return Object.keys(EAVES_DATA) as EavesKnifeType[];
}
