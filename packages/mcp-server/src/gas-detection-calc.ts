export type GasDetectionType =
  | "catalytic_bead_lel"
  | "infrared_ndir_hc"
  | "electrochemical_toxic"
  | "photoionization_pid"
  | "semiconductor_mos";

interface GasDetectionData {
  sensitivity: number;
  selectivity: number;
  sensorLife: number;
  responseTime: number;
  gdCost: number;
  continuous: boolean;
  forFlammable: boolean;
  principle: string;
  bestUse: string;
}

const DATA: Record<GasDetectionType, GasDetectionData> = {
  catalytic_bead_lel: {
    sensitivity: 7, selectivity: 4, sensorLife: 6, responseTime: 8, gdCost: 4,
    continuous: true, forFlammable: true,
    principle: "catalytic_oxidation_wheatstone_bridge_pellistor",
    bestUse: "confined_space_lel_combustible_gas_monitoring",
  },
  infrared_ndir_hc: {
    sensitivity: 8, selectivity: 8, sensorLife: 10, responseTime: 7, gdCost: 7,
    continuous: true, forFlammable: true,
    principle: "non_dispersive_infrared_absorption_dual_beam",
    bestUse: "hydrocarbon_methane_co2_long_life_monitoring",
  },
  electrochemical_toxic: {
    sensitivity: 9, selectivity: 8, sensorLife: 5, responseTime: 9, gdCost: 5,
    continuous: true, forFlammable: false,
    principle: "electrochemical_cell_diffusion_amperometric",
    bestUse: "toxic_gas_h2s_co_cl2_personal_area_monitor",
  },
  photoionization_pid: {
    sensitivity: 10, selectivity: 3, sensorLife: 7, responseTime: 10, gdCost: 7,
    continuous: true, forFlammable: false,
    principle: "uv_lamp_photoionization_broadband_voc_detect",
    bestUse: "voc_leak_detection_hazmat_response_ppb_level",
  },
  semiconductor_mos: {
    sensitivity: 6, selectivity: 3, sensorLife: 8, responseTime: 6, gdCost: 2,
    continuous: true, forFlammable: true,
    principle: "metal_oxide_semiconductor_resistance_change",
    bestUse: "residential_gas_alarm_low_cost_general_detect",
  },
};

function get(t: GasDetectionType): GasDetectionData {
  return DATA[t];
}

export const sensitivity = (t: GasDetectionType) => get(t).sensitivity;
export const selectivity = (t: GasDetectionType) => get(t).selectivity;
export const sensorLife = (t: GasDetectionType) => get(t).sensorLife;
export const responseTime = (t: GasDetectionType) => get(t).responseTime;
export const gdCost = (t: GasDetectionType) => get(t).gdCost;
export const continuous = (t: GasDetectionType) => get(t).continuous;
export const forFlammable = (t: GasDetectionType) => get(t).forFlammable;
export const principle = (t: GasDetectionType) => get(t).principle;
export const bestUse = (t: GasDetectionType) => get(t).bestUse;
export const gasDetectionTypes = (): GasDetectionType[] =>
  Object.keys(DATA) as GasDetectionType[];
