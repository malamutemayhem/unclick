export type HumiditySensorType =
  | "capacitive_polymer"
  | "resistive_ceramic"
  | "thermal_conduct"
  | "chilled_mirror_dew"
  | "mems_integrated";

const DATA: Record<HumiditySensorType, {
  accuracy: number; humidRange: number; responseTime: number;
  stability: number; sensorCost: number; digital: boolean;
  forDewPoint: boolean; sensingElement: string; bestUse: string;
}> = {
  capacitive_polymer: { accuracy: 8, humidRange: 9, responseTime: 7, stability: 7, sensorCost: 3, digital: true, forDewPoint: false, sensingElement: "polymer_dielectric_cap", bestUse: "hvac_weather_station" },
  resistive_ceramic: { accuracy: 6, humidRange: 7, responseTime: 8, stability: 5, sensorCost: 1, digital: false, forDewPoint: false, sensingElement: "ceramic_resist_change", bestUse: "low_cost_consumer_device" },
  thermal_conduct: { accuracy: 7, humidRange: 8, responseTime: 6, stability: 8, sensorCost: 5, digital: false, forDewPoint: false, sensingElement: "heated_bead_pair", bestUse: "corrosive_gas_environment" },
  chilled_mirror_dew: { accuracy: 10, humidRange: 10, responseTime: 4, stability: 10, sensorCost: 10, digital: true, forDewPoint: true, sensingElement: "peltier_mirror_optical", bestUse: "metrology_lab_reference" },
  mems_integrated: { accuracy: 8, humidRange: 8, responseTime: 9, stability: 7, sensorCost: 4, digital: true, forDewPoint: false, sensingElement: "mems_capacitive_chip", bestUse: "iot_wearable_compact" },
};

const get = (t: HumiditySensorType) => DATA[t];

export const accuracy = (t: HumiditySensorType) => get(t).accuracy;
export const humidRange = (t: HumiditySensorType) => get(t).humidRange;
export const responseTime = (t: HumiditySensorType) => get(t).responseTime;
export const stability = (t: HumiditySensorType) => get(t).stability;
export const sensorCost = (t: HumiditySensorType) => get(t).sensorCost;
export const digital = (t: HumiditySensorType) => get(t).digital;
export const forDewPoint = (t: HumiditySensorType) => get(t).forDewPoint;
export const sensingElement = (t: HumiditySensorType) => get(t).sensingElement;
export const bestUse = (t: HumiditySensorType) => get(t).bestUse;
export const humiditySensors = (): HumiditySensorType[] => Object.keys(DATA) as HumiditySensorType[];
