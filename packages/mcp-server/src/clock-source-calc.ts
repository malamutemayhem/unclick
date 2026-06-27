export type ClockSource =
  | "rc_internal_hsi"
  | "crystal_hse"
  | "mems_oscillator"
  | "pll_synthesized"
  | "lse_32khz_crystal";

const DATA: Record<ClockSource, {
  accuracy: number; startup: number; stability: number;
  power: number; clkCost: number; trimmed: boolean;
  forUsb: boolean; output: string; bestUse: string;
}> = {
  rc_internal_hsi: {
    accuracy: 4, startup: 10, stability: 4,
    power: 8, clkCost: 1, trimmed: true,
    forUsb: false, output: "factory_cal_rc_osc",
    bestUse: "fast_wakeup_fallback",
  },
  crystal_hse: {
    accuracy: 9, startup: 4, stability: 9,
    power: 5, clkCost: 3, trimmed: false,
    forUsb: true, output: "pierce_oscillator_xtal",
    bestUse: "pll_reference_clock",
  },
  mems_oscillator: {
    accuracy: 8, startup: 8, stability: 8,
    power: 6, clkCost: 4, trimmed: true,
    forUsb: true, output: "mems_resonator_cmos",
    bestUse: "vibration_proof_industrial",
  },
  pll_synthesized: {
    accuracy: 9, startup: 3, stability: 8,
    power: 4, clkCost: 2, trimmed: false,
    forUsb: true, output: "fractional_n_divider",
    bestUse: "cpu_max_frequency_run",
  },
  lse_32khz_crystal: {
    accuracy: 10, startup: 2, stability: 10,
    power: 10, clkCost: 2, trimmed: false,
    forUsb: false, output: "tuning_fork_32768hz",
    bestUse: "rtc_calendar_timekeep",
  },
};

const get = (t: ClockSource) => DATA[t];

export const accuracy = (t: ClockSource) => get(t).accuracy;
export const startup = (t: ClockSource) => get(t).startup;
export const stability = (t: ClockSource) => get(t).stability;
export const power = (t: ClockSource) => get(t).power;
export const clkCost = (t: ClockSource) => get(t).clkCost;
export const trimmed = (t: ClockSource) => get(t).trimmed;
export const forUsb = (t: ClockSource) => get(t).forUsb;
export const output = (t: ClockSource) => get(t).output;
export const bestUse = (t: ClockSource) => get(t).bestUse;
export const clockSources = (): ClockSource[] => Object.keys(DATA) as ClockSource[];
