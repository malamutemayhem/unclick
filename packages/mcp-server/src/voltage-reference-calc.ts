export type VoltageReference =
  | "bandgap_1v2"
  | "buried_zener"
  | "xfet_low_noise"
  | "shunt_tl431"
  | "ldo_ref_series";

const DATA: Record<VoltageReference, {
  accuracy: number; tempDrift: number; noise: number;
  longTermStab: number; refCost: number; adjustable: boolean;
  forPrecision: boolean; topology: string; bestUse: string;
}> = {
  bandgap_1v2: {
    accuracy: 5, tempDrift: 5, noise: 5,
    longTermStab: 5, refCost: 2, adjustable: false,
    forPrecision: false, topology: "cmos_curvature_comp",
    bestUse: "on_chip_adc_reference",
  },
  buried_zener: {
    accuracy: 9, tempDrift: 9, noise: 8,
    longTermStab: 10, refCost: 8, adjustable: false,
    forPrecision: true, topology: "sub_surface_avalanche",
    bestUse: "6_5digit_multimeter",
  },
  xfet_low_noise: {
    accuracy: 8, tempDrift: 8, noise: 10,
    longTermStab: 8, refCost: 7, adjustable: false,
    forPrecision: true, topology: "jfet_bootstrap_bias",
    bestUse: "24bit_data_acquisition",
  },
  shunt_tl431: {
    accuracy: 4, tempDrift: 4, noise: 3,
    longTermStab: 4, refCost: 1, adjustable: true,
    forPrecision: false, topology: "shunt_regulator_2term",
    bestUse: "smps_feedback_optocoupler",
  },
  ldo_ref_series: {
    accuracy: 7, tempDrift: 7, noise: 7,
    longTermStab: 7, refCost: 5, adjustable: true,
    forPrecision: true, topology: "series_pass_ldo",
    bestUse: "precision_current_source",
  },
};

const get = (t: VoltageReference) => DATA[t];

export const accuracy = (t: VoltageReference) => get(t).accuracy;
export const tempDrift = (t: VoltageReference) => get(t).tempDrift;
export const noise = (t: VoltageReference) => get(t).noise;
export const longTermStab = (t: VoltageReference) => get(t).longTermStab;
export const refCost = (t: VoltageReference) => get(t).refCost;
export const adjustable = (t: VoltageReference) => get(t).adjustable;
export const forPrecision = (t: VoltageReference) => get(t).forPrecision;
export const topology = (t: VoltageReference) => get(t).topology;
export const bestUse = (t: VoltageReference) => get(t).bestUse;
export const voltageReferences = (): VoltageReference[] => Object.keys(DATA) as VoltageReference[];
