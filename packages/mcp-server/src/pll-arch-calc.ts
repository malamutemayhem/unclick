export type PllArch =
  | "integer_n_cp"
  | "fractional_n_sigma_delta"
  | "all_digital_dpll"
  | "injection_locked"
  | "bang_bang_cdr";

const DATA: Record<PllArch, {
  phaseNoise: number; lockTime: number; spurLevel: number;
  power: number; pllCost: number; integrated: boolean;
  forSerdes: boolean; technique: string; bestUse: string;
}> = {
  integer_n_cp: {
    phaseNoise: 7, lockTime: 5, spurLevel: 8,
    power: 6, pllCost: 3, integrated: true,
    forSerdes: false, technique: "charge_pump_divider",
    bestUse: "local_oscillator_radio",
  },
  fractional_n_sigma_delta: {
    phaseNoise: 9, lockTime: 6, spurLevel: 7,
    power: 7, pllCost: 5, integrated: true,
    forSerdes: false, technique: "dither_modulus_noise_shape",
    bestUse: "5g_frequency_synthesizer",
  },
  all_digital_dpll: {
    phaseNoise: 6, lockTime: 9, spurLevel: 6,
    power: 9, pllCost: 4, integrated: true,
    forSerdes: false, technique: "tdc_dco_digital_loop",
    bestUse: "soc_clock_gen_scaled",
  },
  injection_locked: {
    phaseNoise: 10, lockTime: 10, spurLevel: 5,
    power: 10, pllCost: 6, integrated: true,
    forSerdes: true, technique: "sub_harmonic_inject_osc",
    bestUse: "low_jitter_adc_clock",
  },
  bang_bang_cdr: {
    phaseNoise: 8, lockTime: 8, spurLevel: 7,
    power: 8, pllCost: 7, integrated: false,
    forSerdes: true, technique: "binary_phase_detect_vco",
    bestUse: "112g_pam4_cdr",
  },
};

const get = (t: PllArch) => DATA[t];

export const phaseNoise = (t: PllArch) => get(t).phaseNoise;
export const lockTime = (t: PllArch) => get(t).lockTime;
export const spurLevel = (t: PllArch) => get(t).spurLevel;
export const power = (t: PllArch) => get(t).power;
export const pllCost = (t: PllArch) => get(t).pllCost;
export const integrated = (t: PllArch) => get(t).integrated;
export const forSerdes = (t: PllArch) => get(t).forSerdes;
export const technique = (t: PllArch) => get(t).technique;
export const bestUse = (t: PllArch) => get(t).bestUse;
export const pllArchs = (): PllArch[] => Object.keys(DATA) as PllArch[];
