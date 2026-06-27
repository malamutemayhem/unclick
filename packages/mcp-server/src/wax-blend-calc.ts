export type WaxBlendType =
  | "soy_coconut_blend"
  | "paraffin_soy_mix"
  | "beeswax_coconut_natural"
  | "palm_paraffin_crystal"
  | "rapeseed_soy_eco";

const specs: Record<WaxBlendType, {
  throwHot: number; burnEven: number; surfaceSmooth: number;
  blendStable: number; cost: number; allNatural: boolean; ecoCert: boolean;
  baseRatio: string; use: string;
}> = {
  soy_coconut_blend: {
    throwHot: 90, burnEven: 88, surfaceSmooth: 92,
    blendStable: 85, cost: 9, allNatural: true, ecoCert: false,
    baseRatio: "sixty_soy_forty_coco", use: "luxury_container_candle",
  },
  paraffin_soy_mix: {
    throwHot: 92, burnEven: 85, surfaceSmooth: 85,
    blendStable: 90, cost: 6, allNatural: false, ecoCert: false,
    baseRatio: "seventy_para_thirty_soy", use: "strong_throw_container",
  },
  beeswax_coconut_natural: {
    throwHot: 82, burnEven: 90, surfaceSmooth: 88,
    blendStable: 82, cost: 11, allNatural: true, ecoCert: false,
    baseRatio: "fifty_bee_fifty_coco", use: "premium_natural_candle",
  },
  palm_paraffin_crystal: {
    throwHot: 85, burnEven: 80, surfaceSmooth: 75,
    blendStable: 88, cost: 5, allNatural: false, ecoCert: false,
    baseRatio: "forty_palm_sixty_para", use: "crystal_pillar_candle",
  },
  rapeseed_soy_eco: {
    throwHot: 85, burnEven: 88, surfaceSmooth: 85,
    blendStable: 82, cost: 8, allNatural: true, ecoCert: true,
    baseRatio: "fifty_rape_fifty_soy", use: "eco_certified_candle",
  },
};

export function throwHot(t: WaxBlendType): number { return specs[t].throwHot; }
export function burnEven(t: WaxBlendType): number { return specs[t].burnEven; }
export function surfaceSmooth(t: WaxBlendType): number { return specs[t].surfaceSmooth; }
export function blendStable(t: WaxBlendType): number { return specs[t].blendStable; }
export function blendCost(t: WaxBlendType): number { return specs[t].cost; }
export function allNatural(t: WaxBlendType): boolean { return specs[t].allNatural; }
export function ecoCert(t: WaxBlendType): boolean { return specs[t].ecoCert; }
export function baseRatio(t: WaxBlendType): string { return specs[t].baseRatio; }
export function bestUse(t: WaxBlendType): string { return specs[t].use; }
export function waxBlends(): WaxBlendType[] { return Object.keys(specs) as WaxBlendType[]; }
