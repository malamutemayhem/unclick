export type LubricantSystemType =
  | "single_line_progressive"
  | "dual_line_parallel"
  | "oil_mist_centralized"
  | "circulating_splash_bath"
  | "minimal_quantity_mql";

interface LubricantSystemData {
  precision: number;
  pointCount: number;
  distance: number;
  reliability: number;
  lsCost: number;
  oilMist: boolean;
  forCnc: boolean;
  pump: string;
  bestUse: string;
}

const DATA: Record<LubricantSystemType, LubricantSystemData> = {
  single_line_progressive: {
    precision: 8, pointCount: 7, distance: 6, reliability: 8, lsCost: 5,
    oilMist: false, forCnc: true,
    pump: "piston_pump_progressive_divider",
    bestUse: "cnc_machine_press_packaging_line",
  },
  dual_line_parallel: {
    precision: 7, pointCount: 10, distance: 10, reliability: 9, lsCost: 8,
    oilMist: false, forCnc: false,
    pump: "piston_pump_dual_line_manifold",
    bestUse: "steel_mill_paper_machine_long_run",
  },
  oil_mist_centralized: {
    precision: 6, pointCount: 8, distance: 9, reliability: 7, lsCost: 7,
    oilMist: true, forCnc: false,
    pump: "venturi_mist_generator_reclassifier",
    bestUse: "bearing_housing_coupling_spindle",
  },
  circulating_splash_bath: {
    precision: 4, pointCount: 4, distance: 3, reliability: 10, lsCost: 3,
    oilMist: false, forCnc: false,
    pump: "gear_pump_reservoir_filter_cooler",
    bestUse: "gearbox_reducer_enclosed_splash",
  },
  minimal_quantity_mql: {
    precision: 9, pointCount: 3, distance: 4, reliability: 8, lsCost: 6,
    oilMist: true, forCnc: true,
    pump: "piston_metering_aerosol_nozzle",
    bestUse: "near_dry_machining_eco_precision",
  },
};

function get(t: LubricantSystemType): LubricantSystemData {
  return DATA[t];
}

export const precision = (t: LubricantSystemType) => get(t).precision;
export const pointCount = (t: LubricantSystemType) => get(t).pointCount;
export const distance = (t: LubricantSystemType) => get(t).distance;
export const reliability = (t: LubricantSystemType) => get(t).reliability;
export const lsCost_ = (t: LubricantSystemType) => get(t).lsCost;
export const oilMist = (t: LubricantSystemType) => get(t).oilMist;
export const forCnc = (t: LubricantSystemType) => get(t).forCnc;
export const pump = (t: LubricantSystemType) => get(t).pump;
export const bestUse = (t: LubricantSystemType) => get(t).bestUse;
export const lubricantSystemTypes = (): LubricantSystemType[] =>
  Object.keys(DATA) as LubricantSystemType[];
