export type PllType =
  | "integer_n_synth"
  | "fractional_n_sigma"
  | "all_digital_adpll"
  | "analog_charge_pump"
  | "injection_locked";

const DATA: Record<PllType, {
  lockTime: number; phaseNoise: number; spurLevel: number;
  tuningRange: number; pllCost: number; digital: boolean;
  forRfSynth: boolean; loopFilter: string; bestUse: string;
}> = {
  integer_n_synth: {
    lockTime: 5, phaseNoise: 5, spurLevel: 7,
    tuningRange: 6, pllCost: 4, digital: false,
    forRfSynth: true, loopFilter: "passive_rc_third_order",
    bestUse: "fixed_channel_transceiver",
  },
  fractional_n_sigma: {
    lockTime: 7, phaseNoise: 8, spurLevel: 6,
    tuningRange: 9, pllCost: 7, digital: false,
    forRfSynth: true, loopFilter: "active_opamp_integrator",
    bestUse: "agile_frequency_hopping",
  },
  all_digital_adpll: {
    lockTime: 9, phaseNoise: 6, spurLevel: 5,
    tuningRange: 7, pllCost: 6, digital: true,
    forRfSynth: false, loopFilter: "digital_iir_compensator",
    bestUse: "soc_clock_generation",
  },
  analog_charge_pump: {
    lockTime: 4, phaseNoise: 7, spurLevel: 8,
    tuningRange: 5, pllCost: 3, digital: false,
    forRfSynth: false, loopFilter: "charge_pump_loop_filter",
    bestUse: "clock_data_recovery",
  },
  injection_locked: {
    lockTime: 10, phaseNoise: 9, spurLevel: 4,
    tuningRange: 3, pllCost: 8, digital: false,
    forRfSynth: true, loopFilter: "resonant_tank_injection",
    bestUse: "low_jitter_serializer",
  },
};

const get = (t: PllType) => DATA[t];

export const lockTime = (t: PllType) => get(t).lockTime;
export const phaseNoise = (t: PllType) => get(t).phaseNoise;
export const spurLevel = (t: PllType) => get(t).spurLevel;
export const tuningRange = (t: PllType) => get(t).tuningRange;
export const pllCost = (t: PllType) => get(t).pllCost;
export const digital = (t: PllType) => get(t).digital;
export const forRfSynth = (t: PllType) => get(t).forRfSynth;
export const loopFilter = (t: PllType) => get(t).loopFilter;
export const bestUse = (t: PllType) => get(t).bestUse;
export const pllTypes = (): PllType[] => Object.keys(DATA) as PllType[];
