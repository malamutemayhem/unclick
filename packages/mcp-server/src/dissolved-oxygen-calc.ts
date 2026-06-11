export type DissolvedOxygenType =
  | "galvanic_membrane"
  | "polarographic_clark"
  | "optical_luminescent"
  | "electrochemical_amperometric"
  | "thallium_electrode_trace";

interface DissolvedOxygenData {
  accuracy: number;
  response: number;
  stability: number;
  maintenance: number;
  doCost: number;
  membraneFree: boolean;
  forTrace: boolean;
  sensor: string;
  bestUse: string;
}

const DATA: Record<DissolvedOxygenType, DissolvedOxygenData> = {
  galvanic_membrane: {
    accuracy: 7, response: 6, stability: 6, maintenance: 5, doCost: 3,
    membraneFree: false, forTrace: false,
    sensor: "lead_anode_silver_cathode_membrane",
    bestUse: "wastewater_aeration_basin_basic_do",
  },
  polarographic_clark: {
    accuracy: 8, response: 7, stability: 7, maintenance: 5, doCost: 4,
    membraneFree: false, forTrace: false,
    sensor: "clark_cell_gold_cathode_polarized",
    bestUse: "lab_bod_measurement_process_control",
  },
  optical_luminescent: {
    accuracy: 9, response: 9, stability: 9, maintenance: 9, doCost: 7,
    membraneFree: true, forTrace: false,
    sensor: "fluorescence_quench_ruthenium_complex",
    bestUse: "bioprocess_fermentation_long_term_stable",
  },
  electrochemical_amperometric: {
    accuracy: 8, response: 8, stability: 7, maintenance: 6, doCost: 5,
    membraneFree: false, forTrace: true,
    sensor: "amperometric_three_electrode_ppb_range",
    bestUse: "boiler_feedwater_ppb_level_deaeration",
  },
  thallium_electrode_trace: {
    accuracy: 9, response: 5, stability: 8, maintenance: 4, doCost: 6,
    membraneFree: false, forTrace: true,
    sensor: "thallium_amalgam_electrode_ultra_trace",
    bestUse: "power_plant_condensate_ultra_low_ppb_do",
  },
};

function get(t: DissolvedOxygenType): DissolvedOxygenData {
  return DATA[t];
}

export const accuracy = (t: DissolvedOxygenType) => get(t).accuracy;
export const response = (t: DissolvedOxygenType) => get(t).response;
export const stability = (t: DissolvedOxygenType) => get(t).stability;
export const maintenance = (t: DissolvedOxygenType) => get(t).maintenance;
export const doCost = (t: DissolvedOxygenType) => get(t).doCost;
export const membraneFree = (t: DissolvedOxygenType) => get(t).membraneFree;
export const forTrace = (t: DissolvedOxygenType) => get(t).forTrace;
export const sensor = (t: DissolvedOxygenType) => get(t).sensor;
export const bestUse = (t: DissolvedOxygenType) => get(t).bestUse;
export const dissolvedOxygenTypes = (): DissolvedOxygenType[] =>
  Object.keys(DATA) as DissolvedOxygenType[];
