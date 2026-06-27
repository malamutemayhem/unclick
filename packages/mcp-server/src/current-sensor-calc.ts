export type CurrentSensorType =
  | "hall_effect_clamp"
  | "shunt_resistor_inline"
  | "rogowski_coil_flex"
  | "acs712_module_ic"
  | "current_transformer_ct";

const DATA: Record<CurrentSensorType, {
  accuracy: number; bandwidth: number; isolation: number;
  sizeCompact: number; sensorCost: number; nonInvasive: boolean;
  forAc: boolean; sensingMethod: string; bestUse: string;
}> = {
  hall_effect_clamp: { accuracy: 6, bandwidth: 5, isolation: 9, sizeCompact: 4, sensorCost: 6, nonInvasive: true, forAc: true, sensingMethod: "magnetic_hall_element", bestUse: "clamp_meter_measure" },
  shunt_resistor_inline: { accuracy: 9, bandwidth: 8, isolation: 2, sizeCompact: 8, sensorCost: 1, nonInvasive: false, forAc: false, sensingMethod: "voltage_drop_resistive", bestUse: "pcb_current_monitor" },
  rogowski_coil_flex: { accuracy: 7, bandwidth: 9, isolation: 9, sizeCompact: 5, sensorCost: 8, nonInvasive: true, forAc: true, sensingMethod: "mutual_inductance_coil", bestUse: "high_current_ac_measure" },
  acs712_module_ic: { accuracy: 7, bandwidth: 6, isolation: 7, sizeCompact: 7, sensorCost: 3, nonInvasive: false, forAc: true, sensingMethod: "integrated_hall_ic", bestUse: "arduino_current_sense" },
  current_transformer_ct: { accuracy: 8, bandwidth: 4, isolation: 10, sizeCompact: 3, sensorCost: 5, nonInvasive: true, forAc: true, sensingMethod: "transformer_ratio_wind", bestUse: "energy_meter_panel" },
};

const get = (t: CurrentSensorType) => DATA[t];

export const accuracy = (t: CurrentSensorType) => get(t).accuracy;
export const bandwidth = (t: CurrentSensorType) => get(t).bandwidth;
export const isolation = (t: CurrentSensorType) => get(t).isolation;
export const sizeCompact = (t: CurrentSensorType) => get(t).sizeCompact;
export const sensorCost = (t: CurrentSensorType) => get(t).sensorCost;
export const nonInvasive = (t: CurrentSensorType) => get(t).nonInvasive;
export const forAc = (t: CurrentSensorType) => get(t).forAc;
export const sensingMethod = (t: CurrentSensorType) => get(t).sensingMethod;
export const bestUse = (t: CurrentSensorType) => get(t).bestUse;
export const currentSensors = (): CurrentSensorType[] => Object.keys(DATA) as CurrentSensorType[];
