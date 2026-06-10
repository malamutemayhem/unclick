// Pegwood stick calculator - clockmaking cleaning/pivot hole tools

export type PegwoodStickType =
  | "boxwood_round_natural"
  | "orange_stick_pointed"
  | "sharpened_dowel_pine"
  | "bamboo_skewer_fine"
  | "elder_pith_soft";

const PEGWOOD_DATA: Record<
  PegwoodStickType,
  {
    cleanAbility: number;
    holeFit: number;
    durability: number;
    absorbency: number;
    cost: number;
    needsSharpening: boolean;
    forPivotHoles: boolean;
    woodHardness: string;
    bestUse: string;
  }
> = {
  boxwood_round_natural: {
    cleanAbility: 9,
    holeFit: 9,
    durability: 8,
    absorbency: 6,
    cost: 5,
    needsSharpening: true,
    forPivotHoles: true,
    woodHardness: "hard_dense_grain",
    bestUse: "pivot_hole_clean",
  },
  orange_stick_pointed: {
    cleanAbility: 7,
    holeFit: 6,
    durability: 5,
    absorbency: 7,
    cost: 2,
    needsSharpening: false,
    forPivotHoles: false,
    woodHardness: "medium_soft_grain",
    bestUse: "general_debris_clear",
  },
  sharpened_dowel_pine: {
    cleanAbility: 6,
    holeFit: 7,
    durability: 4,
    absorbency: 8,
    cost: 1,
    needsSharpening: true,
    forPivotHoles: true,
    woodHardness: "soft_open_grain",
    bestUse: "oil_soak_clean",
  },
  bamboo_skewer_fine: {
    cleanAbility: 8,
    holeFit: 5,
    durability: 6,
    absorbency: 4,
    cost: 1,
    needsSharpening: false,
    forPivotHoles: false,
    woodHardness: "hard_hollow_fiber",
    bestUse: "fine_detail_pick",
  },
  elder_pith_soft: {
    cleanAbility: 7,
    holeFit: 4,
    durability: 2,
    absorbency: 10,
    cost: 3,
    needsSharpening: false,
    forPivotHoles: false,
    woodHardness: "very_soft_pith",
    bestUse: "oil_absorb_wipe",
  },
};

export function cleanAbility(type: PegwoodStickType): number {
  return PEGWOOD_DATA[type].cleanAbility;
}
export function holeFit(type: PegwoodStickType): number {
  return PEGWOOD_DATA[type].holeFit;
}
export function durability(type: PegwoodStickType): number {
  return PEGWOOD_DATA[type].durability;
}
export function absorbency(type: PegwoodStickType): number {
  return PEGWOOD_DATA[type].absorbency;
}
export function stickCost(type: PegwoodStickType): number {
  return PEGWOOD_DATA[type].cost;
}
export function needsSharpening(type: PegwoodStickType): boolean {
  return PEGWOOD_DATA[type].needsSharpening;
}
export function forPivotHoles(type: PegwoodStickType): boolean {
  return PEGWOOD_DATA[type].forPivotHoles;
}
export function woodHardness(type: PegwoodStickType): string {
  return PEGWOOD_DATA[type].woodHardness;
}
export function bestUse(type: PegwoodStickType): string {
  return PEGWOOD_DATA[type].bestUse;
}
export function pegwoodSticks(): PegwoodStickType[] {
  return Object.keys(PEGWOOD_DATA) as PegwoodStickType[];
}
