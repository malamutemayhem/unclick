export type FireDetect =
  | "ionization_smoke_point"
  | "photoelectric_smoke_scatter"
  | "heat_rate_of_rise"
  | "flame_ir_uv_optical"
  | "aspirating_vesda_pipe";

const DATA: Record<FireDetect, {
  sensitivity: number; falseAlarm: number; speed: number;
  coverage: number; fdCost: number; addressable: boolean;
  forCleanRoom: boolean; sensing: string; bestUse: string;
}> = {
  ionization_smoke_point: {
    sensitivity: 8, falseAlarm: 4, speed: 9,
    coverage: 6, fdCost: 1, addressable: false,
    forCleanRoom: false, sensing: "radioactive_ionization_chamber",
    bestUse: "residential_fast_flaming_fire",
  },
  photoelectric_smoke_scatter: {
    sensitivity: 7, falseAlarm: 7, speed: 7,
    coverage: 7, fdCost: 1, addressable: true,
    forCleanRoom: false, sensing: "led_light_scatter_chamber",
    bestUse: "commercial_smoldering_early_warn",
  },
  heat_rate_of_rise: {
    sensitivity: 4, falseAlarm: 9, speed: 5,
    coverage: 5, fdCost: 1, addressable: true,
    forCleanRoom: false, sensing: "thermistor_rate_threshold",
    bestUse: "kitchen_garage_dusty_area",
  },
  flame_ir_uv_optical: {
    sensitivity: 9, falseAlarm: 8, speed: 10,
    coverage: 8, fdCost: 4, addressable: true,
    forCleanRoom: false, sensing: "dual_band_ir_uv_sensor",
    bestUse: "fuel_storage_hangar_open_area",
  },
  aspirating_vesda_pipe: {
    sensitivity: 10, falseAlarm: 10, speed: 10,
    coverage: 10, fdCost: 5, addressable: true,
    forCleanRoom: true, sensing: "laser_nephelometer_pipe_sample",
    bestUse: "data_center_cleanroom_early_warn",
  },
};

const get = (t: FireDetect) => DATA[t];

export const sensitivity = (t: FireDetect) => get(t).sensitivity;
export const falseAlarm = (t: FireDetect) => get(t).falseAlarm;
export const speed = (t: FireDetect) => get(t).speed;
export const coverage = (t: FireDetect) => get(t).coverage;
export const fdCost = (t: FireDetect) => get(t).fdCost;
export const addressable = (t: FireDetect) => get(t).addressable;
export const forCleanRoom = (t: FireDetect) => get(t).forCleanRoom;
export const sensing = (t: FireDetect) => get(t).sensing;
export const bestUse = (t: FireDetect) => get(t).bestUse;
export const fireDetects = (): FireDetect[] => Object.keys(DATA) as FireDetect[];
