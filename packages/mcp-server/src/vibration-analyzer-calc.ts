export type VibrationAnalyzerType =
  | "portable_collector"
  | "online_monitor"
  | "modal_analyzer"
  | "balancing_analyzer"
  | "laser_vibrometer";

interface VibrationAnalyzerData {
  freqRange: number;
  throughput: number;
  dynamicRange: number;
  channelCount: number;
  vaCost: number;
  continuous: boolean;
  forPredictive: boolean;
  analyzerConfig: string;
  bestUse: string;
}

const DATA: Record<VibrationAnalyzerType, VibrationAnalyzerData> = {
  portable_collector: {
    freqRange: 7, throughput: 8, dynamicRange: 7, channelCount: 5, vaCost: 4,
    continuous: false, forPredictive: true,
    analyzerConfig: "portable_vibration_collector_route_based_spectrum_trend_alarm",
    bestUse: "route_collect_portable_vibration_analyzer_spectrum_trend_alarm",
  },
  online_monitor: {
    freqRange: 7, throughput: 10, dynamicRange: 7, channelCount: 9, vaCost: 7,
    continuous: true, forPredictive: true,
    analyzerConfig: "online_vibration_monitor_permanent_sensor_24_7_alert_protect",
    bestUse: "critical_machine_online_vibration_monitor_24_7_protect_alert",
  },
  modal_analyzer: {
    freqRange: 9, throughput: 4, dynamicRange: 9, channelCount: 10, vaCost: 9,
    continuous: false, forPredictive: false,
    analyzerConfig: "modal_vibration_analyzer_multi_channel_frf_mode_shape_animate",
    bestUse: "structural_test_modal_vibration_analyzer_frf_mode_shape_resonance",
  },
  balancing_analyzer: {
    freqRange: 6, throughput: 7, dynamicRange: 6, channelCount: 4, vaCost: 5,
    continuous: false, forPredictive: false,
    analyzerConfig: "balancing_vibration_analyzer_phase_amplitude_weight_placement",
    bestUse: "rotor_balance_balancing_vibration_analyzer_field_two_plane_trim",
  },
  laser_vibrometer: {
    freqRange: 10, throughput: 6, dynamicRange: 10, channelCount: 3, vaCost: 10,
    continuous: false, forPredictive: false,
    analyzerConfig: "laser_vibrometer_non_contact_doppler_surface_velocity_scan",
    bestUse: "non_contact_laser_vibrometer_doppler_surface_velocity_mems_test",
  },
};

function get(t: VibrationAnalyzerType): VibrationAnalyzerData {
  return DATA[t];
}

export const freqRange = (t: VibrationAnalyzerType) => get(t).freqRange;
export const throughput = (t: VibrationAnalyzerType) => get(t).throughput;
export const dynamicRange = (t: VibrationAnalyzerType) => get(t).dynamicRange;
export const channelCount = (t: VibrationAnalyzerType) => get(t).channelCount;
export const vaCost = (t: VibrationAnalyzerType) => get(t).vaCost;
export const continuous = (t: VibrationAnalyzerType) => get(t).continuous;
export const forPredictive = (t: VibrationAnalyzerType) => get(t).forPredictive;
export const analyzerConfig = (t: VibrationAnalyzerType) => get(t).analyzerConfig;
export const bestUse = (t: VibrationAnalyzerType) => get(t).bestUse;
export const vibrationAnalyzerTypes = (): VibrationAnalyzerType[] =>
  Object.keys(DATA) as VibrationAnalyzerType[];
