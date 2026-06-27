export type LdoType =
  | "standard_nmos_pass"
  | "low_dropout_pmos"
  | "ultra_low_noise"
  | "high_psrr_rf"
  | "adjustable_tracking";

const DATA: Record<LdoType, {
  dropout: number; psrr: number; noise: number;
  quiescent: number; ldoCost: number; capFree: boolean;
  forAnalog: boolean; passElement: string; bestUse: string;
}> = {
  standard_nmos_pass: {
    dropout: 4, psrr: 5, noise: 5,
    quiescent: 6, ldoCost: 1, capFree: false,
    forAnalog: false, passElement: "nmos_source_follower",
    bestUse: "digital_logic_low_cost",
  },
  low_dropout_pmos: {
    dropout: 9, psrr: 7, noise: 7,
    quiescent: 8, ldoCost: 3, capFree: false,
    forAnalog: true, passElement: "pmos_common_source",
    bestUse: "battery_rail_post_reg",
  },
  ultra_low_noise: {
    dropout: 7, psrr: 9, noise: 10,
    quiescent: 5, ldoCost: 6, capFree: false,
    forAnalog: true, passElement: "pmos_kelvin_sense",
    bestUse: "pll_vco_clean_supply",
  },
  high_psrr_rf: {
    dropout: 8, psrr: 10, noise: 9,
    quiescent: 4, ldoCost: 7, capFree: true,
    forAnalog: true, passElement: "regulated_cascode_loop",
    bestUse: "rf_transceiver_supply",
  },
  adjustable_tracking: {
    dropout: 6, psrr: 6, noise: 6,
    quiescent: 7, ldoCost: 4, capFree: false,
    forAnalog: false, passElement: "resistor_divider_fb",
    bestUse: "multi_rail_sequencing",
  },
};

const get = (t: LdoType) => DATA[t];

export const dropout = (t: LdoType) => get(t).dropout;
export const psrr = (t: LdoType) => get(t).psrr;
export const noise = (t: LdoType) => get(t).noise;
export const quiescent = (t: LdoType) => get(t).quiescent;
export const ldoCost = (t: LdoType) => get(t).ldoCost;
export const capFree = (t: LdoType) => get(t).capFree;
export const forAnalog = (t: LdoType) => get(t).forAnalog;
export const passElement = (t: LdoType) => get(t).passElement;
export const bestUse = (t: LdoType) => get(t).bestUse;
export const ldoTypes = (): LdoType[] => Object.keys(DATA) as LdoType[];
