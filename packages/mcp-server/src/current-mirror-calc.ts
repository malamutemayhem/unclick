export type CurrentMirror =
  | "simple_2transistor"
  | "cascode_high_z"
  | "wilson_improved"
  | "wide_swing_fold"
  | "regulated_cascode";

const DATA: Record<CurrentMirror, {
  outputImpedance: number; matching: number; compliance: number;
  bandwidth: number; mirrorCost: number; selfBiased: boolean;
  forAnalog: boolean; structure: string; bestUse: string;
}> = {
  simple_2transistor: {
    outputImpedance: 3, matching: 4, compliance: 8,
    bandwidth: 9, mirrorCost: 1, selfBiased: false,
    forAnalog: false, structure: "vgs_matched_pair",
    bestUse: "digital_bias_current",
  },
  cascode_high_z: {
    outputImpedance: 8, matching: 7, compliance: 4,
    bandwidth: 6, mirrorCost: 3, selfBiased: false,
    forAnalog: true, structure: "stacked_cascode_pair",
    bestUse: "opamp_output_stage",
  },
  wilson_improved: {
    outputImpedance: 7, matching: 8, compliance: 5,
    bandwidth: 5, mirrorCost: 4, selfBiased: true,
    forAnalog: true, structure: "feedback_beta_enhance",
    bestUse: "dac_current_steering",
  },
  wide_swing_fold: {
    outputImpedance: 9, matching: 8, compliance: 7,
    bandwidth: 7, mirrorCost: 5, selfBiased: true,
    forAnalog: true, structure: "folded_cascode_bias",
    bestUse: "low_voltage_cmos_ota",
  },
  regulated_cascode: {
    outputImpedance: 10, matching: 9, compliance: 6,
    bandwidth: 4, mirrorCost: 6, selfBiased: true,
    forAnalog: true, structure: "gain_boosted_loop",
    bestUse: "high_res_adc_ref_current",
  },
};

const get = (t: CurrentMirror) => DATA[t];

export const outputImpedance = (t: CurrentMirror) => get(t).outputImpedance;
export const matching = (t: CurrentMirror) => get(t).matching;
export const compliance = (t: CurrentMirror) => get(t).compliance;
export const bandwidth = (t: CurrentMirror) => get(t).bandwidth;
export const mirrorCost = (t: CurrentMirror) => get(t).mirrorCost;
export const selfBiased = (t: CurrentMirror) => get(t).selfBiased;
export const forAnalog = (t: CurrentMirror) => get(t).forAnalog;
export const structure = (t: CurrentMirror) => get(t).structure;
export const bestUse = (t: CurrentMirror) => get(t).bestUse;
export const currentMirrors = (): CurrentMirror[] => Object.keys(DATA) as CurrentMirror[];
