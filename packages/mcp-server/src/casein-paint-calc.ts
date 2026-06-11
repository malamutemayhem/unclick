// casein-paint-calc - casein paint types

export type CaseinPaint =
  | "tube_casein_ready"
  | "powder_casein_mix"
  | "borax_casein_classic"
  | "lime_casein_fresco"
  | "ammonia_casein_strong";

const DATA: Record<CaseinPaint, {
  matteFinish: number; adhesion: number; mixEase: number; durability: number;
  cost: number; premixed: boolean; forMural: boolean; solventBase: string; bestUse: string;
}> = {
  tube_casein_ready:     { matteFinish: 8, adhesion: 8, mixEase: 10, durability: 7, cost: 7, premixed: true, forMural: false, solventBase: "ammonia_casein_tube", bestUse: "general_studio_paint" },
  powder_casein_mix:     { matteFinish: 9, adhesion: 8, mixEase: 4, durability: 8, cost: 4, premixed: false, forMural: false, solventBase: "dry_casein_powder", bestUse: "custom_color_mix" },
  borax_casein_classic:  { matteFinish: 10, adhesion: 9, mixEase: 5, durability: 9, cost: 5, premixed: false, forMural: true, solventBase: "borax_dissolved_casein", bestUse: "traditional_mural_paint" },
  lime_casein_fresco:    { matteFinish: 10, adhesion: 10, mixEase: 3, durability: 10, cost: 4, premixed: false, forMural: true, solventBase: "lime_casein_blend", bestUse: "fresco_secco_mural" },
  ammonia_casein_strong: { matteFinish: 8, adhesion: 9, mixEase: 6, durability: 8, cost: 6, premixed: false, forMural: false, solventBase: "ammonia_water_casein", bestUse: "strong_bond_surface" },
};

const get = (c: CaseinPaint) => DATA[c];
export const matteFinish = (c: CaseinPaint) => get(c).matteFinish;
export const adhesion = (c: CaseinPaint) => get(c).adhesion;
export const mixEase = (c: CaseinPaint) => get(c).mixEase;
export const durability = (c: CaseinPaint) => get(c).durability;
export const caseinCost = (c: CaseinPaint) => get(c).cost;
export const premixed = (c: CaseinPaint) => get(c).premixed;
export const forMural = (c: CaseinPaint) => get(c).forMural;
export const solventBase = (c: CaseinPaint) => get(c).solventBase;
export const bestUse = (c: CaseinPaint) => get(c).bestUse;
export const caseinPaints = (): CaseinPaint[] => Object.keys(DATA) as CaseinPaint[];
