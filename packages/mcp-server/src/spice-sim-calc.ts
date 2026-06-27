export type SpiceSim =
  | "dc_operating_point"
  | "ac_frequency_sweep"
  | "transient_time_domain"
  | "monte_carlo_stat"
  | "corner_pvt";

const DATA: Record<SpiceSim, {
  accuracy: number; speed: number; convergence: number;
  capacity: number; simCost: number; parallel: boolean;
  forSignoff: boolean; engine: string; bestUse: string;
}> = {
  dc_operating_point: {
    accuracy: 9, speed: 10, convergence: 7,
    capacity: 8, simCost: 2, parallel: false,
    forSignoff: false, engine: "newton_raphson_nonlinear",
    bestUse: "bias_point_verification",
  },
  ac_frequency_sweep: {
    accuracy: 9, speed: 8, convergence: 9,
    capacity: 7, simCost: 3, parallel: false,
    forSignoff: false, engine: "linearized_small_signal",
    bestUse: "amplifier_bode_plot",
  },
  transient_time_domain: {
    accuracy: 8, speed: 4, convergence: 5,
    capacity: 5, simCost: 5, parallel: false,
    forSignoff: true, engine: "trapezoidal_gear_integrator",
    bestUse: "switching_waveform_check",
  },
  monte_carlo_stat: {
    accuracy: 7, speed: 2, convergence: 6,
    capacity: 4, simCost: 8, parallel: true,
    forSignoff: true, engine: "random_param_variation",
    bestUse: "yield_sigma_estimate",
  },
  corner_pvt: {
    accuracy: 8, speed: 3, convergence: 6,
    capacity: 6, simCost: 7, parallel: true,
    forSignoff: true, engine: "process_voltage_temp_matrix",
    bestUse: "worst_case_timing_margin",
  },
};

const get = (t: SpiceSim) => DATA[t];

export const accuracy = (t: SpiceSim) => get(t).accuracy;
export const speed = (t: SpiceSim) => get(t).speed;
export const convergence = (t: SpiceSim) => get(t).convergence;
export const capacity = (t: SpiceSim) => get(t).capacity;
export const simCost = (t: SpiceSim) => get(t).simCost;
export const parallel = (t: SpiceSim) => get(t).parallel;
export const forSignoff = (t: SpiceSim) => get(t).forSignoff;
export const engine = (t: SpiceSim) => get(t).engine;
export const bestUse = (t: SpiceSim) => get(t).bestUse;
export const spiceSims = (): SpiceSim[] => Object.keys(DATA) as SpiceSim[];
