export type I2cSpeed =
  | "standard_100k"
  | "fast_400k"
  | "fast_plus_1m"
  | "high_speed_3m4"
  | "ultra_fast_5m";

const DATA: Record<I2cSpeed, {
  dataRate: number; pullupReq: number; busCapacity: number;
  compatibility: number; i2cCost: number; bidirectional: boolean;
  forSensor: boolean; protocol: string; bestUse: string;
}> = {
  standard_100k: {
    dataRate: 2, pullupReq: 3, busCapacity: 9,
    compatibility: 10, i2cCost: 1, bidirectional: true,
    forSensor: true, protocol: "open_drain_ack_nack",
    bestUse: "eeprom_config_storage",
  },
  fast_400k: {
    dataRate: 4, pullupReq: 4, busCapacity: 8,
    compatibility: 9, i2cCost: 1, bidirectional: true,
    forSensor: true, protocol: "open_drain_repeated_start",
    bestUse: "multi_sensor_polling",
  },
  fast_plus_1m: {
    dataRate: 6, pullupReq: 6, busCapacity: 6,
    compatibility: 7, i2cCost: 2, bidirectional: true,
    forSensor: true, protocol: "active_pullup_enhanced",
    bestUse: "touch_controller_read",
  },
  high_speed_3m4: {
    dataRate: 8, pullupReq: 8, busCapacity: 4,
    compatibility: 4, i2cCost: 3, bidirectional: true,
    forSensor: false, protocol: "current_source_pullup",
    bestUse: "audio_codec_register",
  },
  ultra_fast_5m: {
    dataRate: 10, pullupReq: 9, busCapacity: 3,
    compatibility: 2, i2cCost: 4, bidirectional: false,
    forSensor: false, protocol: "push_pull_write_only",
    bestUse: "led_matrix_driver_stream",
  },
};

const get = (t: I2cSpeed) => DATA[t];

export const dataRate = (t: I2cSpeed) => get(t).dataRate;
export const pullupReq = (t: I2cSpeed) => get(t).pullupReq;
export const busCapacity = (t: I2cSpeed) => get(t).busCapacity;
export const compatibility = (t: I2cSpeed) => get(t).compatibility;
export const i2cCost = (t: I2cSpeed) => get(t).i2cCost;
export const bidirectional = (t: I2cSpeed) => get(t).bidirectional;
export const forSensor = (t: I2cSpeed) => get(t).forSensor;
export const protocol = (t: I2cSpeed) => get(t).protocol;
export const bestUse = (t: I2cSpeed) => get(t).bestUse;
export const i2cSpeeds = (): I2cSpeed[] => Object.keys(DATA) as I2cSpeed[];
