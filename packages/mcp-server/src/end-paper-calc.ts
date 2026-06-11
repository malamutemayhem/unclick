// end-paper-calc - bookbinding endpaper types

export type EndPaper =
  | "plain_white_standard"
  | "marbled_paper_decorative"
  | "printed_pattern_custom"
  | "tipped_in_hinge"
  | "cloth_joint_strong";

const DATA: Record<EndPaper, {
  decorativeValue: number; durability: number; hingeStrength: number; printSurface: number;
  cost: number; decorative: boolean; reinforced: boolean; paperWeight: string; bestUse: string;
}> = {
  plain_white_standard:      { decorativeValue: 2, durability: 6, hingeStrength: 6, printSurface: 8, cost: 1, decorative: false, reinforced: false, paperWeight: "medium_80gsm_stock", bestUse: "economy_case_bind" },
  marbled_paper_decorative:  { decorativeValue: 10, durability: 5, hingeStrength: 5, printSurface: 4, cost: 8, decorative: true, reinforced: false, paperWeight: "heavy_120gsm_marbled", bestUse: "luxury_decorative_bind" },
  printed_pattern_custom:    { decorativeValue: 8, durability: 6, hingeStrength: 5, printSurface: 9, cost: 6, decorative: true, reinforced: false, paperWeight: "medium_100gsm_coated", bestUse: "custom_brand_endsheet" },
  tipped_in_hinge:           { decorativeValue: 4, durability: 8, hingeStrength: 9, printSurface: 6, cost: 4, decorative: false, reinforced: true, paperWeight: "heavy_100gsm_folded", bestUse: "durable_library_bind" },
  cloth_joint_strong:        { decorativeValue: 5, durability: 10, hingeStrength: 10, printSurface: 3, cost: 7, decorative: false, reinforced: true, paperWeight: "cloth_backed_paper", bestUse: "heavy_use_reference" },
};

const get = (e: EndPaper) => DATA[e];
export const decorativeValue = (e: EndPaper) => get(e).decorativeValue;
export const durability = (e: EndPaper) => get(e).durability;
export const hingeStrength = (e: EndPaper) => get(e).hingeStrength;
export const printSurface = (e: EndPaper) => get(e).printSurface;
export const paperCost = (e: EndPaper) => get(e).cost;
export const decorative = (e: EndPaper) => get(e).decorative;
export const reinforced = (e: EndPaper) => get(e).reinforced;
export const paperWeight = (e: EndPaper) => get(e).paperWeight;
export const bestUse = (e: EndPaper) => get(e).bestUse;
export const endPapers = (): EndPaper[] => Object.keys(DATA) as EndPaper[];
