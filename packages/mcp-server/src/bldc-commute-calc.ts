export type BldcCommute =
  | "trapezoidal_six_step"
  | "sinusoidal_foc"
  | "space_vector_svpwm"
  | "sensored_hall_trap"
  | "sensorless_bemf_zero";

const DATA: Record<BldcCommute, {
  efficiency: number; torqueRipple: number; startupTorque: number;
  complexity: number; comCost: number; sensorless: boolean;
  forPrecision: boolean; algorithm: string; bestUse: string;
}> = {
  trapezoidal_six_step: {
    efficiency: 6, torqueRipple: 4, startupTorque: 7,
    complexity: 9, comCost: 1, sensorless: false,
    forPrecision: false, algorithm: "phase_switch_60_degree",
    bestUse: "fan_pump_low_cost",
  },
  sinusoidal_foc: {
    efficiency: 9, torqueRipple: 9, startupTorque: 9,
    complexity: 4, comCost: 6, sensorless: false,
    forPrecision: true, algorithm: "park_clarke_pi_loop",
    bestUse: "servo_drive_cnc_axis",
  },
  space_vector_svpwm: {
    efficiency: 10, torqueRipple: 10, startupTorque: 9,
    complexity: 3, comCost: 7, sensorless: false,
    forPrecision: true, algorithm: "sector_dwell_time_calc",
    bestUse: "traction_motor_ev",
  },
  sensored_hall_trap: {
    efficiency: 7, torqueRipple: 5, startupTorque: 8,
    complexity: 8, comCost: 2, sensorless: false,
    forPrecision: false, algorithm: "hall_edge_commutate",
    bestUse: "ebike_power_tool",
  },
  sensorless_bemf_zero: {
    efficiency: 7, torqueRipple: 5, startupTorque: 4,
    complexity: 6, comCost: 3, sensorless: true,
    forPrecision: false, algorithm: "zero_crossing_detect",
    bestUse: "compressor_hvac_drive",
  },
};

const get = (t: BldcCommute) => DATA[t];

export const efficiency = (t: BldcCommute) => get(t).efficiency;
export const torqueRipple = (t: BldcCommute) => get(t).torqueRipple;
export const startupTorque = (t: BldcCommute) => get(t).startupTorque;
export const complexity = (t: BldcCommute) => get(t).complexity;
export const comCost = (t: BldcCommute) => get(t).comCost;
export const sensorless = (t: BldcCommute) => get(t).sensorless;
export const forPrecision = (t: BldcCommute) => get(t).forPrecision;
export const algorithm = (t: BldcCommute) => get(t).algorithm;
export const bestUse = (t: BldcCommute) => get(t).bestUse;
export const bldcCommutes = (): BldcCommute[] => Object.keys(DATA) as BldcCommute[];
