// collagraph-calc - collagraph printmaking plate types

export type Collagraph =
  | "cardboard_collage_basic"
  | "carborundum_grit_texture"
  | "fabric_collage_soft"
  | "acrylic_gel_build"
  | "metal_leaf_collage";

const DATA: Record<Collagraph, {
  textureDepth: number; detailFine: number; durability: number; buildEase: number;
  cost: number; waterproof: boolean; forIntaglio: boolean; plateBase: string; bestUse: string;
}> = {
  cardboard_collage_basic: { textureDepth: 6, detailFine: 5, durability: 3, buildEase: 10, cost: 2, waterproof: false, forIntaglio: false, plateBase: "layered_card_stock", bestUse: "beginner_relief_print" },
  carborundum_grit_texture: { textureDepth: 10, detailFine: 6, durability: 8, buildEase: 6, cost: 7, waterproof: true, forIntaglio: true, plateBase: "grit_bonded_board", bestUse: "deep_texture_intaglio" },
  fabric_collage_soft: { textureDepth: 7, detailFine: 4, durability: 4, buildEase: 8, cost: 4, waterproof: false, forIntaglio: false, plateBase: "glued_fabric_layer", bestUse: "soft_texture_relief" },
  acrylic_gel_build: { textureDepth: 8, detailFine: 8, durability: 7, buildEase: 7, cost: 6, waterproof: true, forIntaglio: true, plateBase: "gel_medium_buildup", bestUse: "mixed_texture_print" },
  metal_leaf_collage: { textureDepth: 5, detailFine: 9, durability: 9, buildEase: 5, cost: 9, waterproof: true, forIntaglio: false, plateBase: "foil_laminate_surface", bestUse: "fine_metallic_relief" },
};

const get = (c: Collagraph) => DATA[c];
export const textureDepth = (c: Collagraph) => get(c).textureDepth;
export const detailFine = (c: Collagraph) => get(c).detailFine;
export const durability = (c: Collagraph) => get(c).durability;
export const buildEase = (c: Collagraph) => get(c).buildEase;
export const collagCost = (c: Collagraph) => get(c).cost;
export const waterproof = (c: Collagraph) => get(c).waterproof;
export const forIntaglio = (c: Collagraph) => get(c).forIntaglio;
export const plateBase = (c: Collagraph) => get(c).plateBase;
export const bestUse = (c: Collagraph) => get(c).bestUse;
export const collagraphs = (): Collagraph[] => Object.keys(DATA) as Collagraph[];
