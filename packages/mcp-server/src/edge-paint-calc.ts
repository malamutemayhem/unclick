// Edge paint calculator - leatherworking edge finishing paint tools

export type EdgePaintType =
  | "water_based_flex"
  | "lacquer_gloss_hard"
  | "wax_coat_natural"
  | "dye_stain_absorb"
  | "resin_edge_build";

const PAINT_DATA: Record<
  EdgePaintType,
  {
    coverageSmooth: number;
    durability: number;
    drySpeed: number;
    flexCrack: number;
    cost: number;
    waterClean: boolean;
    buildLayers: boolean;
    finishType: string;
    bestUse: string;
  }
> = {
  water_based_flex: {
    coverageSmooth: 8,
    durability: 7,
    drySpeed: 8,
    flexCrack: 9,
    cost: 5,
    waterClean: true,
    buildLayers: true,
    finishType: "matte_satin_flex",
    bestUse: "general_edge_finish",
  },
  lacquer_gloss_hard: {
    coverageSmooth: 9,
    durability: 9,
    drySpeed: 6,
    flexCrack: 5,
    cost: 6,
    waterClean: false,
    buildLayers: true,
    finishType: "high_gloss_hard",
    bestUse: "luxury_bag_edge",
  },
  wax_coat_natural: {
    coverageSmooth: 6,
    durability: 5,
    drySpeed: 9,
    flexCrack: 8,
    cost: 3,
    waterClean: false,
    buildLayers: false,
    finishType: "natural_wax_sheen",
    bestUse: "rustic_natural_edge",
  },
  dye_stain_absorb: {
    coverageSmooth: 5,
    durability: 4,
    drySpeed: 7,
    flexCrack: 10,
    cost: 3,
    waterClean: true,
    buildLayers: false,
    finishType: "transparent_stain",
    bestUse: "color_match_surface",
  },
  resin_edge_build: {
    coverageSmooth: 10,
    durability: 10,
    drySpeed: 4,
    flexCrack: 4,
    cost: 8,
    waterClean: false,
    buildLayers: true,
    finishType: "thick_resin_coat",
    bestUse: "premium_build_edge",
  },
};

export function coverageSmooth(type: EdgePaintType): number {
  return PAINT_DATA[type].coverageSmooth;
}
export function durability(type: EdgePaintType): number {
  return PAINT_DATA[type].durability;
}
export function drySpeed(type: EdgePaintType): number {
  return PAINT_DATA[type].drySpeed;
}
export function flexCrack(type: EdgePaintType): number {
  return PAINT_DATA[type].flexCrack;
}
export function paintCost(type: EdgePaintType): number {
  return PAINT_DATA[type].cost;
}
export function waterClean(type: EdgePaintType): boolean {
  return PAINT_DATA[type].waterClean;
}
export function buildLayers(type: EdgePaintType): boolean {
  return PAINT_DATA[type].buildLayers;
}
export function finishType(type: EdgePaintType): string {
  return PAINT_DATA[type].finishType;
}
export function bestUse(type: EdgePaintType): string {
  return PAINT_DATA[type].bestUse;
}
export function edgePaints(): EdgePaintType[] {
  return Object.keys(PAINT_DATA) as EdgePaintType[];
}
