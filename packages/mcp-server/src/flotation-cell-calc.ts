export type FlotationCellType =
  | "mechanical_impeller_tank"
  | "column_cell_sparger"
  | "jameson_downcomer_jet"
  | "flash_flotation_skimair"
  | "dissolved_air_daf";

const DATA: Record<FlotationCellType, {
  recovery: number; selectivity: number; capacity: number;
  airControl: number; fcCost: number; columnType: boolean;
  forRougher: boolean; aeration: string; bestUse: string;
}> = {
  mechanical_impeller_tank: {
    recovery: 8, selectivity: 6, capacity: 9,
    airControl: 6, fcCost: 2, columnType: false,
    forRougher: true, aeration: "rotor_stator_self_aspiration",
    bestUse: "copper_zinc_rougher_scavenger",
  },
  column_cell_sparger: {
    recovery: 7, selectivity: 10, capacity: 7,
    airControl: 9, fcCost: 3, columnType: true,
    forRougher: false, aeration: "sparger_bubble_wash_water",
    bestUse: "cleaner_stage_high_grade_conc",
  },
  jameson_downcomer_jet: {
    recovery: 8, selectivity: 8, capacity: 6,
    airControl: 8, fcCost: 4, columnType: true,
    forRougher: false, aeration: "plunging_jet_downcomer_mix",
    bestUse: "coal_fines_phosphate_cleaning",
  },
  flash_flotation_skimair: {
    recovery: 9, selectivity: 5, capacity: 8,
    airControl: 5, fcCost: 3, columnType: false,
    forRougher: true, aeration: "cyclone_underflow_flash_skim",
    bestUse: "grinding_circuit_coarse_recovery",
  },
  dissolved_air_daf: {
    recovery: 6, selectivity: 7, capacity: 7,
    airControl: 7, fcCost: 2, columnType: false,
    forRougher: false, aeration: "pressurized_dissolved_micro",
    bestUse: "wastewater_oil_grease_removal",
  },
};

const get = (t: FlotationCellType) => DATA[t];

export const recovery = (t: FlotationCellType) => get(t).recovery;
export const selectivity = (t: FlotationCellType) => get(t).selectivity;
export const capacity = (t: FlotationCellType) => get(t).capacity;
export const airControl = (t: FlotationCellType) => get(t).airControl;
export const fcCost = (t: FlotationCellType) => get(t).fcCost;
export const columnType = (t: FlotationCellType) => get(t).columnType;
export const forRougher = (t: FlotationCellType) => get(t).forRougher;
export const aeration = (t: FlotationCellType) => get(t).aeration;
export const bestUse = (t: FlotationCellType) => get(t).bestUse;
export const flotationCellTypes = (): FlotationCellType[] => Object.keys(DATA) as FlotationCellType[];
