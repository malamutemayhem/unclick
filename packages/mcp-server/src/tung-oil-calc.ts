export type TungOilType =
  | "pure_tung_raw"
  | "polymerized_tung_fast"
  | "dark_tung_tinted"
  | "citrus_tung_blend"
  | "tung_varnish_hard";

const specs: Record<TungOilType, {
  penetration: number; waterResist: number; durability: number;
  drySpeed: number; cost: number; pure: boolean; tinted: boolean;
  cureMethod: string; use: string;
}> = {
  pure_tung_raw: {
    penetration: 95, waterResist: 88, durability: 85,
    drySpeed: 60, cost: 10, pure: true, tinted: false,
    cureMethod: "oxidative_polymerize", use: "deep_penetrate_protect",
  },
  polymerized_tung_fast: {
    penetration: 82, waterResist: 85, durability: 88,
    drySpeed: 85, cost: 12, pure: false, tinted: false,
    cureMethod: "heat_polymerized_cure", use: "fast_build_finish",
  },
  dark_tung_tinted: {
    penetration: 88, waterResist: 82, durability: 82,
    drySpeed: 72, cost: 9, pure: false, tinted: true,
    cureMethod: "pigment_oil_cure", use: "dark_wood_enhance",
  },
  citrus_tung_blend: {
    penetration: 90, waterResist: 80, durability: 80,
    drySpeed: 78, cost: 8, pure: false, tinted: false,
    cureMethod: "citrus_solvent_cure", use: "food_safe_finish",
  },
  tung_varnish_hard: {
    penetration: 75, waterResist: 92, durability: 95,
    drySpeed: 80, cost: 11, pure: false, tinted: false,
    cureMethod: "resin_blend_harden", use: "hard_surface_topcoat",
  },
};

export function penetration(t: TungOilType): number { return specs[t].penetration; }
export function waterResist(t: TungOilType): number { return specs[t].waterResist; }
export function durability(t: TungOilType): number { return specs[t].durability; }
export function drySpeed(t: TungOilType): number { return specs[t].drySpeed; }
export function oilCost(t: TungOilType): number { return specs[t].cost; }
export function pure(t: TungOilType): boolean { return specs[t].pure; }
export function tinted(t: TungOilType): boolean { return specs[t].tinted; }
export function cureMethod(t: TungOilType): string { return specs[t].cureMethod; }
export function bestUse(t: TungOilType): string { return specs[t].use; }
export function tungOils(): TungOilType[] { return Object.keys(specs) as TungOilType[]; }
