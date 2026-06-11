export type OpAmpConfigType =
  | "inverting_gain"
  | "non_inverting_gain"
  | "differential_amp"
  | "instrumentation_amp"
  | "transimpedance_tia";

const DATA: Record<OpAmpConfigType, {
  accuracy: number; inputImpedance: number; cmrr: number;
  bandwidth: number; configCost: number; singleSupply: boolean;
  forSensor: boolean; feedbackType: string; bestUse: string;
}> = {
  inverting_gain: { accuracy: 7, inputImpedance: 4, cmrr: 5, bandwidth: 7, configCost: 1, singleSupply: false, forSensor: false, feedbackType: "resistor_ratio_neg", bestUse: "signal_scaling_filter" },
  non_inverting_gain: { accuracy: 7, inputImpedance: 10, cmrr: 5, bandwidth: 7, configCost: 1, singleSupply: true, forSensor: false, feedbackType: "resistor_ratio_pos", bestUse: "buffer_high_impedance" },
  differential_amp: { accuracy: 8, inputImpedance: 6, cmrr: 8, bandwidth: 6, configCost: 2, singleSupply: false, forSensor: true, feedbackType: "matched_resistor_diff", bestUse: "bridge_sensor_readout" },
  instrumentation_amp: { accuracy: 10, inputImpedance: 10, cmrr: 10, bandwidth: 5, configCost: 4, singleSupply: false, forSensor: true, feedbackType: "three_op_amp_gain", bestUse: "precision_strain_gauge" },
  transimpedance_tia: { accuracy: 8, inputImpedance: 3, cmrr: 4, bandwidth: 9, configCost: 3, singleSupply: false, forSensor: true, feedbackType: "current_to_voltage_r", bestUse: "photodiode_current_amp" },
};

const get = (t: OpAmpConfigType) => DATA[t];

export const accuracy = (t: OpAmpConfigType) => get(t).accuracy;
export const inputImpedance = (t: OpAmpConfigType) => get(t).inputImpedance;
export const cmrr = (t: OpAmpConfigType) => get(t).cmrr;
export const bandwidth = (t: OpAmpConfigType) => get(t).bandwidth;
export const configCost = (t: OpAmpConfigType) => get(t).configCost;
export const singleSupply = (t: OpAmpConfigType) => get(t).singleSupply;
export const forSensor = (t: OpAmpConfigType) => get(t).forSensor;
export const feedbackType = (t: OpAmpConfigType) => get(t).feedbackType;
export const bestUse = (t: OpAmpConfigType) => get(t).bestUse;
export const opAmpConfigs = (): OpAmpConfigType[] => Object.keys(DATA) as OpAmpConfigType[];
