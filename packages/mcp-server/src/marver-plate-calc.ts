// Marver plate calculator - glassblowing shaping surface tools

export type MarverPlateType =
  | "steel_flat_standard"
  | "graphite_smooth_slide"
  | "brass_textured_pattern"
  | "marble_cold_chill"
  | "wooden_paddle_char";

const MARVER_DATA: Record<
  MarverPlateType,
  {
    surfaceSmooth: number;
    heatDraw: number;
    shapeControl: number;
    durability: number;
    cost: number;
    textured: boolean;
    forChill: boolean;
    surfaceMaterial: string;
    bestUse: string;
  }
> = {
  steel_flat_standard: {
    surfaceSmooth: 8,
    heatDraw: 8,
    shapeControl: 8,
    durability: 9,
    cost: 5,
    textured: false,
    forChill: false,
    surfaceMaterial: "polished_steel_flat",
    bestUse: "general_shape_roll",
  },
  graphite_smooth_slide: {
    surfaceSmooth: 10,
    heatDraw: 6,
    shapeControl: 9,
    durability: 7,
    cost: 7,
    textured: false,
    forChill: false,
    surfaceMaterial: "graphite_block_smooth",
    bestUse: "delicate_shape_slide",
  },
  brass_textured_pattern: {
    surfaceSmooth: 5,
    heatDraw: 7,
    shapeControl: 7,
    durability: 8,
    cost: 6,
    textured: true,
    forChill: false,
    surfaceMaterial: "brass_pattern_plate",
    bestUse: "texture_impress_roll",
  },
  marble_cold_chill: {
    surfaceSmooth: 9,
    heatDraw: 10,
    shapeControl: 7,
    durability: 8,
    cost: 6,
    textured: false,
    forChill: true,
    surfaceMaterial: "polished_marble_slab",
    bestUse: "rapid_chill_shape",
  },
  wooden_paddle_char: {
    surfaceSmooth: 6,
    heatDraw: 5,
    shapeControl: 8,
    durability: 5,
    cost: 2,
    textured: false,
    forChill: false,
    surfaceMaterial: "charred_wood_paddle",
    bestUse: "hand_paddle_form",
  },
};

export function surfaceSmooth(type: MarverPlateType): number {
  return MARVER_DATA[type].surfaceSmooth;
}
export function heatDraw(type: MarverPlateType): number {
  return MARVER_DATA[type].heatDraw;
}
export function shapeControl(type: MarverPlateType): number {
  return MARVER_DATA[type].shapeControl;
}
export function durability(type: MarverPlateType): number {
  return MARVER_DATA[type].durability;
}
export function marverCost(type: MarverPlateType): number {
  return MARVER_DATA[type].cost;
}
export function textured(type: MarverPlateType): boolean {
  return MARVER_DATA[type].textured;
}
export function forChill(type: MarverPlateType): boolean {
  return MARVER_DATA[type].forChill;
}
export function surfaceMaterial(type: MarverPlateType): string {
  return MARVER_DATA[type].surfaceMaterial;
}
export function bestUse(type: MarverPlateType): string {
  return MARVER_DATA[type].bestUse;
}
export function marverPlates(): MarverPlateType[] {
  return Object.keys(MARVER_DATA) as MarverPlateType[];
}
