export type VoltageRef =
  | "bandgap_silicon"
  | "buried_zener"
  | "xfet_low_noise"
  | "shunt_tl431"
  | "ldo_precision_series";

const DATA: Record<VoltageRef, {
  accuracy: number; tempCoeff: number; noise: number;
  stability: number; vrCost: number; adjustable: boolean;
  forCalibration: boolean; topology: string; bestUse: string;
}> = {
  bandgap_silicon: {
    accuracy: 6, tempCoeff: 6, noise: 5,
    stability: 7, vrCost: 2, adjustable: false,
    forCalibration: false, topology: "curvature_corrected_bg",
    bestUse: "general_purpose_adc_ref",
  },
  buried_zener: {
    accuracy: 10, tempCoeff: 10, noise: 8,
    stability: 10, vrCost: 8, adjustable: false,
    forCalibration: true, topology: "subsurface_breakdown_junction",
    bestUse: "metrology_grade_calibrator",
  },
  xfet_low_noise: {
    accuracy: 8, tempCoeff: 9, noise: 10,
    stability: 9, vrCost: 7, adjustable: false,
    forCalibration: true, topology: "jfet_pinch_off_delta_vgs",
    bestUse: "24bit_dac_voltage_source",
  },
  shunt_tl431: {
    accuracy: 4, tempCoeff: 4, noise: 3,
    stability: 5, vrCost: 1, adjustable: true,
    forCalibration: false, topology: "programmable_shunt_regulator",
    bestUse: "smps_feedback_opto_loop",
  },
  ldo_precision_series: {
    accuracy: 7, tempCoeff: 7, noise: 7,
    stability: 8, vrCost: 5, adjustable: true,
    forCalibration: false, topology: "series_pass_buffered_ref",
    bestUse: "precision_sensor_excitation",
  },
};

const get = (t: VoltageRef) => DATA[t];

export const accuracy = (t: VoltageRef) => get(t).accuracy;
export const tempCoeff = (t: VoltageRef) => get(t).tempCoeff;
export const noise = (t: VoltageRef) => get(t).noise;
export const stability = (t: VoltageRef) => get(t).stability;
export const vrCost = (t: VoltageRef) => get(t).vrCost;
export const adjustable = (t: VoltageRef) => get(t).adjustable;
export const forCalibration = (t: VoltageRef) => get(t).forCalibration;
export const topology = (t: VoltageRef) => get(t).topology;
export const bestUse = (t: VoltageRef) => get(t).bestUse;
export const voltageRefs = (): VoltageRef[] => Object.keys(DATA) as VoltageRef[];
