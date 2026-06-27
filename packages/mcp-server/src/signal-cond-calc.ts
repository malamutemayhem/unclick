export type SignalCondType =
  | "wheatstone_bridge"
  | "charge_amplifier"
  | "isolation_amplifier"
  | "programmable_gain"
  | "filter_active_lpf";

const DATA: Record<SignalCondType, {
  accuracy: number; dynamicRange: number; noiseReject: number;
  bandwidth: number; condCost: number; isolated: boolean;
  forBridge: boolean; signalPath: string; bestUse: string;
}> = {
  wheatstone_bridge: { accuracy: 9, dynamicRange: 7, noiseReject: 7, bandwidth: 5, condCost: 3, isolated: false, forBridge: true, signalPath: "bridge_excite_diff_amp", bestUse: "load_cell_strain_gauge" },
  charge_amplifier: { accuracy: 8, dynamicRange: 8, noiseReject: 6, bandwidth: 9, condCost: 5, isolated: false, forBridge: false, signalPath: "integrator_charge_conv", bestUse: "piezo_accel_pressure" },
  isolation_amplifier: { accuracy: 7, dynamicRange: 6, noiseReject: 10, bandwidth: 6, condCost: 7, isolated: true, forBridge: false, signalPath: "galvanic_barrier_amp", bestUse: "high_voltage_safe_sense" },
  programmable_gain: { accuracy: 8, dynamicRange: 10, noiseReject: 7, bandwidth: 7, condCost: 4, isolated: false, forBridge: false, signalPath: "switched_gain_resistor", bestUse: "multi_range_data_acq" },
  filter_active_lpf: { accuracy: 7, dynamicRange: 7, noiseReject: 9, bandwidth: 4, condCost: 2, isolated: false, forBridge: false, signalPath: "sallen_key_butterworth", bestUse: "anti_alias_before_adc" },
};

const get = (t: SignalCondType) => DATA[t];

export const accuracy = (t: SignalCondType) => get(t).accuracy;
export const dynamicRange = (t: SignalCondType) => get(t).dynamicRange;
export const noiseReject = (t: SignalCondType) => get(t).noiseReject;
export const bandwidth = (t: SignalCondType) => get(t).bandwidth;
export const condCost = (t: SignalCondType) => get(t).condCost;
export const isolated = (t: SignalCondType) => get(t).isolated;
export const forBridge = (t: SignalCondType) => get(t).forBridge;
export const signalPath = (t: SignalCondType) => get(t).signalPath;
export const bestUse = (t: SignalCondType) => get(t).bestUse;
export const signalConds = (): SignalCondType[] => Object.keys(DATA) as SignalCondType[];
