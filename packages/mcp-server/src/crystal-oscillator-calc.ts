export type CrystalOscillatorType =
  | "quartz_through_hole"
  | "ceramic_resonator"
  | "mems_oscillator"
  | "tcxo_temp_compensated"
  | "ocxo_oven_controlled";

const DATA: Record<CrystalOscillatorType, {
  freqStability: number; accuracy: number; startupSpeed: number;
  tempRange: number; oscCost: number; programmable: boolean;
  forPrecision: boolean; packageType: string; bestUse: string;
}> = {
  quartz_through_hole: { freqStability: 7, accuracy: 7, startupSpeed: 5, tempRange: 6, oscCost: 2, programmable: false, forPrecision: false, packageType: "hc49_through_hole", bestUse: "mcu_clock_source" },
  ceramic_resonator: { freqStability: 4, accuracy: 4, startupSpeed: 8, tempRange: 5, oscCost: 1, programmable: false, forPrecision: false, packageType: "radial_3pin_ceramic", bestUse: "cost_sensitive_timing" },
  mems_oscillator: { freqStability: 8, accuracy: 8, startupSpeed: 9, tempRange: 7, oscCost: 5, programmable: true, forPrecision: true, packageType: "smd_4pin_cmos", bestUse: "vibration_resistant_clock" },
  tcxo_temp_compensated: { freqStability: 9, accuracy: 9, startupSpeed: 7, tempRange: 9, oscCost: 7, programmable: false, forPrecision: true, packageType: "smd_clipped_sine", bestUse: "gps_reference_clock" },
  ocxo_oven_controlled: { freqStability: 10, accuracy: 10, startupSpeed: 3, tempRange: 10, oscCost: 10, programmable: false, forPrecision: true, packageType: "dip_oven_module", bestUse: "lab_frequency_standard" },
};

const get = (t: CrystalOscillatorType) => DATA[t];

export const freqStability = (t: CrystalOscillatorType) => get(t).freqStability;
export const accuracy = (t: CrystalOscillatorType) => get(t).accuracy;
export const startupSpeed = (t: CrystalOscillatorType) => get(t).startupSpeed;
export const tempRange = (t: CrystalOscillatorType) => get(t).tempRange;
export const oscCost = (t: CrystalOscillatorType) => get(t).oscCost;
export const programmable = (t: CrystalOscillatorType) => get(t).programmable;
export const forPrecision = (t: CrystalOscillatorType) => get(t).forPrecision;
export const packageType = (t: CrystalOscillatorType) => get(t).packageType;
export const bestUse = (t: CrystalOscillatorType) => get(t).bestUse;
export const crystalOscillators = (): CrystalOscillatorType[] => Object.keys(DATA) as CrystalOscillatorType[];
