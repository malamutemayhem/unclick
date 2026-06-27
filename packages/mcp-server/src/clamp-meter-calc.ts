export type ClampMeterType =
  | "ac_only_basic"
  | "ac_dc_true_rms"
  | "flexible_rogowski"
  | "high_current_1000a"
  | "power_quality_clamp";

const DATA: Record<ClampMeterType, {
  accuracy: number; currentRange: number; features: number;
  jawSize: number; meterCost: number; dcCapable: boolean;
  trueRms: boolean; sensorType: string; bestUse: string;
}> = {
  ac_only_basic: { accuracy: 5, currentRange: 5, features: 3, jawSize: 6, meterCost: 2, dcCapable: false, trueRms: false, sensorType: "ct_transformer_jaw", bestUse: "basic_ac_current_check" },
  ac_dc_true_rms: { accuracy: 8, currentRange: 7, features: 7, jawSize: 6, meterCost: 5, dcCapable: true, trueRms: true, sensorType: "hall_effect_jaw", bestUse: "hvac_electrical_service" },
  flexible_rogowski: { accuracy: 7, currentRange: 8, features: 6, jawSize: 10, meterCost: 6, dcCapable: false, trueRms: true, sensorType: "rogowski_coil_flex", bestUse: "tight_space_large_cable" },
  high_current_1000a: { accuracy: 8, currentRange: 10, features: 7, jawSize: 8, meterCost: 7, dcCapable: true, trueRms: true, sensorType: "oversized_hall_jaw", bestUse: "industrial_high_current" },
  power_quality_clamp: { accuracy: 10, currentRange: 8, features: 10, jawSize: 7, meterCost: 10, dcCapable: true, trueRms: true, sensorType: "precision_hall_effect", bestUse: "power_harmonic_analysis" },
};

const get = (t: ClampMeterType) => DATA[t];

export const accuracy = (t: ClampMeterType) => get(t).accuracy;
export const currentRange = (t: ClampMeterType) => get(t).currentRange;
export const features = (t: ClampMeterType) => get(t).features;
export const jawSize = (t: ClampMeterType) => get(t).jawSize;
export const meterCost = (t: ClampMeterType) => get(t).meterCost;
export const dcCapable = (t: ClampMeterType) => get(t).dcCapable;
export const trueRms = (t: ClampMeterType) => get(t).trueRms;
export const sensorType = (t: ClampMeterType) => get(t).sensorType;
export const bestUse = (t: ClampMeterType) => get(t).bestUse;
export const clampMeters = (): ClampMeterType[] => Object.keys(DATA) as ClampMeterType[];
