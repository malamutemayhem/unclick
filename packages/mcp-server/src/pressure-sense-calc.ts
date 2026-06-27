export type PressureSense =
  | "piezoresistive_mems"
  | "capacitive_diaphragm"
  | "piezoelectric_quartz"
  | "strain_gauge_bonded"
  | "optical_fiber_fbg";

const DATA: Record<PressureSense, {
  accuracy: number; range: number; bandwidth: number;
  tempStability: number; prCost: number; absolute: boolean;
  forProcess: boolean; element: string; bestUse: string;
}> = {
  piezoresistive_mems: {
    accuracy: 7, range: 7, bandwidth: 8,
    tempStability: 6, prCost: 2, absolute: true,
    forProcess: true, element: "silicon_wheatstone_bridge",
    bestUse: "industrial_process_transmit",
  },
  capacitive_diaphragm: {
    accuracy: 9, range: 6, bandwidth: 6,
    tempStability: 8, prCost: 5, absolute: true,
    forProcess: true, element: "ceramic_alumina_gap",
    bestUse: "vacuum_gauge_precision",
  },
  piezoelectric_quartz: {
    accuracy: 8, range: 10, bandwidth: 10,
    tempStability: 7, prCost: 7, absolute: false,
    forProcess: false, element: "quartz_crystal_charge",
    bestUse: "dynamic_blast_combustion",
  },
  strain_gauge_bonded: {
    accuracy: 8, range: 8, bandwidth: 7,
    tempStability: 7, prCost: 3, absolute: false,
    forProcess: true, element: "metal_foil_resistance",
    bestUse: "load_cell_force_weigh",
  },
  optical_fiber_fbg: {
    accuracy: 9, range: 5, bandwidth: 5,
    tempStability: 9, prCost: 8, absolute: true,
    forProcess: false, element: "bragg_grating_wavelength",
    bestUse: "downhole_harsh_environment",
  },
};

const get = (t: PressureSense) => DATA[t];

export const accuracy = (t: PressureSense) => get(t).accuracy;
export const range = (t: PressureSense) => get(t).range;
export const bandwidth = (t: PressureSense) => get(t).bandwidth;
export const tempStability = (t: PressureSense) => get(t).tempStability;
export const prCost = (t: PressureSense) => get(t).prCost;
export const absolute = (t: PressureSense) => get(t).absolute;
export const forProcess = (t: PressureSense) => get(t).forProcess;
export const element = (t: PressureSense) => get(t).element;
export const bestUse = (t: PressureSense) => get(t).bestUse;
export const pressureSenses = (): PressureSense[] => Object.keys(DATA) as PressureSense[];
