export type ColumnFlotationType =
  | "conventional_column_sparger"
  | "packed_column_structured"
  | "cavitation_tube_micro"
  | "jameson_cell_downcomer"
  | "reflux_flotation_inclined";

interface ColumnFlotationData {
  grade: number;
  recovery: number;
  selectivity: number;
  waterUse: number;
  cfCost: number;
  continuous: boolean;
  forFine: boolean;
  sparger: string;
  bestUse: string;
}

const DATA: Record<ColumnFlotationType, ColumnFlotationData> = {
  conventional_column_sparger: {
    grade: 8, recovery: 7, selectivity: 9, waterUse: 6, cfCost: 6,
    continuous: true, forFine: true,
    sparger: "porous_sparger_countercurrent_wash_water",
    bestUse: "cleaner_scavenger_fine_mineral_upgrade",
  },
  packed_column_structured: {
    grade: 9, recovery: 8, selectivity: 10, waterUse: 5, cfCost: 7,
    continuous: true, forFine: true,
    sparger: "structured_packing_bubble_coalescence",
    bestUse: "ultra_fine_graphite_talc_high_grade",
  },
  cavitation_tube_micro: {
    grade: 7, recovery: 9, selectivity: 7, waterUse: 7, cfCost: 5,
    continuous: true, forFine: true,
    sparger: "venturi_cavitation_microbubble_generate",
    bestUse: "fine_coal_phosphate_microbubble_attach",
  },
  jameson_cell_downcomer: {
    grade: 8, recovery: 8, selectivity: 8, waterUse: 5, cfCost: 5,
    continuous: true, forFine: false,
    sparger: "plunging_jet_downcomer_self_aspirate",
    bestUse: "copper_zinc_fast_kinetics_compact",
  },
  reflux_flotation_inclined: {
    grade: 9, recovery: 6, selectivity: 9, waterUse: 4, cfCost: 8,
    continuous: true, forFine: true,
    sparger: "inclined_channel_lamella_froth_wash",
    bestUse: "premium_grade_iron_ore_silica_reject",
  },
};

function get(t: ColumnFlotationType): ColumnFlotationData {
  return DATA[t];
}

export const grade = (t: ColumnFlotationType) => get(t).grade;
export const recovery = (t: ColumnFlotationType) => get(t).recovery;
export const selectivity = (t: ColumnFlotationType) => get(t).selectivity;
export const waterUse = (t: ColumnFlotationType) => get(t).waterUse;
export const cfCost = (t: ColumnFlotationType) => get(t).cfCost;
export const continuous = (t: ColumnFlotationType) => get(t).continuous;
export const forFine = (t: ColumnFlotationType) => get(t).forFine;
export const sparger = (t: ColumnFlotationType) => get(t).sparger;
export const bestUse = (t: ColumnFlotationType) => get(t).bestUse;
export const columnFlotationTypes = (): ColumnFlotationType[] =>
  Object.keys(DATA) as ColumnFlotationType[];
