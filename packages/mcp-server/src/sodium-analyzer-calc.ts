export type SodiumAnalyzerType =
  | "ion_selective_electrode_na"
  | "flame_photometer"
  | "colorimetric_reagent"
  | "online_ise_continuous"
  | "icp_ms_ultratrace";

interface SodiumAnalyzerData {
  accuracy: number;
  sensitivity: number;
  automation: number;
  maintenance: number;
  naCost: number;
  online: boolean;
  forUltratrace: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<SodiumAnalyzerType, SodiumAnalyzerData> = {
  ion_selective_electrode_na: {
    accuracy: 7, sensitivity: 7, automation: 6, maintenance: 5, naCost: 4,
    online: false, forUltratrace: false,
    method: "glass_membrane_ise_sodium_selective",
    bestUse: "boiler_water_grab_sample_ppb_sodium",
  },
  flame_photometer: {
    accuracy: 8, sensitivity: 8, automation: 5, maintenance: 5, naCost: 5,
    online: false, forUltratrace: false,
    method: "flame_emission_589nm_sodium_d_line",
    bestUse: "lab_clinical_soil_analysis_na_k_li",
  },
  colorimetric_reagent: {
    accuracy: 7, sensitivity: 6, automation: 4, maintenance: 4, naCost: 3,
    online: false, forUltratrace: false,
    method: "zinc_uranyl_acetate_gravimetric_color",
    bestUse: "field_test_kit_quick_sodium_estimate",
  },
  online_ise_continuous: {
    accuracy: 8, sensitivity: 8, automation: 10, maintenance: 6, naCost: 6,
    online: true, forUltratrace: false,
    method: "flow_cell_ise_temperature_compensated",
    bestUse: "power_plant_steam_condensate_online_na",
  },
  icp_ms_ultratrace: {
    accuracy: 10, sensitivity: 10, automation: 7, maintenance: 4, naCost: 10,
    online: false, forUltratrace: true,
    method: "inductively_coupled_plasma_mass_spec",
    bestUse: "semiconductor_ultrapure_water_ppt_sodium",
  },
};

function get(t: SodiumAnalyzerType): SodiumAnalyzerData {
  return DATA[t];
}

export const accuracy = (t: SodiumAnalyzerType) => get(t).accuracy;
export const sensitivity = (t: SodiumAnalyzerType) => get(t).sensitivity;
export const automation = (t: SodiumAnalyzerType) => get(t).automation;
export const maintenance = (t: SodiumAnalyzerType) => get(t).maintenance;
export const naCost = (t: SodiumAnalyzerType) => get(t).naCost;
export const online = (t: SodiumAnalyzerType) => get(t).online;
export const forUltratrace = (t: SodiumAnalyzerType) => get(t).forUltratrace;
export const method = (t: SodiumAnalyzerType) => get(t).method;
export const bestUse = (t: SodiumAnalyzerType) => get(t).bestUse;
export const sodiumAnalyzerTypes = (): SodiumAnalyzerType[] =>
  Object.keys(DATA) as SodiumAnalyzerType[];
