export type InstrumentationAmp =
  | "three_opamp_classic"
  | "two_opamp_diff"
  | "indirect_current_fb"
  | "auto_zero_chopper"
  | "programmable_gain";

const DATA: Record<InstrumentationAmp, {
  cmrr: number; inputImpedance: number; noise: number;
  gainAccuracy: number; inaCost: number; digitalGain: boolean;
  forBridge: boolean; architecture: string; bestUse: string;
}> = {
  three_opamp_classic: {
    cmrr: 8, inputImpedance: 9, noise: 6,
    gainAccuracy: 7, inaCost: 5, digitalGain: false,
    forBridge: true, architecture: "diff_plus_buffer_pair",
    bestUse: "load_cell_interface",
  },
  two_opamp_diff: {
    cmrr: 6, inputImpedance: 7, noise: 5,
    gainAccuracy: 5, inaCost: 3, digitalGain: false,
    forBridge: false, architecture: "subtractor_two_stage",
    bestUse: "current_shunt_monitor",
  },
  indirect_current_fb: {
    cmrr: 9, inputImpedance: 10, noise: 7,
    gainAccuracy: 8, inaCost: 6, digitalGain: false,
    forBridge: true, architecture: "current_feedback_loop",
    bestUse: "ecg_biopotential",
  },
  auto_zero_chopper: {
    cmrr: 10, inputImpedance: 8, noise: 9,
    gainAccuracy: 10, inaCost: 8, digitalGain: false,
    forBridge: true, architecture: "chopped_nested_loop",
    bestUse: "thermocouple_cold_jn",
  },
  programmable_gain: {
    cmrr: 7, inputImpedance: 8, noise: 6,
    gainAccuracy: 9, inaCost: 7, digitalGain: true,
    forBridge: false, architecture: "mux_resistor_array",
    bestUse: "data_acq_multichannel",
  },
};

const get = (t: InstrumentationAmp) => DATA[t];

export const cmrr = (t: InstrumentationAmp) => get(t).cmrr;
export const inputImpedance = (t: InstrumentationAmp) => get(t).inputImpedance;
export const noise = (t: InstrumentationAmp) => get(t).noise;
export const gainAccuracy = (t: InstrumentationAmp) => get(t).gainAccuracy;
export const inaCost = (t: InstrumentationAmp) => get(t).inaCost;
export const digitalGain = (t: InstrumentationAmp) => get(t).digitalGain;
export const forBridge = (t: InstrumentationAmp) => get(t).forBridge;
export const architecture = (t: InstrumentationAmp) => get(t).architecture;
export const bestUse = (t: InstrumentationAmp) => get(t).bestUse;
export const instrumentationAmps = (): InstrumentationAmp[] => Object.keys(DATA) as InstrumentationAmp[];
