// gutta-resist-calc - silk painting gutta resist types

export type GuttaResist =
  | "water_gutta_clear"
  | "solvent_gutta_strong"
  | "metallic_gutta_gold"
  | "wax_resist_batik"
  | "rubber_resist_peel";

const DATA: Record<GuttaResist, {
  lineClean: number; holdStrength: number; removeEase: number; colorRange: number;
  cost: number; washable: boolean; decorative: boolean; resistBase: string; bestUse: string;
}> = {
  water_gutta_clear:     { lineClean: 8, holdStrength: 6, removeEase: 9, colorRange: 3, cost: 4, washable: true, decorative: false, resistBase: "water_polymer_gel", bestUse: "general_silk_outline" },
  solvent_gutta_strong:  { lineClean: 9, holdStrength: 10, removeEase: 4, colorRange: 4, cost: 6, washable: false, decorative: false, resistBase: "solvent_rubber_solution", bestUse: "strong_barrier_line" },
  metallic_gutta_gold:   { lineClean: 7, holdStrength: 7, removeEase: 5, colorRange: 8, cost: 8, washable: false, decorative: true, resistBase: "metallic_pigment_gel", bestUse: "decorative_gold_outline" },
  wax_resist_batik:      { lineClean: 5, holdStrength: 8, removeEase: 6, colorRange: 2, cost: 3, washable: true, decorative: false, resistBase: "hot_paraffin_wax", bestUse: "batik_style_resist" },
  rubber_resist_peel:    { lineClean: 6, holdStrength: 9, removeEase: 10, colorRange: 5, cost: 5, washable: true, decorative: false, resistBase: "latex_rubber_liquid", bestUse: "peel_off_mask_area" },
};

const get = (r: GuttaResist) => DATA[r];
export const lineClean = (r: GuttaResist) => get(r).lineClean;
export const holdStrength = (r: GuttaResist) => get(r).holdStrength;
export const removeEase = (r: GuttaResist) => get(r).removeEase;
export const colorRange = (r: GuttaResist) => get(r).colorRange;
export const resistCost = (r: GuttaResist) => get(r).cost;
export const washable = (r: GuttaResist) => get(r).washable;
export const decorative = (r: GuttaResist) => get(r).decorative;
export const resistBase = (r: GuttaResist) => get(r).resistBase;
export const bestUse = (r: GuttaResist) => get(r).bestUse;
export const guttaResists = (): GuttaResist[] => Object.keys(DATA) as GuttaResist[];
