// accelerometer-calc - accelerometer sensor types

export type Accelerometer =
  | "mems_3axis_basic"
  | "piezo_high_freq"
  | "capacitive_low_g"
  | "digital_spi_precise"
  | "analog_single_axis";

const DATA: Record<Accelerometer, {
  sensitivity: number; bandwidth: number; noiseFloor: number; powerDraw: number;
  cost: number; digital: boolean; triAxis: boolean; sensingMethod: string; bestUse: string;
}> = {
  mems_3axis_basic:     { sensitivity: 7, bandwidth: 7, noiseFloor: 6, powerDraw: 8, cost: 3, digital: true, triAxis: true, sensingMethod: "mems_capacitive_comb", bestUse: "general_motion_detect" },
  piezo_high_freq:      { sensitivity: 9, bandwidth: 10, noiseFloor: 5, powerDraw: 4, cost: 8, digital: false, triAxis: false, sensingMethod: "piezoelectric_crystal", bestUse: "vibration_high_freq" },
  capacitive_low_g:     { sensitivity: 10, bandwidth: 5, noiseFloor: 9, powerDraw: 7, cost: 6, digital: true, triAxis: true, sensingMethod: "bulk_micromachined_cap", bestUse: "seismic_low_freq" },
  digital_spi_precise:  { sensitivity: 8, bandwidth: 8, noiseFloor: 8, powerDraw: 6, cost: 5, digital: true, triAxis: true, sensingMethod: "mems_digital_output", bestUse: "precise_tilt_measure" },
  analog_single_axis:   { sensitivity: 6, bandwidth: 6, noiseFloor: 5, powerDraw: 9, cost: 2, digital: false, triAxis: false, sensingMethod: "piezoresistive_bridge", bestUse: "simple_impact_detect" },
};

const get = (a: Accelerometer) => DATA[a];
export const sensitivity = (a: Accelerometer) => get(a).sensitivity;
export const bandwidth = (a: Accelerometer) => get(a).bandwidth;
export const noiseFloor = (a: Accelerometer) => get(a).noiseFloor;
export const powerDraw = (a: Accelerometer) => get(a).powerDraw;
export const accelCost = (a: Accelerometer) => get(a).cost;
export const digital = (a: Accelerometer) => get(a).digital;
export const triAxis = (a: Accelerometer) => get(a).triAxis;
export const sensingMethod = (a: Accelerometer) => get(a).sensingMethod;
export const bestUse = (a: Accelerometer) => get(a).bestUse;
export const accelerometers = (): Accelerometer[] => Object.keys(DATA) as Accelerometer[];
