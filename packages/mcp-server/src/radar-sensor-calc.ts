export type RadarSensorType =
  | "fmcw_24ghz"
  | "fmcw_60ghz"
  | "fmcw_77ghz_auto"
  | "uwb_impulse_radar"
  | "doppler_cw_motion";

const DATA: Record<RadarSensorType, {
  rangeResolution: number; maxRange: number; accuracy: number;
  penetration: number; sensorCost: number; wideband: boolean;
  forAutomotive: boolean; waveform: string; bestUse: string;
}> = {
  fmcw_24ghz: { rangeResolution: 5, maxRange: 7, accuracy: 6, penetration: 8, sensorCost: 3, wideband: true, forAutomotive: false, waveform: "fmcw_ism_24ghz", bestUse: "industrial_level_measure" },
  fmcw_60ghz: { rangeResolution: 8, maxRange: 5, accuracy: 8, penetration: 4, sensorCost: 4, wideband: true, forAutomotive: false, waveform: "fmcw_v_band_60ghz", bestUse: "gesture_vital_sign_detect" },
  fmcw_77ghz_auto: { rangeResolution: 9, maxRange: 9, accuracy: 9, penetration: 3, sensorCost: 7, wideband: true, forAutomotive: true, waveform: "fmcw_w_band_77ghz", bestUse: "adaptive_cruise_control" },
  uwb_impulse_radar: { rangeResolution: 10, maxRange: 4, accuracy: 7, penetration: 9, sensorCost: 5, wideband: true, forAutomotive: false, waveform: "impulse_sub_ns_pulse", bestUse: "ground_penetrate_gpr" },
  doppler_cw_motion: { rangeResolution: 2, maxRange: 6, accuracy: 4, penetration: 7, sensorCost: 2, wideband: false, forAutomotive: false, waveform: "cw_single_tone", bestUse: "motion_detect_door_open" },
};

const get = (t: RadarSensorType) => DATA[t];

export const rangeResolution = (t: RadarSensorType) => get(t).rangeResolution;
export const maxRange = (t: RadarSensorType) => get(t).maxRange;
export const accuracy = (t: RadarSensorType) => get(t).accuracy;
export const penetration = (t: RadarSensorType) => get(t).penetration;
export const sensorCost = (t: RadarSensorType) => get(t).sensorCost;
export const wideband = (t: RadarSensorType) => get(t).wideband;
export const forAutomotive = (t: RadarSensorType) => get(t).forAutomotive;
export const waveform = (t: RadarSensorType) => get(t).waveform;
export const bestUse = (t: RadarSensorType) => get(t).bestUse;
export const radarSensors = (): RadarSensorType[] => Object.keys(DATA) as RadarSensorType[];
