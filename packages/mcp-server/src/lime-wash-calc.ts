export type LimeWashType =
  | "slaked_lime_standard"
  | "tinted_lime_color"
  | "casein_lime_durable"
  | "mineral_paint_modern"
  | "distemper_chalk_soft";

const specs: Record<LimeWashType, {
  breathable: number; colorDepth: number; durability: number;
  applyEase: number; cost: number; traditional: boolean; tinted: boolean;
  baseComp: string; use: string;
}> = {
  slaked_lime_standard: {
    breathable: 95, colorDepth: 75, durability: 82,
    applyEase: 85, cost: 5, traditional: true, tinted: false,
    baseComp: "calcium_hydroxide_water", use: "classic_white_lime_coat",
  },
  tinted_lime_color: {
    breathable: 92, colorDepth: 85, durability: 80,
    applyEase: 82, cost: 7, traditional: true, tinted: true,
    baseComp: "lime_earth_pigment_mix", use: "colored_heritage_wall",
  },
  casein_lime_durable: {
    breathable: 88, colorDepth: 80, durability: 90,
    applyEase: 78, cost: 9, traditional: false, tinted: false,
    baseComp: "casein_lime_protein", use: "durable_interior_coat",
  },
  mineral_paint_modern: {
    breathable: 85, colorDepth: 88, durability: 92,
    applyEase: 90, cost: 10, traditional: false, tinted: true,
    baseComp: "potassium_silicate_bind", use: "modern_mineral_finish",
  },
  distemper_chalk_soft: {
    breathable: 90, colorDepth: 72, durability: 70,
    applyEase: 88, cost: 4, traditional: true, tinted: false,
    baseComp: "chalk_glue_water", use: "soft_matte_ceiling",
  },
};

export function breathable(t: LimeWashType): number { return specs[t].breathable; }
export function colorDepth(t: LimeWashType): number { return specs[t].colorDepth; }
export function durability(t: LimeWashType): number { return specs[t].durability; }
export function applyEase(t: LimeWashType): number { return specs[t].applyEase; }
export function washCost(t: LimeWashType): number { return specs[t].cost; }
export function traditional(t: LimeWashType): boolean { return specs[t].traditional; }
export function tinted(t: LimeWashType): boolean { return specs[t].tinted; }
export function baseComp(t: LimeWashType): string { return specs[t].baseComp; }
export function bestUse(t: LimeWashType): string { return specs[t].use; }
export function limeWashs(): LimeWashType[] { return Object.keys(specs) as LimeWashType[]; }
