export type GlazingPuttyType =
  | "linseed_oil_standard"
  | "acrylic_latex_modern"
  | "butyl_rubber_flex"
  | "epoxy_putty_strong"
  | "silicone_based_clear";

const specs: Record<GlazingPuttyType, {
  sealTight: number; workTime: number; durability: number;
  flexAfterCure: number; cost: number; waterproof: boolean; paintable: boolean;
  baseType: string; use: string;
}> = {
  linseed_oil_standard: {
    sealTight: 80, workTime: 90, durability: 72,
    flexAfterCure: 65, cost: 10, waterproof: false, paintable: true,
    baseType: "linseed_oil_whiting", use: "traditional_window_glaze",
  },
  acrylic_latex_modern: {
    sealTight: 85, workTime: 82, durability: 85,
    flexAfterCure: 78, cost: 15, waterproof: true, paintable: true,
    baseType: "acrylic_polymer_fill", use: "modern_window_glaze",
  },
  butyl_rubber_flex: {
    sealTight: 88, workTime: 75, durability: 90,
    flexAfterCure: 92, cost: 20, waterproof: true, paintable: false,
    baseType: "butyl_rubber_compound", use: "flex_movement_seal",
  },
  epoxy_putty_strong: {
    sealTight: 95, workTime: 60, durability: 95,
    flexAfterCure: 55, cost: 30, waterproof: true, paintable: true,
    baseType: "two_part_epoxy_resin", use: "structural_glass_bond",
  },
  silicone_based_clear: {
    sealTight: 82, workTime: 78, durability: 88,
    flexAfterCure: 85, cost: 18, waterproof: true, paintable: false,
    baseType: "clear_silicone_gel", use: "clear_seal_display",
  },
};

export function sealTight(t: GlazingPuttyType): number { return specs[t].sealTight; }
export function workTime(t: GlazingPuttyType): number { return specs[t].workTime; }
export function durability(t: GlazingPuttyType): number { return specs[t].durability; }
export function flexAfterCure(t: GlazingPuttyType): number { return specs[t].flexAfterCure; }
export function puttyCost(t: GlazingPuttyType): number { return specs[t].cost; }
export function waterproof(t: GlazingPuttyType): boolean { return specs[t].waterproof; }
export function paintable(t: GlazingPuttyType): boolean { return specs[t].paintable; }
export function baseType(t: GlazingPuttyType): string { return specs[t].baseType; }
export function bestUse(t: GlazingPuttyType): string { return specs[t].use; }
export function glazingPuttys(): GlazingPuttyType[] { return Object.keys(specs) as GlazingPuttyType[]; }
