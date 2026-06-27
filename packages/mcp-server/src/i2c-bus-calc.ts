export type I2cBusType =
  | "standard_100k"
  | "fast_400k"
  | "fast_plus_1m"
  | "high_speed_3m4"
  | "ultra_fast_5m";

const DATA: Record<I2cBusType, {
  speed: number; deviceCount: number; pullupReq: number;
  distance: number; busCost: number; bidirectional: boolean;
  forSensor: boolean; busMode: string; bestUse: string;
}> = {
  standard_100k: { speed: 3, deviceCount: 9, pullupReq: 5, distance: 7, busCost: 1, bidirectional: true, forSensor: true, busMode: "open_drain_100khz", bestUse: "eeprom_rtc_slow_sensor" },
  fast_400k: { speed: 5, deviceCount: 9, pullupReq: 6, distance: 6, busCost: 1, bidirectional: true, forSensor: true, busMode: "open_drain_400khz", bestUse: "imu_adc_fast_sensor" },
  fast_plus_1m: { speed: 7, deviceCount: 8, pullupReq: 7, distance: 5, busCost: 2, bidirectional: true, forSensor: true, busMode: "open_drain_1mhz", bestUse: "display_touch_controller" },
  high_speed_3m4: { speed: 9, deviceCount: 6, pullupReq: 8, distance: 3, busCost: 3, bidirectional: true, forSensor: false, busMode: "current_source_3m4hz", bestUse: "high_speed_codec_link" },
  ultra_fast_5m: { speed: 10, deviceCount: 5, pullupReq: 9, distance: 2, busCost: 4, bidirectional: false, forSensor: false, busMode: "push_pull_5mhz", bestUse: "led_driver_fast_update" },
};

const get = (t: I2cBusType) => DATA[t];

export const speed = (t: I2cBusType) => get(t).speed;
export const deviceCount = (t: I2cBusType) => get(t).deviceCount;
export const pullupReq = (t: I2cBusType) => get(t).pullupReq;
export const distance = (t: I2cBusType) => get(t).distance;
export const busCost = (t: I2cBusType) => get(t).busCost;
export const bidirectional = (t: I2cBusType) => get(t).bidirectional;
export const forSensor = (t: I2cBusType) => get(t).forSensor;
export const busMode = (t: I2cBusType) => get(t).busMode;
export const bestUse = (t: I2cBusType) => get(t).bestUse;
export const i2cBuses = (): I2cBusType[] => Object.keys(DATA) as I2cBusType[];
