export type PressureGaugeType =
  | "bourdon_tube_c_shape"
  | "diaphragm_seal_flush"
  | "capsule_low_pressure"
  | "digital_electronic_sensor"
  | "differential_dp_orifice";

interface PressureGaugeData {
  accuracy: number;
  range: number;
  durability: number;
  response: number;
  pgCost: number;
  electronic: boolean;
  forProcess: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<PressureGaugeType, PressureGaugeData> = {
  bourdon_tube_c_shape: {
    accuracy: 6, range: 8, durability: 7, response: 5, pgCost: 3,
    electronic: false, forProcess: true,
    element: "c_tube_elastic_deflection_link",
    bestUse: "general_industrial_steam_air_water",
  },
  diaphragm_seal_flush: {
    accuracy: 7, range: 6, durability: 9, response: 6, pgCost: 7,
    electronic: false, forProcess: true,
    element: "diaphragm_flush_capillary_fill",
    bestUse: "corrosive_slurry_sanitary_viscous",
  },
  capsule_low_pressure: {
    accuracy: 7, range: 3, durability: 5, response: 7, pgCost: 5,
    electronic: false, forProcess: false,
    element: "twin_diaphragm_capsule_low_range",
    bestUse: "draft_hvac_cleanroom_low_pressure",
  },
  digital_electronic_sensor: {
    accuracy: 9, range: 9, durability: 6, response: 9, pgCost: 8,
    electronic: true, forProcess: true,
    element: "piezo_strain_gauge_bridge_circuit",
    bestUse: "lab_calibration_data_log_transmit",
  },
  differential_dp_orifice: {
    accuracy: 8, range: 7, durability: 7, response: 7, pgCost: 7,
    electronic: true, forProcess: true,
    element: "dp_cell_capacitance_silicon_diaphragm",
    bestUse: "flow_measure_filter_monitor_level",
  },
};

function get(t: PressureGaugeType): PressureGaugeData {
  return DATA[t];
}

export const accuracy = (t: PressureGaugeType) => get(t).accuracy;
export const range = (t: PressureGaugeType) => get(t).range;
export const durability = (t: PressureGaugeType) => get(t).durability;
export const response = (t: PressureGaugeType) => get(t).response;
export const pgCost = (t: PressureGaugeType) => get(t).pgCost;
export const electronic = (t: PressureGaugeType) => get(t).electronic;
export const forProcess = (t: PressureGaugeType) => get(t).forProcess;
export const element = (t: PressureGaugeType) => get(t).element;
export const bestUse = (t: PressureGaugeType) => get(t).bestUse;
export const pressureGaugeTypes = (): PressureGaugeType[] =>
  Object.keys(DATA) as PressureGaugeType[];
