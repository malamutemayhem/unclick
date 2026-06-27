export type ChlorineAnalyzerType =
  | "amperometric_membrane"
  | "colorimetric_dpd"
  | "polarographic_bare"
  | "reagentless_uv_abs"
  | "ion_selective_electrode";

interface ChlorineAnalyzerData {
  accuracy: number;
  response: number;
  reagentFree: number;
  maintenance: number;
  caCost: number;
  online: boolean;
  forFreeChlorine: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<ChlorineAnalyzerType, ChlorineAnalyzerData> = {
  amperometric_membrane: {
    accuracy: 9, response: 8, reagentFree: 9, maintenance: 6, caCost: 6,
    online: true, forFreeChlorine: true,
    method: "membrane_covered_electrode_diffusion",
    bestUse: "drinking_water_continuous_free_cl2",
  },
  colorimetric_dpd: {
    accuracy: 10, response: 5, reagentFree: 2, maintenance: 4, caCost: 5,
    online: true, forFreeChlorine: true,
    method: "dpd_reagent_color_photometric_measure",
    bestUse: "regulatory_compliance_total_free_cl2",
  },
  polarographic_bare: {
    accuracy: 7, response: 9, reagentFree: 10, maintenance: 7, caCost: 4,
    online: true, forFreeChlorine: true,
    method: "bare_gold_electrode_direct_reduction",
    bestUse: "process_water_fast_response_simple_cl2",
  },
  reagentless_uv_abs: {
    accuracy: 7, response: 8, reagentFree: 10, maintenance: 9, caCost: 7,
    online: true, forFreeChlorine: false,
    method: "uv_absorption_254nm_no_reagent",
    bestUse: "cooling_water_total_oxidant_monitor",
  },
  ion_selective_electrode: {
    accuracy: 6, response: 7, reagentFree: 8, maintenance: 5, caCost: 3,
    online: true, forFreeChlorine: false,
    method: "chloride_ise_potentiometric_measure",
    bestUse: "pool_spa_simple_chlorine_residual_check",
  },
};

function get(t: ChlorineAnalyzerType): ChlorineAnalyzerData {
  return DATA[t];
}

export const accuracy = (t: ChlorineAnalyzerType) => get(t).accuracy;
export const response = (t: ChlorineAnalyzerType) => get(t).response;
export const reagentFree = (t: ChlorineAnalyzerType) => get(t).reagentFree;
export const maintenance = (t: ChlorineAnalyzerType) => get(t).maintenance;
export const caCost = (t: ChlorineAnalyzerType) => get(t).caCost;
export const online = (t: ChlorineAnalyzerType) => get(t).online;
export const forFreeChlorine = (t: ChlorineAnalyzerType) => get(t).forFreeChlorine;
export const method = (t: ChlorineAnalyzerType) => get(t).method;
export const bestUse = (t: ChlorineAnalyzerType) => get(t).bestUse;
export const chlorineAnalyzerTypes = (): ChlorineAnalyzerType[] =>
  Object.keys(DATA) as ChlorineAnalyzerType[];
