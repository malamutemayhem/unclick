export type PaClass =
  | "class_a_linear"
  | "class_ab_push_pull"
  | "class_d_switching"
  | "class_e_zvs"
  | "doherty_load_mod";

const DATA: Record<PaClass, {
  efficiency: number; linearity: number; bandwidth: number;
  backoffEff: number; paCost: number; digitalPd: boolean;
  for5g: boolean; operation: string; bestUse: string;
}> = {
  class_a_linear: {
    efficiency: 2, linearity: 10, bandwidth: 8,
    backoffEff: 1, paCost: 4, digitalPd: false,
    for5g: false, operation: "full_cycle_bias",
    bestUse: "instrumentation_driver",
  },
  class_ab_push_pull: {
    efficiency: 5, linearity: 8, bandwidth: 7,
    backoffEff: 4, paCost: 3, digitalPd: true,
    for5g: true, operation: "complementary_half_cycle",
    bestUse: "cellular_base_station",
  },
  class_d_switching: {
    efficiency: 9, linearity: 3, bandwidth: 4,
    backoffEff: 8, paCost: 5, digitalPd: false,
    for5g: false, operation: "pwm_full_switch",
    bestUse: "audio_amplifier_speaker",
  },
  class_e_zvs: {
    efficiency: 10, linearity: 2, bandwidth: 3,
    backoffEff: 7, paCost: 6, digitalPd: false,
    for5g: false, operation: "zero_voltage_switch_shunt",
    bestUse: "wireless_power_transfer",
  },
  doherty_load_mod: {
    efficiency: 8, linearity: 7, bandwidth: 6,
    backoffEff: 10, paCost: 8, digitalPd: true,
    for5g: true, operation: "main_peaking_load_pull",
    bestUse: "5g_massive_mimo_rru",
  },
};

const get = (t: PaClass) => DATA[t];

export const efficiency = (t: PaClass) => get(t).efficiency;
export const linearity = (t: PaClass) => get(t).linearity;
export const bandwidth = (t: PaClass) => get(t).bandwidth;
export const backoffEff = (t: PaClass) => get(t).backoffEff;
export const paCost = (t: PaClass) => get(t).paCost;
export const digitalPd = (t: PaClass) => get(t).digitalPd;
export const for5g = (t: PaClass) => get(t).for5g;
export const operation = (t: PaClass) => get(t).operation;
export const bestUse = (t: PaClass) => get(t).bestUse;
export const paClasses = (): PaClass[] => Object.keys(DATA) as PaClass[];
