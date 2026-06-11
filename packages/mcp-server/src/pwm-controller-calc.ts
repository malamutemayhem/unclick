export type PwmController =
  | "voltage_mode_vm"
  | "current_mode_peak"
  | "average_current_acm"
  | "hysteretic_bang"
  | "constant_on_time";

const DATA: Record<PwmController, {
  transientResponse: number; stability: number; efficiency: number;
  noiseImmunity: number; controlCost: number; currentLimit: boolean;
  forMultiphase: boolean; modulation: string; bestUse: string;
}> = {
  voltage_mode_vm: {
    transientResponse: 5, stability: 7, efficiency: 6,
    noiseImmunity: 7, controlCost: 3, currentLimit: false,
    forMultiphase: false, modulation: "fixed_freq_sawtooth",
    bestUse: "isolated_full_bridge",
  },
  current_mode_peak: {
    transientResponse: 8, stability: 6, efficiency: 7,
    noiseImmunity: 5, controlCost: 5, currentLimit: true,
    forMultiphase: true, modulation: "peak_current_ramp",
    bestUse: "dc_dc_buck_converter",
  },
  average_current_acm: {
    transientResponse: 7, stability: 8, efficiency: 8,
    noiseImmunity: 6, controlCost: 7, currentLimit: true,
    forMultiphase: true, modulation: "average_current_sense",
    bestUse: "power_factor_correction",
  },
  hysteretic_bang: {
    transientResponse: 10, stability: 4, efficiency: 5,
    noiseImmunity: 3, controlCost: 2, currentLimit: false,
    forMultiphase: false, modulation: "variable_freq_hysteresis",
    bestUse: "fast_load_step_vr",
  },
  constant_on_time: {
    transientResponse: 9, stability: 5, efficiency: 9,
    noiseImmunity: 4, controlCost: 4, currentLimit: false,
    forMultiphase: true, modulation: "adaptive_on_time",
    bestUse: "high_current_cpu_vr",
  },
};

const get = (t: PwmController) => DATA[t];

export const transientResponse = (t: PwmController) => get(t).transientResponse;
export const stability = (t: PwmController) => get(t).stability;
export const efficiency = (t: PwmController) => get(t).efficiency;
export const noiseImmunity = (t: PwmController) => get(t).noiseImmunity;
export const controlCost = (t: PwmController) => get(t).controlCost;
export const currentLimit = (t: PwmController) => get(t).currentLimit;
export const forMultiphase = (t: PwmController) => get(t).forMultiphase;
export const modulation = (t: PwmController) => get(t).modulation;
export const bestUse = (t: PwmController) => get(t).bestUse;
export const pwmControllers = (): PwmController[] => Object.keys(DATA) as PwmController[];
