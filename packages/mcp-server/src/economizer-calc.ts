export type EconomizerType =
  | "dry_bulb_temperature"
  | "enthalpy_wet_bulb"
  | "differential_enthalpy"
  | "integrated_waterside"
  | "dew_point_control";

interface EconomizerData {
  efficiency: number;
  accuracy: number;
  climate: number;
  maintenance: number;
  ecCost: number;
  sensorBased: boolean;
  forHumid: boolean;
  control: string;
  bestUse: string;
}

const DATA: Record<EconomizerType, EconomizerData> = {
  dry_bulb_temperature: {
    efficiency: 7, accuracy: 6, climate: 6, maintenance: 9, ecCost: 2,
    sensorBased: true, forHumid: false,
    control: "outdoor_temp_sensor_damper",
    bestUse: "dry_climate_basic_free_cool",
  },
  enthalpy_wet_bulb: {
    efficiency: 8, accuracy: 8, climate: 8, maintenance: 7, ecCost: 5,
    sensorBased: true, forHumid: true,
    control: "enthalpy_sensor_wet_dry_bulb",
    bestUse: "humid_climate_energy_savings",
  },
  differential_enthalpy: {
    efficiency: 9, accuracy: 9, climate: 9, maintenance: 6, ecCost: 6,
    sensorBased: true, forHumid: true,
    control: "indoor_outdoor_enthalpy_diff",
    bestUse: "variable_climate_optimal_use",
  },
  integrated_waterside: {
    efficiency: 8, accuracy: 7, climate: 7, maintenance: 7, ecCost: 7,
    sensorBased: false, forHumid: false,
    control: "cooling_tower_free_cool_hx",
    bestUse: "data_center_chiller_bypass",
  },
  dew_point_control: {
    efficiency: 8, accuracy: 10, climate: 9, maintenance: 6, ecCost: 7,
    sensorBased: true, forHumid: true,
    control: "dew_point_sensor_precision",
    bestUse: "lab_cleanroom_moisture_control",
  },
};

function get(t: EconomizerType): EconomizerData {
  return DATA[t];
}

export const efficiency = (t: EconomizerType) => get(t).efficiency;
export const accuracy = (t: EconomizerType) => get(t).accuracy;
export const climate = (t: EconomizerType) => get(t).climate;
export const maintenance = (t: EconomizerType) => get(t).maintenance;
export const ecCost = (t: EconomizerType) => get(t).ecCost;
export const sensorBased = (t: EconomizerType) => get(t).sensorBased;
export const forHumid = (t: EconomizerType) => get(t).forHumid;
export const control = (t: EconomizerType) => get(t).control;
export const bestUse = (t: EconomizerType) => get(t).bestUse;
export const economizerTypes = (): EconomizerType[] =>
  Object.keys(DATA) as EconomizerType[];
