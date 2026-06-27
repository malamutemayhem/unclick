export type BomFormatType =
  | "flat_csv_simple"
  | "hierarchical_multi"
  | "consolidated_merged"
  | "costed_approved"
  | "manufacturer_pn";

const DATA: Record<BomFormatType, {
  readability: number; procureReady: number; traceability: number;
  altParts: number; formatCost: number; automated: boolean;
  forPurchase: boolean; structure: string; bestUse: string;
}> = {
  flat_csv_simple: { readability: 9, procureReady: 5, traceability: 3, altParts: 2, formatCost: 1, automated: true, forPurchase: false, structure: "single_sheet_flat", bestUse: "prototype_quick_order" },
  hierarchical_multi: { readability: 6, procureReady: 6, traceability: 8, altParts: 5, formatCost: 3, automated: true, forPurchase: false, structure: "block_level_nested", bestUse: "multi_board_system_bom" },
  consolidated_merged: { readability: 7, procureReady: 8, traceability: 6, altParts: 4, formatCost: 2, automated: true, forPurchase: true, structure: "grouped_quantity_sum", bestUse: "volume_purchase_order" },
  costed_approved: { readability: 5, procureReady: 10, traceability: 9, altParts: 8, formatCost: 5, automated: false, forPurchase: true, structure: "priced_sourced_approved", bestUse: "production_release_bom" },
  manufacturer_pn: { readability: 6, procureReady: 9, traceability: 10, altParts: 10, formatCost: 4, automated: true, forPurchase: true, structure: "mpn_cross_reference", bestUse: "supply_chain_resilience" },
};

const get = (t: BomFormatType) => DATA[t];

export const readability = (t: BomFormatType) => get(t).readability;
export const procureReady = (t: BomFormatType) => get(t).procureReady;
export const traceability = (t: BomFormatType) => get(t).traceability;
export const altParts = (t: BomFormatType) => get(t).altParts;
export const formatCost = (t: BomFormatType) => get(t).formatCost;
export const automated = (t: BomFormatType) => get(t).automated;
export const forPurchase = (t: BomFormatType) => get(t).forPurchase;
export const structure = (t: BomFormatType) => get(t).structure;
export const bestUse = (t: BomFormatType) => get(t).bestUse;
export const bomFormats = (): BomFormatType[] => Object.keys(DATA) as BomFormatType[];
