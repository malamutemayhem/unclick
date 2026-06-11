export type BldcControl =
  | "six_step_trapezoidal"
  | "foc_sinusoidal"
  | "sensorless_bemf"
  | "field_weakening"
  | "dtc_direct_torque";

const DATA: Record<BldcControl, {
  torqueRipple: number; efficiency: number; startupPerf: number;
  speedRange: number; ctrlCost: number; sensorless: boolean;
  forDrone: boolean; algorithm: string; bestUse: string;
}> = {
  six_step_trapezoidal: {
    torqueRipple: 3, efficiency: 5, startupPerf: 7,
    speedRange: 5, ctrlCost: 2, sensorless: false,
    forDrone: false, algorithm: "hall_commutation_6step",
    bestUse: "cooling_fan_pump",
  },
  foc_sinusoidal: {
    torqueRipple: 9, efficiency: 9, startupPerf: 8,
    speedRange: 8, ctrlCost: 6, sensorless: false,
    forDrone: true, algorithm: "park_clarke_pi_svpwm",
    bestUse: "ev_traction_motor",
  },
  sensorless_bemf: {
    torqueRipple: 5, efficiency: 7, startupPerf: 4,
    speedRange: 6, ctrlCost: 3, sensorless: true,
    forDrone: true, algorithm: "bemf_zero_cross_detect",
    bestUse: "drone_esc_propeller",
  },
  field_weakening: {
    torqueRipple: 7, efficiency: 7, startupPerf: 6,
    speedRange: 10, ctrlCost: 7, sensorless: false,
    forDrone: false, algorithm: "id_injection_flux_weaken",
    bestUse: "ev_highway_overdrive",
  },
  dtc_direct_torque: {
    torqueRipple: 6, efficiency: 8, startupPerf: 9,
    speedRange: 7, ctrlCost: 8, sensorless: false,
    forDrone: false, algorithm: "flux_torque_hysteresis",
    bestUse: "crane_hoist_drive",
  },
};

const get = (t: BldcControl) => DATA[t];

export const torqueRipple = (t: BldcControl) => get(t).torqueRipple;
export const efficiency = (t: BldcControl) => get(t).efficiency;
export const startupPerf = (t: BldcControl) => get(t).startupPerf;
export const speedRange = (t: BldcControl) => get(t).speedRange;
export const ctrlCost = (t: BldcControl) => get(t).ctrlCost;
export const sensorless = (t: BldcControl) => get(t).sensorless;
export const forDrone = (t: BldcControl) => get(t).forDrone;
export const algorithm = (t: BldcControl) => get(t).algorithm;
export const bestUse = (t: BldcControl) => get(t).bestUse;
export const bldcControls = (): BldcControl[] => Object.keys(DATA) as BldcControl[];
