export type OxygenAnalyzerType =
  | "zirconia_probe_insitu"
  | "paramagnetic_extract"
  | "electrochemical_galvanic"
  | "tunable_diode_o2"
  | "optical_fluorescence";

interface OxygenAnalyzerData {
  accuracy: number;
  response: number;
  rangeSpan: number;
  maintenance: number;
  oaCost: number;
  inSitu: boolean;
  forCombustion: boolean;
  sensor: string;
  bestUse: string;
}

const DATA: Record<OxygenAnalyzerType, OxygenAnalyzerData> = {
  zirconia_probe_insitu: {
    accuracy: 7, response: 9, rangeSpan: 6, maintenance: 5, oaCost: 5,
    inSitu: true, forCombustion: true,
    sensor: "zirconia_ceramic_cell_high_temp_nernst",
    bestUse: "boiler_furnace_combustion_optimize_o2",
  },
  paramagnetic_extract: {
    accuracy: 10, response: 6, rangeSpan: 10, maintenance: 7, oaCost: 7,
    inSitu: false, forCombustion: false,
    sensor: "paramagnetic_susceptibility_dumbbell",
    bestUse: "process_lab_precise_o2_ppm_to_percent",
  },
  electrochemical_galvanic: {
    accuracy: 6, response: 7, rangeSpan: 5, maintenance: 4, oaCost: 3,
    inSitu: false, forCombustion: false,
    sensor: "galvanic_cell_lead_anode_consumable",
    bestUse: "portable_safety_confined_space_entry",
  },
  tunable_diode_o2: {
    accuracy: 9, response: 10, rangeSpan: 8, maintenance: 9, oaCost: 9,
    inSitu: true, forCombustion: true,
    sensor: "tdlas_cross_duct_laser_absorption",
    bestUse: "fast_response_duct_mount_no_sample_line",
  },
  optical_fluorescence: {
    accuracy: 8, response: 8, rangeSpan: 7, maintenance: 8, oaCost: 6,
    inSitu: false, forCombustion: false,
    sensor: "fluorescence_quench_oxygen_sensitive_dye",
    bestUse: "dissolved_o2_bioprocess_water_quality",
  },
};

function get(t: OxygenAnalyzerType): OxygenAnalyzerData {
  return DATA[t];
}

export const accuracy = (t: OxygenAnalyzerType) => get(t).accuracy;
export const response = (t: OxygenAnalyzerType) => get(t).response;
export const rangeSpan = (t: OxygenAnalyzerType) => get(t).rangeSpan;
export const maintenance = (t: OxygenAnalyzerType) => get(t).maintenance;
export const oaCost = (t: OxygenAnalyzerType) => get(t).oaCost;
export const inSitu = (t: OxygenAnalyzerType) => get(t).inSitu;
export const forCombustion = (t: OxygenAnalyzerType) => get(t).forCombustion;
export const sensor = (t: OxygenAnalyzerType) => get(t).sensor;
export const bestUse = (t: OxygenAnalyzerType) => get(t).bestUse;
export const oxygenAnalyzerTypes = (): OxygenAnalyzerType[] =>
  Object.keys(DATA) as OxygenAnalyzerType[];
