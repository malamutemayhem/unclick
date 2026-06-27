export type VoltageDividerType =
  | "resistive_fixed_ratio"
  | "potentiometer_variable"
  | "precision_thin_film"
  | "capacitive_ac_divider"
  | "compensated_freq_flat";

const DATA: Record<VoltageDividerType, {
  accuracy: number; stability: number; freqResponse: number;
  loadEffect: number; dividerCost: number; variable: boolean;
  forAc: boolean; elementType: string; bestUse: string;
}> = {
  resistive_fixed_ratio: { accuracy: 7, stability: 7, freqResponse: 5, loadEffect: 4, dividerCost: 1, variable: false, forAc: false, elementType: "metal_film_resistor", bestUse: "adc_voltage_scale" },
  potentiometer_variable: { accuracy: 4, stability: 3, freqResponse: 4, loadEffect: 3, dividerCost: 2, variable: true, forAc: false, elementType: "wiper_resistance_track", bestUse: "user_adjust_threshold" },
  precision_thin_film: { accuracy: 9, stability: 9, freqResponse: 6, loadEffect: 5, dividerCost: 6, variable: false, forAc: false, elementType: "thin_film_network", bestUse: "calibration_reference" },
  capacitive_ac_divider: { accuracy: 6, stability: 6, freqResponse: 9, loadEffect: 7, dividerCost: 5, variable: false, forAc: true, elementType: "series_capacitor_pair", bestUse: "high_voltage_ac_sense" },
  compensated_freq_flat: { accuracy: 8, stability: 8, freqResponse: 10, loadEffect: 8, dividerCost: 8, variable: false, forAc: true, elementType: "rc_compensated_ladder", bestUse: "oscilloscope_probe_tip" },
};

const get = (t: VoltageDividerType) => DATA[t];

export const accuracy = (t: VoltageDividerType) => get(t).accuracy;
export const stability = (t: VoltageDividerType) => get(t).stability;
export const freqResponse = (t: VoltageDividerType) => get(t).freqResponse;
export const loadEffect = (t: VoltageDividerType) => get(t).loadEffect;
export const dividerCost = (t: VoltageDividerType) => get(t).dividerCost;
export const variable = (t: VoltageDividerType) => get(t).variable;
export const forAc = (t: VoltageDividerType) => get(t).forAc;
export const elementType = (t: VoltageDividerType) => get(t).elementType;
export const bestUse = (t: VoltageDividerType) => get(t).bestUse;
export const voltageDividers = (): VoltageDividerType[] => Object.keys(DATA) as VoltageDividerType[];
