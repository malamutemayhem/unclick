// Anvil horn calculator - blacksmithing anvil horn tools

export type AnvilHornType =
  | "london_pattern_standard"
  | "farrier_turning_clip"
  | "double_horn_european"
  | "stake_anvil_sheet"
  | "cast_iron_hobby";

const HORN_DATA: Record<
  AnvilHornType,
  {
    rebound: number;
    faceHardness: number;
    hornTaper: number;
    weightStable: number;
    cost: number;
    doubleHorn: boolean;
    forFarrier: boolean;
    bodyMaterial: string;
    bestUse: string;
  }
> = {
  london_pattern_standard: {
    rebound: 9,
    faceHardness: 9,
    hornTaper: 8,
    weightStable: 9,
    cost: 6,
    doubleHorn: false,
    forFarrier: false,
    bodyMaterial: "forged_tool_steel",
    bestUse: "general_forge_work",
  },
  farrier_turning_clip: {
    rebound: 8,
    faceHardness: 9,
    hornTaper: 9,
    weightStable: 7,
    cost: 5,
    doubleHorn: false,
    forFarrier: true,
    bodyMaterial: "forged_steel_clip",
    bestUse: "horseshoe_shape",
  },
  double_horn_european: {
    rebound: 9,
    faceHardness: 9,
    hornTaper: 10,
    weightStable: 8,
    cost: 8,
    doubleHorn: true,
    forFarrier: false,
    bodyMaterial: "forged_steel_double",
    bestUse: "artistic_scroll_work",
  },
  stake_anvil_sheet: {
    rebound: 7,
    faceHardness: 8,
    hornTaper: 6,
    weightStable: 6,
    cost: 4,
    doubleHorn: false,
    forFarrier: false,
    bodyMaterial: "hardened_steel_stake",
    bestUse: "sheet_metal_form",
  },
  cast_iron_hobby: {
    rebound: 5,
    faceHardness: 6,
    hornTaper: 6,
    weightStable: 8,
    cost: 2,
    doubleHorn: false,
    forFarrier: false,
    bodyMaterial: "cast_iron_economy",
    bestUse: "hobby_light_forge",
  },
};

export function rebound(type: AnvilHornType): number {
  return HORN_DATA[type].rebound;
}
export function faceHardness(type: AnvilHornType): number {
  return HORN_DATA[type].faceHardness;
}
export function hornTaper(type: AnvilHornType): number {
  return HORN_DATA[type].hornTaper;
}
export function weightStable(type: AnvilHornType): number {
  return HORN_DATA[type].weightStable;
}
export function anvilCost(type: AnvilHornType): number {
  return HORN_DATA[type].cost;
}
export function doubleHorn(type: AnvilHornType): boolean {
  return HORN_DATA[type].doubleHorn;
}
export function forFarrier(type: AnvilHornType): boolean {
  return HORN_DATA[type].forFarrier;
}
export function bodyMaterial(type: AnvilHornType): string {
  return HORN_DATA[type].bodyMaterial;
}
export function bestUse(type: AnvilHornType): string {
  return HORN_DATA[type].bestUse;
}
export function anvilHorns(): AnvilHornType[] {
  return Object.keys(HORN_DATA) as AnvilHornType[];
}
