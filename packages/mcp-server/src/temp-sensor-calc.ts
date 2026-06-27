export type TempSensorType =
  | "thermocouple_k_type"
  | "rtd_pt100_wire"
  | "thermistor_ntc"
  | "ic_digital_i2c"
  | "infrared_non_contact";

const DATA: Record<TempSensorType, {
  accuracy: number; tempRange: number; responseTime: number;
  linearity: number; sensorCost: number; contactless: boolean;
  forHighTemp: boolean; outputType: string; bestUse: string;
}> = {
  thermocouple_k_type: { accuracy: 5, tempRange: 10, responseTime: 7, linearity: 4, sensorCost: 2, contactless: false, forHighTemp: true, outputType: "millivolt_emf", bestUse: "furnace_oven_high_temp" },
  rtd_pt100_wire: { accuracy: 10, tempRange: 7, responseTime: 5, linearity: 9, sensorCost: 6, contactless: false, forHighTemp: false, outputType: "resistance_ohm", bestUse: "precision_lab_measurement" },
  thermistor_ntc: { accuracy: 7, tempRange: 4, responseTime: 9, linearity: 3, sensorCost: 1, contactless: false, forHighTemp: false, outputType: "resistance_nonlinear", bestUse: "pcb_temp_monitor_protect" },
  ic_digital_i2c: { accuracy: 8, tempRange: 3, responseTime: 6, linearity: 10, sensorCost: 3, contactless: false, forHighTemp: false, outputType: "digital_i2c_spi", bestUse: "board_level_ambient_read" },
  infrared_non_contact: { accuracy: 6, tempRange: 8, responseTime: 10, linearity: 6, sensorCost: 7, contactless: true, forHighTemp: true, outputType: "infrared_thermal", bestUse: "moving_object_surface_temp" },
};

const get = (t: TempSensorType) => DATA[t];

export const accuracy = (t: TempSensorType) => get(t).accuracy;
export const tempRange = (t: TempSensorType) => get(t).tempRange;
export const responseTime = (t: TempSensorType) => get(t).responseTime;
export const linearity = (t: TempSensorType) => get(t).linearity;
export const sensorCost = (t: TempSensorType) => get(t).sensorCost;
export const contactless = (t: TempSensorType) => get(t).contactless;
export const forHighTemp = (t: TempSensorType) => get(t).forHighTemp;
export const outputType = (t: TempSensorType) => get(t).outputType;
export const bestUse = (t: TempSensorType) => get(t).bestUse;
export const tempSensors = (): TempSensorType[] => Object.keys(DATA) as TempSensorType[];
