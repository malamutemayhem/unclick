export type SilicaAnalyzerType =
  | "colorimetric_molybdate"
  | "photometric_continuous"
  | "icp_oes_lab"
  | "ion_chromatography"
  | "online_reagent_auto";

interface SilicaAnalyzerData {
  accuracy: number;
  sensitivity: number;
  automation: number;
  maintenance: number;
  saCost: number;
  online: boolean;
  forUltratrace: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<SilicaAnalyzerType, SilicaAnalyzerData> = {
  colorimetric_molybdate: {
    accuracy: 8, sensitivity: 7, automation: 5, maintenance: 5, saCost: 4,
    online: false, forUltratrace: false,
    method: "molybdenum_blue_color_spectrophotometer",
    bestUse: "boiler_water_grab_sample_ppb_silica",
  },
  photometric_continuous: {
    accuracy: 8, sensitivity: 8, automation: 9, maintenance: 6, saCost: 6,
    online: true, forUltratrace: false,
    method: "automated_molybdate_reagent_photometric",
    bestUse: "power_plant_steam_cycle_continuous_sio2",
  },
  icp_oes_lab: {
    accuracy: 10, sensitivity: 10, automation: 7, maintenance: 4, saCost: 9,
    online: false, forUltratrace: true,
    method: "inductively_coupled_plasma_optical_emit",
    bestUse: "lab_multi_element_trace_analysis_ppt",
  },
  ion_chromatography: {
    accuracy: 9, sensitivity: 9, automation: 8, maintenance: 5, saCost: 8,
    online: true, forUltratrace: true,
    method: "anion_exchange_conductivity_detection",
    bestUse: "semiconductor_ultrapure_water_ppt_sio2",
  },
  online_reagent_auto: {
    accuracy: 7, sensitivity: 7, automation: 10, maintenance: 7, saCost: 5,
    online: true, forUltratrace: false,
    method: "auto_reagent_dose_flow_cell_photometer",
    bestUse: "industrial_boiler_feedwater_routine_sio2",
  },
};

function get(t: SilicaAnalyzerType): SilicaAnalyzerData {
  return DATA[t];
}

export const accuracy = (t: SilicaAnalyzerType) => get(t).accuracy;
export const sensitivity = (t: SilicaAnalyzerType) => get(t).sensitivity;
export const automation = (t: SilicaAnalyzerType) => get(t).automation;
export const maintenance = (t: SilicaAnalyzerType) => get(t).maintenance;
export const saCost = (t: SilicaAnalyzerType) => get(t).saCost;
export const online = (t: SilicaAnalyzerType) => get(t).online;
export const forUltratrace = (t: SilicaAnalyzerType) => get(t).forUltratrace;
export const method = (t: SilicaAnalyzerType) => get(t).method;
export const bestUse = (t: SilicaAnalyzerType) => get(t).bestUse;
export const silicaAnalyzerTypes = (): SilicaAnalyzerType[] =>
  Object.keys(DATA) as SilicaAnalyzerType[];
