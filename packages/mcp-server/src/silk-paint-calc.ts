// silk-paint-calc - silk painting dye types

export type SilkPaint =
  | "steam_fix_dye"
  | "iron_fix_dye"
  | "acid_dye_vivid"
  | "reactive_dye_wash"
  | "alcohol_ink_blend";

const DATA: Record<SilkPaint, {
  colorVivid: number; washFast: number; blendSmooth: number; controlFine: number;
  cost: number; steamRequired: boolean; forBeginner: boolean; fixMethod: string; bestUse: string;
}> = {
  steam_fix_dye:     { colorVivid: 10, washFast: 10, blendSmooth: 9, controlFine: 7, cost: 8, steamRequired: true, forBeginner: false, fixMethod: "steam_heat_set", bestUse: "professional_silk_art" },
  iron_fix_dye:      { colorVivid: 7, washFast: 7, blendSmooth: 8, controlFine: 8, cost: 5, steamRequired: false, forBeginner: true, fixMethod: "iron_heat_press", bestUse: "home_studio_silk" },
  acid_dye_vivid:    { colorVivid: 9, washFast: 9, blendSmooth: 6, controlFine: 5, cost: 6, steamRequired: true, forBeginner: false, fixMethod: "acid_steam_fix", bestUse: "vivid_color_immerse" },
  reactive_dye_wash: { colorVivid: 8, washFast: 10, blendSmooth: 5, controlFine: 4, cost: 7, steamRequired: false, forBeginner: false, fixMethod: "chemical_bond_fix", bestUse: "washable_garment_dye" },
  alcohol_ink_blend: { colorVivid: 6, washFast: 4, blendSmooth: 10, controlFine: 9, cost: 4, steamRequired: false, forBeginner: true, fixMethod: "air_dry_evaporate", bestUse: "decorative_scarf_art" },
};

const get = (p: SilkPaint) => DATA[p];
export const colorVivid = (p: SilkPaint) => get(p).colorVivid;
export const washFast = (p: SilkPaint) => get(p).washFast;
export const blendSmooth = (p: SilkPaint) => get(p).blendSmooth;
export const controlFine = (p: SilkPaint) => get(p).controlFine;
export const paintCost = (p: SilkPaint) => get(p).cost;
export const steamRequired = (p: SilkPaint) => get(p).steamRequired;
export const forBeginner = (p: SilkPaint) => get(p).forBeginner;
export const fixMethod = (p: SilkPaint) => get(p).fixMethod;
export const bestUse = (p: SilkPaint) => get(p).bestUse;
export const silkPaints = (): SilkPaint[] => Object.keys(DATA) as SilkPaint[];
