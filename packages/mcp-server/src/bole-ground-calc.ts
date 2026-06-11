export type BoleGroundType =
  | "red_bole_traditional"
  | "yellow_bole_warm"
  | "black_bole_dark"
  | "white_bole_silver"
  | "synthetic_bole_modern";

const specs: Record<BoleGroundType, {
  smoothFinish: number; adhesion: number; burnishGlow: number;
  drySpeed: number; cost: number; traditional: boolean; forSilver: boolean;
  claySource: string; use: string;
}> = {
  red_bole_traditional: {
    smoothFinish: 90, adhesion: 88, burnishGlow: 92,
    drySpeed: 75, cost: 8, traditional: true, forSilver: false,
    claySource: "armenian_red_clay", use: "classic_gold_water_gild",
  },
  yellow_bole_warm: {
    smoothFinish: 88, adhesion: 85, burnishGlow: 88,
    drySpeed: 78, cost: 7, traditional: true, forSilver: false,
    claySource: "french_yellow_clay", use: "warm_undertone_gild",
  },
  black_bole_dark: {
    smoothFinish: 85, adhesion: 82, burnishGlow: 85,
    drySpeed: 80, cost: 7, traditional: true, forSilver: false,
    claySource: "graphite_dark_clay", use: "antique_aged_effect",
  },
  white_bole_silver: {
    smoothFinish: 88, adhesion: 85, burnishGlow: 90,
    drySpeed: 78, cost: 8, traditional: true, forSilver: true,
    claySource: "kaolin_white_clay", use: "silver_leaf_undercoat",
  },
  synthetic_bole_modern: {
    smoothFinish: 82, adhesion: 90, burnishGlow: 80,
    drySpeed: 90, cost: 5, traditional: false, forSilver: false,
    claySource: "acrylic_clay_blend", use: "quick_dry_modern_gild",
  },
};

export function smoothFinish(t: BoleGroundType): number { return specs[t].smoothFinish; }
export function adhesion(t: BoleGroundType): number { return specs[t].adhesion; }
export function burnishGlow(t: BoleGroundType): number { return specs[t].burnishGlow; }
export function drySpeed(t: BoleGroundType): number { return specs[t].drySpeed; }
export function boleCost(t: BoleGroundType): number { return specs[t].cost; }
export function traditional(t: BoleGroundType): boolean { return specs[t].traditional; }
export function forSilver(t: BoleGroundType): boolean { return specs[t].forSilver; }
export function claySource(t: BoleGroundType): string { return specs[t].claySource; }
export function bestUse(t: BoleGroundType): string { return specs[t].use; }
export function boleGrounds(): BoleGroundType[] { return Object.keys(specs) as BoleGroundType[]; }
