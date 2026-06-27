export type GoldLeafType =
  | "genuine_gold_23k"
  | "imitation_gold_dutch"
  | "silver_leaf_pure"
  | "copper_leaf_warm"
  | "variegated_leaf_blend";

const specs: Record<GoldLeafType, {
  lustre: number; durability: number; handleEase: number;
  coverageEven: number; cost: number; genuine: boolean; tarnishProof: boolean;
  metalContent: string; use: string;
}> = {
  genuine_gold_23k: {
    lustre: 95, durability: 92, handleEase: 72,
    coverageEven: 85, cost: 15, genuine: true, tarnishProof: true,
    metalContent: "pure_gold_23_karat", use: "fine_art_restoration",
  },
  imitation_gold_dutch: {
    lustre: 82, durability: 75, handleEase: 88,
    coverageEven: 85, cost: 4, genuine: false, tarnishProof: false,
    metalContent: "brass_alloy_sheet", use: "craft_decorative_gild",
  },
  silver_leaf_pure: {
    lustre: 90, durability: 78, handleEase: 70,
    coverageEven: 82, cost: 10, genuine: true, tarnishProof: false,
    metalContent: "pure_silver_sheet", use: "silver_accent_detail",
  },
  copper_leaf_warm: {
    lustre: 85, durability: 72, handleEase: 85,
    coverageEven: 80, cost: 5, genuine: false, tarnishProof: false,
    metalContent: "copper_alloy_sheet", use: "warm_patina_surface",
  },
  variegated_leaf_blend: {
    lustre: 88, durability: 70, handleEase: 78,
    coverageEven: 75, cost: 6, genuine: false, tarnishProof: false,
    metalContent: "multi_metal_blend", use: "unique_pattern_surface",
  },
};

export function lustre(t: GoldLeafType): number { return specs[t].lustre; }
export function durability(t: GoldLeafType): number { return specs[t].durability; }
export function handleEase(t: GoldLeafType): number { return specs[t].handleEase; }
export function coverageEven(t: GoldLeafType): number { return specs[t].coverageEven; }
export function leafCost(t: GoldLeafType): number { return specs[t].cost; }
export function genuine(t: GoldLeafType): boolean { return specs[t].genuine; }
export function tarnishProof(t: GoldLeafType): boolean { return specs[t].tarnishProof; }
export function metalContent(t: GoldLeafType): string { return specs[t].metalContent; }
export function bestUse(t: GoldLeafType): string { return specs[t].use; }
export function goldLeafs(): GoldLeafType[] { return Object.keys(specs) as GoldLeafType[]; }
