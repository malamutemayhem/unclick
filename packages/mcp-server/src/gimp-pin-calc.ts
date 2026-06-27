// Gimp pin calculator - upholstery decorative trim fastening tools

export type GimpPinType =
  | "brass_head_standard"
  | "antique_dome_finish"
  | "crystal_clear_invisible"
  | "black_oxide_dark"
  | "stainless_marine_rust";

const GIMP_DATA: Record<
  GimpPinType,
  {
    holdStrength: number;
    visibility: number;
    corrosionResist: number;
    fabricSafe: number;
    cost: number;
    decorative: boolean;
    forOutdoor: boolean;
    headFinish: string;
    bestUse: string;
  }
> = {
  brass_head_standard: {
    holdStrength: 8,
    visibility: 5,
    corrosionResist: 7,
    fabricSafe: 8,
    cost: 3,
    decorative: true,
    forOutdoor: false,
    headFinish: "polished_brass_dome",
    bestUse: "general_gimp_fix",
  },
  antique_dome_finish: {
    holdStrength: 8,
    visibility: 7,
    corrosionResist: 6,
    fabricSafe: 8,
    cost: 4,
    decorative: true,
    forOutdoor: false,
    headFinish: "antique_patina_dome",
    bestUse: "period_trim_match",
  },
  crystal_clear_invisible: {
    holdStrength: 6,
    visibility: 2,
    corrosionResist: 8,
    fabricSafe: 9,
    cost: 5,
    decorative: false,
    forOutdoor: false,
    headFinish: "clear_crystal_flat",
    bestUse: "invisible_trim_fix",
  },
  black_oxide_dark: {
    holdStrength: 8,
    visibility: 4,
    corrosionResist: 7,
    fabricSafe: 8,
    cost: 3,
    decorative: false,
    forOutdoor: false,
    headFinish: "black_oxide_matte",
    bestUse: "dark_fabric_blend",
  },
  stainless_marine_rust: {
    holdStrength: 9,
    visibility: 5,
    corrosionResist: 10,
    fabricSafe: 7,
    cost: 5,
    decorative: false,
    forOutdoor: true,
    headFinish: "stainless_satin_head",
    bestUse: "outdoor_marine_trim",
  },
};

export function holdStrength(type: GimpPinType): number {
  return GIMP_DATA[type].holdStrength;
}
export function visibility(type: GimpPinType): number {
  return GIMP_DATA[type].visibility;
}
export function corrosionResist(type: GimpPinType): number {
  return GIMP_DATA[type].corrosionResist;
}
export function fabricSafe(type: GimpPinType): number {
  return GIMP_DATA[type].fabricSafe;
}
export function gimpCost(type: GimpPinType): number {
  return GIMP_DATA[type].cost;
}
export function decorative(type: GimpPinType): boolean {
  return GIMP_DATA[type].decorative;
}
export function forOutdoor(type: GimpPinType): boolean {
  return GIMP_DATA[type].forOutdoor;
}
export function headFinish(type: GimpPinType): string {
  return GIMP_DATA[type].headFinish;
}
export function bestUse(type: GimpPinType): string {
  return GIMP_DATA[type].bestUse;
}
export function gimpPins(): GimpPinType[] {
  return Object.keys(GIMP_DATA) as GimpPinType[];
}
