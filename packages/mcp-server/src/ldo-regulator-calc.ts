export type LdoRegulatorType =
  | "standard_positive"
  | "low_noise_rf"
  | "ultra_low_dropout"
  | "adjustable_output"
  | "negative_voltage";

const DATA: Record<LdoRegulatorType, {
  dropout: number; noiseLevel: number; psrr: number;
  loadRegulation: number; ldoCost: number; fixedOutput: boolean;
  forAnalog: boolean; regType: string; bestUse: string;
}> = {
  standard_positive: { dropout: 5, noiseLevel: 5, psrr: 6, loadRegulation: 7, ldoCost: 1, fixedOutput: true, forAnalog: false, regType: "pnp_pass_element", bestUse: "general_digital_rail" },
  low_noise_rf: { dropout: 7, noiseLevel: 10, psrr: 10, loadRegulation: 9, ldoCost: 5, fixedOutput: true, forAnalog: true, regType: "nmos_low_noise", bestUse: "rf_pll_adc_clean_supply" },
  ultra_low_dropout: { dropout: 10, noiseLevel: 7, psrr: 7, loadRegulation: 8, ldoCost: 4, fixedOutput: true, forAnalog: false, regType: "pmos_low_rds_on", bestUse: "battery_headroom_tight" },
  adjustable_output: { dropout: 6, noiseLevel: 6, psrr: 6, loadRegulation: 7, ldoCost: 2, fixedOutput: false, forAnalog: false, regType: "resistor_divider_adj", bestUse: "lab_prototype_variable" },
  negative_voltage: { dropout: 5, noiseLevel: 6, psrr: 5, loadRegulation: 6, ldoCost: 3, fixedOutput: true, forAnalog: true, regType: "negative_rail_pass", bestUse: "op_amp_negative_supply" },
};

const get = (t: LdoRegulatorType) => DATA[t];

export const dropout = (t: LdoRegulatorType) => get(t).dropout;
export const noiseLevel = (t: LdoRegulatorType) => get(t).noiseLevel;
export const psrr = (t: LdoRegulatorType) => get(t).psrr;
export const loadRegulation = (t: LdoRegulatorType) => get(t).loadRegulation;
export const ldoCost = (t: LdoRegulatorType) => get(t).ldoCost;
export const fixedOutput = (t: LdoRegulatorType) => get(t).fixedOutput;
export const forAnalog = (t: LdoRegulatorType) => get(t).forAnalog;
export const regType = (t: LdoRegulatorType) => get(t).regType;
export const bestUse = (t: LdoRegulatorType) => get(t).bestUse;
export const ldoRegulators = (): LdoRegulatorType[] => Object.keys(DATA) as LdoRegulatorType[];
