// paper-weight-calc - paper weight classification types

export type PaperWeight =
  | "text_weight_light"
  | "cover_weight_heavy"
  | "cardstock_weight_thick"
  | "vellum_weight_sheer"
  | "bristol_weight_rigid";

const DATA: Record<PaperWeight, {
  foldClean: number; printQuality: number; durability: number; feedReliable: number;
  cost: number; forEnvelope: boolean; forStructure: boolean; gsmRange: string; bestUse: string;
}> = {
  text_weight_light:     { foldClean: 9, printQuality: 7, durability: 4, feedReliable: 9, cost: 3, forEnvelope: true, forStructure: false, gsmRange: "75_to_100_gsm", bestUse: "letter_insert_print" },
  cover_weight_heavy:    { foldClean: 6, printQuality: 8, durability: 7, feedReliable: 7, cost: 6, forEnvelope: false, forStructure: false, gsmRange: "176_to_270_gsm", bestUse: "card_cover_print" },
  cardstock_weight_thick: { foldClean: 4, printQuality: 8, durability: 9, feedReliable: 5, cost: 7, forEnvelope: false, forStructure: true, gsmRange: "270_to_400_gsm", bestUse: "box_structure_build" },
  vellum_weight_sheer:   { foldClean: 8, printQuality: 6, durability: 3, feedReliable: 6, cost: 5, forEnvelope: true, forStructure: false, gsmRange: "48_to_74_gsm", bestUse: "overlay_sheer_layer" },
  bristol_weight_rigid:  { foldClean: 3, printQuality: 10, durability: 10, feedReliable: 4, cost: 8, forEnvelope: false, forStructure: true, gsmRange: "250_to_500_gsm", bestUse: "art_rigid_surface" },
};

const get = (w: PaperWeight) => DATA[w];
export const foldClean = (w: PaperWeight) => get(w).foldClean;
export const printQuality = (w: PaperWeight) => get(w).printQuality;
export const durability = (w: PaperWeight) => get(w).durability;
export const feedReliable = (w: PaperWeight) => get(w).feedReliable;
export const weightCost = (w: PaperWeight) => get(w).cost;
export const forEnvelope = (w: PaperWeight) => get(w).forEnvelope;
export const forStructure = (w: PaperWeight) => get(w).forStructure;
export const gsmRange = (w: PaperWeight) => get(w).gsmRange;
export const bestUse = (w: PaperWeight) => get(w).bestUse;
export const paperWeights = (): PaperWeight[] => Object.keys(DATA) as PaperWeight[];
