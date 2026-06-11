export type GasDetectorCatType =
  | "catalytic_bead_lel"
  | "electrochemical_toxic"
  | "semiconductor_mos"
  | "photoionization_pid"
  | "flame_ionization_fid";

interface GasDetectorCatData {
  sensitivity: number;
  selectivity: number;
  lifespan: number;
  response: number;
  gdCost: number;
  continuous: boolean;
  forLel: boolean;
  sensor: string;
  bestUse: string;
}

const DATA: Record<GasDetectorCatType, GasDetectorCatData> = {
  catalytic_bead_lel: {
    sensitivity: 6, selectivity: 4, lifespan: 6, response: 8, gdCost: 3,
    continuous: true, forLel: true,
    sensor: "platinum_coil_bead_catalytic_oxidation",
    bestUse: "combustible_gas_lel_methane_propane",
  },
  electrochemical_toxic: {
    sensitivity: 9, selectivity: 8, lifespan: 5, response: 7, gdCost: 4,
    continuous: true, forLel: false,
    sensor: "three_electrode_cell_specific_gas_react",
    bestUse: "toxic_gas_h2s_co_cl2_personal_safety",
  },
  semiconductor_mos: {
    sensitivity: 7, selectivity: 3, lifespan: 8, response: 9, gdCost: 2,
    continuous: true, forLel: false,
    sensor: "tin_oxide_heated_surface_resist_change",
    bestUse: "low_cost_domestic_gas_leak_alarm",
  },
  photoionization_pid: {
    sensitivity: 10, selectivity: 5, lifespan: 7, response: 10, gdCost: 6,
    continuous: true, forLel: false,
    sensor: "uv_lamp_ionize_voc_measure_current",
    bestUse: "voc_leak_detect_benzene_toluene_ppb",
  },
  flame_ionization_fid: {
    sensitivity: 10, selectivity: 6, lifespan: 9, response: 8, gdCost: 8,
    continuous: true, forLel: false,
    sensor: "hydrogen_flame_ionize_carbon_compound",
    bestUse: "total_hydrocarbon_emission_monitor_stack",
  },
};

function get(t: GasDetectorCatType): GasDetectorCatData {
  return DATA[t];
}

export const sensitivity = (t: GasDetectorCatType) => get(t).sensitivity;
export const selectivity = (t: GasDetectorCatType) => get(t).selectivity;
export const lifespan = (t: GasDetectorCatType) => get(t).lifespan;
export const response = (t: GasDetectorCatType) => get(t).response;
export const gdCost = (t: GasDetectorCatType) => get(t).gdCost;
export const continuous = (t: GasDetectorCatType) => get(t).continuous;
export const forLel = (t: GasDetectorCatType) => get(t).forLel;
export const sensor = (t: GasDetectorCatType) => get(t).sensor;
export const bestUse = (t: GasDetectorCatType) => get(t).bestUse;
export const gasDetectorCatTypes = (): GasDetectorCatType[] =>
  Object.keys(DATA) as GasDetectorCatType[];
