export type PeristalticPumpType =
  | "roller_industrial_hose"
  | "shoe_squeeze_heavy_duty"
  | "micro_tubing_lab"
  | "high_pressure_mining"
  | "sanitary_pharma_grade";

interface PeristalticPumpData {
  flow: number;
  pressure: number;
  gentleness: number;
  selfPrime: number;
  ppCost: number;
  sealless: boolean;
  forAbrasive: boolean;
  tubing: string;
  bestUse: string;
}

const DATA: Record<PeristalticPumpType, PeristalticPumpData> = {
  roller_industrial_hose: {
    flow: 8, pressure: 7, gentleness: 8, selfPrime: 9, ppCost: 6,
    sealless: true, forAbrasive: true,
    tubing: "reinforced_natural_rubber_hose",
    bestUse: "wastewater_chemical_dosing",
  },
  shoe_squeeze_heavy_duty: {
    flow: 9, pressure: 8, gentleness: 7, selfPrime: 9, ppCost: 7,
    sealless: true, forAbrasive: true,
    tubing: "heavy_wall_synthetic_squeeze",
    bestUse: "mining_slurry_lime_transfer",
  },
  micro_tubing_lab: {
    flow: 3, pressure: 3, gentleness: 10, selfPrime: 8, ppCost: 4,
    sealless: true, forAbrasive: false,
    tubing: "silicone_precision_micro_bore",
    bestUse: "laboratory_cell_culture_reagent",
  },
  high_pressure_mining: {
    flow: 9, pressure: 10, gentleness: 5, selfPrime: 8, ppCost: 9,
    sealless: true, forAbrasive: true,
    tubing: "multi_layer_reinforced_hose",
    bestUse: "filter_press_feed_high_solids",
  },
  sanitary_pharma_grade: {
    flow: 6, pressure: 5, gentleness: 9, selfPrime: 9, ppCost: 8,
    sealless: true, forAbrasive: false,
    tubing: "platinum_cured_silicone_usp",
    bestUse: "pharma_biotech_sterile_transfer",
  },
};

function get(t: PeristalticPumpType): PeristalticPumpData {
  return DATA[t];
}

export const flow = (t: PeristalticPumpType) => get(t).flow;
export const pressure = (t: PeristalticPumpType) => get(t).pressure;
export const gentleness = (t: PeristalticPumpType) => get(t).gentleness;
export const selfPrime = (t: PeristalticPumpType) => get(t).selfPrime;
export const ppCost = (t: PeristalticPumpType) => get(t).ppCost;
export const sealless = (t: PeristalticPumpType) => get(t).sealless;
export const forAbrasive = (t: PeristalticPumpType) => get(t).forAbrasive;
export const tubing = (t: PeristalticPumpType) => get(t).tubing;
export const bestUse = (t: PeristalticPumpType) => get(t).bestUse;
export const peristalticPumpTypes = (): PeristalticPumpType[] =>
  Object.keys(DATA) as PeristalticPumpType[];
