// Rubbing stone calculator - stone finishing rubbing tools

export type RubbingStoneType =
  | "silicon_carbide_coarse"
  | "aluminum_oxide_medium"
  | "diamond_pad_fine"
  | "natural_arkansas_hone"
  | "pumice_block_polish";

const STONE_DATA: Record<
  RubbingStoneType,
  {
    cutSpeed: number;
    surfaceFinish: number;
    durability: number;
    gritRange: number;
    cost: number;
    synthetic: boolean;
    forPolish: boolean;
    grainType: string;
    bestUse: string;
  }
> = {
  silicon_carbide_coarse: {
    cutSpeed: 10,
    surfaceFinish: 4,
    durability: 7,
    gritRange: 6,
    cost: 3,
    synthetic: true,
    forPolish: false,
    grainType: "silicon_carbide",
    bestUse: "heavy_surface_level",
  },
  aluminum_oxide_medium: {
    cutSpeed: 7,
    surfaceFinish: 7,
    durability: 8,
    gritRange: 8,
    cost: 3,
    synthetic: true,
    forPolish: false,
    grainType: "aluminum_oxide",
    bestUse: "general_smooth_finish",
  },
  diamond_pad_fine: {
    cutSpeed: 8,
    surfaceFinish: 9,
    durability: 10,
    gritRange: 9,
    cost: 8,
    synthetic: true,
    forPolish: true,
    grainType: "diamond_bonded",
    bestUse: "fine_hone_polish",
  },
  natural_arkansas_hone: {
    cutSpeed: 5,
    surfaceFinish: 9,
    durability: 8,
    gritRange: 5,
    cost: 6,
    synthetic: false,
    forPolish: true,
    grainType: "natural_novaculite",
    bestUse: "traditional_edge_hone",
  },
  pumice_block_polish: {
    cutSpeed: 4,
    surfaceFinish: 10,
    durability: 4,
    gritRange: 4,
    cost: 2,
    synthetic: false,
    forPolish: true,
    grainType: "volcanic_pumice",
    bestUse: "final_surface_polish",
  },
};

export function cutSpeed(type: RubbingStoneType): number {
  return STONE_DATA[type].cutSpeed;
}
export function surfaceFinish(type: RubbingStoneType): number {
  return STONE_DATA[type].surfaceFinish;
}
export function durability(type: RubbingStoneType): number {
  return STONE_DATA[type].durability;
}
export function gritRange(type: RubbingStoneType): number {
  return STONE_DATA[type].gritRange;
}
export function stoneCost(type: RubbingStoneType): number {
  return STONE_DATA[type].cost;
}
export function synthetic(type: RubbingStoneType): boolean {
  return STONE_DATA[type].synthetic;
}
export function forPolish(type: RubbingStoneType): boolean {
  return STONE_DATA[type].forPolish;
}
export function grainType(type: RubbingStoneType): string {
  return STONE_DATA[type].grainType;
}
export function bestUse(type: RubbingStoneType): string {
  return STONE_DATA[type].bestUse;
}
export function rubbingStones(): RubbingStoneType[] {
  return Object.keys(STONE_DATA) as RubbingStoneType[];
}
