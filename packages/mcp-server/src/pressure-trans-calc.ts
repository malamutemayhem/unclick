export type PressureTransType =
  | "strain_gauge_piezoresist"
  | "capacitive_ceramic_cell"
  | "piezoelectric_dynamic"
  | "resonant_silicon_digital"
  | "mems_micro_machined";

interface PressureTransData {
  accuracy: number;
  response: number;
  stability: number;
  range: number;
  ptCost: number;
  digital: boolean;
  forProcess: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<PressureTransType, PressureTransData> = {
  strain_gauge_piezoresist: {
    accuracy: 8, response: 8, stability: 8, range: 9, ptCost: 5,
    digital: false, forProcess: true,
    element: "diffused_silicon_wheatstone_bridge",
    bestUse: "hydraulic_pneumatic_general_process",
  },
  capacitive_ceramic_cell: {
    accuracy: 9, response: 7, stability: 10, range: 8, ptCost: 7,
    digital: true, forProcess: true,
    element: "alumina_ceramic_capacitive_cell",
    bestUse: "chemical_corrosive_sanitary_process",
  },
  piezoelectric_dynamic: {
    accuracy: 7, response: 10, stability: 6, range: 10, ptCost: 8,
    digital: false, forProcess: false,
    element: "quartz_crystal_charge_output",
    bestUse: "blast_combustion_ballistic_dynamic",
  },
  resonant_silicon_digital: {
    accuracy: 10, response: 6, stability: 10, range: 7, ptCost: 9,
    digital: true, forProcess: true,
    element: "resonant_silicon_frequency_output",
    bestUse: "custody_transfer_fiscal_metering",
  },
  mems_micro_machined: {
    accuracy: 8, response: 9, stability: 7, range: 6, ptCost: 4,
    digital: false, forProcess: false,
    element: "micro_machined_silicon_diaphragm",
    bestUse: "hvac_automotive_consumer_oem",
  },
};

function get(t: PressureTransType): PressureTransData {
  return DATA[t];
}

export const accuracy = (t: PressureTransType) => get(t).accuracy;
export const response = (t: PressureTransType) => get(t).response;
export const stability = (t: PressureTransType) => get(t).stability;
export const range = (t: PressureTransType) => get(t).range;
export const ptCost = (t: PressureTransType) => get(t).ptCost;
export const digital = (t: PressureTransType) => get(t).digital;
export const forProcess = (t: PressureTransType) => get(t).forProcess;
export const element = (t: PressureTransType) => get(t).element;
export const bestUse = (t: PressureTransType) => get(t).bestUse;
export const pressureTransTypes = (): PressureTransType[] =>
  Object.keys(DATA) as PressureTransType[];
