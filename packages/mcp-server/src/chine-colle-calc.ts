// chine-colle-calc - chine-colle adhesive paper types

export type ChineColle =
  | "rice_paper_thin"
  | "gampi_tissue_fine"
  | "kozo_sheet_strong"
  | "mulberry_paper_soft"
  | "lokta_paper_textured";

const DATA: Record<ChineColle, {
  bondStrength: number; transparency: number; textureRange: number; tearResist: number;
  cost: number; handmade: boolean; forDetail: boolean; fiberSource: string; bestUse: string;
}> = {
  rice_paper_thin:       { bondStrength: 7, transparency: 9, textureRange: 5, tearResist: 4, cost: 4, handmade: false, forDetail: true, fiberSource: "rice_straw_pulp", bestUse: "general_chine_colle" },
  gampi_tissue_fine:     { bondStrength: 8, transparency: 10, textureRange: 4, tearResist: 6, cost: 9, handmade: true, forDetail: true, fiberSource: "gampi_bark_fiber", bestUse: "fine_detail_overlay" },
  kozo_sheet_strong:     { bondStrength: 10, transparency: 6, textureRange: 7, tearResist: 10, cost: 7, handmade: true, forDetail: false, fiberSource: "kozo_bark_fiber", bestUse: "strong_bond_collage" },
  mulberry_paper_soft:   { bondStrength: 7, transparency: 8, textureRange: 6, tearResist: 5, cost: 5, handmade: false, forDetail: true, fiberSource: "mulberry_bark_pulp", bestUse: "soft_layer_print" },
  lokta_paper_textured:  { bondStrength: 8, transparency: 5, textureRange: 10, tearResist: 8, cost: 6, handmade: true, forDetail: false, fiberSource: "lokta_bush_bark", bestUse: "textured_surface_collage" },
};

const get = (c: ChineColle) => DATA[c];
export const bondStrength = (c: ChineColle) => get(c).bondStrength;
export const transparency = (c: ChineColle) => get(c).transparency;
export const textureRange = (c: ChineColle) => get(c).textureRange;
export const tearResist = (c: ChineColle) => get(c).tearResist;
export const chineCost = (c: ChineColle) => get(c).cost;
export const handmade = (c: ChineColle) => get(c).handmade;
export const forDetail = (c: ChineColle) => get(c).forDetail;
export const fiberSource = (c: ChineColle) => get(c).fiberSource;
export const bestUse = (c: ChineColle) => get(c).bestUse;
export const chineColles = (): ChineColle[] => Object.keys(DATA) as ChineColle[];
