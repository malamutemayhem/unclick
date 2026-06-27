// Draw bore calculator - timber framing draw bore tools

export type DrawBoreType =
  | "tapered_pin_standard"
  | "offset_drift_pull"
  | "steel_dowel_modern"
  | "hardwood_peg_traditional"
  | "bronze_pin_marine";

const BORE_DATA: Record<
  DrawBoreType,
  {
    pullForce: number;
    jointTight: number;
    alignEase: number;
    durability: number;
    cost: number;
    reusable: boolean;
    forMarine: boolean;
    pinMaterial: string;
    bestUse: string;
  }
> = {
  tapered_pin_standard: {
    pullForce: 8,
    jointTight: 9,
    alignEase: 8,
    durability: 7,
    cost: 2,
    reusable: false,
    forMarine: false,
    pinMaterial: "oak_taper_pin",
    bestUse: "general_draw_bore",
  },
  offset_drift_pull: {
    pullForce: 10,
    jointTight: 10,
    alignEase: 7,
    durability: 9,
    cost: 4,
    reusable: true,
    forMarine: false,
    pinMaterial: "steel_drift_tool",
    bestUse: "heavy_beam_pull",
  },
  steel_dowel_modern: {
    pullForce: 8,
    jointTight: 8,
    alignEase: 9,
    durability: 10,
    cost: 3,
    reusable: true,
    forMarine: false,
    pinMaterial: "mild_steel_round",
    bestUse: "modern_frame_join",
  },
  hardwood_peg_traditional: {
    pullForce: 7,
    jointTight: 8,
    alignEase: 7,
    durability: 6,
    cost: 1,
    reusable: false,
    forMarine: false,
    pinMaterial: "seasoned_oak_peg",
    bestUse: "traditional_peg_join",
  },
  bronze_pin_marine: {
    pullForce: 8,
    jointTight: 9,
    alignEase: 8,
    durability: 9,
    cost: 6,
    reusable: true,
    forMarine: true,
    pinMaterial: "silicon_bronze_pin",
    bestUse: "marine_timber_join",
  },
};

export function pullForce(type: DrawBoreType): number {
  return BORE_DATA[type].pullForce;
}
export function jointTight(type: DrawBoreType): number {
  return BORE_DATA[type].jointTight;
}
export function alignEase(type: DrawBoreType): number {
  return BORE_DATA[type].alignEase;
}
export function durability(type: DrawBoreType): number {
  return BORE_DATA[type].durability;
}
export function boreCost(type: DrawBoreType): number {
  return BORE_DATA[type].cost;
}
export function reusable(type: DrawBoreType): boolean {
  return BORE_DATA[type].reusable;
}
export function forMarine(type: DrawBoreType): boolean {
  return BORE_DATA[type].forMarine;
}
export function pinMaterial(type: DrawBoreType): string {
  return BORE_DATA[type].pinMaterial;
}
export function bestUse(type: DrawBoreType): string {
  return BORE_DATA[type].bestUse;
}
export function drawBores(): DrawBoreType[] {
  return Object.keys(BORE_DATA) as DrawBoreType[];
}
